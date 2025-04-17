import { UserModel } from "../model/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {

        const {name,email,password} = req.body;
        const isuser = await UserModel.findOne({email:email});

        if(isuser){
            return res.json({
                success:false,
                message:"User already exists"
            });
        }else{
            const haspassword = await bcrypt.hash(password,10);
            const user = await UserModel.create({name,email,password:haspassword});
            return res.json({
                success:true,
                message:"User created successfully",
            })
        }



    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const login = async(req,res)=>{
    try {

            const {email,password} = req.body;
            const user = await UserModel.findOne({email:email});
            console.log(user);
            if(!user){
                return res.json({
                    success:false,
                    message:"User does not exist"
                })
            }else{
                const passmatch = await bcrypt.compare(password,user.password);
                if(!passmatch){
                    return res.json({
                        success:false,
                        message:"Wrong password"
                    })
                }else{
                    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"30d"});
                    
                    res.cookie("token",token,{
                        httpOnly:true,
                        expires:new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                        sameSite:"none",
                        secure:true,
                    })

                    return res.json({
                        success:true,
                        message:"Logged in successfully",
                        token:token
                    })
                }
            }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}