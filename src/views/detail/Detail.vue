<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages" :goodsId="goodsId"></detail-swiper>
    <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";

import { getDetailData, GoodsInfo } from "network/detail.js";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
  },
  data() {
    return {
      goodsId: null,
      topImages: [],
      goodsInfo: {},
    };
  },
  created() {
    //   1.保存传入的商品id(itemid)  this.$route.params中保存着路由跳转时服务器发送的iid参数
    // 在获取商品id的时候需要和定义路由跳转时命名的：后面的参数匹配 最好是全部都按照iid来写 以免混淆
    this.goodsId = this.$route.params.iid;

    // 2.根据goodsId请求详细数据并将需要的数据抽离保存在data中

    getDetailData(this.goodsId).then((res) => {
      const data = res.result;
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      //  获取商品信息并保存在一个对象中
      this.goodsInfo = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
    });
  },
};
</script>
<style scoped>
</style>