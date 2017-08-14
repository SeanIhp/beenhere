"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.gotoRouteLink = gotoRouteLink;

var _labrador = require('../npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gotoRouteLink(location) {
  Router.goto(location);
}

// 导航 封装

var Router = function () {
  function Router() {
    (0, _classCallCheck3.default)(this, Router);
  }

  (0, _createClass3.default)(Router, null, [{
    key: "goto",
    value: function goto(url) {
      return _labrador2.default.navigateTo({
        url: buildUrl(url)
      });
    }
  }, {
    key: "back",
    value: function back(num) {
      return _labrador2.default.navigateBack({
        delta: num
      });
    }
  }, {
    key: "redirect",
    value: function redirect(url) {
      return _labrador2.default.redirectTo({
        url: buildUrl(url)
      });
    }
  }, {
    key: "switchTab",
    value: function switchTab(url) {
      return _labrador2.default.switchTab({
        url: buildUrl(url)
      });
    }
  }, {
    key: "getCurrentPages",
    value: function getCurrentPages() {
      return _labrador2.default.currentPages;
    }
  }]);
  return Router;
}();

exports.default = Router;


function buildUrl(url) {
  url = url.startsWith("/") && !url.startsWith("/pages/") ? "/pages" + url : url;
  if (url.endsWith("/")) url = url + "index";
  return url;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlci11dGlsLmpzIl0sIm5hbWVzIjpbImdvdG9Sb3V0ZUxpbmsiLCJsb2NhdGlvbiIsIlJvdXRlciIsImdvdG8iLCJ1cmwiLCJuYXZpZ2F0ZVRvIiwiYnVpbGRVcmwiLCJudW0iLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInJlZGlyZWN0VG8iLCJzd2l0Y2hUYWIiLCJjdXJyZW50UGFnZXMiLCJzdGFydHNXaXRoIiwiZW5kc1dpdGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1FBRWdCQSxhLEdBQUFBLGE7O0FBRmhCOzs7Ozs7QUFFTyxTQUFTQSxhQUFULENBQXVCQyxRQUF2QixFQUFpQztBQUN0Q0MsU0FBT0MsSUFBUCxDQUFZRixRQUFaO0FBQ0Q7O0FBRUQ7O0lBQ3FCQyxNOzs7Ozs7O3lCQUNQRSxHLEVBQUs7QUFDZixhQUFPLG1CQUFHQyxVQUFILENBQWM7QUFDbkJELGFBQUtFLFNBQVNGLEdBQVQ7QUFEYyxPQUFkLENBQVA7QUFHRDs7O3lCQUVXRyxHLEVBQUs7QUFDZixhQUFPLG1CQUFHQyxZQUFILENBQWdCO0FBQ3JCQyxlQUFPRjtBQURjLE9BQWhCLENBQVA7QUFHRDs7OzZCQUVlSCxHLEVBQUs7QUFDbkIsYUFBTyxtQkFBR00sVUFBSCxDQUFjO0FBQ25CTixhQUFLRSxTQUFTRixHQUFUO0FBRGMsT0FBZCxDQUFQO0FBR0Q7Ozs4QkFFZ0JBLEcsRUFBSztBQUNwQixhQUFPLG1CQUFHTyxTQUFILENBQWE7QUFDbEJQLGFBQUtFLFNBQVNGLEdBQVQ7QUFEYSxPQUFiLENBQVA7QUFHRDs7O3NDQUV3QjtBQUN2QixhQUFPLG1CQUFHUSxZQUFWO0FBQ0Q7Ozs7O2tCQTNCa0JWLE07OztBQThCckIsU0FBU0ksUUFBVCxDQUFrQkYsR0FBbEIsRUFBdUI7QUFDckJBLFFBQU9BLElBQUlTLFVBQUosQ0FBZSxHQUFmLEtBQXVCLENBQUNULElBQUlTLFVBQUosQ0FBZSxTQUFmLENBQXhCLEdBQW9ELFdBQVdULEdBQS9ELEdBQXFFQSxHQUE1RTtBQUNBLE1BQUlBLElBQUlVLFFBQUosQ0FBYSxHQUFiLENBQUosRUFBdUJWLE1BQU1BLE1BQU0sT0FBWjtBQUN2QixTQUFPQSxHQUFQO0FBQ0QiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3eCBmcm9tICdsYWJyYWRvcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ290b1JvdXRlTGluayhsb2NhdGlvbikge1xyXG4gIFJvdXRlci5nb3RvKGxvY2F0aW9uKTtcclxufVxyXG5cclxuLy8g5a+86IiqIOWwgeijhVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIge1xyXG4gIHN0YXRpYyBnb3RvKHVybCkge1xyXG4gICAgcmV0dXJuIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6IGJ1aWxkVXJsKHVybClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGJhY2sobnVtKSB7XHJcbiAgICByZXR1cm4gd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgZGVsdGE6IG51bVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVkaXJlY3QodXJsKSB7XHJcbiAgICByZXR1cm4gd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgIHVybDogYnVpbGRVcmwodXJsKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc3dpdGNoVGFiKHVybCkge1xyXG4gICAgcmV0dXJuIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgIHVybDogYnVpbGRVcmwodXJsKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0Q3VycmVudFBhZ2VzKCkge1xyXG4gICAgcmV0dXJuIHd4LmN1cnJlbnRQYWdlcztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkVXJsKHVybCkge1xyXG4gIHVybCA9ICh1cmwuc3RhcnRzV2l0aChcIi9cIikgJiYgIXVybC5zdGFydHNXaXRoKFwiL3BhZ2VzL1wiKSA/IFwiL3BhZ2VzXCIgKyB1cmwgOiB1cmwpO1xyXG4gIGlmICh1cmwuZW5kc1dpdGgoXCIvXCIpKSB1cmwgPSB1cmwgKyBcImluZGV4XCI7XHJcbiAgcmV0dXJuIHVybDtcclxufSJdfQ==