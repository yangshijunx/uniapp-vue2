<template>
	<view :style="mixinVariableStr">
		<view class="swiper"
			:style="{
				height:height
			}"
			:class="{
				'round':round
			}"
		>
			<view class="dot h-flex-x h-flex-center"  v-if="dotList && dotList.length > 0" >
				<view v-for="item in dotList" :key="item"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import cssVariable from "../mixin/css-variable.js";
	
	export default {
		mixins:[cssVariable],
		props:{
			height:{
				type: String,
				default:"300rpx"
			},
			round:{
				type: Boolean,
				default:true
			},
			dot:{
				type: Number | String,
				default:"5"
			},
		},
		computed:{
			dotList(){
				let size = Number(this.$props.dot) || 0;				
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
	
	.swiper{
		position: relative;
		background-color: var(--general);
		
		&.round{
			border-radius: 8px;
		}
		
		.dot{
			position: absolute;
			width: 100%;
			z-index: 1;
			left: 0;
			bottom: 16px;
			
			> view{
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background-color: var(--minor);
				
				& + view{
					margin-left: 8px;
				}
			}
		}
	}
</style>
