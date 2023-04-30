import React from "react";
import { Card, Grid, Text, Button, Row, Container, Col, Spacer } from "@nextui-org/react";
import { AiOutlineUser } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { FcBusinessman } from "react-icons/fc";
import { BsBuilding } from "react-icons/bs";

import { BsCurrencyRupee } from "react-icons/bs";
const Pricing = () => {
	return (
		<Container display="flex" justify="center" style={{ marginTop: "50px" }}>
			<Text h2>Pricing</Text>
			<Spacer y={2} />
			<Row gap={4}>
				<Col>
					<Card css={{ mw: "330px" }}>
						<Card.Header>
							<Text h3 style={{ marginRight: "auto", marginLeft: "auto" }}>
								Trial
							</Text>
						</Card.Header>

						<Card.Body css={{ py: "$10" }}>
							<AiOutlineUser size={80} style={{ marginRight: "auto", marginLeft: "auto" }} />
							<ul style={{ listStyleType: "square" }}>
								<li>QR Based Authorization </li>
								<li>Limited Services </li>
								<li>Limited Resources </li>
								<li>Online Support </li>
								<li>Valid for 1 month </li>
							</ul>
							<Spacer y={0.5} />
							<Text h2 style={{ textAlign: "center", marginRight: "1.5rem" }}>
								FREE
							</Text>
							<Text h5>*Terms and Condition Only</Text>
						</Card.Body>
						<Card.Footer>
							<Row justify="center">
								<Button size="sm" color="secondary" href="#">
									Learn more
								</Button>
							</Row>
						</Card.Footer>
					</Card>
				</Col>
				<Col>
					<Card css={{ mw: "330px" }}>
						<Card.Header>
							<Text h3 style={{ marginRight: "auto", marginLeft: "auto" }}>
								Teams
							</Text>
						</Card.Header>

						<Card.Body css={{ py: "$10" }}>
							<FiUsers size={80} style={{ marginRight: "auto", marginLeft: "auto" }} />
							<ul style={{ listStyleType: "square" }}>
								<li>QR Based Authorization</li>
								<li>Admin Controlled System </li>
								<li>Upto 30 Members</li>
								<li>24/7 Online Support</li>
								<li>Resources Provided</li>
							</ul>
							<Text h2 style={{ textAlign: "center", marginRight: "1.5rem" }}>
								<BsCurrencyRupee size={30} />
								999 <Text h6>per month</Text>
							</Text>
						</Card.Body>

						<Card.Footer>
							<Row justify="center">
								<Button size="sm" color="secondary" href="#">
									Learn more
								</Button>
							</Row>
						</Card.Footer>
					</Card>
				</Col>
				<Col>
					<Card css={{ mw: "330px" }}>
						<Card.Header>
							<Text h3 style={{ marginRight: "auto", marginLeft: "auto" }}>
								Startup
							</Text>
						</Card.Header>
						<Card.Body css={{ py: "$10" }}>
							<GrGroup size={80} style={{ marginRight: "auto", marginLeft: "auto" }} />
							<ul style={{ listStyleType: "square" }}>
								<li>QR Based Authorization</li>
								<li>Admin Controlled System </li>
								<li>Upto 100 Members</li>
								<li>24/7 Online Support</li>
								<li>Resources Provided</li>
							</ul>
							<Text h2 style={{ textAlign: "center", marginRight: "1.5rem" }}>
								<BsCurrencyRupee size={30} />
								9999 <Text h6>per month</Text>
							</Text>
						</Card.Body>
						<Card.Footer>
							<Row justify="center">
								<Button size="sm" color="secondary" href="#">
									Learn more
								</Button>
							</Row>
						</Card.Footer>
					</Card>
				</Col>
				<Col>
					<Card css={{ mw: "330px" }}>
						<Card.Header>
							<Text h3 style={{ marginRight: "auto", marginLeft: "auto" }}>
								Enterprise
							</Text>
						</Card.Header>
						<Card.Body css={{ py: "$10" }}>
							<BsBuilding size={80} style={{ marginRight: "auto", marginLeft: "auto" }} />
							<ul style={{ listStyleType: "square" }}>
								<li>QR Based Authorization</li>
								<li>Admin Controlled System </li>
								<li>More than 100 Members</li>
								<li>24/7 Online Support</li>
								<li>Resources Provided</li>
							</ul>
							<Text h2 style={{ textAlign: "center", marginRight: "1.5rem" }}>
								<BsCurrencyRupee size={30} />
								14999 <Text h6>per month</Text>
							</Text>
						</Card.Body>
						<Card.Footer>
							<Row justify="center">
								<Button size="sm" color="secondary" href="#">
									Learn more
								</Button>
							</Row>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Pricing;
