class Swiper{
	constructor(opts){
		let _this = this;
		_this.def = {
			auto: true,
			interval: 3000,
			height: 'auto',
			startX:0,
			moveX:0,
			distanceX:0,
			index:1
		};
		_this._opts = $.extend({},this.def, opts);
		_this.w=$(_this._opts.box).width();
		_this.init();
	}
	
	init(){
		let _this = this;
		_this.touchstartEvent();
		_this.touchmoveEvent();
		_this.touchendEvent();
		if(_this._opts.auto){
			_this.setTime();
		}
	}
	setTransition(){
		let _this = this;
		$(_this._opts.box_ul).css({'transition':'transform 0.3s','-webkit-transition':'transform 0.3s'});
	}
	removeTranstion(){
		let _this = this;
		$(_this._opts.box_ul).css({'transition':'none','-webkit-transition':'none'});
	}
	setTransform(x){
		let _this = this;
		$(_this._opts.box_ul).css({'transform':'translateX('+(x)+'px)','-webkit-transform':'translateX('+(x)+'px)'});
	}
	
	setTime(){
		let _this = this;
		/*设置定时器，每3秒切换一张图片*/
	    _this.timer=setInterval(function(){
	        _this._opts.index++;
	        /*重新算一下ul的位移*/
	        let x=-_this._opts.index*_this.w;
	        _this.setTransition();
	        _this.setTransform(x);
	        setTimeout(function(){
	        	_this.setTransitionend();
	        },300)
	    },_this._opts.interval);
	    let timeData = window.timeData;
	    if(!timeData){
			window.timeData=[];
		}
	    window.timeData.push(_this.timer);
	}
	
	setTransitionend(){
		let _this = this;
		let num = $(_this._opts.box_ul_li).length;
		if(_this._opts.index>=num-1){
            _this._opts.index=1;
            let x=-_this.w;
            _this.removeTranstion();
            _this.setTransform(x);
        }
        if(_this._opts.index<=0){
            _this._opts.index=num-2;
            let x=-_this._opts.index*_this.w;
            _this.removeTranstion();
            _this.setTransform(x);
        }
        /*调用小圆点函数*/
        _this.setPoints(_this._opts.index);
    }
	
	touchstartEvent(){
		let _this = this;
		$(_this._opts.box).on('touchstart',function(e){
			e.preventDefault();
			clearInterval(_this.timer);
			/*当鼠标点击到box盒子的一瞬间，清除定时器*/
	        let timeData = window.timeData;
	        let newtimeData = [];
			if(!timeData){
				timeData=[];
			}
			for(let i=0;i<timeData.length;i++){
				if(_this.timer==timeData[i]){
				}else{
					newtimeData.push(timeData[i]);
				}
			}
			window.timeData = newtimeData;
	        /*获取鼠标在开始时的位置*/
	        _this.startX= e.changedTouches[0].clientX;
        });
	}
	
	touchmoveEvent(){
		let _this = this;
		let x = 0;
		$(_this._opts.box).on('touchmove',function(e){
			e.preventDefault();
			/*获取鼠标移动是的位置*/
	        _this.moveX= e.changedTouches[0].clientX;
	        /*算出移动后的位置和开始的距离差*/
	        _this.distanceX=(_this.moveX-_this.startX)*dpr;
	        
	        /*鼠标按住移动不放的话，ul也跟着移动，但是没有动画效果*/
	        x=-_this._opts.index*_this.w+_this.distanceX;
	        if(Math.abs(_this.distanceX)>=_this.w){
	        	if(_this.distanceX<0){
	        		x=-_this._opts.index*_this.w-_this.w;
	        	}else{
	        		x=-_this._opts.index*_this.w+_this.w;
	        	}
	        	
	        }
	        _this.removeTranstion();
	        _this.setTransform(x);
        });
	}
	
	touchendEvent(){
		let _this = this;
		let x = 0;
		let num = $(_this._opts.box_ul_li).length;
		$(_this._opts.box).on('touchend',function(e){
			e.preventDefault();
			 /*鼠标放开时，判断移动的长度是否大于box盒子的三分之一，如果是，再判断时候方向，最后让ul产生运动*/
	        if(Math.abs(_this.distanceX)>_this.w/3){
	            /*如果拖动距离大于0 就是向右拖动，上一页*/
	            if(_this.distanceX>0){
	                _this._opts.index--;
	            }
	            /*如果拖动距离小于0 就是向左拖动，下一页*/
	            if(_this.distanceX<0){
	                _this._opts.index++;
	            }
	
	        }else{
	            /*拖动距离小于三分之一，被吸附回去*/
	        }
	        x=-_this._opts.index*_this.w;
	        _this.setTransition();
	        _this.setTransform(x);

			setTimeout(function(){
	        	_this.setTransitionend();
	        },300)
	        /*鼠标离开的时候，重新开启定时器*/
			if(_this._opts.auto){
				_this.setTime();
			}
	
	        /*方式数据错乱，将数据重置*/
	        _this.startX=0;
	        _this.moveX=0;
	        _this.distanceX=0;
        });
	}
	
	setPoints(index){
		let _this = this;
		let lis = $(_this._opts.box_li);
        for(let i=0;i<lis.length;i++){
            lis[i].classList.remove('active');
        }
        lis[index-1].classList.add('active');
    }
}
export default Swiper;