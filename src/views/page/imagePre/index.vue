<template>
  <div class="entry-query" v-if="map_img">
     <img class="image-body-pic" src="@/assets/imggg.png" alt="" />
     <div class="mapptip" v-for="(item,index) in map_coordinate" :key="index"  :style="{top:item.y+'px',left:item.x+'px'}"><span></span><a :href="item.href" target="_blank" >{{item.title}}</a></div> 
    <!-- <div class="image-body">
      <div
       class="image-cont"
        v-finger:pinch="pinchHandler"
        v-finger:press-move="pressMoveHandler"
        v-finger:multipoint-start="multipointStartHandler"
        v-finger:rotate="rotateHandler"
        v-finger:tap="tapHandler"
        v-finger:multipoint-end="multipointEndHandler"
        v-finger:double-tap="doubleTapHandler"
        v-finger:long-tap="longTapHandler"
        v-finger:swipe="swipeHandler"
        v-finger:single-tap="singleTapHandler"
      >
        <div  class="image-cont" ref="image">
          <img class="image-body-pic" src="@/assets/imggg.png" alt="" />
          <div class="image-body-tap"></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// const Transform = require("css3transform");
import api from '@/request/mapping';
import { Icon, Popup } from "vant";
export default {
  name: "imagePre",
  components: {
    VanIcon: Icon,
    VanPopup: Popup,
  },
  data() {
    return {
      muse_id:this.$route.query.muse_id,
      imgPreshow: false,
      target: "",
      map_coordinate:[],
      map_img:''
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      // this.target = this.$refs.image;
      // Transform(this.target);
      this.getMapDetails();
    });
  },
  methods: {
    //请求接口得到数据
    getMapDetails(){
      let params = {
        muse_id:this.muse_id
      }
      api.postMapDetails(this.qs.stringify(params)).then((res)=>{
        this.map_img = res.data.info.map_img;
        this.map_coordinate = res.data.info.map_coordinate;
      })
    },
    // pointStartHandler() {
    //   //手指触摸屏幕触发
    // },
    // multipointStartHandler() {
    //   //一个手指以上触摸屏幕触发
    // },
    // rotateHandler(evt) {
    //   //evt.angle代表两个手指旋转的角度
    //   // this.target.rotateZ += evt.angle;
    // },
    // pinchHandler(evt) {
    //   //evt.scale代表两个手指缩放的比例
    //   if(this.target.scaleX<0.5){
    //     this.target.scaleX = 0.5;
    //     this.target.scaleY = 0.5;
    //   }else{
    //     if(evt.zoom>1){
    //       this.target.scaleX += 0.02;
    //       this.target.scaleY += 0.02;
    //     }else{
    //       this.target.scaleX -= 0.02;
    //       this.target.scaleY -= 0.02;
    //     }
    //   }
    //   evt.preventDefault();
    // },
    // multipointEndHandler() {
    //   //当手指离开，屏幕只剩一个手指或零个手指触发
    // },
    // pressMoveHandler(evt) {
    //   //evt.deltaX和evtdeltaY代表在屏幕上移动的距离
    //   // console.log(evt.deltaX);
    //   // console.log(evt.deltaY);
    //   this.target.translateX += evt.deltaX;
    //   this.target.translateY += evt.deltaY;
    //   evt.preventDefault();
    // },
    // tapHandler(evt) {
    //   //点按触发
    // },
    // doubleTapHandler(evt) {
    //   //双击屏幕触发
    //   // if(this.target.scaleX>1){
    //   //   this.target.scaleX = 1;
    //   //   this.target.scaleY = 1;
    //   //   this.target.translateX = 0;
    //   //   this.target.translateY = 0;
    //   //   this.target.rotateZ = 0;
    //   // }else{
    //   //   this.target.scaleX = 2;
    //   //   this.target.scaleY = 2;
    //   // }
    // },
    // longTapHandler(evt) {
    //   //长按屏幕750ms触发
    // },
    // swipeHandler(evt) {
    //   //evt.direction代表滑动的方向
    //   // console.log("swipe" + evt.direction);
    // },
    // singleTapHandler(evt) {
    //   //单击
    // },
  },
};
</script>

<style scoped lang="scss">
.entry-query{
  .image-body-pic {
    width: 1000px;
  }
  .mapptip {
      position: absolute;
      z-index: 100;
      padding: 10px 15px;
      background: white;
      box-shadow: 0px 0px 10px #999;
      border-radius: 10px;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      font-size: 16.67px;
      cursor: pointer;
      span {
        width: 0;
        height: 0;
        display: block;
        border: 10px solid white;
        border-color: white transparent transparent transparent;
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translate(-50%, 0);
      }
      a{
        display: block;
        white-space: nowrap;
      }
    }
 
}
</style>
