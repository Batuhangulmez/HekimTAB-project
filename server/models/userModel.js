import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profession: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
    enum: ["USER", "STUDENT", "EXPERT", "PROFESSOR", "ADMIN"],
    default: "USER",
  },
});

export default mongoose.model("User", userSchema);
