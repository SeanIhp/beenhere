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

var BULLET_COLORS = ["#FF0000", "#EEE4BB", "#C1E8C1", "#AECC33", "#8FD87D", "#82B2D2", "#CC88CC", "#EE66B8", "#F4607E", "#6666EE", "#EE6666", "#E3CC72"];
var BULLET_SIZES = [8, 10, 12, 12, 14, 14, 16, 16, 18, 18, 20];
var BULLET_SPEEDS = [26500, 26000, 25500, 25000, 24500, 24000, 23500, 23000, 22500, 22000, 21500];

var BULLET_COLOR_DEFAULT = "#FF0000";
var BULLET_SIZE_DEFAULT = 14;
var BULLET_SPEED_DEFAULT = 20000;

var Bullet = function Bullet(_bullet, _baslistic, _bulletsTotal, _loadedBulletsTotal) {
  (0, _classCallCheck3.default)(this, Bullet);

  var that = this;
  this.clientWidth = _labrador2.default.getSystemInfoSync().windowWidth;
  this.bullet = _bullet;
  this.baslistic = _baslistic;

  this._bulletsMax = 25;
  this._speedSeed = 3;
  this._delaySeed = 2333;

  this.text = _bullet.text;
  this.textLen = (this.text.match(/[^ -~]/g) == null ? this.text.length + 1 : this.text.length + this.text.match(/[^ -~]/g).length + 1) / 2;
  this.color = null;
  this.size = null;
  this.direct = 0;
  this.delay = 0;
  this.speed = 0;
  this.top = null;
  this.left = null;
  this.animation = _labrador2.default.createAnimation();

  var _boreLen = ("" + this.bullet.bore).length;
  if (_boreLen) {
    this.color = BULLET_COLORS[_boreLen];
    this.size = BULLET_SIZE_DEFAULT; //BULLET_SIZES[_boreLen];
    this.speed = BULLET_SPEED_DEFAULT / this._speedSeed; //BULLET_SPEEDS[_boreLen]; //22000/this._speedSeed;
  } else {
    this.color = BULLET_COLOR_DEFAULT;
    this.size = BULLET_SIZE_DEFAULT;
    this.speed = BULLET_SPEED_DEFAULT / this._speedSeed;
  }

  // if(_loadedBulletsTotal<(this._bulletsMax*0.8)){
  //   this.speed = 100;
  // }

  // this.left = wx.getSystemInfoSync().windowWidth + (!!this.text?this.textLen*this.size:0);
  this.left = 0;
  this.direct = this.clientWidth + (!!this.text ? this.textLen * this.size : 0);
  this.delay = Math.round(Math.random() * _bulletsTotal) * 30;
  this.animation.translate(-1 * Math.abs(this.direct)).step({ duration: this.speed, delay: this.delay });
  this.animation.translate(Math.abs(this.direct), 0).step({ duration: 1 });
  this.ani = this.animation.export();
  console.log("BULLET:　", this);
};

exports.default = {

  namespace: 'home',

  state: {
    latitude: null,
    longtitude: null,
    bullets: [],
    loadedBullets: [],
    ballistics: [{ id: 0, top: 20, empty: true, clearDelay: 9999999, onTimes: -1, bulletId: null }],
    shooters: [],
    ejecters: [],
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

    doShootxxx: _regenerator2.default.mark(function doShootxxx(_ref3, _ref4) {
      var payload = _ref3.payload;
      var select = _ref4.select,
          call = _ref4.call,
          put = _ref4.put;

      var _blt, _now, __bullets, __loadedBullets, __ballistics, __shooters, __ejecters, i, _miduSeed, blt, bstId, theBallistic, _bis, _bis2, j, theBullet;

      return _regenerator2.default.wrap(function doShootxxx$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _blt = payload.shootBullet;

              console.log("************ SHOOT BUT: ", _blt);
              _now = new Date().getTime();
              _context2.next = 5;
              return select(function (state) {
                return state.home.bullets;
              });

            case 5:
              __bullets = _context2.sent;
              _context2.next = 8;
              return select(function (state) {
                return state.home.loadedBullets;
              });

            case 8:
              __loadedBullets = _context2.sent;
              _context2.next = 11;
              return select(function (state) {
                return state.home.ballistics;
              });

            case 11:
              __ballistics = _context2.sent;
              _context2.next = 14;
              return select(function (state) {
                return state.home.shooters;
              });

            case 14:
              __shooters = _context2.sent;
              _context2.next = 17;
              return select(function (state) {
                return state.home.ejecters;
              });

            case 17:
              __ejecters = _context2.sent;


              if (!!_blt) {
                for (i = 0; i < __ballistics.length; i++) {
                  if (__ballistics[i].onTimes != -1 && __ballistics[i].onTimes + __ballistics[i].clearDelay < _now) {
                    __ballistics[i].empty = true;
                  }
                };
              }

              _miduSeed = 5;
              //送弹出匣
              // debugger;

              blt = __bullets.shift();

              if (!blt) {
                _context2.next = 42;
                break;
              }

              bstId = 0;
              theBallistic = null;
              _bis = [];

              for (i = 0; i < __ballistics.length; i++) {
                if (__ballistics[i].clearDelay == 9999999) {
                  _bis.push(__ballistics[i]);
                }
              };
              if (_bis.length > 0) {
                //未曾发弹，随机选膛
                theBallistic = _bis[Math.round(Math.random() * (_bis.length - 1))];
              } else {
                //取冷膛
                // theBallistic = __ballistics[0];
                _bis2 = [];

                for (j = 0; j < __ballistics.length; j++) {
                  if (__ballistics[j].empty) {
                    _bis2.push(__ballistics[j]);
                  }
                };
                theBallistic = _bis2[Math.round(Math.random() * (_bis2.length - 1))];
              }
              console.log("{{{theBallistic}}}____ %%%%%%%%%%%%%%%%%%%%%%%%: ", theBallistic.id);
              //装弹
              // console.log("{{{theBallistic}}}____ %%%%%%%%%%%%%%%%%%%%%%%%: ");
              // console.log(theBallistic);
              theBullet = new Bullet(blt, theBallistic, __bullets.length, __loadedBullets.length);
              // theBullet.speed = 30000;

              theBallistic.bulletId = blt.id;
              theBallistic.clearDelay = theBullet.speed / _miduSeed; //theBullet.delay;
              theBallistic.onTimes = _now;
              theBallistic.empty = false;
              theBullet.bullet.ballistic = theBallistic;
              //快慢机就位
              __shooters.push({ bstId: theBallistic.id, bltId: blt.id, fire_delay: theBullet.speed / _miduSeed });
              __shooters.sort(function (a, b) {
                return a.fire_delay - b.fire_delay;
              });
              __ejecters.push({ blt: blt, eject_delay: theBullet.speed });
              __ejecters.sort(function (a, b) {
                return a.eject_delay - b.eject_delay;
              });
              //推弹入膛
              __loadedBullets.push(theBullet);
              // console.log("{++++}  现有: ", __loadedBullets.length);
              // console.log("【++++】  现有: ", __bullets.length);
              _context2.next = 42;
              return put({
                type: "doShootSuccess",
                payload: {
                  bullets: __bullets,
                  loadedBullets: __loadedBullets,
                  ballistics: __ballistics,
                  shooters: __shooters
                }
              });

            case 42:
            case 'end':
              return _context2.stop();
          }
        }
      }, doShootxxx, this);
    }),
    /* doShoot end */

    doClear: _regenerator2.default.mark(function doClear(_ref5, _ref6) {
      var payload = _ref5.payload;
      var select = _ref6.select,
          call = _ref6.call,
          put = _ref6.put;

      var _now, __bullets, __loadedBullets, __ballistics, __shooters, i;

      return _regenerator2.default.wrap(function doClear$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("************ CLEARING BALLISTICS~!~~!!! ");
              _now = new Date().getTime();
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
                return state.home.shooters;
              });

            case 13:
              __shooters = _context3.sent;


              for (i = 0; i < __ballistics.length; i++) {
                if (__ballistics[i].onTimes != -1 && __ballistics[i].onTimes + __ballistics[i].clearDelay < _now) {
                  __ballistics[i].empty = true;
                } else {
                  __ballistics[i].empty = false;
                }
              };
              _context3.next = 18;
              return put({
                type: "doShootSuccess",
                payload: {
                  // bullets: __bullets,
                  loadedBullets: __loadedBullets
                  // ballistics: __ballistics,
                  // shooters: __shooters
                }
              });

            case 18:
            case 'end':
              return _context3.stop();
          }
        }
      }, doClear, this);
    }),
    doShoot: _regenerator2.default.mark(function doShoot(_ref7, _ref8) {
      var payload = _ref7.payload;
      var select = _ref8.select,
          call = _ref8.call,
          put = _ref8.put;

      var _miduSeed, _now, __bullets, __loadedBullets, __ballistics, __shooters, __ejecters, theBallistic, _bis, i, _bis2, j, blt, theBullet;

      return _regenerator2.default.wrap(function doShoot$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log("************ SHOOT BUT: ");
              _miduSeed = 2;
              _now = new Date().getTime();
              _context4.next = 5;
              return select(function (state) {
                return state.home.bullets;
              });

            case 5:
              __bullets = _context4.sent;
              _context4.next = 8;
              return select(function (state) {
                return state.home.loadedBullets;
              });

            case 8:
              __loadedBullets = _context4.sent;
              _context4.next = 11;
              return select(function (state) {
                return state.home.ballistics;
              });

            case 11:
              __ballistics = _context4.sent;
              _context4.next = 14;
              return select(function (state) {
                return state.home.shooters;
              });

            case 14:
              __shooters = _context4.sent;
              _context4.next = 17;
              return select(function (state) {
                return state.home.ejecters;
              });

            case 17:
              __ejecters = _context4.sent;


              // var emptyBis = 0;
              // for(var i=0; i<__ballistics.length; i++) {
              //   if(!__ballistics[i].empty && __ballistics[i].onTimes!=-1 && (__ballistics[i].onTimes+__ballistics[i].clearDelay)<_now) {
              //     __ballistics[i].empty = true;
              //   }
              // if(__ballistics[i].empty){
              //   emptyBis++;
              // }
              // }; 
              // if(emptyBis/__ballistics.length>6){
              //   return;
              // }
              theBallistic = null;
              _bis = [];

              for (i = 0; i < __ballistics.length; i++) {
                if (__ballistics[i].clearDelay == 9999999) {
                  _bis.push(__ballistics[i]);
                }
              };
              if (_bis.length > 0) {
                //未曾发弹，随机选膛
                theBallistic = _bis[Math.round(Math.random() * (_bis.length - 1))];
              } else {
                //取冷膛
                _bis2 = [];

                for (j = 0; j < __ballistics.length; j++) {
                  if (__ballistics[j].empty) {
                    _bis2.push(__ballistics[j]);
                  }
                };
                theBallistic = _bis2[Math.round(Math.random() * _bis2.length)];
                // if(_bis2.length>0){
                //   _bis2.sort(function(a,b){
                //     return b.clearDelay - a.clearDelay;
                //   });
                //   theBallistic = _bis2[0];
                // }
              }

              if (!theBallistic) {
                _context4.next = 41;
                break;
              }

              //取弹装药
              blt = __bullets.shift();

              if (!blt) {
                _context4.next = 39;
                break;
              }

              theBullet = new Bullet(blt, theBallistic, __bullets.length, __loadedBullets.length);

              theBallistic.bulletId = blt.id;
              theBallistic.clearDelay = theBullet.speed + theBullet.delay + theBullet.speed / _miduSeed; //theBullet.delay;
              theBallistic.onTimes = _now;
              theBallistic.empty = false;
              theBullet.bullet.ballistic = theBallistic;
              //快慢机就位
              __shooters.push({ bstId: theBallistic.id, bltId: blt.id, fire_delay: theBallistic.clearDelay + 200 });
              __shooters.sort(function (a, b) {
                return a.fire_delay - b.fire_delay;
              });
              __ejecters.push({ blt: blt, eject_delay: theBullet.speed + theBullet.delay + 100 });
              __ejecters.sort(function (a, b) {
                return a.eject_delay - b.eject_delay;
              });
              //推弹入膛
              __loadedBullets.push(theBullet);
              // console.log("{++++}  现有: ", __loadedBullets.length);
              // console.log("【++++】  现有: ", __bullets.length);
              _context4.next = 39;
              return put({
                type: "doShootSuccess",
                payload: {
                  bullets: __bullets,
                  loadedBullets: __loadedBullets,
                  ballistics: __ballistics,
                  shooters: __shooters
                }
              });

            case 39:
              _context4.next = 43;
              break;

            case 41:
              _context4.next = 43;
              return put({
                type: "doShootSuccess",
                payload: {
                  // bullets: __bullets,
                  // loadedBullets: __loadedBullets,
                  ballistics: __ballistics
                  // shooters: __shooters
                }
              });

            case 43:
            case 'end':
              return _context4.stop();
          }
        }
      }, doShoot, this);
    }),
    /* doShoot end */

    doEject: _regenerator2.default.mark(function doEject(_ref9, _ref10) {
      var payload = _ref9.payload;
      var select = _ref10.select,
          call = _ref10.call,
          put = _ref10.put;

      var _blt, __bullets, __loadedBullets, __shooters, __ejecters, a, b, c;

      return _regenerator2.default.wrap(function doEject$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _blt = payload.ejectBullet;
              _context5.next = 3;
              return select(function (state) {
                return state.home.bullets;
              });

            case 3:
              __bullets = _context5.sent;
              _context5.next = 6;
              return select(function (state) {
                return state.home.loadedBullets;
              });

            case 6:
              __loadedBullets = _context5.sent;
              _context5.next = 9;
              return select(function (state) {
                return state.home.shooters;
              });

            case 9:
              __shooters = _context5.sent;
              _context5.next = 12;
              return select(function (state) {
                return state.home.ejecters;
              });

            case 12:
              __ejecters = _context5.sent;


              console.log("【--------------------】 EJECT BUT: ", _blt);
              // console.log("++++++++++++++ EJECT BUT_ID: ", _blt.blt.id);        
              // console.log("【B4】EJECTS : ", __ejecters.length);
              a = 0;

            case 15:
              if (!(a < __ejecters.length)) {
                _context5.next = 22;
                break;
              }

              if (!(__ejecters[a].blt.id == _blt.blt.id)) {
                _context5.next = 19;
                break;
              }

              __ejecters.splice(a, 1);
              return _context5.abrupt('break', 22);

            case 19:
              a++;
              _context5.next = 15;
              break;

            case 22:
              b = 0;

            case 23:
              if (!(b < __shooters.length)) {
                _context5.next = 30;
                break;
              }

              if (!(__shooters[b].bltId == _blt.blt.id)) {
                _context5.next = 27;
                break;
              }

              __shooters.splice(b, 1);
              return _context5.abrupt('break', 30);

            case 27:
              b++;
              _context5.next = 23;
              break;

            case 30:
              c = 0;

            case 31:
              if (!(c < __loadedBullets.length)) {
                _context5.next = 38;
                break;
              }

              if (!(__loadedBullets[c].bullet.id == _blt.blt.id)) {
                _context5.next = 35;
                break;
              }

              __loadedBullets.splice(c, 1);
              return _context5.abrupt('break', 38);

            case 35:
              c++;
              _context5.next = 31;
              break;

            case 38:
              // console.log("【--】LOADED : ", __loadedBullets.length);
              // console.log("【B4】ALL : ", __bullets.length);
              delete _blt.blt.ballistic;
              __bullets.push(_blt.blt);
              // console.log("【--】ALL : ", __bullets.length);
              // console.log("{----}  尚有: ", __loadedBullets.length);
              // console.log("【----】  尚有: ", __bullets.length);
              _context5.next = 42;
              return put({
                type: "doEjectSuccess",
                payload: {
                  bullets: __bullets,
                  loadedBullets: __loadedBullets,
                  shooters: __shooters,
                  ejecters: __ejecters
                }
              });

            case 42:
            case 'end':
              return _context5.stop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiQlVMTEVUX0NPTE9SUyIsIkJVTExFVF9TSVpFUyIsIkJVTExFVF9TUEVFRFMiLCJCVUxMRVRfQ09MT1JfREVGQVVMVCIsIkJVTExFVF9TSVpFX0RFRkFVTFQiLCJCVUxMRVRfU1BFRURfREVGQVVMVCIsIkJ1bGxldCIsIl9idWxsZXQiLCJfYmFzbGlzdGljIiwiX2J1bGxldHNUb3RhbCIsIl9sb2FkZWRCdWxsZXRzVG90YWwiLCJ0aGF0IiwiY2xpZW50V2lkdGgiLCJnZXRTeXN0ZW1JbmZvU3luYyIsIndpbmRvd1dpZHRoIiwiYnVsbGV0IiwiYmFzbGlzdGljIiwiX2J1bGxldHNNYXgiLCJfc3BlZWRTZWVkIiwiX2RlbGF5U2VlZCIsInRleHQiLCJ0ZXh0TGVuIiwibWF0Y2giLCJsZW5ndGgiLCJjb2xvciIsInNpemUiLCJkaXJlY3QiLCJkZWxheSIsInNwZWVkIiwidG9wIiwibGVmdCIsImFuaW1hdGlvbiIsImNyZWF0ZUFuaW1hdGlvbiIsIl9ib3JlTGVuIiwiYm9yZSIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsInRyYW5zbGF0ZSIsImFicyIsInN0ZXAiLCJkdXJhdGlvbiIsImFuaSIsImV4cG9ydCIsImNvbnNvbGUiLCJsb2ciLCJuYW1lc3BhY2UiLCJzdGF0ZSIsImxhdGl0dWRlIiwibG9uZ3RpdHVkZSIsImJ1bGxldHMiLCJsb2FkZWRCdWxsZXRzIiwiYmFsbGlzdGljcyIsImlkIiwiZW1wdHkiLCJjbGVhckRlbGF5Iiwib25UaW1lcyIsImJ1bGxldElkIiwic2hvb3RlcnMiLCJlamVjdGVycyIsImJhc2VCb3JlIiwiYmFzZVJhbmdlIiwiZWZmZWN0cyIsImxvYWRCdWxsZXRzIiwicGF5bG9hZCIsInNlbGVjdCIsImNhbGwiLCJwdXQiLCJfYnVsbGV0cyIsImkiLCJwdXNoIiwidHlwZSIsImRvU2hvb3R4eHgiLCJfYmx0Iiwic2hvb3RCdWxsZXQiLCJfbm93IiwiRGF0ZSIsImdldFRpbWUiLCJob21lIiwiX19idWxsZXRzIiwiX19sb2FkZWRCdWxsZXRzIiwiX19iYWxsaXN0aWNzIiwiX19zaG9vdGVycyIsIl9fZWplY3RlcnMiLCJfbWlkdVNlZWQiLCJibHQiLCJzaGlmdCIsImJzdElkIiwidGhlQmFsbGlzdGljIiwiX2JpcyIsIl9iaXMyIiwiaiIsInRoZUJ1bGxldCIsImJhbGxpc3RpYyIsImJsdElkIiwiZmlyZV9kZWxheSIsInNvcnQiLCJhIiwiYiIsImVqZWN0X2RlbGF5IiwiZG9DbGVhciIsImRvU2hvb3QiLCJkb0VqZWN0IiwiZWplY3RCdWxsZXQiLCJzcGxpY2UiLCJjIiwicmVkdWNlcnMiLCJsb2FkQnVsbGV0c1N1Y2Nlc3MiLCJhY3Rpb24iLCJkb1Nob290U3VjY2VzcyIsImRvRWplY3RTdWNjZXNzIiwic3VtbWFyeVN1Y2Nlc3MiLCJlbnRTdWNjZXNzIiwiZGF0YSIsImVudG5hbWVzIiwiZW50YXBwaWQiLCJzZXRMb2dvdXRTdGF0dXMiLCJsb2dvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxTQUF4RCxFQUFtRSxTQUFuRSxFQUE2RSxTQUE3RSxFQUF3RixTQUF4RixFQUFtRyxTQUFuRyxFQUE4RyxTQUE5RyxFQUF5SCxTQUF6SCxDQUF0QjtBQUNBLElBQU1DLGVBQWUsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsRUFBWSxFQUFaLEVBQWdCLEVBQWhCLEVBQW9CLEVBQXBCLEVBQXdCLEVBQXhCLEVBQTRCLEVBQTVCLEVBQWdDLEVBQWhDLEVBQW9DLEVBQXBDLEVBQXdDLEVBQXhDLENBQXJCO0FBQ0EsSUFBTUMsZ0JBQWdCLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLEVBQWtELEtBQWxELEVB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QVZRLDBCQVVPaEUsS0FWUCxFQVVjNkQsTUFWZCxFQVVzQjtBQUM1Qix3Q0FBWTdELEtBQVosRUFBc0I2RCxPQUFPNUMsT0FBN0I7QUFDRCxLQVpPO0FBYVJnRCxjQWJRLHNCQWFHakUsS0FiSCxFQWFVNkQsTUFiVixFQWFrQjtBQUN4QixVQUFJSyxPQUFPO0FBQ1RDLGtCQUFVLENBQUMsT0FBRCxFQUFTLElBQVQsRUFBYyxJQUFkLEVBQW1CLElBQW5CLEVBQXdCLElBQXhCLENBREQ7QUFFVEMsa0JBQVUsQ0FBQyxFQUFELEVBQUksU0FBSixFQUFjLFNBQWQsRUFBd0IsU0FBeEIsRUFBa0MsU0FBbEM7QUFGRCxPQUFYO0FBSUEsd0NBQVlwRSxLQUFaLEVBQXNCa0UsSUFBdEI7QUFDRCxLQW5CTztBQW9CUkcsbUJBcEJRLDJCQW9CUXJFLEtBcEJSLEVBb0JjNkQsTUFwQmQsRUFvQnNCO0FBQzVCLHdDQUFZN0QsS0FBWixJQUFtQnNFLFFBQVFULE9BQU81QyxPQUFsQztBQUNEO0FBdEJPO0FBclhHLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldE1lcmNoYW50U3VtbWFyeSxnZXRFbnRlcnByaXNlIH0gZnJvbSAnLi4vc2VydmljZXMvaG9tZSc7XHJcbmltcG9ydCB3eCBmcm9tICdsYWJyYWRvcic7XHJcbmltcG9ydCB7IFhCVUxMRVRTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xyXG5cclxuY29uc3QgQlVMTEVUX0NPTE9SUyA9IFtcIiNGRjAwMDBcIiwgXCIjRUVFNEJCXCIsIFwiI0MxRThDMVwiLCBcIiNBRUNDMzNcIiwgXCIjOEZEODdEXCIsIFwiIzgyQjJEMlwiLCBcIiNDQzg4Q0NcIixcIiNFRTY2QjhcIiwgXCIjRjQ2MDdFXCIsIFwiIzY2NjZFRVwiLCBcIiNFRTY2NjZcIiwgXCIjRTNDQzcyXCJdO1xyXG5jb25zdCBCVUxMRVRfU0laRVMgPSBbOCwgMTAsIDEyLCAxMiwgMTQsIDE0LCAxNiwgMTYsIDE4LCAxOCwgMjBdO1xyXG5jb25zdCBCVUxMRVRfU1BFRURTID0gWzI2NTAwLCAyNjAwMCwgMjU1MDAsIDI1MDAwLCAyNDUwMCwgMjQwMDAsIDIzNTAwLCAyMzAwMCwgMjI1MDAsIDIyMDAwLCAyMTUwMF07XHJcblxyXG5jb25zdCBCVUxMRVRfQ09MT1JfREVGQVVMVCA9IFwiI0ZGMDAwMFwiO1xyXG5jb25zdCBCVUxMRVRfU0laRV9ERUZBVUxUID0gMTQ7XHJcbmNvbnN0IEJVTExFVF9TUEVFRF9ERUZBVUxUID0gMjAwMDA7XHJcblxyXG5jbGFzcyBCdWxsZXQge1xyXG4gICAgY29uc3RydWN0b3IoX2J1bGxldCwgX2Jhc2xpc3RpYywgX2J1bGxldHNUb3RhbCwgX2xvYWRlZEJ1bGxldHNUb3RhbCl7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2xpZW50V2lkdGggPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLndpbmRvd1dpZHRoO1xyXG4gICAgICAgIHRoaXMuYnVsbGV0ID0gX2J1bGxldDtcclxuICAgICAgICB0aGlzLmJhc2xpc3RpYyA9IF9iYXNsaXN0aWM7XHJcblxyXG4gICAgICAgIHRoaXMuX2J1bGxldHNNYXggPSAyNTtcclxuICAgICAgICB0aGlzLl9zcGVlZFNlZWQgPSAzO1xyXG4gICAgICAgIHRoaXMuX2RlbGF5U2VlZCA9IDIzMzM7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dCA9IF9idWxsZXQudGV4dDtcclxuICAgICAgICB0aGlzLnRleHRMZW4gPSAodGhpcy50ZXh0Lm1hdGNoKC9bXiAtfl0vZykgPT0gbnVsbCA/IHRoaXMudGV4dC5sZW5ndGgrMSA6ICh0aGlzLnRleHQubGVuZ3RoICsgdGhpcy50ZXh0Lm1hdGNoKC9bXiAtfl0vZykubGVuZ3RoKSsxKS8yO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kaXJlY3QgPSAwO1xyXG4gICAgICAgIHRoaXMuZGVsYXkgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMudG9wID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxlZnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKCk7XHJcblxyXG4gICAgICAgIGxldCBfYm9yZUxlbiA9IChcIlwiK3RoaXMuYnVsbGV0LmJvcmUpLmxlbmd0aDtcclxuICAgICAgICBpZihfYm9yZUxlbil7XHJcbiAgICAgICAgICB0aGlzLmNvbG9yID0gQlVMTEVUX0NPTE9SU1tfYm9yZUxlbl07XHJcbiAgICAgICAgICB0aGlzLnNpemUgPSBCVUxMRVRfU0laRV9ERUZBVUxUOyAgLy9CVUxMRVRfU0laRVNbX2JvcmVMZW5dO1xyXG4gICAgICAgICAgdGhpcy5zcGVlZCA9IEJVTExFVF9TUEVFRF9ERUZBVUxUL3RoaXMuX3NwZWVkU2VlZDsgIC8vQlVMTEVUX1NQRUVEU1tfYm9yZUxlbl07IC8vMjIwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdGhpcy5jb2xvciA9IEJVTExFVF9DT0xPUl9ERUZBVUxUO1xyXG4gICAgICAgICAgdGhpcy5zaXplID0gQlVMTEVUX1NJWkVfREVGQVVMVDtcclxuICAgICAgICAgIHRoaXMuc3BlZWQgPSBCVUxMRVRfU1BFRURfREVGQVVMVC90aGlzLl9zcGVlZFNlZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZihfbG9hZGVkQnVsbGV0c1RvdGFsPCh0aGlzLl9idWxsZXRzTWF4KjAuOCkpe1xyXG4gICAgICAgIC8vICAgdGhpcy5zcGVlZCA9IDEwMDtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIHRoaXMubGVmdCA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkud2luZG93V2lkdGggKyAoISF0aGlzLnRleHQ/dGhpcy50ZXh0TGVuKnRoaXMuc2l6ZTowKTtcclxuICAgICAgICB0aGlzLmxlZnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0ID0gdGhpcy5jbGllbnRXaWR0aCArICghIXRoaXMudGV4dD90aGlzLnRleHRMZW4qdGhpcy5zaXplOjApO1xyXG4gICAgICAgIHRoaXMuZGVsYXkgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqX2J1bGxldHNUb3RhbCkqMzA7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24udHJhbnNsYXRlKC0xKk1hdGguYWJzKHRoaXMuZGlyZWN0KSkuc3RlcCh7ZHVyYXRpb246IHRoaXMuc3BlZWQsIGRlbGF5OiB0aGlzLmRlbGF5fSk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24udHJhbnNsYXRlKE1hdGguYWJzKHRoaXMuZGlyZWN0KSwgMCkuc3RlcCh7ZHVyYXRpb246IDF9KTtcclxuICAgICAgICB0aGlzLmFuaSA9IHRoaXMuYW5pbWF0aW9uLmV4cG9ydCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQlVMTEVUOuOAgFwiLCB0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cclxuICBuYW1lc3BhY2U6ICdob21lJyxcclxuXHJcbiAgc3RhdGU6IHtcclxuICAgIGxhdGl0dWRlOiBudWxsLFxyXG4gICAgbG9uZ3RpdHVkZTogbnVsbCxcclxuICAgIGJ1bGxldHM6IFtdLFxyXG4gICAgbG9hZGVkQnVsbGV0czogW10sXHJcbiAgICBiYWxsaXN0aWNzOiBbXHJcbiAgICAgICAge2lkOjAsIHRvcDogMjAsIGVtcHR5OnRydWUsIGNsZWFyRGVsYXk6OTk5OTk5OSwgb25UaW1lczotMSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIC8vIHtpZDoxLCB0b3A6IDQwLCBlbXB0eTp0cnVlLCBjbGVhckRlbGF5Ojk5OTk5OTksIG9uVGltZXM6LTEsIGJ1bGxldElkOiBudWxsfSxcclxuICAgICAgICAvLyB7aWQ6MiwgdG9wOiA2MCwgZW1wdHk6dHJ1ZSwgY2xlYXJEZWxheTo5OTk5OTk5LCBvblRpbWVzOi0xLCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAgLy8ge2lkOjMsIHRvcDogODAsIGVtcHR5OnRydWUsIGNsZWFyRGVsYXk6OTk5OTk5OSwgb25UaW1lczotMSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIC8vIHtpZDo0LCB0b3A6IDEwMCwgZW1wdHk6dHJ1ZSwgY2xlYXJEZWxheTo5OTk5OTk5LCBvblRpbWVzOi0xLCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAgLy8ge2lkOjUsIHRvcDogMTIwLCBlbXB0eTp0cnVlLCBjbGVhckRlbGF5Ojk5OTk5OTksIG9uVGltZXM6LTEsIGJ1bGxldElkOiBudWxsfSxcclxuICAgICAgICAvLyB7aWQ6NiwgdG9wOiAxNDAsIGVtcHR5OnRydWUsIGNsZWFyRGVsYXk6OTk5OTk5OSwgb25UaW1lczotMSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIC8vIHtpZDo3LCB0b3A6IDE2MCwgZW1wdHk6dHJ1ZSwgY2xlYXJEZWxheTo5OTk5OTk5LCBvblRpbWVzOi0xLCBidWxsZXRJZDogbnVsbH0sXHJcbiAgICAgICAgLy8ge2lkOjgsIHRvcDogMTgwLCBlbXB0eTp0cnVlLCBjbGVhckRlbGF5Ojk5OTk5OTksIG9uVGltZXM6LTEsIGJ1bGxldElkOiBudWxsfSxcclxuICAgICAgICAvLyB7aWQ6OSwgdG9wOiAyMDAsIGVtcHR5OnRydWUsIGNsZWFyRGVsYXk6OTk5OTk5OSwgb25UaW1lczotMSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIC8vIHtpZDoxMCwgdG9wOiAyMjAsIGVtcHR5OnRydWUsIGNsZWFyRGVsYXk6OTk5OTk5OSwgb25UaW1lczotMSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIC8vIHtpZDoxMSwgdG9wOiAyNDAsIGVtcHR5OnRydWUsIGNsZWFyRGVsYXk6OTk5OTk5OSwgb25UaW1lczotMSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIC8vIHtpZDoxMiwgdG9wOiAyNjAsIGVtcHR5OnRydWUsIGNsZWFyRGVsYXk6OTk5OTk5OSwgb25UaW1lczotMSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIC8vIHtpZDoxMywgdG9wOiAyODAsIGVtcHR5OnRydWUsIGNsZWFyRGVsYXk6OTk5OTk5OSwgb25UaW1lczotMSwgYnVsbGV0SWQ6IG51bGx9LFxyXG4gICAgICAgIC8vIHtpZDoxNCwgdG9wOiAzMDAsIGVtcHR5OnRydWUsIGNsZWFyRGVsYXk6OTk5OTk5OSwgb25UaW1lczotMSwgYnVsbGV0SWQ6IG51bGx9XHJcbiAgICAgIF0sXHJcbiAgICBzaG9vdGVyczogW10sXHJcbiAgICBlamVjdGVyczogW10sXHJcbiAgICBiYXNlQm9yZTogMCxcclxuICAgIGJhc2VSYW5nZTogMTAwXHJcbiAgfSxcclxuXHJcbiAgZWZmZWN0czoge1xyXG4gICAgKmxvYWRCdWxsZXRzKHsgcGF5bG9hZCB9LCB7IHNlbGVjdCwgY2FsbCwgcHV0IH0pIHtcclxuICAgICAgICBsZXQgX2J1bGxldHMgPSBbXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlhCVUxMRVRTOiBcIiwgWEJVTExFVFMpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPFhCVUxMRVRTLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgIC8vIGlmKGk+MTApIGJyZWFrO1xyXG4gICAgICAgICAgbGV0IGJ1bGxldCA9IFhCVUxMRVRTW2ldO1xyXG4gICAgICAgICAgX2J1bGxldHMucHVzaChidWxsZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB5aWVsZCBwdXQoe1xyXG4gICAgICAgICAgdHlwZTogXCJsb2FkQnVsbGV0c1N1Y2Nlc3NcIixcclxuICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgYnVsbGV0czogX2J1bGxldHNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSwgLyogbG9hZEJ1bGxldHMgZW5kICovXHJcbiAgICBcclxuICAgICpkb1Nob290eHh4KHsgcGF5bG9hZCB9LCB7IHNlbGVjdCwgY2FsbCwgcHV0IH0pIHsgIFxyXG4gICAgICAgIGxldCBfYmx0ID0gcGF5bG9hZC5zaG9vdEJ1bGxldDsgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCIqKioqKioqKioqKiogU0hPT1QgQlVUOiBcIiwgX2JsdCk7ICBcclxuICAgICAgICBsZXQgX25vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyBcclxuICAgICAgICBsZXQgX19idWxsZXRzID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhvbWUuYnVsbGV0cyk7XHJcbiAgICAgICAgbGV0IF9fbG9hZGVkQnVsbGV0cyA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5ob21lLmxvYWRlZEJ1bGxldHMpO1xyXG4gICAgICAgIGxldCBfX2JhbGxpc3RpY3MgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaG9tZS5iYWxsaXN0aWNzKTtcclxuICAgICAgICBsZXQgX19zaG9vdGVycyA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5ob21lLnNob290ZXJzKTtcclxuICAgICAgICBsZXQgX19lamVjdGVycyA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5ob21lLmVqZWN0ZXJzKTtcclxuICAgICAgICBcclxuICAgICAgICBpZighIV9ibHQpe1xyXG4gICAgICAgICAgZm9yKHZhciBpPTA7IGk8X19iYWxsaXN0aWNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKF9fYmFsbGlzdGljc1tpXS5vblRpbWVzIT0tMSAmJiAoX19iYWxsaXN0aWNzW2ldLm9uVGltZXMrX19iYWxsaXN0aWNzW2ldLmNsZWFyRGVsYXkpPF9ub3cpIHtcclxuICAgICAgICAgICAgICBfX2JhbGxpc3RpY3NbaV0uZW1wdHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gICAgIFxyXG5cclxuICAgICAgICBsZXQgX21pZHVTZWVkID0gNTtcclxuICAgICAgICAvL+mAgeW8ueWHuuWMo1xyXG4gICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgIGxldCBibHQgPSBfX2J1bGxldHMuc2hpZnQoKTtcclxuICAgICAgICBpZighIWJsdCl7XHJcbiAgICAgICAgICBsZXQgYnN0SWQgPSAwO1xyXG4gICAgICAgICAgbGV0IHRoZUJhbGxpc3RpYyA9IG51bGw7IFxyXG4gICAgICAgICAgbGV0IF9iaXMgPSBbXTtcclxuICAgICAgICAgIGZvcih2YXIgaT0wOyBpPF9fYmFsbGlzdGljcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihfX2JhbGxpc3RpY3NbaV0uY2xlYXJEZWxheT09OTk5OTk5OSl7XHJcbiAgICAgICAgICAgICAgX2Jpcy5wdXNoKF9fYmFsbGlzdGljc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBpZihfYmlzLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgLy/mnKrmm77lj5HlvLnvvIzpmo/mnLrpgInohptcclxuICAgICAgICAgICAgdGhlQmFsbGlzdGljID0gX2Jpc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqKF9iaXMubGVuZ3RoLTEpKV07XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/lj5blhrfohptcclxuICAgICAgICAgICAgLy8gdGhlQmFsbGlzdGljID0gX19iYWxsaXN0aWNzWzBdO1xyXG4gICAgICAgICAgICBsZXQgX2JpczIgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBqPTA7IGo8X19iYWxsaXN0aWNzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgaWYoX19iYWxsaXN0aWNzW2pdLmVtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICBfYmlzMi5wdXNoKF9fYmFsbGlzdGljc1tqXSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGVCYWxsaXN0aWMgPSBfYmlzMltNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqKF9iaXMyLmxlbmd0aC0xKSldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJ7e3t0aGVCYWxsaXN0aWN9fX1fX19fICUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJTogXCIsIHRoZUJhbGxpc3RpYy5pZCk7XHJcbiAgICAgICAgICAvL+ijheW8uVxyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ7e3t0aGVCYWxsaXN0aWN9fX1fX19fICUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJTogXCIpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGhlQmFsbGlzdGljKTtcclxuICAgICAgICAgIGxldCB0aGVCdWxsZXQgPSBuZXcgQnVsbGV0KGJsdCwgdGhlQmFsbGlzdGljLCBfX2J1bGxldHMubGVuZ3RoLCBfX2xvYWRlZEJ1bGxldHMubGVuZ3RoKTtcclxuICAgICAgICAgIC8vIHRoZUJ1bGxldC5zcGVlZCA9IDMwMDAwO1xyXG4gICAgICAgICAgdGhlQmFsbGlzdGljLmJ1bGxldElkID0gYmx0LmlkO1xyXG4gICAgICAgICAgdGhlQmFsbGlzdGljLmNsZWFyRGVsYXkgPSB0aGVCdWxsZXQuc3BlZWQvX21pZHVTZWVkOyAvL3RoZUJ1bGxldC5kZWxheTtcclxuICAgICAgICAgIHRoZUJhbGxpc3RpYy5vblRpbWVzID0gX25vdztcclxuICAgICAgICAgIHRoZUJhbGxpc3RpYy5lbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhlQnVsbGV0LmJ1bGxldC5iYWxsaXN0aWMgPSB0aGVCYWxsaXN0aWM7XHJcbiAgICAgICAgICAvL+W/q+aFouacuuWwseS9jVxyXG4gICAgICAgICAgX19zaG9vdGVycy5wdXNoKHtic3RJZDp0aGVCYWxsaXN0aWMuaWQsIGJsdElkOmJsdC5pZCwgZmlyZV9kZWxheTp0aGVCdWxsZXQuc3BlZWQvX21pZHVTZWVkfSk7XHJcbiAgICAgICAgICBfX3Nob290ZXJzLnNvcnQoZnVuY3Rpb24oYSxiKXtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZmlyZV9kZWxheSAtIGIuZmlyZV9kZWxheTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgX19lamVjdGVycy5wdXNoKHtibHQ6Ymx0LCBlamVjdF9kZWxheTp0aGVCdWxsZXQuc3BlZWR9KTtcclxuICAgICAgICAgIF9fZWplY3RlcnMuc29ydChmdW5jdGlvbihhLGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYS5lamVjdF9kZWxheSAtIGIuZWplY3RfZGVsYXk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIC8v5o6o5by55YWl6IabXHJcbiAgICAgICAgICBfX2xvYWRlZEJ1bGxldHMucHVzaCh0aGVCdWxsZXQpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ7KysrK30gIOeOsOaciTogXCIsIF9fbG9hZGVkQnVsbGV0cy5sZW5ndGgpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCLjgJArKysr44CRICDnjrDmnIk6IFwiLCBfX2J1bGxldHMubGVuZ3RoKTtcclxuICAgICAgICAgIHlpZWxkIHB1dCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiZG9TaG9vdFN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICAgIGJ1bGxldHM6IF9fYnVsbGV0cyxcclxuICAgICAgICAgICAgICBsb2FkZWRCdWxsZXRzOiBfX2xvYWRlZEJ1bGxldHMsXHJcbiAgICAgICAgICAgICAgYmFsbGlzdGljczogX19iYWxsaXN0aWNzLFxyXG4gICAgICAgICAgICAgIHNob290ZXJzOiBfX3Nob290ZXJzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sIC8qIGRvU2hvb3QgZW5kICovXHJcbiAgICBcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICpkb0NsZWFyKHsgcGF5bG9hZCB9LCB7IHNlbGVjdCwgY2FsbCwgcHV0IH0pIHsgIFxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCIqKioqKioqKioqKiogQ0xFQVJJTkcgQkFMTElTVElDU34hfn4hISEgXCIpOyAgXHJcbiAgICAgICAgICBsZXQgX25vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyBcclxuICAgICAgICAgIGxldCBfX2J1bGxldHMgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaG9tZS5idWxsZXRzKTtcclxuICAgICAgICAgIGxldCBfX2xvYWRlZEJ1bGxldHMgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaG9tZS5sb2FkZWRCdWxsZXRzKTtcclxuICAgICAgICAgIGxldCBfX2JhbGxpc3RpY3MgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaG9tZS5iYWxsaXN0aWNzKTtcclxuICAgICAgICAgIGxldCBfX3Nob290ZXJzID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhvbWUuc2hvb3RlcnMpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBmb3IodmFyIGk9MDsgaTxfX2JhbGxpc3RpY3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoX19iYWxsaXN0aWNzW2ldLm9uVGltZXMhPS0xICYmIChfX2JhbGxpc3RpY3NbaV0ub25UaW1lcytfX2JhbGxpc3RpY3NbaV0uY2xlYXJEZWxheSk8X25vdykge1xyXG4gICAgICAgICAgICAgIF9fYmFsbGlzdGljc1tpXS5lbXB0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIF9fYmFsbGlzdGljc1tpXS5lbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9OyAgXHJcbiAgICAgICAgICB5aWVsZCBwdXQoe1xyXG4gICAgICAgICAgICB0eXBlOiBcImRvU2hvb3RTdWNjZXNzXCIsXHJcbiAgICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAvLyBidWxsZXRzOiBfX2J1bGxldHMsXHJcbiAgICAgICAgICAgICAgbG9hZGVkQnVsbGV0czogX19sb2FkZWRCdWxsZXRzLFxyXG4gICAgICAgICAgICAgIC8vIGJhbGxpc3RpY3M6IF9fYmFsbGlzdGljcyxcclxuICAgICAgICAgICAgICAvLyBzaG9vdGVyczogX19zaG9vdGVyc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIFxyXG4gICAgKmRvU2hvb3QoeyBwYXlsb2FkIH0sIHsgc2VsZWN0LCBjYWxsLCBwdXQgfSkgeyAgXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiKioqKioqKioqKioqIFNIT09UIEJVVDogXCIpOyAgXHJcbiAgICAgIGxldCBfbWlkdVNlZWQgPSAyO1xyXG4gICAgICBsZXQgX25vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyBcclxuICAgICAgbGV0IF9fYnVsbGV0cyA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5ob21lLmJ1bGxldHMpO1xyXG4gICAgICBsZXQgX19sb2FkZWRCdWxsZXRzID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhvbWUubG9hZGVkQnVsbGV0cyk7XHJcbiAgICAgIGxldCBfX2JhbGxpc3RpY3MgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaG9tZS5iYWxsaXN0aWNzKTtcclxuICAgICAgbGV0IF9fc2hvb3RlcnMgPSB5aWVsZCBzZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaG9tZS5zaG9vdGVycyk7XHJcbiAgICAgIGxldCBfX2VqZWN0ZXJzID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhvbWUuZWplY3RlcnMpO1xyXG4gICAgICBcclxuICAgICAgLy8gdmFyIGVtcHR5QmlzID0gMDtcclxuICAgICAgLy8gZm9yKHZhciBpPTA7IGk8X19iYWxsaXN0aWNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIC8vICAgaWYoIV9fYmFsbGlzdGljc1tpXS5lbXB0eSAmJiBfX2JhbGxpc3RpY3NbaV0ub25UaW1lcyE9LTEgJiYgKF9fYmFsbGlzdGljc1tpXS5vblRpbWVzK19fYmFsbGlzdGljc1tpXS5jbGVhckRlbGF5KTxfbm93KSB7XHJcbiAgICAgIC8vICAgICBfX2JhbGxpc3RpY3NbaV0uZW1wdHkgPSB0cnVlO1xyXG4gICAgICAvLyAgIH1cclxuICAgICAgICAvLyBpZihfX2JhbGxpc3RpY3NbaV0uZW1wdHkpe1xyXG4gICAgICAgIC8vICAgZW1wdHlCaXMrKztcclxuICAgICAgICAvLyB9XHJcbiAgICAgIC8vIH07IFxyXG4gICAgICAvLyBpZihlbXB0eUJpcy9fX2JhbGxpc3RpY3MubGVuZ3RoPjYpe1xyXG4gICAgICAvLyAgIHJldHVybjtcclxuICAgICAgLy8gfVxyXG4gICAgICBsZXQgdGhlQmFsbGlzdGljID0gbnVsbDsgXHJcbiAgICAgIGxldCBfYmlzID0gW107XHJcbiAgICAgIGZvcih2YXIgaT0wOyBpPF9fYmFsbGlzdGljcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmKF9fYmFsbGlzdGljc1tpXS5jbGVhckRlbGF5PT05OTk5OTk5KXtcclxuICAgICAgICAgIF9iaXMucHVzaChfX2JhbGxpc3RpY3NbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgaWYoX2Jpcy5sZW5ndGg+MCl7XHJcbiAgICAgICAgLy/mnKrmm77lj5HlvLnvvIzpmo/mnLrpgInohptcclxuICAgICAgICB0aGVCYWxsaXN0aWMgPSBfYmlzW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSooX2Jpcy5sZW5ndGgtMSkpXTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy/lj5blhrfohptcclxuICAgICAgICBsZXQgX2JpczIgPSBbXTtcclxuICAgICAgICBmb3IodmFyIGo9MDsgajxfX2JhbGxpc3RpY3MubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGlmKF9fYmFsbGlzdGljc1tqXS5lbXB0eSkge1xyXG4gICAgICAgICAgICBfYmlzMi5wdXNoKF9fYmFsbGlzdGljc1tqXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGVCYWxsaXN0aWMgPSBfYmlzMltNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqKF9iaXMyLmxlbmd0aCkpXTtcclxuICAgICAgICAvLyBpZihfYmlzMi5sZW5ndGg+MCl7XHJcbiAgICAgICAgLy8gICBfYmlzMi5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBiLmNsZWFyRGVsYXkgLSBhLmNsZWFyRGVsYXk7XHJcbiAgICAgICAgLy8gICB9KTtcclxuICAgICAgICAvLyAgIHRoZUJhbGxpc3RpYyA9IF9iaXMyWzBdO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgfVxyXG4gICAgICBpZighIXRoZUJhbGxpc3RpYyl7XHJcbiAgICAgICAgLy/lj5blvLnoo4Xoja9cclxuICAgICAgICBsZXQgYmx0ID0gX19idWxsZXRzLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYoISFibHQpe1xyXG4gICAgICAgICAgICBsZXQgdGhlQnVsbGV0ID0gbmV3IEJ1bGxldChibHQsIHRoZUJhbGxpc3RpYywgX19idWxsZXRzLmxlbmd0aCwgX19sb2FkZWRCdWxsZXRzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHRoZUJhbGxpc3RpYy5idWxsZXRJZCA9IGJsdC5pZDtcclxuICAgICAgICAgICAgdGhlQmFsbGlzdGljLmNsZWFyRGVsYXkgPSB0aGVCdWxsZXQuc3BlZWQgKyB0aGVCdWxsZXQuZGVsYXkgKyB0aGVCdWxsZXQuc3BlZWQvX21pZHVTZWVkOyAvL3RoZUJ1bGxldC5kZWxheTtcclxuICAgICAgICAgICAgdGhlQmFsbGlzdGljLm9uVGltZXMgPSBfbm93O1xyXG4gICAgICAgICAgICB0aGVCYWxsaXN0aWMuZW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhlQnVsbGV0LmJ1bGxldC5iYWxsaXN0aWMgPSB0aGVCYWxsaXN0aWM7XHJcbiAgICAgICAgICAgIC8v5b+r5oWi5py65bCx5L2NXHJcbiAgICAgICAgICAgIF9fc2hvb3RlcnMucHVzaCh7YnN0SWQ6dGhlQmFsbGlzdGljLmlkLCBibHRJZDpibHQuaWQsIGZpcmVfZGVsYXk6dGhlQmFsbGlzdGljLmNsZWFyRGVsYXkrMjAwfSk7XHJcbiAgICAgICAgICAgIF9fc2hvb3RlcnMuc29ydChmdW5jdGlvbihhLGIpe1xyXG4gICAgICAgICAgICAgIHJldHVybiBhLmZpcmVfZGVsYXkgLSBiLmZpcmVfZGVsYXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBfX2VqZWN0ZXJzLnB1c2goe2JsdDpibHQsIGVqZWN0X2RlbGF5OnRoZUJ1bGxldC5zcGVlZCArIHRoZUJ1bGxldC5kZWxheSArIDEwMH0pO1xyXG4gICAgICAgICAgICBfX2VqZWN0ZXJzLnNvcnQoZnVuY3Rpb24oYSxiKXtcclxuICAgICAgICAgICAgICByZXR1cm4gYS5lamVjdF9kZWxheSAtIGIuZWplY3RfZGVsYXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL+aOqOW8ueWFpeiGm1xyXG4gICAgICAgICAgICBfX2xvYWRlZEJ1bGxldHMucHVzaCh0aGVCdWxsZXQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInsrKysrfSAg546w5pyJOiBcIiwgX19sb2FkZWRCdWxsZXRzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi44CQKysrK+OAkSAg546w5pyJOiBcIiwgX19idWxsZXRzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHlpZWxkIHB1dCh7XHJcbiAgICAgICAgICAgICAgdHlwZTogXCJkb1Nob290U3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIGJ1bGxldHM6IF9fYnVsbGV0cyxcclxuICAgICAgICAgICAgICAgIGxvYWRlZEJ1bGxldHM6IF9fbG9hZGVkQnVsbGV0cyxcclxuICAgICAgICAgICAgICAgIGJhbGxpc3RpY3M6IF9fYmFsbGlzdGljcyxcclxuICAgICAgICAgICAgICAgIHNob290ZXJzOiBfX3Nob290ZXJzXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHlpZWxkIHB1dCh7XHJcbiAgICAgICAgICB0eXBlOiBcImRvU2hvb3RTdWNjZXNzXCIsXHJcbiAgICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgIC8vIGJ1bGxldHM6IF9fYnVsbGV0cyxcclxuICAgICAgICAgICAgLy8gbG9hZGVkQnVsbGV0czogX19sb2FkZWRCdWxsZXRzLFxyXG4gICAgICAgICAgICBiYWxsaXN0aWNzOiBfX2JhbGxpc3RpY3MsXHJcbiAgICAgICAgICAgIC8vIHNob290ZXJzOiBfX3Nob290ZXJzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgIFxyXG5cclxuICAgICAgLy8gbGV0IF9taWR1U2VlZCA9IDU7XHJcbiAgICAgIC8vIC8v6YCB5by55Ye65YyjXHJcbiAgICAgIC8vIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAvLyBsZXQgYmx0ID0gX19idWxsZXRzLnNoaWZ0KCk7XHJcbiAgICAgIC8vIGlmKCEhYmx0KXtcclxuICAgICAgLy8gICBsZXQgYnN0SWQgPSAwO1xyXG4gICAgICAvLyAgIGxldCB0aGVCYWxsaXN0aWMgPSBudWxsOyBcclxuICAgICAgLy8gICBsZXQgX2JpcyA9IFtdO1xyXG4gICAgICAvLyAgIGZvcih2YXIgaT0wOyBpPF9fYmFsbGlzdGljcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAvLyAgICAgaWYoX19iYWxsaXN0aWNzW2ldLmRlbGF5PT05OTk5OTk5KXtcclxuICAgICAgLy8gICAgICAgX2Jpcy5wdXNoKF9fYmFsbGlzdGljc1tpXSk7XHJcbiAgICAgIC8vICAgICB9XHJcbiAgICAgIC8vICAgfTtcclxuICAgICAgLy8gICBpZihfYmlzLmxlbmd0aD4wKXtcclxuICAgICAgLy8gICAgIC8v5pyq5pu+5Y+R5by577yM6ZqP5py66YCJ6IabXHJcbiAgICAgIC8vICAgICB0aGVCYWxsaXN0aWMgPSBfYmlzW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSooX2Jpcy5sZW5ndGgtMSkpXTtcclxuICAgICAgLy8gICB9ZWxzZXtcclxuICAgICAgLy8gICAgIC8v5Y+W5Ya36IabXHJcbiAgICAgIC8vICAgICAvLyB0aGVCYWxsaXN0aWMgPSBfX2JhbGxpc3RpY3NbMF07XHJcbiAgICAgIC8vICAgICBsZXQgX2JpczIgPSBbXTtcclxuICAgICAgLy8gICAgIGZvcih2YXIgaj0wOyBqPF9fYmFsbGlzdGljcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAvLyAgICAgICBpZihfX2JhbGxpc3RpY3Nbal0uZW1wdHkpIHtcclxuICAgICAgLy8gICAgICAgICBfYmlzMi5wdXNoKF9fYmFsbGlzdGljc1tqXSk7XHJcbiAgICAgIC8vICAgICAgIH1cclxuICAgICAgLy8gICAgIH07XHJcbiAgICAgIC8vICAgICB0aGVCYWxsaXN0aWMgPSBfYmlzMltNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqKF9iaXMyLmxlbmd0aC0xKSldO1xyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gICBjb25zb2xlLmxvZyhcInt7e3RoZUJhbGxpc3RpY319fV9fX18gJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlOiBcIiwgdGhlQmFsbGlzdGljLmlkKTtcclxuICAgICAgLy8gICAvL+ijheW8uVxyXG4gICAgICAvLyAgIC8vIGNvbnNvbGUubG9nKFwie3t7dGhlQmFsbGlzdGljfX19X19fXyAlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSU6IFwiKTtcclxuICAgICAgLy8gICAvLyBjb25zb2xlLmxvZyh0aGVCYWxsaXN0aWMpO1xyXG4gICAgICAvLyAgIGxldCB0aGVCdWxsZXQgPSBuZXcgQnVsbGV0KGJsdCwgdGhlQmFsbGlzdGljLCBfX2J1bGxldHMubGVuZ3RoLCBfX2xvYWRlZEJ1bGxldHMubGVuZ3RoKTtcclxuICAgICAgLy8gICAvLyB0aGVCdWxsZXQuc3BlZWQgPSAzMDAwMDtcclxuICAgICAgLy8gICB0aGVCYWxsaXN0aWMuYnVsbGV0SWQgPSBibHQuaWQ7XHJcbiAgICAgIC8vICAgdGhlQmFsbGlzdGljLmRlbGF5ID0gdGhlQnVsbGV0LnNwZWVkL19taWR1U2VlZDsgLy90aGVCdWxsZXQuZGVsYXk7XHJcbiAgICAgIC8vICAgdGhlQmFsbGlzdGljLm9uVGltZXMgPSBfbm93O1xyXG4gICAgICAvLyAgIHRoZUJhbGxpc3RpYy5lbXB0eSA9IGZhbHNlO1xyXG4gICAgICAvLyAgIHRoZUJ1bGxldC5idWxsZXQuYmFsbGlzdGljID0gdGhlQmFsbGlzdGljO1xyXG4gICAgICAvLyAgIC8v5b+r5oWi5py65bCx5L2NXHJcbiAgICAgIC8vICAgX19zaG9vdGVycy5wdXNoKHtic3RJZDp0aGVCYWxsaXN0aWMuaWQsIGJsdElkOmJsdC5pZCwgZmlyZV9kZWxheTp0aGVCdWxsZXQuc3BlZWQvX21pZHVTZWVkfSk7XHJcbiAgICAgIC8vICAgX19zaG9vdGVycy5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcbiAgICAgIC8vICAgICByZXR1cm4gYS5maXJlX2RlbGF5IC0gYi5maXJlX2RlbGF5O1xyXG4gICAgICAvLyAgIH0pO1xyXG4gICAgICAvLyAgIF9fZWplY3RlcnMucHVzaCh7Ymx0OmJsdCwgZWplY3RfZGVsYXk6dGhlQnVsbGV0LnNwZWVkfSk7XHJcbiAgICAgIC8vICAgX19lamVjdGVycy5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcbiAgICAgIC8vICAgICByZXR1cm4gYS5lamVjdF9kZWxheSAtIGIuZWplY3RfZGVsYXk7XHJcbiAgICAgIC8vICAgfSk7XHJcbiAgICAgIC8vICAgLy/mjqjlvLnlhaXohptcclxuICAgICAgLy8gICBfX2xvYWRlZEJ1bGxldHMucHVzaCh0aGVCdWxsZXQpO1xyXG4gICAgICAvLyAgIC8vIGNvbnNvbGUubG9nKFwieysrKyt9ICDnjrDmnIk6IFwiLCBfX2xvYWRlZEJ1bGxldHMubGVuZ3RoKTtcclxuICAgICAgLy8gICAvLyBjb25zb2xlLmxvZyhcIuOAkCsrKyvjgJEgIOeOsOaciTogXCIsIF9fYnVsbGV0cy5sZW5ndGgpO1xyXG4gICAgICAvLyAgIHlpZWxkIHB1dCh7XHJcbiAgICAgIC8vICAgICB0eXBlOiBcImRvU2hvb3RTdWNjZXNzXCIsXHJcbiAgICAgIC8vICAgICBwYXlsb2FkOiB7XHJcbiAgICAgIC8vICAgICAgIGJ1bGxldHM6IF9fYnVsbGV0cyxcclxuICAgICAgLy8gICAgICAgbG9hZGVkQnVsbGV0czogX19sb2FkZWRCdWxsZXRzLFxyXG4gICAgICAvLyAgICAgICBiYWxsaXN0aWNzOiBfX2JhbGxpc3RpY3MsXHJcbiAgICAgIC8vICAgICAgIHNob290ZXJzOiBfX3Nob290ZXJzXHJcbiAgICAgIC8vICAgICB9XHJcbiAgICAgIC8vICAgfSk7XHJcbiAgICAgIC8vIH1cclxuICAgIH0sIC8qIGRvU2hvb3QgZW5kICovXHJcbiAgICBcclxuICAgICpkb0VqZWN0KHsgcGF5bG9hZCB9LCB7IHNlbGVjdCwgY2FsbCwgcHV0IH0pIHsgIFxyXG4gICAgICAgIGxldCBfYmx0ID0gcGF5bG9hZC5lamVjdEJ1bGxldDtcclxuICAgICAgICBsZXQgX19idWxsZXRzID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhvbWUuYnVsbGV0cyk7XHJcbiAgICAgICAgbGV0IF9fbG9hZGVkQnVsbGV0cyA9IHlpZWxkIHNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5ob21lLmxvYWRlZEJ1bGxldHMpO1xyXG4gICAgICAgIGxldCBfX3Nob290ZXJzID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhvbWUuc2hvb3RlcnMpO1xyXG4gICAgICAgIGxldCBfX2VqZWN0ZXJzID0geWllbGQgc2VsZWN0KHN0YXRlID0+IHN0YXRlLmhvbWUuZWplY3RlcnMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi44CQLS0tLS0tLS0tLS0tLS0tLS0tLS3jgJEgRUpFQ1QgQlVUOiBcIiwgX2JsdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCIrKysrKysrKysrKysrKyBFSkVDVCBCVVRfSUQ6IFwiLCBfYmx0LmJsdC5pZCk7ICAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuOAkEI044CRRUpFQ1RTIDogXCIsIF9fZWplY3RlcnMubGVuZ3RoKTtcclxuICAgICAgICBmb3IodmFyIGE9MDsgYTxfX2VqZWN0ZXJzLmxlbmd0aDsgYSsrKXtcclxuICAgICAgICAgIGlmKF9fZWplY3RlcnNbYV0uYmx0LmlkPT1fYmx0LmJsdC5pZCl7XHJcbiAgICAgICAgICAgIF9fZWplY3RlcnMuc3BsaWNlKGEsIDEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLjgJAtLeOAkUVKRUNUUyA6IFwiLCBfX2VqZWN0ZXJzLmxlbmd0aCk7ICAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuOAkEI044CRU0hPT1RTIDogXCIsIF9fc2hvb3RlcnMubGVuZ3RoKTtcclxuICAgICAgICBmb3IodmFyIGI9MDsgYjxfX3Nob290ZXJzLmxlbmd0aDsgYisrKXtcclxuICAgICAgICAgIGlmKF9fc2hvb3RlcnNbYl0uYmx0SWQ9PV9ibHQuYmx0LmlkKXtcclxuICAgICAgICAgICAgX19zaG9vdGVycy5zcGxpY2UoYiwgMSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuOAkC0t44CRU0hPT1RTIDogXCIsIF9fc2hvb3RlcnMubGVuZ3RoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuOAkEI044CRTE9BREVEIDogXCIsIF9fbG9hZGVkQnVsbGV0cy5sZW5ndGgpO1xyXG4gICAgICAgIGZvcih2YXIgYz0wOyBjPF9fbG9hZGVkQnVsbGV0cy5sZW5ndGg7IGMrKyl7XHJcbiAgICAgICAgICBpZihfX2xvYWRlZEJ1bGxldHNbY10uYnVsbGV0LmlkPT1fYmx0LmJsdC5pZCl7XHJcbiAgICAgICAgICAgIF9fbG9hZGVkQnVsbGV0cy5zcGxpY2UoYywgMSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuOAkC0t44CRTE9BREVEIDogXCIsIF9fbG9hZGVkQnVsbGV0cy5sZW5ndGgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi44CQQjTjgJFBTEwgOiBcIiwgX19idWxsZXRzLmxlbmd0aCk7XHJcbiAgICAgICAgZGVsZXRlIF9ibHQuYmx0LmJhbGxpc3RpYztcclxuICAgICAgICBfX2J1bGxldHMucHVzaChfYmx0LmJsdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLjgJAtLeOAkUFMTCA6IFwiLCBfX2J1bGxldHMubGVuZ3RoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInstLS0tfSAg5bCa5pyJOiBcIiwgX19sb2FkZWRCdWxsZXRzLmxlbmd0aCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLjgJAtLS0t44CRICDlsJrmnIk6IFwiLCBfX2J1bGxldHMubGVuZ3RoKTtcclxuICAgICAgICB5aWVsZCBwdXQoe1xyXG4gICAgICAgICAgdHlwZTogXCJkb0VqZWN0U3VjY2Vzc1wiLFxyXG4gICAgICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICBidWxsZXRzOiBfX2J1bGxldHMsXHJcbiAgICAgICAgICAgIGxvYWRlZEJ1bGxldHM6IF9fbG9hZGVkQnVsbGV0cyxcclxuICAgICAgICAgICAgc2hvb3RlcnM6IF9fc2hvb3RlcnMsXHJcbiAgICAgICAgICAgIGVqZWN0ZXJzOiBfX2VqZWN0ZXJzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LCAvKiBkb0VqZWN0IGVuZCAqL1xyXG5cclxuICB9LCAvKmVmZmVjdHMgZW5kKi9cclxuXHJcbiAgcmVkdWNlcnM6IHtcclxuICAgIGxvYWRCdWxsZXRzU3VjY2VzcyhzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9O1xyXG4gICAgfSxcclxuICAgIGRvU2hvb3RTdWNjZXNzKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIC4uLmFjdGlvbi5wYXlsb2FkIH07XHJcbiAgICB9LFxyXG4gICAgZG9FamVjdFN1Y2Nlc3Moc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfTtcclxuICAgIH0sXHJcbiAgICBzdW1tYXJ5U3VjY2VzcyhzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9O1xyXG4gICAgfSxcclxuICAgIGVudFN1Y2Nlc3Moc3RhdGUsIGFjdGlvbikge1xyXG4gICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBlbnRuYW1lczogW1wi6K+36YCJ5oup5LyB5LiaXCIsXCLkuK3lm71cIixcIue+juWbvVwiLFwi5be06KW/XCIsXCLml6XmnKxcIl0sXHJcbiAgICAgICAgZW50YXBwaWQ6IFtcIlwiLFwiZ2hfYWFhYVwiLFwiZ2hfYmJiYlwiLFwiZ2hfYmJiYlwiLFwiZ2hfYmJiYlwiXVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgLi4uZGF0YSB9O1xyXG4gICAgfSxcclxuICAgIHNldExvZ291dFN0YXR1cyhzdGF0ZSxhY3Rpb24pIHtcclxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGxvZ291dDogYWN0aW9uLnBheWxvYWQgfTtcclxuICAgIH0sICAgXHJcbiAgfSxcclxufVxyXG4iXX0=