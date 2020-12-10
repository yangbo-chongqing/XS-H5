<template>
	<div>
		<div class="container" v-if="relicsInfo.info">
			<!-- 顶部展示加音乐或视频播放开始 -->
			<div class="app-video-box" v-if="videoObj.videoUrl">
				<!-- <div class="app-video-box" v-if="{{videoObj.videoUrl}}"> -->
				<div class="com-video">
					<div class="v-image-audio" @click="playAudio" v-if="audioObj.src">
						<img src="@/assets/img/viuplay1.png" v-if="playFlag" />
						<img src="@/assets/img/viuplay1.png" v-else />s
						<audio :src="audioObj.src" id="myaudiof" bindended="myaudiofend"></audio>
					</div>
					<div class="video-play-btn" v-if="videoFlag" @click="playVideo">
						<van-icon name="play-circle-o" size="80" />
					</div>
					<video id="myVideo" class="my-video" autoplay="true" @click="playVideo" bindpause="myvideopause" :src="videoObj.videoUrl" bindplay="videoPause" controls="false" loop="true"></video>
				</div>
			</div>
			<div class="v-image-box" v-else>
				<img class="v-image" mode="widthFix" :src="relicsInfo.info.image" />
				<div class="v-image-audio" @click="playAudio" v-if="audioObj.src">
					<img src="@/assets/img/viuplay1.png" v-if="playFlag" />
					<img src="@/assets/img/viuplay1.png" v-else />
					<audio :src="audioObj.src" id="myaudiof"></audio>
				</div>
			</div>
			<!-- 顶部展示加音乐或视频播放结束 -->
			<!-- 中间企业信息介绍开始 -->
			<div class="app-info-box">
				<div class="app-info-title">{{relicsInfo.info.name}}
					<div class="app-info-link" v-if='relicsInfo.info.is_like == 0' @click="linkFn">
						<van-icon size="25" name="good-job-o" />{{relicsInfo.info.likes>0?relicsInfo.info.likes:''}}</div>
					<div class="app-info-link active" v-else @click="linkFn">
						<van-icon size="25" name="good-job-o" />{{relicsInfo.info.likes}}</div>
				</div>
				<p class="app-info-text" v-if="relicsInfo.info.introduction">
					{{relicsInfo.info.introduction}}
				</p>
				<div class="app-info-tips" v-for="item in relicsInfo.info.property" :key='item.id'>
					<div class="app-info-tips-item">
						<div class="app-info-tips-item-lab">{{item.title}}</div>
						<div class="app-info-tips-item-title">{{item.content}}</div>
					</div>
				</div>
			</div>
			<!-- 中间企业信息介绍结束 -->
			<!-- 中间显示后台传递dom开始 -->
			<div v-html="con" id="vcon" class="vcon"></div>
			<!-- 中间显示后台传递dom结束 -->
			<!-- 弹幕开始 -->
			<div class="doommdiv">
				<div v-for="item in doommData" :key="item.id">
					<p v-if="item.display" class="aon" :style="`animation: first ${item.time}s linear forwards;top:${item.top}%;color:${item.color};`">
						{{item.text}}
					</p>
				</div>
			</div>
			<!-- 弹幕结束 -->
			<!-- 连接相关开始 -->
			<div class="liner" v-if="relicsInfo.info.related_list.length>0"></div>
			<div class="app-info-jump" v-if="relicsInfo.info.related_list.length>0">
				<div class="app-info-title1">
					<div class="app-info-title-img">
						<div class="app-info-title-left">
							<img src="@/assets/img/info-jump.png" />
							<div class="app-info-titles">连接相关</div>
							<div class="app-info-texts">探索万物之间的联系</div>
						</div>
					</div>
				</div>
				<div class="app-info-jump-list">
					<!-- <pro-swiper swiper-obj="{{relicsInfo.info.related_list}}" type="s1"></pro-swiper> -->
					<vs :swiperObj="relicsInfo.info.related_list" />
				</div>
			</div>
			<!-- 连接相关结束 -->
			<!-- 中间部分开始 -->
			<div class="liner" v-if="relicsInfo.info.unofficial.length>0"></div>
			<div class="app-info-jump" v-if="relicsInfo.info.unofficial.length>0">
				<div class="app-info-title1">
					<div class="app-info-title-img">
						<div class="app-info-title-left">
							<img src="/images/icons/info-ta.png" />
							<div class="app-info-titles">TA说</div>
							<div class="app-info-texts">发现背后的故事</div>
						</div>
					</div>
					<div class="app-info-title-jump" bindtap="jumpList" v-if="relicsInfo.info.history_count>3">全部
						<van-icon name="arrow" />
					</div>
				</div>
				<div class="app-info-ta-list">
					<div class="app-info-ta-item" v-for="item in relicsInfo.info.history_list" :key="item.id" @click="openToggleData">
						<div class="app-info-ta-title">
							<div class="app-info-ta-title-left">
								<!-- <image mode="widthFix" src="/images/icons/info-jump.png"></image> -->
								<div class="app-info-jump-item-text">{{item.name}}</div>
							</div>
							<div class="app-div-head-muic" v-if="item.voice_url">
								<div class="app-audio-box" @click.stop="playAudioList">
									<van-icon name="play-circle-o" v-if="item.playFlag" size="20" />
									<van-icon name="pause-circle-o" v-else size="20" />
									语言简介
								</div>
								<audio :src="item.voice_url" id="`myAudio${index}`" loop></audio>
							</div>
						</div>
						<div class="app-info-ta-body">
							<div class="app-info-ta-body-info">
								<div class="app-info-ta-body-text">{{item.introduction}}</div>
								<div class="app-info-ta-body-tips">
									<div>{{item.create_time}}</div>
									<!-- <div>阅读 333</div><div>
									<van-icon name="good-job-o" />20</div> -->
								</div>
							</div>
							<div class="app-info-ta-body-image">
								<img :src="`${item.image}`" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 中间部分结束 -->
			<div class="liner"></div>
			<div class="app-info-title1">
				<div class="app-info-title-img">
					<div class="app-info-title-left">
						<img src="@/assets/img/info-pl.png" />
						<div class="app-info-titles">评论</div>
					</div>
				</div>
			</div>
			<!-- 评论区域开始 -->
			<div class="pl-body">
				<!-- <div class="pl-title-text">全部156条评论</div> -->
				<!-- <div class="scroll-pl-box" scroll-y="true" scroll-top="{{scrollTop}}" bindscrolltolower="RelicsCommentList"> -->
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="RelicsCommentList">
					<div class="pl-cont-body">
						<div class="app-pl-list">
							<div class="app-pl-list-item" v-for="item in commentList" :key="item.id">
								<div class="app-pl-list-item-media">
									<img :src="item.user_info.avatar" />
								</div>
								<div class="app-pl-list-item-body">
									<div class="app-pl-list-item-info">
										<div class="app-pl-list-item-user">
											<p class="app-pl-user">{{item.user_info.nickname}}</p>
											<p v-if="item.official==1" class="app-pl-tip">官方</p>
										</div>
									</div>
									<div class="app-pl-list-item-cont">
										<div v-if="item.comment">{{item.comment}}</div>
										<div v-if="item.image">
											<div class="pl-images-box">
												<img class="pl-images" v-for="item in item.image" :key="item.id" @click="predivMedia" :src="item.imgItem" />
											</div>
										</div>
										<div v-if="item.voice">
											<div class="app-pl-voice" @click="plplayAudio">
												<img src="@/assets/img/playly-icon.png" />
												<p>{{item.duration}}</p>
											</div>
										</div>
									</div>
									<div class="app-pl-list-item-item">
										<div class="pl-time">{{item.create_time}}</div>
										<div class="pl-tips">
											<div class="app-pl-item-link" style="`color:${item.is_like==0?'':'#5287fd'}`" @click="CommentLike">
												<van-icon name="good-job-o" />
												{{item.likes>0?item.likes:''}}
											</div>
											<div class="pl-hf" @click="hfSetFocus">
												<van-icon name="chat-o" />
											</div>
										</div>
									</div>
									<div class="pl-hf-body" v-if="item.list.length>0">
										<div class="app-pl-hf-item" v-for="itemlist in item.list" :key="itemlist.id">
											<div class="app-pl-hf-item-media">
												<img :src="itemlist.user_info.avatar" />
											</div>
											<div class="app-pl-hf-item-body">
												<div class="app-pl-hf-item-info">
													<div class="app-pl-list-item-user">
														<p class="app-pl-user">{{itemlist.user_info.nickname}}</p>回复<p class="app-pl-user">{{itemlist.reply_user_info.nickname}}</p>
													</div>
												</div>
												<div class="app-pl-list-item-cont">
													<div class="app-pl-list-item-cont">
														<div v-if="itemlist.comment">{{itemlist.comment}}</div>
														<div v-if="itemlist.image">
															<div class="pl-images-box">
																<img class="pl-images" v-for="item in itemlist.image" :key="item.id" @click="predivMedia" :src="item.imgList" />
															</div>
														</div>
														<div v-if="itemlist.voice">
															<div class="app-pl-voice" @click="plplayAudio">
																<img src="@/assets/img/playly-icon.png" />
																<p>{{item.duration}}</p>
															</div>
														</div>
													</div>
												</div>
												<div class="app-pl-list-item-item1">
													<div class="pl-time">{{itemlist.create_time}}</div>
													<div class="pl-tips">
														<div class="app-pl-item-link" style="`color:${itemlist.is_like==0?'':'#ea7152'}`" @click="CommentLike">
															<van-icon name="good-job-o" />
															{{itemlist.likes>0?itemlist.likes:''}}
														</div>
														<div class="pl-hf" @click="hfSetFocus">
															<van-icon name="chat-o" />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="no-data" v-if="!is_getListFlag">没有更多了~</div> -->
				</van-list>
				<div class="pl-input-body" style="`bottom:${inputHeight}px`">
					<div class="pl-send-text"><input adjust-position="false" class="weui-input" value="comment" confirm-type="send" focus="autoFocus" @confirm="RelicsComment" @focus="isauthor" @blur="blurInput" placeholder="placeholder" /></div>
					<div class="pl-send-img" @click="uploadImg">
						<img src="@/assets/img/img-icon.png" />
					</div>
					<div class="pl-send-ly" bindtap="showPopup">
						<img src="@/assets/img/ly-icon.png" />
					</div>
				</div>
				<van-popup round position="bottom" custom-style="height:400rpx" show="plShow" @touchmove.stop='true' @close="onClose">
					<div class="ly-body">
						<div class="ly-title" v-if="lyFlag==0">
							点击录音,最长5分钟请保持屏幕常亮
						</div>
						<div class="ly-title" v-if="lyFlag==1">
							<img src="@/assets/img/ly.gif" />
							<p>{{timeNumber}}</p>
							<img src="@/assets/img/ly.gif" />
						</div>
						<div class="ly-icon-btn">
							<img v-if="lyFlag==0" @click="startLy" src="@/assets/img/ly-state-icon.png" />
							<img v-if="lyFlag==1" @click="endLy" src="@/assets/img/ly-state-icon.png" />
						</div>
					</div>
				</van-popup>
			</div>
			<!-- 评论区域结束 -->
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	import vs from '@/components/proswiper/vs.vue'
	export default {
		components: {
			vs
		},
		data() {
			return {
				postdata: {
					relics_id: 58
				},
				arr: [],
				relicsInfo: [],
				svideoObj: '',
				audioObj: '',
				playFlag: true,
				con: '',
				is_getListFlag: true,
				plpage: 1,
				plpage_size: 10,
				reply_id: '',
				relics_id: '58',
				commentList: [],
				loading: false,
				finished: false
			}
		},
		created() {
			let routeId = this.getQueryVariable('id')
			if (routeId != false) {
				this.$set(this.postdata, "relics_id", routeId)
			}
			this.getRelicsInfo().then(() => {
				this.RelicsCommentList()
			})
		},
		updated() {
			let obj = document.getElementById('vcon')
			let imgs = obj.getElementsByTagName('img')
			for (let i = 0; i < imgs.length; i++) {
				imgs[i].style.width = "100%"
			}
		},
		methods: {
			getQueryVariable(variable) {
				let href = window.location.href
				let query = href.substring(href.indexOf('?') + 1);
				let vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					let pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			trim(s) {
				return s.replace(/(^\s*)|(\s*$)/g, "");
			},
			//数组去重
			unique(arr) {
				const res = new Map();
				return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
			},
			//特殊转化分秒
			formate(endTime) {
				let secondTime = parseInt(endTime); //将传入的秒的值转化为Number
				let min = parseInt(secondTime / 60); //获取分钟，除以60取整数，得到整数分钟
				secondTime = parseInt(secondTime % 60); //获取秒数，秒数取佘，得到整数秒数
				return min + "'" + secondTime + '"';
			},
			getRelicsInfo() {
				return this.$http({ //函数内部调用函数 传参为对象形式
					url: "/api/Home/RelicsInfo", //请求地址
					data: this.postdata, //请求数据
					IS: false //是否需要弹框提示
				}).then(resa => { //这里可以继续then->res
					let res = JSON.parse(JSON.stringify(resa.data))
					// if (res.data.info.muse_id) {
					// 	app.globalData.muse_id = res.data.info.muse_id;
					// } else {
					// 	app.globalData.muse_id = 1;
					// }
					if (res.data.info.history_list.length > 0) {
						// eslint-disable-next-line
						res.data.info.history_list.map((item, index) => {
							item.playFlag = true;
						})
					}
					let videoObj = {
						videoUrl: res.data.info.video_url,
						poster: `${res.data.info.video_url}?vframe/jpg/offset/0/w/420/h300`,
						videoTitle: res.data.info.name,
						videogk: `${res.data.info.watch_number}人已观看`,
					}
					let audioObj = {};
					if (res.data.info.voice_url) {
						audioObj = {
							audioImg: res.data.info.image,
							name: res.data.info.name,
							author: res.data.info.name,
							currentTime: 0,
							duration: res.data.info.duration,
							src: res.data.info.voice_url,
						}
					}
					if (res.data.comment_list.length > 0) {
						let arr1 = []
						res.data.comment_list.map((item) => {
							arr1.push(item.comment);
						})
						this.arr = JSON.parse(JSON.stringify(arr1))
					}
					res.data.info.content = this.trim(res.data.info.content);
					// this.setData({
					// 	relicsInfo: res.data,
					// 	videoObj: videoObj,
					// 	audioObj: audioObj
					// })
					this.relicsInfo = JSON.parse(JSON.stringify(res.data))
					this.videoObj = JSON.parse(JSON.stringify(videoObj))
					this.audioObj = JSON.parse(JSON.stringify(audioObj))
					// wx.setNavigationBarTitle({
					// 	title: res.data.info.name,
					// })
					if (audioObj.src) {
						// this.creatAudio();
						// let myaudio = wx.createAudioContext('myaudiof')
						// myaudio.play();
						// this.setData({
						// 	playFlag: false
						// })
					}
					if (res.data.info.content) {
						// eslint-disable-next-line
						var article = res.data.info.content;
						this.con = JSON.parse(JSON.stringify(res.data.info.content))
						// WxParse.wxParse('article', 'html', article, that, 5);
					}
				})
			},
			//评论列表
			RelicsCommentList() {
				if (this.is_getListFlag) {
					let parmas = {
						page: this.plpage,
						page_size: this.plpage_size,
						relics_id: this.relics_id,
						reply_id: this.reply_id
					}
					return this.$http({ //函数内部调用函数 传参为对象形式
						url: "/api/Home/RelicsCommentList", //请求地址
						data: parmas, //请求数据
						IS: false //是否需要弹框提示
					}).then(resa => { //这里可以继续then->res
						// wx.setNavigationBarTitle({
						// 	title: `全部${res.data.comment_count}条评论`,
						// })
						let res = JSON.parse(JSON.stringify(resa.data))
						let arr = this.commentList.concat(res.data.list);
						arr = this.unique(arr);
						
						arr.map((item) => {
							item.duration = this.formate(item.duration);
						})
						this.commentList = JSON.parse(JSON.stringify(arr))
						if (res.data.list.length < this.plpage_size) {
							is_getListFlag: false,
							this.finished = true;
						} else {
							this.plpage = this.plpage + 1
						}
					})
				}
			},
			// temp animation-timing-function
			playAudio () {},
			linkFn () {},
			doommData () {},
			CommentLike () {},
			hfSetFocus () {},
			itemlist() {},
			lyFlag () {},
			onClose() {},
			uploadImg() {},
			blurInput() {},
			isauthor() {},
			RelicsComment () {},
			RelicsComment() {}
		}
	}
</script>

<style scoped="scoped">
	/* pages/apprecinfo/apprecinfo.wxss */
	/* @import "../../utils/wxParse/wxParse.wxss"; */

	.app-video-box {
		width: 100%;
		height: 420px;
		position: relative;
		display: flex;
	}

	page {
		padding-bottom: 100px;
		box-sizing: border-box;
	}

	.wxParse-p {
		margin-bottom: 40px;
		color: #333;
		line-height: 180%;
	}

	.wxParse-blockquote {
		margin-bottom: 40px;
	}

	.wxParse-img {
		max-width: 100% !important;
		max-height: 100% !important;
		margin: auto;
	}

	.wxParse-a {
		color: #333;
		border-bottom: 2px solid #a8c3fe;
	}

	.wxParse-h1 {
		font-size: 60px;
	}

	.wxParse-h2 {
		font-size: 50px;
	}

	.wxParse-h3 {
		font-size: 40px;
	}

	.wxParse-h4 {
		font-size: 30px;
	}

	.app-info-box {
		width: 100%;
		padding: 40px;
		/* height: 600px; */
		height: auto;
		overflow: hidden;
		position: relative;
		box-sizing: border-box;
	}

	.app-info-box1 {
		width: 100%;
		padding: 40px;
		position: relative;
		box-sizing: border-box;
	}

	.open-div {
		position: absolute;
		right: 40px;
		bottom: 30px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid #999;
		background: #fff;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
	}

	.app-info-htmlCont {
		width: 100%;
		padding: 0 40px 40px 40px;
		box-sizing: border-box;
	}

	.open-icon-tap {
		display: flex;
		justify-content: center;
		font-size: 50px;
		color: #999;
		padding: 40px;
		box-sizing: border-box;
	}

	.app-info-jump {
		width: 100%;
	}

	.app-info-title1 {
		width: 100%;
		height: 120px;
		border-bottom: 1px solid #cccccc;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40px;
		box-sizing: border-box;
	}

	.app-info-title-left {
		display: flex;
		height: 120px;
		align-items: center;
	}

	.app-info-title-left img {
		width: 46px;
		height: 46px;
	}

	.app-info-titles {
		font-size: 40px;
		color: #5287fd;
		font-weight: bold;
		margin-left: 10px;
	}

	.app-info-texts {
		font-size: 28px;
		color: #999;
		margin-left: 10px;
		margin-top: 15px;
	}

	.app-info-title-jump {
		color: #666666;
		font-size: 30px;
		display: flex;
		align-items: center;
	}

	.app-info-jump-list {
		padding: 20px 40px;
		box-sizing: border-box;
		width: 100%;
	}

	.app-info-jump-item {
		width: 50%;
		padding-right: 20px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin: 10px 0;
	}

	.app-audio-box {
		width: 150px;
		height: 50px;
		color: white;
		display: flex;
		align-items: center;
		background: #5287fd;
		border-radius: 999px;
		font-size: 26px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 10px;
	}

	.app-info-ta-list {
		padding: 20px 40px;
		box-sizing: border-box;
	}

	.app-info-ta-item {
		width: 100%;
		padding-bottom: 20px;
		box-sizing: border-box;
		border-bottom: 1px solid #ccc;
		margin-bottom: 20px;
	}

	.app-info-ta-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.app-info-ta-body {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.app-info-ta-body1 {
		margin-top: 10px;
	}

	.app-info-ta-body-info {
		width: 420px;

	}

	.app-info-ta-body1 .app-info-ta-body-info {
		width: 100%;
	}

	.app-info-ta-body1 .app-info-ta-body-image {
		width: 100%;
		height: 160px;
		display: flex;
		margin-top: 20px;
	}

	.app-info-ta-body1 .app-info-ta-body-image img {
		margin-right: 10px;
	}

	.app-info-ta-body-text {
		font-size: 32px;
		color: #999;
		line-height: 150%;
	}

	.app-info-ta-body-tips {
		display: flex;
		justify-content: space-between;
		color: #999;
		margin-top: 10px;

	}

	.app-info-ta-body-image {
		width: 220px;
		height: 160px;
	}

	.app-info-ta-body-image img {
		width: 220px;
		height: 160px;
		border-radius: 10px;
	}

	.app-info-ta-title-left {
		display: flex;
		align-items: center;
	}

	.app-info-ta-title-left img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.app-info-jump-item-text {
		color: #333;
		font-weight: bold;
	}

	.app-info-jump-item img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-right: 20px;
	}

	.app-info-jump-item-text {
		font-size: 36px;
		color: #333;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.app-info-ta-body-tips div {
		display: flex;
		align-items: center;
	}

	.com-video {
		width: 100vw;
		position: relative;
	}

	.my-video {
		width: 100%;
		height: 420px;
	}

	.app-video-text {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 10px 40px;
		box-sizing: border-box;
	}

	.app-video-title {
		font-size: 38px;
	}

	.app-video-textj {
		font-size: 28px;
		margin-top: 10px;
	}

	.app-video-textj text {
		margin-right: 40px;
	}

	.app-info-title {
		font-size: 40px;
		font-weight: 600;
		display: flex;
		justify-content: space-between;
	}

	.app-info-link {
		height: 60px;
		font-size: 35px;
		padding: 0px 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: normal;
		color: #999999;
	}

	.app-info-link.active {
		color: #5287fd;
	}

	.app-info-text {
		margin: 20px 0;
		line-height: 55px;
		color: #333;
	}

	.app-info-tips {
		margin-top: 50px;
	}

	.v-image-box {
		width: 100%;
		position: relative;
	}

	.v-image-audio {
		position: absolute;
		left: 40px;
		bottom: 40px;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.v-image-audio img {
		width: 60px;
		height: 55px;
	}

	.v-image {
		width: 100%;
	}

	.app-info-tips-item {
		display: flex;
		margin-bottom: 20px;
	}

	.app-info-tips-item-lab {
		margin-right: 50px;
		width: 160px;
		font-weight: 600;
		color: #999;
	}

	.app-info-tips-item-title {
		width: 400px;
		color: #333;
	}

	.vcon {
		width: 100%;
		padding: 0 40px 40px 40px;
		box-sizing: border-box;
	}

	.liner {
		width: 100%;
		height: 20px;
		background: #f5f5f5;
	}

	.pro-audio {
		display: flex;
		position: relative;
		width: 100%;
		height: 80px;
		justify-content: space-between;
		align-items: center;
		background: #5287fd;
		padding: 0 20px;
		box-sizing: border-box;
		border-radius: 999px;
	}

	.pro-audio-radios {
		width: 120px;
		height: 120px;
		border: 2px solid #ea7152;
		border-radius: 50%;
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.pro-audio-play-btn {
		font-size: 60px;
		color: #fff;
	}

	.pro-audio-img,
	.pro-audio-play-btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pro-audio-pross {
		width: 380px;
	}

	.pro-audio-durtime {
		color: #fff;
	}

	.pro-slider-box {
		width: 380px;
		display: flex;
		justify-content: center;
	}

	.pro-audio-pross-bg {
		width: 380px;
		position: relative;
	}

	.pro-audio-pross-bg-img {
		width: 380px;
		height: 30px;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(0, -50%);
		z-index: 100;
		pointer-events: none;
	}

	.pro-audio-pross-name {
		margin-bottom: 30px;
		display: flex;
		justify-content: space-between;
	}

	.pro-audio-time {
		font-size: 28px;
		color: #999;
	}

	.custom-button {
		background: #ea7152;
		border-radius: 999px;
		padding: 5px 10px;
		font-size: 24px;
		color: white;
	}

	.van-slider {
		background: url(/images/icons/slider.png) left;
	}

	/**index.wxss**/
	.button {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.aon {
		position: absolute;
		white-space: nowrap;
		/* 防止向下换行*/
		animation-timing-function: linear;
		animation-fill-mode: none;
	}

	.doommdiv {
		z-index: 3;
		height: 600px;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		overflow: hidden;
	}

	@keyframes first {
		from {
			left: 100%;
		}

		to {
			left: -100%;
		}
	}

	.app-pl-list {
		width: 100%;
	}

	.app-pl-list-item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.app-pl-list-item-media {
		width: 80px;
		height: 80px;
	}

	.app-pl-hf-item-media {
		width: 60px;
		height: 60px;
	}

	.app-pl-hf-item-media img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.app-pl-list-item-media img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}

	.app-pl-list-item-body {
		width: 570px;
	}

	.app-pl-list-item-info {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.no-data {
		text-align: center;
		color: #999;
		padding: 20px;
		box-sizing: border-box;
	}

	.app-pl-user {
		font-size: 26px;
		color: #999;
	}

	.app-pl-tip {
		font-size: 24px;
		color: #ea7152;
		border: 1px solid #ea7152;
		border-radius: 999px;
		padding: 0 5px;
		margin-left: 10px;
	}

	.app-pl-item-link {
		font-size: 28px;
		color: #999;
		display: flex;
	}

	.app-pl-list-item-cont {
		font-size: 30px;
		color: #333;
		margin-top: 10px;
	}

	.app-pl-text {
		color: #999;
		font-weight: 600;
		padding-left: 100px;
		box-sizing: border-box;
	}

	.app-pl-input {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		background: white;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 10px 40px;
		box-sizing: border-box;
		border-top: 1px solid #ccc;
	}

	.video-play-btn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
		color: white;
	}

	.app-pl-input-user {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}

	.app-pl-input-body {
		width: 570px;
		height: 70px;
		border-radius: 999px;
		border: 1px solid #ccc;
		line-height: 70px;
		text-indent: 20px;
		color: #ccc;
		font-size: 28px;
	}

	.app-pl-list {
		width: 100%;
	}

	.app-pl-voice {
		width: 250px;
		height: 60px;
		background: #5287fd;
		border-radius: 999px 999px 999px 0;
		display: flex;
		align-items: center;
		padding: 0 20px;
		box-sizing: border-box;
	}

	.app-pl-voice img {
		width: 25px;
		height: 30px;
	}

	.pl-images-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.pl-images {
		width: 150px;
		height: 150px;
		flex-shrink: 0;
		margin-right: 10px;
	}

	.app-pl-voice text {
		color: white;
		margin-left: 20px;
	}

	.app-pl-list-item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.app-pl-list-item-media {
		width: 80px;
		height: 80px;
	}

	.app-pl-hf-item-media {
		width: 60px;
		height: 60px;
	}

	.app-pl-hf-item-media img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.app-pl-list-item-media img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}

	.app-pl-list-item-body {
		width: 570px;
	}

	.app-pl-list-item-info {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.app-pl-user {
		font-size: 26px;
		color: #999;
	}

	.app-pl-tip {
		font-size: 24px;
		color: #ea7152;
		border: 1px solid #ea7152;
		border-radius: 999px;
		padding: 0 5px;
		margin-left: 10px;
	}

	.app-pl-item-link {
		font-size: 28px;
		color: #999;
	}

	.app-pl-list-item-cont {
		font-size: 30px;
		color: #333;
		margin-top: 10px;
	}

	.app-pl-text {
		color: #999;
		font-weight: 600;
		padding-left: 100px;
		box-sizing: border-box;
	}

	.app-pl-input {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		background: white;
	}

	.app-pl-input-user {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}

	.app-pl-input-body {
		width: 570px;
		height: 70px;
		border-radius: 999px;
		border: 1px solid #ccc;
		line-height: 70px;
		text-indent: 20px;
		color: #ccc;
		font-size: 28px;
	}

	.pl-body {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.pl-title-body {
		width: 100%;
		padding: 30px 40px;
		box-sizing: border-box;
		display: flex;
		font-size: 40px;
		font-weight: 600;
		align-items: center;
		color: #333333;
		border-bottom: 1px solid #ccc;
	}

	.pl-title-text {
		margin-left: 60px;
	}

	.pl-cont-body {
		padding: 30px 40px;
		box-sizing: border-box;
	}

	.scroll-pl-box {
		width: 100%;
		height: auto;
		max-height: 100vh;
	}

	.app-pl-list-item-item {
		display: flex;
		justify-content: space-between;
		margin-top: 30px;
		align-items: center;
		border-bottom: 1px solid #ccc;
		padding-bottom: 30px;
	}

	.pl-time {
		font-size: 28px;
		color: #999;
	}

	.pl-tips {
		display: flex;
		color: #999;
		align-items: center;
		font-size: 30px;
	}

	.pl-hf {
		margin-left: 30px;
		display: flex;
		align-items: center;
		font-size: 30px;
	}

	.pl-hf-body {
		padding: 40px 0;
		border-bottom: 1px solid #ccc;
	}

	.app-pl-hf-item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.app-pl-hf-item-media {
		width: 60px;
		height: 60px;
	}

	.app-pl-hf-item-media img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	.app-pl-hf-item-body {
		width: 485px;
	}

	.app-pl-list-item-info {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.app-pl-list-item-item1 {
		display: flex;
		justify-content: space-between;
		margin-top: 30px;
		align-items: center;
	}

	.app-pl-list-item-user {
		font-size: 26px;
	}

	.pl-input-body {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 105px;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40px;
		box-sizing: border-box;
	}

	.pl-send-img {
		font-size: 40px;
	}

	.pl-send-ly {
		width: 40px;
	}

	.pl-send-img {
		width: 45px;
	}

	.pl-send-img img {
		width: 45px;
		height: 40px;
	}

	.pl-send-ly img {
		width: 40px;
		height: 50px;
	}

	.pl-send-text {
		width: 500px;
		height: 80px;
		background: #f5f5f5;
		border-radius: 999px;
	}

	.weui-input {
		width: 500px;
		height: 80px;
		background: #f5f5f5;
		border-radius: 999px;
		padding-left: 20px;
		box-sizing: border-box;
	}

	.ly-body {
		padding: 40px;
		box-sizing: border-box;
	}

	.ly-title {
		display: flex;
		justify-content: center;
		color: #999;
		height: 100px;
	}

	.ly-title image {
		width: 100px;
		height: 40px;
	}

	.ly-title text {
		margin: 0 40px;
		color: #ea7152;
	}

	.no-data {
		text-align: center;
		width: 100%;
		color: #999;
	}

	.ly-icon-btn {
		text-align: center;
	}

	.ly-icon-btn img {
		width: 200px;
		height: 200px;
	}
</style>
