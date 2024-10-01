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
import logo from "./logo1.png";

const ChatComponent = ({
  messages,
  isBotTyping,
  handleSubmit,
  inputValue,
  setInputValue,
}) => {
  const isBoldText = (text) => {
    return text.startsWith("**") && text.endsWith("**");
  };

  const formatText = (text) => {
   
    if (isBoldText(text)) {
      return text.slice(2, -2); 
    }
    return text; 
  };

  return (
    <Container maxWidth="lg">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { xs: "100%", sm: "100%" },
          mt: { xs: 6, sm: 8 },
        }}
      >
        {messages.length === 1 && (
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

        {messages.length > 1 && (
          <Box width="100%">
            <List>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  sx={{
                    justifyContent: msg.side === "right" ? "flex-end" : "flex-start",
                  }}
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
                        marginLeft: msg.side === "right" ? 2 : 0,
                        width: { xs: 30, sm: 40 },
                        height: { xs: 30, sm: 40 },
                      }}
                    />
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: msg.side === "right" ? "#f1f1f1" : "",
                        p: 2,
                        borderRadius: 2,
                        maxWidth: "70%",
                        color: "black", 
                        mt: 1, 
                      }}
                    >
                      <ListItemText
                        primary={msg.name}
                        secondary={
                          msg.text
                            .split("\n")
                            .map((line, index) => (
                              <div
                                key={index}
                                style={{
                                  textAlign: "start",
                                  lineHeight: 1.8,
                                  fontWeight: isBoldText(line) ? "bold" : "normal", // Set font weight based on bold check
                                  color: "black", 
                                }}
                              >
                                {formatText(line)} {/* Format text to remove asterisks */}
                              </div>
                            ))
                        }
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
                <ListItem
                  alignItems="flex-start"
                  sx={{ justifyContent: "flex-start" }}
                >
                  <Avatar
                    alt={"Bot"}
                    src={logo}
                    sx={{ marginRight: 2 }}
                  />
                  <CircularProgress size={24} />
                </ListItem>
              )}
            </List>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            placeholder="Message To Kar ai Chatbot..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              position: "fixed",
              bottom: 18,
              width: {
          
                xs: "80vw",
                lg: "70vw",
                xl: "70vw",
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
