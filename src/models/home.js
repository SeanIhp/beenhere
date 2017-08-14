import { getMerchantSummary,getEnterprise } from '../services/home';
import wx from 'labrador';
import { XBULLETS } from "../constants.js";

class Bullet {
    constructor(_bullet, _baslistic, _bulletsTotal){
        let that = this;
        this.clientWidth = wx.getSystemInfoSync().windowWidth;
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
        this.animation = wx.createAnimation();
        switch((""+this.bullet.bore).length){
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

        this.left = wx.getSystemInfoSync().windowWidth;
        this.direct = this.left + (!!this.text?this.text.length*(this.size+4):0);
        this.delay = Math.round(Math.random()*this.bulletsTotal);
        this.size = 14;
        console.log("Bullet's ______: ", this.text);
        console.log("Bullet's ______INIT_____left/delay/len/direct/speed: ", this.left, this.delay*this._delaySeed, this.text.length, this.direct, this.speed);
        this.animation.translate(-1*Math.abs(this.direct)).step({duration: this.speed, delay: 0});
        // this.animation.translate(Math.abs(this.direct), 0).step({duration: 1});
        this.ani = this.animation.export();
        setTimeout(function() {
          console.log("[3000]WHERE AM I: : : ", that.left, that.bullet.id);
        }, 3000);
        setTimeout(function() {
          console.log("[5000]WHERE AM I: : : ", that.left, that.bullet.id);
        }, 5000);
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
        {id:0, top: 20, delay:9999999, bulletId: null},
        {id:1, top: 40, delay:9999999, bulletId: null},
        {id:2, top: 60, delay:9999999, bulletId: null},
        {id:3, top: 80, delay:9999999, bulletId: null},
        {id:4, top: 100, delay:9999999, bulletId: null},
        {id:5, top: 120, delay:9999999, bulletId: null},
        {id:6, top: 140, delay:9999999, bulletId: null},
        {id:7, top: 160, delay:9999999, bulletId: null},
        {id:8, top: 180, delay:9999999, bulletId: null},
        {id:9, top: 200, delay:9999999, bulletId: null},
        {id:10, top: 220, delay:9999999, bulletId: null},
        {id:11, top: 240, delay:9999999, bulletId: null},
        {id:12, top: 260, delay:9999999, bulletId: null},
        {id:13, top: 280, delay:9999999, bulletId: null},
        {id:14, top: 300, delay:9999999, bulletId: null}
      ],
    shooter: [],
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
    *doShoot({ payload }, { select, call, put }) {                
        let __bullets = yield select(state => state.home.bullets);
        let __loadedBullets = yield select(state => state.home.loadedBullets);
        let __ballistics = yield select(state => state.home.ballistics);
        let __shooter = yield select(state => state.home.shooter);
        let bstIdxs = [];
        //筛选空膛
        for(let i=0; i<__ballistics.length; i++){
          if(!__ballistics.filled){
            bstIdxs.push(i);
          }
        }
        //送弹出匣
        let blt = __bullets.shift();
        let bstId = 0;
        let theBallistic = null;
        if(__ballistics[0].delay>999999){
          //未曾发弹，随机选膛
          theBallistic = __ballistics[Math.round(Math.random()*(__ballistics.length-1))];
        }else{
          //取冷膛
          theBallistic = __ballistics[0];
        }
        //let bst = __ballistics[bstIdx];
        //推弹入膛
        let theBullet = new Bullet(blt, theBallistic, __bullets.length);
        theBallistic.bulletId = theBullet.bullet.id;
        theBullet.bullet.ballistic = theBallistic;
        __loadedBullets.push(theBullet);
        //快慢机就位
        __shooter.push({bstId:theBallistic.id, bltId:theBullet.bullet.id, fire_delay:theBullet.speed/3, eject_delay:theBullet.speed});
        __shooter.sort(function(a,b){
          return a.eject_delay - b.eject_delay;
        });
        console.log("[[[[[[[[[[[[]]   ", __loadedBullets);
        yield put({
          type: "doShootSuccess",
          payload: {
            bullets: __bullets,
            loadedBullets: __loadedBullets,
            ballistics: __ballistics,
            shooter: __shooter
          }
        })
    }, /* doShoot end */
    *doEject({ payload }, { select, call, put }) {  
        console.log("_____do eject");
        let _blt = payload.bullet;
        let __bullets = yield select(state => state.home.bullets);
        let __loadedBullets = yield select(state => state.home.loadedBullets);
        let __ballistics = yield select(state => state.home.ballistics);
        let __shooter = yield select(state => state.home.shooter);
        __bullets.push(_blt);
        let blt = null;
        // for(let i=0; i<__shooter.length; i++){
        //   if(__shooter[i].bstId == _blt.ballistic.id && __shooter[i].bltId == _blt.id){
        //     blt = __loadedBullets[i];
        //     __loadedBullets.splice(i, 1);
        //     break;
        //   }
        // }
        for(let i=0; i<__loadedBullets.length; i++){
          if(__loadedBullets[i].id == _blt.id){
            blt = __loadedBullets[i];
            __loadedBullets.splice(i, 1);
            break;
          }
        }
        for(let i=0; i<__ballistics.length; i++){
          if(!!__ballistics[i].bulletId && (__ballistics[i].bulletId == blt.id)) {
            __ballistics[i].bulletId = null;
            break;
          }
        }
        yield put({
          type: "doEjectSuccess",
          payload: {
            bullets: __bullets,
            loadedBullets: __loadedBullets,
            ballistics: __ballistics
          }
        })
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
      }
      return { ...state, ...data };
    },
    setLogoutStatus(state,action) {
      return { ...state, logout: action.payload }
    },   
  },
}
