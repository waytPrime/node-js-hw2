import createHttpError from "http-errors";
import { SORT_LIST } from "../constants/index.js";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  upsertContact,
} from "../services/contactsServices.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { listSortDb } from "../db/models/contactsModel.js";
import { parseFilterParams } from "../utils/filter/parseFilterParams.js";

export const getAllContactsController = async (req, res) => {
  const { page = 1, perPage = 3 } = parsePaginationParams(req.query);
  const { sortBy = listSortDb[0], sortOrder = SORT_LIST[0] } = parseSortParams(
    req.query
  );
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: "Get all contact",
    ...contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    throw createHttpError(
      404,
      `Sorry, contact with id (${id}) not found создал ошибку`
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
    message: "Contact was created",
    data: newContact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;

  const result = await upsertContact(id, req.body, {
    upsert: false,
  });

  if (!result) {
    return next(createHttpError(404, "Sorry contact not found"));
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
    throw createHttpError(404, "Contact not found");
  }

  const status = result?.isNew ? 201 : 200;

  res.status(status).json({
    status: status,
    message: "Contact wasSuccessfully upserted a contact",
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
  throw createHttpError(505, "Test error");
};
