// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { BOT_API, CHAT_HISTORY_API, LOGIN_API, SIGNUP_API } from '../const/apiconfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [fullname, setFullname] = useState(null); 

  const login = async (email, password) => {
    try {
      const response = await fetch(LOGIN_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setToken(data.login_token);
      setFullname(data.data.fullname);
      localStorage.setItem('authToken', data.login_token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (fullname, email, password) => {
    try {
      const response = await fetch(SIGNUP_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const fetchBotResponse = async (userMessageText) => {

    const loginToken =localStorage.getItem("authToken")
    try {
      const response = await fetch(BOT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${loginToken}`,
        },
        body: JSON.stringify({ prompt: userMessageText }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bot response");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Failed to fetch bot message:", error);
      return null;
    }
  };

  const fetchchatHistory = async () => {
    const loginToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(CHAT_HISTORY_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${loginToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }
  
      const data = await response.json();
      
      // Ensure 'response' has the expected structure
      if (!data || !data.history) {
        console.error("Invalid chat history structure");
        return null;
      }
      
      return data.history;
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
      return null;
    }
  };
  
  return (
    <AuthContext.Provider value={{ token, login, signup, fullname, fetchBotResponse,fetchchatHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
