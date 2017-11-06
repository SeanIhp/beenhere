"use strict";var exports=module.exports={};var global=window=require('../../../labrador/global.js');var global = require('./_global.js');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};
