import wx from 'labrador';

export function gotoRouteLink(location) {
  Router.goto(location);
}

// 导航 封装
export default class Router {
  static goto(url) {
    return wx.navigateTo({
      url: buildUrl(url)
    });
  }

  static back(num) {
    return wx.navigateBack({
      delta: num
    });
  }

  static redirect(url) {
    return wx.redirectTo({
      url: buildUrl(url)
    });
  }

  static switchTab(url) {
    return wx.switchTab({
      url: buildUrl(url)
    });
  }

  static getCurrentPages() {
    return wx.currentPages;
  }
}

function buildUrl(url) {
  url = (url.startsWith("/") && !url.startsWith("/pages/") ? "/pages" + url : url);
  if (url.endsWith("/")) url = url + "index";
  return url;
}