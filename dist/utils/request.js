"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

exports.default = xFetch;
exports.buildRequestUrl = buildRequestUrl;

var _labrador = require('../npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

var _alRequest = require('../npm/al-request/index.js');

var _alRequest2 = _interopRequireDefault(_alRequest);

var _dvaUtil = require('../app/dva-util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function urlProxy(url) {
  if (!url.startsWith('/')) return url;else {
    return _alRequest2.default.getOptions().apiRoot + url;
  }
}

function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }

  var error = new Error(response.statusText || response.data);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  var resp = response.data;
  //console.log(resp);
  return resp;
}

function xFetch(url, options) {
  return new _promise2.default(function (resolve, reject) {
    var method = "GET";
    if (options.method) method = options.method.toUpperCase();
    var data = options['body'] ? options['body'] : options['data'];
    var header = options['headers'];
    url = buildRequestUrl(url);
    url = urlProxy(url);

    _labrador2.default.request({
      method: method,
      url: url,
      data: data,
      header: header
    }).then(checkStatus).then(parseJSON).then(function (response) {
      if (response.returncode === undefined) resolve({ body: response });else {
        if (response.returncode === '0') resolve({ body: response });else throw new Error(response.data);
      }
    }).catch(function (error) {
      reject(error);
    });
  });
}

function buildRequestUrl(url) {
  var loginInfo = (0, _dvaUtil.getState)('loginInfo');
  var Referrer = (0, _dvaUtil.getState)('Referrer');
  var state = null;
  var entid = null;
  if (Referrer['query'] && Referrer['query']['ent_id']) entid = Referrer.query.ent_id;
  if (Referrer['query'] && Referrer['query']['state']) state = Referrer.query.state;
  if (loginInfo.openid || entid) {
    url = url + (url.indexOf('?') < 0 ? '?' : '&') + 'ent_id=' + (loginInfo.openid ? loginInfo.entid : entid);
  }
  if (state && url.indexOf('/omw-service-') >= 0) {
    url = url + (url.indexOf('?') < 0 ? '?' : '&') + 'state=' + state;
  }

  return url;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsieEZldGNoIiwiYnVpbGRSZXF1ZXN0VXJsIiwidXJsUHJveHkiLCJ1cmwiLCJzdGFydHNXaXRoIiwiZ2V0T3B0aW9ucyIsImFwaVJvb3QiLCJjaGVja1N0YXR1cyIsInJlc3BvbnNlIiwic3RhdHVzQ29kZSIsImVycm9yIiwiRXJyb3IiLCJzdGF0dXNUZXh0IiwiZGF0YSIsInBhcnNlSlNPTiIsInJlc3AiLCJvcHRpb25zIiwicmVzb2x2ZSIsInJlamVjdCIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiaGVhZGVyIiwicmVxdWVzdCIsInRoZW4iLCJyZXR1cm5jb2RlIiwidW5kZWZpbmVkIiwiYm9keSIsImNhdGNoIiwibG9naW5JbmZvIiwiUmVmZXJyZXIiLCJzdGF0ZSIsImVudGlkIiwicXVlcnkiLCJlbnRfaWQiLCJvcGVuaWQiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQTRCd0JBLE07UUFnQ1JDLGUsR0FBQUEsZTs7QUE1RGhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLFNBQVNDLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQ0E7QUFDRSxNQUFJLENBQUNBLElBQUlDLFVBQUosQ0FBZSxHQUFmLENBQUwsRUFBMEIsT0FBT0QsR0FBUCxDQUExQixLQUNLO0FBQ0gsV0FBTyxvQkFBUUUsVUFBUixHQUFxQkMsT0FBckIsR0FBK0JILEdBQXRDO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTSSxXQUFULENBQXFCQyxRQUFyQixFQUErQjtBQUM3QixNQUFJQSxTQUFTQyxVQUFULElBQXVCLEdBQXZCLElBQThCRCxTQUFTQyxVQUFULEdBQXNCLEdBQXhELEVBQTZEO0FBQzNELFdBQU9ELFFBQVA7QUFDRDs7QUFFRCxNQUFNRSxRQUFRLElBQUlDLEtBQUosQ0FBVUgsU0FBU0ksVUFBVCxJQUF1QkosU0FBU0ssSUFBMUMsQ0FBZDtBQUNBSCxRQUFNRixRQUFOLEdBQWlCQSxRQUFqQjtBQUNBLFFBQU1FLEtBQU47QUFDRDs7QUFFRCxTQUFTSSxTQUFULENBQW1CTixRQUFuQixFQUE2QjtBQUMzQixNQUFNTyxPQUFPUCxTQUFTSyxJQUF0QjtBQUNBO0FBQ0EsU0FBT0UsSUFBUDtBQUNEOztBQUVjLFNBQVNmLE1BQVQsQ0FBZ0JHLEdBQWhCLEVBQXFCYSxPQUFyQixFQUE4QjtBQUMzQyxTQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxRQUFJQyxTQUFTLEtBQWI7QUFDQSxRQUFJSCxRQUFRRyxNQUFaLEVBQW9CQSxTQUFTSCxRQUFRRyxNQUFSLENBQWVDLFdBQWYsRUFBVDtBQUNwQixRQUFJUCxPQUFPRyxRQUFRLE1BQVIsSUFBZ0JBLFFBQVEsTUFBUixDQUFoQixHQUFnQ0EsUUFBUSxNQUFSLENBQTNDO0FBQ0EsUUFBSUssU0FBU0wsUUFBUSxTQUFSLENBQWI7QUFDQWIsVUFBTUYsZ0JBQWdCRSxHQUFoQixDQUFOO0FBQ0FBLFVBQU1ELFNBQVNDLEdBQVQsQ0FBTjs7QUFFQSx1QkFBR21CLE9BQUgsQ0FBVztBQUNUSCxvQkFEUztBQUVUaEIsY0FGUztBQUdUVSxnQkFIUztBQUlUUTtBQUpTLEtBQVgsRUFNQ0UsSUFORCxDQU1NaEIsV0FOTixFQU9DZ0IsSUFQRCxDQU9NVCxTQVBOLEVBUUNTLElBUkQsQ0FRTSxVQUFDZixRQUFELEVBQ047QUFDRSxVQUFJQSxTQUFTZ0IsVUFBVCxLQUF3QkMsU0FBNUIsRUFBdUNSLFFBQVEsRUFBRVMsTUFBTWxCLFFBQVIsRUFBUixFQUF2QyxLQUNLO0FBQ0gsWUFBSUEsU0FBU2dCLFVBQVQsS0FBd0IsR0FBNUIsRUFBaUNQLFFBQVEsRUFBRVMsTUFBTWxCLFFBQVIsRUFBUixFQUFqQyxLQUNLLE1BQU0sSUFBSUcsS0FBSixDQUFVSCxTQUFTSyxJQUFuQixDQUFOO0FBQ047QUFDRixLQWZELEVBZ0JDYyxLQWhCRCxDQWdCTyxVQUFDakIsS0FBRCxFQUNQO0FBQ0VRLGFBQU9SLEtBQVA7QUFDRCxLQW5CRDtBQW9CRCxHQTVCTSxDQUFQO0FBNkJEOztBQUVNLFNBQVNULGVBQVQsQ0FBeUJFLEdBQXpCLEVBQThCO0FBQ25DLE1BQUl5QixZQUFZLHVCQUFTLFdBQVQsQ0FBaEI7QUFDQSxNQUFJQyxXQUFXLHVCQUFTLFVBQVQsQ0FBZjtBQUNBLE1BQUlDLFFBQVEsSUFBWjtBQUNBLE1BQUlDLFFBQVEsSUFBWjtBQUNBLE1BQUlGLFNBQVMsT0FBVCxLQUFxQkEsU0FBUyxPQUFULEVBQWtCLFFBQWxCLENBQXpCLEVBQXNERSxRQUFRRixTQUFTRyxLQUFULENBQWVDLE1BQXZCO0FBQ3RELE1BQUlKLFNBQVMsT0FBVCxLQUFxQkEsU0FBUyxPQUFULEVBQWtCLE9BQWxCLENBQXpCLEVBQXFEQyxRQUFRRCxTQUFTRyxLQUFULENBQWVGLEtBQXZCO0FBQ3JELE1BQUlGLFVBQVVNLE1BQVYsSUFBb0JILEtBQXhCLEVBQStCO0FBQzdCNUIsVUFBTUEsT0FBT0EsSUFBSWdDLE9BQUosQ0FBWSxHQUFaLElBQWlCLENBQWpCLEdBQW1CLEdBQW5CLEdBQXVCLEdBQTlCLElBQXFDLFNBQXJDLElBQWtEUCxVQUFVTSxNQUFWLEdBQWlCTixVQUFVRyxLQUEzQixHQUFpQ0EsS0FBbkYsQ0FBTjtBQUNEO0FBQ0QsTUFBSUQsU0FBUzNCLElBQUlnQyxPQUFKLENBQVksZUFBWixLQUFnQyxDQUE3QyxFQUFnRDtBQUM5Q2hDLFVBQU1BLE9BQU9BLElBQUlnQyxPQUFKLENBQVksR0FBWixJQUFpQixDQUFqQixHQUFtQixHQUFuQixHQUF1QixHQUE5QixJQUFxQyxRQUFyQyxHQUFnREwsS0FBdEQ7QUFDRDs7QUFFRCxTQUFPM0IsR0FBUDtBQUNEIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd3ggZnJvbSAnbGFicmFkb3InO1xyXG5pbXBvcnQgcmVxdWVzdCBmcm9tICdhbC1yZXF1ZXN0JztcclxuaW1wb3J0IHsgZ2V0U3RhdGUgfSBmcm9tICcuLi9hcHAvZHZhLXV0aWwnO1xyXG5cclxuZnVuY3Rpb24gdXJsUHJveHkodXJsKSBcclxue1xyXG4gIGlmICghdXJsLnN0YXJ0c1dpdGgoJy8nKSkgcmV0dXJuIHVybDtcclxuICBlbHNlIHtcclxuICAgIHJldHVybiByZXF1ZXN0LmdldE9wdGlvbnMoKS5hcGlSb290ICsgdXJsO1xyXG4gIH0gIFxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja1N0YXR1cyhyZXNwb25zZSkge1xyXG4gIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXNDb2RlIDwgMzAwKSB7XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0IHx8IHJlc3BvbnNlLmRhdGEpO1xyXG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XHJcbiAgdGhyb3cgZXJyb3I7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlSlNPTihyZXNwb25zZSkge1xyXG4gIGNvbnN0IHJlc3AgPSByZXNwb25zZS5kYXRhO1xyXG4gIC8vY29uc29sZS5sb2cocmVzcCk7XHJcbiAgcmV0dXJuIHJlc3A7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHhGZXRjaCh1cmwsIG9wdGlvbnMpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgbGV0IG1ldGhvZCA9IFwiR0VUXCI7XHJcbiAgICBpZiAob3B0aW9ucy5tZXRob2QpIG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XHJcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnNbJ2JvZHknXT9vcHRpb25zWydib2R5J106b3B0aW9uc1snZGF0YSddO1xyXG4gICAgbGV0IGhlYWRlciA9IG9wdGlvbnNbJ2hlYWRlcnMnXTtcclxuICAgIHVybCA9IGJ1aWxkUmVxdWVzdFVybCh1cmwpO1xyXG4gICAgdXJsID0gdXJsUHJveHkodXJsKTtcclxuXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgbWV0aG9kLFxyXG4gICAgICB1cmwsXHJcbiAgICAgIGRhdGEsXHJcbiAgICAgIGhlYWRlclxyXG4gICAgfSlcclxuICAgIC50aGVuKGNoZWNrU3RhdHVzKVxyXG4gICAgLnRoZW4ocGFyc2VKU09OKVxyXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiBcclxuICAgIHtcclxuICAgICAgaWYgKHJlc3BvbnNlLnJldHVybmNvZGUgPT09IHVuZGVmaW5lZCkgcmVzb2x2ZSh7IGJvZHk6IHJlc3BvbnNlIH0pO1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpZiAocmVzcG9uc2UucmV0dXJuY29kZSA9PT0gJzAnKSByZXNvbHZlKHsgYm9keTogcmVzcG9uc2UgfSk7XHJcbiAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycm9yKSA9PiBcclxuICAgIHsgXHJcbiAgICAgIHJlamVjdChlcnJvcik7IFxyXG4gICAgfSk7XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUmVxdWVzdFVybCh1cmwpIHtcclxuICBsZXQgbG9naW5JbmZvID0gZ2V0U3RhdGUoJ2xvZ2luSW5mbycpO1xyXG4gIHZhciBSZWZlcnJlciA9IGdldFN0YXRlKCdSZWZlcnJlcicpO1xyXG4gIGxldCBzdGF0ZSA9IG51bGw7XHJcbiAgbGV0IGVudGlkID0gbnVsbDtcclxuICBpZiAoUmVmZXJyZXJbJ3F1ZXJ5J10gJiYgUmVmZXJyZXJbJ3F1ZXJ5J11bJ2VudF9pZCddKSBlbnRpZCA9IFJlZmVycmVyLnF1ZXJ5LmVudF9pZDtcclxuICBpZiAoUmVmZXJyZXJbJ3F1ZXJ5J10gJiYgUmVmZXJyZXJbJ3F1ZXJ5J11bJ3N0YXRlJ10pIHN0YXRlID0gUmVmZXJyZXIucXVlcnkuc3RhdGU7XHJcbiAgaWYgKGxvZ2luSW5mby5vcGVuaWQgfHwgZW50aWQpIHtcclxuICAgIHVybCA9IHVybCArICh1cmwuaW5kZXhPZignPycpPDA/Jz8nOicmJykgKyAnZW50X2lkPScgKyAobG9naW5JbmZvLm9wZW5pZD9sb2dpbkluZm8uZW50aWQ6ZW50aWQpO1xyXG4gIH1cclxuICBpZiAoc3RhdGUgJiYgdXJsLmluZGV4T2YoJy9vbXctc2VydmljZS0nKSA+PSAwKSB7XHJcbiAgICB1cmwgPSB1cmwgKyAodXJsLmluZGV4T2YoJz8nKTwwPyc/JzonJicpICsgJ3N0YXRlPScgKyBzdGF0ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB1cmw7XHJcbn0iXX0=