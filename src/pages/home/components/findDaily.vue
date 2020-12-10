<template>
	<div class="boxFather">
		<div class="titleBox">
			<span class="tit">每日发现</span>
			<span class="more">更多 ></span>
		</div>
		<div class="content">
			<div v-for="i in 5" class="contentItem">
				<img src="../../../assets/logo.png" />
				<p>三顿半咖啡</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// key: value
			}
		},
	}
</script>

<style scoped="scoped">
	.boxFather {
		padding: 0 15px;
	}
	.titleBox {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.titleBox .tit {
		font-size: 18px;
		font-weight: 600;
	}
	.titleBox .more {
		font-size: 16px;
		color: #999999;
	}
	.content {
		display: flex;
		overflow-x: scroll;
		margin-top: 5px;
	}
	.content::-webkit-scrollbar {
		display: none;
	}
	.contentItem {
		margin-right: 15px;
		border: 1px solid #646566;
	}
	.contentItem img{
		width: 88px;
	}
/* 	.content div {
		float: left;
	} */
</style>
