<template>
	<scroll-view
		class="scroll-refresh-floor" 
		:style="{
			'--win-height': windowHeight + 'px',
			'--win-top': windowTop + 'px',
			'--threshold-size': refresh.thresholdSize + 'px'
		}"
		:scroll-y="!openFloor" 
		:refresher-enabled="refresherEnabled"  
		refresher-default-style="none" 
		:refresher-threshold="refresh.thresholdSize" 
		:refresher-triggered="openFloor" 
		:refresher-background="refreshBackgroundColor" 
		@refresherpulling="refresh.onPulling" 
		@refresherrefresh="refresh.onRefresh" 
		@refresherrestore="refresh.onRestore" 
	>
		<!-- 下拉头部 -->
		<view class="refresh-head refresh-head-hide" :style="{'background-color': refreshBackgroundColor}">
			<!-- 下拉背景图 -->
			<image 
				class="refresh-bg" 
				:class="{'refresh-bg-blur': refreshBackgroundImageBlur}" 
				:src="refreshBackgroundImage" 
				mode="aspectFill"
			></image>
			<!-- 下拉上层 -->
			<view class="refresh-body">
				<!-- 下拉正文 -->
				<scroll-view scroll-y class="refresh-content">
					<slot name="floor"></slot>
				</scroll-view>
				<!-- 下拉文字 -->
				<view class="refresh-text refresh-text-prev" :style="{color: refreshTextColor}">{{ refreshText }}</view>
				<view class="refresh-text refresh-text-next" :style="{color: refreshTextColor}">{{ refreshingText }}</view>
				<view class="refresh-text refresh-text-back" :style="{color: refreshTextColor}" 
					@click="onCloseFloor"
				>{{ refreshedText }}</view>
			</view>
		</view>
		<!-- 正文 -->
		<slot></slot>
	</scroll-view>
</template>

<script module="refresh" lang="wxs">
	// 下拉刷新值
	var thresholdSize = 200

	// 下拉中
	function onPulling(e, ins) {
		// #ifdef H5
		var dy = e.detail.deltaY
		// #endif
		// #ifndef H5
		var dy = e.detail.dy
		// #endif
		
		if (dy <= 0) return
		// 图片透明度
		var opacity = Math.min(dy / thresholdSize, 1)
		ins.selectComponent('.refresh-bg').setStyle({
			opacity: opacity,
		})
		// 前置文字透明度
		ins.selectComponent('.refresh-text-prev').setStyle({
			opacity: 1 - opacity,
		})
		// 后置文字
		var textOpacity = Math.min(dy - thresholdSize, 1)
		ins.selectComponent('.refresh-text-next').setStyle({
			opacity: textOpacity,
		})
		// 图片放大
		if (opacity === 1) {
			var scale = Math.max(dy / (thresholdSize * 1.5), 1)
			ins.selectComponent('.refresh-bg').setStyle({
				transform: "scale(" + scale + ")",
			})
		}
	}
	// 下拉刷新触发
	function onRefresh(e, ins) {
		console.log('刷新触发')
		ins.selectComponent('.refresh-head').removeClass('refresh-head-hide')
		ins.selectComponent('.refresh-head').addClass('refresh-head-show')
		ins.selectComponent('.refresh-text-next').setStyle({
			opacity: 0,
		})
		ins.selectComponent('.refresh-text-back').setStyle({
			opacity: 1,
		})
		ins.selectComponent('.refresh-bg').setStyle({
			transform: "scale(1)",
		})
		ins.callMethod('onOpenFloor')
	}
	// 刷新复位
	function onRestore(e, ins) {
		console.log('刷新复位')
		ins.selectComponent('.refresh-head').removeClass('refresh-head-show')
		ins.selectComponent('.refresh-head').addClass('refresh-head-hide')
		ins.selectComponent('.refresh-text-back').setStyle({
			opacity: 0,
		})
		ins.callMethod('onCloseFloor')
	}
	
	module.exports = {
		thresholdSize: thresholdSize,
		onPulling: onPulling,
		onRefresh: onRefresh,
		onRestore: onRestore,
	}
</script>

<script>
	/**
	 * 下拉进入二楼组件
	 */
	export default {
		props: {
			// 开启下拉 支持动态修改
			refresherEnabled: {
				type: Boolean,
				default: true,
			},
			// 顶部距离 单位px（导航栏高度内部已做处理）
			safeTop: {
				type: Number,
				default: 0,
			},
			// 底部距离 单位px
			safeBottom: {
				type: Number,
				default: 0,
			},
			// 下拉区域背景色
			refreshBackgroundColor: {
				type: String,
				default: '#000',
			},
			// 下拉区域背景图
			refreshBackgroundImage: String,
			// 下拉区域背景图模糊
			refreshBackgroundImageBlur: Boolean,
			// 下拉文字颜色
			refreshTextColor: {
				type: String,
				default: '#fff',
			},
			// 下拉文字
			refreshText: {
				type: String,
				default: '继续下拉',
			},
			refreshingText: {
				type: String,
				default: '释放进入二楼',
			},
			refreshedText: {
				type: String,
				default: '点击返回一楼',
			}
		},
		data() {
			return {
				// 是否打开二楼
				// refresher-triggered 绑定: 可控制返回一楼
				// scroll-y 绑定: 打开二楼期间可禁止scroll-view的滚动
				openFloor: false,
				// scroll-view 组件布局
				windowTop: 0,
				windowHeight: 0,
			}
		},
		created() {
			let { windowTop, windowHeight } = uni.getSystemInfoSync()
			if (this.safeTop > 0) {
				windowTop = windowTop + this.safeTop
				windowHeight = windowHeight - this.safeTop
			}
			if (this.safeBottom > 0) {
				windowHeight = windowHeight - this.safeBottom
			}
			this.windowTop = windowTop
			this.windowHeight = windowHeight
		},
		methods: {
			onOpenFloor() {
				this.openFloor = true
				this.$emit('open')
			},
			onCloseFloor() {
				this.openFloor = false
				this.$emit('close')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-refresh-floor {
		position: fixed;
		left: 0;
		right: 0;
		top: var(--win-top);
		height: var(--win-height);
		z-index: 888;
		.refresh-head {
			// #ifdef H5
			position: relative;
			// #endif
			// #ifndef H5
			position: absolute;
			// #endif
			left: 0;
			z-index: 888;
			width: 100%;
			height: var(--win-height);
			transition: all .3s;
			overflow: hidden;
			.refresh-bg {
				width: 100%;
				height: 100%;
				transition: transform .3s;
			}
			.refresh-bg.refresh-bg-blur {
				filter: blur(10px);
			}
			.refresh-body {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
				.refresh-content {
					height: calc(100% - 50px);
				}
				.refresh-text {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 50px;
					padding-top: 6px;
					box-sizing: border-box;
					font-size: 15px;
					text-align: center;
				}
				.refresh-text.refresh-text-prev {
					opacity: 1;
				}
				.refresh-text.refresh-text-next {
					opacity: 0;
				}
				.refresh-text.refresh-text-back {
					opacity: 0;
				}
			}
		}
		.refresh-head.refresh-head-hide {
			// #ifdef H5
			margin-top: calc(var(--win-height) * -1);
			// #endif
			// #ifndef H5
			top: calc(var(--win-height) * -1);
			// #endif
		}
		.refresh-head.refresh-head-show {
			// #ifdef H5
			margin-top: calc(var(--threshold-size) * -1);
			// #endif
			// #ifndef H5
			top: calc(var(--threshold-size) * -1);
			// #endif
		}
	}
</style>