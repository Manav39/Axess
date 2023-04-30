import {
	CustomApiRequest,
	CustomApiResponse,
	requireAuthenticatedUser,
	requireBodyParams,
	requireBodyValidators,
	requireMethods,
	requireMiddlewareChecks,
	requireQueryParams,
	requireQueryParamValidators,
	requireValidBody
} from "@/utils/customMiddleware";
import {AccessPointRequestBody, AccessPointRequestParams} from "@/utils/types/apiRequests";
import {IN_ARR, PASSTHROUGH, VALID_DEVICE_ID, VALID_ORG_ID} from "@/utils/validatorUtils";
import {db} from "@/utils/db";
import {
	createLogEvent,
	ORGS_DEVICE_COLLECTION_NAME,
	ORGS_DOC_COLLECTION_NAME,
	ORGS_USERS_COLLECTION_NAME
} from "@/utils/common";

export default async function accessLocation(req: CustomApiRequest<AccessPointRequestBody, AccessPointRequestParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("POST"),
			[requireValidBody.name]: requireValidBody(),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requireQueryParams.name]: requireQueryParams("orgId"),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				orgId: VALID_ORG_ID
			}),
			[requireBodyParams.name]: requireBodyParams("deviceId", "accessTimestamp", "actionType"),
			[requireBodyValidators.name]: requireBodyValidators({
				accessTimestamp: PASSTHROUGH,
				actionType: IN_ARR<AccessPointRequestBody["actionType"]>(["CHECK_IN", "CHECK_OUT"]),
				deviceId: VALID_DEVICE_ID(req.query.orgId)
			})
		}
	)
	
	if (!middlewareStatus) return
	
	const {orgId} = req.query
	const {accessTimestamp, actionType, deviceId} = req.body
	const {userUUID, permissionLevel: userPermissionLevel, userId} = req.user!
	
	
	const dbOrg = db.collection(ORGS_DOC_COLLECTION_NAME)
	const dbOrgDoc = dbOrg.doc(orgId)
	
	const dbOrgDocDevices = dbOrgDoc.collection(ORGS_DEVICE_COLLECTION_NAME)
	const dbOrgDocDeviceDoc = dbOrgDocDevices.doc(deviceId)
	const deviceDocData = await dbOrgDocDeviceDoc.get()
	const {permissionLevel: devicePermissionLevel, deviceName} = deviceDocData.data()!
	
	if (devicePermissionLevel > userPermissionLevel) {
		res.status(403).json({
			requestStatus: "ERR_INSUFFICIENT_PERMISSION"
		})
		return
	}
	
	const dbOrgDocUsers = dbOrgDoc.collection(ORGS_USERS_COLLECTION_NAME)
	const dbOrgDocUserDoc = dbOrgDocUsers.doc(userUUID)
	
	if (actionType === "CHECK_IN") {
		await dbOrgDocUserDoc.set({
			checkedIn: true,
			deviceName: deviceName
		}, {
			merge: true
		})
		
		await createLogEvent({
			eventType: "USER_CHECK_IN",
			createOrganizationLog: true,
			orgId: orgId,
			eventData: {
				userUUID: userUUID,
				permissionLevel: userPermissionLevel,
				userId: userId,
				accessTimestamp: accessTimestamp,
				deviceId: deviceId
			}
		})
		
		res.status(200).json({
			requestStatus: "SUCCESS"
		})
	} else {
		await dbOrgDocUserDoc.set({
			checkedIn: false,
			deviceName: null
		}, {
			merge: true
		})
		
		await createLogEvent({
			eventType: "USER_CHECK_OUT",
			createOrganizationLog: true,
			orgId: orgId,
			eventData: {
				userUUID: userUUID,
				permissionLevel: userPermissionLevel,
				userId: userId,
				accessTimestamp: accessTimestamp,
				deviceId: deviceId
			}
		})
		
		res.status(200).json({
			requestStatus: "SUCCESS"
		})
	}
}