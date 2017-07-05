<template>
	<div class="dropload">
		<div class="outer">
			<div class="inner">
				<ul class="lists">
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>1文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>2文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>3文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>4文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>5文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>6文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a class="item" href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>7文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>8文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>9文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>10文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>11文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
					<li class="item">
						<a href="#">
							<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
							<h3>12文字描述文字描述文字描述文字描述文字描述</h3>
							<span class="date">2014-14-14</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Dropload from '../../js//lib/dropload.js';
	export default {
		mounted() {
			let _this = this;
			_this.num = 1;
			let dropload = new Dropload({
				el: '.inner',
				domUp: {
					domClass: 'dropload-up',
					domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
					domUpdate: '<div class="dropload-update">↑释放更新</div>',
					domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
				},
				domDown: {
					domClass: 'dropload-down',
					domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
					domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
					domNoData: '<div class="dropload-noData">暂无数据</div>'
				},
				loadUpFn: function(me) {
					me.isData=true;
					setTimeout(function() {
						$('.lists').html('<li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>6文字描述文字描述</h3><span class="date">2014-14-14</span></a></li>');
						// 每次数据加载完，必须重置
						dropload.resetload();
					}, 1000);
				},
				loadDownFn: function(me) {
					_this.num++;
					if(_this.num==3){
						me.isData=false;
						_this.num=1;
					}
					setTimeout(function() {
						if(me.isData){
							$('.lists').append('<li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>10文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>11文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>12文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>13文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/_this.num==3_this.num5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>14文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>15文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>16文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>17文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>1文字描述文字描述</h3><span class="date">2014-14-14</span></a></li><li class="item"><a href="#"><img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt=""><h3>6文字描述文字描述</h3><span class="date">2014-14-14</span></a></li>');
						}
						// 每次数据加载完，必须重置
						dropload.resetload();
					}, 1000);
				}
			})
		},
		methods: {}
	}
</script>

<style>
	.inner {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		background-color: #fff;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	
	.inner .item a {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		width: 100%;
	}
	
	.inner .item img {
		display: block;
		width: 40px;
		height: 40px;
		border: 1px solid #ddd;
	}
	
	.inner .item h3 {
		display: block;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		width: 100%;
		max-height: 40px;
		overflow: hidden;
		line-height: 20px;
		margin: 0 10px;
		font-size: 16px;
	}
	
	.inner .item .date {
		display: block;
		height: 20px;
		line-height: 20px;
		color: #999;
	}
	
	.opacity {
		-webkit-animation: opacity 0.3s linear;
		animation: opacity 0.3s linear;
	}
	
	@-webkit-keyframes opacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	
	@keyframes opacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>