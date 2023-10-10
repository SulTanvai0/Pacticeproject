const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    EmailAddress: {
      type: String,
    },
    MobileNumber: {
      type: String,
      unique: true,
    },
    City: {
      type: String,
    },
    UserName: {
      type: String,
      unique: true,
    },
    Password: {
      type: String,
    },
  },
  { versionKey: false }
);

const profileModel = mongoose.model("profile", DataSchema);
module.exports = profileModel;
