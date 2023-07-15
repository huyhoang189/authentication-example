const { encode, createTokenPair, decode } = require("../utils/authentication");
const {
  NotFoundError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  ServiceUnavaiableError,
  BadRequestError,
} = require("../utils/response/error-response");
const tokenModel = require("../models/token-model");
const userModel = require("../models/user-model");
const { getUserByEmail } = require("./user-service");

const createToken = async ({ user, publicKey, privateKey }) => {
  if (!user) throw new NotFoundError("Token:: Not found");

  const { accessToken, refreshToken } = await createTokenPair({
    payload: { userId: user._id, email: user.email },
    publicKey,
    privateKey,
  });

  const tokens = { accessToken, refreshToken };
  const holdToken = tokenModel.findOne({ user: user._id });
  if (holdToken) {
    const status = await deleteItem(user._id);
  }

  const newToken = await tokenModel.create({
    user: user._id,
    refreshToken: refreshToken,
    privateKey: privateKey,
    publicKey: publicKey,
  });

  return newToken ? tokens : null;
};

const refreshAllToken = async ({ refreshToken, userId }) => {
  if (!refreshToken || !userId)
    throw new ForbiddenError("Token:: You can't access that 1!");
  const holdToken = await tokenModel.findOne({ user: userId });
  if (!holdToken)
    throw new UnauthorizedError("Token:: You can't access that 2!");

  const holdRefreshToken = await tokenModel.findOne({ refreshToken });
  if (!holdRefreshToken) {
    await deleteItem(userId);
    throw new UnauthorizedError(
      "Token:: You can't access that. Pls login again!"
    );
  }

  const verify = decode(refreshToken, holdToken.publicKey);
  if (verify && holdToken) {
    const { userId, email } = verify;

    const holdUser = await getUserByEmail(email);
    if (!holdUser) throw new UnauthorizedError("Token:: Cannot find email!");

    const { publicKey, privateKey } = holdToken;
    const { accessToken, refreshToken } = await createTokenPair({
      payload: { userId, email },
      publicKey,
      privateKey,
    });
    const tokens = { accessToken, refreshToken };

    const update = await tokenModel.findByIdAndUpdate(
      holdToken._id,
      {
        refreshToken: refreshToken,
        $push: { refreshtokens: holdToken.refreshToken },
      },
      { new: true }
    );

    if (!update) throw new BadRequestError("Token:: Error update new token");

    return {
      user: {
        userId,
        email,
      },
      tokens,
    };
  }
};

const validateAccessToken = async ({ accessToken, userId }) => {
  if (!accessToken || !userId)
    throw new ForbiddenError("Token:: You can't access that 1!");
  const holdToken = await tokenModel.findOne({ user: userId });
  if (!holdToken)
    throw new UnauthorizedError("Token:: You can't access that 2!");

  const verify = decode(accessToken, holdToken.privateKey);
  if (verify) return userId;
};

const deleteItem = async (userId) => {
  const status = await tokenModel.deleteOne({ user: userId });
  return status;
};

module.exports = {
  deleteItem,
  refreshAllToken,
  validateAccessToken,
  createToken,
};
