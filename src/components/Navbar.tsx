import { Navbar, Button, Link, Text, Spacer } from "@nextui-org/react";
export default function App() {
	return (
		<div>
			<Navbar isCompact isBordered variant="sticky">
				<Navbar.Brand>
					<Text b color="inherit" hideIn="xs">
						AXESS
					</Text>
					<Spacer x={2} />
					<Navbar.Content hideIn="xs" variant="underline">
						<Navbar.Link href="/features">Features</Navbar.Link>
						<Navbar.Link href="/pricing">Pricing</Navbar.Link>
					</Navbar.Content>
				</Navbar.Brand>

				<Navbar.Content>
					<Navbar.Link color="inherit" href="/auth/login">
						Login
					</Navbar.Link>
				</Navbar.Content>
			</Navbar>
		</div>
	);
}
