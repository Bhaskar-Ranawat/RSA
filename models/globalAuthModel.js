const mongoose = require("mongoose");
const credentialSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    //   unique: true,
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
    //   unique: true,
      required: true,
      select: false,
    },
  },
  { _id: false }
);

module.exports = credentialSchema;
