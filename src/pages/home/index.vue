<template>
	<div>
		<indexHeader />
		<indexSwipe />
		<findDaily class="findDaily" />
	</div>
</template>

<script>
	import indexHeader from './components/indexHeader.vue'
	import indexSwipe from './components/indexSwipe.vue'
	import findDaily from './components/findDaily.vue'

	export default {
		components: {
			indexHeader,
			indexSwipe,
			findDaily
		}
	}
</script>

<style>
	.findDaily {
		margin-top: 10px;
	}
</style>
