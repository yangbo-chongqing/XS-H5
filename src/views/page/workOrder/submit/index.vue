<template>
  <div class="workOrderSubmit">
    <van-form>
      <van-field v-model="submitData.name" label="产品名称"  placeholder="请输入当前产品"/>
      <van-field v-model="submitData.frame" label="车架号"  placeholder="请输入车架号"/>
      <van-field v-model="submitData.productID" label="产品号"  placeholder="请输入产品号"/>
      <van-field readonly clickable name="picker" :value="submitData.questionType"  label="问题类型" placeholder="点击选择" @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm"  @cancel="showPicker = false" />
      </van-popup>
      <van-field v-model="submitData.problemDescription"  rows="1"  autosize label="问题描述" type="textarea" placeholder="请输入" />
      <van-field name="uploader" label="图片上传">
        <template #input>
          <van-uploader :after-read="afterRead" v-model="fileList"  accept="image/*"/>
        </template>
      </van-field>
      <van-field v-model="submitData.phone"  label="手机号" placeholder="请输入手机号" :rules="[{ pattern:/^1[3456789]\d{9}$/, message: '手机号格式错误' }]"/>
      <div style="margin: 16px 0;">
        <van-button round block type="info" native-type="submit" @click="onSubmit">提交</van-button>
      </div>
    </van-form>
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