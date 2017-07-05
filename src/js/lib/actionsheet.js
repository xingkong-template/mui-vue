export default{
	show:function(opts){
		let _this = this;
//		_this.close();
		let def = {
			data:[],
			closeNmae:'取消',
			close:function(){
				_this.close();
			},
			callback : function(){
				_this.close();
			},
			type : '1',
			maskClose : true,
			closeBtn : false
		}
		let opt = $.extend({},def,opts);
		let mask = '<div id="actionsheet-mask"></div>',
			closeBtn = '<li class="closeBtn">'+opt.closeNmae+'</li>';
		let str = '<div id="actionsheet">';
		if(opt.maskClose){
			str += mask;
		}
		str += '<ul>';
		for(let i = 0;i<opt.data.length;i++){
			str += '<li class="actionsheet-li" lid="'+opt.data[i].id+'">'+ opt.data[i].text +'</li>';
		}
		if(opt.closeBtn){
			str += closeBtn;
		}
		str +='</ul></div>';
		$(str).appendTo('body');
		$('#actionsheet #actionsheet-mask,#actionsheet .closeBtn').on('click',function(){
			_this.close();
		})
		$('#actionsheet .actionsheet-li').on('click',function(){
			let datas = {text:$(this).text(),id:$(this).attr('lid')};
			opt.callback(datas);
		});
	},
	close:function(){
		$('#actionsheet ul').css({'animation':'actionsheet-close-animations 0.3s ease-out forwards'});
		$('#actionsheet #actionsheet-mask').css({'animation':'maskout-animations 0.3s ease-out forwards'});
		setTimeout(function(){
			$('#actionsheet').remove();
		},300);
	}
}
