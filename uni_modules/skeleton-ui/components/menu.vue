<template>
	<view class="menu" :style="mixinVariableStr">
		<view class="menu-rows h-flex-x" v-for="(item,index) in menuList" :key="index">
			<view class="menu-cols h-flex-item-grow" v-for="(item2,index2) in item" :key="index2">
				<view class="icon" :class="{
					'round':iconRound
				}"></view>
				<view class="text" v-if="showText"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import cssVariable from "../mixin/css-variable.js";
	
	export default {
		mixins:[cssVariable],
		props:{
			// 行数
			rows:{
				type: Number | String,
				default:"2"
			},
			// 列数
			cols:{
				type: Number | String,
				default:"4"
			},
			iconRound:{
				type: Boolean,
				default:true
			},
			showText:{
				type: Boolean,
				default:true
			},
		},
		computed:{
			menuList(){
				let rows = Number(this.$props.rows) || 1;
				let cols = Number(this.$props.cols) || 4;
				
				let [rowsArr,colsArr] = [[],[]];
				for(let i = 0;i<cols;i++){
					colsArr.push(i);
				}
				
				for(let i = 0;i<rows;i++){
					rowsArr.push(colsArr);
				}
				return rowsArr;
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
	
	.menu{
		position: relative;
		background-color: var(--background);
		
		&-rows{
			padding: 12rpx 0;
		}
		
		&-cols{
			padding: 12rpx 0;
		}
		
		.icon{
			width: 72rpx;
			height: 72rpx;
			background-color: var(--general);
			border-radius: 4px;
			margin: 0 auto;
			
			&.round{
				border-radius: 50%;
			}
		}
		
		.text{
			width: 72rpx;
			height: 6px;
			background-color: var(--general);
			margin: 4px auto 0 auto;
			border-radius: 0;
		}
	}
</style>
