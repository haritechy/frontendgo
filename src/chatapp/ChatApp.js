import React, { useState } from "react";
import { Box, CssBaseline, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomAppBar from "../components/header/CustomAppBar";
import DrawerComponent from "../components/chatcomponent/DrawerContent";


import logo from "../assets/logo1.png"

import { useAuth } from "../context/AuthProvider";
import ChatComponent from "../components/chatcomponent/MessageContent";


const BOT_NAME = "KAR AI CHAT";
const PERSON_IMG =
  "https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg";

const drawerWidth = 240;

const ChatApp = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  
  const handleChatSelect = (chat) => {
    setSelectedChat(chat); 
  };
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };
  const onCloseDrawer = () => {
    setMobileOpen(false); // Close the drawer
  };
  const [messages, setMessages] = useState([
    {
      name: BOT_NAME,
      img: logo,
      side: "left",
      text: "Hi, welcome to KAR AI CHAT! Go ahead and send me a message. 😄",
      time: formatDate(new Date()),
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const { fullname, fetchBotResponse } = useAuth(); 
  const PERSON_NAME = fullname;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;

    const userMessage = {
      name: PERSON_NAME,
      img: PERSON_IMG,
      side: "right",
      text: inputValue,
      time: formatDate(new Date()),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    setTimeout(() => {
      botResponse(userMessage.text);
    }, 1000);
  };

  const botResponse = (userMessageText) => {
    setIsBotTyping(true);
    fetchBotResponse(userMessageText)
      .then((botMessage) => {
        const message =
          botMessage ||
          "Sorry, I didn't understand that. Can you ask in a different way?";
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            name: BOT_NAME,
            img: logo,
            side: "left",
            text: message,
            time: formatDate(new Date()),
          },
        ]);
        setIsBotTyping(false);
      })
      .catch((error) => {
        console.error("Error fetching bot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            name: BOT_NAME,
            img: logo,
            side: "left",
            text: "Sorry, something went wrong. Please try again later.",
            time: formatDate(new Date()),
          },
        ]);
        setIsBotTyping(false);
      });
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <CssBaseline />
      <CustomAppBar toggleDrawer={toggleDrawer} />

      <Box component="nav">
        {isLargeScreen && (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <DrawerComponent  onChatSelect={handleChatSelect} onCloseDrawer={onCloseDrawer}/>
          </Drawer>
        )}
        {!isLargeScreen && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <DrawerComponent  onCloseDrawer={onCloseDrawer}  onChatSelect={handleChatSelect}  />
          </Drawer>
        )}
      </Box>
      <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChatComponent   selectedChat={selectedChat}    messages={messages}
        inputValue={inputValue}
        isBotTyping={isBotTyping}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}/>
        </Box>
    </Box>
  );
};

export default ChatApp;

const formatDate = (date) => {
  return `${date.getHours()}:${date.getMinutes()}`;
};