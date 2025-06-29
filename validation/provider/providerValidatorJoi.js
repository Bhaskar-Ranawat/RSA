const Joi = require("joi");

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const providerSchemaValidation = Joi.object({
  credentials: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in"] },
      })
      .trim()
      .lowercase()
      .required()
      .messages({
        "string.email": `"email" must be a valid email (e.g., abc@example.com, only .com/.net/.in allowed domains)`,
        "any.required": `"email" is required`,
      }),
    phone: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required()
      .messages({
        "number.base": `"phone" must be a valid 10-digit number`,
        "any.required": `"phone" is required`,
      }),
    password: Joi.string().min(6).max(30).required().messages({
      "string.min": `"password" should have a minimum length of 6`,
      "string.max": `"password" should have a maximum length of 30`,
      "any.required": `"password" is required`,
    }),
  }),

  brandName: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": `"brandName" must contain only letters and spaces`,
      "string.min": `"brandName" must have at least 3 characters`,
      "string.max": `"brandName" must have at most 30 characters`,
      "any.required": `"brandName" is a required field`,
    }),

  vendorName: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": `"vendorName" must contain only letters and spaces`,
      "string.min": `"vendorName" must have at least 3 characters`,
      "string.max": `"vendorName" must have at most 30 characters`,
      "any.required": `"vendorName" is a required field`,
    }),

  typeOfService: Joi.array().items(Joi.string().min(2)).optional(),

  typeOfVehicle: Joi.array().items(Joi.string().min(2)).optional(),

  operatingTime: Joi.object({
    from: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .optional()
      .messages({
        "string.pattern.base": `"from" time must be in HH:mm format`,
      }),
    to: Joi.string()
      .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .optional()
      .messages({
        "string.pattern.base": `"to" time must be in HH:mm format`,
      }),
  }).optional(),

  profileImage: Joi.string().uri().optional(),

  businessImages: Joi.array().items(Joi.string().uri()).optional(),

  ratings: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string().pattern(objectIdPattern).required().messages({
          "string.pattern.base": `"userId" must be a valid ObjectId`,
        }),
        rating: Joi.number().min(1).max(5).required(),
        feedback: Joi.string().optional(),
        date: Joi.date().optional(),
      })
    )
    .optional(),

  averageRating: Joi.number().min(0).max(5).optional(),

  customersServed: Joi.array()
    .items(
      Joi.string().pattern(objectIdPattern).messages({
        "string.pattern.base": `"customersServed" must contain valid ObjectIds`,
      })
    )
    .optional(),

  currentCustomer: Joi.string()
    .pattern(objectIdPattern)
    .allow(null)
    .optional()
    .messages({
      "string.pattern.base": `"currentCustomer" must be a valid ObjectId`,
    }),

  location: Joi.object({
    shopName: Joi.string().optional(),
    streetAddress: Joi.string().optional(),
    area: Joi.string().optional(),
    district: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    pincode: Joi.string()
      .pattern(/^\d{6}$/)
      .optional()
      .messages({
        "string.pattern.base": `"pincode" must be a valid 6-digit number`,
      }),
    plusCode: Joi.string().optional(),
    coordinates: Joi.object({
      latitude: Joi.number().required().messages({
        "number.base": `"latitude" must be a number`,
        "any.required": `"latitude" is required`,
      }),
      longitude: Joi.number().required().messages({
        "number.base": `"longitude" must be a number`,
        "any.required": `"longitude" is required`,
      }),
    }).optional(),
  }).optional(),

  profileCompleted: Joi.boolean().optional(),
});

module.exports = providerSchemaValidation;
