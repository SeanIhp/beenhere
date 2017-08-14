"use strict";var exports=module.exports={};var global=window=require('../../npm/labrador/global.js');"use strict";

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

var _labrador = require('../../npm/labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bullet = function (_Component) {
    (0, _inherits3.default)(Bullet, _Component);

    function Bullet(props) {
        (0, _classCallCheck3.default)(this, Bullet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Bullet.__proto__ || (0, _getPrototypeOf2.default)(Bullet)).call(this, props));

        _this._animation = _labrador2.default.createAnimation();
        _this._clientInfo = _labrador2.default.getSystemInfoSync();

        var _color = null;
        var _size = null;
        var _speed = null;
        var _top = null;
        var _left = null;
        switch (("" + _this.props.bullet.bore).length) {
            case 10:
                _color = "#E3CC72";
                _size = 20;
                _speed = 22000;
                break;
            case 9:
                _color = "#EE6666";
                _size = 18;
                _speed = 23000;
                break;
            case 8:
                _color = "#6666EE";
                _size = 18;
                _speed = 24000;
                break;
            case 7:
                _color = "#F4607E";
                _size = 16;
                _speed = 25000;
                break;
            case 6:
                _color = "#EE66B8";
                _size = 16;
                _speed = 26000;
                break;
            case 5:
                _color = "#CC88CC";
                _size = 14;
                _speed = 27000;
                break;
            case 4:
                _color = "#82B2D2";
                _size = 14;
                _speed = 28000;
                break;
            case 3:
                _color = "#8FD87D";
                _size = 12;
                _speed = 29000;
                break;
            case 2:
                _color = "#AECC33";
                _size = 12;
                _speed = 30000;
                break;
            case 1:
                _color = "#C1E8C1";
                _size = 10;
                _speed = 31000;
                break;
            case 0:
                _color = "#EEE4BB";
                _size = 8;
                _speed = 32000;
                break;
            default:
                _color = "#FF0000";
                _size = 22;
                _speed = 20000;
        }
        var _tn = Math.round(Math.random() * 12) * 20;
        var _ln = Math.round(Math.random() * _labrador2.default.getSystemInfoSync().windowWidth);
        _top = 25 + _tn;
        _left = _labrador2.default.getSystemInfoSync().windowWidth + _ln * 2;

        var sss = "top:" + _top + "rpx;";
        var _direct = _size * _this.props.bullet.text.length + _left;
        var _delay = Math.round(Math.random() * _this.props.total) * 400;
        console.log("Bullet's ______INIT_____delay: ", _delay, _direct);
        _this._animation.translate(-1000, 0).step({ duration: 18000 });

        _this.state = {
            color: _color || "#FF0000",
            size: _size || 22,
            speed: _speed || 20000,
            top: _top || 25,
            sss: sss,
            left: 10 || 0,
            animation: _this._animation.export()
        };
        console.log("~~~xxxxxx state: ", _this.state);
        return _this;
    }

    (0, _createClass3.default)(Bullet, [{
        key: "onUpdate",
        value: function onUpdate() {
            console.log("Bullet's ___________: ", this.props);
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            // setInterval(function() {
            //     let _top = null;
            //         let _tn = Math.round(Math.random()*12)*20;
            //         _top = 25 + _tn;
            //         this.setState({
            //             top: _top || 25
            //         });

            //     let _direct = this.state.size*this.props.bullet.text.length+this.state.left;
            //     let _delay = (Math.round(Math.random()*this.props.total))*1000;
            //     console.log("Bullet's ______delay: ", _delay, _direct);
            //     this._animation.translate(-1*_direct, 0).step({duration: this.state.speed||22000, delay:_delay});
            //     this._animation.translate(_direct, 0).step({duration: 2000, delay:0});
            //     this.setState({
            //         animation: this._animation.export()
            //     });
            // }.bind(this), 32000+200+this.props.total*1000);

            // let _direct = this.state.size*this.props.bullet.text.length+this.state.left;
            // let _delay = (Math.round(Math.random()*this.props.total))*400;
            // console.log("Bullet's ______INIT_____delay: ", _delay, _direct);
            // this._animation.translate(-1000, 0).step({duration: 18000});

            //this._animation.translate(_direct-this._clientInfo.windowWidth-this.state.left, 0).step({duration: 2000, delay:0});

            // let _stt = {
            //     ...this.state,
            //     animation: this._animation.export()
            // };
            // this.state = _stt;
            // console.log("xxxxxx state: ", this.state);
        }
    }]);
    return Bullet;
}(_labrador.Component);

exports.default = Bullet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1bGxldF9vbGQuanMiXSwibmFtZXMiOlsiQnVsbGV0IiwicHJvcHMiLCJfYW5pbWF0aW9uIiwiY3JlYXRlQW5pbWF0aW9uIiwiX2NsaWVudEluZm8iLCJnZXRTeXN0ZW1JbmZvU3luYyIsIl9jb2xvciIsIl9zaXplIiwiX3NwZWVkIiwiX3RvcCIsIl9sZWZ0IiwiYnVsbGV0IiwiYm9yZSIsImxlbmd0aCIsIl90biIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsIl9sbiIsIndpbmRvd1dpZHRoIiwic3NzIiwiX2RpcmVjdCIsInRleHQiLCJfZGVsYXkiLCJ0b3RhbCIsImNvbnNvbGUiLCJsb2ciLCJ0cmFuc2xhdGUiLCJzdGVwIiwiZHVyYXRpb24iLCJzdGF0ZSIsImNvbG9yIiwic2l6ZSIsInNwZWVkIiwidG9wIiwibGVmdCIsImFuaW1hdGlvbiIsImV4cG9ydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxNOzs7QUFJakIsb0JBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQSwwSUFDUkEsS0FEUTs7QUFBQSxjQUhsQkMsVUFHa0IsR0FITCxtQkFBR0MsZUFBSCxFQUdLO0FBQUEsY0FGbEJDLFdBRWtCLEdBRkosbUJBQUdDLGlCQUFILEVBRUk7O0FBRWQsWUFBSUMsU0FBUyxJQUFiO0FBQ0EsWUFBSUMsUUFBUSxJQUFaO0FBQ0EsWUFBSUMsU0FBUyxJQUFiO0FBQ0EsWUFBSUMsT0FBTyxJQUFYO0FBQ0EsWUFBSUMsUUFBUSxJQUFaO0FBQ0EsZ0JBQU8sQ0FBQyxLQUFHLE1BQUtULEtBQUwsQ0FBV1UsTUFBWCxDQUFrQkMsSUFBdEIsRUFBNEJDLE1BQW5DO0FBQ0ksaUJBQUssRUFBTDtBQUNJUCx5QkFBUyxTQUFUO0FBQ0FDLHdCQUFRLEVBQVI7QUFDQUMseUJBQVMsS0FBVDtBQUNBO0FBQ0osaUJBQUssQ0FBTDtBQUNJRix5QkFBUyxTQUFUO0FBQ0FDLHdCQUFRLEVBQVI7QUFDQUMseUJBQVMsS0FB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SWdCRCxNIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd3gsIHsgQ29tcG9uZW50IH0gZnJvbSAnbGFicmFkb3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIF9hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oKTtcclxuICAgIF9jbGllbnRJbmZvID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIGxldCBfY29sb3IgPSBudWxsO1xyXG4gICAgICAgIGxldCBfc2l6ZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IF9zcGVlZCA9IG51bGw7XHJcbiAgICAgICAgbGV0IF90b3AgPSBudWxsO1xyXG4gICAgICAgIGxldCBfbGVmdCA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoKChcIlwiK3RoaXMucHJvcHMuYnVsbGV0LmJvcmUpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICBfY29sb3IgPSBcIiNFM0NDNzJcIjtcclxuICAgICAgICAgICAgICAgIF9zaXplID0gMjA7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAyMjAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICBfY29sb3IgPSBcIiNFRTY2NjZcIjtcclxuICAgICAgICAgICAgICAgIF9zaXplID0gMTg7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAyMzAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICBfY29sb3IgPSBcIiM2NjY2RUVcIjtcclxuICAgICAgICAgICAgICAgIF9zaXplID0gMTg7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAyNDAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICBfY29sb3IgPSBcIiNGNDYwN0VcIjtcclxuICAgICAgICAgICAgICAgIF9zaXplID0gMTY7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAyNTAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICBfY29sb3IgPSBcIiNFRTY2QjhcIjtcclxuICAgICAgICAgICAgICAgIF9zaXplID0gMTY7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAyNjAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBfY29sb3IgPSBcIiNDQzg4Q0NcIjtcclxuICAgICAgICAgICAgICAgIF9zaXplID0gMTQ7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAyNzAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBfY29sb3IgPSBcIiM4MkIyRDJcIjtcclxuICAgICAgICAgICAgICAgIF9zaXplID0gMTQ7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAyODAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBfY29sb3IgPSBcIiM4RkQ4N0RcIjtcclxuICAgICAgICAgICAgICAgIF9zaXplID0gMTI7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAyOTAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBfY29sb3IgPSBcIiNBRUNDMzNcIjtcclxuICAgICAgICAgICAgICAgIF9zaXplID0gMTI7XHJcbiAgICAgICAgICAgICAgICBfc3BlZWQgPSAzMDAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6IFxyXG4gICAgICAgICAgICAgICAgX2NvbG9yID0gXCIjQzFFOEMxXCI7XHJcbiAgICAgICAgICAgICAgICBfc2l6ZSA9IDEwO1xyXG4gICAgICAgICAgICAgICAgX3NwZWVkID0gMzEwMDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAwOiBcclxuICAgICAgICAgICAgICAgIF9jb2xvciA9IFwiI0VFRTRCQlwiO1xyXG4gICAgICAgICAgICAgICAgX3NpemUgPSA4O1xyXG4gICAgICAgICAgICAgICAgX3NwZWVkID0gMzIwMDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIF9jb2xvciA9IFwiI0ZGMDAwMFwiO1xyXG4gICAgICAgICAgICAgICAgX3NpemUgPSAyMjtcclxuICAgICAgICAgICAgICAgIF9zcGVlZCA9IDIwMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgX3RuID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEyKSoyMDtcclxuICAgICAgICBsZXQgX2xuID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKnd4LmdldFN5c3RlbUluZm9TeW5jKCkud2luZG93V2lkdGgpO1xyXG4gICAgICAgIF90b3AgPSAyNSArIF90bjtcclxuICAgICAgICBfbGVmdCA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkud2luZG93V2lkdGgrX2xuKjI7XHJcblxyXG4gICAgICAgIGxldCBzc3MgPSBcInRvcDpcIitfdG9wK1wicnB4O1wiXHJcbiAgICAgICAgbGV0IF9kaXJlY3QgPSBfc2l6ZSAqIHRoaXMucHJvcHMuYnVsbGV0LnRleHQubGVuZ3RoICsgX2xlZnQ7XHJcbiAgICAgICAgbGV0IF9kZWxheSA9IChNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqdGhpcy5wcm9wcy50b3RhbCkpKjQwMDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJ1bGxldCdzIF9fX19fX0lOSVRfX19fX2RlbGF5OiBcIiwgX2RlbGF5LCBfZGlyZWN0KTtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb24udHJhbnNsYXRlKC0xMDAwLCAwKS5zdGVwKHtkdXJhdGlvbjogMTgwMDB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICB7XHJcbiAgICAgICAgICAgIGNvbG9yOiBfY29sb3IgfHwgXCIjRkYwMDAwXCIsXHJcbiAgICAgICAgICAgIHNpemU6IF9zaXplIHx8IDIyLFxyXG4gICAgICAgICAgICBzcGVlZDogX3NwZWVkIHx8IDIwMDAwLFxyXG4gICAgICAgICAgICB0b3A6IF90b3AgfHwgMjUsXHJcbiAgICAgICAgICAgIHNzcyxcclxuICAgICAgICAgICAgbGVmdDogMTAgfHwgMCxcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiB0aGlzLl9hbmltYXRpb24uZXhwb3J0KClcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ+fn54eHh4eHggc3RhdGU6IFwiLCB0aGlzLnN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJ1bGxldCdzIF9fX19fX19fX19fOiBcIiwgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICBsZXQgX3RvcCA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgX3RuID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEyKSoyMDtcclxuICAgICAgICAvLyAgICAgICAgIF90b3AgPSAyNSArIF90bjtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRvcDogX3RvcCB8fCAyNVxyXG4gICAgICAgIC8vICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICBsZXQgX2RpcmVjdCA9IHRoaXMuc3RhdGUuc2l6ZSp0aGlzLnByb3BzLmJ1bGxldC50ZXh0Lmxlbmd0aCt0aGlzLnN0YXRlLmxlZnQ7XHJcbiAgICAgICAgLy8gICAgIGxldCBfZGVsYXkgPSAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKnRoaXMucHJvcHMudG90YWwpKSoxMDAwO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkJ1bGxldCdzIF9fX19fX2RlbGF5OiBcIiwgX2RlbGF5LCBfZGlyZWN0KTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fYW5pbWF0aW9uLnRyYW5zbGF0ZSgtMSpfZGlyZWN0LCAwKS5zdGVwKHtkdXJhdGlvbjogdGhpcy5zdGF0ZS5zcGVlZHx8MjIwMDAsIGRlbGF5Ol9kZWxheX0pO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9hbmltYXRpb24udHJhbnNsYXRlKF9kaXJlY3QsIDApLnN0ZXAoe2R1cmF0aW9uOiAyMDAwLCBkZWxheTowfSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIC8vICAgICAgICAgYW5pbWF0aW9uOiB0aGlzLl9hbmltYXRpb24uZXhwb3J0KClcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfS5iaW5kKHRoaXMpLCAzMjAwMCsyMDArdGhpcy5wcm9wcy50b3RhbCoxMDAwKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IF9kaXJlY3QgPSB0aGlzLnN0YXRlLnNpemUqdGhpcy5wcm9wcy5idWxsZXQudGV4dC5sZW5ndGgrdGhpcy5zdGF0ZS5sZWZ0O1xyXG4gICAgICAgIC8vIGxldCBfZGVsYXkgPSAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKnRoaXMucHJvcHMudG90YWwpKSo0MDA7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJCdWxsZXQncyBfX19fX19JTklUX19fX19kZWxheTogXCIsIF9kZWxheSwgX2RpcmVjdCk7XHJcbiAgICAgICAgLy8gdGhpcy5fYW5pbWF0aW9uLnRyYW5zbGF0ZSgtMTAwMCwgMCkuc3RlcCh7ZHVyYXRpb246IDE4MDAwfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLl9hbmltYXRpb24udHJhbnNsYXRlKF9kaXJlY3QtdGhpcy5fY2xpZW50SW5mby53aW5kb3dXaWR0aC10aGlzLnN0YXRlLmxlZnQsIDApLnN0ZXAoe2R1cmF0aW9uOiAyMDAwLCBkZWxheTowfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbGV0IF9zdHQgPSB7XHJcbiAgICAgICAgLy8gICAgIC4uLnRoaXMuc3RhdGUsXHJcbiAgICAgICAgLy8gICAgIGFuaW1hdGlvbjogdGhpcy5fYW5pbWF0aW9uLmV4cG9ydCgpXHJcbiAgICAgICAgLy8gfTtcclxuICAgICAgICAvLyB0aGlzLnN0YXRlID0gX3N0dDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInh4eHh4eCBzdGF0ZTogXCIsIHRoaXMuc3RhdGUpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==