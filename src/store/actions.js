import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-type"

export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      // 1.将重复的商品查找出来
      let repeatGoods = null;
      repeatGoods = context.state.cartList.find(item => {
        return item.iid === payLoad.iid;
      });

      // 2.判断商品是否重复
      if (repeatGoods) {
        // repeatGoods.count += 1;
        context.commit(ADD_COUNTER, repeatGoods);
        resolve('商品数量 +1');
      } else {
        payLoad.count = 1;
        context.commit(ADD_TO_CART, payLoad);
        resolve('添加购物车成功');
      }
    })
  },
}
