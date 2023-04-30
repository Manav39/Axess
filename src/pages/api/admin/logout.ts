import {
	CustomApiRequest,
	CustomApiResponse,
	requireAuthenticatedUser,
	requireMethods,
	requireMiddlewareChecks,
	requireSuperuser,
	requireValidBody
} from "@/utils/customMiddleware";
import {createLogEvent} from "@/utils/common";

export default async function logoutAdmin(req: CustomApiRequest<{}>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("POST"),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requireSuperuser.name]: requireSuperuser(),
			[requireValidBody.name]: requireValidBody()
		}
	)
	
	if (middlewareStatus == false) {
		return
	}
	
	const {userId, userUUID, permissionLevel} = req.user!
	
	await createLogEvent({
		eventType: "SUDO_LOGOUT",
		eventData: {
			userId: userId,
			userUUID: userUUID,
			permissionLevel: permissionLevel
		},
		createOrganizationLog: false
	})
	
	res.setHeader(
		"Set-Cookie",
		`axess-auth-token=; HttpOnly; Path=/; Max-Age=0`
	).status(200).json({
		requestStatus: "SUCCESS"
	})
	return
}