$(function() {
	var a = function() {
		var d = new $CartComm();
		if ($("#hidOpenID").val() == "") {
			$("#div_subscribe").show().click(function() {
				var y = null;
				var x = '<div class="index-code-wrap"><h6>长按识别二维码</h6><div class="code"><img src="http://mskin.1yyg.com/' + Gobal.SiteVer + '/weixin/images/index-code.jpg?160229" alt="1元云购官方微信"></div><a  href="javascript:;" class="close-code"><i class="z-set"></i></a></div>';
				var z = function() {
					$("a.close-code").click(function() {
						y.cancel()
					})
				};
				y = new $.PageDialog(x, {
					W: 300,
					H: 300,
					autoClose: false,
					ready: z,
					isTop: false
				})
			}).find("a.close-icon").click(function(x) {
				stopBubble(x);
				$(this).parent().parent().hide()
			})
		}
		var m = function() {
			var x = $("#sliderBox");
			GetJPData("http://poster.1yyg.com", "getbysortid", "ID=15",
			function(D) {
				if (D.state == 0) {
					var C = D.listItems;
					var B = "<ul>";
					var z = "";
					for (var A = 0; A < C.length; A++) {
						z = C[A].url;
						if (z.indexOf("?") > -1) {
							z += "&pf=weixin"
						} else {
							z += "?pf=weixin"
						}
						B += '<li style="background-color:' + C[A].alt + ';"><a href="' + z.replace("m.1yyg.com", "weixin.1yyg.com/" + Gobal.SiteVer) + '"><img src="' + C[A].src + '" alt="" /></a></li>'
					}
					B += "</ul>";
					var y = $(B);
					y.addClass("slides");
					x.empty().append(y).flexslider({
						slideshow: true
					})
				}
			})
		};
		Base.getScript(Gobal.Skin + "/JS/Flexslider.js?v=160722", m);
		var f = function(x) {
			$.PageDialog('<div class="Prompt">' + x + "</div>", {
				W: 150,
				H: 45,
				close: false,
				autoClose: true,
				submit: function() {
					location.reload()
				}
			})
		};
		var w = function(x) {
			$.PageDialog.fail(x)
		};
		var g = function(x) {
			$.PageDialog.ok(x)
		};
		var k = function(E, y, z, x, G) {
			var A = 255;
			var D = 126;
			if (typeof(x) != "undefined") {
				A = x
			}
			if (typeof(x) != "undefined") {
				D = G
			}
			var F = null;
			var H = '<div class="clearfix m-round u-tipsEject"><div class="u-tips-txt">' + E + '</div><div class="u-Btn"><div class="u-Btn-li"><a href="javascript:;" id="btnMsgCancel" class="z-CloseBtn">取消</a></div><div class="u-Btn-li"><a id="btnMsgOK" href="javascript:;" class="z-DefineBtn">确定</a></div></div></div>';
			var C = function() {
				var I = $("#pageDialog");
				I.find("a.z-DefineBtn").click(function() {
					if (typeof(y) != "undefined" && y != null) {
						y()
					}
					B.close()
				});
				I.find("a.z-CloseBtn").click(function() {
					if (typeof(z) != "undefined" && z != null) {
						z()
					}
					B.cancel()
				})
			};
			var B = new $.PageDialog(H, {
				W: A,
				H: D,
				close: true,
				autoClose: false,
				ready: C
			})
		};
		var s = $("#goodsNav");
		var b = s.offset().top;
		var t = b + s.height();
		var i = false;
		var o = null;
		var l = function() {
			var x = $(document).scrollTop();
			if (x >= t) {
				if (i) {
					return
				}
				i = true;
				if (o == null) {
					o = $('<nav class="nav-wrapper"></nav>');
					o.append(s.children().clone());
					s.parent().append(o)
				} else {
					o.show()
				}
				s.parent().addClass("nav-wrapper");
				s.addClass("top-fixed")
			} else {
				i = false;
				if (o != null) {
					o.hide()
				}
				s.parent().removeClass("nav-wrapper");
				s.removeClass("top-fixed")
			}
		};
		$(window).scroll(function() {
			l()
		});
		$("#ulOrder li").each(function() {
			$(this).click(function() {
				r();
				$(this).addClass("current").siblings().removeClass("current");
				h.orderFlag = parseInt($(this).attr("order"));
				j.initPage();
				if (h.orderFlag == 30) {
					$(this).attr("order", "31")
				} else {
					if (h.orderFlag == 31) {
						$(this).attr("order", "30")
					}
				}
				if (i) {
					i = false;
					if (o != null) {
						o.hide()
					}
					s.parent().removeClass("nav-wrapper");
					s.removeClass("top-fixed")
				}
			})
		});
		var r = function() {
			$("body").attr("style", "");
			v.removeClass("current").next("div.select-total").hide();
			p = false
		};
		var p = false;
		var v = $("#divSort");
		v.click(function(x) {
			stopBubble(x);
			if (p) {
				r()
			} else {
				$("body").attr("style", "overflow:hidden;");
				v.addClass("current").next("div.select-total").show();
				p = true
			}
		});
		v.next("div.select-total").find("li").each(function() {
			$(this).click(function() {
				h.sortID = parseInt($(this).attr("sortID"));
				location.href = "http://weixin.1yyg.com/" + Gobal.SiteVer + "/list/m1.do?order=" + h.orderFlag + "&sort=" + h.sortID
			})
		});
		$("body").click(function() {
			r()
		});
		var j = null;
		var u = 60;
		var c = 0;
		var h = {
			sortID: 0,
			orderFlag: 10,
			FIdx: 1,
			EIdx: u,
			isCount: 1
		};
		var n = $("#ulGoodsList");
		var q = $("div.loading");
		var e = function() {
			var x = function() {
				return "sortID=" + h.sortID + "&orderFlag=" + h.orderFlag + "&FIdx=" + h.FIdx + "&EIdx=" + h.EIdx + "&isCount=" + h.isCount
			};
			var y = function(D, C, B, A) {
				D.addClass("add");
				d.addShopCart(C, B,
				function(E) {
					if (E.code == 0) {
						if (typeof(A) == "function") {
							A()
						} else {
							g("添加成功")
						}
						addNumToCartFun(E.num)
					} else {
						if (E.code == 1) {
							if (E.num == 0) {
								f("啊哦~！被抢光啦！")
							} else {
								var I = D.parent().parent();
								var G = E.str;
								if (G != "") {
									console.log(G);
									var K = G.split("|");
									if (K != null && K.length == 6) {
										var H = function() {
											I.find("a.buy-btn").attr("codeid", K[0]);
											I.find("div.gRate").attr("codeid", K[0]);
											I.find("p.g-name").find("em").html(K[1]);
											I.find("ins.gray9").html("价值：￥" + CastMoney(K[3]));
											I.find("span.pgbar").attr("style", "width:" + K[5] + "%")
										};
										var F = function() {
											H();
											y(D, K[0], B, A)
										};
										var J = function() {
											H()
										};
										k("本云已满员，是否云购下一云？", F, J)
									}
								} else {
									w("本商品已结束");
									I.find("span.pgbar").attr("style", "width:100%")
								}
							}
						} else {
							if (E.code == 2) {
								w("哎呀！购物车满啦，删除一些吧！", 300)
							} else {
								if (E.code == 3) {
									w("您参与人次已达上限！")
								} else {
									w("添加失败，请重试[" + E.code + "]")
								}
							}
						}
					}
					D.removeClass("add")
				})
			};
			var z = function() {
				GetJPData("http://weixin.1yyg.com", "getGoodsPageList", x(),
				function(F) {
					if (F.code == 0) {
						var D = F.listItems;
						if (h.isCount == 1) {
							c = F.count;
							h.isCount = 0
						}
						var G = D.length;
						var H = 0;
						var J = 0;
						var A = 0;
						var K = 0;
						var B = "";
						for (var E = 0; E < G; E++) {
							var C = D[E];
							H = parseInt(C.codeSales);
							J = parseInt(C.codeQuantity);
							A = parseInt(J - H);
							K = parseInt(H * 100) / J;
							K = H > 0 && K < 1 ? 1 : K;
							B = '<li id="' + C.goodsID + '"><a href="javascript:;" class="g-pic"><img src="' + Gobal.LoadPic + '" src2="http://mimg.1yyg.com/GoodsPic/pic-200-200/' + C.goodsPic + '" width="136" height="136" />' + (C.goodsTag == 10 ? '<div class="pTitle pPurchase">限购</div>': "") + '</a><p class="g-name">(第<em>' + C.codePeriod + "</em>云)" + C.goodsSName + '</p><ins class="gray9">价值：￥' + CastMoney(C.codePrice) + '</ins><div class="Progress-bar"><p class="u-progress"><span class="pgbar" style="width: ' + K + '%;"><span class="pging"></span></span></p></div><div class="btn-wrap"><a href="javascript:;" class="buy-btn' + (A == 0 ? " unAdd": "") + '" codeid="' + C.codeID + '">立即1元云购</a><div class="gRate' + (A == 0 ? " unAdd": "") + '" codeid="' + C.codeID + '"><a href="javascript:;"><s></s></a></div></div></li>';
							var I = $(B);
							I.click(function() {
								location.href = "/" + Gobal.SiteVer + "/products/" + $(this).attr("id") + ".do"
							}).find("div.gRate").click(function(M) {
								stopBubble(M);
								var L = $(this);
								if (!L.hasClass("unAdd")) {
									y(L, L.attr("codeid"), 1)
								}
							});
							I.find("a.buy-btn").click(function(M) {
								stopBubble(M);
								var L = $(this);
								if (!L.hasClass("unAdd")) {
									y(L, L.attr("codeid"), 1,
									function() {
										location.href = "/" + Gobal.SiteVer + "/mycart/index.do"
									})
								}
							});
							n.append(I)
						}
						if (h.EIdx < c) {
							_IsLoading = false
						} else {
							_IsLoading = true;
							q.hide()
						}
						loadImgFun(0)
					} else {
						q.hide();
						if (h.FIdx == 1) {
							_IsLoading = true;
							n.append(Gobal.NoneHtml)
						}
					}
				})
			};
			this.getNextPage = function() {
				h.FIdx = h.FIdx + u;
				h.EIdx = h.EIdx + u;
				z()
			};
			this.initPage = function() {
				h.FIdx = 1;
				h.EIdx = u;
				h.isCount = 1;
				n.empty();
				z()
			}
		};
		j = new e();
		j.initPage();
		scrollForLoadData(j.getNextPage)
	};
	Base.getScript(Gobal.Skin + "/JS/pageDialog.js?v=160304",
	function() {
		Base.getScript(Gobal.Skin + "/JS/CartComm.js?v=160523", a)
	})
});