var _IeVersion = 0,
_IsIE = false;
function IEBrowser() {
	var c = !1,
	b = 0;
	var a = window.navigator.userAgent;
	if (/MSIE ([^;]+)/.test(a)) {
		c = !0;
		b = parseFloat(RegExp["$1"])
	} else {
		if (~a.toLowerCase().indexOf("trident") && ~a.indexOf("rv")) {
			c = !0;
			b = parseFloat(a.match(/rv:(\d+\.\d+)/)[1])
		}
	}
	return {
		isIE: c,
		ieVer: b
	}
}
_IeVersion = IEBrowser().ieVer;
_IsIE = IEBrowser().isIE;
if (_IsIE) {
	document.execCommand("BackgroundImageCache", false, true)
}
String.prototype.trim = function() {
	return $.trim(this)
};
Number.prototype.toPercent = function(a) {
	return (Math.round(this * 10000) / 100).toFixed(a)
};
String.prototype.reAjaxStr = function() {
	var a = String(this);
	a = a.rExp("＇", "'");
	return a
};
String.prototype.rExp = function(b, a) {
	var c = new RegExp(b, "g");
	return this.replace(c, a)
};
function getTrimVal(a) {
	return $("#" + a).val().trim()
}
function GetRandomNum(a, c) {
	var d = c - a;
	var b = Math.random();
	return (a + Math.round(b * d))
}
function stopBubble(a) {
	if (a && a.stopPropagation) {
		a.stopPropagation()
	} else {
		window.event.cancelBubble = true
	}
}
function setDisabled(a) {
	getobj(a).attr("disabled", true)
}
function setEnabled(a) {
	getobj(a).removeAttr("disabled")
}
function setWait(a) {
	getobj(a).attr("disabled", true).css("cursor", "wait")
}
function setUnWait(a) {
	getobj(a).removeAttr("disabled").css("cursor", "pointer")
}
function GetStrLen(a) {
	return a.replace(/[^\x00-\xff]/g, "**").length
}
function formatFloat(a) {
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
function ProhibitedCopy() {
	$(document.body).bind("copy",
	function() {
		try {
			clipboardData.setData("text", "本页内容未经允许请不要随意复制")
		} catch(a) {}
		return false
	})
}
function closeWindow() {
	if (document.all) {
		window.opener = null
	}
	window.open("", "_top", "");
	window.close();
	return false
}
function getPageDataArray() {
	var b = /([^\?&]+)=([^&]*)/g;
	var a = new Object();
	while (arr = b.exec(location.href)) {
		a[arr[1]] = arr[2] ? arr[2] : ""
	}
	return a
}
function FailDialog(e, c, a, b) {
	var d = '<div class="mAltFail"><s></s>' + e + "</div>";
	$.PageDialog(d, {
		W: typeof(c) == "number" ? c: 200,
		H: typeof(a) == "number" ? a: 60,
		close: false,
		autoClose: true,
		submit: typeof(b) == "function" ? b: function() {}
	})
}
function OKDialog(e, c, a, b) {
	var d = '<div class="mAltOK"><s></s>' + e + "</div>";
	$.PageDialog(d, {
		W: typeof(c) == "number" ? c: 200,
		H: typeof(a) == "number" ? a: 60,
		close: false,
		autoClose: true,
		submit: typeof(b) == "function" ? b: function() {}
	})
}
function ConfirmDialog(b, a) {
	$.PageDialog.showConfirm(b, a)
}
function ShowConfirm(f, b, c, a) {
	var d = '<div class="z-pop-box clrfix">';
	d += '<span class="gray3">' + f + "</span>";
	d += '<a id="btn01" href="javascript:;" title="取消" class="z-btn-cancel">取消</a>';
	d += '<a id="btn02" href="javascript:;" title="确定" class="z-btn-determine">确定</a>';
	d += "</div>";
	var e = function() {
		$("#btn01").click(function() {
			$.PageDialog.close()
		});
		$("#btn02").click(function() {
			$.PageDialog.close();
			if (typeof(b) == "function") {
				b()
			}
		})
	};
	$.PageDialog(d, {
		W: typeof(c) == "number" ? c: 282,
		H: typeof(a) == "number" ? a: 146,
		ready: e
	})
}
function dateToDate(b) {
	var c = new Date();
	if (typeof b == "object" && typeof new Date().getMonth == "function") {
		c = b
	} else {
		if (typeof b == "string") {
			var a = b.split("-");
			if (a.length == 3) {
				c = new Date(a[0], a[1], a[2])
			}
		}
	}
	return c
}
function addMulMonth(b, f) {
	f = parseInt(f);
	var h = dateToDate(b);
	var a = h.getFullYear();
	var i = h.getMonth() + 1;
	var k = h.getDate();
	var c = a;
	var d = i + f;
	var e = k;
	while (d > 12) {
		c++;
		d -= 12
	}
	var l = new Date(c, d - 1, e);
	while (l.getMonth() != d - 1) {
		e--;
		l = new Date(c, d - 1, e)
	}
	var j = l.getFullYear();
	var g = l.getMonth() + 1;
	var m = l.getDate();
	if (g < 10) {
		g = "0" + g
	}
	if (m < 10) {
		m = "0" + m
	}
	return j + "-" + g + "-" + m
}
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
$(function(){
	$(".f-shopping-cart ,.f-pur-records ,.f-client ,.f-weixin,.f-customer-service,.f-feedback").hover(function(){
		$(this).addClass("toolbar-hover");
		if($(this).hasClass("f-pur-records") || $(this).hasClass("f-customer-service") || $(this).hasClass("f-feedback"))
			$(this).find("cite").stop().animate({right:"40px"},400,function(){});
		if($(this).hasClass("f-client")){
			$(this).find(".u-activate").show();
			$(this).find(".u-activate").stop().animate({width: "143px"},400,function() {});
		}
		if($(this).hasClass("f-weixin")){
			$(this).find(".u-activate").show();
			$(this).find(".u-activate").stop().animate({width: "97px"},400,function() {});
		}
	},function(){
		$(this).removeClass("toolbar-hover");
		if($(this).hasClass("f-pur-records") || $(this).hasClass("f-customer-service")|| $(this).hasClass("f-feedback"))
			$(this).find("cite").stop().animate({right:"-41px"},400,function(){$(this).removeClass("toolbar-hover");});
		if($(this).hasClass("f-client")){
			$(this).find(".u-activate").hide();
			$(this).find(".u-activate").stop().animate({width: "0px"},400,function() {$(this).removeClass("toolbar-hover")});
		}
		if($(this).hasClass("f-weixin")){
			$(this).find(".u-activate").hide();
			$(this).find(".u-activate").stop().animate({width: "0px"},400,function() {$(this).removeClass("toolbar-hover")});
		}
	});
	
	$("#gototop").click(function(){
		$("body, html").animate({scrollTop: 0},100);
		return false
	});
	
	$("#divRTool li").on('mouseenter',function(){
		console.log(1111)
	},'mouseleave',function(){
		console.log(2222)
	})
});
