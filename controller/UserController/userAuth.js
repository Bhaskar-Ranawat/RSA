const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const logger = require("../../utils/logger");
const jwtSecret = require("../../config/config");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  const {
    credentials: { email, phone },
  } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ "credntials.email": email }, { "credentials.phone": phone }],
    });

    if (existingUser) {
      logger.warn(`User already exists ${existingUser}`);
      return res
        .status(409)
        .json({ message: "Email or phone already registered" });
    }

    const user = await UserModel.create(req.body);
    logger.info("User created");
    console.log(user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error.message);
    logger.error("Internal server error from userRegistration", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const userVerification = async (req, res) => {
  const {
    credentials: { email, password },
  } = req.body;
  if (!email || !password) {
    logger.error("User Credentials needed at Login");
    return res.status(400).json({ message: "Missing credentials at Login" });
  }
  try {
    const user = await UserModel.findOne({ "credentials.email": email }).select(
      "+credentials.password"
    );
    if (!user) {
      logger.warn("User not found");
      return res
        .status(401)
        .json({ message: "Invalid credentials, User not found" });
    }
    logger.info(`User found "${user.firstName} ${user.lastName}"`);
    const isMatch = await bcrypt.compare(password, user.credentials.password);
    if (!isMatch) {
      logger.warn("Unauthorized User request for login");
      return res.status(401).json({ message: "Unauthorized request" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });
    logger.info("User LoggedIn, JWT created and attached");
    return res
      .status(200)
      .setHeader("Authorization", `Bearer ${token}`)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    logger.error("Error in user Verification/Login", error.message);
    console.log("Error encountered in user verification: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  userRegistration,
  userVerification,
};

// need to work on form validation, make middleware to cater these things first
// try to include a logger winston/pino/morgan

// Both tasks done

// completed tasks, need to enhance this with forgot password change routes and
// update user profile routes

// start working on how a user can register their assistance needs (Requests for help), make a schema for that
// when come back, read this and start wokring from here
