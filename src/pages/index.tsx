import React from "react";
import { Container, Row, Col, Image, Text } from "@nextui-org/react";

const Home = () => {
	return (
		<>
			<Container>
				<Row gap={1} css={{ paddingTop: "100px", height: "70vh" }}>
					<Col>
						<Image
							width={450}
							height={350}
							src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
							alt="Default Image"
							objectFit="cover"
							css={{ borderRadius: "2rem" }}
						/>
					</Col>
					<Col css={{ marginTop: "100px" }}>
						<Text h4>
							"The sun was setting over the horizon, casting a warm glow over the landscape. The air was
							still, and the only sound was the distant call of a bird. As I walked through the fields,
							the tall grass brushing against my legs, I felt a sense of calm wash over me. In that
							moment, everything felt right in the world.
						</Text>
					</Col>
				</Row>
				<Row gap={1} css={{ paddingTop: "100px" }}>
					<Col css={{ marginTop: "100px" }}>
						<Text h4>
							"The sun was setting over the horizon, casting a warm glow over the landscape. The air was
							still, and the only sound was the distant call of a bird. As I walked through the fields,
							the tall grass brushing against my legs, I felt a sense of calm wash over me. In that
							moment, everything felt right in the world.
						</Text>
					</Col>
					<Col>
						<Image
							width={450}
							height={350}
							src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
							alt="Default Image"
							objectFit="cover"
							css={{ borderRadius: "2rem" }}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Home;
