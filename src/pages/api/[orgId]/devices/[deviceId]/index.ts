import {
	CustomApiRequest,
	CustomApiResponse,
	requireAuthenticatedUser,
	requireMethods,
	requireMiddlewareChecks,
	requirePermissionLevel,
	requireQueryParams,
	requireQueryParamValidators
} from "@/utils/customMiddleware";
import {DeleteDeviceParams} from "@/utils/types/apiRequests";
import {VALID_DEVICE_ID, VALID_ORG_ID} from "@/utils/validatorUtils";
import {UserPermissionLevel} from "@/utils/types";
import {db} from "@/utils/db";
import {ORGS_DEVICE_COLLECTION_NAME, ORGS_DOC_COLLECTION_NAME} from "@/utils/common";

type DeviceDispatchBodyMap = {
	DELETE: {}
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