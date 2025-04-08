import mongoose from "mongoose";

import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoDB = async () => {
  const user = getEnvVar("MONGODB_USER");
  const password = getEnvVar("MONGODB_PASSWORD");
  const db_url = getEnvVar("MONGODB_URL");
  const db = getEnvVar("MONGODB_DB");
  try {
    await mongoose.connect(`${user}${password}${db_url}${db}`);
    console.log("Mongo connection successfully established!");
  } catch (e) {
    console.log("Error while setting up mongo connection", e);
    throw e;
  }
};
