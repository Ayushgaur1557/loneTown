import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("❌ Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-10 text-gray-500">User not found.</p>;
  }

  const avatarUrl =
    user.gender === "male"
      ? "https://i.pravatar.cc/150?img=12"
      : user.gender === "female"
      ? "https://i.pravatar.cc/150?img=47"
      : "https://i.pravatar.cc/150?img=5";

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-20 h-20 rounded-full object-cover shadow"
            />
            <CardTitle className="text-2xl">{user.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700">
          <p><strong>Age:</strong> {user.age || "N/A"}</p>
          <p><strong>Bio:</strong> {user.bio || "No bio available."}</p>
          <p><strong>Gender:</strong> {user.gender || "Not set"}</p>
          <p><strong>Openness:</strong> {user.openness != null ? `${user.openness}/100` : "Not set"}</p>
          <p><strong>Intentions:</strong> {user.intentions || "Not specified"}</p>
          <p><strong>Values:</strong> {(user.values || []).length > 0 ? user.values.join(", ") : "None"}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
