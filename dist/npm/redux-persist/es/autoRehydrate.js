"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('../../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _iterator = require('../../babel-runtime/core-js/symbol/iterator.js');

var _iterator2 = _interopRequireDefault(_iterator);

var _typeof3 = require('../../babel-runtime/helpers/typeof.js');

var _typeof4 = _interopRequireDefault(_typeof3);

var _symbol = require('../../babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = autoRehydrate;

var _constants = require('./constants.js');

var _isStatePlainEnough = require('./utils/isStatePlainEnough.js');

var _isStatePlainEnough2 = _interopRequireDefault(_isStatePlainEnough);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
};

var _extends = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function autoRehydrate() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var stateReconciler = config.stateReconciler || defaultStateReconciler;

  return function (next) {
    return function (reducer, initialState, enhancer) {
      var store = next(liftReducer(reducer), initialState, enhancer);
      return _extends({}, store, {
        replaceReducer: function replaceReducer(reducer) {
          return store.replaceReducer(liftReducer(reducer));
        }
      });
    };
  };

  function liftReducer(reducer) {
    var rehydrated = false;
    var preRehydrateActions = [];
    return function (state, action) {
      if (action.type !== _constants.REHYDRATE) {
        if (config.log && !rehydrated) preRehydrateActions.push(action); // store pre-rehydrate actions for debugging
        return reducer(state, action);
      } else {
        if (config.log && !rehydrated) logPreRehydrate(preRehydrateActions);
        rehydrated = true;

        var inboundState = action.payload;
        var reducedState = reducer(state, action);

        return stateReconciler(state, inboundState, reducedState, config.log);
      }
    };
  }
}

function logPreRehydrate(preRehydrateActions) {
  var concernedActions = preRehydrateActions.slice(1);
  if (concernedActions.length > 0) {
    console.log('\n      redux-persist/autoRehydrate: %d actions were fired before rehydration completed. This can be a symptom of a race\n      condition where the rehydrate action may overwrite the previously affected state. Consider running these actions\n      after rehydration:\n    ', concernedActions.length, concernedActions);
  }
}

function defaultStateReconciler(state, inboundState, reducedState, log) {
  var newState = _extends({}, reducedState);

  (0, _keys2.default)(inboundState).forEach(function (key) {
    // if initialState does not have key, skip auto rehydration
    if (!state.hasOwnProperty(key)) return;

    // if initial state is an object but inbound state is null/undefined, skip
    if (_typeof(state[key]) === 'object' && !inboundState[key]) {
      if (log) console.log('redux-persist/autoRehydrate: sub state for key `%s` is falsy but initial state is an object, skipping autoRehydrate.', key);
      return;
    }

    // if reducer modifies substate, skip auto rehydration
    if (state[key] !== reducedState[key]) {
      if (log) console.log('redux-persist/autoRehydrate: sub state for key `%s` modified, skipping autoRehydrate.', key);
      newState[key] = reducedState[key];
      return;
    }

    // otherwise take the inboundState
    if ((0, _isStatePlainEnough2.default)(inboundState[key]) && (0, _isStatePlainEnough2.default)(state[key])) newState[key] = _extends({}, state[key], inboundState[key]); // shallow merge
    else newState[key] = inboundState[key]; // hard set

    if (log) console.log('redux-persist/autoRehydrate: key `%s`, rehydrated to ', key, newState[key]);
  });
  return newState;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dG9SZWh5ZHJhdGUuanMiXSwibmFtZXMiOlsiYXV0b1JlaHlkcmF0ZSIsIl90eXBlb2YiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIl9leHRlbmRzIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImtleSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImNvbmZpZyIsInVuZGVmaW5lZCIsInN0YXRlUmVjb25jaWxlciIsImRlZmF1bHRTdGF0ZVJlY29uY2lsZXIiLCJuZXh0IiwicmVkdWNlciIsImluaXRpYWxTdGF0ZSIsImVuaGFuY2VyIiwic3RvcmUiLCJsaWZ0UmVkdWNlciIsInJlcGxhY2VSZWR1Y2VyIiwicmVoeWRyYXRlZCIsInByZVJlaHlkcmF0ZUFjdGlvbnMiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJsb2ciLCJwdXNoIiwibG9nUHJlUmVoeWRyYXRlIiwiaW5ib3VuZFN0YXRlIiwicGF5bG9hZCIsInJlZHVjZWRTdGF0ZSIsImNvbmNlcm5lZEFjdGlvbnMiLCJzbGljZSIsImNvbnNvbGUiLCJuZXdTdGF0ZSIsImZvckVhY2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQU93QkEsYTs7QUFIeEI7O0FBQ0E7Ozs7OztBQUxBLElBQUlDLFVBQVUsNEJBQWtCLFVBQWxCLElBQWdDLDhDQUEyQixRQUEzRCxHQUFzRSxVQUFVQyxHQUFWLEVBQWU7QUFBRSxnQkFBY0EsR0FBZCx1REFBY0EsR0FBZDtBQUFvQixDQUEzRyxHQUE4RyxVQUFVQSxHQUFWLEVBQWU7QUFBRSxTQUFPQSxPQUFPLDRCQUFrQixVQUF6QixJQUF1Q0EsSUFBSUMsV0FBSixxQkFBdkMsSUFBcUVELHlCQUFlRSxTQUFwRixHQUFnRyxRQUFoRyxVQUFrSEYsR0FBbEgsdURBQWtIQSxHQUFsSCxDQUFQO0FBQStILENBQTVROztBQUVBLElBQUlHLFdBQVcsb0JBQWlCLFVBQVVDLE1B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Y0FBTixDQUFxQkYsR0FBckIsQ0FBTCxFQUFnQzs7QUFFaEM7QUFDQSxRQUFJVixRQUFRMkIsTUFBTWpCLEdBQU4sQ0FBUixNQUF3QixRQUF4QixJQUFvQyxDQUFDdUIsYUFBYXZCLEdBQWIsQ0FBekMsRUFBNEQ7QUFDMUQsVUFBSW9CLEdBQUosRUFBU1EsUUFBUVIsR0FBUixDQUFZLHNIQUFaLEVBQW9JcEIsR0FBcEk7QUFDVDtBQUNEOztBQUVEO0FBQ0EsUUFBSWlCLE1BQU1qQixHQUFOLE1BQWV5QixhQUFhekIsR0FBYixDQUFuQixFQUFzQztBQUNwQyxVQUFJb0IsR0FBSixFQUFTUSxRQUFRUixHQUFSLENBQVksdUZBQVosRUFBcUdwQixHQUFyRztBQUNUNkIsZUFBUzdCLEdBQVQsSUFBZ0J5QixhQUFhekIsR0FBYixDQUFoQjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFJLGtDQUFtQnVCLGFBQWF2QixHQUFiLENBQW5CLEtBQXlDLGtDQUFtQmlCLE1BQU1qQixHQUFOLENBQW5CLENBQTdDLEVBQTZFNkIsU0FBUzdCLEdBQVQsSUFBZ0JOLFNBQVMsRUFBVCxFQUFhdUIsTUFBTWpCLEdBQU4sQ0FBYixFQUF5QnVCLGFBQWF2QixHQUFiLENBQXpCLENBQWhCLENBQTdFLENBQTBJO0FBQTFJLFNBQ0s2QixTQUFTN0IsR0FBVCxJQUFnQnVCLGFBQWF2QixHQUFiLENBQWhCLENBbkIwQyxDQW1CUDs7QUFFeEMsUUFBSW9CLEdBQUosRUFBU1EsUUFBUVIsR0FBUixDQUFZLHVEQUFaLEVBQXFFcEIsR0FBckUsRUFBMEU2QixTQUFTN0IsR0FBVCxDQUExRTtBQUNWLEdBdEJEO0FBdUJBLFNBQU82QixRQUFQO0FBQ0QiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IHsgUkVIWURSQVRFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGlzU3RhdGVQbGFpbkVub3VnaCBmcm9tICcuL3V0aWxzL2lzU3RhdGVQbGFpbkVub3VnaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF1dG9SZWh5ZHJhdGUoKSB7XG4gIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gIHZhciBzdGF0ZVJlY29uY2lsZXIgPSBjb25maWcuc3RhdGVSZWNvbmNpbGVyIHx8IGRlZmF1bHRTdGF0ZVJlY29uY2lsZXI7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBpbml0aWFsU3RhdGUsIGVuaGFuY2VyKSB7XG4gICAgICB2YXIgc3RvcmUgPSBuZXh0KGxpZnRSZWR1Y2VyKHJlZHVjZXIpLCBpbml0aWFsU3RhdGUsIGVuaGFuY2VyKTtcbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RvcmUsIHtcbiAgICAgICAgcmVwbGFjZVJlZHVjZXI6IGZ1bmN0aW9uIHJlcGxhY2VSZWR1Y2VyKHJlZHVjZXIpIHtcbiAgICAgICAgICByZXR1cm4gc3RvcmUucmVwbGFjZVJlZHVjZXIobGlmdFJlZHVjZXIocmVkdWNlcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGxpZnRSZWR1Y2VyKHJlZHVjZXIpIHtcbiAgICB2YXIgcmVoeWRyYXRlZCA9IGZhbHNlO1xuICAgIHZhciBwcmVSZWh5ZHJhdGVBY3Rpb25zID0gW107XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uKSB7XG4gICAgICBpZiAoYWN0aW9uLnR5cGUgIT09IFJFSFlEUkFURSkge1xuICAgICAgICBpZiAoY29uZmlnLmxvZyAmJiAhcmVoeWRyYXRlZCkgcHJlUmVoeWRyYXRlQWN0aW9ucy5wdXNoKGFjdGlvbik7IC8vIHN0b3JlIHByZS1yZWh5ZHJhdGUgYWN0aW9ucyBmb3IgZGVidWdnaW5nXG4gICAgICAgIHJldHVybiByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbmZpZy5sb2cgJiYgIXJlaHlkcmF0ZWQpIGxvZ1ByZVJlaHlkcmF0ZShwcmVSZWh5ZHJhdGVBY3Rpb25zKTtcbiAgICAgICAgcmVoeWRyYXRlZCA9IHRydWU7XG5cbiAgICAgICAgdmFyIGluYm91bmRTdGF0ZSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgICB2YXIgcmVkdWNlZFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICByZXR1cm4gc3RhdGVSZWNvbmNpbGVyKHN0YXRlLCBpbmJvdW5kU3RhdGUsIHJlZHVjZWRTdGF0ZSwgY29uZmlnLmxvZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsb2dQcmVSZWh5ZHJhdGUocHJlUmVoeWRyYXRlQWN0aW9ucykge1xuICB2YXIgY29uY2VybmVkQWN0aW9ucyA9IHByZVJlaHlkcmF0ZUFjdGlvbnMuc2xpY2UoMSk7XG4gIGlmIChjb25jZXJuZWRBY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zb2xlLmxvZygnXFxuICAgICAgcmVkdXgtcGVyc2lzdC9hdXRvUmVoeWRyYXRlOiAlZCBhY3Rpb25zIHdlcmUgZmlyZWQgYmVmb3JlIHJlaHlkcmF0aW9uIGNvbXBsZXRlZC4gVGhpcyBjYW4gYmUgYSBzeW1wdG9tIG9mIGEgcmFjZVxcbiAgICAgIGNvbmRpdGlvbiB3aGVyZSB0aGUgcmVoeWRyYXRlIGFjdGlvbiBtYXkgb3ZlcndyaXRlIHRoZSBwcmV2aW91c2x5IGFmZmVjdGVkIHN0YXRlLiBDb25zaWRlciBydW5uaW5nIHRoZXNlIGFjdGlvbnNcXG4gICAgICBhZnRlciByZWh5ZHJhdGlvbjpcXG4gICAgJywgY29uY2VybmVkQWN0aW9ucy5sZW5ndGgsIGNvbmNlcm5lZEFjdGlvbnMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRTdGF0ZVJlY29uY2lsZXIoc3RhdGUsIGluYm91bmRTdGF0ZSwgcmVkdWNlZFN0YXRlLCBsb2cpIHtcbiAgdmFyIG5ld1N0YXRlID0gX2V4dGVuZHMoe30sIHJlZHVjZWRTdGF0ZSk7XG5cbiAgT2JqZWN0LmtleXMoaW5ib3VuZFN0YXRlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAvLyBpZiBpbml0aWFsU3RhdGUgZG9lcyBub3QgaGF2ZSBrZXksIHNraXAgYXV0byByZWh5ZHJhdGlvblxuICAgIGlmICghc3RhdGUuaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuO1xuXG4gICAgLy8gaWYgaW5pdGlhbCBzdGF0ZSBpcyBhbiBvYmplY3QgYnV0IGluYm91bmQgc3RhdGUgaXMgbnVsbC91bmRlZmluZWQsIHNraXBcbiAgICBpZiAoX3R5cGVvZihzdGF0ZVtrZXldKSA9PT0gJ29iamVjdCcgJiYgIWluYm91bmRTdGF0ZVtrZXldKSB7XG4gICAgICBpZiAobG9nKSBjb25zb2xlLmxvZygncmVkdXgtcGVyc2lzdC9hdXRvUmVoeWRyYXRlOiBzdWIgc3RhdGUgZm9yIGtleSBgJXNgIGlzIGZhbHN5IGJ1dCBpbml0aWFsIHN0YXRlIGlzIGFuIG9iamVjdCwgc2tpcHBpbmcgYXV0b1JlaHlkcmF0ZS4nLCBrZXkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIHJlZHVjZXIgbW9kaWZpZXMgc3Vic3RhdGUsIHNraXAgYXV0byByZWh5ZHJhdGlvblxuICAgIGlmIChzdGF0ZVtrZXldICE9PSByZWR1Y2VkU3RhdGVba2V5XSkge1xuICAgICAgaWYgKGxvZykgY29uc29sZS5sb2coJ3JlZHV4LXBlcnNpc3QvYXV0b1JlaHlkcmF0ZTogc3ViIHN0YXRlIGZvciBrZXkgYCVzYCBtb2RpZmllZCwgc2tpcHBpbmcgYXV0b1JlaHlkcmF0ZS4nLCBrZXkpO1xuICAgICAgbmV3U3RhdGVba2V5XSA9IHJlZHVjZWRTdGF0ZVtrZXldO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSB0YWtlIHRoZSBpbmJvdW5kU3RhdGVcbiAgICBpZiAoaXNTdGF0ZVBsYWluRW5vdWdoKGluYm91bmRTdGF0ZVtrZXldKSAmJiBpc1N0YXRlUGxhaW5Fbm91Z2goc3RhdGVba2V5XSkpIG5ld1N0YXRlW2tleV0gPSBfZXh0ZW5kcyh7fSwgc3RhdGVba2V5XSwgaW5ib3VuZFN0YXRlW2tleV0pOyAvLyBzaGFsbG93IG1lcmdlXG4gICAgZWxzZSBuZXdTdGF0ZVtrZXldID0gaW5ib3VuZFN0YXRlW2tleV07IC8vIGhhcmQgc2V0XG5cbiAgICBpZiAobG9nKSBjb25zb2xlLmxvZygncmVkdXgtcGVyc2lzdC9hdXRvUmVoeWRyYXRlOiBrZXkgYCVzYCwgcmVoeWRyYXRlZCB0byAnLCBrZXksIG5ld1N0YXRlW2tleV0pO1xuICB9KTtcbiAgcmV0dXJuIG5ld1N0YXRlO1xufSJdfQ==