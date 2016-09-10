$(function() {
	var e = 50;
	var h = false;
	var a = null;
	var g = $("#ulBankList");
	var d = $("#iRechargeMoney");
	var b = null;
	var c = -1;
	var f = function() {
		var l = function(q, p, o, n) {
			$.PageDialog.fail(q, p, o, n)
		};
		function m(n) {
			n = Math.round(n * 1000) / 1000;
			n = Math.round(n * 100) / 100;
			if (/^\d+$/.test(n)) {
				return n + ".00"
			}
			if (/^\d+\.\d$/.test(n)) {
				return n + "0"
			}
			return n
		}
		var i = /^[1-9]{1}\d*$/;
		var k = "";
		var j = function() {
			var n = a.val();
			if (n != "") {
				if (k != n) {
					if (!i.test(n)) {
						a.val(k).focus()
					} else {
						k = n;
						d.html(m(n))
					}
				}
			} else {
				k = "";
				a.focus();
				d.html("0.00")
			}
		};
		$("#ulOption > li").each(function(n) {
			var o = $(this);
			if (n < 5) {
				o.click(function() {
					h = false;
					e = o.attr("money");
					o.addClass("checked").siblings().removeClass("checked");
					d.html(parseInt(e).toFixed(2))
				})
			} else {
				a = o.find("input");
				a.focus(function() {
					h = true;
					a.css("color", "#666666");
					o.addClass("checked").siblings().removeClass("checked");
					if (b == null) {
						b = setInterval(j, 200)
					}
				}).blur(function() {
					clearInterval(b);
					b = null;
					if (a.val() == "") {
						a.css("color", "#bbbbbb")
					}
				})
			}
		});
		$("#ulBankList > dd").each(function(n) {
			var o = $(this);
			if (o.hasClass("checked")) {
				c = parseInt(o.attr("type"))
			}
			o.click(function() {
				c = parseInt(o.attr("type"));
				o.addClass("checked").siblings().removeClass("checked")
			})
		});
		$("#btnSubmit").click(function() {
			var o = $(this);
			e = h ? a.val() : e;
			if (e == "" || parseInt(e) == 0) {
				l("请输入充值金额")
			} else {
				o.addClass("grayBtn").html('正在跳转<span class="dotting"></span>');
				var p = /^[1-9]\d*\.?\d{0,2}$/;
				if (p.test(e)) {
					var n = "";
					if (c == 0) {
						if (e > 50000) {
							l("抱歉，微信支付限额5万");
							o.removeClass("grayBtn").html("确认充值");
							return
						}
						n = "weixinpay"
					} else {
						if (c == 1) {
							n = "wangyin"
						} else {
							if (c == 2) {
								n = "cmbchina"
							} else {
								l("请选择支付方式！");
								return
							}
						}
					}
					location.href = "/" + Gobal.SiteVer + "/mycart/" + n + ".do?money=" + e;
					setTimeout(function() {
						o.removeClass("grayBtn").html("确认充值")
					},
					5000)
				} else {
					l("充值金额输入有误");
					o.removeClass("grayBtn").html("确认充值")
				}
			}
		})
	};
	Base.getScript(Gobal.Skin + "/JS/pageDialog.js?v=160304", f)
});