$.fn.StartTimeOut = function(u, h) {
	var t = $(this);
	var a = new Date();
	a.setSeconds(a.getSeconds() + h);
	var m = 0;
	var q = 0;
	var p = 0;
	var l = function() {
		var w = new Date();
		if (a > w) {
			var x = parseInt((a.getTime() - w.getTime()) / 1000);
			var v = x % 60;
			m = parseInt(x / 60);
			q = parseInt(v);
			if (v >= q) {
				p = parseInt((v - q) * 10)
			} else {
				p = 0
			}
			setTimeout(l, 3000)
		}
	};
	var g = t.find("b");
	var b = g.eq(0);
	var k = g.eq(1);
	var n = g.eq(2).children("i");
	var d = $(n[0]);
	var s = $(n[1]);
	var f = 9;
	var o = function() {
		f--;
		if (f < 0) {
			f = 9
		}
		s.html(f);
		setTimeout(o, 10)
	};
	var c = function() {
		s.html("0");
		t.find("#dd_time").html("正在计算,请稍候…");
		var w = null;
		var v = function() {
			GetJPData("http://api.1yyg.com", "GetBarcodernoInfo", "codeID=" + u,
			function(B) {
				if (B.code == 0) {
					var A = "";
					A += '<dl style="display:none;">';
					A += '<dt><a href="http://www.1yyg.com/lottery/' + u + '.html" target="_blank" title="' + B.goodsName + '">';
					A += '<img alt="' + B.goodsName + '" src="http://goodsimg.1yyg.com/GoodsPic/pic-200-200/' + B.goodsPic + '" /></a></dt>';
					A += '<dd class="f-gx"><div class="f-gx-user"><span>恭喜</span><span class="blue"><a href="http://u.1yyg.com/' + B.userWeb + '" title="' + B.userName + '" target="_blank">' + B.userName + "</a></span><span>获得</span></div></dd>";
					A += '<dd class="u-name"><a href="http://www.1yyg.com/lottery/' + u + '.html" target="_blank" title=" (第' + B.codePeriod + "云)" + B.goodsName + '">(第' + B.codePeriod + "云)" + B.goodsName + "</a></dd>";
					A += '<dd class="gray">' + B.ipAddr + "</dd>";
					A += "</dl>";
					A += "<cite></cite>";
					var z = $(A);
					z.fadeIn("2000");
					if (t.hasClass("current2")) {
						t.removeClass("current2");
						t.addClass("col5")
					}
					t.removeClass("current").html(z);
					var x = $("#em_lotcount");
					var y = parseInt(x.html());
					y = y + 1;
					x.css({
						opacity: 0
					}).html(y).stop().animate({
						opacity: 1
					},
					1000);
					if (w != null) {
						clearInterval(w);
						w = null
					}
				} else {
					v()
				}
			})
		};
		v()
	};
	var j = function() {
		p--;
		if (p < 1) {
			if (q < 1) {
				if (m < 1) {
					c();
					return
				} else {
					m--
				}
				q = 59
			} else {
				q--
			}
			p = 9
		}
		setTimeout(j, 100)
	};
	var e = 0,
	r = 0;
	var i = function() {
		d.html(p);
		if (e != q) {
			if (q < 10) {
				k.html("0" + q)
			} else {
				k.html(q)
			}
			e = q
		}
		if (r != m) {
			if (m < 10) {
				b.html("0" + m)
			} else {
				b.html("00")
			}
			r = m
		}
		setTimeout(i, 100)
	};
	l();
	j();
	o();
	i()
};