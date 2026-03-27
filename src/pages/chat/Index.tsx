import { Grid } from "@mantine/core";
import ChatSidebar from "./components/ChatSidebar";
import ChatMessagePanel from "./components/ChatMessage";
import { useEffect, useState } from "react";
import { socket } from "../../config/socketConfig";
import { useMediaQuery } from "@mantine/hooks";

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [newRoomRevicerId, setNewRoomReciverId] = useState();
  const [selectedRoomData, setSelectedRoomData] = useState<any>(null);
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      console.log("Connected");
    }

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      console.log("Selected chat for new room " , selectedChat)
      socket.emit("join-room", selectedChat);
    }
  }, [selectedChat]);





  return (
    <Grid
      gutter={0}
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Grid.Col
        span={{ sm: 12, md: 3 }}
        style={{
          borderRight: "1px solid #222",
          height: "100%",
        }}
      >
        {isMobile && selectedChat != null ?  <ChatMessagePanel selectedRoomData={selectedRoomData}   setSelectedChat={setSelectedChat} selectedChat={selectedChat} /> :     <ChatSidebar  setSelectedRoomData={setSelectedRoomData}
          newRoomRevicerId={newRoomRevicerId}
          setNewRoomReciverId={setNewRoomReciverId}
          selectedChat={selectedChat} 
          setSelectedChat={setSelectedChat}
        /> }


      </Grid.Col>

      <Grid.Col visibleFrom="md"
        span={{ sm: 12, md: 9 }}
        style={{
          height: "100vh",
        }}
      >
        <ChatMessagePanel selectedRoomData={selectedRoomData} setSelectedChat={setSelectedChat} selectedChat={selectedChat} />
      </Grid.Col>
    </Grid>
  );
};

export default ChatApp;
