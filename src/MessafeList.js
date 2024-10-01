// MessageList.js
import React from "react";
import { List, ListItem, Avatar, Paper, ListItemText, Typography, CircularProgress } from "@mui/material";

function MessageList({ messages, isBotTyping }) {
  return (
    <List>
      {messages.map((msg, index) => (
        <ListItem key={index} alignItems="flex-start" sx={{ justifyContent: msg.side === "right" ? "flex-end" : "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", flexDirection: msg.side === "right" ? "row-reverse" : "row" }}>
            <Avatar alt={msg.name} src={msg.img} sx={{ marginRight: msg.side === "left" ? 2 : 0, marginLeft: msg.side === "right" ? 2 : 0 }} />
            <Paper elevation={3} sx={{ bgcolor: msg.side === "right" ? "#e0f7fa" : "#f1f1f1", p: 2, borderRadius: 2, maxWidth: "70%" }}>
            <ListItemText
  primary={msg.name}
  primaryTypographyProps={{
    fontWeight: "bold",
    textAlign: msg.side === "right" ? "right" : "left"
  }}
  secondary={
    msg.text
      .replace(/[#!&*-:,/`]/g, "") 
      .split('\n')
      .map((line, index) => (
        <div key={index} style={{ textAlign: "start" }}>
          {line}
        </div>
      ))
  }
/>

              <Typography variant="caption" color="textSecondary" sx={{ textAlign: msg.side === "right" ? "right" : "left" }}>
                {msg.time}
              </Typography>
            </Paper>
          </div>
        </ListItem>
      ))}
      {isBotTyping && (
        <ListItem alignItems="flex-start">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar alt="KAR AI CHAT" src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg" sx={{ marginRight: 2 }} />
            <Paper elevation={3} sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2 }}>
              <CircularProgress size={20} /> Typing...
            </Paper>
          </div>
        </ListItem>
      )}
    </List>
  );
}

export default MessageList;
