import express from "express";
import cors from "cors";
import pino from "pino-http";
import { getEnvVar } from "./utils/getEnvVar.js";
import { getAllContacts, getContactById } from "./services/contacts.js";

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

  app.get("/contacts", async (_, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({ data: contacts });
  });

  app.get("/contacts/:contactId", async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contact not found!" });
      return;
    }
    res.status(200).json({ data: contact, message: "Contact found!" });
  });

  app.use((_, res) => res.status(404).json({ message: "not found" }));

  app.listen(port, () => console.log(`server running on port ${port}`));
};
