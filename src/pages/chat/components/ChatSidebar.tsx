import {
  Box,
  Stack,
  Group,
  Text,
  Avatar,
  Badge,
  ScrollArea,
  Divider,
  UnstyledButton,
} from "@mantine/core";

// ─── Static Data ─────────────────────────────────────────────
const CONVERSATIONS = [
  {
    id: "1",
    name: "Priya Mehta",
    preview: "Let's sync tomorrow",
    time: "now",
    unread: 2,
  },
  {
    id: "2",
    name: "Design Team",
    preview: "Figma file updated",
    time: "2m",
    unread: 7,
  },
  {
    id: "3",
    name: "Jordan Lee",
    preview: "Typing...",
    time: "5m",
    unread: 0,
  },
  {
    id: "4",
    name: "Aiko Tanaka",
    preview: "Thanks for the review!",
    time: "12m",
    unread: 1,
  },
];

// ─── Conversation Item ───────────────────────────────────────
function ConversationItem({ conv }: any) {
  return (
    <UnstyledButton
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: 10,
        transition: "0.2s",
      }}
    >
      <Group align="flex-start" gap={10} wrap="nowrap">
        <Avatar radius="xl" color="violet">
          {conv.name.charAt(0)}
        </Avatar>

        <Box style={{ flex: 1 }}>
          <Group justify="space-between" wrap="nowrap">
            <Text size="sm" fw={500} c="white">
              {conv.name}
            </Text>

            {conv.unread > 0 ? (
              <Badge size="xs" color="violet">
                {conv.unread}
              </Badge>
            ) : (
              <Text size="xs" c="dimmed">
                {conv.time}
              </Text>
            )}
          </Group>

          <Text size="xs" c="dimmed" truncate>
            {conv.preview}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  );
}

// ─── Sidebar ────────────────────────────────────────────────
export default function ChatSidebar() {
  return (
    <Box
      h="100vh"
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#0f0f0f",
        borderRight: "1px solid #222",
        color: "#fff",
      }}
    >
      {/* Header */}
      <Box px="md" py="md">
        <Text fw={600} size="lg">
          Messages
        </Text>
      </Box>

      {/* List */}
      <ScrollArea style={{ flex: 1 }} px="xs">
        <Stack gap={4}>
          {CONVERSATIONS.map((conv) => (
            <ConversationItem key={conv.id} conv={conv} />
          ))}
        </Stack>
      </ScrollArea>

      {/* Footer */}
      <Box
        px="md"
        py="sm"
        style={{
          borderTop: "1px solid #222",
        }}
      >
        <Group>
          <Avatar radius="xl" color="violet">
            Y
          </Avatar>
          <Text size="sm">You</Text>
        </Group>
      </Box>
    </Box>
  );
}