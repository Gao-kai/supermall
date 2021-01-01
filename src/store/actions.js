export default {
  addCart(context, payLoad) {
    // 1.将重复的商品查找出来
    let repeatGoods = null;
    repeatGoods = context.state.cartList.find(item => {
      return item.iid === payLoad.iid;
    });

    // 2.判断商品是否重复
    if (repeatGoods) {
      // repeatGoods.count += 1;
      context.commit('addCounter', repeatGoods);
    } else {
      payLoad.count = 1;
      context.commit('addToCart', payLoad)
    }
  },
}
