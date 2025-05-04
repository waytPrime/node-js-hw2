import ContactsModel from "../db/models/contactsModel.js";

export const getAllContacts = () => ContactsModel.find();

export const getContactById = (contactId) =>
  ContactsModel.findById(contactId);

export const createContact = (payload) => ContactsModel.create(payload);

export const upsertContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsModel.findOneAndUpdate(
    { _id: contactId },
    payload,

    { new: true, includeResultMetadata: true, ...options }
  );
  console.log(rawResult);
  console.log(rawResult?.lastErrorObject?.upserted);

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
