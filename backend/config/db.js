import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI;

export const connectDB = async () => {
  await mongoose.connect(mongoUri).then(() => {
    console.log("DB CONNECTED");
  });
};
