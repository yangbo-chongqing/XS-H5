<template>
  <div class="subscriptionProducts">
    <van-list v-model="loading" :finished="finished" :immediate-check="false" loading-text="加载中..." finished-text="没有更多了" @load="onLoad">
      <ul class="subscriptionProducts-list">
        <li v-for="(item, index) in commentList" :data-id="item.id" :key="index" @click="jumpRoute('/product',{product_id:item.id,muse_id:item.muse_id})">
          <div class="list-img">
            <img :src="item.image" alt="">
          </div>
          <div class="list-title">
            <h6>{{ item.name }}</h6>
            <p>{{ item.create_time }}</p>
          </div>
        </li>
      </ul>
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