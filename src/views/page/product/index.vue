<script src="../../../request/xsdt.js"></script>
<template>
  <div class="h-container" v-if="dataInfo" @load="loadImage(1)" >
     <div class="product-head" v-if="dataInfo.image" @click="expandatlas">
       <img :src="dataInfo.image" alt="">
       <div class="product-head-atlas"  v-if="dataInfo.picture.length>0">
         <div class="product-head-atlas-img">
           <img src="@/assets/images/lm77lsYIucG5n.png" alt="">
         </div>
         <div class="product-head-atlas-title">实拍{{ dataInfo.picture.length }}张 <van-icon name="arrow" /></div>
       </div>
     </div>
     <div class="product-info">
       <div class="product-name" v-if="dataInfo.name">{{dataInfo.name}}</div>
<!--       <div class="product-tip" v-if="dataInfo.unique"><label>产品编号：</label><span>{{dataInfo.unique}}</span></div>-->
<!--       <div class="product-tip" v-if="dataInfo.factory"><label>生产厂家：</label><span>{{dataInfo.factory}}</span></div>-->
<!--       <div class="product-tip" v-if="dataInfo.listed"><label>上市时间：</label><span>{{dataInfo.listed}}</span></div>-->
       <div class="product-tip" v-if="water_info.clsbdh"><label>车架号：</label><span>{{water_info.clsbdh}}</span></div>
       <div class="product-tip" v-if="water_info.certificate_id"><label>合格证：</label><span>{{water_info.certificate_id}}</span></div>
       <div class="product-extend" v-if="productExtend">
         <div class="extend-content" v-show="extendshow" >
           <div class="" v-for="(expandItem,index) in expand_details">
             <img v-if="expandItem.field_type==='图片' && expandItem.value"  :src="expandItem.value" alt="">
             <video v-if="expandItem.field_type==='视频' && expandItem.value" :src="expandItem.value" preload="none" controls :poster="expandItem.value+'?vframe/jpg/offset/0/w/325/h200'"></video>
             <p v-if="expandItem.field_type==='富文本' && expandItem.value" v-html="expandItem.value"></p>
             <p v-if="expandItem.field_type==='文本' && expandItem.value">{{expandItem.value}}</p>
           </div>
         </div>
         <div class="extend-show">
           <div class="Loadmore" @click="extendshow=true" v-show="!extendshow">全部展开<van-icon name="arrow-down" /> </div>
           <div class="Loadmore" @click="extendshow=false" v-show="extendshow">收起<van-icon name="arrow-up" />   </div>
         </div>
       </div>

       <div class="product-tit">
         <span class="product-tit-content" v-if="expand_manual>7"  @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:1})">
           <span>使用说明书</span><van-icon name="arrow" />
         </span>
       </div>
     </div>
    <div class="product-a"></div>
    <div class="product-title-set">
      <div class="product-set-content" @click="setContent($event)">
        <div class="product-title-list" :class="{'title-set':examplevideo.length>0}"  v-if="examplevideo.length>0">
          <a onclick="document.getElementById('example').scrollIntoView()">
            <h5>视频</h5>
            <h6><span></span></h6>
          </a>
        </div>
        <div class="product-title-list" v-if="activity.length>0" :class="{'title-set':examplevideo.length<=0 && activity.length>0}">
          <a  onclick="document.getElementById('activity').scrollIntoView()">
            <h5>活动</h5>
            <h6><span></span></h6>
          </a>
        </div>
        <div class="product-title-list" v-if="evaluation.length>0"  :class="{'title-set':examplevideo.length<=0 && activity.length<0 && evaluation.length>0}">
          <a onclick="document.getElementById('evaluating').scrollIntoView()">
            <h5>评测</h5>
            <h6><span></span></h6>
          </a>
        </div>
        <div class="product-title-list" v-if="service" :class="{'title-set':examplevideo.length<=0 && activity.length<=0 && evaluation.length<=0 && service}">
          <a onclick="document.getElementById('service').scrollIntoView()">
            <h5>售后</h5>
            <h6><span></span></h6>
          </a>
        </div>
        <div class="product-title-list" v-if="problem.length>0" :class="{'title-set':examplevideo.length<=0 && activity.length<=0 && evaluation.length<=0 && service && problem.length>0}">
          <a onclick="document.getElementById('problem').scrollIntoView()">
            <h5>常见问题</h5>
            <h6><span></span></h6>
          </a>
        </div>
        <div class="product-title-list" v-if="shopping.length>0" :class="{'title-set':examplevideo.length<=0 && activity.length<=0 && evaluation.length<=0 && service==null && problem.length<=0 && shopping.length>0}">
          <a onclick="document.getElementById('shopping').scrollIntoView()">
            <h5>商城</h5>
            <h6><span></span></h6>
          </a>
        </div>
      </div>

    </div>
<!--    视频范例-->
    <div class="product-example" id="example" v-if="examplevideo.length>0">
      <div class="product-example-title">
<!--        <h5>视频范例</h5>-->
      </div>
      <div class="product-example-content"  >
        <div class="product-example-list" v-for="(item,index) in examplevideo_list" :key="index">
          <video :src="item.video_url" preload="none" controls :poster="item.video_url+'?vframe/jpg/offset/0/w/325/h200'"></video>
        </div>
      </div>
      <div class="Loadmore" @click="onexample(1)" v-if="examplevideo.length>3 & examplevideo_list.length<4">全部展开<van-icon name="arrow-down" /></div>
      <div class="Loadmore" @click="onexample(2)"  v-if="examplevideo.length>3 & examplevideo_list.length>3">收起<van-icon name="arrow-up" /> </div>
    </div>
<!--    <div class="product-example">-->
<!--      <div class="product-example-title"></div>-->
<!--      <div class="product-example-content"></div>-->
<!--    </div>-->
<!--    活动集锦-->
    <div class="product-activity" v-if="activity.length>0" id="activity">
      <div class="product-activity-title"><h5>活动集锦</h5></div>
      <div class="product-activity-content" >
        <div class="product-activity-list" v-for="(item,index) in activity_list" :key="index">
          <a :href="item.jump_url" target="_blank">
            <img :src="item.image" alt="">
            <div class="product-activity-list-content">
              <h6>{{ item.title }}</h6>
              <van-icon name="arrow" />
            </div>
          </a>
        </div>
      </div>
      <div class="Loadmore" @click="onactivity(1)" v-if="activity.length>3 & activity_list.length<4">全部展开<van-icon name="arrow-down" /></div>
      <div class="Loadmore" @click="onactivity(2)"  v-if="activity.length>3 & activity_list.length>3">收起<van-icon name="arrow-up" />   </div>
    </div>
<!--产品评测-->
    <div class="product-evaluating"  v-if="evaluation.length>0" id="evaluating">
      <div class="product-evaluating-title"><h5>产品评测</h5></div>
      <div class="product-evaluating-content" >
        <div class="product-evaluating-list" v-for="(item,index) in evaluation_list " :key="index">
          <a :href="item.jump_url" target="_blank">
            <div class="product-evaluating-list-img">
              <img :src="item.image" alt="">
            </div>
            <div class="product-evaluating-list-content">
              <p>{{ item.title }}</p>
              <div>

                <span>{{ item.source }}</span>
                <p></p>
              </div>
            </div>
          </a>


        </div>
      </div>
      <div class="Loadmore" @click="onevaluation(1)" v-if="evaluation.length>3 & evaluation_list.length<4">全部展开<van-icon name="arrow-down" /> </div>
      <div class="Loadmore" @click="onevaluation(2)"  v-if="evaluation.length>3 & evaluation_list.length>3">收起<van-icon name="arrow-up" />   </div>
    </div>
<!--    售后服务-->
    <div class="product-service" v-if="service" id="service">
      <div class="product-service-title"><h5>售后服务</h5></div>
      <div class="product-service-content">
        <div class="product-service-content-img">
          <img :src="service.image" alt="">
          <p>识别二维码联系客服</p>
        </div>
        <div class="product-service-content-right">
          <h6>{{ service.text }}</h6>
          <p><a :href="'tel:'+service.phone[1]"><img src="@/assets/images/telephone.png" alt=""> <span>{{ service.phone[1] }}</span></a></p>
          <p><a :href="'tel:'+service.phone[0]"><van-icon name="phone" /><span>{{ service.phone[0] }}</span></a></p>
        </div>
      </div>
    </div>
<!--    常见问题-->
    <div class="product-problem" v-if="problem.length>0" id="problem">
      <div class="product-problem-title"><h5>常见问题</h5></div>
      <div class="product-problem-content" >
        <div class="product-problem-list" v-for="(item,index) in problem_list " :key="index">
          <a :href="item.jump_url" target="_blank">
            <img :src="item.image" alt="">
            <div class="product-problem-list-content">
              <h6>{{ item.title }}</h6>
              <van-icon name="arrow" />
            </div>
          </a>
        </div>
      </div>
      <div class="Loadmore" @click="onproblem(1)" v-if="problem.length>3 & problem_list.length<4">全部展开<van-icon name="arrow-down" /></div>
      <div class="Loadmore" @click="onproblem(2)"  v-if="problem.length>3 & problem_list.length>3">收起<van-icon name="arrow-up" /></div>
    </div>
<!--    网络商城-->
    <div class="product-shopping"  v-if="shopping.length>0" id="shopping">
      <div class="product-shopping-title"><h5>网络商城</h5></div>
      <div class="product-shopping-content" >
        <div class="product-shopping-content-list" v-for="(item,index) in shopping_list " :key="index">
          <div class="product-shopping-content-img">
            <img :src="item.image" alt="">
            <p>长按识别小程序</p>
          </div>
          <div class="product-shopping-content-right">
            <h5>{{ item.title }}</h5>
            <h6>{{ item.summary }}</h6>
            <p>{{ item.source }}</p>
          </div>
        </div>
      </div>
      <div class="Loadmore" @click="onshopping(1)" v-if="shopping.length>3 & shopping_list.length<4">全部展开<van-icon name="arrow-down" /> </div>
      <div class="Loadmore" @click="onshopping(2)"  v-if="shopping.length>3 & shopping_list.length>3">收起<van-icon name="arrow-up" /></div>
    </div>
<!--    底部菜单图片-->
    <div class="product-foot-img">
      <img :src="buttom" alt="">
    </div>
    <div class="product-workOrder" v-if="workorder">
      <div class="product-workOrder-list" @click="jumpRoute('/workOrderProblem')">
        <span>
          <img src="@/assets/images/ltXljZUucGn.png" alt="">
          <p>工单</p>
        </span>
      </div>
      <div class="product-workOrder-ask" @click="jumpRoute('/workOrderSubmit',{muse_id:muse_id,pkid:pkid,currentsum_id:1})">
        <span>
          <img src="@/assets/images/mjDplucGn.png" alt="">
          <p>提问</p>
        </span>
      </div>
    </div>

<!--     <div class="product-in-list">-->
<!--       <div class="product-in-item" v-if="expand_manual>7"  @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:1})">-->
<!--         <span><van-icon name="orders-o" color="#739efe" /></span>-->
<!--         <p>原厂说明书</p>-->
<!--         <span class="right"><van-icon name="arrow" /></span>-->
<!--       </div>-->
<!--       <div class="product-in-item" v-if="expand_details>7" @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:2})">-->
<!--         <span><van-icon name="records" color="#739efe" /></span>-->
<!--         <p>产品详情</p>-->
<!--         <span class="right"><van-icon name="arrow" /></span>-->
<!--       </div>-->
<!--&lt;!&ndash;       <div class="product-in-item" @click="jumpRoute('/productDetails',{muse_id:muse_id,pkid:pkid,currentsum_id:3})">&ndash;&gt;-->
<!--         <span><van-icon name="todo-list-o" color="#739efe" /></span>-->
<!--&lt;!&ndash;         <p>预约服务</p>&ndash;&gt;-->
<!--&lt;!&ndash;         <span class="right"><van-icon name="arrow" /></span>&ndash;&gt;-->
<!--&lt;!&ndash;       </div>&ndash;&gt;-->
<!--       <div v-if="dataInfo.video.length>0" class="product-in-item" @click="jumpRoute('/video',{muse_id:muse_id,pkid:pkid})">-->
<!--         <span><van-icon name="video-o" color="#739efe" /></span>-->
<!--         <p>相关视频</p>-->
<!--         <span class="right"><van-icon name="arrow" /></span>-->
<!--       </div>-->
<!--     </div>-->
    <div class="product-attention" v-if="attention">
      <div><img :src="attention" alt=""></div>
      <p style="color: #9a9a9a;margin-bottom: 20px;">长按识别二维码，订阅本车型</p>
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