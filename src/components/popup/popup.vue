<template>
	<div class="alert">
		<ul class="mui-cells">
			<li class="mui-cell" v-on:click="alert(1)">
				<div class="mui-cell__bd">
					<label>alert</label>
				</div>
				<div class="mui-cell__ft">
				</div>
			</li>
			<li class="mui-cell" v-on:click="alert(2)">
				<div class="mui-cell__bd">
					<label>confirm</label>
				</div>
				<div class="mui-cell__ft">
				</div>
			</li>
			<li class="mui-cell" v-on:click="alert(3)">
				<div class="mui-cell__bd">
					<label>loading</label>
				</div>
				<div class="mui-cell__ft">
				</div>
			</li>
			<li class="mui-cell" v-on:click="alert(4)">
				<div class="mui-cell__bd">
					<label>toast</label>
				</div>
				<div class="mui-cell__ft">
				</div>
			</li>
			<li class="mui-cell" v-on:click="alert(5)">
				<div class="mui-cell__bd">
					<label>img</label>
				</div>
				<div class="mui-cell__ft">
				</div>
			</li>
			<li class="mui-cell" v-on:click="alert(6)">
				<div class="mui-cell__bd">
					<label>content</label>
				</div>
				<div class="mui-cell__ft">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		methods:{
			alert:function(type){
				if(type==1){
					popup.alert('我的错');
				}else if(type==2){
					popup.confirm({content:'确定吗？',confcallback:function(){
						popup.notimeclose();
						popup.alert('是的');
					}});
				}else if(type==3){
					popup.loading();
					setTimeout(function(){
						popup.close();
					},3000)
				}else if(type==4){
					popup.toast('我的错');
				}else if(type==5){
					popup.showimg('http://pic.jj20.com/up/allimg/911/0P316142450/160P3142450-4.jpg');
				}else{
					popup.show({content:'<div>content</div><div>test</div>',title:{show:false},type:'1',altBtnFlag:false,maskClose:true});
				}
				
			}
		}
	}
</script>

<style>
</style>