import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  creator: {
    type: String,
    require: true,
  },
  creatorId: {
    type: String,
    require: true,
  },
  creatorProfession: {
    type: String,
    require: true,
  },
  creatorİmage: {
    type: String,
    require: true,
  },
  creatorTitle: {
    type: String,
    require: true,
  },
  comments: [
    {
      creatorId: String,
      body: String,
      creatorName: String,
      title: String,
      profession: String,
      cretorİmage: String,
    },
  ],
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("post", postSchema);
