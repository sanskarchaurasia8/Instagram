const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")


/** 
* @route POST /api/posts[protected]
* @discription Create a post with the content and image (optional) provided in the router
*/ 
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

/** 
* @route GET /api/posts/ [protected]
* @discription Get all the post created by the user that the request come from. also 
*/
postRouter.get("/",identifyUser,postController.getPostController)

/** 
* @route GET /api/posts/datails/:postid
* @discription return an detail about specific post with the id. also cheak whether the post belong to the user that is requesting come from  
*/
postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)

/**
 * @route POST /api/posts/like/:postid
 * @description Like a post with the id provided in the request params.
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)


module.exports = postRouter