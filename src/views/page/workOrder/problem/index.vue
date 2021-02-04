<template>
  <div class="workOrderProblem">
    <div class="problem-header">我的问题</div>
    <ul class="problem-list">
      <li @click="jumpRoute('/questionDetails')">
        <div class="problem-list-left">
          问题描述
        </div>
        <div class="problem-list-right">
          <p>处理状态</p>
          <p>时间</p>
        </div>
      </li>
    </ul>
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