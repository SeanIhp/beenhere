"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../npm/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _login2 = require('../services/login.js');

var _createApp = require('../app/createApp.js');

var _routerUtil = require('../app/router-util.js');

var _routerUtil2 = _interopRequireDefault(_routerUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  namespace: 'loginInfo',

  state: {
    openid: null,
    entid: null,
    id_keyword: null,
    id_name: null,
    isadmin: null,
    corp_id: "001",
    mktid: null,
    mktname: null,
    tenantcode: null,
    tenantname: null
  },

  effects: {
    getOpenid: _regenerator2.default.mark(function getOpenid(_ref, _ref2) {
      var payload = _ref.payload;
      var select = _ref2.select,
          call = _ref2.call,
          put = _ref2.put;

      var _ref3, body;

      return _regenerator2.default.wrap(function getOpenid$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(_login2.getopenid, payload);

            case 2:
              _ref3 = _context.sent;
              body = _ref3.body;

              if (!body) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return put({
                type: 'openidSuccess',
                payload: {
                  openid: body.openid,
                  entid: body.ent_id
                }
              });

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, getOpenid, this);
    }),
    auth: _regenerator2.default.mark(function auth(_ref4, _ref5) {
      var payload = _ref4.payload;
      var select = _ref5.select,
          call = _ref5.call,
          put = _ref5.put;

      var _ref6, body;

      return _regenerator2.default.wrap(function auth$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(_login2.auth, payload);

            case 2:
              _ref6 = _context2.sent;
              body = _ref6.body;

              if (!body) {
                _context2.next = 7;
                break;
              }

              _context2.next = 7;
              return put({
                type: 'authSuccess',
                payload: (0, _extends3.default)({}, body.data)
              });

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, auth, this);
    }),
    login: _regenerator2.default.mark(function login(_ref7, _ref8) {
      var payload = _ref7.payload;
      var select = _ref8.select,
          call = _ref8.call,
          put = _ref8.put;

      var openid, _ref9, body, _ref10, _body, _ref11, _body2;

      return _regenerator2.default.wrap(function login$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return select(function (state) {
                return state['loginInfo'].openid;
              });

            case 2:
              openid = _context3.sent;

              if (!openid) {
                _context3.next = 15;
                break;
              }

              payload.reg_keyword = openid;
              payload.reg_type = '5';
              _context3.next = 8;
              return call(_login2.login, payload);

            case 8:
              _ref9 = _context3.sent;
              body = _ref9.body;

              if (!body) {
                _context3.next = 13;
                break;
              }

              _context3.next = 13;
              return put({
                type: 'loginSuccess',
                payload: (0, _extends3.default)({}, body.data)
              });

            case 13:
              _context3.next = 32;
              break;

            case 15:
              _context3.next = 17;
              return call(_login2.getopenid, (0, _createApp.wxGetApp)().buildOpenidParam());

            case 17:
              _ref10 = _context3.sent;
              _body = _ref10.body;

              if (!_body) {
                _context3.next = 32;
                break;
              }

              // 先获取openid
              openid = _body2.openid;

              if (!openid) {
                _context3.next = 24;
                break;
              }

              _context3.next = 24;
              return put({
                type: 'openidSuccess',
                payload: {
                  openid: openid,
                  entid: _body2.ent_id
                }
              });

            case 24:

              // 再登录&绑定
              if (openid) {
                payload.reg_keyword = openid;
                payload.reg_type = '5';
              }
              _context3.next = 27;
              return call(_login2.login, payload);

            case 27:
              _ref11 = _context3.sent;
              _body2 = _ref11.body;

              if (!_body2) {
                _context3.next = 32;
                break;
              }

              _context3.next = 32;
              return put({
                type: 'loginSuccess',
                payload: (0, _extends3.default)({}, _body2.data)
              });

            case 32:
            case 'end':
              return _context3.stop();
          }
        }
      }, login, this);
    }),
    logout: _regenerator2.default.mark(function logout(_ref12, _ref13) {
      var payload = _ref12.payload;
      var select = _ref13.select,
          call = _ref13.call,
          put = _ref13.put;

      var openid, _ref14, body;

      return _regenerator2.default.wrap(function logout$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return select(function (state) {
                return state['loginInfo'].openid;
              });

            case 2:
              openid = _context4.sent;

              if (!openid) {
                _context4.next = 16;
                break;
              }

              payload.reg_keyword = openid;
              payload.reg_type = '5';
              _context4.next = 8;
              return call(_login2.logout, payload);

            case 8:
              _ref14 = _context4.sent;
              body = _ref14.body;

              if (!body) {
                _context4.next = 14;
                break;
              }

              _context4.next = 13;
              return put({
                type: 'logoutSuccess',
                payload: (0, _extends3.default)({}, body.data)
              });

            case 13:

              // 跳转到登录(IOS必须延时)
              setTimeout(function () {
                _routerUtil2.default.redirect("/login/");
              }, 1500);

            case 14:
              _context4.next = 17;
              break;

            case 16:
              // 跳转到登录(IOS必须延时)
              setTimeout(function () {
                _routerUtil2.default.redirect("/login/");
              }, 1500);

            case 17:
            case 'end':
              return _context4.stop();
          }
        }
      }, logout, this);
    })
  },

  reducers: {
    openidSuccess: function openidSuccess(state, action) {
      return (0, _extends3.default)({}, state, action.payload);
    },
    authSuccess: function authSuccess(state, action) {
      // 测试模拟用户
      //action.payload.id_keyword = '22222';

      if (action.payload && action.payload.id_keyword) {
        return (0, _extends3.default)({}, state, action.payload);
      } else {
        return (0, _extends3.default)({}, state);
      }
    },
    loginSuccess: function loginSuccess(state, action) {
      /* 测试模拟用户
      action.payload.id_keyword = '22222';
      action.payload.id_name = '测试用户';
      action.payload.isadmin = 'Y';
      action.payload.mktid = '0001';
      action.payload.mktname = '测试门店';
      action.payload.tenantcode = '1xxx';
      action.payload.tenantname = '测试商户XXXXXXXXXXXX';
      */

      if (action.payload && action.payload.id_keyword) {
        return (0, _extends3.default)({}, state, action.payload);
      } else {
        return (0, _extends3.default)({}, state);
      }
    },
    logoutSuccess: function logoutSuccess(state, action) {
      return (0, _extends3.default)({}, state, {
        id_keyword: null,
        id_name: null,
        tenantcode: null,
        tenantname: null
      });
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIm5hbWVzcGFjZSIsInN0YXRlIiwib3BlbmlkIiwiZW50aWQiLCJpZF9rZXl3b3JkIiwiaWRfbmFtZSIsImlzYWRtaW4iLCJjb3JwX2lkIiwibWt0aWQiLCJta3RuYW1lIiwidGVuYW50Y29kZSIsInRlbmFudG5hbWUiLCJlZmZlY3RzIiwiZ2V0T3BlbmlkIiwicGF5bG9hZCIsInNlbGVjdCIsImNhbGwiLCJwdXQiLCJib2R5IiwidHlwZSIsImVudF9pZCIsImF1dGgiLCJkYXRhIiwibG9naW4iLCJyZWdfa2V5d29yZCIsInJlZ190eXBlIiwiYnVpbGRPcGVuaWRQYXJhbSIsImxvZ291dCIsInNldFRpbWVvdXQiLCJyZWRpcmVjdCIsInJlZHVjZXJzIiwib3BlbmlkU3VjY2VzcyIsImFjdGlvbiIsImF1dGhTdWNjZXNzIiwibG9naW5TdWNjZXNzIiwibG9nb3V0U3VjY2VzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O2tCQUVlOztBQUViQSxhQUFXLFdBRkU7O0FBSWJDLFNBQU87QUFDTEMsWUFBUSxJQURIO0FBRUxDLFdBQU8sSUFGRjtBQUdMQyxnQkFBWSxJQUhQO0FBSUxDLGFBQVMsSUFKSjtBQUtMQyxhQUFTLElBTEo7QUFNTEMsYUFBUyxLQU5KO0FBT0xDLFdBQU8sSUFQRjtBQVFMQyxhQUFTLElBUko7QUFTTEMsZ0JBQVksSUFUUDtBQVVMQyxnQkFBWTtBQVZQLEdBSk07O0FBaUJiQyxXQUFTO0FBQ05DLGFBRE07QUFBQSxVQUNNQyxPQUROLFFBQ01BLE9BRE47QUFBQSxVQUNtQkMsTUFEbkIsU0FDbUJBLE1BRG5CO0FBQUEsVUFDMkJDLElBRDNCLFNBQzJCQSxJQUQzQjtBQUFBLFVBQ2lDQyxHQURqQyxTQUNpQ0EsR0FEakM7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVrQkQsd0JBQWdCRixPQUFoQixDQUZsQjs7QUFBQTtBQUFBO0FB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N0I7QUFDRCxLQUhPO0FBSVJtQixlQUpRLHVCQUlJaEMsS0FKSixFQUlXK0IsTUFKWCxFQUltQjtBQUN6QjtBQUNBOztBQUVBLFVBQUlBLE9BQU9sQixPQUFQLElBQWtCa0IsT0FBT2xCLE9BQVAsQ0FBZVYsVUFBckMsRUFDQTtBQUNFLDBDQUFZSCxLQUFaLEVBQXNCK0IsT0FBT2xCLE9BQTdCO0FBQ0QsT0FIRCxNQUlLO0FBQ0gsMENBQVliLEtBQVo7QUFDRDtBQUNGLEtBZk87QUFnQlJpQyxnQkFoQlEsd0JBZ0JLakMsS0FoQkwsRUFnQlkrQixNQWhCWixFQWdCb0I7QUFDMUI7Ozs7Ozs7Ozs7QUFVQSxVQUFJQSxPQUFPbEIsT0FBUCxJQUFrQmtCLE9BQU9sQixPQUFQLENBQWVWLFVBQXJDLEVBQ0E7QUFDRSwwQ0FBWUgsS0FBWixFQUFzQitCLE9BQU9sQixPQUE3QjtBQUNELE9BSEQsTUFJSztBQUNILDBDQUFZYixLQUFaO0FBQ0Q7QUFDRixLQWxDTztBQW1DUmtDLGlCQW5DUSx5QkFtQ01sQyxLQW5DTixFQW1DYStCLE1BbkNiLEVBbUNxQjtBQUMzQix3Q0FBWS9CLEtBQVo7QUFDRUcsb0JBQVksSUFEZDtBQUVFQyxpQkFBUyxJQUZYO0FBR0VLLG9CQUFZLElBSGQ7QUFJRUMsb0JBQVk7QUFKZDtBQU1EO0FBMUNPO0FBckhHLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldG9wZW5pZCxhdXRoLGxvZ2luLGxvZ291dCB9IGZyb20gJy4uL3NlcnZpY2VzL2xvZ2luJztcclxuaW1wb3J0IHsgd3hHZXRBcHAgfSBmcm9tICcuLi9hcHAvY3JlYXRlQXBwJztcclxuaW1wb3J0IFJvdXRlciBmcm9tICcuLi9hcHAvcm91dGVyLXV0aWwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cclxuICBuYW1lc3BhY2U6ICdsb2dpbkluZm8nLFxyXG5cclxuICBzdGF0ZToge1xyXG4gICAgb3BlbmlkOiBudWxsLFxyXG4gICAgZW50aWQ6IG51bGwsXHJcbiAgICBpZF9rZXl3b3JkOiBudWxsLFxyXG4gICAgaWRfbmFtZTogbnVsbCxcclxuICAgIGlzYWRtaW46IG51bGwsXHJcbiAgICBjb3JwX2lkOiBcIjAwMVwiLFxyXG4gICAgbWt0aWQ6IG51bGwsXHJcbiAgICBta3RuYW1lOiBudWxsLFxyXG4gICAgdGVuYW50Y29kZTogbnVsbCxcclxuICAgIHRlbmFudG5hbWU6IG51bGwsXHJcbiAgfSxcclxuXHJcbiAgZWZmZWN0czoge1xyXG4gICAgKmdldE9wZW5pZCh7IHBheWxvYWQgfSwgeyBzZWxlY3QsIGNhbGwsIHB1dCB9KSB7XHJcbiAgICAgIGNvbnN0IHsgYm9keSB9ID0geWllbGQgY2FsbChnZXRvcGVuaWQsIHBheWxvYWQpO1xyXG4gICAgICBpZiAoYm9keSkge1xyXG4gICAgICAgIHlpZWxkIHB1dCh7XHJcbiAgICAgICAgICB0eXBlOiAnb3BlbmlkU3VjY2VzcycsXHJcbiAgICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgIG9wZW5pZDogYm9keS5vcGVuaWQsXHJcbiAgICAgICAgICAgIGVudGlkOiBib2R5LmVudF9pZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgKmF1dGgoeyBwYXlsb2FkIH0sIHsgc2VsZWN0LCBjYWxsLCBwdXQgfSkge1xyXG4gICAgICBjb25zdCB7IGJvZHkgfSA9IHlpZWxkIGNhbGwoYXV0aCwgcGF5bG9hZCk7XHJcbiAgICAgIGlmIChib2R5KSB7XHJcbiAgICAgICAgeWllbGQgcHV0KHtcclxuICAgICAgICAgIHR5cGU6ICdhdXRoU3VjY2VzcycsXHJcbiAgICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgIC4uLmJvZHkuZGF0YSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgICpsb2dpbih7IHBheWxvYWQgfSwgeyBzZWxlY3QsIGNhbGwsIHB1dCB9KSB7XHJcbiAgICAgIGxldCBvcGVuaWQgPSB5aWVsZCBzZWxlY3QoKHN0YXRlKSA9PiBzdGF0ZVsnbG9naW5JbmZvJ10ub3BlbmlkKTtcclxuICAgICAgaWYgKG9wZW5pZCkge1xyXG4gICAgICAgIHBheWxvYWQucmVnX2tleXdvcmQgPSBvcGVuaWQ7XHJcbiAgICAgICAgcGF5bG9hZC5yZWdfdHlwZSA9ICc1JztcclxuICAgICAgICBjb25zdCB7IGJvZHkgfSA9IHlpZWxkIGNhbGwobG9naW4sIHBheWxvYWQpO1xyXG4gICAgICAgIGlmIChib2R5KSB7XHJcbiAgICAgICAgICB5aWVsZCBwdXQoe1xyXG4gICAgICAgICAgICB0eXBlOiAnbG9naW5TdWNjZXNzJyxcclxuICAgICAgICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICAgIC4uLmJvZHkuZGF0YSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHsgYm9keSB9ID0geWllbGQgY2FsbChnZXRvcGVuaWQsIHd4R2V0QXBwKCkuYnVpbGRPcGVuaWRQYXJhbSgpKTtcclxuICAgICAgICBpZiAoYm9keSkge1xyXG4gICAgICAgICAgLy8g5YWI6I635Y+Wb3BlbmlkXHJcbiAgICAgICAgICBvcGVuaWQgPSBib2R5Lm9wZW5pZDtcclxuICAgICAgICAgIGlmIChvcGVuaWQpIHtcclxuICAgICAgICAgICAgeWllbGQgcHV0KHtcclxuICAgICAgICAgICAgICB0eXBlOiAnb3BlbmlkU3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICAgICAgb3BlbmlkOiBvcGVuaWQsXHJcbiAgICAgICAgICAgICAgICBlbnRpZDogYm9keS5lbnRfaWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIOWGjeeZu+W9lSbnu5HlrppcclxuICAgICAgICAgIGlmIChvcGVuaWQpIHtcclxuICAgICAgICAgICAgcGF5bG9hZC5yZWdfa2V5d29yZCA9IG9wZW5pZDtcclxuICAgICAgICAgICAgcGF5bG9hZC5yZWdfdHlwZSA9ICc1JztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHsgYm9keSB9ID0geWllbGQgY2FsbChsb2dpbiwgcGF5bG9hZCk7XHJcbiAgICAgICAgICBpZiAoYm9keSkge1xyXG4gICAgICAgICAgICB5aWVsZCBwdXQoe1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdsb2dpblN1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIC4uLmJvZHkuZGF0YSxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgICAgXHJcbiAgICAqbG9nb3V0KHsgcGF5bG9hZCB9LCB7IHNlbGVjdCwgY2FsbCwgcHV0IH0pIHtcclxuICAgICAgbGV0IG9wZW5pZCA9IHlpZWxkIHNlbGVjdCgoc3RhdGUpID0+IHN0YXRlWydsb2dpbkluZm8nXS5vcGVuaWQpO1xyXG4gICAgICBpZiAob3BlbmlkKSB7XHJcbiAgICAgICAgcGF5bG9hZC5yZWdfa2V5d29yZCA9IG9wZW5pZDtcclxuICAgICAgICBwYXlsb2FkLnJlZ190eXBlID0gJzUnOyAgICAgIFxyXG4gICAgICAgIGNvbnN0IHsgYm9keSB9ID0geWllbGQgY2FsbChsb2dvdXQsIHBheWxvYWQpO1xyXG4gICAgICAgIGlmIChib2R5KSB7XHJcbiAgICAgICAgICB5aWVsZCBwdXQoe1xyXG4gICAgICAgICAgICB0eXBlOiAnbG9nb3V0U3VjY2VzcycsXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAuLi5ib2R5LmRhdGEsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIOi3s+i9rOWIsOeZu+W9lShJT1Plv4Xpobvlu7bml7YpXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBSb3V0ZXIucmVkaXJlY3QoXCIvbG9naW4vXCIpO1xyXG4gICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIOi3s+i9rOWIsOeZu+W9lShJT1Plv4Xpobvlu7bml7YpXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIFJvdXRlci5yZWRpcmVjdChcIi9sb2dpbi9cIik7XHJcbiAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgcmVkdWNlcnM6IHtcclxuICAgIG9wZW5pZFN1Y2Nlc3Moc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfTtcclxuICAgIH0sXHJcbiAgICBhdXRoU3VjY2VzcyhzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgIC8vIOa1i+ivleaooeaLn+eUqOaIt1xyXG4gICAgICAvL2FjdGlvbi5wYXlsb2FkLmlkX2tleXdvcmQgPSAnMjIyMjInO1xyXG5cclxuICAgICAgaWYgKGFjdGlvbi5wYXlsb2FkICYmIGFjdGlvbi5wYXlsb2FkLmlkX2tleXdvcmQpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSB9O1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgbG9naW5TdWNjZXNzKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgLyog5rWL6K+V5qih5ouf55So5oi3XHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkLmlkX2tleXdvcmQgPSAnMjIyMjInO1xyXG4gICAgICBhY3Rpb24ucGF5bG9hZC5pZF9uYW1lID0gJ+a1i+ivleeUqOaItyc7XHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkLmlzYWRtaW4gPSAnWSc7XHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkLm1rdGlkID0gJzAwMDEnO1xyXG4gICAgICBhY3Rpb24ucGF5bG9hZC5ta3RuYW1lID0gJ+a1i+ivlemXqOW6lyc7XHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkLnRlbmFudGNvZGUgPSAnMXh4eCc7XHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkLnRlbmFudG5hbWUgPSAn5rWL6K+V5ZWG5oi3WFhYWFhYWFhYWFhYJztcclxuICAgICAgKi9cclxuICAgICAgXHJcbiAgICAgIGlmIChhY3Rpb24ucGF5bG9hZCAmJiBhY3Rpb24ucGF5bG9hZC5pZF9rZXl3b3JkKVxyXG4gICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkIH07XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUgfTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxvZ291dFN1Y2Nlc3Moc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgXHJcbiAgICAgICAgaWRfa2V5d29yZDogbnVsbCxcclxuICAgICAgICBpZF9uYW1lOiBudWxsLFxyXG4gICAgICAgIHRlbmFudGNvZGU6IG51bGwsXHJcbiAgICAgICAgdGVuYW50bmFtZTogbnVsbCxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfSxcclxufVxyXG4iXX0=