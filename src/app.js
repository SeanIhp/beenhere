import wx from 'labrador';
import { createDvaApp } from './app/createApp';
import createLoading from './app/dva-loading';
import { doAction,getState } from './app/dva-util';
import { showToastMessage } from './utils/common';

// redux-persit
import { autoRehydrate } from 'redux-persist';
import persistStore from './app/dva-persist';
import createLogger from 'redux-logger';

// models
import userinfo from './models/userinfo';
import login from './models/login';
import home from './models/home';
import referrer from './models/referrer';

if (__DEV__) {
  console.log('当前为开发环境');
}

// 向labrador-redux注册store
// setStore(store);

export default class {
  globalData = {
    userInfo: null,
    systemInfo: null
  };

  // 外部调用请用 await wxGetApp().getUserInfo()
  async getUserInfo() {
    if (this.globalData.userInfo) {
      return this.globalData.userInfo;
    }

    // 获取用户
    let data = await wx.login();
    let res = await wx.getUserInfo();
    this.globalData.userInfo = res.userInfo;
    this.globalData.userInfo.code = data.code;
    return this.globalData.userInfo;
  }

  getSystemInfo() {
    if (this.globalData.systemInfo) {
      return this.globalData.systemInfo;
    }

    let res = wx.getSystemInfoSync();
    this.globalData.systemInfo = res;
    return res;
  }

  async onLaunch() {
    // console.log("生命周期函数--监听小程序初始化")

    // initialize
    const app = createDvaApp({
      initialState: {
        Referrer: {
          query: __DEV__? {
            // state: "gh_448fd598040d",
            // code:  "believe_ooiqVv_m4vJBlpmVvmCKaWKt6774"
            state: "gh_78e33f1530b9",
            code:  "5be4da7eaf6b74391b70880629d299c1"                    
          } : {
            state: "gh_78e33f1530b9",
            state_name: "beHERE!",
          }
        }
      }
    });
    const plugin = {
      extraEnhancers: [autoRehydrate()],
      /*
      onStateChange: () => {
        if (__DEV__) console.log('state change: %O',app._store.getState());
      },*/
      onAction: createLogger({
        predicate: (getState, action) => action.type !== '@@DVA_LOADING/SHOW' && action.type !== '@@DVA_LOADING/HIDE',
        diff: true,
      }),
      // ...createLoading(),
      onError(error) {
        console.error(error.stack);
        //showToastMessage(error.message,true);
        wx.showModal({
          title: '错误',
          content: error.message,
          showCancel: false,
        });
      },
    };
    app.use(plugin);
    
    // model
    // app.model(userinfo);
    // app.model(login);
    app.model(home);
    app.model(referrer);

    // start
    app.start();
    
    // redux-persit
    persistStore(app._store);
    
    // getSystemInfo
    this.getSystemInfo();

    // getUserInfo
    let user = await this.getUserInfo();
    doAction('userInfo','setUserInfo',user);

    // 设置了企业入口state,单企业模式
    // if (getState('Referrer').query.state) doAction('loginInfo','getOpenid',this.buildOpenidParam());
    // else doAction('home','getEnterprise');
  }

  onShow() {
    // console.log("当小程序启动，或从后台进入前台显示，会触发 onShow")
  }

  onHide() {
    // console.log("当小程序从前台进入后台，会触发 onHide")
  }

  onError(msg) {
    // console.log("当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息")
  }

  // async timer() {
  //   while (true) {
  //     console.log('hello');
  //     await sleep(10000);
  //   }
  // }
}
