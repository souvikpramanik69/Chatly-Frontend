import {
  Box,
  Stack,
  Group,
  Text,
  Avatar,
  Badge,
  ScrollArea,
  UnstyledButton,
  Flex,
  Button,
  Modal,
  TextInput,
} from "@mantine/core";
import Cookies from "js-cookie";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useUsers } from "../../../hooks/useUsers";
import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useRooms } from "../../../hooks/useRooms";
// ─── Static Data ─────────────────────────────────────────────


interface converationPropsTypes extends chatSidebarPropsTypes {
  conv:any
}

// ─── Conversation Item ───────────────────────────────────────
function ConversationItem({ conv,selectedChat,setSelectedChat }: converationPropsTypes) {

  return (
    <UnstyledButton onClick={()=>{
      setSelectedChat(conv);
    }}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: 10,
        transition: "0.2s",
      }}
      bg={ selectedChat?.id === conv?.id  ? '#a445e82d' : 'transparent'}
    >
      <Group align="flex-start" gap={10} wrap="nowrap">
        <Avatar radius="xl" color="violet">
          {conv.name.charAt(0)}
        </Avatar>

        <Box style={{ flex: 1 }}>
          <Group justify="space-between" wrap="nowrap">
            <Text size="sm" fw={500} c="white">
              {conv?.users[0]?.firstName} {conv?.users[0]?.lastName}
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


export interface chatSidebarPropsTypes {
   selectedChat: any,
   setSelectedChat: (data:any)=> void
}

// ─── Sidebar ────────────────────────────────────────────────
export default function ChatSidebar({selectedChat,setSelectedChat}:chatSidebarPropsTypes) {
    const [opened, { open, close }] = useDisclosure(false);
    const {removeData,data} = useUserStore();
    const {data:userData} = useUsers({unwanted_user_id:data?.id});
    const navigate = useNavigate();
  const logoutHandler = () =>{
    removeData();
    Cookies.remove('access_token');
    navigate('/login')
  }

const {data:roomData,isSuccess:isRoomDataSuccess} = useRooms({user_id:data?.id});
const roomUsers = isRoomDataSuccess && roomData?.payload?.data?.rows?.map((room:any) => room?.users[0]?.id);





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
        <Button onClick={()=>{
          open();
          console.log("User " , data)
        }} bg={'violet'} h={'25px'} radius={'lg'} w={'70px'} >New</Button>
      </Flex>

      {/* List */}
      <ScrollArea style={{ flex: 1 }} px="xs">
        <Stack gap={4}>
          {roomData?.payload?.data?.rows?.map((room:any) => (
            <ConversationItem selectedChat={selectedChat} setSelectedChat={setSelectedChat} key={room.id} conv={room} />
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
          <Button onClick={logoutHandler} bg={'violet'} h={30} radius={'lg'} size="sm">Logout</Button>
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
        {userData?.payload?.data?.rows?.filter((user:any) => !roomUsers?.includes(user?.id)).map((user:any) => (
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