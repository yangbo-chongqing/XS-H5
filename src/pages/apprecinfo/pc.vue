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
		<div class="app-pl-hf-item" v-for="item in item.list" :key="item.id">
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
