import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Match from "./pages/Match";
import Chat from "./pages/Chat";
import Reflection from "./pages/Reflection";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/match" element={<Match />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/reflection" element={<Reflection />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
