import express from 'express';
const router = express.Router();

//importing the controller
import { login, signup } from '../controller/usercontroller.js';

router.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"This is the Devvy Backend API"
    })
})

//user auth routes
router.post("/signup",signup);
router.post("/login",login);



export default router;