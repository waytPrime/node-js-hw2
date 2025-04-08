import { model, Schema } from "mongoose";

const contactsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export const modelStudents = model("students", contactsSchema);
