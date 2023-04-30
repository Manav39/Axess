import {LogEventArgs} from "@/utils/types";
import {uuidv4} from "@firebase/util";
import {db} from "@/utils/db";

export const SUDO_COLLECTION_NAME = "superusers" as const
export const LOGS_COLLECTION_NAME = "logs" as const
export const ORGS_DOC_COLLECTION_NAME = "orgs" as const
export const ORGS_USERS_COLLECTION_NAME = "users" as const
export const USER_ID_PROPERTY_NAME = "userId" as const
export const USER_PASS_PROPERTY_NAME = "userPass" as const
export const ORGS_DEVICE_COLLECTION_NAME = "devices" as const
export const DEVICE_NAME_PROPERTY_NAME = "deviceName" as const
export const ORGS_LOG_COLLECTION_NAME = "logs" as const

export async function createLogEvent(logEvent: LogEventArgs) {
	try {
		const {createOrganizationLog, ...eventDat} = logEvent
		
		const eventUUID = uuidv4()
		const logsCollection = db.collection(LOGS_COLLECTION_NAME)
		const logDoc = logsCollection.doc(eventUUID)
		await logDoc.set({
			...eventDat,
			eventTimestamp: new Date()
		})
		
		if (createOrganizationLog) {
			const {orgId} = logEvent
			const orgsCollection = db.collection(ORGS_DOC_COLLECTION_NAME)
			const orgDoc = orgsCollection.doc(orgId)
			const orgLogs = orgDoc.collection(ORGS_LOG_COLLECTION_NAME)
			const orgLogsDoc = orgLogs.doc(eventUUID)
			await orgLogsDoc.set({
				...eventDat,
				eventTimestamp: new Date()
			})
		}
	} catch (err) {
		return false
	}
}