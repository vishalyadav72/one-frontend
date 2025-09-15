const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const db = require("./backend1/config/db");

const authRoutes = require("./backend1/routes/authRoutes");
const jobRoutes = require("./backend1/routes/jobRoutes");
const applicationRoutes = require("./backend1/routes/applicationRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Socket.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});
global.io = io;

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
