import {
	CustomApiRequest,
	CustomApiResponse,
	requireBodyParams,
	requireBodyValidators,
	requireMethods,
	requireMiddlewareChecks,
	requireValidBody
} from "@/utils/customMiddleware";
import {db} from "@/utils/db";
import {STRLEN_NZ} from "@/utils/validatorUtils";
import {createLogEvent, SUDO_COLLECTION_NAME, USER_ID_PROPERTY_NAME} from "@/utils/common";
import {LoginUserResponse} from "@/utils/types/apiResponses";
import {sign} from "jsonwebtoken";
import {DecodedJWTCookie, UserPermissionLevel} from "@/utils/types";
import {LoginAdminRequestBody} from "@/utils/types/apiRequests";
import {compare} from "bcryptjs";

export default async function loginUser(req: CustomApiRequest<LoginAdminRequestBody>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("POST"),
			[requireValidBody.name]: requireValidBody(),
			[requireBodyParams.name]: requireBodyParams("userId", "userPass", "adminSecret"),
			[requireBodyValidators.name]: requireBodyValidators({
				userId: STRLEN_NZ,
				userPass: STRLEN_NZ,
				adminSecret: (adminSecret: string) => {
					return process.env.ADMIN_SECRET === adminSecret
				}
			})
		}
	)
	
	if (middlewareStatus == false) {
		return
	}
	
	const {orgId} = req.query
	const {userId, userPass} = req.body
	
	const orgCollection = db.collection(SUDO_COLLECTION_NAME)
	const orgUserQuery = orgCollection.where(
		USER_ID_PROPERTY_NAME,
		"==",
		userId
	)
	const queryResponse = await orgUserQuery.get()
	if (queryResponse.empty) {
		res.status(200).json({
			requestStatus: "ERR_INVALID_BODY_PARAMS",
			invalidParams: ["userId", "userPass"]
		})
		return
	}
	
	const selectedDoc = queryResponse.docs[0]
	const docId = selectedDoc.id;
	const docData = selectedDoc.data()
	const {userId: docUserId, userPass: dbPass} = docData
	
	const passwordMatch = await compare(
		userPass,
		dbPass
	)
	
	if (!passwordMatch) {
		res.status(400).json({
			requestStatus: "ERR_INVALID_BODY_PARAMS",
			invalidParams: ["userPass"]
		})
		return
	}
	
	const signedCookie = sign(
		{
			permissionLevel: UserPermissionLevel.SUPERUSER,
			userId: docUserId,
			userUUID: docId,
			tokenType: "SUDO"
		} as DecodedJWTCookie,
		process.env.JWT_SECRET!
	)
	
	await createLogEvent({
		eventType: "SUDO_LOGIN",
		eventData: {
			userId: docUserId,
			userUUID: docId,
			permissionLevel: UserPermissionLevel.SUPERUSER,
		},
		createOrganizationLog: false
	})
	
	res.setHeader(
		"Set-Cookie",
		`axess-auth-token=${signedCookie}; HttpOnly; Path=/`
	).status(200).json<LoginUserResponse>({
		requestStatus: "SUCCESS",
		userId: docUserId,
		permissionLevel: UserPermissionLevel.SUPERUSER
	})
	return
}