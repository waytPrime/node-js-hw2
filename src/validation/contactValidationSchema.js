import Joi from 'joi';
import { CONTACT_TYPE_LIST } from '../constants/index.js';

export const contactAddValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email(),
  isFavorite: Joi.boolean().required(),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE_LIST)
    .required(),
});

export const contactUpdateValidate = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string(),
  email: Joi.string().email(),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().valid(...CONTACT_TYPE_LIST),
});
