import {
	CustomApiRequest,
	CustomApiResponse,
	requireAuthenticatedUser,
	requireMethods,
	requireMiddlewareChecks,
	requirePermissionLevel,
	requireQueryParamValidators
} from "@/utils/customMiddleware";
import {GetOrgLogsParams} from "@/utils/types/apiRequests";
import {UserPermissionLevel} from "@/utils/types";
import {ALLOW_UNDEFINED_WITH_FN, NON_ZERO_NON_NEGATIVE, STRING_TO_NUM, VALID_ORG_ID} from "@/utils/validatorUtils";
import {db} from "@/utils/db";
import {ORGS_DOC_COLLECTION_NAME, ORGS_LOG_COLLECTION_NAME} from "@/utils/common";
import {GetOrgLogsResponse} from "@/utils/types/apiResponses";

export default async function getOrgLogs(req: CustomApiRequest<{}, GetOrgLogsParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("GET"),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requirePermissionLevel.name]: requirePermissionLevel(UserPermissionLevel.ADMINISTRATOR),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				orgId: VALID_ORG_ID,
				logPage: ALLOW_UNDEFINED_WITH_FN(
					STRING_TO_NUM(
						NON_ZERO_NON_NEGATIVE
					)
				)
			}, true)
		}
	)
	
	if (!middlewareStatus) return
	
	let {orgId, logPage} = req.query
	logPage = logPage || "1"
	const parsedLogPage = Number.parseInt(logPage)
	const pageLowerLimit = ((parsedLogPage - 1) * 10)
	
	const dbOrgCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
	const dbOrgDoc = dbOrgCollection.doc(orgId)
	const dbOrgLogsCollection = dbOrgDoc.collection(ORGS_LOG_COLLECTION_NAME)
	const logsQuery = dbOrgLogsCollection
		.orderBy("eventTimestamp")
		.startAt(pageLowerLimit)
		.limit(10)
	
	const logsResponse = await logsQuery.get()
	let logsData = logsResponse.docs.map((logData) => {
		const logId = logData.id
		const data = logData.data()
		return ({
			"logId": logId,
			...data
		})
	})
	res.status(200).json<GetOrgLogsResponse>({
		requestStatus: "SUCCESS",
		orgLogs: logsData
	})
}