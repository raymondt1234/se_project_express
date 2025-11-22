const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (value === "" || validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

const validateMongoId = (value, helpers) => {
  if (validator.isHexadecimal(value) && value.length === 24) {
    return value;
  }
  return helpers.error("string.clothingItemId");
};

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "Name" field is 2',
      "string.max": 'The maximum length of the "Name" field is 30',
      "string.empty": 'The "Name" field must be filled in',
    }),
    weather: Joi.string().valid('hot', 'warm', 'cold').required(),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "Image URL" field must be filled in',
      "string.uri": 'The "Image URL" field must be a valid URL',
    }),
  }),
});

const validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "Name" field is 2',
      "string.max": 'The maximum length of the "Name" field is 30',
      "string.empty": 'The "Name" field must be filled in',
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'The "Email" field must be a valid Email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "Avatar URL" field must be filled in',
      "string.uri": 'The "Avatar URL" field must be a valid URL',
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().optional().allow(null).min(2).max(30).messages({
      "string.min": 'The minimum length of the "Name" field is 2',
      "string.max": 'The maximum length of the "Name" field is 30',
    }),
    avatar: Joi.string().allow(null, '').optional().custom(validateURL).messages({
      "string.uri": 'The "Avatar URL" field must be a valid URL',
    }),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'The "Email" field must be a valid Email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    clothingItemId: Joi.string().custom(validateMongoId).messages({
      "string.clothingItemId": "invalid ID format",
    }),
  }),
});

module.exports = {
  validateCardBody,
  validateUserInfoBody,
  validateUserUpdate,
  validateUserLogin,
  validateId,
};
