var stopBubble = function(a) {
	if (a && a.stopPropagation) {
		a.stopPropagation()
	} else {
		window.event.cancelBubble = true
	}
};
var preventDefault = function(a) {
	a = a || window.event;
	if (a && a.preventDefault) {
		a.preventDefault()
	} else {
		window.event.returnValue = false
	}
};
function CastMoney(a) {
	a = Math.round(a * 1000) / 1000;
	a = Math.round(a * 100) / 100;
	if (/^\d+$/.test(a)) {
		return a + ".00"
	}
	if (/^\d+\.\d$/.test(a)) {
		return a + "0"
	}
	return a
}
function GetRandomNum(a, c) {
	var d = c - a;
	var b = Math.random();
	return (a + Math.round(b * d))
}
String.prototype.rExp = function(b, a) {
	var c = new RegExp(b, "g");
	return this.replace(c, a)
};
String.prototype.toHTML = function(a) {
	var b = String(this);
	if (a) {
		b = b.substring(0, a)
	}
	b = b.rExp(">", "&gt;");
	b = b.rExp("<", "&lt;");
	b = b.rExp(" ", "&nbsp;");
	b = b.rExp("'", "'");
	b = b.rExp('"', '"');
	b = b.rExp("\r\n", "<br/>");
	b = b.rExp("\n", "<br/>");
	b = b.rExp("\r", "<br/>");
	return b
};
String.prototype.trim = function() {
	return this.replace(/(\s*$)|(^\s*)/g, "")
};
String.prototype.trims = function() {
	return this.replace(/\s/g, "")
};
$.cookie = function(b, j, m) {
	if (typeof j != "undefined") {
		m = m || {};
		if (j === null) {
			j = "";
			m.expires = -1
		}
		var e = "";
		if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
			var f;
			if (typeof m.expires == "number") {
				f = new Date();
				f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000))
			} else {
				f = m.expires
			}
			e = "; expires=" + f.toUTCString()
		}
		var l = m.path ? "; path=" + (m.path) : "";
		var g = m.domain ? "; domain=" + (m.domain) : "";
		var a = m.secure ? "; secure": "";
		document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("")
	} else {
		var d = null;
		if (document.cookie && document.cookie != "") {
			var k = document.cookie.split(";");
			for (var h = 0; h < k.length; h++) {
				var c = jQuery.trim(k[h]);
				if (c.substring(0, b.length + 1) == (b + "=")) {
					d = decodeURIComponent(c.substring(b.length + 1));
					break
				}
			}
		}
		return d
	}
};
$.extend({
	loadcss: function(b, a) {
		$("head").append('<link rel="stylesheet" type="text/css" href="' + b + '">').ready(function() {
			a()
		})
	}
});
var browser = {
	versions: function() {
		var a = navigator.userAgent,
		b = navigator.appVersion;
		return {
			trident: a.indexOf("Trident") > -1,
			presto: a.indexOf("Presto") > -1,
			webKit: a.indexOf("AppleWebKit") > -1,
			gecko: a.indexOf("Gecko") > -1 && a.indexOf("KHTML") == -1,
			mobile: !!a.match(/AppleWebKit.*Mobile.*/) || !!a.match(/AppleWebKit/),
			ios: !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: a.indexOf("Android") > -1 || a.indexOf("Linux") > -1,
			iPhone: a.indexOf("iPhone") > -1 || a.indexOf("Mac") > -1,
			iPad: a.indexOf("iPad") > -1,
			webApp: a.indexOf("Safari") == -1
		}
	} (),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};