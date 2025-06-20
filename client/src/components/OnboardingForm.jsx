import { useEffect, useState } from "react";
import axios from "axios";

const OnboardingForm = () => {
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    name: "",
    age: "",
    bio: "",
    openness: 50,
    intentions: "",
    values: [],
    gender: "other",
  });

  const [loading, setLoading] = useState(true);
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        if (res.data) {
          setIsExistingUser(true);
          setForm({
            name: res.data.name || "",
            age: res.data.age || "",
            bio: res.data.bio || "",
            openness: res.data.openness || 50,
            intentions: res.data.intentions || "",
            values: res.data.values || [],
            gender: res.data.gender || "other",
          });
        }
      } catch (err) {
        console.warn("No existing user found (assuming onboarding)");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValuesChange = (e) => {
    setForm((prev) => ({
      ...prev,
      values: e.target.value.split(",").map((v) => v.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = `http://localhost:5000/api/users/${userId}`;
      const method = isExistingUser ? axios.put : axios.post;
      await method(endpoint, form);

      alert("✅ Profile saved!");
    } catch (err) {
      console.error("❌ Save failed", err);
      alert("Error saving profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="w-full p-2 border" />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="w-full p-2 border" />
      
      <label>
        How open are you emotionally? (1–100)
        <input
          name="openness"
          type="range"
          min="0"
          max="100"
          value={form.openness}
          onChange={handleChange}
        />
        <div>Openness: {form.openness}</div>
      </label>

      <textarea
        name="intentions"
        value={form.intentions}
        onChange={handleChange}
        placeholder="e.g., Looking for something long-term with emotional depth."
        className="w-full p-2 border"
      />

      <textarea
        name="values"
        value={form.values.join(", ")}
        onChange={handleValuesChange}
        placeholder="e.g., Kindness, growth, empathy, stability"
        className="w-full p-2 border"
      />

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full p-2 border"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded">
        {isExistingUser ? "Update Profile" : "Submit"}
      </button>
    </form>
  );
};

export default OnboardingForm;
