import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch(() => {
      console.log("Database Connection faild");
    });
};

export default dbConnection;
