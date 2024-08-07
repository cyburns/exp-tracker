import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connect = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB", connection.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
