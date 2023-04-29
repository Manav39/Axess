export type UserPointAccessType = "CHECK_IN" | "CHECK_OUT"
export type UserAreaAccessType = "ENTRY" | "EXIT"

export type UserAccessEvent = {
	deviceId: string,
	eventTimestamp: number,
	userId: string,
	accessType: UserPointAccessType
}

export enum UserPermissionLevel {
	GUEST,
	USER,
	STAFF,
	MAINTENANCE,
	ADMINISTRATOR,
	SUPERUSER
}

export type DeviceInfo = {
	deviceName: string,
	permissionLevel: UserPermissionLevel
}

export type APIResponseCode =
	0 | 200 | 400 | 403 | 404 | 500
type APIResponseRequestStatus =
// 2xx
	"SUCCESS" |
	// 3xx
	// 4xx
	"ERR_BODY_REQUIRED" |
	"ERR_INTERNAL_ERROR" |
	"ERR_INVALID_METHOD" |
	"ERR_INVALID_BODY_PARAMS" |
	"ERR_MISSING_BODY_PARAMS" |
	"ERR_INVALID_QUERY_PARAMS" |
	"ERR_MISSING_QUERY_PARAMS" |
	"ERR_AUTH_REQUIRED" |
	"ERR_INSUFFICIENT_PERMISSION" |
	"ERR_NOT_FOUND"

export interface APIResponse {
	requestStatus: APIResponseRequestStatus
	invalidParams?: string[],
	missingParams?: string[]
}

export interface DecodedJWTCookie {
	userId: string,
	permissionLevel: UserPermissionLevel
}