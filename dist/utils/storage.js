"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _labrador = require('../npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 缓存 封装
var Storage = function () {
  function Storage() {
    (0, _classCallCheck3.default)(this, Storage);
  }

  (0, _createClass3.default)(Storage, null, [{
    key: 'get',
    value: function get(key) {
      return _labrador2.default.getStorageSync(key);
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      return _labrador2.default.setStorage({ key: key, data: value });
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return _labrador2.default.removeStorage(key);
    }
  }, {
    key: 'clear',
    value: function clear() {
      return _labrador2.default.clearStorage();
    }
  }]);
  return Storage;
}();

exports.default = Storage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JhZ2UuanMiXSwibmFtZXMiOlsiU3RvcmFnZSIsImtleSIsImdldFN0b3JhZ2VTeW5jIiwidmFsdWUiLCJzZXRTdG9yYWdlIiwiZGF0YSIsInJlbW92ZVN0b3JhZ2UiLCJjbGVhclN0b3JhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBO0lBQ3FCQSxPOzs7Ozs7O3dCQUNSQyxHLEVBQUs7QUFDZCxhQUFPLG1CQUFHQyxjQUFILENBQWtCRCxHQUFsQixDQUFQO0FBQ0Q7Ozt3QkFFVUEsRyxFQUFLRSxLLEVBQU87QUFDckIsYUFBTyxtQkFBR0MsVUFBSCxDQUFjLEVBQUNILEtBQUlBLEdBQUwsRUFBU0ksTUFBS0YsS0FBZCxFQUFkLENBQVA7QUFDRDs7OzRCQUVhRixHLEVBQUs7QUFDakIsYUFBTyxtQkFBR0ssYUFBSCxDQUFpQkwsR0FBakIsQ0FBUDtBQUNEOzs7NEJBRWM7QUFDYixhQUFPLG1CQUFHTSxZQUFILEVBQVA7QUFDRDs7Ozs7a0JBZmtCUCxPIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd3ggZnJvbSAnbGFicmFkb3InO1xyXG5cclxuLy8g57yT5a2YIOWwgeijhVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcclxuICBzdGF0aWMgZ2V0KGtleSkge1xyXG4gICAgcmV0dXJuIHd4LmdldFN0b3JhZ2VTeW5jKGtleSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2V0KGtleSwgdmFsdWUpIHtcclxuICAgIHJldHVybiB3eC5zZXRTdG9yYWdlKHtrZXk6a2V5LGRhdGE6dmFsdWV9KVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRlbGV0ZShrZXkpIHtcclxuICAgIHJldHVybiB3eC5yZW1vdmVTdG9yYWdlKGtleSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY2xlYXIoKSB7XHJcbiAgICByZXR1cm4gd3guY2xlYXJTdG9yYWdlKCk7XHJcbiAgfVxyXG59Il19