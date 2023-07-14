const express = require("express");
const { asyncHandler } = require("../middlewares/error/async-handler");
const UserController = require("../controllers/user-controller");

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

router.post("/signup", asyncHandler(UserController.signUp));

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

router.post("/signin", asyncHandler(UserController.signUp));

module.exports = router;
