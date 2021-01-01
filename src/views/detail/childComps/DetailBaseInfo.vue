<template>
  <div class="base-info" v-if="Object.keys(goodsInfo).length !== 0">
    <!-- 展示商品多行标题 -->
    <div class="info-title">{{ goodsInfo.title }}</div>
    <!-- 展示商品价格 -->
    <div class="info-price">
      <span class="real-price">{{ '￥'+goodsInfo.realPrice }}</span>
      <span class="old-price">{{ '￥'+ goodsInfo.oldPrice }}</span>
      <span v-if="goodsInfo.discount" class="discount">{{goodsInfo.discount}}</span>
    </div>
    <!-- 展示销量及收藏 72小时发货服务 -->
    <div class="info-goods">
      <span>{{goodsInfo.columns[0]}}</span>
      <span>{{goodsInfo.columns[1]}}</span>
      <span>{{goodsInfo.services[goodsInfo.services.length - 1].name}}</span>
    </div>
    <!-- 展示店铺服务 -->
    <div class="shop-service">
      <div class="shop-service-item" v-for="index in goodsInfo.services.length - 1" :key="index">
        <img class="item-icon" :src="goodsInfo.services[index - 1].icon" alt="">
        <span class="item-info">{{goodsInfo.services[index - 1].name}}</span>
      </div>
    </div>
  </div>

</template>


<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goodsInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.base-info {
  padding: 0 8px;
}
.info-title {
  margin-top: 10px;
  color: #333;
}
.info-price {
  margin-top: 10px;
  position: relative;
}
.real-price {
  font-size: 28px;
  color: #ff6b7f;
}
.old-price {
  color: #9c9c9c;
  text-decoration: line-through;
  font-size: 14px;
  margin: 0 4px;
}
.discount {
  position: absolute;
  top: 0;
  padding: 4px;
  background-color: #fd6b7f;
  color: #fff;
  font-size: 10px;
  border-radius: 10px;
}
.info-goods {
  margin-top: 10px;
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #eeeeee;
}
.info-goods span {
  flex: 1;
  color: #9c9c9c;
  font-size: 14px;
}
.info-goods span:nth-child(1) {
  text-align: left;
}
.info-goods span:nth-child(2) {
  text-align: center;
}
.info-goods span:nth-child(3) {
  text-align: right;
}
.shop-service {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
}
.shop-service-item {
  flex: 1;
  text-align: center;
  position: relative;
  white-space: nowrap;
}
.shop-service-item:first-child {
  text-align: left;
}
.shop-service-item:last-child {
  text-align: right;
}
.item-icon {
  width: 14px;
  position: absolute;
  top: 2px;
}
.item-info {
  font-size: 12px;
  padding-left: 16px;
  font-weight: 600;
}
</style>