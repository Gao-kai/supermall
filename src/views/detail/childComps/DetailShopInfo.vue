<template>
  <div class="detail-shop-info" v-if="Object.keys(shopInfo).length !== 0">
    <!-- 展示店铺logo栏 -->
    <div class="shop-logo">
      <img v-if="shopInfo.shopLogo" :src="shopInfo.shopLogo" alt="">
      <span class="logo-name">{{shopInfo.shopName}}</span>
    </div>

    <!-- 展示店铺信息 -->
    <div class="shop-middle">
      <!-- 1.左边的是店铺详情 -->
      <div class="left">
        <!-- 店铺销量 -->
        <div class="shop-sell">
          <div>{{shopInfo.shopSells}}</div>
          <div class="text">总销量</div>
        </div>
        <!-- 店铺商品 -->
        <div class="shop-goods">
          <div>{{shopInfo.shopGoods}}</div>
          <div class="text">全部宝贝</div>
        </div>
      </div>

      <!-- 2.右边的是店铺评分 -->
      <div class="right">
        <table>
          <tr v-for="(item,index) in shopInfo.score">
            <td>{{item.name}}</td>
            <td class="shop-score" :class="{betterscore:item.isBetter}">{{item.score}}</td>
            <td class="score-leavl" :class="{betterleavl:item.isBetter}"><span>{{item.isBetter?'高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>

    <!-- 展示进店逛逛按钮 -->
    <div class="enter-shop">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shopInfo: {
      type: Object,
      default: function () {
        return {};
      }
    }
  }
}

</script>
<style scoped>
.detail-shop-info {
  padding: 0 8px;
}
.detail-shop-info {
  border-top: 4px solid #eeeeee;
  padding-top: 20px;
}
.shop-logo img {
  width: 50px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  vertical-align: middle;
}
.logo-name {
  display: inline-block;
  margin-left: 10px;
}

.shop-middle {
  display: flex;
}

.shop-middle .left {
  flex: 1;
  display: flex;
  text-align: center;
  font-size: 16px;
  position: relative;
}
.shop-middle .left::after {
  content: "";
  width: 1px;
  height: 50px;
  background-color: #eeeeee;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
.shop-middle .left .shop-sell {
  flex: 1;
  margin: 30px 0 0 10px;
  font-weight: 600;
}
.shop-middle .left .shop-goods {
  flex: 1;
  margin: 30px 10px 0 0;
  font-weight: 600;
}
.shop-middle .left .shop-sell .text,
.shop-middle .left .shop-goods .text {
  font-size: 14px;
  margin: 8px 0;
  font-weight: 400;
}

.shop-middle .right {
  flex: 1;
  /* background-color: #eeeeee; */
  font-size: 14px;
}
.shop-middle .right table {
  margin: 0 auto;
}
.shop-middle .right tr td {
  height: 30px;
  line-height: 30px;
  padding-right: 6px;
}
.shop-score {
  color: green;
}
.betterscore {
  color: red;
}

.score-leavl {
  color: #ffffff;
}
.score-leavl span {
  background-color: green;
}
.betterleavl span {
  background-color: red;
}
.enter-shop {
  width: 150px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  background-color: #f0f3fa;
  border-radius: 10px;
  margin: 20px auto;
}
</style>