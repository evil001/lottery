var YG = YG || {}; (function() {
	if (window.self !== window.top) {
		var b = mainHttp;
		if (typeof(window.location) == "object") {
			b = window.location.href.replace(/['|<|>]/ig, "")
		}
		var a = $("<form name='toTopUrl' method='get' action='" + b + "' target='_top'></form>");
		a.appendTo("body").ready(function() {
			a.submit()
		})
	}
})();
function GetJPData(d, c, a, b) {
	$.getJSON(d + "/JPData?action=" + c + (a != "" ? "&": "") + a + "&fun=?", b)
}
var loadImgFun = function() {
	var b = $("#loadingPicBlock");
	if (b.length > 0) {
		var c = b.find("img");
		var d = function() {
			return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
		};
		var a = function() {
			return document.documentElement.clientHeight + d() + 100
		};
		var e = d();
		var f = e;
		var g = function() {
			c.each(function() {
				try {
					if ($(this).parent() != null && $(this).parent().offset() != null) {
						if ($(this).parent().offset().top <= a()) {
							var h = $(this).attr("src2");
							if (h) {
								$(this).attr("src", h).removeAttr("src2").show()
							}
						}
					}
				} catch(i) {
					console.log(i)
				}
			})
		};
		$(window).bind("scroll",
		function() {
			f = d();
			if (f - e > 50) {
				e = f;
				g()
			}
		});
		g()
	}
};
var mainHttp = "http://www.1yyg.com";
var cartUrl = "http://cart.1yyg.com";
var passportUrl = "https://passport.1yyg.com";
var memberUrl = "http://member.1yyg.com";
var apiUrl = "http://api.1yyg.com";
var skinUrl = "http://skin.1yyg.com";
var _IsCartChanged = false;
var _InsertIntoCart = function() {
	YG.Bottom.Comm.getUserCartNum()
};
var _GetUserLoginInfo = function() {};
YG.Bottom = {
	Util: {
		escape2: function(b) {
			var a = function(e, f, c) {
				var d = new RegExp(f, "g");
				return e.replace(d, c)
			};
			b = escape(b);
			b = a(b, "\\+", "%2B");
			b = a(b, "/", "%2F");
			return b
		},
		ckMobile: function(b) {
			var a = /^1\d{10}$/;
			if (!a.exec(b)) {
				return false
			} else {
				return true
			}
		},
		ckEmail: function(a) {
			var b = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if (b.test(a)) {
				return true
			}
			return false
		},
		ckPasswd: function(b) {
			var a = /^[\S]{6,20}$/;
			if (!a.exec(b)) {
				return false
			}
			return true
		},
		ckVcCode: function(b) {
			var a = /^[0-9A-Za-z]{4,6}$/;
			if (!a.exec(b)) {
				return false
			}
			return true
		}
	},
	Comm: {
		isInitQQEvent: false,
		broswerProcess: function() {
			var a = function() {
				if (_IsIE && $(window).width() < 1190) {
					if (_IeVersion < 9) {
						$("body").addClass("f-width-change")
					} else {
						$("body").removeClass("f-width-change")
					}
				} else {
					$("body").removeClass("f-width-change")
				}
			};
			if (_IsIE && _IeVersion == 6) {
				$("body").css("font", '12px/150% Arial,Verdana,"\5b8b\4f53"')
			}
			$(window).resize(function() {
				a();
				YG.Bottom.RightTool.switchRightTool(false)
			})
		},
		serverTimeProcess: function() {
			var f = $("#pServerTime");
			if (f.length > 0) {
				var d = f.children("span");
				var b = function(j) {
					var h = j.getHours();
					var g = j.getMinutes();
					var i = j.getSeconds();
					return (h > 9 ? h.toString() : "0" + h) + ":" + (g > 9 ? g.toString() : "0" + g) + ":" + (i > 9 ? i.toString() : "0" + i)
				};
				var a = 0;
				var e = new Date();
				var c = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate() + " " + b(e);
				GetJPData(apiUrl, "servertime", "time=" + c,
				function(h) {
					if (h.code == 0) {
						a = h.num
					}
					var g = function() {
						var k = new Date();
						k.setSeconds(k.getSeconds() + a);
						var j = k.getHours();
						var i = k.getMinutes();
						var l = k.getSeconds();
						d.eq(0).html(j > 9 ? j.toString() : "0" + j);
						d.eq(1).html(i > 9 ? i.toString() : "0" + i);
						d.eq(2).html(l > 9 ? l.toString() : "0" + l)
					};
					setInterval(g, 1000)
				})
			}
		},
		setSrcFun: function() {
			var a = function(d) {
				var c = new Date();
				d.attr("src", d.attr("data") + "?v=" + GetVerNum()).removeAttr("id").removeAttr("data")
			};
			var b = $("#pageJS", "head");
			if (b.length > 0) {
				a(b)
			} else {
				b = $("#pageJS", "body");
				if (b.length > 0) {
					a(b)
				}
			}
		},
		loadQQService: function() {
			var f = this;
			var j = "btnTopQQ";
			var e = "btnRigQQ";
			var g = "btnRigQQ2";
			var b = "btnBtmQQ";
			var h = $("#" + j);
			var d = $("#" + e);
			var c = $("#" + g);
			var a = $("#" + b);
			if (h.length > 0 || d.length > 0 || a.length > 0 || c.length > 0) {
				var i = function() {
					if (f.isInitQQEvent) {
						return false
					}
					f.isInitQQEvent = true;
					Base.getScript("http://wpa.b.qq.com/cgi/wpa.php", f.loadQQJS)
				};
				h.hover(i, null);
				a.hover(i, null)
			}
		},
		loadQQJS: function() {
			var a = "btnTopQQ";
			var c = "btnRigQQ";
			var d = "btnRigQQ2";
			var e = "btnBtmQQ";
			var b = "4006859800";
			BizQQWPA.addCustom([{
				aty: "0",
				nameAccount: b,
				selector: a
			},
			{
				aty: "0",
				nameAccount: b,
				selector: c
			},
			{
				aty: "0",
				nameAccount: b,
				selector: d
			},
			{
				aty: "0",
				nameAccount: b,
				selector: e
			}])
		},
		customerService: function() {
			var c = new Date();
			var b = c.getHours();
			var a = c.getMinutes();
			var e = $("#btnTopQQ,#btnBtmQQ");
			var d = $("#btnRigQQ,#btnRigQQ2");
			if (b >= 9 && b < 21) {
				e.removeClass("u-service-off").addClass("u-service-on").attr("title", "在线客服");
				e.html("<i></i>在线客服");
				d.removeClass("z-customer-off").addClass("z-customer-on").attr("title", "在线客服");
				d.find("cite").text("在线客服")
			} else {
				e.removeClass("u-service-on").addClass("u-service-off").attr("title", "离线留言");
				e.html("<i></i>离线留言");
				d.removeClass("z-customer-on").addClass("z-customer-off").attr("title", "离线留言");
				d.find("cite").text("离线留言")
			}
		},
		getCartNumFun: function() {
			var a = new $CartComm();
			a.getShopCartNum(function(b) {
				var f = 0;
				var e = 0;
				var h = "";
				if (b.code == 0) {
					f = b.num;
					e = b.str
				} else {
					if (b.code == -1) {
						f = 0
					}
				}
				if (f > 0) {
					h = f > 99 ? "...": f;
					YG.Bottom.Header.HeadCartNumObj.html("(" + h + ")");
					YG.Bottom.RightTool.RightCartNumObj.html(h)
				} else {
					YG.Bottom.Header.HeadCartNumObj.html("");
					YG.Bottom.RightTool.RightCartNumObj.html("0")
				}
				var c = location.href.toLowerCase();
				var g = c.indexOf("member.1yyg.com") > -1 && c.indexOf("referauth.do") == -1 && c.indexOf("referrals.do") == -1 ? true: false;
				if (g) {
					var d = $("#index_cart");
					if (f > 0) {
						$("#li_customer_service").next().addClass("f-member-cart2").find("em").html(h).show();
						if (d.length > 0) {
							d.html('<cite><a href="http://cart.1yyg.com/CartList.do" class="gray9" target="_blank">您的购物车有<em class="orange">' + h + '</em>件商品，合计：<em class="orange">￥' + formatFloat(e) + '</em><i class="f-tran">&gt;</i></a></cite>')
						}
					} else {
						$("#li_customer_service").next().removeClass("f-member-cart2").find("em").html("").hide();
						if (d.length > 0) {
							d.html('<p>您的购物车为空！<a href="http://www.1yyg.com" target="_blank" class="blue">立即去云购&gt;&gt;</a></p>')
						}
					}
				}
			})
		},
		getUserCartNum: function() {
			var d = this;
			var b = location.href.toLowerCase();
			var e = b.indexOf("member.1yyg.com") > -1 && b.indexOf("referauth.do") == -1 && b.indexOf("referrals.do") == -1 ? true: false;
			if (YG.Bottom.RightTool.RightCartObj.length > 0 || YG.Bottom.Header.HeadCartNumObj.length > 0 || e) {
				var a = [cartUrl];
				var f = true;
				for (var c = 0; c < a.length; c++) {
					if (location.href.toLowerCase().indexOf(a[c]) > -1) {
						f = false;
						break
					}
				}
				if (f) {
					d.getCartNumFun()
				}
			}
		},
		getUserTotalBuyCount: function() {
			var c = $("#ulHTotalBuy");
			var f = $("#spFundTotal");
			var d = 0;
			var e = 2000;
			var b = false;
			var a = function() {
				GetJPData(apiUrl, "totalBuyCount", "",
				function(o) {
					if (o.state == 0) {
						f.html("￥" + o.fundTotal);
						var k = o.count;
						if (d != k) {
							if (!b) {
								var s = k.toString().length;
								if (s > 10) {
									var r = "";
									for (var n = 0; n < s - 10; n++) {
										r += '<li class="num" type="add"><cite style="top: -243px;">';
										for (var p = 9; p >= 0; p--) {
											r += '<em t="' + p + '">' + p + "</em>"
										}
										r += "</cite><i></i></li>";
										d = "0" + d.toString()
									}
									c.children("li").eq(0).after(r);
									b = true
								}
							}
							if (d == 0) {
								d = k;
								c.children("li.num").each(function() {
									var j = '<cite style="top:-243px;">';
									for (var t = 9; t >= 0; t--) {
										j += '<em t="' + t + '">' + t + "</em>"
									}
									j += "</cite><i></i>";
									$(this).html(j)
								});
								var m = k.toString();
								var l = m.length;
								var h = m.split("");
								c.find("cite").each(function(w, j) {
									var u = $(this);
									var t = parseInt(h[w]);
									if (! (/^\d+$/.test(t))) {
										t = 0
									}
									u.animate({
										top: "-" + (27 * (9 - t)) + "px"
									},
									{
										queue: false,
										duration: e,
										complete: function() {}
									})
								})
							} else {
								var g = d.toString().split("");
								var q = k.toString().split("");
								d = k;
								c.find("cite").each(function(z, w) {
									var A = 0;
									var y = parseInt(g[z]);
									if (g[z] <= q[z]) {
										A = parseInt(q[z]) - parseInt(g[z])
									} else {
										A = 10 + parseInt(q[z]) - parseInt(g[z])
									}
									if (A != 0) {
										var B = $(this).children('em[t="' + y + '"]');
										var u = B.nextAll();
										for (var x = u.length - 1; x > -1; x--) {
											$(this).prepend($(u[x]))
										}
										var t = -(243 - A * 27);
										$(this).css({
											top: "-243px"
										}).animate({
											top: t
										},
										{
											queue: false,
											duration: e,
											complete: function() {}
										})
									}
								})
							}
						}
					}
				});
				setTimeout(a, 5000)
			};
			if (c.length > 0 || f.length > 0) {
				a()
			}
		},
		disablePassword: function() {
			$('input[type="password"]').bind("cut copy paste",
			function(a) {
				a.preventDefault()
			})
		}
	},
	Top: {
		TopRightBox: $("#ulTopRight"),
		liMsgObj: $("#liTopUMsg"),
		loadHeadADFun: function() {
			if (location.href.toLowerCase().indexOf("passport.1yyg.com") == -1) {
				var a = new Date();
				if (a.getDate() == 6) {
					return
				}
				var c = $.cookie("_topNotice3");
				if (c == null) {
					var b = $('<div class="banner-prompt clrfix"><div class="w1190"><span class="fl">公告：为提高服务质量，给您带来更优质的体验，2016年4月5日起，1元云购网将对福分、佣金、经验值等结算时间进行变更，<a href="http://group.1yyg.com/topic-14042.html" target="_blank" class="ckxq">点击查看详情&gt;&gt;</a></span><span class="fr"><a href="javascript:;" class="close" title="关闭"></a></span></div></div>');
					b.find("a.close").click(function() {
						b.remove();
						$.cookie("_topNotice3", "1", {
							domain: "1yyg.com",
							expires: 10,
							path: "/"
						});
						return false
					});
					$("div.g-toolbar").before(b)
				}
			}
		},
		loginInfoProcess: function() {
			var c = this;
			var a = location.href.toLowerCase();
			var d = a.indexOf("member.1yyg.com") > -1 && a.indexOf("referauth.do") == -1 && a.indexOf("referrals.do") == -1 ? true: false;
			var b = a.indexOf("u.1yyg.com") > -1 ? true: false;
			if (d || b) {
				c.liMsgObj.remove();
				c.liMsgObj.length = 0;
				$("#liHome,#liIndex").show().next().show();
				if (d) {
					YG.Bottom.RightTool.miniRightToolObj.remove()
				}
			} else {
				$("#liMember").show().next().show()
			}
			if (!d) {
				$("#liCCTV").show().prev().show();
				if (!b) {
					$("#liCollect").addClass("f-collect")
				}
			}
			_GetUserLoginInfo = function() {
				if (c.TopRightBox.length > 0) {
					GetJPData(apiUrl, "logininfo", "",
					function(e) {
						c.TopRightBox.children('li[type="nologin"]').remove();
						if (e.code == 1) {
							c.TopRightBox.prepend('<li><div class="u-menu-hd u-menu-login"><a href="http://member.1yyg.com/" title="' + e.username + '" class="blue"><span class="fl"><img src="http://faceimg.1yyg.com/userface/30/' + e.userPhoto + '"><s class="transparent-png"></s></span>' + e.username + '</a><a href="' + passportUrl + '/Logout.html" title="退出">[退出]</a></div></li><li class="f-gap"><s></s></li>');
							c.liMsgObj.attr("show", "1").show().next("li.f-gap").show()
						} else {
							if (e.code == 0) {
								c.TopRightBox.prepend('<li type="nologin"><div class="u-menu-hd"><a href="' + passportUrl + '/login.html?forward=rego" title="登录">登录</a></div></li><li type="nologin" class="f-gap"><s></s></li><li type="nologin"><div class="u-menu-hd"><a href="' + passportUrl + '/register.html?forward=rego" title="注册">注册</a></div></li><li class="f-gap"><s></s></li>');
								c.liMsgObj.attr("show", "-1").hide()
							}
						}
						c.loadingMsgFun()
					})
				}
			};
			_GetUserLoginInfo()
		},
		addFavorite: function() {
			var b = $("#btnTFavorite");
			if (b.length > 0) {
				var a = function() {
					var f = "1元云购";
					var c = "http://www.1yyg.com";
					try {
						window.external.addFavorite(c, f)
					} catch(d) {
						try {
							window.sidebar.addPanel(f, c, "")
						} catch(d) {
							alert("抱歉，您所使用的浏览器无法完成此操作。\r\n\r\n加入收藏失败，请使用Ctrl + D进行添加！")
						}
					}
				};
				b.bind("click",
				function() {
					a()
				})
			}
		},
		loadingMsgFun: function() {
			var c = this;
			if (c.liMsgObj && c.liMsgObj.length > 0) {
				var b = c.liMsgObj.attr("show");
				if (b != "-1") {
					if (b == "1") {
						var a = function() {
							var f = $.cookie("_msgFApply");
							var l = $.cookie("_msgSys");
							var e = $.cookie("_msgFPriv");
							var g = $.cookie("_msgReply");
							var i = 0;
							if (l && parseInt(l) > 0) {
								i += parseInt(l)
							}
							if (f && parseInt(f) > 0) {
								i += parseInt(f)
							}
							if (g && parseInt(g) > 0) {
								i += parseInt(g)
							}
							if (e && parseInt(e) > 0) {
								i += parseInt(e)
							}
							var k = "";
							var j = function(n, o, m) {
								return '<span><a href="' + memberUrl + n + '" title="' + o + '">' + o + (m && parseInt(m) > 0 ? "<em" + (parseInt(m) > 99 ? ' class="three-digit">...': ">" + m) + "</em>": "") + "</a></span>"
							};
							var h = "";
							h += j("/UserMessage.do", "系统消息", l);
							h += j("/FriendsApply.do", "好友请求", f);
							h += j("/ReplyCommentsMsg.do", "评论回复", g);
							h += j("/UserPrivMsg.do", "私信", e);
							c.liMsgObj.children("div.u-select").html(h);
							if (i > 0) {
								if (c.liMsgObj.children("div.u-menu-hd").find("em").length == 0) {
									c.liMsgObj.children("div.u-menu-hd").append("<em></em>")
								}
							} else {
								c.liMsgObj.children("div.u-menu-hd").find("em").remove()
							}
						};
						var d = function() {
							GetJPData(apiUrl, "ckmsg", "",
							function(e) {
								if (e.code == 0) {
									$.cookie("_msgTip", null, {
										domain: "1yyg.com"
									});
									a()
								}
								setTimeout(d, 30000)
							})
						};
						d()
					} else {
						setTimeout(c.loadingMsgFun, 1000)
					}
				}
			}
		},
		bindTopEvent: function() {
			$("#liMobile").hover(function() {
				$(this).addClass("u-arr-hover")
			},
			function() {
				$(this).removeClass("u-arr-hover")
			});
			$("#liMember").hover(function() {
				$(this).addClass("u-arr-hover")
			},
			function() {
				$(this).removeClass("u-arr-hover")
			});
			this.liMsgObj.hover(function() {
				$(this).addClass("u-arr-hover")
			},
			function() {
				$(this).removeClass("u-arr-hover")
			})
		}
	},
	Header: {
		HeadCartNumObj: $("#spHCart"),
		search: function() {
			var a = function(i) {
				var h = "汽车";
				var d = "输入“汽车”试试";
				var c = 50;
				var g = function() {
					i.unbind("blur").bind("focus", f);
					if (i.val() == "") {
						i.val(d).css({
							color: "#BBB",
							padding: "9px 130px 9px 5px",
							width: "105px"
						});
						i.next("span").css("zIndex", "10").show()
					}
				};
				var f = function() {
					i.unbind("focus").bind("blur", g).css({
						color: "#333",
						padding: "9px 0px 9px 5px",
						width: "235px"
					});
					if (i.val() == d) {
						i.val("").next("span").css("zIndex", "0").hide()
					}
				};
				var e = function() {
					var j = $.trim(i.val());
					if (j == d) {
						j = h
					}
					location.href = mainHttp + "/search/?q=" + encodeURIComponent(j.replace(/(\/)/g, ""))
				};
				i.focus(f).keydown(function(j) {
					if (13 == ((window.event) ? event.keyCode: j.keyCode)) {
						e()
					}
				}).keyup(function() {
					var j = $(this).val().trim();
					if (j.length > c) {
						$(this).val(j.substring(0, c))
					}
				}).attr("placeholder", "").css("color", "#BBB").val(d);
				$("#btnHSearch").click(function() {
					e();
					return false
				})
			};
			var b = $("#txtHSearch");
			if (b.length > 0) {
				a(b)
			}
		}
	},
	Menu: {
		goodsSort: function() {
			var b = $("#divSortList");
			if ($("body.home").length == 0) {
				$("#divGoodsSort").hover(function() {
					b.show()
				},
				function() {
					setTimeout(function() {
						if (!a) {
							b.hide()
						}
					},
					200)
				})
			}
			var a = false;
			b.children("dl").each(function() {
				$(this).hover(function(c) {
					a = true;
					stopBubble(c);
					$(this).addClass("hover");
					if ($(this).next().length > 0) {
						$(this).append("<i></i>")
					}
				},
				function(c) {
					a = false;
					$(this).removeClass("hover").children("i").remove()
				})
			})
		}
	},
	RightTool: {
		VC_CODE_EXPIRE: 1 * (1 / 24) * (5 / 60),
		SHOW_VC_CODE: "_SHOW_VC_CODE",
		RightToolObj: $("#rightTool"),
		RightCartObj: $("#rightTool").find("li.f-shopping-cart"),
		RightCartNumObj: $("#rightTool").find("li.f-shopping-cart").find("em"),
		RightClientObj: $("#rightTool").find("li.f-client"),
		RightCartMainObj: $("#divRTCartMain"),
		RightLoginObj: $("#divRTLogin"),
		RightColectObj: $("#rightTool").find(".f-pur-records"),
		RightColectMainObj: $("#divRTColect"),
		miniRightToolObj: $("#divRTool"),
		backTopObj: $("#gototop"),
		RightMiniCartNumObj: $("div.u-small-list").find("em"),
		isLoginPanelShow: false,
		isLoginPanelEventReg: false,
		isWxLoginJsLoaded: false,
		isPlaceHolderJsLoaded: false,
		isWxLoginStart: false,
		isFastLoginSubmiting: false,
		isHideCartPanelActive: true,
		isHideUserBuyPanelActive: true,
		isHideLoginPanelActive: true,
		thresholdwinWidth: 1190,
		thresholdwinHeight: 758,
		isMiniTool: !($("body").attr("rf") == "1" || $("body").attr("rf") == "2"),
		jqueryUIJsLoaded: false,
		sthMouseOver: function() {
			var a = this;
			$(document).on("mouseenter mouseleave", "#rightTool .m-banner-list li",
			function(c) {
				c.stopPropagation();
				var b = $(this);
				if (c.type == "mouseenter") {
					b.siblings().removeClass("toolbar-hover");
					if (b.hasClass("f-shopping-cart")) {
						b.addClass("toolbar-hover");
						if (a.RightCartNumObj.html() == "" || a.RightCartNumObj.html() == "0") {
							b.find("b.curr-arrow").hide()
						} else {
							b.find("b.curr-arrow").show()
						}
					} else {
						if (b.hasClass("f-pur-records")) {
							if (!a.isLoginPanelShow) {
								a.hidePanelByIndex(0)
							}
							b.addClass("toolbar-hover");
							b.find("cite").stop().animate({
								right: "40px"
							},
							400,
							function() {})
						} else {
							if (b.hasClass("f-client")) {
								if (!a.isLoginPanelShow) {
									a.hidePanelByIndex(0)
								}
								b.addClass("toolbar-hover");
								b.find(".u-activate").stop().animate({
									width: "143px"
								},
								400,
								function() {})
							} else {
								if (b.hasClass("f-weixin")) {
									if (!a.isLoginPanelShow) {
										a.hidePanelByIndex(0)
									}
									b.addClass("toolbar-hover");
									b.find(".u-activate").stop().animate({
										width: "97px"
									},
									400,
									function() {})
								} else {
									if (b.hasClass("f-customer-service") || b.hasClass("f-feedback") || b.hasClass("f-back-to")) {
										if (!a.isLoginPanelShow) {
											a.hidePanelByIndex(0)
										}
										if (b.hasClass("f-back-to")) {
											if ($(window).scrollTop() > 0) {
												b.addClass("toolbar-hover")
											}
										} else {
											b.addClass("toolbar-hover")
										}
										b.find("cite").stop().animate({
											right: "40px"
										},
										400,
										function() {});
										if (b.hasClass("f-customer-service")) {
											if (YG.Bottom.Comm.isInitQQEvent) {
												YG.Bottom.Comm.loadQQJS()
											} else {
												Base.getScript("http://wpa.b.qq.com/cgi/wpa.php",
												function() {
													YG.Bottom.Comm.isInitQQEvent = true;
													YG.Bottom.Comm.loadQQJS()
												})
											}
										}
									}
								}
							}
						}
					}
				} else {
					if (b.hasClass("f-shopping-cart")) {
						if (a.RightCartMainObj.attr("isShowed") == "1") {
							return
						}
						b.removeClass("toolbar-hover")
					} else {
						if (b.hasClass("f-client")) {
							b.find(".u-activate").stop().animate({
								width: "0px"
							},
							400,
							function() {
								b.removeClass("toolbar-hover")
							})
						} else {
							if (b.hasClass("f-weixin")) {
								b.find(".u-activate").stop().animate({
									width: "0px"
								},
								400,
								function() {
									b.removeClass("toolbar-hover")
								})
							} else {
								if (b.hasClass("f-pur-records") || b.hasClass("f-customer-service") || b.hasClass("f-feedback") || b.hasClass("f-back-to")) {
									b.find("cite").stop().animate({
										right: "-41px"
									},
									400,
									function() {
										b.removeClass("toolbar-hover")
									})
								}
							}
						}
					}
				}
			});
			$(document).on("mouseenter mouseleave", "#divRTool li",
			function(c) {
				c.stopPropagation();
				var b = $(this);
				if (c.type == "mouseenter") {
					b.addClass("cart-hover");
					if (b.hasClass("f-customer-service")) {
						if (YG.Bottom.Comm.isInitQQEvent) {
							YG.Bottom.Comm.loadQQJS()
						} else {
							Base.getScript("http://wpa.b.qq.com/cgi/wpa.php",
							function() {
								YG.Bottom.Comm.isInitQQEvent = true;
								YG.Bottom.Comm.loadQQJS()
							})
						}
					}
				} else {
					b.removeClass("cart-hover")
				}
			})
		},
		initFloatTools: function() {
			var d = this;
			if (d.RightToolObj.length > 0 || d.miniRightToolObj.length > 0) {
				var c = $(window).width();
				var b = $(window).height();
				var e = function() {
					if ($(window).scrollTop() > 0) {
						d.miniRightToolObj.fadeIn("slow")
					} else {
						d.miniRightToolObj.fadeOut("slow")
					}
				};
				var a = function() {
					if (d.isMiniTool) {
						e();
						$(document).on("click", "li.f-back-to",
						function() {
							$("body, html").animate({
								scrollTop: 0
							},
							100);
							return false
						})
					} else {
						d.switchRightTool(true);
						d.backTopObj.on("click",
						function() {
							$("body, html").animate({
								scrollTop: 0
							},
							100);
							return false
						})
					}
				};
				$(window).scroll(function() {
					if (d.isMiniTool) {
						e()
					} else {
						if ($(window).scrollTop() > 0) {
							d.backTopObj.show("slow")
						} else {
							d.backTopObj.parent().parent().removeClass("toolbar-hover");
							d.backTopObj.hide("slow")
						}
					}
				});
				a()
			}
		},
		showCartLoadding: function() {
			var a = $(window).height() - 37 - 70;
			var b = $("#divCartMainLoadingDiv");
			b.css({
				"margin-top": (a - b.height()) / 2 + "px"
			}).show()
		},
		showUserBuyLoadding: function() {
			var a = $(window).height() - 37;
			var b = $("#divRTColectLoadingDiv");
			b.css({
				"margin-top": (a - b.height()) / 2 + "px"
			}).show()
		},
		showUserBuyErrorMsg: function() {
			var a = $(window).height() - 37;
			var b = $("#divRTColectErrorDiv");
			var c = b.height();
			b.css({
				"margin-top": (a - c) / 2 + "px"
			}).show()
		},
		showMiniLoginErrorMsg: function(a, b) {
			if (a != null) {
				a.parent().parent().addClass("focus")
			}
			this.RightLoginObj.find("#miniLoginErrorMsgLi").html('<s class="z-clump-icon"></s>' + b);
			this.isFastLoginSubmiting = false
		},
		hideMiniLoginErrorMsg: function() {
			this.RightLoginObj.find("#miniLoginErrorMsgLi").html("")
		},
		showMiniLogin: function(b) {
			var d = this;
			d.isLoginPanelShow = b;
			if (b) {
				var e = d.RightLoginObj.find(".cartLogin-con").find("#username");
				var a = d.RightLoginObj.find(".cartLogin-con").find("#password");
				if (!d.isPlaceHolderJsLoaded) {
					Base.getScript("http://skin.1yyg.com/Plugins/jquery.enplaceholder.js?date=160607",
					function() {
						d.isPlaceHolderJsLoaded = true;
						e.placeholder({
							isUseSpan: true
						});
						a.placeholder({
							isUseSpan: true
						})
					})
				}
				if (!d.jqueryUIJsLoaded) {
					Base.getScript("http://skin.1yyg.com/Plugins/jquery-ui.js?date=160701",
					function() {
						d.jqueryUIJsLoaded = true;
						d.vcCodeEvtReg()
					})
				} else {
					d.vcCodeEvtReg()
				}
				var c = $.cookie(d.SHOW_VC_CODE);
				if (c == "1") {
					d.showVcCode()
				} else {
					d.hideVcCode()
				}
				if (!d.isLoginPanelEventReg) {
					d.minLoginEventReg()
				}
				var f = $.cookie("_uName");
				if (f != null && (YG.Bottom.Util.ckMobile(f) || YG.Bottom.Util.ckEmail(f))) {
					e.val(f)
				}
				if (d.isWxLoginJsLoaded) {
					d.RightLoginObj.children(".cartLogin-title,.cartLogin-con").show();
					d.RightLoginObj.children(".wxLogin-con").hide()
				}
				d.RightLoginObj.css({
					right: "-240px",
					display: "block"
				}).animate({
					right: "40px"
				},
				"slow",
				function() {
					if (e.val() == "") {
						e.focus()
					} else {
						if (a.val() == "") {
							a.focus()
						}
					}
				})
			} else {
				d.RightLoginObj.animate({
					right: "-240px"
				},
				"slow",
				function() {})
			}
		},
		loginSucCallFun: function() {
			window.location.reload()
		},
		submitMiniLogin: function() {
			var c = this;
			if (c.isFastLoginSubmiting) {
				return
			}
			c.isFastLoginSubmiting = true;
			var d = c.RightLoginObj.find("#miniLoginBtn");
			var e = c.RightLoginObj.find(".cartLogin-con").find("#username");
			var g = e.val();
			var a = c.RightLoginObj.find(".cartLogin-con").find("#password");
			var b = a.val();
			if (YG.Bottom.Util.ckMobile(g) === false && YG.Bottom.Util.ckEmail(g) === false) {
				c.showMiniLoginErrorMsg(e, "请输入正确的手机号或邮箱地址");
				return false
			}
			if (b == "") {
				c.showMiniLoginErrorMsg(a, "请输入登录密码");
				return false
			} else {
				if (!YG.Bottom.Util.ckPasswd(b)) {
					c.showMiniLoginErrorMsg(a, "登录密码为6-20长度的字符");
					a.val("");
					return false
				}
			}
			if (c.isVcCodeValidated === false) {
				c.showMiniLoginErrorMsg(null, "请按住滑块，拖动到最右边");
				return
			}
			var f = "name=" + g + "&pwd=" + YG.Bottom.Util.escape2(b) + "&auth=" + c.vcCodeAuthStr;
			d.addClass("letter").val("正在登录...");
			GetJPData("https://passport.1yyg.com", "userlogin", f,
			function(h) {
				var i = h.state;
				if (i != 0) {
					d.removeClass("letter").val("登录")
				}
				if (i == 0) {
					c.loginSucCallFun()
				} else {
					if (i == 1 && (h.num == -1 || h.num == -6 || h.num == -7)) {
						if (h.str == "1") {
							c.showVcCode();
							c.resetVcCode();
							if (h.num == -1) {
								$.cookie(c.SHOW_VC_CODE, 1, {
									expires: c.VC_CODE_EXPIRE,
									domain: "1yyg.com"
								});
								a.val("").focus();
								c.showMiniLoginErrorMsg(a, "登录密码错误，请重新输入")
							} else {
								if (h.num == -6) {
									c.showMiniLoginErrorMsg(null, "验证码错误，请重新验证！")
								} else {
									if (h.num == -7) {
										c.showMiniLoginErrorMsg(null, "请拖动滑块完成验证！")
									}
								}
							}
						} else {
							a.val("").focus();
							c.showMiniLoginErrorMsg(a, "登录密码错误，请重新输入")
						}
					} else {
						if (i == 1 && h.num == -2) {
							c.showMiniLoginErrorMsg(e, "此账号不存在，请重新输入")
						} else {
							if (i == 1 && h.num == -3) {
								c.showMiniLoginErrorMsg(e, "此账号已被冻结，请与客服联系！")
							} else {
								if (i == 1 && h.num == -4) {
									c.showMiniLoginErrorMsg(e, "此账号未激活，请与客服联系！")
								} else {
									if (i == 1 && h.num == -5) {
										c.showMiniLoginErrorMsg(null, "密码被系统锁定！")
									} else {
										if (i == 3 && h.num == 1) {
											c.showMiniLoginErrorMsg(null, "失败次数超限，被冻结5分钟！")
										} else {
											if (i == 3 && h.num == 2) {
												c.showMiniLoginErrorMsg(null, "失败次数超限，IP被冻结！")
											}
										}
									}
								}
							}
						}
					}
				}
				c.isFastLoginSubmiting = false
			})
		},
		switchMiniLogin: function() {
			var c = this;
			var a = this.RightLoginObj;
			var b = a.children(".cartLogin-title,.cartLogin-con");
			var d = a.children(".wxLogin-con");
			a.on("click", ".z-clump-icon.wx-login",
			function() {
				b.hide();
				d.show()
			});
			a.on("click", ".wxLogin-con a",
			function() {
				b.show();
				d.hide()
			});
			$("#btnQQLogin").click(function() {
				$.cookie("qFromUrl", $("#hidFromUrl").val());
				window.open("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100511748&redirect_uri=" + escape("https://passport.1yyg.com/qcback.html") + "&state=qq&scope=all");
				return false
			});
			a.on("click", ".delete-close",
			function() {
				c.showMiniLogin(false)
			});
			$("#btnWXLogin").click(function() {
				$.cookie("qFromUrl", escape("http://www.1yyg.com"));
				if (_IsIE && _IeVersion == 6) {
					window.open("https://open.weixin.qq.com/connect/qrconnect?appid=wxe61d43f2e02a5b10&redirect_uri=" + escape("http://www.1yyg.com") + "&response_type=code&scope=snsapi_login&state=wx#wechat_redirect")
				} else {
					var e = function() {
						if ($("#wxLoginImgContainer").children().length == 0) {
							var f = new WxLogin({
								id: "wxLoginImgContainer",
								appid: "wxe61d43f2e02a5b10",
								scope: "snsapi_login",
								redirect_uri: escape("https://passport.1yyg.com/qcback.html"),
								state: "wx",
								style: "",
								href: "https://skin.1yyg.com/css/minilayout.css?date=0617"
							})
						}
						if (c.isWxLoginStart) {
							return
						}
						c.isWxLoginStart = true
					};
					if (c.isWxLoginJsLoaded) {
						e()
					} else {
						Base.getScript("https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js",
						function() {
							e();
							c.isWxLoginJsLoaded = true
						})
					}
				}
			})
		},
		minLoginEventReg: function() {
			var a = this;
			var c = this.RightLoginObj.find("#username");
			var b = this.RightLoginObj.find("#password");
			c.on("focus",
			function(d) {
				stopBubble(d);
				$(this).parent().parent().addClass("focus")
			}).on("blur",
			function(d) {
				stopBubble(d);
				$(this).parent().parent().removeClass("focus")
			}).on("keydown",
			function(d) {
				stopBubble(d);
				a.hideMiniLoginErrorMsg()
			});
			b.on("focus",
			function(d) {
				stopBubble(d);
				$(this).parent().parent().addClass("focus")
			}).on("blur",
			function(d) {
				stopBubble(d);
				$(this).parent().parent().removeClass("focus")
			}).on("keydown",
			function(d) {
				stopBubble(d);
				a.hideMiniLoginErrorMsg()
			});
			this.RightLoginObj.on("click", "#miniLoginBtn",
			function(d) {
				stopBubble(d);
				a.submitMiniLogin()
			});
			$("body").click(function() {
				a.isHideCartPanelActive = true;
				a.hidePanelByIndex(0)
			}).find("#rightTool").click(function(d) {
				stopBubble(d)
			});
			a.isLoginPanelEventReg = true
		},
		isVcCodeValidated: true,
		isAdvancedVcCode: false,
		isDragEnabled: true,
		canvasWidth: 0,
		canvasHeight: 0,
		vcCodeAuthStr: "",
		showVcCode: function() {
			$("#divRTLogin").height(284);
			$("#vcCodeContainerLi").show()
		},
		hideVcCode: function() {
			$("#vcCodeContainerLi").hide();
			$("#divRTLogin").height(229)
		},
		getVcCode: function() {
			var b = this;
			b.isVcCodeValidated = false;
			var a = $("#divRTLogin");
			var c = $("#username", a).val();
			a.find("#canvasContainer").parent().show();
			b.$vcCanvas = $("#vcCanvas");
			b.$vcCanvas.css({
				width: b.canvasWidth + "px"
			});
			b.$dragBtn = $("#dragBtn");
			b.$dragBtnLeft = $("#dragBtnLeft");
			b.$dragBtnContainer = $("#dragBtnContainer");
			b.$canvasContainer = $("#canvasContainer");
			b.$vcCanvas.hide();
			GetJPData("https://passport.1yyg.com", "getVcChar", "key=" + c,
			function(d) {
				if (d.state == 1) {
					b.resetVcCode();
					b.showMiniLoginErrorMsg(null, "获取验证码太频繁，请稍后再试");
					return false
				} else {
					if (d.state == "0") {
						var e = d.str;
						$("#selectedChar").text(e);
						b.$dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(1)").hide();
						b.$dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(0),a").show();
						b.$canvasContainer.parent().show();
						b.$canvasContainer.css("height", b.canvasHeight + "px");
						b.$vcCanvas.attr("src", "https://passport.1yyg.com/api/GetVcImg.html?" + b.getVcImgParam(e)).show()
					}
				}
			})
		},
		resetVcCode: function() {
			var a = this;
			a.$dragBtn = $("#dragBtn");
			a.$dragBtnLeft = $("#dragBtnLeft");
			a.$dragBtnContainer = $("#dragBtnContainer");
			a.$canvasContainer = $("#canvasContainer");
			a.$dragBtnLeft.css("width", "0");
			a.$dragBtn.animate({
				left: "0"
			});
			a.$dragBtnContainer.children(".vc-slide-text").show();
			a.$dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(1)").hide();
			a.$dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(0),a").hide();
			a.$dragBtn.children("i").removeClass("ready-status vali-status wrong-status right-status").addClass("ready-status");
			a.$canvasContainer.parent().hide();
			a.isDragEnabled = true;
			a.isVcCodeValidated = false
		},
		getVcImgParam: function(b) {
			var c = this;
			var a = "width=" + c.canvasWidth + "&height=" + c.canvasHeight + "&selectedChar=" + b;
			return a
		},
		vcCodeEvtReg: function() {
			var f = this;
			var e = $("#divRTLogin");
			var h = $("#dragBtn", e);
			var c = $("#dragBtnLeft", e);
			var j = $("#dragBtnContainer", e);
			var a = $("#canvasContainer", e);
			var d = $("#vcCanvas", e);
			f.canvasWidth = 223;
			f.canvasHeight = 103;
			var i = h.outerWidth();
			h.draggable({
				containment: "#dragBtnContainer",
				start: function() {
					if (f.isDragEnabled === false) {
						return false
					}
					var k = f.RightLoginObj.find(".cartLogin-con").find("#username");
					var l = k.val();
					if (YG.Bottom.Util.ckMobile(l) === false && YG.Bottom.Util.ckEmail(l) === false) {
						f.showMiniLoginErrorMsg(k, "请输入正确的手机号或邮箱地址");
						return false
					}
					f.hideMiniLoginErrorMsg()
				},
				drag: function(l, m) {
					var k = m.position.left;
					c.css("width", k + "px")
				},
				stop: function(l, n) {
					var k = n.position.left;
					var m = j.outerWidth();
					if (k < m - i) {
						h.animate({
							left: "0"
						});
						c.animate({
							width: "0"
						})
					} else {
						var o = f.RightLoginObj.find("#username");
						var p = o.val();
						GetJPData("https://passport.1yyg.com", "getVcChar", "key=" + p,
						function(q) {
							if (q.state == 1) {
								f.resetVcCode();
								f.showMiniLoginErrorMsg(null, "获取验证码太频繁，请稍后再试");
								return false
							} else {
								if (q.state == 0) {
									var r = q.str;
									$("#selectedChar").text(r);
									j.children(".vc-slide-text").hide();
									j.children(".vc-slideBtnLeft").find("span:eq(1)").hide();
									j.children(".vc-slideBtnLeft").find("span:eq(0),a").show();
									a.parent().show();
									a.css("height", f.canvasHeight + "px");
									c.css("width", k + "px");
									h.css({
										"float": "left",
										left: k + "px"
									});
									h.children("i").removeClass("ready-status,vali-status,wrong-status,right-status").addClass("vali-status");
									d.attr("src", "https://passport.1yyg.com/api/GetVcImg.html?" + f.getVcImgParam(r));
									f.isDragEnabled = false
								}
							}
						})
					}
				}
			});
			var g = $("#refreshVcCode");
			var b = null;
			g.click(function() {
				if (b != null) {
					console.log("too fast！！");
					return
				}
				b = setTimeout(function() {
					b = null
				},
				200);
				h.children("i").attr("class", "passport-icon ready-status vali-status");
				f.getVcCode()
			});
			d.click(function(m) {
				var l = d.offset().left;
				var o = d.offset().top;
				var k = m.pageX - l;
				var n = m.pageY - o;
				GetJPData("https://passport.1yyg.com", "VcCompare", "x=" + k + "&y=" + n,
				function(p) {
					if (p.state == 1) {
						if (p.num == 1) {
							h.children("i").attr("class", "passport-icon wrong-status");
							f.getVcCode();
							return false
						} else {
							f.resetVcCode();
							f.showMiniLoginErrorMsg(null, "获取验证码太频繁，请稍后再试");
							return false
						}
					} else {
						if (p.state == 0) {
							f.isVcCodeValidated = true;
							f.isDragEnabled = false;
							c.find("span:eq(0),a").hide();
							c.find("span:eq(1)").show();
							h.children("i").attr("class", "passport-icon right-status");
							a.parent().hide();
							f.vcCodeAuthStr = p.str
						}
					}
				})
			})
		},
		showPanelByIndex: function(b) {
			var a = this;
			if (b == 0) {
				a.RightCartMainObj.css({
					display: "block",
					height: "100%"
				}).animate({
					right: "40px"
				},
				400,
				function() {
					a.RightCartMainObj.attr("isShowed", "1");
					a.RightCartObj.addClass("toolbar-hover")
				})
			} else {}
		},
		hidePanelByIndex: function(b) {
			var a = this;
			if (b == 0) {
				if (a.isLoginPanelShow) {
					a.showMiniLogin(false)
				}
				a.RightCartMainObj.attr("isShowed", "0");
				a.RightCartMainObj.stop().animate({
					right: "-240px"
				},
				400,
				function() {
					if (a.isHideCartPanelActive) {
						a.RightCartObj.removeClass("toolbar-hover");
						if (a.RightCartNumObj.html() == "" || a.RightCartNumObj.html() == "0") {
							a.RightCartObj.find("b.curr-arrow").hide()
						}
					}
				})
			} else {}
		},
		rightToolEvent: function() {
			var e = this;
			var d = null;
			var b = null;
			var a = null;
			var g = false;
			var f = false;
			var h = false;
			var c = false;
			e.RightCartObj.on("mouseenter",
			function() {
				if (d != null) {
					clearTimeout(d)
				}
				if (a != null) {
					clearTimeout(a)
				}
				var i = function() {
					if (e.RightCartMainObj.attr("isShowed") == "1") {
						return
					}
					var k = e.RightCartNumObj.html();
					if (k == "" || k == "0") {
						return
					}
					e.showCartLoadding();
					e.RightCartMainObj.find(".cartEmpty").hide();
					e.showPanelByIndex(0);
					if (!g) {
						Base.getScript("http://skin.1yyg.com/js/cartTool.js?date=160725",
						function() {
							g = true;
							YG.miniCartTool.init(e.RightCartMainObj)
						})
					} else {
						YG.miniCartTool.init(e.RightCartMainObj)
					}
				};
				var j = function() {
					e.isHideCartPanelActive = false;
					i()
				};
				if ($(window).width() < e.thresholdwinWidth) {
					e.RightToolObj.stop().animate({
						right: 0
					},
					400,
					function() {
						j()
					})
				} else {
					j()
				}
			}).on("mouseleave",
			function() {
				if (e.isLoginPanelShow) {
					return
				}
				e.isHideCartPanelActive = true;
				if (e.RightCartMainObj.attr("isShowed") == "1") {
					if (d != null) {
						clearTimeout(d)
					}
					d = setTimeout(function() {
						e.hidePanelByIndex(0)
					},
					1000)
				}
			});
			e.RightCartMainObj.on("mouseenter",
			function() {
				e.isHideCartPanelActive = false;
				if (d != null) {
					clearTimeout(d)
				}
				if (a != null) {
					clearTimeout(a)
				}
			}).on("mouseleave",
			function() {
				if (e.isLoginPanelShow) {
					return
				}
				e.isHideCartPanelActive = true;
				if (e.RightCartMainObj.attr("isShowed") == "1") {
					if (d != null) {
						clearTimeout(d)
					}
					d = setTimeout(function() {
						e.hidePanelByIndex(0)
					},
					1000)
				}
			});
			e.RightToolObj.on("mouseenter",
			function() {
				if (a != null) {
					clearTimeout(a)
				}
			}).on("mouseleave",
			function() {
				if ($(window).width() < e.thresholdwinWidth) {
					if (a != null) {
						clearTimeout(a)
					}
					a = setTimeout(function() {
						e.switchRightTool(false)
					},
					1000)
				}
			});
			e.RightLoginObj.on("mouseenter",
			function() {
				if (d != null) {
					clearTimeout(d)
				}
				if (a != null) {
					clearTimeout(a)
				}
			}).on("mouseleave",
			function() {
				if (e.isLoginPanelShow) {
					return
				}
				e.isHideCartPanelActive = true;
				if (e.RightCartMainObj.attr("isShowed") == "1") {
					if (d != null) {
						clearTimeout(d)
					}
					d = setTimeout(function() {
						e.hidePanelByIndex(0)
					},
					1000)
				}
			})
		},
		switchRightTool: function(e) {
			var d = this;
			if (d.isMiniTool) {
				return
			}
			var b = $(window).width();
			var a = $(window).height() < 550 ? 550 : $(window).height();
			d.RightToolObj.children("div.g-status-standard").height(a);
			if (b < d.thresholdwinWidth) {
				d.RightCartObj.attr("style", "position:fixed;right:0;background:#5c5550;");
				d.RightClientObj.removeClass("toolbar-hover");
				d.isLoginPanelShow = false;
				d.RightLoginObj.hide();
				d.RightCartMainObj.attr("isShowed", "0").css({
					right: "-240px"
				});
				d.RightCartObj.removeClass("toolbar-hover");
				d.RightToolObj.css("right", "0").stop().animate({
					right: -40
				},
				500).show()
			} else {
				d.RightCartObj.removeAttr("style");
				d.RightToolObj.show().stop().animate({
					right: 0
				},
				1000,
				function() {});
				if (e) {
					if (b > d.thresholdwinWidth) {
						if ($.cookie("_AppDownLoadShow") != "1") {
							$.cookie("_AppDownLoadShow", "1", {
								domain: "1yyg.com"
							});
							d.RightClientObj.addClass("toolbar-hover").find(".u-activate").stop().animate({
								width: "143px"
							},
							400,
							function() {});
							setTimeout(function() {
								d.RightClientObj.find(".u-activate").stop().animate({
									width: "0px"
								},
								400,
								function() {
									d.RightClientObj.removeClass("toolbar-hover")
								})
							},
							10000)
						}
					} else {
						d.RightClientObj.find(".u-activate").stop().animate({
							width: "0px"
						},
						400,
						function() {
							d.RightClientObj.removeClass("toolbar-hover")
						})
					}
				}
				if ($(window).scrollTop() > 0) {
					d.backTopObj.show()
				} else {
					d.backTopObj.hide()
				}
			}
			var c = a - d.thresholdwinHeight;
			if (c < 0) {
				d.RightToolObj.find(".u-sentence").height(200 + c).children("span").css("background-image", "none")
			} else {
				d.RightToolObj.find(".u-sentence").height(200).children("span").css("background-image", "url(http://skin.1yyg.com/images/sentence.gif?v=0527)")
			}
		}
	},
	BindEvents: function() {
		var a = YG.Bottom.Comm;
		var b = YG.Bottom.Top;
		var e = YG.Bottom.Header;
		var c = YG.Bottom.Menu;
		var d = YG.Bottom.RightTool;
		a.setSrcFun();
		a.broswerProcess();
		a.getUserTotalBuyCount();
		a.getUserCartNum();
		a.loadQQService();
		a.customerService();
		a.disablePassword();
		a.serverTimeProcess();
		b.addFavorite();
		b.loginInfoProcess();
		b.bindTopEvent();
		e.search();
		c.goodsSort();
		d.initFloatTools();
		d.sthMouseOver();
		d.switchMiniLogin();
		d.rightToolEvent();
		loadImgFun()
	}
};
$(function() {
	Base.getScript(skinUrl + "/JS/Comm.js?date=16071500",
	function() {
		Base.getScript(skinUrl + "/JS/CartComm.js?date=160513", YG.Bottom.BindEvents)
	})
});