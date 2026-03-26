import { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Paper,
  ScrollArea,
  TextInput,
  ActionIcon,
  Stack,
  Button,
} from "@mantine/core";
import { socket } from "../../../config/socketConfig";
import { useUserProfile } from "../../../hooks/useUserProfile";
import { useQuery } from "@tanstack/react-query";
import { getAllMessagesByRoomId } from "../services/getAllMessagesByRoomId";

// ─── Mock messages ─────────────────────────────────────────────

// ─── Message Bubble ────────────────────────────────────────────
function Bubble({ msg }: any) {
  console.log("Message ", msg);
  const isMe = msg.from === "me";

  return (
    <Flex justify={isMe ? "flex-end" : "flex-start"} align="flex-end" mb={8}>
      {!isMe && (
        <Avatar size={28} radius="xl" color="grape" mr={6}>
          U
        </Avatar>
      )}

      <Paper
        px="md"
        py="sm"
        radius="lg"
        style={{
          maxWidth: "70%",
          background: isMe ? "#7c3aed" : "#1a1a1a",
          color: "#fff",
          borderBottomRightRadius: isMe ? 4 : undefined,
          borderBottomLeftRadius: !isMe ? 4 : undefined,
        }}
      >
        <Text size="sm">{msg.text}</Text>
      </Paper>

      {isMe && (
        <Avatar size={28} radius="xl" color="violet" ml={6}>
          M
        </Avatar>
      )}
    </Flex>
  );
}

interface ChatMessagePropsType {
  selectedChat: any;
}

// ─── Main Chat UI ──────────────────────────────────────────────
export default function ChatUI({ selectedChat }: ChatMessagePropsType) {
  const [messages, setMessages] = useState<any[]>([]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState<boolean>(false);
  const { data: profileData } = useUserProfile();

  const { data: messageData, isSuccess: isMessageDataSuccess } = useQuery({
    queryKey: ["messages", selectedChat?.id],
    queryFn: () => getAllMessagesByRoomId(selectedChat?.id),
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!selectedChat?.id,
  });

  const sendMessage = () => {
    if (!value.trim()) return;

    socket.emit("send-message", {
      roomDetails: selectedChat,
      message: value,
      typing: false,
      userId: profileData?.payload?.data?.id,
    });

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", text: value },
    ]);

    setValue("");
  };

  useEffect(() => {
    socket.on("receive_message", (newMessage: any) => {
      console.log(" New Message ", newMessage);
      if (newMessage?.typing) {
        setTyping(newMessage?.typing);
      } else {
        setTyping(newMessage?.typing);
      }
      if (newMessage?.message) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), from: "other", text: newMessage?.message },
        ]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket.on]);

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!value) return;

    socket.emit("send-message", { typing: true });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit("send-message", { typing: false });
    }, 300);

    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [value]);

  useEffect(() => {
    if (messageData && isMessageDataSuccess) {
      const data = messageData?.data?.rows?.map((item: any) => ({
        id: item?.id,
        from:
          profileData?.payload?.data?.id === item?.sender_id ? "me" : "other",
        text: item?.message,
      }));
      setMessages(data);
    }
  }, [messageData, isMessageDataSuccess]);

  return (
    <Box>
      {selectedChat == null || selectedChat == undefined ? (
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
            {/* Icon */}
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
              ✨
            </Box>

            {/* Title */}
            <Text size="xl" fw={700} style={{ letterSpacing: "-0.02em" }}>
              Start a New Conversation
            </Text>

            {/* Subtitle */}
            <Text size="sm" c="dimmed">
              No chat selected yet. Pick an existing conversation from the
              sidebar or start a new one to begin chatting.
            </Text>
          </Stack>
        </Flex>
      ) : (
        <Flex
          direction="column"
          h="100vh"
          style={{
            background: "#0f0f0f",
            color: "#fff",
            border: "1px solid #222",
          }}
        >
          {/* Header */}
          <Flex
            px="md"
            py="sm"
            align="center"
            style={{
              borderBottom: "1px solid #222",
            }}
          >
            <Avatar color="violet" radius="xl">
              P
            </Avatar>
            <Box ml={10}>
              <Text size="sm" fw={600}>
                {selectedChat?.users[0]?.firstName}{" "}
                {selectedChat?.users[0]?.lastName}{" "}
              </Text>
              <Text size="xs" c="dimmed">
                {typing ? "Typing" : "Online"}
              </Text>
            </Box>
          </Flex>

          {/* Messages */}
          <ScrollArea flex={1} styles={{ viewport: { padding: 16 } }}>
            {messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} />
            ))}
          </ScrollArea>

          {/* Input */}
          <Box
            p="sm"
            style={{
              borderTop: "1px solid #222",
            }}
          >
            <Flex gap={8}>
              <TextInput
                placeholder="Type a message..."
                value={value}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                }}
                style={{ flex: 1 }}
                styles={{
                  input: {
                    background: "#1a1a1a",
                    border: "1px solid #222",
                    color: "#fff",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />

              <ActionIcon
                onClick={sendMessage}
                style={{
                  background: "#7c3aed",
                  color: "#fff",
                }}
                size="lg"
                radius="xl"
              >
                ➤
              </ActionIcon>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  );
}
