export const errorHandler = async (err, _req, res, _next) => {
  const { status = 500, message = "Something went wrong!" } = err;

  res.status(status).json({
    status: status,
    message: message,
    error: err.message,
  });
};
