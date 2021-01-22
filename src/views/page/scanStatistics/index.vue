<template>
  <div class="h-container">
    <div class="scanStatistics">
      <div class="scanStatistics-hender">
        <div class="scanStatistics-hender-list">
          <div class="list">
            <h6>昨天</h6>
            <p>{{ statistics.yesterday }}</p>
          </div>
          <div class="list">
            <h6>今天</h6>
            <p>{{ statistics.nowadays }}</p>
          </div>
          <div class="list">
            <h6>近7日</h6>
            <p>{{ statistics.seven_count }}</p>
          </div>
          <div class="list">
            <h6>近30日</h6>
            <p>{{ statistics.monthly_count }}</p>
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
              <van-cell title="自定义日期区间" :value="time_data" @click="show = true" />
<!--              <van-calendar v-model="show" />-->
              <van-calendar v-model="show" color="#1989fa"  type="range" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm"  />
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
          <div v-if="relics_list.length>0">
            <div v-for="(ietm,index) in relics_list">
              <div class="scanStatistics-foot-list" :key="index">
                <p>{{ ietm.name }}</p>
                <p><span>{{ ietm.frequency }}</span>次</p>
              </div>
            </div>
          </div>
          <div v-if="relics_list.length<=0" class="scanStatistics-foot-nothing">
            <p>暂无记录</p>
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