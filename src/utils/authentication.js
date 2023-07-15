const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const hashPassword = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

const checkPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};

const getRandomValues = (num = 64) => {
  let characters = "0123456789abcdef";
  let str = "";
  for (let i = 0; i < num; i++) {
    str += characters[Math.floor(Math.random() * 16)];
  }
  return str;
};

const encode = ({ payload, key, expiresIn }) => {
  return JWT.sign(payload, key, {
    expiresIn: expiresIn,
  });
};

const decode = (token, key) => {
  return JWT.verify(token, key);
};

const createTokenPair = async ({ payload, publicKey, privateKey }) => {
  const refreshToken = await encode({
    payload: payload,
    key: publicKey,
    expiresIn: "7 days",
  });

  const accessToken = await encode({
    payload: payload,
    key: privateKey,
    expiresIn: "2 days",
  });

  return { refreshToken, accessToken };
};
module.exports = {
  hashPassword,
  checkPassword,
  encode,
  decode,
  getRandomValues,
  createTokenPair,
};
