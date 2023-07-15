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
const { simplifyData } = require("../utils/simplify-data");
const { createToken } = require("./token-service");

const signUp = async ({ name, email, password }) => {
  const holderUser = await userModel.findOne({ email: email });
  if (holderUser) {
    throw new ConflictError("User:: is conflict");
  }

  const passHash = await hashPassword(password);
  const newUser = await userModel.create({
    name,
    email,
    password: passHash,
    roles: [ROLE_USER.WRITER],
  });

  const privateKey = getRandomValues(64);
  const publicKey = getRandomValues(64);

  if (newUser) {
    const tokens = await createToken({
      user: newUser,
      publicKey,
      privateKey,
    });
    return {
      user: simplifyData({
        fields: ["_id", "name", "email"],
        object: newUser,
      }),
      tokens,
    };
  }
  throw new BadRequestError("User:: Error");
};

const signIn = async ({ email, password }) => {
  const holderUser = await userModel.findOne({ email: email });
  if (!holderUser) {
    throw new NotFoundError("User:: User Not Found");
  }

  const privateKey = getRandomValues(64);
  const publicKey = getRandomValues(64);

  if (await checkPassword(password, holderUser.password)) {
    const tokens = await createToken({
      user: holderUser,
      publicKey,
      privateKey,
    });

    return {
      user: simplifyData({
        fields: ["_id", "name", "email"],
        object: holderUser,
      }),
      tokens,
    };
  }

  throw new ForbiddenError("User:: Not access");
};

module.exports = {
  signIn,
  signUp,
};
