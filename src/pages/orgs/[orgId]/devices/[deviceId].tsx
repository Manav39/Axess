import {NavbarControl, UserPermissionLevel} from "@/utils/types";
import {GetServerSideProps} from "next";
import {useEffect} from "react";

export type DeviceQRPageProps = {
	orgId: string,
	deviceData: {
		deviceUUID: string,
		deviceName: string,
		permissionLevel: UserPermissionLevel
	}
}

type DeviceQRCodePageQuery = {
	orgId: string,
	deviceId: string
}

export const getServerSideProps: GetServerSideProps<DeviceQRPageProps, DeviceQRCodePageQuery> = async (ctx) => {
	const {orgId, deviceId} = ctx.params!
	
	return {
		props: {
			orgId: orgId,
			deviceData: {
				deviceUUID: deviceId,
				deviceName: "Some Device",
				permissionLevel: UserPermissionLevel.USER
			}
		}
	}
}

export default function DeviceQRPage(props: DeviceQRPageProps & NavbarControl) {
	const {
		orgId,
		deviceData: {
			deviceUUID, deviceName, permissionLevel
		}
	} = props
	useEffect(() => {
		props.setShowNavbar(false);
		return () => {
			props.setShowNavbar(true)
		}
	}, [])
	
	
}