<template>
  <div class="entry-query">
    <div class="pdf" v-show="fileType === 'pdf'">
      <p class="arrow">
        <span
          @click="changePdfPage(0)"
          class="turn"
          :class="{ grey: currentPage == 1 }"
          >上一页</span
        >
        {{ currentPage }} / {{ pageCount }}
        <span
          @click="changePdfPage(1)"
          class="turn"
          :class="{ grey: currentPage == pageCount }"
          >下一页</span
        >
      </p>
      <pdf
        :src="src"
        :page="currentPage"
        @num-pages="pageCount = $event"
        @page-loaded="currentPage = $event"
        @loaded="loadPdfHandler"
      >
      </pdf>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  name: "Pdf",
  components: { pdf },
  data() {
    return {
      currentPage: 0, 
      pageCount: 0,
      fileType: "pdf",
      src: this.$route.query.pdfurl,
    };
  },
  created() {
    this.$toast.loading({
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0,
    });
    this.src = pdf.createLoadingTask(this.src);
  },
  methods: {
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },

    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1;
      this.$toast.clear();
    },
  },
};
</script>

<style scoped lang="scss">
.arrow{
  text-align: center;
  font-size: 16.67px;
  width: 100%;
  position: fixed;
  z-index: 999;
  background:white;
  bottom: 20px;
  left: 0;
}
</style>
