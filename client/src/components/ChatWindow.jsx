import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from "socket.io-client";
import axios from "axios";

// ✅ move socket creation inside component
let socket;

const ChatWindow = ({ matchId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!userId || !matchId) return;

    // ✅ connect socket only once
    if (!socket) {
      socket = io("http://localhost:5000");
    }

    socket.emit("join", { userId });

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${matchId}`);
        const formatted = res.data.map((msg) => ({
          sender: msg.sender,
          text: msg.content,
        }));
        setMessages(formatted);
      } catch (err) {
        console.error("❌ Failed to load messages", err);
      }
    };

    fetchMessages();

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, { sender: msg.sender, text: msg.content }]);
    });

    return () => {
      socket.off("message");
    };
  }, [matchId, userId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      matchId,
      sender: userId,
      content: input.trim(),
    };

    socket.emit("message", messageData);
    setMessages((prev) => [...prev, { sender: userId, text: input.trim() }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <Card className="flex flex-col flex-1 shadow-md mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Conversation</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-3 max-h-[60vh]">
        <ScrollArea className="h-full pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.sender === userId
                  ? "ml-auto bg-[#AA14EC] text-white"
                  : "mr-auto bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </ScrollArea>
      </CardContent>

      <CardFooter className="gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={sendMessage} className="bg-[#AA14EC]">
          Send
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;
