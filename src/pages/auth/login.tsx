import React from "react";
import {
  Container,
  Card,
  Row,
  Text,
  Col,
  Spacer,
  Image,
  Grid,
  Input,
  Button,
  Avatar,
} from "@nextui-org/react";
import { FaUser , FaLock} from "react-icons/fa";
const login = () => {
  return (
    <>
      <Container
        display="flex"
        justify="center"
        css={{
        marginTop: "11rem",
        border: "0.1rem solid black",
        width:'25rem',
        padding: "2rem",
         }}
      >
        <Text h2 style={{ marginBottom: "2.5rem" }}>
          Login
        </Text>
        
        <Row justify="center">
            <FaUser size={40} />
        <Spacer x={1} />
          <Input placeholder="Enter Username" width="30rem" />
        </Row>
        <Spacer y={2} />
        <Row justify="center">
        <FaLock size={40} />
          <Spacer x={1} />
          <Input placeholder="Enter Password" width="30rem" />
        </Row>
        <Spacer y={2} />
        <Row justify="center">
          <Button style={{ width: "35rem" }}>Login</Button>
        </Row>
      </Container>
    </>
  );
};

export default login;
