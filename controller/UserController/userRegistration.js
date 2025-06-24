const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or phone already registered" });
    }

    const user = await UserModel.create(req.body);
    console.log(user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error.messsage);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const userVerification = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
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
