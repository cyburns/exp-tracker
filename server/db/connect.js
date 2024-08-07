import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://cyrusburns:ZCHayn5V59ZC6yNZ@cluster0.hexmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectToDB = async () => {
  if (!MONGO_URI) {
    console.error("Mongo URI is missing");
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("🚀 Connected to MongoDB", connection.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
