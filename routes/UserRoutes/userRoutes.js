const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userVerification,
} = require("../../controller/UserController/userRegistration");

const validatorMiddleware = require("../../middleware/user/validatorMiddleware");
const userSchemaValidation = require("../../validation/user/ValidatorJoi");

router.post(
  "/signup",
  validatorMiddleware(userSchemaValidation),
  userRegistration
);

router.post("/login", userVerification);

module.exports = router;

// start by refactoring these two routes and start working on the security aspect
// use jwt and understand the session concept
