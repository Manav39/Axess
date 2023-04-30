import React from "react";
import {Card, Col, Container, Row, Spacer, Text} from "@nextui-org/react";
import Image from "next/image";

export default function App() {
	return (
		<>
			<Container
				display="flex"
				direction="column"
				
				style={{marginTop: "50px", paddingLeft: "0px", paddingRight: "0px", textAlign: "center"}}
			>
				<Text h2>Our Features</Text>
				<Spacer y={1}/>
				
				
				<Row gap={1}>
					<Col>
						<Card>
							<Card.Header style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
								<Image src="/images/f1.jpeg" alt="" width={50} height={50}/>
							</Card.Header>
							<Card.Body>
								<Text h3 style={{textAlign: "center"}}>
									Authentication
								</Text>
								<Text h5 style={{textAlign: "center", marginRight: "auto", marginLeft: "auto"}}>
									In a QR-based access management system, authentication refers to the process of
									verifying the identity of a user who is trying to access a resource or service. The
									user scans the QR code using their smartphone, and the system verifies their
									identity before granting access.
								</Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Header style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
								<Image src="/images/f2.jpeg" alt="" width={50} height={50}/>
							</Card.Header>
							<Card.Body>
								<Text h3 style={{textAlign: "center"}}>
									Audit trails
								</Text>
								<Text h5 style={{marginRight: "auto", marginLeft: "auto"}}>
									An audit trail is a record of all the events that occur within the access management
									system. This includes details of user logins, access requests, and any changes to
									permissions or settings. An audit trail is essential for tracking user activity and
									identifying any security breaches or anomalies.
								</Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Header style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
								<Image src="/images/f3.jpeg" alt="" width={50} height={50}/>
							</Card.Header>
							<Card.Body>
								<Text h3 style={{textAlign: "center"}}>
									Scalability
								</Text>
								<Text h5 style={{marginRight: "auto", marginLeft: "auto"}}>
									Scalability refers to the ability of the access management system to handle
									increasing numbers of users and resources without compromising performance or
									security. A QR-based access management system should be designed to scale easily as
									the organization grows or its needs change.
								</Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Spacer y={2}/>
				<Row gap={1}>
					<Col>
						<Card>
							<Card.Header style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
								<Image src="/images/f4.jpeg" alt="" width={50} height={50}/>
							</Card.Header>
							<Card.Body>
								<Text h3 style={{textAlign: "center"}}>
									Customization
								</Text>
								<Text h5 style={{marginRight: "auto", marginLeft: "auto"}}>
									Customization refers to the ability to tailor the access management system to meet
									the specific needs of the organization. This includes the ability to configure
									permissions, add new users and resources, and customize the user interface and
									branding.
								</Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Header style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
								<Image src="/images/f5.jpeg" alt="" width={50} height={50}/>
							</Card.Header>
							<Card.Body>
								<Text h3 style={{textAlign: "center"}}>
									Ease of use
								</Text>
								<Text h5 style={{marginRight: "auto", marginLeft: "auto"}}>
									Ease of use refers to the user experience of the access management system. The
									system should be easy to navigate and use, with clear instructions and minimal user
									friction. This will help to ensure that users are able to access the resources they
									need quickly and efficiently.
								</Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Header style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
								<Image src="/images/f6.jpeg" alt="" width={50} height={50}/>
							</Card.Header>
							<Card.Body>
								<Text h3 style={{textAlign: "center"}}>
									Authorization
								</Text>
								<Text h5 style={{marginRight: "auto", marginLeft: "auto"}}>
									It refers to the process of determining whether a user is allowed to
									access a resource based on their authenticated identity. The
									QR-based access control system will check the user&apos;s authorization level to
									determine
									whether they have necessary permissions to access the requested resource.
								</Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<Spacer y={4}/>
			</Container>
		</>
	);
}
