"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('../babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('../babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.create = create;

var _labrador = require('../labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

var _stringify = require('../qs/lib/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 默认获取SessionID方法
 * @returns {string}
 */
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-19
 * @author Liang <liang@maichong.it>
 */

function defaultGetSession() {
  return _labrador2.default.app.sessionId;
}

/**
 * 默认设置SessionID方法
 * @param {string} sessionId
 */
function defaultSetSession(sessionId) {
  _labrador2.default.app.sessionId = sessionId;
}

// 有效HTTP方法列表
var methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'TRACE', 'CONNECT'];

/**
 * 创建API Request客户端
 * @param {Object} options 选项
 * @returns {Function}
 */
function create(options) {

  /**
   * 通用Alaska RESTFUL风格API请求,如果alaska接口返回错误,则抛出异常
   * @param {string} [method] 请求方法,可选默认GET,有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   * @param {string} apiName  API名称,必选
   * @param {object} [data]   数据,可选,如果方法为GET或DELETE,则此对象中的所有数据将传入URL query
   * @param {object} [header] HTTP头对象,可选
   * @returns {*}
   */
  var request = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(method, apiName, data, header) {
      var apiRoot, updateKey, headerKey, getSession, setSession, defaultHeader, url, querystring, sessionId, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              apiRoot = options.apiRoot || {};
              updateKey = options.updateKey || '_session';
              headerKey = options.headerKey || 'Session';
              getSession = options.getSession || defaultGetSession;
              setSession = options.setSession || defaultSetSession;
              defaultHeader = options.defaultHeader;


              if (methods.indexOf(method) === -1) {
                header = data;
                data = apiName;
                apiName = method;
                method = 'GET';
              }

              url = apiRoot + apiName;


              if (['POST', 'PUT'].indexOf(method) === -1 && data) {
                querystring = (0, _stringify2.default)(data);

                if (url.indexOf('?') > -1) {
                  url += '&' + querystring;
                } else {
                  url += '?' + querystring;
                }
                data = undefined;
              }

              header = (0, _assign2.default)({}, defaultHeader, header);

              if (options.session !== false) {
                sessionId = getSession();

                if (sessionId) {
                  header[headerKey] = sessionId;
                }
              }

              _context.next = 13;
              return _labrador2.default.request({
                method: method,
                url: url,
                data: data,
                header: header
              });

            case 13:
              res = _context.sent;


              if (options.session !== false && res.data && res.data[updateKey]) {
                if (res.data && res.data[updateKey]) {
                  setSession(res.data[updateKey]);
                }
              }

              if (!(res.data && res.data.error)) {
                _context.next = 17;
                break;
              }

              throw new Error(res.data.error);

            case 17:
              return _context.abrupt('return', res.data);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function request(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();

  options = options || {};

  methods.forEach(function (method) {
    request[method.toLowerCase()] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return request.apply(undefined, [method].concat(args));
    };
  });

  request.setOptions = function (newOptions) {
    options = (0, _assign2.default)(options, newOptions || {});
  };

  request.getOptions = function () {
    return options;
  };

  return request;
}

/**
 * 导出默认API客户端
 */
exports.default = create({
  apiRoot: typeof "http://localhost:5000/" === 'undefined' ? '' : "http://localhost:5000/"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsImRlZmF1bHRHZXRTZXNzaW9uIiwiYXBwIiwic2Vzc2lvbklkIiwiZGVmYXVsdFNldFNlc3Npb24iLCJtZXRob2RzIiwib3B0aW9ucyIsIm1ldGhvZCIsImFwaU5hbWUiLCJkYXRhIiwiaGVhZGVyIiwiYXBpUm9vdCIsInVwZGF0ZUtleSIsImhlYWRlcktleSIsImdldFNlc3Npb24iLCJzZXRTZXNzaW9uIiwiZGVmYXVsdEhlYWRlciIsImluZGV4T2YiLCJ1cmwiLCJxdWVyeXN0cmluZyIsInVuZGVmaW5lZCIsInNlc3Npb24iLCJyZXF1ZXN0IiwicmVzIiwiZXJyb3IiLCJFcnJvciIsImZvckVhY2giLCJ0b0xvd2VyQ2FzZSIsImFyZ3MiLCJzZXRPcHRpb25zIiwibmV3T3B0aW9ucyIsImdldE9wdGlvbnMiLCJBUElfUk9PVCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBaUNnQkEsTSxHQUFBQSxNOztBQTNCaEI7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFUQTs7Ozs7O0FBYUEsU0FBU0MsaUJBQVQsR0FBNkI7QUFDM0IsU0FBTyxtQkFBR0MsR0FBSCxDQUFPQyxTQUFkO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxTQUFTQyxpQkFBVCxDQUEyQkQsU0FBM0IsRUFBc0M7QUFDcEMscUJBQUdELEdBQUgsQ0FBT0MsU0FBUCxHQUFtQkEsU0FBbkI7QUFDRDs7QUFFRDtBQUNBLElBQU1FLFVBQVUsQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixLQUFoQixFQUF1QixRQUF2QixFQUFpQyxTQUFqQyxFQUE0QyxNQUE1QyxFQUFvRCxPQUFwRCxFQUE2RCxTQUE3RCxDQUFoQjs7QUFFQTs7Ozs7QUFLTyxTQUFTTCxNQUFULENBQWdCTSxPQUFoQixFQUF5Qjs7QUFHOUI7Ozs7Ozs7O0FBSDhCO0FBQUEsMEVBVzlCLGlCQUF1QkMsTUFBdkIsRUFBK0JDLE9BQS9CLEVBQXdDQyxJQUF4QyxFQUE4Q0MsTUFBOUM7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VUFBUVMsVUFBUixHQUFxQixZQUFZO0FBQy9CLFdBQU96QixPQUFQO0FBQ0QsR0FGRDs7QUFJQSxTQUFPZ0IsT0FBUDtBQUNEOztBQUVEOzs7a0JBR2V0QixPQUFPO0FBQ3BCVyxXQUFTLE9BQU9xQixRQUFQLEtBQW9CLFdBQXBCLEdBQWtDLEVBQWxDLEdBQXVDQTtBQUQ1QixDQUFQLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBNYWljaG9uZyBTb2Z0d2FyZSBMdGQuIDIwMTYgaHR0cDovL21haWNob25nLml0XG4gKiBAZGF0ZSAyMDE2LTExLTE5XG4gKiBAYXV0aG9yIExpYW5nIDxsaWFuZ0BtYWljaG9uZy5pdD5cbiAqL1xuXG5pbXBvcnQgd3ggZnJvbSAnbGFicmFkb3InO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICdxcy9saWIvc3RyaW5naWZ5JztcblxuLyoqXG4gKiDpu5jorqTojrflj5ZTZXNzaW9uSUTmlrnms5VcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRHZXRTZXNzaW9uKCkge1xuICByZXR1cm4gd3guYXBwLnNlc3Npb25JZDtcbn1cblxuLyoqXG4gKiDpu5jorqTorr7nva5TZXNzaW9uSUTmlrnms5VcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZXNzaW9uSWRcbiAqL1xuZnVuY3Rpb24gZGVmYXVsdFNldFNlc3Npb24oc2Vzc2lvbklkKSB7XG4gIHd4LmFwcC5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XG59XG5cbi8vIOacieaViEhUVFDmlrnms5XliJfooahcbmNvbnN0IG1ldGhvZHMgPSBbJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdERUxFVEUnLCAnT1BUSU9OUycsICdIRUFEJywgJ1RSQUNFJywgJ0NPTk5FQ1QnXTtcblxuLyoqXG4gKiDliJvlu7pBUEkgUmVxdWVzdOWuouaIt+err1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMg6YCJ6aG5XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAvKipcbiAgICog6YCa55SoQWxhc2thIFJFU1RGVUzpo47moLxBUEnor7fmsYIs5aaC5p6cYWxhc2th5o6l5Y+j6L+U5Zue6ZSZ6K+vLOWImeaKm+WHuuW8guW4uFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW21ldGhvZF0g6K+35rGC5pa55rOVLOWPr+mAiem7mOiupEdFVCzmnInmlYjlgLzvvJpPUFRJT05TLCBHRVQsIEhFQUQsIFBPU1QsIFBVVCwgREVMRVRFLCBUUkFDRSwgQ09OTkVDVFxuICAgKiBAcGFyYW0ge3N0cmluZ30gYXBpTmFtZSAgQVBJ5ZCN56ewLOW/hemAiVxuICAgKiBAcGFyYW0ge29iamVjdH0gW2RhdGFdICAg5pWw5o2uLOWPr+mAiSzlpoLmnpzmlrnms5XkuLpHRVTmiJZERUxFVEUs5YiZ5q2k5a+56LGh5Lit55qE5omA5pyJ5pWw5o2u5bCG5Lyg5YWlVVJMIHF1ZXJ5XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbaGVhZGVyXSBIVFRQ5aS05a+56LGhLOWPr+mAiVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3QobWV0aG9kLCBhcGlOYW1lLCBkYXRhLCBoZWFkZXIpIHtcbiAgICBjb25zdCBhcGlSb290ID0gb3B0aW9ucy5hcGlSb290IHx8IHt9O1xuICAgIGNvbnN0IHVwZGF0ZUtleSA9IG9wdGlvbnMudXBkYXRlS2V5IHx8ICdfc2Vzc2lvbic7XG4gICAgY29uc3QgaGVhZGVyS2V5ID0gb3B0aW9ucy5oZWFkZXJLZXkgfHwgJ1Nlc3Npb24nO1xuICAgIGNvbnN0IGdldFNlc3Npb24gPSBvcHRpb25zLmdldFNlc3Npb24gfHwgZGVmYXVsdEdldFNlc3Npb247XG4gICAgY29uc3Qgc2V0U2Vzc2lvbiA9IG9wdGlvbnMuc2V0U2Vzc2lvbiB8fCBkZWZhdWx0U2V0U2Vzc2lvbjtcbiAgICBjb25zdCBkZWZhdWx0SGVhZGVyID0gb3B0aW9ucy5kZWZhdWx0SGVhZGVyO1xuXG4gICAgaWYgKG1ldGhvZHMuaW5kZXhPZihtZXRob2QpID09PSAtMSkge1xuICAgICAgaGVhZGVyID0gZGF0YTtcbiAgICAgIGRhdGEgPSBhcGlOYW1lO1xuICAgICAgYXBpTmFtZSA9IG1ldGhvZDtcbiAgICAgIG1ldGhvZCA9ICdHRVQnO1xuICAgIH1cblxuICAgIGxldCB1cmwgPSBhcGlSb290ICsgYXBpTmFtZTtcblxuICAgIGlmIChbJ1BPU1QnLCAnUFVUJ10uaW5kZXhPZihtZXRob2QpID09PSAtMSAmJiBkYXRhKSB7XG4gICAgICBsZXQgcXVlcnlzdHJpbmcgPSBzdHJpbmdpZnkoZGF0YSk7XG4gICAgICBpZiAodXJsLmluZGV4T2YoJz8nKSA+IC0xKSB7XG4gICAgICAgIHVybCArPSAnJicgKyBxdWVyeXN0cmluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybCArPSAnPycgKyBxdWVyeXN0cmluZztcbiAgICAgIH1cbiAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaGVhZGVyID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdEhlYWRlciwgaGVhZGVyKTtcblxuICAgIGlmIChvcHRpb25zLnNlc3Npb24gIT09IGZhbHNlKSB7XG4gICAgICBsZXQgc2Vzc2lvbklkID0gZ2V0U2Vzc2lvbigpO1xuICAgICAgaWYgKHNlc3Npb25JZCkge1xuICAgICAgICBoZWFkZXJbaGVhZGVyS2V5XSA9IHNlc3Npb25JZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVzID0gYXdhaXQgd3gucmVxdWVzdCh7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhLFxuICAgICAgaGVhZGVyXG4gICAgfSk7XG5cblxuICAgIGlmIChvcHRpb25zLnNlc3Npb24gIT09IGZhbHNlICYmIHJlcy5kYXRhICYmIHJlcy5kYXRhW3VwZGF0ZUtleV0pIHtcbiAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YVt1cGRhdGVLZXldKSB7XG4gICAgICAgIHNldFNlc3Npb24ocmVzLmRhdGFbdXBkYXRlS2V5XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLmVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IocmVzLmRhdGEuZXJyb3IpO1xuICAgIH1cblxuICAgIHJldHVybiByZXMuZGF0YTtcbiAgfVxuXG4gIG1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgcmVxdWVzdFttZXRob2QudG9Mb3dlckNhc2UoKV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgcmV0dXJuIHJlcXVlc3QobWV0aG9kLCAuLi5hcmdzKTtcbiAgICB9O1xuICB9KTtcblxuICByZXF1ZXN0LnNldE9wdGlvbnMgPSBmdW5jdGlvbiAobmV3T3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMsIG5ld09wdGlvbnMgfHwge30pO1xuICB9O1xuXG4gIHJlcXVlc3QuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfTtcblxuICByZXR1cm4gcmVxdWVzdDtcbn1cblxuLyoqXG4gKiDlr7zlh7rpu5jorqRBUEnlrqLmiLfnq69cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlKHtcbiAgYXBpUm9vdDogdHlwZW9mIEFQSV9ST09UID09PSAndW5kZWZpbmVkJyA/ICcnIDogQVBJX1JPT1Rcbn0pO1xuIl19