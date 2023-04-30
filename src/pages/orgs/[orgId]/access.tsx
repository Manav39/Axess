import {useRouter} from "next/router";
import {useContext} from "react";
import {AuthContext} from "@/pages/_app";
import {makeAPIRequest} from "@/utils/apiHandler";
import {AccessPointRequestBody, AccessPointRequestParams} from "@/utils/types/apiRequests";
import {APIResponse} from "@/utils/types";
import {Button, Container} from "@nextui-org/react";

export default function AccessDevice(): JSX.Element {
	const router = useRouter()
	const {orgId, deviceId, deviceName} = router.query
	if (!deviceId || !deviceName) {
	}
	
	const authCtx = useContext(AuthContext)
	
	const makeReq = async (action: `CHECK_${"IN" | "OUT"}`) => {
		const {isSuccess, data} = await makeAPIRequest<APIResponse, AccessPointRequestBody, AccessPointRequestParams>({
			requestMethod: "POST",
			endpointPath: "/api/orgs/:orgId/access",
			queryParams: {
				orgId: orgId as string
			},
			bodyParams: {
				deviceId: deviceId as string,
				actionType: action,
				accessTimestamp: (new Date()).toString()
			}
		})
		if (isSuccess && data) {
			const {requestStatus} = data
			if (requestStatus === "SUCCESS") {
			}
		}
	}
	
	return (
		<Container
			css={{
				width: "100vw",
				height: "90vh",
				gap: 24
			}}
			display={"flex"}
			justify={"center"}
			alignItems={"center"}
			direction={"column"}
		>
			<h2>
				{deviceName}
			</h2>
			<Button
				onClick={() => makeReq("CHECK_IN")}
			>
				Check In
			</Button>
			<Button
				onClick={() => makeReq("CHECK_OUT")}
			>
				Check Out
			</Button>
		</Container>
	)
}