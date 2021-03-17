<template>
	<view class="box">
		<view class="box-header">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<!-- 顶部工具栏 -->
			<view class="top-bar flex-jb-ac">
				<view class="login">
					<text>登录</text>
				</view>

				<view class="search-input-box flex-js-ac">
					<view class="iconfont icon-sousuo icon-color"></view>
				</view>

				<view class="iconfont icon-youxi icon-color"></view>

				<view class="iconfont icon-xin icon-color"></view>
			</view>


			<!-- 顶部导航栏 -->
			<view class="tabs">
				<scroll-view class="scroll-bar" scroll-x="true">
					<view class="tab-item" v-for="(tab,index) in tabTitles" :key="tab.id" :id="tab.id" :data-current="index" @click="ontabtap">
						<view class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<scroll-view scroll-y="true" class="scroll-class" :refresher-enabled="true" :refresher-threshold="80"
		 @refresherrefresh="refresherrefreshItem" refresher-default-style="none" :refresher-triggered="isRefresh"
		 @scrolltolower="scrolltolowerEven" :lower-threshold="10">

			<!-- 下拉刷新的图标 -->
			<view class="refresh-box flex-jc-ac" v-if="isRefresh">
				<image src="../../static/itemImg/refre.png" mode="scaleToFill"></image>
			</view>

			<!-- 轮播图 -->
			<view class="banner-class" v-if="isBanner < 2">
				<swiper class="swiper-box" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="item in bannerDataList" :key="item.id">
						<view class="swiper-item">
							<image :src="item.image" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 条目 -->
			<view class="card-box">
				<view v-for="(item, index) in itemDataList">
					<view class="card-item" @click="itemClcik(item.player_args, item.param)">

						<view class="header-box">
							<image class="card-item-img" :src="item.cover" mode="widthFix">
							</image>
							<view class="flex-jb-ac card-item-img-1">
								<view class="card-item-img-2 flex-jc-ac">
									<view class="icon iconfont icon-bofang text-icon"></view>
									<view class="text-bofang">{{item.cover_left_text_1}}</view>
								</view>
								<view class="card-item-img-3 flex-jc-ac">
									<text class="icon iconfont icon-danmu text-icon"></text>
									<text class="text-bofang">{{item.cover_left_text_2}}</text>
								</view>
								<view class="card-item-img-4 flex-jc-ac">
									<text class="text-bofang">{{item.cover_right_text}}</text>
								</view>
							</view>
						</view>

						<view class="centen-title">
							<text>{{item.title}}</text>
						</view>

						<view class="bottom-text">
							<text class="tname-class">{{item.args.rname}}</text>
							<text class="ponit-class">·</text>
							<text class="rname-class">{{item.args.tname}}</text>
						</view>

					</view>
				</view>
			</view>

		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 1,
				tabIndex: 1,
				isBanner: 0,
				tabTitles: [{
						name: "直播",
						id: "zhibo"
					},
					{
						name: "推荐",
						id: "tuijian"
					},
					{
						name: "热门",
						id: "remen"
					},
					{
						name: "追番",
						id: "zhuifan"
					},
					{
						name: "影视",
						id: "yingshi"
					},
					{
						name: "说唱区",
						id: "shuochangqu"
					},
					{
						name: "抗击肺炎",
						id: "kangjifeiyan"
					},
					{
						name: "小康",
						id: "xiaokang"
					}
				],
				bannerDataList: [{
					"id": 593943,
					"title": "双十一 晒新衣",
					"image": "http://i0.hdslb.com/bfs/archive/15509734d3ca7cf1ecd4c284c7b42296dc21f881.jpg",
				}, {
					"id": 11220,
					"title": "开启绮丽荒诞的众神物语",
					"image": "https://i0.hdslb.com/bfs/sycp/creative_img/202010/2097fd6eae4becc990dee0f2037a47a9.jpg",
				}, {
					"id": 14340,
					"title": "心动之旅，冒险启程",
					"image": "https://i0.hdslb.com/bfs/sycp/creative_img/202010/5546757a6daed18c20a6f6b593273730.jpg",
				}],

				// 视频条目
				itemDataList: [],

				// 下拉刷新是否开启标志
				isRefresh: false
			}
		},
		onLoad() {
			this.getNewData()
		},
		onShow() {

		},
		methods: {
			// 请求数据
			getData() {
				var that = this
				uni.request({
					url: 'https://app.bilibili.com/x/v2/feed/index',
					methods: 'GET',
					data: {
						"appkey": '1d8b6e7d45233436',
						"mobi_app": 'android',
					},
					header: {
						"Content-Type": 'application/json; charset=utf-8',
						"Access-Control-Allow-Origin": 'Origin'
					},
					success(res) {
						for (var i = 0; i < 10; i++) {
							that.itemDataList.push(res.data.data.items[i])
						}
						that.isRefresh = false
					},
					fail() {

					},
				})
			},

			getNewData() {
				var that = this
				uni.request({
					url: 'https://app.bilibili.com/x/v2/feed/index',
					methods: 'GET',
					data: {
						"appkey": '1d8b6e7d45233436',
						"mobi_app": 'android',
					},
					header: {
						"Content-Type": 'application/json; charset=utf-8',
						"Access-Control-Allow-Origin": 'Origin'
					},
					success(res) {

						that.itemDataList.splice(0, that.itemDataList.length)

						for (var i = 0; i < 10; i++) {
							that.itemDataList.unshift(res.data.data.items[i])
						}
						that.isRefresh = false
					},
					fail() {

					},
				})
			},

			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.tabIndex = index
			},

			// 下拉刷新
			refresherrefreshItem() {
				this.isRefresh = true
				this.isBanner++
				this.getNewData()
			},

			// 到底部刷新
			scrolltolowerEven() {
				this.getData()
			},
			
			// 点击条目
			itemClcik(res1, res2){
				uni.navigateTo({
					url:'../player/player?aid=' + res1.aid + "&cid=" + res1.cid + "&param=" + res2
				})
			}
		}
	}
</script>

<style scoped>
	.box {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
	}

	.box-head {
		flex-shrink: 0;
		height: 50px;
	}

	.top-bar {
		padding: 16rpx 30rpx;
		background: #FFFFFF;
	}

	.login {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90rpx;
		width: 90rpx;
		background-color: #F4F4F4;
		border-radius: 100%;
		font-size: 26rpx;
		color: #FB789E;
	}

	.search-input-box {
		height: 80rpx;
		width: 60%;
		background-color: #F4F4F4;
		border-radius: 20rpx;
		color: #BBBBBB;
	}

	.icon-color {
		color: #797979;
	}

	.icon-sousuo {
		padding-left: 20rpx;
		font-size: 50rpx;
	}

	.icon-youxi {
		font-size: 50rpx;
	}

	.icon-xin {
		font-size: 50rpx;
	}

	.scroll-bar {
		width: 100%;
		white-space: nowrap;
	}

	.tab-item {
		display: inline-block;
		text-align: center;
		padding: 0px 15rpx;
	}

	.tabs {
		height: 66rpx;
		background-color: #ffffff;
		padding: 0px 20rpx;
		overflow-x: hidden;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 28rpx;
	}

	.uni-tab-item-title-active {
		color: #FB789E;
		font-weight: bold;
		border-bottom: 6rpx solid #FB789E;
		padding: 0rpx 10rpx;
	}

	.swiper-box {
		height: 350rpx;
		width: 100%;
	}

	.swiper-item>image {
		height: 100%;
		width: 100%;
	}

	.scroll-class {
		flex: 1;
		height: 1px;
		position: relative;
	}

	.card-box {
		width: 95%;
		column-count: 2;
		column-gap: 10rpx;
		margin-left: auto;
		margin-right: auto;
		margin-top: 20rpx;
	}

	.card-item {
		flex: 1;
		height: 350rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}

	.header-box {
		position: relative;
		height: 60%;
	}

	.card-item-img {
		height: 100%;
		width: 100%;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}

	.card-item-img-1 {
		position: absolute;
		bottom: -10rpx;
		background-color: rgba(36, 36, 36, 0.3);
		width: 100%;
		color: #FFFFFF;
	}

	.text-bofang {
		font-size: 20rpx;
		margin-left: 5rpx;
	}

	.text-icon {
		font-size: 35rpx;
		margin-left: 10rpx;
	}

	.card-item-img-3 {
		margin-left: -100rpx;
	}

	.card-item-img-4 {
		margin-right: 10rpx;
	}

	.centen-title {
		margin-top: 25rpx;
		color: #2f2f2f;
		font-size: 25rpx;
		height: 20%;
		width: 95%;
		max-lines: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-left: 5rpx;
	}

	.bottom-text {
		margin-top: 10rpx;
		font-size: 20rpx;
		margin-left: 5rpx;
		color: #797979;
	}

	.refresh-box {
		position: absolute;
		height: auto;
		width: 100%;
		top: 45rpx;
		z-index: 999;
		animation: spin 1s linear 10;
	}

	.refresh-box>image {
		height: 65rpx;
		width: 65rpx;
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
</style>
