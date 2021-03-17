<template>
	<view>
		<!-- 视频播放器 -->
		<view class="zhanweiVedio flex-jc-ac">
			<image class="jiazai-img" src="../../static/itemImg/shuaxin2.png" mode="scaleToFill"></image>
			<image class="palyerArg-img" :src="palyerArg.pic" mode="scaleToFill"></image>
		</view>

		<!-- 简介、评论topbar -->
		<view class="top-bar-detail flex-js-ac">
			<view class="detail-box flex-jc-ac-col">
				<view @click="topBarCheck(1)" class="detail-text" :class="{'top-bar-select' : tobarIndex == 1}">
					简介
				</view>
			</view>

			<view class="reply-box flex-jc-ac-col">
				<view @click="topBarCheck(2)" class="reply-text" :class="{'top-bar-select' : tobarIndex == 2}">
					评论 {{stat.reply}}
				</view>
			</view>
		</view>

		<!-- 简介页数据 -->
		<view class="detail-box-2" v-show="tobarIndex == 1">
			<!-- 头像昵称等 -->
			<view class="header-box flex-jb-ac">
				<view class="flex-js-ac img-nick-box">
					<view class="img-up">
						<image :src="owner.face" mode="scaleToFill"></image>
					</view>
					<view class="up-data flex-as-col">
						<view class="nick-text">
							{{owner.name}}
						</view>
						<view class="fans-text">
							{{owner_ext.fans}}粉丝
						</view>
					</view>
				</view>
				<!-- 关注按钮 -->
				<view class="about-btn-class flex-jc-ac">
					<view class="about-btn flex-jc-ac">
						<text class="add-class">+</text>
						<text class="about-class">关注</text>
					</view>
				</view>
			</view>

			<!-- 标题以及下拉详情 -->
			<view class="title-box">
				<view class="title-class-box flex-jb-ac">
					<view class="title-text">
						{{palyerArg.title}}
					</view>
					<view class="jiantou">
						<image src="../../static/itemImg/jiantou.png" mode="scaleToFill"></image>
					</view>
				</view>
			</view>

			<!-- 播放信息 -->
			<view class="player-box flex-js-ac">
				<!-- 播放量 -->
				<view class="bofang flex-jc-ac">
					<view class="icon iconfont icon-bofang">
					</view>
					<view class="bofang-number">
						{{stat.view}}
					</view>
				</view>
				<!-- 弹幕数 -->
				<view class="danmu flex-jc-ac">
					<view class="icon iconfont icon-danmu">
					</view>
					<view class="danmu-number">
						{{stat.danmaku}}
					</view>
				</view>

				<!-- 发布时间 -->
				<view class="fabu flex-jc-ac">
					{{palyerArg.ctime}}
				</view>

				<!-- up主昵称 -->
				<view class="upnick flex-jc-ac">
					{{owner.name}}
				</view>

				<!-- 版权信息 -->
				<view class="copyright flex-jc-ac" v-show="palyerArg.copyright == 1">
					<image src="../../static/itemImg/jinzhi.png" mode="scaleToFill"></image>
					<view class="copyright-text">
						未经作者授权禁止转载
					</view>
				</view>

			</view>

			<!-- 点赞等数据 -->
			<view class="stat-box flex-jb-ac">

				<!-- 点赞 -->
				<view class="like-box flex-jc-ac-col">
					<image src="../../static/itemImg/like.png" mode="scaleToFill"></image>
					<view class="text-class">
						{{stat.like}}
					</view>
				</view>

				<!-- 不喜欢 -->
				<view class="nolike-box flex-jc-ac-col">
					<image src="../../static/itemImg/nolike.png" mode="scaleToFill"></image>
					<view class="text-class">
						不喜欢
					</view>
				</view>

				<!-- 投币 -->
				<view class="bi-box flex-jc-ac-col">
					<image src="../../static/itemImg/bi.png" mode="scaleToFill"></image>
					<view class="text-class">
						{{stat.coin}}
					</view>
				</view>

				<!-- 收藏 -->
				<view class="shoucang-box flex-jc-ac-col">
					<image src="../../static/itemImg/shoucang.png" mode="scaleToFill"></image>
					<view class="text-class">
						{{stat.favorite}}
					</view>
				</view>

				<!-- 转发 -->
				<view class="share-box flex-jc-ac-col">
					<image src="../../static/itemImg/share.png" mode="scaleToFill"></image>
					<view class="text-class">
						{{stat.share}}
					</view>
				</view>

			</view>

			<view class="border-class">

			</view>

		</view>
	
		<!-- 评论数据 -->
		<view class="reply-box-2" v-show="tobarIndex == 2">
			<scroll-view class="reply-scroll-view" scroll-y="true" >
					<view v-for="item in reply">
						<view class="item-box flex-js-ac">
							<image :src="item.member.avatar" mode="scaleToFill"></image>
							<view class="nick-class">
								{{item.member.uname}}
							</view>
						</view>
						<view class="reply-text-class">
							{{item.content.message}}
						</view>
						<view class="border-class2">
							
						</view>
					</view>
					
					<view class="zhanwei-class">
						
					</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import md5 from "../../md5.js"
	export default {
		data() {
			return {
				cid: '',
				param: '',
				vedioUrl: '',
				tobarIndex: 1,
				palyerArg: {
					pic:"",
					copyright: "",
					title: "",
					ctime: "",
					desc: "",
					duration: "",
				},
				stat: {}, // 播放数据
				owner: {}, // up主信息
				owner_ext: {}, // 粉丝信息
				tag: [], // 标签tag
				reply:[], // 评论列表
			}
		},
		onLoad(res) {
			this.aid = res.aid
			this.cid = res.cid
			this.param = res.param
			this.videoContext = uni.createVideoContext('myVideo')
			console.log(res)
		},
		async onShow() {
			var url = this.getVideoDetilUrl(this.aid)
			var obj = await this.getVideoDetil(url)
			var data = obj.data.data

			this.palyerArg.copyright = data.copyright
			this.palyerArg.title = data.title
			this.palyerArg.ctime = data.ctime
			this.palyerArg.desc = data.desc
			this.palyerArg.duration = data.duration
			this.palyerArg.pic = data.pic
			
			this.stat = data.stat
			this.owner = data.owner
			this.owner_ext = data.owner_ext
			this.tag = data.tag

			var createTimeMon = new Date(this.palyerArg.ctime * 1000).getMonth() + 1
			var createTimeDay = new Date(this.palyerArg.ctime * 1000).getDay()

			this.palyerArg.ctime = createTimeMon + "-" + createTimeDay
			console.log("palyerArg-----", this.palyerArg)
			console.log("stat-----", this.stat)
			console.log("owner-----", this.owner)
			console.log("owner_ext-----", this.owner_ext)
			console.log("tag-----", this.tag)
			
			const replyObj = await this.getReply(this.param)
			this.reply = replyObj.data.data.replies
			// const voideObj = await this.getVideo(this.aid, this.cid, this.param)
			// const vedioUrl = voideObj.data.data.durl[0].url
		},
		methods: {
			
			// 获取评论
			getReply(param){
				return new Promise( (resolve, reject) =>{
					uni.request({
						url:"https://api.bilibili.com/x/v2/reply/main?oid=" + param + "&type=1",
						success(res) {
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},

			// 切换tobbar
			topBarCheck(index) {
				this.tobarIndex = index
			},

			// md5加密数据
			get_sign(params, key) {
				var s_keys = [];
				for (var i in params) {
					s_keys.push(i);
				}
				s_keys.sort();
				var data = "";
				for (var i = 0; i < s_keys.length; i++) {
					// encodeURIComponent 返回的转义数字必须为大写( 如 %2F )
					data += (data ? "&" : "") + s_keys[i] + "=" + encodeURIComponent(params[s_keys[i]]);
				}
				return {
					"sign": md5(data + key),
					"params": data
				};
			},

			//获取视频详情url
			getVideoDetilUrl(aid) {
				let paramsObj = {
					// aid: "78126101",
					aid: aid,
					appkey: "1d8b6e7d45233436",
					build: "5480400",
					ts: new Date().getTime()
				}
				let appsecret = "560c52ccd288fed045859ed18bffd973";

				let signObj = this.get_sign(paramsObj, appsecret);
				// console.log(signObj);
				let path = "https://app.bilibili.com/x/v2/view";
				let params = signObj.params;
				let sign = signObj.sign;
				let url = path + "?" + params + "&sign=" + sign;
				return url;
			},

			// 请求视频详情网址
			getVideoDetil(url) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: url,
						success(res) {
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})

			},

			// 获取视频
			getVideo(aid, cid, param) {
				console.log(param)
				return new Promise((resolve, reject) => {
					uni.request({
						url: "https://api.bilibili.com/x/player/playurl?cid=" + cid + "&avid=" + param +
							"&platform=html5&otype=json&qn=16&type=mp4&html5=1",
						success(res) {
							resolve(res)
						},
						fail(err) {
							reject(err)
						}
					})
				})
			},
		}
	}
</script>

<style>
	.zhanweiVedio {
		height: 250px;
		width: 100%;
	}
	.jiazai-img{
		width: 95rpx;
		height: 95rpx;
		position: absolute;
		top: 15%;
		left: 45%;
		z-index: 999;
		animation: spin 2s linear 100;
	}
	
	/* 刷新图标旋转动画 */
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
	
		to {
			transform: rotate(360deg);
		}
	}
	.palyerArg-img{
		width: 100%;
		height: 100%;
	}
	.top-bar-detail {
		background-color: #FFFFFF;
		height: 75rpx;
		padding-left: 65rpx;
		border-bottom: #EEEEEE 2rpx solid;
	}

	.reply-box {
		margin-left: 45rpx;
	}

	.detail-text,
	.reply-text {
		font-size: 28rpx;
		padding: 0rpx 10rpx;
	}

	.top-bar-select {
		color: #FA72B1;
		border-bottom: #FA72B1 5rpx solid;
	}

	.img-up {
		height: 65rpx;
		width: 65rpx;
	}

	.img-up>image {
		height: 100%;
		width: 100%;
		border-radius: 100%;
	}

	.img-nick-box {
		margin-left: 25rpx;
		margin-top: 25rpx;
	}

	.up-data {
		margin-left: 15rpx;
	}

	.nick-text {
		font-size: 28rpx;
		font-weight: bold;
		color: #FA72B1;
	}

	.fans-text {
		font-size: 23rpx;
		color: #C0C0C0;
	}

	.about-btn-class {
		margin-right: 35rpx;
		width: 130rpx;
		height: 55rpx;
		background-color: #FA72B1;
		color: #FFFFFF;
		border-radius: 5rpx;
	}

	.add-class {
		font-size: 35rpx;
	}

	.about-class {
		font-size: 25rpx;
		margin-left: 10rpx;
	}

	.jiantou {
		width: 65rpx;
		height: 65rpx;
	}

	.jiantou>image {
		width: 100%;
		height: 100%;
	}

	.title-class-box {
		padding: 0rpx 15rpx;
		margin-top: 25rpx;
	}

	.title-text {
		width: 85%;
		font-size: 28rpx;
		color: #000000;
	}

	.bofang-number,
	.danmu-number,
	.fabu,
	.upnick,
	.copyright-text {
		font-size: 20rpx;
		color: #8b8b8b;
	}

	.copyright-text,
	.danmu-number,
	.bofang-number {
		margin-left: 5rpx;
	}

	.copyright>image {
		height: 30rpx;
		width: 30rpx;
	}

	.bofang,
	.danmu,
	.fabu,
	.upnick,
	.copyright {
		margin-left: 25rpx;
	}

	.player-box {
		margin-top: 25rpx;
	}

	.stat-box {
		margin-top: 25rpx;
	}

	.like-box,
	.nolike-box,
	.bi-box,
	.shoucang-box,
	.share-box {
		flex: 1;
	}

	.like-box>image {
		height: 40rpx;
		width: 40rpx;
	}

	.nolike-box>image {
		height: 35rpx;
		width: 35rpx;
	}

	.bi-box>image {
		height: 40rpx;
		width: 40rpx;
	}

	.shoucang-box>image {
		height: 40rpx;
		width: 40rpx;
	}

	.share-box>image {
		height: 40rpx;
		width: 40rpx;
	}

	.text-class {
		margin-top: 10rpx;
		color: #8b8b8b;
		font-size: 20rpx;
	}

	.border-class {
		width: 100%;
		height: 4rpx;
		background-color: #EEEEEE;
		margin-top: 25rpx;
	}
	.reply-scroll-view{
		height: 1200rpx;
		width: 100%;
	}
	.item-box{
		margin-top: 25rpx;
	}
	.item-box>image{
		height: 65rpx;
		width: 65rpx;
		border-radius: 100%;
		margin-left: 25rpx;
	}
	.nick-class{
		color: #808080;
		font-size: 28rpx;
		font-weight: bold;
		margin-left: 15rpx;
	}
	.reply-text-class{
		color: #2F2F2F;
		font-size: 25rpx;
		margin-left: 95rpx;
		margin-top: 15rpx;
	}
	.border-class2{
		margin-top: 25rpx;
		height: 2rpx;
		width: 100%;
		background-color: #C0C0C0;
	}
	.zhanwei-class{
		height: 600rpx;
		width: 100%;
	}
</style>
