<template>
  <div class="shop-cart-list">
    <scroll class="content" ref="scroll">
      <shop-cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></shop-cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll"
import ShopCartListItem from "./ShopCartListItem"

export default {
  name: 'ShopCartList',
  components: {
    Scroll,
    ShopCartListItem,
  },
  computed: {
    ...mapGetters(['cartList']),
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}

</script>
<style scoped>
.shop-cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>