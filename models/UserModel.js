const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const credentialSchema = require("./globalAuthModel");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trime: true,
    },
    credentials: credentialSchema,
    location: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("credentials.password")) return next();
  this.credentials.password = await bcrypt.hash(this.credentials.password, 10);
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

// email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       select: false,
//     },
//     phone: {
//       type: Number,
//       required: true,
//       unique: true,
//     }
