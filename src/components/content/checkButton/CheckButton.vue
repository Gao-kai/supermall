<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="" v-show="imgShow">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    imgShow() {
      return this.isChecked ? true : false;
    }
  }
}
</script>
<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #eeeeee;
}
.check-button img {
  width: 100%;
}
.check {
  background-color: seagreen;
  border: 2px solid seagreen;
}
</style>