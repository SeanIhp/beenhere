import wx, { Component } from 'labrador';

export default class Bullet extends Component {
    // _animation = wx.createAnimation();
    // _clientInfo = wx.getSystemInfoSync();

    constructor(props){
        super(props);
        console.log("【constructor】: ", props);
        let that = this;
        this.clientWidth = wx.getSystemInfoSync().windowWidth;
        this.bullet = this.props.bullet;
        this.baslistic = this.props.baslistic;
        this.onEject = this.props.onEject;
        this._speedSeed = 1.5;
        this._delaySeed = 2333;
        this._bulletsTotal = this.props.total;

        this.text = this.bullet.text;
        this.color = null;
        this.size = null;
        this.direct = 0;
        this.delay = 0;
        this.speed = 0;
        this.top = null;
        this.left = null;
        this.animation = wx.createAnimation();
        switch((""+this.bullet.bore).length){
            case 10:
                this.color = "#E3CC72";
                this.size = 20;
                this.speed = 22000/this._speedSeed;
                break;
            case 9:
                this.color = "#EE6666";
                this.size = 18;
                this.speed = 23000/this._speedSeed;
                break;
            case 8:
                this.color = "#6666EE";
                this.size = 18;
                this.speed = 24000/this._speedSeed;
                break;
            case 7:
                this.color = "#F4607E";
                this.size = 16;
                this.speed = 25000/this._speedSeed;
                break;
            case 6:
                this.color = "#EE66B8";
                this.size = 16;
                this.speed = 26000/this._speedSeed;
                break;
            case 5:
                this.color = "#CC88CC";
                this.size = 14;
                this.speed = 27000/this._speedSeed;
                break;
            case 4:
                this.color = "#82B2D2";
                this.size = 14;
                this.speed = 28000/this._speedSeed;
                break;
            case 3:
                this.color = "#8FD87D";
                this.size = 12;
                this.speed = 29000/this._speedSeed;
                break;
            case 2:
                this.color = "#AECC33";
                this.size = 12;
                this.speed = 30000/this._speedSeed;
                break;
            case 1: 
                this.color = "#C1E8C1";
                this.size = 10;
                this.speed = 30000/this._speedSeed;    //31000/this._speedSeed;
                break;
            case 0: 
                this.color = "#EEE4BB";
                this.size = 8;
                this.speed = 32000/this._speedSeed;
                break;
            default:
                this.color = "#FF0000";
                this.size = 22;
                this.speed = 21000/this._speedSeed;
        }

        this.left = wx.getSystemInfoSync().windowWidth;
        this.direct = this.left + (!!this.text?this.text.length*(this.size+4):0);
        this.delay = Math.round(Math.random()*this._bulletsTotal);
        this.size = 14;
        console.log("Bullet's ______: ", this.text);
        console.log("Bullet's ______INIT_____left/delay/len/direct/speed: ", this.left, this.delay*this._delaySeed, this.text.length, this.direct, this.speed);
        this.animation.translate(-1*Math.abs(this.direct), 0).step({duration: this.speed, delay: 0});
        // this.animation.translate(Math.abs(this.direct), 0).step({duration: 1});
        this.ani = this.animation.export();
        
        this.state =  {
            text: this.text,
            color: this.color || "#FF0000",
            size: this.size || 14,
            speed: this.speed || 20000,
            top: this.top || 25,
            left: this.left || 0,
            animation: this.animation,
            // ani: this.ani
        }
        console.log("~~~xxxxxx state: ", this.state);

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
        
        let _stt = {
            ...this.state,
            ani: this.state.animation.export()
        };
        this.state = _stt;
        console.log("xxxxxx state: ", this.state);
    }

}