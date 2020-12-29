<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages" :goodsId="goodsId" :swiper-image-length="swiperImageLength"></detail-swiper>
      <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-goods-info :detailGoodsInfo="detailGoodsInfo" @img-load="imgLoad"></detail-goods-info>
      <detail-param-info :goodsParams="goodsParams"></detail-param-info>
      <detail-comment :commentInfo="commentInfo"></detail-comment>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailComment from "./childComps/DetailComment";

import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"

import { getDetailData, GoodsInfo, ShopInfo, GoodsParams, CommentInfo, getRecommend } from "network/detail.js";
import { debounce } from "common/utils.js"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      goodsId: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailGoodsInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommends: [],
    };
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
    },

    swiperImageLength() {
      this.$refs.scroll.refresh();
    },

  },
  created() {
    // 1.保存传入的商品id(itemid)  this.$route.params中保存着路由跳转时服务器发送的iid参数
    // 在获取商品id的时候需要和定义路由跳转时命名的：后面的参数匹配 最好是全部都按照iid来写 以免混淆
    this.goodsId = this.$route.params.iid;

    // 2.根据goodsId请求详细数据并将需要的数据抽离保存在data中
    getDetailData(this.goodsId).then((res) => {
      const data = res.result;
      console.log(data);
      // 1 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2 获取商品标题等顶部信息数据
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
      // 3 获取店铺信息并保存在一个对象中
      this.shopInfo = new ShopInfo(data.shopInfo);
      // 4 获取商品详情页图片等数据
      this.detailGoodsInfo = data.detailInfo;
      // 5 获取商品详情参数数据
      this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule);
      // 6 获取用户评论详情数据
      if (data.rate.list) {
        this.commentInfo = new CommentInfo(data.rate.list[0]);
      }
    });

    // 3.获取详情页推荐商品数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list;
    })
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 5;
  background-color: #fff;
  height: 100vh;
}
.content {
  position: absolute;
  overflow: hidden;
  height: calc(100% - 44px);
}
</style>