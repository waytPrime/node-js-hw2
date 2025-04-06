import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";

export const setupServer = () => {
  const port = getEnvVar("PORT", 3000);

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.listen(port, () => console.log(`server running on port ${port}`));
};
