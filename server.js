import app from "./app.js";
import { dbconnect } from "./db/db.js";
dbconnect()
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})