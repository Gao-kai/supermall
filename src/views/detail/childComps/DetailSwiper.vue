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
      isLoad: false,
    }
  },
  methods: {
    swiperLoad() {
      // 不用每次加载完一张发射一张 而是在这里所有的轮播图都加载完之后 只发射一次事件 刷新一次即可 
      // 因为轮播图本来就没有特别多图片 而且这样子也节省性能 优化性能
      if (!this.isLoad) {
        this.$emit('swiper-image-length');
        this.isLoad = true;
      }
      // if (++this.counter === this.swiperImageLength) {
      //   this.$emit('swiper-image-length');
      // }
    }
  },
  watch: {
    // 获取传递进来轮播图的个数从默认空数组[]变化为父组件传递进来值的时候
    // 通过watch来直接监测swiperImageLength，如果swiperImageLength的值变化，就将当前topImages中图片个数赋值给swiperImageLength
    topImages: {
      handler() {
        this.swiperImageLength = this.topImages.length;
      }
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