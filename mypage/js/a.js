var skinDomain = "http://skin.1yyg.com";
var goodsPic200 = "http://goodsimg.1yyg.com/goodspic/pic-200-200/";
(function(b, c) {
	function a(q, t) {
		var intervalObj = {
			intervalTime: 4000,
			duration: 500
		};
		var i = b.extend({},intervalObj, t);
		var d = q.find("#slideImg li"),
			h = q.find("#handle_box"),
			j = q.find("#ctrl_prev"),
			e = q.find("#ctrl_next"),
			s = "",
			o,
			p = d.length,
			n = -1,
			f = null;
		if(p == 1) {
			return !0
		}
		b.each(d,
			function(u, v) {
				s += '<li><a href="javascript:;"></a></li>'
			});
		h.append(s);
		o = h.find("li");

		function r(u) {
			var v = d.filter(".slide-active");
			d.stop(true, true);
			d.eq(u).animate({
				opacity: 1
			}).css("z-index", "1").siblings().animate({
				opacity: 0
			}).css("z-index", "0");
			o && o.removeClass("hover").eq(u).addClass("hover")
		}

		function g() {
			n--;
			n = n < 0 ? p - 1 : n;
			r(n)
		}

		function l() {
			n++;
			n = n > p - 1 ? 0 : n;
			r(n)
		}

		function m() {
			if(f) {
				clearInterval(f)
			}
			f = setInterval(function() {
					l()
				},
				i.intervalTime)
		}
		q.on("click", "#ctrl_prev",
			function(u) {
				g()
			}).on("click", "#ctrl_next",
			function(u) {
				l()
			}).on("click", "#handle_box li",
			function(v) {
				if(b(this).hasClass("hover")) {
					return
				}
				var u = b(this).index();
				n = u;
				r(u)
			});
		b("#handle_box li").on("mouseenter",
			function() {
				if(b(this).hasClass("hover")) {
					return
				}
				var u = b(this).index();
				n = u;
				r(u)
			});
		q.on("mouseenter",
			function(u) {
				if(f) {
					clearInterval(f)
				}
				j.show();
				e.show()
			}).on("mouseleave",
			function(u) {
				m();
				j.hide();
				e.hide()
			});
		l();
		m()
	}
	b.fn.showSlider = function(d) {
		return this.each(function(e, f) {
			return a(b(this), d), !0
		})
	}
})(jQuery);
$(document).ready(function() {
	if(_IsIE && _IeVersion == 6) {
		if($.cookie("_ie6Upgrade") != "0") {
			var a = ($(window).width() - 900) / 2;
			var b = '<div id="divUpgradeIE6" class="upgrade-ie6" style="left:' + a + 'px;"><div class="upgrade-con"><span>亲爱的用户：您的浏览器版本过低，为保证您有更好的访问效果，推荐下载</span><span><a href="http://rj.baidu.com/soft/detail/14744.html" target="_blank"><img src="http://skin.1yyg.com/images/chrome_03.jpg" /></a></span><span><a href="http://rj.baidu.com/soft/detail/14744.html" target="_blank">谷歌浏览器</a></span><span>、</span><span><a href="http://rj.baidu.com/soft/detail/11843.html" target="_blank"><img src="http://skin.1yyg.com/images/firefox_03.jpg" /></a></span><span><a href="http://rj.baidu.com/soft/detail/11843.html" target="_blank">火狐浏览器</a></span><span>、</span><span><a href="http://se.360.cn/" target="_blank"><img src="http://skin.1yyg.com/images/aqllq_03.jpg" /></a></span><span><a href="http://se.360.cn/" target="_blank">360安全浏览器</a></span><span>或</span><span><a href="http://www.microsoft.com/en-us/download/default.aspx" target="_blank">升级IE浏览器</a></span><span class="ie6_close"><a name="ie6Close" title="关闭" href="javascript:;"><img src="http://skin.1yyg.com/images/ie6_close.jpg"></a></span></div></div>';
			var c = $(b);
			c.find('a[name="ie6Close"]').click(function() {
				$.cookie("_ie6Upgrade", "0", {
					domain: "www.1yyg.com"
				});
				c.remove();
				return false
			});
			$("div.wrapper").after(c);
			$(window).resize(function() {
				c.css("left", ($(window).width() - 900) / 2)
			})
		}
	}
	Base.getScript(skinDomain + "/JS/AjaxFun.js?v=141103",
		function() {
			Base.getScript("http://skin.1yyg.com/JS/jquery.onebuy.js?date=161207",
				function() {
					Base.getScript(skinDomain + "/JS/Parabola.js?v=160615", YG.www_Index.BindEvents)
				})
		})
});
YG.www_Index = {
	BindEvents: function() {
		var g = new $CartComm();
		var i = function(C) {
			$.PageDialog('<div class="mAltFail"><s></s>' + C + "</div>", {
				W: 175,
				H: 60,
				close: false,
				autoClose: true,
				submit: function() {
					location.reload()
				}
			})
		};
		var z = function(C) {
			$.PageDialog('<div class="mAltFail"><s></s>' + C + "</div>", {
				W: 210,
				H: 60,
				close: false,
				autoClose: true
			})
		};
		var j = function(I, D, E, C, K) {
			var F = 350;
			var H = 160;
			if(typeof(C) != "undefined") {
				F = C
			}
			if(typeof(C) != "undefined") {
				H = K
			}
			var J = null;
			var L = '<div class="z-popUp z-pop-box"><span class="gray3">' + I + '</span><a href="javascript:;" title="取消" class="z-btn-cancel">取消</a><a href="javascript:;" title="确定" class="z-btn-determine">确定</a></div>';
			var G = function() {
				var M = $("#pageDialog");
				M.find("a.z-btn-determine").click(function() {
					if(typeof(D) != "undefined" && D != null) {
						D()
					}
					$.PageDialog.close()
				});
				M.find("a.z-btn-cancel").click(function() {
					if(typeof(E) != "undefined" && E != null) {
						E()
					}
					$.PageDialog.close()
				})
			};
			$.PageDialog(L, {
				W: F,
				H: H,
				close: false,
				autoClose: false,
				ready: G
			})
		};
		$.fn.addShopCart = function(G, E, F, I, D) {
			var C = "num=" + E + "&codeID=" + F;
			var H = $(this);
			g.addShopCart(F, E,
				function(J) {
					if(J.code == 0 || J.code == 3) {
						_IsCartChanged = true;
						if(G == 1) {
							showParabola(H, E, I, D)
						} else {
							location.href = "http://cart.1yyg.com/CartList.do"
						}
					} else {
						if(J.code == 1) {
							if(J.num == 0) {
								FailDialog("啊哦！！不够那么多了！")
							} else {
								var Q = H.parent().parent();
								var O = Q.find("li.g-progress");
								var L = J.str;
								if(L != "") {
									var P = L.split("|");
									if(P != null && P.length == 6) {
										var M = function() {
											H.attr("codeid", P[0]);
											Q.find("li.soon-list-name").find("em").html(P[1]);
											Q.find("li.gray").html("价值：￥" + formatFloat(P[3]));
											O.find("dt").attr("title", "已完成" + P[5] + "%");
											O.find("b").attr("style", "width:" + P[5] + "%");
											O.find("span.orange").find("em").html(P[2]);
											O.find("span.gray6").find("em").html(P[3]);
											O.find("span.blue").find("em").html(P[4])
										};
										var K = function() {
											M();
											H.addShopCart(G, E, P[0], I, D)
										};
										var N = function() {
											M()
										};
										j("本云已满员，是否云购下一云？", K, N)
									}
								} else {
									FailDialog("本商品已结束");
									O.find("dt").attr("title", "已完成100%");
									O.find("b").attr("style", "width:100%");
									O.find("span.orange").find("em").html(O.find("span.gray6").find("em").html());
									O.find("span.blue").find("em").html("0")
								}
							}
						} else {
							if(J.code == 2) {
								FailDialog("哎呀！购物车满啦，删除一些吧！", 300)
							} else {
								i("商品添加失败！")
							}
						}
					}
				})
		};
		var v = function() {
			var D = "getbysortid";
			var C = $("#topLogoAd");
			GetJPData("http://poster.1yyg.com", D, "ID=3",
				function(F) {
					if(F.state == 0) {
						var E = F.listItems[0];
						if(E.type == 0) {
							C.html('<a href="' + E.url + '" class="u-top-ad" target="_blank" title="' + E.alt + '"><img width="' + E.width + '" height="' + E.height + '" src="' + E.src + '" /></a>')
						} else {
							C.html('<embed src="' + E.src + '" wmode="Transparent" width="' + E.width + '" height="' + E.height + '" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?p1_prod_version=shockwaveflash" type="application/x-shockwave-flash"></embed>')
						}
					}
				});
			GetJPData("http://poster.1yyg.com", D, "ID=2",
				function(G) {
					var H = "";
					if(G.state == 0) {
						var F = G.listItems;
						for(var E = 0; E < F.length; E++) {
							if(F[E].type == 1) {
								H += '<li><embed src="' + F[E].src + '" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?p1_prod_version=shockwaveflash" type="application/x-shockwave-flash" ';
								if(transparent) {
									H += ' wmode="Transparent"'
								}
								H += ' width="' + F[E].width + '" height="' + F[E].height + '"></embed></li>'
							} else {
								H += '<li><a href="' + F[E].url + '" target="_blank"><img src="' + F[E].src + '" alt="' + F[E].alt.reAjaxStr() + '" width="' + F[E].width + '" height="' + F[E].height + '" /></a></li>'
							}
						}
					}
					$("#slideImg").html(H).closest("#div_slide").showSlider({
						intervalTime: 4000,
						duration: 500
					})
				})
		};
		v();
		var a = function() {
			var H = $("#div_guide");
			var J = $("#guide_pre");
			var E = $("#guide_next");
			var N = $("#ul_guide").children("li");
			var K = $("#what_1yyg");
			var G = 0;
			var M = 0;
			var F = false;
			var O = function() {
				H.show();
				if(N.length <= 1) {
					J.hide();
					E.hide()
				} else {
					if(M <= 0) {
						M = 0;
						J.hide();
						E.show()
					} else {
						if(M >= (N.length - 1)) {
							M = N.length - 1;
							J.show();
							E.hide()
						} else {
							J.show();
							E.show()
						}
					}
				}
				N.eq(M).hide().fadeToggle();
				N.eq(M).siblings().hide()
			};
			var P = function() {
				H.hide();
				J.hide();
				E.show();
				N.eq(M).show();
				N.eq(M).siblings().hide();
				S = 0;
				if(Q != null) {
					clearInterval(Q)
				}
			};
			var L = function() {
				M++;
				O()
			};
			E.bind("click",
				function() {
					L()
				});
			J.bind("click",
				function() {
					M--;
					O()
				});
			var I = function() {
				if(F) {
					return
				}
				F = true;
				var T = H;
				T.css({
					left: T.width()
				}).show();
				T.animate({
					left: 0
				}, {
					queue: false,
					duration: 500,
					complete: function() {
						if(N.length <= 1) {
							J.hide();
							E.hide()
						} else {
							J.hide();
							E.show()
						}
						Q = setInterval(D, 1000);
						G = 1
					}
				})
			};
			var C = function() {
				if(!F) {
					return
				}
				F = false;
				var T = H;
				T.animate({
					left: T.width()
				}, {
					queue: false,
					duration: 500,
					complete: function() {
						M = 0;
						P();
						G = 0
					}
				})
			};
			$("#guide_close").bind("click",
				function() {
					C()
				});
			N.each(function(T) {
				T = T + 1;
				if(T > 1) {
					$(this).hide()
				}
				if(T < N.length) {
					$(this).children("a").bind("click", L)
				} else {
					$(this).children("a").bind("click", C)
				}
			});
			var S = 0;
			var R = 60;
			var Q = null;
			var D = function() {
				S++;
				if(S == R) {
					C()
				}
			};
			H.hover(function() {
					S = 0;
					if(Q != null) {
						clearInterval(Q)
					}
				},
				function() {
					Q = setInterval(D, 1000)
				});
			K.bind("click",
				function() {
					if(G == 0) {
						I()
					} else {
						C()
					}
				})
		};
		a();
		var n = function() {
			var E = $("#ul_Lottery");
			var C = 5;
			var G = false;
			var I = 0;
			var D = null;
			var F = false;
			var H = function() {
				GetJPData("http://api.1yyg.com", "GetStartRaffleAllList", "time=" + I,
					function(K) {
						if(K.errorCode == 0) {
							J(K, E)
						}
						if(D == null) {
							D = setInterval(H, 5000)
						}
					});
				var J = function(L, M) {
					I = L.maxSeconds;
					if(F) {
						return
					}
					var K = function(O, Q) {
						var V = O.length > C ? C : O.length;
						var Y = Q.width() + 100;
						var N = 0;
						for(var U = V - 1; U >= 0; U--) {
							var aa = O[U];
							if(Q.children("li[id='" + aa.codeID + "']").length <= 0) {
								var T = '<li id="' + aa.codeID + '" class="current">';
								T += '<dl class="m-in-progress">';
								T += '<dt><a href="product/' + aa.codeID + '.html" target="_blank" title="' + aa.goodsSName + '">';
								T += '<img alt="' + aa.goodsSName + '" src="' + goodsPic200 + aa.goodsPic + '" /></a></dt>';
								T += '<dd class="u-name"><a href="product/' + aa.codeID + '.html" title="(第' + aa.period + "云)" + aa.goodsSName + '" >(第' + aa.period + "云)" + aa.goodsSName + "</a></dd>";
								T += '<dd class="gray">价值：￥' + formatFloat(aa.price) + "</dd>";
								T += '<dd class="u-time" id="dd_time"><em>揭晓倒计时</em><span><b>00</b> : <b>00</b> : <b><i>0</i><i>0</i></b></span></dd>';
								T += "</dl>";
								T += "<s class='transparent-png'></s>";
								T += "</li>";
								var W = $(T);
								Q.prepend(W);
								N++;
								var R = W.width();
								Q.css({
									width: Y + N * R + "px"
								});
								Q.css("marginLeft", -1 * N * R + "px");
								W.StartTimeOut(aa.codeID, parseInt(aa.seconds))
							}
						}
						Q.children("li").each(function(ab) {
							var ac = $(this);
							if((ab + 1) % 5 == 0) {
								if(ac.attr("class") == "current") {
									ac.addClass("current2")
								}
							}
						});
						if(N > 0) {
							var Z = Q.parent();
							var X = Q.children("li:first").hasClass("current") ? "1px solid #ff6600" : "1px solid #e4e4e4";
							var P = Q.children("li:last").hasClass("current") ? "1px solid #ff6600" : "1px solid #e4e4e4";
							Z.css("border-left", X);
							Z.css("border-right", P);
							Z.css({
								width: (Z.width() - 2) + "px"
							});
							F = true;
							var S = N < 2 ? 1000 : 2000;
							Q.animate({
									marginLeft: "0px"
								},
								S,
								function() {
									Z.css("border-left", "none");
									Z.css("border-right", "none");
									Z.css({
										width: ($(window).width() < 1190 ? 990 : 1190) + "px"
									});
									for(var ab = 0; ab < N; ab++) {
										Q.children("li:last").remove()
									}
									Q.css({
										width: Y + "px"
									});
									F = false
								})
						}
					};
					if(G) {
						K(L.listItems, M)
					} else {
						Base.getScript(skinDomain + "/JS/indexLotteryFun.js?v=160323",
							function() {
								G = true;
								K(L.listItems, M)
							})
					}
				}
			};
			H();
			$(window).resize(function() {
				var J = $("#ul_Lottery").parent();
				if($(window).width() < 1190) {
					J.css({
						width: "990px"
					})
				} else {
					J.css({
						width: "1190px"
					})
				}
			})
		};
		n();
		var y = true;
		$.fn.showGoodsBuyCount = function(G, E, C) {
			var D = $(this);
			var F = D.children("div.u_buyCount");
			D.hover(function() {
					if(!y) {
						return
					}
					var H = F.attr("codeid");
					if(F.html() == "") {
						GetJPData("http://api.1yyg.com", "getBuyCount", "codeID=" + H,
							function(J) {
								if(J.code == 0) {
									var I = parseInt(D.width()) - C;
									F.css({
										width: I + "px",
										left: E + "px"
									}).html("<p></p><h3>本云您已参与<em>" + J.count + "</em>人次</h3>").show();
									if(D.hasClass(G)) {
										F.show()
									}
								} else {
									if(J.code == -10) {
										y = false
									} else {
										F.hide().html("&nbsp;")
									}
								}
							})
					} else {
						if(F.html() != "&nbsp;") {
							F.show()
						}
					}
				},
				function() {
					F.hide()
				})
		};
		var d = function(F) {
			var H = parseInt(F.codeSales);
			var G = parseInt(F.codeQuantity);
			var D = parseInt(G - H);
			var C = formatFloat((H * 100) / G);
			C = H > 0 && C < 1 ? 1 : C;
			var E = '<li class="g-progress"><dl class="m-progress"><dt title="已完成' + C + '%"><b style="width:' + C + '%;"></b></dt><dd><span class="orange fl"><em>' + H + '</em>已参与</span><span class="gray6 fl"><em>' + G + '</em>总需人次</span><span class="blue fr"><em>' + D + "</em>剩余</span></dd></dl></li>";
			return E
		};
		var s = function() {
			var E = $("#divHotGoodsList");
			var D = 8;
			GetJPData("http://api.1yyg.com", "getRecGoodsList", "goodsLabel=12&quantity=8",
				function(F) {
					if(F.code == 0) {
						C(F, E, D)
					}
				});
			var C = function(M, G, U) {
				var J = M.listItems;
				G.empty();
				var S = J.length > U ? U : J.length;
				var O = $(window).width() < 1190;
				for(var N = 0; N < S; N++) {
					var F = "(第" + J[N].codePeriod + "云)&nbsp;" + J[N].goodsName;
					var R = "(第" + J[N].codePeriod + "云)" + J[N].goodsName;
					var H = '<div goodsID="' + J[N].goodsID + '" class="g-hotL-list" ' + (N > 5 && O ? 'style="display:none;' : "") + '><div class="g-hotL-con"><ul><li class="g-hot-pic"><a href="products/' + J[N].goodsID + '.html" target="_blank" title="' + R + '"><img name="goodsImg" alt="' + R + '" src="' + goodsPic200 + J[N].goodsPic + '" /></a></li><li class="g-hot-name"><a href="products/' + J[N].goodsID + '.html" target="_blank" title="' + R + '">' + F + '</a></li><li class="gray">价值：￥' + formatFloat(J[N].codePrice) + "</li>" + d(J[N]) + '<li><a href="javascript:;" class="u-imm" title="立即1元云购" id="btnHotYgOnePay' + N + '" >立即1元云购</a><a href="javascript:;"  title="加入到购物车" codeid="' + J[N].codeID + '" class="u-cart"><s></s></a></li></ul>';
					var I = "";
					switch(parseInt(J[N].goodsTag)) {
						case 1:
							I += '<div class="f-callout"><span class="F_goods_xp transparent-png">新品</span></div>';
							break;
						case 2:
							break;
						case 3:
							I += '<div class="f-callout"><span class="F_goods_rq transparent-png">人气</span></div>';
							break;
						case 10:
							I += '<div class="f-callout"><span class="F_goods_xg transparent-png">限购</span></div>';
							break
					}
					if(I != "") {
						H += I
					}
					H += '</div><div class="u_buyCount" style="top:169px;" codeid="' + J[N].codeID + '"></div></div>';
					var P = $(H);
					P.hover(function() {
							$(this).addClass("g-hotL-hover")
						},
						function() {
							$(this).removeClass("g-hotL-hover")
						});
					var L = "http://goodsimg.1yyg.com/GoodsPic/pic-70-70/" + J[N].goodsPic;
					var Q = I.indexOf("限购") != -1 ? true : false;
					var K = [{
						isLimitBuy: Q,
						image: L,
						codeId: J[N].codeID,
						goodsId: J[N].goodsID,
						periods: J[N].codePeriod,
						surplus: parseInt(J[N].codeQuantity) - parseInt(J[N].codeSales),
						callBackFunc: w,
					}];
					P.find("a#btnHotYgOnePay" + N).OneBuy({
						extend: K
					});
					P.find("a.u-cart").click(function(X) {
						var Y = $(this);
						var V = Y.attr("codeid");
						var W = Y.parent().parent().find("img[name='goodsImg']");
						Y.addShopCart(1, 1, V, W,
							function() {
								_InsertIntoCart()
							});
						return false
					});
					G.append(P)
				}
				var T = G.children("div").length;
				for(var N = 0; N < (8 - T); N++) {
					G.append('<div class="g-hotL-list" ' + (N > 5 && O ? 'style="display:none;"' : "") + '><div class="g-hotL-con"></div></div>')
				}
				$(window).resize(function() {
					if($(window).width() <= 1170) {
						G.children("div:gt(5)").hide()
					} else {
						G.children("div").show()
					}
				})
			}
		};
		var u = function() {
			var K = $("#UserBuyNewList");
			var L = K.children("li").length;
			var J = $("#hidBuyID").val();
			var D = 0;
			var E = 14;
			var F = 7;
			var C = 0;
			var I = function() {
				GetJPData("http://api.1yyg.com", "GetUserBuyNewList", "buyID=" + J,
					function(R) {
						if(R.code == 0) {
							var Q = R.data;
							var S = K.children("li").length - F;
							var M = Q.length;
							var P = "";
							for(var O = (M - 1); O >= 0; O--) {
								var N = "<li>";
								N += '<span class="fl"><a href="http://u.1yyg.com/' + Q[O].userWeb + '" target="_blank" title="' + Q[O].userName + '">';
								N += '<img alt="' + Q[O].userName + '"  width="40" height="40" src="http://faceimg.1yyg.com/UserFace/' + Q[O].userPhoto + "\" /><i class='transparent-png'></i></a></span>";
								N += "<p>";
								N += '<a target="_blank" href="http://u.1yyg.com/' + Q[O].userWeb + '" title="' + Q[O].userName + '" class="blue">' + Q[O].userName + "</a><br />";
								N += '<a target="_blank" href="product/' + Q[O].codeID + '.html" target="_blank" title="' + Q[O].codeGoodsName + '" class="u-ongoing">' + Q[O].codeGoodsName + "</a>";
								N += "</p>";
								N += "</li>";
								if(O == 0) {
									J = Q[0].buyID
								}
								P += N
							}
							K.html(P)
						}
					})
			};
			var H = function() {
				if(C >= 5) {
					C = 0;
					I()
				} else {
					C++
				}
				var N = K.find("li:last");
				var M = 89;
				K.prepend(N).css("marginTop", "-" + M + "px");
				K.animate({
						marginTop: "0px"
					},
					800)
			};
			var G = setInterval(H, 2000);
			K.hover(function() {
					clearInterval(G);
					G = null
				},
				function() {
					G = setInterval(H, 2000)
				})
		};
		var b = function() {
			var D = $("#divSoonGoodsList");
			var E = 24;
			var F = function() {
				return "sortID=0&brandID=0&orderFlag=10&FIdx=1&EIdx=" + E + "&isCount=0"
			};
			GetJPData("http://api.1yyg.com", "getGoodsList", F(),
				function(G) {
					if(G.Code == 0) {
						C(G, D, E)
					}
				});
			var C = function(P, I, V) {
				var L = P.Data.Tables.Table1.Rows;
				I.empty();
				var U = L.length > V ? V : L.length;
				for(var Q = 0; Q < U; Q++) {
					var H = "(第<em>" + L[Q].codePeriod + "</em>云)&nbsp;" + L[Q].goodsSName;
					var T = "(第" + L[Q].codePeriod + "云)" + L[Q].goodsSName;
					var G = parseInt(parseInt(L[Q].codeQuantity) - parseInt(L[Q].codeSales));
					var O = L[Q].goodsTag;
					var J = '<div class="soon-list-con" goodsID="' + L[Q].goodsID + '" idx="' + (Q + 1) + '"><div class="soon-list"><ul><li class="g-soon-pic"><a href="products/' + L[Q].goodsID + '.html" target="_blank" title="' + T + '"><img name="goodsImg"  alt="' + T + '" src="' + goodsPic200 + L[Q].goodsPic + '" /></a></li><li class="soon-list-name"><a href="products/' + L[Q].goodsID + '.html" target="_blank" title="' + T + '">' + H + '</a></li><li class="gray">价值：￥' + formatFloat(L[Q].codePrice) + "</li>" + d(L[Q]) + '<li><a href="javascript:;"  title="立即1元云购"  class="u-now" id="btnLimitYgOnePay' + Q + '">立即1元云购</a><a href="javascript:;"  title="加入到购物车" codeid="' + L[Q].codeID + '" surplus="' + G + '" class="u-cart"><s></s></a></li></ul>';
					var K = "";
					switch(parseInt(L[Q].goodsTag)) {
						case 1:
							K += '<div class="f-callout"><span class="F_goods_xp transparent-png">新品</span></div>';
							break;
						case 2:
							K += '<div class="f-callout"><span class="F_goods_tj transparent-png">推荐</span></div>';
							break;
						case 3:
							K += '<div class="f-callout"><span class="F_goods_rq transparent-png">人气</span></div>';
							break;
						case 10:
							K += '<div class="f-callout"><span class="F_goods_xg transparent-png">限购</span></div>';
							break
					}
					if(K != "") {
						J += K
					}
					J += "</div>";
					J += '<div class="u_buyCount" style="top:200px;" codeid="' + L[Q].codeID + '"></div></div>';
					var R = $(J);
					R.hover(function() {
							var X = $(this).attr("idx");
							var W = X % 4 == 0 ? "soon-list-hover soon-list-hover2" : "soon-list-hover";
							$(this).addClass(W)
						},
						function() {
							var X = $(this).attr("idx");
							var W = X % 4 == 0 ? "soon-list-hover soon-list-hover2" : "soon-list-hover";
							$(this).removeClass(W)
						});
					var N = "http://goodsimg.1yyg.com/GoodsPic/pic-70-70/" + L[Q].goodsPic;
					var S = L[Q].codeLimitBuy > 0 ? true : false;
					var M = [{
						isLimitBuy: S,
						image: N,
						codeId: L[Q].codeID,
						goodsId: L[Q].goodsID,
						periods: L[Q].codePeriod,
						surplus: G,
						callBackFunc: A,
					}];
					R.find("a#btnLimitYgOnePay" + Q).OneBuy({
						extend: M
					});
					R.find("a.u-cart").click(function(Y) {
						var aa = $(this);
						var W = aa.attr("codeid");
						var X = aa.parent().parent().find("img[name='goodsImg']");
						var Z = aa.attr("surplus");
						aa.addShopCart(1, 1, W, X,
							function() {
								_InsertIntoCart()
							});
						return false
					});
					I.append(R)
				}
			}
		};

		function A(C) {
			if(C != null) {
				var D = "goodsID=" + C.goodsId;
				p(C, $("div[" + D + "]").find("div.soon-list").eq(0))
			}
		}

		function w(C) {
			if(C != null) {
				var D = "goodsID=" + C.goodsId;
				p(C, $("div[" + D + "]").find("div.g-hotL-con").eq(0))
			}
		}

		function p(N, K) {
			if(N != null) {
				var D = K.find("li.g-progress");
				var L = K.find("a.u-cart").eq(0);
				var E = D.find("dt");
				var M = D.find("b");
				var F = D.find("span.orange").find("em");
				var I = D.find("span.gray6").find("em");
				var H = D.find("span.blue").find("em");
				var C = K.hasClass("g-hotL-con") ? K.find("li.g-hot-name").find("a") : K.find("li.soon-list-name").find("a");
				if(N.alreadybuy == N.totalnum) {
					N.ratio == 100
				}
				if(N.ratio == 100) {
					E.find("dt").attr("title", "已完成100%");
					M.attr("style", "width:100%");
					F.html(I.html());
					H.html("0")
				} else {
					L.attr("codeid", N.codeId);
					L.attr("surplus", N.surplus);
					var J = ((N.alreadybuy / N.totalnum) * 100).toFixed(0);
					if(J == 100) {
						E.attr("title", "已完成0%");
						M.attr("style", "width:0%");
						F.text(0);
						I.text(N.totalnum);
						H.text(N.totalnum);
						var G = C.text().replace("第" + N.periods + "云", "第" + (parseInt(N.periods) + 1) + "云");
						C.text(G).attr("title", G)
					} else {
						E.attr("title", "已完成" + J + "%");
						M.attr("style", "width:" + J + "%");
						F.text(N.alreadybuy);
						I.text(N.totalnum);
						H.text(N.surplus)
					}
				}
			}
		}
		var f = function() {
			var D = 8;
			var C = $("#divNewGoodsList");
			GetJPData("http://api.1yyg.com", "getRecGoodsList", "goodsLabel=13&quantity=8",
				function(F) {
					if(F.code == 0) {
						E(F, C, D)
					}
				});
			var E = function(J, G, P) {
				var I = J.listItems;
				G.empty();
				var N = I.length > P ? P : I.length;
				for(var K = 0; K < N; K++) {
					var F = "(第" + I[K].codePeriod + "云)&nbsp;" + I[K].goodsName;
					var M = "(第" + I[K].codePeriod + "云)" + I[K].goodsName;
					var H = '<div class="soon-list-con" idx="' + (K + 1) + '"><div class="soon-list"><ul><li class="g-soon-pic"><a href="products/' + I[K].goodsID + '.html" target="_blank" title="' + M + '"><img  alt="' + M + '" src="' + goodsPic200 + I[K].goodsPic + '" /></a></li><li class="soon-list-name"><a href="products/' + I[K].goodsID + '.html" target="_blank" title="' + M + '">' + F + '</a></li><li class="gray">价值：￥' + formatFloat(I[K].codePrice) + '</li></ul></div><div class="u_buyCount" style="top:210px;" codeid="' + I[K].codeID + '"></div></div>';
					var L = $(H);
					L.hover(function() {
							var R = $(this).attr("idx");
							var Q = R % 4 == 0 ? "soon-list-hover soon-list-hover2" : "soon-list-hover";
							$(this).addClass(Q)
						},
						function() {
							var R = $(this).attr("idx");
							var Q = R % 4 == 0 ? "soon-list-hover soon-list-hover2" : "soon-list-hover";
							$(this).removeClass(Q)
						});
					G.append(L)
				}
				var O = G.children("div").length;
				for(var K = 0; K < (8 - O); K++) {
					G.append('<div class="soon-list-con"><div class="soon-list"></div></div>')
				}
			}
		};
		var e = function() {
			var D = $("#divPostRec");
			var C = $("#ul_PostList");
			GetJPData("http://api.1yyg.com", "getRecPostList", "",
				function(J) {
					if(J.code == 0) {
						var N = J.listItems;
						var K = N.length;
						var M = "http://postimg.1yyg.com/UserPost/RecHome/";
						var F = "http://post.1yyg.com/detail-";
						var E = "http://u.1yyg.com/";
						D.empty();
						C.empty();
						if(K > 0) {
							var G = '<dl><dt><a href="' + F + N[0].postID + '.html" target="_blank" title="' + N[0].postTitle + '"><img  src="' + M + N[0].postImg + '" /></a></dt><dd class="u-user"><p class="u-head"><a href="' + E + N[0].userWeb + '" target="_blank" title="' + N[0].userName + '"><img alt="' + N[0].postTitle + '" src="http://faceimg.1yyg.com/UserFace/' + N[0].userPhoto + '" width="40" height="40" /><i class="transparent-png"></i></a></p><p class="u-info"><span><a href="' + E + N[0].userWeb + '" target="_blank" title="' + N[0].userName + '">' + N[0].userName + "</a><em>" + N[0].postTime + '</em></span><cite><a href="' + F + N[0].postID + '.html" target="_blank" title="' + N[0].postTitle + '">' + N[0].postTitle + '</a></cite></p></dd><dd class="m-summary"><cite><a href="' + F + N[0].postID + '.html" target="_blank">' + N[0].postContent + "</a></cite><b><s></s></b></dd></dl>";
							var L = $(G);
							D.html(L);
							K = K >= 7 ? 7 : K;
							for(var I = 1; I < K; I++) {
								G = '<li><a href="' + F + N[I].postID + '.html" target="_blank" title="' + N[I].postTitle + '"><cite><img alt="' + N[I].postTitle + '" src="' + M + "small/" + N[I].postImg + '" /></cite><p title="' + N[I].postTitle + '">' + N[I].postTitle + "</p></a></li>";
								var L = $(G);
								C.append(L)
							}
							var H = C.children("li").length;
							for(var I = 0; I < (6 - H); I++) {
								C.append("<li></li>")
							}
						}
					}
				})
		};
		var B = 0;
		var t = [0, 0, 0, 0];
		var q = $("#divHotGoodsList");
		var h = $("#divSoonGoodsList");
		var r = $("#divNewGoodsList");
		var x = $("#divPostRec");
		var l = q.offset().top - $(window).height();
		var c = 0;
		var m = 0;
		var o = 0;
		$(window).scroll(function() {
			k()
		});
		var k = function() {
			B = $(window).scrollTop();
			c = h.offset().top - $(window).height();
			m = r.offset().top - $(window).height();
			o = x.offset().top - $(window).height();
			if(B >= l) {
				if(t[0] == 0) {
					t[0] = 1;
					s();
					u()
				}
			}
			if(B >= c) {
				if(t[1] == 0) {
					t[1] = 1;
					b()
				}
			}
			if(B >= m) {
				if(t[2] == 0) {
					t[2] = 1;
					f()
				}
			}
			if(B >= o) {
				if(t[3] == 0) {
					t[3] = 1;
					e()
				}
			}
		};
		if($(window).scrollTop() > l) {
			k()
		}
	}
};