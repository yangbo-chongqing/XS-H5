<template>
    <div class="productDetails" v-html="productDetails"></div>
</template>

<script>
import api from "@/request/xsdt";
import { parseQuery } from '@/request/loading';
export default {
  name: "index",
  data() {
    return {
      productDetails: '',
      muse_id:parseQuery(window.location.href).muse_id,
      pkid:parseQuery(window.location.href).pkid,
    }
  },
  mounted() {
    this.museinfo()
  },
  methods: {
    museinfo() {
      let url = parseQuery(window.location.href);
      let muse_id = url.muse_id;
      let pkid = url.pkid;
      let currentsum_id = url.currentsum_id;
      let params = {
        muse_id: muse_id,
        pkid:pkid,
      }
      api.postDetails(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          if(currentsum_id == 1){
            this.productDetails = res.data.product.expand.manual;
          }else if(currentsum_id == 2){
            this.productDetails = res.data.product.expand.details;
          }
        }
      });
    },

  },
}
</script>
<style>


</style>
<style scoped lang="scss">
.productDetails{
  padding: 20px;
  font-size: 14px;
  /deep/ img{
    width: 100% !important;
  }
}
</style>