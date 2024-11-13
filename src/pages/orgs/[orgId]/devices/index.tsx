import { GetServerSideProps } from "next";
import { GetOrgDevicesParams, OrgIdCommonParam } from "@/utils/types/apiRequests";
import { NavbarControl } from "@/utils/types";
import { GetDevicesResponse } from "@/utils/types/apiResponses";
import { makeAPIRequest } from "@/utils/apiHandler";
import { AuthContext } from "@/pages/_app";
import Link from "next/link";
import { useContext } from "react";
import { Card, Text, Row, Col, Image, Spacer } from "@nextui-org/react"; // Import necessary NextUI components

export type DeviceList = {
	deviceList: GetDevicesResponse["orgDevices"];
};

export const getServerSideProps: GetServerSideProps<DeviceList, OrgIdCommonParam> = async (ctx) => {
	const { orgId } = ctx.params!;
	let { devicePage } = ctx.query;
	devicePage = devicePage || "1";
	const parsedDevicePage = Number.parseInt(devicePage as string);
	let finalDevicePage = parsedDevicePage < 1 ? 1 : parsedDevicePage;
	const { isSuccess, isError, error, code, data } = await makeAPIRequest<GetDevicesResponse, {}, GetOrgDevicesParams>(
		{
			requestMethod: "GET",
			endpointPath: "/api/orgs/:orgId/devices",
			queryParams: {
				orgId: orgId,
				devicePage: finalDevicePage.toString(),
			},
			ssrContext: ctx,
		}
	);

	if (isSuccess && data) {
		const { requestStatus } = data;
		if (requestStatus === "SUCCESS") {
			const { orgDevices } = data;
			return {
				props: { deviceList: orgDevices },
			};
		}
		if (requestStatus === "ERR_AUTH_REQUIRED") {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}
		return {
			notFound: true,
		};
	}

	return {
		notFound: true,
	};
};

export default function DeviceList(props: DeviceList & NavbarControl) {
	console.table(props.deviceList);

	const authctx = useContext(AuthContext);

	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", marginTop: "20px" }}>
			{props.deviceList.map((device) => {
				return (
					<Card
						key={device.deviceId}
						css={{ w: "300px", p: "1rem", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
					>
						<Card.Header>
							<Row justify="center" align="center">
								<Image
									src="https://storage.googleapis.com/website-153109.appspot.com/blog/images/qrconcept.png" // Use a default image if deviceImage is not available
									alt={device.deviceId}
									width={100}
									height={100}
									objectFit="cover"
								/>
							</Row>
						</Card.Header>
						<Card.Body>
							<Text h4>{device.deviceName}</Text>
							<Text h6>Permission Level - {device.permissionLevel}</Text>
							<Spacer y={1} />
							<Text small>Device ID: {device.deviceId}</Text>
						</Card.Body>
						<Card.Footer>
							<Row justify="center">
								<Link href={`/orgs/${authctx.orgId!}/devices/${device.deviceId}`} passHref>
									<Text color="primary" style={{ cursor: "pointer" }}>
										View Details
									</Text>
								</Link>
							</Row>
						</Card.Footer>
					</Card>
				);
			})}
		</div>
	);
}
