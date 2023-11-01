<template>
	<view class="container" 
		:style="mixinVariableStr" 
		:class="{
			'safe-area-top':safeAreaTop,
			'safe-area-bottom':safeAreaBottom,
			'scroll':scroll
		}"
	>
		<slot name="default"></slot>
	</view>
</template>

<script>
	import cssVariable from "../mixin/css-variable.js";
	
	export default {
		mixins:[cssVariable],
		props:{
			zIndex:{
				type: Number | String,
				default:"99"
			},
			safeAreaTop:{
				type: Boolean,
				default:false
			},
			safeAreaBottom:{
				type: Boolean,
				default:true
			},
			scroll:{
				type: Boolean,
				default:false
			}
		},
		computed:{
			
		},
		data() {
			return {
				privateVariableKeys:["zIndex"],
			};
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../libs/global.scss";
	
	.safe-area-top{
		padding-top: var(--status-bar-height);
	}
	
	.safe-area-bottom{
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.container{
		position: fixed;
		top: 0;
		top:var(--window-top);
		right: 0;
		bottom: 0;
		bottom: var(--window-bottom);
		left: 0;
		width: auto;
		height: auto;
		z-index: var(--zIndex);
		background-color: var(--background);
		overflow: hidden;
		
		&.scroll{
			overflow-y: auto;
		}
	}
</style>
