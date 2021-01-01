import {
  debounce
} from "./utils";

export const imgListenerMixin = {
  data() {
    return {
      ImgListener: null,
      newRefresh: null,
    }
  },
  mounted() {
    // 进行防抖处理
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    // 执行图片加载完成的事件后执行刷新事件
    this.ImgListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("imgload", this.ImgListener);
  },
}


import Backtop from "components/content/backtop/Backtop";
export const backTopMixin = {
  components: {
    Backtop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backtopClick() {
      // this.$refs.scroll拿到的绑定折ref的子组件对象Scroll.vue
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
}
