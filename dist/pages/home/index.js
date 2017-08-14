"use strict";var exports=module.exports={};var global=window=require('../../npm/labrador/global.js');
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('../../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('../../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('../../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('../../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _labrador = require('../../npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

var _labradorRedux = require('../../npm/labrador-redux/index.js');

var _createApp = require('../../app/createApp.js');

var _dvaUtil = require('../../app/dva-util.js');

var _routerUtil = require('../../app/router-util.js');

var _routerUtil2 = _interopRequireDefault(_routerUtil);

var _common = require('../../utils/common.js');

var _bullet2 = require('../../components/bullet/bullet.js');

var _bullet3 = _interopRequireDefault(_bullet2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var util = require('../../utils/utils.js');
var formatLocation = util.formatLocation;

var array = _labrador.PropTypes.array,
    func = _labrador.PropTypes.func;

// class XXXBullet {
//   constructor(_bullet, _total, _magazine, _serial) {
//         this.bullet = _bullet;
//         this._speedSeed = 1.5;
//         this._delaySeed = 2333;
//         this.serial = _serial;
//         let that = this;
//         this.owner = _magazine;
//         this.text = _bullet.text;
//         this.color = null;
//         this.size = null;
//         this.direct = 0;
//         this.delay = 0;
//         this.speed = 0;
//         this.top = null;
//         this.left = null;
//         this.animation = wx.createAnimation();
//         this.ani = this.animation.export();
//         switch((""+_bullet.bore).length){
//             case 10:
//                 this.color = "#E3CC72";
//                 this.size = 20;
//                 this.speed = 22000/this._speedSeed;
//                 break;
//             case 9:
//                 this.color = "#EE6666";
//                 this.size = 18;
//                 this.speed = 23000/this._speedSeed;
//                 break;
//             case 8:
//                 this.color = "#6666EE";
//                 this.size = 18;
//                 this.speed = 24000/this._speedSeed;
//                 break;
//             case 7:
//                 this.color = "#F4607E";
//                 this.size = 16;
//                 this.speed = 25000/this._speedSeed;
//                 break;
//             case 6:
//                 this.color = "#EE66B8";
//                 this.size = 16;
//                 this.speed = 26000/this._speedSeed;
//                 break;
//             case 5:
//                 this.color = "#CC88CC";
//                 this.size = 14;
//                 this.speed = 27000/this._speedSeed;
//                 break;
//             case 4:
//                 this.color = "#82B2D2";
//                 this.size = 14;
//                 this.speed = 28000/this._speedSeed;
//                 break;
//             case 3:
//                 this.color = "#8FD87D";
//                 this.size = 12;
//                 this.speed = 29000/this._speedSeed;
//                 break;
//             case 2:
//                 this.color = "#AECC33";
//                 this.size = 12;
//                 this.speed = 30000/this._speedSeed;
//                 break;
//             case 1: 
//                 this.color = "#C1E8C1";
//                 this.size = 10;
//                 this.speed = 30000/this._speedSeed;    //31000/this._speedSeed;
//                 break;
//             case 0: 
//                 this.color = "#EEE4BB";
//                 this.size = 8;
//                 this.speed = 32000/this._speedSeed;
//                 break;
//             default:
//                 this.color = "#FF0000";
//                 this.size = 22;
//                 this.speed = 21000/this._speedSeed;
//         }
//         // let _tn = Math.round(Math.random()*12)*20;
//         // let _ln = Math.round(Math.random()*wx.getSystemInfoSync().windowWidth);
//         // this.top = 25 + _tn;
//         //this.left = wx.getSystemInfoSync().windowWidth+_ln*2;
//         // this.left = wx.getSystemInfoSync().windowWidth + !!this.text?this.text.length*this.size:0;
//         this.left = wx.getSystemInfoSync().windowWidth;

//         this.direct = this.left + (!!this.text?this.text.length*(this.size+4):0);
//         // let _direct = (!!this.text?this.text.length*(this.size+4):0);
//         this.delay = Math.round(Math.random()*_total);
//         this.size = 14;
//         console.log("Bullet's ______: ", this.text);
//         console.log("Bullet's ______INIT_____left/delay/len/direct/speed: ", this.left, this.delay*this._delaySeed, this.text.length, this.direct, this.speed);
//         // console.log("Bullet's ______INIT_____direct/speed: ", _direct, this.speed);
//         this.animation.translate(-1*Math.abs(this.direct), 0).step({duration: this.speed, delay: this.delay*this._delaySeed});
//         this.animation.translate(Math.abs(this.direct), 0).step({duration: 1});
//         this.ani = this.animation.export();

//         setTimeout(()=>{
//           this.owner.loadBullet(this.serial, this.bullet);
//         }, this.speed+2000+this.delay*this._delaySeed);
//   }
// }

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  // static propTypes = {
  // };

  function Home(props) {
    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

    var that = _this;
    console.log("++++++++:  ", that.props);
    _this.state = {
      clientInfo: _labrador2.default.getSystemInfoSync(),
      clientWidth: _labrador2.default.getSystemInfoSync().windowWidth,

      indicatorDots: false,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      hasLocation: false,
      locationAddress: "....",

      loadedBullets: [],
      loader: {
        loadBullet: function loadBullet(idx, bullet) {
          that.props.home.bullets.push(bullet);
        },
        shootBullet: function shootBullet() {},
        reload: function reload() {
          console.log("RELOAD");
        }
      }
    };
    return _this;
  }

  // children() {
  //   return {
  //     bulletList: this.props.home.loadedBullets.map((item) => {
  //       return {
  //         component: Bullet,
  //         key: item.id,
  //         props: {
  //           bullet: item,
  //           total: this.props.home.bullets.length,
  //           ballistic: item.ballistic,
  //           onEject: this.doEject
  //         }
  //       };
  //     })
  //   };
  // }

  // doShoot(){
  //   doAction('home','doShoot', {});
  //   console.log("DELAY AND SHOOT!!!: ", (1+Math.round(Math.random()*3))*1000);
  //   setTimeout(doShoot, (1+Math.round(Math.random()*10))*1000);
  // }

  (0, _createClass3.default)(Home, [{
    key: 'doEject',
    value: function doEject(_bullet) {
      (0, _dvaUtil.doAction)('home', 'doEject', { payload: { bullet: _bullet } });
    }
  }, {
    key: 'doShoot',
    value: function doShoot(_theShooter, _doAction) {
      if (_theShooter.length > 0) {
        var shtr = _theShooter.shift();

        arguments.callee();
      }
    }
  }, {
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
      this.setState({
        loadedBullets: that.props.home.loadedBullets
      }

      // this.doShoot();
      );(0, _dvaUtil.doAction)('home', 'doShoot', {});
      (0, _dvaUtil.doAction)('home', 'doShoot', {});
      (0, _dvaUtil.doAction)('home', 'doShoot', {});
      console.log("))))++++++:   ", that.props.home.loadedBullets);
      // doAction('home','doShoot', {});
      // doAction('home','doShoot', {});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlFRTWFwV1giLCJyZXF1aXJlIiwicXFtYXBzZGsiLCJ1dGlsIiwiZm9ybWF0TG9jYXRpb24iLCJhcnJheSIsImZ1bmMiLCJIb21lIiwicHJvcHMiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInN0YXRlIiwiY2xpZW50SW5mbyIsImdldFN5c3RlbUluZm9TeW5jIiwiY2xpZW50V2lkdGgiLCJ3aW5kb3dXaWR0aCIsImluZGljYXRvckRvdHMiLCJ2ZXJ0aWNhbCIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImhhc0xvY2F0aW9uIiwibG9jYXRpb25BZGRyZXNzIiwibG9hZGVkQnVsbGV0cyIsImxvYWRlciIsImxvYWRCdWxsZXQiLCJpZHgiLCJidWxsZXQiLCJob21lIiwiYnVsbGV0cyIsInB1c2giLCJzaG9vdEJ1bGxldCIsInJlbG9hZCIsIl9idWxsZXQiLCJwYXlsb2FkIiwiX3RoZVNob290ZXIiLCJfZG9BY3Rpb24iLCJsZW5ndGgiLCJzaHRyIiwic2hpZnQiLCJhcmd1bWVudHMiLCJjYWxsZWUiLCJrZXkiLCJzZXRTdGF0ZSIsImdldExvY2F0aW9uIiwidHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInNwZWVkIiwiYWNjdXJhY3kiLCJjb21wbGV0ZSIsIl9sYXRpdHVkZSIsIl9sb25naXR1ZGUiLCJyZXZlcnNlR2VvY29kZXIiLCJsb2NhdGlvbiIsInJlc3VsdCIsImFkZHJlc3MiLCJmYWlsIiwiZSIsImRldGFpbCIsInZhbHVlIiwiY2hvb3NlTG9jYXRpb24iLCJtYXBTdGF0ZVRvUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFDQSxJQUFJQSxVQUFVQyxRQUFRLG1DQUFSLENBQWQ7QUFDQSxJQUFJQyxRQUFKO0FBQ0EsSUFBSUMsT0FBT0YsUUFBUSxzQkFBUixDQUFYO0FBQ0EsSUFBSUcsaUJBQWlCRCxLQUFLQyxjQUExQjs7SUFFUUMsSyx1QkFBQUEsSztJQUFPQyxJLHVCQUFBQSxJOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRU1DLEk7OztBQUNKO0FBQ0E7O0FBRUEsZ0JBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQSxrSUFDVkEsS0FEVTs7QUFFaEIsUUFBSUMsWUFBSjtBQUNBQyxZQUFRQyxHQUFSLENBQVksYUFBWixFQUEyQkYsS0FBS0QsS0FBaEM7QUFDQSxVQUFLSSxLQUFMLEdBQWE7QUFDWEMsa0JBQVksbUJBQUdDLGlCQUFILEVBREQ7QUFFWEMsbUJBQWEsbUJBQUdELGlCQUFILEdBQXVCRSxXQUZ6Qjs7QUFJWEMscUJBQWUsS0FKSjtBQUtYQyxnQkFBVSxLQUxDO0FBTVhDLGdCQUFVLElBTkM7QUFPWEMsZ0JBQVUsSUFQQztBQVFYQyxnQkFBVSxHQVJDO0FBU1hDLG1CQUFhLEtBVEY7QUFVWEMsdUJBQWlCLE1BVk47O0FBWVhDLHFCQUFlLEVBWko7QUFhWEMsY0FBUTtBQUNOQyxvQkFBWSxvQkFBQ0MsR0FBRCxFQUFNQyxNQUFOLEVBQWlCO0FBQzNCbkIsZUFBS0QsS0FBTCxDQUFXcUIsSUFBWCxDQUFnQkMsT0FBaEIsQ0FBd0JDLElBQXhCLENBQTZCSCxNQUE3QjtBQUNELFNBSEs7QUFJTkkscUJBQWEsdUJBQU0sQ0FBRSxDQUpmO0FBS05DLGdCQUFRLGtCQUFNO0FBQ1p2QixrQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQVBLO0FBYkcsS0FBYjtBQUpnQjtBQTJCakI7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs0QkFFUXVCLE8sRUFBUTtBQUNkLDZCQUFTLE1BQVQsRUFBZ0IsU0FBaEIsRUFBMkIsRUFBQ0MsU0FBUyxFQUFDUCxRQUFRTSxPQUFULEVBQVYsRUFBM0I7QUFDRDs7OzRCQUVPRSxXLEVBQWFDLFMsRUFBVTtBQUM3QixVQUFHRCxZQUFZRSxNQUFaLEdBQW1CLENBQXRCLEVBQXdCO0FBQ3RCLFlBQUlDLE9BQU9ILFlBQVlJLEtBQVosRUFBWDs7QUFFQUMsa0JBQVVDLE1BQVY7QUFDRDtBQUNGOzs7NkJBRVE7QUFDTCxVQUFJakMsT0FBTyxJQUFYO0FBQ0FQLGlCQUFXLElBQUlGLE9BQUosQ0FBWTtBQUNuQjJDLGFBQUs7QUFEYyxPQUFaLENBQVg7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNGLDZCQUFTLE1BQVQsRUFBZ0IsYUFBaEIsRUFBOEIsRUFBOUI7QUFDQSxXQUFLQyxRQUFMLENBQWM7QUFDWnBCLHVCQUFlZixLQUFLRCxLQUFMLENBQVdxQixJQUFYLENBQWdCTDtBQURuQjs7QUFJZDtBQUpBLFFBS0EsdUJBQVMsTUFBVCxFQUFnQixTQUFoQixFQUEyQixFQUEzQjtBQUNBLDZCQUFTLE1BQVQsRUFBZ0IsU0FBaEIsRUFBMkIsRUFBM0I7QUFDQSw2QkFBUyxNQUFULEVBQWdCLFNBQWhCLEVBQTJCLEVBQTNCO0FBQ0FkLGNBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QkYsS0FBS0QsS0FBTCxDQUFXcUIsSUFBWCxDQUFnQkwsYUFBOUM7QUFDQTtBQUNBOztBQUdEOzs7OEJBRVM7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQUlmLE9BQU8sSUFBWDtBQUNBLHlCQUFHb0MsV0FBSCxDQUFlO0FBQ1hDLGNBQU0sT0FESztBQUVYQyxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ1gsY0FBSUMsV0FBV0QsSUFBSUMsUUFBbkI7QUFDQSxjQUFJQyxZQUFZRixJQUFJRSxTQUFwQjtBQUNBLGNBQUlDLFFBQVFILElBQUlHLEtBQWhCO0FBQ0EsY0FBSUMsV0FBV0osSUFBSUksUUFBbkI7QUFDRjtBQUNELFNBUkU7QUFTWEMsa0JBQVUsa0JBQVNMLEdBQVQsRUFBYTtBQUNuQjtBQUNBLGNBQUlNLFlBQVlOLElBQUlDLFFBQXBCO0FBQ0EsY0FBSU0sYUFBYVAsSUFBSUUsU0FBckI7QUFDQWhELG1CQUFTc0QsZUFBVCxDQUF5QjtBQUNyQkMsc0JBQVU7QUFDRVIsd0JBQVVLLFNBRFo7QUFFRUoseUJBQVdLO0FBRmIsYUFEVztBQUtyQlIscUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQnRDLHNCQUFRQyxHQUFSLENBQVksMkJBQVosRUFBeUNxQyxHQUF6QztBQUNBdkMsbUJBQUttQyxRQUFMLENBQWM7QUFDVnRCLDZCQUFhLElBREg7QUFFVm1DLDBCQUFVckQsZUFBZW1ELFVBQWYsRUFBMkJELFNBQTNCLENBRkE7QUFHVi9CLGlDQUFpQnlCLElBQUlVLE1BQUosQ0FBV0M7QUFIbEIsZUFBZDtBQUtILGFBWm9CO0FBYXJCQyxrQkFBTSxjQUFVWixHQUFWLEVBQWU7QUFDakJ0QyxzQkFBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDcUMsR0FBdEM7QUFDSCxhQWZvQjtBQWdCckJLLHNCQUFVLGtCQUFVTCxHQUFWLEVBQWU7QUFDckJ0QyxzQkFBUUMsR0FBUixDQUFZLDRCQUFaLEVBQTBDcUMsR0FBMUM7QUFDSDtBQWxCb0IsV0FBekI7QUFvQkg7QUFqQ1UsT0FBZjtBQXVDRDs7OzZCQUVReEMsSyxFQUFPLENBQ2Y7Ozt3Q0FFb0JxRCxDLEVBQUc7QUFDdEIsV0FBS2pCLFFBQUwsQ0FBYztBQUNaM0IsdUJBQWUsQ0FBQyxLQUFLTCxLQUFMLENBQVdLO0FBRGYsT0FBZDtBQUdEOzs7b0NBRWdCNEMsQyxFQUFHO0FBQ2xCLFdBQUtqQixRQUFMLENBQWM7QUFDWnpCLGtCQUFVLENBQUMsS0FBS1AsS0FBTCxDQUFXTztBQURWLE9BQWQ7QUFHRDs7O21DQUVlMEMsQyxFQUFHO0FBQ2pCLFdBQUtqQixRQUFMLENBQWM7QUFDWnhCLGtCQUFVeUMsRUFBRUMsTUFBRixDQUFTQztBQURQLE9BQWQ7QUFHRDs7O21DQUVlRixDLEVBQUc7QUFDakIsV0FBS2pCLFFBQUwsQ0FBYztBQUNadkIsa0JBQVV3QyxFQUFFQyxNQUFGLENBQVNDO0FBRFAsT0FBZDtBQUdEOzs7cUNBRWdCO0FBQ2YsVUFBSXRELE9BQU8sSUFBWDtBQUNBLHlCQUFHdUQsY0FBSCxDQUFrQjtBQUNoQmpCLGlCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJ0QyxrQkFBUUMsR0FBUixDQUFZLDBCQUFaLEVBQXdDcUMsR0FBeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxTQVRlO0FBVWhCSyxrQkFBVSxrQkFBU0wsR0FBVCxFQUFhO0FBQ3JCdEMsa0JBQVFDLEdBQVIsQ0FBWSwyQkFBWixFQUF5Q3FDLEdBQXpDO0FBQ0F2QyxlQUFLbUMsUUFBTCxDQUFjO0FBQ1p0Qix5QkFBYSxJQUREO0FBRVptQyxzQkFBVXJELGVBQWU0QyxJQUFJRSxTQUFuQixFQUE4QkYsSUFBSUMsUUFBbEMsQ0FGRTtBQUdaMUIsNkJBQWlCeUIsSUFBSVc7QUFIVCxXQUFkO0FBS0Q7QUFqQmUsT0FBbEI7QUFtQkQ7Ozs7O0FBSUgsU0FBU00sZUFBVCxPQUFnQztBQUFBLE1BQU5wQyxJQUFNLFFBQU5BLElBQU07O0FBQzlCLFNBQU87QUFDTEE7QUFESyxHQUFQO0FBR0Q7O2tCQUVjLDRCQUFRb0MsZUFBUixFQUF5QjFELElBQXpCLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3eCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ2xhYnJhZG9yJztcbmltcG9ydCB7IGNvbm5lY3QsIGdldFN0b3JlfSBmcm9tICdsYWJyYWRvci1yZWR1eCc7XG5pbXBvcnQgeyB3eEdldEFwcCB9IGZyb20gJy4uLy4uL2FwcC9jcmVhdGVBcHAnO1xuaW1wb3J0IHsgZG9BY3Rpb24sIGdldFN0YXRlIH0gZnJvbSAnLi4vLi4vYXBwL2R2YS11dGlsJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi4vLi4vYXBwL3JvdXRlci11dGlsJztcbmltcG9ydCB7IHNob3dUb2FzdE1lc3NhZ2UgfSBmcm9tICcuLi8uLi91dGlscy9jb21tb24nO1xuaW1wb3J0IEJ1bGxldCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2J1bGxldC9idWxsZXQnO1xudmFyIFFRTWFwV1ggPSByZXF1aXJlKCcuLi8uLi91dGlscy9xcW1hcC13eC1qc3Nkay5taW4uanMnKTtcbnZhciBxcW1hcHNkaztcbnZhciB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbHMuanMnKTtcbnZhciBmb3JtYXRMb2NhdGlvbiA9IHV0aWwuZm9ybWF0TG9jYXRpb25cblxuY29uc3QgeyBhcnJheSwgZnVuYyB9ID0gUHJvcFR5cGVzO1xuXG4vLyBjbGFzcyBYWFhCdWxsZXQge1xuLy8gICBjb25zdHJ1Y3RvcihfYnVsbGV0LCBfdG90YWwsIF9tYWdhemluZSwgX3NlcmlhbCkge1xuLy8gICAgICAgICB0aGlzLmJ1bGxldCA9IF9idWxsZXQ7XG4vLyAgICAgICAgIHRoaXMuX3NwZWVkU2VlZCA9IDEuNTtcbi8vICAgICAgICAgdGhpcy5fZGVsYXlTZWVkID0gMjMzMztcbi8vICAgICAgICAgdGhpcy5zZXJpYWwgPSBfc2VyaWFsO1xuLy8gICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4vLyAgICAgICAgIHRoaXMub3duZXIgPSBfbWFnYXppbmU7XG4vLyAgICAgICAgIHRoaXMudGV4dCA9IF9idWxsZXQudGV4dDtcbi8vICAgICAgICAgdGhpcy5jb2xvciA9IG51bGw7XG4vLyAgICAgICAgIHRoaXMuc2l6ZSA9IG51bGw7XG4vLyAgICAgICAgIHRoaXMuZGlyZWN0ID0gMDtcbi8vICAgICAgICAgdGhpcy5kZWxheSA9IDA7XG4vLyAgICAgICAgIHRoaXMuc3BlZWQgPSAwO1xuLy8gICAgICAgICB0aGlzLnRvcCA9IG51bGw7XG4vLyAgICAgICAgIHRoaXMubGVmdCA9IG51bGw7XG4vLyAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKCk7XG4vLyAgICAgICAgIHRoaXMuYW5pID0gdGhpcy5hbmltYXRpb24uZXhwb3J0KCk7XG4vLyAgICAgICAgIHN3aXRjaCgoXCJcIitfYnVsbGV0LmJvcmUpLmxlbmd0aCl7XG4vLyAgICAgICAgICAgICBjYXNlIDEwOlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNFM0NDNzJcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAyMDtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjIwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgY2FzZSA5OlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNFRTY2NjZcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxODtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjMwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgY2FzZSA4OlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiM2NjY2RUVcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxODtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjQwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgY2FzZSA3OlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNGNDYwN0VcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxNjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjUwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgY2FzZSA2OlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNFRTY2QjhcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxNjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjYwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgY2FzZSA1OlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNDQzg4Q0NcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxNDtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjcwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgY2FzZSA0OlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiM4MkIyRDJcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxNDtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjgwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgY2FzZSAzOlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiM4RkQ4N0RcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxMjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjkwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgY2FzZSAyOlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNBRUNDMzNcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxMjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMzAwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICAgICAgY2FzZSAxOiBcbi8vICAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjQzFFOEMxXCI7XG4vLyAgICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMTA7XG4vLyAgICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDMwMDAwL3RoaXMuX3NwZWVkU2VlZDsgICAgLy8zMTAwMC90aGlzLl9zcGVlZFNlZWQ7XG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgICAgICBjYXNlIDA6IFxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNFRUU0QkJcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSA4O1xuLy8gICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAzMjAwMC90aGlzLl9zcGVlZFNlZWQ7XG4vLyAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgICAgICBkZWZhdWx0OlxuLy8gICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNGRjAwMDBcIjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAyMjtcbi8vICAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjEwMDAvdGhpcy5fc3BlZWRTZWVkO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIC8vIGxldCBfdG4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMTIpKjIwO1xuLy8gICAgICAgICAvLyBsZXQgX2xuID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKnd4LmdldFN5c3RlbUluZm9TeW5jKCkud2luZG93V2lkdGgpO1xuLy8gICAgICAgICAvLyB0aGlzLnRvcCA9IDI1ICsgX3RuO1xuLy8gICAgICAgICAvL3RoaXMubGVmdCA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkud2luZG93V2lkdGgrX2xuKjI7XG4vLyAgICAgICAgIC8vIHRoaXMubGVmdCA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkud2luZG93V2lkdGggKyAhIXRoaXMudGV4dD90aGlzLnRleHQubGVuZ3RoKnRoaXMuc2l6ZTowO1xuLy8gICAgICAgICB0aGlzLmxlZnQgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLndpbmRvd1dpZHRoO1xuXG4vLyAgICAgICAgIHRoaXMuZGlyZWN0ID0gdGhpcy5sZWZ0ICsgKCEhdGhpcy50ZXh0P3RoaXMudGV4dC5sZW5ndGgqKHRoaXMuc2l6ZSs0KTowKTtcbi8vICAgICAgICAgLy8gbGV0IF9kaXJlY3QgPSAoISF0aGlzLnRleHQ/dGhpcy50ZXh0Lmxlbmd0aCoodGhpcy5zaXplKzQpOjApO1xuLy8gICAgICAgICB0aGlzLmRlbGF5ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKl90b3RhbCk7XG4vLyAgICAgICAgIHRoaXMuc2l6ZSA9IDE0O1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkJ1bGxldCdzIF9fX19fXzogXCIsIHRoaXMudGV4dCk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0J3MgX19fX19fSU5JVF9fX19fbGVmdC9kZWxheS9sZW4vZGlyZWN0L3NwZWVkOiBcIiwgdGhpcy5sZWZ0LCB0aGlzLmRlbGF5KnRoaXMuX2RlbGF5U2VlZCwgdGhpcy50ZXh0Lmxlbmd0aCwgdGhpcy5kaXJlY3QsIHRoaXMuc3BlZWQpO1xuLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkJ1bGxldCdzIF9fX19fX0lOSVRfX19fX2RpcmVjdC9zcGVlZDogXCIsIF9kaXJlY3QsIHRoaXMuc3BlZWQpO1xuLy8gICAgICAgICB0aGlzLmFuaW1hdGlvbi50cmFuc2xhdGUoLTEqTWF0aC5hYnModGhpcy5kaXJlY3QpLCAwKS5zdGVwKHtkdXJhdGlvbjogdGhpcy5zcGVlZCwgZGVsYXk6IHRoaXMuZGVsYXkqdGhpcy5fZGVsYXlTZWVkfSk7XG4vLyAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnRyYW5zbGF0ZShNYXRoLmFicyh0aGlzLmRpcmVjdCksIDApLnN0ZXAoe2R1cmF0aW9uOiAxfSk7XG4vLyAgICAgICAgIHRoaXMuYW5pID0gdGhpcy5hbmltYXRpb24uZXhwb3J0KCk7XG5cbi8vICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuLy8gICAgICAgICAgIHRoaXMub3duZXIubG9hZEJ1bGxldCh0aGlzLnNlcmlhbCwgdGhpcy5idWxsZXQpO1xuLy8gICAgICAgICB9LCB0aGlzLnNwZWVkKzIwMDArdGhpcy5kZWxheSp0aGlzLl9kZWxheVNlZWQpO1xuLy8gICB9XG4vLyB9XG5cbmNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvLyBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAvLyB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnNvbGUubG9nKFwiKysrKysrKys6ICBcIiwgdGhhdC5wcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNsaWVudEluZm86IHd4LmdldFN5c3RlbUluZm9TeW5jKCksXG4gICAgICBjbGllbnRXaWR0aDogd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aCxcbiAgICAgIFxuICAgICAgaW5kaWNhdG9yRG90czogZmFsc2UsXG4gICAgICB2ZXJ0aWNhbDogZmFsc2UsXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgIGludGVydmFsOiAyMDAwLFxuICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgIGhhc0xvY2F0aW9uOiBmYWxzZSxcbiAgICAgIGxvY2F0aW9uQWRkcmVzczogXCIuLi4uXCIsXG5cbiAgICAgIGxvYWRlZEJ1bGxldHM6IFtdLFxuICAgICAgbG9hZGVyOiB7XG4gICAgICAgIGxvYWRCdWxsZXQ6IChpZHgsIGJ1bGxldCkgPT4ge1xuICAgICAgICAgIHRoYXQucHJvcHMuaG9tZS5idWxsZXRzLnB1c2goYnVsbGV0KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2hvb3RCdWxsZXQ6ICgpID0+IHt9LFxuICAgICAgICByZWxvYWQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFTE9BRFwiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIGNoaWxkcmVuKCkge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICBidWxsZXRMaXN0OiB0aGlzLnByb3BzLmhvbWUubG9hZGVkQnVsbGV0cy5tYXAoKGl0ZW0pID0+IHtcbiAgLy8gICAgICAgcmV0dXJuIHtcbiAgLy8gICAgICAgICBjb21wb25lbnQ6IEJ1bGxldCxcbiAgLy8gICAgICAgICBrZXk6IGl0ZW0uaWQsXG4gIC8vICAgICAgICAgcHJvcHM6IHtcbiAgLy8gICAgICAgICAgIGJ1bGxldDogaXRlbSxcbiAgLy8gICAgICAgICAgIHRvdGFsOiB0aGlzLnByb3BzLmhvbWUuYnVsbGV0cy5sZW5ndGgsXG4gIC8vICAgICAgICAgICBiYWxsaXN0aWM6IGl0ZW0uYmFsbGlzdGljLFxuICAvLyAgICAgICAgICAgb25FamVjdDogdGhpcy5kb0VqZWN0XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9O1xuICAvLyAgICAgfSlcbiAgLy8gICB9O1xuICAvLyB9XG5cbiAgLy8gZG9TaG9vdCgpe1xuICAvLyAgIGRvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9KTtcbiAgLy8gICBjb25zb2xlLmxvZyhcIkRFTEFZIEFORCBTSE9PVCEhITogXCIsICgxK01hdGgucm91bmQoTWF0aC5yYW5kb20oKSozKSkqMTAwMCk7XG4gIC8vICAgc2V0VGltZW91dChkb1Nob290LCAoMStNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMTApKSoxMDAwKTtcbiAgLy8gfVxuXG4gIGRvRWplY3QoX2J1bGxldCl7XG4gICAgZG9BY3Rpb24oJ2hvbWUnLCdkb0VqZWN0Jywge3BheWxvYWQ6IHtidWxsZXQ6IF9idWxsZXR9fSk7XG4gIH1cblxuICBkb1Nob290KF90aGVTaG9vdGVyLCBfZG9BY3Rpb24pe1xuICAgIGlmKF90aGVTaG9vdGVyLmxlbmd0aD4wKXtcbiAgICAgIGxldCBzaHRyID0gX3RoZVNob290ZXIuc2hpZnQoKTtcbiAgICAgIFxuICAgICAgYXJndW1lbnRzLmNhbGxlZSgpXG4gICAgfVxuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgcXFtYXBzZGsgPSBuZXcgUVFNYXBXWCh7XG4gICAgICAgICAga2V5OiAnVTJHQlotUVdTUk8tWUNOV1gtU0lDRkgtR0wyR08tQ1hGV0UnXG4gICAgICB9KTtcbiAgICAgIC8vIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIC8vICAgbGV0IG1hZ3MgPSB7Li4udGhpcy5zdGF0ZS5tYWdhemluZX07XG4gICAgICAvLyAgIGxldCBibHRzID0gey4uLnRoaXMuc3RhdGUubWFnYXppbmUuYnVsbGV0c307XG4gICAgICAvLyAgIGZvcihsZXQgaT0wOyBpPGJsdHMubGVuZ3RoOyBpKyspe1xuICAgICAgLy8gICAgIC8vYmx0c1tpXS5hbmltYXRpb24udHJhbnNsYXRlKDEwMDApLnN0ZXAoe2R1cmF0aW9uOiAxfSkudHJhbnNsYXRlKC0xNTAwLCAwKS5zdGVwKHtkdXJhdGlvbjogODAwMH0pO1xuICAgICAgLy8gICAgIGJsdHNbaV0uYW5pID0gYmx0c1tpXS5hbmltYXRpb24uZXhwb3J0KCk7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgbWFncy5idWxsZXRzID0gYmx0cztcbiAgICAgIC8vICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAvLyAgICAgbWFnYXppbmU6IG1hZ3NcbiAgICAgIC8vICAgfSk7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKFwiZXhwb3J0ZWR+fn5+XCIpO1xuICAgICAgLy8gfSwgMzAwMCk7XG4gICAgZG9BY3Rpb24oJ2hvbWUnLCdsb2FkQnVsbGV0cycse30pO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbG9hZGVkQnVsbGV0czogdGhhdC5wcm9wcy5ob21lLmxvYWRlZEJ1bGxldHNcbiAgICB9KVxuXG4gICAgLy8gdGhpcy5kb1Nob290KCk7XG4gICAgZG9BY3Rpb24oJ2hvbWUnLCdkb1Nob290Jywge30pO1xuICAgIGRvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9KTtcbiAgICBkb0FjdGlvbignaG9tZScsJ2RvU2hvb3QnLCB7fSk7XG4gICAgY29uc29sZS5sb2coXCIpKSkpKysrKysrOiAgIFwiLCB0aGF0LnByb3BzLmhvbWUubG9hZGVkQnVsbGV0cyk7XG4gICAgLy8gZG9BY3Rpb24oJ2hvbWUnLCdkb1Nob290Jywge30pO1xuICAgIC8vIGRvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9KTtcblxuXG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIC8vY29uc29sZS5sb2coXCLnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFwiKTtcblxuICAgIC8vIHd4LmdldExvY2F0aW9uKHtcbiAgICAvLyAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWdkOagh++8mlwiLCByZXMpXG4gICAgLy8gICB9ICAgICAgICAgXG4gICAgLy8gfSlcbiAgICBcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgICB0eXBlOiAnd2dzODQnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdGl0dWRlID0gcmVzLmxhdGl0dWRlXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb25naXR1ZGUgPSByZXMubG9uZ2l0dWRlXG4gICAgICAgICAgICAgICAgICAgIHZhciBzcGVlZCA9IHJlcy5zcGVlZFxuICAgICAgICAgICAgICAgICAgICB2YXIgYWNjdXJhY3kgPSByZXMuYWNjdXJhY3lcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2V0TG9jYXRpb24gc3VjY2VzczogXCIsIHJlcyk7ICAgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdldExvY2F0aW9uIGNvbXBsZXRlOiBcIiwgcmVzKTsgXG4gICAgICAgICAgICB2YXIgX2xhdGl0dWRlID0gcmVzLmxhdGl0dWRlO1xuICAgICAgICAgICAgdmFyIF9sb25naXR1ZGUgPSByZXMubG9uZ2l0dWRlO1xuICAgICAgICAgICAgcXFtYXBzZGsucmV2ZXJzZUdlb2NvZGVyKHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBfbGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBfbG9uZ2l0dWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJldmVyc2VHZW9jb2RlciBzdWNjZXNzOiBcIiwgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNMb2NhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBmb3JtYXRMb2NhdGlvbihfbG9uZ2l0dWRlLCBfbGF0aXR1ZGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25BZGRyZXNzOiByZXMucmVzdWx0LmFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmV2ZXJzZUdlb2NvZGVyIGZhaWw6IFwiLCByZXMpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXZlcnNlR2VvY29kZXIgY29tcGxldGU6IFwiLCByZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBcbiAgICBcblxuICB9XG5cbiAgb25VcGRhdGUocHJvcHMpIHtcbiAgfVxuXG4gIGNoYW5nZUluZGljYXRvckRvdHMgKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGluZGljYXRvckRvdHM6ICF0aGlzLnN0YXRlLmluZGljYXRvckRvdHNcbiAgICB9KVxuICB9XG5cbiAgY2hhbmdlQXV0b3BsYXluIChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBhdXRvcGxheTogIXRoaXMuc3RhdGUuYXV0b3BsYXlcbiAgICB9KVxuICB9XG5cbiAgaW50ZXJ2YWxDaGFuZ2UgKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGludGVydmFsOiBlLmRldGFpbC52YWx1ZVxuICAgIH0pXG4gIH1cblxuICBkdXJhdGlvbkNoYW5nZSAoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHVyYXRpb246IGUuZGV0YWlsLnZhbHVlXG4gICAgfSlcbiAgfVxuXG4gIGNob29zZUxvY2F0aW9uKCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB3eC5jaG9vc2VMb2NhdGlvbih7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2hvb3NlTG9jYXRpb24gc3VjY2VzczogXCIsIHJlcyk7XG4gICAgICAgIC8vIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAvLyAgIGhhc0xvY2F0aW9uOiB0cnVlLFxuICAgICAgICAvLyAgIGxvY2F0aW9uOiBmb3JtYXRMb2NhdGlvbihyZXMubG9uZ2l0dWRlLCByZXMubGF0aXR1ZGUpLFxuICAgICAgICAvLyAgIGxvY2F0aW9uQWRkcmVzczogcmVzLmFkZHJlc3NcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiISEhdGhhdC5zZXRTdGF0ZTogXCIsIHRoYXQuc3RhdGUpO1xuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImNob29zZUxvY2F0aW9uIGNvbXBsZXRlOiBcIiwgcmVzKTtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZSh7XG4gICAgICAgICAgaGFzTG9jYXRpb246IHRydWUsXG4gICAgICAgICAgbG9jYXRpb246IGZvcm1hdExvY2F0aW9uKHJlcy5sb25naXR1ZGUsIHJlcy5sYXRpdHVkZSksXG4gICAgICAgICAgbG9jYXRpb25BZGRyZXNzOiByZXMuYWRkcmVzc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyh7aG9tZX0pe1xuICByZXR1cm4ge1xuICAgIGhvbWVcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKEhvbWUpO1xuIl19
Page(_labrador._createPage(exports.default));
