"use strict";var exports=module.exports={};var global=window=require('./npm/labrador/global.js');
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('./npm/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('./npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('./npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _labrador = require('./npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

var _createApp = require('./app/createApp.js');

var _dvaLoading = require('./app/dva-loading.js');

var _dvaLoading2 = _interopRequireDefault(_dvaLoading);

var _dvaUtil = require('./app/dva-util.js');

var _common = require('./utils/common.js');

var _reduxPersist = require('./npm/redux-persist/es/index.js');

var _dvaPersist = require('./app/dva-persist.js');

var _dvaPersist2 = _interopRequireDefault(_dvaPersist);

var _reduxLogger = require('./npm/redux-logger/lib/index.js');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _userinfo = require('./models/userinfo.js');

var _userinfo2 = _interopRequireDefault(_userinfo);

var _login = require('./models/login.js');

var _login2 = _interopRequireDefault(_login);

var _home = require('./models/home.js');

var _home2 = _interopRequireDefault(_home);

var _referrer = require('./models/referrer.js');

var _referrer2 = _interopRequireDefault(_referrer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// models
if (true) {
  console.log('当前为开发环境');
}

// 向labrador-redux注册store
// setStore(store);

// redux-persit

var _class = function () {
  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    this.globalData = {
      userInfo: null,
      systemInfo: null
    };
  }

  (0, _createClass3.default)(_class, [{
    key: 'getUserInfo',


    // 外部调用请用 await wxGetApp().getUserInfo()
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var data, res;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.globalData.userInfo) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', this.globalData.userInfo);

              case 2:
                _context.next = 4;
                return _labrador2.default.login();

              case 4:
                data = _context.sent;
                _context.next = 7;
                return _labrador2.default.getUserInfo();

              case 7:
                res = _context.sent;

                this.globalData.userInfo = res.userInfo;
                this.globalData.userInfo.code = data.code;
                return _context.abrupt('return', this.globalData.userInfo);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUserInfo() {
        return _ref.apply(this, arguments);
      }

      return getUserInfo;
    }()
  }, {
    key: 'getSystemInfo',
    value: function getSystemInfo() {
      if (this.globalData.systemInfo) {
        return this.globalData.systemInfo;
      }

      var res = _labrador2.default.getSystemInfoSync();
      this.globalData.systemInfo = res;
      return res;
    }
  }, {
    key: 'onLaunch',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var app, plugin, user;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // console.log("生命周期函数--监听小程序初始化")

                // initialize
                app = (0, _createApp.createDvaApp)({
                  initialState: {
                    Referrer: {
                      query: true ? {
                        // state: "gh_448fd598040d",
                        // code:  "believe_ooiqVv_m4vJBlpmVvmCKaWKt6774"
                        state: "gh_78e33f1530b9",
                        code: "5be4da7eaf6b74391b70880629d299c1"
                      } : {
                        state: "gh_78e33f1530b9",
                        state_name: "beHERE!"
                      }
                    }
                  }
                });
                plugin = (0, _extends3.default)({
                  extraEnhancers: [(0, _reduxPersist.autoRehydrate)()],
                  /*
                  onStateChange: () => {
                    if (true) console.log('state change: %O',app._store.getState());
                  },*/
                  onAction: (0, _reduxLogger2.default)({
                    predicate: function predicate(getState, action) {
                      return action.type !== '@@DVA_LOADING/SHOW' && action.type !== '@@DVA_LOADING/HIDE';
                    },
                    diff: true
                  })
                }, (0, _dvaLoading2.default)(), {
                  onError: function onError(error) {
                    console.error(error.stack);
                    //showToastMessage(error.message,true);
                    _labrador2.default.showModal({
                      title: '错误',
                      content: error.message,
                      showCancel: false
                    });
                  }
                });

                app.use(plugin);

                // model
                // app.model(userinfo);
                // app.model(login);
                app.model(_home2.default);
                app.model(_referrer2.default);

                // start
                app.start();

                // redux-persit
                (0, _dvaPersist2.default)(app._store);

                // getSystemInfo
                this.getSystemInfo();

                // getUserInfo
                _context2.next = 10;
                return this.getUserInfo();

              case 10:
                user = _context2.sent;

                (0, _dvaUtil.doAction)('userInfo', 'setUserInfo', user);

                // 设置了企业入口state,单企业模式
                // if (getState('Referrer').query.state) doAction('loginInfo','getOpenid',this.buildOpenidParam());
                // else doAction('home','getEnterprise');

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onLaunch() {
        return _ref2.apply(this, arguments);
      }

      return onLaunch;
    }()
  }, {
    key: 'onShow',
    value: function onShow() {
      // console.log("当小程序启动，或从后台进入前台显示，会触发 onShow")
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      // console.log("当小程序从前台进入后台，会触发 onHide")
    }
  }, {
    key: 'onError',
    value: function onError(msg) {}
    // console.log("当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息")


    // async timer() {
    //   while (true) {
    //     console.log('hello');
    //     await sleep(10000);
    //   }
    // }

  }]);
  return _class;
}();

exports.default = _class;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJfX0RFVl9fIiwiY29uc29sZSIsImxvZyIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInN5c3RlbUluZm8iLCJsb2dpbiIsImRhdGEiLCJnZXRVc2VySW5mbyIsInJlcyIsImNvZGUiLCJnZXRTeXN0ZW1JbmZvU3luYyIsImFwcCIsImluaXRpYWxTdGF0ZSIsIlJlZmVycmVyIiwicXVlcnkiLCJzdGF0ZSIsInN0YXRlX25hbWUiLCJwbHVnaW4iLCJleHRyYUVuaGFuY2VycyIsIm9uQWN0aW9uIiwicHJlZGljYXRlIiwiZ2V0U3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwiZGlmZiIsIm9uRXJyb3IiLCJlcnJvciIsInN0YWNrIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwibWVzc2FnZSIsInNob3dDYW5jZWwiLCJ1c2UiLCJtb2RlbCIsInN0YXJ0IiwiX3N0b3JlIiwiZ2V0U3lzdGVtSW5mbyIsInVzZXIiLCJtc2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUdBOztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBSkE7QUFNQSxJQUFJQSxPQUFKLEVBQWE7QUFDWEMsVUFBUUMsR0FBUixDQUFZLFNBQVo7QUFDRDs7QUFFRDtBQUNBOztBQWhCQTs7Ozs7U0FtQkVDLFUsR0FBYTtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGtCQUFZO0FBRkQsSzs7Ozs7OztBQUtiOzs7Ozs7OztxQkFFTSxLQUFLRixVQUFMLENBQWdCQyxROzs7OztpREFDWCxLQUFLRCxVQUFMLENBQWdCQyxROzs7O3VCQUlSLG1CQUFHRSxLQUFILEU7OztBQUFiQyxvQjs7dUJBQ1ksbUJBQUdDLFdBQUgsRTs7O0FBQVpDLG1COztBQUNKLHFCQUFLTixVQUFMLENBQWdCQyxRQUFoQixHQUEyQkssSUFBSUwsUUFBL0I7QUFDQSxxQkFBS0QsVUFBTCxDQUFnQkMsUUFBaEIsQ0FBeUJNLElBQXpCLEdBQWdDSCxLQUFLRyxJQUFyQztpREFDTyxLQUFLUCxVQUFMLENBQWdCQyxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBR1Q7QUFDZCxVQUFJLEtBQUtELFVBQUwsQ0FBZ0JFLFVBQXBCLEVBQWdDO0FBQzlCLGVBQU8sS0FBS0YsVUFBTCxDQUFnQkUsVUFBdkI7QUFDRDs7QUFFRCxVQUFJSSxNQUFNLG1CQUFHRSxpQkFBSCxFQUFWO0FBQ0EsV0FBS1IsVUFBTCxDQUFnQkUsVUFBaEIsR0FBNkJJLEdBQTdCO0FBQ0EsYUFBT0EsR0FBUDtBQUNEOzs7Ozs7Ozs7O0FBR0M7O0FBRUE7QUFDTUcsbUIsR0FBTSw2QkFBYTtBQUN2QkMsZ0NBQWM7QUFDWkMsOEJBQVU7QUFDUkMsNkJBQU9mLFVBQVM7QUFDZDtBQUNBO0FBQ0FnQiwrQkFBTyxpQkFITztBQUlkTiw4QkFBTztBQUpPLHVCQUFULEdBS0g7QUFDRk0sK0JBQU8saUJBREw7QUFFRkMsb0NBQVk7QUFGVjtBQU5JO0FBREU7QUFEUyxpQkFBYixDO0FBZU5DLHNCO0FBQ0pDLGtDQUFnQixDQUFDLGtDQUFELEM7QUFDaEI7Ozs7QUFJQUMsNEJBQVUsMkJBQWE7QUFDckJDLCtCQUFXLG1CQUFDQyxRQUFELEVBQVdDLE1BQVg7QUFBQSw2QkFBc0JBLE9BQU9DLElBQVAsS0FBZ0Isb0JBQWhCLElBQXdDRCxPQUFPQyxJQUFQLEtBQWdCLG9CQUE5RTtBQUFBLHFCQURVO0FBRXJCQywwQkFBTTtBQUZlLG1CQUFiO21CQUlQLDJCO0FBQ0hDLHlCLG1CQUFRQyxLLEVBQU87QUFDYjFCLDRCQUFRMEIsS0FBUixDQUFjQSxNQUFNQyxLQUFwQjtBQUNBO0FBQ0EsdUNBQUdDLFNBQUgsQ0FBYTtBQUNYQyw2QkFBTyxJQURJO0FBRVhDLCtCQUFTSixNQUFNSyxPQUZKO0FBR1hDLGtDQUFZO0FBSEQscUJBQWI7QUFLRDs7O0FBRUhyQixvQkFBSXNCLEdBQUosQ0FBUWhCLE1BQVI7O0FBRUE7QUFDQTtBQUNBO0FBQ0FOLG9CQUFJdUIsS0FBSjtBQUNBdkIsb0JBQUl1QixLQUFKOztBQUVBO0FBQ0F2QixvQkFBSXdCLEtBQUo7O0FBRUE7QUFDQSwwQ0FBYXhCLElBQUl5QixNQUFqQjs7QUFFQTtBQUNBLHFCQUFLQyxhQUFMOztBQUVBOzt1QkFDaUIsS0FBSzlCLFdBQUwsRTs7O0FBQWIrQixvQjs7QUFDSix1Q0FBUyxVQUFULEVBQW9CLGFBQXBCLEVBQWtDQSxJQUFsQzs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFHTztBQUNQO0FBQ0Q7Ozs2QkFFUTtBQUNQO0FBQ0Q7Ozs0QkFFT0MsRyxFQUFLLENBRVo7QUFEQzs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd3ggZnJvbSAnbGFicmFkb3InO1xuaW1wb3J0IHsgY3JlYXRlRHZhQXBwIH0gZnJvbSAnLi9hcHAvY3JlYXRlQXBwJztcbmltcG9ydCBjcmVhdGVMb2FkaW5nIGZyb20gJy4vYXBwL2R2YS1sb2FkaW5nJztcbmltcG9ydCB7IGRvQWN0aW9uLGdldFN0YXRlIH0gZnJvbSAnLi9hcHAvZHZhLXV0aWwnO1xuaW1wb3J0IHsgc2hvd1RvYXN0TWVzc2FnZSB9IGZyb20gJy4vdXRpbHMvY29tbW9uJztcblxuLy8gcmVkdXgtcGVyc2l0XG5pbXBvcnQgeyBhdXRvUmVoeWRyYXRlIH0gZnJvbSAncmVkdXgtcGVyc2lzdCc7XG5pbXBvcnQgcGVyc2lzdFN0b3JlIGZyb20gJy4vYXBwL2R2YS1wZXJzaXN0JztcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJztcblxuLy8gbW9kZWxzXG5pbXBvcnQgdXNlcmluZm8gZnJvbSAnLi9tb2RlbHMvdXNlcmluZm8nO1xuaW1wb3J0IGxvZ2luIGZyb20gJy4vbW9kZWxzL2xvZ2luJztcbmltcG9ydCBob21lIGZyb20gJy4vbW9kZWxzL2hvbWUnO1xuaW1wb3J0IHJlZmVycmVyIGZyb20gJy4vbW9kZWxzL3JlZmVycmVyJztcblxuaWYgKF9fREVWX18pIHtcbiAgY29uc29sZS5sb2coJ+W9k+WJjeS4uuW8gOWPkeeOr+WigycpO1xufVxuXG4vLyDlkJFsYWJyYWRvci1yZWR1eOazqOWGjHN0b3JlXG4vLyBzZXRTdG9yZShzdG9yZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbCxcbiAgICBzeXN0ZW1JbmZvOiBudWxsXG4gIH07XG5cbiAgLy8g5aSW6YOo6LCD55So6K+355SoIGF3YWl0IHd4R2V0QXBwKCkuZ2V0VXNlckluZm8oKVxuICBhc3luYyBnZXRVc2VySW5mbygpIHtcbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvO1xuICAgIH1cblxuICAgIC8vIOiOt+WPlueUqOaIt1xuICAgIGxldCBkYXRhID0gYXdhaXQgd3gubG9naW4oKTtcbiAgICBsZXQgcmVzID0gYXdhaXQgd3guZ2V0VXNlckluZm8oKTtcbiAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvLmNvZGUgPSBkYXRhLmNvZGU7XG4gICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbztcbiAgfVxuXG4gIGdldFN5c3RlbUluZm8oKSB7XG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS5zeXN0ZW1JbmZvKSB7XG4gICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnN5c3RlbUluZm87XG4gICAgfVxuXG4gICAgbGV0IHJlcyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgdGhpcy5nbG9iYWxEYXRhLnN5c3RlbUluZm8gPSByZXM7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFzeW5jIG9uTGF1bmNoKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwi55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzlsI/nqIvluo/liJ3lp4vljJZcIilcblxuICAgIC8vIGluaXRpYWxpemVcbiAgICBjb25zdCBhcHAgPSBjcmVhdGVEdmFBcHAoe1xuICAgICAgaW5pdGlhbFN0YXRlOiB7XG4gICAgICAgIFJlZmVycmVyOiB7XG4gICAgICAgICAgcXVlcnk6IF9fREVWX18/IHtcbiAgICAgICAgICAgIC8vIHN0YXRlOiBcImdoXzQ0OGZkNTk4MDQwZFwiLFxuICAgICAgICAgICAgLy8gY29kZTogIFwiYmVsaWV2ZV9vb2lxVnZfbTR2SkJscG1Wdm1DS2FXS3Q2Nzc0XCJcbiAgICAgICAgICAgIHN0YXRlOiBcImdoXzc4ZTMzZjE1MzBiOVwiLFxuICAgICAgICAgICAgY29kZTogIFwiNWJlNGRhN2VhZjZiNzQzOTFiNzA4ODA2MjlkMjk5YzFcIiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgfSA6IHtcbiAgICAgICAgICAgIHN0YXRlOiBcImdoXzc4ZTMzZjE1MzBiOVwiLFxuICAgICAgICAgICAgc3RhdGVfbmFtZTogXCJiZUhFUkUhXCIsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgcGx1Z2luID0ge1xuICAgICAgZXh0cmFFbmhhbmNlcnM6IFthdXRvUmVoeWRyYXRlKCldLFxuICAgICAgLypcbiAgICAgIG9uU3RhdGVDaGFuZ2U6ICgpID0+IHtcbiAgICAgICAgaWYgKF9fREVWX18pIGNvbnNvbGUubG9nKCdzdGF0ZSBjaGFuZ2U6ICVPJyxhcHAuX3N0b3JlLmdldFN0YXRlKCkpO1xuICAgICAgfSwqL1xuICAgICAgb25BY3Rpb246IGNyZWF0ZUxvZ2dlcih7XG4gICAgICAgIHByZWRpY2F0ZTogKGdldFN0YXRlLCBhY3Rpb24pID0+IGFjdGlvbi50eXBlICE9PSAnQEBEVkFfTE9BRElORy9TSE9XJyAmJiBhY3Rpb24udHlwZSAhPT0gJ0BARFZBX0xPQURJTkcvSElERScsXG4gICAgICAgIGRpZmY6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIC4uLmNyZWF0ZUxvYWRpbmcoKSxcbiAgICAgIG9uRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5zdGFjayk7XG4gICAgICAgIC8vc2hvd1RvYXN0TWVzc2FnZShlcnJvci5tZXNzYWdlLHRydWUpO1xuICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn6ZSZ6K+vJyxcbiAgICAgICAgICBjb250ZW50OiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfTtcbiAgICBhcHAudXNlKHBsdWdpbik7XG4gICAgXG4gICAgLy8gbW9kZWxcbiAgICAvLyBhcHAubW9kZWwodXNlcmluZm8pO1xuICAgIC8vIGFwcC5tb2RlbChsb2dpbik7XG4gICAgYXBwLm1vZGVsKGhvbWUpO1xuICAgIGFwcC5tb2RlbChyZWZlcnJlcik7XG5cbiAgICAvLyBzdGFydFxuICAgIGFwcC5zdGFydCgpO1xuICAgIFxuICAgIC8vIHJlZHV4LXBlcnNpdFxuICAgIHBlcnNpc3RTdG9yZShhcHAuX3N0b3JlKTtcbiAgICBcbiAgICAvLyBnZXRTeXN0ZW1JbmZvXG4gICAgdGhpcy5nZXRTeXN0ZW1JbmZvKCk7XG5cbiAgICAvLyBnZXRVc2VySW5mb1xuICAgIGxldCB1c2VyID0gYXdhaXQgdGhpcy5nZXRVc2VySW5mbygpO1xuICAgIGRvQWN0aW9uKCd1c2VySW5mbycsJ3NldFVzZXJJbmZvJyx1c2VyKTtcblxuICAgIC8vIOiuvue9ruS6huS8geS4muWFpeWPo3N0YXRlLOWNleS8geS4muaooeW8j1xuICAgIC8vIGlmIChnZXRTdGF0ZSgnUmVmZXJyZXInKS5xdWVyeS5zdGF0ZSkgZG9BY3Rpb24oJ2xvZ2luSW5mbycsJ2dldE9wZW5pZCcsdGhpcy5idWlsZE9wZW5pZFBhcmFtKCkpO1xuICAgIC8vIGVsc2UgZG9BY3Rpb24oJ2hvbWUnLCdnZXRFbnRlcnByaXNlJyk7XG4gIH1cblxuICBvblNob3coKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCLlvZPlsI/nqIvluo/lkK/liqjvvIzmiJbku47lkI7lj7Dov5vlhaXliY3lj7DmmL7npLrvvIzkvJrop6blj5Egb25TaG93XCIpXG4gIH1cblxuICBvbkhpZGUoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCLlvZPlsI/nqIvluo/ku47liY3lj7Dov5vlhaXlkI7lj7DvvIzkvJrop6blj5Egb25IaWRlXCIpXG4gIH1cblxuICBvbkVycm9yKG1zZykge1xuICAgIC8vIGNvbnNvbGUubG9nKFwi5b2T5bCP56iL5bqP5Y+R55Sf6ISa5pys6ZSZ6K+v77yM5oiW6ICFIGFwaSDosIPnlKjlpLHotKXml7bvvIzkvJrop6blj5Egb25FcnJvciDlubbluKbkuIrplJnor6/kv6Hmga9cIilcbiAgfVxuXG4gIC8vIGFzeW5jIHRpbWVyKCkge1xuICAvLyAgIHdoaWxlICh0cnVlKSB7XG4gIC8vICAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcbiAgLy8gICAgIGF3YWl0IHNsZWVwKDEwMDAwKTtcbiAgLy8gICB9XG4gIC8vIH1cbn1cbiJdfQ==
{
var __app=new exports.default();Object.getOwnPropertyNames(__app.constructor.prototype).forEach(function(name){if(name!=='constructor')__app[name]=__app.constructor.prototype[name]});App(__app);
}