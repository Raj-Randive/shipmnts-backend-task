import mongoose from "mongoose";

// Database connection

const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected!!"))
    .catch((err) => console.error("MongoDB connection error aaya:", err));
};

export default dbConnect;
