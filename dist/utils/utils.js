"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

exports.add = add;
exports.sleep = sleep;
exports.formatTime = formatTime;
exports.formatLocation = formatLocation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function add(a, b) {
  return a + b;
}

function sleep(ms) {
  return new _promise2.default(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time;
  }

  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;

  return [hour, minute, second].map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join(':');
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }

  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImFkZCIsInNsZWVwIiwiZm9ybWF0VGltZSIsImZvcm1hdExvY2F0aW9uIiwiYSIsImIiLCJtcyIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwidGltZSIsImhvdXIiLCJwYXJzZUludCIsIm1pbnV0ZSIsInNlY29uZCIsIm1hcCIsIm4iLCJ0b1N0cmluZyIsImpvaW4iLCJsb25naXR1ZGUiLCJsYXRpdHVkZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwic3BsaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7UUFBZ0JBLEcsR0FBQUEsRztRQUlBQyxLLEdBQUFBLEs7UUFJQUMsVSxHQUFBQSxVO1FBaUJBQyxjLEdBQUFBLGM7Ozs7QUF6QlQsU0FBU0gsR0FBVCxDQUFhSSxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQjtBQUN4QixTQUFPRCxJQUFJQyxDQUFYO0FBQ0Q7O0FBRU0sU0FBU0osS0FBVCxDQUFlSyxFQUFmLEVBQW1CO0FBQ3hCLFNBQU8sc0JBQVksVUFBQ0MsT0FBRDtBQUFBLFdBQWFDLFdBQVdELE9BQVgsRUFBb0JELEVBQXBCLENBQWI7QUFBQSxHQUFaLENBQVA7QUFDRDs7QUFFTSxTQUFTSixVQUFULENBQW9CTyxJQUFwQixFQUEwQjtBQUMvQixNQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLE9BQU8sQ0FBdkMsRUFBMEM7QUFDeEMsV0FBT0EsSUFBUDtBQUNEOztBQUVELE1BQUlDLE9BQU9DLFNBQVNGLE9BQU8sSUFBaEIsQ0FBWDtBQUNBQSxTQUFPQSxPQUFPLElBQWQ7QUFDQSxNQUFJRyxTQUFTRCxTQUFTRixPQUFPLEVBQWhCLENBQWI7QUFDQUEsU0FBT0EsT0FBTyxFQUFkO0FBQ0EsTUFBSUksU0FBU0osSUFBYjs7QUFFQSxTQUFRLENBQUNDLElBQUQsRUFBT0UsTUFBUCxFQUFlQyxNQUFmLENBQUQsQ0FBeUJDLEdBQXpCLENBQTZCLFVBQVVDLENBQVYsRUFBYTtBQUMvQ0EsUUFBSUEsRUFBRUMsUUFBRixFQUFKO0FBQ0EsV0FBT0QsRUFBRSxDQUFGLElBQU9BLENBQVAsR0FBVyxNQUFNQSxDQUF4QjtBQUNELEdBSE0sRUFHSkUsSUFISSxDQUdDLEdBSEQsQ0FBUDtBQUlEOztBQUVNLFNBQVNkLGNBQVQsQ0FBd0JlLFNBQXhCLEVBQW1DQyxRQUFuQyxFQUE2QztBQUNsRCxNQUFJLE9BQU9ELFNBQVAsS0FBcUIsUUFBckIsSUFBaUMsT0FBT0MsUUFBUCxLQUFvQixRQUF6RCxFQUFtRTtBQUNqRUQsZ0JBQVlFLFdBQVdGLFNBQVgsQ0FBWjtBQUNBQyxlQUFXQyxXQUFXRCxRQUFYLENBQVg7QUFDRDs7QUFFREQsY0FBWUEsVUFBVUcsT0FBVixDQUFrQixDQUFsQixDQUFaO0FBQ0FGLGFBQVdBLFNBQVNFLE9BQVQsQ0FBaUIsQ0FBakIsQ0FBWDs7QUFFQSxTQUFPO0FBQ0xILGVBQVdBLFVBQVVGLFFBQVYsR0FBcUJNLEtBQXJCLENBQTJCLEdBQTNCLENBRE47QUFFTEgsY0FBVUEsU0FBU0gsUUFBVCxHQUFvQk0sS0FBcEIsQ0FBMEIsR0FBMUI7QUFGTCxHQUFQO0FBSUQiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhZGQoYSwgYikge1xuICByZXR1cm4gYSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFRpbWUodGltZSkge1xuICBpZiAodHlwZW9mIHRpbWUgIT09ICdudW1iZXInIHx8IHRpbWUgPCAwKSB7XG4gICAgcmV0dXJuIHRpbWVcbiAgfVxuXG4gIHZhciBob3VyID0gcGFyc2VJbnQodGltZSAvIDM2MDApXG4gIHRpbWUgPSB0aW1lICUgMzYwMFxuICB2YXIgbWludXRlID0gcGFyc2VJbnQodGltZSAvIDYwKVxuICB0aW1lID0gdGltZSAlIDYwXG4gIHZhciBzZWNvbmQgPSB0aW1lXG5cbiAgcmV0dXJuIChbaG91ciwgbWludXRlLCBzZWNvbmRdKS5tYXAoZnVuY3Rpb24gKG4pIHtcbiAgICBuID0gbi50b1N0cmluZygpXG4gICAgcmV0dXJuIG5bMV0gPyBuIDogJzAnICsgblxuICB9KS5qb2luKCc6Jylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdExvY2F0aW9uKGxvbmdpdHVkZSwgbGF0aXR1ZGUpIHtcbiAgaWYgKHR5cGVvZiBsb25naXR1ZGUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBsYXRpdHVkZSA9PT0gJ3N0cmluZycpIHtcbiAgICBsb25naXR1ZGUgPSBwYXJzZUZsb2F0KGxvbmdpdHVkZSlcbiAgICBsYXRpdHVkZSA9IHBhcnNlRmxvYXQobGF0aXR1ZGUpXG4gIH1cblxuICBsb25naXR1ZGUgPSBsb25naXR1ZGUudG9GaXhlZCgyKVxuICBsYXRpdHVkZSA9IGxhdGl0dWRlLnRvRml4ZWQoMilcblxuICByZXR1cm4ge1xuICAgIGxvbmdpdHVkZTogbG9uZ2l0dWRlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKSxcbiAgICBsYXRpdHVkZTogbGF0aXR1ZGUudG9TdHJpbmcoKS5zcGxpdCgnLicpXG4gIH1cbn1cbiJdfQ==