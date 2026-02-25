const postModel = require("../models/post.model")
const ImageKit  = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
    console.log(req.body,req.file)

    /*
    * repeated code
     */

    // const token = req.cookies.token
    // if(!token){
    //     return res.status(401).json({
    //         message:"Token not provided, Unauthorized access"
    //     })
    // }

    // let decoded = null;

    // try {
    //     decoded = jwt.verify(token , process.env.JWT_SECRET)
    // } catch (err){
    //     return res.status(401).json({
    //         message: "User Not Authorized."
    //     })
    // }

    // console.log(decoded)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",
        folder: "cohort-2-Insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created sucessfully.",
        post
    })

    
}

async function getPostController(req,res){

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Post fached successfully.",
        posts
    })
}

async function getPostDetailsController(req,res){

    const userId = req.user.id
    
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message: "Post not Found."
        })
    }
    const isValidUser = post.user.toString() === userId
    if(!isValidUser){
        return res.status(401).json({
            message: "Forbidden content."
        })
    }

    return res.status(200).json({
        message:"Post fetched successfully.",
        post
    })

}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}