<template>
	<view :style="mixinVariableStr" class="waterfall h-flex-x h-flex-2 h-flex-top">
		<view style="padding-right: 16rpx;">
			<view class="item" v-for="(item,index) in leftList" :key="index">
				<view class="img" :style="{
					'height':item.height
				}"></view>
				<view class="name"></view>
				<view class="desc"></view>
			</view>
		</view>
		<view style="padding-left: 16rpx;">
			<view class="item" v-for="(item,index) in rightList" :key="index">
				<view class="img" :style="{
					'height':item.height
				}"></view>
				<view class="name"></view>
				<view class="desc"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import cssVariable from "../mixin/css-variable.js";
	
	export default {
		mixins:[cssVariable],
		props:{
			imgHeight:{
				type: String,
				default:"300rpx"
			},
			waterfall:{
				type: Boolean,
				default:true
			},
			length:{
				type: Number | String,
				default:"10"
			},
		},
		computed:{
			
		},
		data() {
			return {
				leftList:[],
				rightList:[],
			};
		},
		created() {
			this.createList();
		},
		methods:{
			createList(){
				let length = Number(this.$props.length) || 10;
				let height = parseInt(this.$props.imgHeight,10);
				// 校验是否为 rpx 单位
				let isRpx = /rpx/.test(this.$props.imgHeight);
				
				let [leftArr,rightArr] = [[],[]];
				let [leftHeight,rightHeight] = [0,0];
				
				for(let i=0;i<length;i++){
					let nowHeight = height;
					// 开启了瀑布流，则随机生成高度差
					if(this.$props.waterfall){
						// 运算符，用于决定 增加 或 减小 图片的高度
						let operator = Math.random();
						// 生成一个 0 ~ 30 的随机整数，rpx 单位则双倍
						let tempHeight = Math.floor(Math.random()*(isRpx ? 100 : 50));
						if(operator >= 0.5){
							nowHeight+=tempHeight;
						}else{
							nowHeight-=tempHeight;
						}
					}
					// nowHeight = isRpx ? `${nowHeight}rpx` : `${nowHeight}px`;
					
					if(rightHeight < leftHeight){
						rightArr.push({
							height:isRpx ? `${nowHeight}rpx` : `${nowHeight}px`
						});
						rightHeight+=nowHeight;
					}else{
						leftArr.push({
							height:isRpx ? `${nowHeight}rpx` : `${nowHeight}px`
						});
						leftHeight+=nowHeight;
					}
				}
				this.leftList = leftArr;
				this.rightList = rightArr;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../libs/global.scss";
	
	.waterfall{
		background-color: var(--background);
		
		.item{
			position: relative;
			
			& + .item{
				margin-top: 32rpx;
			}
			
			.img{
				background-color: var(--general);
				border-radius: 16rpx;
			}
			
			.name{
				background-color: var(--general);
				margin-top: 12rpx;
				width: 60%;
				height: 24rpx;
				border-radius: 0;
				margin-left: 12rpx;
			}
			
			.desc{
				background-color: var(--general);
				margin-top: 8rpx;
				width: 40%;
				height: 18rpx;
				border-radius: 0;
				margin-left: 12rpx;
			}
		}
	}
</style>
