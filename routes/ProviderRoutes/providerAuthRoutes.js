const express = require("express");
const {
  providerRegistration,
  providerVerification,
} = require("../../controller/ProviderController/providerAuth");

const router = express.Router();

const joiValidatorMiddleware = require("../../middleware/globalMiddlewares/joiValidatorMiddleware");
const providerSchemaValidation = require("../../validation/provider/providerValidatorJoi");

router.post(
  "/signup",
  joiValidatorMiddleware(providerSchemaValidation),
  providerRegistration
);

router.post("/login", providerVerification);

module.exports = router;
