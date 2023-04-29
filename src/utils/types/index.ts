export type LoggingEventType =
	`ORG_${
	"CREATE"
	}` |
	`USER_${
		"CREATE" | "DELETE" | "LOGIN"
	}` |
	`DEVICE_${
		"CREATE" | "DELETE" | "UPDATE"
	}` |
	`USER_${
		"ENTRY" | "EXIT"
	}` |
	`SUDO_${
		"LOGIN" | "LOGOUT"
	}`

export type LogEventArgs = ({
	eventType: "ORG_CREATE",
	eventData: {
		orgId: string
	}
} | {
	eventType: `USER_${
		"CREATE" | "DELETE" | "LOGIN" | "LOGOUT"
	}`,
	eventData: {
		userUUID: string,
		userId: string,
		permissionLevel: UserPermissionLevel
	}
} | {
	eventType: `DEVICE_${
		"CREATE" | "DELETE" | "UPDATE"
	}`
	eventData: {
		deviceUUID: string,
		deviceName: string,
		permissionLevel: UserPermissionLevel
	}
} | {
	eventType: `USER_${
		"ENTRY" | "EXIT"
	}`,
	eventData: {
		userUUID: string,
		userId: string,
		permissionLevel: UserPermissionLevel
	}
} | {
	eventType: `SUDO_${
		"LOGIN" | "LOGOUT"
	}`,
	eventData: {
		userUUID: string,
		userId: string,
		permissionLevel: UserPermissionLevel
	}
})

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
	"ERR_SUPERUSER_REQUIRED" |
	"ERR_INSUFFICIENT_PERMISSION" |
	"ERR_NOT_FOUND"

export interface APIResponse {
	requestStatus: APIResponseRequestStatus
	invalidParams?: string[],
	missingParams?: string[]
}

export interface DecodedJWTCookie {
	userUUID: string,
	userId: string,
	permissionLevel: UserPermissionLevel,
	tokenType: "SUDO" | "CLIENT"
}

export type AuthData = {
	isAuthenticated?: boolean,
	userId?: string,
	permissionLevel?: UserPermissionLevel
}

export type AuthContextType = AuthData & {
	updateAuthData: (newAuthData: AuthData) => void
}