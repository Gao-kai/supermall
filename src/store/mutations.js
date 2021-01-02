import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-type"

export default {
  [ADD_COUNTER](state, payLoad) {
    payLoad.count += 1;
  },
  [ADD_TO_CART](state, payLoad) {
    payLoad.isChecked = true;
    state.cartList.push(payLoad);
  }
}
