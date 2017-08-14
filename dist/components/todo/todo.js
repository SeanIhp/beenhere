"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('../../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('../../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('../../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('../../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _labradorImmutable = require('../../npm/labrador-immutable/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var string = _labradorImmutable.PropTypes.string,
    bool = _labradorImmutable.PropTypes.bool,
    func = _labradorImmutable.PropTypes.func;

var Todo = function (_Component) {
  (0, _inherits3.default)(Todo, _Component);

  function Todo(props) {
    (0, _classCallCheck3.default)(this, Todo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Todo.__proto__ || (0, _getPrototypeOf2.default)(Todo)).call(this, props));

    _this.state = {
      icon: props.finished ? 'success_circle' : 'circle',
      className: props.finished ? 'todo-finished' : ''
    };
    return _this;
  }

  (0, _createClass3.default)(Todo, [{
    key: 'onUpdate',
    value: function onUpdate(props) {
      this.setState({
        icon: props.finished ? 'success_circle' : 'circle',
        className: props.finished ? 'todo-finished' : ''
      });
    }
  }, {
    key: 'handleRemove',
    value: function handleRemove() {
      this.props.onRemove(this.props.id);
    }
  }, {
    key: 'handleFinish',
    value: function handleFinish() {
      if (this.props.finished) {
        this.props.onRestore(this.props.id);
      } else {
        this.props.onFinish(this.props.id);
      }
    }
  }]);
  return Todo;
}(_labradorImmutable.Component);

Todo.propTypes = {
  id: string,
  title: string,
  createdAt: string,
  finished: bool,
  finishedAt: string,
  onRemove: func,
  onRestore: func,
  onFinish: func
};
exports.default = Todo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZG8uanMiXSwibmFtZXMiOlsic3RyaW5nIiwiYm9vbCIsImZ1bmMiLCJUb2RvIiwicHJvcHMiLCJzdGF0ZSIsImljb24iLCJmaW5pc2hlZCIsImNsYXNzTmFtZSIsInNldFN0YXRlIiwib25SZW1vdmUiLCJpZCIsIm9uUmVzdG9yZSIsIm9uRmluaXNoIiwicHJvcFR5cGVzIiwidGl0bGUiLCJjcmVhdGVkQXQiLCJmaW5pc2hlZEF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0lBRVFBLE0sZ0NBQUFBLE07SUFBUUMsSSxnQ0FBQUEsSTtJQUFNQyxJLGdDQUFBQSxJOztJQUVoQkMsSTs7O0FBWUosZ0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxrSUFDWEEsS0FEVzs7QUFFakIsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLFlBQU1GLE1BQU1HLFFBQU4sR0FBaUIsZ0JBQWpCLEdBQW9DLFFBRC9CO0FBRVhDLGlCQUFXSixNQUFNRyxRQUFOLEdBQWlCLGVBQWpCLEdBQW1DO0FBRm5DLEtBQWI7QUFGaUI7QUFNbEI7Ozs7NkJBRVFILEssRUFBTztBQUNkLFdBQUtLLFFBQUwsQ0FBYztBQUNaSCxjQUFNRixNQUFNRyxRQUFOLEdBQWlCLGdCQUFqQixHQUFvQyxRQUQ5QjtBQUVaQyxtQkFBV0osTUFBTUcsUUFBTixHQUFpQixlQUFqQixHQUFtQztBQUZsQyxPQUFkO0FBSUQ7OzttQ0FFYztBQUNiLFdBQUtILEtBQUwsQ0FBV00sUUFBWCxDQUFvQixLQUFLTixLQUFMLENBQVdPLEVBQS9CO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQUksS0FBS1AsS0FBTCxDQUFXRyxRQUFmLEVBQXlCO0FBQ3ZCLGFBQUtILEtBQUwsQ0FBV1EsU0FBWCxDQUFxQixLQUFLUixLQUFMLENBQVdPLEVBQWhDO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS1AsS0FBTCxDQUFXUyxRQUFYLENBQW9CLEtBQUtULEtBQUwsQ0FBV08sRUFBL0I7QUFDRDtBQUNGOzs7OztBQXJDR1IsSSxDQUNHVyxTLEdBQVk7QUFDakJILE1BQUlYLE1BRGE7QUFFakJlLFNBQU9mLE1BRlU7QUFHakJnQixhQUFXaEIsTUFITTtBQUlqQk8sWUFBVU4sSUFKTztBQUtqQmdCLGNBQVlqQixNQUxLO0FBTWpCVSxZQUFVUixJQU5PO0FBT2pCVSxhQUFXVixJQVBNO0FBUWpCVyxZQUFVWDtBQVJPLEM7a0JBdUNOQyxJIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ2xhYnJhZG9yLWltbXV0YWJsZSc7XG5cbmNvbnN0IHsgc3RyaW5nLCBib29sLCBmdW5jIH0gPSBQcm9wVHlwZXM7XG5cbmNsYXNzIFRvZG8gZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBzdHJpbmcsXG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBjcmVhdGVkQXQ6IHN0cmluZyxcbiAgICBmaW5pc2hlZDogYm9vbCxcbiAgICBmaW5pc2hlZEF0OiBzdHJpbmcsXG4gICAgb25SZW1vdmU6IGZ1bmMsXG4gICAgb25SZXN0b3JlOiBmdW5jLFxuICAgIG9uRmluaXNoOiBmdW5jXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGljb246IHByb3BzLmZpbmlzaGVkID8gJ3N1Y2Nlc3NfY2lyY2xlJyA6ICdjaXJjbGUnLFxuICAgICAgY2xhc3NOYW1lOiBwcm9wcy5maW5pc2hlZCA/ICd0b2RvLWZpbmlzaGVkJyA6ICcnXG4gICAgfTtcbiAgfVxuXG4gIG9uVXBkYXRlKHByb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpY29uOiBwcm9wcy5maW5pc2hlZCA/ICdzdWNjZXNzX2NpcmNsZScgOiAnY2lyY2xlJyxcbiAgICAgIGNsYXNzTmFtZTogcHJvcHMuZmluaXNoZWQgPyAndG9kby1maW5pc2hlZCcgOiAnJ1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUmVtb3ZlKCkge1xuICAgIHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy5pZCk7XG4gIH1cblxuICBoYW5kbGVGaW5pc2goKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZmluaXNoZWQpIHtcbiAgICAgIHRoaXMucHJvcHMub25SZXN0b3JlKHRoaXMucHJvcHMuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLm9uRmluaXNoKHRoaXMucHJvcHMuaWQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvO1xuXG4iXX0=