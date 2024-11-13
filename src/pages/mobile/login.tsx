import React, { useCallback, useContext, useState, useEffect } from "react";
import { Button, Container, Input, Row, Spacer, Text } from "@nextui-org/react";
import { FaLock, FaUser } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { makeAPIRequest } from "@/utils/apiHandler";
import { LoginUserRequestBody, LoginUserRequestParams } from "@/utils/types/apiRequests";
import { LoginUserResponse } from "@/utils/types/apiResponses";
import { AuthContextType } from "@/utils/types";
import { AuthContext } from "../_app";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify"; // Correct import for ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

export default function LoginMobile(props: any) {
	useEffect(() => {
		props.setShowNavbar(false);
		return () => {
			props.setShowNavbar(true);
		};
	}, []);

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
		const { isSuccess, isError, code, data, error } = await makeAPIRequest<
			LoginUserResponse,
			LoginUserRequestBody,
			LoginUserRequestParams
		>({
			requestMethod: "POST",
			endpointPath: "/api/orgs/:orgId/auth/login",
			bodyParams: {
				userId: userName,
				userPass: password,
			},
			queryParams: {
				orgId: orgId,
			},
		});

		if (isError && error) {
			console.error(error);
			toast.error("Something went wrong! Please try again.", { position: "top-center" }); // Show error toast
			return;
		}

		if (isSuccess && data) {
			const { requestStatus } = data;
			if (requestStatus === "SUCCESS") {
				const { userId, permissionLevel } = data;
				AuthCtx.updateAuthData({
					isAuthenticated: true,
					userId: userName,
					permissionLevel: permissionLevel,
				});
				setInvalid((invalidData) => ({
					...invalidData,
					orgId: false,
					userId: false,
					userPass: false,
				}));
				toast.success("Login successful!", { position: "top-center" }); // Show success toast
				router.push("/");
			}

			if (requestStatus === "ERR_INVALID_QUERY_PARAMS") {
				setInvalid((invalidData) => ({
					...invalidData,
					orgId: true,
				}));
				toast.error("Invalid Organization ID!", { position: "top-center" }); // Show error toast
			}

			if (requestStatus === "ERR_INVALID_BODY_PARAMS") {
				setInvalid((invalidData) => ({
					...invalidData,
					userId: true,
					userPass: true,
				}));
				toast.error("Invalid Username or Password!", { position: "top-center" }); // Show error toast
			}

			if (requestStatus === "ERR_MISSING_BODY_PARAMS") {
				setMissing((missingParams) => ({
					...missingParams,
					userId: true,
					userPass: true,
				}));
				toast.error("Please enter both username and password!", { position: "top-center" }); // Show error toast
			}

			if (requestStatus === "ERR_MISSING_QUERY_PARAMS") {
				setMissing((missingParams) => ({
					...missingParams,
					orgId: true,
				}));
				toast.error("Please enter Organization ID!", { position: "top-center" }); // Show error toast
			}
		}
	}, [userName, orgId, password]);

	return (
		<>
			<Container
				display="flex"
				justify="center"
				css={{
					marginTop: "11rem",
					boxShadow: "0 0 10px rgba(0, 0, 0, 0.5);",
					borderRadius: "1rem",
					maxWidth: "15rem",
					padding: "2rem",
				}}
			>
				<Text h2 style={{ marginBottom: "2.5rem", color: "blue" }}>
					Login
				</Text>
				<Row justify="center">
					<GrOrganization size={42} />
					<Spacer x={1} />
					<Input
						placeholder="Enter Organization ID"
						width="30rem"
						value={orgId}
						onChange={(e) => setOrgId(e.target.value)}
					/>
				</Row>
				<Spacer x={2} />
				<Row justify="center">
					<FaUser size={40} />
					<Spacer x={1} />
					<Input
						placeholder="Enter Username"
						width="30rem"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</Row>
				<Spacer y={1} />
				<Row justify="center">
					<FaLock size={40} />
					<Spacer x={1} />
					<Input
						type="password"
						placeholder="Enter Password"
						width="30rem"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Row>
				<Spacer y={2} />
				<Row justify="center">
					<Button style={{ width: "35rem" }} onClick={attemptLogin}>
						Login
					</Button>
				</Row>
			</Container>

			{/* Corrected ToastContainer */}
			<ToastContainer />
		</>
	);
}
