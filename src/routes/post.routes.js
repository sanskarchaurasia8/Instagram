const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")


/*
*POST /api/posts[protected]
* req.body = {caption,img-file}
*/ 
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

/*
* GET /api/posts/ [protected]
*/
postRouter.get("/",identifyUser,postController.getPostController)

/*
* GET /api/posts/datails/:postid
*return an detail about specific post with the id. also cheak whether the post belong to the user that is requesting come from  
*/
postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)


module.exports = postRouter