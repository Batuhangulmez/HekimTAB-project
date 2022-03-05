import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    category: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    creator: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model('post', postSchema)