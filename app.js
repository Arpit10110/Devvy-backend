import express from "express"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
config()
const app = express()

app.use(cookieParser())
app.use(cors({
    origin: process.env.Frontend_url,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true})); 

export default app;