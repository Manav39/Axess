import {CustomApiRequest, CustomApiResponse, requireMethods, requireMiddlewareChecks} from "@/utils/customMiddleware";
import {parse} from "csv-parse"
import {BulkCreateRequestParams} from "@/utils/types/apiRequests";
import {BulkUserData} from "@/utils/types";
import {v4} from "uuid";
import {db} from "@/utils/db";
import {createLogEvent, ORGS_DOC_COLLECTION_NAME, ORGS_USERS_COLLECTION_NAME} from "@/utils/common";
import {hash} from "bcryptjs";

export default async function createUsersBulk(req: CustomApiRequest<any, BulkCreateRequestParams>, res: CustomApiResponse) {
	const middlewareStatus = await requireMiddlewareChecks(
		req,
		res,
		{
			[requireMethods.name]: requireMethods("POST")
		}
	)
	const contentTypeHeader = req.headers["content-type"] as string | undefined
	if (contentTypeHeader === undefined) {
		res.status(400).json({
			requestStatus: "ERR_BODY_REQUIRED"
		})
		return
	} else if (!contentTypeHeader.startsWith("text/csv")) {
		res.status(400).json({
			requestStatus: "ERR_INVALID_BODY"
		})
		return
	}
	const bodyContent = req.body as unknown as string
	parse(
		bodyContent,
		async (err, records: any[][]) => {
			if (err) {
				console.error(err)
				res.status(500).json({
					requestStatus: "ERR_INTERNAL_ERROR"
				})
			} else {
				const userRecords: BulkUserData[] = []
				for (const recordRow of records) {
					if (recordRow.length < 3) {
						console.log(`Skipping ${JSON.stringify(recordRow)} due to incomplete data`)
						continue
					}
					let [userId, permissionLevel, userPass, ...others] = recordRow
					let parsedPermissionLevel = Number.parseInt(permissionLevel)
					parsedPermissionLevel = Number.isNaN(parsedPermissionLevel) ? (
						1
					) : ((parsedPermissionLevel < 0) ? 0 : parsedPermissionLevel)
					const userUUID = v4()
					const encryptedPass = await hash(
						userPass, 10
					)
					userRecords.push({
						userId: userId,
						userUUID: userUUID,
						permissionLevel: parsedPermissionLevel,
						userPassword: encryptedPass
					})
				}
				const {orgId} = req.query
				await Promise.all(userRecords.map(async (userRecord) => {
					const {userId, userUUID, permissionLevel, userPassword} = userRecord
					const dbOrg = db.collection(ORGS_DOC_COLLECTION_NAME)
					const dbDoc = dbOrg.doc(orgId)
					const usersCol = dbDoc.collection(ORGS_USERS_COLLECTION_NAME)
					const newUserDoc = usersCol.doc(userUUID)
					// @ts-ignore
					delete userRecord["userUUID"]
					const docResult = await newUserDoc.set({
						userId: userId,
						permissionLevel: permissionLevel,
						userPass: userPassword
					})
					
					await createLogEvent({
						eventType: "USER_CREATE",
						createOrganizationLog: true,
						orgId: orgId,
						eventData: {
							userId: userId,
							permissionLevel: permissionLevel,
							userUUID: userUUID
						}
					})
				}))
				res.status(200).json({
					requestStatus: "SUCCESS"
				})
			}
			
			
		}
	)
}