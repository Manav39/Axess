import React from "react";
import { default as NextLink } from "next/link";
import { Container, Row, Col, Image, Text } from "@nextui-org/react";

const Home = () => {
	return (
		<>
		
			<Container style={{display:"flex",textAlign:"center"}}>
			
				<Row gap={1} css={{ paddingTop: "100px", height: "70vh" }}>
				
					<Col>
					
						<Image
							width={450}
							height={350}
							src="/images/index1.avif"
							alt="Default Image"
							objectFit="cover"
							css={{ borderRadius: "2rem" }}
						/>
					</Col>
					<Col css={{ marginTop: "25px", width: "3 rem" }}>
					<center><Text h1>QR-Based Authorization System</Text></center>
						<Text h3>
							Randomly generated QR codes can improve security by making it more difficult for
							unauthorized individuals to gain access to a resource. Because the QR codes are randomly
							generated, they cannot be easily replicated, and thus the risk of someone guessing or
							copying the code is reduced.QR codes are easy to scan and can be read quickly by most
							smartphones.
						</Text>
					</Col>
				</Row>
				<Row gap={1} css={{ paddingTop: "100px" }}>
				
					<Col css={{ marginTop: "100px" }}>
					<center><Text h1>Randomly Generated QR Codes</Text></center>
						<Text h3>
							QR codes can be scanned quickly and accurately, reducing the time it takes for users to gain
							access to a resource. This can help to improve productivity and reduce waiting times for
							users.QR codes can be generated and printed on demand, reducing the need for expensive
							access cards or tokens. This can help to lower the cost of access management while still
							providing a high level of security.
						</Text>
					</Col>
					<Col style={{ marginBottom: "20px" }}>
						<Image
							width={400}
							height={350}
							src="/images/index2.png"
							alt="Default Image"
							objectFit="contain"
							css={{ borderRadius: "2rem" }}
						/>
					</Col>
				</Row>
				<Row gap={1} css={{ paddingTop: "100px", height: "70vh" }}>
					<Col>
						<Image
							width={450}
							height={350}
							src="/images/index3.png"
							alt="Default Image"
							objectFit="contain"
							css={{ borderRadius: "2rem" }}
						/>
					</Col>
					<Col css={{ marginTop: "100px", width: "3 rem" }}>
					<center><Text h1>Much Safer, Much Faster</Text></center>
						<Text h3>
							An access management system can automate the process of creating and managing user accounts,
							which saves time compared to manually creating and managing accounts. Access management
							systems can enable users to reset their own passwords without having to contact IT support,
							which saves time for both the users and the IT team.
						</Text>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Home;
