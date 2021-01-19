<template>

</template>

<script>
import api from "@/request/xsdt";
import { parseQuery } from '@/request/loading';
export default {
  name: "index",
  data() {
    return {
      datavideo: '',
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
      let params = {
        muse_id: muse_id,
        pkid:pkid,
      }
      api.postDetails(this.qs.stringify(params)).then((res) => {
        if (res.status == 200) {
          this.datavideo = res.data.product;
        }
      });
    },

  },
}
</script>

<style scoped lang="scss">

</style>