<template>
  <div class="detail-goods-info" v-if="Object.keys(detailGoodsInfo).length !== 0">
    <div class="goods-desc">
      <div class="top-line"></div>
      <div class="desc">{{detailGoodsInfo.desc}}</div>
      <div class="bottom-line"></div>
    </div>

    <div class="detail-key">{{detailGoodsInfo.detailImage[0].key}}</div>

    <div class="goods-image">
      <img :src="item" alt="" v-for="(item,index) in detailGoodsInfo.detailImage[0].list" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailGoodsInfo: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      counter: 0,
      imgLength: 0,
    }
  },
  methods: {
    imgLoad() {
      this.$emit('img-load');
      //   ++this.counter 先给自己自加1 然后将计算的结果拿去对比
      //   意思就是每当有一张图片加载完成触发了load事件，就给counter + 1，然后拿到 + 1的结果和当前数组中的图片个数进行对比
      // if (this.length === ++this.counter) {
      //   this.$emit('img-load');
      // }
    }
  },
  watch: {
    detailGoodsInfo() {
      // 获取图片的个数
      this.imgLength = this.detailGoodsInfo.detailImage[0].list.length;
    }
  }
}

</script>
<style scoped>
.goods-image img {
  width: 100%;
}
.detail-goods-info {
  border-top: 6px solid #eeeeee;
  padding: 0 10px;
}
.goods-desc {
  position: relative;
  margin-top: 15px;
}

.top-line {
  width: 120px;
  height: 10px;
  /* background-color: royalblue; */
  border-bottom: 1px solid #666;
  margin-left: 10px;
  position: relative;
}
.top-line::before {
  content: "";
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #000;
  bottom: 0;
  left: 0;
}
.bottom-line {
  width: 120px;
  height: 10px;
  border-top: 1px solid #666;
  /* background-color: royalblue; */
  position: absolute;
  right: 0;
}
.bottom-line::after {
  content: "";
  width: 6px;
  height: 6px;
  background-color: #000;
  position: absolute;
  top: -6px;
  right: 0;
}
.desc {
  padding: 15px 10px;
}
.detail-key {
  font-weight: 600;
  padding: 10px 8px 20px;
}
</style>