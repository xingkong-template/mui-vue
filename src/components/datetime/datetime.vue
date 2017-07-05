<template>
	<div class="datedemo">
		<ul class="mui-cells">
			<li class="mui-cell">
				<label>datetime</label>
				<input type="text" value="" readonly="readonly" placeholder="必选" v-on:click="dateshow"/>
			</li>
		</ul>
	</div>
</template>

<script>
	import Datetime from '../../js/lib/datetime.js';
	 export default {
	 	methods:{
	 		dateshow:function(e){
	 			new Datetime({
	 				el:e.target,
	 				type:2
	 			});
	 		}
	 	}
	 }
</script>

<style>
</style>