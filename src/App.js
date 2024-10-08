import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./SignUp";
import SignIn from "./components/auth/SignIn";

import { AuthProvider } from "./context/AuthProvider";
import ChatApp from "./chatapp/ChatApp";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
 />
    <Router>
      <Routes>
        <Route path="/" element={<SignIn modes="signin" />} />
        <Route path="/chat" element={<ChatApp/>} />

        {/* <Route path="/" element={<SignIn />} /> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
