<template>
  <div class="footer">
    <p><img src="@/assets/images/xsdtlogo.png" />寻声扫码</p>
  </div>
</template>

<script>
export default {
  name: "XsdtFooter",
  data() {
    return {
    };
  },
  computed: {},
  created() {},
  mounted() {
  },
  destroyed() {
  },
  methods: {
    
  },
};
</script>
<style lang="scss" scoped>
    .footer{
        position: absolute;
        bottom: 10px;
        width: 100%;
        margin: 15px 0;
        p{
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 14px;
            color: #999;
            align-items: center;
            img{
                width: 20px;
                height: 20px;
                margin-right:10px;
            }
        }
    }
</style>

