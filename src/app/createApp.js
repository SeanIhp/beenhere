import createDva from './dva';
import wx from 'labrador';

export var app = {};
export function createDvaApp(opts) {
  // new instance
  app = createDva(opts);
  return app;
}

export function wxGetApp() {
  return wx.app;
}

export function wxGetWx() {
  return wx.wx;
}
