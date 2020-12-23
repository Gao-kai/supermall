// 1.引入VueRouter插件和Vue组件
import VueRouter from 'vue-router';
import Vue from 'vue';

// 对各模块组件进行懒加载
const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Shopcart = () => import('views/shopcart/Shopcart');
const Profile = () => import('views/profile/Profile');


// 2.安装插件
Vue.use(VueRouter);

// 3.生成router实例 配置路由

const routes = [{
  path: '',
  redirect: '/home'
}, {
  path: '/home',
  component: Home,
}, {
  path: '/category',
  component: Category,
}, {
  path: '/shopcart',
  component: Shopcart,
}, {
  path: '/profile',
  component: Profile,
}, ];

const router = new VueRouter({
  routes,
  mode: 'history',
})

// 4.导出router对象 去main.js入口文件中的Vue根组件上挂载
export default router;
