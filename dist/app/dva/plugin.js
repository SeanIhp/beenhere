"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../../npm/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('../../npm/babel-runtime/core-js/get-iterator.js');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('../../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _isPlainObject = require('../../npm/is-plain-object/index.js');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _invariant = require('../../npm/invariant/browser.js');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plugin = function () {
  function Plugin() {
    (0, _classCallCheck3.default)(this, Plugin);

    this.hooks = {
      onError: [],
      onStateChange: [],
      onAction: [],
      onReducer: [],
      onEffect: [],
      extraReducers: [],
      extraEnhancers: []
    };
  }

  (0, _createClass3.default)(Plugin, [{
    key: 'use',
    value: function use(plugin) {
      (0, _invariant2.default)((0, _isPlainObject2.default)(plugin), 'plugin.use: plugin should be plain object');
      var hooks = this.hooks;
      for (var key in plugin) {
        if (Object.prototype.hasOwnProperty.call(plugin, key)) {
          (0, _invariant2.default)(hooks[key], 'plugin.use: unknown plugin property: ' + key);
          if (key === 'extraEnhancers') {
            hooks[key] = plugin[key];
          } else {
            hooks[key].push(plugin[key]);
          }
        }
      }
    }
  }, {
    key: 'apply',
    value: function apply(key, defaultHandler) {
      var hooks = this.hooks;
      var validApplyHooks = ['onError'];
      (0, _invariant2.default)(validApplyHooks.indexOf(key) > -1, 'plugin.apply: hook ' + key + ' cannot be applied');
      var fns = hooks[key];

      return function () {
        if (fns.length) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(fns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var fn = _step.value;

              fn.apply(undefined, arguments);
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
        } else if (defaultHandler) {
          defaultHandler.apply(undefined, arguments);
        }
      };
    }
  }, {
    key: 'get',
    value: function get(key) {
      var hooks = this.hooks;
      (0, _invariant2.default)(key in hooks, 'plugin.get: hook ' + key + ' cannot be got');
      if (key === 'extraReducers') {
        var ret = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(hooks[key]), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var reducerObj = _step2.value;

            ret = (0, _extends3.default)({}, ret, reducerObj);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return ret;
      } else if (key === 'onReducer') {
        return function (reducer) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, _getIterator3.default)(hooks[key]), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var reducerEnhancer = _step3.value;

              reducer = reducerEnhancer(reducer);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          return reducer;
        };
      } else {
        return hooks[key];
      }
    }
  }]);
  return Plugin;
}();

exports.default = Plugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsdWdpbi5qcyJdLCJuYW1lcyI6WyJQbHVnaW4iLCJob29rcyIsIm9uRXJyb3IiLCJvblN0YXRlQ2hhbmdlIiwib25BY3Rpb24iLCJvblJlZHVjZXIiLCJvbkVmZmVjdCIsImV4dHJhUmVkdWNlcnMiLCJleHRyYUVuaGFuY2VycyIsInBsdWdpbiIsImtleSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInB1c2giLCJkZWZhdWx0SGFuZGxlciIsInZhbGlkQXBwbHlIb29rcyIsImluZGV4T2YiLCJmbnMiLCJsZW5ndGgiLCJmbiIsInJldCIsInJlZHVjZXJPYmoiLCJyZWR1Y2VyIiwicmVkdWNlckVuaGFuY2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRU1BLE07QUFFSixvQkFBYztBQUFBOztBQUNaLFNBQUtDLEtBQUwsR0FBYTtBQUNYQyxlQUFTLEVBREU7QUFFWEMscUJBQWUsRUFGSjtBQUdYQyxnQkFBVSxFQUhDO0FBSVhDLGlCQUFXLEVBSkE7QUFLWEMsZ0JBQVUsRUFMQztBQU1YQyxxQkFBZSxFQU5KO0FBT1hDLHNCQUFnQjtBQVBMLEtBQWI7QUFTRDs7Ozt3QkFFR0MsTSxFQUFRO0FBQ1YsK0JBQVUsNkJBQWNBLE1BQWQsQ0FBVixFQUFpQywyQ0FBakM7QUFDQSxVQUFNUixRQUFRLEtBQUtBLEtBQW5CO0FBQ0EsV0FBSyxJQUFNUyxHQUFYLElBQWtCRCxNQUFsQixFQUEwQjtBQUN4QixZQUFJRSxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNMLE1BQXJDLEVBQTZDQyxHQUE3QyxDQUFKLEVBQXVEO0FBQ3JELG1DQUFVVCxNQUFNUyxHQUFOLENBQVYsNENBQThEQSxHQUE5RDtBQUNBLGNBQUlBLFFBQVEsZ0JBQVosRUFBOEI7QUFDNUJULGtCQUFNUyxHQUFOLElBQWFELE9BQU9DLEdBQVAsQ0FBYjtBQUNELFdBRkQsTUFFTztBQUNMVCxrQkFBTVMsR0FBTixFQUFXSyxJQUFYLENBQWdCTixPQUFPQyxHQUFQLENBQWhCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7OzswQkFFS0EsRyxFQUFLTSxjLEVBQWdCO0FBQ3pCLFVBQU1mLFFBQVEsS0FBS0EsS0FBbkI7QUFDQSxVQUFNZ0Isa0JBQWtCLENBQUMsU0FBRCxDQUF4QjtBQUNBLCtCQUFVQSxnQkFBZ0JDLE9BQWhCLENBQXdCUixHQUF4QixJQUErQixDQUFDLENBQTFDLDBCQUFtRUEsR0FBbkU7QUFDQSxVQUFNUyxNQUFNbEIsTUFBTVMsR0FBTixDQUFaOztBQUVBLGFBQU8sWUFBYTtBQUNsQixZQUFJUyxJQUFJQyxNQUFSLEVBQWdCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2QsNERBQWlCRCxHQUFqQiw0R0FBc0I7QUFBQSxrQkFBWEUsRUFBVzs7QUFDcEJBO0FBQ0Q7QUFIYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSWYsU0FKRCxNQUlPLElBQUlMLGNBQUosRUFBb0I7QUFDekJBO0FBQ0Q7QUFDRixPQVJEO0FBU0Q7Ozt3QkFFR04sRyxFQUFLO0FBQ1AsVUFBTVQsUUFBUSxLQUFLQSxLQUFuQjtBQUNBLCtCQUFVUyxPQUFPVCxLQUFqQix3QkFBNENTLEdBQTVDO0FBQ0EsVUFBSUEsUUFBUSxlQUFaLEVBQTZCO0FBQzNCLFlBQUlZLE1BQU0sRUFBVjtBQUQyQjtBQUFBO0FBQUE7O0FBQUE7QUFFM0IsMkRBQXlCckIsTUFBTVMsR0FBTixDQUF6QixpSEFBcUM7QUFBQSxnQkFBMUJhLFVBQTBCOztBQUNuQ0QsNkNBQVdBLEdBQVgsRUFBbUJDLFVBQW5CO0FBQ0Q7QUFKMEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFLM0IsZUFBT0QsR0FBUDtBQUNELE9BTkQsTUFNTyxJQUFJWixRQUFRLFdBQVosRUFBeUI7QUFDOUIsZUFBTyxVQUFVYyxPQUFWLEVBQW1CO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ3hCLDZEQUE4QnZCLE1BQU1TLEdBQU4sQ0FBOUIsaUhBQTBDO0FBQUEsa0JBQS9CZSxlQUErQjs7QUFDeENELHdCQUFVQyxnQkFBZ0JELE9BQWhCLENBQVY7QUFDRDtBQUh1QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUl4QixpQkFBT0EsT0FBUDtBQUNELFNBTEQ7QUFNRCxPQVBNLE1BT0E7QUFDTCxlQUFPdkIsTUFBTVMsR0FBTixDQUFQO0FBQ0Q7QUFDRjs7Ozs7a0JBR1lWLE0iLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2lzLXBsYWluLW9iamVjdCc7XHJcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcclxuXHJcbmNsYXNzIFBsdWdpbiB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ob29rcyA9IHtcclxuICAgICAgb25FcnJvcjogW10sXHJcbiAgICAgIG9uU3RhdGVDaGFuZ2U6IFtdLFxyXG4gICAgICBvbkFjdGlvbjogW10sXHJcbiAgICAgIG9uUmVkdWNlcjogW10sXHJcbiAgICAgIG9uRWZmZWN0OiBbXSxcclxuICAgICAgZXh0cmFSZWR1Y2VyczogW10sXHJcbiAgICAgIGV4dHJhRW5oYW5jZXJzOiBbXSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1c2UocGx1Z2luKSB7XHJcbiAgICBpbnZhcmlhbnQoaXNQbGFpbk9iamVjdChwbHVnaW4pLCAncGx1Z2luLnVzZTogcGx1Z2luIHNob3VsZCBiZSBwbGFpbiBvYmplY3QnKTtcclxuICAgIGNvbnN0IGhvb2tzID0gdGhpcy5ob29rcztcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHBsdWdpbikge1xyXG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHBsdWdpbiwga2V5KSkge1xyXG4gICAgICAgIGludmFyaWFudChob29rc1trZXldLCBgcGx1Z2luLnVzZTogdW5rbm93biBwbHVnaW4gcHJvcGVydHk6ICR7a2V5fWApO1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdleHRyYUVuaGFuY2VycycpIHtcclxuICAgICAgICAgIGhvb2tzW2tleV0gPSBwbHVnaW5ba2V5XTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaG9va3Nba2V5XS5wdXNoKHBsdWdpbltrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFwcGx5KGtleSwgZGVmYXVsdEhhbmRsZXIpIHtcclxuICAgIGNvbnN0IGhvb2tzID0gdGhpcy5ob29rcztcclxuICAgIGNvbnN0IHZhbGlkQXBwbHlIb29rcyA9IFsnb25FcnJvciddO1xyXG4gICAgaW52YXJpYW50KHZhbGlkQXBwbHlIb29rcy5pbmRleE9mKGtleSkgPiAtMSwgYHBsdWdpbi5hcHBseTogaG9vayAke2tleX0gY2Fubm90IGJlIGFwcGxpZWRgKTtcclxuICAgIGNvbnN0IGZucyA9IGhvb2tzW2tleV07XHJcblxyXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgIGlmIChmbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBmbiBvZiBmbnMpIHtcclxuICAgICAgICAgIGZuKC4uLmFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChkZWZhdWx0SGFuZGxlcikge1xyXG4gICAgICAgIGRlZmF1bHRIYW5kbGVyKC4uLmFyZ3MpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0KGtleSkge1xyXG4gICAgY29uc3QgaG9va3MgPSB0aGlzLmhvb2tzO1xyXG4gICAgaW52YXJpYW50KGtleSBpbiBob29rcywgYHBsdWdpbi5nZXQ6IGhvb2sgJHtrZXl9IGNhbm5vdCBiZSBnb3RgKTtcclxuICAgIGlmIChrZXkgPT09ICdleHRyYVJlZHVjZXJzJykge1xyXG4gICAgICBsZXQgcmV0ID0ge307XHJcbiAgICAgIGZvciAoY29uc3QgcmVkdWNlck9iaiBvZiBob29rc1trZXldKSB7XHJcbiAgICAgICAgcmV0ID0geyAuLi5yZXQsIC4uLnJlZHVjZXJPYmogfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdvblJlZHVjZXInKSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAocmVkdWNlcikge1xyXG4gICAgICAgIGZvciAoY29uc3QgcmVkdWNlckVuaGFuY2VyIG9mIGhvb2tzW2tleV0pIHtcclxuICAgICAgICAgIHJlZHVjZXIgPSByZWR1Y2VyRW5oYW5jZXIocmVkdWNlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZWR1Y2VyO1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGhvb2tzW2tleV07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbHVnaW47XHJcbiJdfQ==