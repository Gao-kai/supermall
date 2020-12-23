<template>
  <div class="home-recommend">
    <div v-for="item in recommends" class="home-recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      dafault: function () {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.home-recommend {
  display: flex;
  padding: 15px 0 30px;
  font-size: 14px;
  border-bottom: 10px solid #eeeeee;
}
.home-recommend-item {
  flex: 1;
  text-align: center;
  margin: 0 6px;
}
a {
  display: block;
  width: 100%;
}
img {
  width: 100%;
  margin-bottom: 10px;
}
</style>