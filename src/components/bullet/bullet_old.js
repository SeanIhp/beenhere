import wx, { Component } from 'labrador';

export default class Bullet extends Component {
    _animation = wx.createAnimation();
    _clientInfo = wx.getSystemInfoSync();

    constructor(props){
        super(props);
        let _color = null;
        let _size = null;
        let _speed = null;
        let _top = null;
        let _left = null;
        switch((""+this.props.bullet.bore).length){
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
        let _tn = Math.round(Math.random()*12)*20;
        let _ln = Math.round(Math.random()*wx.getSystemInfoSync().windowWidth);
        _top = 25 + _tn;
        _left = wx.getSystemInfoSync().windowWidth+_ln*2;

        let sss = "top:"+_top+"rpx;"
        let _direct = _size * this.props.bullet.text.length + _left;
        let _delay = (Math.round(Math.random()*this.props.total))*400;
        console.log("Bullet's ______INIT_____delay: ", _delay, _direct);
        this._animation.translate(-1000, 0).step({duration: 18000});

        this.state =  {
            color: _color || "#FF0000",
            size: _size || 22,
            speed: _speed || 20000,
            top: _top || 25,
            sss,
            left: 10 || 0,
            animation: this._animation.export()
        }
        console.log("~~~xxxxxx state: ", this.state);
    }

    onUpdate() {
        console.log("Bullet's ___________: ", this.props);
    }

    onLoad() {
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

}