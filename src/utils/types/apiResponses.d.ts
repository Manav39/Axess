import {APIResponse, DecodedJWTCookie, DeviceInfo, UserPermissionLevel} from "@/utils/types/";

export interface LoginUserResponse extends APIResponse {
	userId: string,
	permissionLevel: UserPermissionLevel
}

export interface CreateDeviceResponse extends APIResponse {
	deviceId: string
}

export interface GetDevicesResponse extends APIResponse {
	orgDevices: (
		DeviceInfo & {
		deviceId: string
	}
		)[]
}

export interface AuthCheckResponse extends APIResponse {
	authStatus: "NO_AUTH" | "AUTH_SUCCESS",
	authData?: DecodedJWTCookie
}


export interface GetOrgLogsResponse extends APIResponse {
	orgLogs: any[]
}

export interface GetGlobalLogsResponse extends APIResponse {
	globalLogs: any[]
}

export type GetDeviceResponse = APIResponse & {
	deviceData: DeviceInfo & {
		deviceId: string
	}
}