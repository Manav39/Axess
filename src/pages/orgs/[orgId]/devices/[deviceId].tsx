import { NavbarControl, UserPermissionLevel } from "@/utils/types";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { AuthContext } from "@/pages/_app";
import { useContext } from "react";
export type DeviceQRPageProps = {
	orgId: string;
	deviceData: {
		deviceUUID: string;
		deviceName: string;
		permissionLevel: UserPermissionLevel;
	};
};

type DeviceQRCodePageQuery = {
	orgId: string;
	deviceId: string;
};

export const getServerSideProps: GetServerSideProps<DeviceQRPageProps, DeviceQRCodePageQuery> = async (ctx) => {
	const { orgId, deviceId } = ctx.params!;

	return {
		props: {
			orgId: orgId,
			deviceData: {
				deviceUUID: deviceId,
				deviceName: "Some Device",
				permissionLevel: UserPermissionLevel.USER,
			},
		},
	};
};

export default function DeviceQRPage(props: DeviceQRPageProps & NavbarControl) {
	const [qrValue, setQRValue] = useState(``);
	const AuthCtx = useContext(AuthContext);
	console.log(AuthCtx);
	//[7:36 am, 30/04/2023] Arnav Deo: https://axess.vercel.app/orgs/:orgId/access?deviceId=<UUID Goes Here>
	//[7:36 am, 30/04/2023] Arnav Deo: &deviceName=<Human Friendly Device Name></Human>
	const {
		orgId,
		deviceData: { deviceUUID, deviceName, permissionLevel },
	} = props;
	useEffect(() => {
		props.setShowNavbar(false);
		setQRValue(
			`https://axess.vercel.app/orgs/${AuthCtx.orgId}/access?deviceId=${deviceUUID}&deviceName=${deviceName}`
		);
		return () => {
			props.setShowNavbar(true);
		};
	}, []);

	return <QRCode value={qrValue} />;
}
