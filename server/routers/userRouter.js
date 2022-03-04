import express from "express"
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

const router = express.Router();

// localhost:3000/users 'a yapılan post isteği
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const { fullname, email, password, userType } = req.body;

        const userExists = await User.findOne({ email })
        if (userExists)
            return res.status(400).json({ message: 'user already exists' })

        const hasdedPassword = await bcrypt.hash(password, 2)

        const createdUser = await User.create({
            fullname,
            email,
            password: hasdedPassword,
            userType
        })

        return res.status(201).json(createdUser);
    } catch (error) {
        console.log(error);
        return res.json({ message: ' create user failed' })
    }
})

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user)
            return res.status(400).json({ message: "user does not exist" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "wrong Password" })

        return res.status(200).json({ user, message: "Authentication successful" })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

})

export default router