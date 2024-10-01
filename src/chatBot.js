import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Drawer,
  CssBaseline,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import logo from "../src/logo1.png";
import "./ChatApp.css";
import ChatComponent from "./MessageContent";
import DrawerComponent from "./DrawerContent";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import {
  AccountCircleOutlined,
  AccountCircleRounded,
  LoginOutlined,
} from "@mui/icons-material";
import Settings from "@mui/icons-material/Settings";
import Psychology from "@mui/icons-material/Psychology";
import Build from "@mui/icons-material/Build";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";

const drawerWidth = 240;
const BOT_API_URL = "https://goservice.krishdevops.xyz/generate"; 
const DB_BOT_URL="https://goservice.krishdevops.xyz/get-response"
const BOT_IMG =logo
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
  const [menuAnchor, setMenuAnchor] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

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
    <Box display="flex" flexDirection="column" height="100vh">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 0, backgroundColor: "white" }}
        elevation={0.8}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{
              mr: 2,
              display: { lg: "none", xl: "none", md: "block" },
              color: "gray",
            }}
          >
            <MenuIcon />
          </IconButton>

          <Button
            variant="outlined"
            sx={{
              borderColor: "none",
              border: "none",
              color: "gray",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: { xs: "16px", sm: "20px" },
              ml: { xs: 10, sm: 30 },
            }}
            onClick={() => console.log("KaraiGPT button clicked")}
          >
            Karai ChatBot
          </Button>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            Chat Application
          </Typography>

          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            sx={{
              ml: { xs: 13, sm: "0px", xl: "0px" },
            }}
          >
            <Avatar sx={{ bgcolor: "red" }}>{PERSON_NAME[0]}</Avatar>
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            keepMounted
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "8px", // Adds slight border-radius to the dropdown
                borderBottom: "2px solid grey", // Border bottom with grey color
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircleOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Build fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Customize GPT" />
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Psychology fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="My GPT" />
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <LogoutOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

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
            <DrawerComponent />
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
            <DrawerComponent />
          </Drawer>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: { lg: `${drawerWidth}px` },
          marginTop: { xs: 7, sm: 8 },
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
