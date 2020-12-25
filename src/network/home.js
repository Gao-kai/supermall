import {
  request
} from './request';

//! 封装专门 用于获取大量首页数据 网络请求的函数
export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page,
    }
  })
}
