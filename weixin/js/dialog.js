(function(d) {
	d.PageDialog = function(h, q) {
		var k = {
			W: 255,
			H: 45,
			obj: null,
			oL: 0,
			oT: 0,
			autoClose: true,
			autoTime: 1000,
			ready: function() {},
			submit: function() {},
			isTop: true
		};
		var i = {
			obj: null,
			oL: 0,
			oT: 0,
			autoClose: true,
			autoTime: 2000,
			ready: function() {},
			submit: function() {}
		};
		q = q || i;
		d.extend(k, q);
		var g = k.autoClose;
		var n = function(u) {
			var r = u.get(0);
			r.addEventListener("touchstart", t, false);
			function t(w) {
				if (w.touches.length === 1) {
					r.addEventListener("touchmove", s, false);
					r.addEventListener("touchend", v, false)
				}
			}
			function s(w) {
				w.preventDefault()
			}
			function v(w) {
				r.removeEventListener("touchmove", s, false);
				r.removeEventListener("touchend", v, false)
			}
		};
		var p = d("#pageDialogBG");
		if (!g) {
			if (p.length == 0) {
				p = d('<div id="pageDialogBG" class="pageDialogBG"></div>');
				p.appendTo("body")
			} else {
				p = d("#pageDialogBG")
			}
			p.css("height", d(document).height() > d(window).height() ? d(document).height() : d(window).height());
			n(p)
		}
		var m = d("#pageDialog");
		if (m.length == 0) {
			m = d('<div id="pageDialog" class="pageDialog" />');
			m.appendTo("body");
			if (!g) {
				n(m)
			}
		}
		var f = d(window);
		if (typeof(k.obj) != "undefined" && k.obj != null) {
			if (k.obj.length < 1) {
				k.obj = null
			}
		}
		var e = function(r) {
			r = r.replace(/<\/?[^>]*>/g, "");
			r = r.replace(/[ | ]*\n/g, "\n");
			r = r.replace(/ /ig, "");
			return r
		};
		m.css({
			width: k.W + "px",
			height: k.H + "px"
		});
		m.html(h);
		var o = function() {
			var r, t, u;
			if (k.obj != null) {
				var s = k.obj.offset();
				r = s.left + k.oL;
				t = s.top + k.obj.height() + k.oT;
				u = "absolute"
			} else {
				r = (f.width() - k.W) / 2;
				t = (f.height() - k.H) / 2;
				if (k.isTop) {
					t = t - t / 2
				}
				u = "fixed"
			}
			m.css({
				position: u,
				left: r,
				top: t
			})
		};
		o();
		f.resize(o);
		var l = function() {
			if (g) {
				m.fadeOut("fast");
				p.hide()
			} else {
				m.hide();
				p.hide()
			}
		};
		var j = function() {
			k.submit();
			l()
		};
		if (g) {
			m.show()
		} else {
			m.show();
			p.show()
		}
		m.ready = k.ready();
		if (g) {
			window.setTimeout(j, k.autoTime)
		}
		this.close = function() {
			j()
		};
		this.cancel = function() {
			l()
		}
	};
	d.PageDialog.ok = function(f, e) {
		d.PageDialog('<div class="Prompt"><s></s>' + f + "</div>", {
			autoTime: 500,
			submit: typeof(e) == "function" ? e: function() {}
		})
	};
	d.PageDialog.fail = function(h, g, i, e, f) {
		d.PageDialog('<div class="Prompt">' + h + "</div>", {
			obj: g,
			oT: i,
			oL: e,
			autoTime: 1000,
			submit: typeof(f) == "function" ? f: function() {}
		})
	};
	d.PageDialog.fail2 = function(h, f, e, g) {
		d.PageDialog('<div class="Prompt">' + h + "</div>", {
			W: typeof(f) == "number" ? f: 255,
			H: typeof(e) == "number" ? e: 45,
			autoTime: 2000,
			submit: typeof(g) == "function" ? g: function() {}
		})
	};
	var b = 0;
	d.PageDialog.confirm = function(j, f, e) {
		var h = null;
		var g = '<div class="clearfix m-round u-tipsEject"><div class="u-tips-txt">' + j + '</div><div class="u-Btn"><div class="u-Btn-li"><a href="javascript:;" id="btnMsgCancel" class="z-CloseBtn">取消</a></div><div class="u-Btn-li"><a id="btnMsgOK" href="javascript:;" class="z-DefineBtn">确定</a></div></div></div>';
		var i = function() {
			d("#btnMsgCancel").click(function() {
				h.cancel()
			});
			d("#btnMsgOK").click(function() {
				h.close()
			})
		};
		b++;
		h = new d.PageDialog(g, {
			H: typeof(e) == "number" ? e: 45,
			autoClose: false,
			ready: i,
			submit: f
		})
	};
	d.PageDialog.fail1 = function(h, g, f) {
		var i = c(g);
		var e = a(g);
		d.PageDialog('<div class="Prompt">' + h + "</div>", {
			obj: g,
			oT: i,
			oL: e,
			autoTime: 1000,
			submit: typeof(f) == "function" ? f: function() {}
		})
	};
	var a = function(h) {
		var e = d(h).width() - 255;
		var g = e > 0 ? e: e * -1;
		var f = g / 2;
		return f
	};
	var c = function(e) {
		return (d(e).height() * 2 + 20) * -1
	}
})(jQuery);