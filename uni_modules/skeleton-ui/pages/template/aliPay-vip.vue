<template>
	<view class="content">
		<sk-container :scroll="true">
			<view class="user-info">
				<view style="padding-right: 200rpx;">
					<sk-list length="1" background="transparent"></sk-list>
				</view>
				
				<view style="margin-top: 20rpx;">
					<sk-tabs background="transparent"></sk-tabs>
				</view>
			</view>
			
			<view class="content-box">
				<view style="padding: 30rpx;">
					<view class="tab-1">
						<sk-tabs background="transparent" length="3" general="#F2F2F2"></sk-tabs>
					</view>
				</view>
				
				<view style="padding: 0 30rpx;">
					<sk-swiper dot="0" height="150rpx"></sk-swiper>
				</view>
				
				<view style="padding: 30rpx;">
					<sk-tabs background="transparent" length="5"></sk-tabs>
				</view>
				
				<view style="padding: 0 30rpx 60rpx 30rpx;">
					<sk-waterfall background="transparent"></sk-waterfall>
				</view>
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
		background-color: var(--prominent);
		padding: 30rpx 30rpx 50rpx 30rpx;
		
		/deep/ .avatar{
			width: 100rpx;
			height: 100rpx;
		}
		
		/deep/ .name{
			margin-bottom: 8rpx;
			height: 28rpx;
		}
	}
	
	.content-box{
		position: relative;
		z-index: 1;
		margin-top: -20rpx;
		border-radius: 16rpx 16rpx 0 0;
		background-color: var(--background);
		
		.tab-1{
			background-color: var(--general);
			padding: 30rpx 30rpx;
			border-radius: 16rpx;
		}
	}
</style>