/**
 * CSS 变量
 */

const props = {
	// 重要的
	prominent: {
		type: String,
		default: "#C8C8C8"
	},
	// 常规的
	general: {
		type: String,
		default: "#E0E0E0"
	},
	// 次要的
	minor: {
		type: String,
		default: "#F2F2F2"
	},
	// 背景
	background: {
		type: String,
		default: "#FFFFFF"
	}
}
const computed = {
	mixinVariableStr() {
		let keys = ['prominent', 'general', 'minor', 'background'];
		if(this.privateVariableKeys && this.privateVariableKeys.length > 0){
			keys = keys.concat(this.privateVariableKeys);
		}
		let str = keys.map(item => {
			return `--${item}:${this[item]}`
		}).join(";");
		return str;
	}
}

export default {
	props,
	computed
}
