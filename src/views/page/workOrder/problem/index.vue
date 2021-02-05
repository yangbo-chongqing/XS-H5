<template>
  <div class="workOrderProblem">
    <div class="problem-header">我的问题</div>
    <ul class="problem-list">
      <li  v-for="(item,index) in problemData" :data="item.id" @click="jumpRoute('/questionDetails',{workorder_id:item.id})">
        <div class="problem-list-left">
          {{ item.problem_content }}
        </div>
        <div class="problem-list-right">
          <p>{{ item.state===0?'待回复':'已回复' }}</p>
          <p>{{ item.create_time }}</p>
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