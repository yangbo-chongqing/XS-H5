<template>
  <div class="instructions">
    <div class="instructions-title">
      <div class="instructions-title-icon"><img src="@/assets/images/book.png" alt=""></div>
      <h2>【{{data.name}}】使用手册</h2>
    </div>
    <div class="instructions-main">
      <div class="instructions-main-list" v-for="(dataItme,rowindex) in data.type_json" :key="rowindex" :data-muse_id="data.id" >
        <h4>{{ dataItme.label }}</h4>
        <div class="instructions-list" v-for="(item,index) in dataItme.children" :key="index" :data-id="item.id"  @click="jumpRoute('/instructionsDetails',{manual_id:manual_id,id:item.id})">
          <p>{{item.label}}</p>
          <van-icon name="arrow" />
        </div>
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