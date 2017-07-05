export default {
	touchstartEvent:function(e){
		e.preventDefault();
		let _this = this;
		_this.el = $(e.target).closest('.swipeout')[0];
		console.log($(_this.el).height())
		if(!$(_this.el).attr('rightflag')){
			let rheight = $(_this.el).height();
//			$('.swipeout-right').height(rheight);
			$('.swipeout-right').css({height:rheight+'px','line-height':rheight+'px'});
			console.log($('.swipeout-right').height())
			$('.swipeout-right').attr('rightflag','1');	
			_this.w = $('.swipeout-right').width();
		}

	    /*获取鼠标在开始时的位置*/
	    _this.startX= e.changedTouches[0].clientX;
	},
	
	touchmoveEvent:function(e){
		let _this = this;
		let x = 0;
		e.preventDefault();
		/*获取鼠标移动是的位置*/
        _this.moveX= e.changedTouches[0].clientX;
        /*算出移动后的位置和开始的距离差*/
        _this.distanceX=(_this.moveX-_this.startX)*dpr;
        
        /*鼠标按住移动不放的话，ul也跟着移动，但是没有动画效果*/
        x=_this.distanceX;
        if(Math.abs(_this.distanceX)>=_this.w){
        	if(_this.distanceX<0){
        		x=-_this.w;
        	}else{
        		x=0;
        	}
        }
        _this.removeTranstion();
        _this.setTransform(x);
	},
	
	touchendEvent:function(e){
		let _this = this;
		let x = 0;
		e.preventDefault();
		 /*鼠标放开时，判断移动的长度是否大于box盒子的三分之一，如果是，再判断时候方向，最后让ul产生运动*/
        if(Math.abs(_this.distanceX)>_this.w/3){
            /*如果拖动距离大于0 就是向右拖动，上一页*/
            if(_this.distanceX>0){
                x=0;
            }
            /*如果拖动距离小于0 就是向左拖动，下一页*/
            if(_this.distanceX<0){
                x=-_this.w;
            }

        }else{
            /*拖动距离小于三分之一，被吸附回去*/
        }
        _this.setTransition();
        _this.setTransform(x);
		
        /*方式数据错乱，将数据重置*/
        _this.startX=0;
        _this.moveX=0;
        _this.distanceX=0;
	},
	
	setTransition:function(){
		let _this = this;
		$(_this.el).css({'transition':'transform 0.3s','-webkit-transition':'transform 0.3s'});
	},
	
	removeTranstion:function(){
		let _this = this;
		$(_this.el).css({'transition':'none','-webkit-transition':'none'});
	},
	
	setTransform:function(x){
		let _this = this;
		console.log(x)
		$(_this.el).css({'transform':'translateX('+(x)+'px)','-webkit-transform':'translateX('+(x)+'px)'});
	}
}