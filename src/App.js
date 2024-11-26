import React, { useState, useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to the backend

const App = () => {
  const [chats, setChats] = useState([
    { id: 1, name: "John Doe", lastOnline: Date.now() },
    { id: 2, name: "Jane Smith", lastOnline: Date.now() },
    { id: 3, name: "Alex Johnson", lastOnline: Date.now() },
  ]);
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Handle selecting a chat
  const handleSelectChat = (chatId) => {
    if (currentChatId !== chatId) {
      setCurrentChatId(chatId);
      socket.emit("join_chat", chatId); // Emit only when switching chats
    }
  };

  // Listen for new messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Send message to the server and simulate a response
  const handleSendMessage = (message) => {
    if (currentChatId) {
      const newMessage = {
        chatId: currentChatId,
        message,
        sender: "You", // Assuming "You" as the sender for demo
      };

      // Emit the message to the server
      socket.emit("send_message", newMessage);

      // Update the UI immediately with the new message
      setMessages((prev) => [...prev, newMessage]);

      // Simulate a server response after a delay
      setTimeout(() => {
        const responseMessage = {
          chatId: currentChatId,
          message: "hello ! how u doing?",
          sender: "Server", // Simulating the server response
        };
        setMessages((prev) => [...prev, responseMessage]);
      }, 2000); // Simulating a 2-second delay for server response
    }
  };

  return (
    <div className="flex h-screen">
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
      <ChatWindow
        chatId={currentChatId}
        chats={chats}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default App;
