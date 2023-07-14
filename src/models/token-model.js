const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "token";
const COLLECTION_NAME = "Tokens";

// Declare the Schema of the Mongo model
var schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    refreshtoken: { type: String, require: true },
    accesstoken: { type: String },
    refeshtokens: { type: Array, default: [] },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, schema);
