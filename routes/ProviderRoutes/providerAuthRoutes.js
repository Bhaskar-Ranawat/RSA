const express = require("express");
const ProviderModel = require("../../models/ProviderModel");
const logger = require("../../utils/logger");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/config");

router.post("/signup", async (req, res) => {
  const {
    // brandName,
    // vendorName,
    credentials: { email, phone },
  } = req.body;
  try {
    // const existingUser = ProviderModel.findOne({ "credentials.email": email });
    const existingProvider = await ProviderModel.findOne({
      $or: [{ "credentials.email": email, "credentials.phone": phone }],
    });
    if (existingProvider) {
      logger.error(`User already exists: ${existingProvider} `);
      return res
        .status(409)
        .json({ message: "Email or Phone already registered" });
    }
    const provider = await ProviderModel.create(req.body);
    logger.info(`New Provider created successfully: ${provider}`);
    console.log(
      "New provider account created, need more details to be filled later"
    );
    return res.status(200).json({ message: "Provider created" });
  } catch (error) {
    logger.error(
      `Error encountered while registering Provider: ${error} || ${error.message}`
    );
    return res.status(500).json({
      message: "Error encountered while creating provider",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const {
    credentials: { email, password },
  } = req.body;
  try {
    if (!email || !password) {
      logger.error(`Provider credentials needed at Login`);
      console.log("Provider credentials needed at Login");
      return res.status(400).json({ message: "Missing credentials at Login" });
    }
    const provider = await ProviderModel.findOne({
      "credentials.email": email,
    }).select("+credentials.password");

    if (!provider) {
      logger.error(`No Provider with matching email found: ${email}`);
      console.log("Invalid credentials Em, no matching in DB");
      return res.status(409).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(
      password,
      provider.credentials.password
    );
    if (!isMatch) {
      logger.error(`Provider Credentials do not match at Login`);
      console.log("Provider Credentials do not match at Login");
      return res.status(401).json({ message: "Credentials do not match" });
    }
    const token = jwt.sign({ providerId: provider._id }, jwtSecret, {
      expiresIn: "1h",
    });
    logger.info(`Provider Logged In successfully and token attached`);
    console.log("Provider logged in");
    // Authorization should be before json
    return res
      .status(200)
      .setHeader("Authorization", `Bearer ${token}`)
      .json({ message: "Provider verified and logged in", token: token });
  } catch (error) {
    logger.error("Error in Provider Verification/Login", error.message);
    console.log("Error encountered in Provider verification: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;