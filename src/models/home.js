import { getMerchantSummary,getEnterprise } from '../services/home';
import wx from 'labrador';
import { XBULLETS } from "../constants.js";

const BULLET_COLORS = ["#FF0000", "#EEE4BB", "#C1E8C1", "#AECC33", "#8FD87D", "#82B2D2", "#CC88CC","#EE66B8", "#F4607E", "#6666EE", "#EE6666", "#E3CC72"];
const BULLET_SIZES = [8, 10, 12, 12, 14, 14, 16, 16, 18, 18, 20];
const BULLET_SPEEDS = [26500, 26000, 25500, 25000, 24500, 24000, 23500, 23000, 22500, 22000, 21500];

const BULLET_COLOR_DEFAULT = "#FF0000";
const BULLET_SIZE_DEFAULT = 14;
const BULLET_SPEED_DEFAULT = 20000;

class Bullet {
    constructor(_bullet, _baslistic, _bulletsTotal, _loadedBulletsTotal){
        let that = this;
        this.clientWidth = wx.getSystemInfoSync().windowWidth;
        this.bullet = _bullet;
        this.baslistic = _baslistic;

        this._bulletsMax = 25;
        this._speedSeed = 3;
        this._delaySeed = 2333;

        this.text = _bullet.text;
        this.textLen = (this.text.match(/[^ -~]/g) == null ? this.text.length+1 : (this.text.length + this.text.match(/[^ -~]/g).length)+1)/2;
        this.color = null;
        this.size = null;
        this.direct = 0;
        this.delay = 0;
        this.speed = 0;
        this.top = null;
        this.left = null;
        this.animation = wx.createAnimation();

        let _boreLen = (""+this.bullet.bore).length;
        if(_boreLen){
          this.color = BULLET_COLORS[_boreLen];
          this.size = BULLET_SIZE_DEFAULT;  //BULLET_SIZES[_boreLen];
          this.speed = BULLET_SPEED_DEFAULT/this._speedSeed;  //BULLET_SPEEDS[_boreLen]; //22000/this._speedSeed;
        }else{
          this.color = BULLET_COLOR_DEFAULT;
          this.size = BULLET_SIZE_DEFAULT;
          this.speed = BULLET_SPEED_DEFAULT/this._speedSeed;
        }

        // if(_loadedBulletsTotal<(this._bulletsMax*0.8)){
        //   this.speed = 100;
        // }

        // this.left = wx.getSystemInfoSync().windowWidth + (!!this.text?this.textLen*this.size:0);
        this.left = 0;
        this.direct = this.clientWidth + (!!this.text?this.textLen*this.size:0);
        this.delay = Math.round(Math.random()*_bulletsTotal)*30;
        this.animation.translate(-1*Math.abs(this.direct)).step({duration: this.speed, delay: this.delay});
        this.animation.translate(Math.abs(this.direct), 0).step({duration: 1});
        this.ani = this.animation.export();
        console.log("BULLET:　", this);
    }
}

export default {

  namespace: 'home',

  state: {
    latitude: null,
    longtitude: null,
    bullets: [],
    loadedBullets: [],
    ballistics: [
        {id:0, top: 20, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:1, top: 40, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:2, top: 60, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:3, top: 80, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:4, top: 100, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:5, top: 120, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:6, top: 140, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:7, top: 160, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:8, top: 180, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:9, top: 200, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:10, top: 220, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:11, top: 240, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:12, top: 260, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:13, top: 280, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null},
        // {id:14, top: 300, empty:true, clearDelay:9999999, onTimes:-1, bulletId: null}
      ],
    shooters: [],
    ejecters: [],
    baseBore: 0,
    baseRange: 100
  },

  effects: {
    *loadBullets({ payload }, { select, call, put }) {
        let _bullets = [];
        console.log("XBULLETS: ", XBULLETS);
        for(let i=0; i<XBULLETS.length; i++){
          // if(i>10) break;
          let bullet = XBULLETS[i];
          _bullets.push(bullet);
        }
        yield put({
          type: "loadBulletsSuccess",
          payload: {
            bullets: _bullets
          }
        })
    }, /* loadBullets end */
    
    *doShootxxx({ payload }, { select, call, put }) {  
        let _blt = payload.shootBullet;       
        console.log("************ SHOOT BUT: ", _blt);  
        let _now = new Date().getTime(); 
        let __bullets = yield select(state => state.home.bullets);
        let __loadedBullets = yield select(state => state.home.loadedBullets);
        let __ballistics = yield select(state => state.home.ballistics);
        let __shooters = yield select(state => state.home.shooters);
        let __ejecters = yield select(state => state.home.ejecters);
        
        if(!!_blt){
          for(var i=0; i<__ballistics.length; i++) {
            if(__ballistics[i].onTimes!=-1 && (__ballistics[i].onTimes+__ballistics[i].clearDelay)<_now) {
              __ballistics[i].empty = true;
            }
          };
        }     

        let _miduSeed = 5;
        //送弹出匣
        // debugger;
        let blt = __bullets.shift();
        if(!!blt){
          let bstId = 0;
          let theBallistic = null; 
          let _bis = [];
          for(var i=0; i<__ballistics.length; i++) {
            if(__ballistics[i].clearDelay==9999999){
              _bis.push(__ballistics[i]);
            }
          };
          if(_bis.length>0){
            //未曾发弹，随机选膛
            theBallistic = _bis[Math.round(Math.random()*(_bis.length-1))];
          }else{
            //取冷膛
            // theBallistic = __ballistics[0];
            let _bis2 = [];
            for(var j=0; j<__ballistics.length; j++) {
              if(__ballistics[j].empty) {
                _bis2.push(__ballistics[j]);
              }
            };
            theBallistic = _bis2[Math.round(Math.random()*(_bis2.length-1))];
          }
          console.log("{{{theBallistic}}}____ %%%%%%%%%%%%%%%%%%%%%%%%: ", theBallistic.id);
          //装弹
          // console.log("{{{theBallistic}}}____ %%%%%%%%%%%%%%%%%%%%%%%%: ");
          // console.log(theBallistic);
          let theBullet = new Bullet(blt, theBallistic, __bullets.length, __loadedBullets.length);
          // theBullet.speed = 30000;
          theBallistic.bulletId = blt.id;
          theBallistic.clearDelay = theBullet.speed/_miduSeed; //theBullet.delay;
          theBallistic.onTimes = _now;
          theBallistic.empty = false;
          theBullet.bullet.ballistic = theBallistic;
          //快慢机就位
          __shooters.push({bstId:theBallistic.id, bltId:blt.id, fire_delay:theBullet.speed/_miduSeed});
          __shooters.sort(function(a,b){
            return a.fire_delay - b.fire_delay;
          });
          __ejecters.push({blt:blt, eject_delay:theBullet.speed});
          __ejecters.sort(function(a,b){
            return a.eject_delay - b.eject_delay;
          });
          //推弹入膛
          __loadedBullets.push(theBullet);
          // console.log("{++++}  现有: ", __loadedBullets.length);
          // console.log("【++++】  现有: ", __bullets.length);
          yield put({
            type: "doShootSuccess",
            payload: {
              bullets: __bullets,
              loadedBullets: __loadedBullets,
              ballistics: __ballistics,
              shooters: __shooters
            }
          });
        }
    }, /* doShoot end */
    
        
        
    *doClear({ payload }, { select, call, put }) {  
          console.log("************ CLEARING BALLISTICS~!~~!!! ");  
          let _now = new Date().getTime(); 
          let __bullets = yield select(state => state.home.bullets);
          let __loadedBullets = yield select(state => state.home.loadedBullets);
          let __ballistics = yield select(state => state.home.ballistics);
          let __shooters = yield select(state => state.home.shooters);
          
          for(var i=0; i<__ballistics.length; i++) {
            if(__ballistics[i].onTimes!=-1 && (__ballistics[i].onTimes+__ballistics[i].clearDelay)<_now) {
              __ballistics[i].empty = true;
            }else{
              __ballistics[i].empty = false;
            }
          };  
          yield put({
            type: "doShootSuccess",
            payload: {
              // bullets: __bullets,
              loadedBullets: __loadedBullets,
              // ballistics: __ballistics,
              // shooters: __shooters
            }
          });
    },
    
    
    *doShoot({ payload }, { select, call, put }) {  
      console.log("************ SHOOT BUT: ");  
      let _miduSeed = 2;
      let _now = new Date().getTime(); 
      let __bullets = yield select(state => state.home.bullets);
      let __loadedBullets = yield select(state => state.home.loadedBullets);
      let __ballistics = yield select(state => state.home.ballistics);
      let __shooters = yield select(state => state.home.shooters);
      let __ejecters = yield select(state => state.home.ejecters);
      
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
      let theBallistic = null; 
      let _bis = [];
      for(var i=0; i<__ballistics.length; i++) {
        if(__ballistics[i].clearDelay==9999999){
          _bis.push(__ballistics[i]);
        }
      };
      if(_bis.length>0){
        //未曾发弹，随机选膛
        theBallistic = _bis[Math.round(Math.random()*(_bis.length-1))];
      }else{
        //取冷膛
        let _bis2 = [];
        for(var j=0; j<__ballistics.length; j++) {
          if(__ballistics[j].empty) {
            _bis2.push(__ballistics[j]);
          }
        };
        theBallistic = _bis2[Math.round(Math.random()*(_bis2.length))];
        // if(_bis2.length>0){
        //   _bis2.sort(function(a,b){
        //     return b.clearDelay - a.clearDelay;
        //   });
        //   theBallistic = _bis2[0];
        // }
      }
      if(!!theBallistic){
        //取弹装药
        let blt = __bullets.shift();
        if(!!blt){
            let theBullet = new Bullet(blt, theBallistic, __bullets.length, __loadedBullets.length);
            theBallistic.bulletId = blt.id;
            theBallistic.clearDelay = theBullet.speed + theBullet.delay + theBullet.speed/_miduSeed; //theBullet.delay;
            theBallistic.onTimes = _now;
            theBallistic.empty = false;
            theBullet.bullet.ballistic = theBallistic;
            //快慢机就位
            __shooters.push({bstId:theBallistic.id, bltId:blt.id, fire_delay:theBallistic.clearDelay+200});
            __shooters.sort(function(a,b){
              return a.fire_delay - b.fire_delay;
            });
            __ejecters.push({blt:blt, eject_delay:theBullet.speed + theBullet.delay + 100});
            __ejecters.sort(function(a,b){
              return a.eject_delay - b.eject_delay;
            });
            //推弹入膛
            __loadedBullets.push(theBullet);
            // console.log("{++++}  现有: ", __loadedBullets.length);
            // console.log("【++++】  现有: ", __bullets.length);
            yield put({
              type: "doShootSuccess",
              payload: {
                bullets: __bullets,
                loadedBullets: __loadedBullets,
                ballistics: __ballistics,
                shooters: __shooters
              }
            });
        }
      }else{
        yield put({
          type: "doShootSuccess",
          payload: {
            // bullets: __bullets,
            // loadedBullets: __loadedBullets,
            ballistics: __ballistics,
            // shooters: __shooters
          }
        });
      }




      

      // let _miduSeed = 5;
      // //送弹出匣
      // // debugger;
      // let blt = __bullets.shift();
      // if(!!blt){
      //   let bstId = 0;
      //   let theBallistic = null; 
      //   let _bis = [];
      //   for(var i=0; i<__ballistics.length; i++) {
      //     if(__ballistics[i].delay==9999999){
      //       _bis.push(__ballistics[i]);
      //     }
      //   };
      //   if(_bis.length>0){
      //     //未曾发弹，随机选膛
      //     theBallistic = _bis[Math.round(Math.random()*(_bis.length-1))];
      //   }else{
      //     //取冷膛
      //     // theBallistic = __ballistics[0];
      //     let _bis2 = [];
      //     for(var j=0; j<__ballistics.length; j++) {
      //       if(__ballistics[j].empty) {
      //         _bis2.push(__ballistics[j]);
      //       }
      //     };
      //     theBallistic = _bis2[Math.round(Math.random()*(_bis2.length-1))];
      //   }
      //   console.log("{{{theBallistic}}}____ %%%%%%%%%%%%%%%%%%%%%%%%: ", theBallistic.id);
      //   //装弹
      //   // console.log("{{{theBallistic}}}____ %%%%%%%%%%%%%%%%%%%%%%%%: ");
      //   // console.log(theBallistic);
      //   let theBullet = new Bullet(blt, theBallistic, __bullets.length, __loadedBullets.length);
      //   // theBullet.speed = 30000;
      //   theBallistic.bulletId = blt.id;
      //   theBallistic.delay = theBullet.speed/_miduSeed; //theBullet.delay;
      //   theBallistic.onTimes = _now;
      //   theBallistic.empty = false;
      //   theBullet.bullet.ballistic = theBallistic;
      //   //快慢机就位
      //   __shooters.push({bstId:theBallistic.id, bltId:blt.id, fire_delay:theBullet.speed/_miduSeed});
      //   __shooters.sort(function(a,b){
      //     return a.fire_delay - b.fire_delay;
      //   });
      //   __ejecters.push({blt:blt, eject_delay:theBullet.speed});
      //   __ejecters.sort(function(a,b){
      //     return a.eject_delay - b.eject_delay;
      //   });
      //   //推弹入膛
      //   __loadedBullets.push(theBullet);
      //   // console.log("{++++}  现有: ", __loadedBullets.length);
      //   // console.log("【++++】  现有: ", __bullets.length);
      //   yield put({
      //     type: "doShootSuccess",
      //     payload: {
      //       bullets: __bullets,
      //       loadedBullets: __loadedBullets,
      //       ballistics: __ballistics,
      //       shooters: __shooters
      //     }
      //   });
      // }
    }, /* doShoot end */
    
    *doEject({ payload }, { select, call, put }) {  
        let _blt = payload.ejectBullet;
        let __bullets = yield select(state => state.home.bullets);
        let __loadedBullets = yield select(state => state.home.loadedBullets);
        let __shooters = yield select(state => state.home.shooters);
        let __ejecters = yield select(state => state.home.ejecters);
        
        
        console.log("【--------------------】 EJECT BUT: ", _blt);
        // console.log("++++++++++++++ EJECT BUT_ID: ", _blt.blt.id);        
        // console.log("【B4】EJECTS : ", __ejecters.length);
        for(var a=0; a<__ejecters.length; a++){
          if(__ejecters[a].blt.id==_blt.blt.id){
            __ejecters.splice(a, 1);
            break;
          }
        }
        // console.log("【--】EJECTS : ", __ejecters.length);        
        // console.log("【B4】SHOOTS : ", __shooters.length);
        for(var b=0; b<__shooters.length; b++){
          if(__shooters[b].bltId==_blt.blt.id){
            __shooters.splice(b, 1);
            break;
          }
        }
        // console.log("【--】SHOOTS : ", __shooters.length);
        // console.log("【B4】LOADED : ", __loadedBullets.length);
        for(var c=0; c<__loadedBullets.length; c++){
          if(__loadedBullets[c].bullet.id==_blt.blt.id){
            __loadedBullets.splice(c, 1);
            break;
          }
        }
        // console.log("【--】LOADED : ", __loadedBullets.length);
        // console.log("【B4】ALL : ", __bullets.length);
        delete _blt.blt.ballistic;
        __bullets.push(_blt.blt);
        // console.log("【--】ALL : ", __bullets.length);
        // console.log("{----}  尚有: ", __loadedBullets.length);
        // console.log("【----】  尚有: ", __bullets.length);
        yield put({
          type: "doEjectSuccess",
          payload: {
            bullets: __bullets,
            loadedBullets: __loadedBullets,
            shooters: __shooters,
            ejecters: __ejecters
          }
        });
    }, /* doEject end */

  }, /*effects end*/

  reducers: {
    loadBulletsSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    doShootSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    doEjectSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    summarySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    entSuccess(state, action) {
      let data = {
        entnames: ["请选择企业","中国","美国","巴西","日本"],
        entappid: ["","gh_aaaa","gh_bbbb","gh_bbbb","gh_bbbb"]
      };
      return { ...state, ...data };
    },
    setLogoutStatus(state,action) {
      return { ...state, logout: action.payload };
    },   
  },
}
