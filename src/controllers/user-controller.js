"use strict";

const UserService = require("../services/user-service");
const { OK, Created } = require("../utils/response/success-response");

class UserController {
  static signUp = async (req, res, next) => {
    new Created({
      message: "Signup success",
      metadata: await UserService.signUp(req.body),
    }).send(res);
  };

  static getAll = async (req, res, next) => {
    new OK({
      message: "Get",
      metadata: await UserService.getAll(),
    }).send(res);
  };
}

module.exports = UserController;
