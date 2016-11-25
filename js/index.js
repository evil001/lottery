var skinDomain = "http://skin.1yyg.com";
var goodsPic200 = "http://goodsimg.1yyg.com/goodspic/pic-200-200/"; 
(function(b, c) {
	function a(q, t) {
		var k = {
			intervalTime: 4000,
			duration: 500
		};
		var i = b.extend({}, k, t);
		var d = q.find("#slideImg li"),
		h = q.find("#handle_box"),
		j = q.find("#ctrl_prev"),
		e = q.find("#ctrl_next"),
		s = "",
		o,
		p = d.length,
		n = -1,
		f = null;
		if (p == 1) {
			return ! 0
		}
		b.each(d, function(u, v) {
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
			if (f) {
				clearInterval(f)
			}
			f = setInterval(function() {
				l()
			}, i.intervalTime)
		}
		q.on("click", "#ctrl_prev", function(u) {
			g()
		}).on("click", "#ctrl_next",
		function(u) {
			l()
		}).on("click", "#handle_box li",
		function(v) {
			if (b(this).hasClass("hover")) {
				return
			}
			var u = b(this).index();
			n = u;
			r(u)
		});
		b("#handle_box li").on("mouseenter", function() {
			if (b(this).hasClass("hover")) {
				return
			}
			var u = b(this).index();
			n = u;
			r(u)
		});
		q.on("mouseenter", function(u) {
			if (f) {
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
		m();
	}
	b.fn.showSlider = function(d) {
		return this.each(function(e, f) {
			return a(b(this), d),
			!0
		})
	}
})(jQuery);
$(document).ready(function() {
	if (_IsIE && _IeVersion == 6) {
		if ($.cookie("_ie6Upgrade") != "0") {
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
		Base.getScript(skinDomain + "/JS/Parabola.js?v=160615", YG.www_Index.BindEvents)
	})
});
YG.www_Index = {
	BindEvents: function() {
		var g = new $CartComm();
		var i = function(z) {
			$.PageDialog('<div class="mAltFail"><s></s>' + z + "</div>", {
				W: 175,
				H: 60,
				close: false,
				autoClose: true,
				submit: function() {
					location.reload()
				}
			})
		};
		var x = function(z) {
			$.PageDialog('<div class="mAltFail"><s></s>' + z + "</div>", {
				W: 210,
				H: 60,
				close: false,
				autoClose: true
			})
		};
		var j = function(F, A, B, z, H) {
			var C = 350;
			var E = 160;
			if (typeof(z) != "undefined") {
				C = z
			}
			if (typeof(z) != "undefined") {
				E = H
			}
			var G = null;
			var I = '<div class="z-popUp z-pop-box"><span class="gray3">' + F + '</span><a href="javascript:;" title="取消" class="z-btn-cancel">取消</a><a href="javascript:;" title="确定" class="z-btn-determine">确定</a></div>';
			var D = function() {
				var J = $("#pageDialog");
				J.find("a.z-btn-determine").click(function() {
					if (typeof(A) != "undefined" && A != null) {
						A()
					}
					$.PageDialog.close()
				});
				J.find("a.z-btn-cancel").click(function() {
					if (typeof(B) != "undefined" && B != null) {
						B()
					}
					$.PageDialog.close()
				})
			};
			$.PageDialog(I, {
				W: C,
				H: E,
				close: false,
				autoClose: false,
				ready: D
			})
		};
		$.fn.addShopCart = function(D, B, C, F, A) {
			var z = "num=" + B + "&codeID=" + C;
			var E = $(this);
			g.addShopCart(C, B,
			function(G) {
				if (G.code == 0) {
					_IsCartChanged = true;
					if (D == 1) {
						showParabola(E, B, F, A)
					} else {
						location.href = "http://cart.1yyg.com/CartList.do"
					}
				} else {
					if (G.code == 1) {
						if (G.num == 0) {
							FailDialog("啊哦！！不够那么多了！")
						} else {
							var N = E.parent().parent();
							var L = N.find("li.g-progress");
							var I = G.str;
							if (I != "") {
								var M = I.split("|");
								if (M != null && M.length == 6) {
									var J = function() {
										E.attr("codeid", M[0]);
										N.find("li.soon-list-name").find("em").html(M[1]);
										N.find("li.gray").html("价值：￥" + formatFloat(M[3]));
										L.find("dt").attr("title", "已完成" + M[5] + "%");
										L.find("b").attr("style", "width:" + M[5] + "%");
										L.find("span.orange").find("em").html(M[2]);
										L.find("span.gray6").find("em").html(M[3]);
										L.find("span.blue").find("em").html(M[4])
									};
									var H = function() {
										J();
										E.addShopCart(D, B, M[0], F, A)
									};
									var K = function() {
										J()
									};
									j("本云已满员，是否云购下一云？", H, K)
								}
							} else {
								FailDialog("本商品已结束");
								L.find("dt").attr("title", "已完成100%");
								L.find("b").attr("style", "width:100%");
								L.find("span.orange").find("em").html(L.find("span.gray6").find("em").html());
								L.find("span.blue").find("em").html("0")
							}
						}
					} else {
						if (G.code == 2) {
							FailDialog("哎呀！购物车满啦，删除一些吧！", 300)
						} else {
							if (G.code == 3) {
								x("您参与人次已达上限！")
							} else {
								i("商品添加失败！")
							}
						}
					}
				}
			})
		};
		var u = function() {
			var A = "getbysortid";
			var z = $("#topLogoAd");
			GetJPData("http://poster.1yyg.com", A, "ID=3",
			function(C) {
				if (C.state == 0) {
					var B = C.listItems[0];
					if (B.type == 0) {
						z.html('<a href="' + B.url + '" class="u-top-ad" target="_blank" title="' + B.alt + '"><img width="' + B.width + '" height="' + B.height + '" src="' + B.src + '" /></a>')
					} else {
						z.html('<embed src="' + B.src + '" wmode="Transparent" width="' + B.width + '" height="' + B.height + '" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?p1_prod_version=shockwaveflash" type="application/x-shockwave-flash"></embed>')
					}
				}
			});
			GetJPData("http://poster.1yyg.com", A, "ID=2",
			function(D) {
				var E = "";
				if (D.state == 0) {
					var C = D.listItems;
					for (var B = 0; B < C.length; B++) {
						if (C[B].type == 1) {
							E += '<li><embed src="' + C[B].src + '" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?p1_prod_version=shockwaveflash" type="application/x-shockwave-flash" ';
							if (transparent) {
								E += ' wmode="Transparent"'
							}
							E += ' width="' + C[B].width + '" height="' + C[B].height + '"></embed></li>'
						} else {
							E += '<li><a href="' + C[B].url + '" target="_blank"><img src="' + C[B].src + '" alt="' + C[B].alt.reAjaxStr() + '" width="' + C[B].width + '" height="' + C[B].height + '" /></a></li>'
						}
					}
				}
				$("#slideImg").html(E).closest("#div_slide").showSlider({
					intervalTime: 4000,
					duration: 500
				})
			})
		};
		u();
		var a = function() {
			var E = $("#div_guide");
			var G = $("#guide_pre");
			var B = $("#guide_next");
			var K = $("#ul_guide").children("li");
			var H = $("#what_1yyg");
			var D = 0;
			var J = 0;
			var C = false;
			var L = function() {
				E.show();
				if (K.length <= 1) {
					G.hide();
					B.hide()
				} else {
					if (J <= 0) {
						J = 0;
						G.hide();
						B.show()
					} else {
						if (J >= (K.length - 1)) {
							J = K.length - 1;
							G.show();
							B.hide()
						} else {
							G.show();
							B.show()
						}
					}
				}
				K.eq(J).hide().fadeToggle();
				K.eq(J).siblings().hide()
			};
			var M = function() {
				E.hide();
				G.hide();
				B.show();
				K.eq(J).show();
				K.eq(J).siblings().hide();
				P = 0;
				if (N != null) {
					clearInterval(N)
				}
			};
			var I = function() {
				J++;
				L()
			};
			B.bind("click",
			function() {
				I()
			});
			G.bind("click",
			function() {
				J--;
				L()
			});
			var F = function() {
				if (C) {
					return
				}
				C = true;
				var Q = E;
				Q.css({
					left: Q.width()
				}).show();
				Q.animate({
					left: 0
				},
				{
					queue: false,
					duration: 500,
					complete: function() {
						if (K.length <= 1) {
							G.hide();
							B.hide()
						} else {
							G.hide();
							B.show()
						}
						N = setInterval(A, 1000);
						D = 1
					}
				})
			};
			var z = function() {
				if (!C) {
					return
				}
				C = false;
				var Q = E;
				Q.animate({
					left: Q.width()
				},
				{
					queue: false,
					duration: 500,
					complete: function() {
						J = 0;
						M();
						D = 0
					}
				})
			};
			$("#guide_close").bind("click",
			function() {
				z()
			});
			K.each(function(Q) {
				Q = Q + 1;
				if (Q > 1) {
					$(this).hide()
				}
				if (Q < K.length) {
					$(this).children("a").bind("click", I)
				} else {
					$(this).children("a").bind("click", z)
				}
			});
			var P = 0;
			var O = 60;
			var N = null;
			var A = function() {
				P++;
				if (P == O) {
					z()
				}
			};
			E.hover(function() {
				P = 0;
				if (N != null) {
					clearInterval(N)
				}
			},
			function() {
				N = setInterval(A, 1000)
			});
			H.bind("click",
			function() {
				if (D == 0) {
					F()
				} else {
					z()
				}
			})
		};
		a();
		var n = function() {
			var B = $("#ul_Lottery");
			var z = 5;
			var D = false;
			var F = 0;
			var A = null;
			var C = false;
			var E = function() {
				GetJPData("http://api.1yyg.com", "GetStartRaffleAllList", "time=" + F,
				function(H) {
					if (H.errorCode == 0) {
						G(H, B)
					}
					if (A == null) {
						A = setInterval(E, 5000)
					}
				});
				var G = function(I, J) {
					F = I.maxSeconds;
					if (C) {
						return
					}
					var H = function(L, N) {
						var S = L.length > z ? z: L.length;
						var V = N.width() + 100;
						var K = 0;
						for (var R = S - 1; R >= 0; R--) {
							var X = L[R];
							if (N.children("li[id='" + X.codeID + "']").length <= 0) {
								var Q = '<li id="' + X.codeID + '" class="current">';
								Q += '<dl class="m-in-progress">';
								Q += '<dt><a href="product/' + X.codeID + '.html" target="_blank" title="' + X.goodsSName + '">';
								Q += '<img alt="' + X.goodsSName + '" src="' + goodsPic200 + X.goodsPic + '" /></a></dt>';
								Q += '<dd class="u-name"><a href="product/' + X.codeID + '.html" title="(第' + X.period + "云)" + X.goodsSName + '" >(第' + X.period + "云)" + X.goodsSName + "</a></dd>";
								Q += '<dd class="gray">价值：￥' + formatFloat(X.price) + "</dd>";
								Q += '<dd class="u-time" id="dd_time"><em>揭晓倒计时</em><span><b>00</b> : <b>00</b> : <b><i>0</i><i>0</i></b></span></dd>';
								Q += "</dl>";
								Q += "<s class='transparent-png'></s>";
								Q += "</li>";
								var T = $(Q);
								N.prepend(T);
								K++;
								var O = T.width();
								N.css({
									width: V + K * O + "px"
								});
								N.css("marginLeft", -1 * K * O + "px");
								T.StartTimeOut(X.codeID, parseInt(X.seconds))
							}
						}
						N.children("li").each(function(Y) {
							var Z = $(this);
							if ((Y + 1) % 5 == 0) {
								if (Z.attr("class") == "current") {
									Z.addClass("current2")
								}
							}
						});
						if (K > 0) {
							var W = N.parent();
							var U = N.children("li:first").hasClass("current") ? "1px solid #ff6600": "1px solid #e4e4e4";
							var M = N.children("li:last").hasClass("current") ? "1px solid #ff6600": "1px solid #e4e4e4";
							W.css("border-left", U);
							W.css("border-right", M);
							W.css({
								width: (W.width() - 2) + "px"
							});
							C = true;
							var P = K < 2 ? 1000 : 2000;
							N.animate({
								marginLeft: "0px"
							},
							P,
							function() {
								W.css("border-left", "none");
								W.css("border-right", "none");
								W.css({
									width: ($(window).width() < 1190 ? 990 : 1190) + "px"
								});
								for (var Y = 0; Y < K; Y++) {
									N.children("li:last").remove()
								}
								N.css({
									width: V + "px"
								});
								C = false
							})
						}
					};
					if (D) {
						H(I.listItems, J)
					} else {
						Base.getScript(skinDomain + "/JS/indexLotteryFun.js?v=160323",
						function() {
							D = true;
							H(I.listItems, J)
						})
					}
				}
			};
			E();
			$(window).resize(function() {
				var G = $("#ul_Lottery").parent();
				if ($(window).width() < 1190) {
					G.css({
						width: "990px"
					})
				} else {
					G.css({
						width: "1190px"
					})
				}
			})
		};
		n();
		var w = true;
		$.fn.showGoodsBuyCount = function(D, B, z) {
			var A = $(this);
			var C = A.children("div.u_buyCount");
			A.hover(function() {
				if (!w) {
					return
				}
				var E = C.attr("codeid");
				if (C.html() == "") {
					GetJPData("http://api.1yyg.com", "getBuyCount", "codeID=" + E,
					function(G) {
						if (G.code == 0) {
							var F = parseInt(A.width()) - z;
							C.css({
								width: F + "px",
								left: B + "px"
							}).html("<p></p><h3>本云您已参与<em>" + G.count + "</em>人次</h3>").show();
							if (A.hasClass(D)) {
								C.show()
							}
						} else {
							if (G.code == -10) {
								w = false
							} else {
								C.hide().html("&nbsp;")
							}
						}
					})
				} else {
					if (C.html() != "&nbsp;") {
						C.show()
					}
				}
			},
			function() {
				C.hide()
			})
		};
		var d = function(C) {
			var E = parseInt(C.codeSales);
			var D = parseInt(C.codeQuantity);
			var A = parseInt(D - E);
			var z = formatFloat((E * 100) / D);
			z = E > 0 && z < 1 ? 1 : z;
			var B = '<li class="g-progress"><dl class="m-progress"><dt title="已完成' + z + '%"><b style="width:' + z + '%;"></b></dt><dd><span class="orange fl"><em>' + E + '</em>已参与</span><span class="gray6 fl"><em>' + D + '</em>总需人次</span><span class="blue fr"><em>' + A + "</em>剩余</span></dd></dl></li>";
			return B
		};
		var r = function() {
			var B = $("#divHotGoodsList");
			var A = 8;
			GetJPData("http://api.1yyg.com", "getRecGoodsList", "goodsLabel=12&quantity=8",
			function(C) {
				if (C.code == 0) {
					z(C, B, A)
				}
			});
			var z = function(H, D, O) {
				var G = H.listItems;
				D.empty();
				var M = G.length > O ? O: G.length;
				var J = $(window).width() < 1190;
				for (var I = 0; I < M; I++) {
					var C = "(第" + G[I].codePeriod + "云)&nbsp;" + G[I].goodsName;
					var L = "(第" + G[I].codePeriod + "云)" + G[I].goodsName;
					var E = '<div class="g-hotL-list" ' + (I > 5 && J ? 'style="display:none;': "") + '><div class="g-hotL-con"><ul><li class="g-hot-pic"><a href="products/' + G[I].goodsID + '.html" target="_blank" title="' + L + '"><img name="goodsImg" alt="' + L + '" src="' + goodsPic200 + G[I].goodsPic + '" /></a></li><li class="g-hot-name"><a href="products/' + G[I].goodsID + '.html" target="_blank" title="' + L + '">' + C + '</a></li><li class="gray">价值：￥' + formatFloat(G[I].codePrice) + "</li>" + d(G[I]) + '<li><a href="products/' + G[I].goodsID + '.html" class="u-imm" target="_blank" title="立即1元云购">立即1元云购</a><a href="javascript:;"  title="加入到购物车" codeid="' + G[I].codeID + '" class="u-cart"><s></s></a></li></ul>';
					var F = "";
					switch (parseInt(G[I].goodsTag)) {
					case 1:
						F += '<div class="f-callout"><span class="F_goods_xp transparent-png">新品</span></div>';
						break;
					case 2:
						F += '<div class="f-callout"><span class="F_goods_tj transparent-png">推荐</span></div>';
						break;
					case 3:
						F += '<div class="f-callout"><span class="F_goods_rq transparent-png">人气</span></div>';
						break;
					case 10:
						F += '<div class="f-callout"><span class="F_goods_xg transparent-png">限购</span></div>';
						break
					}
					if (F != "") {
						E += F
					}
					E += '</div><div class="u_buyCount" style="top:169px;" codeid="' + G[I].codeID + '"></div></div>';
					var K = $(E);
					K.hover(function() {
						$(this).addClass("g-hotL-hover")
					},
					function() {
						$(this).removeClass("g-hotL-hover")
					});
					K.find("a.u-cart").click(function(R) {
						var S = $(this);
						var P = S.attr("codeid");
						var Q = S.parent().parent().find("img[name='goodsImg']");
						S.addShopCart(1, 1, P, Q,
						function() {
							_InsertIntoCart()
						});
						return false
					});
					D.append(K)
				}
				var N = D.children("div").length;
				for (var I = 0; I < (8 - N); I++) {
					D.append('<div class="g-hotL-list" ' + (I > 5 && J ? 'style="display:none;"': "") + '><div class="g-hotL-con"></div></div>')
				}
				$(window).resize(function() {
					if ($(window).width() <= 1170) {
						D.children("div:gt(5)").hide()
					} else {
						D.children("div").show()
					}
				})
			}
		};
		var s = function() {
			var H = $("#UserBuyNewList");
			var I = H.children("li").length;
			var G = $("#hidBuyID").val();
			var A = 0;
			var B = 14;
			var C = 7;
			var z = 0;
			var F = function() {
				GetJPData("http://api.1yyg.com", "GetUserBuyNewList", "buyID=" + G,
				function(O) {
					if (O.code == 0) {
						var N = O.data;
						var P = H.children("li").length - C;
						var J = N.length;
						var M = "";
						for (var L = (J - 1); L >= 0; L--) {
							var K = "<li>";
							K += '<span class="fl"><a href="http://u.1yyg.com/' + N[L].userWeb + '" target="_blank" title="' + N[L].userName + '">';
							K += '<img alt="' + N[L].userName + '"  width="40" height="40" src="http://faceimg.1yyg.com/UserFace/' + N[L].userPhoto + "\" /><i class='transparent-png'></i></a></span>";
							K += "<p>";
							K += '<a target="_blank" href="http://u.1yyg.com/' + N[L].userWeb + '" title="' + N[L].userName + '" class="blue">' + N[L].userName + "</a><br />";
							K += '<a target="_blank" href="product/' + N[L].codeID + '.html" target="_blank" title="' + N[L].codeGoodsName + '" class="u-ongoing">' + N[L].codeGoodsName + "</a>";
							K += "</p>";
							K += "</li>";
							if (L == 0) {
								G = N[0].buyID
							}
							M += K
						}
						H.html(M)
					}
				})
			};
			var E = function() {
				if (z >= 5) {
					z = 0;
					F()
				} else {
					z++
				}
				var K = H.find("li:last");
				var J = 89;
				H.prepend(K).css("marginTop", "-" + J + "px");
				H.animate({
					marginTop: "0px"
				},
				800)
			};
			var D = setInterval(E, 2000);
			H.hover(function() {
				clearInterval(D);
				D = null
			},
			function() {
				D = setInterval(E, 2000)
			})
		};
		var b = function() {
			var A = $("#divSoonGoodsList");
			var B = 24;
			var C = function() {
				return "sortID=0&brandID=0&orderFlag=10&FIdx=1&EIdx=" + B + "&isCount=0"
			};
			GetJPData("http://api.1yyg.com", "getGoodsList", C(),
			function(D) {
				if (D.Code == 0) {
					z(D, A, B)
				}
			});
			var z = function(K, F, P) {
				var I = K.Data.Tables.Table1.Rows;
				F.empty();
				var O = I.length > P ? P: I.length;
				for (var L = 0; L < O; L++) {
					var E = "(第<em>" + I[L].codePeriod + "</em>云)&nbsp;" + I[L].goodsSName;
					var N = "(第" + I[L].codePeriod + "云)" + I[L].goodsSName;
					var D = parseInt(parseInt(I[L].codeQuantity) - parseInt(I[L].codeSales));
					var J = I[L].goodsTag;
					var G = '<div class="soon-list-con" idx="' + (L + 1) + '"><div class="soon-list"><ul><li class="g-soon-pic"><a href="products/' + I[L].goodsID + '.html" target="_blank" title="' + N + '"><img name="goodsImg"  alt="' + N + '" src="' + goodsPic200 + I[L].goodsPic + '" /></a></li><li class="soon-list-name"><a href="products/' + I[L].goodsID + '.html" target="_blank" title="' + N + '">' + E + '</a></li><li class="gray">价值：￥' + formatFloat(I[L].codePrice) + "</li>" + d(I[L]) + '<li><a href="products/' + I[L].goodsID + '.html" target="_blank" title="立即1元云购"  class="u-now">立即1元云购</a><a href="javascript:;"  title="加入到购物车" codeid="' + I[L].codeID + '" surplus="' + D + '" class="u-cart"><s></s></a></li></ul>';
					var H = "";
					switch (parseInt(I[L].goodsTag)) {
					case 1:
						H += '<div class="f-callout"><span class="F_goods_xp transparent-png">新品</span></div>';
						break;
					case 2:
						H += '<div class="f-callout"><span class="F_goods_tj transparent-png">推荐</span></div>';
						break;
					case 3:
						H += '<div class="f-callout"><span class="F_goods_rq transparent-png">人气</span></div>';
						break;
					case 10:
						H += '<div class="f-callout"><span class="F_goods_xg transparent-png">限购</span></div>';
						break
					}
					if (H != "") {
						G += H
					}
					G += "</div>";
					G += '<div class="u_buyCount" style="top:200px;" codeid="' + I[L].codeID + '"></div></div>';
					var M = $(G);
					M.hover(function() {
						var R = $(this).attr("idx");
						var Q = R % 4 == 0 ? "soon-list-hover soon-list-hover2": "soon-list-hover";
						$(this).addClass(Q)
					},
					function() {
						var R = $(this).attr("idx");
						var Q = R % 4 == 0 ? "soon-list-hover soon-list-hover2": "soon-list-hover";
						$(this).removeClass(Q)
					});
					M.find("a.u-cart").click(function(S) {
						var U = $(this);
						var Q = U.attr("codeid");
						var R = U.parent().parent().find("img[name='goodsImg']");
						var T = U.attr("surplus");
						U.addShopCart(1, 1, Q, R,
						function() {
							_InsertIntoCart()
						});
						return false
					});
					F.append(M)
				}
			}
		};
		var f = function() {
			var A = 8;
			var z = $("#divNewGoodsList");
			GetJPData("http://api.1yyg.com", "getRecGoodsList", "goodsLabel=13&quantity=8",
			function(C) {
				if (C.code == 0) {
					B(C, z, A)
				}
			});
			var B = function(G, D, M) {
				var F = G.listItems;
				D.empty();
				var K = F.length > M ? M: F.length;
				for (var H = 0; H < K; H++) {
					var C = "(第" + F[H].codePeriod + "云)&nbsp;" + F[H].goodsName;
					var J = "(第" + F[H].codePeriod + "云)" + F[H].goodsName;
					var E = '<div class="soon-list-con" idx="' + (H + 1) + '"><div class="soon-list"><ul><li class="g-soon-pic"><a href="products/' + F[H].goodsID + '.html" target="_blank" title="' + J + '"><img  alt="' + J + '" src="' + goodsPic200 + F[H].goodsPic + '" /></a></li><li class="soon-list-name"><a href="products/' + F[H].goodsID + '.html" target="_blank" title="' + J + '">' + C + '</a></li><li class="gray">价值：￥' + formatFloat(F[H].codePrice) + '</li></ul></div><div class="u_buyCount" style="top:210px;" codeid="' + F[H].codeID + '"></div></div>';
					var I = $(E);
					I.hover(function() {
						var O = $(this).attr("idx");
						var N = O % 4 == 0 ? "soon-list-hover soon-list-hover2": "soon-list-hover";
						$(this).addClass(N)
					},
					function() {
						var O = $(this).attr("idx");
						var N = O % 4 == 0 ? "soon-list-hover soon-list-hover2": "soon-list-hover";
						$(this).removeClass(N)
					});
					D.append(I)
				}
				var L = D.children("div").length;
				for (var H = 0; H < (8 - L); H++) {
					D.append('<div class="soon-list-con"><div class="soon-list"></div></div>')
				}
			}
		};
		var e = function() {
			var A = $("#divPostRec");
			var z = $("#ul_PostList");
			GetJPData("http://api.1yyg.com", "getRecPostList", "",
			function(G) {
				if (G.code == 0) {
					var K = G.listItems;
					var H = K.length;
					var J = "http://postimg.1yyg.com/UserPost/RecHome/";
					var C = "http://post.1yyg.com/detail-";
					var B = "http://u.1yyg.com/";
					A.empty();
					z.empty();
					if (H > 0) {
						var D = '<dl><dt><a href="' + C + K[0].postID + '.html" target="_blank" title="' + K[0].postTitle + '"><img  src="' + J + K[0].postImg + '" /></a></dt><dd class="u-user"><p class="u-head"><a href="' + B + K[0].userWeb + '" target="_blank" title="' + K[0].userName + '"><img alt="' + K[0].postTitle + '" src="http://faceimg.1yyg.com/UserFace/' + K[0].userPhoto + '" width="40" height="40" /><i class="transparent-png"></i></a></p><p class="u-info"><span><a href="' + B + K[0].userWeb + '" target="_blank" title="' + K[0].userName + '">' + K[0].userName + "</a><em>" + K[0].postTime + '</em></span><cite><a href="' + C + K[0].postID + '.html" target="_blank" title="' + K[0].postTitle + '">' + K[0].postTitle + '</a></cite></p></dd><dd class="m-summary"><cite><a href="' + C + K[0].postID + '.html" target="_blank">' + K[0].postContent + "</a></cite><b><s></s></b></dd></dl>";
						var I = $(D);
						A.html(I);
						H = H >= 7 ? 7 : H;
						for (var F = 1; F < H; F++) {
							D = '<li><a href="' + C + K[F].postID + '.html" target="_blank" title="' + K[F].postTitle + '"><cite><img alt="' + K[F].postTitle + '" src="' + J + "small/" + K[F].postImg + '" /></cite><p title="' + K[F].postTitle + '">' + K[F].postTitle + "</p></a></li>";
							var I = $(D);
							z.append(I)
						}
						var E = z.children("li").length;
						for (var F = 0; F < (6 - E); F++) {
							z.append("<li></li>")
						}
					}
				}
			})
		};
		var y = 0;
		var t = [0, 0, 0, 0];
		var p = $("#divHotGoodsList");
		var h = $("#divSoonGoodsList");
		var q = $("#divNewGoodsList");
		var v = $("#divPostRec");
		var l = p.offset().top - $(window).height();
		var c = 0;
		var m = 0;
		var o = 0;
		$(window).scroll(function() {
			k()
		});
		var k = function() {
			y = $(window).scrollTop();
			c = h.offset().top - $(window).height();
			m = q.offset().top - $(window).height();
			o = v.offset().top - $(window).height();
			if (y >= l) {
				if (t[0] == 0) {
					t[0] = 1;
					r();
					s()
				}
			}
			if (y >= c) {
				if (t[1] == 0) {
					t[1] = 1;
					b()
				}
			}
			if (y >= m) {
				if (t[2] == 0) {
					t[2] = 1;
					f()
				}
			}
			if (y >= o) {
				if (t[3] == 0) {
					t[3] = 1;
					e()
				}
			}
		};
		if ($(window).scrollTop() > l) {
			k()
		}
	}
};