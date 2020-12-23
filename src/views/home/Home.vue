<template>
  <div id="home">
    <!-- 引入首页导航组件 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 引入轮播图组件 -->
    <!-- 父子组件通信的时候一定记得加冒号 否则传过去的是字符串 -->
    <home-swiper :banners="banners"></home-swiper>

    <!-- 引入首页推荐组件 -->
    <home-recommend :recommends="recommends"></home-recommend>

    <!-- 引入流行时尚模块 -->
    <home-fashion> </home-fashion>

    <!-- 添加tab选项卡模块 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="home-control"
    ></tab-control>

    <!-- 添加废物标签 -->
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFashion from "./childComps/HomeFashion";

// ! 非默认导出的模块在导入时记得加大括号{}
import { getHomeMultiData } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    HomeFashion,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
    //! 向服务器请求首页的多个数据 用res接受后做处理
    getHomeMultiData().then((res) => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>


<style scoped>
#home {
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
  background-color: #fff;
  position: sticky;
  top: 44px;
  border-top: 10px solid #eeeeee;
}
</style>