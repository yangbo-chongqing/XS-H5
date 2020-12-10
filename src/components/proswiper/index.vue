<template>
	<div class="find-swiper">
		<swiper v-if="{{type=='s0'}}" display-multiple-items="{{multipleItem}}">
			<block v-for="{{swiperObj}}" :key="item.id">
				<swiper-item>
					<div class="swiper-item" @click="openUrl" data-id="{{item.id}}">
						<div class="logo">
							<img class="images-logo" mode="aspectFill" src="{{item.logo}}"></img>
						</div>
						<div class="swiper-text">{{item.muse_name}}</div>
					</div>
				</swiper-item>
			</block>
		</swiper>
		<swiper v-if="{{type=='s1'}}" display-multiple-items="{{multipleItem}}">
			<block v-for="item in swiperObj" :key="item.id">
				<swiper-item>
					<div class="swiper-item" bindtap="openToggleData" data-id="{{item.id}}">
						<div class="images">
							<image class="images-img" mode="aspectFill" src="{{item.image}}"></image>
						</div>
						<div class="swiper-text">{{item.name}}</div>
					</div>
				</swiper-item>
			</block>
		</swiper>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.find-swiper {
		width: 100%;
		height: 250rpx;
		box-sizing: border-box;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.find-swiper swiper-item {
		width: 185rpx !important;
		padding-right: 20rpx;
		box-sizing: border-box;
	}

	.find-swiper .swiper-item image {
		width: 147rpx;
		height: 147rpx;
		margin: auto;
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
