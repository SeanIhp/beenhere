import { getopenid,auth,login,logout } from '../services/login';
import { wxGetApp } from '../app/createApp';
import Router from '../app/router-util';

export default {

  namespace: 'loginInfo',

  state: {
    openid: null,
    entid: null,
    id_keyword: null,
    id_name: null,
    isadmin: null,
    corp_id: "001",
    mktid: null,
    mktname: null,
    tenantcode: null,
    tenantname: null,
  },

  effects: {
    *getOpenid({ payload }, { select, call, put }) {
      const { body } = yield call(getopenid, payload);
      if (body) {
        yield put({
          type: 'openidSuccess',
          payload: {
            openid: body.openid,
            entid: body.ent_id
          }
        });
      }
    },
    *auth({ payload }, { select, call, put }) {
      const { body } = yield call(auth, payload);
      if (body) {
        yield put({
          type: 'authSuccess',
          payload: {
            ...body.data,
          }
        });
      }
    },
    *login({ payload }, { select, call, put }) {
      let openid = yield select((state) => state['loginInfo'].openid);
      if (openid) {
        payload.reg_keyword = openid;
        payload.reg_type = '5';
        const { body } = yield call(login, payload);
        if (body) {
          yield put({
            type: 'loginSuccess',
            payload: {
              ...body.data,
            }
          });
        }
      }
      else {
        const { body } = yield call(getopenid, wxGetApp().buildOpenidParam());
        if (body) {
          // 先获取openid
          openid = body.openid;
          if (openid) {
            yield put({
              type: 'openidSuccess',
              payload: {
                openid: openid,
                entid: body.ent_id
              }
            });
          }

          // 再登录&绑定
          if (openid) {
            payload.reg_keyword = openid;
            payload.reg_type = '5';
          }
          const { body } = yield call(login, payload);
          if (body) {
            yield put({
              type: 'loginSuccess',
              payload: {
                ...body.data,
              }
            });
          }
        }
      }
    },    
    *logout({ payload }, { select, call, put }) {
      let openid = yield select((state) => state['loginInfo'].openid);
      if (openid) {
        payload.reg_keyword = openid;
        payload.reg_type = '5';      
        const { body } = yield call(logout, payload);
        if (body) {
          yield put({
            type: 'logoutSuccess',
            payload: {
              ...body.data,
            }
          });

          // 跳转到登录(IOS必须延时)
          setTimeout(function() {
            Router.redirect("/login/");
          }, 1500);
        }
      }
      else {
        // 跳转到登录(IOS必须延时)
        setTimeout(function() {
          Router.redirect("/login/");
        }, 1500);
      }
    },
  },

  reducers: {
    openidSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    authSuccess(state, action) {
      // 测试模拟用户
      //action.payload.id_keyword = '22222';

      if (action.payload && action.payload.id_keyword)
      {
        return { ...state, ...action.payload };
      }
      else {
        return { ...state };
      }
    },
    loginSuccess(state, action) {
      /* 测试模拟用户
      action.payload.id_keyword = '22222';
      action.payload.id_name = '测试用户';
      action.payload.isadmin = 'Y';
      action.payload.mktid = '0001';
      action.payload.mktname = '测试门店';
      action.payload.tenantcode = '1xxx';
      action.payload.tenantname = '测试商户XXXXXXXXXXXX';
      */
      
      if (action.payload && action.payload.id_keyword)
      {
        return { ...state, ...action.payload };
      }
      else {
        return { ...state };
      }
    },
    logoutSuccess(state, action) {
      return { ...state, 
        id_keyword: null,
        id_name: null,
        tenantcode: null,
        tenantname: null,
      };
    },
  },
}
