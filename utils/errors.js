const {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  DEFAULT,
  MONGODB_DUPLICATE_KEY, } = require("./errorCodes");

const unauthorizedUserError = () => {
  const error = new Error("Incorrect email or password");
  error.name = "UserUnauthorized";
  error.statusCode = UNAUTHORIZED;

  return error;
}

const requiredFieldError = () => {
  const error = new Error("Missing email or password");
  error.name = "RequiredFieldMissing";
  error.statusCode = BAD_REQUEST;

  return error;
}

const accessDeniedError = () => {
  const error = new Error("Access denied");
  error.name = "accessDenied";
  error.statusCode = FORBIDDEN;

  return error;
}

const handleErrorType = (err) => {
  if (err.statusCode === UNAUTHORIZED || err.name === "UserUnauthorized") {
    return {
      status: UNAUTHORIZED,
      message: "User is unauthorized"
    };
  }
  if (err.statusCode === FORBIDDEN || err.name === "accessDenied") {
    return {
      status: FORBIDDEN,
      message: "Access is denied"
    };
  }
  if (err.statusCode === BAD_REQUEST || err.name === "RequiredFieldMissing") {
    return {
      status: BAD_REQUEST,
      message: "Missing email or password"
    };
  }
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
  if (err.code === MONGODB_DUPLICATE_KEY) {
    const conflictNames = Object.keys(err.errorResponse.keyValue);
    let message = "";

    if (conflictNames.length > 1) {
      message = `The fields ${conflictNames.join(", ")} must be unique`
    } else {
      message = `The ${conflictNames[0]} field must be unique`
    }

    return {
      status: CONFLICT,
      message
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

module.exports = { errorHandler, unauthorizedUserError, requiredFieldError, accessDeniedError};
