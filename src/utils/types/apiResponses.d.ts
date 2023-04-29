import {APIResponse, UserPermissionLevel} from "@/utils/types/";

export interface LoginUserResponse extends APIResponse {
	userId: string,
	permissionLevel: UserPermissionLevel
}

export interface LoginDeviceResponse extends APIResponse {
	deviceName: string,
	permissionLevel: UserPermissionLevel
}