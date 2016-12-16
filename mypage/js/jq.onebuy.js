(function(e) {
	Base.getScript("js/popLogin.js?date=150703");
	var h = null;
	var a = "https://api.1yyg.com";
	var m = "http://faceimg.1yyg.com/UserFace/00000000000000000.jpg";
	var c = {
		status: 0,
		data: null
	};
	var q = false;
	var i = new $CartComm();

	function g() {
		function v(z, y, A) {
			var A = A || a;
			return e.getJSON(A + "/JPData?action=" + z + (y != "" ? "&" : "") + y + "&fun=?")
		}

		function r(z, y) {
			return e.getJSON("http://trade.1yyg.com/JPData/API.ashx?action=" + z + "&" + y + "&fun=?")
		}

		function s(y) {
			return((y >= 48 && y <= 57) || (y >= 96 && y <= 105)) ? true : false
		}

		function t(y) {
			if(window.console && window.console.log && q) {
				window.console.log(y)
			}
		}

		function x(y) {
			if(y instanceof Array && y.length == 6) {
				e.OnePaySettings.defalutOptions.codeId = y[0];
				e.OnePaySettings.defalutOptions.periods = y[1];
				e.OnePaySettings.defalutOptions.surplus = y[4];
				e.OnePaySettings.defalutOptions.alreadybuy = y[2];
				e.OnePaySettings.defalutOptions.totalnum = y[3];
				e.OnePaySettings.defalutOptions.ratio = y[5]
			}
		}

		function u(z, y) {
			if(window.localStorage) {
				window.localStorage[z] = JSON.stringify(y)
			} else {
				e.cookie(z, JSON.stringify(y), {
					domain: "1yyg.com",
					path: "/",
					expires: 30
				})
			}
		}

		function w(y) {
			if(window.localStorage) {
				var z = window.localStorage[y];
				if(z != null && z != "" && z != undefined) {
					return JSON.parse(z)
				}
			}
			var z = e.cookie(y);
			if(z != null && z != "" && z != undefined) {
				return JSON.parse(z)
			}
			return null
		}
		return {
			getJPData: v,
			getTrade: r,
			isKeyCodeDigital: s,
			logger: t,
			getCache: w,
			setCache: u,
			saveDefaultOptions: x
		}
	}

	function l() {
		function r() {
			var v = e.Deferred();
			if(h != null && h.hasOwnProperty("momey")) {
				if(result.code == 0) {
					c.status = 0
				} else {
					c.status = 1
				}
				c.data = h;
				v.resolve(c)
			} else {
				e.when(j.getJPData("checkLoginEx", "")).then(function(w) {
						h = w;
						if(w.code == 0) {
							c.status = 0
						} else {
							c.status = 1
						}
						c.data = w;
						v.resolve(c)
					},
					function(w) {
						v.reject(w)
					})
			}
			return v.promise()
		}

		function u(w) {
			var v = e.Deferred();
			e.when(j.getJPData("checkUserLimitBuy", "codeID=" + w)).then(function(x) {
					if(x.code == 0) {
						c.status = 0;
						c.data = {
							money: x.userMoney,
							limitBuy: x.codeLimitBuy,
							buyedNum: x.buyNum
						}
					} else {
						c.status = 1;
						c.data = x
					}
					v.resolve(c)
				},
				function(x) {
					v.reject(x)
				});
			return v.promise()
		}

		function t() {
			var v = new popLogin();
			v.show()
		}

		function s() {
			var v = new popLogin();
			v.hide()
		}
		return {
			checkUserLogin: r,
			popUserLogin: t,
			hideUserLogin: s,
			checkUserLimit: u
		}
	}

	function k() {
		function r(s) {
			var t = e.Deferred();
			e.when(j.getJPData("getGoodsSalingByGoodsID", "goodsID=" + s, "http://cart.1yyg.com")).then(function(u) {
					if(u.code == 0) {
						c.status = 0
					} else {
						c.status = 1
					}
					c.data = u;
					t.resolve(c)
				},
				function(u) {
					t.reject(u)
				});
			return t.promise()
		}
		return {
			getSalingGoods: r
		}
	}

	function p() {
		function s(y, w, v) {
			var x = e.Deferred();
			e.when(j.getJPData("shopCartFast", "codeID=" + y + "&num=" + w + "&isBuyNext=" + v, "http://cart.1yyg.com")).then(function(z) {
					if(z.code == 0) {
						c.status = 0
					} else {
						c.status = 1
					}
					c.data = z;
					x.resolve(c)
				},
				function(z) {
					x.reject(z)
				});
			return x.promise()
		}

		function t(w, v) {
			var x = e.Deferred();
			e.when(j.getTrade("UserPay", "device=0&integral=0&isBalance=1&checkSN=" + encodeURI(w) + "&isBuyNext=" + v)).then(function(y) {
					if(y.state == 0) {
						c.status = 0
					} else {
						c.status = 1
					}
					c.data = y;
					x.resolve(c)
				},
				function(y) {
					x.reject(y)
				});
			return x.promise()
		}

		function u(w) {
			var v = e.Deferred();
			j.getJPData("getshopresult", "t=0&id=" + w).done(function(x) {
				if(x.code == 0 && x.state == 1) {
					c.status = 0
				} else {
					c.status = 1
				}
				c.data = x;
				v.resolve(c)
			}).fail(function(x) {
				v.reject(x)
			});
			return v.promise()
		}

		function r(w) {
			var v = e.Deferred();
			e.when(j.getJPData("checkUPaypwd", "paypwd=" + w, "https://passport.1yyg.com")).then(function(x) {
					if(x.state == 0) {
						c.status = 0
					} else {
						c.status = 1
					}
					c.data = x;
					v.resolve(c)
				},
				function(x) {
					v.reject(x)
				});
			return v.promise()
		}
		return {
			toPay: s,
			userPay: t,
			getPayResult: u,
			getCheckUserPassword: r
		}
	}

	function o() {
		function v(F, E, C) {
			var D = '<div class="g-popup"><div class="g-buy-frame"><div class="g-submit"><p class="f-submit-tit gray6">' + F + '</p><div class="u-progress u-progress-c3"><span class="pgbar" style="width:100%"><span class="pging"></span></span></div></div></div></div>',
				C = C || 390,
				E = E || 197;
			e.PageDialog(D, {
				W: C,
				H: E,
				close: false,
				autoClose: false,
				ready: function() {}
			})
		}

		function t(G, F, D, C) {
			var E = '<div class="mAltFail"><s></s>' + G + "</div>",
				F = F || 3000,
				D = D || 240,
				C = C || 45;
			e.PageDialog(E, {
				W: 240,
				H: 45,
				autoTime: F,
				close: false,
				autoClose: false,
				ready: function() {
					setTimeout(function() {
							e.PageDialog.close()
						},
						F - 2000 > 0 ? 2000 : F)
				}
			})
		}

		function B(F, E, C) {
			var D = '<div class="Pop-ups2016"><div class="gray6 pop-text">' + F + '</div><div class="pop-progress-bar"><span class="pgbar"><span class="pging"></span></span></div></div>';
			E = E || 197,
				C = C || 390;
			e.PageDialog(D, {
				W: C,
				H: E,
				close: false,
				autoClose: false
			})
		}

		function y(F, E, C) {
			var D = '<div class="Pop-ups2016"><div class="gray3 pop-theme">' + F + '</div><div class="pop-btn"><a href="javascript:;" title="确定" class="orange_btn">确定</a></div></div>',
				E = E || 146,
				C = C || 390;
			e.PageDialog(D, {
				W: C,
				H: E,
				close: true,
				autoClose: false,
				ready: function() {
					e("div.Pop-ups2016").find("a.orange_btn").on("click",
						function() {
							e.PageDialog.close()
						})
				}
			})
		}

		function s(E, D, G, C) {
			var F = '<div class="Pop-ups2016"><div class="green pop-unable-to-get"><i class="z-clump-icon z-success-icon"></i>支付成功！<cite class="gray9">成功参与' + E + "人次，获得" + E + '福分(揭晓后1小时到账)</cite></div><div class="pop-btn"><a href="javascript:;" title="查看云购记录" class="carry_on_btn">查看云购记录</a><a href="javascript:;" title="继续云购" class="orange_btn">继续云购</a></div></div>',
				G = G || 223,
				C = C || 390;
			e.PageDialog(F, {
				W: C,
				H: G,
				close: true,
				autoClose: false,
				ready: function() {
					e("div.Pop-ups2016").find("a.orange_btn").on("click",
						function() {
							e.PageDialog.close()
						});
					e("div.Pop-ups2016").find("a.carry_on_btn").on("click",
						function() {
							e.PageDialog.close();
							location.href = "http://member.1yyg.com/UserBuyList.do"
						})
				}
			})
		}

		function z(D, E, G, C) {
			var F = '<div class="Pop-ups2016"><div class="gray3 pop-unable-to-get"><i class="z-clump-icon z-failure-icon"></i>啊哦~！被抢光啦！</div><div class="pop-btn">';
			if(!D) {
				F += '<a href="javascript:;" title="继续云购" class="carry_on_btn">继续云购</a><a href="javascript:;" title="参与下一云" class="orange_btn">参与下一云</a>'
			} else {
				F += '<a href="javascript:;" title="确认" class="orange_btn">确认</a>'
			}
			F += "</div></div>";
			G = G || 223,
				C = C || 390;
			if(D == null || D == undefined) {
				D = false
			}
			e.PageDialog(F, {
				W: C,
				H: G,
				close: true,
				autoClose: false,
				ready: function() {
					if(!D) {
						e("div.Pop-ups2016").find("a.orange_btn").eq(0).OneBuy({
							extend: [E]
						});
						e("div.Pop-ups2016").find("a.carry_on_btn").on("click",
							function() {
								e.PageDialog.close()
							})
					} else {
						e("div.Pop-ups2016").find("a.orange_btn").eq(0).on("click",
							function() {
								e.PageDialog.close();
								location.href = location.href
							})
					}
				}
			})
		}

		function A(E, C) {
			var D = '<div class="Pop-ups2016"><div class="gray3 pop-unable-to-get"><i class="z-clump-icon z-failure-icon"></i>支付失败！<cite class="gray9">支付金额将返回您的账户余额</cite></div><div class="pop-btn"><a href="javascript:;" title="确定" class="orange_btn">确定</a></div></div>',
				E = E || 223,
				C = C || 390;
			e.PageDialog(D, {
				W: C,
				H: E,
				close: true,
				autoClose: false,
				ready: function() {
					e("div.Pop-ups2016").find("a.orange_btn").on("click",
						function() {
							e.PageDialog.close();
							location.reload()
						})
				}
			})
		}

		function x(G, D, F, C) {
			var H = e.Deferred();
			var E = '<div class="Pop-ups2016"><div class="gray3 pop-unable-to-get"><i class="z-clump-icon"></i>暂时无法获取支付结果<cite class="gray9">如参与成功，可在“云购记录”查看支付结果</cite></div><div class="pop-btn"><a href="javascript:;" title="继续云购" class="carry_on_btn">继续云购</a><a href="javascript:;" title="重试" class="orange_btn">重试</a></div></div>',
				F = F || 223,
				C = C || 390;
			if(G == undefined || G == null) {
				G = false
			}
			e.PageDialog(E, {
				W: C,
				H: F,
				close: true,
				autoClose: false,
				ready: function() {
					if(!G) {
						e("div.Pop-ups2016").find("a.orange_btn").text("查看云购记录").attr("title", "查看云购记录").on("click",
							function() {
								location.href = "http://member.1yyg.com/UserBuyList.do"
							})
					} else {
						e("div.Pop-ups2016").find("a.orange_btn").on("click",
							function() {
								f.getTipBoxDialog("获取支付结果,请稍候...");
								H.resolve(true)
							})
					}
					e("div.Pop-ups2016").find("a.carry_on_btn").on("click",
						function() {
							H.resolve(false);
							e.PageDialog.close()
						})
				}
			});
			return H.promise()
		}

		function r(D) {
			var E = '<div class="Pop-ups2016"><div class="gray3 pop-unable-to-get"><i class="z-clump-icon"></i>交易异常</div><div class="pop-btn"><a href="javascript:;" title="确定" class="orange_btn">确定</a></div></div>',
				F = F || 223,
				C = C || 390;
			e.PageDialog(E, {
				W: C,
				H: F,
				close: true,
				autoClose: false,
				ready: function() {
					e("div.Pop-ups2016").find("a.orange_btn").on("click",
						function() {
							e.PageDialog.close();
							location.href = location.href
						})
				}
			})
		}

		function u(D) {
			var C = '<div class="g-pwd-wrapper"><div class="g-pwd-inner"><h6>请输入6位支付密码</h6><div class="g-pwd-all"><input type="hidden"><div class="icon-wrapper"><input type="text" maxlength="6" id="passwordInput" style="height:0;margin:0;padding:0;border:none;" /><div class="icon-inner" id="sixDigitPassword"><i class="active"><b style="visibility:hidden;"></b></i><i><b style="visibility:hidden;"></b></i><i><b style="visibility:hidden;"></b></i><i><b style="visibility:hidden;"></b></i><i><b style="visibility:hidden;"></b></i><i><b style="visibility:hidden;"></b></i><span style="visibility: visiable; left: 0px;" id="span"></span></div></div><div class="g-warn">';
			if(D != undefined && D != null && D != "") {
				C += '<i class="u-personal"></i>支付密码输入错误,您还可输入' + D + "次"
			}
			C += '</div></div><div class="memory"><a href="http://member.1yyg.com/UserAuth-10.do" target="_blank" class="gray9">忘记支付密码？</a></div></div></div>';
			return C
		}

		function w() {
			var D = '<div class="Pop-ups2016"><div class="gray3 pop-unable-to-get"><i class="z-clump-icon"></i>出现未知错误，请重试</div><div class="pop-btn"><a href="javascript:;" title="确定" class="orange_btn">确定</a></div></div>',
				E = E || 223,
				C = C || 390;
			e.PageDialog(D, {
				W: C,
				H: E,
				close: true,
				autoClose: false,
				ready: function() {
					e("div.Pop-ups2016").find("a.orange_btn").on("click",
						function() {
							e.PageDialog.close();
							location.href = location.href
						})
				}
			})
		}
		return {
			getPasswordNeedBox: u,
			getFailDialog: t,
			getTipBoxDialog: v,
			getPrePayDialog: B,
			getPasswordErrorDialog: y,
			getPaySuccessDialog: s,
			getBuyNoneDialog: z,
			getPayFailDialog: A,
			getPayResultHasNoneDialog: x,
			getPayExcepitionDialog: r,
			getSystemExceptionDialog: w
		}
	}
	var j = new g();
	var d = new l();
	var n = new k();
	var b = new p();
	var f = new o();
	e.OnePaySettings = {
		buyingNum: 0,
		userInfo: {
			userBalance: 0,
			limitBuy: 0,
			buyedNum: 0
		},
		defalutOptions: {
			codeId: 0,
			periods: 0,
			surplus: 0,
			alreadybuy: 0,
			totalnum: 0,
			ratio: "",
			goodsId: 0
		}
	};
	e.fn.OneBuy = function(u) {
		var y = {
				isBuyNext: false,
				width: 390,
				height: 288,
				buyNum: 1,
				limitPerson: 0,
				limitBuyedNum: 0
			},
			v = {
				userNum: 0,
				extend: [{
					isLimitBuy: false,
					image: m,
					codeId: 0,
					goodsId: 0,
					periods: 0,
					surplus: 0,
					callBackFunc: function() {}
				}]
			};
		var A = e.extend({},
			v, u);
		if(!A.extend instanceof Array) {
			j.logger("extend参数错误");
			return
		}

		function x(C, N, O, M, E, J, B, K) {
			var F = [];
			F.push('<div class="public-quick-purchase clrfix">');
			F.push('<div class="g-buying-info clrfix">');
			F.push('<div class="m-buying-pic fl">');
			F.push('<img src="' + E + '" />');
			if(N) {
				F.push('<span class="limitbuy-icon"></span>')
			}
			F.push("</div>");
			F.push('<div class="m-buying-amount fl">');
			if(J) {
				F.push('<span class="orange">已更新至 <em class="gray3">第' + M + "云</em></span>")
			} else {
				F.push('<span class="gray3">第' + M + "云</span>")
			}
			var H = "剩余" + B + "人次";
			H += N ? ("/限购" + K + "人次") : "";
			F.push('<cite class="gray9">' + H + "</cite>");
			F.push('<div class="f-popup-number">');
			F.push('<a href="javascript:;" class="z-unClick">-</a>');
			F.push('<input type="text" value="' + O + '" />');
			F.push('<a href="javascript:;">+</a>');
			F.push("</div>");
			var I = O > 100 ? "已超过100人次，谨慎参与哦！" : "";
			F.push('<p class="z-popup-Tip orange">' + I + "</p>");
			F.push("</div></div>");
			F.push('<div class="g-balance-payment clrfix">');
			var D = C >= O ? "-￥" + O.toFixed(2).toString() : "余额不足";
			var L = C >= O ? "确认支付" : "使用其他方式支付";
			F.push('<span class="fr orange" id="popOneBuyBanlance">' + D + "</span>");
			F.push('<span class="fl gray3">余额支付(<em class="gray6">余额￥' + C.toFixed(2) + "</em>)</span>");
			F.push("</div>");
			F.push('<div class="g-payment-con clrfix">');
			F.push('<a href="javascript:;" class="orange_btn" id="popOneBuyBtn">' + L + "</a>");
			var G = A.buynext ? "z-comms" : "";
			F.push('<p class="m-auto-next" id="p_buynext"><a href="javascript:;" class="' + G + '"></a><span>如被抢光自动参与最新一云</span></p>');
			F.push("</div></div>");
			if(O > 100) {
				setTimeout(function() {
						e("p.z-popup-Tip").text("")
					},
					3000)
			}
			return F.join(" ")
		}

		function z(H, G, Q, N, M) {
			if(H < 1 || !G instanceof e || !Q instanceof e) {
				return
			}
			var O = "已超过100人次，谨慎参与哦！",
				I = "请输入数字",
				P = M > 0 ? "您已参与" + M + "人次，最多可参与" + H + "人次" : "最多可参与" + H + "人次";
			G.find("a").on("click", E);
			G.find("input").on("keyup", J).on("mouseleave", D).on("blur", L);
			var C = 1;

			function F() {
				var R = e("#popOneBuyBanlance");
				var S = e("#popOneBuyBtn");
				C = parseInt(C);
				if(C == 0) {
					R.text("");
					return
				}
				if(e.OnePaySettings.userInfo.userBalance < C) {
					R.text("余额不足");
					S.text("使用其他方式支付")
				} else {
					R.text("-￥" + C.toFixed(2).toString());
					S.text("确认支付")
				}
				e.OnePaySettings.buyingNum = C
			}

			function K(S, R) {
				if(!S instanceof e) {
					return
				}
				S.addClass(R);
				S.siblings().removeClass(R)
			}

			function B(S, R) {
				if(!R instanceof e) {
					return
				}
				if(S > 1 && S < H) {
					R.removeClass(N);
					R.siblings().removeClass(N)
				}
				if(S > H) {
					K(R, N);
					R.prev().val(H);
					C = H;
					Q.text(P);
					if(C > 0) {
						setTimeout(function() {
								Q.text("")
							},
							3000)
					}
				} else {
					if(S == H || S == 1) {
						K(R, N)
					} else {
						if(S > 100) {
							Q.text(O);
							setTimeout(function() {
									Q.text("")
								},
								3000)
						} else {
							Q.text("")
						}
					}
				}
				F()
			}

			function L(U) {
				var S = e(U.currentTarget);
				var T = S.val();
				if(e.trim(T) != "") {
					var R = /^\d*$/.test(T);
					if(!R) {
						S.val(C)
					}
				}
				var T = parseInt(S.val());
				if(isNaN(T) || T < 1) {
					S.val(1);
					C = 1;
					Q.text("");
					K(e(U.currentTarget).prev(), N)
				}
				F()
			}

			function D(S) {
				var R = e(S.currentTarget);
				R.blur()
			}

			function J(V) {
				var S = e(V.currentTarget);
				var T = S.val();
				if(e.trim(T) != "") {
					var R = /^\d*$/.test(T);
					if(!R) {
						S.val(C)
					}
				}
				T = parseInt(S.val());
				if(isNaN(T)) {
					S.val("").focus()
				}
				var U = T > 1 ? S.next() : S.prev();
				C = T > 1 ? T : 1;
				B(T, U)
			}

			function E(T) {
				var R = e(T.currentTarget);
				var S = parseInt(R.parent().find("input").val());
				if(R.text() == "+") {
					if(H > S) {
						S++;
						R.parent().find("input").val(S);
						C++
					} else {
						if(H == S) {
							S++
						}
					}
				} else {
					if(R.text() == "-") {
						if(S > 1) {
							S--;
							R.parent().find("input").val(S);
							C--
						}
					}
				}
				B(S, R)
			}
		}

		function s(E) {
			var G = "_buyNextCheck",
				D = IEBrowser().isIE ? ";expires=At the end of the Session" : ";expires=Session",
				C = B();
			if(C != undefined && C != null) {
				if(C == 1) {
					E.find("a").addClass("z-comms")
				} else {
					E.find("a").removeClass("z-comms")
				}
			} else {
				E.find("a").addClass("z-comms")
			}
			E.on("click",
				function() {
					if(e(this).find("a").hasClass("z-comms")) {
						e(this).find("a").removeClass("z-comms");
						e("#li_buynext").find("a").removeClass("z-comms");
						F(0)
					} else {
						e(this).find("a").addClass("z-comms");
						e("#li_buynext").find("a").addClass("z-comms");
						F(1)
					}
				});

			function F(H) {
				document.cookie = G + "=" + escape(H) + D + "; path=/;domain=.1yyg.com"
			}

			function B() {
				return e.cookie(G)
			}
		}

		function t(D, C) {
			e.OnePaySettings.buyingNum = 1;
			j.logger("getDialogEnd:" + JSON.stringify(e.OnePaySettings.defalutOptions));
			y.limitBuyedNum = e.OnePaySettings.userInfo.buyedNum;
			y.limitPerson = e.OnePaySettings.userInfo.limitBuy;
			y.isBuyNext = D.periods != e.OnePaySettings.defalutOptions.periods ? true : false;
			if(C > 0) {
				y.buyNum = C;
				e.OnePaySettings.buyingNum = C
			}
			j.logger("getDialogEnd:" + JSON.stringify(e.OnePaySettings.userInfo));
			var B = x(parseInt(e.OnePaySettings.userInfo.userBalance), D.isLimitBuy, parseInt(y.buyNum), parseInt(e.OnePaySettings.defalutOptions.periods), D.image, y.isBuyNext, parseInt(e.OnePaySettings.defalutOptions.surplus), parseInt(y.limitPerson));
			e.PageDialog(B, {
				W: y.width,
				H: y.height,
				close: true,
				autoClose: false,
				BShow: false,
				ready: function() {
					s(e("p.m-auto-next"));
					var G = y.limitPerson - y.limitBuyedNum;
					var E = D.isLimitBuy > 0 ? (e.OnePaySettings.defalutOptions.surplus > G ? G : e.OnePaySettings.defalutOptions.surplus) : e.OnePaySettings.defalutOptions.surplus;
					z(E, e("div.f-popup-number"), e("p.z-popup-Tip"), "z-unClick", y.limitBuyedNum);
					var F = e("p.m-auto-next").find("a").hasClass("z-comms") ? true : false;
					e("a.orange_btn").OnePay({
						buyNum: y.buyNum,
						autoNext: F,
						userBalance: e.OnePaySettings.userInfo.userBalance,
						extend: {
							goodsId: e.OnePaySettings.defalutOptions.goodsId,
							callBackFunc: D.callBackFunc,
							isLimitBuy: D.isLimitBuy,
							image: D.image
						}
					})
				}
			})
		}

		function r(D, B) {
			for(var C = 0; C < B.length; C++) {
				if(D == B[C]) {
					return C
				}
			}
		}

		function w(B, D) {
			var C = B.NewCodeInfo;
			var E = C.split("|");
			if(E != null && E.length == 6) {
				e.OnePaySettings.defalutOptions.goodsId = D;
				j.saveDefaultOptions(E)
			}
			j.logger("setDefaultOptionsEnd:" + JSON.stringify(e.OnePaySettings.defalutOptions))
		}
		$this = this;
		if($this.length > 1) {
			if(A.extend.length != $this.length) {
				j.logger("options.extend.length错误");
				$this.off("click").on("click",
					function() {
						j.logger("异常加载错误")
					});
				return $this
			}
		}
		$this.each(function() {
			$this.off("click").on("click",
				function(E) {
					var B = r(E.currentTarget, $this);
					var C = $this.length > 1 ? A.extend[B] : A.extend[0];
					var D = A.userNum;
					j.logger("PreBuyPayStart:" + JSON.stringify(C));
					var F = e.fn.OneBuy.PreBuyPay(C);
					F.done(function(G) {
						j.logger("PreBuyPayEnd:" + JSON.stringify(G));
						if(G != null && G instanceof Object && G.hasOwnProperty("status")) {
							if(G.status == 0) {
								w(G.data, C.goodsId);
								t(C, D);
								C.callBackFunc(e.OnePaySettings.defalutOptions)
							} else {
								if(G.data.code == 1) {
									f.getFailDialog("本轮商品已经结束")
								} else {
									f.getFailDialog("云购失败,请重试!")
								}
							}
						}
					}).fail(function(G) {
						j.logger("click:" + JSON.stringify(G))
					})
				})
		});
		return $this
	};
	e.fn.OneBuy.PreBuyPay = function(s) {
		var t = e.Deferred();
		var r = s.isLimitBuy ? d.checkUserLimit(s.codeId) : d.checkUserLogin();
		r.done(function(v) {
			j.logger("loginEnd:" + JSON.stringify(v));
			if(v.data.hasOwnProperty("money")) {
				e.OnePaySettings.userInfo.userBalance = v.data.money
			}
			if(v.data.hasOwnProperty("limitBuy")) {
				e.OnePaySettings.userInfo.limitBuy = v.data.limitBuy
			}
			if(v.data.hasOwnProperty("buyedNum")) {
				e.OnePaySettings.userInfo.buyedNum = v.data.buyedNum
			}
			if(v.status == 0) {
				e.when(n.getSalingGoods(s.goodsId)).then(function(w) {
						t.resolve(w)
					},
					function(w) {
						j.logger("getSalingGoods接口异常:" + JSON.stringify(w))
					})
			} else {
				var u = v.data;
				if(u != null && u.hasOwnProperty("code")) {
					if(u.code == -10 || u.code == 10) {
						d.popUserLogin()
					} else {
						if(u.code == -6) {
							f.getFailDialog("您的参与人次已达上限")
						} else {
							if(u.code == -5) {
								n.getSalingGoods(s.goodsId).done(function(w) {
									t.resolve(w)
								}).fail(function(w) {
									j.logger("getSalingGoods接口异常:" + JSON.stringify(w))
								})
							} else {
								t.resolve(u)
							}
						}
					}
				} else {
					t.resolve(u)
				}
			}
		}).fail(function(u) {
			j.logger("login接口异常:" + JSON.stringify(u))
		});
		return t
	};
	e.fn.OnePay = function(s) {
		var w = {
			autoNext: false,
			buyNum: 0,
			userBalance: 0,
			extend: {
				goodsId: 0,
				callBackFunc: function() {},
				isLimitBuy: 0,
				image: m
			}
		};
		var s = e.extend(w, s);
		if(isNaN(s.buyNum) || isNaN(s.userBalance)) {
			j.logger("属性错误");
			return
		}
		$this = this;
		$this.off("click").on("click", t);

		function x(y) {
			if(y != null && y.length == 6) {
				j.saveDefaultOptions(y)
			}
		}

		function t(C) {
			var y = e.cookie("_buyNextCheck");
			if(y != undefined && y != null) {
				if(y == 1) {
					s.autoNext = true
				} else {
					s.autoNext = false
				}
			}
			var A = s.autoNext ? 1 : 0;
			var z = e.OnePaySettings.buyingNum > 0 ? e.OnePaySettings.buyingNum : s.buyNum;
			var B = parseInt(e.OnePaySettings.userInfo.userBalance);
			j.logger("callClickFunc:" + (B >= parseInt(z)));
			if(!(B >= parseInt(z))) {
				u(e.OnePaySettings.defalutOptions.codeId, z, A);
				C.stopPropagation();
				return false
			}
			f.getPrePayDialog("正在支付...");
			b.toPay(e.OnePaySettings.defalutOptions.codeId, z, A).then(function(F) {
				j.logger("toPayEnd:" + JSON.stringify(F));
				if(F.status == 0) {
					var G = e.Deferred();
					G.resolve({
						status: F.status == 0 ? true : false,
						need: F.data.num == 0 ? false : true
					});
					return G.promise()
				}
				if(F.data.code == 1) {
					var E = F.data.NewCodeInfo;
					if(E != "") {
						var D = E.split("|");
						x(D);
						if(!A) {
							var H = {
								isLimitBuy: s.extend.isLimitBuy,
								image: s.extend.image,
								codeId: e.OnePaySettings.defalutOptions.codeId,
								goodsId: e.OnePaySettings.defalutOptions.goodsId,
								periods: e.OnePaySettings.defalutOptions.periods,
								surplus: e.OnePaySettings.defalutOptions.surplus,
								callBackFunc: s.extend.callBackFunc
							};
							f.getBuyNoneDialog(false, H)
						} else {
							f.getBuyNoneDialog(true)
						}
					} else {
						f.getBuyNoneDialog(true);
						e.OnePaySettings.defalutOptions.ratio = 100
					}
					s.extend.callBackFunc(e.OnePaySettings.defalutOptions)
				} else {
					if(F.data.code == 10) {
						location.reload()
					} else {
						f.getPayExcepitionDialog()
					}
				}
			}).then(function(D) {
				if(D == null || D == undefined) {
					return
				}
				var E = e.Deferred();
				if(D.status) {
					e.fn.OnePay.PasswordNeedShowBox(D.need).done(function(F) {
						j.logger("PasswordNeedShowBoxEnd:" + JSON.stringify(F));
						if(F == null) {
							return
						}
						r(F, A).done(function(G) {
							j.logger("UserPayEnd:" + JSON.stringify(G));
							if(G != "") {
								E.resolve(G)
							} else {
								E.resolve("")
							}
						})
					})
				} else {
					E.resolve("")
				}
				return E.promise()
			}).then(function(D) {
				if(D != "" && D != undefined && D != null) {
					f.getPrePayDialog("正在获取支付结果...");
					v(D)
				} else {
					return
				}
			})
		}

		function v(F) {
			var C = b.getPayResult(F);
			var E = 0;
			var B = null;
			var z = 0;
			var A = s.autoNext ? 1 : 0;
			y(1000);

			function y(G) {
				timmesettings = setTimeout(function() {
						if(z == 9) {
							if(C.state() != "resolved") {
								if(E == 3) {
									clearTimeout(B);
									f.getPayResultHasNoneDialog(false, e.OnePaySettings.defalutOptions.goodsId)
								} else {
									E++;
									f.getPayResultHasNoneDialog(true).done(function(H) {
										if(H) {
											y(G)
										}
									})
								}
							} else {
								D()
							}
						} else {
							if(C.state() != "resolved") {
								z++;
								y(G)
							} else {
								D()
							}
						}
					},
					G)
			}

			function D() {
				clearTimeout(B);
				C.done(function(H) {
					j.logger("getPayResultEnd:" + JSON.stringify(H));
					if(H.status == 0) {
						var J = H.data;
						if(J.data == undefined || J.data == null) {
							return
						}
						var G = J.data.length;
						var K = 0;
						for(var I = 0; I < G; I++) {
							K += J.data[I].buyNum
						}
						e.OnePaySettings.defalutOptions.surplus -= parseInt(K);
						e.OnePaySettings.defalutOptions.alreadybuy = parseInt(e.OnePaySettings.defalutOptions.alreadybuy) + parseInt(K);
						f.getPaySuccessDialog(K, e.OnePaySettings.defalutOptions.goodsId);
						s.extend.callBackFunc(e.OnePaySettings.defalutOptions)
					} else {
						if(H.data == undefined || H.data == null) {
							f.getBuyNoneDialog(true);
							return
						}
						if(H.data.state == 2) {
							if(!A) {
								n.getSalingGoods(e.OnePaySettings.defalutOptions.goodsId).done(function(N) {
									j.logger("getPayResultEndGoods:" + JSON.stringify(H));
									if(!N.hasOwnProperty("data")) {
										f.getBuyNoneDialog(true);
										return
									}
									if(!N.data.hasOwnProperty("code") || !N.data.hasOwnProperty("NewCodeInfo")) {
										f.getBuyNoneDialog(true);
										return
									}
									if(N.data.code == 0) {
										var M = N.data.NewCodeInfo;
										if(M != "") {
											var L = M.split("|");
											x(L);
											var O = {
												isLimitBuy: s.extend.isLimitBuy,
												image: s.extend.image,
												codeId: e.OnePaySettings.defalutOptions.codeId,
												goodsId: e.OnePaySettings.defalutOptions.goodsId,
												periods: e.OnePaySettings.defalutOptions.periods,
												surplus: e.OnePaySettings.defalutOptions.surplus,
												callBackFunc: s.extend.callBackFunc
											};
											f.getBuyNoneDialog(false, O)
										} else {
											f.getBuyNoneDialog(true);
											e.OnePaySettings.defalutOptions.ratio = 100
										}
										s.extend.callBackFunc(e.OnePaySettings.defalutOptions)
									} else {
										if(N.data.code == 1) {
											f.getBuyNoneDialog(true)
										} else {
											if(N.data.code == 10) {
												location.reload()
											} else {
												f.getPayExcepitionDialog()
											}
										}
									}
								})
							} else {
								f.getBuyNoneDialog(true)
							}
						} else {
							f.getPayExcepitionDialog()
						}
					}
				}).fail(function(G) {
					f.getPayExcepitionDialog();
					j.logger("getPayResulting:" + JSON.stringify(G))
				})
			}
		}

		function r(A, y) {
			var z = e.Deferred();
			b.userPay(A, y).done(function(B) {
				j.logger("UserPaying:" + JSON.stringify(B));
				if(B.status == 0) {
					z.resolve(B.data.str)
				} else {
					if(B.data.state == 10) {
						location.reload()
					} else {
						if(B.data.state == 1 || B.data.state == 4) {
							if(!y) {
								var C = {
									isLimitBuy: s.extend.isLimitBuy,
									image: s.extend.image,
									codeId: e.OnePaySettings.defalutOptions.codeId,
									goodsId: e.OnePaySettings.defalutOptions.goodsId,
									periods: e.OnePaySettings.defalutOptions.periods,
									surplus: e.OnePaySettings.defalutOptions.surplus,
									callBackFunc: s.extend.callBackFunc
								};
								f.getBuyNoneDialog(false, C)
							} else {
								f.getBuyNoneDialog(true)
							}
						} else {
							f.getPayFailDialog()
						}
					}
				}
			}).fail(function(B) {
				f.getPayExcepitionDialog();
				j.logger("userPay:" + JSON.stringify(B))
			});
			return z.promise()
		}

		function u(A, y, z) {
			i.addShopCart(A, y,
				function() {
					i.setSelValue(A, y,
						function() {
							location.href = "http://cart.1yyg.com/payment.do?bx=" + z
						})
				})
		}
		return $this
	};
	e.fn.OnePay.PasswordNeedShowBox = function(x) {
		var r = e.Deferred();
		var s = null,
			v = null,
			w = null,
			y = null;
		if(x) {
			e.PageDialog(f.getPasswordNeedBox(), {
				W: 390,
				H: 197,
				close: true,
				autoClose: false,
				ready: u
			})
		} else {
			r.resolve("")
		}

		function u() {
			e("#pageDialogClose").off("click").on("click",
				function() {
					e.OnePaySettings.buyingNum = 1;
					e("#pageDialog").hide();
					e("#pageDialogBG").hide();
					e("#pageDialogBorder").hide()
				});
			s = e("#sixDigitPassword");
			v = e("#passwordInput");
			w = s.find("span");
			y = s.find("i");
			v.focus();
			s.click(function() {
				v.focus()
			});
			v.focus(function() {
				var A = v.val();
				t(A.length)
			}).blur(function() {
				w.hide();
				y.removeClass("active")
			}).keydown(function(D) {
				var C = e(this);
				var B = window.event ? window.event.keyCode : D.keyCode;
				if(!j.isKeyCodeDigital(B)) {
					if(B === 8) {
						var E = C.val();
						C.val(E.substring(0, E.length - 1));
						var A = C.val();
						t(A.length);
						return false
					}
					return false
				}
			}).keyup(function() {
				v.val(v.val().replace(/[^\d]+/g, ""));
				var B = v.val();
				var A = e(this);
				t(B.length)
			})
		}

		function t(A) {
			if(A < 6) {
				w.show();
				y.removeClass("active");
				y.each(function(B, C) {
					if(B <= A - 1) {
						e(C).find("b").css({
							visibility: "visible"
						})
					} else {
						e(C).find("b").css("visibility", "hidden")
					}
				});
				y.eq(A).find("b").css("visibility", "hidden");
				y.eq(A).addClass("active");
				w.css("visibility", "visible");
				w.css("left", y.outerWidth() * A + "px")
			} else {
				f.getTipBoxDialog("正在验证，请稍候...");
				w.hide();
				y.removeClass("active");
				y.find("b").css("visibility", "visible");
				z(v.val())
			}
		}

		function z(A) {
			if(/^\d{6}$/.test(A)) {
				b.getCheckUserPassword(A).done(function(B) {
					j.logger("getCheckUserPassword:" + JSON.stringify(B));
					if(B.status == 0) {
						r.resolve(B.data.str)
					} else {
						if(B.data.state == 1) {
							if(B.data.num == -5) {
								setTimeout(function() {
										e.PageDialog(f.getPasswordNeedBox(B.data.str), {
											W: 390,
											H: 197,
											close: true,
											autoClose: false,
											ready: u
										})
									},
									1000)
							} else {
								if(B.data.num == -4) {
									f.getPasswordErrorDialog("密码错误次数过多，冻结30分钟")
								}
							}
						} else {
							f.getPasswordErrorDialog("支付密码验证失败，请重试")
						}
					}
				}).fail(function(B) {
					j.logger("payProcess:" + JSON.stringify(B))
				})
			}
		}
		return r.promise()
	};
	window.PagePOPLoginOK = function() {
		d.hideUserLogin()
	}
})(jQuery);