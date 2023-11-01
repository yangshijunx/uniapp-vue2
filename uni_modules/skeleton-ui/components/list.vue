<template>
	<view class="list" :style="mixinVariableStr">
		<view class="list-item h-flex-x" 
			v-for="(item,index) in list" :key="index"
			:class="{'cross-line':showCrossLine}"
		>
			<view class="avatar" :class="{'round':roundAvatar}" v-if="showAvatar"></view>
			<view class="h-flex-item-grow">
				<view class="h-flex-x h-flex-space">
					<view class="name"></view>
				</view>
				<view class="h-flex-x h-flex-space" style="margin-top: 16rpx;" v-if="showDescribe">
					<view class="desc"></view>
				</view>
			</view>
			<view class="arrows" v-if="showArrows"></view>
		</view>
	</view>
</template>

<script>
	import cssVariable from "../mixin/css-variable.js";
	
	export default {
		mixins:[cssVariable],
		props:{
			showAvatar:{
				type: Boolean,
				default:true
			},
			roundAvatar:{
				type: Boolean,
				default:false
			},
			length:{
				type: Number | String,
				default:"10"
			},
			showDescribe:{
				type: Boolean,
				default:true
			},
			// 显示箭头
			showArrows:{
				type: Boolean,
				default:false
			},
			// 显示分割线
			showCrossLine:{
				type: Boolean,
				default:false
			},
		},
		computed:{
			list(){
				let size = Number(this.$props.length) || 10;				
				let list = [];
				for(let i = 0;i<size;i++){
					list.push(i);
				}
				return list;
			}
		},
		data() {
			return {
				
			};
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../libs/global.scss";
	
	.list{
		background-color: var(--background);
		
		&-item{
			position: relative;
			height: 100rpx;
			
			&.cross-line + &{
				border-top-style: solid;
				border-top-width: 1px;
				border-top-color: var(--minor);
			}
		}
		
		.avatar{
			width: 70rpx;
			height: 70rpx;
			background-color: var(--general);
			margin-right: 24rpx;
			border-radius: 8rpx;
			
			&.round{
				border-radius: 50%;
			}
		}
		
		.name{
			background-color: var(--general);
			width: 70%;
			height: 24rpx;
			border-radius: 0;
		}
		
		.desc{
			background-color: var(--general);
			width: 50%;
			height: 18rpx;
			border-radius: 0;
		}
		
		
		.arrows{
			height: 20rpx;
			width: 20rpx;
			border-width: 2px 2px 0 0;
			border-style: solid;
			border-color: var(--general);
			transform: rotate(45deg);
			transform-origin: center;
		}
	}
</style>
