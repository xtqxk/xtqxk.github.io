var GameInfo={
	creat:function(){
		var _self={};
		_self.swf_id='xgame'+(new Date()).getTime();
		_self.appid=null;
		_self.loader_url=client_base+'XGame_Loading.swf';
		_self.swf_url=client_base+"X_GameMain_do.swf";
		_self.game_version=$('#cvs').attr('build');
		_self.swf_vars=$('#mainjs').attr('data');

		_self.swf_ready=false;
		_self.swf_conn=false;
		_self.swf_callback_fun='callGame';
		_self.close_conn=function(){
			if (_self.swf_conn) {//离开页面时要关闭flash连接
				_self.swf_conn=false;
				swfobject.getObjectById(_self.swf_id)[_self.swf_callback_fun]('close_socket');
			}
		}
		_self.tx_api={};
		_self.tx_api.recharge=function(){
			fusion2.dialog.recharge
			({
			//可选。对话框关闭时的回调方法。
			onClose : function () { }

			});
		}
		_self.tx_api.on_buy=function(_param){
			fusion2.dialog.buy
			({
			// 必须。 表示购买物品的url参数，url_params是调用Q点直购接口v3/pay/buy_goods或道具寄售接口v3/pay/exchange_goods接口返回的参数。
			param : _param,
			// 可选。表示是否使用沙箱测试环境。应用发布前，请务必注释掉该行。
			// sandbox值为布尔型。true：使用； false或不指定：不使用。
			sandbox : false,

			//可选。前台使用的上下文变量，用于回调时识别来源。
			context : "context",
			//可选。用户购买成功时的回调方法，其中opt.context为上述context参数。如果用户购买成功，则立即回调JS中的onSuccess，当用户关闭对话框时再回调onClose。
			onSuccess : function (opt) { },

			//可选。用户取消购买时的回调方法，其中opt.context为上述context参数。如果用户购买失败或没有购买，关闭对话框时将先回调onCancel再回调onClose。
			onCancel : function (opt) { },
			//可选。如果在实现Q点直购功能时调用了发货通知接口，即需要实现本方法，其中opt.context为上述context参数。如果发货超时，则立即回调onSend。
			onSend : function(opt) { },
			//可选。对话框关闭时的回调方法，主要用于对话框关闭后进行UI方面的调整，onSuccess和onCancel则用于应用逻辑的处理，避免过度耦合。
			onClose : function (opt) { }

			});
		}
		_self.tx_api.share=function(){
			alert('分享');
		}
		_self.tx_api.login=function(){
			_self.swf_ready=true;
			_self.swf_conn=true;
			//swfobject.getObjectById(_self.swf_id)[_self.swf_callback_fun]('hello yoyo!');
		}
		_self.tx_api.logout=function(){
			_self.swf_conn=false;
		}
		_self.tx_api.open_vip=function(){
			window.open('http://pay.qq.com/qzone/index.shtml?aid=game'+_self.appid+'.op');
		}
		_self.tx_api.open_year_vip=function(){
			window.open('http://pay.qq.com/qzone/index.shtml?aid=game'+_self.appid+'.yop&paytime=year');
		}
		_self.tx_api.renewals=function(){
			window.open('http://pay.qq.com/qzone/index.shtml?aid=game'+_self.appid+'.op');
			
		}
		_self.tx_api.year_renewals=function(){
			window.open('http://pay.qq.com/qzone/index.shtml?aid=game'+_self.appid+'.yop&paytime=year');
		}
		_self.tx_api.privilege=function(){
			window.open('http://s1.155cha.com/yellowvip/index.html');
		}
		return _self;
	}
};

var on_recharge		= null;
var on_buy			= null;
var on_share		= null;
var on_login		= null;
var on_logout		= null;
var on_open_vip		= null;//开通vip
var on_open_year_vip= null;//开通年费黄钻
var on_renewals		= null;//续费黄钻
var on_year_renewals= null;//续年费黄钻
var on_privilege	= null;//黄钻特权
var put_role_id		= function (role_id) {
	$('#rid').text(role_id);
}
//打开腾讯微博
var on_weibo = function (){
	window.open('http://t.qq.com/fengkuangshaguo','_blank');
}
//捉虫有奖
var on_bug_activity = function () {
	window.open('http://bbs.open.qq.com/forum.php?mod=viewthread&tid=3931842&fromuid=7051757','_blank');
}

$(function(){
		var game=GameInfo.creat();
		on_recharge=game.tx_api.recharge;
		on_buy=game.tx_api.on_buy;
		on_share=game.tx_api.share;
		on_login=game.tx_api.login;
		on_logout=game.tx_api.logout;
		on_open_vip=game.tx_api.open_vip;
		on_open_year_vip=game.tx_api.open_year_vip;
		on_renewals=game.tx_api.renewals;
		on_year_renewals=game.tx_api.year_renewals;
		on_privilege=game.tx_api.privilege;
		jsReady = true;
		game.appid='100698406';
		if (!game.game_version) {
			alert('版本号错误');
			return;
		}
		var flashvars =
		{
			mainpath		: game.swf_url,
			sysinfo			: game.swf_vars,
			ver				: game.game_version
		};
		var params =
		{
			menu				: "false",
			scale				: "noScale",
			allownetworking		: "all",
			hasPriority			: "true",
			allowScriptAccess	: "always",
			bgcolor				: "#c8b8a3"
		};
		var attributes =
		{
			id					: game.swf_id
		};
		swfobject.embedSWF((game.loader_url||game.swf_url)+"?" + game.game_version, "game_content", "960", "640", "10.3.0",client_base+ "js/expressInstall.swf", flashvars, params, attributes);
		if (null!=swfobject.getObjectById(game.swf_id) && swfobject.getObjectById(game.swf_id).hasOwnProperty('focus')) {
			swfobject.getObjectById(game.swf_id).focus();
		}
		function onCloseGame() {
			game.close_conn();
			return;
		}

		window.onbeforeunload=onCloseGame;
		window.onunload=onCloseGame;
		$('#_top>div div').click(onbtnclick);
		function check_is_login() {
			$.post('./xapi.php',{'openid':openid,'openkey':openkey,'pf':pf,'server_id':serverid,'act':'is_login'},function(data){
				if (data['ret']!=0){
					fusion2.dialog.relogin();//重新登录
				}
			},"json");
		}
		//每日任务图片
		var daycron='<div id="cron"></div>';
		$('#cvs').append(daycron);
		$('#cron').hide().delay(1000).slideDown('slow');
		//啥啥啥信息
		var _info='<div id="_info">《疯狂三国》应用由天灵网络倾力提供，欢迎各位亲爱的玩家加入玩家交流群：127033190,客服QQ：2825710054，官方微博：<a href="http://t.qq.com/fengkuangshaguo" target="_blank"><img src="http://s1.155cha.com/images/weibo.jpg"></a><br>若您遇到问题或有好的建议请向我们反馈，如果游戏有卡死现象，请清除浏览器缓存重新登录。<br>您的游戏ID是：<span id="rid" ></span>,openid:'+openid+'</div>';
		$('#cvs').append(_info);
		$('#_info').hide().delay(1000).slideDown('slow');
		//官方图片等
		var weixin='<div id="weixin"><img src="http://s1.155cha.com/images/weixin.gif"></div>';
		$('#cvs').append(weixin);
		$('#weixin').hide().delay(1000).fadeIn('slow');
		//防沉迷
		function fcm()
		{
			//开启沙箱环境上报数据接口
			if (window['fusion2']) {
				fusion2.control.enableAntiAddiction();
				//调用防沉迷接口
				fusion2.iface.updateExpRate
				(
					function(rate)
					{
						 //在这里写入经验值减半或清零的逻辑。
						 //alert('防沉迷啦！'+rate);
					}
				)
			}
		}
		fcm();
		setInterval(check_is_login,3600000);
	}
)
function game_error(e) {
	parent.set_error_msg(e);
}

function onbtnclick(e) {
	switch($('#_top>div div').index( $(this))){
		case 0:
			on_recharge();
			break;
		case 1:
			fusion2.dialog.sendStory({
			    title :"疯狂三国",
				img:"",
				summary :"玩疯狂三国，根！本！就！停！不！下！来！啊！亲！",
				msg:"五虎上将在你的强练下燃烧小宇宙，和赵云一起旁观鬼吕布戏神貂蝉！三国群雄的崛起你也要来横插一脚。《疯狂三国》没你不行！快来一起疯狂吧！",
				button :"战斗吧",
				source :"ref=story&act=default",
				context:"send-story-12345",
				onShown : function (opt)
				{
				    console.log("Shown");
				},
				onClose : function (opt)
				{
					console.log("Closed");
				}
			});
			break;
		case 2:
			window.open('http://s1.155cha.com/yellowvip/index.html','_blank');
			break;
		case 3:
			window.open('http://bbs.open.qq.com/forum.php?mod=forumdisplay&action=list&fid=1280','_blank');
			break;
		case 4:
			fusion2.dialog.invite({
				msg  : "玩疯狂三国，根本就停不下来~",
				img : "",
				source : "",
				context : "invite",
				onSuccess : function (ret) {  alert("邀请成功"); }
			});
			break;
		case 5:
			window.open('http://'+window.location.host+window.location.pathname);
			break;
	}
}