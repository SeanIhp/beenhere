"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.auth = exports.getopenid = undefined;

var _regenerator = require('../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('../npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// import { SERVICE_WXPROXY,SERVICE_TENANT } from '../constants';

var getopenid = exports.getopenid = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(reqdata) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getopenid(_x) {
    return _ref.apply(this, arguments);
  };
}();

var auth = exports.auth = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(reqdata) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function auth(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var login = exports.login = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(reqdata) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function login(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var logout = exports.logout = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(reqdata) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function logout(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var _request = require('../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbInJlcWRhdGEiLCJnZXRvcGVuaWQiLCJhdXRoIiwibG9naW4iLCJsb2dvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7d0VBRU8saUJBQXlCQSxPQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7O2tCQUFlQyxTOzs7Ozs7eUVBT2Ysa0JBQW9CRCxPQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7O2tCQUFlRSxJOzs7Ozs7eUVBT2Ysa0JBQXFCRixPQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7O2tCQUFlRyxLOzs7Ozs7eUVBT2Ysa0JBQXNCSCxPQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7O2tCQUFlSSxNOzs7OztBQXhCdEIiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnO1xyXG4vLyBpbXBvcnQgeyBTRVJWSUNFX1dYUFJPWFksU0VSVklDRV9URU5BTlQgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldG9wZW5pZChyZXFkYXRhKSB7XHJcbiAgLy8gcmV0dXJuIHJlcXVlc3QoU0VSVklDRV9XWFBST1hZICsgJy91c2VyaW5mbycse1xyXG4gIC8vICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgLy8gICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXFkYXRhKVxyXG4gIC8vIH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXV0aChyZXFkYXRhKSB7XHJcbiAgLy8gcmV0dXJuIHJlcXVlc3QoU0VSVklDRV9URU5BTlQgKyAnL3Jlc3Q/bWV0aG9kPWVmdXR1cmUub21wLmlkZW50aXR5LmF1dGgnLHtcclxuICAvLyAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gIC8vICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxZGF0YSlcclxuICAvLyB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luKHJlcWRhdGEpIHtcclxuICAvLyByZXR1cm4gcmVxdWVzdChTRVJWSUNFX1RFTkFOVCArICcvcmVzdD9tZXRob2Q9ZWZ1dHVyZS5vbXAuaWRlbnRpdHkuYmluZCcse1xyXG4gIC8vICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgLy8gICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXFkYXRhKVxyXG4gIC8vIH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nb3V0KHJlcWRhdGEpIHtcclxuICAvLyByZXR1cm4gcmVxdWVzdChTRVJWSUNFX1RFTkFOVCArICcvcmVzdD9tZXRob2Q9ZWZ1dHVyZS5vbXAuaWRlbnRpdHkuZGlzYmluZCcse1xyXG4gIC8vICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgLy8gICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXFkYXRhKVxyXG4gIC8vIH0pO1xyXG59XHJcbiJdfQ==