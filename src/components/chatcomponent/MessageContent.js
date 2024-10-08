import React, { useState } from 'react';
import {
  Container,
  Box,
  List,
  ListItem,
  Avatar,
  Paper,
  ListItemText,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowUpwardOutlined from "@mui/icons-material/ArrowUpwardOutlined";
import logo from "../../assets/logo1.png";
import { useAuth } from '../../context/AuthProvider';
const BOT_NAME = "KAR AI CHAT";
const PERSON_IMG =
  "https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg";

const ChatComponent = ({
  selectedChat,
  inputValue,
  isBotTyping,
  setInputValue,
  handleSubmit,
  messages,
}) => {
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const { fullname, fetchBotResponse } = useAuth(); 
  const PERSON_NAME = fullname;
  const isBoldText = (text) => {
    return text.startsWith("**") && text.endsWith("**");
  };

  const isProgrammingbox = (text) => {
    return text.startsWith("```");
  };

  const formatText = (text) => {
    if (isBoldText(text)) {
      return text.slice(2, -2);
    }
    if (isProgrammingbox(text)) {
      return text.slice(3, -3);
    }
    return text;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setHasSentMessage(true);
  };

 
  const updatedMessages = [...messages];

  if (selectedChat) {
    updatedMessages.push(
      {
        text: selectedChat.prompt || "No prompt available",
        side: "left", 
        name: PERSON_NAME,
      img: PERSON_IMG,
        time: new Date().toLocaleTimeString(),
      },
      {
        text: selectedChat.response || "No response available",
        side: "right", 
        name: BOT_NAME,
        img: logo, 
        time: new Date().toLocaleTimeString(),
      }
    );
  }

  const hasMessages = updatedMessages.length > 1;

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 6, sm: 8 }, p: 0 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: "100%",
        }}
      >
    {!selectedChat && !hasSentMessage && !hasMessages && (
  <Box
    display="flex"
    flexDirection="column"
    mt={{ xs: 10, sm: 20 }}
    justifyContent="center"
    alignItems="center"
  >
    <Avatar
      src={logo}
      alt="Chat Logo"
      sx={{
        width: { xs: 70, sm: 100 },
        height: { xs: 50, sm: 70 },
        mb: 3,
      }}
    />
    <Typography variant="h6" align="center">
      Welcome to KAR AI CHAT
    </Typography>
    <Typography
      variant="body2"
      align="center"
      color="textSecondary"
      sx={{ mt: 1, px: { xs: 2, sm: 0 } }}
    >
      Please start a conversation by typing a message below.
    </Typography>
  </Box>
)}

        {hasMessages && (
          <Box width="100%">
            <List>
              {updatedMessages.map((msg, index) => (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  sx={{
                    justifyContent: msg.side === "right" ? "flex-end" : "flex-start",
                  }}
                >
                  <Box display="flex" flexDirection={msg.side === "right" ? "row-reverse" : "row"}>
                    <Avatar
                      alt={msg.name}
                      src={msg.img}
                      sx={{
                        marginRight: msg.side === "left" ? 2 : 0,
                        marginLeft: msg.side === "right" ? 2 : 0,
                        width: { xs: 30, sm: 40 },
                        height: { xs: 30, sm: 40 },
                      }}
                    />
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: isProgrammingbox(msg.text) ? "black" : "#f1f1f1",
                        width: { xs: msg.side === "right" ? "100%" : "80%" },
                        p: 2,
                        borderRadius: 2,
                        color: isProgrammingbox(msg.text) ? "white" : "black",
                        mt: 1,
                      }}
                    >
                      <ListItemText
                        primary={msg.name}
                        secondary={msg.text.split("\n").map((line, index) => (
                          <Typography
                            variant="body2"
                            key={index}
                            sx={{
                              textAlign: "start",
                              lineHeight: 1.8,
                              fontWeight: isBoldText(line) ? "bold" : "normal",
                              color: isProgrammingbox(msg.text) ? "white" : "black",
                            }}
                          >
                            {formatText(line)}
                          </Typography>
                        ))}
                      />
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        sx={{
                          textAlign: msg.side === "right" ? "right" : "left",
                        }}
                      >
                        {msg.time}
                      </Typography>
                    </Paper>
                  </Box>
                </ListItem>
              ))}

              {isBotTyping && (
                <ListItem alignItems="flex-start" sx={{ justifyContent: "flex-start" }}>
                  <Avatar alt={"Bot"} src={logo} sx={{ marginRight: 2 }} />
                  <CircularProgress size={24} />
                </ListItem>
              )}
            </List>
          </Box>
        )}

        {/* Input field for sending messages */}
        <form onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            placeholder="Message To Kar AI Chatbot..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              position: "fixed",
              bottom: 0,
              width: {
                xs: "90vw",
                lg: "60vw",
                xl: "60vw",
              },
              bgcolor: "#f5f5f5",
              borderRadius: 10,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
                "&.Mui-focused fieldset": { border: "none" },
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  type="submit"
                  color="white"
                  sx={{ padding: 0, bgcolor: "black", color: "white" }}
                >
                  <ArrowUpwardOutlined />
                </IconButton>
              ),
            }}
          />
        </form>
      </Box>
    </Container>
  );
};

export default ChatComponent;
