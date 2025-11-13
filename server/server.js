import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"

// Inititalize Express

const app = express()

// Connect to database

await connectDB()

//middleware

app.use(cors())
app.use(express.json())

// Routes

app.get("/",(req,res)=> res.send("API Working"))

// Port

const PORT = process.env.PORT || 5050

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})