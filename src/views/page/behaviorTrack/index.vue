<template>
  <div class="h-container">
    <div class="bt-header">
      <div class="content">
        <div class="portrait">
<!--          <img src="" alt="">-->
        </div>
        <div class="content-information">
          <div class="name">苗小康</div>
          <div class="account-number">
            <p>12332123131</p>
            <p><span>ID:</span>12332123131</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bt-content">
      <div class="bt-navigation">
        <p >时间轴</p>
        <p >最近访问词条</p>
      </div>
      <div class="bt-time-axis" style="display: none">
        <div>
          <h5>05/04</h5>
          <div class="bt-time-axis-list">
            <div class="bt-time">18:00</div>
            <div class="bt-word">的萨达萨达 <span class="bt-circular"></span> <span>13131321</span></div>
          </div>
          <div class="bt-time-axis-list">
            <div class="bt-time">18:00</div>
            <div class="bt-word">的萨达萨达 <span class="bt-circular"></span> <span>13131321</span></div>
          </div>
          <div class="bt-time-axis-list">
            <div class="bt-time">18:00</div>
            <div class="bt-word">的萨达萨达 <span class="bt-circular"></span> <span>13131321</span></div>
          </div>

        </div>
        <div>
          <h5>05/04</h5>
          <div class="bt-time-axis-list">
            <div class="bt-time">18:00</div>
            <div class="bt-word">的萨达萨达 <span class="bt-circular"></span> <span>13131321</span></div>
          </div>
          <div class="bt-time-axis-list">
            <div class="bt-time">18:00</div>
            <div class="bt-word">的萨达萨达 <span class="bt-circular"></span> <span>13131321</span></div>
          </div>
          <div class="bt-time-axis-list">
            <div class="bt-time">18:00</div>
            <div class="bt-word">的萨达萨达 <span class="bt-circular"></span> <span>13131321</span></div>
          </div>

        </div>
        <div class="bt-timeline"> </div>
      </div>
      <ul class="bt-recent-visit">
        <li>
          <p>词条</p>
          <p>最近访问次数</p>
          <p>时间</p>
        </li>
      </ul>
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