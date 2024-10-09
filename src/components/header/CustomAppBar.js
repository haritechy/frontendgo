import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AccountCircleOutlined,
  Build,
  Settings,
  Psychology,
  LogoutOutlined,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const PERSON_NAME = "Hariharan";

const CustomAppBar = ({ toggleDrawer }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { fullname } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 
  
  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
  
        boxShadow: "none",
      }}
      elevation={0.8}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, color: "gray" }}
        >
          <MenuIcon />
        </IconButton>

     
          <Button
            variant="outlined"
            sx={{
              border: "none",
              color: "gray",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: { xs: "16px", sm: "20px" },
            }}
            onClick={() => console.log("KaraiGPT button clicked")}
          >
            KaraiChatBot
          </Button>
     

        <IconButton onClick={handleMenuOpen} color="inherit">
          <Avatar sx={{ bgcolor: "red" }}>
            {fullname ? fullname[0].toUpperCase() : "H"}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          keepMounted
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
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
