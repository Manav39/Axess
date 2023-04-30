import {GetServerSideProps} from "next";
import {GetOrgDevicesParams, OrgIdCommonParam} from "@/utils/types/apiRequests";
import {NavbarControl} from "@/utils/types";
import {GetDevicesResponse} from "@/utils/types/apiResponses";
import {makeAPIRequest} from "@/utils/apiHandler";
import {AuthContext} from "@/pages/_app";
import Link from "next/link";
import {useContext} from "react";

export type DeviceList = {
	deviceList: GetDevicesResponse["orgDevices"]
}

export const getServerSideProps: GetServerSideProps<DeviceList, OrgIdCommonParam> = async (ctx) => {
	const {orgId} = ctx.params!
	let {devicePage} = ctx.query
	devicePage = devicePage || "1"
	const parsedDevicePage = Number.parseInt(devicePage as string)
	let finalDevicePage = parsedDevicePage < 1 ? 1 : parsedDevicePage
	const {isSuccess, isError, error, code, data} = await makeAPIRequest<GetDevicesResponse, {}, GetOrgDevicesParams>({
		requestMethod: "GET",
		endpointPath: "/api/orgs/:orgId/devices",
		queryParams: {
			orgId: orgId,
			devicePage: finalDevicePage.toString()
		},
		ssrContext: ctx
	})
	if (isSuccess && data) {
		const {requestStatus} = data
		if (requestStatus === "SUCCESS") {
			const {orgDevices} = data
			return {
				props: {deviceList: orgDevices}
			}
		}
		if (requestStatus === "ERR_AUTH_REQUIRED") {
			return {
				redirect: {
					destination: "/",
					permanent: false
				}
			}
		}
		return {
			notFound: true
		}
	}
	return {
		notFound: true
	}
}

export default function DeviceList(props: DeviceList & NavbarControl) {
	console.table(props.deviceList)
	
	const authctx = useContext(AuthContext)
	
	return (
		<ol>
			{
				props.deviceList.map((device) => {
					return (
						<li key={device.deviceId}>
							<Link
								href={`/orgs/${authctx.orgId!}/devices/${device.deviceId}`}
							>
								{device.deviceId}
							</Link>
						</li>
					)
				})
			}
		</ol>
	)
}