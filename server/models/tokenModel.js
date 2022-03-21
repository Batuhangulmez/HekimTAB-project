import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
  },
});

const tokenModel = mongoose.model("token", tokenSchema);

export default tokenModel;
