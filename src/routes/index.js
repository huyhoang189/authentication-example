const express = require("express");
const checkHealth = require("../utils/check-health");
const authRouter = require("./auth-router");
const userRouter = require("./user-router");
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check health for Server
 *     tags: [Default]
 *     responses:
 *       200:
 *         description:
 */

router.get("/", checkHealth);
router.use(authRouter);
router.use("/users", userRouter);
module.exports = router;
