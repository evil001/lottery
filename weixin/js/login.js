$(function() {
	var a = function() {
		var f = "_uName";
		var e = $("#txtAccount");
		var l = $("#txtPassword");
		var h = $("#showPWD");
		var c = $("#btnLogin");
		var j = $("#hidFlag").val();
		var o = false;
		var d = function(C) {
			var B = /^1\d{10}$/;
			return B.test(C)
		};
		var b = function(C) {
			var B = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			return B.test(C)
		};
		var z = function(C) {
			var B = /^([\x00-\xff])+$/;
			return B.test(C)
		};
		var v = function(D) {
			var C = /^([\x00-\xff]){6,20}$/;
			var B = /^\S{6,20}$/;
			return C.test(D) && B.test(D)
		};
		var i = function(C) {
			var B = /^[0-9A-Za-z]{4,6}$/;
			return B.test(C)
		};
		var r = {
			txtStr: "请输入您的手机号码/邮箱",
			txtpwd: "请输入您的登录密码",
			errorU: "请输入正确的手机号/邮箱",
			errorP: "密码长度为6-20位字符",
			loginerr0: "登录密码不正确",
			loginerr1: "登录帐号未注册",
			loginerr2: "账号被冻结，请与客服联系",
			loginerr3: "失败次数超限，被冻结5分钟",
			loginerr4: "登录失败，请重试",
			showPWD: "显示密码",
			loginerr5: "必须输入帐号和密码",
			loginok: "登录成功",
			codeEmpty: "请输入验证码",
			codeFormatError: "请输入正确的验证码",
			codeError: "验证码输入错误"
		};
		var y = {
			txtStr: "登录",
			checkCode: '正在登录<span class="dotting"></span>'
		};
		var A = function(B) {
			$.PageDialog.fail(B)
		};
		var g = function(B) {
			$.PageDialog.ok(B)
		};
		var p = function() {
			var B = '<input type="text" id="txtCheckCode" value="" placeholder="验证码" class="code"><em></em><div class="code-img"><img src="/api/CheckCode.html?rd=' + GetRandomNum(1, 10000) + '" alt="验证码" class="" id="imgCode" ></div>';
			$("#dl_Code").empty().html(B).show()
		};
		var w = function() {
			$("#imgCode").attr("src", "/api/checkcode.html?rd=" + GetRandomNum(1, 10000));
			$("#txtCheckCode").val("").focus()
		};
		$("#dl_Code").on("click", "#imgCode",
		function() {
			w();
			return ! 1
		});
		var u = 5 * (1 / 24) * (1 / 60);
		var m = "_SHOW_VC_CODE";
		if ($.cookie(m) == "1") {
			p()
		}
		var k = function(C) {
			var B = function(F, G, D) {
				var E = new RegExp(G, "g");
				return F.replace(E, D)
			};
			var C = escape(C);
			C = B(C, "\\+", "%2B");
			C = B(C, "/", "%2F");
			return C
		};
		var t = function() {
			if (!isLoaded) {
				return
			}
			var D = e.val().trim();
			var C = l.val().trim();
			var B = "";
			if (D == "" || D == r.txtStr) {
				A(r.txtStr);
				return
			} else {
				if (C == "" || C == r.txtpwd) {
					A(r.txtpwd);
					return
				} else {
					if (!d(D) && !b(D)) {
						A(r.errorU);
						return
					} else {
						if (!v(C)) {
							A(r.errorP);
							return
						} else {
							if ($("#dl_Code").css("display") != "none") {
								B = $("#txtCheckCode").val().trim();
								if (B == "") {
									A(r.codeEmpty);
									return
								} else {
									if (!i(B)) {
										$("#txtCheckCode").val("").focus();
										A(r.codeFormatError);
										return
									}
								}
							}
						}
					}
				}
			}
			isLoaded = false;
			c.html(y.checkCode).addClass("grayBtn").unbind("click");
			$.post("https://weixin.1yyg.com/JPData", {
				action: "userlogin",
				name: D,
				pwd: C,
				flag: j,
				vCode: B
			},
			function(J) {
				var L = J.state;
				var G = J.num;
				if (L == 0) {
					c.hide();
					$.cookie(f, D, {
						domain: "1yyg.com",
						expires: 1,
						path: "/"
					});
					var F = function() {
						var M = $("#hidLoginForward").val();
						if (M.length == 0 || M.indexOf("weixin.1yyg.com/passport/") > 0) {
							M = "http://weixin.1yyg.com/"
						}
						location.replace(M)
					};
					if (G == 1) {
						if ($.cookie("_noAutoLogin") == "1") {
							var I = null;
							var E = function(P) {
								var M = $(P).width() - 255;
								var O = M > 0 ? M: M * -1;
								var N = O / 2;
								return N
							};
							var H = '<div class="clearfix m-round u-tipsEject"><div class="u-tips-txt">登录成功，以后是否自动登录？</div><div class="u-Btn"><div class="u-Btn-li"><a href="javascript:;" id="btnMsgCancel" class="z-CloseBtn">不自动登录</a></div><div class="u-Btn-li"><a id="btnMsgOK" href="javascript:;" class="z-DefineBtn">自动登录</a></div></div></div>';
							var K = function() {
								$("#btnMsgCancel").click(function() {
									I.cancel();
									F()
								});
								$("#btnMsgOK").click(function() {
									I.close();
									$.cookie("_noAutoLogin", "0", {
										domain: "1yyg.com",
										expires: 525600,
										path: "/"
									});
									F()
								})
							};
							I = new $.PageDialog(H, {
								obj: c,
								oT: 20,
								oL: E(c),
								H: 126,
								autoClose: false,
								ready: K
							})
						} else {
							g(r.loginok);
							F()
						}
					} else {
						g(r.loginok);
						F()
					}
				} else {
					if (L == 1 && (G == -1 || G == -6 || G == -7)) {
						if (J.str == "1") {
							p();
							if (G == -1) {
								l.focus();
								A(r.loginerr0);
								$.cookie(m, 1, {
									expires: u
								})
							} else {
								if (G == -6) {
									if ($("#txtCheckCode") != null) {
										$("#txtCheckCode").val("").focus();
										A(r.codeError)
									}
								} else {
									if ($("#txtCheckCode") != null) {
										$("#txtCheckCode").val("").focus();
										A(r.codeEmpty)
									}
								}
							}
						} else {
							if ($.cookie(m) == "1") {
								w()
							}
							l.focus();
							A(r.loginerr0)
						}
					} else {
						if (L == 1 && G == -2) {
							e.focus();
							A(r.loginerr1)
						} else {
							if (L == 1 && G == -3) {
								A(r.loginerr2)
							} else {
								if (L == 3) {
									A(r.loginerr3)
								} else {
									if (L == 1) {
										A(r.loginerr4 + "|" + L + "|" + G)
									} else {
										A(r.loginerr4 + "|" + L)
									}
								}
							}
						}
					}
				}
				isLoaded = true;
				c.html(y.txtStr).removeClass("grayBtn").bind("click", t)
			},
			"json")
		};
		var q = "";
		var n;
		var s = function() {
			var B = n.val();
			if (q != B) {
				if (z(B) || B == "" || B == r.txtStr) {
					q = B
				} else {
					n.val(q).focus()
				}
			}
			if (o) {
				setTimeout(s, 200)
			}
		};
		e.bind("focus",
		function() {
			$(this).attr("style", "color:#666666");
			o = true;
			n = $(this);
			s()
		}).bind("blur",
		function() {
			o = false
		});
		l.bind("focus",
		function() {
			$(this).attr("style", "color:#666666");
			o = true;
			n = $(this);
			s()
		}).bind("blur",
		function() {
			o = false
		});
		var x = function() {
			var B = $.cookie(f);
			if (B != null) {
				e.val(B).attr("style", "color:#666666")
			}
		};
		x();
		c.bind("click", t);
		isLoaded = true;
		$("div.binSuccess5").keydown(function(C) {
			var B = (window.event) ? event.keyCode: C.keyCode;
			if (B == 32) {
				return false
			} else {
				if (B == 13) {
					c.trigger("click")
				}
			}
			return true
		})
	};
	Base.getScript(Gobal.Skin + "/JS/pageDialog.js?v=160304", a)
});