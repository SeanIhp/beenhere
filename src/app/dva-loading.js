import wx from 'labrador';

const SHOW = '@@DVA_LOADING/SHOW';
const HIDE = '@@DVA_LOADING/HIDE';
const NAMESPACE = 'loading';

function createLoading(opts = {}) {
  const namespace = opts.namespace || NAMESPACE;
  let initialState = {
    global: false,
    models: {},
  };
  if (opts.effects) {
    initialState.effects = {};
  }

  const extraReducers = {
    [namespace](state = initialState, { type, payload }) {
      const { namespace, actionType } = payload || {};
      let ret;
      switch (type) {
        case SHOW:
          ret = {
            ...state,
            global: true,
            models: { ...state.models, [namespace]:true },
          };
          if (opts.effects) {
            ret.effects = { ...state.effects, [actionType]: true };
          }
          break;
        case HIDE:
          const models = { ...state.models, [namespace]:false };
          const global = Object.keys(models).some(namespace => {
            return models[namespace];
          });
          ret = {
            ...state,
            global,
            models,
          };
          if (opts.effects) {
            ret.effects = { ...state.effects, [actionType]: false };
          }
          break;
        default:
          ret = state;
          break;
      }
      return ret;
    },
  };

  function onEffect(effect, { put }, model, actionType) {
    const { namespace } = model;
    return function*(...args) {

      // show loading
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        mask: true,
        duration: 10000,
      });
      //console.log('show loading...');
      yield put({ type: SHOW, payload: { namespace, actionType } });      

      // do action
      yield effect(...args);

      // hide loading
      wx.hideToast();
      //console.log('hide loading...');
      yield put({ type: HIDE, payload: { namespace, actionType } });
    };
  }

  return {
    extraReducers,
    onEffect,
  };
}

export default createLoading;