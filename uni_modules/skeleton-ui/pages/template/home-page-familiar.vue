<template>
	<view class="content">
		<sk-container :safeAreaTop="false" :safeAreaBottom="false" :scroll="true">
			<sk-nav-bar :fixedTop="true" :safeAreaTop="true" :showBottomLine="true"></sk-nav-bar>
			<view style="padding: 30rpx;">
				<sk-swiper></sk-swiper>
			</view>
			
			<sk-menu cols="5" ></sk-menu>
			<view style="padding: 30rpx 30rpx 60rpx 30rpx;">
				<sk-waterfall :waterfall="false"></sk-waterfall>
			</view>
			<sk-tab-bar :safeAreaBottom="true" :fixedBottom="true" :showTopLine="true" :bulgeIndex="2"></sk-tab-bar>
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

<style>
	
</style>