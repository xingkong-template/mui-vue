<template>
	<div id="app">
		<xheader :title="title" :leftOptions="{show:backBtn}" @on-click-more="rightMore" :rightOptions="{showMore:moreBtn}"></xheader>
		<!--<img src="./assets/logo.png" />-->
		<transition :name="'muivue-page-' + (direction === 'forward' ? 'in' : 'out')">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import xheader from './components/header/xheader.vue';
	export default {
		name: 'app',
		components: {
			xheader
		},
		updated(){
			console.log(this.direction)
		},
	  	computed: {
	  		  ...mapState({
			      route: state => state.route,
			      path: state => state.route.path,
			      deviceready: state => state.app.deviceready,
			      demoTop: state => state.muivue.demoScrollTop,
			      isLoading: state => state.muivue.isLoading,
			      direction: state => state.muivue.direction,
			      title:state => state.muivue.title,
			      moreBtn:state => state.muivue.moreBtn,
			      backBtn:state => state.muivue.backBtn
		    })
	  	},
	  	methods:{
	  		rightMore:function(){
	  			popup.alert('rightMore');
	  		}
	  	}
	}
</script>

<style lang="less">
	@import './less/app.less';
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>