import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const MatchCard = ({ match }) => {
  const [isPinned, setIsPinned] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const navigate = useNavigate();

  if (!match) return <p>No match found.</p>;

  const handlePin = () => {
    setIsPinned(true);
    toast.success("Match pinned! Start your conversation.");
  };

  const handleUnpin = () => {
    setIsPinned(false);
    setIsFrozen(true);
    toast.info("You've unpinned. Reflection period started.");
  };

  return (
    <Card className="shadow-md bg-white transition hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">
          {match.name}, {match.age || "N/A"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compatibility: {match.compatibility}%
        </p>
      </CardHeader>

      <CardContent className="space-y-2">
        <p>{match.bio || "No bio available."}</p>
        {isFrozen && (
          <p className="text-yellow-600 text-sm italic">
            Reflection mode active. You’ll get a new match in 2 hours.
          </p>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {!isPinned && !isFrozen && (
          <Button onClick={handlePin} className="bg-[#AA14EC] text-white">
            Pin Match
          </Button>
        )}
        {isPinned && (
          <Button variant="destructive" onClick={handleUnpin}>
            Unpin Match
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => navigate(`/profile/${match._id}`)}
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
