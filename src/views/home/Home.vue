<template>
  <div id="home">
    <!-- 引入首页导航组件 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="handleScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 引入轮播图组件 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 引入首页推荐组件 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 引入流行时尚模块 -->
      <home-fashion> </home-fashion>
      <!-- 添加tab选项卡模块 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="home-control"
        @tab-click="handleTabClick"
      ></tab-control>
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
    };
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  created() {
    //! 发送网络请求首页大量数据
    this.handleHomeMultiData();

    // !发送网络请求首页商品数据
    this.handleHomeGoods("pop");
    this.handleHomeGoods("new");
    this.handleHomeGoods("sell");
  },

  methods: {
    /*
    处理网络请求相关的函数
    */
    // !处理首页大量数据的函数 让处理数据在methods中进行 不卡页面
    handleHomeMultiData() {
      getHomeMultiData().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // !处理首页商品数据的函数
    handleHomeGoods(type) {
      const page = this.goods[type].page + 1;

      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
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
    },
    backClick() {
      // this.$refs.scroll拿到的绑定折ref的子组件对象Scroll.vue
      // this.$refs.scroll.bscroll拿到的是new Bscroll出来的 bscroll对象
      // bscroll对象上方法scrollTo(x,y)控制滚动位置
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    handleScroll(position) {
      this.isShowBackTop = Math.abs(position.y) > 1000;
    },
    loadMore() {
      console.log(666);
      this.handleHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },
  },
};
</script>


<style scoped>
#home {
  height: 100vh;
  position: relative;
  padding-top: 44px;
}
.home-nav {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  background-color: #ff8198;
  color: #ffffff;
}
.home-control {
  background-color: #ffffff;
  height: 44px;
  position: sticky;
  z-index: 9;
  top: 44px;
  /* border-top: 10px solid #eeeeee; */
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

