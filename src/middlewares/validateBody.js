import createHttpError from "http-errors";

export const validateBody = (schema) => {
  return async (req, _res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      next(createHttpError(400, error.message));
    }
  };
};
