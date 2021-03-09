<template>
  <div class="scanRecord">

      <ul class="scanRecord-content">
        <draggable v-model="rows" class="row wrap fill-height align-center sortable-list" :disabled= "true">
        <li v-for="(row,rowindex) in rows" :key="rowindex" :data-muse_id="row.muse_id"  class="scanRecord-sortable">
          <div class="scanRecord-title" >
            <div class="scanRecord-title-left" @click="show($event)" >
              <van-icon name="play" style="transform:rotate(0deg)"/>
              <h4>{{ row.tag }}</h4>
              <span>( {{ row.list.length }} )</span>
            </div>
            <div class="scanRecord-title-right" @click="gotouchstart(row.tag,rowindex)" @touchend="gtouchend">
              <van-icon name="edit" />
            </div>
          </div>
          <ul class="scanRecord-list" style="display: none;min-height: 50px">
            <draggable :list="row.list"  :group="{ name: 'row' }" @start="start2"  @add="add1" :options="options"  chosenClass="chosen" class="row wrap justify-space-around" >
<!--              <transition-group>-->
                <li  v-for="(item,index) in row.list" :key="index" :data-id="item.id" class="row-v" >
                  <div class="scanRecord-list-left">
                    <h6>{{ item.name }}</h6>
                    <p>{{ item.create_time }}</p>
                  </div>
                  <div class="scanRecord-list-right" @click="delEdit(0,item.id,rowindex,index)">
                    <img src="@/assets/images/delete.png" alt="">
                  </div>
                </li>
<!--              </transition-group>-->
            </draggable>
          </ul>
        </li>
        </draggable>
      </ul>
    <div class="scanRecord_newCategory" @click="popupShow=true">
      <van-icon name="plus" /><span>添加新分类</span>

    </div>
    <van-popup v-model="popupShow" closeable position="bottom" :style="{ height: popupHeight }">
      <van-field v-model="create" label="分类名字:" placeholder="请输入分类名字" />
      <p class="scanRecord-complete" @click="scanRecord_complete">完成</p>
    </van-popup>
    <van-popup v-model="start.delShow" closeable position="bottom" :style="{ height: popupHeight }">
      <van-field v-model="start.modifyname" label="分类名字:" placeholder="请输入分类名字" />
      <p class="scanRecord-modify" @click="modifyTrack(1)" >保存</p>
      <p class="scanRecord-del" @click="delEdit(1)">删除</p>
    </van-popup>
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