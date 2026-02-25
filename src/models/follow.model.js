const mongoose = require("mongoose")


const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "follower is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "followee is required"]
    }
},{
    timestamps: true
})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel