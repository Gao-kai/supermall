<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      dafault: 0,
    },
    pullUpLoad: {
      type: Boolean,
      dafault: false,
    },
  },
  data() {
    return {
      bscroll: null,
    };
  },
  mounted() {
    // 创建Bscroll对象
    this.bscroll = new Bscroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
    });
    // 监听滚动的位置
    this.bscroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
    // 监听滚动至底部上拉加载更多
    this.bscroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },

  methods: {
    scrollTo(x, y, time = 500) {
      this.bscroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      // setTimeout(() => {
      //   this.bscroll.finishPullUp();
      // }, 5000);
      this.bscroll.finishPullUp();
    },
    refresh() {
      this.bscroll.refresh();
    },
  },
};
</script>
<style scoped>
</style>