"use strict";var exports=module.exports={};var global=window=require('../../npm/labrador/global.js');"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('../../npm/babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

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

    // _animation = wx.createAnimation();
    // _clientInfo = wx.getSystemInfoSync();

    function Bullet(props) {
        (0, _classCallCheck3.default)(this, Bullet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Bullet.__proto__ || (0, _getPrototypeOf2.default)(Bullet)).call(this, props));

        console.log("【constructor】: ", props);
        var that = _this;
        _this.clientWidth = _labrador2.default.getSystemInfoSync().windowWidth;
        _this.bullet = _this.props.bullet;
        _this.baslistic = _this.props.baslistic;
        _this.onEject = _this.props.onEject;
        _this._speedSeed = 1.5;
        _this._delaySeed = 2333;
        _this._bulletsTotal = _this.props.total;

        _this.text = _this.bullet.text;
        _this.color = null;
        _this.size = null;
        _this.direct = 0;
        _this.delay = 0;
        _this.speed = 0;
        _this.top = null;
        _this.left = null;
        _this.animation = _labrador2.default.createAnimation();
        switch (("" + _this.bullet.bore).length) {
            case 10:
                _this.color = "#E3CC72";
                _this.size = 20;
                _this.speed = 22000 / _this._speedSeed;
                break;
            case 9:
                _this.color = "#EE6666";
                _this.size = 18;
                _this.speed = 23000 / _this._speedSeed;
                break;
            case 8:
                _this.color = "#6666EE";
                _this.size = 18;
                _this.speed = 24000 / _this._speedSeed;
                break;
            case 7:
                _this.color = "#F4607E";
                _this.size = 16;
                _this.speed = 25000 / _this._speedSeed;
                break;
            case 6:
                _this.color = "#EE66B8";
                _this.size = 16;
                _this.speed = 26000 / _this._speedSeed;
                break;
            case 5:
                _this.color = "#CC88CC";
                _this.size = 14;
                _this.speed = 27000 / _this._speedSeed;
                break;
            case 4:
                _this.color = "#82B2D2";
                _this.size = 14;
                _this.speed = 28000 / _this._speedSeed;
                break;
            case 3:
                _this.color = "#8FD87D";
                _this.size = 12;
                _this.speed = 29000 / _this._speedSeed;
                break;
            case 2:
                _this.color = "#AECC33";
                _this.size = 12;
                _this.speed = 30000 / _this._speedSeed;
                break;
            case 1:
                _this.color = "#C1E8C1";
                _this.size = 10;
                _this.speed = 30000 / _this._speedSeed; //31000/this._speedSeed;
                break;
            case 0:
                _this.color = "#EEE4BB";
                _this.size = 8;
                _this.speed = 32000 / _this._speedSeed;
                break;
            default:
                _this.color = "#FF0000";
                _this.size = 22;
                _this.speed = 21000 / _this._speedSeed;
        }

        _this.left = _labrador2.default.getSystemInfoSync().windowWidth;
        _this.direct = _this.left + (!!_this.text ? _this.text.length * (_this.size + 4) : 0);
        _this.delay = Math.round(Math.random() * _this._bulletsTotal);
        _this.size = 14;
        console.log("Bullet's ______: ", _this.text);
        console.log("Bullet's ______INIT_____left/delay/len/direct/speed: ", _this.left, _this.delay * _this._delaySeed, _this.text.length, _this.direct, _this.speed);
        _this.animation.translate(-1 * Math.abs(_this.direct), 0).step({ duration: _this.speed, delay: 0 });
        // this.animation.translate(Math.abs(this.direct), 0).step({duration: 1});
        _this.ani = _this.animation.export();

        _this.state = {
            text: _this.text,
            color: _this.color || "#FF0000",
            size: _this.size || 14,
            speed: _this.speed || 20000,
            top: _this.top || 25,
            left: _this.left || 0,
            animation: _this.animation
            // ani: this.ani
        };
        console.log("~~~xxxxxx state: ", _this.state);

        // let _tn = Math.round(Math.random()*12)*20;
        // let _ln = Math.round(Math.random()*wx.getSystemInfoSync().windowWidth);
        // _top = 25 + _tn;
        // _left = wx.getSystemInfoSync().windowWidth+_ln*2;
        // let sss = "top:"+_top+"rpx;"
        // let _direct = _size * this.props.bullet.text.length + _left;
        // let _delay = (Math.round(Math.random()*this.props.total))*400;
        // console.log("Bullet's ______INIT_____delay: ", _delay, _direct);
        // this._animation.translate(-1000, 0).step({duration: 18000});
        // this.state =  {
        //     color: _color || "#FF0000",
        //     size: _size || 22,
        //     speed: _speed || 20000,
        //     top: _top || 25,
        //     sss,
        //     left: 10 || 0,
        //     animation: this._animation.export()
        // }
        // console.log("~~~xxxxxx state: ", this.state);
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

            var _stt = (0, _extends3.default)({}, this.state, {
                ani: this.state.animation.export()
            });
            this.state = _stt;
            console.log("xxxxxx state: ", this.state);
        }
    }]);
    return Bullet;
}(_labrador.Component);

exports.default = Bullet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1bGxldC5qcyJdLCJuYW1lcyI6WyJCdWxsZXQiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJ0aGF0IiwiY2xpZW50V2lkdGgiLCJnZXRTeXN0ZW1JbmZvU3luYyIsIndpbmRvd1dpZHRoIiwiYnVsbGV0IiwiYmFzbGlzdGljIiwib25FamVjdCIsIl9zcGVlZFNlZWQiLCJfZGVsYXlTZWVkIiwiX2J1bGxldHNUb3RhbCIsInRvdGFsIiwidGV4dCIsImNvbG9yIiwic2l6ZSIsImRpcmVjdCIsImRlbGF5Iiwic3BlZWQiLCJ0b3AiLCJsZWZ0IiwiYW5pbWF0aW9uIiwiY3JlYXRlQW5pbWF0aW9uIiwiYm9yZSIsImxlbmd0aCIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsInRyYW5zbGF0ZSIsImFicyIsInN0ZXAiLCJkdXJhdGlvbiIsImFuaSIsImV4cG9ydCIsInN0YXRlIiwiX3N0dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsTTs7O0FBQ2pCO0FBQ0E7O0FBRUEsb0JBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQSwwSUFDUkEsS0FEUTs7QUFFZEMsZ0JBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQkYsS0FBL0I7QUFDQSxZQUFJRyxZQUFKO0FBQ0EsY0FBS0MsV0FBTCxHQUFtQixtQkFBR0MsaUJBQUgsR0FBdUJDLFdBQTFDO0FBQ0EsY0FBS0MsTUFBTCxHQUFjLE1BQUtQLEtBQUwsQ0FBV08sTUFBekI7QUFDQSxjQUFLQyxTQUFMLEdBQWlCLE1BQUtSLEtBQUwsQ0FBV1EsU0FBNUI7QUFDQSxjQUFLQyxPQUFMLEdBQWUsTUFBS1QsS0FBTCxDQUFXUyxPQUExQjtBQUNBLGNBQUtDLFVBQUwsR0FBa0IsR0FBbEI7QUFDQSxjQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsY0FBS0MsYUFBTCxHQUFxQixNQUFLWixLQUFMLENBQVdhLEtBQWhDOztBQUVBLGNBQUtDLElBQUwsR0FBWSxNQUFL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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEzSGM7QUE0SGpCOzs7O21DQUVVO0FBQ1BsQyxvQkFBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDLEtBQUtGLEtBQTNDO0FBQ0g7OztpQ0FFUTtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBSW9DLGtDQUNHLEtBQUtELEtBRFI7QUFFQUYscUJBQUssS0FBS0UsS0FBTCxDQUFXYixTQUFYLENBQXFCWSxNQUFyQjtBQUZMLGNBQUo7QUFJQSxpQkFBS0MsS0FBTCxHQUFhQyxJQUFiO0FBQ0FuQyxvQkFBUUMsR0FBUixDQUFZLGdCQUFaLEVBQThCLEtBQUtpQyxLQUFuQztBQUNIOzs7OztrQkF0S2dCcEMsTSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHd4LCB7IENvbXBvbmVudCB9IGZyb20gJ2xhYnJhZG9yJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICAvLyBfYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKCk7XHJcbiAgICAvLyBfY2xpZW50SW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuOAkGNvbnN0cnVjdG9y44CROiBcIiwgcHJvcHMpO1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGlzLmNsaWVudFdpZHRoID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aDtcclxuICAgICAgICB0aGlzLmJ1bGxldCA9IHRoaXMucHJvcHMuYnVsbGV0O1xyXG4gICAgICAgIHRoaXMuYmFzbGlzdGljID0gdGhpcy5wcm9wcy5iYXNsaXN0aWM7XHJcbiAgICAgICAgdGhpcy5vbkVqZWN0ID0gdGhpcy5wcm9wcy5vbkVqZWN0O1xyXG4gICAgICAgIHRoaXMuX3NwZWVkU2VlZCA9IDEuNTtcclxuICAgICAgICB0aGlzLl9kZWxheVNlZWQgPSAyMzMzO1xyXG4gICAgICAgIHRoaXMuX2J1bGxldHNUb3RhbCA9IHRoaXMucHJvcHMudG90YWw7XHJcblxyXG4gICAgICAgIHRoaXMudGV4dCA9IHRoaXMuYnVsbGV0LnRleHQ7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zaXplID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRpcmVjdCA9IDA7XHJcbiAgICAgICAgdGhpcy5kZWxheSA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDA7XHJcbiAgICAgICAgdGhpcy50b3AgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oKTtcclxuICAgICAgICBzd2l0Y2goKFwiXCIrdGhpcy5idWxsZXQuYm9yZSkubGVuZ3RoKXtcclxuICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNFM0NDNzJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDIwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDIyMDAwL3RoaXMuX3NwZWVkU2VlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjRUU2NjY2XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxODtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyMzAwMC90aGlzLl9zcGVlZFNlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiIzY2NjZFRVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMTg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjQwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiNGNDYwN0VcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE2O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDI1MDAwL3RoaXMuX3NwZWVkU2VlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjRUU2NkI4XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxNjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyNjAwMC90aGlzLl9zcGVlZFNlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0NDODhDQ1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMTQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjcwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBcIiM4MkIyRDJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IDE0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDI4MDAwL3RoaXMuX3NwZWVkU2VlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjOEZEODdEXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyOTAwMC90aGlzLl9zcGVlZFNlZWQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0FFQ0MzM1wiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMzAwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMTogXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjQzFFOEMxXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSAxMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAzMDAwMC90aGlzLl9zcGVlZFNlZWQ7ICAgIC8vMzEwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMDogXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gXCIjRUVFNEJCXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSA4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDMyMDAwL3RoaXMuX3NwZWVkU2VlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IFwiI0ZGMDAwMFwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gMjI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMjEwMDAvdGhpcy5fc3BlZWRTZWVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aDtcclxuICAgICAgICB0aGlzLmRpcmVjdCA9IHRoaXMubGVmdCArICghIXRoaXMudGV4dD90aGlzLnRleHQubGVuZ3RoKih0aGlzLnNpemUrNCk6MCk7XHJcbiAgICAgICAgdGhpcy5kZWxheSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSp0aGlzLl9idWxsZXRzVG90YWwpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IDE0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnVsbGV0J3MgX19fX19fOiBcIiwgdGhpcy50ZXh0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJ1bGxldCdzIF9fX19fX0lOSVRfX19fX2xlZnQvZGVsYXkvbGVuL2RpcmVjdC9zcGVlZDogXCIsIHRoaXMubGVmdCwgdGhpcy5kZWxheSp0aGlzLl9kZWxheVNlZWQsIHRoaXMudGV4dC5sZW5ndGgsIHRoaXMuZGlyZWN0LCB0aGlzLnNwZWVkKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbi50cmFuc2xhdGUoLTEqTWF0aC5hYnModGhpcy5kaXJlY3QpLCAwKS5zdGVwKHtkdXJhdGlvbjogdGhpcy5zcGVlZCwgZGVsYXk6IDB9KTtcclxuICAgICAgICAvLyB0aGlzLmFuaW1hdGlvbi50cmFuc2xhdGUoTWF0aC5hYnModGhpcy5kaXJlY3QpLCAwKS5zdGVwKHtkdXJhdGlvbjogMX0pO1xyXG4gICAgICAgIHRoaXMuYW5pID0gdGhpcy5hbmltYXRpb24uZXhwb3J0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICB7XHJcbiAgICAgICAgICAgIHRleHQ6IHRoaXMudGV4dCxcclxuICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IgfHwgXCIjRkYwMDAwXCIsXHJcbiAgICAgICAgICAgIHNpemU6IHRoaXMuc2l6ZSB8fCAxNCxcclxuICAgICAgICAgICAgc3BlZWQ6IHRoaXMuc3BlZWQgfHwgMjAwMDAsXHJcbiAgICAgICAgICAgIHRvcDogdGhpcy50b3AgfHwgMjUsXHJcbiAgICAgICAgICAgIGxlZnQ6IHRoaXMubGVmdCB8fCAwLFxyXG4gICAgICAgICAgICBhbmltYXRpb246IHRoaXMuYW5pbWF0aW9uLFxyXG4gICAgICAgICAgICAvLyBhbmk6IHRoaXMuYW5pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwifn5+eHh4eHh4IHN0YXRlOiBcIiwgdGhpcy5zdGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIGxldCBfdG4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMTIpKjIwO1xyXG4gICAgICAgIC8vIGxldCBfbG4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aCk7XHJcbiAgICAgICAgLy8gX3RvcCA9IDI1ICsgX3RuO1xyXG4gICAgICAgIC8vIF9sZWZ0ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aCtfbG4qMjtcclxuICAgICAgICAvLyBsZXQgc3NzID0gXCJ0b3A6XCIrX3RvcCtcInJweDtcIlxyXG4gICAgICAgIC8vIGxldCBfZGlyZWN0ID0gX3NpemUgKiB0aGlzLnByb3BzLmJ1bGxldC50ZXh0Lmxlbmd0aCArIF9sZWZ0O1xyXG4gICAgICAgIC8vIGxldCBfZGVsYXkgPSAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKnRoaXMucHJvcHMudG90YWwpKSo0MDA7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJCdWxsZXQncyBfX19fX19JTklUX19fX19kZWxheTogXCIsIF9kZWxheSwgX2RpcmVjdCk7XHJcbiAgICAgICAgLy8gdGhpcy5fYW5pbWF0aW9uLnRyYW5zbGF0ZSgtMTAwMCwgMCkuc3RlcCh7ZHVyYXRpb246IDE4MDAwfSk7XHJcbiAgICAgICAgLy8gdGhpcy5zdGF0ZSA9ICB7XHJcbiAgICAgICAgLy8gICAgIGNvbG9yOiBfY29sb3IgfHwgXCIjRkYwMDAwXCIsXHJcbiAgICAgICAgLy8gICAgIHNpemU6IF9zaXplIHx8IDIyLFxyXG4gICAgICAgIC8vICAgICBzcGVlZDogX3NwZWVkIHx8IDIwMDAwLFxyXG4gICAgICAgIC8vICAgICB0b3A6IF90b3AgfHwgMjUsXHJcbiAgICAgICAgLy8gICAgIHNzcyxcclxuICAgICAgICAvLyAgICAgbGVmdDogMTAgfHwgMCxcclxuICAgICAgICAvLyAgICAgYW5pbWF0aW9uOiB0aGlzLl9hbmltYXRpb24uZXhwb3J0KClcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJ+fn54eHh4eHggc3RhdGU6IFwiLCB0aGlzLnN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJ1bGxldCdzIF9fX19fX19fX19fOiBcIiwgdGhpcy5wcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vICAgICBsZXQgX3RvcCA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgX3RuID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEyKSoyMDtcclxuICAgICAgICAvLyAgICAgICAgIF90b3AgPSAyNSArIF90bjtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRvcDogX3RvcCB8fCAyNVxyXG4gICAgICAgIC8vICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICAgICBsZXQgX2RpcmVjdCA9IHRoaXMuc3RhdGUuc2l6ZSp0aGlzLnByb3BzLmJ1bGxldC50ZXh0Lmxlbmd0aCt0aGlzLnN0YXRlLmxlZnQ7XHJcbiAgICAgICAgLy8gICAgIGxldCBfZGVsYXkgPSAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKnRoaXMucHJvcHMudG90YWwpKSoxMDAwO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkJ1bGxldCdzIF9fX19fX2RlbGF5OiBcIiwgX2RlbGF5LCBfZGlyZWN0KTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fYW5pbWF0aW9uLnRyYW5zbGF0ZSgtMSpfZGlyZWN0LCAwKS5zdGVwKHtkdXJhdGlvbjogdGhpcy5zdGF0ZS5zcGVlZHx8MjIwMDAsIGRlbGF5Ol9kZWxheX0pO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9hbmltYXRpb24udHJhbnNsYXRlKF9kaXJlY3QsIDApLnN0ZXAoe2R1cmF0aW9uOiAyMDAwLCBkZWxheTowfSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIC8vICAgICAgICAgYW5pbWF0aW9uOiB0aGlzLl9hbmltYXRpb24uZXhwb3J0KClcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfS5iaW5kKHRoaXMpLCAzMjAwMCsyMDArdGhpcy5wcm9wcy50b3RhbCoxMDAwKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IF9kaXJlY3QgPSB0aGlzLnN0YXRlLnNpemUqdGhpcy5wcm9wcy5idWxsZXQudGV4dC5sZW5ndGgrdGhpcy5zdGF0ZS5sZWZ0O1xyXG4gICAgICAgIC8vIGxldCBfZGVsYXkgPSAoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKnRoaXMucHJvcHMudG90YWwpKSo0MDA7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJCdWxsZXQncyBfX19fX19JTklUX19fX19kZWxheTogXCIsIF9kZWxheSwgX2RpcmVjdCk7XHJcbiAgICAgICAgLy8gdGhpcy5fYW5pbWF0aW9uLnRyYW5zbGF0ZSgtMTAwMCwgMCkuc3RlcCh7ZHVyYXRpb246IDE4MDAwfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy90aGlzLl9hbmltYXRpb24udHJhbnNsYXRlKF9kaXJlY3QtdGhpcy5fY2xpZW50SW5mby53aW5kb3dXaWR0aC10aGlzLnN0YXRlLmxlZnQsIDApLnN0ZXAoe2R1cmF0aW9uOiAyMDAwLCBkZWxheTowfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IF9zdHQgPSB7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuc3RhdGUsXHJcbiAgICAgICAgICAgIGFuaTogdGhpcy5zdGF0ZS5hbmltYXRpb24uZXhwb3J0KClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBfc3R0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwieHh4eHh4IHN0YXRlOiBcIiwgdGhpcy5zdGF0ZSk7XHJcbiAgICB9XHJcblxyXG59Il19