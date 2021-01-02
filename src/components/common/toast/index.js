import Toast from "./Toast"

const obj = {};

obj.install = function (Vue) {
  console.log(666);
  // 1.创建组件构造器（构造函数）
  const toastConstructor = Vue.extend(Toast);
  // 2.利用new+组件构造器 创建出来一个组件实例对象
  const toast = new toastConstructor();
  // 3.通过$mount将组件实例对象手动挂载到DOM元素对象上
  toast.$mount(document.createElement('div'));
  // 4.toast.$el也就是toast组件实例的根dom元素 此时就是创建的div
  document.body.appendChild(toast.$el);
  // 5.在Vue的原型上添加一个属性 可以在任何一个组件中直接.$toast直接访问Toast组件
  // 省去引入注册绑定等一系列繁琐的过程
  Vue.prototype.$toast = Toast;
}

export default obj;
