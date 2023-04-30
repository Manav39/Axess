import {GetServerSideProps} from "next";
import {GetOrgDevicesParams, OrgIdCommonParam} from "@/utils/types/apiRequests";
import {NavbarControl} from "@/utils/types";
import {GetDevicesResponse} from "@/utils/types/apiResponses";
import {makeAPIRequest} from "@/utils/apiHandler";

export type DeviceList = {
	deviceList: GetDevicesResponse
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
	}
}

export default function DeviceList(props: DeviceList & NavbarControl) {

}