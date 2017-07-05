<template>
	<div class="actionsheet">
		<ul class="mui-cells">
			<li class="mui-cell" v-on:click="actionsheet(0)">
				<div class="mui-cell__bd">
					<label>一般使用</label>
				</div>
				<div class="mui-cell__ft mui-cell__ft_r">
				</div>
			</li>
			<li class="mui-cell" v-on:click="actionsheet(1)">
				<div class="mui-cell__bd">
					<label>取消</label>
				</div>
				<div class="mui-cell__ft mui-cell__ft_r">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		methods:{
			actionsheet:function(type){
				if(!type){
					actionsheet.show({data:[{text:'分享到朋友圈',id:'0'},{text:'分享到朋友',id:'1'}],
					callback:function(datas){
						popup.alert(JSON.stringify(datas));
						actionsheet.close();
					}});
				}else{
					actionsheet.show({data:[{text:'分享到朋友圈',id:'0'},{text:'分享到朋友',id:'1'}],
					callback:function(datas){
						popup.alert(JSON.stringify(datas));
						actionsheet.close();
					},
					closeBtn:true});
				}
				
			}
		}
	}
</script>

<style>

</style>