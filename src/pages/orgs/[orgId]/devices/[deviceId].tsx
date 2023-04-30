import {NavbarControl, UserPermissionLevel} from "@/utils/types";
import {GetServerSideProps} from "next";
import {useContext, useEffect, useState} from "react";
import QRCode from "react-qr-code";
import {AuthContext} from "@/pages/_app";
import {Container, Text} from "@nextui-org/react";
import {makeAPIRequest} from "@/utils/apiHandler";
import {GetDeviceResponse} from "@/utils/types/apiResponses";
import {GetDeviceRequestBody, GetDeviceRequestParams} from "@/utils/types/apiRequests";

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
	const {orgId, deviceId} = ctx.params!;
	
	const {isSuccess, data} = await makeAPIRequest<GetDeviceResponse, GetDeviceRequestBody, GetDeviceRequestParams>({
		endpointPath: "/api/orgs/:orgId/devices/:deviceId",
		requestMethod: "GET",
		queryParams: {
			orgId: orgId,
			deviceId: deviceId
		},
		ssrContext: ctx
	})
	
	if (isSuccess && data) {
		const {requestStatus} = data
		if (requestStatus === "SUCCESS") {
			const {
				deviceData: {
					deviceId, deviceName, permissionLevel
				}
			} = data
			return {
				props: {
					orgId: orgId,
					deviceData: {
						deviceUUID: deviceId,
						deviceName: deviceName,
						permissionLevel: UserPermissionLevel.USER,
					}
				}
			}
		}
	}
	
	return {
		notFound: true
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
		deviceData: {deviceUUID, deviceName, permissionLevel},
	} = props;
	useEffect(() => {
		props.setShowNavbar(false);
		setQRValue(`https://axess.vercel.app/orgs/${orgId}/access?deviceId=${deviceUUID}&deviceName=${deviceName}`);
		return () => {
			props.setShowNavbar(true);
		};
	}, []);
	
	return (
		<>
			<Container display="flex" direction="row" justify="center" style={{marginTop: "200px"}}>
				<QRCode value={qrValue}/>
			</Container>
			<Text h2 style={{textAlign: "center"}}>
				{props.deviceData.deviceName}
			</Text>
		</>
	);
}
