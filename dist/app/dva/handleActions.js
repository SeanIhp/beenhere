"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('../../npm/babel-runtime/helpers/toConsumableArray.js');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('../../npm/babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identify(value) {
  return value;
}

function handleAction(actionType) {
  var reducer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identify;

  return function (state, action) {
    var type = action.type;

    if (type && actionType !== type) {
      return state;
    }
    return reducer(state, action);
  };
}

function reduceReducers() {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  return function (previous, current) {
    return reducers.reduce(function (p, r) {
      return r(p, current);
    }, previous);
  };
}

function handleActions(handlers, defaultState) {
  var reducers = (0, _keys2.default)(handlers).map(function (type) {
    return handleAction(type, handlers[type]);
  });
  var reducer = reduceReducers.apply(undefined, (0, _toConsumableArray3.default)(reducers));
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];
    return reducer(state, action);
  };
}

exports.default = handleActions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhbmRsZUFjdGlvbnMuanMiXSwibmFtZXMiOlsiaWRlbnRpZnkiLCJ2YWx1ZSIsImhhbmRsZUFjdGlvbiIsImFjdGlvblR5cGUiLCJyZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicmVkdWNlUmVkdWNlcnMiLCJyZWR1Y2VycyIsInByZXZpb3VzIiwiY3VycmVudCIsInJlZHVjZSIsInAiLCJyIiwiaGFuZGxlQWN0aW9ucyIsImhhbmRsZXJzIiwiZGVmYXVsdFN0YXRlIiwibWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsU0FBU0EsUUFBVCxDQUFrQkMsS0FBbEIsRUFBeUI7QUFDdkIsU0FBT0EsS0FBUDtBQUNEOztBQUVELFNBQVNDLFlBQVQsQ0FBc0JDLFVBQXRCLEVBQXNEO0FBQUEsTUFBcEJDLE9BQW9CLHVFQUFWSixRQUFVOztBQUNwRCxTQUFPLFVBQUNLLEtBQUQsRUFBUUMsTUFBUixFQUFtQjtBQUFBLFFBQ2hCQyxJQURnQixHQUNQRCxNQURPLENBQ2hCQyxJQURnQjs7QUFFeEIsUUFBSUEsUUFBUUosZUFBZUksSUFBM0IsRUFBaUM7QUFDL0IsYUFBT0YsS0FBUDtBQUNEO0FBQ0QsV0FBT0QsUUFBUUMsS0FBUixFQUFlQyxNQUFmLENBQVA7QUFDRCxHQU5EO0FBT0Q7O0FBRUQsU0FBU0UsY0FBVCxHQUFxQztBQUFBLG9DQUFWQyxRQUFVO0FBQVZBLFlBQVU7QUFBQTs7QUFDbkMsU0FBTyxVQUFDQyxRQUFELEVBQVdDLE9BQVg7QUFBQSxXQUNMRixTQUFTRyxNQUFULENBQ0UsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsYUFBVUEsRUFBRUQsQ0FBRixFQUFLRixPQUFMLENBQVY7QUFBQSxLQURGLEVBRUVELFFBRkYsQ0FESztBQUFBLEdBQVA7QUFLRDs7QUFFRCxTQUFTSyxhQUFULENBQXVCQyxRQUF2QixFQUFpQ0MsWUFBakMsRUFBK0M7QUFDN0MsTUFBTVIsV0FBVyxvQkFBWU8sUUFBWixFQUFzQkUsR0FBdEIsQ0FBMEI7QUFBQSxXQUFRaEIsYUFBYUssSUFBYixFQUFtQlMsU0FBU1QsSUFBVCxDQUFuQixDQUFSO0FBQUEsR0FBMUIsQ0FBakI7QUFDQSxNQUFNSCxVQUFVSSxpRUFBa0JDLFFBQWxCLEVBQWhCO0FBQ0EsU0FBTztBQUFBLFFBQUNKLEtBQUQsdUVBQVNZLFlBQVQ7QUFBQSxRQUF1QlgsTUFBdkI7QUFBQSxXQUFrQ0YsUUFBUUMsS0FBUixFQUFlQyxNQUFmLENBQWxDO0FBQUEsR0FBUDtBQUNEOztrQkFFY1MsYSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmZ1bmN0aW9uIGlkZW50aWZ5KHZhbHVlKSB7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVBY3Rpb24oYWN0aW9uVHlwZSwgcmVkdWNlciA9IGlkZW50aWZ5KSB7XHJcbiAgcmV0dXJuIChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCB7IHR5cGUgfSA9IGFjdGlvbjtcclxuICAgIGlmICh0eXBlICYmIGFjdGlvblR5cGUgIT09IHR5cGUpIHtcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVkdWNlUmVkdWNlcnMoLi4ucmVkdWNlcnMpIHtcclxuICByZXR1cm4gKHByZXZpb3VzLCBjdXJyZW50KSA9PlxyXG4gICAgcmVkdWNlcnMucmVkdWNlKFxyXG4gICAgICAocCwgcikgPT4gcihwLCBjdXJyZW50KSxcclxuICAgICAgcHJldmlvdXMsXHJcbiAgICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVBY3Rpb25zKGhhbmRsZXJzLCBkZWZhdWx0U3RhdGUpIHtcclxuICBjb25zdCByZWR1Y2VycyA9IE9iamVjdC5rZXlzKGhhbmRsZXJzKS5tYXAodHlwZSA9PiBoYW5kbGVBY3Rpb24odHlwZSwgaGFuZGxlcnNbdHlwZV0pKTtcclxuICBjb25zdCByZWR1Y2VyID0gcmVkdWNlUmVkdWNlcnMoLi4ucmVkdWNlcnMpO1xyXG4gIHJldHVybiAoc3RhdGUgPSBkZWZhdWx0U3RhdGUsIGFjdGlvbikgPT4gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlQWN0aW9ucztcclxuIl19