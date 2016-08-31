var _IsLoadWxShareJs = false;
var _wxInitConfig = false;
var _wx_m_popUp = $("div.m_popUp");
var _wxSettings = null;
var _wxObj = null;
var wxRemoveMask = function() {
	_wx_m_popUp.hide();
	$("body").attr("style", "");
	IsMasked = false
};
var wxShowMaskFun = function() {
	if (IsMasked) {
		return
	}
	IsMasked = true;
	var a = "";
	if (_wxSettings.shareMoney) {
		a += '<div class="m_popUp" style="display:none;">';
		a += "<span></span>";
		a += '<div class="m_how">';
		a += "<h4>怎么赚钱？</h4>";
		a += "<p>1: 点击本页面右上角的三个点的图标</p>";
		a += "<p>2: 选择[发送给朋友]或[分享到朋友圈]</p>";
		a += "<p>3: 经您邀请的好友，成功参与云购后，您可获得好友消费额6%的佣金奖励</p>";
		a += "</div>";
		a += '<div class="m_guide">';
		a += "</div>";
		a += "</div>"
	} else {
		a += '<div class="m_popUp" style="display:none;">';
		a += '<div class="m_guide">';
		a += "</div>";
		if (_wxSettings.shareTitle.length > 1) {
			a += '<div class="share-bg-wrap">';
			a += '<img src="http://mskin.1yyg.com/v1/weixin/images/share-bg.png?160311" alt="" class="share-bg">';
			a += '<div class="share-info">';
			a += '<a href="javascript:;" class="pro-img">';
			a += '<img src="' + _wxSettings.shareImg + '" alt="">';
			a += "</a>";
			a += '<div class="pro-info">';
			a += '<p id="p_content">' + _wxSettings.shareTitle[0] + "</p>";
			a += "</div>";
			a += "</div>";
			a += '<a href="javascript:;" class="change-btn"></a>';
			a += "</div>"
		} else {
			a += "<cite></cite>"
		}
		a += "</div>"
	}
	if (_wx_m_popUp.length == 0) {
		_wx_m_popUp = $(a);
		_wx_m_popUp.appendTo("body")
	} else {
		_wx_m_popUp.html($(a).html())
	}
	_wx_m_popUp.show(0,
	function() {
		$("body").attr("style", "overflow:hidden;")
	});
	if (_wxSettings.shareTitle.length > 1) {
		var b = 0;
		_wx_m_popUp.bind("click", wxRemoveMask).find("a.change-btn").bind("click",
		function(d) {
			stopBubble(d);
			b++;
			if (b >= _wxSettings.shareTitle.length) {
				b = 0
			}
			var c = _wxSettings.shareTitle[b];
			_wx_m_popUp.find("#p_content").html(c);
			wxReadyFun(c)
		})
	} else {
		_wx_m_popUp.bind("click", wxRemoveMask)
	}
};
var wxConfigFun = function(b) {
	var a = function() {
		var e = $("#hidAppID").val();
		var d = $("#hidTimeSpan").val();
		var f = $("#hidNonceStr").val();
		var c = $("#hidSignature").val();
		if (e == "" || typeof(e) == "undefined" || d == "" || typeof(d) == "undefined" || f == "" || typeof(f) == "undefined" || c == "" || typeof(c) == "undefined") {
			console.log("初始参数错误！");
			return
		}
		wx.config({
			debug: false,
			appId: e,
			timestamp: d,
			nonceStr: f,
			signature: c,
			jsApiList: ["checkJsApi", "onMenuShareAppMessage", "onMenuShareTimeline", "onMenuShareWeibo", "onMenuShareQQ", "onMenuShareQZone"]
		});
		wx.error(function(g) {
			console.log(JSON.stringify(g));
			_wxInitConfig = false
		});
		wx.ready(function() {
			_wxInitConfig = true;
			b()
		});
		_wxObj = wx
	};
	if (_IsLoadWxShareJs) {
		a()
	} else {
		Base.getScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js",
		function() {
			a();
			_IsLoadWxShareJs = true
		})
	}
};
var wxReadyFun = function(a) {
	if (_wxObj == null) {
		alert("初始化分享失败");
		return
	}
	_wxObj.ready(function() {
		wx.onMenuShareAppMessage({
			title: a,
			desc: _wxSettings.shareDesc,
			link: _wxSettings.shareLink,
			imgUrl: _wxSettings.shareImg,
			success: function() {
				wxRemoveMask()
			},
			cancel: function() {
				wxRemoveMask()
			}
		});
		wx.onMenuShareTimeline({
			title: a + _wxSettings.shareDesc,
			link: _wxSettings.shareLink,
			imgUrl: _wxSettings.shareImg,
			success: function() {
				wxRemoveMask()
			},
			cancel: function() {
				wxRemoveMask()
			}
		});
		wx.onMenuShareWeibo({
			title: a,
			desc: _wxSettings.shareDesc,
			link: _wxSettings.shareLink,
			imgUrl: _wxSettings.shareImg,
			success: function() {
				wxRemoveMask()
			},
			cancel: function() {
				wxRemoveMask()
			}
		});
		wx.onMenuShareQQ({
			title: a,
			desc: _wxSettings.shareDesc,
			link: _wxSettings.shareLink,
			imgUrl: _wxSettings.shareImg,
			success: function() {
				wxRemoveMask()
			},
			cancel: function() {
				wxRemoveMask()
			}
		});
		wx.onMenuShareQZone({
			title: a,
			desc: _wxSettings.shareDesc,
			link: _wxSettings.shareLink,
			imgUrl: _wxSettings.shareImg,
			success: function() {
				wxRemoveMask()
			},
			cancel: function() {
				wxRemoveMask()
			}
		})
	})
};
var wxShareFun = function(a) {
	_wxSettings = {
		shareTitle: ["1元云购 - 惊喜无限"],
		shareImg: Gobal.Skin + "/weixin/Images/iphone6.jpg?v=150129",
		shareLink: "",
		shareDesc: "1元就可能买到iPhone 6S，快来试试吧！",
		shareMoney: false,
		showMask: true
	};
	a = a || {};
	$.extend(_wxSettings, a);
	if (_wxSettings.showMask) {
		wxShowMaskFun()
	}
	if (!_wxInitConfig) {
		wxConfigFun(function() {
			wxReadyFun(_wxSettings.shareTitle[0])
		})
	} else {
		wxReadyFun(_wxSettings.shareTitle[0])
	}
};