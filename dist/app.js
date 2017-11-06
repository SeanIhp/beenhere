"use strict";var exports=module.exports={};var global=window=require('./npm/labrador/global.js');
Object.defineProperty(exports, "__esModule", {
  value: true
});

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
                plugin = {
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
                  }),
                  // ...createLoading(),
                  onError: function onError(error) {
                    console.error(error.stack);
                    //showToastMessage(error.message,true);
                    _labrador2.default.showModal({
                      title: '错误',
                      content: error.message,
                      showCancel: false
                    });
                  }
                };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJfX0RFVl9fIiwiY29uc29sZSIsImxvZyIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsInN5c3RlbUluZm8iLCJsb2dpbiIsImRhdGEiLCJnZXRVc2VySW5mbyIsInJlcyIsImNvZGUiLCJnZXRTeXN0ZW1JbmZvU3luYyIsImFwcCIsImluaXRpYWxTdGF0ZSIsIlJlZmVycmVyIiwicXVlcnkiLCJzdGF0ZSIsInN0YXRlX25hbWUiLCJwbHVnaW4iLCJleHRyYUVuaGFuY2VycyIsIm9uQWN0aW9uIiwicHJlZGljYXRlIiwiZ2V0U3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwiZGlmZiIsIm9uRXJyb3IiLCJlcnJvciIsInN0YWNrIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwibWVzc2FnZSIsInNob3dDYW5jZWwiLCJ1c2UiLCJtb2RlbCIsInN0YXJ0IiwiX3N0b3JlIiwiZ2V0U3lzdGVtSW5mbyIsInVzZXIiLCJtc2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFKQTtBQU1BLElBQUlBLE9BQUosRUFBYTtBQUNYQyxVQUFRQyxHQUFSLENBQVksU0FBWjtBQUNEOztBQUVEO0FBQ0E7O0FBaEJBOzs7OztTQW1CRUMsVSxHQUFhO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsa0JBQVk7QUFGRCxLOzs7Ozs7O0FBS2I7Ozs7Ozs7O3FCQUVNLEtBQUtGLFVBQUwsQ0FBZ0JDLFE7Ozs7O2lEQUNYLEtBQUtELFVBQUwsQ0FBZ0JDLFE7Ozs7dUJBSVIsbUJBQUdFLEtBQUgsRTs7O0FBQWJDLG9COzt1QkFDWSxtQkFBR0MsV0FBSCxFOzs7QUFBWkMsbUI7O0FBQ0oscUJBQUtOLFVBQUwsQ0FBZ0JDLFFBQWhCLEdBQTJCSyxJQUFJTCxRQUEvQjtBQUNBLHFCQUFLRCxVQUFMLENBQWdCQyxRQUFoQixDQUF5Qk0sSUFBekIsR0FBZ0NILEtBQUtHLElBQXJDO2lEQUNPLEtBQUtQLFVBQUwsQ0FBZ0JDLFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FHVDtBQUNkLFVBQUksS0FBS0QsVUFBTCxDQUFnQkUsVUFBcEIsRUFBZ0M7QUFDOUIsZUFBTyxLQUFLRixVQUFMLENBQWdCRSxVQUF2QjtBQUNEOztBQUVELFVBQUlJLE1BQU0sbUJBQUdFLGlCQUFILEVBQVY7QUFDQSxXQUFLUixVQUFMLENBQWdCRSxVQUFoQixHQUE2QkksR0FBN0I7QUFDQSxhQUFPQSxHQUFQO0FBQ0Q7Ozs7Ozs7Ozs7QUFHQzs7QUFFQTtBQUNNRyxtQixHQUFNLDZCQUFhO0FBQ3ZCQyxnQ0FBYztBQUNaQyw4QkFBVTtBQUNSQyw2QkFBT2YsVUFBUztBQUNkO0FBQ0E7QUFDQWdCLCtCQUFPLGlCQUhPO0FBSWROLDhCQUFPO0FBSk8sdUJBQVQsR0FLSDtBQUNGTSwrQkFBTyxpQkFETDtBQUVGQyxvQ0FBWTtBQUZWO0FBTkk7QUFERTtBQURTLGlCQUFiLEM7QUFlTkMsc0IsR0FBUztBQUNiQyxrQ0FBZ0IsQ0FBQyxrQ0FBRCxDQURIO0FBRWI7Ozs7QUFJQUMsNEJBQVUsMkJBQWE7QUFDckJDLCtCQUFXLG1CQUFDQyxRQUFELEVBQVdDLE1BQVg7QUFBQSw2QkFBc0JBLE9BQU9DLElBQVAsS0FBZ0Isb0JBQWhCLElBQXdDRCxPQUFPQyxJQUFQLEtBQWdCLG9CQUE5RTtBQUFBLHFCQURVO0FBRXJCQywwQkFBTTtBQUZlLG1CQUFiLENBTkc7QUFVYjtBQUNBQyx5QkFYYSxtQkFXTEMsS0FYSyxFQVdFO0FBQ2IxQiw0QkFBUTBCLEtBQVIsQ0FBY0EsTUFBTUMsS0FBcEI7QUFDQTtBQUNBLHVDQUFHQyxTQUFILENBQWE7QUFDWEMsNkJBQU8sSUFESTtBQUVYQywrQkFBU0osTUFBTUssT0FGSjtBQUdYQyxrQ0FBWTtBQUhELHFCQUFiO0FBS0Q7QUFuQlksaUI7O0FBcUJmckIsb0JBQUlzQixHQUFKLENBQVFoQixNQUFSOztBQUVBO0FBQ0E7QUFDQTtBQUNBTixvQkFBSXVCLEtBQUo7QUFDQXZCLG9CQUFJdUIsS0FBSjs7QUFFQTtBQUNBdkIsb0JBQUl3QixLQUFKOztBQUVBO0FBQ0EsMENBQWF4QixJQUFJeUIsTUFBakI7O0FBRUE7QUFDQSxxQkFBS0MsYUFBTDs7QUFFQTs7dUJBQ2lCLEtBQUs5QixXQUFMLEU7OztBQUFiK0Isb0I7O0FBQ0osdUNBQVMsVUFBVCxFQUFvQixhQUFwQixFQUFrQ0EsSUFBbEM7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBR087QUFDUDtBQUNEOzs7NkJBRVE7QUFDUDtBQUNEOzs7NEJBRU9DLEcsRUFBSyxDQUVaO0FBREM7OztBQUdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHd4IGZyb20gJ2xhYnJhZG9yJztcbmltcG9ydCB7IGNyZWF0ZUR2YUFwcCB9IGZyb20gJy4vYXBwL2NyZWF0ZUFwcCc7XG5pbXBvcnQgY3JlYXRlTG9hZGluZyBmcm9tICcuL2FwcC9kdmEtbG9hZGluZyc7XG5pbXBvcnQgeyBkb0FjdGlvbixnZXRTdGF0ZSB9IGZyb20gJy4vYXBwL2R2YS11dGlsJztcbmltcG9ydCB7IHNob3dUb2FzdE1lc3NhZ2UgfSBmcm9tICcuL3V0aWxzL2NvbW1vbic7XG5cbi8vIHJlZHV4LXBlcnNpdFxuaW1wb3J0IHsgYXV0b1JlaHlkcmF0ZSB9IGZyb20gJ3JlZHV4LXBlcnNpc3QnO1xuaW1wb3J0IHBlcnNpc3RTdG9yZSBmcm9tICcuL2FwcC9kdmEtcGVyc2lzdCc7XG5pbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcic7XG5cbi8vIG1vZGVsc1xuaW1wb3J0IHVzZXJpbmZvIGZyb20gJy4vbW9kZWxzL3VzZXJpbmZvJztcbmltcG9ydCBsb2dpbiBmcm9tICcuL21vZGVscy9sb2dpbic7XG5pbXBvcnQgaG9tZSBmcm9tICcuL21vZGVscy9ob21lJztcbmltcG9ydCByZWZlcnJlciBmcm9tICcuL21vZGVscy9yZWZlcnJlcic7XG5cbmlmIChfX0RFVl9fKSB7XG4gIGNvbnNvbGUubG9nKCflvZPliY3kuLrlvIDlj5Hnjq/looMnKTtcbn1cblxuLy8g5ZCRbGFicmFkb3ItcmVkdXjms6jlhoxzdG9yZVxuLy8gc2V0U3RvcmUoc3RvcmUpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gIGdsb2JhbERhdGEgPSB7XG4gICAgdXNlckluZm86IG51bGwsXG4gICAgc3lzdGVtSW5mbzogbnVsbFxuICB9O1xuXG4gIC8vIOWklumDqOiwg+eUqOivt+eUqCBhd2FpdCB3eEdldEFwcCgpLmdldFVzZXJJbmZvKClcbiAgYXN5bmMgZ2V0VXNlckluZm8oKSB7XG4gICAgaWYgKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbztcbiAgICB9XG5cbiAgICAvLyDojrflj5bnlKjmiLdcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHd4LmxvZ2luKCk7XG4gICAgbGV0IHJlcyA9IGF3YWl0IHd4LmdldFVzZXJJbmZvKCk7XG4gICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xuICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mby5jb2RlID0gZGF0YS5jb2RlO1xuICAgIHJldHVybiB0aGlzLmdsb2JhbERhdGEudXNlckluZm87XG4gIH1cblxuICBnZXRTeXN0ZW1JbmZvKCkge1xuICAgIGlmICh0aGlzLmdsb2JhbERhdGEuc3lzdGVtSW5mbykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS5zeXN0ZW1JbmZvO1xuICAgIH1cblxuICAgIGxldCByZXMgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgIHRoaXMuZ2xvYmFsRGF0YS5zeXN0ZW1JbmZvID0gcmVzO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhc3luYyBvbkxhdW5jaCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIueUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs5bCP56iL5bqP5Yid5aeL5YyWXCIpXG5cbiAgICAvLyBpbml0aWFsaXplXG4gICAgY29uc3QgYXBwID0gY3JlYXRlRHZhQXBwKHtcbiAgICAgIGluaXRpYWxTdGF0ZToge1xuICAgICAgICBSZWZlcnJlcjoge1xuICAgICAgICAgIHF1ZXJ5OiBfX0RFVl9fPyB7XG4gICAgICAgICAgICAvLyBzdGF0ZTogXCJnaF80NDhmZDU5ODA0MGRcIixcbiAgICAgICAgICAgIC8vIGNvZGU6ICBcImJlbGlldmVfb29pcVZ2X200dkpCbHBtVnZtQ0thV0t0Njc3NFwiXG4gICAgICAgICAgICBzdGF0ZTogXCJnaF83OGUzM2YxNTMwYjlcIixcbiAgICAgICAgICAgIGNvZGU6ICBcIjViZTRkYTdlYWY2Yjc0MzkxYjcwODgwNjI5ZDI5OWMxXCIgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICBzdGF0ZTogXCJnaF83OGUzM2YxNTMwYjlcIixcbiAgICAgICAgICAgIHN0YXRlX25hbWU6IFwiYmVIRVJFIVwiLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHBsdWdpbiA9IHtcbiAgICAgIGV4dHJhRW5oYW5jZXJzOiBbYXV0b1JlaHlkcmF0ZSgpXSxcbiAgICAgIC8qXG4gICAgICBvblN0YXRlQ2hhbmdlOiAoKSA9PiB7XG4gICAgICAgIGlmIChfX0RFVl9fKSBjb25zb2xlLmxvZygnc3RhdGUgY2hhbmdlOiAlTycsYXBwLl9zdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICAgIH0sKi9cbiAgICAgIG9uQWN0aW9uOiBjcmVhdGVMb2dnZXIoe1xuICAgICAgICBwcmVkaWNhdGU6IChnZXRTdGF0ZSwgYWN0aW9uKSA9PiBhY3Rpb24udHlwZSAhPT0gJ0BARFZBX0xPQURJTkcvU0hPVycgJiYgYWN0aW9uLnR5cGUgIT09ICdAQERWQV9MT0FESU5HL0hJREUnLFxuICAgICAgICBkaWZmOiB0cnVlLFxuICAgICAgfSksXG4gICAgICAvLyAuLi5jcmVhdGVMb2FkaW5nKCksXG4gICAgICBvbkVycm9yKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3Iuc3RhY2spO1xuICAgICAgICAvL3Nob3dUb2FzdE1lc3NhZ2UoZXJyb3IubWVzc2FnZSx0cnVlKTtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+mUmeivrycsXG4gICAgICAgICAgY29udGVudDogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH07XG4gICAgYXBwLnVzZShwbHVnaW4pO1xuICAgIFxuICAgIC8vIG1vZGVsXG4gICAgLy8gYXBwLm1vZGVsKHVzZXJpbmZvKTtcbiAgICAvLyBhcHAubW9kZWwobG9naW4pO1xuICAgIGFwcC5tb2RlbChob21lKTtcbiAgICBhcHAubW9kZWwocmVmZXJyZXIpO1xuXG4gICAgLy8gc3RhcnRcbiAgICBhcHAuc3RhcnQoKTtcbiAgICBcbiAgICAvLyByZWR1eC1wZXJzaXRcbiAgICBwZXJzaXN0U3RvcmUoYXBwLl9zdG9yZSk7XG4gICAgXG4gICAgLy8gZ2V0U3lzdGVtSW5mb1xuICAgIHRoaXMuZ2V0U3lzdGVtSW5mbygpO1xuXG4gICAgLy8gZ2V0VXNlckluZm9cbiAgICBsZXQgdXNlciA9IGF3YWl0IHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgICBkb0FjdGlvbigndXNlckluZm8nLCdzZXRVc2VySW5mbycsdXNlcik7XG5cbiAgICAvLyDorr7nva7kuobkvIHkuJrlhaXlj6NzdGF0ZSzljZXkvIHkuJrmqKHlvI9cbiAgICAvLyBpZiAoZ2V0U3RhdGUoJ1JlZmVycmVyJykucXVlcnkuc3RhdGUpIGRvQWN0aW9uKCdsb2dpbkluZm8nLCdnZXRPcGVuaWQnLHRoaXMuYnVpbGRPcGVuaWRQYXJhbSgpKTtcbiAgICAvLyBlbHNlIGRvQWN0aW9uKCdob21lJywnZ2V0RW50ZXJwcmlzZScpO1xuICB9XG5cbiAgb25TaG93KCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwi5b2T5bCP56iL5bqP5ZCv5Yqo77yM5oiW5LuO5ZCO5Y+w6L+b5YWl5YmN5Y+w5pi+56S677yM5Lya6Kem5Y+RIG9uU2hvd1wiKVxuICB9XG5cbiAgb25IaWRlKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwi5b2T5bCP56iL5bqP5LuO5YmN5Y+w6L+b5YWl5ZCO5Y+w77yM5Lya6Kem5Y+RIG9uSGlkZVwiKVxuICB9XG5cbiAgb25FcnJvcihtc2cpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIuW9k+Wwj+eoi+W6j+WPkeeUn+iEmuacrOmUmeivr++8jOaIluiAhSBhcGkg6LCD55So5aSx6LSl5pe277yM5Lya6Kem5Y+RIG9uRXJyb3Ig5bm25bim5LiK6ZSZ6K+v5L+h5oGvXCIpXG4gIH1cblxuICAvLyBhc3luYyB0aW1lcigpIHtcbiAgLy8gICB3aGlsZSAodHJ1ZSkge1xuICAvLyAgICAgY29uc29sZS5sb2coJ2hlbGxvJyk7XG4gIC8vICAgICBhd2FpdCBzbGVlcCgxMDAwMCk7XG4gIC8vICAgfVxuICAvLyB9XG59XG4iXX0=
{
var __app=new exports.default();Object.getOwnPropertyNames(__app.constructor.prototype).forEach(function(name){if(name!=='constructor')__app[name]=__app.constructor.prototype[name]});App(__app);
}