import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
  Drawer,
  Divider,
  ListItemIcon,
  useMediaQuery,
  CssBaseline,
  Menu,
  MenuItem,
  Container,
  ListSubheader,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";
import "./ChatApp.css";
import { ArrowUpward, ArrowUpwardOutlined, Share } from "@mui/icons-material";
import ExploreOutlined from "@mui/icons-material/ExploreOutlined";
import Assistant from "@mui/icons-material/Assistant";
import ChatComponent from "./MessageContent";
import DrawerComponent from "./DrawerContent";

const drawerWidth = 240;
const BOT_API_URL = "http://localhost:8080/generate";
const BOT_IMG =
  "https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg";
const PERSON_IMG =
  "https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg";
const BOT_NAME = "KAR AI CHAT";
const PERSON_NAME = "Hariharan";

function ChatApp() {
  const [messages, setMessages] = useState([
    {
      name: BOT_NAME,
      img: BOT_IMG,
      side: "left",
      text: "Hi, welcome to KAR AI CHAT! Go ahead and send me a message. 😄",
      time: formatDate(new Date()),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null); // Anchor for the menu

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

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
            img: BOT_IMG,
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
            img: BOT_IMG,
            side: "left",
            text: "Sorry, something went wrong. Please try again later.",
            time: formatDate(new Date()),
          },
        ]);
        setIsBotTyping(false);
      });
  };

  const fetchBotResponse = async (userMessageText) => {
    try {
      const response = await fetch(BOT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessageText }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bot response");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Failed to fetch bot message:", error);
      return null;
    }
  };

  return (
    <Box display="flex">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: 1, backgroundColor: "white" }}
        elevation={0.8}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: "none" }, color: "gray" }}
          >
            <MenuIcon />
          </IconButton>

          <Button
            variant="outlined"
            sx={{
              borderColor: "gray",
              color: "gray",
              textTransform: "none",
              ml: { xs: 20, sm: 30 },
            }}
            onClick={() => console.log("KaraiGPT button clicked")}
          >
            KaraiGPT
          </Button>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                sm: "none",
                lg: "flex",
                md: "flex",
                xl: "flex",
                xs: "none",
              },
            }}
          >
            Chat Application
          </Typography>

          <IconButton
            color="inherit"
            sx={{
              ml: { xs: 10, sm: 30 },
            }}
          >
            <Avatar sx={{ bgcolor: "red" }}>{PERSON_NAME[0]}</Avatar>
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            keepMounted
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={toggleDrawer}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <DrawerComponent />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: { sm: `${drawerWidth}px` },
          marginTop: { xs: 7, sm: 8 },
          padding: 2,
        }}
      >
        <ChatComponent
          messages={messages}
          inputValue={inputValue}
          isBotTyping={isBotTyping}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
}

const formatDate = (date) => {
  return `${date.getHours()}:${date.getMinutes()}`;
};

export default ChatApp;
