import ContactsModel from '../db/models/contactsModel.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 3,
  sortBy,
  sortOrder,
  filter = {},
}) => {
  // console.log(page, perPage, sortBy, sortOrder, filter);

  const skip = (page - 1) * perPage;

  const queryParams = ContactsModel.find();

  if (filter.isFavorite) {
    queryParams.where('isFavorite').equals(filter.isFilter);
  }
  if (filter.contactType) {
    queryParams.where('contactType').equals(filter.contactType);
  }

  const contactsPromise = queryParams
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const totalItemsPromise = ContactsModel.find()
    .clone(contactsPromise)
    .countDocuments();

  const [contacts, totalItems] = await Promise.all([
    contactsPromise,
    totalItemsPromise,
  ]);

  const totalPage = Math.ceil(totalItems / perPage);
  const hasNextPage = page < totalPage;
  const hasPreviousPage = page !== 1;

  return {
    contacts,
    page,
    perPage,
    totalItems,
    totalPage,
    hasNextPage,
    hasPreviousPage,
  };
};

export const getContactById = (contactId) => ContactsModel.findById(contactId);

export const createContact = (payload) => ContactsModel.create(payload);

export const upsertContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsModel.findOneAndUpdate(
    { _id: contactId },
    payload,

    { new: true, includeResultMetadata: true, ...options },
  );

  if (!rawResult || !rawResult?.value) return null;

  return {
    contact: rawResult?.value,
    isNew: rawResult?.lastErrorObject?.upserted,
  };
};

export const deleteContact = (contactId) =>
  ContactsModel.findByIdAndDelete({
    _id: contactId,
  });
