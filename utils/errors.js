const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("./errorCodes");

const handleErrorType = (err) => {
  if (err.statusCode === NOT_FOUND || err.name === "DocumentNotFoundError") {
    return {
      status: NOT_FOUND,
      message: "Requested resource not found"
    };
  }
  if (err.name === "ValidationError" || err.name === "CastError") {
    return {
      status: BAD_REQUEST,
      message: "Invalid data provided"
    };
  }
  return {
    status: DEFAULT,
    message: "An error has occurred on the server"
  };
};

const errorHandler = (res) => (err) => {
  const error = handleErrorType(err);
  res.status(error.status).json({ message: error.message });
};

module.exports = { errorHandler };
