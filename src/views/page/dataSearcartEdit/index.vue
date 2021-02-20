<template>
  <div class="h-container" >
    <div v-if="jurisdiction.show">

      <div class="head">
        <van-search v-model="keyword" shape="round" background="#ffffff" placeholder="输入搜索词条"
                    :change="onChange($emit)" @search="onSearch">
        </van-search>
        <div class="add-entry" bindtap="openEditUrl" data-id="" @click="jumpRoute('/editor')"><van-icon color="#5387fd" name="plus" />词条</div>
      </div>
      <div class="content">
        <van-list v-model="loading" :finished="finished" :immediate-check="false" loading-text="加载中..." finished-text="没有更多了" @load="onLoad">
          <ul class="content-list" v-if="commentList.length>0">
            <li class="list" v-for="(item, index) in commentList">
              <h5 class="home-you-name">{{ item.name }}</h5>
              <div class="home-you-body">
                <div class="home-you-title" :data-id="item.id" @click="jumpRoute('/editcode',{id:item.id,muse_id:item.muse_id})">
                  <img src="@/assets/images/cartcode.png" alt="">
                </div>
                <div class="home-you-text" :data-id="item.id" @click="jumpRoute('/editor',{id:item.id,muse_id:item.muse_id})">编辑</div>
              </div>
            </li>
          </ul>
        </van-list>
      </div>
    </div>
    <div v-if="!jurisdiction.show" style="text-align: center;font-size: 16px;color: #cccccc;line-height: 20rem">
      {{jurisdiction.title}}
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