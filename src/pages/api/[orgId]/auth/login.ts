import {
	CustomApiRequest,
	CustomApiResponse,
	requireBodyParams,
	requireBodyValidators,
	requireMethods,
	requireMiddlewareChecks,
	requireQueryParams,
	requireQueryParamValidators,
	requireValidBody
} from "@/utils/customMiddleware";
import {LoginUserRequestBody, LoginUserRequestParams} from "@/utils/types/apiRequests";
import {db} from "@/utils/db";
import {STRLEN_NZ, VALID_ORG_ID} from "@/utils/validatorUtils";
import {
	ORGS_DOC_COLLECTION_NAME,
	ORGS_USERS_COLLECTION_NAME,
	USER_ID_PROPERTY_NAME,
	USER_PASS_PROPERTY_NAME
} from "@/utils/common";
import {LoginUserResponse} from "@/utils/types/apiResponses";
import {sign} from "jsonwebtoken";
import {DecodedJWTCookie} from "@/utils/types";

export default async function loginUser(req: CustomApiRequest<LoginUserRequestBody, LoginUserRequestParams>, res: CustomApiResponse) {
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
			[requireBodyParams.name]: requireBodyParams("userId", "userPass"),
			[requireBodyValidators.name]: requireBodyValidators({
				userId: STRLEN_NZ,
				userPass: STRLEN_NZ
			})
		}
	)
	
	if (middlewareStatus == false) {
		return
	}
	
	const {orgId} = req.query
	const {userId, userPass} = req.body
	
	const orgCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
	const orgDoc = orgCollection.doc(orgId)
	const orgUsersCollection = orgDoc.collection(ORGS_USERS_COLLECTION_NAME)
	const orgUserQuery = orgUsersCollection.where(
		USER_ID_PROPERTY_NAME,
		"==",
		userId
	).where(
		USER_PASS_PROPERTY_NAME,
		"==",
		userPass
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
	const {permissionLevel, userId: docUserId} = docData
	
	const signedCookie = sign(
		{
			permissionLevel: permissionLevel,
			userId: docUserId
		} satisfies DecodedJWTCookie,
		process.env.JWT_SECRET!
	)
	
	res.setHeader(
		"Set-Cookie",
		`axess-auth-token=${signedCookie}; HttpOnly; Path=/`
	).status(200).json<LoginUserResponse>({
		requestStatus: "SUCCESS",
		userId: docUserId,
		permissionLevel: permissionLevel
	})
	return
}