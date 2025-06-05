import { Schema, model } from 'mongoose';
import { CONTACT_TYPE_LIST } from '../../constants/index.js';
import { handleSaveError, updateSettings } from './hooks/hookDb.js';

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

contactsSchema.pre('findOneAndUpdate', updateSettings);

contactsSchema.post('save', handleSaveError);
contactsSchema.post('findOneAndUpdate', handleSaveError);

const ContactsModel = model('contacts', contactsSchema);

export const SORT_BY_LIST = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavorite',
  'contactType',
];

export default ContactsModel;
