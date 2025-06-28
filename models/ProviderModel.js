const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const credentialSchema = require("./globalAuthModel");

const locationSchema = mongoose.Schema(
  {
    shopName: { type: String },
    streetAddress: { type: String },
    area: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    plusCode: { type: String },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  { _id: false }
);

// there should be an id attribute for this data
// so that it becomes easy for fetching a single review for updation or deletion
const ratingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  feedback: { type: String },
  date: { type: Date, default: Date.now },
});

const providerSchema = mongoose.Schema(
  {
    credentials: credentialSchema,
    brandName: {
      type: String,
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
    typeOfService: [{ type: String, required: false }],
    typeOfVehicle: [{ type: String, required: false }],
    operatingTime: {
      from: { type: String, required: false },
      to: { type: String, required: false },
    },
    profileImage: { type: String, trim: true },
    businessImages: [{ type: String }],
    ratings: [ratingSchema], //embedded ratings in array
    averageRating: { type: Number, default: 0 },
    customersServed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    currentCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    location: { type: locationSchema, required: false }, //embedded data, not in array
    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * Only credentials {email, phone, password},
 * brandName and vendorName are required
 * for registering the Provider
 */

providerSchema.pre("save", async function (next) {
  if (!this.isModified("credentials.password")) return next();
  this.credentials.password = await bcrypt.hash(this.credentials.password, 10);
  next();
});

providerSchema.index({ "location.coordinates": "2dsphere" }); //geospatial queries

const ProviderModel = mongoose.model("Provider", providerSchema);

module.exports = ProviderModel;

/**
 * Increase speed of working, need to complete this in just 1 month:
 * Created this model input the data for Provider into the DB,
 * create routes for provider to register and verify while loggin
 */
