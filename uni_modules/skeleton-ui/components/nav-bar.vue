<template>
	<view :style="mixinVariableStr" >
		<view class="placeholder" 
			v-if="fixedTop"
			:class="{
				'safe-area':safeAreaTop
			}"
		></view>
		<view class="container"
			:class="{
				'safe-area':safeAreaTop,
				'fixed':fixedTop
			}"
		>
			<view class="nav-bar h-flex-x" :class="{
				'show-line':showBottomLine
			}">
				<view class="side h-flex-x h-flex-left">
					<view class="block minor" v-if="showLeft"></view>
				</view>
				<view class="h-flex-item-grow h-flex-x h-flex-center">
					<view class="block general"></view>
				</view>
				<view class="side h-flex-x h-flex-right">
					<view class="block general" v-if="showRight"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	/**
	 * NavBar  顶部导航
	 * @description 页面顶部的导航栏。
	 * @tutorial 待完善
	 * 
	 * @property {Boolean}			safeAreaTop			是否开启顶部安全区域 （默认 false ）
	 * @property {Boolean}			fixedTop        	是否开启顶部固定（默认 false ）
	 * @property {String | Number}	zIndex    			固定定位显示层级  （默认 1 ）
	 * @example  <sk-nav-bar></sk-nav-bar>
	 */
	
	import cssVariable from "../mixin/css-variable.js";
	
	export default {
		mixins:[cssVariable],
		props:{
			safeAreaTop:{
				type: Boolean,
				default:false
			},
			fixedTop:{
				type: Boolean,
				default:false
			},
			zIndex:{
				type: Number | String,
				default:"1"
			},
			showBottomLine:{
				type: Boolean,
				default:false
			},
			showLeft:{
				type: Boolean,
				default:true
			},
			showRight:{
				type: Boolean,
				default:false
			},
		},
		computed:{
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	@import "../libs/global.scss";
	
	.placeholder{
		box-sizing: content-box;
		width: 100%;
		height: 88rpx;
	}
	
	.container{
		background-color: var(--background);
	}
	
	.safe-area{
		padding-top: var(--status-bar-height);
	}
	
	.nav-bar{
		width: 100%;
		padding: 0 30rpx;
		height: 88rpx;
		position: relative;
		
		&.show-line::after{
			content: '';
			display: block;
			position: absolute;
			left: 0;
			bottom: 0;
			height: 1px;
			background-color: var(--general);
			width: 100%;
			z-index: 1;
			transform: scaleY(.5);
		}
		
		.side{
			width: 100rpx;
		}
		
		.block{
			border-radius: 0;
			height: 24rpx;
			width: 70%;
		}
		
		.general{
			background-color: var(--general);
		}
		
		.minor{
			background-color: var(--general);
		}
	}
	
	.fixed{
		position: fixed;
		z-index: var(--zIndex);
		top: 0;
		top:var(--window-top);
		left: 0;
		width: 100%;
	}
</style>
