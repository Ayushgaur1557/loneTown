import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4edff]">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-purple-800">Welcome to Lone Town</h1>
        <p className="text-gray-600">
          A slow, mindful matchmaking app. You get only one intentional match per day.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link to="/match" className="bg-purple-100 px-4 py-2 rounded font-medium text-purple-800">
            Go to Today’s Match
          </Link>

          <Link to="/chat" className="border px-4 py-2 rounded w-full max-w-xs text-black">
            Open Chat
          </Link>

          <Link to="/reflection" className="border px-4 py-2 rounded w-full max-w-xs text-black">
            View Reflection
          </Link>
        </div>

        <Link to="/onboarding" className="text-sm text-purple-600 hover:underline">
          Edit Compatibility Profile
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
