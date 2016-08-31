var Gobal = new Object();
function GetJPData(d, c, a, b) {
	$.getJSON(d + "/JPData?action=" + c + "&" + a + "&fun=?", b)
}
function GetDominData(d, c, b, a) {
	$.getJSON(d + "/JPData?action=" + c + "&fun=?", {
		parms: b
	},
	a)
}
function loadImgFun(c) {
	var b = $("#loadingPicBlock");
	if (b.length > 0) {
		var i = "src2";
		Gobal.LoadImg = b.find("img[" + i + "]");
		var a = function() {
			return $(window).scrollTop()
		};
		var e = function() {
			return $(window).height() + a() + 50
		};
		var h = function() {
			Gobal.LoadImg.each(function(j) {
				if ($(this).offset().top <= e()) {
					var k = $(this).attr(i);
					if (k) {
						$(this).attr("src", k).removeAttr(i).show()
					}
				}
			})
		};
		var d = 0;
		var f = -100;
		var g = function() {
			d = a();
			if (d - f > 50) {
				f = d;
				h()
			}
		};
		if (c == 0) {
			$(window).bind("scroll", g)
		}
		g()
	}
}
var IsMasked = false;
var addNumToCartFun = null;
var _IsLoading = false;
var _IsIOS = false;
function scrollForLoadData(a) {
	$(window).scroll(function() {
		var c = $(document).height();
		var b = $(window).height();
		var d = $(document).scrollTop() + b;
		if (c - d <= b * 4) {
			if (!_IsLoading && a) {
				_IsLoading = true;
				a()
			}
		}
	})
} (function() {
	var b = $("#hidIsHttps").val() == "1" ? true: false;
	Gobal.SiteVer = $("#hidSiteVer").length == 0 ? "v1": $("#hidSiteVer").val();
	Gobal.Skin = (b ? "https://mskin.1yyg.com/": "http://mskin.1yyg.com/") + Gobal.SiteVer + "/weixin";
	Gobal.LoadImg = null;
	Gobal.LoadHtml = '<div class="loadImg">正在加载</div>';
	Gobal.LoadPic = "http://mskin.1yyg.com/" + Gobal.SiteVer + "/weixin/images/loading2.gif?v=130820";
	Gobal.NoneHtml = '<div class="noRecords colorbbb clearfix"><s></s>暂无记录</div>';
	Gobal.NoneHtmlEx = function(c) {
		return '<div class="noRecords colorbbb clearfix"><s></s>' + c + "</div>"
	};
	Gobal.LookForPC = '<div class="g-suggest clearfix">请使用电脑访问www.1yyg.com查看更多</div>';
	Gobal.ErrorHtml = function(c) {
		return '<div class="g-suggest clearfix">抱歉，加载失败，请重试[' + c + "]</div>"
	};
	Gobal.unlink = "javascript:void(0);";
	loadImgFun(0);
	var a = function() {
		_IsIOS = browser.versions.ios || browser.versions.iPhone || browser.versions.iPad;
		var m = $("#btnCart");
		if (m.length > 0) {
			Base.getScript(Gobal.Skin + "/JS/CartComm.js?v=160523",
			function() {
				var p = new $CartComm();
				p.getShopCartNum(function(q) {
					if (q.num > 0) {
						m.find("i").html(q.num > 99 ? '<b class="tomore" num="' + q.num + '">...</b>': '<b num="' + q.num + '">' + q.num + "</b>")
					}
				})
			})
		}
		addNumToCartFun = function(p) {
			m.find("i").html(p > 99 ? '<b class="tomore" num="' + p + '">...</b>': '<b num="' + p + '">' + p + "</b>")
		};
		var l = function(q) {
			var p = new Date();
			q.attr("src", q.attr("data") + "?v=" + GetVerNum()).removeAttr("id").removeAttr("data")
		};
		var h = $("#pageJS", "head");
		if (h.length > 0) {
			l(h)
		} else {
			h = $("#pageJS", "body");
			if (h.length > 0) {
				l(h)
			}
		}
		document.body.addEventListener("touchmove",
		function(p) {
			if (IsMasked) {
				p.preventDefault()
			}
		},
		false);
		var g = $("body").attr("fnav");
		if (g == "1" || g == "2" || g == "3") {
			var n = true;
			var i = '<div id="div_fastnav"  class="fast-nav-wrapper">';
			i += '<ul class="fast-nav">';
			if (g != "3") {
				i += '<li id="li_menu"><a href="javascript:;"><i class="nav-menu"></i></a></li>'
			}
			if (g != "2") {
				i += '<li id="li_top" style="display:none;"><a href="javascript:;"><i class="nav-top"></i></a></li>'
			}
			i += "</ul>";
			if (g != "3") {
				i += '<div class="sub-nav" style="display:none;">';
				i += '<a href="/' + Gobal.SiteVer + '/index.do"><i class="home"></i>云购</a>';
				i += '<a href="/' + Gobal.SiteVer + '/lottery/"><i class="announced"></i>最新揭晓</a>';
				i += '<a href="/' + Gobal.SiteVer + '/post/index.do"><i class="single"></i>晒单</a>';
				i += '<a href="/' + Gobal.SiteVer + '/member/"><i class="personal"></i>我的云购</a>';
				i += '<a href="/' + Gobal.SiteVer + '/mycart/"><i class="shopcar"></i>购物车</a>';
				if ($("#hidOpenID").val() == "") {
					i += '<a href="javascript:;" id="a_subscribe"><i class="follow"></i>关注微信号</a>'
				}
				if (!_IsIOS) {
					i += "<a href=\"javascript:location.replace('" + location.href.replace(/\/v(\d+)\//, "/v" + Math.ceil(Math.random() * 1000) + "/") + '\');"><i class="refresh"></i>刷新</a>'
				}
				i += "</div>"
			}
			i += "</div>";
			var o = $("#div_fastnav");
			if (o.length == 0) {
				o = $(i)
			}
			if (g != "3") {
				var d = $(".sub-nav", o);
				var k = d.children("a").length;
				if (k == 4) {
					d.addClass("four")
				} else {
					if (k == 5) {
						d.addClass("five")
					} else {
						if (k == 6) {
							d.addClass("six")
						} else {
							if (k == 7) {
								d.addClass("seven")
							}
						}
					}
				}
				var c = $("#li_menu", o);
				var f = null;
				c.bind("click",
				function() {
					if (n == false) {
						return
					}
					if (f != null) {
						clearTimeout(f)
					}
					if ($(this).attr("isshow") == "1") {
						d.fadeOut("fast");
						$(this).attr("isshow", "0")
					} else {
						d.fadeIn("fast",
						function() {
							f = setTimeout(function() {
								d.fadeOut("fast");
								c.attr("isshow", "0")
							},
							5000)
						});
						$(this).attr("isshow", "1")
					}
				});
				o.bind("click",
				function(p) {
					stopBubble(p)
				}).find("#a_subscribe").bind("click",
				function() {
					d.fadeOut("fast");
					c.attr("isshow", "0");
					var p = function() {
						var r = null;
						var q = '<div class="index-code-wrap"><h6>长按识别二维码</h6><div class="code"><img src="http://mskin.1yyg.com/' + Gobal.SiteVer + '/weixin/images/index-code.jpg?160229" alt="1元云购官方微信"></div><a  href="javascript:;" class="close-code"><i class="z-set"></i></a></div>';
						var s = function() {
							$("a.close-code").click(function() {
								r.cancel()
							})
						};
						r = new $.PageDialog(q, {
							W: 300,
							H: 300,
							autoClose: false,
							ready: s,
							isTop: false
						})
					};
					Base.getScript(Gobal.Skin + "/JS/pageDialog.js?v=160304", p)
				});
				$("html").bind("click",
				function() {
					d.fadeOut("fast");
					c.attr("isshow", "0")
				})
			}
			if (g != "2") {
				var j = $("#li_top", o);
				j.bind("click",
				function() {
					$(this).hide();
					$("body,html").animate({
						scrollTop: 0
					},
					500)
				});
				$(window).scroll(function() {
					if ($(window).scrollTop() > 100) {
						j.show()
					} else {
						j.hide()
					}
				})
			}
			o.appendTo("body")
		}
		var e = $(".footer").find("a");
		e.on("touchstart",
		function() {
			if (!$(this).hasClass("hover")) {
				e.removeClass("active").eq(e.index(this)).addClass("active");
				setTimeout(function() {
					e.removeClass("active")
				},
				1000)
			}
		})
	};
	Base.getScript(Gobal.Skin + "/JS/Comm.js?v=160304", a)
})();