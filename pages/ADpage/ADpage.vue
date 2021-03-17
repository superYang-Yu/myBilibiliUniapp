<template>
	<view class="flex-jc-ac-col">

		<view class="ad-box" v-if="adTime">
			<view class="ad-text">
				广告
			</view>
			<image class="ad-image" :src="adImgUrl" :style="'height:'+ this.windowsH +'px'" mode="scaleToFill"></image>
			<view class="ad-up" @click="gotoindex">
				跳过 {{this.upTime}}
			</view>
		</view>

		<image class="start-img-thumb" :src="showData.thumb" :style="'height:'+ this.windowsH +'px'" mode="scaleToFill" v-if="!adTime"></image>
		<image class="start-img-logo" :src="showData.logo_url" mode="widthFix" v-if="!adTime"></image>
	</view>
</template>

<script scoped>
	export default {
		data() {
			return {
				imgUrl: "https://app.bilibili.com/x/v2/splash/brand/list?access_key=d7c38fae68b738f24602f8956727bcb1&appkey=1d8b6e7d45233436&build=6110500&c_locale=zh_CN&channel=ss_baidusem_012&device=phone&mobi_app=android&network=wifi&platform=android&s_locale=zh_CN&screen_height=1920&screen_width=1080&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.11.0%22%2C%22abtest%22%3A%22%22%7D&ts=1606106923&sign=713820df2385cd6ad81495fe8ecc918d",
				showData: {
					id: 12,
					thumb: "http://i0.hdslb.com/bfs/archive/e2a5be97c4b52117585eeae004a900f140691eb7.png",
					logo_url: "http://i0.hdslb.com/bfs/archive/1b1a8a4fc78a3b1b2992402ebdc19808b9d251ed.png",
					mode: '',
					windowsH: 768,
				},
				adImgUrl: 'https://i0.hdslb.com/bfs/sycp/creative_img/202012/970a8c5b80e433d5043747fdc70efff8.jpg',
				adTime: false,
				upTime: 5,
				timer: null,
				timer2: null
			}
		},
		async onShow() {
			this.windowsH = uni.getSystemInfoSync().windowHeight
			var obj = await this.getImgList(this.imgUrl)
			var list = obj.data.data.list
			this.showData = this.getRandomNum(list)

			const that = this

			this.timer2 = setTimeout(() => {
				that.adTime = true
				this.timer = setInterval(() => {
					if (that.upTime == 0) {
						clearInterval(that.timer)
						clearTimeout(that.timer2)
						uni.switchTab({
							url: '../index/index'
						})
						that.upTime = 5
						return
					}
					that.upTime--
				}, 1000)
			}, 3000)
		},
		methods: {

			// 获取启动页img数据列表
			getImgList(imgUrl) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: imgUrl,
						method: "GET",
						success(res) {
							resolve(res)
						},
						fail(err) {
							resolve(err)
						}
					})
				})
			},

			// 随机取出图片id为10-20的数据
			getRandomNum(urlList) {
				var id = Math.floor(Math.random() * 11) + 10
				for (var i = 0; i < urlList.length; i++) {
					if (urlList[i].id == id) {
						return urlList[i]
					} else {
						id = Math.floor(Math.random() * 11) + 10
						continue
					}
				}
			},

			// 跳转首页
			gotoindex() {
				uni.switchTab({
					url: '../index/index',
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
		}
	}
</script>

<style scoped>
	.start-img-thumb {
		height: 768px;
		width: 100%;
	}

	.start-img-logo {
		width: 30%;
		height: auto;
		position: fixed;
		bottom: 0rpx;
	}

	.ad-box {
		height: 100%;
		width: 100%;
	}

	.ad-text {
		position: fixed;
		top: 80rpx;
		right: 30rpx;
		color: #FFFFFF;
		font-size: 25rpx;
		background-color: #B2B2B2;
		border-radius: 5rpx;
		padding: 5rpx 20rpx;
	}

	.ad-image {
		height: 768px;
		width: 100%;
		z-index: -10;
	}

	.ad-up {
		color: #FFFFFF;
		font-size: 25rpx;
		border-radius: 30rpx;
		padding: 18rpx 25rpx;
		background-color: #B2B2B2;
		position: fixed;
		bottom: 60rpx;
		right: 45rpx;
	}
</style>
