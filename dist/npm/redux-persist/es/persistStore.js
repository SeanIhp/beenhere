"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('../../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

exports.default = persistStore;

var _constants = require('./constants.js');

var _getStoredState = require('./getStoredState.js');

var _getStoredState2 = _interopRequireDefault(_getStoredState);

var _createPersistor = require('./createPersistor.js');

var _createPersistor2 = _interopRequireDefault(_createPersistor);

var _setImmediate = require('./utils/setImmediate.js');

var _setImmediate2 = _interopRequireDefault(_setImmediate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function persistStore(store) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onComplete = arguments[2];

  // defaults
  // @TODO remove shouldRestore
  var shouldRestore = !config.skipRestore;
  if ("development" !== 'production' && config.skipRestore) console.warn('redux-persist: config.skipRestore has been deprecated. If you want to skip restoration use `createPersistor` instead');

  var purgeKeys = null;

  // create and pause persistor
  var persistor = (0, _createPersistor2.default)(store, config);
  persistor.pause();

  // restore
  if (shouldRestore) {
    (0, _setImmediate2.default)(function () {
      (0, _getStoredState2.default)(config, function (err, restoredState) {
        if (err) {
          complete(err);
          return;
        }
        // do not persist state for purgeKeys
        if (purgeKeys) {
          if (purgeKeys === '*') restoredState = {};else purgeKeys.forEach(function (key) {
            return delete restoredState[key];
          });
        }

        store.dispatch(rehydrateAction(restoredState, err));
        complete(err, restoredState);
      });
    });
  } else (0, _setImmediate2.default)(complete);

  function complete(err, restoredState) {
    persistor.resume();
    onComplete && onComplete(err, restoredState);
  }

  return _extends({}, persistor, {
    purge: function purge(keys) {
      purgeKeys = keys || '*';
      return persistor.purge(keys);
    }
  });
}

function rehydrateAction(payload) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return {
    type: _constants.REHYDRATE,
    payload: payload,
    error: error
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNpc3RTdG9yZS5qcyJdLCJuYW1lcyI6WyJwZXJzaXN0U3RvcmUiLCJfZXh0ZW5kcyIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJzdG9yZSIsImNvbmZpZyIsInVuZGVmaW5lZCIsIm9uQ29tcGxldGUiLCJzaG91bGRSZXN0b3JlIiwic2tpcFJlc3RvcmUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJjb25zb2xlIiwid2FybiIsInB1cmdlS2V5cyIsInBlcnNpc3RvciIsInBhdXNlIiwiZXJyIiwicmVzdG9yZWRTdGF0ZSIsImNvbXBsZXRlIiwiZm9yRWFjaCIsImRpc3BhdGNoIiwicmVoeWRyYXRlQWN0aW9uIiwicmVzdW1lIiwicHVyZ2UiLCJrZXlzIiwicGF5bG9hZCIsImVycm9yIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztrQkFPd0JBLFk7O0FBTHhCOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBTEEsSUFBSUMsV0FBVyxvQkFBaUIsVUFBVUMsTUFBVixFQUFrQjtBQUFFLE9BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJQyxVQUFVQyxNQUE5QixFQUFzQ0YsR0FBdEMsRUFBMkM7QUFBRSxRQUFJRyxTQUFTRixVQUFVRCxDQUFWLENBQWIsQ0FBMkIsS0FBSyxJQUFJSSxHQUFULElBQWdCRCxNQUFoQixFQUF3QjtBQUFFLFVBQUlFLE9BQU9DLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQ0wsTUFBckMsRUFBNkNDLEdBQTdDLENBQUosRUFBdUQ7QUFBRUwsZUFBT0ssR0FBUCxJQUFjRCxPQUFPQyxHQUFQLENBQWQ7QUFBNEI7QUFBRTtBQUFFLEdBQUMsT0FBT0wsTUFBUDtBQUFnQixDQUFoUTs7QUFPZSxTQUFTRixZQUFULENBQXNCWSxLQUF0QixFQUE2QjtBQUMxQyxNQUFJQyxTQUFTVCxVQUFVQyxNQUFWLEdBQW1CLENBQW5CLElBQXdCRCxVQUFVLENBQVYsTUFBaUJVLFNBQXpDLEdBQXFEVixVQUFVLENBQVYsQ0FBckQsR0FBb0UsRUFBakY7QUFDQSxNQUFJVyxhQUFhWCxVQUFVLENBQVYsQ0FBakI7O0FBRUE7QUFDQTtBQUNBLE1BQUlZLGdCQUFnQixDQUFDSCxPQUFPSSxXQUE1QjtBQUNBLE1BQUlDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixJQUF5Q1AsT0FBT0ksV0FBcEQsRUFBaUVJLFFBQVFDLElBQVIsQ0FBYSxzSEFBYjs7QUFFakUsTUFBSUMsWUFBWSxJQUFoQjs7QUFFQTtBQUNBLE1BQUlDLFlBQVksK0JBQWdCWixLQUFoQixFQUF1QkMsTUFBdkIsQ0FBaEI7QUFDQVcsWUFBVUMsS0FBVjs7QUFFQTtBQUNBLE1BQUlULGFBQUosRUFBbUI7QUFDakIsZ0NBQWEsWUFBWTtBQUN2QixvQ0FBZUgsTUFBZixFQUF1QixVQUFVYSxHQUFWLEVBQWVDLGFBQWYsRUFBOEI7QUFDbkQsWUFBSUQsR0FBSixFQUFTO0FBQ1BFLG1CQUFTRixHQUFUO0FBQ0E7QUFDRDtBQUNEO0FBQ0EsWUFBSUgsU0FBSixFQUFlO0FBQ2IsY0FBSUEsY0FBYyxHQUFsQixFQUF1QkksZ0JBQWdCLEVBQWhCLENBQXZCLEtBQStDSixVQUFVTSxPQUFWLENBQWtCLFVBQVV0QixHQUFWLEVBQWU7QUFDOUUsbUJBQU8sT0FBT29CLGNBQWNwQixHQUFkLENBQWQ7QUFDRCxXQUY4QztBQUdoRDs7QUFFREssY0FBTWtCLFFBQU4sQ0FBZUMsZ0JBQWdCSixhQUFoQixFQUErQkQsR0FBL0IsQ0FBZjtBQUNBRSxpQkFBU0YsR0FBVCxFQUFjQyxhQUFkO0FBQ0QsT0FkRDtBQWVELEtBaEJEO0FBaUJELEdBbEJELE1Ba0JPLDRCQUFhQyxRQUFiOztBQUVQLFdBQVNBLFFBQVQsQ0FBa0JGLEdBQWxCLEVBQXVCQyxhQUF2QixFQUFzQztBQUNwQ0gsY0FBVVEsTUFBVjtBQUNBakIsa0JBQWNBLFdBQVdXLEdBQVgsRUFBZ0JDLGFBQWhCLENBQWQ7QUFDRDs7QUFFRCxTQUFPMUIsU0FBUyxFQUFULEVBQWF1QixTQUFiLEVBQXdCO0FBQzdCUyxXQUFPLFNBQVNBLEtBQVQsQ0FBZUMsSUFBZixFQUFxQjtBQUMxQlgsa0JBQVlXLFFBQVEsR0FBcEI7QUFDQSxhQUFPVixVQUFVUyxLQUFWLENBQWdCQyxJQUFoQixDQUFQO0FBQ0Q7QUFKNEIsR0FBeEIsQ0FBUDtBQU1EOztBQUVELFNBQVNILGVBQVQsQ0FBeUJJLE9BQXpCLEVBQWtDO0FBQ2hDLE1BQUlDLFFBQVFoQyxVQUFVQyxNQUFWLEdBQW1CLENBQW5CLElBQXdCRCxVQUFVLENBQVYsTUFBaUJVLFNBQXpDLEdBQXFEVixVQUFVLENBQVYsQ0FBckQsR0FBb0UsSUFBaEY7O0FBRUEsU0FBTztBQUNMaUMsOEJBREs7QUFFTEYsYUFBU0EsT0FGSjtBQUdMQyxXQUFPQTtBQUhGLEdBQVA7QUFLRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IHsgUkVIWURSQVRFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGdldFN0b3JlZFN0YXRlIGZyb20gJy4vZ2V0U3RvcmVkU3RhdGUnO1xuaW1wb3J0IGNyZWF0ZVBlcnNpc3RvciBmcm9tICcuL2NyZWF0ZVBlcnNpc3Rvcic7XG5pbXBvcnQgc2V0SW1tZWRpYXRlIGZyb20gJy4vdXRpbHMvc2V0SW1tZWRpYXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGVyc2lzdFN0b3JlKHN0b3JlKSB7XG4gIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICB2YXIgb25Db21wbGV0ZSA9IGFyZ3VtZW50c1syXTtcblxuICAvLyBkZWZhdWx0c1xuICAvLyBAVE9ETyByZW1vdmUgc2hvdWxkUmVzdG9yZVxuICB2YXIgc2hvdWxkUmVzdG9yZSA9ICFjb25maWcuc2tpcFJlc3RvcmU7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5za2lwUmVzdG9yZSkgY29uc29sZS53YXJuKCdyZWR1eC1wZXJzaXN0OiBjb25maWcuc2tpcFJlc3RvcmUgaGFzIGJlZW4gZGVwcmVjYXRlZC4gSWYgeW91IHdhbnQgdG8gc2tpcCByZXN0b3JhdGlvbiB1c2UgYGNyZWF0ZVBlcnNpc3RvcmAgaW5zdGVhZCcpO1xuXG4gIHZhciBwdXJnZUtleXMgPSBudWxsO1xuXG4gIC8vIGNyZWF0ZSBhbmQgcGF1c2UgcGVyc2lzdG9yXG4gIHZhciBwZXJzaXN0b3IgPSBjcmVhdGVQZXJzaXN0b3Ioc3RvcmUsIGNvbmZpZyk7XG4gIHBlcnNpc3Rvci5wYXVzZSgpO1xuXG4gIC8vIHJlc3RvcmVcbiAgaWYgKHNob3VsZFJlc3RvcmUpIHtcbiAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgZ2V0U3RvcmVkU3RhdGUoY29uZmlnLCBmdW5jdGlvbiAoZXJyLCByZXN0b3JlZFN0YXRlKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjb21wbGV0ZShlcnIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBkbyBub3QgcGVyc2lzdCBzdGF0ZSBmb3IgcHVyZ2VLZXlzXG4gICAgICAgIGlmIChwdXJnZUtleXMpIHtcbiAgICAgICAgICBpZiAocHVyZ2VLZXlzID09PSAnKicpIHJlc3RvcmVkU3RhdGUgPSB7fTtlbHNlIHB1cmdlS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWxldGUgcmVzdG9yZWRTdGF0ZVtrZXldO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcmUuZGlzcGF0Y2gocmVoeWRyYXRlQWN0aW9uKHJlc3RvcmVkU3RhdGUsIGVycikpO1xuICAgICAgICBjb21wbGV0ZShlcnIsIHJlc3RvcmVkU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSBzZXRJbW1lZGlhdGUoY29tcGxldGUpO1xuXG4gIGZ1bmN0aW9uIGNvbXBsZXRlKGVyciwgcmVzdG9yZWRTdGF0ZSkge1xuICAgIHBlcnNpc3Rvci5yZXN1bWUoKTtcbiAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyLCByZXN0b3JlZFN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgcGVyc2lzdG9yLCB7XG4gICAgcHVyZ2U6IGZ1bmN0aW9uIHB1cmdlKGtleXMpIHtcbiAgICAgIHB1cmdlS2V5cyA9IGtleXMgfHwgJyonO1xuICAgICAgcmV0dXJuIHBlcnNpc3Rvci5wdXJnZShrZXlzKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWh5ZHJhdGVBY3Rpb24ocGF5bG9hZCkge1xuICB2YXIgZXJyb3IgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSRUhZRFJBVEUsXG4gICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICBlcnJvcjogZXJyb3JcbiAgfTtcbn0iXX0=