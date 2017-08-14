"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../npm/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  namespace: 'Referrer',

  state: {
    query: {}
  },

  reducers: {
    setQueryState: function setQueryState(state, action) {
      return (0, _extends3.default)({}, state, {
        query: (0, _extends3.default)({}, state.query, {
          state: action.payload
        })
      });
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZmVycmVyLmpzIl0sIm5hbWVzIjpbIm5hbWVzcGFjZSIsInN0YXRlIiwicXVlcnkiLCJyZWR1Y2VycyIsInNldFF1ZXJ5U3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0JBQWU7O0FBRWJBLGFBQVcsVUFGRTs7QUFJYkMsU0FBTztBQUNMQyxXQUFPO0FBREYsR0FKTTs7QUFRYkMsWUFBVTtBQUNSQyxpQkFEUSx5QkFDTUgsS0FETixFQUNhSSxNQURiLEVBQ3FCO0FBQzNCLHdDQUNLSixLQURMO0FBRUVDLDBDQUNLRCxNQUFNQyxLQURYO0FBRUVELGlCQUFPSSxPQUFPQztBQUZoQjtBQUZGO0FBT0Q7QUFUTztBQVJHLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuXHJcbiAgbmFtZXNwYWNlOiAnUmVmZXJyZXInLFxyXG5cclxuICBzdGF0ZTogeyAgICBcclxuICAgIHF1ZXJ5OiB7fSxcclxuICB9LFxyXG5cclxuICByZWR1Y2Vyczoge1xyXG4gICAgc2V0UXVlcnlTdGF0ZShzdGF0ZSwgYWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IFxyXG4gICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgIHF1ZXJ5OntcclxuICAgICAgICAgIC4uLnN0YXRlLnF1ZXJ5LFxyXG4gICAgICAgICAgc3RhdGU6IGFjdGlvbi5wYXlsb2FkLFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LCAgXHJcbn0iXX0=