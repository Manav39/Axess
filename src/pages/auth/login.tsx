import React, {useCallback, useState} from "react";
import {Button, Container, Input, Row, Spacer, Text} from "@nextui-org/react";
import {FaLock, FaUser} from "react-icons/fa";
import {GrOrganization} from "react-icons/gr";
import {makeAPIRequest} from "@/utils/apiHandler";
import {LoginUserRequestBody, LoginUserRequestParams} from "@/utils/types/apiRequests";
import {LoginUserResponse} from "@/utils/types/apiResponses";

export default function LoginPage() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [orgId, setOrgId] = useState("");
	
	const attemptLogin = useCallback(async () => {
		const {
			isSuccess,
			isError,
			code,
			data,
			error
		} = await makeAPIRequest<LoginUserResponse, LoginUserRequestBody, LoginUserRequestParams>({
			requestMethod: "POST",
			endpointPath: "/api/:orgId/users/login",
			bodyParams: {
				userId: userName,
				userPass: password
			},
			queryParams: {
				orgId: orgId
			}
		})
		if (isError && error) {
			console.error(error)
			return
		}
		if (isSuccess && data) {
			const {requestStatus} = data
			if (requestStatus === "SUCCESS") {
				const {userId, permissionLevel} = data
				// AuthCtx. updateData(...)
			}
		}
	}, [userName, password, orgId])
	
	return (
		<>
			<Container
				display="flex"
				justify="center"
				css={{
					marginTop: "11rem",
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.5);",
					borderRadius: "1rem",
					width: "25rem",
					padding: "2rem",
				}}
			>
				<Text h2 style={{marginBottom: "2.5rem", color: "blue"}}>
					Login
				</Text>
				<Row justify="center">
					<GrOrganization size={42}/>
					<Spacer x={1}/>
					<Input
						placeholder="Enter Organization ID"
						width="30rem"
						value={orgId}
						onChange={(e) => setOrgId(e.target.value)}
					/>
				</Row>
				<Spacer x={2}/>
				<Row justify="center">
					<FaUser size={40}/>
					<Spacer x={1}/>
					<Input
						placeholder="Enter Username"
						width="30rem"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</Row>
				<Spacer y={1}/>
				<Row justify="center">
					<FaLock size={40}/>
					<Spacer x={1}/>
					<Input
						placeholder="Enter Password"
						width="30rem"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Row>
				<Spacer y={2}/>
				<Row justify="center">
					<Button style={{width: "35rem"}}>Login</Button>
				</Row>
			</Container>
		</>
	);
};
