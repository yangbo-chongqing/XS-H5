<template>
  <!-- 过渡动画 -->
  <transition name="fade">
    <div class="img-view" >
      <!-- 遮罩层 -->
      <div class="img">
        <a :href="imgSrc.url">
          <img :src="imgSrc.image">
        </a>
      </div>
      <div class="img-close" @click="bigImg"><van-icon name="cross" color="#ffffff"/></div>
    </div>
  </transition>
</template>
<script>
import { Icon, Col, Row } from 'vant';
export default {
  components: {
    VanIcon: Icon,
    VanCol: Col,
    VanRow:Row,
  },
  props: ['imgSrc'],
  methods: {
    bigImg() {
      // 发送事件
      this.$emit('clickit')
    }
  }
}
</script>
<style scoped>
/*动画*/
.fade-enter-active,
.fade-leave-active {
  transition: all .2s linear;
  transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}


/* bigimg */

.img-view {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
}
.img-close{
  background-color:rgba(0, 0, 0, 0.7);
  margin-top: 20px;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*遮罩层样式*/
/*.img-view .img-layer {*/
/*  position: absolute;*/
/*  z-index: 999;*/
/*  top: 0;*/
/*  left: 0;*/
/*  */
/*  width: 100%;*/
/*  height: 100%;*/
/*  overflow: hidden;*/
/*}*/
.img{
  width: 250px;
  height: 350px;
  background-color: #ffffff;
}
.img-view .img {
  display: inline-block;
  display: flex;
  justify-content: center;
  align-content: center;
}
  /*不限制图片大小，实现居中*/
.img-view .img img {
  max-width: 100%;
  display: block;
  margin: auto;
  z-index: 1000;
  max-height: 100%;
}
</style>