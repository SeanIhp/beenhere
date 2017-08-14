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

  doEject(_bullet){
    doAction('home','doEject', {payload: {bullet: _bullet}});
  }

  doShoot(_theShooter, _doAction){
    if(_theShooter.length>0){
      let shtr = _theShooter.shift();
      
      arguments.callee()
    }
  }

  onLoad() {
      let that = this;
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
    doAction('home','loadBullets',{});
    this.setState({
      loadedBullets: that.props.home.loadedBullets
    })

    // this.doShoot();
    doAction('home','doShoot', {});
    doAction('home','doShoot', {});
    doAction('home','doShoot', {});
    console.log("))))++++++:   ", that.props.home.loadedBullets);
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
    wx.getLocation({
        type: 'wgs84',
        success: function(res) {
                    var latitude = res.latitude
                    var longitude = res.longitude
                    var speed = res.speed
                    var accuracy = res.accuracy
                  // console.log("getLocation success: ", res);   
                },
        complete: function(res){
            // console.log("getLocation complete: ", res); 
            var _latitude = res.latitude;
            var _longitude = res.longitude;
            qqmapsdk.reverseGeocoder({
                location: {
                            latitude: _latitude,
                            longitude: _longitude
                          },
                success: function (res) {
                    console.log("reverseGeocoder success: ", res);
                    that.setState({
                        hasLocation: true,
                        location: formatLocation(_longitude, _latitude),
                        locationAddress: res.result.address
                    });
                },
                fail: function (res) {
                    console.log("reverseGeocoder fail: ", res);
                },
                complete: function (res) {
                    console.log("reverseGeocoder complete: ", res);
                }
            });
        }
    });

    
    

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

function mapStateToProps({home}){
  return {
    home
  };
}

export default connect(mapStateToProps)(Home);
