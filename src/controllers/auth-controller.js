"use strict";

const TokenService = require("../services/token-service");
const UserService = require("../services/user-service");
const AuthService = require("../services/auth-service");
const { OK, Created } = require("../utils/response/success-response");

class AuthController {
  static signUp = async (req, res, next) => {
    new Created({
      message: "Sign up success",
      metadata: await AuthService.signUp(req.body),
    }).send(res);
  };

  static signIn = async (req, res, next) => {
    new OK({
      message: "Sign in success",
      metadata: await AuthService.signIn(req.body),
    }).send(res);
  };

  static refreshToken = async (req, res, next) => {
    new OK({
      message: "Refresh token success",
      metadata: await TokenService.refreshAllToken(req.body),
    }).send(res);
  };
}

module.exports = AuthController;
