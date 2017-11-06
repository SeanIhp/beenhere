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

var _bullet = require('../../components/bullet/bullet.js');

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var util = require('../../utils/utils.js');
var formatLocation = util.formatLocation;

var array = _labrador.PropTypes.array,
    func = _labrador.PropTypes.func;

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

  // doEject(_bullet){
  //   doAction('home','doEject', {payload: {bullet: _bullet}});
  // }


  (0, _createClass3.default)(Home, [{
    key: 'onLoad',
    value: function onLoad() {
      var that = this;
      qqmapsdk = new QQMapWX({
        key: 'U2GBZ-QWSRO-YCNWX-SICFH-GL2GO-CXFWE'
      });
      (0, _dvaUtil.doAction)('home', 'loadBullets', {});
      this.setState({
        loadedBullets: that.props.home.loadedBullets
      });

      // this.doShoot();

      var dSeed = 3000;
      (0, _dvaUtil.doAction)('home', 'doShoot', {});
      // setTimeout(function(){doAction('home','doShoot', {} );}, 1*dSeed);
      // setTimeout(function(){doAction('home','doShoot', {} );}, 2*dSeed);
      // setTimeout(function(){doAction('home','doShoot', {} );}, 3*dSeed);
      // setTimeout(function(){doAction('home','doShoot', {} );}, 4*dSeed);
      // setTimeout(function(){doAction('home','doShoot', {} );}, 5*dSeed);
      // setTimeout(function(){doAction('home','doShoot', {} );}, 6*dSeed);
      // setTimeout(function(){doAction('home','doShoot', {} );}, 7*dSeed);
      // setTimeout(function(){doAction('home','doShoot', {} );}, 8*dSeed);
      // setTimeout(function(){doAction('home','doShoot', {} );}, 9*dSeed);
      // doAction('home','doShoot', {});
      // doAction('home','doShoot', {});

      // doShoot(that.props.home.shooters, that.props.home.ballistics, doAction);
      doShoot(that.props.home.shooters, that.props.home.loadedBullets, that.props.home.ballistics, _dvaUtil.doAction);
      // doEject(that.props.home.ejecters, doAction);
      // doShoot(that.props.home.ballistics, that.props.home.shooters, doAction);
      doEject(that.props.home.ballistics, that.props.home.ejecters, _dvaUtil.doAction);
      doClear(that.props.home.ballistics, _dvaUtil.doAction);

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
      // wx.getLocation({
      //     type: 'wgs84',
      //     success: function(res) {
      //                 var latitude = res.latitude
      //                 var longitude = res.longitude
      //                 var speed = res.speed
      //                 var accuracy = res.accuracy
      //               // console.log("getLocation success: ", res);   
      //             },
      //     complete: function(res){
      //         // console.log("getLocation complete: ", res); 
      //         var _latitude = res.latitude;
      //         var _longitude = res.longitude;
      //         qqmapsdk.reverseGeocoder({
      //             location: {
      //                         latitude: _latitude,
      //                         longitude: _longitude
      //                       },
      //             success: function (res) {
      //                 console.log("reverseGeocoder success: ", res);
      //                 that.setState({
      //                     hasLocation: true,
      //                     location: formatLocation(_longitude, _latitude),
      //                     locationAddress: res.result.address
      //                 });
      //             },
      //             fail: function (res) {
      //                 console.log("reverseGeocoder fail: ", res);
      //             },
      //             complete: function (res) {
      //                 console.log("reverseGeocoder complete: ", res);
      //             }
      //         });
      //     }
      // });

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
//loadedBullets

function doShoot(_theShooters, _loadedBullets, _ballistics, _doAction) {
  var _now = new Date().getTime();
  if (_theShooters.length > 1) {
    // let emptyBis = 0;
    // for(let i=0; i<_ballistics.length; i++){
    //   if(_ballistics[i].empty){
    //     emptyBis++;
    //   }
    // }
    // console.log("#####?????????????? emptyBis/_ballistics.lengt: ", emptyBis/_ballistics.length, emptyBis);
    // if(emptyBis/_ballistics.length<0.7){
    if (_loadedBullets.length < _ballistics.length * 5) {
      var shtr = _theShooters[0];
      _doAction('home', 'doShoot', { shootBullet: shtr });
    }
    setTimeout(function () {
      doShoot(_theShooters, _loadedBullets, _ballistics, _doAction);
    }, !!_theShooters[1] ? _theShooters[1].fire_delay : 1000);
  } else {
    setTimeout(function () {
      doShoot(_theShooters, _loadedBullets, _ballistics, _doAction);
    }, 7000);
  }
}

// function doEject(_theEjecters, _doAction){
//   let _now = new Date().getTime(); 
//   if(_theEjecters.length>0){
//     let ejtr = _theEjecters[0];
//     console.log("### doEject: ", ejtr);
//     _doAction('home','doEject', {ejectBullet: ejtr});
//     setTimeout(function(){doEject(_theEjecters, _doAction);}, 5000);
//   }else{
//     setTimeout(function(){doEject(_theEjecters, _doAction);}, 5000);
//   }    
// }

// function doShoot(_theBallistics, _theShooters, _doAction){
//   let _now = new Date().getTime(); 
//   var _empties = [];
//   for(var i=0; i<_theBallistics; i++){
//     if(_theBallistics[i].onTimes!=-1 && (_theBallistics[i].onTimes+_theBallistics[i].delay)<_now) {
//       _empties.push(_theBallistics[i]);
//     }
//   }
//   if(_empties.length>0 && _theShooters.length>0){
//     let shtr = _theShooters[0];
//     _doAction('home','doShoot', {shootBullet: shtr});
//     setTimeout(function(){doShoot(_theBallistics, _theShooters, _doAction);}, 500);
//   }else{
//     setTimeout(function(){doShoot(_theBallistics, _theShooters, _doAction);}, 500);
//   }
// }

function doEject(_theBallistics, _theEjecters, _doAction) {
  var _now = new Date().getTime();
  var _fills = [];
  for (var i = 0; i < _theBallistics.length; i++) {
    if (_theBallistics[i].onTimes != -1 && _theBallistics[i].onTimes + _theBallistics[i].clearDelay < _now) {
      _fills.push(_theBallistics[i]);
      break;
    }
  }
  console.log("### doEject:!!!!!!!!!!!!!!!!!!!!!---", _fills.length, _theEjecters.length);
  if (_fills.length > 0 && _theEjecters.length > 2) {
    var ejtr = _theEjecters[0];
    // console.log("### doEject: ", ejtr);
    _doAction('home', 'doEject', { ejectBullet: ejtr });
    setTimeout(function () {
      doEject(_theBallistics, _theEjecters, _doAction);
    }, _theEjecters[1].eject_delay);
  } else {
    setTimeout(function () {
      doEject(_theBallistics, _theEjecters, _doAction);
    }, 700);
  }
}

function doClear(_theBallistics, _doAction) {
  _doAction('home', 'doClear', {});
  setTimeout(function () {
    doClear(_theBallistics, _doAction);
  }, 500);
}

function mapStateToProps(_ref) {
  var home = _ref.home;

  return {
    home: home
  };
}

exports.default = (0, _labradorRedux.connect)(mapStateToProps)(Home);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlFRTWFwV1giLCJyZXF1aXJlIiwicXFtYXBzZGsiLCJ1dGlsIiwiZm9ybWF0TG9jYXRpb24iLCJhcnJheSIsImZ1bmMiLCJIb21lIiwicHJvcHMiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInN0YXRlIiwiY2xpZW50SW5mbyIsImdldFN5c3RlbUluZm9TeW5jIiwiY2xpZW50V2lkdGgiLCJ3aW5kb3dXaWR0aCIsImluZGljYXRvckRvdHMiLCJ2ZXJ0aWNhbCIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImhhc0xvY2F0aW9uIiwibG9jYXRpb25BZGRyZXNzIiwibG9hZGVkQnVsbGV0cyIsImxvYWRlciIsImxvYWRCdWxsZXQiLCJpZHgiLCJidWxsZXQiLCJob21lIiwiYnVsbGV0cyIsInB1c2giLCJzaG9vdEJ1bGxldCIsInJlbG9hZCIsImtleSIsInNldFN0YXRlIiwiZFNlZWQiLCJkb1Nob290Iiwic2hvb3RlcnMiLCJiYWxsaXN0aWNzIiwiZG9FamVjdCIsImVqZWN0ZXJzIiwiZG9DbGVhciIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImNob29zZUxvY2F0aW9uIiwic3VjY2VzcyIsInJlcyIsImNvbXBsZXRlIiwibG9jYXRpb24iLCJsb25naXR1ZGUiLCJsYXRpdHVkZSIsImFkZHJlc3MiLCJfdGhlU2hvb3RlcnMiLCJfbG9hZGVkQnVsbGV0cyIsIl9iYWxsaXN0aWNzIiwiX2RvQWN0aW9uIiwiX25vdyIsIkRhdGUiLCJnZXRUaW1lIiwibGVuZ3RoIiwic2h0ciIsInNldFRpbWVvdXQiLCJmaXJlX2RlbGF5IiwiX3RoZUJhbGxpc3RpY3MiLCJfdGhlRWplY3RlcnMiLCJfZmlsbHMiLCJpIiwib25UaW1lcyIsImNsZWFyRGVsYXkiLCJlanRyIiwiZWplY3RCdWxsZXQiLCJlamVjdF9kZWxheSIsIm1hcFN0YXRlVG9Qcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFB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Q29udGVudCI6WyJpbXBvcnQgd3gsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdsYWJyYWRvcic7XG5pbXBvcnQgeyBjb25uZWN0LCBnZXRTdG9yZX0gZnJvbSAnbGFicmFkb3ItcmVkdXgnO1xuaW1wb3J0IHsgd3hHZXRBcHAgfSBmcm9tICcuLi8uLi9hcHAvY3JlYXRlQXBwJztcbmltcG9ydCB7IGRvQWN0aW9uLCBnZXRTdGF0ZSB9IGZyb20gJy4uLy4uL2FwcC9kdmEtdXRpbCc7XG5pbXBvcnQgUm91dGVyIGZyb20gJy4uLy4uL2FwcC9yb3V0ZXItdXRpbCc7XG5pbXBvcnQgeyBzaG93VG9hc3RNZXNzYWdlIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uJztcbmltcG9ydCBCdWxsZXQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idWxsZXQvYnVsbGV0JztcbnZhciBRUU1hcFdYID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvcXFtYXAtd3gtanNzZGsubWluLmpzJyk7XG52YXIgcXFtYXBzZGs7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzLmpzJyk7XG52YXIgZm9ybWF0TG9jYXRpb24gPSB1dGlsLmZvcm1hdExvY2F0aW9uXG5cbmNvbnN0IHsgYXJyYXksIGZ1bmMgfSA9IFByb3BUeXBlcztcblxuY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8vIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gIC8vIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgY29uc29sZS5sb2coXCIrKysrKysrKzogIFwiLCB0aGF0LnByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY2xpZW50SW5mbzogd3guZ2V0U3lzdGVtSW5mb1N5bmMoKSxcbiAgICAgIGNsaWVudFdpZHRoOiB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLndpbmRvd1dpZHRoLFxuICAgICAgXG4gICAgICBpbmRpY2F0b3JEb3RzOiBmYWxzZSxcbiAgICAgIHZlcnRpY2FsOiBmYWxzZSxcbiAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgaW50ZXJ2YWw6IDIwMDAsXG4gICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgaGFzTG9jYXRpb246IGZhbHNlLFxuICAgICAgbG9jYXRpb25BZGRyZXNzOiBcIi4uLi5cIixcblxuICAgICAgbG9hZGVkQnVsbGV0czogW10sXG4gICAgICBsb2FkZXI6IHtcbiAgICAgICAgbG9hZEJ1bGxldDogKGlkeCwgYnVsbGV0KSA9PiB7XG4gICAgICAgICAgdGhhdC5wcm9wcy5ob21lLmJ1bGxldHMucHVzaChidWxsZXQpO1xuICAgICAgICB9LFxuICAgICAgICBzaG9vdEJ1bGxldDogKCkgPT4ge30sXG4gICAgICAgIHJlbG9hZDogKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVMT0FEXCIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gY2hpbGRyZW4oKSB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIGJ1bGxldExpc3Q6IHRoaXMucHJvcHMuaG9tZS5sb2FkZWRCdWxsZXRzLm1hcCgoaXRlbSkgPT4ge1xuICAvLyAgICAgICByZXR1cm4ge1xuICAvLyAgICAgICAgIGNvbXBvbmVudDogQnVsbGV0LFxuICAvLyAgICAgICAgIGtleTogaXRlbS5pZCxcbiAgLy8gICAgICAgICBwcm9wczoge1xuICAvLyAgICAgICAgICAgYnVsbGV0OiBpdGVtLFxuICAvLyAgICAgICAgICAgdG90YWw6IHRoaXMucHJvcHMuaG9tZS5idWxsZXRzLmxlbmd0aCxcbiAgLy8gICAgICAgICAgIGJhbGxpc3RpYzogaXRlbS5iYWxsaXN0aWMsXG4gIC8vICAgICAgICAgICBvbkVqZWN0OiB0aGlzLmRvRWplY3RcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH07XG4gIC8vICAgICB9KVxuICAvLyAgIH07XG4gIC8vIH1cblxuICAvLyBkb1Nob290KCl7XG4gIC8vICAgZG9BY3Rpb24oJ2hvbWUnLCdkb1Nob290Jywge30pO1xuICAvLyAgIGNvbnNvbGUubG9nKFwiREVMQVkgQU5EIFNIT09UISEhOiBcIiwgKDErTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjMpKSoxMDAwKTtcbiAgLy8gICBzZXRUaW1lb3V0KGRvU2hvb3QsICgxK01hdGgucm91bmQoTWF0aC5yYW5kb20oKSoxMCkpKjEwMDApO1xuICAvLyB9XG5cbiAgLy8gZG9FamVjdChfYnVsbGV0KXtcbiAgLy8gICBkb0FjdGlvbignaG9tZScsJ2RvRWplY3QnLCB7cGF5bG9hZDoge2J1bGxldDogX2J1bGxldH19KTtcbiAgLy8gfVxuXG5cbiAgb25Mb2FkKCkge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgcXFtYXBzZGsgPSBuZXcgUVFNYXBXWCh7XG4gICAgICAgICAga2V5OiAnVTJHQlotUVdTUk8tWUNOV1gtU0lDRkgtR0wyR08tQ1hGV0UnXG4gICAgICB9KTtcbiAgICBkb0FjdGlvbignaG9tZScsJ2xvYWRCdWxsZXRzJyx7fSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsb2FkZWRCdWxsZXRzOiB0aGF0LnByb3BzLmhvbWUubG9hZGVkQnVsbGV0c1xuICAgIH0pXG5cbiAgICAvLyB0aGlzLmRvU2hvb3QoKTtcbiAgICBcbiAgICBsZXQgZFNlZWQgPSAzMDAwO1xuICAgIGRvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7XG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe2RvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7fSwgMSpkU2VlZCk7XG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe2RvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7fSwgMipkU2VlZCk7XG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe2RvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7fSwgMypkU2VlZCk7XG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe2RvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7fSwgNCpkU2VlZCk7XG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe2RvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7fSwgNSpkU2VlZCk7XG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe2RvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7fSwgNipkU2VlZCk7XG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe2RvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7fSwgNypkU2VlZCk7XG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe2RvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7fSwgOCpkU2VlZCk7XG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe2RvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9ICk7fSwgOSpkU2VlZCk7XG4gICAgLy8gZG9BY3Rpb24oJ2hvbWUnLCdkb1Nob290Jywge30pO1xuICAgIC8vIGRvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9KTtcblxuICAgIC8vIGRvU2hvb3QodGhhdC5wcm9wcy5ob21lLnNob290ZXJzLCB0aGF0LnByb3BzLmhvbWUuYmFsbGlzdGljcywgZG9BY3Rpb24pO1xuICAgIGRvU2hvb3QodGhhdC5wcm9wcy5ob21lLnNob290ZXJzLCB0aGF0LnByb3BzLmhvbWUubG9hZGVkQnVsbGV0cywgdGhhdC5wcm9wcy5ob21lLmJhbGxpc3RpY3MsIGRvQWN0aW9uKTtcbiAgICAvLyBkb0VqZWN0KHRoYXQucHJvcHMuaG9tZS5lamVjdGVycywgZG9BY3Rpb24pO1xuICAgIC8vIGRvU2hvb3QodGhhdC5wcm9wcy5ob21lLmJhbGxpc3RpY3MsIHRoYXQucHJvcHMuaG9tZS5zaG9vdGVycywgZG9BY3Rpb24pO1xuICAgIGRvRWplY3QodGhhdC5wcm9wcy5ob21lLmJhbGxpc3RpY3MsIHRoYXQucHJvcHMuaG9tZS5lamVjdGVycywgZG9BY3Rpb24pO1xuICAgIGRvQ2xlYXIodGhhdC5wcm9wcy5ob21lLmJhbGxpc3RpY3MsIGRvQWN0aW9uKTtcblxuICAgIC8vIGRvQWN0aW9uKCdob21lJywnZG9TaG9vdCcsIHt9KTtcbiAgICAvLyBkb0FjdGlvbignaG9tZScsJ2RvU2hvb3QnLCB7fSk7XG5cblxuICB9XG5cbiAgb25SZWFkeSgpIHtcbiAgICAvL2NvbnNvbGUubG9nKFwi55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliJ3mrKHmuLLmn5PlrozmiJBcIik7XG5cbiAgICAvLyB3eC5nZXRMb2NhdGlvbih7XG4gICAgLy8gICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCLlnZDmoIfvvJpcIiwgcmVzKVxuICAgIC8vICAgfSAgICAgICAgIFxuICAgIC8vIH0pXG4gICAgXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIC8vIHd4LmdldExvY2F0aW9uKHtcbiAgICAvLyAgICAgdHlwZTogJ3dnczg0JyxcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHZhciBsYXRpdHVkZSA9IHJlcy5sYXRpdHVkZVxuICAgIC8vICAgICAgICAgICAgICAgICB2YXIgbG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZVxuICAgIC8vICAgICAgICAgICAgICAgICB2YXIgc3BlZWQgPSByZXMuc3BlZWRcbiAgICAvLyAgICAgICAgICAgICAgICAgdmFyIGFjY3VyYWN5ID0gcmVzLmFjY3VyYWN5XG4gICAgLy8gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdldExvY2F0aW9uIHN1Y2Nlc3M6IFwiLCByZXMpOyAgIFxuICAgIC8vICAgICAgICAgICAgIH0sXG4gICAgLy8gICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZXMpe1xuICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXRMb2NhdGlvbiBjb21wbGV0ZTogXCIsIHJlcyk7IFxuICAgIC8vICAgICAgICAgdmFyIF9sYXRpdHVkZSA9IHJlcy5sYXRpdHVkZTtcbiAgICAvLyAgICAgICAgIHZhciBfbG9uZ2l0dWRlID0gcmVzLmxvbmdpdHVkZTtcbiAgICAvLyAgICAgICAgIHFxbWFwc2RrLnJldmVyc2VHZW9jb2Rlcih7XG4gICAgLy8gICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsYXRpdHVkZTogX2xhdGl0dWRlLFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogX2xvbmdpdHVkZVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgIC8vICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXZlcnNlR2VvY29kZXIgc3VjY2VzczogXCIsIHJlcyk7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaGFzTG9jYXRpb246IHRydWUsXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogZm9ybWF0TG9jYXRpb24oX2xvbmdpdHVkZSwgX2xhdGl0dWRlKSxcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uQWRkcmVzczogcmVzLnJlc3VsdC5hZGRyZXNzXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pO1xuICAgIC8vICAgICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJldmVyc2VHZW9jb2RlciBmYWlsOiBcIiwgcmVzKTtcbiAgICAvLyAgICAgICAgICAgICB9LFxuICAgIC8vICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmV2ZXJzZUdlb2NvZGVyIGNvbXBsZXRlOiBcIiwgcmVzKTtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgXG4gICAgXG5cbiAgfVxuXG4gIG9uVXBkYXRlKHByb3BzKSB7XG4gIH1cblxuICBjaGFuZ2VJbmRpY2F0b3JEb3RzIChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbmRpY2F0b3JEb3RzOiAhdGhpcy5zdGF0ZS5pbmRpY2F0b3JEb3RzXG4gICAgfSlcbiAgfVxuXG4gIGNoYW5nZUF1dG9wbGF5biAoZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYXV0b3BsYXk6ICF0aGlzLnN0YXRlLmF1dG9wbGF5XG4gICAgfSlcbiAgfVxuXG4gIGludGVydmFsQ2hhbmdlIChlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpbnRlcnZhbDogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9XG5cbiAgZHVyYXRpb25DaGFuZ2UgKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGR1cmF0aW9uOiBlLmRldGFpbC52YWx1ZVxuICAgIH0pXG4gIH1cblxuICBjaG9vc2VMb2NhdGlvbigpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3guY2hvb3NlTG9jYXRpb24oe1xuICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNob29zZUxvY2F0aW9uIHN1Y2Nlc3M6IFwiLCByZXMpO1xuICAgICAgICAvLyB0aGF0LnNldFN0YXRlKHtcbiAgICAgICAgLy8gICBoYXNMb2NhdGlvbjogdHJ1ZSxcbiAgICAgICAgLy8gICBsb2NhdGlvbjogZm9ybWF0TG9jYXRpb24ocmVzLmxvbmdpdHVkZSwgcmVzLmxhdGl0dWRlKSxcbiAgICAgICAgLy8gICBsb2NhdGlvbkFkZHJlc3M6IHJlcy5hZGRyZXNzXG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiEhIXRoYXQuc2V0U3RhdGU6IFwiLCB0aGF0LnN0YXRlKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjaG9vc2VMb2NhdGlvbiBjb21wbGV0ZTogXCIsIHJlcyk7XG4gICAgICAgIHRoYXQuc2V0U3RhdGUoe1xuICAgICAgICAgIGhhc0xvY2F0aW9uOiB0cnVlLFxuICAgICAgICAgIGxvY2F0aW9uOiBmb3JtYXRMb2NhdGlvbihyZXMubG9uZ2l0dWRlLCByZXMubGF0aXR1ZGUpLFxuICAgICAgICAgIGxvY2F0aW9uQWRkcmVzczogcmVzLmFkZHJlc3NcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuLy9sb2FkZWRCdWxsZXRzXG5cbmZ1bmN0aW9uIGRvU2hvb3QoX3RoZVNob290ZXJzLCBfbG9hZGVkQnVsbGV0cywgX2JhbGxpc3RpY3MsIF9kb0FjdGlvbil7XG4gIGxldCBfbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7IFxuICBpZihfdGhlU2hvb3RlcnMubGVuZ3RoPjEpe1xuICAgIC8vIGxldCBlbXB0eUJpcyA9IDA7XG4gICAgLy8gZm9yKGxldCBpPTA7IGk8X2JhbGxpc3RpY3MubGVuZ3RoOyBpKyspe1xuICAgIC8vICAgaWYoX2JhbGxpc3RpY3NbaV0uZW1wdHkpe1xuICAgIC8vICAgICBlbXB0eUJpcysrO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvLyBjb25zb2xlLmxvZyhcIiMjIyMjPz8/Pz8/Pz8/Pz8/Pz8gZW1wdHlCaXMvX2JhbGxpc3RpY3MubGVuZ3Q6IFwiLCBlbXB0eUJpcy9fYmFsbGlzdGljcy5sZW5ndGgsIGVtcHR5QmlzKTtcbiAgICAvLyBpZihlbXB0eUJpcy9fYmFsbGlzdGljcy5sZW5ndGg8MC43KXtcbiAgICBpZihfbG9hZGVkQnVsbGV0cy5sZW5ndGg8X2JhbGxpc3RpY3MubGVuZ3RoKjUpeyAgXG4gICAgICBsZXQgc2h0ciA9IF90aGVTaG9vdGVyc1swXTtcbiAgICAgIF9kb0FjdGlvbignaG9tZScsJ2RvU2hvb3QnLCB7c2hvb3RCdWxsZXQ6IHNodHJ9KTtcbiAgICB9XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe2RvU2hvb3QoX3RoZVNob290ZXJzLCBfbG9hZGVkQnVsbGV0cywgX2JhbGxpc3RpY3MsIF9kb0FjdGlvbik7fSwgISFfdGhlU2hvb3RlcnNbMV0/X3RoZVNob290ZXJzWzFdLmZpcmVfZGVsYXk6MTAwMCk7XG4gIH1lbHNle1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtkb1Nob290KF90aGVTaG9vdGVycywgX2xvYWRlZEJ1bGxldHMsIF9iYWxsaXN0aWNzLCBfZG9BY3Rpb24pO30sIDcwMDApO1xuICB9XG59XG5cbi8vIGZ1bmN0aW9uIGRvRWplY3QoX3RoZUVqZWN0ZXJzLCBfZG9BY3Rpb24pe1xuLy8gICBsZXQgX25vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyBcbi8vICAgaWYoX3RoZUVqZWN0ZXJzLmxlbmd0aD4wKXtcbi8vICAgICBsZXQgZWp0ciA9IF90aGVFamVjdGVyc1swXTtcbi8vICAgICBjb25zb2xlLmxvZyhcIiMjIyBkb0VqZWN0OiBcIiwgZWp0cik7XG4vLyAgICAgX2RvQWN0aW9uKCdob21lJywnZG9FamVjdCcsIHtlamVjdEJ1bGxldDogZWp0cn0pO1xuLy8gICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtkb0VqZWN0KF90aGVFamVjdGVycywgX2RvQWN0aW9uKTt9LCA1MDAwKTtcbi8vICAgfWVsc2V7XG4vLyAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe2RvRWplY3QoX3RoZUVqZWN0ZXJzLCBfZG9BY3Rpb24pO30sIDUwMDApO1xuLy8gICB9ICAgIFxuLy8gfVxuXG4gIC8vIGZ1bmN0aW9uIGRvU2hvb3QoX3RoZUJhbGxpc3RpY3MsIF90aGVTaG9vdGVycywgX2RvQWN0aW9uKXtcbiAgLy8gICBsZXQgX25vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyBcbiAgLy8gICB2YXIgX2VtcHRpZXMgPSBbXTtcbiAgLy8gICBmb3IodmFyIGk9MDsgaTxfdGhlQmFsbGlzdGljczsgaSsrKXtcbiAgLy8gICAgIGlmKF90aGVCYWxsaXN0aWNzW2ldLm9uVGltZXMhPS0xICYmIChfdGhlQmFsbGlzdGljc1tpXS5vblRpbWVzK190aGVCYWxsaXN0aWNzW2ldLmRlbGF5KTxfbm93KSB7XG4gIC8vICAgICAgIF9lbXB0aWVzLnB1c2goX3RoZUJhbGxpc3RpY3NbaV0pO1xuICAvLyAgICAgfVxuICAvLyAgIH1cbiAgLy8gICBpZihfZW1wdGllcy5sZW5ndGg+MCAmJiBfdGhlU2hvb3RlcnMubGVuZ3RoPjApe1xuICAvLyAgICAgbGV0IHNodHIgPSBfdGhlU2hvb3RlcnNbMF07XG4gIC8vICAgICBfZG9BY3Rpb24oJ2hvbWUnLCdkb1Nob290Jywge3Nob290QnVsbGV0OiBzaHRyfSk7XG4gIC8vICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZG9TaG9vdChfdGhlQmFsbGlzdGljcywgX3RoZVNob290ZXJzLCBfZG9BY3Rpb24pO30sIDUwMCk7XG4gIC8vICAgfWVsc2V7XG4gIC8vICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZG9TaG9vdChfdGhlQmFsbGlzdGljcywgX3RoZVNob290ZXJzLCBfZG9BY3Rpb24pO30sIDUwMCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgZnVuY3Rpb24gZG9FamVjdChfdGhlQmFsbGlzdGljcywgX3RoZUVqZWN0ZXJzLCBfZG9BY3Rpb24pe1xuICAgIGxldCBfbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7IFxuICAgIHZhciBfZmlsbHMgPSBbXTtcbiAgICBmb3IodmFyIGk9MDsgaTxfdGhlQmFsbGlzdGljcy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZihfdGhlQmFsbGlzdGljc1tpXS5vblRpbWVzIT0tMSAmJiAoX3RoZUJhbGxpc3RpY3NbaV0ub25UaW1lcytfdGhlQmFsbGlzdGljc1tpXS5jbGVhckRlbGF5KTxfbm93KSB7XG4gICAgICAgIF9maWxscy5wdXNoKF90aGVCYWxsaXN0aWNzW2ldKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiIyMjIGRvRWplY3Q6ISEhISEhISEhISEhISEhISEhISEhLS0tXCIsIF9maWxscy5sZW5ndGgsIF90aGVFamVjdGVycy5sZW5ndGgpO1xuICAgIGlmKF9maWxscy5sZW5ndGg+MCAmJiBfdGhlRWplY3RlcnMubGVuZ3RoPjIpe1xuICAgICAgbGV0IGVqdHIgPSBfdGhlRWplY3RlcnNbMF07XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIiMjIyBkb0VqZWN0OiBcIiwgZWp0cik7XG4gICAgICBfZG9BY3Rpb24oJ2hvbWUnLCdkb0VqZWN0Jywge2VqZWN0QnVsbGV0OiBlanRyfSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZG9FamVjdChfdGhlQmFsbGlzdGljcywgX3RoZUVqZWN0ZXJzLCBfZG9BY3Rpb24pO30sIF90aGVFamVjdGVyc1sxXS5lamVjdF9kZWxheSk7XG4gICAgfWVsc2V7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZG9FamVjdChfdGhlQmFsbGlzdGljcywgX3RoZUVqZWN0ZXJzLCBfZG9BY3Rpb24pO30sIDcwMCk7XG4gICAgfSAgICBcbiAgfVxuICBcbiAgXG4gIGZ1bmN0aW9uIGRvQ2xlYXIoX3RoZUJhbGxpc3RpY3MsIF9kb0FjdGlvbil7XG4gICAgX2RvQWN0aW9uKCdob21lJywnZG9DbGVhcicsIHt9KTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZG9DbGVhcihfdGhlQmFsbGlzdGljcywgX2RvQWN0aW9uKTt9LCA1MDApO1xuICB9XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyh7aG9tZX0pe1xuICByZXR1cm4ge1xuICAgIGhvbWVcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKEhvbWUpO1xuIl19
Page(_labrador._createPage(exports.default));
