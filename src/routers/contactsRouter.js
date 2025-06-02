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
import { validateBody } from "../middlewares/validateBody.js";
import {
  createContactsSchema,
  inseartContactsSchema,
} from "../validation/contactsValidation.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get("/", ctrlWrapper(getAllContactsController));

router.get("/:id", isValidId, ctrlWrapper(getContactByIdController));

router.post(
  "/",
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController)
);

router.patch(
  "/:id",
  isValidId,
  validateBody(inseartContactsSchema),
  ctrlWrapper(patchContactController)
);

router.put(
  "/:id",
  isValidId,
  validateBody(createContactsSchema),
  ctrlWrapper(upsertContactController)
);

router.delete("/:id", isValidId, ctrlWrapper(deleteContactController));

router.get("/test/error", ctrlWrapper(errorController));

export default router;
