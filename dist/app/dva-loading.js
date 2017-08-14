"use strict";var exports=module.exports={};var global=window=require('../npm/labrador/global.js');
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('../npm/babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('../npm/babel-runtime/helpers/defineProperty.js');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends6 = require('../npm/babel-runtime/helpers/extends.js');

var _extends7 = _interopRequireDefault(_extends6);

var _labrador = require('../npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHOW = '@@DVA_LOADING/SHOW';
var HIDE = '@@DVA_LOADING/HIDE';
var NAMESPACE = 'loading';

function createLoading() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var namespace = opts.namespace || NAMESPACE;
  var initialState = {
    global: false,
    models: {}
  };
  if (opts.effects) {
    initialState.effects = {};
  }

  var extraReducers = (0, _defineProperty3.default)({}, namespace, function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    var _ref2 = payload || {},
        namespace = _ref2.namespace,
        actionType = _ref2.actionType;

    var ret = void 0;
    switch (type) {
      case SHOW:
        ret = (0, _extends7.default)({}, state, {
          global: true,
          models: (0, _extends7.default)({}, state.models, (0, _defineProperty3.default)({}, namespace, true))
        });
        if (opts.effects) {
          ret.effects = (0, _extends7.default)({}, state.effects, (0, _defineProperty3.default)({}, actionType, true));
        }
        break;
      case HIDE:
        var models = (0, _extends7.default)({}, state.models, (0, _defineProperty3.default)({}, namespace, false));
        var global = (0, _keys2.default)(models).some(function (namespace) {
          return models[namespace];
        });
        ret = (0, _extends7.default)({}, state, {
          global: global,
          models: models
        });
        if (opts.effects) {
          ret.effects = (0, _extends7.default)({}, state.effects, (0, _defineProperty3.default)({}, actionType, false));
        }
        break;
      default:
        ret = state;
        break;
    }
    return ret;
  });

  function onEffect(effect, _ref3, model, actionType) {
    var put = _ref3.put;
    var namespace = model.namespace;

    return _regenerator2.default.mark(function _callee() {
      var _args = arguments;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              // show loading
              _labrador2.default.showToast({
                title: '加载中',
                icon: 'loading',
                mask: true,
                duration: 10000
              });
              //console.log('show loading...');
              _context.next = 3;
              return put({ type: SHOW, payload: { namespace: namespace, actionType: actionType } });

            case 3:
              _context.next = 5;
              return effect.apply(undefined, _args);

            case 5:

              // hide loading
              _labrador2.default.hideToast();
              //console.log('hide loading...');
              _context.next = 8;
              return put({ type: HIDE, payload: { namespace: namespace, actionType: actionType } });

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    });
  }

  return {
    extraReducers: extraReducers,
    onEffect: onEffect
  };
}

exports.default = createLoading;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImR2YS1sb2FkaW5nLmpzIl0sIm5hbWVzIjpbIlNIT1ciLCJISURFIiwiTkFNRVNQQUNFIiwiY3JlYXRlTG9hZGluZyIsIm9wdHMiLCJuYW1lc3BhY2UiLCJpbml0aWFsU3RhdGUiLCJnbG9iYWwiLCJtb2RlbHMiLCJlZmZlY3RzIiwiZXh0cmFSZWR1Y2VycyIsInN0YXRlIiwidHlwZSIsInBheWxvYWQiLCJhY3Rpb25UeXBlIiwicmV0Iiwic29tZSIsIm9uRWZmZWN0IiwiZWZmZWN0IiwibW9kZWwiLCJwdXQiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwiZHVyYXRpb24iLCJoaWRlVG9hc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxvQkFBYjtBQUNBLElBQU1DLE9BQU8sb0JBQWI7QUFDQSxJQUFNQyxZQUFZLFNBQWxCOztBQUVBLFNBQVNDLGFBQVQsR0FBa0M7QUFBQSxNQUFYQyxJQUFXLHVFQUFKLEVBQUk7O0FBQ2hDLE1BQU1DLFlBQVlELEtBQUtDLFNBQUwsSUFBa0JILFNBQXBDO0FBQ0EsTUFBSUksZUFBZTtBQUNqQkMsWUFBUSxLQURTO0FBRWpCQyxZQUFRO0FBRlMsR0FBbkI7QUFJQSxNQUFJSixLQUFLSyxPQUFULEVBQWtCO0FBQ2hCSCxpQkFBYUcsT0FBYixHQUF1QixFQUF2QjtBQUNEOztBQUVELE1BQU1DLGtEQUNITCxTQURHLGNBQ2lEO0FBQUEsUUFBekNNLEtBQXlDLHVFQUFqQ0wsWUFBaUM7QUFBQTtBQUFBLFFBQWpCTSxJQUFpQixRQUFqQkEsSUFBaUI7QUFBQSxRQUFYQyxPQUFXLFFBQVhBLE9BQVc7O0FBQUEsZ0JBQ2pCQSxXQUFXLEVBRE07QUFBQSxRQUMzQ1IsU0FEMkMsU0FDM0NBLFNBRDJDO0FBQUEsUUFDaENTLFVBRGdDLFNBQ2hDQSxVQURnQzs7QUFFbkQsUUFBSUMsWUFBSjtBQUNBLFlBQVFILElBQVI7QUFDRSxXQUFLWixJQUFMO0FBQ0VlLHlDQUNLSixLQURMO0FBRUVKLGtCQUFRLElBRlY7QUFHRUMsNkNBQWFHLE1BQU1ILE1BQW5CLG9DQUE0QkgsU0FBNUIsRUFBdUMsSUFBdkM7QUFIRjtBQUtBLFlBQUlELEtBQUtLLE9BQVQsRUFBa0I7QUFDaEJNLGNBQUlOLE9BQUosOEJBQW1CRSxNQUFNRixPQUF6QixvQ0FBbUNLLFVBQW5DLEVBQWdELElBQWhEO0FBQ0Q7QUFDRDtBQUNGLFdBQUtiLElBQUw7QUFDRSxZQUFNTyxvQ0FBY0csTUFBTUgsTUFBcEIsb0NBQTZCSCxTQUE3QixFQUF3QyxLQUF4QyxFQUFOO0FBQ0EsWUFBTUUsU0FBUyxvQkFBWUMsTUFBWixFQUFvQlEsSUFBcEIsQ0FBeUIscUJBQWE7QUFDbkQsaUJBQU9SLE9BQU9ILFNBQVAsQ0FBUDtBQUNELFNBRmMsQ0FBZjtBQUdBVSx5Q0FDS0osS0FETDtBQUVFSix3QkFGRjtBQUdFQztBQUhGO0FBS0EsWUFBSUosS0FBS0ssT0FBVCxFQUFrQjtBQUNoQk0sY0FBSU4sT0FBSiw4QkFBbUJFLE1BQU1GLE9BQXpCLG9DQUFtQ0ssVUFBbkMsRUFBZ0QsS0FBaEQ7QUFDRDtBQUNEO0FBQ0Y7QUFDRUMsY0FBTUosS0FBTjtBQUNBO0FBM0JKO0FBNkJBLFdBQU9JLEdBQVA7QUFDRCxHQWxDRyxDQUFOOztBQXFDQSxXQUFTRSxRQUFULENBQWtCQyxNQUFsQixTQUFtQ0MsS0FBbkMsRUFBMENMLFVBQTFDLEVBQXNEO0FBQUEsUUFBMUJNLEdBQTBCLFNBQTFCQSxHQUEwQjtBQUFBLFFBQzVDZixTQUQ0QyxHQUM5QmMsS0FEOEIsQ0FDNUNkLFNBRDRDOztBQUVwRCxzQ0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBRUw7QUFDQSxpQ0FBR2dCLFNBQUgsQ0FBYTtBQUNYQyx1QkFBTyxLQURJO0FBRVhDLHNCQUFNLFNBRks7QUFHWEMsc0JBQU0sSUFISztBQUlYQywwQkFBVTtBQUpDLGVBQWI7QUFNQTtBQVRLO0FBQUEscUJBVUNMLElBQUksRUFBRVIsTUFBTVosSUFBUixFQUFjYSxTQUFTLEVBQUVSLG9CQUFGLEVBQWFTLHNCQUFiLEVBQXZCLEVBQUosQ0FWRDs7QUFBQTtBQUFBO0FBQUEscUJBYUNJLDhCQWJEOztBQUFBOztBQWVMO0FBQ0EsaUNBQUdRLFNBQUg7QUFDQTtBQWpCSztBQUFBLHFCQWtCQ04sSUFBSSxFQUFFUixNQUFNWCxJQUFSLEVBQWNZLFNBQVMsRUFBRVIsb0JBQUYsRUFBYVMsc0JBQWIsRUFBdkIsRUFBSixDQWxCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFQO0FBb0JEOztBQUVELFNBQU87QUFDTEosZ0NBREs7QUFFTE87QUFGSyxHQUFQO0FBSUQ7O2tCQUVjZCxhIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd3ggZnJvbSAnbGFicmFkb3InO1xyXG5cclxuY29uc3QgU0hPVyA9ICdAQERWQV9MT0FESU5HL1NIT1cnO1xyXG5jb25zdCBISURFID0gJ0BARFZBX0xPQURJTkcvSElERSc7XHJcbmNvbnN0IE5BTUVTUEFDRSA9ICdsb2FkaW5nJztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxvYWRpbmcob3B0cyA9IHt9KSB7XHJcbiAgY29uc3QgbmFtZXNwYWNlID0gb3B0cy5uYW1lc3BhY2UgfHwgTkFNRVNQQUNFO1xyXG4gIGxldCBpbml0aWFsU3RhdGUgPSB7XHJcbiAgICBnbG9iYWw6IGZhbHNlLFxyXG4gICAgbW9kZWxzOiB7fSxcclxuICB9O1xyXG4gIGlmIChvcHRzLmVmZmVjdHMpIHtcclxuICAgIGluaXRpYWxTdGF0ZS5lZmZlY3RzID0ge307XHJcbiAgfVxyXG5cclxuICBjb25zdCBleHRyYVJlZHVjZXJzID0ge1xyXG4gICAgW25hbWVzcGFjZV0oc3RhdGUgPSBpbml0aWFsU3RhdGUsIHsgdHlwZSwgcGF5bG9hZCB9KSB7XHJcbiAgICAgIGNvbnN0IHsgbmFtZXNwYWNlLCBhY3Rpb25UeXBlIH0gPSBwYXlsb2FkIHx8IHt9O1xyXG4gICAgICBsZXQgcmV0O1xyXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlIFNIT1c6XHJcbiAgICAgICAgICByZXQgPSB7XHJcbiAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICBnbG9iYWw6IHRydWUsXHJcbiAgICAgICAgICAgIG1vZGVsczogeyAuLi5zdGF0ZS5tb2RlbHMsIFtuYW1lc3BhY2VdOnRydWUgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBpZiAob3B0cy5lZmZlY3RzKSB7XHJcbiAgICAgICAgICAgIHJldC5lZmZlY3RzID0geyAuLi5zdGF0ZS5lZmZlY3RzLCBbYWN0aW9uVHlwZV06IHRydWUgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgSElERTpcclxuICAgICAgICAgIGNvbnN0IG1vZGVscyA9IHsgLi4uc3RhdGUubW9kZWxzLCBbbmFtZXNwYWNlXTpmYWxzZSB9O1xyXG4gICAgICAgICAgY29uc3QgZ2xvYmFsID0gT2JqZWN0LmtleXMobW9kZWxzKS5zb21lKG5hbWVzcGFjZSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbHNbbmFtZXNwYWNlXTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0ID0ge1xyXG4gICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgZ2xvYmFsLFxyXG4gICAgICAgICAgICBtb2RlbHMsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgaWYgKG9wdHMuZWZmZWN0cykge1xyXG4gICAgICAgICAgICByZXQuZWZmZWN0cyA9IHsgLi4uc3RhdGUuZWZmZWN0cywgW2FjdGlvblR5cGVdOiBmYWxzZSB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldCA9IHN0YXRlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gb25FZmZlY3QoZWZmZWN0LCB7IHB1dCB9LCBtb2RlbCwgYWN0aW9uVHlwZSkge1xyXG4gICAgY29uc3QgeyBuYW1lc3BhY2UgfSA9IG1vZGVsO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKiguLi5hcmdzKSB7XHJcblxyXG4gICAgICAvLyBzaG93IGxvYWRpbmdcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxyXG4gICAgICAgIG1hc2s6IHRydWUsXHJcbiAgICAgICAgZHVyYXRpb246IDEwMDAwLFxyXG4gICAgICB9KTtcclxuICAgICAgLy9jb25zb2xlLmxvZygnc2hvdyBsb2FkaW5nLi4uJyk7XHJcbiAgICAgIHlpZWxkIHB1dCh7IHR5cGU6IFNIT1csIHBheWxvYWQ6IHsgbmFtZXNwYWNlLCBhY3Rpb25UeXBlIH0gfSk7ICAgICAgXHJcblxyXG4gICAgICAvLyBkbyBhY3Rpb25cclxuICAgICAgeWllbGQgZWZmZWN0KC4uLmFyZ3MpO1xyXG5cclxuICAgICAgLy8gaGlkZSBsb2FkaW5nXHJcbiAgICAgIHd4LmhpZGVUb2FzdCgpO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKCdoaWRlIGxvYWRpbmcuLi4nKTtcclxuICAgICAgeWllbGQgcHV0KHsgdHlwZTogSElERSwgcGF5bG9hZDogeyBuYW1lc3BhY2UsIGFjdGlvblR5cGUgfSB9KTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZXh0cmFSZWR1Y2VycyxcclxuICAgIG9uRWZmZWN0LFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUxvYWRpbmc7Il19