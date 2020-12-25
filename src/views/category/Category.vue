<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li>1这是数据</li>
      <li>2这是数据</li>
      <li>3这是数据</li>
      <li>4这是数据</li>
      <li>5这是数据</li>
      <li>6这是数据</li>
      <li>7这是数据</li>
      <li>8这是数据</li>
      <li>9这是数据</li>
      <li>10这是数据</li>
      <li>11这是数据</li>
      <li>12这是数据</li>
      <li>13这是数据</li>
      <li>14这是数据</li>
      <li>15这是数据</li>
      <li>16这是数据</li>
      <li>17这是数据</li>
      <li>18这是数据</li>
      <li>19这是数据</li>
      <li>20这是数据</li>
      <li>21这是数据</li>
      <li>22这是数据</li>
      <li>23这是数据</li>
      <li>24这是数据</li>
      <li>25这是数据</li>
      <li>26这是数据</li>
      <li>27这是数据</li>
      <li>28这是数据</li>
      <li>1这是数据</li>
      <li>2这是数据</li>
      <li>3这是数据</li>
      <li>4这是数据</li>
      <li>5这是数据</li>
      <li>6这是数据</li>
      <li>7这是数据</li>
      <li>8这是数据</li>
      <li>9这是数据</li>
      <li>10这是数据</li>
      <li>11这是数据</li>
      <li>12这是数据</li>
      <li>13这是数据</li>
      <li>14这是数据</li>
      <li>15这是数据</li>
      <li>16这是数据</li>
      <li>17这是数据</li>
      <li>18这是数据</li>
      <li>19这是数据</li>
      <li>20这是数据</li>
      <li>21这是数据</li>
      <li>22这是数据</li>
      <li>23这是数据</li>
      <li>24这是数据</li>
      <li>25这是数据</li>
      <li>26这是数据</li>
      <li>27这是数据</li>
      <li>28这是数据</li>
      <li>1这是数据</li>
      <li>2这是数据</li>
      <li>3这是数据</li>
      <li>4这是数据</li>
      <li>5这是数据</li>
      <li>6这是数据</li>
      <li>7这是数据</li>
      <li>8这是数据</li>
      <li>9这是数据</li>
      <li>10这是数据</li>
      <li>11这是数据</li>
      <li>12这是数据</li>
      <li>13这是数据</li>
      <li>14这是数据</li>
      <li>15这是数据</li>
      <li>16这是数据</li>
      <li>17这是数据</li>
      <li>18这是数据</li>
      <li>19这是数据</li>
      <li>20这是数据</li>
      <li>21这是数据</li>
      <li>22这是数据</li>
      <li>23这是数据</li>
      <li>24这是数据</li>
      <li>25这是数据</li>
      <li>26这是数据</li>
      <li>27这是数据</li>
      <li>28这是数据</li>
    </ul>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
// const wrapper = document.querySelector(".wrapper");
const btn = document.querySelector("h3");

export default {
  name: "category",
  components: {
    Bscroll,
  },
  data() {
    return {
      bscroll: null,
    };
  },
  mounted() {
    this.bscroll = new Bscroll(this.$refs.wrapper, {
      probeType: 0,
      pullUpLoad: true,
      pullDownRefresh: true,
      click: true,
    });

    this.bscroll.on("scroll", (position) => {
      // console.log(position);
    });

    this.bscroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      this.bscroll.finishPullUp();
    });

    this.bscroll.on("pullingDown", () => {
      console.log("下拉刷新更多");
      this.bscroll.finishPullDown();
    });
  },
};
</script>





<style scoped>
.wrapper {
  height: 300px;
  background-color: pink;
  overflow: hidden;
}
</style>