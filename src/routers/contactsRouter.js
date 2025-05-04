import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import {
  createContactController,
  deleteContactController,
  errorController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
  upsertContactController,
} from "../controllers/contactsController.js";

const router = Router();

router.get("/", ctrlWrapper(getAllContactsController));

router.get("/:id", ctrlWrapper(getContactByIdController));

router.post("/", ctrlWrapper(createContactController));

router.patch("/:id", ctrlWrapper(patchContactController));

router.put("/:id", ctrlWrapper(upsertContactController));

router.delete("/:id", ctrlWrapper(deleteContactController));

router.get("/test/error", ctrlWrapper(errorController));

export default router;
