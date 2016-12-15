(function(a) {
	a.PageDialog = function(c, q) {
		var f = {
			W: 0,
			H: 0,
			obj: null,
			oL: 0,
			oT: 0,
			close: true,
			autoClose: false,
			autoTime: 1500,
			title: "",
			animation: true,
			ready: function() {},
			submit: function() {}
		};
		var d = {
			obj: null,
			oL: 0,
			oT: 0,
			close: true,
			autoClose: false,
			autoTime: 1500,
			title: "",
			animation: true,
			ready: function() {},
			submit: function() {}
		};
		q = q || d;
		a.extend(f, q);
		var h = getobj("pageDialog");
		var l = getobj("pageDialogBG");
		var i = getobj("pageDialogMain");
		var p = getobj("pageDialogClose");
		var b = a(window);
		a.PageDialog.prototype.dialogCurrent = a.PageDialog.prototype.dialogCurrent || 0;
		var m = function(r, t) {
			var s = function() { (t && typeof t === "function") && t()
			};
			if (window._IsIE) {
				s();
				return
			} else {
				if (!f.animation) {
					s();
					return
				}
				if (r === "zoomIn" && h.data("dialogCurrent") > 1) {
					return
				}
				h.removeClass(r + " zoom-animated").addClass(r + " zoom-animated").one("webkitAnimationEnd mozAnimationEnd oanimationend animationend",
				function() {
					a(this).removeClass(r + " zoom-animated");
					s()
				})
			}
		};
		var o = function() {
			i.empty().css({
				width: "auto",
				height: "auto"
			})
		};
		var e = function() {
			b.unbind("resize");
			m("zoomOut",
			function() {
				o();
				l.hide();
				h.hide().css("opacity", 0).data("dialogCurrent", 0);
				a.PageDialog.prototype.dialogCurrent = 0
			});
			if (typeof(f.submit) == "function") {
				f.submit()
			}
		};
		var n = function() {
			if (f.obj != null) {
				if (f.obj.length < 1) {
					f.obj = null
				}
			}
			if (!f.close) {
				p.hide()
			} else {
				p.show()
			}
			if (f.title != "") {
				p.addClass("pageDialogClose2")
			}
			c = '<div class="content">' + c + "</div>";
			if (f.title != "") {
				c = '<div class="title">' + f.title + "</div>" + c
			}
			o();
			i.html(c);
			h.show().data("dialogCurrent", ++a.PageDialog.prototype.dialogCurrent);
			f.W = (typeof f.W === "number" && f.W) ? (f.W <= i.outerWidth() ? i.outerWidth() : f.W) : i.outerWidth();
			f.H = (typeof f.H === "number" && f.H) ? (f.H <= i.outerHeight() ? i.outerHeight() : f.H) : i.outerHeight();
			i.css({
				width: f.W + "px",
				height: f.H + "px"
			});
			l.show()
		};
		var j = function() {
			var r = document.body.scrollWidth;
			if (b.width() > r) {
				r = b.width()
			}
			l.css({
				opacity: 0.3,
				width: r + "px",
				height: a(document).height() > b.height() ? a(document).height() : b.height() + "px"
			})
		};
		var g = function() {
			if (f.obj != null) {
				var s = f.obj.offset();
				var r = s.left + f.oL;
				var t = s.top + f.obj.height() + f.oT;
				h.css({
					left: r,
					top: t,
					opacity: 1
				})
			}
		};
		var k = function() {
			j();
			if (f.obj != null) {
				return
			}
			var u = b.scrollTop();
			var s = b.scrollLeft();
			var t = (b.height() - f.H) / 2 + u;
			var r = (b.width() - f.W) / 2 + s;
			if (t < f.BSize) {
				t = f.BSize
			}
			if (r < f.BSize) {
				r = f.BSize
			}
			h.css({
				top: t,
				left: r,
				opacity: 1
			})
		};
		n();
		g();
		k();
		m("zoomIn");
		b.resize(k);
		b.scroll(j);
		p.unbind().bind("click", e);
		if (f.autoClose) {
			window.setTimeout(function() {
				a.PageDialog.close()
			},
			f.autoTime)
		}
		h.ready = f.ready()
	};
	a.PageDialog.close = function() {
		getobj("pageDialogClose").click()
	};
	a.PageDialog.showConfirm = function(e, b) {
		var c = '<div class="PopMsgC"><s></s>' + e + '</div><div class="PopMsgbtn"><a href="javascript:void();" id="btnMsgOK" class="orangebut">确认</a>&nbsp;&nbsp;<a href="javascript:void();" id="btnMsgCancel" class="cancelBtn">取消</a></div>';
		var d = function() {
			a("#btnMsgCancel").click(function() {
				a.PageDialog.close()
			});
			a("#btnMsgOK").click(function() {
				a.PageDialog.close();
				b()
			})
		};
		a.PageDialog(c, {
			title: "提示",
			W: 282,
			H: 146,
			ready: d
		})
	}
})(jQuery);