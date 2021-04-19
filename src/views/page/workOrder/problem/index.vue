<template>
  <div class="workOrderProblem">
    <!--    <div class="problem-header">我的问题</div>-->
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      loading-text="加载中..."
      finished-text="没有更多了"
      @load="getProblemData"
    >
      <ul class="problem-list">
        <li
          v-for="(item, index) in problemData"
          :data="item.id"
          @click="jumpRoute('/questionDetails', { workorder_id: item.id })"
          :key="index"
        >
          <div class="problem-list-left">{{ item.title }}</div>
          <van-steps
            :active="item.state"
            active-color="#38f"
            style="margin-top: 20px; padding-left: 0; padding-right: 0"
          >
            <van-step>已提交</van-step>
            <van-step>已受理分析中</van-step>
            <van-step>已确认处理中</van-step>
            <van-step>已结束</van-step>
          </van-steps>
          <!--        <div class="problem-problem"><span>{{ item.problem_type }}</span></div>-->
          <div class="problem-list-right">
            <p>{{ item.create_time }}</p>
            <p>
              <span>进度:</span>
              <span v-if="item.state === 0">已提交</span>
              <span v-if="item.state === 1">已受理分析中</span>
              <span v-if="item.state === 2">已确认处理中</span>
              <span v-if="item.state === 3">已结束</span>
            </p>
          </div>
        </li>
      </ul>
    </van-list>
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