import {CustomApiRequest, CustomApiResponse, requireMethods, requireMiddlewareChecks} from "@/utils/customMiddleware";
import {AuthCheckResponse} from "@/utils/types/apiResponses";
import {verify} from "jsonwebtoken";
import {DecodedJWTCookie} from "@/utils/types";

export default async function authCheck(req: CustomApiRequest, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("POST")
		}
	)
	if (!middlewareStatus) {
		return
	}
	const cookieHeader = req.cookies["axess-auth-token"]
	
	if (cookieHeader === undefined) {
		res.status(200).json<AuthCheckResponse>({
			requestStatus: "SUCCESS",
			authStatus: "NO_AUTH"
		})
		return
	}
	
	try {
		const decodedCookie = verify(
			cookieHeader!,
			process.env.JWT_SECRET!
		) as DecodedJWTCookie
		res.status(200).json<AuthCheckResponse>({
			authStatus: "AUTH_SUCCESS",
			requestStatus: "SUCCESS",
			authData: decodedCookie
		})
	} catch (err) {
		res.status(500).json({
			requestStatus: "ERR_INTERNAL_ERROR"
		})
	}
}