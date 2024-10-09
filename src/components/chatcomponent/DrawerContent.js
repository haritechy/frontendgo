import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExploreOutlined from "@mui/icons-material/ExploreOutlined";
import Assistant from "@mui/icons-material/Assistant";
import { useAuth } from "../../context/AuthProvider";

const drawerWidth = 240;

const DrawerComponent = ({ onChatSelect, onCloseDrawer }) => {
  const { fetchchatHistory } = useAuth();
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorizedHistory, setCategorizedHistory] = useState({
    today: [],
    yesterday: [],
    thisWeek: [],
    lastWeek: [],
    lastMonth: [],
  });

  // State to manage collapsible sections
  const [openSections, setOpenSections] = useState({
    today: true,
    yesterday: false,
    thisWeek: false,
    lastWeek: false,
    lastMonth: false,
  });

  const handleChatSelect = (chat) => {
    onChatSelect(chat);
    onCloseDrawer(); 
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const isThisWeek = (date) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    return date >= startOfWeek && isWithinLastWeek(date);
  };

  const isWithinLastWeek = (date) => {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    return date >= weekAgo && date < today;
  };

  const isWithinLastMonth = (date) => {
    const today = new Date();
    const monthAgo = new Date();
    monthAgo.setMonth(today.getMonth() - 1);
    return date >= monthAgo && date < today;
  };

  const categorizeHistory = (history) => {
    const today = [];
    const yesterday = [];
    const thisWeek = [];
    const lastWeek = [];
    const lastMonth = [];

    history.forEach((chat) => {
      const chatDate = new Date(chat.created_at);
      if (isToday(chatDate)) {
        today.push(chat);
      } else if (isYesterday(chatDate)) {
        yesterday.push(chat);
      } else if (isThisWeek(chatDate)) {
        thisWeek.push(chat);
      } else if (isWithinLastWeek(chatDate)) {
        lastWeek.push(chat);
      } else if (isWithinLastMonth(chatDate)) {
        lastMonth.push(chat);
      }
    });

    setCategorizedHistory({ today, yesterday, thisWeek, lastWeek, lastMonth });
  };

  const getChatHistory = async () => {
    try {
      const history = await fetchchatHistory();
      if (!history) {
        throw new Error('No chat history available');
      }
      setChatHistory(history);
      categorizeHistory(history);
    } catch (err) {
      console.error('Error fetching chat history:', err);
      setError('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [section]: !prevOpenSections[section],
    }));
  };

  return (
    <Box
      sx={{
        width: { xs: drawerWidth, sm: drawerWidth },
        height: "100vh",
        overflowX: "hidden",
        overflowY: "scroll",
        position: "fixed",
        display: { xs: "block", sm: "block" },
      }}
    >
      <List sx={{ marginTop: 4 }}>
        <ListItem
          button
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemIcon>
            <ExploreOutlined />
          </ListItemIcon>
          <ListItemText
            primary="Explore GPT"
            primaryTypographyProps={{ fontSize: "13px" }}
          />
        </ListItem>
        <ListItem
          button
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemIcon>
            <Assistant />
          </ListItemIcon>
          <ListItemText
            primary="KAR AI"
            primaryTypographyProps={{ fontSize: "14px" }}
          />
        </ListItem>
      </List>
      <Divider />

      {/* Today Section */}
      <List>
        <ListItem
          button
          onClick={() => toggleSection('today')}
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText primary="Today" primaryTypographyProps={{ fontSize: "13px" }} />
          {openSections.today ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.today} timeout="auto" unmountOnExit>
          {categorizedHistory.today.map((chat, index) => (
            <ListItem
              key={index}
              onClick={() => handleChatSelect(chat)}
              sx={{
                borderRadius: 4,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <ListItemText
                primary={chat.prompt || 'No message'}
                secondary={new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              />
            </ListItem>
          ))}
        </Collapse>
      </List>
      <Divider />

      {/* Yesterday Section */}
      <List>
        <ListItem
          button
          onClick={() => toggleSection('yesterday')}
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText primary="Yesterday" primaryTypographyProps={{ fontSize: "13px" }} />
          {openSections.yesterday ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.yesterday} timeout="auto" unmountOnExit>
          {categorizedHistory.yesterday.map((chat, index) => (
            <ListItem
              key={index}
              onClick={() => handleChatSelect(chat)}
              sx={{
                borderRadius: 4,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <ListItemText primary={chat.prompt || 'No message'} secondary="Yesterday" />
            </ListItem>
          ))}
        </Collapse>
      </List>
      <Divider />

      {/* This Week Section */}
      <List>
        <ListItem
          button
          onClick={() => toggleSection('thisWeek')}
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText primary="This Week" primaryTypographyProps={{ fontSize: "13px" }} />
          {openSections.thisWeek ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.thisWeek} timeout="auto" unmountOnExit>
          {categorizedHistory.thisWeek.map((chat, index) => (
            <ListItem
              key={index}
              onClick={() => handleChatSelect(chat)}
              sx={{
                borderRadius: 4,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <ListItemText
                primary={chat.prompt || 'No message'}
                secondary={new Date(chat.created_at).toLocaleDateString('en-US', { weekday: 'long' })}
              />
            </ListItem>
          ))}
        </Collapse>
      </List>
      <Divider />

      {/* Last Week Section */}
      <List>
        <ListItem
          button
          onClick={() => toggleSection('lastWeek')}
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText primary="Last Week" primaryTypographyProps={{ fontSize: "13px" }} />
          {openSections.lastWeek ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.lastWeek} timeout="auto" unmountOnExit>
          {categorizedHistory.lastWeek.map((chat, index) => (
            <ListItem
              key={index}
              onClick={() => handleChatSelect(chat)}
              sx={{
                borderRadius: 4,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <ListItemText primary={chat.prompt || 'No message'} secondary="Last Week" />
            </ListItem>
          ))}
        </Collapse>
      </List>
      <Divider />

      {/* Last Month Section */}
      <List>
        <ListItem
          button
          onClick={() => toggleSection('lastMonth')}
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText primary="Last Month" primaryTypographyProps={{ fontSize: "13px" }} />
          {openSections.lastMonth ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSections.lastMonth} timeout="auto" unmountOnExit>
          {categorizedHistory.lastMonth.map((chat, index) => (
            <ListItem
              key={index}
              onClick={() => handleChatSelect(chat)}
              sx={{
                borderRadius: 4,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <ListItemText primary={chat.prompt || 'No message'} secondary="Last Month" />
            </ListItem>
          ))}
        </Collapse>
      </List>
    </Box>
  );
};

export default DrawerComponent;
