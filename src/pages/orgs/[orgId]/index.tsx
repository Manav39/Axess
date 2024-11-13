// pages/orgs/[orgId]/index.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFirebase } from "@/firebaseContext";
import { collection, getDocs } from "firebase/firestore";
import { Card, Text, Image, Grid } from "@nextui-org/react"; // UI components for styling

// Define a type for the user documents
type User = {
	id: string;
	name: string;
	email: string;
	profileImage?: string; // Optional field for the user's profile image
	[key: string]: any; // Additional fields the user documents may have
};

const OrganizationUsers = () => {
	const router = useRouter();
	const { orgId } = router.query; // Fetch the organization ID from the URL
	const { firestore } = useFirebase();
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			if (!orgId) return; // Ensure orgId is defined before fetching

			try {
				const usersCollectionRef = collection(firestore, `orgs/${orgId}/users`);
				const querySnapshot = await getDocs(usersCollectionRef);
				const usersList = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as User[];
				console.log("Fetched users:", usersList);
				setUsers(usersList);
			} catch (err) {
				console.error("Error fetching users:", err);
				setError("Failed to fetch users. Please try again later.");
			}
		};

		fetchUsers();
	}, [orgId, firestore]);

	return (
		<div>
			<h2>
				<center>{orgId} - Users</center>
			</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<Grid.Container gap={2} justify="center">
				{users.map((user) => (
					<Grid xs={12} sm={4} key={user.id}>
						<Card isHoverable isPressable css={{ mw: "400px" }}>
							<Card.Header>
								<Text h3>{user.userId}</Text>
							</Card.Header>
							<Card.Body>
								<Image
									src={
										user.profileImage ||
										"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
									} // Default profile image if none provided
									width="100%"
									height="200px"
									objectFit="contain"
									alt={`${user.name}'s profile image`}
								/>
								<Text>Permission Level : {user.permissionLevel}</Text>
							</Card.Body>
						</Card>
					</Grid>
				))}
			</Grid.Container>
		</div>
	);
};

export default OrganizationUsers;
