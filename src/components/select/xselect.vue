<template>
	<div class="actionsheet">
		<ul class="mui-cells">
			<li class="mui-cell">
				<div class="mui-cell__bd">
					<label>一级选择</label>
				</div>
				<div class="mui-cell__ft">
					<input type="checkbox" class="mui-switch" @click="showselect1">
				</div>
			</li>
			<li class="mui-cell">
				<div class="mui-cell__bd">
					<label>二级选择</label>
				</div>
				<div class="mui-cell__ft">
					<input type="checkbox" class="mui-switch" @click="showselect2">
				</div>
			</li>
			<li class="mui-cell">
				<div class="mui-cell__bd">
					<label>三级选择</label>
				</div>
				<div class="mui-cell__ft">
					<input type="checkbox" class="mui-switch" @click="showselect3">
				</div>
			</li>
			<li class="mui-cell">
				<div class="mui-cell__bd">
					<label>三级选择异步加载</label>
				</div>
				<div class="mui-cell__ft">
					<input type="checkbox" class="mui-switch" @click="showselect4">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import Xselect from '../../js/lib/select.js';
	import Area from '../../json/area.json';
	export default{
		methods:{
			showselect1:function(e){
				new Xselect({
					el:e.target,
					data:Area,
					type:0
				});
			},
			showselect2:function(e){
				new Xselect({
					el:e.target,
					data:Area,
					type:1
				});
			},
			showselect3:function(e){
				new Xselect({
					el:e.target,
					data:Area,
					type:2
				});
			},
			showselect4:function(e){
				let _this = this;
				
				if(!_this.sdata){
					_this.sdata = [
						{
							"id": 64,
							"text": "北京市"
						}
					];
				}
				
				if(!_this.tdata){
					_this.tdata = [
						{
							"id": 64,
							"text": "北京市1"
						},
						{
							"id": 64,
							"text": "北京市2"
						},
						{
							"id": 64,
							"text": "北京市3"
						},
						{
							"id": 64,
							"text": "北京市4"
						},
						{
							"id": 64,
							"text": "北京市5"
						},
						{
							"id": 64,
							"text": "北京市6"
						},
						{
							"id": 64,
							"text": "北京市7"
						}
					];
				}
				let Xselect4 = new Xselect({
					el:e.target,
					data:[{
							"id": 1,
							"text": "北京市"
						},
						{
							"id": 2,
							"text": "天津市"
						},
						{
							"id": 3,
							"text": "河北省"
						},
						{
							"id": 3,
							"text": "山西省"
						},
						{
							"id": 3,
							"text": "内蒙古"
						},
						{
							"id": 3,
							"text": "辽宁省"
						}],
					sdata:_this.sdata,
					tdata:_this.tdata,
					type:2,
					moveCallbackF:function(data){
						popup.alert(JSON.stringify(data));
						_this.sdata = [
							{
								"id": 65,
								"text": "石家庄市"
							}, {
								"id": 66,
								"text": "唐山市"
							}, {
								"id": 67,
								"text": "秦皇岛市"
							}, {
								"id": 68,
								"text": "邯郸市"
							}, {
								"id": 69,
								"text": "邢台市"
							}, {
								"id": 70,
								"text": "保定市"
							}, {
								"id": 71,
								"text": "张家口市"
							}, {
								"id": 72,
								"text": "承德市"
							}, {
								"id": 73,
								"text": "沧州市"
							}, {
								"id": 74,
								"text": "廊坊市"
							}, {
								"id": 75,
								"text": "衡水市"
							}
						];
						_this.tdata = [
							{
								"id": 65,
								"text": "石家庄市"
							}, {
								"id": 66,
								"text": "唐山市"
							}, {
								"id": 67,
								"text": "秦皇岛市"
							}, {
								"id": 68,
								"text": "邯郸市"
							}, {
								"id": 69,
								"text": "邢台市"
							}, {
								"id": 70,
								"text": "保定市"
							}, {
								"id": 71,
								"text": "张家口市"
							}, {
								"id": 72,
								"text": "承德市"
							}, {
								"id": 73,
								"text": "沧州市"
							}, {
								"id": 74,
								"text": "廊坊市"
							}, {
								"id": 75,
								"text": "衡水市"
							}
						];
						Xselect4.changeSstr(_this.sdata);
						Xselect4.changeTstr(_this.tdata);
					},
					moveCallbackS:function(data){
						popup.alert(JSON.stringify(data));
						_this.tdata = [
							{
								"id": 65,
								"text": "石家庄市"
							}, {
								"id": 66,
								"text": "唐山市"
							}, {
								"id": 67,
								"text": "秦皇岛市"
							}, {
								"id": 68,
								"text": "邯郸市"
							}, {
								"id": 69,
								"text": "邢台市"
							}, {
								"id": 70,
								"text": "保定市"
							}, {
								"id": 71,
								"text": "张家口市"
							}, {
								"id": 72,
								"text": "承德市"
							}, {
								"id": 73,
								"text": "沧州市"
							}, {
								"id": 74,
								"text": "廊坊市"
							}, {
								"id": 75,
								"text": "衡水市"
							}
						];
						Xselect4.changeTstr(_this.tdata);
					}
				});
			}
		}
	}
</script>

<style>
</style>