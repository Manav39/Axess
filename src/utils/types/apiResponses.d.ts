import {APIResponse, UserPermissionLevel} from "@/utils/types/";

export interface LoginUserResponse extends APIResponse {
	userId: string,
	permissionLevel: UserPermissionLevel
}