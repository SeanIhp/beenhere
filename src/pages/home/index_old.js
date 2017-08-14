import wx, { Component, PropTypes } from 'labrador';
import { connect, getStore} from 'labrador-redux';
import { wxGetApp } from '../../app/createApp';
import { doAction,getState } from '../../app/dva-util';
import Router from '../../app/router-util';
import { showToastMessage } from '../../utils/common';
// import Bullet from '../../components/bullet/bullet';
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var util = require('../../utils/utils.js');
var formatLocation = util.formatLocation

const { array, func } = PropTypes;

class Bullet {
  constructor(_bullet, _total, _magazine, _serial) {
        this.bullet = _bullet;
        this._speedSeed = 1.5;
        this._delaySeed = 2333;
        this.serial = _serial;
        let that = this;
        this.owner = _magazine;
        this.text = _bullet.text;
        this.color = null;
        this.size = null;
        this.direct = 0;
        this.delay = 0;
        this.speed = 0;
        this.top = null;
        this.left = null;
        this.animation = wx.createAnimation();
        this.ani = this.animation.export();
        switch((""+_bullet.bore).length){
            case 10:
                this.color = "#E3CC72";
                this.size = 20;
                this.speed = 22000/this._speedSeed;
                break;
            case 9:
                this.color = "#EE6666";
                this.size = 18;
                this.speed = 23000/this._speedSeed;
                break;
            case 8:
                this.color = "#6666EE";
                this.size = 18;
                this.speed = 24000/this._speedSeed;
                break;
            case 7:
                this.color = "#F4607E";
                this.size = 16;
                this.speed = 25000/this._speedSeed;
                break;
            case 6:
                this.color = "#EE66B8";
                this.size = 16;
                this.speed = 26000/this._speedSeed;
                break;
            case 5:
                this.color = "#CC88CC";
                this.size = 14;
                this.speed = 27000/this._speedSeed;
                break;
            case 4:
                this.color = "#82B2D2";
                this.size = 14;
                this.speed = 28000/this._speedSeed;
                break;
            case 3:
                this.color = "#8FD87D";
                this.size = 12;
                this.speed = 29000/this._speedSeed;
                break;
            case 2:
                this.color = "#AECC33";
                this.size = 12;
                this.speed = 30000/this._speedSeed;
                break;
            case 1: 
                this.color = "#C1E8C1";
                this.size = 10;
                this.speed = 30000/this._speedSeed;    //31000/this._speedSeed;
                break;
            case 0: 
                this.color = "#EEE4BB";
                this.size = 8;
                this.speed = 32000/this._speedSeed;
                break;
            default:
                this.color = "#FF0000";
                this.size = 22;
                this.speed = 21000/this._speedSeed;
        }
        // let _tn = Math.round(Math.random()*12)*20;
        // let _ln = Math.round(Math.random()*wx.getSystemInfoSync().windowWidth);
        // this.top = 25 + _tn;
        //this.left = wx.getSystemInfoSync().windowWidth+_ln*2;
        // this.left = wx.getSystemInfoSync().windowWidth + !!this.text?this.text.length*this.size:0;
        this.left = wx.getSystemInfoSync().windowWidth;

        this.direct = this.left + (!!this.text?this.text.length*(this.size+4):0);
        // let _direct = (!!this.text?this.text.length*(this.size+4):0);
        this.delay = Math.round(Math.random()*_total);
        this.size = 14;
        console.log("Bullet's ______: ", this.text);
        console.log("Bullet's ______INIT_____left/delay/len/direct/speed: ", this.left, this.delay*this._delaySeed, this.text.length, this.direct, this.speed);
        // console.log("Bullet's ______INIT_____direct/speed: ", _direct, this.speed);
        this.animation.translate(-1*Math.abs(this.direct), 0).step({duration: this.speed, delay: this.delay*this._delaySeed});
        this.animation.translate(Math.abs(this.direct), 0).step({duration: 1});
        this.ani = this.animation.export();

        setTimeout(()=>{
          this.owner.loadBullet(this.serial, this.bullet);
        }, this.speed+2000+this.delay*this._delaySeed);
  }
}

class Home extends Component {
  // static propTypes = {
  // };

  constructor(props){
    super(props);
    let that = this;
    this.state = {
      clientInfo: wx.getSystemInfoSync(),
      clientWidth: wx.getSystemInfoSync().windowWidth,
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
        bullets: [{},{},{}]
      },
      loader: {
        loadBullet: (idx, bullet) => {
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
          switch(idx){
            case 0:
              that.setState({
                bullet0: null,
              });
              that.setState({
                bullet0: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 0),
              });
              break;
            case 1:
              that.setState({
                bullet1: null,
              });
              that.setState({
                bullet1: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 1),
              });
              break;
            case 2:
              that.setState({
                bullet2: null,
              });
              that.setState({
                bullet2: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 2),
              });
              break;
            case 3:
              that.setState({
                bullet3: null,
              });
              that.setState({
                bullet3: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 3),
              });
              break;
            case 4:
              that.setState({
                bullet4: null,
              });
              that.setState({
                bullet4: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 4),
              });
              break;
            case 5:
              that.setState({
                bullet5: null,
              });
              that.setState({
                bullet5: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 5),
              });
              break;
            case 6:
              that.setState({
                bullet6: null,
              });
              that.setState({
                bullet6: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 6),
              });
              break;
            case 7:
              that.setState({
                bullet7: null,
              });
              that.setState({
                bullet7: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 7),
              });
              break;
            case 8:
              that.setState({
                bullet8: null,
              });
              that.setState({
                bullet8: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 8),
              });
              break;
            case 9:
              that.setState({
                bullet9: null,
              });
              that.setState({
                bullet9: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 9),
              });
              break;
            case 9:
              that.setState({
                bullet9: null,
              });
              that.setState({
                bullet9: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 9),
              });
              break;
            case 10:
              that.setState({
                bullet10: null,
              });
              that.setState({
                bullet10: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 10),
              });
              break;
            case 11:
              that.setState({
                bullet11: null,
              });
              that.setState({
                bullet11: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 11),
              });
              break;
            case 12:
              that.setState({
                bullet12: null,
              });
              that.setState({
                bullet12: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 12),
              });
              break;
            case 13:
              that.setState({
                bullet13: null,
              });
              that.setState({
                bullet13: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 13),
              });
              break;
            case 14:
              that.setState({
                bullet14: null,
              });
              that.setState({
                bullet14: new Bullet(this.props.home.bullets.shift(), this.props.home.bullets.length, this.state.loader, 14),
              });
              break;
          }
        },
        shootBullet: () => {},
        reload: () => {
          console.log("RELOAD")
        }
      }
    };
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
    doAction('home','loadBullets',{
    });

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
    })


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
