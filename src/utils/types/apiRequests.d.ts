import {UserPermissionLevel} from "."

export type OrgIdCommonParam = {
	orgId: string
}
export type LoginUserRequestBody = {
	userId: string,
	userPass: string
}

export type LoginUserRequestParams = OrgIdCommonParam

export type DeleteDeviceParams = OrgIdCommonParam & {
	deviceId: string
}

//Login Device
export type CreateDeviceRequestBody = {
	deviceName: string,
	permissionLevel: UserPermissionLevel
}

export type CreateDeviceRequestParams = OrgIdCommonParam

export type UpdateDeviceRequestBody = {
	deviceName: string,
	permissionLevel: UserPermissionLevel
}

export type UpdateDeviceRequestParams = OrgIdCommonParam & {
	deviceId: string
}

export type GetOrgDevicesParams = OrgIdCommonParam & {
	devicePage?: string
}