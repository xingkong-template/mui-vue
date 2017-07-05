class Dropload{
	constructor(options) {
		let _this = this;
		_this.$element = $(options.el);
		// 上方是否插入DOM
		_this.upInsertDOM = false;
		// loading状态
		_this.loading = false;
		// 是否锁定
		_this.isLockUp = false;
		_this.isLockDown = false;
		// 是否有数据
		_this.isData = true;
		_this._scrollTop = 0;
		_this._threshold = 0;

		_this.win = window;
		_this.doc = document;
		_this.$win = $(_this.win);
		_this.$doc = $(_this.doc);
		_this.opts = $.extend(true, {}, {
			scrollArea: _this.$element, // 滑动区域
			domUp: { // 上方DOM
				domClass: 'dropload-up',
				domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
				domUpdate: '<div class="dropload-update">↑释放更新</div>',
				domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
			},
			domDown: { // 下方DOM
				domClass: 'dropload-down',
				domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
				domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
				domNoData: '<div class="dropload-noData">暂无数据</div>'
			},
			autoLoad: true, // 自动加载
			distance: 50, // 拉动距离
			threshold: '', // 提前加载距离
			loadUpFn: '', // 上方function
			loadDownFn: '' // 下方function
		}, options);

		// 如果加载下方，事先在下方插入DOM
		if(_this.opts.loadDownFn != '') {
			_this.$element.append('<div class="' + _this.opts.domDown.domClass + '">' + _this.opts.domDown.domRefresh + '</div>');
			_this.$domDown = $('.' + _this.opts.domDown.domClass);
		}

		// 计算提前加载距离
		if(!!_this.$domDown && _this.opts.threshold === '') {
			// 默认滑到加载区2/3处时加载
			_this._threshold = Math.floor(_this.$domDown.height() * 1 / 3);
		} else {
			_this._threshold = _this.opts.threshold;
		}

		// 判断滚动区域
		if(_this.opts.scrollArea == _this.win) {
			_this.$scrollArea = _this.$win;
			// 获取文档高度
			_this._scrollContentHeight = _this.$doc.height();
			// 获取win显示区高度  —— 这里有坑
			_this._scrollWindowHeight = doc.docu_thisntEle_thisnt.clientHeight;
		} else {
			_this.$scrollArea = _this.opts.scrollArea;
			_this._scrollContentHeight = _this.$element[0].scrollHeight;
			_this._scrollWindowHeight = _this.$element.height();
		}
		_this.fnAutoLoad(_this);

		// 窗口调整
		_this.$win.on('resize', function() {
			clearTimeout(_this.timer);
			_this.timer = setTimeout(function() {
				if(_this.opts.scrollArea == _this.win) {
					// 重新获取win显示区高度
					_this._scrollWindowHeight = _this.win.innerHeight;
				} else {
					_this._scrollWindowHeight = _this.$element.height();
				}
				_this.fnAutoLoad(_this);
			}, 150);

		});

		// 绑定触摸
		_this.$element.on('touchstart', function(e) {
			if(!_this.loading) {
				_this.fnTouches(e);
				_this.fnTouchstart(e, _this);
			}
		});
		_this.$element.on('touchmove', function(e) {
			if(!_this.loading) {
				_this.fnTouches(e, _this);
				_this.fnTouchmove(e, _this);
			}
		});
		_this.$element.on('touchend', function(e) {
			if(!_this.loading) {
				_this.fnTouchend(_this);
			}
		});

		// 加载下方
		_this.$scrollArea.on('scroll', function() {
			_this._scrollTop = _this.$scrollArea.scrollTop();

			// 滚动页面触发加载数据
			if(_this.opts.loadDownFn != '' && !_this.loading && !_this.isLockDown && (_this._scrollContentHeight - _this._threshold) <= (_this._scrollWindowHeight + _this._scrollTop)) {
				_this.loadDown(_this);
			}
		});
	}

	// touches
	fnTouches(e) {
		if(!e.touches) {
			e.touches = e.originalEvent.touches;
		}
	}

	// touchstart
	fnTouchstart(e, me) {
		let _this = this;
		_this._startY = e.touches[0].pageY;
		// 记住触摸时的scrolltop值
		_this.touchScrollTop = _this.$scrollArea.scrollTop();
	}

	// touchmove
	fnTouchmove(e, me) {
		let _this = this;
		_this._curY = e.touches[0].pageY;
		_this._moveY = _this._curY - _this._startY;

		if(_this._moveY > 0) {
			_this.direction = 'down';
		} else if(_this._moveY < 0) {
			_this.direction = 'up';
		}

		let _absMoveY = Math.abs(_this._moveY);

		// 加载上方
		if(_this.opts.loadUpFn != '' && _this.touchScrollTop <= 0 && _this.direction == 'down' && !_this.isLockUp) {
			e.preventDefault();

			_this.$domUp = $('.' + _this.opts.domUp.domClass);
			// 如果加载区没有DOM
			if(!_this.upInsertDOM) {
				_this.$element.prepend('<div class="' + _this.opts.domUp.domClass + '"></div>');
				_this.upInsertDOM = true;
			}

			_this.fnTransition(_this.$domUp, 0);

			// 下拉
			if(_absMoveY <= _this.opts.distance) {
				_this._offsetY = _absMoveY;
				// todo：move时会不断清空、增加dom，有可能影响性能，下同
				_this.$domUp.html(_this.opts.domUp.domRefresh);
				// 指定距离 < 下拉距离 < 指定距离*2
			} else if(_absMoveY > _this.opts.distance && _absMoveY <= _this.opts.distance * 2) {
				_this._offsetY = _this.opts.distance + (_absMoveY - _this.opts.distance) * 0.5;
				_this.$domUp.html(_this.opts.domUp.domUpdate);
				// 下拉距离 > 指定距离*2
			} else {
				_this._offsetY = _this.opts.distance + _this.opts.distance * 0.5 + (_absMoveY - _this.opts.distance * 2) * 0.2;
			}

			_this.$domUp.css({
				'height': _this._offsetY
			});
		}
	}

	// touchend
	fnTouchend() {
		let _this = this;
		let _absMoveY = Math.abs(_this._moveY);
		if(_this.opts.loadUpFn != '' && _this.touchScrollTop <= 0 && _this.direction == 'down' && !_this.isLockUp) {
			_this.fnTransition(_this.$domUp, 300);

			if(_absMoveY > _this.opts.distance) {
				_this.$domUp.css({
					'height': _this.$domUp.children().height()
				});
				_this.$domUp.html(_this.opts.domUp.domLoad);
				_this.loading = true;
				_this.opts.loadUpFn(_this);
			} else {
				_this.$domUp.css({
					'height': '0'
				}).on('webkitTransitionEnd mozTransitionEnd transitionend', function() {
					_this.upInsertDOM = false;
					$(this).remove();
				});
			}
			_this._moveY = 0;
		}
	}

	// 如果文档高度不大于窗口高度，数据较少，自动加载下方数据
	fnAutoLoad(_this) {
		if(_this.opts.loadDownFn != '' && _this.opts.autoLoad) {
			if((_this._scrollContentHeight - _this._threshold) <= _this._scrollWindowHeight) {
				loadDown(_this);
			}
		}
	}

	// 重新获取文档高度
	fnRecoverContentHeight(_this) {
		if(_this.opts.scrollArea == _this.win) {
			_this._scrollContentHeight = $doc.height();
		} else {
			_this._scrollContentHeight = _this.$element[0].scrollHeight;
		}
	}

	// 加载下方
	loadDown(_this) {
		_this.direction = 'up';
		_this.$domDown.html(_this.opts.domDown.domLoad);
		_this.loading = true;
		_this.opts.loadDownFn(_this);
	}

	// 锁定
	lock(direction) {
		let _this = this;
		// 如果不指定方向
		if(direction === undefined) {
			// 如果操作方向向上
			if(_this.direction == 'up') {
				_this.isLockDown = true;
				// 如果操作方向向下
			} else if(_this.direction == 'down') {
				_this.isLockUp = true;
			} else {
				_this.isLockUp = true;
				_this.isLockDown = true;
			}
			// 如果指定锁上方
		} else if(direction == 'up') {
			_this.isLockUp = true;
			// 如果指定锁下方
		} else if(direction == 'down') {
			_this.isLockDown = true;
			// 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
			_this.direction = 'up';
		}
	}

	// 解锁
	unlock() {
		let _this = this;
		// 简单粗暴解锁
		_this.isLockUp = false;
		_this.isLockDown = false;
		// 为了解决DEMO5中tab效果bug，因为滑动到下面，再滑上去点tab，direction=down，所以有bug
		_this.direction = 'up';
	}

	// 无数据
	noData(flag) {
		let _this = this;
		if(flag === undefined || flag == true) {
			_this.isData = false;
		} else if(flag == false) {
			_this.isData = true;
		}
	}

	// 重置
	resetload() {
		let _this = this;
		if(_this.direction == 'down' && _this.upInsertDOM) {
			_this.$domUp.css({
				'height': '0'
			}).on('webkitTransitionEnd mozTransitionEnd transitionend', function() {
				_this.loading = false;
				_this.upInsertDOM = false;
				$(this).remove();
				_this.fnRecoverContentHeight(_this);
			});
		} else if(_this.direction == 'up') {
				_this.loading = false;
				// 如果有数据
				if(_this.isData) {
					// 加载区修改样式
					_this.$domDown.html(_this.opts.domDown.domRefresh);
					_this.fnRecoverContentHeight(_this);
					_this.fnAutoLoad(_this);
				} else {
					// 如果没数据
					_this.$domDown.html(_this.opts.domDown.domNoData);
				}
			
		}
	}

	// css过渡
	fnTransition(dom, num) {
		dom.css({
			'-webkit-transition': 'all ' + num + 'ms',
			'transition': 'all ' + num + 'ms'
		});
	}
}

export default Dropload;