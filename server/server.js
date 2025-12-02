import "./config/instrument.js"
import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controllers/webhooks.js"
import companyRoutes from "./routes/companyRoutes.js"
import connectCloudinary from "./config/cloudinary.js"
import jobRoutes from "./routes/jobRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import {clerkMiddleware} from "@clerk/express"

// Inititalize Express

const app = express()

// Connect to database

await connectDB()

await connectCloudinary()

//middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sfte-300-project-frontend.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());


// Clerk MUST come AFTER CORS + OPTIONS
app.use(clerkMiddleware());



// Routes

app.get("/",(req,res)=> res.send("API Working"))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks)
app.use("/api/company", companyRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/users", userRoutes)


// Port

const PORT = process.env.PORT || 5050

Sentry.setupExpressErrorHandler(app)

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})