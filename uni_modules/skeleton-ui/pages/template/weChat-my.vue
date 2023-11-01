<template>
	<view class="content">
		<sk-container background="#F2F2F2">
			<view class="user-info">
				<view style="padding-right: 200rpx;">
					<sk-list length="1" ></sk-list>
				</view>
			</view>
			
			<view class="list-box" style="margin: 20rpx 0;">
				<sk-list length="1" :showDescribe="false" showArrows></sk-list>
			</view>
			<view class="list-box">
				<sk-list length="4" :showDescribe="false" showArrows showCrossLine></sk-list>
			</view>
			<view class="list-box" style="margin: 20rpx 0;">
				<sk-list length="1" :showDescribe="false" showArrows></sk-list>
			</view>
		</sk-container>
	</view>
</template>

<script>
	// 
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.user-info{
		background-color: #fff;
		padding: 50rpx 30rpx;
		
		/deep/ .avatar{
			width: 100rpx;
			height: 100rpx;
		}
		
		/deep/ .name{
			margin-bottom: 8rpx;
			height: 28rpx;
		}
	}
	.list-box{
		padding-left: 30rpx;
		background-color: #fff;
		
		/deep/ .list-item{
			padding-right: 30rpx;
		}
		
		/deep/ .name{
			width: 100rpx;
		}
	}
</style>