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
  Flex,
  Button,
  Modal,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useUsers } from "../../../hooks/useUsers";
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


const contacts = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alex Roy", email: "alex@example.com" },
  { id: 4, name: "Emma Watson", email: "emma@example.com" },
  { id: 5, name: "Chris Evans", email: "chris@example.com" },
  { id: 6, name: "Sophia Lee", email: "sophia@example.com" },
  { id: 7, name: "Michael Brown", email: "michael@example.com" },
  { id: 8, name: "Olivia Davis", email: "olivia@example.com" },
  { id: 9, name: "Daniel Wilson", email: "daniel@example.com" },
  { id: 10, name: "Isabella Moore", email: "isabella@example.com" },
  { id: 11, name: "Ethan Taylor", email: "ethan@example.com" },
  { id: 12, name: "Ava Anderson", email: "ava@example.com" },
  { id: 13, name: "Noah Thomas", email: "noah@example.com" },
  { id: 14, name: "Mia Jackson", email: "mia@example.com" },
  { id: 15, name: "Liam White", email: "liam@example.com" },
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
    const [opened, { open, close }] = useDisclosure(false);
    const {data:userData} = useUsers();

    console.log("User data " , userData?.payload?.data?.rows)

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
      <Flex justify={'space-between'} px="md" py="md">
        <Text fw={600} size="lg">
          Messages
        </Text>
        <Button onClick={open} bg={'violet'} h={'25px'} radius={'lg'} w={'70px'} >New</Button>
      </Flex>

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
     
<Modal
  opened={opened}
  onClose={close}
  title={<Text fw={600} c="violet.4">Contacts</Text>}
  size="lg"
  centered
  radius="lg"
  styles={{
    content: {
      backgroundColor: "#0f0f13",
      border: "1px solid #2a2a40",
    },
    header: {
      backgroundColor: "#0f0f13",
      borderBottom: "1px solid #2a2a40",
    },
  }}
  overlayProps={{
    backgroundOpacity: 0.6,
    blur: 6,
    color: "#000",
  }}
>
  <Stack gap="md">
    
    {/* Search */}
    <TextInput mt={10}
      placeholder="Search contacts..."
      leftSection={<IconSearch size={16} />}
      radius="md"
      styles={{
        input: {
          backgroundColor: "#1a1a25",
          border: "1px solid #2a2a40",
          color: "#fff",
        },
      }}
    />

    {/* Contact List */}
    <ScrollArea scrollbarSize={8}  h={400}>
      <Stack gap="xs">
        {userData?.payload?.data?.rows.map((user:any) => (
          <Box
            key={user?.id}
            p="sm"
            style={{
              borderRadius: "10px",
              backgroundColor: "#151521",
              border: "1px solid #2a2a40",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1f1f2e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#151521")
            }
          >
            <Group>
              <Avatar radius="xl" color="violet">
                {user?.name?.charAt(0)}
              </Avatar>

              <div>
                <Text c="white" size="sm" fw={500}>
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text size="xs" c="dimmed">
                  {user?.email}
                </Text>
              </div>
            </Group>
          </Box>
        ))}
      </Stack>
    </ScrollArea>
  </Stack>
</Modal>


    </Box>
  );
}