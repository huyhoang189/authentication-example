"use strict";

const {
  hashPassword,
  getRandomValues,
  checkPassword,
} = require("../utils/authentication");
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/response/error-response");
const userModel = require("../models/user-model");
const { ROLE_USER } = require("../commom");
const { simplifyDatas, simplifyData } = require("../utils/simplify-data");

const getUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

const getUserAll = async ({ userId }) => {
  console.log("d", userId);
  const holderUsers = await userModel.find({});
  if (!holderUsers) throw new NotFoundError("Cannot found users");

  return simplifyDatas({
    fields: ["_id", "name", "email", "roles"],
    objects: holderUsers,
  });
};

module.exports = {
  getUserAll,
  getUserByEmail,
};
