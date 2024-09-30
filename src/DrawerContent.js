import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  ListItemIcon,
} from "@mui/material";
import ExploreOutlined from "@mui/icons-material/ExploreOutlined";
import Assistant from "@mui/icons-material/Assistant";

const drawerWidth = 240;

const historyData = {
  today: [
    { primary: "Meeting with Team A", secondary: "10:00 AM" },
    { primary: "Lunch with Client B", secondary: "12:30 PM" },
  ],
  previous7Days: [
    { primary: "Project Update Call", secondary: "Sept 28" },
    { primary: "Feedback Session with User A", secondary: "Sept 26" },
  ],
  lastWeek: [
    { primary: "Weekly Team Sync", secondary: "Sept 24" },
    { primary: "Client Review Meeting", secondary: "Sept 22" },
  ],
};

const DrawerComponent = () => {
  return (
    <Box sx={{ width: drawerWidth, overflow: "auto" }}>
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
          <ListItemText primary="KAR AI" primaryTypographyProps={{ fontSize: "14px" }} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText primary="Today" primaryTypographyProps={{ fontSize: "13px" }} />
        </ListItem>
        <Divider />
        {historyData.today.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ListItemText
              primary={item.primary}
              secondary={item.secondary}
              primaryTypographyProps={{ fontSize: "13px" }}
            />
          </ListItem>
        ))}
        <Divider />
        <ListItem
          button
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText primary="Previous 7 Days" primaryTypographyProps={{ fontSize: "13px" }} />
        </ListItem>
        {historyData.previous7Days.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ListItemText
              primary={item.primary}
              secondary={item.secondary}
              primaryTypographyProps={{ fontSize: "13px" }}
            />
          </ListItem>
        ))}
        <Divider />
        <ListItem
          button
          sx={{
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ListItemText primary="Last Week" primaryTypographyProps={{ fontSize: "13px" }} />
        </ListItem>
        {historyData.lastWeek.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ListItemText
              primary={item.primary}
              secondary={item.secondary}
              primaryTypographyProps={{ fontSize: "13px" }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* Dummy data section for recent chats */}
      <Box sx={{ padding: 1 }}>
        <Typography variant="subtitle1" primaryTypographyProps={{ fontSize: "13px" }}>
          Recent Chats
        </Typography>
        <List>
          <ListItem
            sx={{
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ListItemText
              primary="Chat with User A"
              secondary="Yesterday"
              primaryTypographyProps={{ fontSize: "13px" }}
            />
          </ListItem>
          <ListItem
            sx={{
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ListItemText
              primary="Chat with User B"
              secondary="2 Days Ago"
              primaryTypographyProps={{ fontSize: "13px" }}
            />
          </ListItem>
          <ListItem
            sx={{
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ListItemText
              primary="Chat with User C"
              secondary="3 Days Ago"
              primaryTypographyProps={{ fontSize: "13px" }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default DrawerComponent;
