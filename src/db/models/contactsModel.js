import { Schema, model } from 'mongoose';
import { CONTACT_TYPE_LIST } from '../../constants/index.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: String,
    isFavorite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: CONTACT_TYPE_LIST,
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true },
);

const ContactsModel = model('contacts', contactsSchema);

export default ContactsModel;
