<template>
	<div class="xheader">
		<div class="xheader-left" v-show="leftOptions.show" @click="onClickBack">

		</div>
		<div class="xheader-title">
			{{title}}
		</div>
		<div class="xheader-right" @click="$emit('on-click-more')"  v-show="rightOptions.showMore" >

		</div>
	</div>
</template>

<script>
	import objectAssign from 'object-assign'
	export default {
		props: {
			leftOptions: Object,
			title: String,
			transition: String,
			rightOptions: {
				type: Object,
				default() {
					return {
						showMore: false
					}
				}
			}
		},
		computed: {
			_leftOptions() {
				return objectAssign({
					showBack: true,
					preventGoBack: false
				}, this.leftOptions || {})
			}
		},
		methods: {
			onClickBack() {
				if(this._leftOptions.preventGoBack) {
					this.$emit('on-click-back')
				} else {
					this.$router ? this.$router.back() : window.history.back()
				}
			}
		}
	}
</script>

<style>

</style>