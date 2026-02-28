 const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
 
 
 async function registerController(req , res ){
    const{email,password,username,bio,profileImage} = req.body

    // const isUserExistByEmail = await userModel.findOne({email})

    // if(isUserExistByEmail){
    //     return res.status(409).json({
    //         message:"user already exist with same email"
    //     })
    // }

    // const isUserExistByUsername = await userModel.find({username})

    // if(isUserExistByUsername){
    //     return res.status(409).json({
    //         message:"user already exist by username"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409)
        .json({
            message:"User Already Exists" + (isUserAlreadyExists.email == 
                email ? "Email Already Exits" : "Username Already Exits")
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
        })

        // user ka data hona chahiye 
        // data unique hona chahiye👇👇

        const token = jwt.sign(
            {
            id: user._id,
            username: user.username
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.cookie("token", token)

        res.status(201).json({
            message:"User Registered Successfully",
            user:{
                email:user.email,
                username: user.username,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })

    }
 
 async function loginController (req,res){
        const {username,email,password} = req.body
        /*
        username
        password

        email
        password
        */

        const user = await userModel.findOne({
            $or:[
                {
                    // condition
                    username: username
                },
                {
                    // condition
                    email: email
                }
            ]
        })

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password , user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                message: "password Incorrect"
            })
        }

        const token = jwt.sign(
            {id:user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.cookie("token", token)

        res.status(200).json({
            message:"User loggedIn Successfully",
            user:{
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })
    }

    module.exports = {
        registerController,
        loginController
    }