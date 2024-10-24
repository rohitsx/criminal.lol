import { Server, Socket } from "socket.io";
import socketServices from "../services/socketServices";

export function handleSocketConnection(socket: Socket, io: Server) {
  const skService = new socketServices(io);
  const username = socket.handshake.auth.username;

  socket.on("connectPeer", (data = {}) => {
    const { duoSocketId, duoUsername } = data;
    skService.handleUserJoin({
      socketId: socket.id,
      username,
      duoSocketId,
      duoUsername,
    });
  });

  socket.on("message", (m) => io.to(m.to).emit("message", m));
  socket.on("skip", (pairedId: string) => io.to(pairedId).emit("strangerLeft"));
  socket.on("pairedclosedtab", (pairedId: string) => {
    skService.handleCallEnd(pairedId, username, socket.id);
  });
  socket.on("chat", (m: { message: string; to: string }) =>
    io.to(m.to).emit("chat", m.message),
  );

  socket.on("startDuoCall", (to) => {
    io.to(to).emit("connectDuoCall", { name: username, socketId: socket.id });
  });

  socket.on("duoLive", (to: string) => {
    console.log("recived duoLive from", username, "to", to);
    io.to(to).emit("duoLive");
  });
  socket.on("duoClosedTab", (to: string) => io.to(to).emit("duoClosedTab"));
}
