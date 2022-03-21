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
    if (!user) return res.status(400).json({ message: "user does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "wrong Password" });

    return res.status(200).json({ user, message: "Authentication successful" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router;
