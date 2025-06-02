import { Schema, model } from "mongoose";
import { CONTACT_TYPE } from "../../constants/index.js";
import { handleSaveError, UpdateSettings } from "./hooks/hooks.js";

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
      enum: CONTACT_TYPE,
      required: true,
      default: "personal",
    },
  },
  { timestamps: true }
);

contactsSchema.post("save", handleSaveError);
contactsSchema.post("findOneAndUpdate", handleSaveError);
contactsSchema.pre("findOneAndUpdate", UpdateSettings);

const ContactsModel = model("contacts", contactsSchema);

export const listSortDb = [
  "_id",
  "contactType",
  "email",
  "isFavorite",
  "phoneNumber",
  "name",
  "createdAt",
];
export default ContactsModel;
