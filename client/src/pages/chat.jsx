import ChatWindow from "../components/ChatWindow";
import { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  const userId = localStorage.getItem("userId");
  const [matchId, setMatchId] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/matches/${userId}`);
        if (res.data.length > 0) {
          setMatchId(res.data[0]._id); // Or allow choosing from multiple later
        }
      } catch (err) {
        console.error("❌ Failed to load match", err);
      }
    };

    if (userId) fetchMatch();
  }, [userId]);

  if (!userId) return <div>Please login first</div>;
  if (!matchId) return <div>Loading chat...</div>;

  return (
    <div className="h-screen p-4 flex flex-col">
      <ChatWindow userId={userId} matchId={matchId} />
    </div>
  );
};

export default Chat;
