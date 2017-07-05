import $ from 'jquery';
import loading from '../../assets/img/loading.gif';
export default {
	show: function(opts) {
		let _this = this;
		_this.notimeclose();
		let def = {
			width: 300,
			height: 150,
			title: {
				show: true,
				text: '提示框'
			},
			close: {
				show: false,
				callback: function() {
					_this.close();
				}
			},
			content: '',
			mask: true,
			popupbg: '',
			maskClose: false,
			altBtn: '确　认',
			altBtnFlag:true,
			botton: ['取　消', '确　认'],
			type: '1',
			confcallback: function() {
				_this.close();
			},
			callback: function() {}
		}

		let opt = $.extend({}, def, opts);

		let title = '<h3 class="popup-title">' + opt.title.text + '</h3>',
			close = '<span class="popup-close">&times;</span>',
			content = '<div class="popup-content">' + opt.content + '</div>',
			mask = '<div id="popup-mask"></div>',
			botton = '<div class="popup-btn"><div class="popup-altBtn">' + opt.altBtn + '</div></div>',
			btn1 = '<div class="popup-btn"><div class="popup-closeAltBtn">' + opt.botton[0] + '</div>',
			btn2 = '<div class="popup-confAltBtn">' + opt.botton[1] + '</div></div>';

		let str = '<div id="popup">';
		if(opt.type == 4) {
			str = '<div id="popup-toast">';
		}
		if(opt.mask) {
			str += mask;
		}

		str += '<div class="popup-dialog ' + opt.popupbg + '">';

		if(opt.title.show) {
			str += title;
		}
		if(opt.close.show) {
			str += close;
		}

		switch(opt.type) {
			case '1':
				if(opt.altBtnFlag){
					str += content + botton + '</div></div>';
				}else{
					str += content  + '</div></div>';
				}
				break;
			case '2':
				str += content + btn1 + btn2 + '</div></div>';
				break;
			case '3':
				str += opt.content + '</div></div>';
				break;
			case '4':
				str += '<div class="popup-content" style="min-height:auto;color:#fff;">' + opt.content + '</div></div></div>';
				break;
			default:
				break;
		}

		$(str).appendTo('body').find('.popup-close').on('click', function() {
			opt.close.callback();
		})
		$('.popup-altBtn').on('click', function() {
			opt.close.callback();
		})
		$('.popup-closeAltBtn').on('click', function() {
			opt.close.callback();
		})
		$('.popup-confAltBtn').on('click', function() {
			opt.confcallback();
		})

		if(opt.maskClose) {
			$('#popup-mask,.popup-dialog').on('click', function() {
				opt.close.callback();
			})
		}
		opt.callback();
	},
	close: function() {
		$('#popup .popup-dialog,#popup-mask').css({
			'animation': 'maskout-animations 0.3s ease-out forwards'
		});
		setTimeout(function() {
			$('#popup,#popup-mask').remove();
		}, 300);

	},
	notimeclose: function() {
		$('#popup,#popup-mask,#popup-toast').remove();
	},
	alert: function(content) {
		this.show({
			title: {
				show: true,
				text: '提示框'
			},
			content: '<div class="popup-center">' + content + '</div>'
		})
	},
	confirm: function(opts) {
		opts['content'] = '<div class="popup-center">' + opts.content + '</div>';
		opts['type'] = '2';
		opts['height'] = 220;
		opts['title'] = {
			show: true,
			text: '确认框'
		}
		this.show(opts)
	},
	loading: function() {
		this.show({
			title: {
				show: false
			},
			popupbg: 'loading-bg',
			type: '3',
			content: '<img class="loading" src="' + loading + '" />'
		})
	},
	toast: function(content) {
		this.show({
			title: {
				show: false
			},
			popupbg: 'toastbg',
			type: '4',
			mask: false,
			content: content
		});
		setTimeout(function() {
			$('#popup-toast .popup-dialog').css({
				'animation': 'maskout-animations 0.3s ease-out forwards'
			});
			setTimeout(function() {
				$('#popup-toast').remove();
			}, 300);
		}, 2000);
	},
	showimg: function(img) {
		let _this = this;
		_this.show({
			title: {
				show: false
			},
			popupbg: 'showimgbg',
			type: '3',
			maskClose: true,
			content: '<img class="showimg" src="' + img + '" />'
		})
		
	}
}