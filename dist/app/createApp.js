"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;
exports.createDvaApp = createDvaApp;
exports.wxGetApp = wxGetApp;
exports.wxGetWx = wxGetWx;

var _dva = require('./dva/index.js');

var _dva2 = _interopRequireDefault(_dva);

var _labrador = require('../npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = exports.app = {};
function createDvaApp(opts) {
  // new instance
  exports.app = app = (0, _dva2.default)(opts);
  return app;
}

function wxGetApp() {
  return _labrador2.default.app;
}

function wxGetWx() {
  return _labrador2.default.wx;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZUFwcC5qcyJdLCJuYW1lcyI6WyJjcmVhdGVEdmFBcHAiLCJ3eEdldEFwcCIsInd4R2V0V3giLCJhcHAiLCJvcHRzIiwid3giXSwibWFwcGluZ3MiOiI7Ozs7OztRQUlnQkEsWSxHQUFBQSxZO1FBTUFDLFEsR0FBQUEsUTtRQUlBQyxPLEdBQUFBLE87O0FBZGhCOzs7O0FBQ0E7Ozs7OztBQUVPLElBQUlDLG9CQUFNLEVBQVY7QUFDQSxTQUFTSCxZQUFULENBQXNCSSxJQUF0QixFQUE0QjtBQUNqQztBQUNBLFVBSFNELEdBR1QsU0FBTSxtQkFBVUMsSUFBVixDQUFOO0FBQ0EsU0FBT0QsR0FBUDtBQUNEOztBQUVNLFNBQVNGLFFBQVQsR0FBb0I7QUFDekIsU0FBTyxtQkFBR0UsR0FBVjtBQUNEOztBQUVNLFNBQVNELE9BQVQsR0FBbUI7QUFDeEIsU0FBTyxtQkFBR0csRUFBVjtBQUNEIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlRHZhIGZyb20gJy4vZHZhJztcclxuaW1wb3J0IHd4IGZyb20gJ2xhYnJhZG9yJztcclxuXHJcbmV4cG9ydCB2YXIgYXBwID0ge307XHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEdmFBcHAob3B0cykge1xyXG4gIC8vIG5ldyBpbnN0YW5jZVxyXG4gIGFwcCA9IGNyZWF0ZUR2YShvcHRzKTtcclxuICByZXR1cm4gYXBwO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd3hHZXRBcHAoKSB7XHJcbiAgcmV0dXJuIHd4LmFwcDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHd4R2V0V3goKSB7XHJcbiAgcmV0dXJuIHd4Lnd4O1xyXG59XHJcbiJdfQ==