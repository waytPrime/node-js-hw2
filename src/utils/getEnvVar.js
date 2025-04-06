import dotenv from "dotenv";

dotenv.config();

export function getEnvVar(name, defaultName) {
  const value = process.env[name];
  if (!name || !defaultName) throw new Error("не дали русяну имени");
  return value || defaultName;
}
