const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "user";
const COLLECTION_NAME = "Users";

// Declare the Schema of the Mongo model
var schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    roles: { type: Array, default: [] },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, schema);
