import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControlLabel,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import TemplateFrame from "../../theme/TemplateFrame"; // Assuming this is a shared layout
import getSignUpTheme from "../../theme/getSignUpTheme";
import logo from "../../assets//logoText.png";
import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from "../../theme/customIcons/CustomIcons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function AuthForm({ modes = "signup" }) {
  const [mode, setMode] = useState("light");
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [showSignIn, setShowSignIn] = useState(modes === "signin");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const navigate = useNavigate(); // Declare the useNavigate hook
  const toggleAuthMode = () => {
    setShowSignIn(!showSignIn);
  };
  const { login, signup } = useAuth(); // Use the AuthContext
  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const fullname = document.getElementById("fullname");
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!showSignIn && (!fullname.value || fullname.value.length < 1)) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
  
    const data = new FormData(event.currentTarget);
    const userDetails = {
      fullname: data.get("fullname"),
      email: data.get("email"),
      password: data.get("password"),
    };
  
    try {
      if (showSignIn) {
        await login(userDetails.email, userDetails.password);
        toast.success('Successfully signed in!');
      } else {
        await signup(userDetails.fullname, userDetails.email, userDetails.password);
        toast.success('Account created successfully!');
      }
  
      navigate("/chat");  // Navigate on success
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); 
  };

  return (
    <TemplateFrame
      toggleCustomTheme={() => setShowCustomTheme((prev) => !prev)}
      showCustomTheme={showCustomTheme}
      toggleColorMode={toggleColorMode}
    >
          {/* Add this here */}
      <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
    
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <img src={logo} style={{ height: "auto", width: "200px" }} />
            <Typography component="h1" variant="h4">
              {showSignIn ? "Sign in" : "Sign up"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {!showSignIn && (
                <FormControl>
                  <FormLabel htmlFor="fullname">Full name</FormLabel>
                  <TextField
                    autoComplete="name"
                    name="fullname"
                    required={!showSignIn}
                    fullWidth
                    id="fullname"
                    placeholder="Jon Snow"
                    error={nameError}
                    helperText={nameErrorMessage}
                  />
                </FormControl>
              )}
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete={
                    showSignIn ? "current-password" : "new-password"
                  }
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                />
              </FormControl>
              {!showSignIn && (
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive updates via email."
                />
              )}
              <Button type="submit" fullWidth variant="contained">
                {showSignIn ? "Sign in" : "Sign up"}
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                {showSignIn ? (
                  <>
                    Don't have an account?{" "}
                    <Link component="button" onClick={toggleAuthMode}>
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link component="button" onClick={toggleAuthMode}>
                      Sign in
                    </Link>
                  </>
                )}
              </Typography>
            </Box>
            <Divider>
              <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button variant="outlined" fullWidth startIcon={<GoogleIcon />}>
                Continue with Google
              </Button>
              <Button variant="outlined" fullWidth startIcon={<FacebookIcon />}>
                Continue with Facebook
              </Button>
            </Box>
          </Card>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
