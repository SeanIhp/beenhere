import wx, { Component, PropTypes } from 'labrador';
import { connect, getStore} from 'labrador-redux';
import { wxGetApp } from '../../app/createApp';
import { doAction, getState } from '../../app/dva-util';
import Router from '../../app/router-util';
import { showToastMessage } from '../../utils/common';
import Bullet from '../../components/bullet/bullet';
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var util = require('../../utils/utils.js');
var formatLocation = util.formatLocation

const { array, func } = PropTypes;

class Home extends Component {
  // static propTypes = {
  // };

  constructor(props){
    super(props);
    let that = this;
    console.log("++++++++:  ", that.props);
    this.state = {
      clientInfo: wx.getSystemInfoSync(),
      clientWidth: wx.getSystemInfoSync().windowWidth,
      
      indicatorDots: false,
      vertical: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      hasLocation: false,
      locationAddress: "....",

      loadedBullets: [],
      loader: {
        loadBullet: (idx, bullet) => {
          that.props.home.bullets.push(bullet);
        },
        shootBullet: () => {},
        reload: () => {
          console.log("RELOAD")
        }
      }
    };
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


  onLoad() {
      let that = this;
      qqmapsdk = new QQMapWX({
          key: 'U2GBZ-QWSRO-YCNWX-SICFH-GL2GO-CXFWE'
      });
    doAction('home','loadBullets',{});
    this.setState({
      loadedBullets: that.props.home.loadedBullets
    })

    // this.doShoot();
    
    let dSeed = 3000;
    doAction('home','doShoot', {} );
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
    doShoot(that.props.home.shooters, that.props.home.loadedBullets, that.props.home.ballistics, doAction);
    // doEject(that.props.home.ejecters, doAction);
    // doShoot(that.props.home.ballistics, that.props.home.shooters, doAction);
    doEject(that.props.home.ballistics, that.props.home.ejecters, doAction);
    doClear(that.props.home.ballistics, doAction);

    // doAction('home','doShoot', {});
    // doAction('home','doShoot', {});


  }

  onReady() {
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

  onUpdate(props) {
  }

  changeIndicatorDots (e) {
    this.setState({
      indicatorDots: !this.state.indicatorDots
    })
  }

  changeAutoplayn (e) {
    this.setState({
      autoplay: !this.state.autoplay
    })
  }

  intervalChange (e) {
    this.setState({
      interval: e.detail.value
    })
  }

  durationChange (e) {
    this.setState({
      duration: e.detail.value
    })
  }

  chooseLocation() {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log("chooseLocation success: ", res);
        // that.setState({
        //   hasLocation: true,
        //   location: formatLocation(res.longitude, res.latitude),
        //   locationAddress: res.address
        // });
        // console.log("!!!that.setState: ", that.state);
      },
      complete: function(res){
        console.log("chooseLocation complete: ", res);
        that.setState({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
        });
      }
    });
  }

}
//loadedBullets

function doShoot(_theShooters, _loadedBullets, _ballistics, _doAction){
  let _now = new Date().getTime(); 
  if(_theShooters.length>1){
    // let emptyBis = 0;
    // for(let i=0; i<_ballistics.length; i++){
    //   if(_ballistics[i].empty){
    //     emptyBis++;
    //   }
    // }
    // console.log("#####?????????????? emptyBis/_ballistics.lengt: ", emptyBis/_ballistics.length, emptyBis);
    // if(emptyBis/_ballistics.length<0.7){
    if(_loadedBullets.length<_ballistics.length*5){  
      let shtr = _theShooters[0];
      _doAction('home','doShoot', {shootBullet: shtr});
    }
    setTimeout(function(){doShoot(_theShooters, _loadedBullets, _ballistics, _doAction);}, !!_theShooters[1]?_theShooters[1].fire_delay:1000);
  }else{
    setTimeout(function(){doShoot(_theShooters, _loadedBullets, _ballistics, _doAction);}, 7000);
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

  function doEject(_theBallistics, _theEjecters, _doAction){
    let _now = new Date().getTime(); 
    var _fills = [];
    for(var i=0; i<_theBallistics.length; i++){
      if(_theBallistics[i].onTimes!=-1 && (_theBallistics[i].onTimes+_theBallistics[i].clearDelay)<_now) {
        _fills.push(_theBallistics[i]);
        break;
      }
    }
    console.log("### doEject:!!!!!!!!!!!!!!!!!!!!!---", _fills.length, _theEjecters.length);
    if(_fills.length>0 && _theEjecters.length>2){
      let ejtr = _theEjecters[0];
      // console.log("### doEject: ", ejtr);
      _doAction('home','doEject', {ejectBullet: ejtr});
      setTimeout(function(){doEject(_theBallistics, _theEjecters, _doAction);}, _theEjecters[1].eject_delay);
    }else{
      setTimeout(function(){doEject(_theBallistics, _theEjecters, _doAction);}, 700);
    }    
  }
  
  
  function doClear(_theBallistics, _doAction){
    _doAction('home','doClear', {});
    setTimeout(function(){doClear(_theBallistics, _doAction);}, 500);
  }

function mapStateToProps({home}){
  return {
    home
  };
}

export default connect(mapStateToProps)(Home);
