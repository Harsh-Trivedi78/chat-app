const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { chats } = require("./data/data");
const dotenv = require("dotenv")

const app = express();

dotenv.config();

app.use(cors()); // Enable cross-origin requests

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

const users = {}; // To store connected users and their current chats
const lastOnline = {}; // To store "last online" timestamps for users

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a chat room
  socket.on("join_chat", (chatId) => {
    if (users[socket.id] !== chatId) {
      if (users[socket.id]) {
        socket.leave(users[socket.id]); // Leave the previous chat room
      }

      users[socket.id] = chatId;
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat ${chatId}`);
    }
  });

  // Send a message
  socket.on("send_message", (data) => {
    const { chatId, message, sender } = data;
    io.to(chatId).emit("receive_message", { chatId, message, sender });
  });

  // Disconnect the user
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const chatId = users[socket.id];
    if (chatId) {
      lastOnline[chatId] = Date.now(); // Update last online timestamp
    }
    delete users[socket.id];
  });
});

// Define routes
app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/", (req, res) => {
  res.send("Chat server is running!");
});
app.get("/api/chat/:id", (req, res) => {
    // res.send(req.params.id);
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
  });
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
