<template>
	<div class="find-page-title">
		<div class="find-page-title-text">
			{{titleObj.title}}
		</div>
		<div class="find-page-title-type" v-if="titleObj.type=='hyh'" @click="clickhyh">
			<img class="find-page-title-sel-img" src="/images/icons/qiehuan-icon.png">
			换一换
		</div>
		<div class="find-page-title-more" v-if="titleObj.type=='more'" @click="openJump">
			<div>更多</div>
			<van-icon name="arrow" />
		</div>
	</div>
</template>

<script>
	export default {
		name: "title",
		props: {
			titleObj: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			openJump() {
				// this.$router.push({
				// 	path: '/pages/dataList',
				// 	query: {
				// 		type_id: this.titleObj.id
				// 	}
				// })
			},
			clickhyh() {
				// this.triggerEvent('eventclick')
			}
		}
	}
</script>

<style scoped="scoped">
	.find-page-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40px;
	}

	.find-page-title-text {
		font-size: 35px;
		font-weight: bold;
		box-sizing: border-box;
	}

	.find-page-title-sel {
		display: flex;
		font-size: 32px;
		align-items: center;
	}

	.find-page-title-type {
		display: flex;
		color: #ea7152;
		align-items: center;
	}

	.find-page-title-more {
		display: flex;
		color: #999999;
		padding: 5px 0;
	}

	.find-page-title-sel-img {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}
</style>
