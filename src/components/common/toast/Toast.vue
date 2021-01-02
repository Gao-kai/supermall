<template>
  <div class="toast" v-show="isShow">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  //   props: {
  //     message: {
  //       type: String,
  //       default: "",
  //     },
  //     isShow: {
  //       type: Boolean,
  //       default: false,
  //     },
  //   },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    showToast(message, duration) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  border-radius: 6px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.8);
}
</style>