require("dotenv").config();
const bcrypt = require("bcryptjs");
const AdminModel = require("../models/AdminModel");
const { adminPass, adminName } = require("../config/config");
const logger = require("../utils/logger");
const connectDB = require("../DB/mongoDB");

async function createAdmin() {
  try {
    await connectDB();
    const hashed = await bcrypt.hash(adminPass, 10);
    const admin = await AdminModel.create({
      name: adminName,
      email: "admin@example.com",
      password: hashed,
    });
    logger.info(`Admin created by adminSeeder file ${admin.name}`);
    process.exit(0);
  } catch (error) {
    logger.error(`Error in adminSeeder file: ${error.message}`);
    process.exit(1);
  }
}

createAdmin();

// some error here
// the function is not exiting after the work is done, because the work is never done to be honest
// check for whatever the issue is Man!

// Issue resolved, needed its own dotenv.config() because was run independently
