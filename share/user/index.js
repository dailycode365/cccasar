"use strict";
"browser" === process.type ? module.exports = require("./lib/browser") : "renderer" === process.type && (module.exports = require("./lib/renderer"));