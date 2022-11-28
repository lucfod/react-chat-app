import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { Cfg } from "./config.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: { origin: Cfg.CLIENT },
});

app.use(cors);
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log("connected: " + socket.id);

  socket.on("message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("message", {
      from: socket.id,
      body: msg,
    });
  });
});

server.listen(Cfg.PORT);
console.log("starting on port " + Cfg.PORT);
