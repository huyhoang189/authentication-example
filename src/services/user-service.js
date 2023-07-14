"use strict";

const hashPassword = require("../utils/authentication/hash-password");
const {
  BadRequestError,
  ConflictError,
} = require("../utils/response/error-response");
const userModel = require("../models/user-model");
const RoleUser = require("../commom");
const { simplifyDatas, simplifyData } = require("../utils/simplify-data");

class UserService {
  static signUp = async ({ name, email, password }) => {
    const holderUser = await userModel.findOne({ email: email });
    if (holderUser) {
      throw new ConflictError("User is conflic");
    }

    const passHash = await hashPassword(password);
    const newUser = await userModel.create({
      name,
      email,
      password: passHash,
      roles: [RoleUser.WRITER],
    });

    // throw new BadRequestError("Looxi");
    return simplifyData({ fields: ["_id", "name", "email"], object: newUser });
  };

  static getAll = async () => {
    const holderUsers = await userModel.find({});
    // console.log(holderUsers);

    return simplifyDatas({
      fields: ["_id", "name", "email", "roles"],
      objects: holderUsers,
    });
  };
}

module.exports = UserService;
