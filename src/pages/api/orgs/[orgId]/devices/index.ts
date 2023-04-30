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
	requireQueryParamValidators,
	requireValidBody,
} from "@/utils/customMiddleware";
import {CreateDeviceRequestBody, CreateDeviceRequestParams, GetOrgDevicesParams} from "@/utils/types/apiRequests";
import {db} from "@/utils/db";
import {createLogEvent, ORGS_DEVICE_COLLECTION_NAME, ORGS_DOC_COLLECTION_NAME} from "@/utils/common";
import {
	ALLOW_UNDEFINED_WITH_FN,
	GT_MIN_LT_MAX,
	NON_ZERO_NON_NEGATIVE,
	STRING_TO_NUM,
	STRLEN_NZ,
	VALID_ORG_ID
} from "@/utils/validatorUtils";
import {DeviceInfo, UserPermissionLevel} from "@/utils/types";
import {v4 as uuidv4} from "uuid"
import {CreateDeviceResponse, GetDevicesResponse} from "@/utils/types/apiResponses";
import {withMethodDispatcher} from "@/utils/methodDispatcher";

type DevicesBodyDispatch = {
	POST: CreateDeviceRequestBody,
	GET: {}
}

type DevicesParamsDispatch = {
	POST: CreateDeviceRequestParams,
	GET: GetOrgDevicesParams
}

async function createDevice(req: CustomApiRequest<CreateDeviceRequestBody, CreateDeviceRequestParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("POST"),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requirePermissionLevel.name]: requirePermissionLevel(UserPermissionLevel.ADMINISTRATOR),
			[requireValidBody.name]: requireValidBody(),
			[requireQueryParams.name]: requireQueryParams("orgId"),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				orgId: VALID_ORG_ID
			}),
			[requireBodyParams.name]: requireBodyParams("deviceName", "permissionLevel"),
			[requireBodyValidators.name]: requireBodyValidators({
				deviceName: STRLEN_NZ,
				permissionLevel: GT_MIN_LT_MAX(UserPermissionLevel.GUEST, UserPermissionLevel.SUPERUSER)
			})
		}
	)
	if (middlewareStatus == false) {
		return
	}
	
	const {orgId} = req.query
	const {deviceName, permissionLevel} = req.body
	
	const orgCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
	const orgDoc = orgCollection.doc(orgId)
	const orgDeviceCollection = orgDoc.collection(ORGS_DEVICE_COLLECTION_NAME)
	
	const deviceUUID = uuidv4()
	const newDeviceDoc = orgDeviceCollection.doc(deviceUUID)
	await newDeviceDoc.set({
		deviceName,
		permissionLevel
	})
	
	await createLogEvent({
		eventType: "DEVICE_CREATE",
		eventData: {
			permissionLevel: permissionLevel,
			deviceName: deviceName,
			deviceUUID: deviceUUID
		},
		createOrganizationLog: true,
		orgId: orgId
	})
	
	res.status(200).json<CreateDeviceResponse>({
		requestStatus: "SUCCESS",
		deviceId: deviceUUID
	})
}

async function getDevices(req: CustomApiRequest<{}, GetOrgDevicesParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("GET"),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requirePermissionLevel.name]: requirePermissionLevel(UserPermissionLevel.ADMINISTRATOR),
			[requireQueryParams.name]: requireQueryParams("orgId"),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				orgId: VALID_ORG_ID,
				devicePage: ALLOW_UNDEFINED_WITH_FN(
					STRING_TO_NUM(
						NON_ZERO_NON_NEGATIVE
					)
				)
			})
		}
	)
	
	if (!middlewareStatus) return
	
	let {orgId, devicePage} = req.query
	devicePage = devicePage || "1"
	const parsedDevicePage = Number.parseInt(devicePage)
	
	const pageLowerLimit = ((parsedDevicePage - 1) * 10)
	
	const dbOrgCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
	const dbOrgDoc = dbOrgCollection.doc(orgId)
	const dbDevicesCollection = dbOrgDoc.collection(ORGS_DEVICE_COLLECTION_NAME)
	const dbDevicesQuery = dbDevicesCollection
		.orderBy("deviceName")
		.startAt(pageLowerLimit)
		.limit(10)
	
	const devicesResult = await dbDevicesQuery.get()
	let mappedDevices: GetDevicesResponse["orgDevices"] = []
	devicesResult.forEach((deviceDoc) => {
		const {id} = deviceDoc
		const docData = deviceDoc.data()
		const {deviceName, permissionLevel} = docData as DeviceInfo
		const deviceResponse = {
			deviceId: id,
			deviceName,
			permissionLevel
		}
		mappedDevices.push(deviceResponse)
	})
	res.status(200).json<GetDevicesResponse>({
		requestStatus: "SUCCESS",
		orgDevices: mappedDevices
	})
}

export default withMethodDispatcher<DevicesBodyDispatch, DevicesParamsDispatch>({
	POST: createDevice,
	GET: getDevices
})