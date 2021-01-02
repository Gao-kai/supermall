<template>
  <div id="detail">
    <detail-nav-bar
      @title-item-click="titleItemClick"
      ref="navbar"
    ></detail-nav-bar>

    <scroll class="content" ref="scroll" @scroll="detailScroll" :probeType="2">
      <detail-swiper
        :topImages="topImages"
        @swiper-image-length="swiperImageLength"
      ></detail-swiper>
      <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-goods-info
        :detailGoodsInfo="detailGoodsInfo"
        @detailgoodsimgload="detailGoodsImgLoad"
      ></detail-goods-info>
      <detail-param-info
        :goodsParams="goodsParams"
        ref="param"
      ></detail-param-info>
      <detail-comment :commentInfo="commentInfo" ref="comment"></detail-comment>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <backtop @click.native="backtopClick" v-show="isShowBackTop"></backtop>

    <detail-bottom-bar @addShopCart="addShopCart"></detail-bottom-bar>

    <toast ref="toast"></toast>
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
import DetailBottomBar from "./childComps/DetailBottomBar";

import Toast from "components/common/toast/Toast";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { mapActions } from "vuex";
// import Backtop from "components/content/backtop/Backtop"  已经通过混入实现

import {
  getDetailData,
  GoodsInfo,
  ShopInfo,
  GoodsParams,
  CommentInfo,
  getRecommend,
} from "network/detail.js";
import { debounce } from "common/utils.js";
import { imgListenerMixin, backTopMixin } from "common/mixin.js";

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
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast,
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
      themeOffsetTop: [],
      getThemeOffsetTop: null,
      currentIndex: 0,
    };
  },
  mixins: [imgListenerMixin, backTopMixin],
  methods: {
    // 子组件DetailSwiper中加载轮播图完成之后刷新一次可滚动高度
    swiperImageLength() {
      this.$refs.scroll.refresh();
    },
    // 子组件DetailGoodsInfo中大量商品详情图片记载完成之后刷新可滚动高度
    detailGoodsImgLoad() {
      // 进行防抖操作接收多次刷新一次
      this.newRefresh();
      // 图片记载完之后获取各个主题模块的offsetTop并push到专门存放数据的themeOffsetTop数组中
      this.getThemeOffsetTop();
    },
    titleItemClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeOffsetTop[index], 100);
    },
    detailScroll(position) {
      // 1.获取当前页面滚动的y值
      const positionY = Math.abs(position.y);
      const length = this.themeOffsetTop.length;
      // console.log(positionY);
      // 2.当这个值与每一个标题主题模块的offsetTop进行对比(两个条件都需要判断)
      // [0, 8049, 8766, 8968]  themeOffsetTop
      // 当positionY的值大于0小于8049的时候，就让index = 0，并且将这个值赋值给navbar组件中的currentIndex
      // 当positionY的值大于8049小于8766的时候，就让index = 1 并且将这个值赋值给navbar组件中的currentIndex
      // 当positionY的值大于8766小于8968的时候，就让index = 2 并且将这个值赋值给navbar组件中的currentIndex
      // 当positionY的值大于8968的时候，就让index = 3 并且将这个值赋值给navbar组件中的currentIndex
      // if (positionY >= this.themeOffsetTop[length - 1]) {
      //   this.$refs.navbar.currentIndex = length - 1;
      // } else if (positionY >= this.themeOffsetTop[length - 2] && positionY < this.themeOffsetTop[length - 1]) {
      //   this.$refs.navbar.currentIndex = length - 2;
      // } else if (positionY >= this.themeOffsetTop[length - 3] && positionY < this.themeOffsetTop[length - 2]) {
      //   this.$refs.navbar.currentIndex = length - 3;
      // } else if (positionY >= 0 && positionY < this.themeOffsetTop[length - 3]) {
      //   this.$refs.navbar.currentIndex = length - 4;
      // }

      // 方案二：for循环数组记录索引 然后将索引的值赋值给currentIndex
      // for (let i = 0; i < this.themeOffsetTop.length; i++) {
      //   if ((this.currentIndex !== i) && (i < length - 1 && positionY >= this.themeOffsetTop[i] && positionY < this.themeOffsetTop[i + 1]) || (i === length - 1 && positionY >= this.themeOffsetTop[i])) {
      //     console.log(i);
      //     // 将满足条件的i赋值给当前组件中的currentIndex
      //     this.currentIndex = i;
      //     // 操作navbar中的currentIndex 从而让样式发送变化
      //     this.$refs.navbar.currentIndex = this.currentIndex;
      //   }
      // }

      // 方案三：hack一个最大值放在数组后面 简化if判断 循环时候length -1
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeOffsetTop[i] &&
          positionY < this.themeOffsetTop[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }

      // 控制返回顶部按钮的是否隐藏
      this.isShowBackTop = positionY > 1000;
    },
    backtopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    ...mapActions(["addCart"]),
    addShopCart() {
      // 1.获取发送给购物车的数据
      const product = {};
      product.images = this.topImages[0];
      product.price = this.goodsInfo.realPrice;
      product.desc = this.goodsInfo.desc;
      product.title = this.goodsInfo.title;
      product.iid = this.goodsId;

      // 2.将商品添加到购物车里 并且返回添加成功的结果
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });

      // 使用mapActions方法进行映射 完成弹窗的封装
      this.addCart(product).then((res) => {
        this.$refs.toast.showToast(res, 2000);
        console.log(res);
      });
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
      this.goodsInfo = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3 获取店铺信息并保存在一个对象中
      this.shopInfo = new ShopInfo(data.shopInfo);
      // 4 获取商品详情页图片等数据
      this.detailGoodsInfo = data.detailInfo;
      // 5 获取商品详情参数数据
      this.goodsParams = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6 获取用户评论详情数据
      if (data.rate.list) {
        this.commentInfo = new CommentInfo(data.rate.list[0]);
      }
    });

    // 3.获取详情页推荐商品数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // 4.给getThemeOffsetTop赋值的操作进行防抖
    this.getThemeOffsetTop = debounce(() => {
      this.themeOffsetTop = [];
      this.themeOffsetTop.push(0);
      this.themeOffsetTop.push(this.$refs.param.$el.offsetTop);
      this.themeOffsetTop.push(this.$refs.comment.$el.offsetTop);
      this.themeOffsetTop.push(this.$refs.recommend.$el.offsetTop);
      this.themeOffsetTop.push(Number.MAX_VALUE);
      // console.log(this.themeOffsetTop);
    }, 200);
  },
  destroyed() {
    // 离开详情页面的时候也就是组件销毁之后取消来自事件总线的监听
    // 不可以写在activated中 因为detail组件被exclude缓存之外 不在keep-alive范围内
    this.$bus.$off("imgload", this.ImgListener);
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
  overflow: hidden;
  height: calc(100% - 44px - 56px);
}
</style>