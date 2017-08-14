"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

exports.default = createPersistor;

var _constants = require('./constants.js');

var _asyncLocalStorage = require('./defaults/asyncLocalStorage.js');

var _asyncLocalStorage2 = _interopRequireDefault(_asyncLocalStorage);

var _purgeStoredState = require('./purgeStoredState.js');

var _purgeStoredState2 = _interopRequireDefault(_purgeStoredState);

var _jsonStringifySafe = require('../../json-stringify-safe/stringify.js');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPersistor(store, config) {
  // defaults
  var serializer = config.serialize === false ? function (data) {
    return data;
  } : defaultSerializer;
  var deserializer = config.serialize === false ? function (data) {
    return data;
  } : defaultDeserializer;
  var blacklist = config.blacklist || [];
  var whitelist = config.whitelist || false;
  var transforms = config.transforms || [];
  var debounce = config.debounce || false;
  var keyPrefix = config.keyPrefix !== undefined ? config.keyPrefix : _constants.KEY_PREFIX;

  // pluggable state shape (e.g. immutablejs)
  var stateInit = config._stateInit || {};
  var stateIterator = config._stateIterator || defaultStateIterator;
  var stateGetter = config._stateGetter || defaultStateGetter;
  var stateSetter = config._stateSetter || defaultStateSetter;

  // storage with keys -> getAllKeys for localForage support
  var storage = config.storage || (0, _asyncLocalStorage2.default)('local');
  if (storage.keys && !storage.getAllKeys) {
    storage.getAllKeys = storage.keys;
  }

  // initialize stateful values
  var lastState = stateInit;
  var paused = false;
  var storesToProcess = [];
  var timeIterator = null;

  store.subscribe(function () {
    if (paused) return;

    var state = store.getState();

    stateIterator(state, function (subState, key) {
      if (!passWhitelistBlacklist(key)) return;
      if (stateGetter(lastState, key) === stateGetter(state, key)) return;
      if (storesToProcess.indexOf(key) !== -1) return;
      storesToProcess.push(key);
    });

    // time iterator (read: debounce)
    if (timeIterator === null) {
      timeIterator = setInterval(function () {
        if (storesToProcess.length === 0) {
          clearInterval(timeIterator);
          timeIterator = null;
          return;
        }

        var key = storesToProcess.shift();
        var storageKey = createStorageKey(key);
        var endState = transforms.reduce(function (subState, transformer) {
          return transformer.in(subState, key);
        }, stateGetter(store.getState(), key));
        if (typeof endState !== 'undefined') storage.setItem(storageKey, serializer(endState), warnIfSetError(key));
      }, debounce);
    }

    lastState = state;
  });

  function passWhitelistBlacklist(key) {
    if (whitelist && whitelist.indexOf(key) === -1) return false;
    if (blacklist.indexOf(key) !== -1) return false;
    return true;
  }

  function adhocRehydrate(incoming) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var state = {};
    if (options.serial) {
      stateIterator(incoming, function (subState, key) {
        try {
          var data = deserializer(subState);
          var value = transforms.reduceRight(function (interState, transformer) {
            return transformer.out(interState, key);
          }, data);
          state = stateSetter(state, key, value);
        } catch (err) {
          if ("development" !== 'production') console.warn('Error rehydrating data for key "' + key + '"', subState, err);
        }
      });
    } else state = incoming;

    store.dispatch(rehydrateAction(state));
    return state;
  }

  function createStorageKey(key) {
    return '' + keyPrefix + key;
  }

  // return `persistor`
  return {
    rehydrate: adhocRehydrate,
    pause: function pause() {
      paused = true;
    },
    resume: function resume() {
      paused = false;
    },
    purge: function purge(keys) {
      return (0, _purgeStoredState2.default)({ storage: storage, keyPrefix: keyPrefix }, keys);
    }
  };
}

function warnIfSetError(key) {
  return function setError(err) {
    if (err && "development" !== 'production') {
      console.warn('Error storing data for key:', key, err);
    }
  };
}

function defaultSerializer(data) {
  return (0, _jsonStringifySafe2.default)(data, null, null, function (k, v) {
    if ("development" !== 'production') return null;
    throw new Error('\n      redux-persist: cannot process cyclical state.\n      Consider changing your state structure to have no cycles.\n      Alternatively blacklist the corresponding reducer key.\n      Cycle encounted at key "' + k + '" with value "' + v + '".\n    ');
  });
}

function defaultDeserializer(serial) {
  return JSON.parse(serial);
}

function rehydrateAction(data) {
  return {
    type: _constants.REHYDRATE,
    payload: data
  };
}

function defaultStateIterator(collection, callback) {
  return (0, _keys2.default)(collection).forEach(function (key) {
    return callback(collection[key], key);
  });
}

function defaultStateGetter(state, key) {
  return state[key];
}

function defaultStateSetter(state, key, value) {
  state[key] = value;
  return state;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZVBlcnNpc3Rvci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVQZXJzaXN0b3IiLCJzdG9yZSIsImNvbmZpZyIsInNlcmlhbGl6ZXIiLCJzZXJpYWxpemUiLCJkYXRhIiwiZGVmYXVsdFNlcmlhbGl6ZXIiLCJkZXNlcmlhbGl6ZXIiLCJkZWZhdWx0RGVzZXJpYWxpemVyIiwiYmxhY2tsaXN0Iiwid2hpdGVsaXN0IiwidHJhbnNmb3JtcyIsImRlYm91bmNlIiwia2V5UHJlZml4IiwidW5kZWZpbmVkIiwic3RhdGVJbml0IiwiX3N0YXRlSW5pdCIsInN0YXRlSXRlcmF0b3IiLCJfc3RhdGVJdGVyYXRvciIsImRlZmF1bHRTdGF0ZUl0ZXJhdG9yIiwic3RhdGVHZXR0ZXIiLCJfc3RhdGVHZXR0ZXIiLCJkZWZhdWx0U3RhdGVHZXR0ZXIiLCJzdGF0ZVNldHRlciIsIl9zdGF0ZVNldHRlciIsImRlZmF1bHRTdGF0ZVNldHRlciIsInN0b3JhZ2UiLCJrZXlzIiwiZ2V0QWxsS2V5cyIsImxhc3RTdGF0ZSIsInBhdXNlZCIsInN0b3Jlc1RvUHJvY2VzcyIsInRpbWVJdGVyYXRvciIsInN1YnNjcmliZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJzdWJTdGF0ZSIsImtleSIsInBhc3NXaGl0ZWxpc3RCbGFja2xpc3QiLCJpbmRleE9mIiwicHVzaCIsInNldEludGVydmFsIiwibGVuZ3RoIiwiY2xlYXJJbnRlcnZhbCIsInNoaWZ0Iiwic3RvcmFnZUtleSIsImNyZWF0ZVN0b3JhZ2VLZXkiLCJlbmRTdGF0ZSIsInJlZHVjZSIsInRyYW5zZm9ybWVyIiwiaW4iLCJzZXRJdGVtIiwid2FybklmU2V0RXJyb3IiLCJhZGhvY1JlaHlkcmF0ZSIsImluY29taW5nIiwib3B0aW9ucyIsImFyZ3VtZW50cyIsInNlcmlhbCIsInZhbHVlIiwicmVkdWNlUmlnaHQiLCJpbnRlclN0YXRlIiwib3V0IiwiZXJyIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiY29uc29sZSIsIndhcm4iLCJkaXNwYXRjaCIsInJlaHlkcmF0ZUFjdGlvbiIsInJlaHlkcmF0ZSIsInBhdXNlIiwicmVzdW1lIiwicHVyZ2UiLCJzZXRFcnJvciIsImsiLCJ2IiwiRXJyb3IiLCJKU09OIiwicGFyc2UiLCJ0eXBlIiwicGF5bG9hZCIsImNvbGxlY3Rpb24iLCJjYWxsYmFjayIsImZvckVhY2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBS3dCQSxlOztBQUx4Qjs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVNBLGVBQVQsQ0FBeUJDLEtBQXpCLEVBQWdDQyxNQUFoQyxFQUF3QztBQUNyRDtBQUNBLE1BQUlDLGFBQWFELE9BQU9FLFNBQVAsS0FBcUIsS0FBckIsR0FBNkIsVUFBVUMsSUFBVixFQUFnQjtBQUM1RCxXQUFPQSxJQUFQO0FBQ0QsR0FGZ0IsR0FFYkMsaUJBRko7QUFHQSxNQUFJQyxlQUFlTCxPQUFPRSxTQUFQLEtBQXFCLEtBQXJCLEdBQTZCLFVBQVVDLElBQVYsRUFBZ0I7QUFDOUQsV0FBT0EsSUFBUDtBQUNELEdBRmtCLEdBRWZHLG1CQUZKO0FBR0EsTUFBSUMsWUFBWVAsT0FBT08sU0FBUCxJQUFvQixFQUFwQztBQUNBLE1BQUlDLFlBQVlSLE9BQU9RLFNBQVAsSUFBb0IsS0FBcEM7QUFDQSxNQUFJQyxhQUFhVCxPQUFPUyxVQUFQLElBQXFCLEVBQXRDO0FBQ0EsTUFBSUMsV0FBV1YsT0FBT1UsUUFBUCxJQUFtQixLQUFsQztBQUNBLE1BQUlDLFlBQVlYLE9BQU9XLFNBQVAsS0FBcUJDLFNBQXJCLEdBQWlDWixPQUFPVyxTQUF4Qyx3QkFBaEI7O0FBRUE7QUFDQSxNQUFJRSxZQUFZYixPQUFPYyxVQUFQLElBQXFCLEVBQXJDO0FBQ0EsTUFBSUMsZ0JBQWdCZixPQUFPZ0IsY0FBUCxJQUF5QkMsb0JBQTdDO0FBQ0EsTUFBSUMsY0FBY2xCLE9BQU9tQixZQUFQLElBQXVCQyxrQkFBekM7QUFDQSxNQUFJQyxjQUFjckIsT0FBT3NCLFlBQVAsSUFBdUJDLGtCQUF6Qzs7QUFFQTtBQUNBLE1BQUlDLFVBQVV4QixPQUFPd0IsT0FBUCxJQUFrQixpQ0FBd0IsT0FBeEIsQ0FBaEM7QUFDQSxNQUFJQSxRQUFRQyxJQUFSLElBQWdCLENBQUNELFFBQVFFLFVBQTdCLEVBQXlDO0FBQ3ZDRixZQUFRRSxVQUFSLEdBQXFCRixRQUFRQyxJQUE3QjtBQUNEOztBQUVEO0FBQ0EsTUFBSUUsWUFBWWQsU0FBaEI7QUFDQSxNQUFJZSxTQUFTLEtBQWI7QUFDQSxNQUFJQyxrQkFBa0IsRUFBdEI7QUFDQSxNQUFJQyxlQUFlLElBQW5COztBQUVBL0IsUUFBTWdDLFNBQU4sQ0FBZ0IsWUFBWTtBQUMxQixRQUFJSCxNQUFKLEVBQVk7O0FBRVosUUFBSUksUUFBUWpDLE1BQU1rQyxRQUFOLEVBQVo7O0FBRUFsQixrQkFBY2lCLEtBQWQsRUFBcUIsVUFBVUUsUUFBVixFQUFvQkMsR0FBcEIsRUFBeUI7QUFDNUMsVUFBSSxDQUFDQyx1QkFBdUJELEdBQXZCLENBQUwsRUFBa0M7QUFDbEMsVUFBSWpCLFlBQVlTLFNBQVosRUFBdUJRLEdBQXZCLE1BQWdDakIsWUFBWWMsS0FBWixFQUFtQkcsR0FBbkIsQ0FBcEMsRUFBNkQ7QUFDN0QsVUFBSU4sZ0JBQWdCUSxPQUFoQixDQUF3QkYsR0FBeEIsTUFBaUMsQ0FBQyxDQUF0QyxFQUF5QztBQUN6Q04sc0JBQWdCUyxJQUFoQixDQUFxQkgsR0FBckI7QUFDRCxLQUxEOztBQU9BO0FBQ0EsUUFBSUwsaUJBQWlCLElBQXJCLEVBQTJCO0FBQ3pCQSxxQkFBZVMsWUFBWSxZQUFZO0FBQ3JDLFlBQUlWLGdCQUFnQlcsTUFBaEIsS0FBMkIsQ0FBL0IsRUFBa0M7QUFDaENDLHdCQUFjWCxZQUFkO0FBQ0FBLHlCQUFlLElBQWY7QUFDQTtBQUNEOztBQUVELFlBQUlLLE1BQU1OLGdCQUFnQmEsS0FBaEIsRUFBVjtBQUNBLFlBQUlDLGFBQWFDLGlCQUFpQlQsR0FBakIsQ0FBakI7QUFDQSxZQUFJVSxXQUFXcEMsV0FBV3FDLE1BQVgsQ0FBa0IsVUFBVVosUUFBVixFQUFvQmEsV0FBcEIsRUFBaUM7QUFDaEUsaUJBQU9BLFlBQVlDLEVBQVosQ0FBZWQsUUFBZixFQUF5QkMsR0FBekIsQ0FBUDtBQUNELFNBRmMsRUFFWmpCLFlBQVluQixNQUFNa0MsUUFBTixFQUFaLEVBQThCRSxHQUE5QixDQUZZLENBQWY7QUFHQSxZQUFJLE9BQU9VLFFBQVAsS0FBb0IsV0FBeEIsRUFBcUNyQixRQUFReUIsT0FBUixDQUFnQk4sVUFBaEIsRUFBNEIxQyxXQUFXNEMsUUFBWCxDQUE1QixFQUFrREssZUFBZWYsR0FBZixDQUFsRDtBQUN0QyxPQWJjLEVBYVp6QixRQWJZLENBQWY7QUFjRDs7QUFFRGlCLGdCQUFZSyxLQUFaO0FBQ0QsR0EvQkQ7O0FBaUNBLFdBQVNJLHNCQUFULENBQWdDRCxHQUFoQyxFQUFxQztBQUNuQyxRQUFJM0IsYUFBYUEsVUFBVTZCLE9BQVYsQ0FBa0JGLEdBQWxCLE1BQTJCLENBQUMsQ0FBN0MsRUFBZ0QsT0FBTyxLQUFQO0FBQ2hELFFBQUk1QixVQUFVOEIsT0FBVixDQUFrQkYsR0FBbEIsTUFBMkIsQ0FBQyxDQUFoQyxFQUFtQyxPQUFPLEtBQVA7QUFDbkMsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsV0FBU2dCLGNBQVQsQ0FBd0JDLFFBQXhCLEVBQWtDO0FBQ2hDLFFBQUlDLFVBQVVDLFVBQVVkLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0JjLFVBQVUsQ0FBVixNQUFpQjFDLFNBQXpDLEdBQXFEMEMsVUFBVSxDQUFWLENBQXJELEdBQW9FLEVBQWxGOztBQUVBLFFBQUl0QixRQUFRLEVBQVo7QUFDQSxRQUFJcUIsUUFBUUUsTUFBWixFQUFvQjtBQUNsQnhDLG9CQUFjcUMsUUFBZCxFQUF3QixVQUFVbEIsUUFBVixFQUFvQkMsR0FBcEIsRUFBeUI7QUFDL0MsWUFBSTtBQUNGLGNBQUloQyxPQUFPRSxhQUFhNkIsUUFBYixDQUFYO0FBQ0EsY0FBSXNCLFFBQVEvQyxXQUFXZ0QsV0FBWCxDQUF1QixVQUFVQyxVQUFWLEVBQXNCWCxXQUF0QixFQUFtQztBQUNwRSxtQkFBT0EsWUFBWVksR0FBWixDQUFnQkQsVUFBaEIsRUFBNEJ2QixHQUE1QixDQUFQO0FBQ0QsV0FGVyxFQUVUaEMsSUFGUyxDQUFaO0FBR0E2QixrQkFBUVgsWUFBWVcsS0FBWixFQUFtQkcsR0FBbkIsRUFBd0JxQixLQUF4QixDQUFSO0FBQ0QsU0FORCxDQU1FLE9BQU9JLEdBQVAsRUFBWTtBQUNaLGNBQUlDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQ0MsUUFBUUMsSUFBUixDQUFhLHFDQUFxQzlCLEdBQXJDLEdBQTJDLEdBQXhELEVBQTZERCxRQUE3RCxFQUF1RTBCLEdBQXZFO0FBQzVDO0FBQ0YsT0FWRDtBQVdELEtBWkQsTUFZTzVCLFFBQVFvQixRQUFSOztBQUVQckQsVUFBTW1FLFFBQU4sQ0FBZUMsZ0JBQWdCbkMsS0FBaEIsQ0FBZjtBQUNBLFdBQU9BLEtBQVA7QUFDRDs7QUFFRCxXQUFTWSxnQkFBVCxDQUEwQlQsR0FBMUIsRUFBK0I7QUFDN0IsV0FBTyxLQUFLeEIsU0FBTCxHQUFpQndCLEdBQXhCO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFPO0FBQ0xpQyxlQUFXakIsY0FETjtBQUVMa0IsV0FBTyxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCekMsZUFBUyxJQUFUO0FBQ0QsS0FKSTtBQUtMMEMsWUFBUSxTQUFTQSxNQUFULEdBQWtCO0FBQ3hCMUMsZUFBUyxLQUFUO0FBQ0QsS0FQSTtBQVFMMkMsV0FBTyxTQUFTQSxLQUFULENBQWU5QyxJQUFmLEVBQXFCO0FBQzFCLGFBQU8sZ0NBQWlCLEVBQUVELFNBQVNBLE9BQVgsRUFBb0JiLFdBQVdBLFNBQS9CLEVBQWpCLEVBQTZEYyxJQUE3RCxDQUFQO0FBQ0Q7QUFWSSxHQUFQO0FBWUQ7O0FBRUQsU0FBU3lCLGNBQVQsQ0FBd0JmLEdBQXhCLEVBQTZCO0FBQzNCLFNBQU8sU0FBU3FDLFFBQVQsQ0FBa0JaLEdBQWxCLEVBQXVCO0FBQzVCLFFBQUlBLE9BQU9DLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUFwQyxFQUFrRDtBQUNoREMsY0FBUUMsSUFBUixDQUFhLDZCQUFiLEVBQTRDOUIsR0FBNUMsRUFBaUR5QixHQUFqRDtBQUNEO0FBQ0YsR0FKRDtBQUtEOztBQUVELFNBQVN4RCxpQkFBVCxDQUEyQkQsSUFBM0IsRUFBaUM7QUFDL0IsU0FBTyxpQ0FBVUEsSUFBVixFQUFnQixJQUFoQixFQUFzQixJQUF0QixFQUE0QixVQUFVc0UsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ2pELFFBQUliLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQyxPQUFPLElBQVA7QUFDM0MsVUFBTSxJQUFJWSxLQUFKLENBQVUseU5BQXlORixDQUF6TixHQUE2TixnQkFBN04sR0FBZ1BDLENBQWhQLEdBQW9QLFVBQTlQLENBQU47QUFDRCxHQUhNLENBQVA7QUFJRDs7QUFFRCxTQUFTcEUsbUJBQVQsQ0FBNkJpRCxNQUE3QixFQUFxQztBQUNuQyxTQUFPcUIsS0FBS0MsS0FBTCxDQUFXdEIsTUFBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU1ksZUFBVCxDQUF5QmhFLElBQXpCLEVBQStCO0FBQzdCLFNBQU87QUFDTDJFLDhCQURLO0FBRUxDLGFBQVM1RTtBQUZKLEdBQVA7QUFJRDs7QUFFRCxTQUFTYyxvQkFBVCxDQUE4QitELFVBQTlCLEVBQTBDQyxRQUExQyxFQUFvRDtBQUNsRCxTQUFPLG9CQUFZRCxVQUFaLEVBQXdCRSxPQUF4QixDQUFnQyxVQUFVL0MsR0FBVixFQUFlO0FBQ3BELFdBQU84QyxTQUFTRCxXQUFXN0MsR0FBWCxDQUFULEVBQTBCQSxHQUExQixDQUFQO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7O0FBRUQsU0FBU2Ysa0JBQVQsQ0FBNEJZLEtBQTVCLEVBQW1DRyxHQUFuQyxFQUF3QztBQUN0QyxTQUFPSCxNQUFNRyxHQUFOLENBQVA7QUFDRDs7QUFFRCxTQUFTWixrQkFBVCxDQUE0QlMsS0FBNUIsRUFBbUNHLEdBQW5DLEVBQXdDcUIsS0FBeEMsRUFBK0M7QUFDN0N4QixRQUFNRyxHQUFOLElBQWFxQixLQUFiO0FBQ0EsU0FBT3hCLEtBQVA7QUFDRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS0VZX1BSRUZJWCwgUkVIWURSQVRFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGNyZWF0ZUFzeW5jTG9jYWxTdG9yYWdlIGZyb20gJy4vZGVmYXVsdHMvYXN5bmNMb2NhbFN0b3JhZ2UnO1xuaW1wb3J0IHB1cmdlU3RvcmVkU3RhdGUgZnJvbSAnLi9wdXJnZVN0b3JlZFN0YXRlJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnanNvbi1zdHJpbmdpZnktc2FmZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVBlcnNpc3RvcihzdG9yZSwgY29uZmlnKSB7XG4gIC8vIGRlZmF1bHRzXG4gIHZhciBzZXJpYWxpemVyID0gY29uZmlnLnNlcmlhbGl6ZSA9PT0gZmFsc2UgPyBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9IDogZGVmYXVsdFNlcmlhbGl6ZXI7XG4gIHZhciBkZXNlcmlhbGl6ZXIgPSBjb25maWcuc2VyaWFsaXplID09PSBmYWxzZSA/IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gOiBkZWZhdWx0RGVzZXJpYWxpemVyO1xuICB2YXIgYmxhY2tsaXN0ID0gY29uZmlnLmJsYWNrbGlzdCB8fCBbXTtcbiAgdmFyIHdoaXRlbGlzdCA9IGNvbmZpZy53aGl0ZWxpc3QgfHwgZmFsc2U7XG4gIHZhciB0cmFuc2Zvcm1zID0gY29uZmlnLnRyYW5zZm9ybXMgfHwgW107XG4gIHZhciBkZWJvdW5jZSA9IGNvbmZpZy5kZWJvdW5jZSB8fCBmYWxzZTtcbiAgdmFyIGtleVByZWZpeCA9IGNvbmZpZy5rZXlQcmVmaXggIT09IHVuZGVmaW5lZCA/IGNvbmZpZy5rZXlQcmVmaXggOiBLRVlfUFJFRklYO1xuXG4gIC8vIHBsdWdnYWJsZSBzdGF0ZSBzaGFwZSAoZS5nLiBpbW11dGFibGVqcylcbiAgdmFyIHN0YXRlSW5pdCA9IGNvbmZpZy5fc3RhdGVJbml0IHx8IHt9O1xuICB2YXIgc3RhdGVJdGVyYXRvciA9IGNvbmZpZy5fc3RhdGVJdGVyYXRvciB8fCBkZWZhdWx0U3RhdGVJdGVyYXRvcjtcbiAgdmFyIHN0YXRlR2V0dGVyID0gY29uZmlnLl9zdGF0ZUdldHRlciB8fCBkZWZhdWx0U3RhdGVHZXR0ZXI7XG4gIHZhciBzdGF0ZVNldHRlciA9IGNvbmZpZy5fc3RhdGVTZXR0ZXIgfHwgZGVmYXVsdFN0YXRlU2V0dGVyO1xuXG4gIC8vIHN0b3JhZ2Ugd2l0aCBrZXlzIC0+IGdldEFsbEtleXMgZm9yIGxvY2FsRm9yYWdlIHN1cHBvcnRcbiAgdmFyIHN0b3JhZ2UgPSBjb25maWcuc3RvcmFnZSB8fCBjcmVhdGVBc3luY0xvY2FsU3RvcmFnZSgnbG9jYWwnKTtcbiAgaWYgKHN0b3JhZ2Uua2V5cyAmJiAhc3RvcmFnZS5nZXRBbGxLZXlzKSB7XG4gICAgc3RvcmFnZS5nZXRBbGxLZXlzID0gc3RvcmFnZS5rZXlzO1xuICB9XG5cbiAgLy8gaW5pdGlhbGl6ZSBzdGF0ZWZ1bCB2YWx1ZXNcbiAgdmFyIGxhc3RTdGF0ZSA9IHN0YXRlSW5pdDtcbiAgdmFyIHBhdXNlZCA9IGZhbHNlO1xuICB2YXIgc3RvcmVzVG9Qcm9jZXNzID0gW107XG4gIHZhciB0aW1lSXRlcmF0b3IgPSBudWxsO1xuXG4gIHN0b3JlLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHBhdXNlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgIHN0YXRlSXRlcmF0b3Ioc3RhdGUsIGZ1bmN0aW9uIChzdWJTdGF0ZSwga2V5KSB7XG4gICAgICBpZiAoIXBhc3NXaGl0ZWxpc3RCbGFja2xpc3Qoa2V5KSkgcmV0dXJuO1xuICAgICAgaWYgKHN0YXRlR2V0dGVyKGxhc3RTdGF0ZSwga2V5KSA9PT0gc3RhdGVHZXR0ZXIoc3RhdGUsIGtleSkpIHJldHVybjtcbiAgICAgIGlmIChzdG9yZXNUb1Byb2Nlc3MuaW5kZXhPZihrZXkpICE9PSAtMSkgcmV0dXJuO1xuICAgICAgc3RvcmVzVG9Qcm9jZXNzLnB1c2goa2V5KTtcbiAgICB9KTtcblxuICAgIC8vIHRpbWUgaXRlcmF0b3IgKHJlYWQ6IGRlYm91bmNlKVxuICAgIGlmICh0aW1lSXRlcmF0b3IgPT09IG51bGwpIHtcbiAgICAgIHRpbWVJdGVyYXRvciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHN0b3Jlc1RvUHJvY2Vzcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVJdGVyYXRvcik7XG4gICAgICAgICAgdGltZUl0ZXJhdG9yID0gbnVsbDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5ID0gc3RvcmVzVG9Qcm9jZXNzLnNoaWZ0KCk7XG4gICAgICAgIHZhciBzdG9yYWdlS2V5ID0gY3JlYXRlU3RvcmFnZUtleShrZXkpO1xuICAgICAgICB2YXIgZW5kU3RhdGUgPSB0cmFuc2Zvcm1zLnJlZHVjZShmdW5jdGlvbiAoc3ViU3RhdGUsIHRyYW5zZm9ybWVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVyLmluKHN1YlN0YXRlLCBrZXkpO1xuICAgICAgICB9LCBzdGF0ZUdldHRlcihzdG9yZS5nZXRTdGF0ZSgpLCBrZXkpKTtcbiAgICAgICAgaWYgKHR5cGVvZiBlbmRTdGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCBzZXJpYWxpemVyKGVuZFN0YXRlKSwgd2FybklmU2V0RXJyb3Ioa2V5KSk7XG4gICAgICB9LCBkZWJvdW5jZSk7XG4gICAgfVxuXG4gICAgbGFzdFN0YXRlID0gc3RhdGU7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHBhc3NXaGl0ZWxpc3RCbGFja2xpc3Qoa2V5KSB7XG4gICAgaWYgKHdoaXRlbGlzdCAmJiB3aGl0ZWxpc3QuaW5kZXhPZihrZXkpID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChibGFja2xpc3QuaW5kZXhPZihrZXkpICE9PSAtMSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRob2NSZWh5ZHJhdGUoaW5jb21pbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICB2YXIgc3RhdGUgPSB7fTtcbiAgICBpZiAob3B0aW9ucy5zZXJpYWwpIHtcbiAgICAgIHN0YXRlSXRlcmF0b3IoaW5jb21pbmcsIGZ1bmN0aW9uIChzdWJTdGF0ZSwga2V5KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBkZXNlcmlhbGl6ZXIoc3ViU3RhdGUpO1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHRyYW5zZm9ybXMucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGludGVyU3RhdGUsIHRyYW5zZm9ybWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtZXIub3V0KGludGVyU3RhdGUsIGtleSk7XG4gICAgICAgICAgfSwgZGF0YSk7XG4gICAgICAgICAgc3RhdGUgPSBzdGF0ZVNldHRlcihzdGF0ZSwga2V5LCB2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBjb25zb2xlLndhcm4oJ0Vycm9yIHJlaHlkcmF0aW5nIGRhdGEgZm9yIGtleSBcIicgKyBrZXkgKyAnXCInLCBzdWJTdGF0ZSwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHN0YXRlID0gaW5jb21pbmc7XG5cbiAgICBzdG9yZS5kaXNwYXRjaChyZWh5ZHJhdGVBY3Rpb24oc3RhdGUpKTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdG9yYWdlS2V5KGtleSkge1xuICAgIHJldHVybiAnJyArIGtleVByZWZpeCArIGtleTtcbiAgfVxuXG4gIC8vIHJldHVybiBgcGVyc2lzdG9yYFxuICByZXR1cm4ge1xuICAgIHJlaHlkcmF0ZTogYWRob2NSZWh5ZHJhdGUsXG4gICAgcGF1c2U6IGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgcGF1c2VkID0gdHJ1ZTtcbiAgICB9LFxuICAgIHJlc3VtZTogZnVuY3Rpb24gcmVzdW1lKCkge1xuICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgfSxcbiAgICBwdXJnZTogZnVuY3Rpb24gcHVyZ2Uoa2V5cykge1xuICAgICAgcmV0dXJuIHB1cmdlU3RvcmVkU3RhdGUoeyBzdG9yYWdlOiBzdG9yYWdlLCBrZXlQcmVmaXg6IGtleVByZWZpeCB9LCBrZXlzKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdhcm5JZlNldEVycm9yKGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24gc2V0RXJyb3IoZXJyKSB7XG4gICAgaWYgKGVyciAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Vycm9yIHN0b3JpbmcgZGF0YSBmb3Iga2V5OicsIGtleSwgZXJyKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXJpYWxpemVyKGRhdGEpIHtcbiAgcmV0dXJuIHN0cmluZ2lmeShkYXRhLCBudWxsLCBudWxsLCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSByZXR1cm4gbnVsbDtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1xcbiAgICAgIHJlZHV4LXBlcnNpc3Q6IGNhbm5vdCBwcm9jZXNzIGN5Y2xpY2FsIHN0YXRlLlxcbiAgICAgIENvbnNpZGVyIGNoYW5naW5nIHlvdXIgc3RhdGUgc3RydWN0dXJlIHRvIGhhdmUgbm8gY3ljbGVzLlxcbiAgICAgIEFsdGVybmF0aXZlbHkgYmxhY2tsaXN0IHRoZSBjb3JyZXNwb25kaW5nIHJlZHVjZXIga2V5LlxcbiAgICAgIEN5Y2xlIGVuY291bnRlZCBhdCBrZXkgXCInICsgayArICdcIiB3aXRoIHZhbHVlIFwiJyArIHYgKyAnXCIuXFxuICAgICcpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdERlc2VyaWFsaXplcihzZXJpYWwpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2Uoc2VyaWFsKTtcbn1cblxuZnVuY3Rpb24gcmVoeWRyYXRlQWN0aW9uKGRhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSRUhZRFJBVEUsXG4gICAgcGF5bG9hZDogZGF0YVxuICB9O1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0U3RhdGVJdGVyYXRvcihjb2xsZWN0aW9uLCBjYWxsYmFjaykge1xuICByZXR1cm4gT2JqZWN0LmtleXMoY29sbGVjdGlvbikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKGNvbGxlY3Rpb25ba2V5XSwga2V5KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRTdGF0ZUdldHRlcihzdGF0ZSwga2V5KSB7XG4gIHJldHVybiBzdGF0ZVtrZXldO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0U3RhdGVTZXR0ZXIoc3RhdGUsIGtleSwgdmFsdWUpIHtcbiAgc3RhdGVba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gc3RhdGU7XG59Il19