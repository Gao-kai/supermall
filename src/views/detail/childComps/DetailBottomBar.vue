<template>
  <div class="bottom-bar">
    <div class="leftbar">
      <div class="service item">
        <i class="icon service-icon"></i>
        <span>客服</span>
      </div>
      <div class="shop item">
        <i class="icon shop-icon"></i>
        <span>店铺</span>
      </div>
      <div class="collect item">
        <i class="icon collect-icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="addshopcart" @click="addShopCart">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addShopCart() {
      this.$emit('addShopCart');
    }
  }
}

</script>
<style scoped>
.bottom-bar {
  height: 56px;
  background-color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
}
.leftbar {
  flex: 50%;
  display: flex;
}
.leftbar .item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.leftbar .item i {
  display: block;
  width: 22px;
  height: 22px;
  background-color: sienna;
  margin: 4px 0;
  background: url("~assets/img/detail/detail_bottom.png") no-repeat;
  background-position: 0 -52px;
  background-size: 100%;
}
.leftbar .item i.shop-icon {
  background-position: 0 -96px;
}
.leftbar .item i.collect-icon {
  background-position: 0 2px;
}

.addshopcart {
  flex: 28%;
  background-color: #ffdd10;
  line-height: 56px;
  text-align: center;
  font-size: 16px;
  color: #3c3c3c;
}
.buy {
  flex: 22%;
  background-color: #ff789b;
  line-height: 56px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}
</style>