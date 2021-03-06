import express from "express";
import mongoose from "mongoose";
import Post from "../models/postModel.js";

// http://localhost:3001/posts
const router = express.Router();

// get all posts from database
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// get single Post from database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: "post id is not valid" });

    const post = await Post.findById(id);
    if (!post) return;

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "post not found" });
  }
});

// get user profil post from database

router.get("/user/:creatorId", async (req, res) => {
  try {
    const { creatorId } = req.params;
    const post = await Post.find({ creatorId: creatorId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "post not found" });
  }
});

// create a post
router.post("/", async (req, res) => {
  try {
    const post = req.body;

    const createdPost = await Post.create(post);

    res.status(201).json(createdPost);
  } catch (error) {
    console.log(error.message);
    res.json({ message: "create post failed" });
  }
});

//  post comments adding
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: "post id is not valid" });

    const comment = req.body;
    const updatePost = await Post.updateOne(
      { _id: id },
      {
        $push: {
          comments: comment,
        },
      },
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
    res.json({ message: "update failed" });
  }
});

// post comment deleted
router.put("/:id/comment/:commentId", async (req, res) => {
  try {
    const { id, commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: "post id is not valid" });

    const updatePost = await Post.updateMany(
      { _id: id },
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    console.log(error);
    res.json({ message: "update failed" });
  }
});

// delete a post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: "post id is not valid" });

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post has benn deleted" });
  } catch (error) {
    console.log(error.message);
    res.json({ message: "post delete failed" });
  }
});

export default router;
