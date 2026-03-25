import { Box, Flex, Text, Button, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      style={{
        background: "#0f0f0f",
        color: "#fff",
      }}
    >
      <Stack align="center" gap="md" maw={420} ta="center">
        {/* Logo / Icon */}
        <Box
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          💬
        </Box>

        {/* Title */}
        <Text size="xl" fw={700} style={{ letterSpacing: "-0.02em" }}>
          Welcome to Chat App
        </Text>

        {/* Subtitle */}
        <Text size="sm" c="dimmed">
          Select a conversation from the sidebar or start a new chat to begin messaging.
        </Text>

        {/* Button */}
        <Button onClick={()=>{
           navigate('/chat')
        }}
          radius="xl"
          size="md"
          style={{
            background: "#7c3aed",
            marginTop: 10,
          }}
        >
          Start New Chat
        </Button>
      </Stack>
    </Flex>
  );
};

export default App;