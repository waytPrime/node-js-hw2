import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  console.log(isValidObjectId(id));
  if (!isValidObjectId(id))
    return next(createHttpError(400, `${id} - not valid id`));
  next();
};
