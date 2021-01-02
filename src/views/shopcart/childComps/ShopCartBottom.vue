<template>
  <div class="cart-bottom">
    <div class="checkarea">
      <check-button
        class="checkall-button"
        :isChecked="isCheckedAll"
        @click.native="checkallClick"
      ></check-button>
    </div>
    <span class="checktext">全选</span>
    <div class="totalprice">合计：{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "ShopCartBottom",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["shopLength", "cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => item.isChecked === true)
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.cartList
        .filter((item) => item.isChecked === true)
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isCheckedAll() {
      if (this.cartList.length == 0) {
        return false;
      } else {
        return !this.cartList.find((item) => item.isChecked === false);
      }
    },
  },
  methods: {
    //   for循环方法
    // checkallClick() {
    //   if (this.isCheckedAll) {
    //     for (let i = 0; i < this.cartList.length; i++) {
    //       this.cartList[i].isChecked = false;
    //     }
    //   } else {
    //     for (let i = 0; i < this.cartList.length; i++) {
    //       this.cartList[i].isChecked = true;
    //     }
    //   }
    // },
    checkallClick() {
      if (this.isCheckedAll) {
        this.cartList.forEach((item) => (item.isChecked = false));
      } else {
        this.cartList.forEach((item) => (item.isChecked = true));
      }
    },
  },
};
</script>
<style scoped>
.cart-bottom {
  background-color: #f7f5f7;
  height: 40px;
  z-index: 10;
  display: flex;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
}
.checkarea {
  flex: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkall-button {
  width: 20px;
  height: 20px;
}
.checktext {
  flex: 10%;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
}
.totalprice {
  flex: 50%;
  text-align: left;
  line-height: 40px;
  color: #6c6c6c;
  font-size: 14px;
  padding-left: 10px;
}
.calculate {
  flex: 30%;
  line-height: 40px;
  text-align: center;
  background-color: #ff5200;
  color: #ffffff;
  font-size: 14px;
}
</style>