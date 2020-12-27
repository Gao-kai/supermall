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
      default: false,
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
    if (this.probeType == 2 || this.probeType == 3) {
      this.bscroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    // 监听上拉获取更多
    if (this.pullUpLoad) {
      this.bscroll.on("pullingUp", () => {
        this.$emit("pullingUP");
      });
    }
  },

  methods: {
    scrollTo(x, y, time = 500) {
      this.bscroll && this.bscroll.scrollTo(x, y, time);
    },
    refresh() {
      this.bscroll && this.bscroll.refresh();
    },
    finishPullUp() {
      this.bscroll && this.bscroll.finishPullUp();
    },
  },
};
</script>
<style scoped>
</style>