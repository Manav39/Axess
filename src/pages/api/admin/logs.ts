import {
	CustomApiRequest,
	CustomApiResponse,
	requireAuthenticatedUser,
	requireMethods,
	requireMiddlewareChecks,
	requireQueryParamValidators,
	requireSuperuser
} from "@/utils/customMiddleware";
import {GetGlobalOrgsLogsParams} from "@/utils/types/apiRequests";
import {ALLOW_UNDEFINED_WITH_FN, NON_ZERO_NON_NEGATIVE, STRING_TO_NUM} from "@/utils/validatorUtils";
import {db} from "@/utils/db";
import {ORGS_LOG_COLLECTION_NAME} from "@/utils/common";
import {GetGlobalLogsResponse} from "@/utils/types/apiResponses";

export default async function getOrgLogs(req: CustomApiRequest<{}, GetGlobalOrgsLogsParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("GET"),
			[requireAuthenticatedUser.name]: requireAuthenticatedUser(),
			[requireSuperuser.name]: requireSuperuser(),
			[requireQueryParamValidators.name]: requireQueryParamValidators({
				logPage: ALLOW_UNDEFINED_WITH_FN(
					STRING_TO_NUM(
						NON_ZERO_NON_NEGATIVE
					)
				)
			}, true)
		}
	)
	
	if (!middlewareStatus) return
	
	let {logPage} = req.query
	logPage = logPage || "1"
	const parsedLogPage = Number.parseInt(logPage)
	const pageLowerLimit = ((parsedLogPage - 1) * 10)
	
	const dbLogCollection = db.collection(ORGS_LOG_COLLECTION_NAME)
	const logsQuery = dbLogCollection
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
	res.status(200).json<GetGlobalLogsResponse>({
		requestStatus: "SUCCESS",
		globalLogs: logsData
	})
}