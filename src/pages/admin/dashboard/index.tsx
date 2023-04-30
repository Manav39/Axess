import React from "react";
import { Card, Grid, Text, Button, Row, Container, Col } from "@nextui-org/react";
import { BsDeviceSsdFill } from "react-icons/bs";

const index = () => {
	return (
		<Container
			display="flex"
			justify="space-evenly"
			style={{ marginTop: "50px", paddingLeft: "0px", paddingRight: "0px" }}
		>
			<Row gap={1}>
				<Col>
					<Card>
						<Card.Header>
							<BsDeviceSsdFill size={50} style={{ marginRight: "auto", marginLeft: "auto" }} />
						</Card.Header>
						<Card.Body>
							<Text h3 style={{ textAlign: "center" }}>
								19
							</Text>
							<Text h4 style={{ marginRight: "auto", marginLeft: "auto" }}>
								Total Devices Created
							</Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Header>
							<BsDeviceSsdFill size={50} style={{ marginRight: "auto", marginLeft: "auto" }} />
						</Card.Header>
						<Card.Body>
							<Text h3 style={{ textAlign: "center" }}>
								19
							</Text>
							<Text h4 style={{ marginRight: "auto", marginLeft: "auto" }}>
								Total Devices Modified
							</Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Header>
							<BsDeviceSsdFill size={50} style={{ marginRight: "auto", marginLeft: "auto" }} />
						</Card.Header>
						<Card.Body>
							<Text h3 style={{ textAlign: "center" }}>
								19
							</Text>
							<Text h4 style={{ marginRight: "auto", marginLeft: "auto" }}>
								Total Devices Available
							</Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Header>
							<BsDeviceSsdFill size={50} style={{ marginRight: "auto", marginLeft: "auto" }} />
						</Card.Header>
						<Card.Body>
							<Text h3 style={{ textAlign: "center" }}>
								19
							</Text>
							<Text h4 style={{ marginRight: "auto", marginLeft: "auto" }}>
								Total Devices Deleted
							</Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default index;
