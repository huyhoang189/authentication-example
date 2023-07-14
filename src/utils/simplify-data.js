"use strict";

const _ = require("lodash");

const simplifyData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const simplifyDatas = ({ fields = [], objects = [] }) => {
  return objects.map((object) => simplifyData({ fields, object }));
};
module.exports = { simplifyData, simplifyDatas };
