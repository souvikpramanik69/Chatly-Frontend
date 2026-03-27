import {

  Group,
  Text,
  Avatar,
  UnstyledButton,
  Flex,

} from "@mantine/core";

import { useUserProfile } from "../../../hooks/useUserProfile";
import type { chatSidebarPropsTypes } from "./ChatSidebar";
// ─── Static Data ─────────────────────────────────────────────

interface converationPropsTypes extends chatSidebarPropsTypes {
  conv: any;
  setSelectedRoomData?: (data: any) => void
}

// ─── Conversation Item ───────────────────────────────────────
export const  ConversationItem = ({
  conv,
  selectedChat,
  setSelectedChat,
  setSelectedRoomData
}: converationPropsTypes) =>{
  const { data: userProfile, isSuccess } = useUserProfile();
  const userData =
    isSuccess &&
    conv?.users
      ?.filter(
        (item: any) =>
          String(item?.id) !== String(userProfile?.payload?.data?.id),
      )
      .map((value: any) => value);

   
  return (
    <UnstyledButton
      onClick={() => {
        setSelectedRoomData &&  setSelectedRoomData(userData[0])
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
          {userData[1]?.firstName?.charAt(0)}
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