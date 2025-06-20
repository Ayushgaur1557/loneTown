import { useEffect, useState } from "react";
import axios from "axios";
import MatchCard from "../components/MatchCard";

const calculateCompatibility = (user1, user2) => {
  const opennessDiff = Math.abs((user1.openness || 50) - (user2.openness || 50));
  const opennessScore = 100 - opennessDiff;

  const intentionsMatch = user1.intentions === user2.intentions ? 1 : 0;

  const valuesA = user1.values || [];
  const valuesB = user2.values || [];
  const sharedValues = valuesA.filter((val) => valuesB.includes(val));
  const valuesScore = (sharedValues.length / Math.max(valuesA.length, 1)) * 100;

  const total = Math.round(
    (opennessScore * 0.4) + (intentionsMatch * 30) + (valuesScore * 0.3)
  );

  return Math.min(100, total);
};

const Match = () => {
  const userId = localStorage.getItem("userId");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/matches/${userId}`);
        const selfId = userId;

        const enrichedMatches = res.data.map((match) => {
          const otherUser = match.userA._id === selfId ? match.userB : match.userA;
          const selfUser = match.userA._id === selfId ? match.userA : match.userB;

          return {
            _id: otherUser._id,
            name: otherUser.name,
            age: otherUser.age || "N/A",
            bio: otherUser.bio || "Mindful soul ✨",
            compatibility: calculateCompatibility(selfUser, otherUser),
          };
        });

        setMatches(enrichedMatches);
      } catch (err) {
        console.error("❌ Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchMatches();
  }, [userId]);

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      {loading ? (
        <p>Loading matches...</p>
      ) : matches.length > 0 ? (
        matches.map((match) => <MatchCard key={match._id} match={match} />)
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>No matches found yet.</p>
        </div>
      )}
    </div>
  );
};

export default Match;
