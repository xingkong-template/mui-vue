<template>
	<div class="dropload">
		<div class="outer">
			<div class="inner">
				<ul class="lists">
					<li class="clearfix swipeout" v-on:touchstart="touchstart" v-on:touchmove="touchmove" v-on:touchend="touchend">
						<div class="swipeout-left">
							<div class="item">
								<a>
									<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
									<h3>1文字描述文字描述</h3>
									<span class="date">2014-14-14</span>
								</a>
							</div>
						</div>
						<div class="swipeout-right">
							删除
						</div>	
					</li>
					<li class="clearfix swipeout" v-on:touchstart="touchstart" v-on:touchmove="touchmove" v-on:touchend="touchend">
						<div class="swipeout-left">
							<div class="item">
								<a>
									<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">
									<h3>2文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述</h3>
									<span class="date">2014-14-14</span>
								</a>
							</div>
						</div>
						<div class="swipeout-right">
							删除
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Swipeout from '../../js/lib/swipeout.js';
	export default{
		methods:{
			touchstart:function(e){
				Swipeout.touchstartEvent(e);
			},
			touchmove:function(e){
				Swipeout.touchmoveEvent(e);
			},
			touchend:function(e){
				Swipeout.touchendEvent(e);
			}
		}
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