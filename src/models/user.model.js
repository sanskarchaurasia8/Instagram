const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "username Already Axist"],
        required: [true, "Username Is Required"]
    },
    email: {
        type: String,
        unique: [true, "Email Already Axist"],
        required: [true, "Email Is Required"]
    },
    password: {
        type: String,
        required: [true, "password Is Required"]
    },
    Bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/6nq7jrnau/default-user.webp"
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel