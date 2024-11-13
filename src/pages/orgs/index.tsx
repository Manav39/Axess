// ExampleComponent.tsx
import React, { useEffect, useState } from "react";
import { useFirebase } from "@/firebaseContext";
import { useRouter } from "next/router";
import { collection, getDocs } from "firebase/firestore";
import { Card, Text, Image, Grid } from "@nextui-org/react"; // Import NextUI components for styling

// Define a type for the organization documents
type Organization = {
	id: string;
	name: string;
	imageUrl?: string; // Image URL for the organization, optional field
	[key: string]: any; // Additional fields your organization documents may have
};

const ExampleComponent = () => {
	const router = useRouter();
	const { firestore } = useFirebase(); // Ensure `firestore` is correctly provided in context
	const [data, setData] = useState<Organization[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const querySnapshot = await getDocs(collection(firestore, "orgs"));
				const items = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as Organization[];
				console.log(items);
				setData(items);
			} catch (err) {
				console.error("Error fetching organizations:", err);
				setError("Failed to fetch organizations. Please try again later.");
			}
		};

		fetchData();
	}, [firestore]);

	const handleOrgClick = (orgId: string) => {
		router.push(`/orgs/${orgId}`); // Navigate to /orgs/{orgId}
	};

	return (
		<div>
			<h1>
				<center>Organizations</center>
			</h1>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<Grid.Container gap={2} justify="center">
				{data.map((org) => (
					<Grid xs={12} sm={4} key={org.id}>
						<Card
							isHoverable
							isPressable
							css={{ mw: "400px" }}
							onClick={() => handleOrgClick(org.id)} // Navigate on click
						>
							<Card.Header>
								<Text h3>{org.id}</Text>
							</Card.Header>
							<Card.Body>
								<Image
									src={org.image || "/default-org-image.jpg"} // Default image if not provided
									width="100%"
									height="200px"
									objectFit="cover"
									alt={`${org.id} image`}
								/>
							</Card.Body>
							<Card.Footer>
								<Text>{`Organization ID: ${org.id}`}</Text>
							</Card.Footer>
						</Card>
					</Grid>
				))}
			</Grid.Container>
		</div>
	);
};

export default ExampleComponent;
