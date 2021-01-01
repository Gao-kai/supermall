<template>
  <div>
    <nav-bar class="detail-nav-bar">
      <div slot="left" class="back-arrow" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <span v-for="(item, index) in detailTitles" :key="index" class="title-item" @click="titleItemClick(index)" :class="{ active: index === currentIndex }">
          {{ item }}
        </span>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      detailTitles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleItemClick(index) {
      this.currentIndex = index;
      this.$emit('title-item-click', index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.detail-nav-bar {
  position: relative;
}
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.active {
  color: #ff779b;
  font-weight: 600;
}
.back-arrow {
  position: relative;
}
.back-arrow img {
  position: absolute;
  width: 20px;
  top: 12px;
  left: 22px;
}
</style>