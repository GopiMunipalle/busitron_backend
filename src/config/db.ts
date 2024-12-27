import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://munipallegopikrishna:busitron@cluster0.ng4wz.mongodb.net/atricles"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
