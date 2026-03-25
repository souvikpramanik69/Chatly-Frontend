import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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
          width: 480,
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
            Create Account
          </Text>

          <Text size="sm" c="dimmed" ta="center">
            Start chatting in seconds 🚀
          </Text>

          {/* Name Fields */}
          <Group grow>
            <TextInput
              label="First Name"
              placeholder="John"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.currentTarget.value })
              }
              styles={{
                input: {
                  background: "#0f0f0f",
                  border: "1px solid #222",
                  color: "#fff",
                },
                label: { color: "#aaa" },
              }}
            />

            <TextInput
              label="Last Name"
              placeholder="Doe"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.currentTarget.value })
              }
              styles={{
                input: {
                  background: "#0f0f0f",
                  border: "1px solid #222",
                  color: "#fff",
                },
                label: { color: "#aaa" },
              }}
            />
          </Group>

          {/* Email */}
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.currentTarget.value })
            }
            styles={{
              input: {
                background: "#0f0f0f",
                border: "1px solid #222",
                color: "#fff",
              },
              label: { color: "#aaa" },
            }}
          />

          {/* Password */}
          <PasswordInput
            label="Password"
            placeholder="Create password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.currentTarget.value })
            }
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
            Sign Up
          </Button>

          {/* Footer */}
          <Text size="xs" c="dimmed" ta="center">
            Already have an account?{" "}
            <span onClick={()=>{
                navigate('/login')
            }} style={{ color: "#a855f7", cursor: "pointer" }}>
              Login
            </span>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignupPage;