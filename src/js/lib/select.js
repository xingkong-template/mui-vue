class Select{
	constructor(opts){
		let _this = this;
		_this.def = {
			el:'',
			data: [],
			sdata:[],
			tdata:[],
			type: 0,
			indexNum:[0,0,0],
			mask:true,
			maskClose:true,
			moveRes:true
		};
		_this._opts = $.extend({},this.def, opts);
		$(_this._opts.el).blur();
		_this.init();
	}
	
	init(){
		let _this = this;
		
		let indexNum = $(_this._opts.el).attr('indexNum');
		if(indexNum){
			_this._opts.indexNum = indexNum.split(',');
		}
		_this.fdata = _this._opts.data[_this._opts.indexNum[0]];
		if(_this._opts.type!=0){
			if(_this._opts.sdata.length<=0){
				_this.sdata = _this.fdata.obj;
			}else{
				_this.sdata = _this._opts.sdata;
				_this.fdata.obj = _this.sdata;
			}
		}
		
		if(_this._opts.type==2){
			if(_this._opts.tdata.length<=0){
				_this.tdata = _this.sdata[_this._opts.indexNum[1]].obj;
			}else{
				_this.tdata = _this._opts.tdata;
				_this.sdata.obj = _this.tdata;
			}
		}
		
		_this.str();
	}
	
	
	str(){
		let _this = this;
		let strs = '<div id="select-popup">',
			btn = '<div class="btn"><div class="btn-close">取消</div><div class="confbt">确定</div></div>',
			mask = '<div class="select-mask"></div>',
			content = '<div class="content">';
		if(_this._opts.mask){
			strs += mask;
		}
		strs += btn;
		strs += content;
		switch(_this._opts.type) {
			case 0:
				strs +=_this.fstr();
				break;
			case 1:
				strs +=_this.fstr();
				strs +=_this.sstr();
				break;
			case 2:
				strs +=_this.fstr();
				strs +=_this.sstr();
				strs +=_this.tstr();
				break;
			default:
				break;
			
		}
		strs +='</div></div>';
		$(strs).appendTo('body');
		_this.setMoveF();
		if(_this._opts.type!=0){
			_this.setMoveS();
		}
		
		if(_this._opts.type==2){
			_this.setMoveT();
		}
		_this.confEvent();
		if(_this._opts.maskClose){
			_this.maskEvent();
		}
		_this.bindEventF();
		_this.bindEventS();
		_this.bindEventT();
		_this.eventc();
	}
	
	
	
	fstr(){
		let _this = this;
		let content = '<div class="fstra"><ul class="fstr">';
		if(_this._opts.data.length>0){
			let datas = _this._opts.data;
			content +=_this.listr(datas);
		}
		content +='</ul><div class="selected"></div></div>';
		
		return content;
	}
	
	listr(datas){
		let _this = this;
		let str = '';
		for(let i=0;i<datas.length;i++){
			str +='<li lid="'+datas[i].id+'">'+datas[i].text+'</li>';
		}	
		return str;
	}
	
	sstr(){
		let _this = this;
		let content = '<div class="sstra"><ul class="sstr">';
		let datas = _this.sdata;
		content +=_this.listr(datas);
		content +='</ul><div class="selected"></div></div>';
		return content;
	}
	
	tstr(){
		let _this = this;
		let content = '<div class="tstra"><ul class="tstr">';
		let datas = _this.tdata;
		content +=_this.listr(datas);
		content +='</ul><div class="selected"></div></div>';
		return content;
	}
	
	changeSstr(data){
		let _this = this;
		if(data){
			_this.sdata = data;
		}
		$('#select-popup .sstr').html(_this.listr(_this.sdata));
		$('#select-popup .sstr').css({'transform':'translateY('+_this.moveyS+'px)'});
	}
	
	changeTstr(data){
		let _this = this;
		if(data){
			_this.tdata = data;
		}
		$('#select-popup .tstr').html(_this.listr(_this.tdata));
		
		$('#select-popup .tstr').css({'transform':'translateY('+_this.moveyT+'px)'});
	}
	
	bindEventF(){
		let _this = this;
		let maxheight = $('#select-popup .fstr').height();
		let liheight = $('#select-popup .fstr li').height();
		maxheight = maxheight-liheight;
		$('#select-popup .fstra').on('touchstart',function(e){
			e.preventDefault();
			maxheight = $('#select-popup .fstr').height();
			maxheight = maxheight-liheight;
			_this.fmovestart = e.targetTouches[0].screenY;
		});
		
		$('#select-popup .fstra').on('touchmove',function(e){
			e.preventDefault();
			_this.fmovestartnew = e.targetTouches[0].screenY;
			let movey = (_this.fmovestartnew-_this.fmovestart)*dpr;
			movey += _this.moveyF;

			
			if(movey>=0){
				_this.moveyF = 0;
				$('#select-popup .fstr').css({'transform':'translateY('+_this.moveyF+'px)'});
				return false;
			}
			
			if(Math.abs(movey)>=maxheight){
				_this.moveyF = -maxheight;
				$('#select-popup .fstr').css({'transform':'translateY('+_this.moveyF+'px)'});
				return false;
			}
			$('#select-popup .fstr').css({'transform':'translateY('+movey+'px)'});
		})
		
		$('#select-popup .fstra').on('touchend',function(e){
			e.preventDefault();
			let movey = (_this.fmovestartnew-_this.fmovestart)*dpr;
			movey += _this.moveyF;
			_this.moveyF = movey;
			$('#select-popup .fstr').height();
			let liheighty = _this.moveyF%liheight;
			if(movey>=0){
				_this.moveyF = 0;
				$('#select-popup .fstr').css({'transform':'translateY('+_this.moveyF+'px)'});
			}else if(Math.abs(_this.moveyF)>=maxheight){
				_this.moveyF = -maxheight;
				$('#select-popup .fstr').css({'transform':'translateY('+_this.moveyF+'px)'});
			}else if(liheighty!=0){
				if(Math.abs(liheighty)>Math.abs(liheight/2)){
					if(_this.moveyF<0){
						_this.moveyF = parseInt(_this.moveyF/liheight)*liheight-liheight;
					}else{
						_this.moveyF = parseInt(_this.moveyF/liheight)*liheight+liheight;
					}
					
					$('#select-popup .fstr').css({'transform':'translateY('+_this.moveyF+'px)'});
				}else{
					_this.moveyF = parseInt(_this.moveyF/liheight)*liheight;
					$('#select-popup .fstr').css({'transform':'translateY('+_this.moveyF+'px)'});
				}
			}
			_this.moveyFNum = Math.abs(_this.moveyF)/liheight;
			let fdata = _this._opts.data[_this.moveyFNum];
//			_this.fdata = fdata;


			_this._opts.indexNum[0] =  _this.moveyFNum;
			if(_this._opts.moveRes){
				if(fdata.obj){
					_this.sdata = fdata.obj;
					_this.tdata = _this.sdata[0].obj;
				}
				if(_this._opts.type!=0){
					_this._opts.indexNum[1] =  0;
				}
				if(_this._opts.type==2){
					_this._opts.indexNum[2] =  0;
				}
				_this.moveyS = 0;
				_this.moveyT = 0;
			}

			if(_this._opts.moveCallbackF){
				_this._opts.moveCallbackF({num:_this.moveyFNum,data:fdata,liheight:liheight});
				
			}else{
				if(_this._opts.type!=0){
					_this.changeSstr();
				}
				if(_this._opts.type==2){
					_this.changeTstr();
				}
			}
			
		})
	}

	
	bindEventS(){
		let _this = this;
		let maxheight = $('#select-popup .sstr').height();
		let liheight = $('#select-popup .sstr li').height();
		maxheight = maxheight-liheight;
		if(_this._opts.type!=0){
			$('#select-popup .sstra').on('touchstart',function(e){
				e.preventDefault();
				maxheight = $('#select-popup .sstr').height();
				maxheight = maxheight-liheight;
				_this.smovestart = e.targetTouches[0].screenY;
			});
			
			$('#select-popup .sstra').on('touchmove',function(e){
				e.preventDefault();
				_this.smovestartnew = e.targetTouches[0].screenY;
				let movey = (_this.smovestartnew-_this.smovestart)*dpr;
				movey += _this.moveyS;

				
				if(movey>=0){
					_this.moveyS = 0;
					$('#select-popup .sstr').css({'transform':'translateY('+_this.moveyS+'px)'});
					return false;
				}
				if(Math.abs(movey)>=maxheight){
					_this.moveyS = -maxheight;
					$('#select-popup .sstr').css({'transform':'translateY('+_this.moveyS+'px)'});
					return false;
				}
				$('#select-popup .sstr').css({'transform':'translateY('+movey+'px)'});
			})
			
			$('#select-popup .sstra').on('touchend',function(e){
				e.preventDefault();
				let movey = (_this.smovestartnew-_this.smovestart)*dpr;
				movey += _this.moveyS;
				_this.moveyS = movey;
				$('#select-popup .sstr').height();
				let liheighty = _this.moveyS%liheight;
				if(movey>=0){
					_this.moveyS = 0;
					$('#select-popup .sstr').css({'transform':'translateY('+_this.moveyS+'px)'});
				}else if(Math.abs(_this.moveyS)>=maxheight){
					_this.moveyS = -maxheight;
					$('#select-popup .sstr').css({'transform':'translateY('+_this.moveyS+'px)'});
				}else if(liheighty!=0){
					if(Math.abs(liheighty)>Math.abs(liheight/2)){
						if(_this.moveyS<0){
							_this.moveyS = parseInt(_this.moveyS/liheight)*liheight-liheight;
						}else{
							_this.moveyS = parseInt(_this.moveyS/liheight)*liheight+liheight;
						}
						
						$('#select-popup .sstr').css({'transform':'translateY('+_this.moveyS+'px)'});
					}else{
						_this.moveyS = parseInt(_this.moveyS/liheight)*liheight;
						$('#select-popup .sstr').css({'transform':'translateY('+_this.moveyS+'px)'});
					}
				}
				_this.moveySNum = Math.abs(_this.moveyS)/liheight;
				let sdata = {};

				
				_this._opts.indexNum[1] =  _this.moveySNum;
				if(_this._opts.moveRes){
					if(_this._opts.data[_this._opts.indexNum[0]].obj){
						_this.sdata = _this._opts.data[_this._opts.indexNum[0]].obj;
						sdata = _this.sdata[_this.moveySNum];
					}else{
//						sdata = _this.sdata;
					}
					
//					_this.sdata = sdata;
					if(sdata&&sdata.obj){
						_this.tdata = sdata.obj;
					}
					if(_this._opts.type==2){
						_this._opts.indexNum[2] =  0;
					}
					_this.moveyT = 0;
				}
				if(_this._opts.moveCallbackS){
					_this._opts.moveCallbackS({num:_this.moveySNum,data:sdata,liheight:liheight});
				}else{
					if(_this._opts.type==2){
						_this.changeTstr();
					}
				}
			})
		}
	}
	
	bindEventT(){
		let _this = this;
		let maxheight = $('#select-popup .tstr').height();
		let liheight = $('#select-popup .tstr li').height();
		maxheight = maxheight-liheight;
		if(_this._opts.type==2){
			$('#select-popup .tstra').on('touchstart',function(e){
				e.preventDefault();
				maxheight = $('#select-popup .tstr').height();
				maxheight = maxheight-liheight;
				_this.tmovestart = e.targetTouches[0].screenY;
			});
			
			$('#select-popup .tstra').on('touchmove',function(e){
				e.preventDefault();
				_this.tmovestartnew = e.targetTouches[0].screenY;
				let movey = (_this.tmovestartnew-_this.tmovestart)*dpr;
				movey += _this.moveyT;
				
				if(movey>=0){
					_this.moveyT = 0;
					$('#select-popup .tstr').css({'transform':'translateY('+_this.moveyT+'px)'});
					return false;
				}
				
				if(Math.abs(movey)>=maxheight){
					_this.moveyT = -maxheight;
					$('#select-popup .tstr').css({'transform':'translateY('+_this.moveyT+'px)'});
					return false;
				}
				$('#select-popup .tstr').css({'transform':'translateY('+movey+'px)'});
			})
			
			$('#select-popup .tstra').on('touchend',function(e){
				e.preventDefault();
				let movey = (_this.tmovestartnew-_this.tmovestart)*dpr;
				movey += _this.moveyT;
				_this.moveyT = movey;
				$('#select-popup .tstr').height();
				let liheighty = _this.moveyT%liheight;
				if(movey>=0){
					_this.moveyT = 0;
					$('#select-popup .tstr').css({'transform':'translateY('+_this.moveyT+'px)'});

				}else if(Math.abs(_this.moveyT)>=maxheight){
					_this.moveyT = -maxheight;
					$('#select-popup .tstr').css({'transform':'translateY('+_this.moveyT+'px)'});
				}else if(liheighty!=0){
					if(Math.abs(liheighty)>Math.abs(liheight/2)){
						if(_this.moveyT<0){
							_this.moveyT = parseInt(_this.moveyT/liheight)*liheight-liheight;
						}else{
							_this.moveyT = parseInt(_this.moveyT/liheight)*liheight+liheight;
						}
						
						$('#select-popup .tstr').css({'transform':'translateY('+_this.moveyT+'px)'});
					}else{
						_this.moveyT = parseInt(_this.moveyT/liheight)*liheight;
						$('#select-popup .tstr').css({'transform':'translateY('+_this.moveyT+'px)'});
					}
				}
				_this.moveyTNum = Math.abs(_this.moveyT)/liheight;
				let tdata = [];
				if(_this.sdata[_this._opts.indexNum[1]].obj){
					tdata = _this.sdata[_this._opts.indexNum[1]].obj[_this.moveyTNum];
				}else{
//					tdata = _this.tdata;
				}
//				
//				_this.tdata = tdata;
				_this._opts.indexNum[2] =  _this.moveyTNum;
//				_this._opts.moveCallbackS({num:_this.moveyTNum,data:_this.tdata});
			})
		}
	}
		
	setMoveF(){
		let _this = this;
		let liheight = $('#select-popup .fstr li').height();
		_this.moveyF = -_this._opts.indexNum[0]*liheight;
		$('#select-popup .fstr').css({'transform':'translateY('+_this.moveyF+'px)'});
	}
			
	setMoveS(){
		let _this = this;
		let liheight = $('#select-popup .sstr li').height();
		_this.moveyS = -_this._opts.indexNum[1]*liheight;
		$('#select-popup .sstr').css({'transform':'translateY('+_this.moveyS+'px)'});
	}
			
	setMoveT(){
		let _this = this;
		let liheight = $('#select-popup .tstr li').height();
		_this.moveyT = -_this._opts.indexNum[2]*liheight;
		$('#select-popup .tstr').css({'transform':'translateY('+_this.moveyT+'px)'});
	}
	confEvent(){
		let _this = this;
		$('#select-popup .confbt').on('click',function(){
			$(_this._opts.el).attr('indexNum',_this._opts.indexNum.join(','));
			let docType = $(_this._opts.el).is('input');
			if(_this._opts.type==0){
				let fdata = _this._opts.data[_this._opts.indexNum[0]];
				if(_this._opts.callback){
					_this._opts.callback(fdata);
					return false;
				}
				$(_this._opts.el).attr('lid',fdata.id);
				if(docType){
					$(_this._opts.el).val(fdata.text);
				}else{
					$(_this._opts.el).text(fdata.text);
				}
				
			}else if(_this._opts.type==1){
				let fdata = _this._opts.data[_this._opts.indexNum[0]];
				let sdata = _this.sdata[_this._opts.indexNum[1]];
				if(_this._opts.callback){
					_this._opts.callback(fdata,sdata);
					return false;
				}
				$(_this._opts.el).attr('lid',sdata.id);
				if(docType){
					$(_this._opts.el).val(sdata.text);
				}else{
					$(_this._opts.el).text(sdata.text);
				}
			}else{
				let fdata = _this._opts.data[_this._opts.indexNum[0]];
				let sdata = _this.sdata[_this._opts.indexNum[1]];
				let tdata = _this.tdata[_this._opts.indexNum[2]];
				if(_this._opts.callback){
					_this._opts.callback(fdata,sdata,tdata);
					return false;
				}
				$(_this._opts.el).attr('lid',tdata.id);
				if(docType){
					$(_this._opts.el).val(tdata.text);
				}else{
					$(_this._opts.el).text(tdata.text);
				}
			}
			_this.close();
		});
	}
	
	eventc(){
		let _this = this;
		$('#select-popup .btn-close').on('click',function(){
			_this.close();
		});
	}
	
	maskEvent(){
		let _this = this;
		$('#select-popup .select-mask').on('click',function(){
			_this.close();
		});
	}
	
	close(){
		let _this = this;
		$('#select-popup').remove();
	}
	
}
export default Select;