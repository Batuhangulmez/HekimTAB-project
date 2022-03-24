import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import tokenModel from "../models/tokenModel.js";

const router = express.Router();

// localhost:3001/users 'a yapılan post isteği
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, userType } =
      req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "user already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "passwords do not match" });

    const hasdedPassword = await bcrypt.hash(password, 2);

    const createdUser = await User.create({
      fullname: `${firstName} ${lastName} `,
      email,
      password: hasdedPassword,
      userType,
    });

    const accessToken = jwt.sign(
      { email: createdUser.email, id: createdUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3m",
      }
    );

    const refreshToken = jwt.sign(
      { email: createdUser.email, id: createdUser._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    await tokenModel.create({
      userId: createdUser._id,
      refreshToken: refreshToken,
    });

    return res.status(200).json({ createdUser, accessToken });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "user not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect)
      return res
        .status(404)
        .json({ message: "check your login information and try again" });

    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3m" }
    );

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    await tokenModel.findOneAndUpdate(
      { userId: user._id },
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/logout/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await tokenModel.findOneAndUpdate(
      { userId: id },
      {
        refreshToken: null,
      },
      { new: true }
    );
    res.status(200).json({ message: "logout complete" });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
