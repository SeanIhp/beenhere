"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('../babel-runtime/core-js/json/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getDebugObject = getDebugObject;
exports.shouldUpdate = shouldUpdate;
exports.callLifecycle = callLifecycle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取用于调试输出的对象
 * @param {Object} object
 * @returns {Object}
 */
function getDebugObject(object) {
  if (true) {
    if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) !== 'object' || !object || object.asMutable) return object;
    try {
      for (var key in object) {
        if (object[key] && (0, _typeof3.default)(object[key]) === 'object' && !object[key].asMutable) return JSON.parse((0, _stringify2.default)(object));
      }
    } catch (e) {
      // 对象中有递归引用，JSON.stringify 会报错
    }
  }
  return object;
}

/**
 * 判断是否需要更新
 * @param {Object} original  原有对象
 * @param {Object} append    新增数据
 * @returns {boolean}
 */
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-04
 * @author Liang <liang@maichong.it>
 */

function shouldUpdate(original, append) {
  if (original === append) return false;
  for (var key in append) {
    var value = append[key];
    if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && value) {
      if (!value.asMutable || original[key] !== value) {
        return true;
      }
    } else if (original[key] !== value) {
      //bool string number null
      return true;
    }
  }
  return false;
}

/**
 * 递归调用组件的生命周期函数
 * @param {Component} component
 * @param {string} name
 * @param {array} [args]
 */
function callLifecycle(component, name, args) {
  // $Flow 安全访问生命周期函数
  if (component[name]) {
    if (true) {
      console.log('%c%s %s()', 'color:#9a23cc', component.id, name);
    }
    component[name].apply(component, args);
  }

  if (component._children) {
    for (var key in component._children) {
      var child = component._children[key];
      if (Array.isArray(child)) {
        child.forEach(function (item) {
          return callLifecycle(item, name, args);
        });
      } else {
        callLifecycle(child, name, args);
      }
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImdldERlYnVnT2JqZWN0Iiwic2hvdWxkVXBkYXRlIiwiY2FsbExpZmVjeWNsZSIsIm9iamVjdCIsIl9fREVWX18iLCJhc011dGFibGUiLCJrZXkiLCJKU09OIiwicGFyc2UiLCJlIiwib3JpZ2luYWwiLCJhcHBlbmQiLCJ2YWx1ZSIsImNvbXBvbmVudCIsIm5hbWUiLCJhcmdzIiwiY29uc29sZSIsImxvZyIsImlkIiwiYXBwbHkiLCJfY2hpbGRyZW4iLCJjaGlsZCIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJpdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztRQWVnQkEsYyxHQUFBQSxjO1FBb0JBQyxZLEdBQUFBLFk7UUFzQkFDLGEsR0FBQUEsYTs7OztBQS9DaEI7Ozs7O0FBS08sU0FBU0YsY0FBVCxDQUF3QkcsTUFBeEIsRUFBZ0Q7QUFDckQsTUFBSUMsT0FBSixFQUFhO0FBQ1gsUUFBSSxRQUFPRCxNQUFQLHVEQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCLENBQUNBLE1BQS9CLElBQXlDQSxPQUFPRSxTQUFwRCxFQUErRCxPQUFPRixNQUFQO0FBQy9ELFFBQUk7QUFDRixXQUFLLElBQUlHLEdBQVQsSUFBZ0JILE1BQWhCLEVBQXdCO0FBQ3RCLFlBQUlBLE9BQU9HLEdBQVAsS0FBZSxzQkFBT0gsT0FBT0csR0FBUCxDQUFQLE1BQXVCLFFBQXRDLElBQWtELENBQUNILE9BQU9HLEdBQVAsRUFBWUQsU0FBbkUsRUFBOEUsT0FBT0UsS0FBS0MsS0FBTCxDQUFXLHlCQUFlTCxNQUFmLENBQVgsQ0FBUDtBQUMvRTtBQUNGLEtBSkQsQ0FJRSxPQUFPTSxDQUFQLEVBQVU7QUFDVjtBQUNEO0FBQ0Y7QUFDRCxTQUFPTixNQUFQO0FBQ0Q7O0FBRUQ7Ozs7OztBQTdCQTs7Ozs7O0FBbUNPLFNBQVNGLFlBQVQsQ0FBc0JTLFFBQXRCLEVBQXdDQyxNQUF4QyxFQUFpRTtBQUN0RSxNQUFJRCxhQUFhQyxNQUFqQixFQUF5QixPQUFPLEtBQVA7QUFDekIsT0FBSyxJQUFJTCxHQUFULElBQWdCSyxNQUFoQixFQUF3QjtBQUN0QixRQUFJQyxRQUFRRCxPQUFPTCxHQUFQLENBQVo7QUFDQSxRQUFJLFFBQU9NLEtBQVAsdURBQU9BLEtBQVAsT0FBaUIsUUFBakIsSUFBNkJBLEtBQWpDLEVBQXdDO0FBQ3RDLFVBQUksQ0FBQ0EsTUFBTVAsU0FBUCxJQUFvQkssU0FBU0osR0FBVCxNQUFrQk0sS0FBMUMsRUFBaUQ7QUFDL0MsZUFBTyxJQUFQO0FBQ0Q7QUFDRixLQUpELE1BSU8sSUFBSUYsU0FBU0osR0FBVCxNQUFrQk0sS0FBdEIsRUFBNkI7QUFDbEM7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0QsU0FBTyxLQUFQO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1PLFNBQVNWLGFBQVQsQ0FBdUJXLFNBQXZCLEVBQTZDQyxJQUE3QyxFQUEyREMsSUFBM0QsRUFBNEU7QUFDakY7QUFDQSxNQUFJRixVQUFVQyxJQUFWLENBQUosRUFBcUI7QUFDbkIsUUFBSVYsT0FBSixFQUFhO0FBQ1hZLGNBQVFDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLGVBQXpCLEVBQTBDSixVQUFVSyxFQUFwRCxFQUF3REosSUFBeEQ7QUFDRDtBQUNERCxjQUFVQyxJQUFWLEVBQWdCSyxLQUFoQixDQUFzQk4sU0FBdEIsRUFBaUNFLElBQWpDO0FBQ0Q7O0FBRUQsTUFBSUYsVUFBVU8sU0FBZCxFQUF5QjtBQUN2QixTQUFLLElBQUlkLEdBQVQsSUFBZ0JPLFVBQVVPLFNBQTFCLEVBQXFDO0FBQ25DLFVBQUlDLFFBQWdCUixVQUFVTyxTQUFWLENBQW9CZCxHQUFwQixDQUFwQjtBQUNBLFVBQUlnQixNQUFNQyxPQUFOLENBQWNGLEtBQWQsQ0FBSixFQUEwQjtBQUN4QkEsY0FBTUcsT0FBTixDQUFjO0FBQUEsaUJBQVF0QixjQUFjdUIsSUFBZCxFQUFvQlgsSUFBcEIsRUFBMEJDLElBQTFCLENBQVI7QUFBQSxTQUFkO0FBQ0QsT0FGRCxNQUVPO0FBQ0xiLHNCQUFjbUIsS0FBZCxFQUFxQlAsSUFBckIsRUFBMkJDLElBQTNCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBNYWljaG9uZyBTb2Z0d2FyZSBMdGQuIDIwMTYgaHR0cDovL21haWNob25nLml0XG4gKiBAZGF0ZSAyMDE2LTExLTA0XG4gKiBAYXV0aG9yIExpYW5nIDxsaWFuZ0BtYWljaG9uZy5pdD5cbiAqL1xuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuXG4vKipcbiAqIOiOt+WPlueUqOS6juiwg+ivlei+k+WHuueahOWvueixoVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlYnVnT2JqZWN0KG9iamVjdDogT2JqZWN0KTogT2JqZWN0IHtcbiAgaWYgKF9fREVWX18pIHtcbiAgICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgIW9iamVjdCB8fCBvYmplY3QuYXNNdXRhYmxlKSByZXR1cm4gb2JqZWN0O1xuICAgIHRyeSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3Rba2V5XSAmJiB0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdvYmplY3QnICYmICFvYmplY3Rba2V5XS5hc011dGFibGUpIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIOWvueixoeS4reaciemAkuW9kuW8leeUqO+8jEpTT04uc3RyaW5naWZ5IOS8muaKpemUmVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqIOWIpOaWreaYr+WQpumcgOimgeabtOaWsFxuICogQHBhcmFtIHtPYmplY3R9IG9yaWdpbmFsICDljp/mnInlr7nosaFcbiAqIEBwYXJhbSB7T2JqZWN0fSBhcHBlbmQgICAg5paw5aKe5pWw5o2uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFVwZGF0ZShvcmlnaW5hbDogT2JqZWN0LCBhcHBlbmQ6IE9iamVjdCk6IGJvb2xlYW4ge1xuICBpZiAob3JpZ2luYWwgPT09IGFwcGVuZCkgcmV0dXJuIGZhbHNlO1xuICBmb3IgKGxldCBrZXkgaW4gYXBwZW5kKSB7XG4gICAgbGV0IHZhbHVlID0gYXBwZW5kW2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUuYXNNdXRhYmxlIHx8IG9yaWdpbmFsW2tleV0gIT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3JpZ2luYWxba2V5XSAhPT0gdmFsdWUpIHtcbiAgICAgIC8vYm9vbCBzdHJpbmcgbnVtYmVyIG51bGxcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICog6YCS5b2S6LCD55So57uE5Lu255qE55Sf5ZG95ZGo5pyf5Ye95pWwXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHthcnJheX0gW2FyZ3NdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxsTGlmZWN5Y2xlKGNvbXBvbmVudDogQ29tcG9uZW50LCBuYW1lOiBzdHJpbmcsIGFyZ3M/OiBBcnJheTwqPikge1xuICAvLyAkRmxvdyDlronlhajorr/pl67nlJ/lkb3lkajmnJ/lh73mlbBcbiAgaWYgKGNvbXBvbmVudFtuYW1lXSkge1xuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICBjb25zb2xlLmxvZygnJWMlcyAlcygpJywgJ2NvbG9yOiM5YTIzY2MnLCBjb21wb25lbnQuaWQsIG5hbWUpO1xuICAgIH1cbiAgICBjb21wb25lbnRbbmFtZV0uYXBwbHkoY29tcG9uZW50LCBhcmdzKTtcbiAgfVxuXG4gIGlmIChjb21wb25lbnQuX2NoaWxkcmVuKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGNvbXBvbmVudC5fY2hpbGRyZW4pIHtcbiAgICAgIGxldCBjaGlsZDogJENoaWxkID0gY29tcG9uZW50Ll9jaGlsZHJlbltrZXldO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSB7XG4gICAgICAgIGNoaWxkLmZvckVhY2goaXRlbSA9PiBjYWxsTGlmZWN5Y2xlKGl0ZW0sIG5hbWUsIGFyZ3MpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxMaWZlY3ljbGUoY2hpbGQsIG5hbWUsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19