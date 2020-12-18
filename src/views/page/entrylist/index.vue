<template>
  <div class="h-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="scroll-view-item" v-for="(item,index) in list" :key="index" @click="jumpRoute('/entryinfo', { id: item.id })">
				<div class="scroll-view-media">
					<img :src="item.image" />
				</div>
				<div class="find-tj-text">
					<div class="scroll-view-title">{{item.name}}</div>
					<div class="find-tj-midas">{{item.introduction}}</div>
				</div>
			</div>
    </van-list>
  </div>
</template>

<script>
import Logic from "./index";

export default Logic;
</script>
<style lang="scss">
@import "./index-vant.scss";
</style>
<style scoped lang="scss">
@import "./index.scss";
</style>