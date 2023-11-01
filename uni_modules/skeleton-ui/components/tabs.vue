<template>
	<view class="tabs h-flex-x" :style="mixinVariableStr">
		<view class="tabs-item" 
			v-for="(item,index) in list" :key="index"
			:class="{'h-flex-item-grow':fill}"
		></view>
	</view>
</template>

<script>
	import cssVariable from "../mixin/css-variable.js";
	
	export default {
		mixins:[cssVariable],
		props:{
			fill:{
				type: Boolean,
				default:true
			},
			length:{
				type: Number | String,
				default:"4"
			},
		},
		computed:{
			list(){
				let size = Number(this.$props.length) || 4;				
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
	
	.tabs{
		padding: 16rpx 0;
		overflow: hidden;
		background-color: var(--background);
		
		&-item{
			position: relative;
			height: 48rpx;
			background-color: var(--general);
			border-radius: 8rpx;
			width: 100rpx;
			flex-shrink:0;
			
			& + & {
				margin-left: 32rpx;
			}
		}
	}
</style>
