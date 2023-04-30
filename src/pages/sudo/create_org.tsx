import React, {useCallback, useContext, useState} from "react";
import {Button, Container, Input, Row, Spacer, Text} from "@nextui-org/react";
import {FaLock, FaUser} from "react-icons/fa";
import {GrOrganization} from "react-icons/gr";
import {makeAPIRequest} from "@/utils/apiHandler";
import {CreateOrgBody} from "@/utils/types/apiRequests";
import {APIResponse, AuthContextType} from "@/utils/types";
import {AuthContext} from "../_app";
import {useRouter} from "next/router";

export default function CreateOrgPage() {
	const router = useRouter();
	const AuthCtx = useContext<AuthContextType>(AuthContext);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [orgId, setOrgId] = useState("");
	const [invalid, setInvalid] = useState({
		userId: false,
		userPass: false,
		orgId: false,
	});
	const [missing, setMissing] = useState({
		userId: false,
		userPass: false,
		orgId: false,
	});
	const attemptLogin = useCallback(async () => {
		const {isSuccess, isError, code, data, error} = await makeAPIRequest<
			APIResponse,
			CreateOrgBody,
			{}
		>({
			requestMethod: "POST",
			endpointPath: "/api/orgs",
			bodyParams: {
				orgName: orgId,
				adminCredentials: {
					userId: userName,
					userPass: password
				}
			},
		});
		if (isError && error) {
			console.error(error);
			return;
		}
		if (isSuccess && data) {
			const {requestStatus} = data;
			if (requestStatus === "SUCCESS") {
				setInvalid((invalidData) => {
					return {
						...invalidData,
						orgId: false,
						userId: false,
						userPass: false,
					};
				});
				router.push("/");
			}
			if (requestStatus === "ERR_INVALID_QUERY_PARAMS") {
				setInvalid((invalidData) => {
					return {
						...invalidData,
						orgId: true,
					};
				});
			}
			if (requestStatus === "ERR_INVALID_BODY_PARAMS") {
				setInvalid((invalidData) => {
					return {
						...invalidData,
						userId: true,
						userPass: true,
					};
				});
			}
			if (requestStatus === "ERR_MISSING_BODY_PARAMS") {
				setMissing((missingParams) => {
					return {
						...missingParams,
						userId: true,
						userPass: true,
					};
				});
			}
			if (requestStatus === "ERR_MISSING_QUERY_PARAMS") {
				setMissing((missingParams) => {
					return {
						...missingParams,
						orgId: true,
					};
				});
			}
		}
	}, [userName, orgId, password]);
	
	return (
		<>
			<Container
				display="flex"
				justify="center"
				css={{
					marginTop: "10vh",
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.5);",
					borderRadius: "1rem",
					width: "25rem",
					padding: "2rem",
				}}
			>
				<Text h2 style={{marginBottom: "2.5rem", color: "blue"}}>
					Create Org
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
						type="password"
						width="30rem"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Row>
				<Spacer y={2}/>
				<Row justify="center">
					<Button style={{width: "35rem"}} onClick={attemptLogin}>
						Create
					</Button>
				</Row>
			</Container>
		</>
	);
}
