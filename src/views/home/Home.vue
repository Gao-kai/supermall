<template>
  <div id="home">
    <!-- 引入首页导航组件 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 克隆的为满足视觉效果的tab选项卡模块 -->
    <tab-control :titles="['流行', '新款', '精选']" @tab-click="handleTabClick" ref="clonetabcontrol" class="clonetabcontrol" v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probeType="2" @scroll="handleScroll" :pullUpLoad="true" @pullingUP="loadMore">
      <!-- 引入轮播图组件 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 引入首页推荐组件 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 引入流行时尚模块 -->
      <home-fashion> </home-fashion>
      <!-- 添加tab选项卡模块 -->
      <tab-control :titles="['流行', '新款', '精选']" @tab-click="handleTabClick" ref="tabcontrol"></tab-control>
      <!-- 添加首页商品展示数据 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 添加回到顶部按钮 -->
    <backtop @click.native="backClick" v-show="isShowBackTop"></backtop>
  </div>
</template>

<script>
// 引入公共模块组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import Backtop from "components/content/backtop/Backtop";

// 引入子组件
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFashion from "./childComps/HomeFashion";

// ! 非默认导出的模块在导入时记得加大括号{}
// 引入函数类方法
import { getHomeMultiData, getHomeGoods } from "network/home";
import { debounce } from "common/utils.js";

export default {
  name: "Home",

  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    Backtop,

    HomeSwiper,
    HomeRecommend,
    HomeFashion,
  },

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      leavePositionY: 0,
    };
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.leavePositionY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.leavePositionY = this.$refs.scroll.getScrollY();
    // 获取当前页面在y轴上滚动距离
    // console.log(this.$refs.scroll.getScrollY());
  },

  created() {
    //! 发送网络请求首页大量数据
    this.handleHomeMultiData();

    // !发送网络请求首页商品数据
    this.handleHomeGoods("pop");
    this.handleHomeGoods("new");
    this.handleHomeGoods("sell");
  },
  mounted() {
    // 进行防抖处理
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    // 执行图片加载完成的事件后执行刷新事件
    this.$bus.$on("imageLoad", function () {
      refresh();
    });
  },
  destroyed() {
    console.log("首页已经被销毁");
  },

  methods: {
    /*
    处理网络请求相关的函数
    */
    // !处理首页大量数据的函数 让处理数据在methods中进行 不卡页面
    handleHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // !处理首页商品数据的函数
    handleHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 已经完成本次上拉加载更多的数据请求
        this.$refs.scroll.finishPullUp();
      });
    },

    /*
    处理事件监听相关的函数
    */
    // !接收子组件tabcontrol发过来的自定义事件 进行处理
    handleTabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.clonetabcontrol.currentIndex = index;
      this.$refs.tabcontrol.currentIndex = index;
    },

    // 点击返回顶部按钮组件的事件
    backClick() {
      // this.$refs.scroll拿到的绑定折ref的子组件对象Scroll.vue
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    // 处理滚动位置是否大于1000的函数,判断isShowBackTop的布尔值
    handleScroll(position) {
      // 1.根据滚动的y距离判断isShowBackTop的布尔值决定显示及隐藏
      this.isShowBackTop = Math.abs(position.y) > 1000;

      // 2.决定当滚动距离大于taboffsetTop的时候tabControl是否开启固定定位吸附到顶端
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
    },

    // 处理上拉获取更多的函数
    loadMore() {
      this.handleHomeGoods(this.currentType);
    },

    // 获取轮播图图片加载完成的函数
    swiperImageLoad() {
      // 获取tabControl组件的offsetTop属性
      this.tabOffsetTop = this.$refs.tabcontrol.$el.offsetTop;
    },
  },
};
</script>


<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  position: relative;
  z-index: 10;
  background-color: #ff8198;
  color: #ffffff;
}
.clonetabcontrol {
  position: relative;
  z-index: 5;
  background-color: #ffffff;
}
/* 设置滚动模块的高度及样式 */
.content {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
</style>

