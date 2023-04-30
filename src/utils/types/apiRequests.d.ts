import {UserPermissionLevel} from "."

export type OrgIdCommonParam = {
	orgId: string
}
export type LoginUserRequestBody = {
	userId: string,
	userPass: string
}

export type LoginUserRequestParams = OrgIdCommonParam

export type LogoutUserRequestParams = OrgIdCommonParam

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

export type CreateOrgBody = {
	orgName: string,
	adminCredentials: {
		userId: string,
		userPass: string
	}
}

export type LoginAdminRequestBody = {
	userId: string,
	userPass: string,
	adminSecret: string
}

export type BulkCreateRequestParams = OrgIdCommonParam

export type AccessPointRequestBody = {
	deviceId: string,
	accessTimestamp: string
	actionType: "CHECK_IN" | "CHECK_OUT"
}

export type AccessPointRequestParams = OrgIdCommonParam

export type GetOrgLogsParams = OrgIdCommonParam & {
	logPage?: string
}

export type GetGlobalOrgsLogsParams = {
	logPage?: string
}

export type GetDeviceRequestBody = {}

export type GetDeviceRequestParams = OrgIdCommonParam & {
	deviceId: string
}