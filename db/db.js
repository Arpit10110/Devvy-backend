import mongoose from "mongoose";

export const dbconnect = ()=>{
    mongoose.connect(process.env.Mongodb_url,{dbName:"Devvy"}).then(()=>{
        console.log("Database Connected Successfully")
    }).catch((error)=>{
        console.log("Database Connection Failed", error.message)
    })
} 