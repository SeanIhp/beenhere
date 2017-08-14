"use strict";var exports=module.exports={};var global=window=require('../../../labrador/global.js');"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('../../../babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _iterator = require('../../../babel-runtime/core-js/symbol/iterator.js');

var _iterator2 = _interopRequireDefault(_iterator);

var _typeof3 = require('../../../babel-runtime/helpers/typeof.js');

var _typeof4 = _interopRequireDefault(_typeof3);

var _symbol = require('../../../babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = function (type, config) {
  var storage = getStorage(type);
  return {
    getAllKeys: function getAllKeys(cb) {
      return new _promise2.default(function (resolve, reject) {
        try {
          var keys = [];
          for (var i = 0; i < storage.length; i++) {
            keys.push(storage.key(i));
          }
          (0, _setImmediate2.default)(function () {
            cb && cb(null, keys);
            resolve(keys);
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    getItem: function getItem(key, cb) {
      return new _promise2.default(function (resolve, reject) {
        try {
          var s = storage.getItem(key);
          (0, _setImmediate2.default)(function () {
            cb && cb(null, s);
            resolve(s);
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    setItem: function setItem(key, string, cb) {
      return new _promise2.default(function (resolve, reject) {
        try {
          storage.setItem(key, string);
          (0, _setImmediate2.default)(function () {
            cb && cb(null);
            resolve();
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    removeItem: function removeItem(key, cb) {
      return new _promise2.default(function (resolve, reject) {
        try {
          storage.removeItem(key);
          (0, _setImmediate2.default)(function () {
            cb && cb(null);
            resolve();
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    }
  };
};

var _setImmediate = require('../utils/setImmediate.js');

var _setImmediate2 = _interopRequireDefault(_setImmediate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
};

var noStorage = function noStorage() {
  /* noop */return null;
};
if ("development" !== 'production') {
  noStorage = function noStorage() {
    console.error('redux-persist asyncLocalStorage requires a global localStorage object. Either use a different storage backend or if this is a universal redux application you probably should conditionally persist like so: https://gist.github.com/rt2zz/ac9eb396793f95ff3c3b');
    return null;
  };
}

function _hasStorage(storageType) {
  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(storageType in window)) {
    return false;
  }

  try {
    var storage = window[storageType];
    var testKey = 'redux-persist ' + storageType + ' test';
    storage.setItem(testKey, 'test');
    storage.getItem(testKey);
    storage.removeItem(testKey);
  } catch (e) {
    if ("development" !== 'production') console.warn('redux-persist ' + storageType + ' test failed, persistence will be disabled.');
    return false;
  }
  return true;
}

function hasLocalStorage() {
  return _hasStorage('localStorage');
}

function hasSessionStorage() {
  return _hasStorage('sessionStorage');
}

function getStorage(type) {
  if (type === 'local') {
    return hasLocalStorage() ? window.localStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
  }
  if (type === 'session') {
    return hasSessionStorage() ? window.sessionStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzeW5jTG9jYWxTdG9yYWdlLmpzIl0sIm5hbWVzIjpbInR5cGUiLCJjb25maWciLCJzdG9yYWdlIiwiZ2V0U3RvcmFnZSIsImdldEFsbEtleXMiLCJjYiIsInJlc29sdmUiLCJyZWplY3QiLCJrZXlzIiwiaSIsImxlbmd0aCIsInB1c2giLCJrZXkiLCJlIiwiZ2V0SXRlbSIsInMiLCJzZXRJdGVtIiwic3RyaW5nIiwicmVtb3ZlSXRlbSIsIl90eXBlb2YiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIm5vU3RvcmFnZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJlcnJvciIsIl9oYXNTdG9yYWdlIiwic3RvcmFnZVR5cGUiLCJ3aW5kb3ciLCJ0ZXN0S2V5Iiwid2FybiIsImhhc0xvY2FsU3RvcmFnZSIsImhhc1Nlc3Npb25TdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBaURlLFVBQVVBLElBQVYsRUFBZ0JDLE1BQWhCLEVBQXdCO0FBQ3JDLE1BQUlDLFVBQVVDLFdBQVdILElBQVgsQ0FBZDtBQUNBLFNBQU87QUFDTEksZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkMsRUFBcEIsRUFBd0I7QUFDbEMsYUFBTyxzQkFBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1QyxZQUFJO0FBQ0YsY0FBSUMsT0FBTyxFQUFYO0FBQ0EsZUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlQLFFBQVFRLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUN2Q0QsaUJBQUtHLElBQUwsQ0FBVVQsUUFBUVUsR0FBUixDQUFZSCxDQUFaLENBQVY7QUFDRDtBQUNELHNDQUFhLFlBQVk7QUFDdkJKLGtCQUFNQSxHQUFHLElBQUgsRUFBU0csSUFBVCxDQUFOO0FBQ0FGLG9CQUFRRSxJQUFSO0FBQ0QsV0FIRDtBQUlELFNBVEQsQ0FTRSxPQUFPSyxDQUFQLEVBQVU7QUFDVlIsZ0JBQU1BLEdBQUdRLENBQUgsQ0FBTjtBQUNBTixpQkFBT00sQ0FBUDtBQUNEO0FBQ0YsT0FkTSxDQUFQO0FBZUQsS0FqQkk7QUFrQkxDLGFBQVMsU0FBU0EsT0FBVCxDQUFpQkYsR0FBakIsRUFBc0JQLEVBQXRCLEVBQTBCO0FBQ2pDLGFBQU8sc0JBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUMsWUFBSTtBQUNGLGNBQUlRLElBQUliLFFBQVFZLE9BQVIsQ0FBZ0JGLEdBQWhCLENBQVI7QUFDQSxzQ0FBYSxZQUFZO0FBQ3ZCUCxrQkFBTUEsR0FBRyxJQUFILEVBQVNVLENBQVQsQ0FBTjtBQUNBVCxvQkFBUVMsQ0FBUjtBQUNELFdBSEQ7QUFJRCxTQU5ELENBTUUsT0FBT0YsQ0FBUCxFQUFVO0FBQ1ZSLGdCQUFNQSxHQUFHUSxDQUFILENBQU47QUFDQU4saUJBQU9NLENBQVA7QUFDRDtBQUNGLE9BWE0sQ0FBUDtBQVlELEtBL0JJO0FBZ0NMRyxhQUFTLFNBQVNBLE9BQVQsQ0FBaUJKLEdBQWpCLEVBQXNCSyxNQUF0QixFQUE4QlosRUFBOUIsRUFBa0M7QUFDekMsYUFBTyxzQkFBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1QyxZQUFJO0FBQ0ZMLGtCQUFRYyxPQUFSLENBQWdCSixHQUFoQixFQUFxQkssTUFBckI7QUFDQSxzQ0FBYSxZQUFZO0FBQ3ZCWixrQkFBTUEsR0FBRyxJQUFILENBQU47QUFDQUM7QUFDRCxXQUhEO0FBSUQsU0FORCxDQU1FLE9BQU9PLENBQVAsRUFBVTtBQUNWUixnQkFBTUEsR0FBR1EsQ0FBSCxDQUFOO0FBQ0FOLGlCQUFPTSxDQUFQO0FBQ0Q7QUFDRixPQVhNLENBQVA7QUFZRCxLQTdDSTtBQThDTEssZ0JBQVksU0FBU0EsVUFBVCxDQUFvQk4sR0FBcEIsRUFBeUJQLEVBQXpCLEVBQTZCO0FBQ3ZDLGFBQU8sc0JBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUMsWUFBSTtBQUNGTCxrQkFBUWdCLFVBQVIsQ0FBbUJOLEdBQW5CO0FBQ0Esc0NBQWEsWUFBWTtBQUN2QlAsa0JBQU1BLEdBQUcsSUFBSCxDQUFOO0FBQ0FDO0FBQ0QsV0FIRDtBQUlELFNBTkQsQ0FNRSxPQUFPTyxDQUFQLEVBQVU7QUFDVlIsZ0JBQU1BLEdBQUdRLENBQUgsQ0FBTjtBQUNBTixpQkFBT00sQ0FBUDtBQUNEO0FBQ0YsT0FYTSxDQUFQO0FBWUQ7QUEzREksR0FBUDtBQTZERCxDOztBQTlHRDs7Ozs7O0FBRkEsSUFBSU0sVUFBVSw0QkFBa0IsVUFBbEIsSUFBZ0MsOENBQTJCLFFBQTNELEdBQXNFLFVBQVVDLEdBQVYsRUFBZTtBQUFFLGdCQUFjQSxHQUFkLHVEQUFjQSxHQUFkO0FBQW9CLENBQTNHLEdBQThHLFVBQVVBLEdBQVYsRUFBZTtBQUFFLFNBQU9BLE9BQU8sNEJBQWtCLFVBQXpCLElBQXVDQSxJQUFJQyxXQUFKLHFCQUF2QyxJQUFxRUQseUJBQWVFLFNBQXBGLEdBQWdHLFFBQWhHLFVBQWtIRixHQUFsSCx1REFBa0hBLEdBQWxILENBQVA7QUFBK0gsQ0FBNVE7O0FBSUEsSUFBSUcsWUFBWSxTQUFTQSxTQUFULEdBQXFCO0FBQ25DLFlBQVUsT0FBTyxJQUFQO0FBQ1gsQ0FGRDtBQUdBLElBQUlDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q0gsY0FBWSxTQUFTQSxTQUFULEdBQXFCO0FBQy9CSSxZQUFRQyxLQUFSLENBQWMsaVFBQWQ7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUhEO0FBSUQ7O0FBRUQsU0FBU0MsV0FBVCxDQUFxQkMsV0FBckIsRUFBa0M7QUFDaEMsTUFBSSxDQUFDLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0MsV0FBaEMsR0FBOENaLFFBQVFZLE1BQVIsQ0FBL0MsTUFBb0UsUUFBcEUsSUFBZ0YsRUFBRUQsZUFBZUMsTUFBakIsQ0FBcEYsRUFBOEc7QUFDNUcsV0FBTyxLQUFQO0FBQ0Q7O0FBRUQsTUFBSTtBQUNGLFFBQUk3QixVQUFVNkIsT0FBT0QsV0FBUCxDQUFkO0FBQ0EsUUFBSUUsVUFBVSxtQkFBbUJGLFdBQW5CLEdBQWlDLE9BQS9DO0FBQ0E1QixZQUFRYyxPQUFSLENBQWdCZ0IsT0FBaEIsRUFBeUIsTUFBekI7QUFDQTlCLFlBQVFZLE9BQVIsQ0FBZ0JrQixPQUFoQjtBQUNBOUIsWUFBUWdCLFVBQVIsQ0FBbUJjLE9BQW5CO0FBQ0QsR0FORCxDQU1FLE9BQU9uQixDQUFQLEVBQVU7QUFDVixRQUFJVyxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkNDLFFBQVFNLElBQVIsQ0FBYSxtQkFBbUJILFdBQW5CLEdBQWlDLDZDQUE5QztBQUMzQyxXQUFPLEtBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVNJLGVBQVQsR0FBMkI7QUFDekIsU0FBT0wsWUFBWSxjQUFaLENBQVA7QUFDRDs7QUFFRCxTQUFTTSxpQkFBVCxHQUE2QjtBQUMzQixTQUFPTixZQUFZLGdCQUFaLENBQVA7QUFDRDs7QUFFRCxTQUFTMUIsVUFBVCxDQUFvQkgsSUFBcEIsRUFBMEI7QUFDeEIsTUFBSUEsU0FBUyxPQUFiLEVBQXNCO0FBQ3BCLFdBQU9rQyxvQkFBb0JILE9BQU9LLFlBQTNCLEdBQTBDLEVBQUV0QixTQUFTUyxTQUFYLEVBQXNCUCxTQUFTTyxTQUEvQixFQUEwQ0wsWUFBWUssU0FBdEQsRUFBaUVuQixZQUFZbUIsU0FBN0UsRUFBakQ7QUFDRDtBQUNELE1BQUl2QixTQUFTLFNBQWIsRUFBd0I7QUFDdEIsV0FBT21DLHNCQUFzQkosT0FBT00sY0FBN0IsR0FBOEMsRUFBRXZCLFNBQVNTLFNBQVgsRUFBc0JQLFNBQVNPLFNBQS9CLEVBQTBDTCxZQUFZSyxTQUF0RCxFQUFpRW5CLFlBQVltQixTQUE3RSxFQUFyRDtBQUNEO0FBQ0YiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuaW1wb3J0IHNldEltbWVkaWF0ZSBmcm9tICcuLi91dGlscy9zZXRJbW1lZGlhdGUnO1xuXG52YXIgbm9TdG9yYWdlID0gZnVuY3Rpb24gbm9TdG9yYWdlKCkge1xuICAvKiBub29wICovcmV0dXJuIG51bGw7XG59O1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgbm9TdG9yYWdlID0gZnVuY3Rpb24gbm9TdG9yYWdlKCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ3JlZHV4LXBlcnNpc3QgYXN5bmNMb2NhbFN0b3JhZ2UgcmVxdWlyZXMgYSBnbG9iYWwgbG9jYWxTdG9yYWdlIG9iamVjdC4gRWl0aGVyIHVzZSBhIGRpZmZlcmVudCBzdG9yYWdlIGJhY2tlbmQgb3IgaWYgdGhpcyBpcyBhIHVuaXZlcnNhbCByZWR1eCBhcHBsaWNhdGlvbiB5b3UgcHJvYmFibHkgc2hvdWxkIGNvbmRpdGlvbmFsbHkgcGVyc2lzdCBsaWtlIHNvOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9ydDJ6ei9hYzllYjM5Njc5M2Y5NWZmM2MzYicpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xufVxuXG5mdW5jdGlvbiBfaGFzU3RvcmFnZShzdG9yYWdlVHlwZSkge1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHdpbmRvdykpICE9PSAnb2JqZWN0JyB8fCAhKHN0b3JhZ2VUeXBlIGluIHdpbmRvdykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cnkge1xuICAgIHZhciBzdG9yYWdlID0gd2luZG93W3N0b3JhZ2VUeXBlXTtcbiAgICB2YXIgdGVzdEtleSA9ICdyZWR1eC1wZXJzaXN0ICcgKyBzdG9yYWdlVHlwZSArICcgdGVzdCc7XG4gICAgc3RvcmFnZS5zZXRJdGVtKHRlc3RLZXksICd0ZXN0Jyk7XG4gICAgc3RvcmFnZS5nZXRJdGVtKHRlc3RLZXkpO1xuICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh0ZXN0S2V5KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBjb25zb2xlLndhcm4oJ3JlZHV4LXBlcnNpc3QgJyArIHN0b3JhZ2VUeXBlICsgJyB0ZXN0IGZhaWxlZCwgcGVyc2lzdGVuY2Ugd2lsbCBiZSBkaXNhYmxlZC4nKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGhhc0xvY2FsU3RvcmFnZSgpIHtcbiAgcmV0dXJuIF9oYXNTdG9yYWdlKCdsb2NhbFN0b3JhZ2UnKTtcbn1cblxuZnVuY3Rpb24gaGFzU2Vzc2lvblN0b3JhZ2UoKSB7XG4gIHJldHVybiBfaGFzU3RvcmFnZSgnc2Vzc2lvblN0b3JhZ2UnKTtcbn1cblxuZnVuY3Rpb24gZ2V0U3RvcmFnZSh0eXBlKSB7XG4gIGlmICh0eXBlID09PSAnbG9jYWwnKSB7XG4gICAgcmV0dXJuIGhhc0xvY2FsU3RvcmFnZSgpID8gd2luZG93LmxvY2FsU3RvcmFnZSA6IHsgZ2V0SXRlbTogbm9TdG9yYWdlLCBzZXRJdGVtOiBub1N0b3JhZ2UsIHJlbW92ZUl0ZW06IG5vU3RvcmFnZSwgZ2V0QWxsS2V5czogbm9TdG9yYWdlIH07XG4gIH1cbiAgaWYgKHR5cGUgPT09ICdzZXNzaW9uJykge1xuICAgIHJldHVybiBoYXNTZXNzaW9uU3RvcmFnZSgpID8gd2luZG93LnNlc3Npb25TdG9yYWdlIDogeyBnZXRJdGVtOiBub1N0b3JhZ2UsIHNldEl0ZW06IG5vU3RvcmFnZSwgcmVtb3ZlSXRlbTogbm9TdG9yYWdlLCBnZXRBbGxLZXlzOiBub1N0b3JhZ2UgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodHlwZSwgY29uZmlnKSB7XG4gIHZhciBzdG9yYWdlID0gZ2V0U3RvcmFnZSh0eXBlKTtcbiAgcmV0dXJuIHtcbiAgICBnZXRBbGxLZXlzOiBmdW5jdGlvbiBnZXRBbGxLZXlzKGNiKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3RvcmFnZS5rZXkoaSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwga2V5cyk7XG4gICAgICAgICAgICByZXNvbHZlKGtleXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY2IgJiYgY2IoZSk7XG4gICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEl0ZW06IGZ1bmN0aW9uIGdldEl0ZW0oa2V5LCBjYikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgcyA9IHN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYiAmJiBjYihudWxsLCBzKTtcbiAgICAgICAgICAgIHJlc29sdmUocyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjYiAmJiBjYihlKTtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2V0SXRlbTogZnVuY3Rpb24gc2V0SXRlbShrZXksIHN0cmluZywgY2IpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKGtleSwgc3RyaW5nKTtcbiAgICAgICAgICBzZXRJbW1lZGlhdGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2IgJiYgY2IobnVsbCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjYiAmJiBjYihlKTtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXksIGNiKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgIHNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYiAmJiBjYihudWxsKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNiICYmIGNiKGUpO1xuICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufSJdfQ==