"use strict";var exports=module.exports={};
var _from = require('../../../babel-runtime/core-js/array/from.js');

var _from2 = _interopRequireDefault2(_from);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sagaMiddlewareFactory;

var _utils = require('./utils.js');

var _proc = require('./proc.js');

var _proc2 = _interopRequireDefault(_proc);

var _scheduler = require('./scheduler.js');

var _channel = require('./channel.js');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
}

function sagaMiddlewareFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var runSagaDynamically = void 0;
  var sagaMonitor = options.sagaMonitor;

  if (_utils.is.func(options)) {
    if ("development" === 'production') {
      throw new Error('Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead');
    } else {
      throw new Error('You passed a function to the Saga middleware. You are likely trying to start a        Saga by directly passing it to the middleware. This is no longer possible starting from 0.10.0.        To run a Saga, you must do it dynamically AFTER mounting the middleware into the store.\n        Example:\n          import createSagaMiddleware from \'redux-saga\'\n          ... other imports\n\n          const sagaMiddleware = createSagaMiddleware()\n          const store = createStore(reducer, applyMiddleware(sagaMiddleware))\n          sagaMiddleware.run(saga, ...args)\n      ');
    }
  }

  if (options.logger && !_utils.is.func(options.logger)) {
    throw new Error('`options.logger` passed to the Saga middleware is not a function!');
  }

  if (options.onerror && !_utils.is.func(options.onerror)) {
    throw new Error('`options.onerror` passed to the Saga middleware is not a function!');
  }

  function sagaMiddleware(_ref) {
    var getState = _ref.getState,
        dispatch = _ref.dispatch;

    runSagaDynamically = runSaga;
    var sagaEmitter = (0, _channel.emitter)();
    var sagaDispatch = (0, _utils.wrapSagaDispatch)(dispatch);

    function runSaga(saga, args, sagaId) {
      return (0, _proc2.default)(saga.apply(undefined, _toConsumableArray(args)), sagaEmitter.subscribe, sagaDispatch, getState, options, sagaId, saga.name);
    }

    return function (next) {
      return function (action) {
        if (sagaMonitor) {
          sagaMonitor.actionDispatched(action);
        }
        var result = next(action); // hit reducers
        if (action[_utils.SAGA_ACTION]) {
          // Saga actions are already scheduled with asap in proc/runPutEffect
          sagaEmitter.emit(action);
        } else {
          (0, _scheduler.asap)(function () {
            return sagaEmitter.emit(action);
          });
        }

        return result;
      };
    };
  }

  sagaMiddleware.run = function (saga) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (0, _utils.check)(runSagaDynamically, _utils.is.notUndef, 'Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
    (0, _utils.check)(saga, _utils.is.func, 'sagaMiddleware.run(saga, ...args): saga argument must be a Generator function!');

    var effectId = (0, _utils.uid)();
    if (sagaMonitor) {
      sagaMonitor.effectTriggered({ effectId: effectId, root: true, parentEffectId: 0, effect: { root: true, saga: saga, args: args } });
    }
    var task = runSagaDynamically(saga, args, effectId);
    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task);
    }
    return task;
  };

  return sagaMiddleware;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pZGRsZXdhcmUuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0Iiwic2FnYU1pZGRsZXdhcmVGYWN0b3J5IiwiX3V0aWxzIiwicmVxdWlyZSIsIl9wcm9jIiwiX3Byb2MyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9zY2hlZHVsZXIiLCJfY2hhbm5lbCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzQXJyYXkiLCJpIiwiYXJyMiIsImxlbmd0aCIsIm9wdGlvbnMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJydW5TYWdhRHluYW1pY2FsbHkiLCJzYWdhTW9uaXRvciIsImlzIiwiZnVuYyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIkVycm9yIiwibG9nZ2VyIiwib25lcnJvciIsInNhZ2FNaWRkbGV3YXJlIiwiX3JlZiIsImdldFN0YXRlIiwiZGlzcGF0Y2giLCJydW5TYWdhIiwic2FnYUVtaXR0ZXIiLCJlbWl0dGVyIiwic2FnYURpc3BhdGNoIiwid3JhcFNhZ2FEaXNwYXRjaCIsInNhZ2EiLCJhcmdzIiwic2FnYUlkIiwiYXBwbHkiLCJzdWJzY3JpYmUiLCJuYW1lIiwibmV4dCIsImFjdGlvbiIsImFjdGlvbkRpc3BhdGNoZWQiLCJyZXN1bHQiLCJTQUdBX0FDVElPTiIsImVtaXQiLCJhc2FwIiwicnVuIiwiX2xlbiIsIl9rZXkiLCJjaGVjayIsIm5vdFVuZGVmIiwiZWZmZWN0SWQiLCJ1aWQiLCJlZmZlY3RUcmlnZ2VyZWQiLCJyb290IiwicGFyZW50RWZmZWN0SWQiLCJlZmZlY3QiLCJ0YXNrIiwiZWZmZWN0UmVzb2x2ZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBQSxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsU0FBTztBQURvQyxDQUE3QztBQUdB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QUFVQSxRQUFaLEVBQXNCRyxNQUFNLElBQTVCLEVBQWtDQyxnQkFBZ0IsQ0FBbEQsRUFBcURDLFFBQVEsRUFBRUYsTUFBTSxJQUFSLEVBQWNyQixNQUFNQSxJQUFwQixFQUEwQkMsTUFBTUEsSUFBaEMsRUFBN0QsRUFBNUI7QUFDRDtBQUNELFFBQUl1QixPQUFPM0MsbUJBQW1CbUIsSUFBbkIsRUFBeUJDLElBQXpCLEVBQStCaUIsUUFBL0IsQ0FBWDtBQUNBLFFBQUlwQyxXQUFKLEVBQWlCO0FBQ2ZBLGtCQUFZMkMsY0FBWixDQUEyQlAsUUFBM0IsRUFBcUNNLElBQXJDO0FBQ0Q7QUFDRCxXQUFPQSxJQUFQO0FBQ0QsR0FqQkQ7O0FBbUJBLFNBQU9qQyxjQUFQO0FBQ0QiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNhZ2FNaWRkbGV3YXJlRmFjdG9yeTtcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIF9wcm9jID0gcmVxdWlyZSgnLi9wcm9jJyk7XG5cbnZhciBfcHJvYzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9jKTtcblxudmFyIF9zY2hlZHVsZXIgPSByZXF1aXJlKCcuL3NjaGVkdWxlcicpO1xuXG52YXIgX2NoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWwnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbmZ1bmN0aW9uIHNhZ2FNaWRkbGV3YXJlRmFjdG9yeSgpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gIHZhciBydW5TYWdhRHluYW1pY2FsbHkgPSB2b2lkIDA7XG4gIHZhciBzYWdhTW9uaXRvciA9IG9wdGlvbnMuc2FnYU1vbml0b3I7XG5cblxuICBpZiAoX3V0aWxzLmlzLmZ1bmMob3B0aW9ucykpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTYWdhIG1pZGRsZXdhcmUgbm8gbG9uZ2VyIGFjY2VwdCBHZW5lcmF0b3IgZnVuY3Rpb25zLiBVc2Ugc2FnYU1pZGRsZXdhcmUucnVuIGluc3RlYWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgcGFzc2VkIGEgZnVuY3Rpb24gdG8gdGhlIFNhZ2EgbWlkZGxld2FyZS4gWW91IGFyZSBsaWtlbHkgdHJ5aW5nIHRvIHN0YXJ0IGEgICAgICAgIFNhZ2EgYnkgZGlyZWN0bHkgcGFzc2luZyBpdCB0byB0aGUgbWlkZGxld2FyZS4gVGhpcyBpcyBubyBsb25nZXIgcG9zc2libGUgc3RhcnRpbmcgZnJvbSAwLjEwLjAuICAgICAgICBUbyBydW4gYSBTYWdhLCB5b3UgbXVzdCBkbyBpdCBkeW5hbWljYWxseSBBRlRFUiBtb3VudGluZyB0aGUgbWlkZGxld2FyZSBpbnRvIHRoZSBzdG9yZS5cXG4gICAgICAgIEV4YW1wbGU6XFxuICAgICAgICAgIGltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tIFxcJ3JlZHV4LXNhZ2FcXCdcXG4gICAgICAgICAgLi4uIG90aGVyIGltcG9ydHNcXG5cXG4gICAgICAgICAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpXFxuICAgICAgICAgIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgYXBwbHlNaWRkbGV3YXJlKHNhZ2FNaWRkbGV3YXJlKSlcXG4gICAgICAgICAgc2FnYU1pZGRsZXdhcmUucnVuKHNhZ2EsIC4uLmFyZ3MpXFxuICAgICAgJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdGlvbnMubG9nZ2VyICYmICFfdXRpbHMuaXMuZnVuYyhvcHRpb25zLmxvZ2dlcikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2BvcHRpb25zLmxvZ2dlcmAgcGFzc2VkIHRvIHRoZSBTYWdhIG1pZGRsZXdhcmUgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5vbmVycm9yICYmICFfdXRpbHMuaXMuZnVuYyhvcHRpb25zLm9uZXJyb3IpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdgb3B0aW9ucy5vbmVycm9yYCBwYXNzZWQgdG8gdGhlIFNhZ2EgbWlkZGxld2FyZSBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhZ2FNaWRkbGV3YXJlKF9yZWYpIHtcbiAgICB2YXIgZ2V0U3RhdGUgPSBfcmVmLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaCA9IF9yZWYuZGlzcGF0Y2g7XG5cbiAgICBydW5TYWdhRHluYW1pY2FsbHkgPSBydW5TYWdhO1xuICAgIHZhciBzYWdhRW1pdHRlciA9ICgwLCBfY2hhbm5lbC5lbWl0dGVyKSgpO1xuICAgIHZhciBzYWdhRGlzcGF0Y2ggPSAoMCwgX3V0aWxzLndyYXBTYWdhRGlzcGF0Y2gpKGRpc3BhdGNoKTtcblxuICAgIGZ1bmN0aW9uIHJ1blNhZ2Eoc2FnYSwgYXJncywgc2FnYUlkKSB7XG4gICAgICByZXR1cm4gKDAsIF9wcm9jMi5kZWZhdWx0KShzYWdhLmFwcGx5KHVuZGVmaW5lZCwgX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKSwgc2FnYUVtaXR0ZXIuc3Vic2NyaWJlLCBzYWdhRGlzcGF0Y2gsIGdldFN0YXRlLCBvcHRpb25zLCBzYWdhSWQsIHNhZ2EubmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAoc2FnYU1vbml0b3IpIHtcbiAgICAgICAgICBzYWdhTW9uaXRvci5hY3Rpb25EaXNwYXRjaGVkKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5leHQoYWN0aW9uKTsgLy8gaGl0IHJlZHVjZXJzXG4gICAgICAgIGlmIChhY3Rpb25bX3V0aWxzLlNBR0FfQUNUSU9OXSkge1xuICAgICAgICAgIC8vIFNhZ2EgYWN0aW9ucyBhcmUgYWxyZWFkeSBzY2hlZHVsZWQgd2l0aCBhc2FwIGluIHByb2MvcnVuUHV0RWZmZWN0XG4gICAgICAgICAgc2FnYUVtaXR0ZXIuZW1pdChhY3Rpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICgwLCBfc2NoZWR1bGVyLmFzYXApKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzYWdhRW1pdHRlci5lbWl0KGFjdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgc2FnYU1pZGRsZXdhcmUucnVuID0gZnVuY3Rpb24gKHNhZ2EpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgICgwLCBfdXRpbHMuY2hlY2spKHJ1blNhZ2FEeW5hbWljYWxseSwgX3V0aWxzLmlzLm5vdFVuZGVmLCAnQmVmb3JlIHJ1bm5pbmcgYSBTYWdhLCB5b3UgbXVzdCBtb3VudCB0aGUgU2FnYSBtaWRkbGV3YXJlIG9uIHRoZSBTdG9yZSB1c2luZyBhcHBseU1pZGRsZXdhcmUnKTtcbiAgICAoMCwgX3V0aWxzLmNoZWNrKShzYWdhLCBfdXRpbHMuaXMuZnVuYywgJ3NhZ2FNaWRkbGV3YXJlLnJ1bihzYWdhLCAuLi5hcmdzKTogc2FnYSBhcmd1bWVudCBtdXN0IGJlIGEgR2VuZXJhdG9yIGZ1bmN0aW9uIScpO1xuXG4gICAgdmFyIGVmZmVjdElkID0gKDAsIF91dGlscy51aWQpKCk7XG4gICAgaWYgKHNhZ2FNb25pdG9yKSB7XG4gICAgICBzYWdhTW9uaXRvci5lZmZlY3RUcmlnZ2VyZWQoeyBlZmZlY3RJZDogZWZmZWN0SWQsIHJvb3Q6IHRydWUsIHBhcmVudEVmZmVjdElkOiAwLCBlZmZlY3Q6IHsgcm9vdDogdHJ1ZSwgc2FnYTogc2FnYSwgYXJnczogYXJncyB9IH0pO1xuICAgIH1cbiAgICB2YXIgdGFzayA9IHJ1blNhZ2FEeW5hbWljYWxseShzYWdhLCBhcmdzLCBlZmZlY3RJZCk7XG4gICAgaWYgKHNhZ2FNb25pdG9yKSB7XG4gICAgICBzYWdhTW9uaXRvci5lZmZlY3RSZXNvbHZlZChlZmZlY3RJZCwgdGFzayk7XG4gICAgfVxuICAgIHJldHVybiB0YXNrO1xuICB9O1xuXG4gIHJldHVybiBzYWdhTWlkZGxld2FyZTtcbn0iXX0=