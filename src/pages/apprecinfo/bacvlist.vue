<template>
	<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		<!-- <van-cell v-for="item in list" :key="item" :title="item" style="height: 50px;" /> -->
		<div v-for="item in list" :key="index" style="height: 100px;" >sss</div>
	</van-list>
</template>

<script>
	export default {
		data() {
			return {
				list: [1,2,4,5,6,7,8,43,345,4564,435,43534,543,5,45,345,34],
				loading: false,
				finished: false,
			};
		},
		methods: {
			onLoad() {
				// 异步更新数据
				// setTimeout 仅做示例，真实场景中一般为 ajax 请求
				setTimeout(() => {
					for (let i = 0; i < 10; i++) {
						this.list.push(this.list.length + 1);
					}

					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.list.length >= 100) {
						this.finished = true;
					}
				}, 1000);
			},
		},
	};
</script>

<style scoped="">
</style>
