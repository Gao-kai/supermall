<template>
  <div class="detail-parma-info" v-if="Object.keys(goodsParams).length !== 0">
    <!-- 展示尺寸号码的表格 -->
    <table v-for="(table,tableindex) in goodsParams.paramsSize" :key="tableindex" class="info-size">
      <tr v-for="(tr,trindex) in table" :key="trindex">
        <td v-for="(td,tdindex) in tr" :key="tdindex">{{td}}</td>
      </tr>
    </table>

    <!-- 展示商品厂家材质等信息的表格 -->
    <table class="info-param">
      <tr v-for="(info,index) in goodsParams.paramsInfo" :key="index">
        <td class="info-key">{{info.key}}</td>
        <td class="info-value">{{info.value}}</td>
      </tr>
    </table>

    <!-- 展示参数页的图片 -->
    <div class="info-image" v-if="goodsParams.paramsImage.length !== 0">
      <img :src="goodsParams.paramsImage" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamInfo',
  props: {
    goodsParams: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
}
</script>
<style scoped>
.detail-parma-info {
  padding: 20px 8px 0;
}
/* 顶部 */
.info-size {
  width: 100%;
  border-top: 6px solid #eeeeee;
  border-collapse: collapse;
}

.info-size tr {
  height: 35px;
  /* background-color: rosybrown; */
  text-align: left;
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
}
.info-size tr td:first-child {
  text-align: left;
}
/* 中间 */
.info-param {
  width: 100%;
  border-top: 4px solid #eeeeee;
  border-collapse: collapse;
}
.info-param tr {
  border-bottom: 1px solid #eeeeee;
  /* background-color: burlywood; */
  font-size: 14px;
  height: 35px;
}
.info-param .info-key {
  width: 100px;
}
.info-param .info-value {
  color: #f37194;
}
/* 底部 */
.info-image img {
  width: 100%;
}
</style>