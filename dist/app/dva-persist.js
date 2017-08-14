"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dvaPersistStore;

var _labradorStorage = require('../npm/labrador-storage/index.js');

var _labradorStorage2 = _interopRequireDefault(_labradorStorage);

var _seamlessImmutable = require('../npm/seamless-immutable/src/seamless-immutable.js');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reduxPersist = require('../npm/redux-persist/es/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var immutableTransform = {
  out: function out(raw) {
    //return immutable(raw);
    return raw;
  },
  in: function _in(state) {
    return state.asMutable ? state.asMutable({ deep: true }) : state;
  }
};

// Redux 数据持久化设置
var reduxPersist = {
  storage: _labradorStorage2.default,
  blacklist: [// 可选，你【不想】存储的Redux store数据key列表
  ],
  whitelist: [// 可选，你【只想】存储的Redux store数据key列表
  //'example'
  'shoppingcar'],
  transforms: [immutableTransform]
};

function dvaPersistStore(store) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : reduxPersist;
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  (0, _reduxPersist.persistStore)(store, config, callback);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImR2YS1wZXJzaXN0LmpzIl0sIm5hbWVzIjpbImR2YVBlcnNpc3RTdG9yZSIsImltbXV0YWJsZVRyYW5zZm9ybSIsIm91dCIsInJhdyIsImluIiwic3RhdGUiLCJhc011dGFibGUiLCJkZWVwIiwicmVkdXhQZXJzaXN0Iiwic3RvcmFnZSIsImJsYWNrbGlzdCIsIndoaXRlbGlzdCIsInRyYW5zZm9ybXMiLCJzdG9yZSIsImNvbmZpZyIsImNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOzs7OztrQkE0QndCQSxlOztBQTVCeEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUMscUJBQXFCO0FBQ3pCQyxLQUR5QixlQUNyQkMsR0FEcUIsRUFDaEI7QUFDUDtBQUNBLFdBQU9BLEdBQVA7QUFDRCxHQUp3QjtBQUt6QkMsSUFMeUIsZUFLdEJDLEtBTHNCLEVBS2Y7QUFDUixXQUFPQSxNQUFNQyxTQUFOLEdBQWtCRCxNQUFNQyxTQUFOLENBQWdCLEVBQUVDLE1BQU0sSUFBUixFQUFoQixDQUFsQixHQUFvREYsS0FBM0Q7QUFDRDtBQVB3QixDQUEzQjs7QUFVQTtBQUNBLElBQU1HLGVBQWU7QUFDbkJDLG9DQURtQjtBQUVuQkMsYUFBVyxDQUFLO0FBQUwsR0FGUTtBQUluQkMsYUFBVyxDQUFLO0FBQ2Q7QUFDQSxlQUZTLENBSlE7QUFRbkJDLGNBQVksQ0FDVlgsa0JBRFU7QUFSTyxDQUFyQjs7QUFhZSxTQUFTRCxlQUFULENBQXlCYSxLQUF6QixFQUF3RTtBQUFBLE1BQXpDQyxNQUF5Qyx1RUFBaENOLFlBQWdDO0FBQUEsTUFBbkJPLFFBQW1CLHVFQUFSLFlBQUksQ0FBRSxDQUFFOztBQUNyRixrQ0FBYUYsS0FBYixFQUFvQkMsTUFBcEIsRUFBNEJDLFFBQTVCO0FBQ0QiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3luY1N0b3JhZ2UgZnJvbSAnbGFicmFkb3Itc3RvcmFnZSc7XHJcbmltcG9ydCBpbW11dGFibGUgZnJvbSAnc2VhbWxlc3MtaW1tdXRhYmxlJztcclxuaW1wb3J0IHsgcGVyc2lzdFN0b3JlIH0gZnJvbSAncmVkdXgtcGVyc2lzdCc7XHJcblxyXG5jb25zdCBpbW11dGFibGVUcmFuc2Zvcm0gPSB7XHJcbiAgb3V0KHJhdykge1xyXG4gICAgLy9yZXR1cm4gaW1tdXRhYmxlKHJhdyk7XHJcbiAgICByZXR1cm4gcmF3O1xyXG4gIH0sXHJcbiAgaW4oc3RhdGUpIHtcclxuICAgIHJldHVybiBzdGF0ZS5hc011dGFibGUgPyBzdGF0ZS5hc011dGFibGUoeyBkZWVwOiB0cnVlIH0pIDogc3RhdGU7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZWR1eCDmlbDmja7mjIHkuYXljJborr7nva5cclxuY29uc3QgcmVkdXhQZXJzaXN0ID0ge1xyXG4gIHN0b3JhZ2U6IEFzeW5jU3RvcmFnZSxcclxuICBibGFja2xpc3Q6IFsgICAgLy8g5Y+v6YCJ77yM5L2g44CQ5LiN5oOz44CR5a2Y5YKo55qEUmVkdXggc3RvcmXmlbDmja5rZXnliJfooahcclxuICBdLCBcclxuICB3aGl0ZWxpc3Q6IFsgICAgLy8g5Y+v6YCJ77yM5L2g44CQ5Y+q5oOz44CR5a2Y5YKo55qEUmVkdXggc3RvcmXmlbDmja5rZXnliJfooahcclxuICAgIC8vJ2V4YW1wbGUnXHJcbiAgICAnc2hvcHBpbmdjYXInXHJcbiAgXSwgXHJcbiAgdHJhbnNmb3JtczogW1xyXG4gICAgaW1tdXRhYmxlVHJhbnNmb3JtXHJcbiAgXVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZHZhUGVyc2lzdFN0b3JlKHN0b3JlLGNvbmZpZyA9IHJlZHV4UGVyc2lzdCxjYWxsYmFjayA9ICgpPT57fSkge1xyXG4gIHBlcnNpc3RTdG9yZShzdG9yZSwgY29uZmlnLCBjYWxsYmFjayk7XHJcbn0iXX0=