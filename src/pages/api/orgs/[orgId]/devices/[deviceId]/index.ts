import {
	CustomApiRequest,
	CustomApiResponse,
	requireAuthenticatedUser,
	requireBodyParams,
	requireBodyValidators,
	requireMethods,
	requireMiddlewareChecks,
	requirePermissionLevel,
	requireQueryParams,
	requireQueryParamValidators
} from "@/utils/customMiddleware";
import {
	DeleteDeviceParams,
	GetDeviceRequestParams,
	UpdateDeviceRequestBody,
	UpdateDeviceRequestParams
} from "@/utils/types/apiRequests";
import {STRLEN_NZ, VALID_DEVICE_ID, VALID_ORG_ID, VALID_PERM_LEVEL} from "@/utils/validatorUtils";
import {DeviceInfo, UserPermissionLevel} from "@/utils/types";
import {db} from "@/utils/db";
import {createLogEvent, ORGS_DEVICE_COLLECTION_NAME, ORGS_DOC_COLLECTION_NAME} from "@/utils/common";
import {withMethodDispatcher} from "@/utils/methodDispatcher";
import {GetDeviceResponse} from "@/utils/types/apiResponses";

type DeviceDispatchBodyMap = {
	DELETE: any,
	PUT: UpdateDeviceRequestBody,
	GET: any
}

type DeviceDispatchParamsMap = {
	DELETE: DeleteDeviceParams,
	PUT: UpdateDeviceRequestParams,
	GET: GetDeviceRequestParams
}

async function deleteDevice(req: CustomApiRequest<{}, DeleteDeviceParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("DELETE"),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requirePermissionLevel.name]: requirePermissionLevel(UserPermissionLevel.ADMINISTRATOR),
			[requireQueryParams.name]: requireQueryParams("orgId"),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				orgId: VALID_ORG_ID,
				deviceId: VALID_DEVICE_ID(req.query.orgId)
			})
		}
	)
	
	if (!middlewareStatus) return
	
	const {deviceId, orgId} = req.query
	
	const orgCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
	const orgDoc = orgCollection.doc(orgId)
	const devicesCollection = orgDoc.collection(ORGS_DEVICE_COLLECTION_NAME)
	const deviceDoc = devicesCollection.doc(deviceId)
	const docData = await deviceDoc.get()
	const {permissionLevel, deviceName} = docData.data()!
	await deviceDoc.delete()
	
	await createLogEvent({
		eventType: "DEVICE_DELETE",
		eventData: {
			permissionLevel: permissionLevel,
			deviceName: deviceName,
			deviceUUID: deviceId
		},
		createOrganizationLog: true,
		orgId: orgId
	})
	
	res.status(200).json({
		requestStatus: "SUCCESS"
	})
}

async function updateDevice(req: CustomApiRequest<UpdateDeviceRequestBody, UpdateDeviceRequestParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("DELETE"),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requirePermissionLevel.name]: requirePermissionLevel(UserPermissionLevel.ADMINISTRATOR),
			[requireQueryParams.name]: requireQueryParams("orgId"),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				orgId: VALID_ORG_ID,
				deviceId: VALID_DEVICE_ID(req.query.orgId)
			}),
			[requireBodyParams.name]: requireBodyParams("deviceName", "permissionLevel"),
			[requireBodyValidators.name]: requireBodyValidators({
				deviceName: STRLEN_NZ,
				permissionLevel: VALID_PERM_LEVEL
			})
		}
	)
	
	if (!middlewareStatus) return
	
	const {deviceId, orgId} = req.query
	const {deviceName, permissionLevel} = req.body
	
	const orgCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
	const orgDoc = orgCollection.doc(orgId)
	const devicesCollection = orgDoc.collection(ORGS_DEVICE_COLLECTION_NAME)
	const deviceDoc = devicesCollection.doc(deviceId)
	await deviceDoc.set({
		deviceName: deviceName,
		permissionLevel: permissionLevel
	})
	
	await createLogEvent({
		eventType: "DEVICE_UPDATE",
		eventData: {
			permissionLevel: permissionLevel,
			deviceName: deviceName,
			deviceUUID: deviceId
		},
		createOrganizationLog: true,
		orgId: orgId
	})
	
	res.status(200).json({
		requestStatus: "SUCCESS"
	})
}

export async function getDevice(req: CustomApiRequest<{}, GetDeviceRequestParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("GET"),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requireQueryParams.name]: requireQueryParams("orgId"),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				orgId: VALID_ORG_ID,
				deviceId: VALID_DEVICE_ID(req.query.orgId)
			})
		}
	)
	
	if (!middlewareStatus) return
	
	const {deviceId, orgId} = req.query
	
	const orgCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
	const orgDoc = orgCollection.doc(orgId)
	const devicesCollection = orgDoc.collection(ORGS_DEVICE_COLLECTION_NAME)
	const deviceDoc = devicesCollection.doc(deviceId)
	const docResponse = await deviceDoc.get()
	
	const {id} = docResponse
	const docData = docResponse.data() as DeviceInfo
	const {deviceName, permissionLevel} = docData
	
	res.status(200).json<GetDeviceResponse>({
		requestStatus: "SUCCESS",
		deviceData: {
			permissionLevel: permissionLevel,
			deviceName: deviceName,
			deviceId: id
		}
	})
}

export default withMethodDispatcher<DeviceDispatchBodyMap, DeviceDispatchParamsMap>({
	DELETE: deleteDevice,
	PUT: updateDevice,
	GET: getDevice,
})