<template>
  <div class="h-container" v-if="dataInfo">
     <div class="product-head">
       <img :src="dataInfo.image" alt="">
     </div>
     <div class="product-info">
       <div class="product-name">{{dataInfo.name}}</div>
       <div class="product-tip"><label>唯一码：</label><span>{{dataInfo.unique}}</span></div>
       <div class="product-tip"><label>上市时间：</label><span>{{dataInfo.listed}}</span></div>
       <div class="product-tip"><label>生产厂家：</label><span>{{dataInfo.factory}}</span></div>
     </div>
     <div class="product-in-list">
       <div class="product-in-item" v-if="pdfUrl" @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:1})">
         <span><van-icon name="orders-o" color="#739efe" /></span>
         <p>原厂说明书</p>
         <span class="right"><van-icon name="arrow" /></span>
       </div>
       <div class="product-in-item" @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:2})">
         <span><van-icon name="records" color="#739efe" /></span>
         <p>质量检测报告</p>
         <span class="right"><van-icon name="arrow" /></span>
       </div>
       <div class="product-in-item" @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:3})">
         <span><van-icon name="todo-list-o" color="#739efe" /></span>
         <p>预约服务</p>
         <span class="right"><van-icon name="arrow" /></span>
       </div>
       <div class="product-in-item" @click="jumpRoute('/video',{muse_id:muse_id,pkid:pkid})">
         <span><van-icon name="video-o" color="#739efe" /></span>
         <p>相关视频</p>
         <span class="right"><van-icon name="arrow" /></span>
       </div>

     </div>
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