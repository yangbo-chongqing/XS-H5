<template>
	<div class="find-swiper">
		<swiper class="swiper" :options="swiperOption">
			<swiper-slide v-for="item in swiperObj" :key="item.id">

				<div class="swiper-item" @click="openToggleData(item.id)">
					<div class="images">
						<img class="images-img" :src="item.image" />
					</div>
					<div class="swiper-text">{{item.name}}</div>
				</div>

			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
	import {
		Swiper,
		SwiperSlide
	} from 'vue-awesome-swiper'
	import 'swiper/swiper-bundle.css'

	export default {
		name: 'swiper-example-free-mode',
		title: 'Free mode / No fixed positions',
		components: {
			Swiper,
			SwiperSlide
		},
		props: {
			swiperObj: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				swiperOption: {
					slidesPerView: 3,
					spaceBetween: 30,
					freeMode: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					}
				}
			}
		},
		watch: {
			// eslint-disable-next-line
			$route (to, from) {
				this.$router.go(0)
			}
		},
		methods: {
			openToggleData(e) {
				// this.data.videoContext = wx.createVideoContext('myVideo');
				// this.data.videoContext.pause();
				this.$router.push({
					path: '/apprecinfo',
					query: {
						id: e
					}
				})
			},
		}
	}
</script>

<style scoped="scoped">
	.find-swiper {
		width: 100%;
		height: 250px;
		box-sizing: border-box;
		margin-top: 30px;
		margin-bottom: 30px;
	}

	.find-swiper swiper-item {
		width: 185px !important;
		padding-right: 20px;
		box-sizing: border-box;
	}

	.find-swiper .swiper-item img {
		width: 147px;
		height: 147px;
		margin: auto;
		object-fit: cover;
	}

	.find-swiper .swiper-item .swiper-text {
		font-size: 26rpx;
		margin-top: 20rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.find-swiper .logo {
		width: 167rpx;
		height: 167rpx;
		border-radius: 10px;
		border: 1px solid #ccc;
		overflow: hidden;
		display: flex;
	}

	.find-swiper .images {
		border: none;
	}

	.find-swiper .images image {
		border-radius: 10px;
	}
</style>
