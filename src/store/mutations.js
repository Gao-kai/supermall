export default {
  addCounter(state, payLoad) {
    payLoad.count += 1;
  },
  addToCart(state, payLoad) {
    state.cartList.push(payLoad);
  }
}
