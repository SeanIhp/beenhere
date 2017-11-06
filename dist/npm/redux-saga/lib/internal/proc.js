"use strict";var exports=module.exports={};
var _keys = require('../../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _from = require('../../../babel-runtime/core-js/array/from.js');

var _from2 = _interopRequireDefault(_from);

var _defineProperty2 = require('../../../babel-runtime/core-js/object/define-property.js');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TASK_CANCEL = exports.CHANNEL_END = exports.NOT_ITERATOR_ERROR = undefined;
exports.default = proc;

var _utils = require('./utils.js');

var _scheduler = require('./scheduler.js');

var _io = require('./io.js');

var _channel = require('./channel.js');

var _buffers = require('./buffers.js');

function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];desc.configurable = desc.enumerable = true;if ("value" in desc) desc.writable = true;(0, _defineProperty3.default)(obj, key, desc);
  }return obj;
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty3.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var isDev = "development" === 'development';

var NOT_ITERATOR_ERROR = exports.NOT_ITERATOR_ERROR = 'proc first argument (Saga function result) must be an iterator';

var CHANNEL_END = exports.CHANNEL_END = {
  toString: function toString() {
    return '@@redux-saga/CHANNEL_END';
  }
};
var TASK_CANCEL = exports.TASK_CANCEL = {
  toString: function toString() {
    return '@@redux-saga/TASK_CANCEL';
  }
};

var matchers = {
  wildcard: function wildcard() {
    return _utils.kTrue;
  },
  default: function _default(pattern) {
    return function (input) {
      return input.type === pattern;
    };
  },
  array: function array(patterns) {
    return function (input) {
      return patterns.some(function (p) {
        return p === input.type;
      });
    };
  },
  predicate: function predicate(_predicate) {
    return function (input) {
      return _predicate(input);
    };
  }
};

function matcher(pattern) {
  return (pattern === '*' ? matchers.wildcard : _utils.is.array(pattern) ? matchers.array : _utils.is.func(pattern) ? matchers.predicate : matchers.default)(pattern);
}

/**
  Used to track a parent task and its forks
  In the new fork model, forked tasks are attached by default to their parent
  We model this using the concept of Parent task && main Task
  main task is the main flow of the current Generator, the parent tasks is the
  aggregation of the main tasks + all its forked tasks.
  Thus the whole model represents an execution tree with multiple branches (vs the
  linear execution tree in sequential (non parallel) programming)

  A parent tasks has the following semantics
  - It completes iff all its forks either complete or all cancelled
  - If it's cancelled, all forks are cancelled as well
  - It aborts if any uncaught error bubbles up from forks
  - If it completes, the return value is the one returned by the main task
**/
function forkQueue(name, mainTask, cb) {
  var tasks = [],
      result = void 0,
      completed = false;
  addTask(mainTask);

  function abort(err) {
    cancelAll();
    cb(err, true);
  }

  function addTask(task) {
    tasks.push(task);
    task.cont = function (res, isErr) {
      if (completed) {
        return;
      }

      (0, _utils.remove)(tasks, task);
      task.cont = _utils.noop;
      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }
        if (!tasks.length) {
          completed = true;
          cb(result);
        }
      }
    };
    // task.cont.cancel = task.cancel
  }

  function cancelAll() {
    if (completed) {
      return;
    }
    completed = true;
    tasks.forEach(function (t) {
      t.cont = _utils.noop;
      t.cancel();
    });
    tasks = [];
  }

  return {
    addTask: addTask,
    cancelAll: cancelAll,
    abort: abort,
    getTasks: function getTasks() {
      return tasks;
    },
    taskNames: function taskNames() {
      return tasks.map(function (t) {
        return t.name;
      });
    }
  };
}

function createTaskIterator(_ref) {
  var context = _ref.context,
      fn = _ref.fn,
      args = _ref.args;

  if (_utils.is.iterator(fn)) {
    return fn;
  }

  // catch synchronous failures; see #152 and #441
  var result = void 0,
      error = void 0;
  try {
    result = fn.apply(context, args);
  } catch (err) {
    error = err;
  }

  // i.e. a generator function returns an iterator
  if (_utils.is.iterator(result)) {
    return result;
  }

  // do not bubble up synchronous failures for detached forks
  // instead create a failed task. See #152 and #441
  return error ? (0, _utils.makeIterator)(function () {
    throw error;
  }) : (0, _utils.makeIterator)(function () {
    var pc = void 0;
    var eff = { done: false, value: result };
    var ret = function ret(value) {
      return { done: true, value: value };
    };
    return function (arg) {
      if (!pc) {
        pc = true;
        return eff;
      } else {
        return ret(arg);
      }
    };
  }());
}

function wrapHelper(helper) {
  return {
    fn: helper
  };
}

function proc(iterator) {
  var subscribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return _utils.noop;
  };
  var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _utils.noop;
  var getState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _utils.noop;
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var parentEffectId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var name = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'anonymous';
  var cont = arguments[7];

  (0, _utils.check)(iterator, _utils.is.iterator, NOT_ITERATOR_ERROR);

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;

  var log = logger || _utils.log;
  var stdChannel = (0, _channel.stdChannel)(subscribe);
  /**
    Tracks the current effect cancellation
    Each time the generator progresses. calling runEffect will set a new value
    on it. It allows propagating cancellation to child effects
  **/
  next.cancel = _utils.noop;

  /**
    Creates a new task descriptor for this generator, We'll also create a main task
    to track the main flow (besides other forked tasks)
  **/
  var task = newTask(parentEffectId, name, iterator, cont);
  var mainTask = { name: name, cancel: cancelMain, isRunning: true };
  var taskQueue = forkQueue(name, mainTask, end);

  /**
    cancellation of the main task. We'll simply resume the Generator with a Cancel
  **/
  function cancelMain() {
    if (mainTask.isRunning && !mainTask.isCancelled) {
      mainTask.isCancelled = true;
      next(TASK_CANCEL);
    }
  }

  /**
    This may be called by a parent generator to trigger/propagate cancellation
    cancel all pending tasks (including the main task), then end the current task.
      Cancellation propagates down to the whole execution tree holded by this Parent task
    It's also propagated to all joiners of this task and their execution tree/joiners
      Cancellation is noop for terminated/Cancelled tasks tasks
  **/
  function cancel() {
    /**
      We need to check both Running and Cancelled status
      Tasks can be Cancelled but still Running
    **/
    if (iterator._isRunning && !iterator._isCancelled) {
      iterator._isCancelled = true;
      taskQueue.cancelAll();
      /**
        Ending with a Never result will propagate the Cancellation to all joiners
      **/
      end(TASK_CANCEL);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/
  cont && (cont.cancel = cancel);

  // tracks the running status
  iterator._isRunning = true;

  // kicks up the generator
  next();

  // then return the task descriptor to the caller
  return task;

  /**
    This is the generator driver
    It's a recursive async/continuation function which calls itself
    until the generator terminates or throws
  **/
  function next(arg, isErr) {
    // Preventive measure. If we end up here, then there is really something wrong
    if (!mainTask.isRunning) {
      throw new Error('Trying to resume an already finished generator');
    }

    try {
      var result = void 0;
      if (isErr) {
        result = iterator.throw(arg);
      } else if (arg === TASK_CANCEL) {
        /**
          getting TASK_CANCEL autoamtically cancels the main task
          We can get this value here
            - By cancelling the parent task manually
          - By joining a Cancelled task
        **/
        mainTask.isCancelled = true;
        /**
          Cancels the current effect; this will propagate the cancellation down to any called tasks
        **/
        next.cancel();
        /**
          If this Generator has a `return` method then invokes it
          Thill will jump to the finally block
        **/
        result = _utils.is.func(iterator.return) ? iterator.return(TASK_CANCEL) : { done: true, value: TASK_CANCEL };
      } else if (arg === CHANNEL_END) {
        // We get CHANNEL_END by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
        result = _utils.is.func(iterator.return) ? iterator.return() : { done: true };
      } else {
        result = iterator.next(arg);
      }

      if (!result.done) {
        runEffect(result.value, parentEffectId, '', next);
      } else {
        /**
          This Generator has ended, terminate the main task and notify the fork queue
        **/
        mainTask.isMainRunning = false;
        mainTask.cont && mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.isCancelled) {
        log('error', 'uncaught at ' + name, error.message);
      }
      mainTask.isMainRunning = false;
      mainTask.cont(error, true);
    }
  }

  function end(result, isErr) {
    iterator._isRunning = false;
    stdChannel.close();
    if (!isErr) {
      if (result === TASK_CANCEL && isDev) {
        log('info', name + ' has been cancelled', '');
      }
      iterator._result = result;
      iterator._deferredEnd && iterator._deferredEnd.resolve(result);
    } else {
      if (result instanceof Error) {
        result.sagaStack = 'at ' + name + ' \n ' + (result.sagaStack || result.stack);
      }
      if (!task.cont) {
        log('error', 'uncaught', result.sagaStack || result.stack);
        if (result instanceof Error && onError) {
          onError(result);
        }
      }
      iterator._error = result;
      iterator._isAborted = true;
      iterator._deferredEnd && iterator._deferredEnd.reject(result);
    }
    task.cont && task.cont(result, isErr);
    task.joiners.forEach(function (j) {
      return j.cb(result, isErr);
    });
    task.joiners = null;
  }

  function runEffect(effect, parentEffectId) {
    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var cb = arguments[3];

    var effectId = (0, _utils.uid)();
    sagaMonitor && sagaMonitor.effectTriggered({ effectId: effectId, parentEffectId: parentEffectId, label: label, effect: effect });

    /**
      completion callback and cancel callback are mutually exclusive
      We can't cancel an already completed effect
      And We can't complete an already cancelled effectId
    **/
    var effectSettled = void 0;

    // Completion callback passed to the appropriate effect runner
    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      cb.cancel = _utils.noop; // defensive measure
      if (sagaMonitor) {
        isErr ? sagaMonitor.effectRejected(effectId, res) : sagaMonitor.effectResolved(effectId, res);
      }

      cb(res, isErr);
    }
    // tracks down the current cancel
    currCb.cancel = _utils.noop;

    // setup cancellation logic on the parent cb
    cb.cancel = function () {
      // prevents cancelling an already completed effect
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      /**
        propagates cancel downward
        catch uncaught cancellations errors; since we can no longer call the completion
        callback, log errors raised during cancellations into the console
      **/
      try {
        currCb.cancel();
      } catch (err) {
        log('error', 'uncaught at ' + name, err.message);
      }
      currCb.cancel = _utils.noop; // defensive measure

      sagaMonitor && sagaMonitor.effectCancelled(effectId);
    };

    /**
      each effect runner must attach its own logic of cancellation to the provided callback
      it allows this generator to propagate cancellation downward.
        ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
      And the setup must occur before calling the callback
        This is a sort of inversion of control: called async functions are responsible
      of completing the flow by calling the provided continuation; while caller functions
      are responsible for aborting the current flow by calling the attached cancel function
        Library users can attach their own cancellation logic to promises by defining a
      promise[CANCEL] method in their returned promises
      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
    **/
    var data = void 0;
    return (
      // Non declarative effect
      _utils.is.promise(effect) ? resolvePromise(effect, currCb) : _utils.is.helper(effect) ? runForkEffect(wrapHelper(effect), effectId, currCb) : _utils.is.iterator(effect) ? resolveIterator(effect, effectId, name, currCb)

      // declarative effects
      : _utils.is.array(effect) ? runParallelEffect(effect, effectId, currCb) : _utils.is.notUndef(data = _io.asEffect.take(effect)) ? runTakeEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.put(effect)) ? runPutEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.race(effect)) ? runRaceEffect(data, effectId, currCb) : _utils.is.notUndef(data = _io.asEffect.call(effect)) ? runCallEffect(data, effectId, currCb) : _utils.is.notUndef(data = _io.asEffect.cps(effect)) ? runCPSEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.fork(effect)) ? runForkEffect(data, effectId, currCb) : _utils.is.notUndef(data = _io.asEffect.join(effect)) ? runJoinEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.cancel(effect)) ? runCancelEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.select(effect)) ? runSelectEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.actionChannel(effect)) ? runChannelEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.flush(effect)) ? runFlushEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.cancelled(effect)) ? runCancelledEffect(data, currCb) : /* anything else returned as is        */currCb(effect)
    );
  }

  function resolvePromise(promise, cb) {
    var cancelPromise = promise[_utils.CANCEL];
    if (typeof cancelPromise === 'function') {
      cb.cancel = cancelPromise;
    }
    promise.then(cb, function (error) {
      return cb(error, true);
    });
  }

  function resolveIterator(iterator, effectId, name, cb) {
    proc(iterator, subscribe, dispatch, getState, options, effectId, name, cb);
  }

  function runTakeEffect(_ref2, cb) {
    var channel = _ref2.channel,
        pattern = _ref2.pattern,
        maybe = _ref2.maybe;

    channel = channel || stdChannel;
    var takeCb = function takeCb(inp) {
      return inp instanceof Error ? cb(inp, true) : (0, _channel.isEnd)(inp) && !maybe ? cb(CHANNEL_END) : cb(inp);
    };
    try {
      channel.take(takeCb, matcher(pattern));
    } catch (err) {
      return cb(err, true);
    }
    cb.cancel = takeCb.cancel;
  }

  function runPutEffect(_ref3, cb) {
    var channel = _ref3.channel,
        action = _ref3.action,
        sync = _ref3.sync;

    /**
      Schedule the put in case another saga is holding a lock.
      The put will be executed atomically. ie nested puts will execute after
      this put has terminated.
    **/
    (0, _scheduler.asap)(function () {
      var result = void 0;
      try {
        result = (channel ? channel.put : dispatch)(action);
      } catch (error) {
        // If we have a channel or `put.sync` was used then bubble up the error.
        if (channel || sync) return cb(error, true);
        log('error', 'uncaught at ' + name, error.stack || error.message || error);
      }

      if (sync && _utils.is.promise(result)) {
        resolvePromise(result, cb);
      } else {
        return cb(result);
      }
    });
    // Put effects are non cancellables
  }

  function runCallEffect(_ref4, effectId, cb) {
    var context = _ref4.context,
        fn = _ref4.fn,
        args = _ref4.args;

    var result = void 0;
    // catch synchronous failures; see #152
    try {
      result = fn.apply(context, args);
    } catch (error) {
      return cb(error, true);
    }
    return _utils.is.promise(result) ? resolvePromise(result, cb) : _utils.is.iterator(result) ? resolveIterator(result, effectId, fn.name, cb) : cb(result);
  }

  function runCPSEffect(_ref5, cb) {
    var context = _ref5.context,
        fn = _ref5.fn,
        args = _ref5.args;

    // CPS (ie node style functions) can define their own cancellation logic
    // by setting cancel field on the cb

    // catch synchronous failures; see #152
    try {
      (function () {
        var cpsCb = function cpsCb(err, res) {
          return _utils.is.undef(err) ? cb(res) : cb(err, true);
        };
        fn.apply(context, args.concat(cpsCb));
        if (cpsCb.cancel) {
          cb.cancel = function () {
            return cpsCb.cancel();
          };
        }
      })();
    } catch (error) {
      return cb(error, true);
    }
  }

  function runForkEffect(_ref6, effectId, cb) {
    var context = _ref6.context,
        fn = _ref6.fn,
        args = _ref6.args,
        detached = _ref6.detached;

    var taskIterator = createTaskIterator({ context: context, fn: fn, args: args });

    try {
      (0, _scheduler.suspend)();
      var _task = proc(taskIterator, subscribe, dispatch, getState, options, effectId, fn.name, detached ? null : _utils.noop);

      if (detached) {
        cb(_task);
      } else {
        if (taskIterator._isRunning) {
          taskQueue.addTask(_task);
          cb(_task);
        } else if (taskIterator._error) {
          taskQueue.abort(taskIterator._error);
        } else {
          cb(_task);
        }
      }
    } finally {
      (0, _scheduler.flush)();
    }
    // Fork effects are non cancellables
  }

  function runJoinEffect(t, cb) {
    if (t.isRunning()) {
      (function () {
        var joiner = { task: task, cb: cb };
        cb.cancel = function () {
          return (0, _utils.remove)(t.joiners, joiner);
        };
        t.joiners.push(joiner);
      })();
    } else {
      t.isAborted() ? cb(t.error(), true) : cb(t.result());
    }
  }

  function runCancelEffect(task, cb) {
    if (task.isRunning()) {
      task.cancel();
    }
    cb();
    // cancel effects are non cancellables
  }

  function runParallelEffect(effects, effectId, cb) {
    if (!effects.length) {
      return cb([]);
    }

    var completedCount = 0;
    var completed = void 0;
    var results = Array(effects.length);

    function checkEffectEnd() {
      if (completedCount === results.length) {
        completed = true;
        cb(results);
      }
    }

    var childCbs = effects.map(function (eff, idx) {
      var chCbAtIdx = function chCbAtIdx(res, isErr) {
        if (completed) {
          return;
        }
        if (isErr || (0, _channel.isEnd)(res) || res === CHANNEL_END || res === TASK_CANCEL) {
          cb.cancel();
          cb(res, isErr);
        } else {
          results[idx] = res;
          completedCount++;
          checkEffectEnd();
        }
      };
      chCbAtIdx.cancel = _utils.noop;
      return chCbAtIdx;
    });

    cb.cancel = function () {
      if (!completed) {
        completed = true;
        childCbs.forEach(function (chCb) {
          return chCb.cancel();
        });
      }
    };

    effects.forEach(function (eff, idx) {
      return runEffect(eff, effectId, idx, childCbs[idx]);
    });
  }

  function runRaceEffect(effects, effectId, cb) {
    var completed = void 0;
    var keys = (0, _keys2.default)(effects);
    var childCbs = {};

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }

        if (isErr) {
          // Race Auto cancellation
          cb.cancel();
          cb(res, true);
        } else if (!(0, _channel.isEnd)(res) && res !== CHANNEL_END && res !== TASK_CANCEL) {
          cb.cancel();
          completed = true;
          cb(_defineProperty({}, key, res));
        }
      };
      chCbAtKey.cancel = _utils.noop;
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      // prevents unnecessary cancellation
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };
    keys.forEach(function (key) {
      if (completed) {
        return;
      }
      runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runSelectEffect(_ref7, cb) {
    var selector = _ref7.selector,
        args = _ref7.args;

    try {
      var state = selector.apply(undefined, [getState()].concat(_toConsumableArray(args)));
      cb(state);
    } catch (error) {
      cb(error, true);
    }
  }

  function runChannelEffect(_ref8, cb) {
    var pattern = _ref8.pattern,
        buffer = _ref8.buffer;

    var match = matcher(pattern);
    match.pattern = pattern;
    cb((0, _channel.eventChannel)(subscribe, buffer || _buffers.buffers.fixed(), match));
  }

  function runCancelledEffect(data, cb) {
    cb(!!mainTask.isCancelled);
  }

  function runFlushEffect(channel, cb) {
    channel.flush(cb);
  }

  function newTask(id, name, iterator, cont) {
    var _done, _ref9, _mutatorMap;

    iterator._deferredEnd = null;
    return _ref9 = {}, _defineProperty(_ref9, _utils.TASK, true), _defineProperty(_ref9, 'id', id), _defineProperty(_ref9, 'name', name), _done = 'done', _mutatorMap = {}, _mutatorMap[_done] = _mutatorMap[_done] || {}, _mutatorMap[_done].get = function () {
      if (iterator._deferredEnd) {
        return iterator._deferredEnd.promise;
      } else {
        var def = (0, _utils.deferred)();
        iterator._deferredEnd = def;
        if (!iterator._isRunning) {
          iterator._error ? def.reject(iterator._error) : def.resolve(iterator._result);
        }
        return def.promise;
      }
    }, _defineProperty(_ref9, 'cont', cont), _defineProperty(_ref9, 'joiners', []), _defineProperty(_ref9, 'cancel', cancel), _defineProperty(_ref9, 'isRunning', function isRunning() {
      return iterator._isRunning;
    }), _defineProperty(_ref9, 'isCancelled', function isCancelled() {
      return iterator._isCancelled;
    }), _defineProperty(_ref9, 'isAborted', function isAborted() {
      return iterator._isAborted;
    }), _defineProperty(_ref9, 'result', function result() {
      return iterator._result;
    }), _defineProperty(_ref9, 'error', function error() {
      return iterator._error;
    }), _defineEnumerableProperties(_ref9, _mutatorMap), _ref9;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2MuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJUQVNLX0NBTkNFTCIsIkNIQU5ORUxfRU5EIiwiTk9UX0lURVJBVE9SX0VSUk9SIiwidW5kZWZpbmVkIiwiZGVmYXVsdCIsInByb2MiLCJfdXRpbHMiLCJyZXF1aXJlIiwiX3NjaGVkdWxlciIsIl9pbyIsIl9jaGFubmVsIiwiX2J1ZmZlcnMiLCJfZGVmaW5lRW51bWVyYWJsZVByb3BlcnRpZXMiLCJvYmoiLCJkZXNjcyIsImtleSIsImRlc2MiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzQXJyYXkiLCJpIiwiYXJyMiIsImxlbmd0aCIsIl9kZWZpbmVQcm9wZXJ0eSIsImlzRGV2IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwidG9TdHJpbmciLCJtYXRjaGVycyIsIndpbGRjYXJkIiwia1RydWUiLCJfZGVmYXVsdCIsInBhdHRlcm4iLCJpbnB1dCIsInR5cGUiLCJhcnJheSIsInBhdHRlcm5zIiwic29tZSIsInAiLCJwcmVkaWNhdGUiLCJfcHJlZGljYXRlIiwibWF0Y2hlciIsImlzIiwiZnVuYyIsImZvcmtRdWV1ZSIsIm5hbWUiLCJtYWluVGFzayIsImNiIiwidGFza3MiLCJyZXN1bHQiLCJjb21wbGV0ZWQiLCJhZGRUYXNrIiwiYWJvcnQiLCJlcnIiLCJjYW5jZWxBbGwiLCJ0YXNrIiwicHVzaCIsImNvbnQiLCJyZXMiLCJpc0VyciIsInJlbW92ZSIsIm5vb3AiLCJmb3JFYWNoIiwidCIsImNhbmNlbCIsImdldFRhc2tzIiwidGFza05hbWVzIiwibWFwIiwiY3JlYXRlVGFza0l0ZXJhdG9yIiwiX3JlZiIsImNvbnRleHQiLCJmbiIsImFyZ3MiLCJpdGVyYXRvciIsImVycm9yIiwiYXBwbHkiLCJtYWtlSXRlcmF0b3IiLCJwYyIsImVmZiIsImRvbmUiLCJyZXQiLCJhcmciLCJ3cmFwSGVscGVyIiwiaGVscGVyIiwic3Vic2NyaWJlIiwiYXJndW1lbnRzIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsIm9wdGlvbnMiLCJwYXJlbnRFZmZlY3RJZCIsImNoZWNrIiwic2FnYU1vbml0b3IiLCJsb2dnZXIiLCJvbkVycm9yIiwibG9nIiwic3RkQ2hhbm5lbCIsIm5leHQiLCJuZXdUYXNrIiwiY2FuY2VsTWFpbiIsImlzUnVubmluZyIsInRhc2tRdWV1ZSIsImVuZCIsImlzQ2FuY2VsbGVkIiwiX2lzUnVubmluZyIsIl9pc0NhbmNlbGxlZCIsIkVycm9yIiwidGhyb3ciLCJyZXR1cm4iLCJydW5FZmZlY3QiLCJpc01haW5SdW5uaW5nIiwibWVzc2FnZSIsImNsb3NlIiwiX3Jlc3VsdCIsIl9kZWZlcnJlZEVuZCIsInJlc29sdmUiLCJzYWdhU3RhY2siLCJzdGFjayIsIl9lcnJvciIsIl9pc0Fib3J0ZWQiLCJyZWplY3QiLCJqb2luZXJzIiwiaiIsImVmZmVjdCIsImxhYmVsIiwiZWZmZWN0SWQiLCJ1aWQiLCJlZmZlY3RUcmlnZ2VyZWQiLCJlZmZlY3RTZXR0bGVkIiwiY3VyckNiIiwiZWZmZWN0UmVqZWN0ZWQiLCJlZmZlY3RSZXNvbHZlZCIsImVmZmVjdENhbmNlbGxlZCIsImRhdGEiLCJwcm9taXNlIiwicmVzb2x2ZVByb21pc2UiLCJydW5Gb3JrRWZmZWN0IiwicmVzb2x2ZUl0ZXJhdG9yIiwicnVuUGFyYWxsZWxFZmZlY3QiLCJub3RVbmRlZiIsImFzRWZmZWN0IiwidGFrZSIsInJ1blRha2VFZmZlY3QiLCJwdXQiLCJydW5QdXRFZmZlY3QiLCJyYWNlIiwicnVuUmFjZUVmZmVjdCIsImNhbGwiLCJydW5DYWxsRWZmZWN0IiwiY3BzIiwicnVuQ1BTRWZmZWN0IiwiZm9yayIsImpvaW4iLCJydW5Kb2luRWZmZWN0IiwicnVuQ2FuY2VsRWZmZWN0Iiwic2VsZWN0IiwicnVuU2VsZWN0RWZmZWN0IiwiYWN0aW9uQ2hhbm5lbCIsInJ1bkNoYW5uZWxFZmZlY3QiLCJmbHVzaCIsInJ1bkZsdXNoRWZmZWN0IiwiY2FuY2VsbGVkIiwicnVuQ2FuY2VsbGVkRWZmZWN0IiwiY2FuY2VsUHJvbWlzZSIsIkNBTkNFTCIsInRoZW4iLCJfcmVmMiIsImNoYW5uZWwiLCJtYXliZSIsInRha2VDYiIsImlucCIsImlzRW5kIiwiX3JlZjMiLCJhY3Rpb24iLCJzeW5jIiwiYXNhcCIsIl9yZWY0IiwiX3JlZjUiLCJjcHNDYiIsInVuZGVmIiwiY29uY2F0IiwiX3JlZjYiLCJkZXRhY2hlZCIsInRhc2tJdGVyYXRvciIsInN1c3BlbmQiLCJfdGFzayIsImpvaW5lciIsImlzQWJvcnRlZCIsImVmZmVjdHMiLCJjb21wbGV0ZWRDb3VudCIsInJlc3VsdHMiLCJjaGVja0VmZmVjdEVuZCIsImNoaWxkQ2JzIiwiaWR4IiwiY2hDYkF0SWR4IiwiY2hDYiIsImtleXMiLCJjaENiQXRLZXkiLCJfcmVmNyIsInNlbGVjdG9yIiwic3RhdGUiLCJfcmVmOCIsImJ1ZmZlciIsIm1hdGNoIiwiZXZlbnRDaGFubmVsIiwiYnVmZmVycyIsImZpeGVkIiwiaWQiLCJfZG9uZSIsIl9yZWY5IiwiX211dGF0b3JNYXAiLCJUQVNLIiwiZ2V0IiwiZGVmIiwiZGVmZXJyZWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDO0FBR0FELFFBQVFFLFdBQVIsR0FBc0JGLFFBQVFHLFdBQVIsR0FBc0JILFFBQVFJLGtCQUFSLEdBQTZCQyxTQUF6RTtBQUNBTCxRQUFRTSxPQUFSLEdBQWtCQyxJQUFsQjs7QUFFQSxJQUFJQyxTQUFTQyxRQUFRLFNBQVIsQ0FBYjs7QUFFQSxJQUFJQyxhQUFhRCxRQUFRLGFBQVIsQ0FBakI7O0FBRUEsSUFBSUUsTUFBTUYsUUFBUSxNQUFSLENBQVY7O0FBRUEsSUFBSUcsV0FBV0gsUUFBUSxXQUFSLENBQWY7O0FBRUEsSUFBSUksV0FB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dUIsV0FBdkIsRUFBb0MsU0FBU3RCLFNBQVQsR0FBcUI7QUFDM0QsYUFBT2pILFNBQVM2QyxVQUFoQjtBQUNELEtBRkcsQ0FmRyxFQWlCSGhHLGdCQUFnQjBMLEtBQWhCLEVBQXVCLFFBQXZCLEVBQWlDLFNBQVMvSixNQUFULEdBQWtCO0FBQ3JELGFBQU93QixTQUFTdUMsT0FBaEI7QUFDRCxLQUZHLENBakJHLEVBbUJIMUYsZ0JBQWdCMEwsS0FBaEIsRUFBdUIsT0FBdkIsRUFBZ0MsU0FBU3RJLEtBQVQsR0FBaUI7QUFDbkQsYUFBT0QsU0FBUzRDLE1BQWhCO0FBQ0QsS0FGRyxDQW5CRyxFQXFCSDlHLDRCQUE0QnlNLEtBQTVCLEVBQW1DQyxXQUFuQyxDQXJCRyxFQXFCOENELEtBckJyRDtBQXNCRDtBQUNGIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlRBU0tfQ0FOQ0VMID0gZXhwb3J0cy5DSEFOTkVMX0VORCA9IGV4cG9ydHMuTk9UX0lURVJBVE9SX0VSUk9SID0gdW5kZWZpbmVkO1xuZXhwb3J0cy5kZWZhdWx0ID0gcHJvYztcblxudmFyIF91dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIF9zY2hlZHVsZXIgPSByZXF1aXJlKCcuL3NjaGVkdWxlcicpO1xuXG52YXIgX2lvID0gcmVxdWlyZSgnLi9pbycpO1xuXG52YXIgX2NoYW5uZWwgPSByZXF1aXJlKCcuL2NoYW5uZWwnKTtcblxudmFyIF9idWZmZXJzID0gcmVxdWlyZSgnLi9idWZmZXJzJyk7XG5cbmZ1bmN0aW9uIF9kZWZpbmVFbnVtZXJhYmxlUHJvcGVydGllcyhvYmosIGRlc2NzKSB7IGZvciAodmFyIGtleSBpbiBkZXNjcykgeyB2YXIgZGVzYyA9IGRlc2NzW2tleV07IGRlc2MuY29uZmlndXJhYmxlID0gZGVzYy5lbnVtZXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSBkZXNjLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCBkZXNjKTsgfSByZXR1cm4gb2JqOyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxudmFyIE5PVF9JVEVSQVRPUl9FUlJPUiA9IGV4cG9ydHMuTk9UX0lURVJBVE9SX0VSUk9SID0gJ3Byb2MgZmlyc3QgYXJndW1lbnQgKFNhZ2EgZnVuY3Rpb24gcmVzdWx0KSBtdXN0IGJlIGFuIGl0ZXJhdG9yJztcblxudmFyIENIQU5ORUxfRU5EID0gZXhwb3J0cy5DSEFOTkVMX0VORCA9IHtcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAnQEByZWR1eC1zYWdhL0NIQU5ORUxfRU5EJztcbiAgfVxufTtcbnZhciBUQVNLX0NBTkNFTCA9IGV4cG9ydHMuVEFTS19DQU5DRUwgPSB7XG4gIHRvU3RyaW5nOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ0BAcmVkdXgtc2FnYS9UQVNLX0NBTkNFTCc7XG4gIH1cbn07XG5cbnZhciBtYXRjaGVycyA9IHtcbiAgd2lsZGNhcmQ6IGZ1bmN0aW9uIHdpbGRjYXJkKCkge1xuICAgIHJldHVybiBfdXRpbHMua1RydWU7XG4gIH0sXG4gIGRlZmF1bHQ6IGZ1bmN0aW9uIF9kZWZhdWx0KHBhdHRlcm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICByZXR1cm4gaW5wdXQudHlwZSA9PT0gcGF0dGVybjtcbiAgICB9O1xuICB9LFxuICBhcnJheTogZnVuY3Rpb24gYXJyYXkocGF0dGVybnMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICByZXR1cm4gcGF0dGVybnMuc29tZShmdW5jdGlvbiAocCkge1xuICAgICAgICByZXR1cm4gcCA9PT0gaW5wdXQudHlwZTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0sXG4gIHByZWRpY2F0ZTogZnVuY3Rpb24gcHJlZGljYXRlKF9wcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICByZXR1cm4gX3ByZWRpY2F0ZShpbnB1dCk7XG4gICAgfTtcbiAgfVxufTtcblxuZnVuY3Rpb24gbWF0Y2hlcihwYXR0ZXJuKSB7XG4gIHJldHVybiAocGF0dGVybiA9PT0gJyonID8gbWF0Y2hlcnMud2lsZGNhcmQgOiBfdXRpbHMuaXMuYXJyYXkocGF0dGVybikgPyBtYXRjaGVycy5hcnJheSA6IF91dGlscy5pcy5mdW5jKHBhdHRlcm4pID8gbWF0Y2hlcnMucHJlZGljYXRlIDogbWF0Y2hlcnMuZGVmYXVsdCkocGF0dGVybik7XG59XG5cbi8qKlxyXG4gIFVzZWQgdG8gdHJhY2sgYSBwYXJlbnQgdGFzayBhbmQgaXRzIGZvcmtzXHJcbiAgSW4gdGhlIG5ldyBmb3JrIG1vZGVsLCBmb3JrZWQgdGFza3MgYXJlIGF0dGFjaGVkIGJ5IGRlZmF1bHQgdG8gdGhlaXIgcGFyZW50XHJcbiAgV2UgbW9kZWwgdGhpcyB1c2luZyB0aGUgY29uY2VwdCBvZiBQYXJlbnQgdGFzayAmJiBtYWluIFRhc2tcclxuICBtYWluIHRhc2sgaXMgdGhlIG1haW4gZmxvdyBvZiB0aGUgY3VycmVudCBHZW5lcmF0b3IsIHRoZSBwYXJlbnQgdGFza3MgaXMgdGhlXHJcbiAgYWdncmVnYXRpb24gb2YgdGhlIG1haW4gdGFza3MgKyBhbGwgaXRzIGZvcmtlZCB0YXNrcy5cclxuICBUaHVzIHRoZSB3aG9sZSBtb2RlbCByZXByZXNlbnRzIGFuIGV4ZWN1dGlvbiB0cmVlIHdpdGggbXVsdGlwbGUgYnJhbmNoZXMgKHZzIHRoZVxyXG4gIGxpbmVhciBleGVjdXRpb24gdHJlZSBpbiBzZXF1ZW50aWFsIChub24gcGFyYWxsZWwpIHByb2dyYW1taW5nKVxyXG5cclxuICBBIHBhcmVudCB0YXNrcyBoYXMgdGhlIGZvbGxvd2luZyBzZW1hbnRpY3NcclxuICAtIEl0IGNvbXBsZXRlcyBpZmYgYWxsIGl0cyBmb3JrcyBlaXRoZXIgY29tcGxldGUgb3IgYWxsIGNhbmNlbGxlZFxyXG4gIC0gSWYgaXQncyBjYW5jZWxsZWQsIGFsbCBmb3JrcyBhcmUgY2FuY2VsbGVkIGFzIHdlbGxcclxuICAtIEl0IGFib3J0cyBpZiBhbnkgdW5jYXVnaHQgZXJyb3IgYnViYmxlcyB1cCBmcm9tIGZvcmtzXHJcbiAgLSBJZiBpdCBjb21wbGV0ZXMsIHRoZSByZXR1cm4gdmFsdWUgaXMgdGhlIG9uZSByZXR1cm5lZCBieSB0aGUgbWFpbiB0YXNrXHJcbioqL1xuZnVuY3Rpb24gZm9ya1F1ZXVlKG5hbWUsIG1haW5UYXNrLCBjYikge1xuICB2YXIgdGFza3MgPSBbXSxcbiAgICAgIHJlc3VsdCA9IHZvaWQgMCxcbiAgICAgIGNvbXBsZXRlZCA9IGZhbHNlO1xuICBhZGRUYXNrKG1haW5UYXNrKTtcblxuICBmdW5jdGlvbiBhYm9ydChlcnIpIHtcbiAgICBjYW5jZWxBbGwoKTtcbiAgICBjYihlcnIsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGFzayh0YXNrKSB7XG4gICAgdGFza3MucHVzaCh0YXNrKTtcbiAgICB0YXNrLmNvbnQgPSBmdW5jdGlvbiAocmVzLCBpc0Vycikge1xuICAgICAgaWYgKGNvbXBsZXRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICgwLCBfdXRpbHMucmVtb3ZlKSh0YXNrcywgdGFzayk7XG4gICAgICB0YXNrLmNvbnQgPSBfdXRpbHMubm9vcDtcbiAgICAgIGlmIChpc0Vycikge1xuICAgICAgICBhYm9ydChyZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRhc2sgPT09IG1haW5UYXNrKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcmVzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGFza3MubGVuZ3RoKSB7XG4gICAgICAgICAgY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyB0YXNrLmNvbnQuY2FuY2VsID0gdGFzay5jYW5jZWxcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbEFsbCgpIHtcbiAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgdGFza3MuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgdC5jb250ID0gX3V0aWxzLm5vb3A7XG4gICAgICB0LmNhbmNlbCgpO1xuICAgIH0pO1xuICAgIHRhc2tzID0gW107XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFRhc2s6IGFkZFRhc2ssXG4gICAgY2FuY2VsQWxsOiBjYW5jZWxBbGwsXG4gICAgYWJvcnQ6IGFib3J0LFxuICAgIGdldFRhc2tzOiBmdW5jdGlvbiBnZXRUYXNrcygpIHtcbiAgICAgIHJldHVybiB0YXNrcztcbiAgICB9LFxuICAgIHRhc2tOYW1lczogZnVuY3Rpb24gdGFza05hbWVzKCkge1xuICAgICAgcmV0dXJuIHRhc2tzLm1hcChmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdC5uYW1lO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUYXNrSXRlcmF0b3IoX3JlZikge1xuICB2YXIgY29udGV4dCA9IF9yZWYuY29udGV4dCxcbiAgICAgIGZuID0gX3JlZi5mbixcbiAgICAgIGFyZ3MgPSBfcmVmLmFyZ3M7XG5cbiAgaWYgKF91dGlscy5pcy5pdGVyYXRvcihmbikpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICAvLyBjYXRjaCBzeW5jaHJvbm91cyBmYWlsdXJlczsgc2VlICMxNTIgYW5kICM0NDFcbiAgdmFyIHJlc3VsdCA9IHZvaWQgMCxcbiAgICAgIGVycm9yID0gdm9pZCAwO1xuICB0cnkge1xuICAgIHJlc3VsdCA9IGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnJvciA9IGVycjtcbiAgfVxuXG4gIC8vIGkuZS4gYSBnZW5lcmF0b3IgZnVuY3Rpb24gcmV0dXJucyBhbiBpdGVyYXRvclxuICBpZiAoX3V0aWxzLmlzLml0ZXJhdG9yKHJlc3VsdCkpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gZG8gbm90IGJ1YmJsZSB1cCBzeW5jaHJvbm91cyBmYWlsdXJlcyBmb3IgZGV0YWNoZWQgZm9ya3NcbiAgLy8gaW5zdGVhZCBjcmVhdGUgYSBmYWlsZWQgdGFzay4gU2VlICMxNTIgYW5kICM0NDFcbiAgcmV0dXJuIGVycm9yID8gKDAsIF91dGlscy5tYWtlSXRlcmF0b3IpKGZ1bmN0aW9uICgpIHtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfSkgOiAoMCwgX3V0aWxzLm1ha2VJdGVyYXRvcikoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYyA9IHZvaWQgMDtcbiAgICB2YXIgZWZmID0geyBkb25lOiBmYWxzZSwgdmFsdWU6IHJlc3VsdCB9O1xuICAgIHZhciByZXQgPSBmdW5jdGlvbiByZXQodmFsdWUpIHtcbiAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9O1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIGlmICghcGMpIHtcbiAgICAgICAgcGMgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZWZmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldChhcmcpO1xuICAgICAgfVxuICAgIH07XG4gIH0oKSk7XG59XG5cbmZ1bmN0aW9uIHdyYXBIZWxwZXIoaGVscGVyKSB7XG4gIHJldHVybiB7XG4gICAgZm46IGhlbHBlclxuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9jKGl0ZXJhdG9yKSB7XG4gIHZhciBzdWJzY3JpYmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3V0aWxzLm5vb3A7XG4gIH07XG4gIHZhciBkaXNwYXRjaCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogX3V0aWxzLm5vb3A7XG4gIHZhciBnZXRTdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogX3V0aWxzLm5vb3A7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiB7fTtcbiAgdmFyIHBhcmVudEVmZmVjdElkID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiAwO1xuICB2YXIgbmFtZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA2ICYmIGFyZ3VtZW50c1s2XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzZdIDogJ2Fub255bW91cyc7XG4gIHZhciBjb250ID0gYXJndW1lbnRzWzddO1xuXG4gICgwLCBfdXRpbHMuY2hlY2spKGl0ZXJhdG9yLCBfdXRpbHMuaXMuaXRlcmF0b3IsIE5PVF9JVEVSQVRPUl9FUlJPUik7XG5cbiAgdmFyIHNhZ2FNb25pdG9yID0gb3B0aW9ucy5zYWdhTW9uaXRvcixcbiAgICAgIGxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyLFxuICAgICAgb25FcnJvciA9IG9wdGlvbnMub25FcnJvcjtcblxuICB2YXIgbG9nID0gbG9nZ2VyIHx8IF91dGlscy5sb2c7XG4gIHZhciBzdGRDaGFubmVsID0gKDAsIF9jaGFubmVsLnN0ZENoYW5uZWwpKHN1YnNjcmliZSk7XG4gIC8qKlxyXG4gICAgVHJhY2tzIHRoZSBjdXJyZW50IGVmZmVjdCBjYW5jZWxsYXRpb25cclxuICAgIEVhY2ggdGltZSB0aGUgZ2VuZXJhdG9yIHByb2dyZXNzZXMuIGNhbGxpbmcgcnVuRWZmZWN0IHdpbGwgc2V0IGEgbmV3IHZhbHVlXHJcbiAgICBvbiBpdC4gSXQgYWxsb3dzIHByb3BhZ2F0aW5nIGNhbmNlbGxhdGlvbiB0byBjaGlsZCBlZmZlY3RzXHJcbiAgKiovXG4gIG5leHQuY2FuY2VsID0gX3V0aWxzLm5vb3A7XG5cbiAgLyoqXHJcbiAgICBDcmVhdGVzIGEgbmV3IHRhc2sgZGVzY3JpcHRvciBmb3IgdGhpcyBnZW5lcmF0b3IsIFdlJ2xsIGFsc28gY3JlYXRlIGEgbWFpbiB0YXNrXHJcbiAgICB0byB0cmFjayB0aGUgbWFpbiBmbG93IChiZXNpZGVzIG90aGVyIGZvcmtlZCB0YXNrcylcclxuICAqKi9cbiAgdmFyIHRhc2sgPSBuZXdUYXNrKHBhcmVudEVmZmVjdElkLCBuYW1lLCBpdGVyYXRvciwgY29udCk7XG4gIHZhciBtYWluVGFzayA9IHsgbmFtZTogbmFtZSwgY2FuY2VsOiBjYW5jZWxNYWluLCBpc1J1bm5pbmc6IHRydWUgfTtcbiAgdmFyIHRhc2tRdWV1ZSA9IGZvcmtRdWV1ZShuYW1lLCBtYWluVGFzaywgZW5kKTtcblxuICAvKipcclxuICAgIGNhbmNlbGxhdGlvbiBvZiB0aGUgbWFpbiB0YXNrLiBXZSdsbCBzaW1wbHkgcmVzdW1lIHRoZSBHZW5lcmF0b3Igd2l0aCBhIENhbmNlbFxyXG4gICoqL1xuICBmdW5jdGlvbiBjYW5jZWxNYWluKCkge1xuICAgIGlmIChtYWluVGFzay5pc1J1bm5pbmcgJiYgIW1haW5UYXNrLmlzQ2FuY2VsbGVkKSB7XG4gICAgICBtYWluVGFzay5pc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBuZXh0KFRBU0tfQ0FOQ0VMKTtcbiAgICB9XG4gIH1cblxuICAvKipcclxuICAgIFRoaXMgbWF5IGJlIGNhbGxlZCBieSBhIHBhcmVudCBnZW5lcmF0b3IgdG8gdHJpZ2dlci9wcm9wYWdhdGUgY2FuY2VsbGF0aW9uXHJcbiAgICBjYW5jZWwgYWxsIHBlbmRpbmcgdGFza3MgKGluY2x1ZGluZyB0aGUgbWFpbiB0YXNrKSwgdGhlbiBlbmQgdGhlIGN1cnJlbnQgdGFzay5cclxuICAgICAgQ2FuY2VsbGF0aW9uIHByb3BhZ2F0ZXMgZG93biB0byB0aGUgd2hvbGUgZXhlY3V0aW9uIHRyZWUgaG9sZGVkIGJ5IHRoaXMgUGFyZW50IHRhc2tcclxuICAgIEl0J3MgYWxzbyBwcm9wYWdhdGVkIHRvIGFsbCBqb2luZXJzIG9mIHRoaXMgdGFzayBhbmQgdGhlaXIgZXhlY3V0aW9uIHRyZWUvam9pbmVyc1xyXG4gICAgICBDYW5jZWxsYXRpb24gaXMgbm9vcCBmb3IgdGVybWluYXRlZC9DYW5jZWxsZWQgdGFza3MgdGFza3NcclxuICAqKi9cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIC8qKlxyXG4gICAgICBXZSBuZWVkIHRvIGNoZWNrIGJvdGggUnVubmluZyBhbmQgQ2FuY2VsbGVkIHN0YXR1c1xyXG4gICAgICBUYXNrcyBjYW4gYmUgQ2FuY2VsbGVkIGJ1dCBzdGlsbCBSdW5uaW5nXHJcbiAgICAqKi9cbiAgICBpZiAoaXRlcmF0b3IuX2lzUnVubmluZyAmJiAhaXRlcmF0b3IuX2lzQ2FuY2VsbGVkKSB7XG4gICAgICBpdGVyYXRvci5faXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgdGFza1F1ZXVlLmNhbmNlbEFsbCgpO1xuICAgICAgLyoqXHJcbiAgICAgICAgRW5kaW5nIHdpdGggYSBOZXZlciByZXN1bHQgd2lsbCBwcm9wYWdhdGUgdGhlIENhbmNlbGxhdGlvbiB0byBhbGwgam9pbmVyc1xyXG4gICAgICAqKi9cbiAgICAgIGVuZChUQVNLX0NBTkNFTCk7XG4gICAgfVxuICB9XG4gIC8qKlxyXG4gICAgYXR0YWNoZXMgY2FuY2VsbGF0aW9uIGxvZ2ljIHRvIHRoaXMgdGFzaydzIGNvbnRpbnVhdGlvblxyXG4gICAgdGhpcyB3aWxsIHBlcm1pdCBjYW5jZWxsYXRpb24gdG8gcHJvcGFnYXRlIGRvd24gdGhlIGNhbGwgY2hhaW5cclxuICAqKi9cbiAgY29udCAmJiAoY29udC5jYW5jZWwgPSBjYW5jZWwpO1xuXG4gIC8vIHRyYWNrcyB0aGUgcnVubmluZyBzdGF0dXNcbiAgaXRlcmF0b3IuX2lzUnVubmluZyA9IHRydWU7XG5cbiAgLy8ga2lja3MgdXAgdGhlIGdlbmVyYXRvclxuICBuZXh0KCk7XG5cbiAgLy8gdGhlbiByZXR1cm4gdGhlIHRhc2sgZGVzY3JpcHRvciB0byB0aGUgY2FsbGVyXG4gIHJldHVybiB0YXNrO1xuXG4gIC8qKlxyXG4gICAgVGhpcyBpcyB0aGUgZ2VuZXJhdG9yIGRyaXZlclxyXG4gICAgSXQncyBhIHJlY3Vyc2l2ZSBhc3luYy9jb250aW51YXRpb24gZnVuY3Rpb24gd2hpY2ggY2FsbHMgaXRzZWxmXHJcbiAgICB1bnRpbCB0aGUgZ2VuZXJhdG9yIHRlcm1pbmF0ZXMgb3IgdGhyb3dzXHJcbiAgKiovXG4gIGZ1bmN0aW9uIG5leHQoYXJnLCBpc0Vycikge1xuICAgIC8vIFByZXZlbnRpdmUgbWVhc3VyZS4gSWYgd2UgZW5kIHVwIGhlcmUsIHRoZW4gdGhlcmUgaXMgcmVhbGx5IHNvbWV0aGluZyB3cm9uZ1xuICAgIGlmICghbWFpblRhc2suaXNSdW5uaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byByZXN1bWUgYW4gYWxyZWFkeSBmaW5pc2hlZCBnZW5lcmF0b3InKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdmFyIHJlc3VsdCA9IHZvaWQgMDtcbiAgICAgIGlmIChpc0Vycikge1xuICAgICAgICByZXN1bHQgPSBpdGVyYXRvci50aHJvdyhhcmcpO1xuICAgICAgfSBlbHNlIGlmIChhcmcgPT09IFRBU0tfQ0FOQ0VMKSB7XG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgZ2V0dGluZyBUQVNLX0NBTkNFTCBhdXRvYW10aWNhbGx5IGNhbmNlbHMgdGhlIG1haW4gdGFza1xyXG4gICAgICAgICAgV2UgY2FuIGdldCB0aGlzIHZhbHVlIGhlcmVcclxuICAgICAgICAgICAgLSBCeSBjYW5jZWxsaW5nIHRoZSBwYXJlbnQgdGFzayBtYW51YWxseVxyXG4gICAgICAgICAgLSBCeSBqb2luaW5nIGEgQ2FuY2VsbGVkIHRhc2tcclxuICAgICAgICAqKi9cbiAgICAgICAgbWFpblRhc2suaXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAvKipcclxuICAgICAgICAgIENhbmNlbHMgdGhlIGN1cnJlbnQgZWZmZWN0OyB0aGlzIHdpbGwgcHJvcGFnYXRlIHRoZSBjYW5jZWxsYXRpb24gZG93biB0byBhbnkgY2FsbGVkIHRhc2tzXHJcbiAgICAgICAgKiovXG4gICAgICAgIG5leHQuY2FuY2VsKCk7XG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgSWYgdGhpcyBHZW5lcmF0b3IgaGFzIGEgYHJldHVybmAgbWV0aG9kIHRoZW4gaW52b2tlcyBpdFxyXG4gICAgICAgICAgVGhpbGwgd2lsbCBqdW1wIHRvIHRoZSBmaW5hbGx5IGJsb2NrXHJcbiAgICAgICAgKiovXG4gICAgICAgIHJlc3VsdCA9IF91dGlscy5pcy5mdW5jKGl0ZXJhdG9yLnJldHVybikgPyBpdGVyYXRvci5yZXR1cm4oVEFTS19DQU5DRUwpIDogeyBkb25lOiB0cnVlLCB2YWx1ZTogVEFTS19DQU5DRUwgfTtcbiAgICAgIH0gZWxzZSBpZiAoYXJnID09PSBDSEFOTkVMX0VORCkge1xuICAgICAgICAvLyBXZSBnZXQgQ0hBTk5FTF9FTkQgYnkgdGFraW5nIGZyb20gYSBjaGFubmVsIHRoYXQgZW5kZWQgdXNpbmcgYHRha2VgIChhbmQgbm90IGB0YWtlbWAgdXNlZCB0byB0cmFwIEVuZCBvZiBjaGFubmVscylcbiAgICAgICAgcmVzdWx0ID0gX3V0aWxzLmlzLmZ1bmMoaXRlcmF0b3IucmV0dXJuKSA/IGl0ZXJhdG9yLnJldHVybigpIDogeyBkb25lOiB0cnVlIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBpdGVyYXRvci5uZXh0KGFyZyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcmVzdWx0LmRvbmUpIHtcbiAgICAgICAgcnVuRWZmZWN0KHJlc3VsdC52YWx1ZSwgcGFyZW50RWZmZWN0SWQsICcnLCBuZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgVGhpcyBHZW5lcmF0b3IgaGFzIGVuZGVkLCB0ZXJtaW5hdGUgdGhlIG1haW4gdGFzayBhbmQgbm90aWZ5IHRoZSBmb3JrIHF1ZXVlXHJcbiAgICAgICAgKiovXG4gICAgICAgIG1haW5UYXNrLmlzTWFpblJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgbWFpblRhc2suY29udCAmJiBtYWluVGFzay5jb250KHJlc3VsdC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChtYWluVGFzay5pc0NhbmNlbGxlZCkge1xuICAgICAgICBsb2coJ2Vycm9yJywgJ3VuY2F1Z2h0IGF0ICcgKyBuYW1lLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIG1haW5UYXNrLmlzTWFpblJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgIG1haW5UYXNrLmNvbnQoZXJyb3IsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZChyZXN1bHQsIGlzRXJyKSB7XG4gICAgaXRlcmF0b3IuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgIHN0ZENoYW5uZWwuY2xvc2UoKTtcbiAgICBpZiAoIWlzRXJyKSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBUQVNLX0NBTkNFTCAmJiBpc0Rldikge1xuICAgICAgICBsb2coJ2luZm8nLCBuYW1lICsgJyBoYXMgYmVlbiBjYW5jZWxsZWQnLCAnJyk7XG4gICAgICB9XG4gICAgICBpdGVyYXRvci5fcmVzdWx0ID0gcmVzdWx0O1xuICAgICAgaXRlcmF0b3IuX2RlZmVycmVkRW5kICYmIGl0ZXJhdG9yLl9kZWZlcnJlZEVuZC5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXN1bHQuc2FnYVN0YWNrID0gJ2F0ICcgKyBuYW1lICsgJyBcXG4gJyArIChyZXN1bHQuc2FnYVN0YWNrIHx8IHJlc3VsdC5zdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIXRhc2suY29udCkge1xuICAgICAgICBsb2coJ2Vycm9yJywgJ3VuY2F1Z2h0JywgcmVzdWx0LnNhZ2FTdGFjayB8fCByZXN1bHQuc3RhY2spO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IgJiYgb25FcnJvcikge1xuICAgICAgICAgIG9uRXJyb3IocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaXRlcmF0b3IuX2Vycm9yID0gcmVzdWx0O1xuICAgICAgaXRlcmF0b3IuX2lzQWJvcnRlZCA9IHRydWU7XG4gICAgICBpdGVyYXRvci5fZGVmZXJyZWRFbmQgJiYgaXRlcmF0b3IuX2RlZmVycmVkRW5kLnJlamVjdChyZXN1bHQpO1xuICAgIH1cbiAgICB0YXNrLmNvbnQgJiYgdGFzay5jb250KHJlc3VsdCwgaXNFcnIpO1xuICAgIHRhc2suam9pbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChqKSB7XG4gICAgICByZXR1cm4gai5jYihyZXN1bHQsIGlzRXJyKTtcbiAgICB9KTtcbiAgICB0YXNrLmpvaW5lcnMgPSBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuRWZmZWN0KGVmZmVjdCwgcGFyZW50RWZmZWN0SWQpIHtcbiAgICB2YXIgbGFiZWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6ICcnO1xuICAgIHZhciBjYiA9IGFyZ3VtZW50c1szXTtcblxuICAgIHZhciBlZmZlY3RJZCA9ICgwLCBfdXRpbHMudWlkKSgpO1xuICAgIHNhZ2FNb25pdG9yICYmIHNhZ2FNb25pdG9yLmVmZmVjdFRyaWdnZXJlZCh7IGVmZmVjdElkOiBlZmZlY3RJZCwgcGFyZW50RWZmZWN0SWQ6IHBhcmVudEVmZmVjdElkLCBsYWJlbDogbGFiZWwsIGVmZmVjdDogZWZmZWN0IH0pO1xuXG4gICAgLyoqXHJcbiAgICAgIGNvbXBsZXRpb24gY2FsbGJhY2sgYW5kIGNhbmNlbCBjYWxsYmFjayBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlXHJcbiAgICAgIFdlIGNhbid0IGNhbmNlbCBhbiBhbHJlYWR5IGNvbXBsZXRlZCBlZmZlY3RcclxuICAgICAgQW5kIFdlIGNhbid0IGNvbXBsZXRlIGFuIGFscmVhZHkgY2FuY2VsbGVkIGVmZmVjdElkXHJcbiAgICAqKi9cbiAgICB2YXIgZWZmZWN0U2V0dGxlZCA9IHZvaWQgMDtcblxuICAgIC8vIENvbXBsZXRpb24gY2FsbGJhY2sgcGFzc2VkIHRvIHRoZSBhcHByb3ByaWF0ZSBlZmZlY3QgcnVubmVyXG4gICAgZnVuY3Rpb24gY3VyckNiKHJlcywgaXNFcnIpIHtcbiAgICAgIGlmIChlZmZlY3RTZXR0bGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZWZmZWN0U2V0dGxlZCA9IHRydWU7XG4gICAgICBjYi5jYW5jZWwgPSBfdXRpbHMubm9vcDsgLy8gZGVmZW5zaXZlIG1lYXN1cmVcbiAgICAgIGlmIChzYWdhTW9uaXRvcikge1xuICAgICAgICBpc0VyciA/IHNhZ2FNb25pdG9yLmVmZmVjdFJlamVjdGVkKGVmZmVjdElkLCByZXMpIDogc2FnYU1vbml0b3IuZWZmZWN0UmVzb2x2ZWQoZWZmZWN0SWQsIHJlcyk7XG4gICAgICB9XG5cbiAgICAgIGNiKHJlcywgaXNFcnIpO1xuICAgIH1cbiAgICAvLyB0cmFja3MgZG93biB0aGUgY3VycmVudCBjYW5jZWxcbiAgICBjdXJyQ2IuY2FuY2VsID0gX3V0aWxzLm5vb3A7XG5cbiAgICAvLyBzZXR1cCBjYW5jZWxsYXRpb24gbG9naWMgb24gdGhlIHBhcmVudCBjYlxuICAgIGNiLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHByZXZlbnRzIGNhbmNlbGxpbmcgYW4gYWxyZWFkeSBjb21wbGV0ZWQgZWZmZWN0XG4gICAgICBpZiAoZWZmZWN0U2V0dGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGVmZmVjdFNldHRsZWQgPSB0cnVlO1xuICAgICAgLyoqXHJcbiAgICAgICAgcHJvcGFnYXRlcyBjYW5jZWwgZG93bndhcmRcclxuICAgICAgICBjYXRjaCB1bmNhdWdodCBjYW5jZWxsYXRpb25zIGVycm9yczsgc2luY2Ugd2UgY2FuIG5vIGxvbmdlciBjYWxsIHRoZSBjb21wbGV0aW9uXHJcbiAgICAgICAgY2FsbGJhY2ssIGxvZyBlcnJvcnMgcmFpc2VkIGR1cmluZyBjYW5jZWxsYXRpb25zIGludG8gdGhlIGNvbnNvbGVcclxuICAgICAgKiovXG4gICAgICB0cnkge1xuICAgICAgICBjdXJyQ2IuY2FuY2VsKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgbG9nKCdlcnJvcicsICd1bmNhdWdodCBhdCAnICsgbmFtZSwgZXJyLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgY3VyckNiLmNhbmNlbCA9IF91dGlscy5ub29wOyAvLyBkZWZlbnNpdmUgbWVhc3VyZVxuXG4gICAgICBzYWdhTW9uaXRvciAmJiBzYWdhTW9uaXRvci5lZmZlY3RDYW5jZWxsZWQoZWZmZWN0SWQpO1xuICAgIH07XG5cbiAgICAvKipcclxuICAgICAgZWFjaCBlZmZlY3QgcnVubmVyIG11c3QgYXR0YWNoIGl0cyBvd24gbG9naWMgb2YgY2FuY2VsbGF0aW9uIHRvIHRoZSBwcm92aWRlZCBjYWxsYmFja1xyXG4gICAgICBpdCBhbGxvd3MgdGhpcyBnZW5lcmF0b3IgdG8gcHJvcGFnYXRlIGNhbmNlbGxhdGlvbiBkb3dud2FyZC5cclxuICAgICAgICBBVFRFTlRJT04hIGVmZmVjdCBydW5uZXJzIG11c3Qgc2V0dXAgdGhlIGNhbmNlbCBsb2dpYyBieSBzZXR0aW5nIGNiLmNhbmNlbCA9IFtjYW5jZWxNZXRob2RdXHJcbiAgICAgIEFuZCB0aGUgc2V0dXAgbXVzdCBvY2N1ciBiZWZvcmUgY2FsbGluZyB0aGUgY2FsbGJhY2tcclxuICAgICAgICBUaGlzIGlzIGEgc29ydCBvZiBpbnZlcnNpb24gb2YgY29udHJvbDogY2FsbGVkIGFzeW5jIGZ1bmN0aW9ucyBhcmUgcmVzcG9uc2libGVcclxuICAgICAgb2YgY29tcGxldGluZyB0aGUgZmxvdyBieSBjYWxsaW5nIHRoZSBwcm92aWRlZCBjb250aW51YXRpb247IHdoaWxlIGNhbGxlciBmdW5jdGlvbnNcclxuICAgICAgYXJlIHJlc3BvbnNpYmxlIGZvciBhYm9ydGluZyB0aGUgY3VycmVudCBmbG93IGJ5IGNhbGxpbmcgdGhlIGF0dGFjaGVkIGNhbmNlbCBmdW5jdGlvblxyXG4gICAgICAgIExpYnJhcnkgdXNlcnMgY2FuIGF0dGFjaCB0aGVpciBvd24gY2FuY2VsbGF0aW9uIGxvZ2ljIHRvIHByb21pc2VzIGJ5IGRlZmluaW5nIGFcclxuICAgICAgcHJvbWlzZVtDQU5DRUxdIG1ldGhvZCBpbiB0aGVpciByZXR1cm5lZCBwcm9taXNlc1xyXG4gICAgICBBVFRFTlRJT04hIGNhbGxpbmcgY2FuY2VsIG11c3QgaGF2ZSBubyBlZmZlY3Qgb24gYW4gYWxyZWFkeSBjb21wbGV0ZWQgb3IgY2FuY2VsbGVkIGVmZmVjdFxyXG4gICAgKiovXG4gICAgdmFyIGRhdGEgPSB2b2lkIDA7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIE5vbiBkZWNsYXJhdGl2ZSBlZmZlY3RcbiAgICAgIF91dGlscy5pcy5wcm9taXNlKGVmZmVjdCkgPyByZXNvbHZlUHJvbWlzZShlZmZlY3QsIGN1cnJDYikgOiBfdXRpbHMuaXMuaGVscGVyKGVmZmVjdCkgPyBydW5Gb3JrRWZmZWN0KHdyYXBIZWxwZXIoZWZmZWN0KSwgZWZmZWN0SWQsIGN1cnJDYikgOiBfdXRpbHMuaXMuaXRlcmF0b3IoZWZmZWN0KSA/IHJlc29sdmVJdGVyYXRvcihlZmZlY3QsIGVmZmVjdElkLCBuYW1lLCBjdXJyQ2IpXG5cbiAgICAgIC8vIGRlY2xhcmF0aXZlIGVmZmVjdHNcbiAgICAgIDogX3V0aWxzLmlzLmFycmF5KGVmZmVjdCkgPyBydW5QYXJhbGxlbEVmZmVjdChlZmZlY3QsIGVmZmVjdElkLCBjdXJyQ2IpIDogX3V0aWxzLmlzLm5vdFVuZGVmKGRhdGEgPSBfaW8uYXNFZmZlY3QudGFrZShlZmZlY3QpKSA/IHJ1blRha2VFZmZlY3QoZGF0YSwgY3VyckNiKSA6IF91dGlscy5pcy5ub3RVbmRlZihkYXRhID0gX2lvLmFzRWZmZWN0LnB1dChlZmZlY3QpKSA/IHJ1blB1dEVmZmVjdChkYXRhLCBjdXJyQ2IpIDogX3V0aWxzLmlzLm5vdFVuZGVmKGRhdGEgPSBfaW8uYXNFZmZlY3QucmFjZShlZmZlY3QpKSA/IHJ1blJhY2VFZmZlY3QoZGF0YSwgZWZmZWN0SWQsIGN1cnJDYikgOiBfdXRpbHMuaXMubm90VW5kZWYoZGF0YSA9IF9pby5hc0VmZmVjdC5jYWxsKGVmZmVjdCkpID8gcnVuQ2FsbEVmZmVjdChkYXRhLCBlZmZlY3RJZCwgY3VyckNiKSA6IF91dGlscy5pcy5ub3RVbmRlZihkYXRhID0gX2lvLmFzRWZmZWN0LmNwcyhlZmZlY3QpKSA/IHJ1bkNQU0VmZmVjdChkYXRhLCBjdXJyQ2IpIDogX3V0aWxzLmlzLm5vdFVuZGVmKGRhdGEgPSBfaW8uYXNFZmZlY3QuZm9yayhlZmZlY3QpKSA/IHJ1bkZvcmtFZmZlY3QoZGF0YSwgZWZmZWN0SWQsIGN1cnJDYikgOiBfdXRpbHMuaXMubm90VW5kZWYoZGF0YSA9IF9pby5hc0VmZmVjdC5qb2luKGVmZmVjdCkpID8gcnVuSm9pbkVmZmVjdChkYXRhLCBjdXJyQ2IpIDogX3V0aWxzLmlzLm5vdFVuZGVmKGRhdGEgPSBfaW8uYXNFZmZlY3QuY2FuY2VsKGVmZmVjdCkpID8gcnVuQ2FuY2VsRWZmZWN0KGRhdGEsIGN1cnJDYikgOiBfdXRpbHMuaXMubm90VW5kZWYoZGF0YSA9IF9pby5hc0VmZmVjdC5zZWxlY3QoZWZmZWN0KSkgPyBydW5TZWxlY3RFZmZlY3QoZGF0YSwgY3VyckNiKSA6IF91dGlscy5pcy5ub3RVbmRlZihkYXRhID0gX2lvLmFzRWZmZWN0LmFjdGlvbkNoYW5uZWwoZWZmZWN0KSkgPyBydW5DaGFubmVsRWZmZWN0KGRhdGEsIGN1cnJDYikgOiBfdXRpbHMuaXMubm90VW5kZWYoZGF0YSA9IF9pby5hc0VmZmVjdC5mbHVzaChlZmZlY3QpKSA/IHJ1bkZsdXNoRWZmZWN0KGRhdGEsIGN1cnJDYikgOiBfdXRpbHMuaXMubm90VW5kZWYoZGF0YSA9IF9pby5hc0VmZmVjdC5jYW5jZWxsZWQoZWZmZWN0KSkgPyBydW5DYW5jZWxsZWRFZmZlY3QoZGF0YSwgY3VyckNiKSA6IC8qIGFueXRoaW5nIGVsc2UgcmV0dXJuZWQgYXMgaXMgICAgICAgICovY3VyckNiKGVmZmVjdClcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZVByb21pc2UocHJvbWlzZSwgY2IpIHtcbiAgICB2YXIgY2FuY2VsUHJvbWlzZSA9IHByb21pc2VbX3V0aWxzLkNBTkNFTF07XG4gICAgaWYgKHR5cGVvZiBjYW5jZWxQcm9taXNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYi5jYW5jZWwgPSBjYW5jZWxQcm9taXNlO1xuICAgIH1cbiAgICBwcm9taXNlLnRoZW4oY2IsIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgcmV0dXJuIGNiKGVycm9yLCB0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmVJdGVyYXRvcihpdGVyYXRvciwgZWZmZWN0SWQsIG5hbWUsIGNiKSB7XG4gICAgcHJvYyhpdGVyYXRvciwgc3Vic2NyaWJlLCBkaXNwYXRjaCwgZ2V0U3RhdGUsIG9wdGlvbnMsIGVmZmVjdElkLCBuYW1lLCBjYik7XG4gIH1cblxuICBmdW5jdGlvbiBydW5UYWtlRWZmZWN0KF9yZWYyLCBjYikge1xuICAgIHZhciBjaGFubmVsID0gX3JlZjIuY2hhbm5lbCxcbiAgICAgICAgcGF0dGVybiA9IF9yZWYyLnBhdHRlcm4sXG4gICAgICAgIG1heWJlID0gX3JlZjIubWF5YmU7XG5cbiAgICBjaGFubmVsID0gY2hhbm5lbCB8fCBzdGRDaGFubmVsO1xuICAgIHZhciB0YWtlQ2IgPSBmdW5jdGlvbiB0YWtlQ2IoaW5wKSB7XG4gICAgICByZXR1cm4gaW5wIGluc3RhbmNlb2YgRXJyb3IgPyBjYihpbnAsIHRydWUpIDogKDAsIF9jaGFubmVsLmlzRW5kKShpbnApICYmICFtYXliZSA/IGNiKENIQU5ORUxfRU5EKSA6IGNiKGlucCk7XG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgY2hhbm5lbC50YWtlKHRha2VDYiwgbWF0Y2hlcihwYXR0ZXJuKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gY2IoZXJyLCB0cnVlKTtcbiAgICB9XG4gICAgY2IuY2FuY2VsID0gdGFrZUNiLmNhbmNlbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blB1dEVmZmVjdChfcmVmMywgY2IpIHtcbiAgICB2YXIgY2hhbm5lbCA9IF9yZWYzLmNoYW5uZWwsXG4gICAgICAgIGFjdGlvbiA9IF9yZWYzLmFjdGlvbixcbiAgICAgICAgc3luYyA9IF9yZWYzLnN5bmM7XG5cbiAgICAvKipcclxuICAgICAgU2NoZWR1bGUgdGhlIHB1dCBpbiBjYXNlIGFub3RoZXIgc2FnYSBpcyBob2xkaW5nIGEgbG9jay5cclxuICAgICAgVGhlIHB1dCB3aWxsIGJlIGV4ZWN1dGVkIGF0b21pY2FsbHkuIGllIG5lc3RlZCBwdXRzIHdpbGwgZXhlY3V0ZSBhZnRlclxyXG4gICAgICB0aGlzIHB1dCBoYXMgdGVybWluYXRlZC5cclxuICAgICoqL1xuICAgICgwLCBfc2NoZWR1bGVyLmFzYXApKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZXN1bHQgPSB2b2lkIDA7XG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSAoY2hhbm5lbCA/IGNoYW5uZWwucHV0IDogZGlzcGF0Y2gpKGFjdGlvbik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgY2hhbm5lbCBvciBgcHV0LnN5bmNgIHdhcyB1c2VkIHRoZW4gYnViYmxlIHVwIHRoZSBlcnJvci5cbiAgICAgICAgaWYgKGNoYW5uZWwgfHwgc3luYykgcmV0dXJuIGNiKGVycm9yLCB0cnVlKTtcbiAgICAgICAgbG9nKCdlcnJvcicsICd1bmNhdWdodCBhdCAnICsgbmFtZSwgZXJyb3Iuc3RhY2sgfHwgZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzeW5jICYmIF91dGlscy5pcy5wcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgcmVzb2x2ZVByb21pc2UocmVzdWx0LCBjYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2IocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBQdXQgZWZmZWN0cyBhcmUgbm9uIGNhbmNlbGxhYmxlc1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuQ2FsbEVmZmVjdChfcmVmNCwgZWZmZWN0SWQsIGNiKSB7XG4gICAgdmFyIGNvbnRleHQgPSBfcmVmNC5jb250ZXh0LFxuICAgICAgICBmbiA9IF9yZWY0LmZuLFxuICAgICAgICBhcmdzID0gX3JlZjQuYXJncztcblxuICAgIHZhciByZXN1bHQgPSB2b2lkIDA7XG4gICAgLy8gY2F0Y2ggc3luY2hyb25vdXMgZmFpbHVyZXM7IHNlZSAjMTUyXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2IoZXJyb3IsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gX3V0aWxzLmlzLnByb21pc2UocmVzdWx0KSA/IHJlc29sdmVQcm9taXNlKHJlc3VsdCwgY2IpIDogX3V0aWxzLmlzLml0ZXJhdG9yKHJlc3VsdCkgPyByZXNvbHZlSXRlcmF0b3IocmVzdWx0LCBlZmZlY3RJZCwgZm4ubmFtZSwgY2IpIDogY2IocmVzdWx0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkNQU0VmZmVjdChfcmVmNSwgY2IpIHtcbiAgICB2YXIgY29udGV4dCA9IF9yZWY1LmNvbnRleHQsXG4gICAgICAgIGZuID0gX3JlZjUuZm4sXG4gICAgICAgIGFyZ3MgPSBfcmVmNS5hcmdzO1xuXG4gICAgLy8gQ1BTIChpZSBub2RlIHN0eWxlIGZ1bmN0aW9ucykgY2FuIGRlZmluZSB0aGVpciBvd24gY2FuY2VsbGF0aW9uIGxvZ2ljXG4gICAgLy8gYnkgc2V0dGluZyBjYW5jZWwgZmllbGQgb24gdGhlIGNiXG5cbiAgICAvLyBjYXRjaCBzeW5jaHJvbm91cyBmYWlsdXJlczsgc2VlICMxNTJcbiAgICB0cnkge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNwc0NiID0gZnVuY3Rpb24gY3BzQ2IoZXJyLCByZXMpIHtcbiAgICAgICAgICByZXR1cm4gX3V0aWxzLmlzLnVuZGVmKGVycikgPyBjYihyZXMpIDogY2IoZXJyLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncy5jb25jYXQoY3BzQ2IpKTtcbiAgICAgICAgaWYgKGNwc0NiLmNhbmNlbCkge1xuICAgICAgICAgIGNiLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjcHNDYi5jYW5jZWwoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2IoZXJyb3IsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkZvcmtFZmZlY3QoX3JlZjYsIGVmZmVjdElkLCBjYikge1xuICAgIHZhciBjb250ZXh0ID0gX3JlZjYuY29udGV4dCxcbiAgICAgICAgZm4gPSBfcmVmNi5mbixcbiAgICAgICAgYXJncyA9IF9yZWY2LmFyZ3MsXG4gICAgICAgIGRldGFjaGVkID0gX3JlZjYuZGV0YWNoZWQ7XG5cbiAgICB2YXIgdGFza0l0ZXJhdG9yID0gY3JlYXRlVGFza0l0ZXJhdG9yKHsgY29udGV4dDogY29udGV4dCwgZm46IGZuLCBhcmdzOiBhcmdzIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgICgwLCBfc2NoZWR1bGVyLnN1c3BlbmQpKCk7XG4gICAgICB2YXIgX3Rhc2sgPSBwcm9jKHRhc2tJdGVyYXRvciwgc3Vic2NyaWJlLCBkaXNwYXRjaCwgZ2V0U3RhdGUsIG9wdGlvbnMsIGVmZmVjdElkLCBmbi5uYW1lLCBkZXRhY2hlZCA/IG51bGwgOiBfdXRpbHMubm9vcCk7XG5cbiAgICAgIGlmIChkZXRhY2hlZCkge1xuICAgICAgICBjYihfdGFzayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGFza0l0ZXJhdG9yLl9pc1J1bm5pbmcpIHtcbiAgICAgICAgICB0YXNrUXVldWUuYWRkVGFzayhfdGFzayk7XG4gICAgICAgICAgY2IoX3Rhc2spO1xuICAgICAgICB9IGVsc2UgaWYgKHRhc2tJdGVyYXRvci5fZXJyb3IpIHtcbiAgICAgICAgICB0YXNrUXVldWUuYWJvcnQodGFza0l0ZXJhdG9yLl9lcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2IoX3Rhc2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICgwLCBfc2NoZWR1bGVyLmZsdXNoKSgpO1xuICAgIH1cbiAgICAvLyBGb3JrIGVmZmVjdHMgYXJlIG5vbiBjYW5jZWxsYWJsZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkpvaW5FZmZlY3QodCwgY2IpIHtcbiAgICBpZiAodC5pc1J1bm5pbmcoKSkge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGpvaW5lciA9IHsgdGFzazogdGFzaywgY2I6IGNiIH07XG4gICAgICAgIGNiLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gKDAsIF91dGlscy5yZW1vdmUpKHQuam9pbmVycywgam9pbmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdC5qb2luZXJzLnB1c2goam9pbmVyKTtcbiAgICAgIH0pKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHQuaXNBYm9ydGVkKCkgPyBjYih0LmVycm9yKCksIHRydWUpIDogY2IodC5yZXN1bHQoKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcnVuQ2FuY2VsRWZmZWN0KHRhc2ssIGNiKSB7XG4gICAgaWYgKHRhc2suaXNSdW5uaW5nKCkpIHtcbiAgICAgIHRhc2suY2FuY2VsKCk7XG4gICAgfVxuICAgIGNiKCk7XG4gICAgLy8gY2FuY2VsIGVmZmVjdHMgYXJlIG5vbiBjYW5jZWxsYWJsZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBhcmFsbGVsRWZmZWN0KGVmZmVjdHMsIGVmZmVjdElkLCBjYikge1xuICAgIGlmICghZWZmZWN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBjYihbXSk7XG4gICAgfVxuXG4gICAgdmFyIGNvbXBsZXRlZENvdW50ID0gMDtcbiAgICB2YXIgY29tcGxldGVkID0gdm9pZCAwO1xuICAgIHZhciByZXN1bHRzID0gQXJyYXkoZWZmZWN0cy5sZW5ndGgpO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tFZmZlY3RFbmQoKSB7XG4gICAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGNiKHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGlsZENicyA9IGVmZmVjdHMubWFwKGZ1bmN0aW9uIChlZmYsIGlkeCkge1xuICAgICAgdmFyIGNoQ2JBdElkeCA9IGZ1bmN0aW9uIGNoQ2JBdElkeChyZXMsIGlzRXJyKSB7XG4gICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRXJyIHx8ICgwLCBfY2hhbm5lbC5pc0VuZCkocmVzKSB8fCByZXMgPT09IENIQU5ORUxfRU5EIHx8IHJlcyA9PT0gVEFTS19DQU5DRUwpIHtcbiAgICAgICAgICBjYi5jYW5jZWwoKTtcbiAgICAgICAgICBjYihyZXMsIGlzRXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzW2lkeF0gPSByZXM7XG4gICAgICAgICAgY29tcGxldGVkQ291bnQrKztcbiAgICAgICAgICBjaGVja0VmZmVjdEVuZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hDYkF0SWR4LmNhbmNlbCA9IF91dGlscy5ub29wO1xuICAgICAgcmV0dXJuIGNoQ2JBdElkeDtcbiAgICB9KTtcblxuICAgIGNiLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghY29tcGxldGVkKSB7XG4gICAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGNoaWxkQ2JzLmZvckVhY2goZnVuY3Rpb24gKGNoQ2IpIHtcbiAgICAgICAgICByZXR1cm4gY2hDYi5jYW5jZWwoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmLCBpZHgpIHtcbiAgICAgIHJldHVybiBydW5FZmZlY3QoZWZmLCBlZmZlY3RJZCwgaWR4LCBjaGlsZENic1tpZHhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blJhY2VFZmZlY3QoZWZmZWN0cywgZWZmZWN0SWQsIGNiKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IHZvaWQgMDtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGVmZmVjdHMpO1xuICAgIHZhciBjaGlsZENicyA9IHt9O1xuXG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBjaENiQXRLZXkgPSBmdW5jdGlvbiBjaENiQXRLZXkocmVzLCBpc0Vycikge1xuICAgICAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRXJyKSB7XG4gICAgICAgICAgLy8gUmFjZSBBdXRvIGNhbmNlbGxhdGlvblxuICAgICAgICAgIGNiLmNhbmNlbCgpO1xuICAgICAgICAgIGNiKHJlcywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoISgwLCBfY2hhbm5lbC5pc0VuZCkocmVzKSAmJiByZXMgIT09IENIQU5ORUxfRU5EICYmIHJlcyAhPT0gVEFTS19DQU5DRUwpIHtcbiAgICAgICAgICBjYi5jYW5jZWwoKTtcbiAgICAgICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgIGNiKF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5LCByZXMpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoQ2JBdEtleS5jYW5jZWwgPSBfdXRpbHMubm9vcDtcbiAgICAgIGNoaWxkQ2JzW2tleV0gPSBjaENiQXRLZXk7XG4gICAgfSk7XG5cbiAgICBjYi5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBwcmV2ZW50cyB1bm5lY2Vzc2FyeSBjYW5jZWxsYXRpb25cbiAgICAgIGlmICghY29tcGxldGVkKSB7XG4gICAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkQ2JzW2tleV0uY2FuY2VsKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcnVuRWZmZWN0KGVmZmVjdHNba2V5XSwgZWZmZWN0SWQsIGtleSwgY2hpbGRDYnNba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5TZWxlY3RFZmZlY3QoX3JlZjcsIGNiKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gX3JlZjcuc2VsZWN0b3IsXG4gICAgICAgIGFyZ3MgPSBfcmVmNy5hcmdzO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBzdGF0ZSA9IHNlbGVjdG9yLmFwcGx5KHVuZGVmaW5lZCwgW2dldFN0YXRlKCldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpKTtcbiAgICAgIGNiKHN0YXRlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2IoZXJyb3IsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkNoYW5uZWxFZmZlY3QoX3JlZjgsIGNiKSB7XG4gICAgdmFyIHBhdHRlcm4gPSBfcmVmOC5wYXR0ZXJuLFxuICAgICAgICBidWZmZXIgPSBfcmVmOC5idWZmZXI7XG5cbiAgICB2YXIgbWF0Y2ggPSBtYXRjaGVyKHBhdHRlcm4pO1xuICAgIG1hdGNoLnBhdHRlcm4gPSBwYXR0ZXJuO1xuICAgIGNiKCgwLCBfY2hhbm5lbC5ldmVudENoYW5uZWwpKHN1YnNjcmliZSwgYnVmZmVyIHx8IF9idWZmZXJzLmJ1ZmZlcnMuZml4ZWQoKSwgbWF0Y2gpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkNhbmNlbGxlZEVmZmVjdChkYXRhLCBjYikge1xuICAgIGNiKCEhbWFpblRhc2suaXNDYW5jZWxsZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuRmx1c2hFZmZlY3QoY2hhbm5lbCwgY2IpIHtcbiAgICBjaGFubmVsLmZsdXNoKGNiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld1Rhc2soaWQsIG5hbWUsIGl0ZXJhdG9yLCBjb250KSB7XG4gICAgdmFyIF9kb25lLCBfcmVmOSwgX211dGF0b3JNYXA7XG5cbiAgICBpdGVyYXRvci5fZGVmZXJyZWRFbmQgPSBudWxsO1xuICAgIHJldHVybiBfcmVmOSA9IHt9LCBfZGVmaW5lUHJvcGVydHkoX3JlZjksIF91dGlscy5UQVNLLCB0cnVlKSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAnaWQnLCBpZCksIF9kZWZpbmVQcm9wZXJ0eShfcmVmOSwgJ25hbWUnLCBuYW1lKSwgX2RvbmUgPSAnZG9uZScsIF9tdXRhdG9yTWFwID0ge30sIF9tdXRhdG9yTWFwW19kb25lXSA9IF9tdXRhdG9yTWFwW19kb25lXSB8fCB7fSwgX211dGF0b3JNYXBbX2RvbmVdLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpdGVyYXRvci5fZGVmZXJyZWRFbmQpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLl9kZWZlcnJlZEVuZC5wcm9taXNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRlZiA9ICgwLCBfdXRpbHMuZGVmZXJyZWQpKCk7XG4gICAgICAgIGl0ZXJhdG9yLl9kZWZlcnJlZEVuZCA9IGRlZjtcbiAgICAgICAgaWYgKCFpdGVyYXRvci5faXNSdW5uaW5nKSB7XG4gICAgICAgICAgaXRlcmF0b3IuX2Vycm9yID8gZGVmLnJlamVjdChpdGVyYXRvci5fZXJyb3IpIDogZGVmLnJlc29sdmUoaXRlcmF0b3IuX3Jlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlO1xuICAgICAgfVxuICAgIH0sIF9kZWZpbmVQcm9wZXJ0eShfcmVmOSwgJ2NvbnQnLCBjb250KSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAnam9pbmVycycsIFtdKSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAnY2FuY2VsJywgY2FuY2VsKSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAnaXNSdW5uaW5nJywgZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yLl9pc1J1bm5pbmc7XG4gICAgfSksIF9kZWZpbmVQcm9wZXJ0eShfcmVmOSwgJ2lzQ2FuY2VsbGVkJywgZnVuY3Rpb24gaXNDYW5jZWxsZWQoKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3IuX2lzQ2FuY2VsbGVkO1xuICAgIH0pLCBfZGVmaW5lUHJvcGVydHkoX3JlZjksICdpc0Fib3J0ZWQnLCBmdW5jdGlvbiBpc0Fib3J0ZWQoKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3IuX2lzQWJvcnRlZDtcbiAgICB9KSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAncmVzdWx0JywgZnVuY3Rpb24gcmVzdWx0KCkge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yLl9yZXN1bHQ7XG4gICAgfSksIF9kZWZpbmVQcm9wZXJ0eShfcmVmOSwgJ2Vycm9yJywgZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3IuX2Vycm9yO1xuICAgIH0pLCBfZGVmaW5lRW51bWVyYWJsZVByb3BlcnRpZXMoX3JlZjksIF9tdXRhdG9yTWFwKSwgX3JlZjk7XG4gIH1cbn0iXX0=