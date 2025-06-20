// /server/sockets/socket.js
import Message from "../models/message.model.js";

export default function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("join", ({ userId }) => {
      socket.join(userId);
      console.log(`👤 ${userId} joined`);
    });

   socket.on("message", async ({ matchId, sender, content }) => {
  console.log("💬 Message from", sender, "=>", content);

  try {
    const newMessage = await Message.create({ matchId, sender, content }); // ✅ FIXED

    // Emit to others
    socket.broadcast.emit("message", { matchId, sender, content });
  } catch (err) {
    console.error("❌ Failed to save message:", err.message);
  }
});


    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.id);
    });
  });
}
