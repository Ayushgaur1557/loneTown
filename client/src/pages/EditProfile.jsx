import { useEffect, useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    name: "",
    age: "",
    bio: "",
    openness: 50,
    intentions: "",
    values: [],
    gender: "other", // ✅ added
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        const user = res.data;
        setForm({
          name: user.name || "",
          age: user.age || "",
          bio: user.bio || "",
          openness: user.openness || 50,
          intentions: user.intentions || "",
          values: user.values || [],
          gender: user.gender || "other", // ✅ added
        });
      } catch (err) {
        console.error("❌ Failed to load profile", err);
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
      await axios.put(`http://localhost:5000/api/users/${userId}`, form);
      alert("✅ Profile updated!");
    } catch (err) {
      console.error("❌ Update failed", err);
      alert("Error updating profile.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="w-full p-2 border" />
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 border" />
        <input name="openness" type="range" min="0" max="100" value={form.openness} onChange={handleChange} />
        
        <select name="intentions" value={form.intentions} onChange={handleChange} className="w-full p-2 border">
          <option value="">Select Intentions</option>
          <option value="long-term">Long-term</option>
          <option value="short-term">Short-term</option>
          <option value="friendship">Friendship</option>
        </select>

        <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 border">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          name="values"
          value={form.values.join(", ")}
          onChange={handleValuesChange}
          placeholder="Values (comma-separated)"
          className="w-full p-2 border"
        />

        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
