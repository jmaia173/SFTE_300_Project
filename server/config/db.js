import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "job-portal", // <-- correct place to specify db
    });
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

export default connectDB;