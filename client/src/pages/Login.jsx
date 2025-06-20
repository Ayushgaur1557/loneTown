import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FlippableAuthCard = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    type === "signup"
      ? setSignupInput((prev) => ({ ...prev, [name]: value }))
      : setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
  try {
    setLoading(true);
    const res = await axios.post("http://localhost:5000/api/auth/login", loginInput);

    toast.success("Login successful");

    // ✅ Save token AND user ID
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user._id); // ← Add this line

    navigate("/"); // Redirect to home or dashboard
  } catch (err) {
    toast.error(err?.response?.data?.error || "Login failed");
  } finally {
    setLoading(false);
  }
};


  const handleSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/signup", signupInput);
      toast.success("Signup successful");
      setIsFlipped(false);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0ECFF] to-[#E2D9FB] py-12">
      <div className="relative w-full max-w-md h-[500px] perspective-[1200px]">
        <div
          className={`relative w-full h-full duration-700 transition-transform transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front - Login */}
          <div className="absolute w-full h-full backface-hidden rotate-y-0">
            <div className="bg-white rounded-xl shadow-xl p-6 space-y-4 flex flex-col justify-center h-full">
              <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
              <p className="text-sm text-muted-foreground text-center mb-4">Login to your account</p>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  placeholder="you@example.com"
                  value={loginInput.email}
                  onChange={(e) => handleChange(e, "login")}
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={loginInput.password}
                  onChange={(e) => handleChange(e, "login")}
                />
              </div>

              <Button
                className="w-full bg-[#AA14EC]"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <p className="text-sm text-center mt-2">
                Don’t have an account?{" "}
                <span
                  className="text-[#AA14EC] font-medium cursor-pointer"
                  onClick={() => setIsFlipped(true)}
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>

          {/* Back - Signup */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <div className="bg-white rounded-xl shadow-xl p-6 space-y-4 flex flex-col justify-center h-full">
              <h2 className="text-2xl font-semibold text-center">Create Account</h2>
              <p className="text-sm text-muted-foreground text-center mb-4">Let’s get you started</p>

              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  placeholder="Your name"
                  value={signupInput.name}
                  onChange={(e) => handleChange(e, "signup")}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  placeholder="you@example.com"
                  value={signupInput.email}
                  onChange={(e) => handleChange(e, "signup")}
                />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={signupInput.password}
                  onChange={(e) => handleChange(e, "signup")}
                />
              </div>

              <Button
                className="w-full bg-[#AA14EC]"
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Signup"
                )}
              </Button>

              <p className="text-sm text-center mt-2">
                Already have an account?{" "}
                <span
                  className="text-[#AA14EC] font-medium cursor-pointer"
                  onClick={() => setIsFlipped(false)}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippableAuthCard;
