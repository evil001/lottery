document.domain = "1yyg.com";
function POPLoginOK() {
	if (typeof(PagePOPLoginOK) == "function") {
		PagePOPLoginOK();
		if (typeof(_GetUserLoginInfo) == "function") {
			_GetUserLoginInfo()
		}
	} else {
		location.reload()
	}
}
function ShowPOPLoginBox() {
	var a = new popLogin();
	a.show()
}
function ShowBuyLoginBox() {
	var a = new popLogin();
	a.show()
}
function popLogin() {
	var a = "<iframe name='fastLoginFrame' id='fastLoginFrame' frameborder='0' src='about:blank' style='width:390px;height:428px;padding:0px;overflow:auto;'></iframe>";
	this.show = function(b) {
		b = b || location.href;
		$.PageDialog(a, {
			title: "",
			W: 390,
			H: 428
		});
		var c = $("#fastLoginFrame");
		c.ready(function() {
			try {
				c.attr("src", "https://passport.1yyg.com/ShopLogin.html?forward=" + escape(b))
			} catch(d) {
				alert(d)
			}
		})
	};
	this.hide = function() {
		$.PageDialog.close()
	}
};