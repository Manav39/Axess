import {
	CustomApiRequest,
	CustomApiResponse,
	requireBodyParams,
	requireBodyValidators,
	requireMethods,
	requireMiddlewareChecks,
	requireQueryParams,
	requireQueryParamValidators,
	requireValidBody,
} from "@/utils/customMiddleware";
import {CreateDeviceRequestBody, CreateDeviceRequestParams} from "@/utils/types/apiRequests";
import {db} from "@/utils/db";
import {ORGS_DEVICE_COLLECTION_NAME, ORGS_DOC_COLLECTION_NAME} from "@/utils/common";
import {GT_MIN_LT_MAX, STRLEN_NZ, VALID_ORG_ID} from "@/utils/validatorUtils";
import {UserPermissionLevel} from "@/utils/types";
import {v4 as uuidv4} from "uuid"
import {CreateDeviceResponse} from "@/utils/types/apiResponses";

export default async function createDevice(req: CustomApiRequest<CreateDeviceRequestBody, CreateDeviceRequestParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("POST"),
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
	res.status(200).json<CreateDeviceResponse>({
		requestStatus: "SUCCESS",
		deviceId: deviceUUID
	})
}
