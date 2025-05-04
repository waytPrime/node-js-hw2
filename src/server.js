import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import contactsRouter from "./routers/contactsRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

export const setupServer = () => {
  const port = getEnvVar("PORT", 3000);

  const app = express();

  app.use(express.json());
  app.use(cors());
  // app.use(
  //   pino({
  //     transport: {
  //       target: "pino-pretty",
  //     },
  //   })
  // );
  app.use("/contacts", contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(port, () => console.log(`server running on port ${port}`));
};
