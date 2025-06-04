import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createContactController,
  deleteContactController,
  errorController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
  upsertContactController,
} from '../controllers/contactsController.js';
import { validationBody } from '../utils/validationBody.js';
import {
  contactAddValidationSchema,
  contactUpdateValidate,
} from '../validation/contactValidationSchema.js';
import { isValidId } from '../utils/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validationBody(contactAddValidationSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:id',
  isValidId,
  validationBody(contactUpdateValidate),
  ctrlWrapper(patchContactController),
);

router.put(
  '/:id',
  isValidId,
  validationBody(contactUpdateValidate),
  ctrlWrapper(upsertContactController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

router.get('/test/error', ctrlWrapper(errorController));

export default router;
