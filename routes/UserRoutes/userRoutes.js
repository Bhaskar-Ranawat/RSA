const express = require("express");
const router = express.Router();
const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");

router.post("/user-registration", (req, res) => {
  const { firstName, lastName, email, password, phone, location } = req.body;

  if (!email || !password || !firstName) {
    return res.status(400).json({ message: "Incomplete credentials" });
  }
  try {
    const user = UserModel.create(req.body);
    console.log(user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // console.log(first)
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/user-verification", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Invalid credentials" });
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.log("Error encountered in user verification: ", error.messages);
  }
});

module.exports = router;
