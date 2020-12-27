import axios from 'axios';
export function request(config) {
  // 创建当前项目网络请求实例instance
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  })
  // 设置请求拦截
  //   instance.interceptors.request.use(config => {
  //     console.log(config);
  //     return config;
  //   }, err => {
  //     console.log(err);
  //   })
  // 设置响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log(err);
  });
  // 执行网络请求参数的结果是返回一个Promise实例
  return instance(config);
}
