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

const PERSON_NAME = "Hariharan";

const CustomAppBar = ({ toggleDrawer }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { fullname } = useAuth(); 
  const navigate = useNavigate(); 
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
    <AppBar position="fixed" sx={{ backgroundColor: "white" }} elevation={0.8}>
      <Toolbar>
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
            ml: { xs: 10, sm: 30 },
          }}
          onClick={() => console.log("KaraiGPT button clicked")}
        >
          KaraiChatBot
        </Button>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center", display: { xs: "none", sm: "flex" } }}
        >
          Chat Application
        </Typography>

        <IconButton onClick={handleMenuOpen} color="inherit"  >
          <Avatar sx={{ bgcolor: "red" }}>{fullname ? fullname[0].toUpperCase() : "H"}</Avatar> 
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
