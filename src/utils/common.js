import wx from 'labrador';

export function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const isNot = (str)=> {
    if(str === ''){
      return false;
    } else if (str === null) {
      return false;
    } else if (str === undefined) {
      return false;
    } else {
      return true;
    }
}

export function isNotNullObj(obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return true;
    }
  }
  return false;
}

export function generateId() {
  return Date.now() + Math.random().toString().substr(2, 3);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 轻提示 几秒消失 
// isAlert 为true 需要用户确认
export const showToastMessage = (content, isAlert) => {
  if (!isAlert) {
    wx.showToast({
      title: content.toString()
    })
  } 
  else {
    wx.showModal({
      content: content.toString(),
      showCancel: false,
      success: function (res) {}
    });
  }
};
