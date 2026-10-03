import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server);

const PORT = 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (message) => {
    console.log("message", message);
  });

  socket.on("offer", (offer) => {
    console.log("offer received from :", socket.id);
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    console.log("Answer received from:", socket.id);

    socket.broadcast.emit("answer", answer);
  });
  socket.on("ice-candidate", (candidate) => {
    socket.broadcast.emit("candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
