import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <Flex
      h="100vh" 
      align="center"
      justify="center"
      style={{
        position: "relative",
        background: "#0f0f0f",
        overflow: "hidden",
      }}
    >
      {/* 🔮 Purple Glow Background */}
      <Box
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #7c3aed55, transparent 70%)",
          top: "-80px",
          left: "-80px",
          filter: "blur(60px)",
        }}
      />

      <Box
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #a855f755, transparent 70%)",
          bottom: "-80px",
          right: "-80px",
          filter: "blur(60px)",
        }}
      />

      {/* 💳 Card */}
      <Box
        p="xl"
        style={{
          width: 460,
          background: "#151515",
          border: "1px solid #222",
          borderRadius: 14,
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 40px rgba(124,58,237,0.15)",
          zIndex: 1,
        }}
      >
        <Stack gap="md">
          {/* Logo */}
          <Box
            mx="auto"
            mb={5}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            💬
          </Box>

          {/* Title */}
          <Text size="xl" fw={700} ta="center" c="white">
            Welcome Back
          </Text>

          <Text size="sm" c="dimmed" ta="center">
            Login to continue chatting
          </Text>

          {/* Inputs */}
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            styles={{
              input: {
                background: "#0f0f0f",
                border: "1px solid #222",
                color: "#fff",
              },
              label: { color: "#aaa" },
            }}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            styles={{
              input: {
                background: "#0f0f0f",
                border: "1px solid #222",
                color: "#fff",
              },
              label: { color: "#aaa" },
            }}
          />

          {/* Button */}
          <Button
            fullWidth
            mt="sm"
            radius="xl"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              border: "none",
            }}
          >
            Login
          </Button>

          {/* Footer */}
       <Flex justify={'space-between'} >
           <Text size="xs" c="dimmed" ta="center">
            Don’t have an account?{" "}
            <span onClick={()=>{
                navigate('/register')
            }} style={{ color: "#a855f7", cursor: "pointer" }}>
              Sign up
            </span>
          </Text>
             <Text style={{cursor:'pointer'}} onClick={()=>{navigate('/forgot-password')}} size="xs" c="#a855f7" ta="center">
            Forgot your account?{" "}
            
          </Text>
       </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;