var funParabola = function(d, u, h) {
	var v = 0;
	var l = $(window).scrollTop();
	var i = {
		speed: 166.67,
		curvature: 0.001,
		progress: function() {},
		complete: function() {}
	};
	var q = {};
	h = h || {};
	for(var x in i) {
		q[x] = h[x] || i[x]
	}
	var w = {
		mark: function() {
			return this
		},
		position: function() {
			return this
		},
		move: function() {
			return this
		},
		init: function() {
			return this
		}
	};
	var e = "margin", s = document.createElement("div");
	if("oninput" in s) {
		["", "ms", "webkit"].forEach(function(b) {
			var a = b + (b ? "T" : "t") + "ransform";
			if(a in s.style) {
				e = a
			}
		})
	}
	var t = q.curvature,
		r = 0,
		p = 0;
	var k = true;
	if(d && u && d.nodeType == 1 && u.nodeType == 1) {
		var o = {},
			j = {};
		var g = {},
			n = {};
		var f = {},
			m = {};
		w.mark = function() {
			if(typeof f.x == "undefined") {
				this.position()
			}
			return this
		};
		w.position = function() {
			if(k == false) {
				return this
			}
			var b = document.documentElement.scrollLeft || document.body.scrollLeft,
				a = document.documentElement.scrollTop || document.body.scrollTop;
			if(e == "margin") {
				d.style.marginLeft = d.style.marginTop = "0px"
			} else {
				d.style[e] = "translate(0, 0)"
			}
			o = d.getBoundingClientRect();
			j = u.getBoundingClientRect();
			g = {
				x: o.left + (o.right - o.left) / 2 + b,
				y: o.top + (o.bottom - o.top) / 2 + a
			};
			n = {
				x: j.left + (j.right - j.left) / 2 + b,
				y: j.top + (j.bottom - j.top) / 2 + a
			};
			m = {
				x: -1 * (g.x - n.x),
				y: -1 * (g.y - n.y)
			};
			r = (m.y - t * m.x * m.x) / m.x;
			return this
		};
		w.move = function() {
			if(k == false) {
				return this
			}
			var a = 0,
				b = m.x > 0 ? 1 : -1;
			var c = function() {
				var B = 2 * t * a + r;
				a = a + b * Math.sqrt(q.speed / (B * B + 1));
				if((b == 1 && a > m.x) || (b == -1 && a < m.x)) {
					a = m.x
				}
				var z = a,
					C = t * z * z + r * z;
				var A = $(window).scrollTop() - l;
				v += A;
				C += v;
				if(e == "margin") {
					d.style.marginLeft = z + "px";
					d.style.marginTop = C + "px"
				} else {
					d.style[e] = "translate(" + [z + "px", C + "px"].join() + ")"
				}
				if(a !== m.x) {
					w.position();
					q.progress(z, C);
					window.requestAnimationFrame(c)
				} else {
					q.complete();
					k = true
				}
				l = $(window).scrollTop()
			};
			window.requestAnimationFrame(c);
			k = false;
			return this
		};
		w.init = function() {
			this.position().mark().move()
		}
	}
	return w
};
/**
 * 请求动画
 */
(function() {
	var b = 0;
	var c = ["webkit", "moz"];
	for(var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
		window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
		window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"]
	}
	if(!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(h, e) {
			var d = new Date().getTime();
			var f = Math.max(0, 16.7 - (d - b));
			var g = window.setTimeout(function() {
					h(d + f)
				},
				f);
			b = d + f;
			return g
		}
	}
	if(!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(d) {
			clearTimeout(d)
		}
	}
}());
$.fn.shake = function(a, c, b) {
	this.each(function() {
		var f = $(this);
		var e = 0;
		for(var d = 1; d <= a; d++) {
			f.animate({
					left: (c * -1) + e
				},
				(((b / a) / 4))).animate({
					left: c + e
				},
				((b / a) / 2)).animate({
					left: e
				},
				(((b / a) / 4)))
		}
	});
	return this
};
var showParabola = function(o, q, d, l) {
	var p = $(d);
	var n = $(o);
	if(p.length == 0 || n.length == 0) {
		return
	}
	var g = p.attr("src");
	var c = $('<div  style="display: none;z-index: 100;"><img style="border-radius:40px; border:2px solid #ff6600;" src="' + g + '" width="100%" /></div>').prependTo("body");
	c.css({
		width: 40,
		height: 40,
		position: "absolute",
		top: n.offset().top,
		left: n.offset().left
	}).show();
	var m = $("#rightTool").find("li.f-shopping-cart").find(".z-clump-icon");
	var f = c.get(0);
	var b = m.get(0);
	var j = m.offset().left - n.offset().left;
	var h = 600;
	var i = 0.001;
	if(j < 200) {
		h = 300;
		i = 0.005
	} else {
		if(j < 500) {
			h = 400;
			i = 0.004
		} else {
			if(j < 800) {
				h = 500;
				i = 0.002
			} else {
				if(j < 1100) {
					h = 600;
					i = 0.001
				}
			}
		}
	}
	var e = function() {
		return _IsIE && _IeVersion == 7
	};
	var a = function() {
		var s = $("#ulRToolList").children("li:first").find("a");
		var r = $('<strong class="f-fly-num">+' + q + "</strong>").prependTo(s);
		r.css({
			position: "absolute",
			left: 13,
			top: 3
		}).show();
		r.animate({
			opacity: 0.1,
			top: -50
		}, {
			queue: false,
			duration: 1000,
			complete: function() {
				r.remove()
			}
		})
	};
	var k = funParabola(f, b, {
		speed: h,
		curvature: i,
		progress: function(r, u) {
			var s = m.offset().left - $(f).offset().left;
			var t = m.offset().top - $(f).offset().top;
			if(s <= 50 && t <= 50) {
				$(f).width(20);
				$(f).height(20)
			}
		},
		complete: function() {
			$(f).remove();
			m.shake(3, 3, 200);
			a();
			m.next("em").show();
			l()
		}
	}).init()
};