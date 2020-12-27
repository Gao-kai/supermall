<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p class="goods-title">{{ goodsItem.title }}</p>
      <span class="goods-price">{{ goodsItem.price }}</span>
      <span class="goods-collect">{{ goodsItem.cfav }}</span>
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
  methods: {
    imageLoad() {
      this.$bus.$emit("imageLoad");
    },
  },
};
</script>
<style scoped>
.goods-item {
  width: 48%;
  margin-bottom: 4px;
}
.goods-item img {
  width: 100%;
  border-radius: 4px;
}
.goods-info {
  font-size: 14px;
  text-align: center;
}
.goods-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.goods-price {
  color: #ff8198;
  height: 16px;
  line-height: 16px;
}
.goods-collect {
  position: relative;
  margin: 0 20px;
  height: 20px;
  line-height: 20px;
}

.goods-collect::before {
  content: "";
  position: absolute;
  z-index: 0;
  top: 0px;
  left: -15px;
  width: 16px;
  height: 16px;
  background: url("~assets/img/common/collect.svg") no-repeat;
  background-size: 16px 16px;
}
</style>