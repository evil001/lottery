$(function() {
	var i = $("#cartBody");
	var k = $("#divNone");
	var a = $("#mycartpay");
	var c = a.children("dl").children("dt").find("em");
	var b = $(c[1]);
	var g = $(c[0]);
	var h = parseInt($("#hidUserID").val());
	var j = h > 0 ? true: false;
	var d = $("#a_payment");
	var f = null;
	var l = function() {
		var r = new $CartComm();
		var A = function(J, D, E, C, L) {
			var F = 255;
			var I = 126;
			if (typeof(C) != "undefined") {
				F = C
			}
			if (typeof(C) != "undefined") {
				I = L
			}
			var K = null;
			var M = '<div class="clearfix m-round u-tipsEject"><div class="u-tips-txt">' + J + '</div><div class="u-Btn"><div class="u-Btn-li"><a href="javascript:;" id="btnMsgCancel" class="z-CloseBtn">取消</a></div><div class="u-Btn-li"><a id="btnMsgOK" href="javascript:;" class="z-DefineBtn">确定</a></div></div></div>';
			var H = function() {
				var N = $("#pageDialog");
				N.find("a.z-DefineBtn").click(function() {
					if (typeof(D) != "undefined" && D != null) {
						D()
					}
					G.close()
				});
				N.find("a.z-CloseBtn").click(function() {
					if (typeof(E) != "undefined" && E != null) {
						E()
					}
					G.cancel()
				})
			};
			var G = new $.PageDialog(M, {
				W: F,
				H: I,
				close: true,
				autoClose: false,
				ready: H
			})
		};
		var n = function(F, E, D, C) {
			$.PageDialog.fail(F, E, D, C)
		};
		var p = function(D) {
			var C = function(G, H, E) {
				var F = new RegExp(H, "g");
				return G.replace(F, E)
			};
			var D = escape(D);
			D = C(D, "\\+", "%2B");
			D = C(D, "/", "%2F");
			return D
		};
		var x = function() {
			var C = $("#i_buynext").hasClass("checked") ? 1 : 0;
			location.href = "https://weixin.1yyg.com/" + Gobal.SiteVer + "/passport/login.do?forward=" + p("http://weixin.1yyg.com/" + Gobal.SiteVer + "/mycart/payment.do?bx=" + C)
		};
		var s = 0;
		var w = null;
		var o = function(E, C, H, D) {
			if (E != 3 || C <= 0) {
				return ""
			}
			var F = "";
			var G = H - D;
			if (C < G) {
				F = "剩余" + C + "人次，最多可参与" + C + "人次"
			} else {
				if (D == 0) {} else {
					if (D < H) {
						F = "您已参与" + D + "人次，最多可参与" + G + "人次"
					}
				}
			}
			return F
		};
		var m = function() {
			$("div.footer").hide();
			a.css("bottom", "0px");
			var Q = $(this);
			var J = Q.attr("id");
			var M = J.replace("txtNum", "");
			var C = $("#oldshopNum" + M);
			var E = parseInt($("#suplus" + M).val());
			var P = E;
			var I = parseInt($("#codeType" + M).val());
			var F = (I == 3) ? true: false;
			var D = 0;
			var H = 0;
			if (F) {
				D = parseInt($("#limitBuyNum" + M).val());
				H = parseInt($("#haveBuyNum" + M).val());
				var R = D - H;
				if (E > R) {
					E = R
				}
			}
			var G, O, L = /^[1-9]{1}\d{0,6}$/;
			var K;
			var N = function() {
				G = C.val();
				O = Q.val();
				if (G != O) {
					var T = $(window).width();
					var S = (T) / 2 - Q.offset().left - 255 / 2;
					if (O == "") {
						return
					}
					if (L.test(O)) {
						K = parseInt(O);
						if (K <= E) {
							C.val(O)
						} else {
							K = E;
							if (F) {
								var U = o(I, P, D, H);
								if (U != "") {
									n(U, Q, -70, S)
								}
							} else {
								n("最多参与" + K + "人次", Q, -70, S)
							}
							Q.val(K);
							C.val(K)
						}
						u(Q, M, K);
						z();
						t(Q, K, E);
						B(K, Q)
					} else {
						n("只能输正整数哦", Q, -70, S);
						Q.val(G)
					}
				}
			};
			w = setInterval(N, 200)
		};
		var q = function(I, D) {
			var C = parseInt($("#suplus" + I).val());
			var F = parseInt($("#codeType" + I).val());
			if (F == 3) {
				var H = parseInt($("#limitBuyNum" + I).val());
				var E = parseInt($("#haveBuyNum" + I).val());
				var G = H - E;
				if (C > G) {
					C = G
				}
			} else {
				if (D <= 0) {
					D = 1
				}
			}
			if (D > C) {
				D = C
			}
			return D
		};
		var y = function() {
			$("div.footer").show();
			a.css("bottom", "49px");
			if (w != null) {
				clearInterval(w)
			}
			var G = $(this);
			var E = G.attr("id");
			var D = E.replace("txtNum", "");
			var C = parseInt($("#oldshopNum" + D).val());
			var F = parseInt(G.val());
			if (isNaN(F) || G.val() == "") {
				F = C
			} else {
				if (C == F) {
					return
				}
			}
			G.val(q(D, F))
		};
		var u = function(C, E, D) {
			r.updateShopCart(E, D,
			function(F) {})
		};
		var v = function(E, L) {
			var I = L.attr("id");
			var K = I.replace("txtNum", "");
			var F = parseInt($("#suplus" + K).val());
			var G = parseInt($("#codeType" + K).val());
			if (G == 3) {
				var D = parseInt($("#limitBuyNum" + K).val());
				var H = parseInt($("#haveBuyNum" + K).val());
				var M = D - H;
				if (F > M) {
					F = M
				}
			}
			var C = $("#oldshopNum" + K);
			var J = parseInt(C.val()) + E;
			if (J > 0 && J <= F) {
				t(L, J, F);
				C.val(J);
				L.val(J);
				B(J, L);
				u(L, K, J);
				z()
			}
		};
		var t = function(D, F, E) {
			var C = D.prev();
			var G = D.next();
			if (E == 1) {
				C.addClass("dis");
				G.addClass("dis")
			} else {
				if (F == 1) {
					C.addClass("dis");
					G.removeClass("dis")
				} else {
					if (F == E) {
						C.removeClass("dis");
						G.addClass("dis")
					} else {
						C.removeClass("dis");
						G.removeClass("dis")
					}
				}
			}
		};
		var B = function(D, G) {
			var F = G.parent().parent().parent();
			var C = F.find("div.z-Cart-tips");
			if (D > 100) {
				if (C.length == 0) {
					var E = $('<div class="z-Cart-tips">已超过100人次，云购存在一定风险，请谨慎参与！</div>');
					F.prepend(E)
				}
			} else {
				C.remove()
			}
		};
		var z = function() {
			var C = 0;
			var D = 0;
			$("input[name=num]", i).each(function(G) {
				var F = $(this).attr("id");
				var E = F.replace("txtNum", "");
				var I = parseInt($("#codeState" + E).val());
				if (I != 1) {
					return false
				}
				var H = parseInt($(this).val());
				if (!isNaN(H)) {
					D++;
					C += H
				}
			});
			b.html(D);
			g.html("<span>￥</span>" + CastMoney(C));
			if (D == 0 && C == 0) {
				a.hide()
			}
		};
		r.getShopCart(function(P) {
			if (P.code == 0) {
				var I = P.listCart;
				var J = P.listUpdate;
				var K = P.listOutDate;
				s = P.money;
				if (P.count > 0) {
					a.show()
				}
				a.find("em").eq(0).html("<span>￥</span>" + P.money + ".00");
				a.find("em").eq(1).html(P.count);
				var D = "";
				if (I.length > 0) {
					for (var H = 0; H < I.length; H++) {
						var C = I[H];
						var N = C.codeQuantity - C.codeSales;
						var M = C.codeType == 3;
						var F = N;
						var O = false;
						var L = 0;
						if (M) {
							L = C.codeLimitBuy - C.myLimitSales;
							O = L == 0 ? true: false;
							F = L > N ? N: L
						}
						D += "<li>";
						D += '<a class="fl u-Cart-img" href="/' + Gobal.SiteVer + "/product/" + C.codeID + '.do">';
						D += '<img src="http://mskin.1yyg.com/' + Gobal.SiteVer + '/weixin/images/loading2.gif" src2="http://mimg.1yyg.com/GoodsPic/pic-200-200/' + C.goodsPic + '" border="0" alt="">';
						if (M) {
							D += '<div class="pTitle pPurchase">限购</div>'
						}
						D += "</a>";
						D += '<div class="u-Cart-r">';
						D += '<a href="/' + Gobal.SiteVer + "/product/" + C.codeID + '.do" class="gray6">(第' + C.codePeriod + "云)" + C.goodsName + "</a>";
						D += '<span class="gray9">';
						D += "<em>剩余" + N + "人次</em>";
						if (M) {
							if (O) {
								D += '<br/><em class="gray9" style="margin: 0;">限购' + C.codeLimitBuy + "人次，您已参与" + C.myLimitSales + "人次</em>"
							} else {
								D += '<em>&nbsp;/&nbsp;</em><em class="gray9" style="margin: 0;">限购' + C.codeLimitBuy + "人次</em>"
							}
						}
						D += "</span>";
						if (F > 0) {
							D += '<div class="num-opt">';
							D += '<em class="num-mius' + (C.shopNum == 1 ? " dis": "") + '"><i></i></em>';
							D += '<input id="txtNum' + C.codeID + '" name="num" maxlength="6" type="text" value="' + C.shopNum + '" codeID="' + C.codeID + '" />';
							D += '<em class="num-add' + (C.shopNum >= F ? " dis": "") + '"><i></i></em>';
							D += "</div>"
						}
						D += '<a href="javascript:;" name="delLink" cid="' + C.codeID + '" class="z-del"><s></s></a>';
						D += "</div>";
						if (F > 0) {
							D += '<input id="oldshopNum' + C.codeID + '" type="hidden" value="' + C.shopNum + '" />';
							D += '<input id="suplus' + C.codeID + '" type="hidden" value="' + N + '" />';
							D += '<input id="limitBuyNum' + C.codeID + '" type="hidden" value="' + C.codeLimitBuy + '" />';
							D += '<input id="haveBuyNum' + C.codeID + '" type="hidden" value="' + C.myLimitSales + '" />';
							D += '<input id="codeType' + C.codeID + '" type="hidden" value="' + C.codeType + '" />';
							D += '<input id="codeState' + C.codeID + '" type="hidden" value="1" />'
						}
						D += "</li>"
					}
				}
				if (J.length > 0) {
					for (var H = 0; H < J.length; H++) {
						var C = J[H];
						var N = C.codeQuantity - C.codeSales;
						var M = C.codeType == 3;
						var F = N;
						var O = false;
						var L = 0;
						if (M) {
							L = C.codeLimitBuy - C.myLimitSales;
							O = L == 0 ? true: false;
							F = L > N ? N: L
						}
						D += "<li>";
						D += '<a class="fl u-Cart-img" href="/' + Gobal.SiteVer + "/product/" + C.codeID + '.do">';
						D += '<img src="http://mskin.1yyg.com/' + Gobal.SiteVer + '/weixin/images/loading2.gif" src2="http://mimg.1yyg.com/GoodsPic/pic-200-200/' + C.goodsPic + '" border="0" alt="">';
						if (M) {
							D += '<div class="pTitle pPurchase">限购</div>'
						}
						D += "</a>";
						D += '<div class="u-Cart-r">';
						D += '<a href="/' + Gobal.SiteVer + "/product/" + C.codeID + '.do" class="gray6">(已更新至第' + C.codePeriod + "云)" + C.goodsName + "</a>";
						D += '<span class="gray9">';
						D += "<em>剩余" + N + "人次</em>";
						if (M) {
							if (O) {
								D += '<br/><em class="gray9" style="margin: 0;">限购' + C.codeLimitBuy + "人次，您已参与" + C.myLimitSales + "人次</em>"
							} else {
								D += '<em>&nbsp;/&nbsp;</em><em class="gray9" style="margin: 0;">限购' + C.codeLimitBuy + "人次</em>"
							}
						}
						D += "</span>";
						if (F > 0) {
							D += '<div class="num-opt">';
							D += '<em class="num-mius' + (C.shopNum == 1 ? " dis": "") + '"><i></i></em>';
							D += '<input id="txtNum' + C.codeID + '" name="num"  maxlength="6" type="text" value="' + C.shopNum + '" codeID="' + C.codeID + '" />';
							D += '<em class="num-add' + (C.shopNum >= F ? " dis": "") + '"><i></i></em>';
							D += "</div>"
						}
						D += '<a href="javascript:;" name="delLink" cid="' + C.codeID + '" isover="0" class="z-del"><s></s></a>';
						D += "</div>";
						if (F > 0) {
							D += '<input id="oldshopNum' + C.codeID + '" type="hidden" value="' + C.shopNum + '" />';
							D += '<input id="suplus' + C.codeID + '" type="hidden" value="' + N + '" />';
							D += '<input id="limitBuyNum' + C.codeID + '" type="hidden" value="' + C.codeLimitBuy + '" />';
							D += '<input id="haveBuyNum' + C.codeID + '" type="hidden" value="' + C.myLimitSales + '" />';
							D += '<input id="codeType' + C.codeID + '" type="hidden" value="' + C.codeType + '" />';
							D += '<input id="codeState' + C.codeID + '" type="hidden" value="1" />'
						}
						D += "</li>"
					}
				}
				D += "</div>";
				if (K.length > 0) {
					for (var H = 0; H < K.length; H++) {
						var C = K[H];
						D += '<li class="m-list-shelves">';
						D += '<a class="fl u-Cart-img" href="/' + Gobal.SiteVer + "/product/" + C.codeID + '.do">';
						D += '<img src="http://mskin.1yyg.com/' + Gobal.SiteVer + '/weixin/images/loading2.gif" src2="http://mimg.1yyg.com/GoodsPic/pic-200-200/' + C.goodsPic + '" border="0" alt="">';
						D += "</a>";
						D += '<div class="u-Cart-r">';
						D += '<a href="/' + Gobal.SiteVer + "/product/" + C.codeID + '.do" class="gray6">' + C.goodsName + "</a>";
						D += '<a href="javascript:;" name="delLink" cid="' + C.codeID + '" isover="1" class="z-del"><s></s></a>';
						D += "</div>";
						D += "</li>"
					}
				}
				var E = $(D);
				i.html(E);
				loadImgFun();
				E.find("a[name='delLink']").bind("click",
				function() {
					var R = $(this);
					var Q = function() {
						r.delShopCart(S,
						function(T) {
							if (T.code == 0) {
								R.parent().parent().remove();
								e(false);
								z()
							} else {
								n("删除失败，请重试[" + T.code + "]")
							}
						})
					};
					var S = R.attr("cid");
					if (R.attr("isover") == "1") {
						Q()
					} else {
						A("您确定要删除吗？", Q)
					}
				});
				$("input[name=num]", i).each(function(Q) {
					var S = $(this);
					var R = S.val();
					B(R, S);
					S.bind("focus", m).bind("blur", y).bind("touchstart",
					function() {
						$("div.footer").hide();
						a.css("bottom", "0px")
					});
					S.prev().bind("click",
					function() {
						v( - 1, S)
					});
					S.next().bind("click",
					function() {
						v(1, S)
					})
				});
				$("#i_buynext").click(function() {
					if ($(this).hasClass("checked")) {
						$(this).removeClass("checked")
					} else {
						$(this).addClass("checked")
					}
				}).next().click(function() {
					$(this).prev().trigger("click")
				}).next().click(function() {
					var Q = '<div class="g-an-dialog">';
					Q += '<div class="g-an-con">';
					Q += "<h6>温馨提示</h6>";
					Q += "<p>热门商品可能会瞬间抢光哦，此处勾选后系统将会自动为您参与最新一云！</p>";
					Q += '<a href="javascript:;" class="orange-btn">确认</a>';
					Q += "</div>";
					Q += "</div>";
					var S = function() {
						var T = $("#pageDialog");
						T.find("a.orange-btn").click(function() {
							R.close()
						})
					};
					var R = new $.PageDialog(Q, {
						W: 280,
						H: 248,
						close: true,
						autoClose: false,
						ready: S
					})
				});
				d.bind("click",
				function() {
					if (s == 0) {
						n("对不起，购物车中没有商品！");
						return
					}
					var R = $("#i_buynext").hasClass("checked") ? 1 : 0;
					r.getShopCart(function(S) {
						if (S.code == 0) {
							I = S.listCart;
							J = S.listUpdate;
							K = S.listOutDate;
							if (I.length == 0 && J.length == 0) {
								A("您的购物车中所有商品已失效！",
								function() {
									$.cookie("_CartData_" + h, null, {
										domain: "1yyg.com",
										path: "/",
										expires: 7
									});
									$.cookie("_CartDataSel", null, {
										domain: "1yyg.com",
										path: "/",
										expires: 1
									});
									location.reload()
								},
								function() {
									location.reload()
								},
								300)
							} else {
								if (K.length > 0 && R == 0) {
									A("部分商品已失效，继续云购？",
									function() {
										if (J.length > 0) {
											A("部分商品失效已更新到最新一云，继续云购？",
											function() {
												Q()
											},
											function() {
												location.reload()
											},
											300)
										} else {
											Q()
										}
									},
									function() {
										location.reload()
									},
									300)
								} else {
									if (J.length > 0 && R == 0) {
										A("部分商品失效已更新到最新一云，继续云购？",
										function() {
											Q()
										},
										function() {
											location.reload()
										},
										300)
									} else {
										Q()
									}
								}
							}
						}
					});
					var Q = function() {
						var V = "",
						Y = "";
						if (I.length > 0) {
							for (var T = 0; T < I.length; T++) {
								var S = I[T];
								var U = S.codeQuantity - S.codeSales;
								var W = U;
								if (S.codeType == 3) {
									var X = S.codeLimitBuy - S.myLimitSales;
									W = X > U ? U: X
								}
								if (W > 0) {
									V += I[T].codeID + ",";
									Y += I[T].shopNum + ","
								}
							}
						}
						if (J.length > 0) {
							for (var T = 0; T < J.length; T++) {
								var S = J[T];
								var U = S.codeQuantity - S.codeSales;
								var W = U;
								if (S.codeType == 3) {
									var X = S.codeLimitBuy - S.myLimitSales;
									W = X > U ? U: X
								}
								if (W > 0) {
									V += J[T].codeID + ",";
									Y += J[T].shopNum + ","
								}
							}
						}
						if (V == "" || Y == "") {
							n("对不起，没有购买的商品！");
							return
						}
						V = V.substring(0, V.length - 1);
						Y = Y.substring(0, Y.length - 1);
						r.setSelValue(V, Y,
						function() {
							location.href = "/" + Gobal.SiteVer + "/mycart/Payment.do?bx=" + R
						})
					}
				});
				if ($.cookie("_autoBuyTipWx") != "1") {
					var G = $('<div class="g-auto-nextWrapper"><div class="g-auto-nextip"></div></div>');
					G.click(function() {
						$.cookie("_autoBuyTipWx", "1", {
							expires: 100
						});
						G.remove()
					});
					$("div.wrapper").append(G)
				}
			} else {
				e(true)
			}
		})
	};
	var e = function(p) {
		var n = $("li", i);
		if (n.length < 1) {
			i.empty();
			a.hide();
			if (j == "1") {
				k.show()
			} else {
				k.append('<p>您当前状态为未登录，可能导致购物车为空</p><a href="https://weixin.1yyg.com/' + Gobal.SiteVer + "/Passport/login.do?forward=" + encodeURIComponent("/" + Gobal.SiteVer + "/MyCart/index.do") + '" class="orangeBtn">立即登录</a>').show()
			}
			$("div.footer").show().find("#btnCart").addClass("hover").find("i").html("")
		} else {
			if (!p) {
				var o = $("div.footer").find("#btnCart").find("b");
				var m = parseInt(o.attr("num")) - 1;
				if (m < 100) {
					o.attr("num", m).removeClass("tomore").html(m)
				}
			}
		}
	};
	Base.getScript(Gobal.Skin + "/JS/pageDialog.js?v=160606",
	function() {
		Base.getScript(Gobal.Skin + "/JS/CartComm.js?v=160523", l)
	})
});