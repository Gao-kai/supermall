<template>
  <div class="cart-list-item">
    <!-- 左边按钮 -->
    <div class="button">
      <check-button :isChecked="product.isChecked" @click.native="buttonClick"></check-button>
    </div>
    <!-- 中间图片 -->
    <div class="goods-image">
      <img :src="product.images" alt="">
    </div>
    <!-- 右边文字 -->
    <div class="goods-info">
      <div class="goods-title">{{product.title}}</div>
      <div class="goods-disc">{{product.desc}}</div>
      <div class="goods-price">
        <span class="price">￥{{product.price}}</span>
        <span class="count">x{{product.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  name: 'ShopCartListItem',
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  methods: {
    buttonClick() {
      this.product.isChecked = !this.product.isChecked;
    }
  }
}
</script>
<style scoped>
.cart-list-item {
  display: flex;
  padding: 6px 0;
  border-bottom: 1px solid #eeeeee;
  /* height: 120px; */
}

/* 左边按钮 */
.button {
  width: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 中间图片 */
.goods-image {
  width: 24%;
}

.goods-image img {
  width: 80px;
  padding: 5px;
  border-radius: 10px;
  /* height: 100px; */
}

/* 右边商品描述 */
.goods-info {
  width: 70%;
  padding-left: 6px;
}
.goods-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  padding-top: 8px;
}
.goods-disc {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 10px 0 25px 0;
  color: #6c6c6c;
  font-size: 12px;
}
.goods-price {
  display: flex;
  padding-top: 15px;
}
.price {
  flex: 1;
  text-align: left;
  color: #f40;
}
.count {
  flex: 1;
  text-align: right;
  margin-right: 4px;
}
</style>