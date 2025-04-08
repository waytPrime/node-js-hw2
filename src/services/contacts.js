import { ModelContacts } from "../db/models/contacts.js";

export const getAllContacts = async () => {
  const contacts = await ModelContacts.find();
  console.log("contacts", contacts);

  return contacts;
};
export const getContactById = async (contactId) => {
  const student = await ModelContacts.findById(contactId);
  return student;
};
