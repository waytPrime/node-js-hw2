export const notFoundHandler = (_req, res) => {
  res.status(404).json({
    status: 404,
    message: "Sorry, route not found",
  });
};

