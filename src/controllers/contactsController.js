import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  upsertContact,
} from '../services/contatsServices.js';
import { parsePaginationParams } from '../utils/pagination/paginationParams.js';
import { parseSortParams } from '../utils/sort/parseSortParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder });

  res.status(200).json({
    status: 200,
    message: 'Get all contact',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    throw createHttpError(
      404,
      `Sorry, contact with id (${id}) not found создал ошибку`,
    );
  }
  res.status(200).json({
    status: 200,
    message: `Contact with id (${id}) found!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const newContact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Contact was created',
    data: newContact,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;

  const result = await upsertContact(id, req.body, {
    upsert: false,
  });

  if (!result) {
    throw createHttpError(404, 'Sorry contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact with id(${id}) !`,
    data: result?.contact,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;

  const result = await upsertContact(id, req.body, { upsert: true });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  const status = result?.isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: 'Contact wasSuccessfully upserted a contact',
    data: result?.contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;

  const contact = await deleteContact(id);

  if (!contact) {
    throw createHttpError(404, `Oops contact with id(${id}) not found!`);
  }

  res.status(204).send();
};

export const errorController = async (req, res) => {
  throw createHttpError(505, 'Test error');
};
