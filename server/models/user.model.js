import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  bio: String,
  openness: Number,
  intentions: String,
  values: [String],
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "other",
  },
});


const User = mongoose.model("User", userSchema);
export default User;
