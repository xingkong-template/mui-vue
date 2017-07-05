<template>
	<div class="test" id="test">
		asdasdasdasddddddddddasddddddddd
	</div>
</template>

<script>
	export default {
		mounted() {
			$('#test').on('click', function() {
				console.log($(this).text())
			})
		}
	}
</script>

<style>

</style>