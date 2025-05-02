import { getEnvVar } from "../utils/getEnvVar.js";
import mongoose from "mongoose";

export const initMongoDB = async () => {
  try {
    const dbUrl = getEnvVar("MONGODB_URL");
    const dbUser = getEnvVar("MONGODB_USER");
    const dbStr = getEnvVar("MONGODB_DB");
    const dbPassword = getEnvVar("MONGODB_PASSWORD");

    await mongoose.connect(`${dbUser}${dbPassword}${dbUrl}${dbStr}`);
    console.log("Mongo connect sucefully");
  } catch (e) {
    console.log(e);
  }
};
