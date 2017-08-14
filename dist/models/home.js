"use strict";var exports=module.exports={};var global=window=require('../npm/labrador/global.js');
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../npm/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _home = require('../services/home.js');

var _labrador = require('../npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

var _constants = require('../constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bullet = function Bullet(_bullet, _baslistic, _bulletsTotal) {
  (0, _classCallCheck3.default)(this, Bullet);

  var that = this;
  this.clientWidth = _labrador2.default.getSystemInfoSync().windowWidth;
  this.bullet = _bullet;
  this.baslistic = _baslistic;
  // this.onEject = this.props.onEject;

  this._speedSeed = 1.5;
  this._delaySeed = 2333;
  this.bulletsTotal = _bulletsTotal;

  this.text = this.bullet.text;
  this.color = null;
  this.size = null;
  this.direct = 0;
  this.delay = 0;
  this.speed = 0;
  this.top = null;
  this.left = null;
  this.animation = _labrador2.default.createAnimation();
  switch (("" + this.bullet.bore).length) {
    case 10:
      this.color = "#E3CC72";
      this.size = 20;
      this.speed = 22000 / this._speedSeed;
      break;
    case 9:
      this.color = "#EE6666";
      this.size = 18;
      this.speed = 23000 / this._speedSeed;
      break;
    case 8:
      this.color = "#6666EE";
      this.size = 18;
      this.speed = 24000 / this._speedSeed;
      break;
    case 7:
      this.color = "#F4607E";
      this.size = 16;
      this.speed = 25000 / this._speedSeed;
      break;
    case 6:
      this.color = "#EE66B8";
      this.size = 16;
      this.speed = 26000 / this._speedSeed;
      break;
    case 5:
      this.color = "#CC88CC";
      this.size = 14;
      this.speed = 27000 / this._speedSeed;
      break;
    case 4:
      this.color = "#82B2D2";
      this.size = 14;
      this.speed = 28000 / this._speedSeed;
      break;
    case 3:
      this.color = "#8FD87D";
      this.size = 12;
      this.speed = 29000 / this._speedSeed;
      break;
    case 2:
      this.color = "#AECC33";
      this.size = 12;
      this.speed = 30000 / this._speedSeed;
      break;
    case 1:
      this.color = "#C1E8C1";
      this.size = 10;
      this.speed = 30000 / this._speedSeed; //31000/this._speedSeed;
      break;
    case 0:
      this.color = "#EEE4BB";
      this.size = 8;
      this.speed = 32000 / this._speedSeed;
      break;
    default:
      this.color = "#FF0000";
      this.size = 22;
      this.speed = 21000 / this._speedSeed;
  }

  this.left = _labrador2.default.getSystemInfoSync().windowWidth;
  this.direct = this.left + (!!this.text ? this.text.length * (this.size + 4) : 0);
  this.delay = Math.round(Math.random() * this.bulletsTotal);
  this.size = 14;
  console.log("Bullet's ______: ", this.text);
  console.log("Bullet's ______INIT_____left/delay/len/direct/speed: ", this.left, this.delay * this._delaySeed, this.text.length, this.direct, this.speed);
  this.animation.translate(-1 * Math.abs(this.direct)).step({ duration: this.speed, delay: 0 });
  // this.animation.translate(Math.abs(this.direct), 0).step({duration: 1});
  this.ani = this.animation.export();
  setTimeout(function () {
    console.log("[3000]WHERE AM I: : : ", that.left, that.bullet.id);
  }, 3000);
  setTimeout(function () {
    console.log("[5000]WHERE AM I: : : ", that.left, that.bullet.id);
  }, 5000);
};

exports.default = {

  namespace: 'home',

  state: {
    latitude: null,
    longtitude: null,
    bullets: [],
    loadedBullets: [],
    ballistics: [{ id: 0, top: 20, delay: 9999999, bulletId: null }, { id: 1, top: 40, delay: 9999999, bulletId: null }, { id: 2, top: 60, delay: 9999999, bulletId: null }, { id: 3, top: 80, delay: 9999999, bulletId: null }, { id: 4, top: 100, delay: 9999999, bulletId: null }, { id: 5, top: 120, delay: 9999999, bulletId: null }, { id: 6, top: 140, delay: 9999999, bulletId: null }, { id: 7, top: 160, delay: 9999999, bulletId: null }, { id: 8, top: 180, delay: 9999999, bulletId: null }, { id: 9, top: 200, delay: 9999999, bulletId: null }, { id: 10, top: 220, delay: 9999999, bulletId: null }, { id: 11, top: 240, delay: 9999999, bulletId: null }, { id: 12, top: 260, delay: 9999999, bulletId: null }, { id: 13, top: 280, delay: 9999999, bulletId: null }, { id: 14, top: 300, delay: 9999999, bulletId: null }],
    shooter: [],
    baseBore: 0,
    baseRange: 100
  },

  effects: {
    loadBullets: _regenerator2.default.mark(function loadBullets(_ref, _ref2) {
      var payload = _ref.payload;
      var select = _ref2.select,
          call = _ref2.call,
          put = _ref2.put;

      var _bullets, i, bullet;

      return _regenerator2.default.wrap(function loadBullets$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _bullets = [];

              console.log("XBULLETS: ", _constants.XBULLETS);
              for (i = 0; i < _constants.XBULLETS.length; i++) {
                // if(i>10) break;
                bullet = _constants.XBULLETS[i];

                _bullets.push(bullet);
              }
              _context.next = 5;
              return put({
                type: "loadBulletsSuccess",
                payload: {
                  bullets: _bullets
                }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, loadBullets, this);
    }),
    /* loadBullets end */
    doShoot: _regenerator2.default.mark(function doShoot(_ref3, _ref4) {
      var payload = _ref3.payload;
      var select = _ref4.select,
          call = _ref4.call,
          put = _ref4.put;

      var __bullets, __loadedBullets, __ballistics, __shooter, bstIdxs, i, blt, bstId, theBallistic, theBullet;

      return _regenerator2.default.wrap(function doShoot$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return select(function (state) {
                return state.home.bullets;
              });

            case 2:
              __bullets = _context2.sent;
              _context2.next = 5;
              return select(function (state) {
                return state.home.loadedBullets;
              });

            case 5:
              __loadedBullets = _context2.sent;
              _context2.next = 8;
              return select(function (state) {
                return state.home.ballistics;
              });

            case 8:
              __ballistics = _context2.sent;
              _context2.next = 11;
              return select(function (state) {
                return state.home.shooter;
              });

            case 11:
              __shooter = _context2.sent;
              bstIdxs = [];
              //筛选空膛

              for (i = 0; i < __ballistics.length; i++) {
                if (!__ballistics.filled) {
                  bstIdxs.push(i);
                }
              }
              //送弹出匣
              blt = __bullets.shift();
              bstId = 0;
              theBallistic = null;

              if (__ballistics[0].delay > 999999) {
                //未曾发弹，随机选膛
                theBallistic = __ballistics[Math.round(Math.random() * (__ballistics.length - 1))];
              } else {
                //取冷膛
                theBallistic = __ballistics[0];
              }
              //let bst = __ballistics[bstIdx];
              //推弹入膛
              theBullet = new Bullet(blt, theBallistic, __bullets.length);

              theBallistic.bulletId = theBullet.bullet.id;
              theBullet.bullet.ballistic = theBallistic;
              __loadedBullets.push(theBullet);
              //快慢机就位
              __shooter.push({ bstId: theBallistic.id, bltId: theBullet.bullet.id, fire_delay: theBullet.speed / 3, eject_delay: theBullet.speed });
              __shooter.sort(function (a, b) {
                return a.eject_delay - b.eject_delay;
              });
              console.log("[[[[[[[[[[[[]]   ", __loadedBullets);
              _context2.next = 27;
              return put({
                type: "doShootSuccess",
                payload: {
                  bullets: __bullets,
                  loadedBullets: __loadedBullets,
                  ballistics: __ballistics,
                  shooter: __shooter
                }
              });

            case 27:
            case 'end':
              return _context2.stop();
          }
        }
      }, doShoot, this);
    }),
    /* doShoot end */
    doEject: _regenerator2.default.mark(function doEject(_ref5, _ref6) {
      var payload = _ref5.payload;
      var select = _ref6.select,
          call = _ref6.call,
          put = _ref6.put;

      var _blt, __bullets, __loadedBullets, __ballistics, __shooter, blt, i, _i;

      return _regenerator2.default.wrap(function doEject$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("_____do eject");
              _blt = payload.bullet;
              _context3.next = 4;
              return select(function (state) {
                return state.home.bullets;
              });

            case 4:
              __bullets = _context3.sent;
              _context3.next = 7;
              return select(function (state) {
                return state.home.loadedBullets;
              });

            case 7:
              __loadedBullets = _context3.sent;
              _context3.next = 10;
              return select(function (state) {
                return state.home.ballistics;
              });

            case 10:
              __ballistics = _context3.sent;
              _context3.next = 13;
              return select(function (state) {
                return state.home.shooter;
              });

            case 13:
              __shooter = _context3.sent;

              __bullets.push(_blt);
              blt = null;
              // for(let i=0; i<__shooter.length; i++){
              //   if(__shooter[i].bstId == _blt.ballistic.id && __shooter[i].bltId == _blt.id){
              //     blt = __loadedBullets[i];
              //     __loadedBullets.splice(i, 1);
              //     break;
              //   }
              // }

              i = 0;

            case 17:
              if (!(i < __loadedBullets.length)) {
                _context3.next = 25;
                break;
              }

              if (!(__loadedBullets[i].id == _blt.id)) {
                _context3.next = 22;
                break;
              }

              blt = __loadedBullets[i];
              __loadedBullets.splice(i, 1);
              return _context3.abrupt('break', 25);

            case 22:
              i++;
              _context3.next = 17;
              break;

            case 25:
              _i = 0;

            case 26:
              if (!(_i < __ballistics.length)) {
                _context3.next = 33;
                break;
              }

              if (!(!!__ballistics[_i].bulletId && __ballistics[_i].bulletId == blt.id)) {
                _context3.next = 30;
                break;
              }

              __ballistics[_i].bulletId = null;
              return _context3.abrupt('break', 33);

            case 30:
              _i++;
              _context3.next = 26;
              break;

            case 33:
              _context3.next = 35;
              return put({
                type: "doEjectSuccess",
                payload: {
                  bullets: __bullets,
                  loadedBullets: __loadedBullets,
                  ballistics: __ballistics
                }
              });

            case 35:
            case 'end':
              return _context3.stop();
          }
        }
      }, doEject, this);
    })
  }, /*effects end*/

  reducers: {
    loadBulletsSuccess: function loadBulletsSuccess(state, action) {
      return (0, _extends3.default)({}, state, action.payload);
    },
    doShootSuccess: function doShootSuccess(state, action) {
      return (0, _extends3.default)({}, state, action.payload);
    },
    doEjectSuccess: function doEjectSuccess(state, action) {
      return (0, _extends3.default)({}, state, action.payload);
    },
    summarySuccess: function summarySuccess(state, action) {
      return (0, _extends3.default)({}, state, action.payload);
    },
    entSuccess: function entSuccess(state, action) {
      var data = {
        entnames: ["请选择企业", "中国", "美国", "巴西", "日本"],
        entappid: ["", "gh_aaaa", "gh_bbbb", "gh_bbbb", "gh_bbbb"]
      };
      return (0, _extends3.default)({}, state, data);
    },
    setLogoutStatus: function setLogoutStatus(state, action) {
      return (0, _extends3.default)({}, state, { logout: action.payload });
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiQnVsbGV0IiwiX2J1bGxldCIsIl9iYXNsaXN0aWMiLCJfYnVsbGV0c1RvdGFsIiwidGhhdCIsImNsaWVudFdpZHRoIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aW5kb3dXaWR0aCIsImJ1bGxldCIsImJhc2xpc3RpYyIsIl9zcGVlZFNlZWQiLCJfZGVsYXlTZWVkIiwiYnVsbGV0c1RvdGFsIiwidGV4dCIsImNvbG9yIiwic2l6ZSIsImRpcmVjdCIsImRlbGF5Iiwic3BlZWQiLCJ0b3AiLCJsZWZ0IiwiYW5pbWF0aW9uIiwiY3JlYXRlQW5pbWF0aW9uIiwiYm9yZSIsImxlbmd0aCIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsImNvbnNvbGUiLCJsb2ciLCJ0cmFuc2xhdGUiLCJhYnMiLCJzdGVwIiwiZHVyYXRpb24iLCJhbmkiLCJleHBvcnQiLCJzZXRUaW1lb3V0IiwiaWQiLCJuYW1lc3BhY2UiLCJzdGF0ZSIsImxhdGl0dWRlIiwibG9uZ3RpdHVkZSIsImJ1bGxldHMiLCJsb2FkZWRCdWxsZXRzIiwiYmFsbGlzdGljcyIsImJ1bGxldElkIiwic2hvb3RlciIsImJhc2VCb3JlIiwiYmFzZVJhbmdlIiwiZWZmZWN0cyIsImxvYWRCdWxsZXRzIiwicGF5bG9hZCIsInNlbGVjdCIsImNhbGwiLCJwdXQiLCJfYnVsbGV0cyIsImkiLCJwdXNoIiwidHlwZSIsImRvU2hvb3QiLCJob21lIiwiX19idWxsZXRzIiwiX19sb2FkZWRCdWxsZXRzIiwiX19iYWxsaXN0aWNzIiwiX19zaG9vdGVyIiwiYnN0SWR4cyIsImZpbGxlZCIsImJsdCIsInNoaWZ0IiwiYnN0SWQiLCJ0aGVCYWxsaXN0aWMiLCJ0aGVCdWxsZXQiLCJiYWxsaXN0aWMiLCJibHRJZCIsImZpcmVfZGVsYXkiLCJlamVjdF9kZWxheSIsInNvcnQiLCJhIiwiYiIsImRvRWplY3QiLCJfYmx0Iiwic3BsaWNlIiwicmVkdWNlcnMiLCJsb2FkQnVsbGV0c1N1Y2Nlc3MiLCJhY3Rpb24iLCJkb1Nob290U3VjY2VzcyIsImRvRWplY3RTdWNjZXNzIiwic3VtbWFyeVN1Y2Nlc3MiLCJlbnRTdWNjZXNzIiwiZGF0YSIsImVudG5hbWVzIiwiZW50YXBwaWQiLCJzZXRMb2dvdXRTdGF0dXMiLCJsb2dvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7SUFFTUEsTSxHQUNGLGdCQUFZQyxPQUFaLEVBQXFCQyxVQUFyQixFQUFpQ0MsYUFBakMsRUFBK0M7QUFBQTs7QUFDM0MsTUFBSUMsT0FBTyxJQUFYO0FBQ0EsT0FBS0MsV0FBTCxHQUFtQixtQkFBR0MsaUJBQUgsR0FBdUJDLFdBQTFDO0FBQ0EsT0FBS0MsTUFBTCxHQUFjUCxPQUFkO0FBQ0EsT0FBS1EsU0FBTCxHQUFpQlAsVUFBakI7QUFDQTs7QUFFQSxPQUFLUSxVQUFMLEdBQWtCLEdBQWxCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLE9BQUtDLFlBQUwsR0FBb0JULGFBQXBCOztBQUVBLE9BQUtVLElBQUwsR0FBWSxLQUFLTCxNQUFMLENBQVlLLElBQXhCO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxPQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUtDLEdBQUwsR0FBVyxJQUFYO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLElBQVo7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLG1CQUFHQyxlQUFILEVBQWpCO0FBQ0EsVUFBTyxDQUFDLEtBQUcsS0FBS2QsTUFBTCxDQUFZZSxJQUFoQixFQUFzQkMsTUFBN0I7QUFDSSxTQUFLLEVBQUw7QUFDSSxXQUFLVixLQUFMLEdBQWEsU0FBYjtBQUNBLFdBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBS0csS0FBTCxHQUFhLFFBQU0sS0FBS1IsVUFBeEI7QUFDQTtBQUNKLFNB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YXJ5LGdldEVudGVycHJpc2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9ob21lJztcclxuaW1wb3J0IHd4IGZyb20gJ2xhYnJhZG9yJztcclxuaW1wb3J0IHsgWEJVTExFVFMgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XHJcblxyXG5jbGFzcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoX2J1bGxldCwgX2Jhc2xpc3RpYywgX2J1bGxldHNUb3RhbCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2xpZW50V2lkdGggPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLndpbmRvd1dpZHRoO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0ID0gX2J1bGxldDtcclxuICAgICAgICB0aGlzLmJhc2xpc3RpYyA9IF9iYXNsaXN0aWM7XHJcbiAgICAgICAgLy8gdGhpcy5vbkVqZWN0ID0gdGhpcy5wcm9wcy5vbkVqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLl9zcGVlZFNlZWQgPSAxLjU7XHJcbiAgICAgICAgdGhpcy5fZGVsYXlTZWVkID0gMjMzMztcclxuICAgICAgICB0aGlzLmJ1bGxldHNUb3RhbCA9IF9idWxsZXRzVG90YWw7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dCA9IHRoaXMuYnVsbGV0LnRleHQ7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zaXplID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRpcmVjdCA9IDA7XHJcbiAgICAgICAgdGhpcy5kZWxheSA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDA7XHJcbiAgICAgICAgdGhpcy50b3AgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oKTtcclxuICAgICAgICBzd2l0Y2goKFwiXCIrdGhpcy5idWxsZXQuYm9yZSkubGVuZ3RoKXtcclxuICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNFM0NDNzJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDIwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDIyMDAwL3RoaXMuX3NwZWVkU2VlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjRUU2NjY2XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxODtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyMzAwMC90aGlzLl9zcGVlZFNlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiIzY2NjZFRVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMTg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjQwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNGNDYwN0VcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE2O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDI1MDAwL3RoaXMuX3NwZWVkU2VlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjRUU2NkI4XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxNjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyNjAwMC90aGlzLl9zcGVlZFNlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0NDODhDQ1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMTQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjcwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiM4MkIyRDJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDI4MDAwL3RoaXMuX3NwZWVkU2VlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjOEZEODdEXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyOTAwMC90aGlzLl9zcGVlZFNlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0FFQ0MzM1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMzAwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTogXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjQzFFOEMxXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAzMDAwMC90aGlzLl9zcGVlZFNlZWQ7ICAgIC8vMzEwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMDogXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjRUVFNEJCXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSA4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDMyMDAwL3RoaXMuX3NwZWVkU2VlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0ZGMDAwMFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMjI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjEwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aDtcclxuICAgICAgICB0aGlzLmRpcmVjdCA9IHRoaXMubGVmdCArICghIXRoaXMudGV4dD90aGlzLnRleHQubGVuZ3RoKih0aGlzLnNpemUrNCk6MCk7XHJcbiAgICAgICAgdGhpcy5kZWxheSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSp0aGlzLmJ1bGxldHNUb3RhbCk7XHJcbiAgICAgICAgdGhpcy5zaXplID0gMTQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCdWxsZXQncyBfX19fX186IFwiLCB0aGlzLnRleHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0J3MgX19fX19fSU5JVF9fX19fbGVmdC9kZWxheS9sZW4vZGlyZWN0L3NwZWVkOiBcIiwgdGhpcy5sZWZ0LCB0aGlzLmRlbGF5KnRoaXMuX2RlbGF5U2VlZCwgdGhpcy50ZXh0Lmxlbmd0aCwgdGhpcy5kaXJlY3QsIHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnRyYW5zbGF0ZSgtMSpNYXRoLmFicyh0aGlzLmRpcmVjdCkpLnN0ZXAoe2R1cmF0aW9uOiB0aGlzLnNwZWVkLCBkZWxheTogMH0pO1xyXG4gICAgICAgIC8vIHRoaXMuYW5pbWF0aW9uLnRyYW5zbGF0ZShNYXRoLmFicyh0aGlzLmRpcmVjdCksIDApLnN0ZXAoe2R1cmF0aW9uOiAxfSk7XHJcbiAgICAgICAgdGhpcy5hbmkgPSB0aGlzLmFuaW1hdGlvbi5leHBvcnQoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJbMzAwMF1XSEVSRSBBTSBJOiA6IDogXCIsIHRoYXQubGVmdCwgdGhhdC5idWxsZXQuaWQpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIls1MDAwXVdIRVJFIEFNIEk6IDogOiBcIiwgdGhhdC5sZWZ0LCB0aGF0LmJ1bGxldC5pZCk7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHJcbiAgbmFtZXNwYWNlOiAnaG9tZScsXHJcblxyXG4gIHN0YXRlOiB7XHJcbiAgICBsYXRpdHVkZTogbnVsbCxcclxuICAgIGxvbmd0aXR1ZGU6IG51bGwsXHJcbiAgICBidWxsZXRzOiBbXSxcclxuICAgIGxvYWRlZEJ1bGxldHM6IFtdLFxyXG4gICAgYmFsbGlzdGljczogW1xyXG4gICAgICAgIHtpZDowLCB0b3A6IDIwLCBkZWxheTo5OTk5OTk5LCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAge2lkOjEsIHRvcDogNDAsIGRlbGF5Ojk5OTk5OTksIGJ1bGxldElkOiBudWxsfSxcclxuICAgICAgICB7aWQ6MiwgdG9wOiA2MCwgZGVsYXk6OTk5OTk5OSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIHtpZDozLCB0b3A6IDgwLCBkZWxheTo5OTk5OTk5LCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAge2lkOjQsIHRvcDogMTAwLCBkZWxheTo5OTk5OTk5LCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAge2lkOjUsIHRvcDogMTIwLCBkZWxheTo5OTk5OTk5LCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAge2lkOjYsIHRvcDogMTQwLCBkZWxheTo5OTk5OTk5LCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAge2lkOjcsIHRvcDogMTYwLCBkZWxheTo5OTk5OTk5LCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAge2lkOjgsIHRvcDogMTgwLCBkZWxheTo5OTk5OTk5LCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAge2lkOjksIHRvcDogMjAwLCBkZWxheTo5OTk5OTk5LCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAge2lkOjEwLCB0b3A6IDIyMCwgZGVsYXk6OTk5OTk5OSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIHtpZDoxMSwgdG9wOiAyNDAsIGRlbGF5Ojk5OTk5OTksIGJ1bGxldElkOiBudWxsfSxcclxuICAgICAgICB7aWQ6MTIsIHRvcDogMjYwLCBkZWxheTo5OTk5OTk5LCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAge2lkOjEzLCB0b3A6IDI4MCwgZGVsYXk6OTk5OTk5OSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIHtpZDoxNCwgdG9wOiAzMDAsIGRlbGF5Ojk5OTk5OTksIGJ1bGxldElkOiBudWxsfVxyXG4gICAgICBdLFxyXG4gICAgc2hvb3RlcjogW10sXHJcbiAgICBiYXNlQm9yZTogMCxcclxuICAgIGJhc2VSYW5nZTogMTAwXHJcbiAgfSxcclxuXHJcbiAgZWZmZWN0czoge1xyXG4gICAgKmxvYWRCdWxsZXRzKHsgcGF5bG9hZCB9LCB7IHNlbGVjdCwgY2FsbCwgcHV0IH0pIHtcclxuICAgICAgICBsZXQgX2J1bGxldHMgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlhCVUxMRVRTOiBcIiwgWEJVTExFVFMpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPFhCVUxMRVRTLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgIC8vIGlmKGk+MTApIGJyZWFrO1xyXG4gICAgICAgICAgbGV0IGJ1bGxldCA9IFhCVUxMRVRTW2ldO1xyXG4gICAgICAgICAgX2J1bGxldHMucHVzaChidWxsZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB5aWVsZCBwdXQoe1xyXG4gICAgICAgICAgdHlwZTogXCJsb2FkQnVsbGV0c1N1Y2Nlc3NcIixcclxuICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgYnVsbGV0czogX2J1bGxldHNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSwgLyogbG9hZEJ1bGxldHMgZW5kICovXHJcbiAgICAqZG9TaG9vdCh7IHBheWxvYWQgfSwgeyBzZWxlY3QsIGNhbGwsIHB1dCB9KSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBfX2J1bGxldHMgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaG9tZS5idWxsZXRzKTtcclxuICAgICAgICBsZXQgX19sb2FkZWRCdWxsZXRzID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhvbWUubG9hZGVkQnVsbGV0cyk7XHJcbiAgICAgICAgbGV0IF9fYmFsbGlzdGljcyA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5ob21lLmJhbGxpc3RpY3MpO1xyXG4gICAgICAgIGxldCBfX3Nob290ZXIgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaG9tZS5zaG9vdGVyKTtcclxuICAgICAgICBsZXQgYnN0SWR4cyA9IFtdO1xyXG4gICAgICAgIC8v562b6YCJ56m66IabXHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8X19iYWxsaXN0aWNzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgIGlmKCFfX2JhbGxpc3RpY3MuZmlsbGVkKXtcclxuICAgICAgICAgICAgYnN0SWR4cy5wdXNoKGkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mAgeW8ueWHuuWMo1xyXG4gICAgICAgIGxldCBibHQgPSBfX2J1bGxldHMuc2hpZnQoKTtcclxuICAgICAgICBsZXQgYnN0SWQgPSAwO1xyXG4gICAgICAgIGxldCB0aGVCYWxsaXN0aWMgPSBudWxsO1xyXG4gICAgICAgIGlmKF9fYmFsbGlzdGljc1swXS5kZWxheT45OTk5OTkpe1xyXG4gICAgICAgICAgLy/mnKrmm77lj5HlvLnvvIzpmo/mnLrpgInohptcclxuICAgICAgICAgIHRoZUJhbGxpc3RpYyA9IF9fYmFsbGlzdGljc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqKF9fYmFsbGlzdGljcy5sZW5ndGgtMSkpXTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIC8v5Y+W5Ya36IabXHJcbiAgICAgICAgICB0aGVCYWxsaXN0aWMgPSBfX2JhbGxpc3RpY3NbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vbGV0IGJzdCA9IF9fYmFsbGlzdGljc1tic3RJZHhdO1xyXG4gICAgICAgIC8v5o6o5by55YWl6IabXHJcbiAgICAgICAgbGV0IHRoZUJ1bGxldCA9IG5ldyBCdWxsZXQoYmx0LCB0aGVCYWxsaXN0aWMsIF9fYnVsbGV0cy5sZW5ndGgpO1xyXG4gICAgICAgIHRoZUJhbGxpc3RpYy5idWxsZXRJZCA9IHRoZUJ1bGxldC5idWxsZXQuaWQ7XHJcbiAgICAgICAgdGhlQnVsbGV0LmJ1bGxldC5iYWxsaXN0aWMgPSB0aGVCYWxsaXN0aWM7XHJcbiAgICAgICAgX19sb2FkZWRCdWxsZXRzLnB1c2godGhlQnVsbGV0KTtcclxuICAgICAgICAvL+W/q+aFouacuuWwseS9jVxyXG4gICAgICAgIF9fc2hvb3Rlci5wdXNoKHtic3RJZDp0aGVCYWxsaXN0aWMuaWQsIGJsdElkOnRoZUJ1bGxldC5idWxsZXQuaWQsIGZpcmVfZGVsYXk6dGhlQnVsbGV0LnNwZWVkLzMsIGVqZWN0X2RlbGF5OnRoZUJ1bGxldC5zcGVlZH0pO1xyXG4gICAgICAgIF9fc2hvb3Rlci5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcbiAgICAgICAgICByZXR1cm4gYS5lamVjdF9kZWxheSAtIGIuZWplY3RfZGVsYXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbW1tbW1tbW1tbW1tdXSAgIFwiLCBfX2xvYWRlZEJ1bGxldHMpO1xyXG4gICAgICAgIHlpZWxkIHB1dCh7XHJcbiAgICAgICAgICB0eXBlOiBcImRvU2hvb3RTdWNjZXNzXCIsXHJcbiAgICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgIGJ1bGxldHM6IF9fYnVsbGV0cyxcclxuICAgICAgICAgICAgbG9hZGVkQnVsbGV0czogX19sb2FkZWRCdWxsZXRzLFxyXG4gICAgICAgICAgICBiYWxsaXN0aWNzOiBfX2JhbGxpc3RpY3MsXHJcbiAgICAgICAgICAgIHNob290ZXI6IF9fc2hvb3RlclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LCAvKiBkb1Nob290IGVuZCAqL1xyXG4gICAgKmRvRWplY3QoeyBwYXlsb2FkIH0sIHsgc2VsZWN0LCBjYWxsLCBwdXQgfSkgeyAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJfX19fX2RvIGVqZWN0XCIpO1xyXG4gICAgICAgIGxldCBfYmx0ID0gcGF5bG9hZC5idWxsZXQ7XHJcbiAgICAgICAgbGV0IF9fYnVsbGV0cyA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5ob21lLmJ1bGxldHMpO1xyXG4gICAgICAgIGxldCBfX2xvYWRlZEJ1bGxldHMgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaG9tZS5sb2FkZWRCdWxsZXRzKTtcclxuICAgICAgICBsZXQgX19iYWxsaXN0aWNzID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhvbWUuYmFsbGlzdGljcyk7XHJcbiAgICAgICAgbGV0IF9fc2hvb3RlciA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5ob21lLnNob290ZXIpO1xyXG4gICAgICAgIF9fYnVsbGV0cy5wdXNoKF9ibHQpO1xyXG4gICAgICAgIGxldCBibHQgPSBudWxsO1xyXG4gICAgICAgIC8vIGZvcihsZXQgaT0wOyBpPF9fc2hvb3Rlci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgLy8gICBpZihfX3Nob290ZXJbaV0uYnN0SWQgPT0gX2JsdC5iYWxsaXN0aWMuaWQgJiYgX19zaG9vdGVyW2ldLmJsdElkID09IF9ibHQuaWQpe1xyXG4gICAgICAgIC8vICAgICBibHQgPSBfX2xvYWRlZEJ1bGxldHNbaV07XHJcbiAgICAgICAgLy8gICAgIF9fbG9hZGVkQnVsbGV0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxfX2xvYWRlZEJ1bGxldHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgaWYoX19sb2FkZWRCdWxsZXRzW2ldLmlkID09IF9ibHQuaWQpe1xyXG4gICAgICAgICAgICBibHQgPSBfX2xvYWRlZEJ1bGxldHNbaV07XHJcbiAgICAgICAgICAgIF9fbG9hZGVkQnVsbGV0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxfX2JhbGxpc3RpY3MubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgaWYoISFfX2JhbGxpc3RpY3NbaV0uYnVsbGV0SWQgJiYgKF9fYmFsbGlzdGljc1tpXS5idWxsZXRJZCA9PSBibHQuaWQpKSB7XHJcbiAgICAgICAgICAgIF9fYmFsbGlzdGljc1tpXS5idWxsZXRJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB5aWVsZCBwdXQoe1xyXG4gICAgICAgICAgdHlwZTogXCJkb0VqZWN0U3VjY2Vzc1wiLFxyXG4gICAgICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICBidWxsZXRzOiBfX2J1bGxldHMsXHJcbiAgICAgICAgICAgIGxvYWRlZEJ1bGxldHM6IF9fbG9hZGVkQnVsbGV0cyxcclxuICAgICAgICAgICAgYmFsbGlzdGljczogX19iYWxsaXN0aWNzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sIC8qIGRvRWplY3QgZW5kICovXHJcblxyXG4gIH0sIC8qZWZmZWN0cyBlbmQqL1xyXG5cclxuICByZWR1Y2Vyczoge1xyXG4gICAgbG9hZEJ1bGxldHNTdWNjZXNzKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkIH07XHJcbiAgICB9LFxyXG4gICAgZG9TaG9vdFN1Y2Nlc3Moc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfTtcclxuICAgIH0sXHJcbiAgICBkb0VqZWN0U3VjY2VzcyhzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9O1xyXG4gICAgfSxcclxuICAgIHN1bW1hcnlTdWNjZXNzKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkIH07XHJcbiAgICB9LFxyXG4gICAgZW50U3VjY2VzcyhzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIGVudG5hbWVzOiBbXCLor7fpgInmi6nkvIHkuJpcIixcIuS4reWbvVwiLFwi576O5Zu9XCIsXCLlt7Topb9cIixcIuaXpeacrFwiXSxcclxuICAgICAgICBlbnRhcHBpZDogW1wiXCIsXCJnaF9hYWFhXCIsXCJnaF9iYmJiXCIsXCJnaF9iYmJiXCIsXCJnaF9iYmJiXCJdXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIC4uLmRhdGEgfTtcclxuICAgIH0sXHJcbiAgICBzZXRMb2dvdXRTdGF0dXMoc3RhdGUsYWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBsb2dvdXQ6IGFjdGlvbi5wYXlsb2FkIH1cclxuICAgIH0sICAgXHJcbiAgfSxcclxufVxyXG4iXX0=