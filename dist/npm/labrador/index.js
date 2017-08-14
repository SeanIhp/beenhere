"use strict";var exports=module.exports={};/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-09-26
 * @author Liang <liang@maichong.it>
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._createPage = exports.PropTypes = exports.Component = undefined;

var _promise = require('../babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

var _propTypes = require('./prop-types.js');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createPage2 = require('./create-page.js');

var _createPage3 = _interopRequireDefault(_createPage2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 特别指定的wx对象中不进行Promise封装的方法
var noPromiseMethods = {
  clearStorage: 1,
  hideToast: 1,
  showNavigationBarLoading: 1,
  hideNavigationBarLoading: 1,
  drawCanvas: 1,
  canvasToTempFilePath: 1,
  hideKeyboard: 1
};

var labrador = {
  // 原始wx对象
  wx: wx,
  // getApp() 优雅的封装
  get app() {
    return getApp();
  },

  // getCurrentPages() 优雅的封装
  get currentPages() {
    return getCurrentPages();
  }
};

if (true) {
  Object.defineProperty(labrador, 'Component', {
    get: function get() {
      console.error('labrador 0.6版本之后废弃了 wx.Component，请使用 ' + '"import wx, { Component, PropsTypes } from \'labrador\'" 代替 ' + '"import wx from \'labrador\'"');
    }
  });
  Object.defineProperty(labrador, 'PropsTypes', {
    get: function get() {
      console.error('labrador 0.6版本之后废弃了 wx.PropsTypes，请使用 ' + '"import wx, { Component, PropsTypes } from \'labrador\'" 代替 ' + '"import wx from \'labrador\'"');
    }
  });
}

(0, _keys2.default)(wx).forEach(function (key) {
  if (noPromiseMethods[key] // 特别指定的方法
  || /^(on|create|stop|pause|close)/.test(key // 以on* create* stop* pause* close* 开头的方法
  ) || /\w+Sync$/.test(key // 以Sync结尾的方法
  )) {
    // 不进行Promise封装
    labrador[key] = function () {
      if (true) {
        var res = wx[key].apply(wx, arguments);
        if (!res) {
          res = {};
        }
        if (res && (typeof res === 'undefined' ? 'undefined' : (0, _typeof3.default)(res)) === 'object') {
          res.then = function () {
            console.warn('wx.' + key + ' is not a async function, you should not use await ');
          };
        }
        return res;
      }
      return wx[key].apply(wx, arguments);
    };
    return;
  }

  // 其余方法自动Promise化
  labrador[key] = function (obj) {
    obj = obj || {};
    return new _promise2.default(function (resolve, reject) {
      obj.success = resolve;
      obj.fail = function (res) {
        if (res && res.errMsg) {
          reject(new Error(res.errMsg));
        } else {
          reject(res);
        }
      };
      wx[key](obj);
    });
  };
});

exports.default = labrador;
exports.Component = _component2.default;
exports.PropTypes = _propTypes2.default;
exports._createPage = _createPage3.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm5vUHJvbWlzZU1ldGhvZHMiLCJjbGVhclN0b3JhZ2UiLCJoaWRlVG9hc3QiLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJkcmF3Q2FudmFzIiwiY2FudmFzVG9UZW1wRmlsZVBhdGgiLCJoaWRlS2V5Ym9hcmQiLCJsYWJyYWRvciIsInd4IiwiYXBwIiwiZ2V0QXBwIiwiY3VycmVudFBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwiX19ERVZfXyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiY29uc29sZSIsImVycm9yIiwiZm9yRWFjaCIsImtleSIsInRlc3QiLCJyZXMiLCJhcHBseSIsImFyZ3VtZW50cyIsInRoZW4iLCJ3YXJuIiwib2JqIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJmYWlsIiwiZXJyTXNnIiwiRXJyb3IiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJfY3JlYXRlUGFnZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQU1BLG1CQUFtQjtBQUN2QkMsZ0JBQWMsQ0FEUztBQUV2QkMsYUFBVyxDQUZZO0FBR3ZCQyw0QkFBMEIsQ0FISDtBQUl2QkMsNEJBQTBCLENBSkg7QUFLdkJDLGNBQVksQ0FMVztBQU12QkMsd0JBQXNCLENBTkM7QUFPdkJDLGdCQUFjO0FBUFMsQ0FBekI7O0FBVUEsSUFBTUMsV0FBVztBQUNmO0FBQ0FDLFFBRmU7QUFHZjtBQUNBLE1BQUlDLEdBQUosR0FBVTtBQUNSLFdBQU9DLFFBQVA7QUFDRCxHQU5jOztBQVFmO0FBQ0EsTUFBSUMsWUFBSixHQUFtQjtBQUNqQixXQUFPQyxpQkFBUDtBQUNEO0FBWGMsQ0FBakI7O0FBY0EsSUFBSUMsT0FBSixFQUFhO0FBQ1hDLFNBQU9DLGNBQVAsQ0FBc0JSLFFBQXRCLEVBQWdDLFdBQWhDLEVBQTZDO0FBQzNDUyxPQUQyQyxpQkFDdEM7QUFDSEMsY0FBUUMsS0FBUixDQUFjLDBDQUNaLDhEQURZLEdBRVosK0JBRkY7QUFHRDtBQUwwQyxHQUE3QztBQU9BSixTQUFPQyxjQUFQLENBQXNCUixRQUF0QixFQUFnQyxZQUFoQyxFQUE4QztBQUM1Q1MsT0FENEMsaUJBQ3ZDO0FBQ0hDLGNBQVFDLEtBQVIsQ0FBYywyQ0FDWiw4REFEWSxHQUVaLCtCQUZGO0FBR0Q7QUFMMkMsR0FBOUM7QUFPRDs7QUFFRCxvQkFBWVYsRUFBWixFQUFnQlcsT0FBaEIsQ0FBd0IsVUFBQ0MsR0FBRCxFQUFTO0FBQy9CLE1BQ0VyQixpQkFBaUJxQixHQUFqQixFQUE2QztBQUE3QyxLQUNHLGdDQUFnQ0MsSUFBaEMsQ0FBcUNELEdBQXJDLENBQTBDO0FBQTFDLEdBREgsSUFFRyxXQUFXQyxJQUFYLENBQWdCRCxHQUFoQixDQUEwQztBQUExQyxHQUhMLEVBSUU7QUFDQTtBQUNBYixhQUFTYSxHQUFULElBQWdCLFlBQVk7QUFDMUIsVUFBSVAsT0FBSixFQUFhO0FBQ1gsWUFBSVMsTUFBTWQsR0FBR1ksR0FBSCxFQUFRRyxLQUFSLENBQWNmLEVBQWQsRUFBa0JnQixTQUFsQixDQUFWO0FBQ0EsWUFBSSxDQUFDRixHQUFMLEVBQVU7QUFDUkEsZ0JBQU0sRUFBTjtBQUNEO0FBQ0QsWUFBSUEsT0FBTyxRQUFPQSxHQUFQLHVEQUFPQSxHQUFQLE9BQWUsUUFBMUIsRUFBb0M7QUFDbENBLGNBQUlHLElBQUosR0FBVyxZQUFNO0FBQ2ZSLG9CQUFRUyxJQUFSLENBQWEsUUFBUU4sR0FBUixHQUFjLHFEQUEzQjtBQUNELFdBRkQ7QUFHRDtBQUNELGVBQU9FLEdBQVA7QUFDRDtBQUNELGFBQU9kLEdBQUdZLEdBQUgsRUFBUUcsS0FBUixDQUFjZixFQUFkLEVBQWtCZ0IsU0FBbEIsQ0FBUDtBQUNELEtBZEQ7QUFlQTtBQUNEOztBQUVEO0FBQ0FqQixXQUFTYSxHQUFULElBQWdCLFVBQVVPLEdBQVYsRUFBZTtBQUM3QkEsVUFBTUEsT0FBTyxFQUFiO0FBQ0EsV0FBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdENGLFVBQUlHLE9BQUosR0FBY0YsT0FBZDtBQUNBRCxVQUFJSSxJQUFKLEdBQVcsVUFBQ1QsR0FBRCxFQUFTO0FBQ2xCLFlBQUlBLE9BQU9BLElBQUlVLE1BQWYsRUFBdUI7QUFDckJILGlCQUFPLElBQUlJLEtBQUosQ0FBVVgsSUFBSVUsTUFBZCxDQUFQO0FBQ0QsU0FGRCxNQUVPO0FBQ0xILGlCQUFPUCxHQUFQO0FBQ0Q7QUFDRixPQU5EO0FBT0FkLFNBQUdZLEdBQUgsRUFBUU8sR0FBUjtBQUNELEtBVk0sQ0FBUDtBQVdELEdBYkQ7QUFjRCxDQXhDRDs7a0JBMENlcEIsUTtRQUNOMkIsUztRQUFXQyxTO1FBQVdDLFciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBNYWljaG9uZyBTb2Z0d2FyZSBMdGQuIDIwMTYgaHR0cDovL21haWNob25nLml0XG4gKiBAZGF0ZSAyMDE2LTA5LTI2XG4gKiBAYXV0aG9yIExpYW5nIDxsaWFuZ0BtYWljaG9uZy5pdD5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICcuL3Byb3AtdHlwZXMnO1xuaW1wb3J0IF9jcmVhdGVQYWdlIGZyb20gJy4vY3JlYXRlLXBhZ2UnO1xuXG4vLyDnibnliKvmjIflrprnmoR3eOWvueixoeS4reS4jei/m+ihjFByb21pc2XlsIHoo4XnmoTmlrnms5VcbmNvbnN0IG5vUHJvbWlzZU1ldGhvZHMgPSB7XG4gIGNsZWFyU3RvcmFnZTogMSxcbiAgaGlkZVRvYXN0OiAxLFxuICBzaG93TmF2aWdhdGlvbkJhckxvYWRpbmc6IDEsXG4gIGhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZzogMSxcbiAgZHJhd0NhbnZhczogMSxcbiAgY2FudmFzVG9UZW1wRmlsZVBhdGg6IDEsXG4gIGhpZGVLZXlib2FyZDogMSxcbn07XG5cbmNvbnN0IGxhYnJhZG9yID0ge1xuICAvLyDljp/lp4t3eOWvueixoVxuICB3eCxcbiAgLy8gZ2V0QXBwKCkg5LyY6ZuF55qE5bCB6KOFXG4gIGdldCBhcHAoKSB7XG4gICAgcmV0dXJuIGdldEFwcCgpO1xuICB9LFxuXG4gIC8vIGdldEN1cnJlbnRQYWdlcygpIOS8mOmbheeahOWwgeijhVxuICBnZXQgY3VycmVudFBhZ2VzKCkge1xuICAgIHJldHVybiBnZXRDdXJyZW50UGFnZXMoKTtcbiAgfVxufTtcblxuaWYgKF9fREVWX18pIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxhYnJhZG9yLCAnQ29tcG9uZW50Jywge1xuICAgIGdldCgpe1xuICAgICAgY29uc29sZS5lcnJvcignbGFicmFkb3IgMC4254mI5pys5LmL5ZCO5bqf5byD5LqGIHd4LkNvbXBvbmVudO+8jOivt+S9v+eUqCAnICtcbiAgICAgICAgJ1wiaW1wb3J0IHd4LCB7IENvbXBvbmVudCwgUHJvcHNUeXBlcyB9IGZyb20gXFwnbGFicmFkb3JcXCdcIiDku6Pmm78gJyArXG4gICAgICAgICdcImltcG9ydCB3eCBmcm9tIFxcJ2xhYnJhZG9yXFwnXCInKTtcbiAgICB9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobGFicmFkb3IsICdQcm9wc1R5cGVzJywge1xuICAgIGdldCgpe1xuICAgICAgY29uc29sZS5lcnJvcignbGFicmFkb3IgMC4254mI5pys5LmL5ZCO5bqf5byD5LqGIHd4LlByb3BzVHlwZXPvvIzor7fkvb/nlKggJyArXG4gICAgICAgICdcImltcG9ydCB3eCwgeyBDb21wb25lbnQsIFByb3BzVHlwZXMgfSBmcm9tIFxcJ2xhYnJhZG9yXFwnXCIg5Luj5pu/ICcgK1xuICAgICAgICAnXCJpbXBvcnQgd3ggZnJvbSBcXCdsYWJyYWRvclxcJ1wiJyk7XG4gICAgfVxuICB9KTtcbn1cblxuT2JqZWN0LmtleXMod3gpLmZvckVhY2goKGtleSkgPT4ge1xuICBpZiAoXG4gICAgbm9Qcm9taXNlTWV0aG9kc1trZXldICAgICAgICAgICAgICAgICAgICAgICAgLy8g54m55Yir5oyH5a6a55qE5pa55rOVXG4gICAgfHwgL14ob258Y3JlYXRlfHN0b3B8cGF1c2V8Y2xvc2UpLy50ZXN0KGtleSkgLy8g5Lulb24qIGNyZWF0ZSogc3RvcCogcGF1c2UqIGNsb3NlKiDlvIDlpLTnmoTmlrnms5VcbiAgICB8fCAvXFx3K1N5bmMkLy50ZXN0KGtleSkgICAgICAgICAgICAgICAgICAgICAgLy8g5LulU3luY+e7k+WwvueahOaWueazlVxuICApIHtcbiAgICAvLyDkuI3ov5vooYxQcm9taXNl5bCB6KOFXG4gICAgbGFicmFkb3Jba2V5XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIGxldCByZXMgPSB3eFtrZXldLmFwcGx5KHd4LCBhcmd1bWVudHMpO1xuICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgIHJlcyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXMudGhlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybignd3guJyArIGtleSArICcgaXMgbm90IGEgYXN5bmMgZnVuY3Rpb24sIHlvdSBzaG91bGQgbm90IHVzZSBhd2FpdCAnKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gd3hba2V5XS5hcHBseSh3eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIOWFtuS9meaWueazleiHquWKqFByb21pc2XljJZcbiAgbGFicmFkb3Jba2V5XSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICBvYmogPSBvYmogfHwge307XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG9iai5zdWNjZXNzID0gcmVzb2x2ZTtcbiAgICAgIG9iai5mYWlsID0gKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzICYmIHJlcy5lcnJNc2cpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKHJlcy5lcnJNc2cpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHd4W2tleV0ob2JqKTtcbiAgICB9KTtcbiAgfTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsYWJyYWRvcjtcbmV4cG9ydCB7IENvbXBvbmVudCwgUHJvcFR5cGVzLCBfY3JlYXRlUGFnZSB9O1xuIl19