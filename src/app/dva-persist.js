import AsyncStorage from 'labrador-storage';
import immutable from 'seamless-immutable';
import { persistStore } from 'redux-persist';

const immutableTransform = {
  out(raw) {
    //return immutable(raw);
    return raw;
  },
  in(state) {
    return state.asMutable ? state.asMutable({ deep: true }) : state;
  }
}

// Redux 数据持久化设置
const reduxPersist = {
  storage: AsyncStorage,
  blacklist: [    // 可选，你【不想】存储的Redux store数据key列表
  ], 
  whitelist: [    // 可选，你【只想】存储的Redux store数据key列表
    //'example'
    'shoppingcar'
  ], 
  transforms: [
    immutableTransform
  ]
};

export default function dvaPersistStore(store,config = reduxPersist,callback = ()=>{}) {
  persistStore(store, config, callback);
}