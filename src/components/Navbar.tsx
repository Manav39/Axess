import {Button, Navbar, Spacer} from "@nextui-org/react";
import {default as NextLink} from "next/link";
import logo from "../assets/logo-removebg-preview.png";
import Image from "next/image";
import {AuthContext} from "@/pages/_app";
import {useContext} from "react";
import {AuthContextType, UserPermissionLevel} from "@/utils/types";

export default function App() {
	const AuthCtx = useContext<AuthContextType>(AuthContext);
	const attemptLogout = () => {
		AuthCtx.updateAuthData({
			isAuthenticated: false,
		});
	};
	return (
		<div>
			<Navbar isCompact variant="sticky" style={{color: "black", paddingBottom: "20px", paddingTop: "10px"}}>
				<Navbar.Brand>
					<NextLink href="/">
						{/* <Text h3 color="inherit" hideIn="xs" style={{ color: "black", marginTop: "5px" }}>
							AXESS
						</Text> */}
						<Image src={logo} alt="logo" height={150} style={{marginTop: "10px"}}/>
					</NextLink>
					<Spacer x={3}/>
					<Navbar.Content hideIn="xs" variant="underline">
						<NextLink href="/features" style={{color: "#212A3E", fontSize: "20px", fontWeight: "bold"}}>
							Features
						</NextLink>
						
						<NextLink href="/pricing" style={{color: "#212A3E", fontSize: "20px", fontWeight: "bold"}}>
							Pricing
						</NextLink>
					</Navbar.Content>
				</Navbar.Brand>
				<Navbar.Content>
					{!AuthCtx.isAuthenticated ? (
						<>
							<NextLink
								href={"/auth/login"}
								style={{
									fontSize: "20px",
									padding: "10px 20px",
									backgroundColor: "	#2edaff",
									color: "white",
									borderRadius: "20px",
									borderTop: "none",
									borderBottom: "none",
								}}
							>
								Login
							</NextLink>
							<NextLink
								href={"/mobile/login"}
								style={{
									fontSize: "20px",
									padding: "10px 20px",
									backgroundColor: "#6C9BCF",
									color: "white",
									borderRadius: "20px",
									borderTop: "none",
									borderBottom: "none",
								}}
							>
								Mobile Login
							</NextLink>
						</>
					) : (
						<>
							{(AuthCtx.permissionLevel === UserPermissionLevel.ADMINISTRATOR) ? (
								<NextLink
									href={`/orgs/${AuthCtx.orgId}/devices`}
									style={{color: "#212A3E", fontSize: "20px", fontWeight: "bold"}}
								>
									View Devices
								</NextLink>
							) : (
								null
							)}
							{(AuthCtx.permissionLevel === UserPermissionLevel.SUPERUSER) ? (
								<NextLink
									href={`/sudo/create_org`}
									style={{color: "#212A3E", fontSize: "20px", fontWeight: "bold"}}
								>
									Create Org
								</NextLink>
							) : (
								null
							)}
							<Button
								onClick={attemptLogout}
								style={{
									fontSize: "20px",
									padding: "10px 20px",
									backgroundColor: "#21daff",
									color: "white",
									borderRadius: "20px",
									borderTop: "none",
									borderBottom: "none",
								}}
							>
								Logout
							</Button>
						</>
					)}
				</Navbar.Content>
			</Navbar>
		</div>
	);
}
