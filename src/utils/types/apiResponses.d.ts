import {APIResponse, DeviceInfo, UserPermissionLevel} from "@/utils/types/";

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