import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//为了方便测试，此处用vuex做全局数据
const store = new Vuex.Store({
	state: {
		userInfo: {},
		isLogin: false,
		token: 'takein',
	},
	mutations: {
		SET_USERINFO(state, userInfo) {
			state.userInfo = userInfo
		},
		SET_ISLOGIN(state, isLogin) {
			state.isLogin = isLogin
		},
		SET_TOKEN(state, token) {
			state.token = token
		},
	}
})

export default store
