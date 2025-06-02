import Joi from "joi";
import { CONTACT_TYPE } from "../constants/index.js";

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "name is required",
    "string.min": "min is {#limit} characters",
    "string.max": "max is {#limit} characters",
  }),
  phoneNumber: Joi.string().required(),
  isFavorite: Joi.boolean(),
  email: Joi.string().email().required(),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE)
    .required(),
});

export const inseartContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string(),
  isFavorite: Joi.boolean(),
  email: Joi.string().email(),
  contactTypeValidation: Joi.string().valid(...CONTACT_TYPE),
});
