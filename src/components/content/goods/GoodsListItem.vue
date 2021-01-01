<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImages" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p class="goods-title">{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    showImages() {
      // goodsItem.image是来自于详情页面推荐对象中获取img的路径
      // goodsItem.show.img是来自于首页商品列表对象中获取img的路径
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {

    imageLoad() {
      // 方案二：mixin混入 可行 当时必须保证发出的都是同一个事件 不同组件中接收也是同一个事件
      this.$bus.$emit('imgload');


      // 方案一：路由方案 可行
      // if (this.$route.path.indexOf('/home') !== -1) {
      //   // 当在home路由下的时候，每加载完一张图片发射给事件总线 在home组件中执行刷新可滚动高度
      //   this.$bus.$emit("homeimgload");
      // } else if (this.$route.path.indexOf('/detail') !== -1) {
      //   // 当在detail路由下的时候，每加载完一张图片发射给事件总选 在detail组件中执行刷新可滚动高度
      //   this.$bus.$emit('detailimgload');
      // }

    },
    itemClick() {
      // 这里的iid是从父组件遍历出来的数据传递过来的，是服务器获取的 不可随意变更 必须和服务器对应
      this.$router.push("/detail/" + this.goodsItem.iid);
      // console.log(this.goodsItem);
    },
  },
};
</script>
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>