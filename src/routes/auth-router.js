const express = require("express");
const { asyncHandler } = require("../middlewares/handler/async-handler");
const AuthController = require("../controllers/auth-controller");

const router = express.Router();

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: sign up in website
 *     tags: [auths]
 *     responses:
 *       200:
 *         description:
 */

router.post("/signup", asyncHandler(AuthController.signUp));

/**
 * @swagger
 *  /api/v1/signin:
 *   post:
 *     summary: sign up in website
 *     tags: [auths]
 *     responses:
 *       200:
 *         description:
 */

router.post("/signin", asyncHandler(AuthController.signIn));

/**
 * @swagger
 *  /api/v1/refreshtoken:
 *   post:
 *     summary: refresh token in website
 *     tags: [auths]
 *     responses:
 *       200:
 *         description:
 */

router.post("/refreshtoken", asyncHandler(AuthController.refreshToken));

module.exports = router;
