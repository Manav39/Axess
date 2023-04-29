import { UserPermissionLevel } from "."

export type LoginUserRequestBody = {
	userId: string,
	userPass: string
}

export type LoginUserRequestParams = {
	orgId: string
}

//Login Device
export type LoginDeviceRequestBody = {
	deviceName: string,
	permissionLevel: UserPermissionLevel
}
export type LoginDeviceRequestParams = {
	orgId: string
}