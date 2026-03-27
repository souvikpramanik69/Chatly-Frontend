import {
  Box,
  Stack,
  Group,
  Text,
  Avatar,
  ScrollArea,
  UnstyledButton,
  Flex,
  Button,
  Modal,
  TextInput,
  LoadingOverlay,
  Menu,
} from "@mantine/core";
import Cookies from "js-cookie";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconMessage2Filled,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useUsers } from "../../../hooks/useUsers";
import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useRooms } from "../../../hooks/useRooms";
import { useUserProfile } from "../../../hooks/useUserProfile";
import { useAddRoom } from "../../../hooks/useAddRoom";
import { socket } from "../../../config/socketConfig";
import { useEffect, useState } from "react";
import { ConversationItem } from "./ConversationItem";
// ─── Static Data ─────────────────────────────────────────────



export interface chatSidebarPropsTypes {
  selectedChat: any;
  setSelectedChat: (data: any) => void;
  setNewRoomReciverId?: (data: any) => void;
  newRoomRevicerId?: any;
  setSelectedRoomData?: (data: any) => void
}

// ─── Sidebar ────────────────────────────────────────────────
export default function ChatSidebar({
  selectedChat,
  setSelectedChat,
  setNewRoomReciverId,
  newRoomRevicerId,
  setSelectedRoomData
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

      console.log("Room users id " , roomUsers)

  useEffect(() => {
    socket.on("new-room-created", (message) => {
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


<Flex
  justify="space-between"
  align="center"
  px="md"
  py="sm"
  style={{
    borderBottom: "1px solid #2a2a2a",
    background: "linear-gradient(90deg, #0f0f0f, #1a1a1a)",
  }}
>
  {/* Left Section */}
  <Flex align="center" gap="sm">


    <Text size="lg" lts={1} fw={700} c="white">
      Chats
    </Text>
  </Flex>

  {/* Right Section */}
  <Button
    onClick={() => {
      open();
    }}
    size="xs"
    radius="xl"
    leftSection={<IconPlus size={14} />}
    styles={{
      root: {
        background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
        transition: "all 0.2s ease",
      },
    }}
    style={{
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 4px 12px rgba(124, 58, 237, 0.4)",
      },
    }}
  >
    New
  </Button>
</Flex>

      {/* List */}
      <ScrollArea pt={10} style={{ flex: 1 }} px="xs">
        <Stack gap={4}>
          {roomData?.payload?.data?.rows
            ?.filter(
              (item: any) =>
                String(item?.id).split("_")[0] ===
                  userProfile?.payload?.data?.id ||
                String(item?.id).split("_")[1] ===
                  userProfile?.payload?.data?.id,
            )
            .map((room: any) => {
              console.log("Rooms")
              return (
              <ConversationItem setSelectedRoomData={setSelectedRoomData}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                key={room.id}
                conv={room}
              />
            )
            })}
        </Stack>
      </ScrollArea>

      {/* Footer */}
    <Box
  px="md"
  py="sm"
  style={{
    borderTop: "1px solid #222",
    background: "#0f0f0f",
  }}
>
  <Menu shadow="md" width={200} position="top-end">
    <Menu.Target>
      <UnstyledButton style={{ width: "100%" }}>
        <Group justify="space-between">
          <Group gap="sm">
            <Avatar radius="xl" color="violet">
              {userProfile?.payload?.data?.firstName?.[0]}
            </Avatar>

            <div>
              <Text size="sm" fw={500} c="gray.2">
                {userProfile?.payload?.data?.firstName}
              </Text>
              <Text size="xs" c="dimmed">
                View Profile
              </Text>
            </div>
          </Group>
        </Group>
      </UnstyledButton>
    </Menu.Target>

    <Menu.Dropdown
      styles={{
        dropdown: {
          background: "#d4c2c2",
          border: "1px solid #2a2a2a",
        },
      }}
    >
      <Menu.Item leftSection={<IconUser size={16} />}>
        Profile
      </Menu.Item>

      <Menu.Item leftSection={<IconSettings size={16} />}>
        Settings
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item
        color="red"
        leftSection={<IconLogout size={16} />}
        onClick={logoutHandler}
      >
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
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
