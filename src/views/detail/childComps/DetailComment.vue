<template>
  <div class="detail-comment" v-if="Object.keys(commentInfo).length !== 0">
    <!-- 顶部用户评价栏 -->
    <div class="title clearfix">
      <span class="text">用户评价</span>
      <span class="more">更多</span>
    </div>

    <!-- 用户头像及id -->
    <div class="user">
      <img class="avatar" :src="commentInfo.avatar" alt="">
      <span class="uname">{{commentInfo.uname}}</span>
    </div>

    <!-- 用户评论及标签 买家秀图片 -->
    <div class="content">
      <p class="comment-text">{{commentInfo.content}}</p>
      <div class="comment-other">
        <span class="time">{{commentInfo.created | showDate }}</span>
        <span class="color">{{commentInfo.style}}</span>
      </div>
      <div class="comment-image">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>

  </div>
</template>

<script>
import { formatDate } from "common/utils.js"
export default {
  name: 'DetailComment',
  props: {
    commentInfo: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  filters: {
    showDate(value) {
      //   1.利用服务器返回的时间戳生成data对象
      let date = new Date(value * 1000);
      // 2.利用封装的函数formatDate进行时间格式化
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    },
  }
}

</script>
<style scoped>
.detail-comment {
  padding: 0px 8px;
  border-bottom: 6px solid #eeeeee;
  margin-bottom: 6px;
}
.title {
  border-bottom: 1px solid #eeeeee;
  display: flex;
  color: #000;
  padding: 15px 0;
  font-size: 14px;
}
.title span {
  flex: 1;
}
.title span.more {
  position: relative;
  text-align: right;
  margin-right: 20px;
}
.title span.more::after {
  content: "";
  position: absolute;
  top: 4px;
  width: 10px;
  height: 10px;
  border-right: 1px solid #000;
  border-top: 1px solid #000;
  transform: rotate(45deg);
}

.user {
  padding: 15px 0;
}
.avatar {
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}
.uname {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
}

.content {
  color: #6c6c6c;
  font-size: 14px;
}
.comment-text {
  line-height: 20px;
}
.comment-other {
  padding: 10px 0;
  font-size: 12px;
  /* border: 1px solid firebrick; */
}
.comment-other .time {
  margin-right: 8px;
}
.comment-image {
  width: 100%;
  overflow: hidden;
}
.comment-image img {
  width: 70px;
  height: 70px;
  margin-right: 4px;
}
</style>