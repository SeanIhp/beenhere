"use strict";var exports=module.exports={};var getKeys = require('./_object-keys.js');
var toIObject = require('./_to-iobject.js');
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};
