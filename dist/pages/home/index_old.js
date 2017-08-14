"use strict";var exports=module.exports={};var global=window=require('../../npm/labrador/global.js');
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('../../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = require('../../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('../../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('../../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('../../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _labrador = require('../../npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

var _labradorRedux = require('../../npm/labrador-redux/index.js');

var _createApp = require('../../app/createApp.js');

var _dvaUtil = require('../../app/dva-util.js');

var _routerUtil = require('../../app/router-util.js');

var _routerUtil2 = _interopRequireDefault(_routerUtil);

var _common = require('../../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Bullet from '../../components/bullet/bullet';
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var util = require('../../utils/utils.js');
var formatLocation = util.formatLocation;

var array = _labrador.PropTypes.array,
    func = _labrador.PropTypes.func;

var Bullet = function Bullet(_bullet, _total, _magazine, _serial) {
  var _this = this;

  (0, _classCallCheck3.default)(this, Bullet);

  this.bullet = _bullet;
  this._speedSeed = 1.5;
  this._delaySeed = 2333;
  this.serial = _serial;
  var that = this;
  this.owner = _magazine;
  this.text = _bullet.text;
  this.color = null;
  this.size = null;
  this.direct = 0;
  this.delay = 0;
  this.speed = 0;
  this.top = null;
  this.left = null;
  this.animation = _labrador2.default.createAnimation();
  this.ani = this.animation.export();
  switch (("" + _bullet.bore).length) {
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
  // let _tn = Math.round(Math.random()*12)*20;
  // let _ln = Math.round(Math.random()*wx.getSystemInfoSync().windowWidth);
  // this.top = 25 + _tn;
  //this.left = wx.getSystemInfoSync().windowWidth+_ln*2;
  // this.left = wx.getSystemInfoSync().windowWidth + !!this.text?this.text.length*this.size:0;
  this.left = _labrador2.default.getSystemInfoSync().windowWidth;

  this.direct = this.left + (!!this.text ? this.text.length * (this.size + 4) : 0);
  // let _direct = (!!this.text?this.text.length*(this.size+4):0);
  this.delay = Math.round(Math.random() * _total);
  this.size = 14;
  console.log("Bullet's ______: ", this.text);
  console.log("Bullet's ______INIT_____left/delay/len/direct/speed: ", this.left, this.delay * this._delaySeed, this.text.length, this.direct, this.speed);
  // console.log("Bullet's ______INIT_____direct/speed: ", _direct, this.speed);
  this.animation.translate(-1 * Math.abs(this.direct), 0).step({ duration: this.speed, delay: this.delay * this._delaySeed });
  this.animation.translate(Math.abs(this.direct), 0).step({ duration: 1 });
  this.ani = this.animation.export();

  setTimeout(function () {
    _this.owner.loadBullet(_this.serial, _this.bullet);
  }, this.speed + 2000 + this.delay * this._delaySeed);
};

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  // static propTypes = {
  // };

  function Home(props) {
    (0, _classCallCheck3.default)(this, Home);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

    var that = _this2;
    _this2.state = {
      clientInfo: _labrador2.default.getSystemInfoSync(),
      clientWidth: _labrador2.default.getSystemInfoSync().windowWidth,
      background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
      indicatorDots: false,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      hasLocation: false,
      locationAddress: "....",
      bullet0: null,
      bullet1: null,
      bullet2: null,
      bullet3: null,
      bullet4: null,
      bullet5: null,
      bullet6: null,
      bullet7: null,
      bullet8: null,
      bullet9: null,
      magazine: {
        bullets: [{}, {}, {}]
      },
      loader: {
        loadBullet: function loadBullet(idx, bullet) {
          // console.log("LOAD NEXT BULLET!!! --> ", idx, that.props.home.bullets.length, bullet);
          // let mag = {...that.state.magazine};
          // let blts = mag.bullets;

          // blts[idx] = new Bullet(that.props.home.bullets.shift(), that.props.home.bullets.length, that.state.loader, idx);

          // console.log("LOAD after~~: ", that.props.home.bullets.length);
          that.props.home.bullets.push(bullet);

          // console.log("PUSH after====: ", that.props.home.bullets.length);
          // that.setState({
          //   magazine: mag
          // })
          switch (idx) {
            case 0:
              that.setState({
                bullet0: null
              });
              that.setState({
                bullet0: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 0)
              });
              break;
            case 1:
              that.setState({
                bullet1: null
              });
              that.setState({
                bullet1: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 1)
              });
              break;
            case 2:
              that.setState({
                bullet2: null
              });
              that.setState({
                bullet2: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 2)
              });
              break;
            case 3:
              that.setState({
                bullet3: null
              });
              that.setState({
                bullet3: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 3)
              });
              break;
            case 4:
              that.setState({
                bullet4: null
              });
              that.setState({
                bullet4: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 4)
              });
              break;
            case 5:
              that.setState({
                bullet5: null
              });
              that.setState({
                bullet5: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 5)
              });
              break;
            case 6:
              that.setState({
                bullet6: null
              });
              that.setState({
                bullet6: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 6)
              });
              break;
            case 7:
              that.setState({
                bullet7: null
              });
              that.setState({
                bullet7: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 7)
              });
              break;
            case 8:
              that.setState({
                bullet8: null
              });
              that.setState({
                bullet8: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 8)
              });
              break;
            case 9:
              that.setState({
                bullet9: null
              });
              that.setState({
                bullet9: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 9)
              });
              break;
            case 9:
              that.setState({
                bullet9: null
              });
              that.setState({
                bullet9: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 9)
              });
              break;
            case 10:
              that.setState({
                bullet10: null
              });
              that.setState({
                bullet10: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 10)
              });
              break;
            case 11:
              that.setState({
                bullet11: null
              });
              that.setState({
                bullet11: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 11)
              });
              break;
            case 12:
              that.setState({
                bullet12: null
              });
              that.setState({
                bullet12: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 12)
              });
              break;
            case 13:
              that.setState({
                bullet13: null
              });
              that.setState({
                bullet13: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 13)
              });
              break;
            case 14:
              that.setState({
                bullet14: null
              });
              that.setState({
                bullet14: new Bullet(_this2.props.home.bullets.shift(), _this2.props.home.bullets.length, _this2.state.loader, 14)
              });
              break;
          }
        },
        shootBullet: function shootBullet() {},
        reload: function reload() {
          console.log("RELOAD");
        }
      }
    };
    return _this2;
  }

  (0, _createClass3.default)(Home, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      qqmapsdk = new QQMapWX({
        key: 'U2GBZ-QWSRO-YCNWX-SICFH-GL2GO-CXFWE'
      });
      // setTimeout(()=>{
      //   let mags = {...this.state.magazine};
      //   let blts = {...this.state.magazine.bullets};
      //   for(let i=0; i<blts.length; i++){
      //     //blts[i].animation.translate(1000).step({duration: 1}).translate(-1500, 0).step({duration: 8000});
      //     blts[i].ani = blts[i].animation.export();
      //   }
      //   mags.bullets = blts;
      //   this.setState({
      //     magazine: mags
      //   });
      //   console.log("exported~~~~");
      // }, 3000);
      (0, _dvaUtil.doAction)('home', 'loadBullets', {});

      // console.log("llllll: ", this.props.home);
      // var mag = {...this.state.magazine};
      // var bts = this.state.magazine.bullets;
      // for(var i=0; i<bts.length; i++){
      //   bts[i] = new Bullet(this.props.home.bullets.shift(), bts.length, this.state.loader, i);
      // }
      // mag.bullets = bts;
      // this.setState({
      //   magazine: mag
      // });
      // console.log("~~~~llllll: ", this.state);

      this.setState({
        bullet0: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 0),
        bullet1: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 1),
        bullet2: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 2),
        bullet3: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 3),
        bullet4: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 4),
        bullet5: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 5),
        bullet6: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 6),
        bullet7: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 7),
        bullet8: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 8),
        bullet9: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 9),
        bullet10: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 10),
        bullet11: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 11),
        bullet12: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 12),
        bullet13: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 13),
        bullet14: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 14)
      });
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      //console.log("生命周期函数--监听页面初次渲染完成");

      // wx.getLocation({
      //   success: function (res) {
      //             console.log("坐标：", res)
      //   }         
      // })

      var that = this;
      _labrador2.default.getLocation({
        type: 'wgs84',
        success: function success(res) {
          var latitude = res.latitude;
          var longitude = res.longitude;
          var speed = res.speed;
          var accuracy = res.accuracy;
          // console.log("getLocation success: ", res);   
        },
        complete: function complete(res) {
          // console.log("getLocation complete: ", res); 
          var _latitude = res.latitude;
          var _longitude = res.longitude;
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: _latitude,
              longitude: _longitude
            },
            success: function success(res) {
              console.log("reverseGeocoder success: ", res);
              that.setState({
                hasLocation: true,
                location: formatLocation(_longitude, _latitude),
                locationAddress: res.result.address
              });
            },
            fail: function fail(res) {
              console.log("reverseGeocoder fail: ", res);
            },
            complete: function complete(res) {
              console.log("reverseGeocoder complete: ", res);
            }
          });
        }
      });
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(props) {}
  }, {
    key: 'changeIndicatorDots',
    value: function changeIndicatorDots(e) {
      this.setState({
        indicatorDots: !this.state.indicatorDots
      });
    }
  }, {
    key: 'changeAutoplayn',
    value: function changeAutoplayn(e) {
      this.setState({
        autoplay: !this.state.autoplay
      });
    }
  }, {
    key: 'intervalChange',
    value: function intervalChange(e) {
      this.setState({
        interval: e.detail.value
      });
    }
  }, {
    key: 'durationChange',
    value: function durationChange(e) {
      this.setState({
        duration: e.detail.value
      });
    }
  }, {
    key: 'chooseLocation',
    value: function chooseLocation() {
      var that = this;
      _labrador2.default.chooseLocation({
        success: function success(res) {
          console.log("chooseLocation success: ", res);
          // that.setState({
          //   hasLocation: true,
          //   location: formatLocation(res.longitude, res.latitude),
          //   locationAddress: res.address
          // });
          // console.log("!!!that.setState: ", that.state);
        },
        complete: function complete(res) {
          console.log("chooseLocation complete: ", res);
          that.setState({
            hasLocation: true,
            location: formatLocation(res.longitude, res.latitude),
            locationAddress: res.address
          });
        }
      });
    }
  }]);
  return Home;
}(_labrador.Component);

function mapStateToProps(_ref) {
  var home = _ref.home;

  return {
    home: home
  };
}

exports.default = (0, _labradorRedux.connect)(mapStateToProps)(Home);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4X29sZC5qcyJdLCJuYW1lcyI6WyJRUU1hcFdYIiwicmVxdWlyZSIsInFxbWFwc2RrIiwidXRpbCIsImZvcm1hdExvY2F0aW9uIiwiYXJyYXkiLCJmdW5jIiwiQnVsbGV0IiwiX2J1bGxldCIsIl90b3RhbCIsIl9tYWdhemluZSIsIl9zZXJpYWwiLCJidWxsZXQiLCJfc3BlZWRTZWVkIiwiX2RlbGF5U2VlZCIsInNlcmlhbCIsInRoYXQiLCJvd25lciIsInRleHQiLCJjb2xvciIsInNpemUiLCJkaXJlY3QiLCJkZWxheSIsInNwZWVkIiwidG9wIiwibGVmdCIsImFuaW1hdGlvbiIsImNyZWF0ZUFuaW1hdGlvbiIsImFuaSIsImV4cG9ydCIsImJvcmUiLCJsZW5ndGgiLCJnZXRTeXN0ZW1JbmZvU3luYyIsIndpbmRvd1dpZHRoIiwiTWF0aCIsInJvdW5kIiwicmFuZG9tIiwiY29uc29sZSIsImxvZyIsInRyYW5zbGF0ZSIsImFicyIsInN0ZXAiLCJkdXJhdGlvbiIsInNldFRpbWVvdXQiLCJsb2FkQnVsbGV0IiwiSG9tZSIsInByb3BzIiwic3RhdGUiLCJjbGllbnRJbmZvIiwiY2xpZW50V2lkdGgiLCJiYWNrZ3JvdW5kIiwiaW5kaWNhdG9yRG90cyIsInZlcnRpY2FsIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImhhc0xvY2F0aW9uIiwibG9jYXRpb25BZGRyZXNzIiwiYnVsbGV0MCIsImJ1bGxldDEiLCJidWxsZXQyIiwiYnVsbGV0MyIsImJ1bGxldDQiLCJidWxsZXQ1IiwiYnVsbGV0NiIsImJ1bGxldDciLCJidWxsZXQ4IiwiYnVsbGV0OSIsIm1hZ2F6aW5lIiwiYnVsbGV0cyIsImxvYWRlciIsImlkeCIsImhvbWUiLCJwdXNoIiwic2V0U3RhdGUiLCJzaGlmdCIsImJ1bGxldDEwIiwiYnVsbGV0MTEiLCJidWxsZXQxMiIsImJ1bGxldDEzIiwiYnVsbGV0MTQiLCJzaG9vdEJ1bGxldCIsInJlbG9hZCIsImtleSIsImdldExvY2F0aW9uIiwidHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImFjY3VyYWN5IiwiY29tcGxldGUiLCJfbGF0aXR1ZGUiLCJfbG9uZ2l0dWRlIiwicmV2ZXJzZUdlb2NvZGVyIiwibG9jYXRpb24iLCJyZXN1bHQiLCJhZGRyZXNzIiwiZmFpbCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNob29zZUxvY2F0aW9uIiwibWFwU3RhdGVUb1Byb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBO0FBQ0EsSUFBSUEsVUFBVUMsUUFBUSxtQ0FBUixDQUFkO0FBQ0EsSUFBSUMsUUFBSjtBQUNBLElBQUlDLE9BQU9GLFFBQVEsc0JBQVIsQ0FBWDtBQUNBLElBQUlHLGlCQUFpQkQsS0FBS0MsY0FBMUI7O0lBRVFDLEssdUJBQUFBLEs7SUFBT0MsSSx1QkFBQUEsSTs7SUFFVEMsTSxHQUNKLGdCQUFZQyxPQUFaLEVBQXFCQyxNQUFyQixFQUE2QkMsU0FBN0IsRUFBd0NDLE9BQXhDLEVBQWlEO0FBQUE7O0FBQUE7O0FBQzNDLE9BQUtDLE1BQUwsR0FBY0osT0FBZDtBQUNBLE9BQUtLLFVBQUwsR0FBa0IsR0FBbEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsT0FBS0MsTUFBTCxHQUFjSixPQUFkO0FBQ0EsTUFBSUssT0FBTyxJQUFYO0FBQ0EsT0FBS0MsS0FBTCxHQUFhUCxTQUFiO0FBQ0EsT0FBS1EsSUFBTCxHQUFZVixRQUFRVSxJQUFwQjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLElBQVo7QUFDQSxPQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLE9BQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLQyxHQUFMLEdBQVcsSUFBWDtBQUNBLE9BQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQixtQkFBR0MsZUFBSCxFQUFqQjtBQUNBLE9BQUtDLEdBQUwsR0FBVyxLQUFLRixTQUFMLENBQWVHLE1BQWYsRUFBWDtBQUNBLFVBQU8sQ0FBQyxLQUFHckIsUUFBUXNCLElBQVosRUFBa0JDLE1BQXpCO0FBQ0ksU0FBSyxFQUFMO0FBQ0ksV0FBS1osS0FBTCxHQUFhLFNBQWI7QUFDQSxXQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFdBQUtHLEtBQUwsR0FBYSxRQUFNLEtBQUtWLFVBQXhCO0FBQ0E7QUFDSixTQUFLLENBQUw7QUFDSSxXQUFLTSxLQUFMLEdBQWEsU0FBYjtBQUNBLFdBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBS0csS0FBTCxHQUFhLFFBQU0sS0FBS1YsVUFBeEI7QUFDQTtBQUNKLFNBQUssQ0FBTDtBQUNJLFdBQUtNLEtBQUwsR0FBYSxTQUFiO0FBQ0EsV0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxXQUFLRyxLQUFMLEdBQWEsUUFBTSxLQUFLVixVQUF4QjtBQUNBO0FBQ0osU0FBSyxDQUFMO0FBQ0ksV0FBS00sS0FBTCxHQUFhLFNBQWI7QUFDQSxXQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFdBQUtHLEtBQUwsR0FBYSxRQUFNLEtBQUtWLFVBQXhCO0FBQ0E7QUFDSixTQUFLLENBQUw7QUFDSSxXQUFLTSxLQUFMLEdBQWEsU0FBYjtBQUNBLFdBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBS0csS0FBTCxHQUFhLFFBQU0sS0FBS1YsVUFBeEI7QUFDQTtBQUNKLFNBQUssQ0FBTDtBQUNJLFdBQUtNLEtBQUwsR0FBYSxTQUFiO0FBQ0EsV0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxXQUFLRyxLQUFMLEdBQWEsUUFBTSxLQUFLVixVQUF4QjtBQUNBO0FBQ0osU0FBSyxDQUFMO0FBQ0ksV0FBS00sS0FBTCxHQUFhLFNBQWI7QUFDQSxXQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFdBQUtHLEtBQUwsR0FBYSxRQUFNLEtBQUtWLFVBQXhCO0FBQ0E7QUFDSixTQUFLLENBQUw7QUFDSSxXQUFLTSxLQUFMLEdBQWEsU0FBYjtBQUNBLFdBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBS0csS0FBTCxHQUFhLFFBQU0sS0FBS1YsVUFBeEI7QUFDQTtBQUNKLFNBQUssQ0FBTDtBQUNJLFdBQUtNLEtBQUwsR0FBYSxTQUFiO0FBQ0EsV0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxXQUFLRyxLQUFMLEdBQWEsUUFBTSxLQUFLVixVQUF4QjtBQUNBO0FBQ0osU0FBSyxDQUFMO0FBQ0ksV0FBS00sS0FBTCxHQUFhLFNBQWI7QUFDQSxXQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFdBQUtHLEtBQUwsR0FBYSxRQUFNLEtBQUtWLFVBQXhCLENBSEosQ0FHMkM7QUFDdkM7QUFDSixTQUFLLENBQUw7QUFDSSxXQUFLTSxLQUFMLEdBQWEsU0FBYjtBQUNBLFdBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBS0csS0FBTCxHQUFhLFFBQU0sS0FBS1YsVUFBeEI7QUFDQTtBQUNKO0FBQ0ksV0FBS00sS0FBTCxHQUFhLFNBQWI7QUFDQSxXQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFdBQUtHLEtBQUwsR0FBYSxRQUFNLEtBQUtWLFVBQXhCO0FBM0RSO0FBNkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFLWSxJQUFMLEdBQVksbUJBQUdPLGlCQUFILEdBQXVCQyxXQUFuQzs7QUFFQSxPQUFLWixNQUFMLEdBQWMsS0FBS0ksSUFBTCxJQUFhLENBQUMsQ0FBQyxLQUFLUCxJQUFQLEdBQVksS0FBS0EsSUFBTCxDQUFVYSxNQUFWLElBQWtCLEtBQUtYLElBQUwsR0FBVSxDQUE1QixDQUFaLEdBQTJDLENBQXhELENBQWQ7QUFDQTtBQUNBLE9BQUtFLEtBQUwsR0FBYVksS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxNQUFMLEtBQWMzQixNQUF6QixDQUFiO0FBQ0EsT0FBS1csSUFBTCxHQUFZLEVBQVo7QUFDQWlCLFVBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxLQUFLcEIsSUFBdEM7QUFDQW1CLFVBQVFDLEdBQVIsQ0FBWSx1REFBWixFQUFxRSxLQUFLYixJQUExRSxFQUFnRixLQUFLSCxLQUFMLEdBQVcsS0FBS1IsVUFBaEcsRUFBNEcsS0FBS0ksSUFBTCxDQUFVYSxNQUF0SCxFQUE4SCxLQUFLVixNQUFuSSxFQUEySSxLQUFLRSxLQUFoSjtBQUNBO0FBQ0EsT0FBS0csU0FBTCxDQUFlYSxTQUFmLENBQXlCLENBQUMsQ0FBRCxHQUFHTCxLQUFLTSxHQUFMLENBQVMsS0FBS25CLE1BQWQsQ0FBNUIsRUFBbUQsQ0FBbkQsRUFBc0RvQixJQUF0RCxDQUEyRCxFQUFDQyxVQUFVLEtBQUtuQixLQUFoQixFQUF1QkQsT0FBTyxLQUFLQSxLQUFMLEdBQVcsS0FBS1IsVUFBOUMsRUFBM0Q7QUFDQSxPQUFLWSxTQUFMLENBQWVhLFNBQWYsQ0FBeUJMLEtBQUtNLEdBQUwsQ0FBUyxLQUFLbkIsTUFBZCxDQUF6QixFQUFnRCxDQUFoRCxFQUFtRG9CLElBQW5ELENBQXdELEVBQUNDLFVBQVUsQ0FBWCxFQUF4RDtBQUNBLE9BQUtkLEdBQUwsR0FBVyxLQUFLRixTQUFMLENBQWVHLE1BQWYsRUFBWDs7QUFFQWMsYUFBVyxZQUFJO0FBQ2IsVUFBSzFCLEtBQUwsQ0FBVzJCLFVBQVgsQ0FBc0IsTUFBSzdCLE1BQTNCLEVBQW1DLE1BQUtILE1BQXhDO0FBQ0QsR0FGRCxFQUVHLEtBQUtXLEtBQUwsR0FBVyxJQUFYLEdBQWdCLEtBQUtELEtBQUwsR0FBVyxLQUFLUixVQUZuQztBQUdMLEM7O0lBR0crQixJOzs7QUFDSjtBQUNBOztBQUVBLGdCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsbUlBQ1ZBLEtBRFU7O0FBRWhCLFFBQUk5QixhQUFKO0FBQ0EsV0FBSytCLEtBQUwsR0FBYTtBQUNYQyxrQkFBWSxtQkFBR2hCLGlCQUFILEVBREQ7QUFFWGlCLG1CQUFhLG1CQUFHakIsaUJBQUgsR0FBdUJDLFdBRnpCO0FBR1hpQixrQkFBWSxDQUFDLGFBQUQsRUFBZ0IsYUFBaEIsRUFBK0IsYUFBL0IsQ0FIRDtBQUlYQyxxQkFBZSxLQUpKO0FBS1hDLGdCQUFVLEtBTEM7QUFNWEMsZ0JBQVUsSUFOQztBQU9YQyxnQkFBVSxJQVBDO0FBUVhaLGdCQUFVLEdBUkM7QUFTWGEsbUJBQWEsS0FURjtBQVVYQyx1QkFBaUIsTUFWTjtBQVdYQyxlQUFTLElBWEU7QUFZWEMsZUFBUyxJQVpFO0FBYVhDLGVBQVMsSUFiRTtBQWNYQyxlQUFTLElBZEU7QUFlWEMsZUFBUyxJQWZFO0FBZ0JYQyxlQUFTLElBaEJFO0FBaUJYQyxlQUFTLElBakJFO0FBa0JYQyxlQUFTLElBbEJFO0FBbUJYQyxlQUFTLElBbkJFO0FBb0JYQyxlQUFTLElBcEJFO0FBcUJYQyxnQkFBVTtBQUNSQyxpQkFBUyxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUDtBQURELE9BckJDO0FBd0JYQyxjQUFRO0FBQ056QixvQkFBWSxvQkFBQzBCLEdBQUQsRUFBTTFELE1BQU4sRUFBaUI7QUFDM0I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0NJLGVBQUs4QixLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3QkksSUFBeEIsQ0FBNkI1RCxNQUE3Qjs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFPMEQsR0FBUDtBQUNFLGlCQUFLLENBQUw7QUFDRXRELG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1poQix5QkFBUztBQURHLGVBQWQ7QUFHQXpDLG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1poQix5QkFBUyxJQUFJbEQsTUFBSixDQUFXLE9BQUt1QyxLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3Qk0sS0FBeEIsRUFBWCxFQUE0QyxPQUFLNUIsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JyQyxNQUFwRSxFQUE0RSxPQUFLZ0IsS0FBTCxDQUFXc0IsTUFBdkYsRUFBK0YsQ0FBL0Y7QUFERyxlQUFkO0FBR0E7QUFDRixpQkFBSyxDQUFMO0FBQ0VyRCxtQkFBS3lELFFBQUwsQ0FBYztBQUNaZix5QkFBUztBQURHLGVBQWQ7QUFHQTFDLG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1pmLHlCQUFTLElBQUluRCxNQUFKLENBQVcsT0FBS3VDLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCTSxLQUF4QixFQUFYLEVBQTRDLE9BQUs1QixLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3QnJDLE1BQXBFLEVBQTRFLE9BQUtnQixLQUFMLENBQVdzQixNQUF2RixFQUErRixDQUEvRjtBQURHLGVBQWQ7QUFHQTtBQUNGLGlCQUFLLENBQUw7QUFDRXJELG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1pkLHlCQUFTO0FBREcsZUFBZDtBQUdBM0MsbUJBQUt5RCxRQUFMLENBQWM7QUFDWmQseUJBQVMsSUFBSXBELE1BQUosQ0FBVyxPQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsT0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsT0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GO0FBREcsZUFBZDtBQUdBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFckQsbUJBQUt5RCxRQUFMLENBQWM7QUFDWmIseUJBQVM7QUFERyxlQUFkO0FBR0E1QyxtQkFBS3lELFFBQUwsQ0FBYztBQUNaYix5QkFBUyxJQUFJckQsTUFBSixDQUFXLE9BQUt1QyxLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3Qk0sS0FBeEIsRUFBWCxFQUE0QyxPQUFLNUIsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JyQyxNQUFwRSxFQUE0RSxPQUFLZ0IsS0FBTCxDQUFXc0IsTUFBdkYsRUFBK0YsQ0FBL0Y7QUFERyxlQUFkO0FBR0E7QUFDRixpQkFBSyxDQUFMO0FBQ0VyRCxtQkFBS3lELFFBQUwsQ0FBYztBQUNaWix5QkFBUztBQURHLGVBQWQ7QUFHQTdDLG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1paLHlCQUFTLElBQUl0RCxNQUFKLENBQVcsT0FBS3VDLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCTSxLQUF4QixFQUFYLEVBQTRDLE9BQUs1QixLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3QnJDLE1BQXBFLEVBQTRFLE9BQUtnQixLQUFMLENBQVdzQixNQUF2RixFQUErRixDQUEvRjtBQURHLGVBQWQ7QUFHQTtBQUNGLGlCQUFLLENBQUw7QUFDRXJELG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1pYLHlCQUFTO0FBREcsZUFBZDtBQUdBOUMsbUJBQUt5RCxRQUFMLENBQWM7QUFDWlgseUJBQVMsSUFBSXZELE1BQUosQ0FBVyxPQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsT0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsT0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GO0FBREcsZUFBZDtBQUdBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFckQsbUJBQUt5RCxRQUFMLENBQWM7QUFDWlYseUJBQVM7QUFERyxlQUFkO0FBR0EvQyxtQkFBS3lELFFBQUwsQ0FBYztBQUNaVix5QkFBUyxJQUFJeEQsTUFBSixDQUFXLE9BQUt1QyxLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3Qk0sS0FBeEIsRUFBWCxFQUE0QyxPQUFLNUIsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JyQyxNQUFwRSxFQUE0RSxPQUFLZ0IsS0FBTCxDQUFXc0IsTUFBdkYsRUFBK0YsQ0FBL0Y7QUFERyxlQUFkO0FBR0E7QUFDRixpQkFBSyxDQUFMO0FBQ0VyRCxtQkFBS3lELFFBQUwsQ0FBYztBQUNaVCx5QkFBUztBQURHLGVBQWQ7QUFHQWhELG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1pULHlCQUFTLElBQUl6RCxNQUFKLENBQVcsT0FBS3VDLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCTSxLQUF4QixFQUFYLEVBQTRDLE9BQUs1QixLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3QnJDLE1BQXBFLEVBQTRFLE9BQUtnQixLQUFMLENBQVdzQixNQUF2RixFQUErRixDQUEvRjtBQURHLGVBQWQ7QUFHQTtBQUNGLGlCQUFLLENBQUw7QUFDRXJELG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1pSLHlCQUFTO0FBREcsZUFBZDtBQUdBakQsbUJBQUt5RCxRQUFMLENBQWM7QUFDWlIseUJBQVMsSUFBSTFELE1BQUosQ0FBVyxPQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsT0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsT0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GO0FBREcsZUFBZDtBQUdBO0FBQ0YsaUJBQUssQ0FBTDtBQUNFckQsbUJBQUt5RCxRQUFMLENBQWM7QUFDWlAseUJBQVM7QUFERyxlQUFkO0FBR0FsRCxtQkFBS3lELFFBQUwsQ0FBYztBQUNaUCx5QkFBUyxJQUFJM0QsTUFBSixDQUFXLE9BQUt1QyxLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3Qk0sS0FBeEIsRUFBWCxFQUE0QyxPQUFLNUIsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JyQyxNQUFwRSxFQUE0RSxPQUFLZ0IsS0FBTCxDQUFXc0IsTUFBdkYsRUFBK0YsQ0FBL0Y7QUFERyxlQUFkO0FBR0E7QUFDRixpQkFBSyxDQUFMO0FBQ0VyRCxtQkFBS3lELFFBQUwsQ0FBYztBQUNaUCx5QkFBUztBQURHLGVBQWQ7QUFHQWxELG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1pQLHlCQUFTLElBQUkzRCxNQUFKLENBQVcsT0FBS3VDLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCTSxLQUF4QixFQUFYLEVBQTRDLE9BQUs1QixLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3QnJDLE1BQXBFLEVBQTRFLE9BQUtnQixLQUFMLENBQVdzQixNQUF2RixFQUErRixDQUEvRjtBQURHLGVBQWQ7QUFHQTtBQUNGLGlCQUFLLEVBQUw7QUFDRXJELG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1pFLDBCQUFVO0FBREUsZUFBZDtBQUdBM0QsbUJBQUt5RCxRQUFMLENBQWM7QUFDWkUsMEJBQVUsSUFBSXBFLE1BQUosQ0FBVyxPQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsT0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsT0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLEVBQS9GO0FBREUsZUFBZDtBQUdBO0FBQ0YsaUJBQUssRUFBTDtBQUNFckQsbUJBQUt5RCxRQUFMLENBQWM7QUFDWkcsMEJBQVU7QUFERSxlQUFkO0FBR0E1RCxtQkFBS3lELFFBQUwsQ0FBYztBQUNaRywwQkFBVSxJQUFJckUsTUFBSixDQUFXLE9BQUt1QyxLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3Qk0sS0FBeEIsRUFBWCxFQUE0QyxPQUFLNUIsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JyQyxNQUFwRSxFQUE0RSxPQUFLZ0IsS0FBTCxDQUFXc0IsTUFBdkYsRUFBK0YsRUFBL0Y7QUFERSxlQUFkO0FBR0E7QUFDRixpQkFBSyxFQUFMO0FBQ0VyRCxtQkFBS3lELFFBQUwsQ0FBYztBQUNaSSwwQkFBVTtBQURFLGVBQWQ7QUFHQTdELG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1pJLDBCQUFVLElBQUl0RSxNQUFKLENBQVcsT0FBS3VDLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCTSxLQUF4QixFQUFYLEVBQTRDLE9BQUs1QixLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3QnJDLE1BQXBFLEVBQTRFLE9BQUtnQixLQUFMLENBQVdzQixNQUF2RixFQUErRixFQUEvRjtBQURFLGVBQWQ7QUFHQTtBQUNGLGlCQUFLLEVBQUw7QUFDRXJELG1CQUFLeUQsUUFBTCxDQUFjO0FBQ1pLLDBCQUFVO0FBREUsZUFBZDtBQUdBOUQsbUJBQUt5RCxRQUFMLENBQWM7QUFDWkssMEJBQVUsSUFBSXZFLE1BQUosQ0FBVyxPQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsT0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsT0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLEVBQS9GO0FBREUsZUFBZDtBQUdBO0FBQ0YsaUJBQUssRUFBTDtBQUNFckQsbUJBQUt5RCxRQUFMLENBQWM7QUFDWk0sMEJBQVU7QUFERSxlQUFkO0FBR0EvRCxtQkFBS3lELFFBQUwsQ0FBYztBQUNaTSwwQkFBVSxJQUFJeEUsTUFBSixDQUFXLE9BQUt1QyxLQUFMLENBQVd5QixJQUFYLENBQWdCSCxPQUFoQixDQUF3Qk0sS0FBeEIsRUFBWCxFQUE0QyxPQUFLNUIsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JyQyxNQUFwRSxFQUE0RSxPQUFLZ0IsS0FBTCxDQUFXc0IsTUFBdkYsRUFBK0YsRUFBL0Y7QUFERSxlQUFkO0FBR0E7QUFoSUo7QUFrSUQsU0FqSks7QUFrSk5XLHFCQUFhLHVCQUFNLENBQUUsQ0FsSmY7QUFtSk5DLGdCQUFRLGtCQUFNO0FBQ1o1QyxrQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQXJKSztBQXhCRyxLQUFiO0FBSGdCO0FBbUxqQjs7Ozs2QkFFUTtBQUNMLFVBQUl0QixPQUFPLElBQVg7QUFDQWQsaUJBQVcsSUFBSUYsT0FBSixDQUFZO0FBQ25Ca0YsYUFBSztBQURjLE9BQVosQ0FBWDtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0YsNkJBQVMsTUFBVCxFQUFnQixhQUFoQixFQUE4QixFQUE5Qjs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQUtULFFBQUwsQ0FBYztBQUNaaEIsaUJBQVMsSUFBSWxELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBREc7QUFFWlgsaUJBQVMsSUFBSW5ELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBRkc7QUFHWlYsaUJBQVMsSUFBSXBELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBSEc7QUFJWlQsaUJBQVMsSUFBSXJELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBSkc7QUFLWlIsaUJBQVMsSUFBSXRELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBTEc7QUFNWlAsaUJBQVMsSUFBSXZELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBTkc7QUFPWk4saUJBQVMsSUFBSXhELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBUEc7QUFRWkwsaUJBQVMsSUFBSXpELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBUkc7QUFTWkosaUJBQVMsSUFBSTFELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBVEc7QUFVWkgsaUJBQVMsSUFBSTNELE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLENBQS9GLENBVkc7QUFXWk0sa0JBQVUsSUFBSXBFLE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLEVBQS9GLENBWEU7QUFZWk8sa0JBQVUsSUFBSXJFLE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLEVBQS9GLENBWkU7QUFhWlEsa0JBQVUsSUFBSXRFLE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLEVBQS9GLENBYkU7QUFjWlMsa0JBQVUsSUFBSXZFLE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLEVBQS9GLENBZEU7QUFlWlUsa0JBQVUsSUFBSXhFLE1BQUosQ0FBVyxLQUFLdUMsS0FBTCxDQUFXeUIsSUFBWCxDQUFnQkgsT0FBaEIsQ0FBd0JNLEtBQXhCLEVBQVgsRUFBNEMsS0FBSzVCLEtBQUwsQ0FBV3lCLElBQVgsQ0FBZ0JILE9BQWhCLENBQXdCckMsTUFBcEUsRUFBNEUsS0FBS2dCLEtBQUwsQ0FBV3NCLE1BQXZGLEVBQStGLEVBQS9GO0FBZkUsT0FBZDtBQW1CRDs7OzhCQUVTO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFJckQsT0FBTyxJQUFYO0FBQ0EseUJBQUdtRSxXQUFILENBQWU7QUFDWEMsY0FBTSxPQURLO0FBRVhDLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDWCxjQUFJQyxXQUFXRCxJQUFJQyxRQUFuQjtBQUNBLGNBQUlDLFlBQVlGLElBQUlFLFNBQXBCO0FBQ0EsY0FBSWpFLFFBQVErRCxJQUFJL0QsS0FBaEI7QUFDQSxjQUFJa0UsV0FBV0gsSUFBSUcsUUFBbkI7QUFDRjtBQUNELFNBUkU7QUFTWEMsa0JBQVUsa0JBQVNKLEdBQVQsRUFBYTtBQUNuQjtBQUNBLGNBQUlLLFlBQVlMLElBQUlDLFFBQXBCO0FBQ0EsY0FBSUssYUFBYU4sSUFBSUUsU0FBckI7QUFDQXRGLG1CQUFTMkYsZUFBVCxDQUF5QjtBQUNyQkMsc0JBQVU7QUFDRVAsd0JBQVVJLFNBRFo7QUFFRUgseUJBQVdJO0FBRmIsYUFEVztBQUtyQlAscUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQmpELHNCQUFRQyxHQUFSLENBQVksMkJBQVosRUFBeUNnRCxHQUF6QztBQUNBdEUsbUJBQUt5RCxRQUFMLENBQWM7QUFDVmxCLDZCQUFhLElBREg7QUFFVnVDLDBCQUFVMUYsZUFBZXdGLFVBQWYsRUFBMkJELFNBQTNCLENBRkE7QUFHVm5DLGlDQUFpQjhCLElBQUlTLE1BQUosQ0FBV0M7QUFIbEIsZUFBZDtBQUtILGFBWm9CO0FBYXJCQyxrQkFBTSxjQUFVWCxHQUFWLEVBQWU7QUFDakJqRCxzQkFBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDZ0QsR0FBdEM7QUFDSCxhQWZvQjtBQWdCckJJLHNCQUFVLGtCQUFVSixHQUFWLEVBQWU7QUFDckJqRCxzQkFBUUMsR0FBUixDQUFZLDRCQUFaLEVBQTBDZ0QsR0FBMUM7QUFDSDtBQWxCb0IsV0FBekI7QUFvQkg7QUFqQ1UsT0FBZjtBQXVDRDs7OzZCQUVReEMsSyxFQUFPLENBQ2Y7Ozt3Q0FFb0JvRCxDLEVBQUc7QUFDdEIsV0FBS3pCLFFBQUwsQ0FBYztBQUNadEIsdUJBQWUsQ0FBQyxLQUFLSixLQUFMLENBQVdJO0FBRGYsT0FBZDtBQUdEOzs7b0NBRWdCK0MsQyxFQUFHO0FBQ2xCLFdBQUt6QixRQUFMLENBQWM7QUFDWnBCLGtCQUFVLENBQUMsS0FBS04sS0FBTCxDQUFXTTtBQURWLE9BQWQ7QUFHRDs7O21DQUVlNkMsQyxFQUFHO0FBQ2pCLFdBQUt6QixRQUFMLENBQWM7QUFDWm5CLGtCQUFVNEMsRUFBRUMsTUFBRixDQUFTQztBQURQLE9BQWQ7QUFHRDs7O21DQUVlRixDLEVBQUc7QUFDakIsV0FBS3pCLFFBQUwsQ0FBYztBQUNaL0Isa0JBQVV3RCxFQUFFQyxNQUFGLENBQVNDO0FBRFAsT0FBZDtBQUdEOzs7cUNBRWdCO0FBQ2YsVUFBSXBGLE9BQU8sSUFBWDtBQUNBLHlCQUFHcUYsY0FBSCxDQUFrQjtBQUNoQmhCLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJqRCxrQkFBUUMsR0FBUixDQUFZLDBCQUFaLEVBQXdDZ0QsR0FBeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxTQVRlO0FBVWhCSSxrQkFBVSxrQkFBU0osR0FBVCxFQUFhO0FBQ3JCakQsa0JBQVFDLEdBQVIsQ0FBWSwyQkFBWixFQUF5Q2dELEdBQXpDO0FBQ0F0RSxlQUFLeUQsUUFBTCxDQUFjO0FBQ1psQix5QkFBYSxJQUREO0FBRVp1QyxzQkFBVTFGLGVBQWVrRixJQUFJRSxTQUFuQixFQUE4QkYsSUFBSUMsUUFBbEMsQ0FGRTtBQUdaL0IsNkJBQWlCOEIsSUFBSVU7QUFIVCxXQUFkO0FBS0Q7QUFqQmUsT0FBbEI7QUFtQkQ7Ozs7O0FBSUgsU0FBU00sZUFBVCxPQUFnQztBQUFBLE1BQU4vQixJQUFNLFFBQU5BLElBQU07O0FBQzlCLFNBQU87QUFDTEE7QUFESyxHQUFQO0FBR0Q7O2tCQUVjLDRCQUFRK0IsZUFBUixFQUF5QnpELElBQXpCLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3eCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ2xhYnJhZG9yJztcbmltcG9ydCB7IGNvbm5lY3QsIGdldFN0b3JlfSBmcm9tICdsYWJyYWRvci1yZWR1eCc7XG5pbXBvcnQgeyB3eEdldEFwcCB9IGZyb20gJy4uLy4uL2FwcC9jcmVhdGVBcHAnO1xuaW1wb3J0IHsgZG9BY3Rpb24sZ2V0U3RhdGUgfSBmcm9tICcuLi8uLi9hcHAvZHZhLXV0aWwnO1xuaW1wb3J0IFJvdXRlciBmcm9tICcuLi8uLi9hcHAvcm91dGVyLXV0aWwnO1xuaW1wb3J0IHsgc2hvd1RvYXN0TWVzc2FnZSB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbW1vbic7XG4vLyBpbXBvcnQgQnVsbGV0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnVsbGV0L2J1bGxldCc7XG52YXIgUVFNYXBXWCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3FxbWFwLXd4LWpzc2RrLm1pbi5qcycpO1xudmFyIHFxbWFwc2RrO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlscy91dGlscy5qcycpO1xudmFyIGZvcm1hdExvY2F0aW9uID0gdXRpbC5mb3JtYXRMb2NhdGlvblxuXG5jb25zdCB7IGFycmF5LCBmdW5jIH0gPSBQcm9wVHlwZXM7XG5cbmNsYXNzIEJ1bGxldCB7XG4gIGNvbnN0cnVjdG9yKF9idWxsZXQsIF90b3RhbCwgX21hZ2F6aW5lLCBfc2VyaWFsKSB7XG4gICAgICAgIHRoaXMuYnVsbGV0ID0gX2J1bGxldDtcbiAgICAgICAgdGhpcy5fc3BlZWRTZWVkID0gMS41O1xuICAgICAgICB0aGlzLl9kZWxheVNlZWQgPSAyMzMzO1xuICAgICAgICB0aGlzLnNlcmlhbCA9IF9zZXJpYWw7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhpcy5vd25lciA9IF9tYWdhemluZTtcbiAgICAgICAgdGhpcy50ZXh0ID0gX2J1bGxldC50ZXh0O1xuICAgICAgICB0aGlzLmNvbG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaXplID0gbnVsbDtcbiAgICAgICAgdGhpcy5kaXJlY3QgPSAwO1xuICAgICAgICB0aGlzLmRlbGF5ID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgICAgIHRoaXMudG9wID0gbnVsbDtcbiAgICAgICAgdGhpcy5sZWZ0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oKTtcbiAgICAgICAgdGhpcy5hbmkgPSB0aGlzLmFuaW1hdGlvbi5leHBvcnQoKTtcbiAgICAgICAgc3dpdGNoKChcIlwiK19idWxsZXQuYm9yZSkubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0UzQ0M3MlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDIwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyMjAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0VFNjY2NlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE4O1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyMzAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiIzY2NjZFRVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE4O1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyNDAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0Y0NjA3RVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE2O1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyNTAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0VFNjZCOFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE2O1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyNjAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0NDODhDQ1wiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE0O1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyNzAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiIzgyQjJEMlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE0O1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyODAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiIzhGRDg3RFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDEyO1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyOTAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0FFQ0MzM1wiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDEyO1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAzMDAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6IFxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNDMUU4QzFcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxMDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMzAwMDAvdGhpcy5fc3BlZWRTZWVkOyAgICAvLzMxMDAwL3RoaXMuX3NwZWVkU2VlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMDogXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0VFRTRCQlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDg7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDMyMDAwL3RoaXMuX3NwZWVkU2VlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0ZGMDAwMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDIyO1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyMTAwMC90aGlzLl9zcGVlZFNlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbGV0IF90biA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSoxMikqMjA7XG4gICAgICAgIC8vIGxldCBfbG4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aCk7XG4gICAgICAgIC8vIHRoaXMudG9wID0gMjUgKyBfdG47XG4gICAgICAgIC8vdGhpcy5sZWZ0ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aCtfbG4qMjtcbiAgICAgICAgLy8gdGhpcy5sZWZ0ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aCArICEhdGhpcy50ZXh0P3RoaXMudGV4dC5sZW5ndGgqdGhpcy5zaXplOjA7XG4gICAgICAgIHRoaXMubGVmdCA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkud2luZG93V2lkdGg7XG5cbiAgICAgICAgdGhpcy5kaXJlY3QgPSB0aGlzLmxlZnQgKyAoISF0aGlzLnRleHQ/dGhpcy50ZXh0Lmxlbmd0aCoodGhpcy5zaXplKzQpOjApO1xuICAgICAgICAvLyBsZXQgX2RpcmVjdCA9ICghIXRoaXMudGV4dD90aGlzLnRleHQubGVuZ3RoKih0aGlzLnNpemUrNCk6MCk7XG4gICAgICAgIHRoaXMuZGVsYXkgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqX3RvdGFsKTtcbiAgICAgICAgdGhpcy5zaXplID0gMTQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0J3MgX19fX19fOiBcIiwgdGhpcy50ZXh0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJCdWxsZXQncyBfX19fX19JTklUX19fX19sZWZ0L2RlbGF5L2xlbi9kaXJlY3Qvc3BlZWQ6IFwiLCB0aGlzLmxlZnQsIHRoaXMuZGVsYXkqdGhpcy5fZGVsYXlTZWVkLCB0aGlzLnRleHQubGVuZ3RoLCB0aGlzLmRpcmVjdCwgdGhpcy5zcGVlZCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQnVsbGV0J3MgX19fX19fSU5JVF9fX19fZGlyZWN0L3NwZWVkOiBcIiwgX2RpcmVjdCwgdGhpcy5zcGVlZCk7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnRyYW5zbGF0ZSgtMSpNYXRoLmFicyh0aGlzLmRpcmVjdCksIDApLnN0ZXAoe2R1cmF0aW9uOiB0aGlzLnNwZWVkLCBkZWxheTogdGhpcy5kZWxheSp0aGlzLl9kZWxheVNlZWR9KTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24udHJhbnNsYXRlKE1hdGguYWJzKHRoaXMuZGlyZWN0KSwgMCkuc3RlcCh7ZHVyYXRpb246IDF9KTtcbiAgICAgICAgdGhpcy5hbmkgPSB0aGlzLmFuaW1hdGlvbi5leHBvcnQoKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgdGhpcy5vd25lci5sb2FkQnVsbGV0KHRoaXMuc2VyaWFsLCB0aGlzLmJ1bGxldCk7XG4gICAgICAgIH0sIHRoaXMuc3BlZWQrMjAwMCt0aGlzLmRlbGF5KnRoaXMuX2RlbGF5U2VlZCk7XG4gIH1cbn1cblxuY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8vIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gIC8vIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNsaWVudEluZm86IHd4LmdldFN5c3RlbUluZm9TeW5jKCksXG4gICAgICBjbGllbnRXaWR0aDogd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aCxcbiAgICAgIGJhY2tncm91bmQ6IFsnZGVtby10ZXh0LTEnLCAnZGVtby10ZXh0LTInLCAnZGVtby10ZXh0LTMnXSxcbiAgICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxuICAgICAgdmVydGljYWw6IGZhbHNlLFxuICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICBpbnRlcnZhbDogMjAwMCxcbiAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICBoYXNMb2NhdGlvbjogZmFsc2UsXG4gICAgICBsb2NhdGlvbkFkZHJlc3M6IFwiLi4uLlwiLFxuICAgICAgYnVsbGV0MDogbnVsbCxcbiAgICAgIGJ1bGxldDE6IG51bGwsXG4gICAgICBidWxsZXQyOiBudWxsLFxuICAgICAgYnVsbGV0MzogbnVsbCxcbiAgICAgIGJ1bGxldDQ6IG51bGwsXG4gICAgICBidWxsZXQ1OiBudWxsLFxuICAgICAgYnVsbGV0NjogbnVsbCxcbiAgICAgIGJ1bGxldDc6IG51bGwsXG4gICAgICBidWxsZXQ4OiBudWxsLFxuICAgICAgYnVsbGV0OTogbnVsbCxcbiAgICAgIG1hZ2F6aW5lOiB7XG4gICAgICAgIGJ1bGxldHM6IFt7fSx7fSx7fV1cbiAgICAgIH0sXG4gICAgICBsb2FkZXI6IHtcbiAgICAgICAgbG9hZEJ1bGxldDogKGlkeCwgYnVsbGV0KSA9PiB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJMT0FEIE5FWFQgQlVMTEVUISEhIC0tPiBcIiwgaWR4LCB0aGF0LnByb3BzLmhvbWUuYnVsbGV0cy5sZW5ndGgsIGJ1bGxldCk7XG4gICAgICAgICAgLy8gbGV0IG1hZyA9IHsuLi50aGF0LnN0YXRlLm1hZ2F6aW5lfTtcbiAgICAgICAgICAvLyBsZXQgYmx0cyA9IG1hZy5idWxsZXRzO1xuXG4gICAgICAgICAgLy8gYmx0c1tpZHhdID0gbmV3IEJ1bGxldCh0aGF0LnByb3BzLmhvbWUuYnVsbGV0cy5zaGlmdCgpLCB0aGF0LnByb3BzLmhvbWUuYnVsbGV0cy5sZW5ndGgsIHRoYXQuc3RhdGUubG9hZGVyLCBpZHgpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTE9BRCBhZnRlcn5+OiBcIiwgdGhhdC5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoKTtcbiAgICAgICAgICAgdGhhdC5wcm9wcy5ob21lLmJ1bGxldHMucHVzaChidWxsZXQpO1xuXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJQVVNIIGFmdGVyPT09PTogXCIsIHRoYXQucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCk7XG4gICAgICAgICAgLy8gdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgLy8gICBtYWdhemluZTogbWFnXG4gICAgICAgICAgLy8gfSlcbiAgICAgICAgICBzd2l0Y2goaWR4KXtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0MDogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDA6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgMCksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0MTogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDE6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgMSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0MjogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDI6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgMiksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0MzogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDM6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgMyksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0NDogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDQ6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgNCksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0NTogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDU6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgNSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0NjogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDY6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgNiksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0NzogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDc6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgNyksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0ODogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDg6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgOCksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0OTogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDk6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgOSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0OTogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDk6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgOSksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDEwOiBudWxsLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0MTA6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgMTApLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBidWxsZXQxMTogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDExOiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDExKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0MTI6IG51bGwsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBidWxsZXQxMjogbmV3IEJ1bGxldCh0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5zaGlmdCgpLCB0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5sZW5ndGgsIHRoaXMuc3RhdGUubG9hZGVyLCAxMiksXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDEzOiBudWxsLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYnVsbGV0MTM6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgMTMpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBidWxsZXQxNDogbnVsbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGJ1bGxldDE0OiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDE0KSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2hvb3RCdWxsZXQ6ICgpID0+IHt9LFxuICAgICAgICByZWxvYWQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFTE9BRFwiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIG9uTG9hZCgpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHFxbWFwc2RrID0gbmV3IFFRTWFwV1goe1xuICAgICAgICAgIGtleTogJ1UyR0JaLVFXU1JPLVlDTldYLVNJQ0ZILUdMMkdPLUNYRldFJ1xuICAgICAgfSk7XG4gICAgICAvLyBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAvLyAgIGxldCBtYWdzID0gey4uLnRoaXMuc3RhdGUubWFnYXppbmV9O1xuICAgICAgLy8gICBsZXQgYmx0cyA9IHsuLi50aGlzLnN0YXRlLm1hZ2F6aW5lLmJ1bGxldHN9O1xuICAgICAgLy8gICBmb3IobGV0IGk9MDsgaTxibHRzLmxlbmd0aDsgaSsrKXtcbiAgICAgIC8vICAgICAvL2JsdHNbaV0uYW5pbWF0aW9uLnRyYW5zbGF0ZSgxMDAwKS5zdGVwKHtkdXJhdGlvbjogMX0pLnRyYW5zbGF0ZSgtMTUwMCwgMCkuc3RlcCh7ZHVyYXRpb246IDgwMDB9KTtcbiAgICAgIC8vICAgICBibHRzW2ldLmFuaSA9IGJsdHNbaV0uYW5pbWF0aW9uLmV4cG9ydCgpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyAgIG1hZ3MuYnVsbGV0cyA9IGJsdHM7XG4gICAgICAvLyAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLy8gICAgIG1hZ2F6aW5lOiBtYWdzXG4gICAgICAvLyAgIH0pO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhcImV4cG9ydGVkfn5+flwiKTtcbiAgICAgIC8vIH0sIDMwMDApO1xuICAgIGRvQWN0aW9uKCdob21lJywnbG9hZEJ1bGxldHMnLHtcbiAgICB9KTtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwibGxsbGxsOiBcIiwgdGhpcy5wcm9wcy5ob21lKTtcbiAgICAvLyB2YXIgbWFnID0gey4uLnRoaXMuc3RhdGUubWFnYXppbmV9O1xuICAgIC8vIHZhciBidHMgPSB0aGlzLnN0YXRlLm1hZ2F6aW5lLmJ1bGxldHM7XG4gICAgLy8gZm9yKHZhciBpPTA7IGk8YnRzLmxlbmd0aDsgaSsrKXtcbiAgICAvLyAgIGJ0c1tpXSA9IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgYnRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIGkpO1xuICAgIC8vIH1cbiAgICAvLyBtYWcuYnVsbGV0cyA9IGJ0cztcbiAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAvLyAgIG1hZ2F6aW5lOiBtYWdcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIn5+fn5sbGxsbGw6IFwiLCB0aGlzLnN0YXRlKTtcblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYnVsbGV0MDogbmV3IEJ1bGxldCh0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5zaGlmdCgpLCB0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5sZW5ndGgsIHRoaXMuc3RhdGUubG9hZGVyLCAwKSxcbiAgICAgIGJ1bGxldDE6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgMSksXG4gICAgICBidWxsZXQyOiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDIpLFxuICAgICAgYnVsbGV0MzogbmV3IEJ1bGxldCh0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5zaGlmdCgpLCB0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5sZW5ndGgsIHRoaXMuc3RhdGUubG9hZGVyLCAzKSxcbiAgICAgIGJ1bGxldDQ6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgNCksXG4gICAgICBidWxsZXQ1OiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDUpLFxuICAgICAgYnVsbGV0NjogbmV3IEJ1bGxldCh0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5zaGlmdCgpLCB0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5sZW5ndGgsIHRoaXMuc3RhdGUubG9hZGVyLCA2KSxcbiAgICAgIGJ1bGxldDc6IG5ldyBCdWxsZXQodGhpcy5wcm9wcy5ob21lLmJ1bGxldHMuc2hpZnQoKSwgdGhpcy5wcm9wcy5ob21lLmJ1bGxldHMubGVuZ3RoLCB0aGlzLnN0YXRlLmxvYWRlciwgNyksXG4gICAgICBidWxsZXQ4OiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDgpLFxuICAgICAgYnVsbGV0OTogbmV3IEJ1bGxldCh0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5zaGlmdCgpLCB0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5sZW5ndGgsIHRoaXMuc3RhdGUubG9hZGVyLCA5KSxcbiAgICAgIGJ1bGxldDEwOiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDEwKSxcbiAgICAgIGJ1bGxldDExOiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDExKSxcbiAgICAgIGJ1bGxldDEyOiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDEyKSxcbiAgICAgIGJ1bGxldDEzOiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDEzKSxcbiAgICAgIGJ1bGxldDE0OiBuZXcgQnVsbGV0KHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLnNoaWZ0KCksIHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCwgdGhpcy5zdGF0ZS5sb2FkZXIsIDE0KVxuICAgIH0pXG5cblxuICB9XG5cbiAgb25SZWFkeSgpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwi55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcIik7XG5cbiAgICAvLyB3eC5nZXRMb2NhdGlvbih7XG4gICAgLy8gICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCLlnZDmoIfvvJpcIiwgcmVzKVxuICAgIC8vICAgfSAgICAgICAgIFxuICAgIC8vIH0pXG4gICAgXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHd4LmdldExvY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ3dnczg0JyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXRpdHVkZSA9IHJlcy5sYXRpdHVkZVxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZVxuICAgICAgICAgICAgICAgICAgICB2YXIgc3BlZWQgPSByZXMuc3BlZWRcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjY3VyYWN5ID0gcmVzLmFjY3VyYWN5XG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdldExvY2F0aW9uIHN1Y2Nlc3M6IFwiLCByZXMpOyAgIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXRMb2NhdGlvbiBjb21wbGV0ZTogXCIsIHJlcyk7IFxuICAgICAgICAgICAgdmFyIF9sYXRpdHVkZSA9IHJlcy5sYXRpdHVkZTtcbiAgICAgICAgICAgIHZhciBfbG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZTtcbiAgICAgICAgICAgIHFxbWFwc2RrLnJldmVyc2VHZW9jb2Rlcih7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXRpdHVkZTogX2xhdGl0dWRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogX2xvbmdpdHVkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXZlcnNlR2VvY29kZXIgc3VjY2VzczogXCIsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzTG9jYXRpb246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogZm9ybWF0TG9jYXRpb24oX2xvbmdpdHVkZSwgX2xhdGl0dWRlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uQWRkcmVzczogcmVzLnJlc3VsdC5hZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJldmVyc2VHZW9jb2RlciBmYWlsOiBcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmV2ZXJzZUdlb2NvZGVyIGNvbXBsZXRlOiBcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgXG4gICAgXG5cbiAgfVxuXG4gIG9uVXBkYXRlKHByb3BzKSB7XG4gIH1cblxuICBjaGFuZ2VJbmRpY2F0b3JEb3RzIChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbmRpY2F0b3JEb3RzOiAhdGhpcy5zdGF0ZS5pbmRpY2F0b3JEb3RzXG4gICAgfSlcbiAgfVxuXG4gIGNoYW5nZUF1dG9wbGF5biAoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYXV0b3BsYXk6ICF0aGlzLnN0YXRlLmF1dG9wbGF5XG4gICAgfSlcbiAgfVxuXG4gIGludGVydmFsQ2hhbmdlIChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnRlcnZhbDogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9XG5cbiAgZHVyYXRpb25DaGFuZ2UgKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGR1cmF0aW9uOiBlLmRldGFpbC52YWx1ZVxuICAgIH0pXG4gIH1cblxuICBjaG9vc2VMb2NhdGlvbigpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3guY2hvb3NlTG9jYXRpb24oe1xuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNob29zZUxvY2F0aW9uIHN1Y2Nlc3M6IFwiLCByZXMpO1xuICAgICAgICAvLyB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgLy8gICBoYXNMb2NhdGlvbjogdHJ1ZSxcbiAgICAgICAgLy8gICBsb2NhdGlvbjogZm9ybWF0TG9jYXRpb24ocmVzLmxvbmdpdHVkZSwgcmVzLmxhdGl0dWRlKSxcbiAgICAgICAgLy8gICBsb2NhdGlvbkFkZHJlc3M6IHJlcy5hZGRyZXNzXG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiEhIXRoYXQuc2V0U3RhdGU6IFwiLCB0aGF0LnN0YXRlKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjaG9vc2VMb2NhdGlvbiBjb21wbGV0ZTogXCIsIHJlcyk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIGhhc0xvY2F0aW9uOiB0cnVlLFxuICAgICAgICAgIGxvY2F0aW9uOiBmb3JtYXRMb2NhdGlvbihyZXMubG9uZ2l0dWRlLCByZXMubGF0aXR1ZGUpLFxuICAgICAgICAgIGxvY2F0aW9uQWRkcmVzczogcmVzLmFkZHJlc3NcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoe2hvbWV9KXtcbiAgcmV0dXJuIHtcbiAgICBob21lXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShIb21lKTtcbiJdfQ==
Page(_labrador._createPage(exports.default));
