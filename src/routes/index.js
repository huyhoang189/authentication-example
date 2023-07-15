const express = require("express");
const checkHealth = require("../middlewares/handler/check-health");
const authRouter = require("./auth-router");
const userRouter = require("./user-router");
const checkAuth = require("../middlewares/authentication/check-auth");
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
router.use("/users", checkAuth, userRouter);
module.exports = router;
