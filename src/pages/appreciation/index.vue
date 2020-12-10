<template>
	<div>
		<div class="app-div-imgs">
			<img :src="homeInfo.head" style="width: 100%;">
		</div>
		<div class="app-div-head">
			<div class="app-div-head-body">
				<div class="app-div-head-logo">
					<img :src="homeInfo.logo">
				</div>
				<div class="app-div-head-info">
					<div class="app-div-head-title">{{homeInfo.muse_name}}</div>
					<div class="app-div-head-muic" v-if="homeInfo.voice_url">
						<div class="app-audio-box" @click="playAudio">
							<van-icon name="play-circle-o" v-if="playFlag" size="20" />
							<van-icon name="pause-circle-o" v-else size="20" />
							语言简介
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="app-video-box">
			<div class="com-video" v-if="videoObj.videoUrl">
				<div class="video-play-btn" v-if="videoFlag.isplay" @click="playVideo">
					<van-icon name="play-circle-o" size="80" />
				</div>
				<video id="myVideo" class="my-video" @click="playVideo" :src="videoObj.videoUrl" autoplay="autoplay" muted="muted" loop="true"></video>
				<!-- <div class="app-video-text" v-if="{{videoFlag}}">
					<div class="app-video-title">{{videoObj.videoTitle}}</div>
					<div class="app-video-textj" v-if="{{videoObj.videoText}}">{{videoObj.videoText}}</div>
					<div class="app-video-textj" v-if="{{videoObj.videogk}}"><text>{{videoObj.videogk}}</text><text>{{videoObj.time}}</text></div>
				</div> -->
			</div>
		</div>
		<div class="app-data-box">
			<div v-for="item in homeData" :key="item.id">
				<titleBox :titleObj="item.titles" />
				<prolist :listObj="item.list" />
			</div>
		</div>
	</div>
</template>

<script>
	// import http from '@/'
	import prolist from '@/components/prolist/index.vue'
	import titleBox from '@/components/title/index.vue'

	export default {
		components: {
			prolist,
			titleBox
		},
		data() {
			return {
				videoFlag: {
					isplay: false
				},
				postdata: {
					muse_id: 4
				},
				homeData: [],
				homeInfo: '',
				videoObj: {
					videoUrl: '',
					poster: "",
					videoTitle: "",
					videoText: ""
				}
			}
		},
		created() {
			Promise.all(
				this.getMuseIndex()
			)
		},
		methods: {
			getMuseIndex() {
				return this.$http({ //函数内部调用函数 传参为对象形式
					url: "/api/Home/MuseIndex", //请求地址
					data: this.postdata, //请求数据
					IS: false //是否需要弹框提示
				}).then(resa => { //这里可以继续then->res
					let res = JSON.parse(JSON.stringify(resa.data))
					let videoObj = {
						videoUrl: res.data.info.video_url,
						poster: `${res.data.info.video_url}?vframe/jpg/offset/0/w/420/h300`,
						videoTitle: res.data.info.muse_name,
						videoText: res.data.info.address
					}
					res.data.list.map((item) => {
						item.titles = {
							id: item.id,
							title: item.type_name,
							ishflag: item.display == 0 ? true : false,
							type: item.display == 0 ? 'more' : 'hyh'
						}
					})
					this.homeData = JSON.parse(JSON.stringify(res.data.list))
					this.homeInfo = JSON.parse(JSON.stringify(res.data.info))
					this.videoObj = JSON.parse(JSON.stringify(videoObj))
				})
			},
			//分享朋友圈
			// onShareTimeline(res) {
			//   return {
			//     title: this.data.homeInfo.muse_name,
			//     imageUrl:this.data.homeInfo.logo
			//   }
			// },
			//微信转发
			// onShareAppMessage: function (ops) {
			//   return {
			//     title: this.data.homeInfo.muse_name,
			//     imageUrl:this.data.homeInfo.logo
			//   }
			// },
			// 点击暂停显示播放按钮
			// videoPause(e) {
			// 	alert('haha')
			// 	if (e.type == 'play') {
			// 		this.setData({
			// 			videoFlag: false
			// 		})
			// 	}
			// },
			playVideo() {
				var vdo = document.getElementById("myVideo");
				if (vdo.paused) {
					vdo.play()
					this.$set(this.videoFlag, "isplay", false)
				} else {
					vdo.pause()
					this.$set(this.videoFlag, "isplay", true)
				}
			},
			// playAudio(e) {
			// 	this.data.videoContext = wx.createVideoContext('myVideo');
			// 	this.data.videoContext.pause();
			// 	this.setData({
			// 		videoFlag: true
			// 	})
			// 	if (this.data.playFlag) { //初始化给backgroundAudioManager.src赋值
			// 		this.data.myaudio.src = this.data.homeInfo.voice_url;
			// 		this.data.myaudio.title = this.data.homeInfo.muse_name;
			// 	} else {
			// 		this.data.myaudio.pause();
			// 	}
			// 	this.setData({
			// 		playFlag: !this.data.playFlag
			// 	})
			// },
		}
	}
</script>

<style scoped="scoped">
	/* pages/appreciation/appreciation.wxss */
	.find-page {
		width: 100%;
		background: #ea7152;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.nav-bgimg img {
		width: 100%;
	}

	.app-video-box {
		width: 100%;
		height: auto;
		position: relative;
		display: flex;
		padding: 40px 40px 0 40px;
		box-sizing: border-box;
		border-radius: 10px;
		overflow: hidden;
	}

	.app-div-imgs {
		width: 100%;
		height: 220px;
		overflow: hidden;
	}

	.app-div-imgs img {
		width: 100%;
		min-height: 220px;
	}

	.app-div-head {
		padding: 0px 40px;
		box-sizing: border-box;
		position: relative;
		width: 100%;
		height: 180px;
		margin-top: 40px;
	}

	.app-div-head-body {
		width: 670px;
		height: 180px;
		background: white;
		box-shadow: 0px 0px 10px #e9e9e9;
		border-radius: 10px;
		padding: 20px;
		box-sizing: border-box;
		display: flex;
	}

	.app-div-head-logo {
		width: 140px;
		height: 140px;
		background: white;
		border: 1px solid #e5e5e5;
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	.app-div-head-logo img {
		width: 100%;
		height: 100%;
	}

	.app-div-head-info {
		width: 500px;
		margin-left: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.app-div-head-title {
		font-size: 35px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.com-video {
		width: 100vw;
		display: flex;
		position: relative;
		background: #000000;
		border-radius: 10px;
	}

	.my-video {
		width: 100%;
		height: 380px;
	}

	.app-video-text {
		position: absolute;
		bottom: 0px;
		left: 40px;
		width: 670px;
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 10px 40px;
		box-sizing: border-box;
		border-radius: 0 0 10px 10px;
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

	.video-play-btn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
		color: white;
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

	.app-data-box {
		margin-top: 30px;
	}

	.liner {
		width: 100%;
		height: 20px;
		background: #f5f5f5;
		margin-bottom: 30px;
	}
</style>
