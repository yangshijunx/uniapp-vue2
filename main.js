import App from './App'
import store from './store'
import Vue from 'vue'

// 引入:uView-UI
import uView from 'uview-ui';
Vue.use(uView);

const app = new Vue({
	store,
    ...App
})
app.$mount()