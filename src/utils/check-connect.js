"use strict";

const mongoose = require("mongoose");
const os = require("os");
const _SECONDS = 100000;
// get count connect in to database mongo
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number connections :: ${numConnection}`);
};

// check overload
const checkOverload = () => {
  setInterval(() => {
    // check number connect
    const numConnection = mongoose.connections.length;
    // check cores
    const numCores = os.cpus().length;
    // check memory use
    const memoryUsage = process.memoryUsage().rss;

    //defince max connection
    const maxConnections = 5 * numCores;

    console.log(`Active connections :: ${numConnection}`);
    console.log(`Memory usage :: ${memoryUsage / 1024 / 1024} MB`);
    //calc
    if (numConnection > maxConnections) {
      console.log("connection overload detected!");
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverload,
};
