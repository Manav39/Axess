import {
	CustomApiRequest,
	CustomApiResponse,
	requireMethods,
	requireMiddlewareChecks,
	requireQueryParams,
	requireQueryParamValidators,
	requireValidBody,
	requireBodyParams,
	requireBodyValidators,
} from "@/utils/customMiddleware";
import {LoginDeviceRequestBody, LoginDeviceRequestParams} from "@/utils/types/apiRequests";
import {db} from "@/utils/db";
import {
	ORGS_DOC_COLLECTION_NAME,
	ORGS_DEVICE_COLLECTION_NAME,
	DEVICE_NAME_PROPERTY_NAME
} from "@/utils/common";
import {LT_MIN_GT_MAX, STRLEN_NZ, VALID_ORG_ID} from "@/utils/validatorUtils";
import {LoginDeviceResponse} from "@/utils/types/apiResponses";
import { UserPermissionLevel } from "@/utils/types";

export default async function loginDevice(req: CustomApiRequest<LoginDeviceRequestBody, LoginDeviceRequestParams>, res: CustomApiResponse) {
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
				permissionLevel: LT_MIN_GT_MAX(UserPermissionLevel.GUEST, UserPermissionLevel.SUPERUSER)
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
	const orgDeviceQuery = orgDeviceCollection.where(
		DEVICE_NAME_PROPERTY_NAME,
		"==",
		deviceName
	)
	
}
