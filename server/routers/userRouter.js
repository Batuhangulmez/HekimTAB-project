import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import tokenModel from "../models/tokenModel.js";

const router = express.Router();

// localhost:3001/users 'a yapılan post isteği
router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      profession,
      title,
      userType,
      image,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists)
      return res
        .status(400)
        .json({ message: "Daha Önce Mail Adresi Kullanılmış" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Şifre Doğrulama Hatalı" });

    if (firstName == "" || lastName == "")
      return res.status(400).json({ message: "Lütfen adınızı giriniz" });

    if (email == "")
      return res.status(400).json({ message: "Mail adresi hatalı" });

    if (profession == "" || title == "")
      return res
        .status(400)
        .json({ message: "LÜtfen Doktorluk bilgilerinizi doldurunuz" });

    const hasdedPassword = await bcrypt.hash(password, 2);

    const getUserType = async () => {
      if (
        title == "Prof. Dr." ||
        title == "Doç. Dr." ||
        title == "Dr. Öğr. Üyesi"
      )
        return "PROFESSOR";
      else if (
        title == "Yrd. Doç." ||
        title == "Op. Dr." ||
        title == "Uzm. Dr."
      ) {
        return "EXPERT";
      } else return "STUDENT";
    };

    const user = await User.create({
      fullname: `${firstName} ${lastName} `,
      email,
      password: hasdedPassword,
      userType: await getUserType(),
      profession,
      title,
      image,
    });

    const accessToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3m",
      }
    );

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    await tokenModel.create({
      userId: user._id,
      refreshToken: refreshToken,
    });

    return res.status(200).json({ user, accessToken });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect)
      return res.status(404).json({
        message: "Giriş Yapılamadı Bilgileri Kontrol Edip Tekrar Deneyin",
      });

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

// get user profil info from database

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = await User.find({ _id: id });
    res.status(200).json(userInfo[0]);
  } catch (error) {
    res.status(404).json({ message: "user not found" });
  }
});

export default router;
