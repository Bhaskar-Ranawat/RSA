const Joi = require("joi");

const userSchemaValidation = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .min(3)
    .max(15)
    .trim()
    .required()
    .messages({
      "string.pattern.base": `"fistName" must contain only letters (a-z or A-Z)`,
      "string.min": `"firstName" should have at least 3 characters`,
      "string.max": `"firstName" should have at most 15 characters`,
      "string.back": `"firstName" should be a type of 'text'`,
      "string.empty": `"firstName" cannot be an empty field`,
      "any.required": `"firstName" is a required field`,
    }),
  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .min(3)
    .max(15)
    .optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in"] },
    })
    .trim()
    .lowercase()
    .required()
    .messages({
      "string.email": `"email" must be a valid email ['.com', '.net', '.in']`,
      "any.required": `"email" is required`,
    }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": `"password" should have a minimum length of 6`,
    "string.max": `"password" should have a maximum length of 30`,
    "any.required": `"password" is required`,
  }),
  phone: Joi.number().min(1000000000).max(9999999999).required().messages({
    "number.base": `"phone" must be a valid number`,
    "any.required": `"phone number" is required`,
  }),
  location: Joi.string().optional(),
});

module.exports = userSchemaValidation;
