import {Navbar, Spacer, Text} from "@nextui-org/react";
import {default as NextLink} from "next/link";

export default function App() {
	return (
		<div>
			<Navbar isCompact isBordered variant="sticky">
				<Navbar.Brand>
					<Text b color="inherit" hideIn="xs">
						AXESS
					</Text>
					<Spacer x={2}/>
					<Navbar.Content hideIn="xs" variant="underline">
						<NextLink href="/features">
							Features
						</NextLink>
						<NextLink href="/pricing">
							Pricing
						</NextLink>
					</Navbar.Content>
				</Navbar.Brand>
				<Navbar.Content>
					<NextLink href={"/auth/login"}>
						Login
					</NextLink>
				</Navbar.Content>
			</Navbar>
		</div>
	);
}
