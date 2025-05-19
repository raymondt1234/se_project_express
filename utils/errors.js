const BadRequestError = (message) => ({
  status: 400,
  message: message || "Bad request",
});

const NotFoundError = (message) => ({
  status: 404,
  message: message || "Not found",
});

const ServerError = (message) => ({
  status: 500,
  message: message || "An error occurred on the server",
});

const handleErrorType = (err) => {
  let error;

  if (err.statusCode === 404) {
    error = NotFoundError(err.message);
  } else if (err.name === "ValidationError") {
    error = BadRequestError(err.message);
  } else if (err.name === "DocumentNotFoundError") {
    error = NotFoundError("Item ID not found");
  } else if (err.name === "CastError") {
    error = BadRequestError("Invalid item ID");
  } else {
    error = ServerError("An error occurred on the server");
  }

  return error;
};

const errorHandler = (res) => (err) => {
  const error = handleErrorType(err);
  res.status(error.status).json({ message: error.message });
};

module.exports = { errorHandler };
