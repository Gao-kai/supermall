<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- <div v-bind:class="{ activeColor: isActive }"> -->
    <div v-bind:style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",

  // 接收父组件App.vue中传递过来的参数
  props: {
    path: String,

    activeColor: {
      type: String,
      default: "#fd7690",
    },
  },

  // data() {
  //   return {
  //     // isActive: true,
  //   };
  // },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },

  methods: {
    // 设置点击之后路由跳转
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 4px 0 2px;
}
/* .active {
  color: #fd7690;
  color: brown;
  font-weight: 700;
} */
</style>