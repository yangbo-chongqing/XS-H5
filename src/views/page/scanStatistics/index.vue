<template>
  <div class="h-container">
    <div class="scanStatistics">
      <div class="scanStatistics-hender">
        <div class="scanStatistics-hender-list">
          <div class="list">
            <h6>昨天</h6>
            <p>0</p>
          </div>
          <div class="list">
            <h6>今天</h6>
            <p>0</p>
          </div>
          <div class="list">
            <h6>近7日</h6>
            <p>0</p>
          </div>
          <div class="list">
            <h6>近30日</h6>
            <p>0</p>
          </div>
        </div>
        <div class="scanStatistics-hender-date">
          <div class="hender-date">日期范围</div>
          <div class="hender-dateRange">
            <div class="hender-date-list">
              <p :class="dateTabIndex == 1 ? 'active' : ''"
                 @click="toggleDate(1)">昨天</p>
              <p :class="dateTabIndex == 2 ? 'active' : ''"
                 @click="toggleDate(2)">今天</p>
              <p :class="dateTabIndex == 3 ? 'active' : ''"
                 @click="toggleDate(3)">近7日</p>
              <p :class="dateTabIndex == 4 ? 'active' : ''"
                 @click="toggleDate(4)">近30日</p>
            </div>
            <div class="date">
              <el-date-picker v-model="start_time" type="date" @focus="changes" placeholder="选择日期"></el-date-picker>
              <p>到</p>
              <el-date-picker v-model="end_time" type="date" @focus="changes"   placeholder="选择日期"></el-date-picker>
            </div>
          </div>
        </div>

      </div>

      <div class="scanStatistics-content">
        <div class="content">
          <line-chart :chart-data="chartData" />
        </div>
      </div>

      <div class="scanStatistics-foot">
        <div class="content">
          <h4>扫描量排行</h4>
          <div class="scanStatistics-foot-title">
            <p>二维码名称</p>
            <p>近30日扫描量</p>
          </div>
          <div class="scanStatistics-foot-list">
            <p>测试</p>
            <p>2次</p>
          </div>
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