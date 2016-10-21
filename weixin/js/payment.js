$(function() {
	var a = false;
	var b = function() {
		var J = parseInt($("#hidShopMoney").val());
		var e = parseInt($("#hidBalance").val());
		var D = parseInt($("#hidPoints").val());
		var h = $("#hidPayPoints");
		var s = $("#hidPaylBalance");
		var B = $("#hidPayBank");
		var x = $("div.other_pay").children("a");
		var d = $(x[0]);
		var t = $(x[1]);
		var i = $(x[2]);
		var I = $("#wx_pay");
		var j = $("#jd_pay");
		var u = $("#zs_pay");
		var k = $("#kj_pay");
		var A = $("#hidIsBuyNext").val();
		var K = function(L) {
			$.PageDialog.fail(L)
		};
		var l = function(M, L) {
			$.PageDialog.ok(M, L)
		};
		var w = function(L) {
			if (L > 0) {
				h.val(L);
				d.addClass("checked").find("em.orange").html("-<b>￥</b>" + L.toFixed(2))
			} else {
				h.val("0");
				d.removeClass("checked").find("em.orange").html("")
			}
		};
		var f = function(L) {
			if (L > 0) {
				s.val(L);
				t.addClass("checked").find("em.orange").html("-<b>￥</b>" + L.toFixed(2))
			} else {
				s.val("0");
				t.removeClass("checked").find("em.orange").html("")
			}
		};
		var p = function(L) {
			if (L > 0) {
				B.val(L);
				i.addClass("checked").find("em.orange").html('<span class="colorbbb">需要支付&nbsp;</span><b>￥</b>' + L.toFixed(2));
				i.next("div.net-pay").show()
			} else {
				B.val("0");
				i.removeClass("checked").find("em.orange").html("");
				i.next("div.net-pay").hide()
			}
		};
		var z = parseInt(D / 100);
		var F = function() {
			var L = J - z;
			if (z >= J) {
				w(J);
				f(0);
				p(0)
			} else {
				w(z);
				if (e >= L) {
					f(L);
					p(0)
				} else {
					f(e);
					p(L - e)
				}
			}
		};
		var r = 0;
		var H = function() {
			if (r == 0) {
				c.each(function(L, M) {
					if (L > 3) {
						$(M).show("slow")
					}
				});
				r = 1;
				$(this).removeClass("pay_pack");
				$(this).css("top", G * 57 + "px")
			} else {
				c.each(function(L, M) {
					if (L > 3) {
						$(M).hide()
					}
				});
				r = 0;
				$(this).addClass("pay_pack");
				$(this).css("top", "195px")
			}
		};
		var c = $(".g-pay-lst").children("ul").find("li");
		var G = c.length;
		if (c.length > 3) {
			$("#a_exp").bind("click", H).show()
		}
		var q = function() {
			var L = parseInt(h.val());
			var M = parseInt(s.val());
			var N = parseInt(B.val());
			var O = (L + M + N) >= J;
			if (O) {
				C.removeClass("grayBtn").unbind("click").bind("click", E)
			} else {
				C.addClass("grayBtn").unbind("click")
			}
		};
		d.bind("click",
		function(O) {
			if (a) {
				return
			}
			stopBubble(O);
			if (z <= 0) {
				K("福分不足支付");
				return
			}
			var P = d.hasClass("checked");
			var N = t.hasClass("checked");
			var L = i.hasClass("checked");
			var M = J;
			if (!P) {
				if (z > J) {
					w(J);
					f(0);
					p(0)
				} else {
					w(z);
					M = M - z;
					if (N) {
						if (e > M) {
							f(M);
							p(0)
						} else {
							f(e);
							M = M - e;
							p(M)
						}
					} else {
						f(0);
						p(M)
					}
				}
			} else {
				w(0);
				if (N) {
					if (e > M) {
						f(M);
						p(0)
					} else {
						f(e);
						M = M - e;
						p(M)
					}
				} else {
					f(0);
					p(M)
				}
			}
			q()
		});
		t.bind("click",
		function(O) {
			if (a) {
				return
			}
			stopBubble(O);
			if (e <= 0) {
				K("余额不足支付");
				return
			}
			var P = d.hasClass("checked");
			var N = t.hasClass("checked");
			var L = i.hasClass("checked");
			var M = J;
			if (!N) {
				if (e > M) {
					f(M);
					w(0);
					p(0)
				} else {
					if (P) {
						M = M - z;
						if (M <= 0) {
							w(0);
							M = J
						}
					}
					f(e);
					M = M - e;
					p(M)
				}
			} else {
				f(0);
				if (P) {
					if (z > M) {
						w(M);
						p(0)
					} else {
						w(z);
						M = M - z;
						p(M)
					}
				} else {
					w(0);
					p(M)
				}
			}
			q()
		});
		i.bind("click",
		function(O) {
			if (a) {
				return
			}
			stopBubble(O);
			var P = d.hasClass("checked");
			var N = t.hasClass("checked");
			var L = i.hasClass("checked");
			var M = J;
			if (!L) {
				if ((z + e) >= J) {
					w(0);
					f(0);
					p(J)
				} else {
					if (P) {
						M = M - z
					}
					if (N) {
						M = M - -e
					}
					p(M)
				}
			} else {
				p(0);
				if (P) {
					if (z > J) {
						w(J);
						f(0)
					} else {
						w(z);
						M = M - z;
						if (N) {
							if (e > M) {
								f(M)
							} else {
								f(e)
							}
						}
					}
				} else {
					if (N) {
						if (e > M) {
							f(M)
						} else {
							f(e)
						}
					}
				}
			}
			q()
		});
		$("div.net-pay").children("a").each(function() {
			var L = $(this);
			L.click(function() {
				L.addClass("checked").siblings().removeClass("checked")
			})
		});
		F();
		var n = function(S, M, N, L, U) {
			var O = 255;
			var R = 130;
			if (typeof(L) != "undefined") {
				O = L
			}
			if (typeof(L) != "undefined") {
				R = U
			}
			var T = null;
			var V = '<div class="clearfix m-round u-tipsEject"><div class="u-tips-txt">' + S + '</div><div class="u-Btn"><div class="u-Btn-li"><a href="javascript:;" id="btnMsgCancel" class="z-CloseBtn">取消</a></div><div class="u-Btn-li"><a id="btnMsgOK" href="javascript:;" class="z-DefineBtn">重试</a></div></div></div>';
			var Q = function() {
				var W = $("#pageDialog");
				W.find("a.z-DefineBtn").click(function() {
					P.close();
					if (typeof(M) != "undefined" && M != null) {
						M()
					}
				});
				W.find("a.z-CloseBtn").click(function() {
					P.cancel();
					if (typeof(N) != "undefined" && N != null) {
						N()
					}
				})
			};
			var P = new $.PageDialog(V, {
				W: O,
				H: R,
				close: true,
				autoClose: false,
				ready: Q
			})
		};
		var o = function(M) {
			var L = function(P, Q, N) {
				var O = new RegExp(Q, "g");
				return P.replace(O, N)
			};
			var M = escape(M);
			M = L(M, "\\+", "%2B");
			M = L(M, "/", "%2F");
			return M
		};
		var m = ["", "", "", "", "", "", ""];
		var y;
		var v = function(O) {
			var U = 0;
			var Q;
			var S = function(W, V) {
				return Math.random() > 0.5 ? -1 : 1
			};
			var L = function() {
				var W = '<div class="pop-pay-pwd clearfix">';
				W += "<dl>";
				W += '<dt class="gray3">请输入支付密码</dt>';
				W += '<dd id="ddpwd">';
				W += "<span><em></em></span><span><em></em></span><span><em></em></span><span><em></em></span><span><em></em></span><span><em></em></span>";
				W += "</dd>";
				W += "</dl>";
				W += '<ul class="pop-pay-pwd clearfix" id="input_pwd">';
				var Y = [];
				for (var X = 0; X < 10; X++) {
					Y[X] = '<li type="num"><a href="javascript:;">' + X + "</a></li>"
				}
				var Z = Y.sort(S);
				var V = Z.length - 1;
				var aa = Z[V];
				Z.splice(V, 1, '<li><a id="a_close" >关闭</a></li>', aa);
				W += Z.join("");
				W += '<li><a id="a_del" >清除</a></li>';
				W += "</ul>";
				W += "</div>";
				return W
			};
			var T = function() {
				if (/^\d{6}$/.test(m.join(""))) {
					if (typeof(O) != "undefined" && O != null) {
						O();
						return true
					}
				}
				return false
			};
			var R;
			var M = function(V) {
				if (U > 5) {
					return false
				}
				var W = parseInt(V.text());
				if (W >= 0 && W < 10) {
					R.eq(U).html("●");
					m[U] = W;
					U++
				}
				T()
			};
			var N = function() {
				payFun.resetFun()
			};
			var P = function() {
				y = $("#pageDialog");
				var W = $("#a_close", y);
				var V = $("#a_del", y);
				R = $("#ddpwd", y).find("em");
				payFun.resetFun();
				$("#input_pwd", y).children('li[type="num"]').each(function() {
					$(this).bind("click",
					function() {
						M($(this))
					})
				});
				W.click(function() {
					Q.cancel()
				});
				V.click(function() {
					N()
				})
			};
			this.closeFun = function() {
				if (Q) {
					Q.close()
				}
			};
			this.initFun = function() {
				var W = $(document.body).width() > 900 ? 900 : $(document.body).width();
				var V = W * 0.8;
				Q = new $.PageDialog(L(), {
					W: V,
					H: 335,
					close: true,
					autoClose: false,
					ready: P
				})
			};
			this.resetFun = function() {
				U = 0;
				$(m).each(function(V) {
					m[V] = "";
					R.eq(V).html("")
				})
			}
		};
		var C = $("#btnPay");
		var g = function(L, M) {
			if (L) {
				a = false;
				C.bind("click", E).removeClass("grayBtn").html("立即支付")
			} else {
				a = true;
				C.addClass("grayBtn").html(M).unbind("click")
			}
		};
		var E = function() {
			if (a) {
				return
			}
			if (J <= 0) {
				alert("亲，您的购物车中没有商品哦，去选购一些吧");
				location.replace("/" + Gobal.SiteVer + "/mycart/index.do");
				return
			}
			var T = parseInt(h.val());
			var U = parseInt(s.val());
			var P = parseInt(B.val());
			var O = i.hasClass("checked");
			var S = I.hasClass("checked");
			var M = j.hasClass("checked");
			var N = u.hasClass("checked");
			var V = k.hasClass("checked");
			var L = (d.hasClass("checked") || t.hasClass("checked")) && !O;
			if (!L && !O) {
				K("请选择支付方式");
				return
			}
			if ((T + U + P) != J) {
				K("提交失败[支付金额错误]");
				return
			}
			g(false, '正在请求,请稍等<span class="dotting"></span>');
			var R = function() {
				if (U > 0 || T > 0) {
					var X = function() {
						var Y = function() {
							var aa = m.join("");
							if (aa.length == 6) {
								payFun.closeFun();
								var Z = function(ad) {
									if (ad.state == 0 || ad.state == -4) {
										Q(ad.str)
									} else {
										if (ad.state == 1) {
											if (ad.num == -4) {
												K("密码错误次数超限，已冻结！")
											} else {
												var ac = function() {
													payFun.closeFun();
													g(true, "立即支付")
												};
												var ab = function() {
													payFun.initFun()
												};
												n("支付密码错误，还可输入" + ad.str + "次！", ab, ac)
											}
										} else {
											K("支付异常,请刷新重试[2]！");
											g(true, "立即支付")
										}
									}
								};
								GetJPData("https://passport.1yyg.com", "checkUPaypwd", "paypwd=" + aa, Z)
							}
						};
						payFun = new v(Y);
						payFun.initFun()
					};
					var W = function(Y) {
						if (Y.state == 0) {
							Q("")
						} else {
							if (Y.state == 1) {
								X()
							} else {
								if (Y.state == -4 || Y.state == 10) {
									location.reload()
								} else {
									K("支付异常,请刷新重试[1]！")
								}
							}
							g(true, "立即支付")
						}
					};
					GetJPData("https://passport.1yyg.com", "checkUPay", "point=" + (T * 100) + "&isBalance=" + (U > 0 ? 1 : 0), W)
				} else {
					Q("")
				}
			};
			var Q = function(Y) {
				if (L) {
					var X = function(aa) {
						var Z = function(ab) {
							if (ab.state == 0) {
								location.replace("/" + Gobal.SiteVer + "/mycart/shopok.do?id=" + ab.str);
								return
							} else {
								if (ab.state == 1 || ab.state == 4) {
									l("已抢光啦，您下手太慢了噢！",
									function() {
										location.reload()
									})
								} else {
									l("提交失败，请重试！",
									function() {
										location.reload()
									})
								}
							}
							a = false;
							C.bind("click", E).removeClass("grayBtn").html("立即支付")
						};
						$.getJSON("http://trade.1yyg.com/JPData/API.ashx?action=UserPay&id=" + aa + "&integral=" + (T * 100) + "&isBalance=" + (U > 0 ? 1 : 0) + "&device=3&checkSN=" + Y + "&isBuyNext=" + A + "&fun=?", Z)
					};
					var W = function(Z) {
						if (Z.code == 0) {
							X(Z.id)
						} else {
							alert("请求失败[code:" + Z.code + "]");
							location.reload()
						}
					};
					a = true;
					g(false, '正在支付,请稍等<span class="dotting"></span>');
					GetJPData("http://weixin.1yyg.com", "getnewcartid", "", W)
				} else {
					if (S) {
						a = true;
						g(false, '正在支付,请稍等<span class="dotting"></span>');
						location.href = "WeiXinPay.do?useBalance=" + (U > 0 ? 1 : 0) + "&integral=" + (T * 100) + "&checkSN=" + Y + "&isBuyNext=" + A;
						setTimeout(function() {
							g(true, "立即支付")
						},
						5000)
					} else {
						if (M) {
							a = true;
							g(false, '正在支付,请稍等<span class="dotting"></span>');
							location.href = "Wangyin.do?useBalance=" + (U > 0 ? 1 : 0) + "&integral=" + (T * 100) + "&checkSN=" + Y + "&isBuyNext=" + A;
							setTimeout(function() {
								g(true, "立即支付")
							},
							5000)
						} else {
							if (N) {
								a = true;
								g(false, '正在支付,请稍等<span class="dotting"></span>');
								location.href = "Cmbchina.do?useBalance=" + (U > 0 ? 1 : 0) + "&integral=" + (T * 100) + "&checkSN=" + Y + "&isBuyNext=" + A;
								setTimeout(function() {
									g(true, "立即支付")
								},
								5000)
							} else {
								if (V) {
									a = true;
									g(false, '正在支付,请稍等<span class="dotting"></span>');
									location.href = "QuickPay.do?useBalance=" + (U > 0 ? 1 : 0) + "&integral=" + (T * 100) + "&checkSN=" + Y + "&isBuyNext=" + A;
									setTimeout(function() {
										g(true, "立即支付")
									},
									5000)
								} else {
									K("支付方式选择错误，请重试!");
									g(true, "立即支付")
								}
							}
						}
					}
				}
			};
			R()
		};
		C.bind("click", E)
	};
	Base.getScript(Gobal.Skin + "/JS/pageDialog.js?v=160304", b)
});