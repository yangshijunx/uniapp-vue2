<template>
	<view class="content">
		<xingqiu-tag></xingqiu-tag>
	</view>
</template>

<script>
	import xingqiuTag from '../../components/xingqiu-tag/xingqiu-tag.vue';
	export default {
		components:{
			xingqiuTag
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

			
		}
	}
</script>

<style>
  .cas{
            display: block;
            border:1px solid;
            margin:auto;
        }
</style>
