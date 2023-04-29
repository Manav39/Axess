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
import {DeleteDeviceParams, UpdateDeviceRequestBody, UpdateDeviceRequestParams} from "@/utils/types/apiRequests";
import {STRLEN_NZ, VALID_DEVICE_ID, VALID_ORG_ID, VALID_PERM_LEVEL} from "@/utils/validatorUtils";
import {UserPermissionLevel} from "@/utils/types";
import {db} from "@/utils/db";
import {ORGS_DEVICE_COLLECTION_NAME, ORGS_DOC_COLLECTION_NAME} from "@/utils/common";
import {withMethodDispatcher} from "@/utils/methodDispatcher";

type DeviceDispatchBodyMap = {
	DELETE: any,
	PUT: UpdateDeviceRequestBody,
}

type DeviceDispatchParamsMap = {
	DELETE: DeleteDeviceParams,
	PUT: UpdateDeviceRequestParams
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
	await deviceDoc.delete()
	
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
	
	res.status(200).json({
		requestStatus: "SUCCESS"
	})
}

export default withMethodDispatcher<DeviceDispatchBodyMap, DeviceDispatchParamsMap>({
	DELETE: deleteDevice,
	PUT: updateDevice
})