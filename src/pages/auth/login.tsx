import React, { useState } from "react";
import { Container, Row, Text, Spacer, Input, Button } from "@nextui-org/react";
import { FaUser, FaLock } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
const login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [orgId, setOrgId] = useState("");
  return (
    <>
      <Container
        display="flex"
        justify="center"
        css={{
          marginTop: "11rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5);",
          borderRadius: "1rem",
          width: "25rem",
          padding: "2rem",
        }}
      >
        <Text h2 style={{ marginBottom: "2.5rem", color: "blue" }}>
          Login
        </Text>
        <Row justify="center">
          <GrOrganization size={42} />
          <Spacer x={1} />
          <Input
            placeholder="Enter Organization ID"
            width="30rem"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
          />
        </Row>
        <Spacer x={2} />
        <Row justify="center">
          <FaUser size={40} />
          <Spacer x={1} />
          <Input
            placeholder="Enter Username"
            width="30rem"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Row>
        <Spacer y={1} />
        <Row justify="center">
          <FaLock size={40} />
          <Spacer x={1} />
          <Input
            placeholder="Enter Password"
            width="30rem"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
