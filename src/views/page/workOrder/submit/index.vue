<template>
  <div class="workOrderSubmit">
    <div class="submit-information">
      <div class="submit-information-img">
        <img :src="submitData.imgs" alt="">
      </div>
      <div class="submit-information-content">
        <h2 class="submit-information-name">{{submitData.name}}</h2>
        <p class="submit-information-frame">
          <span>车架号:</span>
          <span>{{submitData.frame}}</span>
        </p>
        <p class="submit-information-qualified">
          <span>合格证:</span>
          <span>{{submitData.qualified}}</span>
        </p>
        <p class="submit-information-productID">
          <span>产品ID:</span>
          <span>{{submitData.productID}}</span>
        </p>
      </div>
    </div>
    <van-form style="margin-top: 6px;">
      <h4> <span>标题 <img src="@/assets/images/five-pointedstar.png" alt=""></span></h4>
      <van-field v-model="submitData.title"  rows="1"  autosize  type="textarea" placeholder="请输入" />
    </van-form>
    <van-form style="margin-top: 6px;">
      <h4>问题大类</h4>
      <van-field readonly clickable name="picker" :value="submitData.problem_categories" is-link placeholder="点击选择" @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns_categories" @confirm="onConfirm"  @cancel="showPicker = false" />
      </van-popup>
    </van-form>
    <van-form style="margin-top: 6px;">
      <h4>问题类型</h4>
      <van-field readonly clickable name="picker" :value="submitData.questionType" is-link placeholder="点击选择" @click="showPickers = true" />
      <van-popup v-model="showPickers" position="bottom">
        <van-picker show-toolbar :columns="columns_type" @confirm="onConfirm2"  @cancel="showPicker = false" />
      </van-popup>
    </van-form>

    <van-form style="margin-top: 6px;">
      <h4><span>问题描述 <img src="@/assets/images/five-pointedstar.png" alt=""></span></h4>
      <van-field v-model="submitData.problemDescription"  rows="7"  autosize type="textarea" placeholder="请输入" />
    </van-form>

    <van-form style="margin-top: 6px;">
      <h4>图片上传</h4>
      <van-field name="uploader" label="">
        <template #input>
          <van-uploader :after-read="afterRead" v-model="fileList"  accept="image/*"/>
        </template>
      </van-field>
    </van-form>
    <van-form style="margin-top: 6px;">
      <h4>联系手机</h4>
<!--      <van-field v-model="submitData.name" label="产品名称"  placeholder="请输入当前产品"/>-->
<!--      <van-field v-model="submitData.frame" label="车架号"  placeholder="请输入车架号"/>-->
<!--      <van-field v-model="submitData.productID" label="产品号"  placeholder="请输入产品号"/>-->
      <van-field v-model="submitData.phone"  label="" placeholder="请填写您的联系电话" :rules="[{ pattern:/^1[3456789]\d{9}$/, message: '手机号格式错误' }]"/>
    </van-form>
    <van-form style="margin-top: 6px;">
      <h4>姓名</h4>
      <van-field v-model="submitData.username"  label="" placeholder="请填写您的姓名"/>
    </van-form>
    <div style="margin: 16px 0;">
      <van-button round block type="info" native-type="submit" @click="onSubmit">提交</van-button>
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