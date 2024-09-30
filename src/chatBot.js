import React, { useState } from "react";
import "./ChatApp.css";

const BOT_API_URL = "http://localhost:8080/generate"; 
const DB_BOT_URL="http://localhost:8080/get-response"
const BOT_IMG = "https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg";
const PERSON_IMG = "https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg";
const BOT_NAME = "KAR AI CHAT";
const PERSON_NAME = "Hariharan";

function ChatApp() {
  const [messages, setMessages] = useState([
    {
      name: BOT_NAME,
      img: BOT_IMG,
      side: "left",
      text: "Hi, welcome to KAR AI CHAT! Go ahead and send me a message. 😄",
      time: formatDate(new Date())
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;

    const userMessage = {
      name: PERSON_NAME,
      img: PERSON_IMG,
      side: "right",
      text: inputValue,
      time: formatDate(new Date())
    };

    setMessages([...messages, userMessage]);
    setInputValue("");

    setTimeout(() => {
      botResponse(userMessage.text); 
    }, 1000);
  };

  const botResponse = (userMessageText) => {
    setIsBotTyping(true);
    fetchBotResponse(userMessageText)
      .then((botMessage) => {
        const message = botMessage || "Sorry, I didn't understand that. Can you ask in a different way?";
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            name: BOT_NAME,
            img: BOT_IMG,
            side: "left",
            text: message,
            time: formatDate(new Date()),
          },
        ]);
        setIsBotTyping(false);
      })
      .catch((error) => {
        console.error("Error fetching bot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            name: BOT_NAME,
            img: BOT_IMG,
            side: "left",
            text: "Sorry, something went wrong. Please try again later.",
            time: formatDate(new Date()),
          },
        ]);
        setIsBotTyping(false);
      });
  };
  
  const fetchBotResponse = async (userMessageText) => {
    try {
      const response = await fetch(BOT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
  
return (
    <div className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt"></i> Kar AI chat
        </div>
        <div className="msger-header-options">
          <span><i className="fas fa-cog"></i></span>
        </div>
      </header>

      <main className="msger-chat">
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.side}-msg`}>
            <div className="msg-img" style={{ backgroundImage: `url(${msg.img})` }}></div>
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{msg.name}</div>
                <div className="msg-info-time">{msg.time}</div>
              </div>
              {msg.text.replace(/[#!&*-:,/`]/g, "").split('\n').map((line, index) => (
    <div key={index}  style={{
        textAlign:"start"
    }}>{line}</div>
  ))}
            </div>
          </div>
        ))}

        {isBotTyping && (
          <div className="msg left-msg">
            <div className="msg-img" style={{ backgroundImage: `url(${BOT_IMG})` }}></div>
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{BOT_NAME}</div>
                <div className="msg-info-time">{formatDate(new Date())}</div>
              </div>
              <div className="msg-text">Typing...</div>
            </div>
          </div>
        )}
      </main>

      <form className="msger-inputarea" onSubmit={handleSubmit}>
        <input
          type="text"
          className="msger-input"
          placeholder="Message to Kar ai chat"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="msger-send-btn">Send</button>
      </form>
    </div>
  );
}


function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}

export default ChatApp;
