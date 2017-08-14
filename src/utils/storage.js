import wx from 'labrador';

// 缓存 封装
export default class Storage {
  static get(key) {
    return wx.getStorageSync(key);
  }

  static set(key, value) {
    return wx.setStorage({key:key,data:value})
  }

  static delete(key) {
    return wx.removeStorage(key);
  }

  static clear() {
    return wx.clearStorage();
  }
}