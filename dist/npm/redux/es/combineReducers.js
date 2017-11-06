"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

exports.default = combineReducers;

var _createStore = require('./createStore.js');

var _isPlainObject = require('../../lodash/isPlainObject.js');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning.js');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = (0, _keys2.default)(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2.default)(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = (0, _keys2.default)(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  (0, _keys2.default)(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = (0, _keys2.default)(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2.default)('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = (0, _keys2.default)(finalReducers);

  var unexpectedKeyCache = void 0;
  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2.default)(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbWJpbmVSZWR1Y2Vycy5qcyJdLCJuYW1lcyI6WyJjb21iaW5lUmVkdWNlcnMiLCJnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZSIsImtleSIsImFjdGlvbiIsImFjdGlvblR5cGUiLCJ0eXBlIiwiYWN0aW9uTmFtZSIsInRvU3RyaW5nIiwiZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZSIsImlucHV0U3RhdGUiLCJyZWR1Y2VycyIsInVuZXhwZWN0ZWRLZXlDYWNoZSIsInJlZHVjZXJLZXlzIiwiYXJndW1lbnROYW1lIiwiSU5JVCIsImxlbmd0aCIsImNhbGwiLCJtYXRjaCIsImpvaW4iLCJ1bmV4cGVjdGVkS2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiZm9yRWFjaCIsImFzc2VydFJlZHVjZXJTaGFwZSIsInJlZHVjZXIiLCJpbml0aWFsU3RhdGUiLCJ1bmRlZmluZWQiLCJFcnJvciIsIk1hdGgiLCJyYW5kb20iLCJzdWJzdHJpbmciLCJzcGxpdCIsImZpbmFsUmVkdWNlcnMiLCJpIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiZmluYWxSZWR1Y2VyS2V5cyIsInNoYXBlQXNzZXJ0aW9uRXJyb3IiLCJlIiwiY29tYmluYXRpb24iLCJzdGF0ZSIsImFyZ3VtZW50cyIsIndhcm5pbmdNZXNzYWdlIiwiaGFzQ2hhbmdlZCIsIm5leHRTdGF0ZSIsIl9pIiwiX2tleSIsInByZXZpb3VzU3RhdGVGb3JLZXkiLCJuZXh0U3RhdGVGb3JLZXkiLCJlcnJvck1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBb0V3QkEsZTs7QUFwRXhCOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLFNBQVNDLDZCQUFULENBQXVDQyxHQUF2QyxFQUE0Q0MsTUFBNUMsRUFBb0Q7QUFDbEQsTUFBSUMsYUFBYUQsVUFBVUEsT0FBT0UsSUFBbEM7QUFDQSxNQUFJQyxhQUFhRixjQUFjLE1BQU1BLFdBQVdHLFFBQVgsRUFBTixHQUE4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dGVudCI6WyJpbXBvcnQgeyBBY3Rpb25UeXBlcyB9IGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi91dGlscy93YXJuaW5nJztcblxuZnVuY3Rpb24gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pIHtcbiAgdmFyIGFjdGlvblR5cGUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGU7XG4gIHZhciBhY3Rpb25OYW1lID0gYWN0aW9uVHlwZSAmJiAnXCInICsgYWN0aW9uVHlwZS50b1N0cmluZygpICsgJ1wiJyB8fCAnYW4gYWN0aW9uJztcblxuICByZXR1cm4gJ0dpdmVuIGFjdGlvbiAnICsgYWN0aW9uTmFtZSArICcsIHJlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZC4gJyArICdUbyBpZ25vcmUgYW4gYWN0aW9uLCB5b3UgbXVzdCBleHBsaWNpdGx5IHJldHVybiB0aGUgcHJldmlvdXMgc3RhdGUuICcgKyAnSWYgeW91IHdhbnQgdGhpcyByZWR1Y2VyIHRvIGhvbGQgbm8gdmFsdWUsIHlvdSBjYW4gcmV0dXJuIG51bGwgaW5zdGVhZCBvZiB1bmRlZmluZWQuJztcbn1cblxuZnVuY3Rpb24gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShpbnB1dFN0YXRlLCByZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgYXJndW1lbnROYW1lID0gYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBBY3Rpb25UeXBlcy5JTklUID8gJ3ByZWxvYWRlZFN0YXRlIGFyZ3VtZW50IHBhc3NlZCB0byBjcmVhdGVTdG9yZScgOiAncHJldmlvdXMgc3RhdGUgcmVjZWl2ZWQgYnkgdGhlIHJlZHVjZXInO1xuXG4gIGlmIChyZWR1Y2VyS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJ1N0b3JlIGRvZXMgbm90IGhhdmUgYSB2YWxpZCByZWR1Y2VyLiBNYWtlIHN1cmUgdGhlIGFyZ3VtZW50IHBhc3NlZCAnICsgJ3RvIGNvbWJpbmVSZWR1Y2VycyBpcyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSByZWR1Y2Vycy4nO1xuICB9XG5cbiAgaWYgKCFpc1BsYWluT2JqZWN0KGlucHV0U3RhdGUpKSB7XG4gICAgcmV0dXJuICdUaGUgJyArIGFyZ3VtZW50TmFtZSArICcgaGFzIHVuZXhwZWN0ZWQgdHlwZSBvZiBcIicgKyB7fS50b1N0cmluZy5jYWxsKGlucHV0U3RhdGUpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKVsxXSArICdcIi4gRXhwZWN0ZWQgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyAnICsgKCdrZXlzOiBcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIicpO1xuICB9XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gIXJlZHVjZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgIXVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldO1xuICB9KTtcblxuICB1bmV4cGVjdGVkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XSA9IHRydWU7XG4gIH0pO1xuXG4gIGlmICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuICdVbmV4cGVjdGVkICcgKyAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMSA/ICdrZXlzJyA6ICdrZXknKSArICcgJyArICgnXCInICsgdW5leHBlY3RlZEtleXMuam9pbignXCIsIFwiJykgKyAnXCIgZm91bmQgaW4gJyArIGFyZ3VtZW50TmFtZSArICcuICcpICsgJ0V4cGVjdGVkIHRvIGZpbmQgb25lIG9mIHRoZSBrbm93biByZWR1Y2VyIGtleXMgaW5zdGVhZDogJyArICgnXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCIuIFVuZXhwZWN0ZWQga2V5cyB3aWxsIGJlIGlnbm9yZWQuJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0UmVkdWNlclNoYXBlKHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIGR1cmluZyBpbml0aWFsaXphdGlvbi4gJyArICdJZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZSByZWR1Y2VyIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgJyArICdleHBsaWNpdGx5IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5ICcgKyAnbm90IGJlIHVuZGVmaW5lZC4gSWYgeW91IGRvblxcJ3Qgd2FudCB0byBzZXQgYSB2YWx1ZSBmb3IgdGhpcyByZWR1Y2VyLCAnICsgJ3lvdSBjYW4gdXNlIG51bGwgaW5zdGVhZCBvZiB1bmRlZmluZWQuJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSAnQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTl8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiB0eXBlIH0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiAnICsgKCdEb25cXCd0IHRyeSB0byBoYW5kbGUgJyArIEFjdGlvblR5cGVzLklOSVQgKyAnIG9yIG90aGVyIGFjdGlvbnMgaW4gXCJyZWR1eC8qXCIgJykgKyAnbmFtZXNwYWNlLiBUaGV5IGFyZSBjb25zaWRlcmVkIHByaXZhdGUuIEluc3RlYWQsIHlvdSBtdXN0IHJldHVybiB0aGUgJyArICdjdXJyZW50IHN0YXRlIGZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB1bmxlc3MgaXQgaXMgdW5kZWZpbmVkLCAnICsgJ2luIHdoaWNoIGNhc2UgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLCByZWdhcmRsZXNzIG9mIHRoZSAnICsgJ2FjdGlvbiB0eXBlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgbm90IGJlIHVuZGVmaW5lZCwgYnV0IGNhbiBiZSBudWxsLicpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgZGlmZmVyZW50IHJlZHVjZXIgZnVuY3Rpb25zLCBpbnRvIGEgc2luZ2xlXG4gKiByZWR1Y2VyIGZ1bmN0aW9uLiBJdCB3aWxsIGNhbGwgZXZlcnkgY2hpbGQgcmVkdWNlciwgYW5kIGdhdGhlciB0aGVpciByZXN1bHRzXG4gKiBpbnRvIGEgc2luZ2xlIHN0YXRlIG9iamVjdCwgd2hvc2Uga2V5cyBjb3JyZXNwb25kIHRvIHRoZSBrZXlzIG9mIHRoZSBwYXNzZWRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWR1Y2VycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGNvcnJlc3BvbmQgdG8gZGlmZmVyZW50XG4gKiByZWR1Y2VyIGZ1bmN0aW9ucyB0aGF0IG5lZWQgdG8gYmUgY29tYmluZWQgaW50byBvbmUuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluXG4gKiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhcyByZWR1Y2Vyc2Agc3ludGF4LiBUaGUgcmVkdWNlcnMgbWF5IG5ldmVyIHJldHVyblxuICogdW5kZWZpbmVkIGZvciBhbnkgYWN0aW9uLiBJbnN0ZWFkLCB0aGV5IHNob3VsZCByZXR1cm4gdGhlaXIgaW5pdGlhbCBzdGF0ZVxuICogaWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGVtIHdhcyB1bmRlZmluZWQsIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBmb3IgYW55XG4gKiB1bnJlY29nbml6ZWQgYWN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSByZWR1Y2VyIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBldmVyeSByZWR1Y2VyIGluc2lkZSB0aGVcbiAqIHBhc3NlZCBvYmplY3QsIGFuZCBidWlsZHMgYSBzdGF0ZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGZpbmFsUmVkdWNlcnMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSByZWR1Y2VyS2V5c1tpXTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdhcm5pbmcoJ05vIHJlZHVjZXIgcHJvdmlkZWQgZm9yIGtleSBcIicgKyBrZXkgKyAnXCInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZpbmFsUmVkdWNlcnNba2V5XSA9IHJlZHVjZXJzW2tleV07XG4gICAgfVxuICB9XG4gIHZhciBmaW5hbFJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMoZmluYWxSZWR1Y2Vycyk7XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHZvaWQgMDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB7fTtcbiAgfVxuXG4gIHZhciBzaGFwZUFzc2VydGlvbkVycm9yID0gdm9pZCAwO1xuICB0cnkge1xuICAgIGFzc2VydFJlZHVjZXJTaGFwZShmaW5hbFJlZHVjZXJzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSBlO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbWJpbmF0aW9uKCkge1xuICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGlmIChzaGFwZUFzc2VydGlvbkVycm9yKSB7XG4gICAgICB0aHJvdyBzaGFwZUFzc2VydGlvbkVycm9yO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgd2FybmluZ01lc3NhZ2UgPSBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKHN0YXRlLCBmaW5hbFJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSk7XG4gICAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgICAgd2FybmluZyh3YXJuaW5nTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgbmV4dFN0YXRlID0ge307XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGZpbmFsUmVkdWNlcktleXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2tleSA9IGZpbmFsUmVkdWNlcktleXNbX2ldO1xuICAgICAgdmFyIHJlZHVjZXIgPSBmaW5hbFJlZHVjZXJzW19rZXldO1xuICAgICAgdmFyIHByZXZpb3VzU3RhdGVGb3JLZXkgPSBzdGF0ZVtfa2V5XTtcbiAgICAgIHZhciBuZXh0U3RhdGVGb3JLZXkgPSByZWR1Y2VyKHByZXZpb3VzU3RhdGVGb3JLZXksIGFjdGlvbik7XG4gICAgICBpZiAodHlwZW9mIG5leHRTdGF0ZUZvcktleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKF9rZXksIGFjdGlvbik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgbmV4dFN0YXRlW19rZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufSJdfQ==