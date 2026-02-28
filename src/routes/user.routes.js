const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();

/** 
 * @route Post /api/users/follow/:userid
 * @discription follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

/**
 * @route Post /api/users/unfollow/:userid
 * @discription unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)


module.exports = userRouter;