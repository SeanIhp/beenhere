"use strict";var exports=module.exports={};
var _from = require('../../babel-runtime/core-js/array/from.js');

var _from2 = _interopRequireDefault2(_from);

var _iterator = require('../../babel-runtime/core-js/symbol/iterator.js');

var _iterator2 = _interopRequireDefault2(_iterator);

var _typeof3 = require('../../babel-runtime/helpers/typeof.js');

var _typeof4 = _interopRequireDefault2(_typeof3);

var _symbol = require('../../babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault2(_symbol);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
};

exports.printBuffer = printBuffer;

var _helpers = require('./helpers.js');

var _diff = require('./diff.js');

var _diff2 = _interopRequireDefault(_diff);

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

/**
 * Get log level string based on supplied params
 *
 * @param {string | function | object} level - console[level]
 * @param {object} action - selected action
 * @param {array} payload - selected payload
 * @param {string} type - log entry type
 *
 * @returns {string} level
 */
function getLogLevel(level, action, payload, type) {
  switch (typeof level === 'undefined' ? 'undefined' : _typeof(level)) {
    case 'object':
      return typeof level[type] === 'function' ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
    case 'function':
      return level(action);
    default:
      return level;
  }
}

function defaultTitleFormatter(options) {
  var timestamp = options.timestamp,
      duration = options.duration;

  return function (action, time, took) {
    var parts = ['action'];

    parts.push('%c' + String(action.type));
    if (timestamp) parts.push('%c@ ' + time);
    if (duration) parts.push('%c(in ' + took.toFixed(2) + ' ms)');

    return parts.join(' ');
  };
}

function printBuffer(buffer, options) {
  var logger = options.logger,
      actionTransformer = options.actionTransformer,
      _options$titleFormatt = options.titleFormatter,
      titleFormatter = _options$titleFormatt === undefined ? defaultTitleFormatter(options) : _options$titleFormatt,
      collapsed = options.collapsed,
      colors = options.colors,
      level = options.level,
      diff = options.diff;

  buffer.forEach(function (logEntry, key) {
    var started = logEntry.started,
        startedTime = logEntry.startedTime,
        action = logEntry.action,
        prevState = logEntry.prevState,
        error = logEntry.error;
    var took = logEntry.took,
        nextState = logEntry.nextState;

    var nextEntry = buffer[key + 1];

    if (nextEntry) {
      nextState = nextEntry.prevState;
      took = nextEntry.started - started;
    }

    // Message
    var formattedAction = actionTransformer(action);
    var isCollapsed = typeof collapsed === 'function' ? collapsed(function () {
      return nextState;
    }, action, logEntry) : collapsed;

    var formattedTime = (0, _helpers.formatTime)(startedTime);
    var titleCSS = colors.title ? 'color: ' + colors.title(formattedAction) + ';' : '';
    var headerCSS = ['color: gray; font-weight: lighter;'];
    headerCSS.push(titleCSS);
    if (options.timestamp) headerCSS.push('color: gray; font-weight: lighter;');
    if (options.duration) headerCSS.push('color: gray; font-weight: lighter;');
    var title = titleFormatter(formattedAction, formattedTime, took);

    // Render
    try {
      if (isCollapsed) {
        if (colors.title) logger.groupCollapsed.apply(logger, ['%c ' + title].concat(headerCSS));else logger.groupCollapsed(title);
      } else {
        if (colors.title) logger.group.apply(logger, ['%c ' + title].concat(headerCSS));else logger.group(title);
      }
    } catch (e) {
      logger.log(title);
    }

    var prevStateLevel = getLogLevel(level, formattedAction, [prevState], 'prevState');
    var actionLevel = getLogLevel(level, formattedAction, [formattedAction], 'action');
    var errorLevel = getLogLevel(level, formattedAction, [error, prevState], 'error');
    var nextStateLevel = getLogLevel(level, formattedAction, [nextState], 'nextState');

    if (prevStateLevel) {
      if (colors.prevState) logger[prevStateLevel]('%c prev state', 'color: ' + colors.prevState(prevState) + '; font-weight: bold', prevState);else logger[prevStateLevel]('prev state', prevState);
    }

    if (actionLevel) {
      if (colors.action) logger[actionLevel]('%c action    ', 'color: ' + colors.action(formattedAction) + '; font-weight: bold', formattedAction);else logger[actionLevel]('action    ', formattedAction);
    }

    if (error && errorLevel) {
      if (colors.error) logger[errorLevel]('%c error     ', 'color: ' + colors.error(error, prevState) + '; font-weight: bold;', error);else logger[errorLevel]('error     ', error);
    }

    if (nextStateLevel) {
      if (colors.nextState) logger[nextStateLevel]('%c next state', 'color: ' + colors.nextState(nextState) + '; font-weight: bold', nextState);else logger[nextStateLevel]('next state', nextState);
    }

    if (diff) {
      (0, _diff2.default)(prevState, nextState, logger, isCollapsed);
    }

    try {
      logger.groupEnd();
    } catch (e) {
      logger.log("\u2014\u2014 log end \u2014\u2014");
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJfdHlwZW9mIiwib2JqIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJwcmludEJ1ZmZlciIsIl9oZWxwZXJzIiwicmVxdWlyZSIsIl9kaWZmIiwiX2RpZmYyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImFycjIiLCJsZW5ndGgiLCJnZXRMb2dMZXZlbCIsImxldmVsIiwiYWN0aW9uIiwicGF5bG9hZCIsInR5cGUiLCJhcHBseSIsImRlZmF1bHRUaXRsZUZvcm1hdHRlciIsIm9wdGlvbnMiLCJ0aW1lc3RhbXAiLCJkdXJhdGlvbiIsInRpbWUiLCJ0b29rIiwicGFydHMiLCJwdXNoIiwiU3RyaW5nIiwidG9GaXhlZCIsImpvaW4iLCJidWZmZXIiLCJsb2dnZXIiLCJhY3Rpb25UcmFuc2Zvcm1lciIsIl9vcHRpb25zJHRpdGxlRm9ybWF0dCIsInRpdGxlRm9ybWF0dGVyIiwidW5kZWZpbmVkIiwiY29sbGFwc2VkIiwiY29sb3JzIiwiZGlmZiIsImZvckVhY2giLCJsb2dFbnRyeSIsImtleSIsInN0YXJ0ZWQiLCJzdGFydGVkVGltZSIsInByZXZTdGF0ZSIsImVycm9yIiwibmV4dFN0YXRlIiwibmV4dEVudHJ5IiwiZm9ybWF0dGVkQWN0aW9uIiwiaXNDb2xsYXBzZWQiLCJmb3JtYXR0ZWRUaW1lIiwiZm9ybWF0VGltZSIsInRpdGxlQ1NTIiwidGl0bGUiLCJoZWFkZXJDU1MiLCJncm91cENvbGxhcHNlZCIsImNvbmNhdCIsImdyb3VwIiwiZSIsImxvZyIsInByZXZTdGF0ZUxldmVsIiwiYWN0aW9uTGV2ZWwiLCJlcnJvckxldmVsIiwibmV4dFN0YXRlTGV2ZWwiLCJncm91cEVuZCJdLCJtYXBwaW5ncyI6IkFB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QU9TLFNBQVgsRUFBc0JmLE9BQU9nQyxjQUFQLEVBQXVCLGVBQXZCLEVBQXdDLFlBQVkxQixPQUFPUyxTQUFQLENBQWlCQSxTQUFqQixDQUFaLEdBQTBDLHFCQUFsRixFQUF5R0EsU0FBekcsRUFBdEIsS0FBK0lmLE9BQU9nQyxjQUFQLEVBQXVCLFlBQXZCLEVBQXFDakIsU0FBckM7QUFDaEo7O0FBRUQsUUFBSVIsSUFBSixFQUFVO0FBQ1IsT0FBQyxHQUFHcEMsT0FBT0csT0FBWCxFQUFvQnVDLFNBQXBCLEVBQStCRSxTQUEvQixFQUEwQ2YsTUFBMUMsRUFBa0RrQixXQUFsRDtBQUNEOztBQUVELFFBQUk7QUFDRmxCLGFBQU9pQyxRQUFQO0FBQ0QsS0FGRCxDQUVFLE9BQU9OLENBQVAsRUFBVTtBQUNWM0IsYUFBTzRCLEdBQVAsQ0FBVyxtQ0FBWDtBQUNEO0FBQ0YsR0F2RUQ7QUF3RUQiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5leHBvcnRzLnByaW50QnVmZmVyID0gcHJpbnRCdWZmZXI7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG52YXIgX2RpZmYgPSByZXF1aXJlKCcuL2RpZmYnKTtcblxudmFyIF9kaWZmMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RpZmYpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuLyoqXG4gKiBHZXQgbG9nIGxldmVsIHN0cmluZyBiYXNlZCBvbiBzdXBwbGllZCBwYXJhbXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyB8IGZ1bmN0aW9uIHwgb2JqZWN0fSBsZXZlbCAtIGNvbnNvbGVbbGV2ZWxdXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uIC0gc2VsZWN0ZWQgYWN0aW9uXG4gKiBAcGFyYW0ge2FycmF5fSBwYXlsb2FkIC0gc2VsZWN0ZWQgcGF5bG9hZFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBsb2cgZW50cnkgdHlwZVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGxldmVsXG4gKi9cbmZ1bmN0aW9uIGdldExvZ0xldmVsKGxldmVsLCBhY3Rpb24sIHBheWxvYWQsIHR5cGUpIHtcbiAgc3dpdGNoICh0eXBlb2YgbGV2ZWwgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGxldmVsKSkge1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICByZXR1cm4gdHlwZW9mIGxldmVsW3R5cGVdID09PSAnZnVuY3Rpb24nID8gbGV2ZWxbdHlwZV0uYXBwbHkobGV2ZWwsIF90b0NvbnN1bWFibGVBcnJheShwYXlsb2FkKSkgOiBsZXZlbFt0eXBlXTtcbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICByZXR1cm4gbGV2ZWwoYWN0aW9uKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGxldmVsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRUaXRsZUZvcm1hdHRlcihvcHRpb25zKSB7XG4gIHZhciB0aW1lc3RhbXAgPSBvcHRpb25zLnRpbWVzdGFtcCxcbiAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbjtcblxuXG4gIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uLCB0aW1lLCB0b29rKSB7XG4gICAgdmFyIHBhcnRzID0gWydhY3Rpb24nXTtcblxuICAgIHBhcnRzLnB1c2goJyVjJyArIFN0cmluZyhhY3Rpb24udHlwZSkpO1xuICAgIGlmICh0aW1lc3RhbXApIHBhcnRzLnB1c2goJyVjQCAnICsgdGltZSk7XG4gICAgaWYgKGR1cmF0aW9uKSBwYXJ0cy5wdXNoKCclYyhpbiAnICsgdG9vay50b0ZpeGVkKDIpICsgJyBtcyknKTtcblxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcgJyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByaW50QnVmZmVyKGJ1ZmZlciwgb3B0aW9ucykge1xuICB2YXIgbG9nZ2VyID0gb3B0aW9ucy5sb2dnZXIsXG4gICAgICBhY3Rpb25UcmFuc2Zvcm1lciA9IG9wdGlvbnMuYWN0aW9uVHJhbnNmb3JtZXIsXG4gICAgICBfb3B0aW9ucyR0aXRsZUZvcm1hdHQgPSBvcHRpb25zLnRpdGxlRm9ybWF0dGVyLFxuICAgICAgdGl0bGVGb3JtYXR0ZXIgPSBfb3B0aW9ucyR0aXRsZUZvcm1hdHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRUaXRsZUZvcm1hdHRlcihvcHRpb25zKSA6IF9vcHRpb25zJHRpdGxlRm9ybWF0dCxcbiAgICAgIGNvbGxhcHNlZCA9IG9wdGlvbnMuY29sbGFwc2VkLFxuICAgICAgY29sb3JzID0gb3B0aW9ucy5jb2xvcnMsXG4gICAgICBsZXZlbCA9IG9wdGlvbnMubGV2ZWwsXG4gICAgICBkaWZmID0gb3B0aW9ucy5kaWZmO1xuXG5cbiAgYnVmZmVyLmZvckVhY2goZnVuY3Rpb24gKGxvZ0VudHJ5LCBrZXkpIHtcbiAgICB2YXIgc3RhcnRlZCA9IGxvZ0VudHJ5LnN0YXJ0ZWQsXG4gICAgICAgIHN0YXJ0ZWRUaW1lID0gbG9nRW50cnkuc3RhcnRlZFRpbWUsXG4gICAgICAgIGFjdGlvbiA9IGxvZ0VudHJ5LmFjdGlvbixcbiAgICAgICAgcHJldlN0YXRlID0gbG9nRW50cnkucHJldlN0YXRlLFxuICAgICAgICBlcnJvciA9IGxvZ0VudHJ5LmVycm9yO1xuICAgIHZhciB0b29rID0gbG9nRW50cnkudG9vayxcbiAgICAgICAgbmV4dFN0YXRlID0gbG9nRW50cnkubmV4dFN0YXRlO1xuXG4gICAgdmFyIG5leHRFbnRyeSA9IGJ1ZmZlcltrZXkgKyAxXTtcblxuICAgIGlmIChuZXh0RW50cnkpIHtcbiAgICAgIG5leHRTdGF0ZSA9IG5leHRFbnRyeS5wcmV2U3RhdGU7XG4gICAgICB0b29rID0gbmV4dEVudHJ5LnN0YXJ0ZWQgLSBzdGFydGVkO1xuICAgIH1cblxuICAgIC8vIE1lc3NhZ2VcbiAgICB2YXIgZm9ybWF0dGVkQWN0aW9uID0gYWN0aW9uVHJhbnNmb3JtZXIoYWN0aW9uKTtcbiAgICB2YXIgaXNDb2xsYXBzZWQgPSB0eXBlb2YgY29sbGFwc2VkID09PSAnZnVuY3Rpb24nID8gY29sbGFwc2VkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXh0U3RhdGU7XG4gICAgfSwgYWN0aW9uLCBsb2dFbnRyeSkgOiBjb2xsYXBzZWQ7XG5cbiAgICB2YXIgZm9ybWF0dGVkVGltZSA9ICgwLCBfaGVscGVycy5mb3JtYXRUaW1lKShzdGFydGVkVGltZSk7XG4gICAgdmFyIHRpdGxlQ1NTID0gY29sb3JzLnRpdGxlID8gJ2NvbG9yOiAnICsgY29sb3JzLnRpdGxlKGZvcm1hdHRlZEFjdGlvbikgKyAnOycgOiAnJztcbiAgICB2YXIgaGVhZGVyQ1NTID0gWydjb2xvcjogZ3JheTsgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7J107XG4gICAgaGVhZGVyQ1NTLnB1c2godGl0bGVDU1MpO1xuICAgIGlmIChvcHRpb25zLnRpbWVzdGFtcCkgaGVhZGVyQ1NTLnB1c2goJ2NvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjsnKTtcbiAgICBpZiAob3B0aW9ucy5kdXJhdGlvbikgaGVhZGVyQ1NTLnB1c2goJ2NvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjsnKTtcbiAgICB2YXIgdGl0bGUgPSB0aXRsZUZvcm1hdHRlcihmb3JtYXR0ZWRBY3Rpb24sIGZvcm1hdHRlZFRpbWUsIHRvb2spO1xuXG4gICAgLy8gUmVuZGVyXG4gICAgdHJ5IHtcbiAgICAgIGlmIChpc0NvbGxhcHNlZCkge1xuICAgICAgICBpZiAoY29sb3JzLnRpdGxlKSBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQuYXBwbHkobG9nZ2VyLCBbJyVjICcgKyB0aXRsZV0uY29uY2F0KGhlYWRlckNTUykpO2Vsc2UgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKHRpdGxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb2xvcnMudGl0bGUpIGxvZ2dlci5ncm91cC5hcHBseShsb2dnZXIsIFsnJWMgJyArIHRpdGxlXS5jb25jYXQoaGVhZGVyQ1NTKSk7ZWxzZSBsb2dnZXIuZ3JvdXAodGl0bGUpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5sb2codGl0bGUpO1xuICAgIH1cblxuICAgIHZhciBwcmV2U3RhdGVMZXZlbCA9IGdldExvZ0xldmVsKGxldmVsLCBmb3JtYXR0ZWRBY3Rpb24sIFtwcmV2U3RhdGVdLCAncHJldlN0YXRlJyk7XG4gICAgdmFyIGFjdGlvbkxldmVsID0gZ2V0TG9nTGV2ZWwobGV2ZWwsIGZvcm1hdHRlZEFjdGlvbiwgW2Zvcm1hdHRlZEFjdGlvbl0sICdhY3Rpb24nKTtcbiAgICB2YXIgZXJyb3JMZXZlbCA9IGdldExvZ0xldmVsKGxldmVsLCBmb3JtYXR0ZWRBY3Rpb24sIFtlcnJvciwgcHJldlN0YXRlXSwgJ2Vycm9yJyk7XG4gICAgdmFyIG5leHRTdGF0ZUxldmVsID0gZ2V0TG9nTGV2ZWwobGV2ZWwsIGZvcm1hdHRlZEFjdGlvbiwgW25leHRTdGF0ZV0sICduZXh0U3RhdGUnKTtcblxuICAgIGlmIChwcmV2U3RhdGVMZXZlbCkge1xuICAgICAgaWYgKGNvbG9ycy5wcmV2U3RhdGUpIGxvZ2dlcltwcmV2U3RhdGVMZXZlbF0oJyVjIHByZXYgc3RhdGUnLCAnY29sb3I6ICcgKyBjb2xvcnMucHJldlN0YXRlKHByZXZTdGF0ZSkgKyAnOyBmb250LXdlaWdodDogYm9sZCcsIHByZXZTdGF0ZSk7ZWxzZSBsb2dnZXJbcHJldlN0YXRlTGV2ZWxdKCdwcmV2IHN0YXRlJywgcHJldlN0YXRlKTtcbiAgICB9XG5cbiAgICBpZiAoYWN0aW9uTGV2ZWwpIHtcbiAgICAgIGlmIChjb2xvcnMuYWN0aW9uKSBsb2dnZXJbYWN0aW9uTGV2ZWxdKCclYyBhY3Rpb24gICAgJywgJ2NvbG9yOiAnICsgY29sb3JzLmFjdGlvbihmb3JtYXR0ZWRBY3Rpb24pICsgJzsgZm9udC13ZWlnaHQ6IGJvbGQnLCBmb3JtYXR0ZWRBY3Rpb24pO2Vsc2UgbG9nZ2VyW2FjdGlvbkxldmVsXSgnYWN0aW9uICAgICcsIGZvcm1hdHRlZEFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yICYmIGVycm9yTGV2ZWwpIHtcbiAgICAgIGlmIChjb2xvcnMuZXJyb3IpIGxvZ2dlcltlcnJvckxldmVsXSgnJWMgZXJyb3IgICAgICcsICdjb2xvcjogJyArIGNvbG9ycy5lcnJvcihlcnJvciwgcHJldlN0YXRlKSArICc7IGZvbnQtd2VpZ2h0OiBib2xkOycsIGVycm9yKTtlbHNlIGxvZ2dlcltlcnJvckxldmVsXSgnZXJyb3IgICAgICcsIGVycm9yKTtcbiAgICB9XG5cbiAgICBpZiAobmV4dFN0YXRlTGV2ZWwpIHtcbiAgICAgIGlmIChjb2xvcnMubmV4dFN0YXRlKSBsb2dnZXJbbmV4dFN0YXRlTGV2ZWxdKCclYyBuZXh0IHN0YXRlJywgJ2NvbG9yOiAnICsgY29sb3JzLm5leHRTdGF0ZShuZXh0U3RhdGUpICsgJzsgZm9udC13ZWlnaHQ6IGJvbGQnLCBuZXh0U3RhdGUpO2Vsc2UgbG9nZ2VyW25leHRTdGF0ZUxldmVsXSgnbmV4dCBzdGF0ZScsIG5leHRTdGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKGRpZmYpIHtcbiAgICAgICgwLCBfZGlmZjIuZGVmYXVsdCkocHJldlN0YXRlLCBuZXh0U3RhdGUsIGxvZ2dlciwgaXNDb2xsYXBzZWQpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dnZXIubG9nKCdcXHUyMDE0XFx1MjAxNCBsb2cgZW5kIFxcdTIwMTRcXHUyMDE0Jyk7XG4gICAgfVxuICB9KTtcbn0iXX0=