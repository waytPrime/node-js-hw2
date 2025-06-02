import ContactsModel from "../db/models/contactsModel.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = ContactsModel.find();

  if (filter.isFavorite)
    contactQuery.where("isFavorite").equals(filter.isFavorite);

  if (filter.contactType)
    contactQuery.where("contactType").equals(filter.contactType);

  const promiseContacts = contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const promiseLength = ContactsModel.find().clone().countDocuments();

  const [contacts, length] = await Promise.all([
    promiseContacts,
    promiseLength,
  ]);

  console.log(length);

  const paginationData = calculatePaginationData({ page, perPage, length });

  return {
    data: { contacts: contacts, ...paginationData },
  };
};

export const getContactById = (contactId) => ContactsModel.findById(contactId);

export const createContact = (payload) => ContactsModel.create(payload);

export const upsertContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsModel.findOneAndUpdate(
    { _id: contactId },
    payload,

    { new: true, runValidators: true, includeResultMetadata: true, ...options }
  );

  if (!rawResult || !rawResult?.value) return null;

  return {
    contact: rawResult?.value,
    isNew: rawResult?.lastErrorObject?.upserted,
  };
};

export const deleteContact = (contactId) =>
  ContactsModel.findByIdAndDelete(contactId);
