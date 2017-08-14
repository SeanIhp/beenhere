"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('../../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('../../npm/babel-runtime/helpers/toConsumableArray.js');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('../../npm/babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('../../npm/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('../../npm/babel-runtime/core-js/get-iterator.js');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = createDva;

var _labradorRedux = require('../../npm/labrador-redux/index.js');

var _redux = require('../../npm/redux/es/index.js');

var _middleware = require('../../npm/redux-saga/lib/internal/middleware.js');

var _middleware2 = _interopRequireDefault(_middleware);

var _effects = require('../../npm/redux-saga/effects.js');

var sagaEffects = _interopRequireWildcard(_effects);

var _isPlainObject = require('../../npm/is-plain-object/index.js');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _invariant = require('../../npm/invariant/browser.js');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('../../npm/warning/browser.js');

var _warning2 = _interopRequireDefault(_warning);

var _flatten = require('../../npm/flatten/index.js');

var _flatten2 = _interopRequireDefault(_flatten);

var _sagaHelpers = require('../../npm/redux-saga/lib/internal/sagaHelpers.js');

var _lodash = require('../../npm/lodash.isfunction/index.js');

var _lodash2 = _interopRequireDefault(_lodash);

var _handleActions = require('./handleActions.js');

var _handleActions2 = _interopRequireDefault(_handleActions);

var _plugin = require('./plugin.js');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEP = '/';

function createDva(createOpts) {
  var initialReducer = createOpts.initialReducer;

  /**
   * Create a dva instance.
   */

  return function dva() {
    var hooks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // history and initialState does not pass to plugin
    var initialState = hooks.initialState || {};
    delete hooks.initialState;

    var plugin = new _plugin2.default();
    plugin.use(hooks);

    var app = {
      // properties
      _models: [],
      _store: null,
      _plugin: plugin,
      // methods
      use: use,
      model: model,
      unmodel: unmodel,
      start: start
    };
    return app;

    // //////////////////////////////////
    // Methods

    /**
     * Register an object of hooks on the application.
     *
     * @param hooks
     */
    function use(hooks) {
      plugin.use(hooks);
    }

    /**
     * Register a model.
     *
     * @param model
     */
    function model(model) {
      this._models.push(checkModel(model));
    }

    // inject model dynamically
    function injectModel(createReducer, onError, unlisteners, m) {
      m = checkModel(m);
      this._models.push(m);
      var store = this._store;

      // reducers
      store.asyncReducers[m.namespace] = getReducer(m.reducers, m.state);
      store.replaceReducer(createReducer(store.asyncReducers));
      // effects
      if (m.effects) {
        store.runSaga(getSaga(m.effects, m, onError));
      }
      // subscriptions
      if (m.subscriptions) {
        unlisteners[m.namespace] = runSubscriptions(m.subscriptions, m, this, onError);
      }
    }

    // Unexpected key warn problem:
    // https://github.com/reactjs/redux/issues/1636
    function unmodel(createReducer, reducers, _unlisteners, namespace) {
      var store = this._store;

      // Delete reducers
      delete store.asyncReducers[namespace];
      delete reducers[namespace];
      store.replaceReducer(createReducer(store.asyncReducers));
      store.dispatch({ type: '@@dva/UPDATE' });

      // Cancel effects
      store.dispatch({ type: namespace + '/@@CANCEL_EFFECTS' });

      // unlisten subscrioptions
      if (_unlisteners[namespace]) {
        var _unlisteners$namespac = _unlisteners[namespace],
            unlisteners = _unlisteners$namespac.unlisteners,
            noneFunctionSubscriptions = _unlisteners$namespac.noneFunctionSubscriptions;

        (0, _warning2.default)(noneFunctionSubscriptions.length === 0, 'app.unmodel: subscription should return unlistener function, check these subscriptions ' + noneFunctionSubscriptions.join(', '));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(unlisteners), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var unlistener = _step.value;

            unlistener();
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

        delete _unlisteners[namespace];
      }

      // delete model from this._models
      this._models = this._models.filter(function (model) {
        return model.namespace !== namespace;
      });
    }

    /**
     * Start the application. Selector is optional. If no selector
     * arguments, it will return a function that return JSX elements.
     *
     */
    function start() {
      // error wrapper
      var onError = plugin.apply('onError', function (err) {
        throw new Error(err.stack || err);
      });
      var onErrorWrapper = function onErrorWrapper(err) {
        if (err) {
          if (typeof err === 'string') err = new Error(err);
          onError(err, app._store.dispatch);
        }
      };

      // internal model for destroy
      model.call(this, {
        namespace: '@@dva',
        state: 0,
        reducers: {
          UPDATE: function UPDATE(state) {
            return state + 1;
          }
        }
      });

      // get reducers and sagas from model
      var sagas = [];
      var reducers = (0, _extends3.default)({}, initialReducer);
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this._models), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var m = _step2.value;

          reducers[m.namespace] = getReducer(m.reducers, m.state);
          if (m.effects) sagas.push(getSaga(m.effects, m, onErrorWrapper));
        }

        // extra reducers
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

      var extraReducers = plugin.get('extraReducers');
      (0, _invariant2.default)((0, _keys2.default)(extraReducers).every(function (key) {
        return !(key in reducers);
      }), 'app.start: extraReducers is conflict with other reducers');

      // extra enhancers
      var extraEnhancers = plugin.get('extraEnhancers');
      (0, _invariant2.default)(Array.isArray(extraEnhancers), 'app.start: extraEnhancers should be array');

      // create store
      var extraMiddlewares = plugin.get('onAction');
      var reducerEnhancer = plugin.get('onReducer');
      var sagaMiddleware = (0, _middleware2.default)();
      var middlewares = [sagaMiddleware].concat((0, _toConsumableArray3.default)((0, _flatten2.default)(extraMiddlewares)));
      var enhancers = [_redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middlewares))].concat((0, _toConsumableArray3.default)(extraEnhancers));
      var store = this._store = (0, _redux.createStore)(createReducer(), initialState, _redux.compose.apply(undefined, (0, _toConsumableArray3.default)(enhancers)));

      function createReducer(asyncReducers) {
        return reducerEnhancer((0, _redux.combineReducers)((0, _extends3.default)({}, reducers, extraReducers, asyncReducers)));
      }

      // extend store
      store.runSaga = sagaMiddleware.run;
      store.asyncReducers = {};

      // store change
      var listeners = plugin.get('onStateChange');
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)(listeners), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var listener = _step3.value;

          store.subscribe(listener);
        }

        // start saga
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

      sagas.forEach(sagaMiddleware.run);

      // setStore
      store.close = function () {
        return store.dispatch(END);
      };
      (0, _labradorRedux.setStore)(store);

      // run subscriptions
      var unlisteners = {};
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)(this._models), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _model = _step4.value;

          if (_model.subscriptions) {
            unlisteners[_model.namespace] = runSubscriptions(_model.subscriptions, _model, this, onErrorWrapper);
          }
        }

        // inject model after start
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this.model = injectModel.bind(this, createReducer, onErrorWrapper, unlisteners);

      this.unmodel = unmodel.bind(this, createReducer, reducers, unlisteners);
    }

    // //////////////////////////////////
    // Helpers

    function checkModel(m) {
      // Clone model to avoid prefixing namespace multiple times
      var model = (0, _extends3.default)({}, m);
      var namespace = model.namespace,
          reducers = model.reducers,
          effects = model.effects;


      (0, _invariant2.default)(namespace, 'app.model: namespace should be defined');
      (0, _invariant2.default)(!app._models.some(function (model) {
        return model.namespace === namespace;
      }), 'app.model: namespace should be unique');
      (0, _invariant2.default)(!model.subscriptions || (0, _isPlainObject2.default)(model.subscriptions), 'app.model: subscriptions should be Object');
      (0, _invariant2.default)(!reducers || (0, _isPlainObject2.default)(reducers) || Array.isArray(reducers), 'app.model: reducers should be Object or array');
      (0, _invariant2.default)(!Array.isArray(reducers) || (0, _isPlainObject2.default)(reducers[0]) && typeof reducers[1] === 'function', 'app.model: reducers with array should be app.model({ reducers: [object, function] })');
      (0, _invariant2.default)(!effects || (0, _isPlainObject2.default)(effects), 'app.model: effects should be Object');

      function applyNamespace(type) {
        function getNamespacedReducers(reducers) {
          return (0, _keys2.default)(reducers).reduce(function (memo, key) {
            (0, _warning2.default)(key.indexOf('' + namespace + SEP) !== 0, 'app.model: ' + type.slice(0, -1) + ' ' + key + ' should not be prefixed with namespace ' + namespace);
            memo['' + namespace + SEP + key] = reducers[key];
            return memo;
          }, {});
        }

        if (model[type]) {
          if (type === 'reducers' && Array.isArray(model[type])) {
            model[type][0] = getNamespacedReducers(model[type][0]);
          } else {
            model[type] = getNamespacedReducers(model[type]);
          }
        }
      }

      applyNamespace('reducers');
      applyNamespace('effects');

      return model;
    }

    function getReducer(reducers, state) {
      // Support reducer enhancer
      // e.g. reducers: [realReducers, enhancer]
      if (Array.isArray(reducers)) {
        return reducers[1]((0, _handleActions2.default)(reducers[0], state));
      } else {
        return (0, _handleActions2.default)(reducers || {}, state);
      }
    }

    function getSaga(effects, model, onError) {
      return _regenerator2.default.mark(function _callee3() {
        var _this = this;

        var key;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = _regenerator2.default.keys(effects);

              case 1:
                if ((_context3.t1 = _context3.t0()).done) {
                  _context3.next = 7;
                  break;
                }

                key = _context3.t1.value;

                if (!Object.prototype.hasOwnProperty.call(effects, key)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.delegateYield(_regenerator2.default.mark(function _callee2() {
                  var watcher, task;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          watcher = getWatcher(key, effects[key], model, onError);
                          _context2.next = 3;
                          return sagaEffects.fork(watcher);

                        case 3:
                          task = _context2.sent;
                          _context2.next = 6;
                          return sagaEffects.fork(_regenerator2.default.mark(function _callee() {
                            return _regenerator2.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return sagaEffects.take(model.namespace + '/@@CANCEL_EFFECTS');

                                  case 2:
                                    _context.next = 4;
                                    return sagaEffects.cancel(task);

                                  case 4:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            }, _callee, this);
                          }));

                        case 6:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this);
                })(), 't2', 5);

              case 5:
                _context3.next = 1;
                break;

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      });
    }

    function getWatcher(key, _effect, model, onError) {
      var _marked = [sagaWithCatch].map(_regenerator2.default.mark);

      var effect = _effect;
      var type = 'takeEvery';
      var ms = void 0;

      if (Array.isArray(_effect)) {
        effect = _effect[0];
        var opts = _effect[1];
        if (opts && opts.type) {
          type = opts.type;
          if (type === 'throttle') {
            (0, _invariant2.default)(opts.ms, 'app.start: opts.ms should be defined if type is throttle');
            ms = opts.ms;
          }
        }
        (0, _invariant2.default)(['watcher', 'takeEvery', 'takeLatest', 'throttle'].indexOf(type) > -1, 'app.start: effect type should be takeEvery, takeLatest, throttle or watcher');
      }

      function sagaWithCatch() {
        var _len,
            args,
            _key,
            _args4 = arguments;

        return _regenerator2.default.wrap(function sagaWithCatch$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                for (_len = _args4.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args4[_key];
                }

                _context4.next = 4;
                return effect.apply(undefined, (0, _toConsumableArray3.default)(args.concat(createEffects(model))));

              case 4:
                _context4.next = 9;
                break;

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4['catch'](0);

                onError(_context4.t0);

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _marked[0], this, [[0, 6]]);
      }

      var onEffect = plugin.get('onEffect');
      var sagaWithOnEffect = applyOnEffect(onEffect, sagaWithCatch, model, key);

      switch (type) {
        case 'watcher':
          return sagaWithCatch;
        case 'takeLatest':
          return _regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return (0, _sagaHelpers.takeLatest)(key, sagaWithOnEffect);

                  case 2:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee4, this);
          });
        case 'throttle':
          return _regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return (0, _sagaHelpers.throttle)(ms, key, sagaWithOnEffect);

                  case 2:
                  case 'end':
                    return _context6.stop();
                }
              }
            }, _callee5, this);
          });
        default:
          return _regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return (0, _sagaHelpers.takeEvery)(key, sagaWithOnEffect);

                  case 2:
                  case 'end':
                    return _context7.stop();
                }
              }
            }, _callee6, this);
          });
      }
    }

    function runSubscriptions(subs, model, app, onError) {
      var unlisteners = [];
      var noneFunctionSubscriptions = [];
      for (var key in subs) {
        if (Object.prototype.hasOwnProperty.call(subs, key)) {
          var sub = subs[key];
          (0, _invariant2.default)(typeof sub === 'function', 'app.start: subscription should be function');
          var unlistener = sub({
            dispatch: createDispatch(app._store.dispatch, model),
            history: app._history
          }, onError);
          if ((0, _lodash2.default)(unlistener)) {
            unlisteners.push(unlistener);
          } else {
            noneFunctionSubscriptions.push(key);
          }
        }
      }
      return { unlisteners: unlisteners, noneFunctionSubscriptions: noneFunctionSubscriptions };
    }

    function prefixType(type, model) {
      var prefixedType = '' + model.namespace + SEP + type;
      if (model.reducers && model.reducers[prefixedType] || model.effects && model.effects[prefixedType]) {
        return prefixedType;
      }
      return type;
    }

    function createEffects(model) {
      function put(action) {
        var type = action.type;

        (0, _invariant2.default)(type, 'dispatch: action should be a plain Object with type');
        (0, _warning2.default)(type.indexOf('' + model.namespace + SEP) !== 0, 'effects.put: ' + type + ' should not be prefixed with namespace ' + model.namespace);
        return sagaEffects.put((0, _extends3.default)({}, action, { type: prefixType(type, model) }));
      }
      return (0, _extends3.default)({}, sagaEffects, { put: put });
    }

    function createDispatch(dispatch, model) {
      return function (action) {
        var type = action.type;

        (0, _invariant2.default)(type, 'dispatch: action should be a plain Object with type');
        (0, _warning2.default)(type.indexOf('' + model.namespace + SEP) !== 0, 'dispatch: ' + type + ' should not be prefixed with namespace ' + model.namespace);
        return dispatch((0, _extends3.default)({}, action, { type: prefixType(type, model) }));
      };
    }

    function applyOnEffect(fns, effect, model, key) {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = (0, _getIterator3.default)(fns), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var fn = _step5.value;

          effect = fn(effect, sagaEffects, model, key);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return effect;
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUR2YS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVEdmEiLCJzYWdhRWZmZWN0cyIsIlNFUCIsImNyZWF0ZU9wdHMiLCJpbml0aWFsUmVkdWNlciIsImR2YSIsImhvb2tzIiwiaW5pdGlhbFN0YXRlIiwicGx1Z2luIiwidXNlIiwiYXBwIiwiX21vZGVscyIsIl9zdG9yZSIsIl9wbHVnaW4iLCJtb2RlbCIsInVubW9kZWwiLCJzdGFydCIsInB1c2giLCJjaGVja01vZGVsIiwiaW5qZWN0TW9kZWwiLCJjcmVhdGVSZWR1Y2VyIiwib25FcnJvciIsInVubGlzdGVuZXJzIiwibSIsInN0b3JlIiwiYXN5bmNSZWR1Y2VycyIsIm5hbWVzcGFjZSIsImdldFJlZHVjZXIiLCJyZWR1Y2VycyIsInN0YXRlIiwicmVwbGFjZVJlZHVjZXIiLCJlZmZlY3RzIiwicnVuU2FnYSIsImdldFNhZ2EiLCJzdWJzY3JpcHRpb25zIiwicnVuU3Vic2NyaXB0aW9ucyIsIl91bmxpc3RlbmVycyIsImRpc3BhdGNoIiwidHlwZSIsIm5vbmVGdW5jdGlvblN1YnNjcmlwdGlvbnMiLCJsZW5ndGgiLCJqb2luIiwidW5saXN0ZW5lciIsImZpbHRlciIsImFwcGx5IiwiZXJyIiwiRXJyb3IiLCJzdGFjayIsIm9uRXJyb3JXcmFwcGVyIiwiY2FsbCIsIlVQREFURSIsInNhZ2FzIiwiZXh0cmFSZWR1Y2VycyIsImdldCIsImV2ZXJ5Iiwia2V5IiwiZXh0cmFFbmhhbmNlcnMiLCJBcnJheSIsImlzQXJyYXkiLCJleHRyYU1pZGRsZXdhcmVzIiwicmVkdWNlckVuaGFuY2VyIiwic2FnYU1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlcyIsImVuaGFuY2VycyIsInJ1biIsImxpc3RlbmVycyIsImxpc3RlbmVyIiwic3Vic2NyaWJlIiwiZm9yRWFjaCIsImNsb3NlIiwiRU5EIiwiYmluZCIsInNvbWUiLCJhcHBseU5hbWVzcGFjZSIsImdldE5hbWVzcGFjZWRSZWR1Y2VycyIsInJlZHVjZSIsIm1lbW8iLCJpbmRleE9mIiwic2xpY2UiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsIndhdGNoZXIiLCJnZXRXYXRjaGVyIiwiZm9yayIsInRhc2siLCJ0YWtlIiwiY2FuY2VsIiwiX2VmZmVjdCIsInNhZ2FXaXRoQ2F0Y2giLCJlZmZlY3QiLCJtcyIsIm9wdHMiLCJhcmdzIiwiY29uY2F0IiwiY3JlYXRlRWZmZWN0cyIsIm9uRWZmZWN0Iiwic2FnYVdpdGhPbkVmZmVjdCIsImFwcGx5T25FZmZlY3QiLCJzdWJzIiwic3ViIiwiY3JlYXRlRGlzcGF0Y2giLCJoaXN0b3J5IiwiX2hpc3RvcnkiLCJwcmVmaXhUeXBlIiwicHJlZml4ZWRUeXBlIiwicHV0IiwiYWN0aW9uIiwiZm5zIiwiZm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQW1Cd0JBLFM7O0FBbkJ4Qjs7QUFDQTs7QUFDQTs7OztBQUNBOztJQUFZQyxXOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1DLE1BQU0sR0FBWjs7QUFFZSxTQUFTRixTQUFULENBQW1CRyxVQUFuQixFQUErQjtBQUFBLE1BRTFDQyxjQUYwQyxHQUd4Q0QsVUFId0MsQ0FFMUNDLGNBRjBDOztBQUs1Qzs7OztBQUdBLFNBQU8sU0FBU0MsR0FBVCxHQUF5QjtBQUFBLFFBQVpDLEtBQVksdUVBQUosRUFBSTs7QUFDOUI7QUFDQSxRQUFNQyxlQUFlRCxNQUFNQyxZQUFOLElBQXNCLEVBQTNDO0FBQ0EsV0FBT0QsTUFBTUMsWUFBYjs7QUFFQSxRQUFNQyxTQUFTLHNCQUFmO0FBQ0FBLFdBQU9DLEdBQVAsQ0FBV0gsS0FBWDs7QUFFQSxRQUFNSSxNQUFNO0FBQ1Y7QUFDQUMsZUFBUyxFQUZDO0FBR1ZDLGNBQVEsSUFIRTtBQUlWQyxlQUFTTCxNQUpDO0FBS1Y7QUFDQUMsY0FOVTtBQU9WSyxrQkFQVTtBQVFWQyxzQkFSVTtBQVNWQztBQVRV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V0FBWCxFQUF3QmEsS0FBeEIsRUFBK0J5QyxHQUEvQixDQUFUO0FBQ0Q7QUFINkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJOUMsYUFBT21DLE1BQVA7QUFDRDtBQUNGLEdBN1lEO0FBOFlEIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXRTdG9yZSB9IGZyb20gJ2xhYnJhZG9yLXJlZHV4JztcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSwgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgY3JlYXRlU2FnYU1pZGRsZXdhcmUgZnJvbSAncmVkdXgtc2FnYS9saWIvaW50ZXJuYWwvbWlkZGxld2FyZSc7XHJcbmltcG9ydCAqIGFzIHNhZ2FFZmZlY3RzIGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XHJcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2lzLXBsYWluLW9iamVjdCc7XHJcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50JztcclxuaW1wb3J0IHdhcm5pbmcgZnJvbSAnd2FybmluZyc7XHJcbmltcG9ydCBmbGF0dGVuIGZyb20gJ2ZsYXR0ZW4nO1xyXG5pbXBvcnQge1xyXG4gIHRha2VFdmVyeSxcclxuICB0YWtlTGF0ZXN0LFxyXG4gIHRocm90dGxlLFxyXG59IGZyb20gJ3JlZHV4LXNhZ2EvbGliL2ludGVybmFsL3NhZ2FIZWxwZXJzJztcclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoLmlzZnVuY3Rpb24nO1xyXG5pbXBvcnQgaGFuZGxlQWN0aW9ucyBmcm9tICcuL2hhbmRsZUFjdGlvbnMnO1xyXG5pbXBvcnQgUGx1Z2luIGZyb20gJy4vcGx1Z2luJztcclxuXHJcbmNvbnN0IFNFUCA9ICcvJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUR2YShjcmVhdGVPcHRzKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgaW5pdGlhbFJlZHVjZXIsXHJcbiAgfSA9IGNyZWF0ZU9wdHM7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIGR2YSBpbnN0YW5jZS5cclxuICAgKi9cclxuICByZXR1cm4gZnVuY3Rpb24gZHZhKGhvb2tzID0ge30pIHtcclxuICAgIC8vIGhpc3RvcnkgYW5kIGluaXRpYWxTdGF0ZSBkb2VzIG5vdCBwYXNzIHRvIHBsdWdpblxyXG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0gaG9va3MuaW5pdGlhbFN0YXRlIHx8IHt9O1xyXG4gICAgZGVsZXRlIGhvb2tzLmluaXRpYWxTdGF0ZTtcclxuXHJcbiAgICBjb25zdCBwbHVnaW4gPSBuZXcgUGx1Z2luKCk7XHJcbiAgICBwbHVnaW4udXNlKGhvb2tzKTtcclxuXHJcbiAgICBjb25zdCBhcHAgPSB7XHJcbiAgICAgIC8vIHByb3BlcnRpZXNcclxuICAgICAgX21vZGVsczogW10sXHJcbiAgICAgIF9zdG9yZTogbnVsbCxcclxuICAgICAgX3BsdWdpbjogcGx1Z2luLFxyXG4gICAgICAvLyBtZXRob2RzXHJcbiAgICAgIHVzZSxcclxuICAgICAgbW9kZWwsXHJcbiAgICAgIHVubW9kZWwsXHJcbiAgICAgIHN0YXJ0LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBhcHA7XHJcblxyXG4gICAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gTWV0aG9kc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYW4gb2JqZWN0IG9mIGhvb2tzIG9uIHRoZSBhcHBsaWNhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaG9va3NcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gdXNlKGhvb2tzKSB7XHJcbiAgICAgIHBsdWdpbi51c2UoaG9va3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYSBtb2RlbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbW9kZWxcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gbW9kZWwobW9kZWwpIHtcclxuICAgICAgdGhpcy5fbW9kZWxzLnB1c2goY2hlY2tNb2RlbChtb2RlbCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGluamVjdCBtb2RlbCBkeW5hbWljYWxseVxyXG4gICAgZnVuY3Rpb24gaW5qZWN0TW9kZWwoY3JlYXRlUmVkdWNlciwgb25FcnJvciwgdW5saXN0ZW5lcnMsIG0pIHtcclxuICAgICAgbSA9IGNoZWNrTW9kZWwobSk7XHJcbiAgICAgIHRoaXMuX21vZGVscy5wdXNoKG0pO1xyXG4gICAgICBjb25zdCBzdG9yZSA9IHRoaXMuX3N0b3JlO1xyXG5cclxuICAgICAgLy8gcmVkdWNlcnNcclxuICAgICAgc3RvcmUuYXN5bmNSZWR1Y2Vyc1ttLm5hbWVzcGFjZV0gPSBnZXRSZWR1Y2VyKG0ucmVkdWNlcnMsIG0uc3RhdGUpO1xyXG4gICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihjcmVhdGVSZWR1Y2VyKHN0b3JlLmFzeW5jUmVkdWNlcnMpKTtcclxuICAgICAgLy8gZWZmZWN0c1xyXG4gICAgICBpZiAobS5lZmZlY3RzKSB7XHJcbiAgICAgICAgc3RvcmUucnVuU2FnYShnZXRTYWdhKG0uZWZmZWN0cywgbSwgb25FcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHN1YnNjcmlwdGlvbnNcclxuICAgICAgaWYgKG0uc3Vic2NyaXB0aW9ucykge1xyXG4gICAgICAgIHVubGlzdGVuZXJzW20ubmFtZXNwYWNlXSA9IHJ1blN1YnNjcmlwdGlvbnMobS5zdWJzY3JpcHRpb25zLCBtLCB0aGlzLCBvbkVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFVuZXhwZWN0ZWQga2V5IHdhcm4gcHJvYmxlbTpcclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdGpzL3JlZHV4L2lzc3Vlcy8xNjM2XHJcbiAgICBmdW5jdGlvbiB1bm1vZGVsKGNyZWF0ZVJlZHVjZXIsIHJlZHVjZXJzLCBfdW5saXN0ZW5lcnMsIG5hbWVzcGFjZSkge1xyXG4gICAgICBjb25zdCBzdG9yZSA9IHRoaXMuX3N0b3JlO1xyXG5cclxuICAgICAgLy8gRGVsZXRlIHJlZHVjZXJzXHJcbiAgICAgIGRlbGV0ZSBzdG9yZS5hc3luY1JlZHVjZXJzW25hbWVzcGFjZV07XHJcbiAgICAgIGRlbGV0ZSByZWR1Y2Vyc1tuYW1lc3BhY2VdO1xyXG4gICAgICBzdG9yZS5yZXBsYWNlUmVkdWNlcihjcmVhdGVSZWR1Y2VyKHN0b3JlLmFzeW5jUmVkdWNlcnMpKTtcclxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnQEBkdmEvVVBEQVRFJyB9KTtcclxuXHJcbiAgICAgIC8vIENhbmNlbCBlZmZlY3RzXHJcbiAgICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogYCR7bmFtZXNwYWNlfS9AQENBTkNFTF9FRkZFQ1RTYCB9KTtcclxuXHJcbiAgICAgIC8vIHVubGlzdGVuIHN1YnNjcmlvcHRpb25zXHJcbiAgICAgIGlmIChfdW5saXN0ZW5lcnNbbmFtZXNwYWNlXSkge1xyXG4gICAgICAgIGNvbnN0IHsgdW5saXN0ZW5lcnMsIG5vbmVGdW5jdGlvblN1YnNjcmlwdGlvbnMgfSA9IF91bmxpc3RlbmVyc1tuYW1lc3BhY2VdO1xyXG4gICAgICAgIHdhcm5pbmcoXHJcbiAgICAgICAgICBub25lRnVuY3Rpb25TdWJzY3JpcHRpb25zLmxlbmd0aCA9PT0gMCxcclxuICAgICAgICAgIGBhcHAudW5tb2RlbDogc3Vic2NyaXB0aW9uIHNob3VsZCByZXR1cm4gdW5saXN0ZW5lciBmdW5jdGlvbiwgY2hlY2sgdGhlc2Ugc3Vic2NyaXB0aW9ucyAke25vbmVGdW5jdGlvblN1YnNjcmlwdGlvbnMuam9pbignLCAnKX1gLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZm9yIChjb25zdCB1bmxpc3RlbmVyIG9mIHVubGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICB1bmxpc3RlbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSBfdW5saXN0ZW5lcnNbbmFtZXNwYWNlXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZGVsZXRlIG1vZGVsIGZyb20gdGhpcy5fbW9kZWxzXHJcbiAgICAgIHRoaXMuX21vZGVscyA9IHRoaXMuX21vZGVscy5maWx0ZXIobW9kZWwgPT4gbW9kZWwubmFtZXNwYWNlICE9PSBuYW1lc3BhY2UpO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IHRoZSBhcHBsaWNhdGlvbi4gU2VsZWN0b3IgaXMgb3B0aW9uYWwuIElmIG5vIHNlbGVjdG9yXHJcbiAgICAgKiBhcmd1bWVudHMsIGl0IHdpbGwgcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCByZXR1cm4gSlNYIGVsZW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICAgIC8vIGVycm9yIHdyYXBwZXJcclxuICAgICAgY29uc3Qgb25FcnJvciA9IHBsdWdpbi5hcHBseSgnb25FcnJvcicsIChlcnIpID0+IHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyLnN0YWNrIHx8IGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBvbkVycm9yV3JhcHBlciA9IChlcnIpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGVyciA9PT0gJ3N0cmluZycpIGVyciA9IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICAgICAgb25FcnJvcihlcnIsIGFwcC5fc3RvcmUuZGlzcGF0Y2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIGludGVybmFsIG1vZGVsIGZvciBkZXN0cm95XHJcbiAgICAgIG1vZGVsLmNhbGwodGhpcywge1xyXG4gICAgICAgIG5hbWVzcGFjZTogJ0BAZHZhJyxcclxuICAgICAgICBzdGF0ZTogMCxcclxuICAgICAgICByZWR1Y2Vyczoge1xyXG4gICAgICAgICAgVVBEQVRFKHN0YXRlKSB7IHJldHVybiBzdGF0ZSArIDE7IH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBnZXQgcmVkdWNlcnMgYW5kIHNhZ2FzIGZyb20gbW9kZWxcclxuICAgICAgY29uc3Qgc2FnYXMgPSBbXTtcclxuICAgICAgY29uc3QgcmVkdWNlcnMgPSB7IC4uLmluaXRpYWxSZWR1Y2VyIH07XHJcbiAgICAgIGZvciAoY29uc3QgbSBvZiB0aGlzLl9tb2RlbHMpIHtcclxuICAgICAgICByZWR1Y2Vyc1ttLm5hbWVzcGFjZV0gPSBnZXRSZWR1Y2VyKG0ucmVkdWNlcnMsIG0uc3RhdGUpO1xyXG4gICAgICAgIGlmIChtLmVmZmVjdHMpIHNhZ2FzLnB1c2goZ2V0U2FnYShtLmVmZmVjdHMsIG0sIG9uRXJyb3JXcmFwcGVyKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGV4dHJhIHJlZHVjZXJzXHJcbiAgICAgIGNvbnN0IGV4dHJhUmVkdWNlcnMgPSBwbHVnaW4uZ2V0KCdleHRyYVJlZHVjZXJzJyk7XHJcbiAgICAgIGludmFyaWFudChcclxuICAgICAgICBPYmplY3Qua2V5cyhleHRyYVJlZHVjZXJzKS5ldmVyeShrZXkgPT4gIShrZXkgaW4gcmVkdWNlcnMpKSxcclxuICAgICAgICAnYXBwLnN0YXJ0OiBleHRyYVJlZHVjZXJzIGlzIGNvbmZsaWN0IHdpdGggb3RoZXIgcmVkdWNlcnMnLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gZXh0cmEgZW5oYW5jZXJzXHJcbiAgICAgIGNvbnN0IGV4dHJhRW5oYW5jZXJzID0gcGx1Z2luLmdldCgnZXh0cmFFbmhhbmNlcnMnKTtcclxuICAgICAgaW52YXJpYW50KFxyXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZXh0cmFFbmhhbmNlcnMpLFxyXG4gICAgICAgICdhcHAuc3RhcnQ6IGV4dHJhRW5oYW5jZXJzIHNob3VsZCBiZSBhcnJheScsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBjcmVhdGUgc3RvcmVcclxuICAgICAgY29uc3QgZXh0cmFNaWRkbGV3YXJlcyA9IHBsdWdpbi5nZXQoJ29uQWN0aW9uJyk7XHJcbiAgICAgIGNvbnN0IHJlZHVjZXJFbmhhbmNlciA9IHBsdWdpbi5nZXQoJ29uUmVkdWNlcicpO1xyXG4gICAgICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XHJcbiAgICAgIGxldCBtaWRkbGV3YXJlcyA9IFtcclxuICAgICAgICBzYWdhTWlkZGxld2FyZSxcclxuICAgICAgICAuLi5mbGF0dGVuKGV4dHJhTWlkZGxld2FyZXMpLFxyXG4gICAgICBdO1xyXG4gICAgICBjb25zdCBlbmhhbmNlcnMgPSBbXHJcbiAgICAgICAgYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmVzKSxcclxuICAgICAgICAuLi5leHRyYUVuaGFuY2VycyxcclxuICAgICAgXTtcclxuICAgICAgY29uc3Qgc3RvcmUgPSB0aGlzLl9zdG9yZSA9IGNyZWF0ZVN0b3JlKFxyXG4gICAgICAgIGNyZWF0ZVJlZHVjZXIoKSxcclxuICAgICAgICBpbml0aWFsU3RhdGUsXHJcbiAgICAgICAgY29tcG9zZSguLi5lbmhhbmNlcnMpLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgZnVuY3Rpb24gY3JlYXRlUmVkdWNlcihhc3luY1JlZHVjZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlZHVjZXJFbmhhbmNlcihjb21iaW5lUmVkdWNlcnMoe1xyXG4gICAgICAgICAgLi4ucmVkdWNlcnMsXHJcbiAgICAgICAgICAuLi5leHRyYVJlZHVjZXJzLFxyXG4gICAgICAgICAgLi4uYXN5bmNSZWR1Y2VycyxcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGV4dGVuZCBzdG9yZVxyXG4gICAgICBzdG9yZS5ydW5TYWdhID0gc2FnYU1pZGRsZXdhcmUucnVuO1xyXG4gICAgICBzdG9yZS5hc3luY1JlZHVjZXJzID0ge307XHJcblxyXG4gICAgICAvLyBzdG9yZSBjaGFuZ2VcclxuICAgICAgY29uc3QgbGlzdGVuZXJzID0gcGx1Z2luLmdldCgnb25TdGF0ZUNoYW5nZScpO1xyXG4gICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG4gICAgICAgIHN0b3JlLnN1YnNjcmliZShsaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHN0YXJ0IHNhZ2FcclxuICAgICAgc2FnYXMuZm9yRWFjaChzYWdhTWlkZGxld2FyZS5ydW4pO1xyXG5cclxuICAgICAgLy8gc2V0U3RvcmVcclxuICAgICAgc3RvcmUuY2xvc2UgPSAoKSA9PiBzdG9yZS5kaXNwYXRjaChFTkQpO1xyXG4gICAgICBzZXRTdG9yZShzdG9yZSk7XHJcblxyXG4gICAgICAvLyBydW4gc3Vic2NyaXB0aW9uc1xyXG4gICAgICBjb25zdCB1bmxpc3RlbmVycyA9IHt9O1xyXG4gICAgICBmb3IgKGNvbnN0IG1vZGVsIG9mIHRoaXMuX21vZGVscykge1xyXG4gICAgICAgIGlmIChtb2RlbC5zdWJzY3JpcHRpb25zKSB7XHJcbiAgICAgICAgICB1bmxpc3RlbmVyc1ttb2RlbC5uYW1lc3BhY2VdID0gcnVuU3Vic2NyaXB0aW9ucyhtb2RlbC5zdWJzY3JpcHRpb25zLCBtb2RlbCwgdGhpcyxcclxuICAgICAgICAgICAgb25FcnJvcldyYXBwZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaW5qZWN0IG1vZGVsIGFmdGVyIHN0YXJ0XHJcbiAgICAgIHRoaXMubW9kZWwgPSBpbmplY3RNb2RlbC5iaW5kKHRoaXMsIGNyZWF0ZVJlZHVjZXIsIG9uRXJyb3JXcmFwcGVyLCB1bmxpc3RlbmVycyk7XHJcblxyXG4gICAgICB0aGlzLnVubW9kZWwgPSB1bm1vZGVsLmJpbmQodGhpcywgY3JlYXRlUmVkdWNlciwgcmVkdWNlcnMsIHVubGlzdGVuZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBIZWxwZXJzXHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tNb2RlbChtKSB7XHJcbiAgICAgIC8vIENsb25lIG1vZGVsIHRvIGF2b2lkIHByZWZpeGluZyBuYW1lc3BhY2UgbXVsdGlwbGUgdGltZXNcclxuICAgICAgY29uc3QgbW9kZWwgPSB7IC4uLm0gfTtcclxuICAgICAgY29uc3QgeyBuYW1lc3BhY2UsIHJlZHVjZXJzLCBlZmZlY3RzIH0gPSBtb2RlbDtcclxuXHJcbiAgICAgIGludmFyaWFudChcclxuICAgICAgICBuYW1lc3BhY2UsXHJcbiAgICAgICAgJ2FwcC5tb2RlbDogbmFtZXNwYWNlIHNob3VsZCBiZSBkZWZpbmVkJyxcclxuICAgICAgKTtcclxuICAgICAgaW52YXJpYW50KFxyXG4gICAgICAgICFhcHAuX21vZGVscy5zb21lKG1vZGVsID0+IG1vZGVsLm5hbWVzcGFjZSA9PT0gbmFtZXNwYWNlKSxcclxuICAgICAgICAnYXBwLm1vZGVsOiBuYW1lc3BhY2Ugc2hvdWxkIGJlIHVuaXF1ZScsXHJcbiAgICAgICk7XHJcbiAgICAgIGludmFyaWFudChcclxuICAgICAgICAhbW9kZWwuc3Vic2NyaXB0aW9ucyB8fCBpc1BsYWluT2JqZWN0KG1vZGVsLnN1YnNjcmlwdGlvbnMpLFxyXG4gICAgICAgICdhcHAubW9kZWw6IHN1YnNjcmlwdGlvbnMgc2hvdWxkIGJlIE9iamVjdCcsXHJcbiAgICAgICk7XHJcbiAgICAgIGludmFyaWFudChcclxuICAgICAgICAhcmVkdWNlcnMgfHwgaXNQbGFpbk9iamVjdChyZWR1Y2VycykgfHwgQXJyYXkuaXNBcnJheShyZWR1Y2VycyksXHJcbiAgICAgICAgJ2FwcC5tb2RlbDogcmVkdWNlcnMgc2hvdWxkIGJlIE9iamVjdCBvciBhcnJheScsXHJcbiAgICAgICk7XHJcbiAgICAgIGludmFyaWFudChcclxuICAgICAgICAhQXJyYXkuaXNBcnJheShyZWR1Y2VycykgfHwgKGlzUGxhaW5PYmplY3QocmVkdWNlcnNbMF0pICYmIHR5cGVvZiByZWR1Y2Vyc1sxXSA9PT0gJ2Z1bmN0aW9uJyksXHJcbiAgICAgICAgJ2FwcC5tb2RlbDogcmVkdWNlcnMgd2l0aCBhcnJheSBzaG91bGQgYmUgYXBwLm1vZGVsKHsgcmVkdWNlcnM6IFtvYmplY3QsIGZ1bmN0aW9uXSB9KScsXHJcbiAgICAgICk7XHJcbiAgICAgIGludmFyaWFudChcclxuICAgICAgICAhZWZmZWN0cyB8fCBpc1BsYWluT2JqZWN0KGVmZmVjdHMpLFxyXG4gICAgICAgICdhcHAubW9kZWw6IGVmZmVjdHMgc2hvdWxkIGJlIE9iamVjdCcsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBmdW5jdGlvbiBhcHBseU5hbWVzcGFjZSh0eXBlKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0TmFtZXNwYWNlZFJlZHVjZXJzKHJlZHVjZXJzKSB7XHJcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocmVkdWNlcnMpLnJlZHVjZSgobWVtbywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIHdhcm5pbmcoXHJcbiAgICAgICAgICAgICAga2V5LmluZGV4T2YoYCR7bmFtZXNwYWNlfSR7U0VQfWApICE9PSAwLFxyXG4gICAgICAgICAgICAgIGBhcHAubW9kZWw6ICR7dHlwZS5zbGljZSgwLCAtMSl9ICR7a2V5fSBzaG91bGQgbm90IGJlIHByZWZpeGVkIHdpdGggbmFtZXNwYWNlICR7bmFtZXNwYWNlfWAsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG1lbW9bYCR7bmFtZXNwYWNlfSR7U0VQfSR7a2V5fWBdID0gcmVkdWNlcnNba2V5XTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lbW87XHJcbiAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobW9kZWxbdHlwZV0pIHtcclxuICAgICAgICAgIGlmICh0eXBlID09PSAncmVkdWNlcnMnICYmIEFycmF5LmlzQXJyYXkobW9kZWxbdHlwZV0pKSB7XHJcbiAgICAgICAgICAgIG1vZGVsW3R5cGVdWzBdID0gZ2V0TmFtZXNwYWNlZFJlZHVjZXJzKG1vZGVsW3R5cGVdWzBdKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vZGVsW3R5cGVdID0gZ2V0TmFtZXNwYWNlZFJlZHVjZXJzKG1vZGVsW3R5cGVdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFwcGx5TmFtZXNwYWNlKCdyZWR1Y2VycycpO1xyXG4gICAgICBhcHBseU5hbWVzcGFjZSgnZWZmZWN0cycpO1xyXG5cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFJlZHVjZXIocmVkdWNlcnMsIHN0YXRlKSB7XHJcbiAgICAgIC8vIFN1cHBvcnQgcmVkdWNlciBlbmhhbmNlclxyXG4gICAgICAvLyBlLmcuIHJlZHVjZXJzOiBbcmVhbFJlZHVjZXJzLCBlbmhhbmNlcl1cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVkdWNlcnMpKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlZHVjZXJzWzFdKGhhbmRsZUFjdGlvbnMocmVkdWNlcnNbMF0sIHN0YXRlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZUFjdGlvbnMocmVkdWNlcnMgfHwge30sIHN0YXRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNhZ2EoZWZmZWN0cywgbW9kZWwsIG9uRXJyb3IpIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICooKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZWZmZWN0cykge1xyXG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlZmZlY3RzLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdhdGNoZXIgPSBnZXRXYXRjaGVyKGtleSwgZWZmZWN0c1trZXldLCBtb2RlbCwgb25FcnJvcik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2sgPSB5aWVsZCBzYWdhRWZmZWN0cy5mb3JrKHdhdGNoZXIpO1xyXG4gICAgICAgICAgICB5aWVsZCBzYWdhRWZmZWN0cy5mb3JrKGZ1bmN0aW9uICooKSB7XHJcbiAgICAgICAgICAgICAgeWllbGQgc2FnYUVmZmVjdHMudGFrZShgJHttb2RlbC5uYW1lc3BhY2V9L0BAQ0FOQ0VMX0VGRkVDVFNgKTtcclxuICAgICAgICAgICAgICB5aWVsZCBzYWdhRWZmZWN0cy5jYW5jZWwodGFzayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRXYXRjaGVyKGtleSwgX2VmZmVjdCwgbW9kZWwsIG9uRXJyb3IpIHtcclxuICAgICAgbGV0IGVmZmVjdCA9IF9lZmZlY3Q7XHJcbiAgICAgIGxldCB0eXBlID0gJ3Rha2VFdmVyeSc7XHJcbiAgICAgIGxldCBtcztcclxuXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KF9lZmZlY3QpKSB7XHJcbiAgICAgICAgZWZmZWN0ID0gX2VmZmVjdFswXTtcclxuICAgICAgICBjb25zdCBvcHRzID0gX2VmZmVjdFsxXTtcclxuICAgICAgICBpZiAob3B0cyAmJiBvcHRzLnR5cGUpIHtcclxuICAgICAgICAgIHR5cGUgPSBvcHRzLnR5cGU7XHJcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ3Rocm90dGxlJykge1xyXG4gICAgICAgICAgICBpbnZhcmlhbnQoXHJcbiAgICAgICAgICAgICAgb3B0cy5tcyxcclxuICAgICAgICAgICAgICAnYXBwLnN0YXJ0OiBvcHRzLm1zIHNob3VsZCBiZSBkZWZpbmVkIGlmIHR5cGUgaXMgdGhyb3R0bGUnLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBtcyA9IG9wdHMubXM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGludmFyaWFudChcclxuICAgICAgICAgIFsnd2F0Y2hlcicsICd0YWtlRXZlcnknLCAndGFrZUxhdGVzdCcsICd0aHJvdHRsZSddLmluZGV4T2YodHlwZSkgPiAtMSxcclxuICAgICAgICAgICdhcHAuc3RhcnQ6IGVmZmVjdCB0eXBlIHNob3VsZCBiZSB0YWtlRXZlcnksIHRha2VMYXRlc3QsIHRocm90dGxlIG9yIHdhdGNoZXInLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uICpzYWdhV2l0aENhdGNoKC4uLmFyZ3MpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgeWllbGQgZWZmZWN0KC4uLmFyZ3MuY29uY2F0KGNyZWF0ZUVmZmVjdHMobW9kZWwpKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgb25FcnJvcihlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG9uRWZmZWN0ID0gcGx1Z2luLmdldCgnb25FZmZlY3QnKTtcclxuICAgICAgY29uc3Qgc2FnYVdpdGhPbkVmZmVjdCA9IGFwcGx5T25FZmZlY3Qob25FZmZlY3QsIHNhZ2FXaXRoQ2F0Y2gsIG1vZGVsLCBrZXkpO1xyXG5cclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnd2F0Y2hlcic6XHJcbiAgICAgICAgICByZXR1cm4gc2FnYVdpdGhDYXRjaDtcclxuICAgICAgICBjYXNlICd0YWtlTGF0ZXN0JzpcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiooKSB7XHJcbiAgICAgICAgICAgIHlpZWxkIHRha2VMYXRlc3Qoa2V5LCBzYWdhV2l0aE9uRWZmZWN0KTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSAndGhyb3R0bGUnOlxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKigpIHtcclxuICAgICAgICAgICAgeWllbGQgdGhyb3R0bGUobXMsIGtleSwgc2FnYVdpdGhPbkVmZmVjdCk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24qKCkge1xyXG4gICAgICAgICAgICB5aWVsZCB0YWtlRXZlcnkoa2V5LCBzYWdhV2l0aE9uRWZmZWN0KTtcclxuICAgICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBydW5TdWJzY3JpcHRpb25zKHN1YnMsIG1vZGVsLCBhcHAsIG9uRXJyb3IpIHtcclxuICAgICAgY29uc3QgdW5saXN0ZW5lcnMgPSBbXTtcclxuICAgICAgY29uc3Qgbm9uZUZ1bmN0aW9uU3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBzdWJzKSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdWJzLCBrZXkpKSB7XHJcbiAgICAgICAgICBjb25zdCBzdWIgPSBzdWJzW2tleV07XHJcbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHN1YiA9PT0gJ2Z1bmN0aW9uJywgJ2FwcC5zdGFydDogc3Vic2NyaXB0aW9uIHNob3VsZCBiZSBmdW5jdGlvbicpO1xyXG4gICAgICAgICAgY29uc3QgdW5saXN0ZW5lciA9IHN1Yih7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoOiBjcmVhdGVEaXNwYXRjaChhcHAuX3N0b3JlLmRpc3BhdGNoLCBtb2RlbCksXHJcbiAgICAgICAgICAgIGhpc3Rvcnk6IGFwcC5faGlzdG9yeSxcclxuICAgICAgICAgIH0sIG9uRXJyb3IpO1xyXG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24odW5saXN0ZW5lcikpIHtcclxuICAgICAgICAgICAgdW5saXN0ZW5lcnMucHVzaCh1bmxpc3RlbmVyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vbmVGdW5jdGlvblN1YnNjcmlwdGlvbnMucHVzaChrZXkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyB1bmxpc3RlbmVycywgbm9uZUZ1bmN0aW9uU3Vic2NyaXB0aW9ucyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZWZpeFR5cGUodHlwZSwgbW9kZWwpIHtcclxuICAgICAgY29uc3QgcHJlZml4ZWRUeXBlID0gYCR7bW9kZWwubmFtZXNwYWNlfSR7U0VQfSR7dHlwZX1gO1xyXG4gICAgICBpZiAoKG1vZGVsLnJlZHVjZXJzICYmIG1vZGVsLnJlZHVjZXJzW3ByZWZpeGVkVHlwZV0pXHJcbiAgICAgICAgfHwgKG1vZGVsLmVmZmVjdHMgJiYgbW9kZWwuZWZmZWN0c1twcmVmaXhlZFR5cGVdKSkge1xyXG4gICAgICAgIHJldHVybiBwcmVmaXhlZFR5cGU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWZmZWN0cyhtb2RlbCkge1xyXG4gICAgICBmdW5jdGlvbiBwdXQoYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgeyB0eXBlIH0gPSBhY3Rpb247XHJcbiAgICAgICAgaW52YXJpYW50KHR5cGUsICdkaXNwYXRjaDogYWN0aW9uIHNob3VsZCBiZSBhIHBsYWluIE9iamVjdCB3aXRoIHR5cGUnKTtcclxuICAgICAgICB3YXJuaW5nKFxyXG4gICAgICAgICAgdHlwZS5pbmRleE9mKGAke21vZGVsLm5hbWVzcGFjZX0ke1NFUH1gKSAhPT0gMCxcclxuICAgICAgICAgIGBlZmZlY3RzLnB1dDogJHt0eXBlfSBzaG91bGQgbm90IGJlIHByZWZpeGVkIHdpdGggbmFtZXNwYWNlICR7bW9kZWwubmFtZXNwYWNlfWAsXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gc2FnYUVmZmVjdHMucHV0KHsgLi4uYWN0aW9uLCB0eXBlOiBwcmVmaXhUeXBlKHR5cGUsIG1vZGVsKSB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyAuLi5zYWdhRWZmZWN0cywgcHV0IH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRGlzcGF0Y2goZGlzcGF0Y2gsIG1vZGVsKSB7XHJcbiAgICAgIHJldHVybiAoYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyB0eXBlIH0gPSBhY3Rpb247XHJcbiAgICAgICAgaW52YXJpYW50KHR5cGUsICdkaXNwYXRjaDogYWN0aW9uIHNob3VsZCBiZSBhIHBsYWluIE9iamVjdCB3aXRoIHR5cGUnKTtcclxuICAgICAgICB3YXJuaW5nKFxyXG4gICAgICAgICAgdHlwZS5pbmRleE9mKGAke21vZGVsLm5hbWVzcGFjZX0ke1NFUH1gKSAhPT0gMCxcclxuICAgICAgICAgIGBkaXNwYXRjaDogJHt0eXBlfSBzaG91bGQgbm90IGJlIHByZWZpeGVkIHdpdGggbmFtZXNwYWNlICR7bW9kZWwubmFtZXNwYWNlfWAsXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gZGlzcGF0Y2goeyAuLi5hY3Rpb24sIHR5cGU6IHByZWZpeFR5cGUodHlwZSwgbW9kZWwpIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGx5T25FZmZlY3QoZm5zLCBlZmZlY3QsIG1vZGVsLCBrZXkpIHtcclxuICAgICAgZm9yIChjb25zdCBmbiBvZiBmbnMpIHtcclxuICAgICAgICBlZmZlY3QgPSBmbihlZmZlY3QsIHNhZ2FFZmZlY3RzLCBtb2RlbCwga2V5KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZWZmZWN0O1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl19