"use strict";var exports=module.exports={};
var _defineProperty2 = require('../../../babel-runtime/core-js/object/define-property.js');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _isIterable2 = require('../../../babel-runtime/core-js/is-iterable.js');

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require('../../../babel-runtime/core-js/get-iterator.js');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asEffect = undefined;

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

exports.take = take;
exports.takem = takem;
exports.put = put;
exports.race = race;
exports.call = call;
exports.apply = apply;
exports.cps = cps;
exports.fork = fork;
exports.spawn = spawn;
exports.join = join;
exports.cancel = cancel;
exports.select = select;
exports.actionChannel = actionChannel;
exports.cancelled = cancelled;
exports.flush = flush;

var _utils = require('./utils.js');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty3.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var IO = (0, _utils.sym)('IO');
var TAKE = 'TAKE';
var PUT = 'PUT';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';

var effect = function effect(type, payload) {
  var _ref;

  return _ref = {}, _defineProperty(_ref, IO, true), _defineProperty(_ref, type, payload), _ref;
};

function take() {
  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  if (arguments.length) {
    (0, _utils.check)(arguments[0], _utils.is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }
  if (_utils.is.pattern(patternOrChannel)) {
    return effect(TAKE, { pattern: patternOrChannel });
  }
  if (_utils.is.channel(patternOrChannel)) {
    return effect(TAKE, { channel: patternOrChannel });
  }
  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
}

function takem() {
  var eff = take.apply(undefined, arguments);
  eff[TAKE].maybe = true;
  return eff;
}

function put(channel, action) {
  if (arguments.length > 1) {
    (0, _utils.check)(channel, _utils.is.notUndef, 'put(channel, action): argument channel is undefined');
    (0, _utils.check)(channel, _utils.is.channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
    (0, _utils.check)(action, _utils.is.notUndef, 'put(channel, action): argument action is undefined');
  } else {
    (0, _utils.check)(channel, _utils.is.notUndef, 'put(action): argument action is undefined');
    action = channel;
    channel = null;
  }
  return effect(PUT, { channel: channel, action: action });
}

put.sync = function () {
  var eff = put.apply(undefined, arguments);
  eff[PUT].sync = true;
  return eff;
};

function race(effects) {
  return effect(RACE, effects);
}

function getFnCallDesc(meth, fn, args) {
  (0, _utils.check)(fn, _utils.is.notUndef, meth + ': argument fn is undefined');

  var context = null;
  if (_utils.is.array(fn)) {
    var _fn = fn;

    var _fn2 = _slicedToArray(_fn, 2);

    context = _fn2[0];
    fn = _fn2[1];
  } else if (fn.fn) {
    var _fn3 = fn;
    context = _fn3.context;
    fn = _fn3.fn;
  }
  (0, _utils.check)(fn, _utils.is.func, meth + ': argument ' + fn + ' is not a function');

  return { context: context, fn: fn, args: args };
}

function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return effect(CALL, getFnCallDesc('call', fn, args));
}

function apply(context, fn) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return effect(CALL, getFnCallDesc('apply', { context: context, fn: fn }, args));
}

function cps(fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return effect(CPS, getFnCallDesc('cps', fn, args));
}

function fork(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return effect(FORK, getFnCallDesc('fork', fn, args));
}

function spawn(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  var eff = fork.apply(undefined, [fn].concat(args));
  eff[FORK].detached = true;
  return eff;
}

var isForkedTask = function isForkedTask(task) {
  return task[_utils.TASK];
};

function join(task) {
  (0, _utils.check)(task, _utils.is.notUndef, 'join(task): argument task is undefined');
  if (!isForkedTask(task)) {
    throw new Error('join(task): argument ' + task + ' is not a valid Task object \n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)');
  }

  return effect(JOIN, task);
}

function cancel(task) {
  (0, _utils.check)(task, _utils.is.notUndef, 'cancel(task): argument task is undefined');
  if (!isForkedTask(task)) {
    throw new Error('cancel(task): argument ' + task + ' is not a valid Task object \n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)');
  }

  return effect(CANCEL, task);
}

function select(selector) {
  for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (arguments.length === 0) {
    selector = _utils.ident;
  } else {
    (0, _utils.check)(selector, _utils.is.notUndef, 'select(selector,[...]): argument selector is undefined');
    (0, _utils.check)(selector, _utils.is.func, 'select(selector,[...]): argument ' + selector + ' is not a function');
  }
  return effect(SELECT, { selector: selector, args: args });
}

/**
  channel(pattern, [buffer])    => creates an event channel for store actions
**/
function actionChannel(pattern, buffer) {
  (0, _utils.check)(pattern, _utils.is.notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
  if (arguments.length > 1) {
    (0, _utils.check)(buffer, _utils.is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
    (0, _utils.check)(buffer, _utils.is.notUndef, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
  }
  return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
}

function cancelled() {
  return effect(CANCELLED, {});
}

function flush(channel) {
  (0, _utils.check)(channel, _utils.is.channel, 'flush(channel): argument ' + channel + ' is not valid channel');
  return effect(FLUSH, channel);
}

var asEffect = exports.asEffect = {
  take: function take(effect) {
    return effect && effect[IO] && effect[TAKE];
  },
  put: function put(effect) {
    return effect && effect[IO] && effect[PUT];
  },
  race: function race(effect) {
    return effect && effect[IO] && effect[RACE];
  },
  call: function call(effect) {
    return effect && effect[IO] && effect[CALL];
  },
  cps: function cps(effect) {
    return effect && effect[IO] && effect[CPS];
  },
  fork: function fork(effect) {
    return effect && effect[IO] && effect[FORK];
  },
  join: function join(effect) {
    return effect && effect[IO] && effect[JOIN];
  },
  cancel: function cancel(effect) {
    return effect && effect[IO] && effect[CANCEL];
  },
  select: function select(effect) {
    return effect && effect[IO] && effect[SELECT];
  },
  actionChannel: function actionChannel(effect) {
    return effect && effect[IO] && effect[ACTION_CHANNEL];
  },
  cancelled: function cancelled(effect) {
    return effect && effect[IO] && effect[CANCELLED];
  },
  flush: function flush(effect) {
    return effect && effect[IO] && effect[FLUSH];
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiYXNFZmZlY3QiLCJ1bmRlZmluZWQiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJhcnIiLCJpIiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsIl9pIiwiX3MiLCJuZXh0IiwiZG9uZSIsInB1c2giLCJsZW5ndGgiLCJlcnIiLCJBcnJheSIsImlzQXJyYXkiLCJUeXBlRXJyb3IiLCJ0YWtlIiwidGFrZW0iLCJwdXQiLCJyYWNlIiwiY2FsbCIsImFwcGx5IiwiY3BzIiwiZm9yayIsInNwYXduIiwiam9pbiIsImNhbmNlbCIsInNlbGVjdCIsImFjdGlvbkNoYW5uZWwiLCJjYW5jZWxsZWQiLCJmbHVzaCIsIl91dGlscyIsInJlcXVpcmUiLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJrZXkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJJTyIsInN5bSIsIlRBS0UiLCJQVVQiLCJSQUNFIiwiQ0FMTCIsIkNQUyIsIkZPUksiLCJKT0lOIiwiQ0FOQ0VMIiwiU0VMRUNUIiwiQUNUSU9OX0NIQU5ORUwiLCJDQU5DRUxMRUQiLCJGTFVTSCIsImVmZmVjdCIsInR5cGUiLCJwYXlsb2FkIiwiX3JlZiIsInBhdHRlcm5PckNoYW5uZWwiLCJhcmd1bWVudHMiLCJjaGVjayIsImlzIiwibm90VW5kZWYiLCJwYXR0ZXJuIiwiY2hhbm5lbCIsIkVycm9yIiwiU3RyaW5nIiwiZWZmIiwibWF5YmUiLCJhY3Rpb24iLCJzeW5jIiwiZWZmZWN0cyIsImdldEZuQ2FsbERlc2MiLCJtZXRoIiwiZm4iLCJhcmdzIiwiY29udGV4dCIsImFycmF5IiwiX2ZuIiwiX2ZuMiIsIl9mbjMiLCJmdW5jIiwiX2xlbiIsIl9rZXkiLCJfbGVuMiIsIl9rZXkyIiwiX2xlbjMiLCJfa2V5MyIsIl9sZW40IiwiX2tleTQiLCJjb25jYXQiLCJkZXRhY2hlZCIsImlzRm9ya2VkVGFzayIsInRhc2siLCJUQVNLIiwic2VsZWN0b3IiLCJfbGVuNSIsIl9rZXk1IiwiaWRlbnQiLCJidWZmZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDO0FBR0FELFFBQVFFLFFBQVIsR0FBbUJDLFNBQW5COztBQUVBLElBQUlDLGlCQUFpQixZQUFZO0FBQUUsV0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLENBQTVCLEVBQStCO0FBQUUsUUFBSUMsT0FBTyxFQUFYLENBQWUsSUFBSUMsS0FBSyxJQUFULENBQWUsSUFBSUMsS0FBSyxLQUFULENBQWdCLElBQUlDLEtBQUtSLFNBQVQsQ0FBb0IsSUFBSTtBQUFFLFdBQUssSUFBSVMsZ0NBQUtOLEdBQUwsQ0FBSixFQUFpQ08sRUFBdEMsRUFBMEMsRUFBRUosS0FBSyxDQUFDSSxLQUFLRCxHQUFHRSxJQUFILEVBQU4sRUFBaUJDLElBQXhCLENBQTFDLEVBQXlFTixLQUFLLElBQTlFLEVBQW9GO0FBQUVELGFBQUtRLElBQUwsQ0FBVUgsR0FBR1osS0FBYixFQUFxQixJQUFJTSxLQUFLQyxLQUFLUyxNQUFMLEtBQWdCVixDQUF6QixFQUE0QjtBQUFRO0FBQUUsS0FBdkosQ0FBd0osT0FBT1csR0FBUCxFQUFZO0FBQUVSLFdBQUssSUFBTCxDQUFXQyxLQUFLTyxHQUFMO0FBQVcsS0FBNUwsU0FBcU07QUFBRSxVQUFJO0FBQUUsWUFBSSxDQUFDVCxFQUFELElBQU9HLEdBQUcsUUFBSCxDQUFYLEVBQXlCQSxHQUFHLFFBQUg7QUFBaUIsT0FBaEQsU0FBeUQ7QUFBRSxZQUFJRixFQUFKLEVBQVEsTUFBTUMsRUFBTjtBQUFXO0FBQUUsS0FBQyxPQUFPSCxJQUFQO0FBQWMsR0FBQyxPQUFPLFVBQVVGLEdBQVYsRUFBZUMsQ0FBZixFQUFrQjtBQUFFLFFBQUlZLE1BQU1DLE9BQU4sQ0FBY2Qs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T0EsVUFBVUEsT0FBT2QsRUFBUCxDQUFWLElBQXdCYyxPQUFPUCxJQUFQLENBQS9CO0FBQ0QsR0FsQitCO0FBbUJoQ3JCLFFBQU0sU0FBU0EsSUFBVCxDQUFjNEIsTUFBZCxFQUFzQjtBQUMxQixXQUFPQSxVQUFVQSxPQUFPZCxFQUFQLENBQVYsSUFBd0JjLE9BQU9OLElBQVAsQ0FBL0I7QUFDRCxHQXJCK0I7QUFzQmhDckIsVUFBUSxTQUFTQSxNQUFULENBQWdCMkIsTUFBaEIsRUFBd0I7QUFDOUIsV0FBT0EsVUFBVUEsT0FBT2QsRUFBUCxDQUFWLElBQXdCYyxPQUFPTCxNQUFQLENBQS9CO0FBQ0QsR0F4QitCO0FBeUJoQ3JCLFVBQVEsU0FBU0EsTUFBVCxDQUFnQjBCLE1BQWhCLEVBQXdCO0FBQzlCLFdBQU9BLFVBQVVBLE9BQU9kLEVBQVAsQ0FBVixJQUF3QmMsT0FBT0osTUFBUCxDQUEvQjtBQUNELEdBM0IrQjtBQTRCaENyQixpQkFBZSxTQUFTQSxhQUFULENBQXVCeUIsTUFBdkIsRUFBK0I7QUFDNUMsV0FBT0EsVUFBVUEsT0FBT2QsRUFBUCxDQUFWLElBQXdCYyxPQUFPSCxjQUFQLENBQS9CO0FBQ0QsR0E5QitCO0FBK0JoQ3JCLGFBQVcsU0FBU0EsU0FBVCxDQUFtQndCLE1BQW5CLEVBQTJCO0FBQ3BDLFdBQU9BLFVBQVVBLE9BQU9kLEVBQVAsQ0FBVixJQUF3QmMsT0FBT0YsU0FBUCxDQUEvQjtBQUNELEdBakMrQjtBQWtDaENyQixTQUFPLFNBQVNBLEtBQVQsQ0FBZXVCLE1BQWYsRUFBdUI7QUFDNUIsV0FBT0EsVUFBVUEsT0FBT2QsRUFBUCxDQUFWLElBQXdCYyxPQUFPRCxLQUFQLENBQS9CO0FBQ0Q7QUFwQytCLENBQWxDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFzRWZmZWN0ID0gdW5kZWZpbmVkO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbmV4cG9ydHMudGFrZSA9IHRha2U7XG5leHBvcnRzLnRha2VtID0gdGFrZW07XG5leHBvcnRzLnB1dCA9IHB1dDtcbmV4cG9ydHMucmFjZSA9IHJhY2U7XG5leHBvcnRzLmNhbGwgPSBjYWxsO1xuZXhwb3J0cy5hcHBseSA9IGFwcGx5O1xuZXhwb3J0cy5jcHMgPSBjcHM7XG5leHBvcnRzLmZvcmsgPSBmb3JrO1xuZXhwb3J0cy5zcGF3biA9IHNwYXduO1xuZXhwb3J0cy5qb2luID0gam9pbjtcbmV4cG9ydHMuY2FuY2VsID0gY2FuY2VsO1xuZXhwb3J0cy5zZWxlY3QgPSBzZWxlY3Q7XG5leHBvcnRzLmFjdGlvbkNoYW5uZWwgPSBhY3Rpb25DaGFubmVsO1xuZXhwb3J0cy5jYW5jZWxsZWQgPSBjYW5jZWxsZWQ7XG5leHBvcnRzLmZsdXNoID0gZmx1c2g7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBJTyA9ICgwLCBfdXRpbHMuc3ltKSgnSU8nKTtcbnZhciBUQUtFID0gJ1RBS0UnO1xudmFyIFBVVCA9ICdQVVQnO1xudmFyIFJBQ0UgPSAnUkFDRSc7XG52YXIgQ0FMTCA9ICdDQUxMJztcbnZhciBDUFMgPSAnQ1BTJztcbnZhciBGT1JLID0gJ0ZPUksnO1xudmFyIEpPSU4gPSAnSk9JTic7XG52YXIgQ0FOQ0VMID0gJ0NBTkNFTCc7XG52YXIgU0VMRUNUID0gJ1NFTEVDVCc7XG52YXIgQUNUSU9OX0NIQU5ORUwgPSAnQUNUSU9OX0NIQU5ORUwnO1xudmFyIENBTkNFTExFRCA9ICdDQU5DRUxMRUQnO1xudmFyIEZMVVNIID0gJ0ZMVVNIJztcblxudmFyIGVmZmVjdCA9IGZ1bmN0aW9uIGVmZmVjdCh0eXBlLCBwYXlsb2FkKSB7XG4gIHZhciBfcmVmO1xuXG4gIHJldHVybiBfcmVmID0ge30sIF9kZWZpbmVQcm9wZXJ0eShfcmVmLCBJTywgdHJ1ZSksIF9kZWZpbmVQcm9wZXJ0eShfcmVmLCB0eXBlLCBwYXlsb2FkKSwgX3JlZjtcbn07XG5cbmZ1bmN0aW9uIHRha2UoKSB7XG4gIHZhciBwYXR0ZXJuT3JDaGFubmVsID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnKic7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAoMCwgX3V0aWxzLmNoZWNrKShhcmd1bWVudHNbMF0sIF91dGlscy5pcy5ub3RVbmRlZiwgJ3Rha2UocGF0dGVybk9yQ2hhbm5lbCk6IHBhdHRlcm5PckNoYW5uZWwgaXMgdW5kZWZpbmVkJyk7XG4gIH1cbiAgaWYgKF91dGlscy5pcy5wYXR0ZXJuKHBhdHRlcm5PckNoYW5uZWwpKSB7XG4gICAgcmV0dXJuIGVmZmVjdChUQUtFLCB7IHBhdHRlcm46IHBhdHRlcm5PckNoYW5uZWwgfSk7XG4gIH1cbiAgaWYgKF91dGlscy5pcy5jaGFubmVsKHBhdHRlcm5PckNoYW5uZWwpKSB7XG4gICAgcmV0dXJuIGVmZmVjdChUQUtFLCB7IGNoYW5uZWw6IHBhdHRlcm5PckNoYW5uZWwgfSk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd0YWtlKHBhdHRlcm5PckNoYW5uZWwpOiBhcmd1bWVudCAnICsgU3RyaW5nKHBhdHRlcm5PckNoYW5uZWwpICsgJyBpcyBub3QgdmFsaWQgY2hhbm5lbCBvciBhIHZhbGlkIHBhdHRlcm4nKTtcbn1cblxuZnVuY3Rpb24gdGFrZW0oKSB7XG4gIHZhciBlZmYgPSB0YWtlLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgZWZmW1RBS0VdLm1heWJlID0gdHJ1ZTtcbiAgcmV0dXJuIGVmZjtcbn1cblxuZnVuY3Rpb24gcHV0KGNoYW5uZWwsIGFjdGlvbikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAoMCwgX3V0aWxzLmNoZWNrKShjaGFubmVsLCBfdXRpbHMuaXMubm90VW5kZWYsICdwdXQoY2hhbm5lbCwgYWN0aW9uKTogYXJndW1lbnQgY2hhbm5lbCBpcyB1bmRlZmluZWQnKTtcbiAgICAoMCwgX3V0aWxzLmNoZWNrKShjaGFubmVsLCBfdXRpbHMuaXMuY2hhbm5lbCwgJ3B1dChjaGFubmVsLCBhY3Rpb24pOiBhcmd1bWVudCAnICsgY2hhbm5lbCArICcgaXMgbm90IGEgdmFsaWQgY2hhbm5lbCcpO1xuICAgICgwLCBfdXRpbHMuY2hlY2spKGFjdGlvbiwgX3V0aWxzLmlzLm5vdFVuZGVmLCAncHV0KGNoYW5uZWwsIGFjdGlvbik6IGFyZ3VtZW50IGFjdGlvbiBpcyB1bmRlZmluZWQnKTtcbiAgfSBlbHNlIHtcbiAgICAoMCwgX3V0aWxzLmNoZWNrKShjaGFubmVsLCBfdXRpbHMuaXMubm90VW5kZWYsICdwdXQoYWN0aW9uKTogYXJndW1lbnQgYWN0aW9uIGlzIHVuZGVmaW5lZCcpO1xuICAgIGFjdGlvbiA9IGNoYW5uZWw7XG4gICAgY2hhbm5lbCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIGVmZmVjdChQVVQsIHsgY2hhbm5lbDogY2hhbm5lbCwgYWN0aW9uOiBhY3Rpb24gfSk7XG59XG5cbnB1dC5zeW5jID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZWZmID0gcHV0LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgZWZmW1BVVF0uc3luYyA9IHRydWU7XG4gIHJldHVybiBlZmY7XG59O1xuXG5mdW5jdGlvbiByYWNlKGVmZmVjdHMpIHtcbiAgcmV0dXJuIGVmZmVjdChSQUNFLCBlZmZlY3RzKTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm5DYWxsRGVzYyhtZXRoLCBmbiwgYXJncykge1xuICAoMCwgX3V0aWxzLmNoZWNrKShmbiwgX3V0aWxzLmlzLm5vdFVuZGVmLCBtZXRoICsgJzogYXJndW1lbnQgZm4gaXMgdW5kZWZpbmVkJyk7XG5cbiAgdmFyIGNvbnRleHQgPSBudWxsO1xuICBpZiAoX3V0aWxzLmlzLmFycmF5KGZuKSkge1xuICAgIHZhciBfZm4gPSBmbjtcblxuICAgIHZhciBfZm4yID0gX3NsaWNlZFRvQXJyYXkoX2ZuLCAyKTtcblxuICAgIGNvbnRleHQgPSBfZm4yWzBdO1xuICAgIGZuID0gX2ZuMlsxXTtcbiAgfSBlbHNlIGlmIChmbi5mbikge1xuICAgIHZhciBfZm4zID0gZm47XG4gICAgY29udGV4dCA9IF9mbjMuY29udGV4dDtcbiAgICBmbiA9IF9mbjMuZm47XG4gIH1cbiAgKDAsIF91dGlscy5jaGVjaykoZm4sIF91dGlscy5pcy5mdW5jLCBtZXRoICsgJzogYXJndW1lbnQgJyArIGZuICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuXG4gIHJldHVybiB7IGNvbnRleHQ6IGNvbnRleHQsIGZuOiBmbiwgYXJnczogYXJncyB9O1xufVxuXG5mdW5jdGlvbiBjYWxsKGZuKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGVmZmVjdChDQUxMLCBnZXRGbkNhbGxEZXNjKCdjYWxsJywgZm4sIGFyZ3MpKTtcbn1cblxuZnVuY3Rpb24gYXBwbHkoY29udGV4dCwgZm4pIHtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IFtdO1xuXG4gIHJldHVybiBlZmZlY3QoQ0FMTCwgZ2V0Rm5DYWxsRGVzYygnYXBwbHknLCB7IGNvbnRleHQ6IGNvbnRleHQsIGZuOiBmbiB9LCBhcmdzKSk7XG59XG5cbmZ1bmN0aW9uIGNwcyhmbikge1xuICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgYXJnc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgfVxuXG4gIHJldHVybiBlZmZlY3QoQ1BTLCBnZXRGbkNhbGxEZXNjKCdjcHMnLCBmbiwgYXJncykpO1xufVxuXG5mdW5jdGlvbiBmb3JrKGZuKSB7XG4gIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICBhcmdzW19rZXkzIC0gMV0gPSBhcmd1bWVudHNbX2tleTNdO1xuICB9XG5cbiAgcmV0dXJuIGVmZmVjdChGT1JLLCBnZXRGbkNhbGxEZXNjKCdmb3JrJywgZm4sIGFyZ3MpKTtcbn1cblxuZnVuY3Rpb24gc3Bhd24oZm4pIHtcbiAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjQgPiAxID8gX2xlbjQgLSAxIDogMCksIF9rZXk0ID0gMTsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgIGFyZ3NbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gIH1cblxuICB2YXIgZWZmID0gZm9yay5hcHBseSh1bmRlZmluZWQsIFtmbl0uY29uY2F0KGFyZ3MpKTtcbiAgZWZmW0ZPUktdLmRldGFjaGVkID0gdHJ1ZTtcbiAgcmV0dXJuIGVmZjtcbn1cblxudmFyIGlzRm9ya2VkVGFzayA9IGZ1bmN0aW9uIGlzRm9ya2VkVGFzayh0YXNrKSB7XG4gIHJldHVybiB0YXNrW191dGlscy5UQVNLXTtcbn07XG5cbmZ1bmN0aW9uIGpvaW4odGFzaykge1xuICAoMCwgX3V0aWxzLmNoZWNrKSh0YXNrLCBfdXRpbHMuaXMubm90VW5kZWYsICdqb2luKHRhc2spOiBhcmd1bWVudCB0YXNrIGlzIHVuZGVmaW5lZCcpO1xuICBpZiAoIWlzRm9ya2VkVGFzayh0YXNrKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignam9pbih0YXNrKTogYXJndW1lbnQgJyArIHRhc2sgKyAnIGlzIG5vdCBhIHZhbGlkIFRhc2sgb2JqZWN0IFxcbihISU5UOiBpZiB5b3UgYXJlIGdldHRpbmcgdGhpcyBlcnJvcnMgaW4gdGVzdHMsIGNvbnNpZGVyIHVzaW5nIGNyZWF0ZU1vY2tUYXNrIGZyb20gcmVkdXgtc2FnYS91dGlscyknKTtcbiAgfVxuXG4gIHJldHVybiBlZmZlY3QoSk9JTiwgdGFzayk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbCh0YXNrKSB7XG4gICgwLCBfdXRpbHMuY2hlY2spKHRhc2ssIF91dGlscy5pcy5ub3RVbmRlZiwgJ2NhbmNlbCh0YXNrKTogYXJndW1lbnQgdGFzayBpcyB1bmRlZmluZWQnKTtcbiAgaWYgKCFpc0ZvcmtlZFRhc2sodGFzaykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbmNlbCh0YXNrKTogYXJndW1lbnQgJyArIHRhc2sgKyAnIGlzIG5vdCBhIHZhbGlkIFRhc2sgb2JqZWN0IFxcbihISU5UOiBpZiB5b3UgYXJlIGdldHRpbmcgdGhpcyBlcnJvcnMgaW4gdGVzdHMsIGNvbnNpZGVyIHVzaW5nIGNyZWF0ZU1vY2tUYXNrIGZyb20gcmVkdXgtc2FnYS91dGlscyknKTtcbiAgfVxuXG4gIHJldHVybiBlZmZlY3QoQ0FOQ0VMLCB0YXNrKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0KHNlbGVjdG9yKSB7XG4gIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW41ID4gMSA/IF9sZW41IC0gMSA6IDApLCBfa2V5NSA9IDE7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICBhcmdzW19rZXk1IC0gMV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICB9XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBzZWxlY3RvciA9IF91dGlscy5pZGVudDtcbiAgfSBlbHNlIHtcbiAgICAoMCwgX3V0aWxzLmNoZWNrKShzZWxlY3RvciwgX3V0aWxzLmlzLm5vdFVuZGVmLCAnc2VsZWN0KHNlbGVjdG9yLFsuLi5dKTogYXJndW1lbnQgc2VsZWN0b3IgaXMgdW5kZWZpbmVkJyk7XG4gICAgKDAsIF91dGlscy5jaGVjaykoc2VsZWN0b3IsIF91dGlscy5pcy5mdW5jLCAnc2VsZWN0KHNlbGVjdG9yLFsuLi5dKTogYXJndW1lbnQgJyArIHNlbGVjdG9yICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9XG4gIHJldHVybiBlZmZlY3QoU0VMRUNULCB7IHNlbGVjdG9yOiBzZWxlY3RvciwgYXJnczogYXJncyB9KTtcbn1cblxuLyoqXHJcbiAgY2hhbm5lbChwYXR0ZXJuLCBbYnVmZmVyXSkgICAgPT4gY3JlYXRlcyBhbiBldmVudCBjaGFubmVsIGZvciBzdG9yZSBhY3Rpb25zXHJcbioqL1xuZnVuY3Rpb24gYWN0aW9uQ2hhbm5lbChwYXR0ZXJuLCBidWZmZXIpIHtcbiAgKDAsIF91dGlscy5jaGVjaykocGF0dGVybiwgX3V0aWxzLmlzLm5vdFVuZGVmLCAnYWN0aW9uQ2hhbm5lbChwYXR0ZXJuLC4uLik6IGFyZ3VtZW50IHBhdHRlcm4gaXMgdW5kZWZpbmVkJyk7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICgwLCBfdXRpbHMuY2hlY2spKGJ1ZmZlciwgX3V0aWxzLmlzLm5vdFVuZGVmLCAnYWN0aW9uQ2hhbm5lbChwYXR0ZXJuLCBidWZmZXIpOiBhcmd1bWVudCBidWZmZXIgaXMgdW5kZWZpbmVkJyk7XG4gICAgKDAsIF91dGlscy5jaGVjaykoYnVmZmVyLCBfdXRpbHMuaXMubm90VW5kZWYsICdhY3Rpb25DaGFubmVsKHBhdHRlcm4sIGJ1ZmZlcik6IGFyZ3VtZW50ICcgKyBidWZmZXIgKyAnIGlzIG5vdCBhIHZhbGlkIGJ1ZmZlcicpO1xuICB9XG4gIHJldHVybiBlZmZlY3QoQUNUSU9OX0NIQU5ORUwsIHsgcGF0dGVybjogcGF0dGVybiwgYnVmZmVyOiBidWZmZXIgfSk7XG59XG5cbmZ1bmN0aW9uIGNhbmNlbGxlZCgpIHtcbiAgcmV0dXJuIGVmZmVjdChDQU5DRUxMRUQsIHt9KTtcbn1cblxuZnVuY3Rpb24gZmx1c2goY2hhbm5lbCkge1xuICAoMCwgX3V0aWxzLmNoZWNrKShjaGFubmVsLCBfdXRpbHMuaXMuY2hhbm5lbCwgJ2ZsdXNoKGNoYW5uZWwpOiBhcmd1bWVudCAnICsgY2hhbm5lbCArICcgaXMgbm90IHZhbGlkIGNoYW5uZWwnKTtcbiAgcmV0dXJuIGVmZmVjdChGTFVTSCwgY2hhbm5lbCk7XG59XG5cbnZhciBhc0VmZmVjdCA9IGV4cG9ydHMuYXNFZmZlY3QgPSB7XG4gIHRha2U6IGZ1bmN0aW9uIHRha2UoZWZmZWN0KSB7XG4gICAgcmV0dXJuIGVmZmVjdCAmJiBlZmZlY3RbSU9dICYmIGVmZmVjdFtUQUtFXTtcbiAgfSxcbiAgcHV0OiBmdW5jdGlvbiBwdXQoZWZmZWN0KSB7XG4gICAgcmV0dXJuIGVmZmVjdCAmJiBlZmZlY3RbSU9dICYmIGVmZmVjdFtQVVRdO1xuICB9LFxuICByYWNlOiBmdW5jdGlvbiByYWNlKGVmZmVjdCkge1xuICAgIHJldHVybiBlZmZlY3QgJiYgZWZmZWN0W0lPXSAmJiBlZmZlY3RbUkFDRV07XG4gIH0sXG4gIGNhbGw6IGZ1bmN0aW9uIGNhbGwoZWZmZWN0KSB7XG4gICAgcmV0dXJuIGVmZmVjdCAmJiBlZmZlY3RbSU9dICYmIGVmZmVjdFtDQUxMXTtcbiAgfSxcbiAgY3BzOiBmdW5jdGlvbiBjcHMoZWZmZWN0KSB7XG4gICAgcmV0dXJuIGVmZmVjdCAmJiBlZmZlY3RbSU9dICYmIGVmZmVjdFtDUFNdO1xuICB9LFxuICBmb3JrOiBmdW5jdGlvbiBmb3JrKGVmZmVjdCkge1xuICAgIHJldHVybiBlZmZlY3QgJiYgZWZmZWN0W0lPXSAmJiBlZmZlY3RbRk9SS107XG4gIH0sXG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oZWZmZWN0KSB7XG4gICAgcmV0dXJuIGVmZmVjdCAmJiBlZmZlY3RbSU9dICYmIGVmZmVjdFtKT0lOXTtcbiAgfSxcbiAgY2FuY2VsOiBmdW5jdGlvbiBjYW5jZWwoZWZmZWN0KSB7XG4gICAgcmV0dXJuIGVmZmVjdCAmJiBlZmZlY3RbSU9dICYmIGVmZmVjdFtDQU5DRUxdO1xuICB9LFxuICBzZWxlY3Q6IGZ1bmN0aW9uIHNlbGVjdChlZmZlY3QpIHtcbiAgICByZXR1cm4gZWZmZWN0ICYmIGVmZmVjdFtJT10gJiYgZWZmZWN0W1NFTEVDVF07XG4gIH0sXG4gIGFjdGlvbkNoYW5uZWw6IGZ1bmN0aW9uIGFjdGlvbkNoYW5uZWwoZWZmZWN0KSB7XG4gICAgcmV0dXJuIGVmZmVjdCAmJiBlZmZlY3RbSU9dICYmIGVmZmVjdFtBQ1RJT05fQ0hBTk5FTF07XG4gIH0sXG4gIGNhbmNlbGxlZDogZnVuY3Rpb24gY2FuY2VsbGVkKGVmZmVjdCkge1xuICAgIHJldHVybiBlZmZlY3QgJiYgZWZmZWN0W0lPXSAmJiBlZmZlY3RbQ0FOQ0VMTEVEXTtcbiAgfSxcbiAgZmx1c2g6IGZ1bmN0aW9uIGZsdXNoKGVmZmVjdCkge1xuICAgIHJldHVybiBlZmZlY3QgJiYgZWZmZWN0W0lPXSAmJiBlZmZlY3RbRkxVU0hdO1xuICB9XG59OyJdfQ==