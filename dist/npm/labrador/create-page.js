"use strict";var exports=module.exports={};/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-11
 * @author Liang <liang@maichong.it>
 */


// $Flow

var _keys = require('../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require('../babel-runtime/core-js/get-iterator.js');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set2 = require('../lodash/set.js');

var _set3 = _interopRequireDefault(_set2);

var _get2 = require('../lodash/get.js');

var _get3 = _interopRequireDefault(_get2);

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

var _utils = require('./utils.js');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 构建列表数据项
 * @param list   原始列表
 * @param item   新列表
 * @returns {{_: *}}
 */
function buildListItem(list, item) {
  if (list && list.length && item.__k !== undefined) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var t = _step.value;

        if (t.__k !== undefined && t.__k === item.__k) {
          return (0, _assign2.default)({}, t, item);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return item;
}
// $Flow


module.exports = function createPage(ComponentClass) {
  var config = {};
  var page = void 0;

  config.data = {};
  config.name = '';

  config._dispatch = function (event) {
    var com = this.root;
    var target = event.currentTarget || event.target;
    var path = target.dataset.path || '';
    // $Flow
    var handler = target.dataset['bind' + event.type] || target.dataset['catch' + event.type] || target.dataset[event.type];
    while (path) {
      var index = path.indexOf('.');
      var key = '';
      if (index === -1) {
        key = path;
        path = '';
      } else {
        key = path.substr(0, index);
        path = path.substr(index + 1);
      }
      com = com._children[key];
      if (!com) {
        console.error('Can not resolve component by path ' + target.dataset.path);
        return undefined;
      }
    }
    // $Flow 我们知道com在这里一定是一个组件，而非组件数组，但是Flow不知道
    if (com[handler]) {
      if (true) {
        // $Flow
        console.log('%c%s %s(%o)', 'color:#2abb40', com.id, handler, event);
      }
      return com[handler](event);
    }
    // $Flow 我们知道com在这里一定是一个组件，而非组件数组，但是Flow不知道
    console.error('Can not resolve event handle ' + com.id + '#' + handler);
    return undefined;
  };

  ['onRouteEnd', 'onUnload', 'onPullDownRefresh', 'onReachBottom'].forEach(function (name) {
    config[name] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      utils.callLifecycle(this.root, name, args);
    };
  });

  config.onLoad = function (options) {
    page = this;
    page.page = page;
    page._show = false;
    page._ready = false;
    page._loadOptions = options;

    page.updateData = function (newData) {
      // if (true) {
      //   console.log('%c%s updateData(%o)', 'color:#2a8f99', page.__route__, utils.getDebugObject(newData));
      // }
      var data = page.data;

      (0, _keys2.default)(newData).forEach(function (path) {
        var dataMap = newData[path];
        if (Array.isArray(dataMap)) {
          // 如果是组件列表，需要与之前列表数据合并，这样主要为了在子组件嵌套情况下，不丢失底层子组件数据
          var list = (0, _get3.default)(data, path); //原有data中列表数据
          var newList = dataMap.map(function (item) {
            return buildListItem(list, item);
          });
          (0, _set3.default)(data, path, newList);
        } else {
          (0, _set3.default)(data, path.split('.'), dataMap);
        }
      });

      page.setData(data);
    };

    var root = page.root = new ComponentClass({});
    root._config = {};
    root.page = page;

    root.id = page.__route__;
    root.page = page;
    try {
      root._init('');
    } catch (error) {
      console.error(error.stack);
    }
    if (root.onLoad) {
      root.onLoad(options);
    }
  };

  config.onReady = function () {
    page._ready = true;
    utils.callLifecycle(this.root, 'onReady');
  };

  config.onShow = function () {
    page._show = true;
    utils.callLifecycle(this.root, 'onShow');
  };

  config.onHide = function () {
    page._show = false;
    utils.callLifecycle(this.root, 'onHide');
  };

  if (ComponentClass.prototype.onShareAppMessage) {
    config.onShareAppMessage = function () {
      var share = this.root.onShareAppMessage();
      if (true && !share) {
        console.error(this.root.id + ' onShareAppMessage() 没有返回分享数据');
      }
      return share;
    };
  }

  return config;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS1wYWdlLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwiYnVpbGRMaXN0SXRlbSIsImxpc3QiLCJpdGVtIiwibGVuZ3RoIiwiX19rIiwidW5kZWZpbmVkIiwidCIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVQYWdlIiwiQ29tcG9uZW50Q2xhc3MiLCJjb25maWciLCJwYWdlIiwiZGF0YSIsIm5hbWUiLCJfZGlzcGF0Y2giLCJldmVudCIsImNvbSIsInJvb3QiLCJ0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwicGF0aCIsImRhdGFzZXQiLCJoYW5kbGVyIiwidHlwZSIsImluZGV4IiwiaW5kZXhPZiIsImtleSIsInN1YnN0ciIsIl9jaGlsZHJlbiIsImNvbnNvbGUiLCJlcnJvciIsIl9fREVWX18iLCJsb2ciLCJpZCIsImZvckVhY2giLCJhcmdzIiwiY2FsbExpZmVjeWNsZSIsIm9uTG9hZCIsIm9wdGlvbnMiLCJfc2hvdyIsIl9yZWFkeSIsIl9sb2FkT3B0aW9ucyIsInVwZGF0ZURhdGEiLCJuZXdEYXRhIiwiZGF0YU1hcCIsIkFycmF5IiwiaXNBcnJheSIsIm5ld0xpc3QiLCJtYXAiLCJzcGxpdCIsInNldERhdGEiLCJfY29uZmlnIiwiX19yb3V0ZV9fIiwiX2luaXQiLCJzdGFjayIsIm9uUmVhZHkiLCJvblNob3ciLCJvbkhpZGUiLCJwcm90b3R5cGUiLCJvblNoYXJlQXBwTWVzc2FnZSIsInNoYXJlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBUUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLEs7Ozs7OztBQUVaOzs7Ozs7QUFNQSxTQUFTQyxhQUFULENBQXVCQyxJQUF2QixFQUE4Q0MsSUFBOUMsRUFBd0U7QUFDdEUsTUFBSUQsUUFBUUEsS0FBS0UsTUFBYixJQUF1QkQsS0FBS0UsR0FBTCxLQUFhQyxTQUF4QyxFQUFtRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNqRCxzREFBY0osSUFB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S0FBUixDQUFjQSxNQUFNd0IsS0FBcEI7QUFDRDtBQUNELFFBQUlyQyxLQUFLb0IsTUFBVCxFQUFpQjtBQUNmcEIsV0FBS29CLE1BQUwsQ0FBWUMsT0FBWjtBQUNEO0FBQ0YsR0ExQ0Q7O0FBNENBNUIsU0FBTzZDLE9BQVAsR0FBaUIsWUFBWTtBQUMzQjVDLFNBQUs2QixNQUFMLEdBQWMsSUFBZDtBQUNBMUMsVUFBTXNDLGFBQU4sQ0FBb0IsS0FBS25CLElBQXpCLEVBQStCLFNBQS9CO0FBQ0QsR0FIRDs7QUFLQVAsU0FBTzhDLE1BQVAsR0FBZ0IsWUFBWTtBQUMxQjdDLFNBQUs0QixLQUFMLEdBQWEsSUFBYjtBQUNBekMsVUFBTXNDLGFBQU4sQ0FBb0IsS0FBS25CLElBQXpCLEVBQStCLFFBQS9CO0FBQ0QsR0FIRDs7QUFLQVAsU0FBTytDLE1BQVAsR0FBZ0IsWUFBWTtBQUMxQjlDLFNBQUs0QixLQUFMLEdBQWEsS0FBYjtBQUNBekMsVUFBTXNDLGFBQU4sQ0FBb0IsS0FBS25CLElBQXpCLEVBQStCLFFBQS9CO0FBQ0QsR0FIRDs7QUFLQSxNQUFJUixlQUFlaUQsU0FBZixDQUF5QkMsaUJBQTdCLEVBQWdEO0FBQzlDakQsV0FBT2lELGlCQUFQLEdBQTJCLFlBQVk7QUFDckMsVUFBSUMsUUFBUSxLQUFLM0MsSUFBTCxDQUFVMEMsaUJBQVYsRUFBWjtBQUNBLFVBQUk1QixXQUFXLENBQUM2QixLQUFoQixFQUF1QjtBQUNyQi9CLGdCQUFRQyxLQUFSLENBQWMsS0FBS2IsSUFBTCxDQUFVZ0IsRUFBVixHQUFlLCtCQUE3QjtBQUNEO0FBQ0QsYUFBTzJCLEtBQVA7QUFDRCxLQU5EO0FBT0Q7O0FBRUQsU0FBT2xELE1BQVA7QUFDRCxDQXhIRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IE1haWNob25nIFNvZnR3YXJlIEx0ZC4gMjAxNiBodHRwOi8vbWFpY2hvbmcuaXRcbiAqIEBkYXRlIDIwMTYtMTAtMTFcbiAqIEBhdXRob3IgTGlhbmcgPGxpYW5nQG1haWNob25nLml0PlxuICovXG5cbi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gJEZsb3dcbmltcG9ydCBfc2V0IGZyb20gJ2xvZGFzaC9zZXQnO1xuLy8gJEZsb3dcbmltcG9ydCBfZ2V0IGZyb20gJ2xvZGFzaC9nZXQnO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiDmnoTlu7rliJfooajmlbDmja7poblcbiAqIEBwYXJhbSBsaXN0ICAg5Y6f5aeL5YiX6KGoXG4gKiBAcGFyYW0gaXRlbSAgIOaWsOWIl+ihqFxuICogQHJldHVybnMge3tfOiAqfX1cbiAqL1xuZnVuY3Rpb24gYnVpbGRMaXN0SXRlbShsaXN0OiBBcnJheTwkRGF0YU1hcD4sIGl0ZW06ICREYXRhTWFwKTogJERhdGFNYXAge1xuICBpZiAobGlzdCAmJiBsaXN0Lmxlbmd0aCAmJiBpdGVtLl9fayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChsZXQgdCBvZiBsaXN0KSB7XG4gICAgICBpZiAodC5fX2sgIT09IHVuZGVmaW5lZCAmJiB0Ll9fayA9PT0gaXRlbS5fX2spIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHQsIGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gaXRlbTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVQYWdlKENvbXBvbmVudENsYXNzOiBDbGFzczxDb21wb25lbnQ+KSB7XG4gIGxldCBjb25maWcgPSB7fTtcbiAgbGV0IHBhZ2U6ICRQYWdlO1xuXG4gIGNvbmZpZy5kYXRhID0ge307XG4gIGNvbmZpZy5uYW1lID0gJyc7XG5cbiAgY29uZmlnLl9kaXNwYXRjaCA9IGZ1bmN0aW9uIChldmVudDogJEV2ZW50KTogP3N0cmluZyB7XG4gICAgbGV0IGNvbTogJENoaWxkID0gdGhpcy5yb290O1xuICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0IHx8IGV2ZW50LnRhcmdldDtcbiAgICBsZXQgcGF0aCA9IHRhcmdldC5kYXRhc2V0LnBhdGggfHwgJyc7XG4gICAgLy8gJEZsb3dcbiAgICBsZXQgaGFuZGxlcjogc3RyaW5nID0gdGFyZ2V0LmRhdGFzZXRbJ2JpbmQnICsgZXZlbnQudHlwZV1cbiAgICAgIHx8IHRhcmdldC5kYXRhc2V0WydjYXRjaCcgKyBldmVudC50eXBlXVxuICAgICAgfHwgdGFyZ2V0LmRhdGFzZXRbZXZlbnQudHlwZV07XG4gICAgd2hpbGUgKHBhdGgpIHtcbiAgICAgIGxldCBpbmRleCA9IHBhdGguaW5kZXhPZignLicpO1xuICAgICAgbGV0IGtleSA9ICcnO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBrZXkgPSBwYXRoO1xuICAgICAgICBwYXRoID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgPSBwYXRoLnN1YnN0cigwLCBpbmRleCk7XG4gICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cihpbmRleCArIDEpO1xuICAgICAgfVxuICAgICAgY29tID0gY29tLl9jaGlsZHJlbltrZXldO1xuICAgICAgaWYgKCFjb20pIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQ2FuIG5vdCByZXNvbHZlIGNvbXBvbmVudCBieSBwYXRoICcgKyB0YXJnZXQuZGF0YXNldC5wYXRoKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gJEZsb3cg5oiR5Lus55+l6YGTY29t5Zyo6L+Z6YeM5LiA5a6a5piv5LiA5Liq57uE5Lu277yM6ICM6Z2e57uE5Lu25pWw57uE77yM5L2G5pivRmxvd+S4jeefpemBk1xuICAgIGlmIChjb21baGFuZGxlcl0pIHtcbiAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIC8vICRGbG93XG4gICAgICAgIGNvbnNvbGUubG9nKCclYyVzICVzKCVvKScsICdjb2xvcjojMmFiYjQwJywgY29tLmlkLCBoYW5kbGVyLCBldmVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29tW2hhbmRsZXJdKGV2ZW50KTtcbiAgICB9XG4gICAgLy8gJEZsb3cg5oiR5Lus55+l6YGTY29t5Zyo6L+Z6YeM5LiA5a6a5piv5LiA5Liq57uE5Lu277yM6ICM6Z2e57uE5Lu25pWw57uE77yM5L2G5pivRmxvd+S4jeefpemBk1xuICAgIGNvbnNvbGUuZXJyb3IoJ0NhbiBub3QgcmVzb2x2ZSBldmVudCBoYW5kbGUgJyArIGNvbS5pZCArICcjJyArIGhhbmRsZXIpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgWydvblJvdXRlRW5kJywgJ29uVW5sb2FkJywgJ29uUHVsbERvd25SZWZyZXNoJywgJ29uUmVhY2hCb3R0b20nXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgY29uZmlnW25hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgIHV0aWxzLmNhbGxMaWZlY3ljbGUodGhpcy5yb290LCBuYW1lLCBhcmdzKTtcbiAgICB9O1xuICB9KTtcblxuICBjb25maWcub25Mb2FkID0gZnVuY3Rpb24gKG9wdGlvbnM6IE9iamVjdCkge1xuICAgIHBhZ2UgPSB0aGlzO1xuICAgIHBhZ2UucGFnZSA9IHBhZ2U7XG4gICAgcGFnZS5fc2hvdyA9IGZhbHNlO1xuICAgIHBhZ2UuX3JlYWR5ID0gZmFsc2U7XG4gICAgcGFnZS5fbG9hZE9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgcGFnZS51cGRhdGVEYXRhID0gZnVuY3Rpb24gKG5ld0RhdGE6IE9iamVjdCkge1xuICAgICAgLy8gaWYgKF9fREVWX18pIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coJyVjJXMgdXBkYXRlRGF0YSglbyknLCAnY29sb3I6IzJhOGY5OScsIHBhZ2UuX19yb3V0ZV9fLCB1dGlscy5nZXREZWJ1Z09iamVjdChuZXdEYXRhKSk7XG4gICAgICAvLyB9XG4gICAgICBsZXQgZGF0YSA9IHBhZ2UuZGF0YTtcblxuICAgICAgT2JqZWN0LmtleXMobmV3RGF0YSkuZm9yRWFjaCgocGF0aCkgPT4ge1xuICAgICAgICBsZXQgZGF0YU1hcCA9IG5ld0RhdGFbcGF0aF07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFNYXApKSB7XG4gICAgICAgICAgLy8g5aaC5p6c5piv57uE5Lu25YiX6KGo77yM6ZyA6KaB5LiO5LmL5YmN5YiX6KGo5pWw5o2u5ZCI5bm277yM6L+Z5qC35Li76KaB5Li65LqG5Zyo5a2Q57uE5Lu25bWM5aWX5oOF5Ya15LiL77yM5LiN5Lii5aSx5bqV5bGC5a2Q57uE5Lu25pWw5o2uXG4gICAgICAgICAgbGV0IGxpc3QgPSBfZ2V0KGRhdGEsIHBhdGgpOyAvL+WOn+aciWRhdGHkuK3liJfooajmlbDmja5cbiAgICAgICAgICBsZXQgbmV3TGlzdCA9IGRhdGFNYXAubWFwKChpdGVtKSA9PiBidWlsZExpc3RJdGVtKGxpc3QsIGl0ZW0pKTtcbiAgICAgICAgICBfc2V0KGRhdGEsIHBhdGgsIG5ld0xpc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9zZXQoZGF0YSwgcGF0aC5zcGxpdCgnLicpLCBkYXRhTWFwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHBhZ2Uuc2V0RGF0YShkYXRhKTtcbiAgICB9O1xuXG4gICAgbGV0IHJvb3QgPSBwYWdlLnJvb3QgPSBuZXcgQ29tcG9uZW50Q2xhc3Moe30pO1xuICAgIHJvb3QuX2NvbmZpZyA9IHt9O1xuICAgIHJvb3QucGFnZSA9IHBhZ2U7XG5cbiAgICByb290LmlkID0gcGFnZS5fX3JvdXRlX187XG4gICAgcm9vdC5wYWdlID0gcGFnZTtcbiAgICB0cnkge1xuICAgICAgcm9vdC5faW5pdCgnJyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3Iuc3RhY2spO1xuICAgIH1cbiAgICBpZiAocm9vdC5vbkxvYWQpIHtcbiAgICAgIHJvb3Qub25Mb2FkKG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICBjb25maWcub25SZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgICBwYWdlLl9yZWFkeSA9IHRydWU7XG4gICAgdXRpbHMuY2FsbExpZmVjeWNsZSh0aGlzLnJvb3QsICdvblJlYWR5Jyk7XG4gIH07XG5cbiAgY29uZmlnLm9uU2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICBwYWdlLl9zaG93ID0gdHJ1ZTtcbiAgICB1dGlscy5jYWxsTGlmZWN5Y2xlKHRoaXMucm9vdCwgJ29uU2hvdycpO1xuICB9O1xuXG4gIGNvbmZpZy5vbkhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcGFnZS5fc2hvdyA9IGZhbHNlO1xuICAgIHV0aWxzLmNhbGxMaWZlY3ljbGUodGhpcy5yb290LCAnb25IaWRlJyk7XG4gIH07XG5cbiAgaWYgKENvbXBvbmVudENsYXNzLnByb3RvdHlwZS5vblNoYXJlQXBwTWVzc2FnZSkge1xuICAgIGNvbmZpZy5vblNoYXJlQXBwTWVzc2FnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBzaGFyZSA9IHRoaXMucm9vdC5vblNoYXJlQXBwTWVzc2FnZSgpO1xuICAgICAgaWYgKF9fREVWX18gJiYgIXNoYXJlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5yb290LmlkICsgJyBvblNoYXJlQXBwTWVzc2FnZSgpIOayoeaciei/lOWbnuWIhuS6q+aVsOaNricpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNoYXJlO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gY29uZmlnO1xufTtcblxuIl19