import createHttpError from 'http-errors';

export const validationBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validatenAsync(req.body);
    } catch (error) {
      next(createHttpError(400, error.message));
    }
  };
};
