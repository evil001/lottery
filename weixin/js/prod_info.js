$(function() {
	var a = function(o) {
		$.PageDialog.fail(o)
	};
	var d = function(o) {
		$.PageDialog.ok(o)
	};
	var c = $("#hidGoodsID").val();
	var n = $("#hidCodeID").val();
	var k = $("#hidShowTime").val() == "1";
	if (k) {
		Base.getScript(Gobal.Skin + "/JS/GoodsTimeFun.js?v=160304",
		function() {
			$("#divLotteryTime").StartTimeOut(n)
		})
	} else {
		var e = new $CartComm();
		var h = function(o) {
			e.addShopCart(n, 1,
			function(p) {
				if (p.code == 0) {
					if (o == 1) {
						addNumToCartFun(p.num);
						d("添加成功")
					} else {
						location.href = "/" + Gobal.SiteVer + "/mycart/index.do"
					}
				} else {
					if (p.code == 1) {
						location.reload()
					} else {
						if (p.code == 2) {
							a("哎呀！购物车满啦，删除一些吧！", 300)
						} else {
							if (p.code == 3) {
								a("您参与人次已达上限！")
							} else {
								if (o == 1) {
									a("添加失败[" + p.code + "]")
								} else {
									a("添加失败，请重试[" + p.code + "]")
								}
							}
						}
					}
				}
			})
		};
		var j = $(".pro_foot").find("div.btn").find("ul>li");
		j.children("a").eq(0).click(function() {
			h(0)
		});
		j.children("a").eq(1).click(function() {
			h(1)
		});
		Base.getScript(Gobal.Skin + "/JS/WxShare.js?v=160304",
		function() {
			var r = $("#hidShareDesc").val();
			var o = ["o(*^▽^*)o 1元云购是一种很有意思的新型购物模式，你也来试试吧！"];
			var p = "http://weixin.1yyg.com/" + Gobal.SiteVer + "/products/" + c + ".do";
			var q = $("#hidShareImg").val();
			Base.getScript(Gobal.Skin + "/JS/WxShare.js?v=151104",
			function() {
				wxShareFun({
					shareLink: p,
					shareImg: q,
					shareDesc: r,
					shareTitle: o,
					showMask: false
				});
				$("#btnShare").bind("click",
				function() {
					wxShowMaskFun();
					return false
				})
			})
		})
	}
	if (c > 0) {
		var m = false;
		var f = $("#a_sc");
		var i = function() {
			if (m) {
				return
			}
			m = true;
			var o = function(p) {
				if (p.code == 0) {
					d("已关注");
					f.addClass("z-foot-fansed").unbind("click").bind("click",
					function() {
						b()
					})
				} else {
					if (p.code == 1) {
						if (p.num == -1) {
							a("关注失败，商品不存在！");
							location.reload()
						} else {
							if (p.num == -2) {
								f.addClass("z-foot-fansed").unbind("click").bind("click",
								function() {
									b()
								})
							}
						}
					} else {
						if (p.code == 10) {
							location.href = "https://weixin.1yyg.com/" + Gobal.SiteVer + "/Passport/login.do?forward=" + escape(location.href)
						} else {
							a("关注失败，请重试！");
							location.reload()
						}
					}
				}
				m = false
			};
			GetJPData("http://api.1yyg.com", "addCollectGoods", "goodsID=" + c, o)
		};
		var b = function() {
			if (m) {
				return
			}
			m = true;
			var o = function(p) {
				if (p.code == 0) {
					d("已取消关注");
					f.removeClass("z-foot-fansed").unbind("click").bind("click",
					function() {
						i()
					})
				} else {
					a("取消关注失败，请重试！");
					location.reload()
				}
				m = false
			};
			GetJPData("http://api.1yyg.com", "delCollectGoods", "goodsID=" + c, o)
		};
		var g = function(o) {
			if (o.code == 0) {
				f.addClass("z-foot-fansed").unbind("click").bind("click",
				function() {
					b()
				})
			} else {
				f.bind("click",
				function() {
					i()
				})
			}
		};
		GetJPData("http://api.1yyg.com", "checkCollectGoods", "goodsID=" + c, g)
	}
	var l = $("#PicPostion").find("dd");
	if (l.length == 1) {
		$("div.flex-viewport").find("ul.slides").removeAttr("style");
		$("ul.direction-nav").remove()
	}
	Base.getScript(Gobal.Skin + "/JS/pageDialog.js?v=160304",
	function() {
		Base.getScript(Gobal.Skin + "/JS/CartComm.js?v=160715",
		function() {
			Base.getScript(Gobal.Skin + "/JS/GoodsPicSlider.js?v=160304",
			function() {
				$("#sliderBox").picslider()
			})
		})
	})
});