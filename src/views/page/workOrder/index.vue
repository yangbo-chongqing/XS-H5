<template>
  <div class="workOrder">
    <ul class="workOrder_list">
      <li @click="jumpRoute('/workOrderProblem')">工单系统</li>
      <li @click="jumpRoute('/workOrderSubmit')">提交工单</li>
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