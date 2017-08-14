"use strict";var exports=module.exports={};
var _assign = require('../../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault2(_assign);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.defaults = undefined;

var _extends = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _core = require('./core.js');

var _helpers = require('./helpers.js');

var _defaults = require('./defaults.js');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Creates logger with following options
 *
 * @namespace
 * @param {object} options - options for logger
 * @param {string | function | object} options.level - console[level]
 * @param {boolean} options.duration - print duration of each action?
 * @param {boolean} options.timestamp - print timestamp with each action?
 * @param {object} options.colors - custom colors
 * @param {object} options.logger - implementation of the `console` API
 * @param {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
 * @param {boolean} options.collapsed - is group collapsed?
 * @param {boolean} options.predicate - condition which resolves logger behavior
 * @param {function} options.stateTransformer - transform state before print
 * @param {function} options.actionTransformer - transform action before print
 * @param {function} options.errorTransformer - transform error before print
 *
 * @returns {function} logger middleware
 */
function createLogger() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var loggerOptions = _extends({}, _defaults2.default, options);

  var logger = loggerOptions.logger,
      transformer = loggerOptions.transformer,
      stateTransformer = loggerOptions.stateTransformer,
      errorTransformer = loggerOptions.errorTransformer,
      predicate = loggerOptions.predicate,
      logErrors = loggerOptions.logErrors,
      diffPredicate = loggerOptions.diffPredicate;

  // Return if 'console' object is not defined

  if (typeof logger === 'undefined') {
    return function () {
      return function (next) {
        return function (action) {
          return next(action);
        };
      };
    };
  }

  if (transformer) {
    console.error('Option \'transformer\' is deprecated, use \'stateTransformer\' instead!'); // eslint-disable-line no-console
  }

  // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
  if (options.getState && options.dispatch) {
    // eslint-disable-next-line no-console
    console.error('[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n\n// Logger with default options\nimport { logger } from \'redux-logger\'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n\n\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from \'redux-logger\'\n\nconst logger = createLogger({\n  // ...options\n});\n\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n');

    return function () {
      return function (next) {
        return function (action) {
          return next(action);
        };
      };
    };
  }

  var logBuffer = [];

  return function (_ref) {
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        // Exit early if predicate function returns 'false'
        if (typeof predicate === 'function' && !predicate(getState, action)) {
          return next(action);
        }

        var logEntry = {};
        logBuffer.push(logEntry);

        logEntry.started = _helpers.timer.now();
        logEntry.startedTime = new Date();
        logEntry.prevState = stateTransformer(getState());
        logEntry.action = action;

        var returnedValue = void 0;
        if (logErrors) {
          try {
            returnedValue = next(action);
          } catch (e) {
            logEntry.error = errorTransformer(e);
          }
        } else {
          returnedValue = next(action);
        }

        logEntry.took = _helpers.timer.now() - logEntry.started;
        logEntry.nextState = stateTransformer(getState());

        var diff = loggerOptions.diff && typeof diffPredicate === 'function' ? diffPredicate(getState, action) : loggerOptions.diff;

        (0, _core.printBuffer)(logBuffer, _extends({}, loggerOptions, { diff: diff }));
        logBuffer.length = 0;

        if (logEntry.error) throw logEntry.error;
        return returnedValue;
      };
    };
  };
}

var defaultLogger = createLogger();

exports.defaults = _defaults2.default;
exports.logger = defaultLogger;
exports.default = createLogger;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwibG9nZ2VyIiwiZGVmYXVsdHMiLCJ1bmRlZmluZWQiLCJfZXh0ZW5kcyIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfY29yZSIsInJlcXVpcmUiLCJfaGVscGVycyIsIl9kZWZhdWx0cyIsIl9kZWZhdWx0czIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJjcmVhdGVMb2dnZXIiLCJvcHRpb25zIiwibG9nZ2VyT3B0aW9ucyIsInRyYW5zZm9ybWVyIiwic3RhdGVUcmFuc2Zvcm1lciIsImVycm9yVHJhbnNmb3JtZXIiLCJwcmVkaWNhdGUiLCJsb2dFcnJvcnMiLCJkaWZmUHJlZGljYXRlIiwibmV4dCIsImFjdGlvbiIsImNvbnNvbGUiLCJlcnJvciIsImdldFN0YXRlIiwiZGlzcGF0Y2giLCJsb2dCdWZmZXIiLCJfcmVmIiwibG9nRW50cnkiLCJwdXNoIiwic3RhcnRlZCIsInRpbWVyIiwibm93Iiwic3RhcnRlZFRpbWUiLCJEYXRlIiwicHJldlN0YXRlIiwicmV0dXJuZWRWYWx1ZSIsImUiLCJ0b29rIiwibmV4dFN0YXRlIiwiZGlmZiIsInByaW50QnVmZmVyIiwiZGVmYXVsdExvZ2dlciIsIm1vZHVsZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDO0FBR0FELFFBQVFFLE1BQVIsR0FBaUJGLFFBQVFHLFFBQVIsR0FBbUJDLFNBQXBDOztBQUVBLElBQUlDLFdBQVcsb0JBQWlCLFVBQVVDLE1BQVYsRUFBa0I7QUFBRSxPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUMsVUFBVUMsTUFBOUIsRUFBc0NGLEdBQXRDLEVBQTJDO0FBQUUsUUFBSUcsU0FBU0YsVUFBVUQsQ0FBVixDQUFiLENBQTJCLEtBQUssSUFBSUksR0FBVCxJQUFnQkQsTUFBaEIsRUFBd0I7QUFBRSxVQUFJWixPQUFPYyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNKLE1BQXJDLEVBQTZDQyxHQUE3QyxDQUFKLEVBQXVEO0FBQUVMLGVBQU9LLEdBQVAsSUFBY0QsT0FBT0MsR0FBUCxDQUFkO0FBQTRCO0FBQUU7QUFBRSxHQUFDLE9BQU9MLE1BQVA7QUFBZ0IsQ0FBaFE7O0FBRUEsSUFBSVMsUUFBUUMsUUFBUSxRQUFSLENBQVo7O0FBRUEsSUFBSUMsV0FBV0QsUUFBUSxXQUFSLENBQWY7O0FBRUEsSUFBSUUsWUFBWUYsUUFBUSxZQUFSLENBQWhCOztBQUVBLElBQUlHLGFBQWFDLHVCQUF1QkYsU0FBdkIsQ0FBakI7O0FBRUEsU0FBU0Usc0JBQVQsQ0FBZ0NDLEdBQWhDLEVBQXFDO0FBQUUsU0FBT0EsT0FBT0EsSUFBSUMsVUFBWCxHQUF3QkQsR0FBeEIsR0FBOEIsRUFBRUUsU0FBU0YsR0FBWCxFQUFyQztBQUF3RDs7QUFFL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsU0FBU0csWUFBVCxHQUF3QjtBQUN0QixNQUFJQyxVQUFVakIsVUFBVUMsTUFBVixHQUFtQixDQUFuQixJQUF3QkQsVUFBVSxDQUFWLE1BQWlCSixTQUF6QyxHQUFxREksVUFBVSxDQUFWLENBQXJELEdBQW9FLEVBQWxGOztBQUVBLE1BQUlrQixnQkFBZ0JyQixTQUFTLEVBQVQsRUFBYWMsV0FBV0ksT0FBeEIsRUFBaUNFLE9BQWpDLENBQXBCOztBQUVBLE1BQUl2QixTQUFTd0IsY0FBY3hCLE1BQTNCO0FBQUEsTUFDSXlCLGNBQWNELGNBQWNDLFdBRGhDO0FBQUEsTUFFSUMsbUJBQW1CRixjQUFjRSxnQkFGckM7QUFBQSxNQUdJQyxtQkFBbUJILGNBQWNHLGdCQUhyQztBQUFBLE1BSUlDLFlBQVlKLGNBQWNJLFNBSjlCO0FBQUEsTUFLSUMsWUFBWUwsY0FBY0ssU0FMOUI7QUFBQSxNQU1JQyxnQkFBZ0JOLGNBQWNNLGFBTmxDOztBQVFBOztBQUVBLE1BQUksT0FBTzlCLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDakMsV0FBTyxZQUFZO0FBQ2pCLGFBQU8sVUFBVStCLElBQVYsRUFBZ0I7QUFDckIsZUFBTyxVQUFVQyxNQUFWLEVBQWtCO0FBQ3ZCLGlCQUFPRCxLQUFLQyxNQUFMLENBQVA7QUFDRCxTQUZEO0FBR0QsT0FKRDtBQUtELEtBTkQ7QUFPRDs7QUFFRCxNQUFJUCxXQUFKLEVBQWlCO0FBQ2ZRLFlBQVFDLEtBQVIsQ0FBYyx5RUFBZCxFQURlLENBQzJFO0FBQzNGOztBQUVEO0FBQ0EsTUFBSVgsUUFBUVksUUFBUixJQUFvQlosUUFBUWEsUUFBaEMsRUFBMEM7QUFDeEM7QUFDQUgsWUFBUUMsS0FBUixDQUFjLDJmQUFkOztBQUVBLFdBQU8sWUFBWTtBQUNqQixhQUFPLFVBQVVILElBQVYsRUFBZ0I7QUFDckIsZUFBTyxVQUFVQyxNQUFWLEVBQWtCO0FBQ3ZCLGlCQUFPRCxLQUFLQyxNQUFMLENBQVA7QUFDRCxTQUZEO0FBR0QsT0FKRDtBQUtELEtBTkQ7QUFPRDs7QUFFRCxNQUFJSyxZQUFZLEVBQWhCOztBQUVBLFNBQU8sVUFBVUMsSUFBVixFQUFnQjtBQUNyQixRQUFJSCxXQUFXRyxLQUFLSCxRQUFwQjtBQUNBLFdBQU8sVUFBVUosSUFBVixFQUFnQjtBQUNyQixhQUFPLFVBQVVDLE1BQVYsRUFBa0I7QUFDdkI7QUFDQSxZQUFJLE9BQU9KLFNBQVAsS0FBcUIsVUFBckIsSUFBbUMsQ0FBQ0EsVUFBVU8sUUFBVixFQUFvQkgsTUFBcEIsQ0FBeEMsRUFBcUU7QUFDbkUsaUJBQU9ELEtBQUtDLE1BQUwsQ0FBUDtBQUNEOztBQUVELFlBQUlPLFdBQVcsRUFBZjtBQUNBRixrQkFBVUcsSUFBVixDQUFlRCxRQUFmOztBQUVBQSxpQkFBU0UsT0FBVCxHQUFtQjFCLFNBQVMyQixLQUFULENBQWVDLEdBQWYsRUFBbkI7QUFDQUosaUJBQVNLLFdBQVQsR0FBdUIsSUFBSUMsSUFBSixFQUF2QjtBQUNBTixpQkFBU08sU0FBVCxHQUFxQnBCLGlCQUFpQlMsVUFBakIsQ0FBckI7QUFDQUksaUJBQVNQLE1BQVQsR0FBa0JBLE1BQWxCOztBQUVBLFlBQUllLGdCQUFnQixLQUFLLENBQXpCO0FBQ0EsWUFBSWxCLFNBQUosRUFBZTtBQUNiLGNBQUk7QUFDRmtCLDRCQUFnQmhCLEtBQUtDLE1BQUwsQ0FBaEI7QUFDRCxXQUZELENBRUUsT0FBT2dCLENBQVAsRUFBVTtBQUNWVCxxQkFBU0wsS0FBVCxHQUFpQlAsaUJBQWlCcUIsQ0FBakIsQ0FBakI7QUFDRDtBQUNGLFNBTkQsTUFNTztBQUNMRCwwQkFBZ0JoQixLQUFLQyxNQUFMLENBQWhCO0FBQ0Q7O0FBRURPLGlCQUFTVSxJQUFULEdBQWdCbEMsU0FBUzJCLEtBQVQsQ0FBZUMsR0FBZixLQUF1QkosU0FBU0UsT0FBaEQ7QUFDQUYsaUJBQVNXLFNBQVQsR0FBcUJ4QixpQkFBaUJTLFVBQWpCLENBQXJCOztBQUVBLFlBQUlnQixPQUFPM0IsY0FBYzJCLElBQWQsSUFBc0IsT0FBT3JCLGFBQVAsS0FBeUIsVUFBL0MsR0FBNERBLGNBQWNLLFFBQWQsRUFBd0JILE1BQXhCLENBQTVELEdBQThGUixjQUFjMkIsSUFBdkg7O0FBRUEsU0FBQyxHQUFHdEMsTUFBTXVDLFdBQVYsRUFBdUJmLFNBQXZCLEVBQWtDbEMsU0FBUyxFQUFULEVBQWFxQixhQUFiLEVBQTRCLEVBQUUyQixNQUFNQSxJQUFSLEVBQTVCLENBQWxDO0FBQ0FkLGtCQUFVOUIsTUFBVixHQUFtQixDQUFuQjs7QUFFQSxZQUFJZ0MsU0FBU0wsS0FBYixFQUFvQixNQUFNSyxTQUFTTCxLQUFmO0FBQ3BCLGVBQU9hLGFBQVA7QUFDRCxPQW5DRDtBQW9DRCxLQXJDRDtBQXNDRCxHQXhDRDtBQXlDRDs7QUFFRCxJQUFJTSxnQkFBZ0IvQixjQUFwQjs7QUFFQXhCLFFBQVFHLFFBQVIsR0FBbUJnQixXQUFXSSxPQUE5QjtBQUNBdkIsUUFBUUUsTUFBUixHQUFpQnFELGFBQWpCO0FBQ0F2RCxRQUFRdUIsT0FBUixHQUFrQkMsWUFBbEI7QUFDQWdDLE9BQU94RCxPQUFQLEdBQWlCQSxRQUFRLFNBQVIsQ0FBakIiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubG9nZ2VyID0gZXhwb3J0cy5kZWZhdWx0cyA9IHVuZGVmaW5lZDtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jb3JlID0gcmVxdWlyZSgnLi9jb3JlJyk7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG52YXIgX2RlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG52YXIgX2RlZmF1bHRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDcmVhdGVzIGxvZ2dlciB3aXRoIGZvbGxvd2luZyBvcHRpb25zXG4gKlxuICogQG5hbWVzcGFjZVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIGZvciBsb2dnZXJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgZnVuY3Rpb24gfCBvYmplY3R9IG9wdGlvbnMubGV2ZWwgLSBjb25zb2xlW2xldmVsXVxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmR1cmF0aW9uIC0gcHJpbnQgZHVyYXRpb24gb2YgZWFjaCBhY3Rpb24/XG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMudGltZXN0YW1wIC0gcHJpbnQgdGltZXN0YW1wIHdpdGggZWFjaCBhY3Rpb24/XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5jb2xvcnMgLSBjdXN0b20gY29sb3JzXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5sb2dnZXIgLSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgYGNvbnNvbGVgIEFQSVxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmxvZ0Vycm9ycyAtIHNob3VsZCBlcnJvcnMgaW4gYWN0aW9uIGV4ZWN1dGlvbiBiZSBjYXVnaHQsIGxvZ2dlZCwgYW5kIHJlLXRocm93bj9cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jb2xsYXBzZWQgLSBpcyBncm91cCBjb2xsYXBzZWQ/XG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucHJlZGljYXRlIC0gY29uZGl0aW9uIHdoaWNoIHJlc29sdmVzIGxvZ2dlciBiZWhhdmlvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5zdGF0ZVRyYW5zZm9ybWVyIC0gdHJhbnNmb3JtIHN0YXRlIGJlZm9yZSBwcmludFxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5hY3Rpb25UcmFuc2Zvcm1lciAtIHRyYW5zZm9ybSBhY3Rpb24gYmVmb3JlIHByaW50XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLmVycm9yVHJhbnNmb3JtZXIgLSB0cmFuc2Zvcm0gZXJyb3IgYmVmb3JlIHByaW50XG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufSBsb2dnZXIgbWlkZGxld2FyZVxuICovXG5mdW5jdGlvbiBjcmVhdGVMb2dnZXIoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICB2YXIgbG9nZ2VyT3B0aW9ucyA9IF9leHRlbmRzKHt9LCBfZGVmYXVsdHMyLmRlZmF1bHQsIG9wdGlvbnMpO1xuXG4gIHZhciBsb2dnZXIgPSBsb2dnZXJPcHRpb25zLmxvZ2dlcixcbiAgICAgIHRyYW5zZm9ybWVyID0gbG9nZ2VyT3B0aW9ucy50cmFuc2Zvcm1lcixcbiAgICAgIHN0YXRlVHJhbnNmb3JtZXIgPSBsb2dnZXJPcHRpb25zLnN0YXRlVHJhbnNmb3JtZXIsXG4gICAgICBlcnJvclRyYW5zZm9ybWVyID0gbG9nZ2VyT3B0aW9ucy5lcnJvclRyYW5zZm9ybWVyLFxuICAgICAgcHJlZGljYXRlID0gbG9nZ2VyT3B0aW9ucy5wcmVkaWNhdGUsXG4gICAgICBsb2dFcnJvcnMgPSBsb2dnZXJPcHRpb25zLmxvZ0Vycm9ycyxcbiAgICAgIGRpZmZQcmVkaWNhdGUgPSBsb2dnZXJPcHRpb25zLmRpZmZQcmVkaWNhdGU7XG5cbiAgLy8gUmV0dXJuIGlmICdjb25zb2xlJyBvYmplY3QgaXMgbm90IGRlZmluZWRcblxuICBpZiAodHlwZW9mIGxvZ2dlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIGlmICh0cmFuc2Zvcm1lcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ09wdGlvbiBcXCd0cmFuc2Zvcm1lclxcJyBpcyBkZXByZWNhdGVkLCB1c2UgXFwnc3RhdGVUcmFuc2Zvcm1lclxcJyBpbnN0ZWFkIScpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgfVxuXG4gIC8vIERldGVjdCBpZiAnY3JlYXRlTG9nZ2VyJyB3YXMgcGFzc2VkIGRpcmVjdGx5IHRvICdhcHBseU1pZGRsZXdhcmUnLlxuICBpZiAob3B0aW9ucy5nZXRTdGF0ZSAmJiBvcHRpb25zLmRpc3BhdGNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmVycm9yKCdbcmVkdXgtbG9nZ2VyXSByZWR1eC1sb2dnZXIgbm90IGluc3RhbGxlZC4gTWFrZSBzdXJlIHRvIHBhc3MgbG9nZ2VyIGluc3RhbmNlIGFzIG1pZGRsZXdhcmU6XFxuXFxuLy8gTG9nZ2VyIHdpdGggZGVmYXVsdCBvcHRpb25zXFxuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcXCdyZWR1eC1sb2dnZXJcXCdcXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxcbiAgcmVkdWNlcixcXG4gIGFwcGx5TWlkZGxld2FyZShsb2dnZXIpXFxuKVxcblxcblxcbi8vIE9yIHlvdSBjYW4gY3JlYXRlIHlvdXIgb3duIGxvZ2dlciB3aXRoIGN1c3RvbSBvcHRpb25zIGh0dHA6Ly9iaXQubHkvcmVkdXgtbG9nZ2VyLW9wdGlvbnNcXG5pbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gXFwncmVkdXgtbG9nZ2VyXFwnXFxuXFxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKHtcXG4gIC8vIC4uLm9wdGlvbnNcXG59KTtcXG5cXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxcbiAgcmVkdWNlcixcXG4gIGFwcGx5TWlkZGxld2FyZShsb2dnZXIpXFxuKVxcbicpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG4gIH1cblxuICB2YXIgbG9nQnVmZmVyID0gW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGdldFN0YXRlID0gX3JlZi5nZXRTdGF0ZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIC8vIEV4aXQgZWFybHkgaWYgcHJlZGljYXRlIGZ1bmN0aW9uIHJldHVybnMgJ2ZhbHNlJ1xuICAgICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiAhcHJlZGljYXRlKGdldFN0YXRlLCBhY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsb2dFbnRyeSA9IHt9O1xuICAgICAgICBsb2dCdWZmZXIucHVzaChsb2dFbnRyeSk7XG5cbiAgICAgICAgbG9nRW50cnkuc3RhcnRlZCA9IF9oZWxwZXJzLnRpbWVyLm5vdygpO1xuICAgICAgICBsb2dFbnRyeS5zdGFydGVkVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxvZ0VudHJ5LnByZXZTdGF0ZSA9IHN0YXRlVHJhbnNmb3JtZXIoZ2V0U3RhdGUoKSk7XG4gICAgICAgIGxvZ0VudHJ5LmFjdGlvbiA9IGFjdGlvbjtcblxuICAgICAgICB2YXIgcmV0dXJuZWRWYWx1ZSA9IHZvaWQgMDtcbiAgICAgICAgaWYgKGxvZ0Vycm9ycykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm5lZFZhbHVlID0gbmV4dChhY3Rpb24pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGxvZ0VudHJ5LmVycm9yID0gZXJyb3JUcmFuc2Zvcm1lcihlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuZWRWYWx1ZSA9IG5leHQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ0VudHJ5LnRvb2sgPSBfaGVscGVycy50aW1lci5ub3coKSAtIGxvZ0VudHJ5LnN0YXJ0ZWQ7XG4gICAgICAgIGxvZ0VudHJ5Lm5leHRTdGF0ZSA9IHN0YXRlVHJhbnNmb3JtZXIoZ2V0U3RhdGUoKSk7XG5cbiAgICAgICAgdmFyIGRpZmYgPSBsb2dnZXJPcHRpb25zLmRpZmYgJiYgdHlwZW9mIGRpZmZQcmVkaWNhdGUgPT09ICdmdW5jdGlvbicgPyBkaWZmUHJlZGljYXRlKGdldFN0YXRlLCBhY3Rpb24pIDogbG9nZ2VyT3B0aW9ucy5kaWZmO1xuXG4gICAgICAgICgwLCBfY29yZS5wcmludEJ1ZmZlcikobG9nQnVmZmVyLCBfZXh0ZW5kcyh7fSwgbG9nZ2VyT3B0aW9ucywgeyBkaWZmOiBkaWZmIH0pKTtcbiAgICAgICAgbG9nQnVmZmVyLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgaWYgKGxvZ0VudHJ5LmVycm9yKSB0aHJvdyBsb2dFbnRyeS5lcnJvcjtcbiAgICAgICAgcmV0dXJuIHJldHVybmVkVmFsdWU7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbnZhciBkZWZhdWx0TG9nZ2VyID0gY3JlYXRlTG9nZ2VyKCk7XG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBfZGVmYXVsdHMyLmRlZmF1bHQ7XG5leHBvcnRzLmxvZ2dlciA9IGRlZmF1bHRMb2dnZXI7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVMb2dnZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbiJdfQ==