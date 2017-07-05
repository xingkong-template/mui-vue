<template>
	<div class="mui-swiper">
		<div class="layout">
			<div class="box" >
				<ul>
					<li>
						<a href="#">
							<img src="../../assets/img/banner/timg3.jpg" alt="" />
						</a>
					</li>
					<li>
						<a href="#">
							<img src="../../assets/img/banner/timg1.jpg" alt="" />
						</a>
					</li>
					<li>
						<a href="#">
							<img src="../../assets/img/banner/timg2.jpg" alt="" />
						</a>
					</li>
					<li>
						<a href="#">
							<img src="../../assets/img/banner/timg3.jpg" alt="" />
						</a>
					</li>
					<li>
						<a href="#">
							<img src="../../assets/img/banner/timg1.jpg" alt="" />
						</a>
					</li>
				</ul>
				<ol>
					<li class="active"></li>
					<li></li>
					<li></li>
				</ol>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from '../../js/lib/swiper.js';
	export default {
		mounted () {
			let _this = this;
		    new Swiper({
		    	box:'.mui-swiper .box',
		    	box_ul:'.mui-swiper .box ul',
		    	box_ul_li:'.mui-swiper .box ul li',
		    	box_li:'.mui-swiper .box ol li',
		    	auto:true
		    });
		},
		methods:{
		}
	}
</script>

<style>

</style>