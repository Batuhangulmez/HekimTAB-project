import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js'


dotenv.config()

const app = express()


app.use((cors()))
app.use(express.json())
app.use("/users", userRouter)

app.listen(process.env.PORT, () => {
    // connect to database
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('connected DB', (process.env.PORT)))
        .catch((err) => console.log(err))
})