<template>
  <div class="home-fashion">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" @load="fashionImgLoad" alt="" />
    </a>
  </div>
</template>

<script>
export default {
  name: "HomeFashion",
  data() {
    return {
      isLoad: false,
    }
  },
  methods: {
    fashionImgLoad() {
      if (!this.isLoad) {
        this.$emit('fashionImgLoad');
        this.isLoad = true;
      }
    }
  }
};
</script>
<style scoped>
img {
  width: 100%;
}
</style>   

        