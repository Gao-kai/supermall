<template>
  <swiper class="detail-swiper">
    <swiper-item class="swiper-item" v-for="(item, index) in topImages">
      <img :src="item" @load="swiperLoad" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      counter: 0,
      swiperImageLength: 0,
    }
  },
  methods: {
    swiperLoad() {
      if (++this.counter === this.swiperImageLength) {
        this.$emit('swiper-image-length');
      }
    }
  },
  watch: {
    swiperImageLength() {
      this.swiperImageLength = topImages.length;
    }
  }
};
</script>

<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>