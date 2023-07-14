const express = require("express");
const { asyncHandler } = require("../middlewares/error/async-handler");
const UserController = require("../controllers/user-controller");

const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: sign up in website
 *     tags: [users]
 *     responses:
 *       200:
 *         description:
 */

router.get("/", asyncHandler(UserController.getAll));

module.exports = router;
