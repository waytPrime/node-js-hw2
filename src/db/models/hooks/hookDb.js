export const handleSaveError = (error, data, next) => {
  error.status = 400;
  console.log(error);

  next();
};

export const updateSettings = function (next) {
  this.setOptions({
    new: true,
    runValidation: true,
  });
  next();
};
