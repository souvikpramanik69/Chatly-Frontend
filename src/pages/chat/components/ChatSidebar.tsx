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
  LoadingOverlay,
} from "@mantine/core";
import Cookies from "js-cookie";
import { useDisclosure } from "@mantine/hooks";
import {
  IconMessage2Filled,
  IconMessageCircle,
  IconMessageCircle2Filled,
  IconSearch,
} from "@tabler/icons-react";
import { useUsers } from "../../../hooks/useUsers";
import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useRooms } from "../../../hooks/useRooms";
import { useUserProfile } from "../../../hooks/useUserProfile";
import { useAddRoom } from "../../../hooks/useAddRoom";
import { socket } from "../../../config/socketConfig";
import { useEffect } from "react";
// ─── Static Data ─────────────────────────────────────────────

interface converationPropsTypes extends chatSidebarPropsTypes {
  conv: any;
}

// ─── Conversation Item ───────────────────────────────────────
function ConversationItem({
  conv,
  selectedChat,
  setSelectedChat,
}: converationPropsTypes) {
  const { data: userProfile, isSuccess } = useUserProfile();
  console.log("first", userProfile?.payload?.data?.id);
  console.log("first", conv?.users);
  const userData =
    isSuccess &&
    conv?.users
      ?.filter(
        (item: any) =>
          String(item?.id) != String(userProfile?.payload?.data?.id),
      )
      .map((value: any) => value);
  console.log("Userssssss ", userData);
  return (
    <UnstyledButton
      onClick={() => {
        setSelectedChat(conv);
      }}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: 10,
        transition: "0.2s",
      }}
      bg={selectedChat?.id === conv?.id ? "#a445e82d" : "transparent"}
    >
      <Group align="flex-start" gap={10} wrap="nowrap">
        <Avatar radius="xl" color="violet">
          {userData[0]?.firstName?.charAt(0)}
        </Avatar>

        <Flex>
          <Group justify="space-between" wrap="nowrap">
            <Text mt={7} size="sm" fw={500} c="white">
              {userData[0]?.firstName} {userData[0]?.lastName}
            </Text>

            {/* {conv.unread > 0 ? (
              <Badge size="xs" color="violet">
                {conv.unread}
              </Badge>
            ) : (
              <Text size="xs" c="dimmed">
                {conv.time}
              </Text>
            )} */}
          </Group>

          <Text size="xs" c="dimmed" truncate>
            {conv.preview}
          </Text>
        </Flex>
      </Group>
    </UnstyledButton>
  );
}

export interface chatSidebarPropsTypes {
  selectedChat: any;
  setSelectedChat: (data: any) => void;
  setNewRoomReciverId?: (data: any) => void;
  newRoomRevicerId?: any;
}

// ─── Sidebar ────────────────────────────────────────────────
export default function ChatSidebar({
  selectedChat,
  setSelectedChat,
  setNewRoomReciverId,
  newRoomRevicerId,
}: chatSidebarPropsTypes) {
  const [opened, { open, close }] = useDisclosure(false);
  const { removeData, data } = useUserStore();
  const { data: userProfile, isSuccess: isProfileDataSuccesss } =
    useUserProfile();
  const { data: userData } = useUsers({
    unwanted_user_id: userProfile?.payload?.data?.id,
    enable: isProfileDataSuccesss,
  });
  const navigate = useNavigate();
  const logoutHandler = () => {
    removeData();
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    navigate("/login");
  };

  const { mutate, isPending } = useAddRoom(newRoomRevicerId);

  const {
    data: roomData,
    isSuccess: isRoomDataSuccess,
    refetch: RefetchRooms,
  } = useRooms({
    user_id: userProfile?.payload?.data?.id,
    enable: isProfileDataSuccesss,
  });
  const roomUsers =
    isRoomDataSuccess &&
    roomData?.payload?.data?.rows
      ?.filter(
        (item: any) =>
          String(item?.id).split("_")[0] === userProfile?.payload?.data?.id ||
          String(item?.id).split("_")[1] === userProfile?.payload?.data?.id,
      )
      .map((room: any) => room?.users[0]?.id);

  useEffect(() => {
    socket.on("new-room-created", (message) => {
      console.log("New Messages ===== ", message);
      if (message?.userId) {
        if (
          String(message?.userId) === String(userProfile?.payload?.data?.id)
        ) {
          RefetchRooms();
        }
      }
    });
    return () => {
      socket.off("new-room-created");
    };
  }, [socket]);

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
      <Flex justify={"space-between"} px="md" py="md">
        <Text fw={600} size="lg">
          ({userProfile?.payload?.data?.firstName}{" "}
          {userProfile?.payload?.data?.lastName}) Messages
        </Text>
        <Button
          onClick={() => {
            open();
            console.log("User ", data);
          }}
          bg={"violet"}
          h={"25px"}
          radius={"lg"}
          w={"70px"}
        >
          New
        </Button>
      </Flex>

      {/* List */}
      <ScrollArea style={{ flex: 1 }} px="xs">
        <Stack gap={4}>
          {roomData?.payload?.data?.rows
            ?.filter(
              (item: any) =>
                String(item?.id).split("_")[0] ===
                  userProfile?.payload?.data?.id ||
                String(item?.id).split("_")[1] ===
                  userProfile?.payload?.data?.id,
            )
            .map((room: any) => (
              <ConversationItem
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                key={room.id}
                conv={room}
              />
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
          <Button
            onClick={logoutHandler}
            bg={"violet"}
            h={30}
            radius={"lg"}
            size="sm"
          >
            Logout
          </Button>
        </Group>
      </Box>

      {isRoomDataSuccess && (
        <Modal
          opened={opened}
          onClose={close}
          title={
            <Text fw={600} c="violet.4">
              Contacts
            </Text>
          }
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
            <TextInput
              mt={10}
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
            <ScrollArea scrollbarSize={8} h={400}>
              <Stack gap="xs">
                {userData?.payload?.data?.rows
                  ?.filter((user: any) => !roomUsers?.includes(user?.id))
                  ?.map((user: any) => (
                    <Flex
                      pos={"relative"}
                      justify={"space-between"}
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
                      <IconMessage2Filled
                        onClick={() => {
                          socket.emit("new-room-create", {
                            userId: user?.id,
                          });
                          setNewRoomReciverId && setNewRoomReciverId(user?.id);
                          mutate();
                        }}
                        color="#5f128f"
                        stroke={2}
                      />

                      {newRoomRevicerId === user?.id && (
                        <LoadingOverlay
                          visible={isPending}
                          zIndex={1000}
                          overlayProps={{ radius: "sm", blur: 2 }}
                          loaderProps={{ color: "pink", type: "bars" }}
                        />
                      )}
                    </Flex>
                  ))}
              </Stack>
            </ScrollArea>
          </Stack>
        </Modal>
      )}
    </Box>
  );
}
