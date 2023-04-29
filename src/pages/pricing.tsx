import React from "react";
import { Card, Grid, Text, Button, Row, Container, Col } from "@nextui-org/react";
import { AiOutlineUser } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { FcBusinessman } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import { BsCurrencyRupee } from "react-icons/bs";
const Pricing = () => {
	return (
		<Container display="flex" justify="center" style={{ marginTop: "50px" }}>
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
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
							</ul>
							<Text h2 style={{ textAlign: "center", marginRight: "1.5rem" }}>
								<BsCurrencyRupee size={30} />
								999
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
								Teams
							</Text>
						</Card.Header>

						<Card.Body css={{ py: "$10" }}>
							<FiUsers size={80} style={{ marginRight: "auto", marginLeft: "auto" }} />
							<ul style={{ listStyleType: "square" }}>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
							</ul>
							<Text h2 style={{ textAlign: "center", marginRight: "1.5rem" }}>
								<BsCurrencyRupee size={30} />
								9999
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
							<FcBusinessman size={80} style={{ marginRight: "auto", marginLeft: "auto" }} />
							<ul style={{ listStyleType: "square" }}>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
							</ul>
							<Text h2 style={{ textAlign: "center", marginRight: "1.5rem" }}>
								<BsCurrencyRupee size={30} />
								16999
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
							<FcManager size={80} style={{ marginRight: "auto", marginLeft: "auto" }} />
							<ul style={{ listStyleType: "square" }}>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
								<li>Some quick example text </li>
							</ul>
							<Text h2 style={{ textAlign: "center", marginRight: "1.5rem" }}>
								<BsCurrencyRupee size={30} />
								24999
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
