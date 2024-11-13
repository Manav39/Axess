import { NavbarControl, UserPermissionLevel } from "@/utils/types";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { AuthContext } from "@/pages/_app";
import { Container, Text, Card, Row, Col } from "@nextui-org/react";
import { makeAPIRequest } from "@/utils/apiHandler";
import { GetDeviceResponse } from "@/utils/types/apiResponses";
import { GetDeviceRequestBody, GetDeviceRequestParams } from "@/utils/types/apiRequests";

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

	const { isSuccess, data } = await makeAPIRequest<GetDeviceResponse, GetDeviceRequestBody, GetDeviceRequestParams>({
		endpointPath: "/api/orgs/:orgId/devices/:deviceId",
		requestMethod: "GET",
		queryParams: {
			orgId: orgId,
			deviceId: deviceId,
		},
		ssrContext: ctx,
	});

	if (isSuccess && data) {
		const { requestStatus } = data;
		if (requestStatus === "SUCCESS") {
			const {
				deviceData: { deviceId, deviceName, permissionLevel },
			} = data;
			return {
				props: {
					orgId: orgId,
					deviceData: {
						deviceUUID: deviceId,
						deviceName: deviceName,
						permissionLevel: UserPermissionLevel.USER,
					},
				},
			};
		}
	}

	return {
		notFound: true,
	};
};

export default function DeviceQRPage(props: DeviceQRPageProps & NavbarControl) {
	const [qrValue, setQRValue] = useState(``);
	const AuthCtx = useContext(AuthContext);
	console.log(AuthCtx);

	const {
		orgId,
		deviceData: { deviceUUID, deviceName, permissionLevel },
	} = props;

	useEffect(() => {
		props.setShowNavbar(false);
		setQRValue(`https://axess.vercel.app/orgs/${orgId}/access?deviceId=${deviceUUID}&deviceName=${deviceName}`);
		return () => {
			props.setShowNavbar(true);
		};
	}, []);

	return (
		<Container
			display="flex"
			justify="center"
			alignItems="center"
			direction="column"
			css={{
				height: "100vh",
				padding: "0 2rem",
				backgroundColor: "#f5f5f5",
				textAlign: "center",
			}}
		>
			<Card
				css={{
					maxWidth: "400px",
					padding: "2rem",
					borderRadius: "15px",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					background: "white",
				}}
			>
				<Card.Header>
					<Text h3 color="primary">
						Scan the QR Code to Axess
					</Text>
				</Card.Header>
				<Card.Body>
					<Row justify="center">
						<QRCode value={qrValue} size={256} />
					</Row>
					<Text h4 css={{ marginTop: "1rem", color: "#333" }}>
						Device: {deviceName}
					</Text>
				</Card.Body>
				<Card.Footer>
					<Text small css={{ color: "#666" }}>
						Permission Level: {permissionLevel}
					</Text>
				</Card.Footer>
			</Card>
		</Container>
	);
}
