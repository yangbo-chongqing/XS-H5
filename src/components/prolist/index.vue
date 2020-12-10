<template>
	<div class="find-page-tj">
		<van-row>
			<van-col span="24" v-for="item in listObj" :key="item.id">
				<div class="fint-tj-list" @click="openUrl(item)">
					<div class="find-tj-img">
						<img class="find-tj-imgs" :src="item.image">
					</div>
					<div class="find-tj-text">
						<div class="find-tj-title">{{item.show_name}}</div>
						<div class="find-tj-midas">{{item.introduction}}</div>
					</div>
				</div>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	export default {
		props: {
			listObj: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			openUrl(e) {
				let id = e.id;
				this.$router.push({
					path: '/apprecinfo',
					query: {
						id: id
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.find-page-tj {
		width: 100%;
		padding: 0 40px;
		box-sizing: border-box;
		margin-top: 30px;
	}

	.fint-tj-list {
		width: 100%;
		display: flex;
		margin-bottom: 20px;
	}

	.find-tj-imgs {
		width: 190px;
		height: 190px;
		border-radius: 10px;
		object-fit: cover;
	}

	.find-tj-text {
		width: 500px;
		margin-left: 20px;
	}

	.find-tj-title {
		font-size: 30px;
		font-weight: bold;
		margin: 20px 0;
	}

	.find-tj-midas {
		font-size: 28px;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
