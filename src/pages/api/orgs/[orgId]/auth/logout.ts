import {
	CustomApiRequest,
	CustomApiResponse,
	requireAuthenticatedUser,
	requireMethods,
	requireMiddlewareChecks,
	requireQueryParams,
	requireQueryParamValidators,
	requireValidBody
} from "@/utils/customMiddleware";
import {VALID_ORG_ID} from "@/utils/validatorUtils";
import {LogoutUserRequestParams} from "@/utils/types/apiRequests";
import {createLogEvent} from "@/utils/common";

export default async function logoutUser(req: CustomApiRequest<{}, LogoutUserRequestParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("POST"),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requireValidBody.name]: requireValidBody(),
			[requireQueryParams.name]: requireQueryParams("orgId"),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				orgId: VALID_ORG_ID
			}),
		}
	)
	
	if (middlewareStatus == false) {
		return
	}
	
	const {userId, userUUID, permissionLevel, tokenType} = req.user!
	
	await createLogEvent({
		eventType: "USER_LOGOUT",
		eventData: {
			userId: userId,
			userUUID: userUUID,
			permissionLevel: permissionLevel
		}
	})
	
	res.setHeader(
		"Set-Cookie",
		`axess-auth-token=; HttpOnly; Path=/; Max-Age=0`
	).status(200).json({
		requestStatus: "SUCCESS"
	})
	return
}