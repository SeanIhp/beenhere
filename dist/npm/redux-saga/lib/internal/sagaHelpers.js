"use strict";var exports=module.exports={};
var _isIterable2 = require('../../../babel-runtime/core-js/is-iterable.js');

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require('../../../babel-runtime/core-js/get-iterator.js');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

exports.takeEvery = takeEvery;
exports.takeLatest = takeLatest;
exports.throttle = throttle;

var _channel = require('./channel.js');

var _utils = require('./utils.js');

var _io = require('./io.js');

var _buffers = require('./buffers.js');

var done = { done: true, value: undefined };
var qEnd = {};

function fsmIterator(fsm, q0) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';

  var updateState = void 0,
      qNext = q0;

  function next(arg, error) {
    if (qNext === qEnd) {
      return done;
    }

    if (error) {
      qNext = qEnd;
      throw error;
    } else {
      updateState && updateState(arg);

      var _fsm$qNext = fsm[qNext](),
          _fsm$qNext2 = _slicedToArray(_fsm$qNext, 3),
          q = _fsm$qNext2[0],
          output = _fsm$qNext2[1],
          _updateState = _fsm$qNext2[2];

      qNext = q;
      updateState = _updateState;
      return qNext === qEnd ? done : output;
    }
  }

  return (0, _utils.makeIterator)(next, function (error) {
    return next(null, error);
  }, name, true);
}

function safeName(pattern) {
  if (Array.isArray(pattern)) {
    return String(pattern.map(function (entry) {
      return String(entry);
    }));
  } else {
    return String(pattern);
  }
}

function takeEvery(pattern, worker) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = { done: false, value: (0, _io.take)(pattern) };
  var yFork = function yFork(ac) {
    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
  };

  var action = void 0,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === _channel.END ? [qEnd] : ['q1', yFork(action)];
    }
  }, 'q1', 'takeEvery(' + safeName(pattern) + ', ' + worker.name + ')');
}

function takeLatest(pattern, worker) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  var yTake = { done: false, value: (0, _io.take)(pattern) };
  var yFork = function yFork(ac) {
    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
  };
  var yCancel = function yCancel(task) {
    return { done: false, value: (0, _io.cancel)(task) };
  };

  var task = void 0,
      action = void 0;
  var setTask = function setTask(t) {
    return task = t;
  };
  var setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yTake, setAction];
    },
    q2: function q2() {
      return action === _channel.END ? [qEnd] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
    },
    q3: function q3() {
      return ['q1', yFork(action), setTask];
    }
  }, 'q1', 'takeLatest(' + safeName(pattern) + ', ' + worker.name + ')');
}

function throttle(delayLength, pattern, worker) {
  for (var _len3 = arguments.length, args = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    args[_key3 - 3] = arguments[_key3];
  }

  var action = void 0,
      channel = void 0;

  var yActionChannel = { done: false, value: (0, _io.actionChannel)(pattern, _buffers.buffers.sliding(1)) };
  var yTake = function yTake() {
    return { done: false, value: (0, _io.take)(channel, pattern) };
  };
  var yFork = function yFork(ac) {
    return { done: false, value: _io.fork.apply(undefined, [worker].concat(args, [ac])) };
  };
  var yDelay = { done: false, value: (0, _io.call)(_utils.delay, delayLength) };

  var setAction = function setAction(ac) {
    return action = ac;
  };
  var setChannel = function setChannel(ch) {
    return channel = ch;
  };

  return fsmIterator({
    q1: function q1() {
      return ['q2', yActionChannel, setChannel];
    },
    q2: function q2() {
      return ['q3', yTake(), setAction];
    },
    q3: function q3() {
      return action === _channel.END ? [qEnd] : ['q4', yFork(action)];
    },
    q4: function q4() {
      return ['q2', yDelay];
    }
  }, 'q1', 'throttle(' + safeName(pattern) + ', ' + worker.name + ')');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhZ2FIZWxwZXJzLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiYXJyIiwiaSIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJ1bmRlZmluZWQiLCJfaSIsIl9zIiwibmV4dCIsImRvbmUiLCJwdXNoIiwibGVuZ3RoIiwiZXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwidGFrZUV2ZXJ5IiwidGFrZUxhdGVzdCIsInRocm90dGxlIiwiX2NoYW5uZWwiLCJyZXF1aXJlIiwiX3V0aWxzIiwiX2lvIiwiX2J1ZmZlcnMiLCJxRW5kIiwiZnNtSXRlcmF0b3IiLCJmc20iLCJxMCIsIm5hbWUiLCJhcmd1bWVudHMiLCJ1cGRhdGVTdGF0ZSIsInFOZXh0IiwiYXJnIiwiZXJyb3IiLCJfZnNtJHFOZXh0IiwiX2ZzbSRxTmV4dDIiLCJxIiwib3V0cHV0IiwiX3VwZGF0ZVN0YXRlIiwibWFrZUl0ZXJhdG9yIiwic2FmZU5hbWUiLCJwYXR0ZXJuIiwiU3RyaW5nIiwibWFwIiwiZW50cnkiLCJ3b3JrZXIiLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJ5VGFrZSIsInRha2UiLCJ5Rm9yayIsImFjIiwiZm9yayIsImFwcGx5IiwiY29uY2F0IiwiYWN0aW9uIiwic2V0QWN0aW9uIiwicTEiLCJxMiIsIkVORCIsIl9sZW4yIiwiX2tleTIiLCJ5Q2FuY2VsIiwidGFzayIsImNhbmNlbCIsInNldFRhc2siLCJ0IiwicTMiLCJkZWxheUxlbmd0aCIsIl9sZW4zIiwiX2tleTMiLCJjaGFubmVsIiwieUFjdGlvbkNoYW5uZWwiLCJhY3Rpb25DaGFubmVsIiwiYnVmZmVycyIsInNsaWRpbmciLCJ5RGVsYXkiLCJjYWxsIiwiZGVsYXkiLCJzZXRDaGFubmVsIiwiY2giLCJxNCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztBQUVBQSxPQUFPQyxjQUFQLENB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Q0FBUDtBQUNEO0FBWmdCLEdBQVosRUFhSixJQWJJLEVBYUUsY0FBY3JDLFNBQVNDLE9BQVQsQ0FBZCxHQUFrQyxJQUFsQyxHQUF5Q0ksT0FBT2pCLElBQWhELEdBQXVELEdBYnpELENBQVA7QUFjRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbmV4cG9ydHMudGFrZUV2ZXJ5ID0gdGFrZUV2ZXJ5O1xuZXhwb3J0cy50YWtlTGF0ZXN0ID0gdGFrZUxhdGVzdDtcbmV4cG9ydHMudGhyb3R0bGUgPSB0aHJvdHRsZTtcblxudmFyIF9jaGFubmVsID0gcmVxdWlyZSgnLi9jaGFubmVsJyk7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBfaW8gPSByZXF1aXJlKCcuL2lvJyk7XG5cbnZhciBfYnVmZmVycyA9IHJlcXVpcmUoJy4vYnVmZmVycycpO1xuXG52YXIgZG9uZSA9IHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xudmFyIHFFbmQgPSB7fTtcblxuZnVuY3Rpb24gZnNtSXRlcmF0b3IoZnNtLCBxMCkge1xuICB2YXIgbmFtZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogJ2l0ZXJhdG9yJztcblxuICB2YXIgdXBkYXRlU3RhdGUgPSB2b2lkIDAsXG4gICAgICBxTmV4dCA9IHEwO1xuXG4gIGZ1bmN0aW9uIG5leHQoYXJnLCBlcnJvcikge1xuICAgIGlmIChxTmV4dCA9PT0gcUVuZCkge1xuICAgICAgcmV0dXJuIGRvbmU7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBxTmV4dCA9IHFFbmQ7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlU3RhdGUgJiYgdXBkYXRlU3RhdGUoYXJnKTtcblxuICAgICAgdmFyIF9mc20kcU5leHQgPSBmc21bcU5leHRdKCksXG4gICAgICAgICAgX2ZzbSRxTmV4dDIgPSBfc2xpY2VkVG9BcnJheShfZnNtJHFOZXh0LCAzKSxcbiAgICAgICAgICBxID0gX2ZzbSRxTmV4dDJbMF0sXG4gICAgICAgICAgb3V0cHV0ID0gX2ZzbSRxTmV4dDJbMV0sXG4gICAgICAgICAgX3VwZGF0ZVN0YXRlID0gX2ZzbSRxTmV4dDJbMl07XG5cbiAgICAgIHFOZXh0ID0gcTtcbiAgICAgIHVwZGF0ZVN0YXRlID0gX3VwZGF0ZVN0YXRlO1xuICAgICAgcmV0dXJuIHFOZXh0ID09PSBxRW5kID8gZG9uZSA6IG91dHB1dDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKDAsIF91dGlscy5tYWtlSXRlcmF0b3IpKG5leHQsIGZ1bmN0aW9uIChlcnJvcikge1xuICAgIHJldHVybiBuZXh0KG51bGwsIGVycm9yKTtcbiAgfSwgbmFtZSwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIHNhZmVOYW1lKHBhdHRlcm4pIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocGF0dGVybikpIHtcbiAgICByZXR1cm4gU3RyaW5nKHBhdHRlcm4ubWFwKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgcmV0dXJuIFN0cmluZyhlbnRyeSk7XG4gICAgfSkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBTdHJpbmcocGF0dGVybik7XG4gIH1cbn1cblxuZnVuY3Rpb24gdGFrZUV2ZXJ5KHBhdHRlcm4sIHdvcmtlcikge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHZhciB5VGFrZSA9IHsgZG9uZTogZmFsc2UsIHZhbHVlOiAoMCwgX2lvLnRha2UpKHBhdHRlcm4pIH07XG4gIHZhciB5Rm9yayA9IGZ1bmN0aW9uIHlGb3JrKGFjKSB7XG4gICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBfaW8uZm9yay5hcHBseSh1bmRlZmluZWQsIFt3b3JrZXJdLmNvbmNhdChhcmdzLCBbYWNdKSkgfTtcbiAgfTtcblxuICB2YXIgYWN0aW9uID0gdm9pZCAwLFxuICAgICAgc2V0QWN0aW9uID0gZnVuY3Rpb24gc2V0QWN0aW9uKGFjKSB7XG4gICAgcmV0dXJuIGFjdGlvbiA9IGFjO1xuICB9O1xuXG4gIHJldHVybiBmc21JdGVyYXRvcih7XG4gICAgcTE6IGZ1bmN0aW9uIHExKCkge1xuICAgICAgcmV0dXJuIFsncTInLCB5VGFrZSwgc2V0QWN0aW9uXTtcbiAgICB9LFxuICAgIHEyOiBmdW5jdGlvbiBxMigpIHtcbiAgICAgIHJldHVybiBhY3Rpb24gPT09IF9jaGFubmVsLkVORCA/IFtxRW5kXSA6IFsncTEnLCB5Rm9yayhhY3Rpb24pXTtcbiAgICB9XG4gIH0sICdxMScsICd0YWtlRXZlcnkoJyArIHNhZmVOYW1lKHBhdHRlcm4pICsgJywgJyArIHdvcmtlci5uYW1lICsgJyknKTtcbn1cblxuZnVuY3Rpb24gdGFrZUxhdGVzdChwYXR0ZXJuLCB3b3JrZXIpIHtcbiAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gIH1cblxuICB2YXIgeVRha2UgPSB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogKDAsIF9pby50YWtlKShwYXR0ZXJuKSB9O1xuICB2YXIgeUZvcmsgPSBmdW5jdGlvbiB5Rm9yayhhYykge1xuICAgIHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogX2lvLmZvcmsuYXBwbHkodW5kZWZpbmVkLCBbd29ya2VyXS5jb25jYXQoYXJncywgW2FjXSkpIH07XG4gIH07XG4gIHZhciB5Q2FuY2VsID0gZnVuY3Rpb24geUNhbmNlbCh0YXNrKSB7XG4gICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiAoMCwgX2lvLmNhbmNlbCkodGFzaykgfTtcbiAgfTtcblxuICB2YXIgdGFzayA9IHZvaWQgMCxcbiAgICAgIGFjdGlvbiA9IHZvaWQgMDtcbiAgdmFyIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRUYXNrKHQpIHtcbiAgICByZXR1cm4gdGFzayA9IHQ7XG4gIH07XG4gIHZhciBzZXRBY3Rpb24gPSBmdW5jdGlvbiBzZXRBY3Rpb24oYWMpIHtcbiAgICByZXR1cm4gYWN0aW9uID0gYWM7XG4gIH07XG5cbiAgcmV0dXJuIGZzbUl0ZXJhdG9yKHtcbiAgICBxMTogZnVuY3Rpb24gcTEoKSB7XG4gICAgICByZXR1cm4gWydxMicsIHlUYWtlLCBzZXRBY3Rpb25dO1xuICAgIH0sXG4gICAgcTI6IGZ1bmN0aW9uIHEyKCkge1xuICAgICAgcmV0dXJuIGFjdGlvbiA9PT0gX2NoYW5uZWwuRU5EID8gW3FFbmRdIDogdGFzayA/IFsncTMnLCB5Q2FuY2VsKHRhc2spXSA6IFsncTEnLCB5Rm9yayhhY3Rpb24pLCBzZXRUYXNrXTtcbiAgICB9LFxuICAgIHEzOiBmdW5jdGlvbiBxMygpIHtcbiAgICAgIHJldHVybiBbJ3ExJywgeUZvcmsoYWN0aW9uKSwgc2V0VGFza107XG4gICAgfVxuICB9LCAncTEnLCAndGFrZUxhdGVzdCgnICsgc2FmZU5hbWUocGF0dGVybikgKyAnLCAnICsgd29ya2VyLm5hbWUgKyAnKScpO1xufVxuXG5mdW5jdGlvbiB0aHJvdHRsZShkZWxheUxlbmd0aCwgcGF0dGVybiwgd29ya2VyKSB7XG4gIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4zID4gMyA/IF9sZW4zIC0gMyA6IDApLCBfa2V5MyA9IDM7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICBhcmdzW19rZXkzIC0gM10gPSBhcmd1bWVudHNbX2tleTNdO1xuICB9XG5cbiAgdmFyIGFjdGlvbiA9IHZvaWQgMCxcbiAgICAgIGNoYW5uZWwgPSB2b2lkIDA7XG5cbiAgdmFyIHlBY3Rpb25DaGFubmVsID0geyBkb25lOiBmYWxzZSwgdmFsdWU6ICgwLCBfaW8uYWN0aW9uQ2hhbm5lbCkocGF0dGVybiwgX2J1ZmZlcnMuYnVmZmVycy5zbGlkaW5nKDEpKSB9O1xuICB2YXIgeVRha2UgPSBmdW5jdGlvbiB5VGFrZSgpIHtcbiAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6ICgwLCBfaW8udGFrZSkoY2hhbm5lbCwgcGF0dGVybikgfTtcbiAgfTtcbiAgdmFyIHlGb3JrID0gZnVuY3Rpb24geUZvcmsoYWMpIHtcbiAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IF9pby5mb3JrLmFwcGx5KHVuZGVmaW5lZCwgW3dvcmtlcl0uY29uY2F0KGFyZ3MsIFthY10pKSB9O1xuICB9O1xuICB2YXIgeURlbGF5ID0geyBkb25lOiBmYWxzZSwgdmFsdWU6ICgwLCBfaW8uY2FsbCkoX3V0aWxzLmRlbGF5LCBkZWxheUxlbmd0aCkgfTtcblxuICB2YXIgc2V0QWN0aW9uID0gZnVuY3Rpb24gc2V0QWN0aW9uKGFjKSB7XG4gICAgcmV0dXJuIGFjdGlvbiA9IGFjO1xuICB9O1xuICB2YXIgc2V0Q2hhbm5lbCA9IGZ1bmN0aW9uIHNldENoYW5uZWwoY2gpIHtcbiAgICByZXR1cm4gY2hhbm5lbCA9IGNoO1xuICB9O1xuXG4gIHJldHVybiBmc21JdGVyYXRvcih7XG4gICAgcTE6IGZ1bmN0aW9uIHExKCkge1xuICAgICAgcmV0dXJuIFsncTInLCB5QWN0aW9uQ2hhbm5lbCwgc2V0Q2hhbm5lbF07XG4gICAgfSxcbiAgICBxMjogZnVuY3Rpb24gcTIoKSB7XG4gICAgICByZXR1cm4gWydxMycsIHlUYWtlKCksIHNldEFjdGlvbl07XG4gICAgfSxcbiAgICBxMzogZnVuY3Rpb24gcTMoKSB7XG4gICAgICByZXR1cm4gYWN0aW9uID09PSBfY2hhbm5lbC5FTkQgPyBbcUVuZF0gOiBbJ3E0JywgeUZvcmsoYWN0aW9uKV07XG4gICAgfSxcbiAgICBxNDogZnVuY3Rpb24gcTQoKSB7XG4gICAgICByZXR1cm4gWydxMicsIHlEZWxheV07XG4gICAgfVxuICB9LCAncTEnLCAndGhyb3R0bGUoJyArIHNhZmVOYW1lKHBhdHRlcm4pICsgJywgJyArIHdvcmtlci5uYW1lICsgJyknKTtcbn0iXX0=