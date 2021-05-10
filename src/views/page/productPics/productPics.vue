<template>
  <div class="imgDiv">
    <div v-for="(item, index) of img" :key="index">
      <div class="detailImg">
        <img :src="item" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: this.$route.query.imgs,
    };
  },
  created() {
    console.log(this.$route);
  },
};
</script>
<style lang="scss" scoped>
.imgDiv {
  .detailImg {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 0;
    img {
      width: 100%;
    }
  }
}
</style>