import App from './App'
import store from './store'
import Vue from 'vue'

// 引入:uView-UI
import uView from 'uview-ui';
Vue.use(uView);

// 引入icon-font
import "./static/font/icon/iconfont.css";

// try {
//   function isPromise(obj) {
//     return (
//       !!obj &&
//       (typeof obj === "object" || typeof obj === "function") &&
//       typeof obj.then === "function"
//     );
//   }

//   // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
//   uni.addInterceptor({
//     returnValue(res) {
//       if (!isPromise(res)) {
//         return res;
//       }
//       return new Promise((resolve, reject) => {
//         res.then((res) => {
//           if (res[0]) {
//             reject(res[0]);
//           } else {
//             resolve(res[1]);
//           }
//         });
//       });
//     },
//   });
// } catch (error) { }

Vue.prototype.$u = uView
App.mpType = 'app';
const app = new Vue({
	store,
    ...App
})
app.$mount()