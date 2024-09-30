import { Container, Box, List, ListItem, Avatar, Paper, ListItemText, Typography, TextField, IconButton, CircularProgress } from "@mui/material";
import ArrowUpwardOutlined from "@mui/icons-material/ArrowUpwardOutlined";

const drawerWidth = 240; 

const ChatComponent = ({ messages, isBotTyping, handleSubmit, inputValue, setInputValue }) => {
  return (
    <Container maxWidth="xl">
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` }, 
          mt: 8 
        }}
      >
        {/* Chat Messages */}
        <List>
          {messages.map((msg, index) => (
            <ListItem 
              key={index} 
              alignItems="flex-start" 
              sx={{ justifyContent: msg.side === "right" ? "flex-end" : "flex-start" }}
            >
              <Box 
                display="flex" 
                alignItems="center" 
                flexDirection={msg.side === "right" ? "row-reverse" : "row"}
              >
                <Avatar 
                  alt={msg.name} 
                  src={msg.img} 
                  sx={{ 
                    marginRight: msg.side === "left" ? 2 : 0, 
                    marginLeft: msg.side === "right" ? 2 : 0 
                  }} 
                />
                <Paper 
                  elevation={0} 
                  sx={{ 
                    bgcolor: msg.side === "right" ? "#f1f1f1" : "", 
                    p: 2, 
                    borderRadius: 2, 
                    maxWidth: "70%" 
                  }}
                >
                  <ListItemText
                    primary={msg.name}
                    secondary={msg.text}
                    primaryTypographyProps={{ fontWeight: "bold", textAlign: msg.side === "right" ? "right" : "left" }}
                  />
                  <Typography 
                    variant="caption" 
                    color="textSecondary" 
                    sx={{ textAlign: msg.side === "right" ? "right" : "left" }}
                  >
                    {msg.time}
                  </Typography>
                </Paper>
              </Box>
            </ListItem>
          ))}

          {isBotTyping && (
            <ListItem alignItems="flex-start" sx={{ justifyContent: "flex-start" }}>
              <Avatar alt={"Bot"} src={"botImage.jpg"} sx={{ marginRight: 2 }} />
              <CircularProgress size={24} />
            </ListItem>
          )}
        </List>

        {/* Message Input */}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              position: "fixed",
              bottom: 16,
              width: "70%", // Adjusting width
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
