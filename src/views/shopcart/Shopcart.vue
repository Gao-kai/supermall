<template>
  <div id="shopcart">
    <!-- 顶部导航 -->
    <nav-bar class="shop-navbar">
      <div slot="center">购物车({{shopLength}})</div>
    </nav-bar>
    <!-- 购物车商品列表 -->
    <shop-cart-list></shop-cart-list>

    <!-- 底部导航栏列表 -->
    <shop-cart-bottom @checkallButtonClick="checkallButtonClick"></shop-cart-bottom>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import ShopCartList from "./childComps/ShopCartList"
import ShopCartBottom from "./childComps/ShopCartBottom"
import { mapGetters } from "vuex"

export default {
  name: "Shopcart",
  components: {
    NavBar,
    ShopCartList,
    ShopCartBottom,
  },
  computed: {
    ...mapGetters(['shopLength', "cartList"]),
  },
  methods: {
    checkallButtonClick() {

    }
  }

};
</script>
<style scoped>
#shopcart {
  height: 100vh;
}
.shop-navbar {
  background-color: #ff8198;
  color: #ffffff;
  font-weight: 700;
}
</style>