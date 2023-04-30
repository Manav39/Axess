import { Navbar, Spacer, Text } from "@nextui-org/react";
import { default as NextLink } from "next/link";
import logo from "../assets/logo-removebg-preview.png";
import Image from "next/image";
export default function App() {
	return (
		<div>
			<Navbar isCompact variant="sticky" style={{ paddingBottom: "20px", paddingTop: "10px" }}>
				<Navbar.Brand>
					<NextLink href="/">
						{/* <Text h3 color="inherit" hideIn="xs" style={{ color: "black", marginTop: "5px" }}>
							AXESS
						</Text> */}
						<Image src={logo} alt="logo" height={150} style={{ marginTop: "10px" }} />
					</NextLink>
					<Spacer x={2} />
					<Navbar.Content hideIn="xs" variant="underline">
						<NextLink href="/features" style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
							Features
						</NextLink>
						<NextLink href="/pricing" style={{ color: "black", fontSize: "20px", fontWeight: "bold" }}>
							Pricing
						</NextLink>
					</Navbar.Content>
				</Navbar.Brand>
				<Navbar.Content>
					<NextLink
						href={"/auth/login"}
						style={{
							fontSize: "20px",
							padding: "10px 20px",
							backgroundColor: "blue",
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
				</Navbar.Content>
			</Navbar>
		</div>
	);
}
