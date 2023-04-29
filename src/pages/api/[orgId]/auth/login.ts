import {
	CustomApiRequest,
	CustomApiResponse,
	requireMethods,
	requireMiddlewareChecks,
	requireQueryParams,
	requireQueryParamValidators,
	requireValidBody
} from "@/utils/customMiddleware";
import {LoginUserRequestBody, LoginUserRequestParams} from "@/utils/types/apiRequests";
import {db} from "@/utils/db";

export default async function loginUser(req: CustomApiRequest<LoginUserRequestBody, LoginUserRequestParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("POST"),
			[requireValidBody.name]: requireValidBody(),
			[requireQueryParams.name]: requireQueryParams("orgId"),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				orgId: async (orgId) => {
					const orgCollection = db.collection("orgs")
					const orgDocRef = orgCollection.doc(orgId)
					const orgDocData = await orgDocRef.get()
					if (orgDocData.exists === false) {
						return false
					}
					return true
				}
			})
		}
	)
}