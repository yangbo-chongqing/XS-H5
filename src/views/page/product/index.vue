<script src="../../../request/xsdt.js"></script>
<template>
  <div class="h-container" v-if="dataInfo">
     <div class="product-head" v-if="dataInfo.image">
       <img :src="dataInfo.image" alt="">
     </div>
     <div class="product-info">
       <div class="product-name" v-if="dataInfo.name">{{dataInfo.name}}</div>
       <div class="product-tip" v-if="dataInfo.unique"><label>产品编号：</label><span>{{dataInfo.unique}}</span></div>
<!--       <div class="product-tip" v-if="dataInfo.listed"><label>上市时间：</label><span>{{dataInfo.listed}}</span></div>-->
       <div class="product-tip" v-if="dataInfo.factory"><label>生产厂家：</label><span>{{dataInfo.factory}}</span></div>
     </div>
     <div class="product-in-list">
       <div class="product-in-item" v-if="expand_manual>7"  @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:1})">
         <span><van-icon name="orders-o" color="#739efe" /></span>
         <p>原厂说明书</p>
         <span class="right"><van-icon name="arrow" /></span>
       </div>
       <div class="product-in-item" v-if="expand_details>7" @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:2})">
         <span><van-icon name="records" color="#739efe" /></span>
         <p>产品详情</p>
         <span class="right"><van-icon name="arrow" /></span>
       </div>
<!--       <div class="product-in-item" @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:3})">-->
<!--         <span><van-icon name="todo-list-o" color="#739efe" /></span>-->
<!--         <p>预约服务</p>-->
<!--         <span class="right"><van-icon name="arrow" /></span>-->
<!--       </div>-->
       <div v-if="dataInfo.video.length>0" class="product-in-item" @click="jumpRoute('/video',{muse_id:muse_id,pkid:pkid})">
         <span><van-icon name="video-o" color="#739efe" /></span>
         <p>相关视频</p>
         <span class="right"><van-icon name="arrow" /></span>
       </div>
     </div>
    <div class="product-attention" v-if="attention">
      <div><img :src="attention" alt=""></div>
      <p>公众服务号</p>
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