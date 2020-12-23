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

  // computed: {
  //   isActive() {
  //     // 判断当前被点击的组件的path是不是父组件传递过来的path
  // 假设当前点击的是我的，那么this.$route.path就是"/profile"
  //  父组件传递过来的path值也是"/profile" 如果前者中包含后者字符串 那么就返回-1
  //     return this.$route.path.indexOf(this.path);
  //   },
  // },

  methods: {
    itemClick() {
      this.$router.push(this.path);
      // console.log(this.$router);
      // console.log(this.$route);
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