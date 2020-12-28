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

// 封装处理服务器多个数据的class类构造函数
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
