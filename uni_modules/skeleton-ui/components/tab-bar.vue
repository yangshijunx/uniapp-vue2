<template>
	<view :style="mixinVariableStr" >
		<view class="placeholder"
			v-if="fixedBottom"
			:class="{
				'safe-area':safeAreaBottom
			}"
		></view>
		<view class="container"
			:class="{
				'safe-area':safeAreaBottom,
				'fixed':fixedBottom
			}"
		>
			<view class="tab-bar h-flex-x" :class="{
				'show-line':showTopLine
			}">
				<view class="h-flex-item-grow h-flex-x h-flex-center"
					v-for="(item,index) in tabBarList" :key="index"
					:class="{
						'bulge':bulgeIndex == index
					}"
				>
					<view>
						<view class="icon" :class="{
							'round':iconRound
						}"></view>
						<view class="text" v-if="showText"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cssVariable from "../mixin/css-variable.js";
	
	export default {
		mixins:[cssVariable],
		props:{
			safeAreaBottom:{
				type: Boolean,
				default:false
			},
			fixedBottom:{
				type: Boolean,
				default:false
			},
			zIndex:{
				type: Number | String,
				default:"1"
			},
			bulgeIndex:{
				type: Number | String,
				default:"-1"
			},
			iconRound:{
				type: Boolean,
				default:true
			},
			length:{
				type: Number | String,
				default:"5"
			},
			showTopLine:{
				type: Boolean,
				default:false
			},
			showText:{
				type: Boolean,
				default:true
			},
		},
		computed:{
			
		},
		data() {
			return {
				privateVariableKeys:["zIndex"],
			};
		},
		computed:{
			tabBarList(){
				let size = Number(this.$props.length) || 5;
				let list = [];
				for(let i = 0;i<size;i++){
					list.push(i);
				}
				return list;
			}
		},
		created() {
			
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../libs/global.scss";
	
	.placeholder{
		box-sizing: content-box;
		width: 100%;
		height: 100rpx;
	}
	
	.container{
		background-color: var(--background);
	}
	
	.safe-area{
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.tab-bar{
		width: 100%;
		padding: 0;
		height: 100rpx;
		position: relative;
		
		&.show-line::before{
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			height: 1px;
			background-color: var(--general);
			width: 100%;
			z-index: 1;
			transform: scaleY(.5);
		}
		
		> view{
			height: 100%;
			position: relative;
			
			&.bulge{
				transform: translateY(-32rpx);
				z-index: 1;
				
				.icon{
					width: 80rpx;
					height: 80rpx;
				}
				
				.text{
					margin-top: 12rpx;
					width: 56rpx;
				}
			}
		}
		
		.icon{
			width: 48rpx;
			height: 48rpx;
			background-color: var(--general);
			border-radius: 8rpx;
			margin: 0 auto;
			
			&.round{
				border-radius: 50%;
			}
		}
		
		.text{
			width: 48rpx;
			height: 8rpx;
			background-color: var(--general);
			margin: 8rpx auto 0 auto;
			border-radius: 0;
		}
	}
	
	.fixed{
		position: fixed;
		z-index: var(--zIndex);
		bottom: 0;
		bottom: var(--window-bottom);
		left: 0;
		width: 100%;
	}
</style>
