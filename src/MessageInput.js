// MessageInput.js
import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

function MessageInput({ inputValue, setInputValue, handleSubmit }) {
  return (
    <Box component="form" onSubmit={(event) => handleSubmit(event, inputValue)} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
      />
      <IconButton type="submit" color="primary" sx={{ ml: 1 }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default MessageInput;
