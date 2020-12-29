import {
  request,
} from "./request"

// 获取详情页banner图的网络请求函数
// 假设这里传入的goodsId是123456 那么执行此函数等于向服务器发送如下GET请求
// baseURL/detail/?iid=123456 也就是请求iid为123456的商品数据
export function getDetailData(goodsId) {
  return request({
    url: '/detail',
    params: {
      iid: goodsId,
    }
  });
}

// 获取详情页推荐商品的网络请求函数
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 封装处理服务器返回的多个商品数据的class类构造函数
export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.lowPrice
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}


// 封装处理服务器返回的多个店铺数据的class类构造函数
export class ShopInfo {
  constructor(ShopInfo) {
    this.shopLogo = ShopInfo.shopLogo;
    this.shopName = ShopInfo.name;
    this.shopFans = ShopInfo.cFans;
    this.shopGoods = ShopInfo.cGoods;
    this.shopSells = ShopInfo.cSells;
    this.score = ShopInfo.score;
  }
}


// 封装处理服务器返回的多个商品参数的class类构造函数
export class GoodsParams {
  constructor(info, rule) {
    this.paramsImage = info.images ? info.images[0] : "";
    this.paramsInfo = info.set;
    this.paramsSize = rule.tables;
  }
}


// 封装处理服务器返回的评论相关数据的class类构造函数
export class CommentInfo {
  // info就是返回的list数组中的第1个对象list【0】
  constructor(info) {
    this.avatar = info.user.avatar;
    this.uname = info.user.uname;
    this.content = info.content;
    this.created = info.created;
    this.style = info.style;
    this.images = info.images ? info.images : '';
  }
}
