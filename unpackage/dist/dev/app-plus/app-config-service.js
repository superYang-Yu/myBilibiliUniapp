
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/ADpage/ADpage","pages/index/index","pages/channel/channel","pages/moving/moving","pages/vipBuy/vipBuy","pages/mine/mine","pages/player/player"],"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","navigationBarTextStyle":"black"},"tabBar":{"color":"#818181","selectedColor":"#FB789E","borderStyle":"black","backgroundColor":"#ffffff","height":"50px","fontSize":"10px","iconWidth":"24px","spacing":"3px","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/tabbarImg/shouye.png","selectedIconPath":"static/tabbarImg/shouyeed.png"},{"pagePath":"pages/channel/channel","text":"频道","iconPath":"static/tabbarImg/pindao.png","selectedIconPath":"static/tabbarImg/pindaoed.png"},{"pagePath":"pages/moving/moving","text":"动态","iconPath":"static/tabbarImg/dongtai.png","selectedIconPath":"static/tabbarImg/dongtaied.png"},{"pagePath":"pages/vipBuy/vipBuy","text":"会员购","iconPath":"static/tabbarImg/gouwuche.png","selectedIconPath":"static/tabbarImg/gouwucheed.png"},{"pagePath":"pages/mine/mine","text":"我的","iconPath":"static/tabbarImg/mine.png","selectedIconPath":"static/tabbarImg/mineed.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"FakeBiliBiliApp","compilerVersion":"2.9.8","entryPagePath":"pages/ADpage/ADpage","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/ADpage/ADpage","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"disableScroll":true}},{"path":"/pages/channel/channel","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/moving/moving","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/vipBuy/vipBuy","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/player/player","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
