<template>
  <div id="home">
    <!-- 引入首页导航组件 -->
    <nav-bar class="nav-home">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 引入轮播图组件 -->
    <!-- 父子组件通信的时候一定记得加冒号 否则传过去的是字符串 -->
    <home-swiper :banners="banners"></home-swiper>

    <!-- 引入首页推荐组件 -->
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";

// ! 非默认导出的模块在导入时记得加大括号{}
import { getHomeMultiData } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
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
.nav-home {
  background-color: #ff8198;
  color: #ffffff;
}
</style>