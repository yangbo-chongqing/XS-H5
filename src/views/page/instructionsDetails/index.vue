<template>
    <div class="instructionsDetails" >
      <div class="instructionsDetails-nav">
        <div class="instructions-title">
          <div class="instructions-title-icon"><img src="@/assets/images/book.png" alt=""></div>
          <h2>【{{data.name}}】使用手册</h2>
        </div>
        <div class="instructionsDetails-menu" @click="submenushow">
          <van-icon name="arrow-down" />
        </div>
      </div>


      <div class="instructionsDetails-submenu" v-show="submenuShow">
        <span class="close" @click="submenushow"></span>
        <div class="title">
          <div class="instructions-title">
            <div class="instructions-title-icon"><img src="@/assets/images/book.png" alt=""></div>
            <h2>【{{data.name}}】使用手册</h2>
          </div>
          <div class="instructionsDetails-menu" @click="submenushow">
            <van-icon name="cross" />
          </div>
        </div>


        <div class="instructions-main">
          <div class="instructions-main-list" v-for="(dataItme,rowindex) in data.type_json" :key="rowindex" :data-muse_id="data.id" >
            <h4>{{ dataItme.label }}</h4>
            <div class="instructions-list" v-for="(item,index) in dataItme.children" :key="index" :data-id="item.id" @click="getdata(item.id)">
              <p>{{item.label}}</p>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>


      </div>

      <div class="instructionsDetails-content" v-html="productDetails.content"></div>
    </div>

</template>

<script>
import api from "@/request/xsdt";
import { parseQuery } from '@/request/loading';
import {Icon} from 'vant';
export default {
  name: "index",
  components: {
    VanIcon:Icon,
  },
  data() {
    return {
      productDetails: '',
      manual_id:parseQuery(window.location.href).manual_id,
      id:parseQuery(window.location.href).id,
      data:'',
      submenuShow:false,
    }
  },
  mounted() {
    this.museinfo(this.id,this.manual_id)
    this.getData()
  },
  methods: {
    museinfo(id,manual_id) {
      let params = {
        id: id,
        manual_id:manual_id,
      }
      api.postMenuDetails(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.productDetails = (res.data.data)
        }
      });
    },
    //获取数据
    getData(){
      let params = {
        manual_id:this.manual_id,
      }
      api.postMenu(this.qs.stringify(params)).then((res) => {
        if(res.status == 200){
          this.data = res.data.info
        }
      })
    },
    submenushow(){
      if(this.submenuShow){
        this.submenuShow=false;
      }else {
        this.submenuShow = true;
      }
    },
    getdata(manual){
      // console.log(this.manual_id,manual)
      this.submenuShow=false;
      this.museinfo(manual,this.manual_id);
    },

  },
}
</script>
<style>


</style>
<style scoped lang="scss">
.instructionsDetails{
  font-size: 14px;
  box-sizing: border-box;
  .instructionsDetails-content{
    padding: 20px;
    /deep/ img{
      width: 100% !important;
      height: 100% !important;
      display: block;
    }
  }

  .instructionsDetails-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 4px rgba(0,0,0,0.2);

    .instructions-title{
      display: flex;
      align-items: center;
      .instructions-title-icon{
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      h2{
        font-size: 16px;
        max-width: 280px;
        overflow:hidden; //超出的文本隐藏
        text-overflow:ellipsis; //溢出用省略号显示
        white-space:nowrap; //溢出不换行
      }
    }
    .van-icon-arrow-down{
      font-size: 16px;
    }


  }
  .instructionsDetails-submenu{
    position:fixed;
    align-items: center;
    padding: 20px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    overflow-x: hidden;
    overflow-y: scroll;
    //display: none;
    z-index: 5;
    .close{
      display: flex;
      justify-content: center;
      border-radius: 24px;
      position: absolute;
      top: 20px;
      right: 20px;

    }
    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .instructions-title{
        display: flex;
        align-items: center;
        .instructions-title-icon{
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        h2{
          font-size: 16px;
          max-width: 280px;
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        }
      }
      .van-icon-cross{
        font-size: 18px;
        background-color: #c8c9cc;
        border-radius: 50%;
        padding: 2px;
        color: #ffffff;
      }
    }
    .instructions-main{
      padding: 20px;
      .instructions-main-list{
        margin-top: 20px;
        h4{
          font-size: 18px;
          padding-bottom: 16px;
          border-bottom: 2px solid #f5f5f5;
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        }
        .instructions-list{
          font-size: 16px;
          color: #4ab9ff;
          display: flex;
          align-items: center;
          padding: 14px 0;
          border-bottom: solid 1px #f5f5f5;
          p{
            max-width: 300px;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
          }
        }
      }
      .instructions-main-list:nth-child(1){
        margin-top: 0;
      }
    }
  }
}
div{
  box-sizing: border-box;
}
</style>