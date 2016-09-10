$(function() {
	var h = null;
	var g = $("#hidGoodsID").val();
	var d = $("#divLoading");
	var c = $("#ul_list");
	var b = 10;
	var f = 0;
	var a = {
		FIdx: 1,
		EIdx: b,
		isCount: 1
	};
	var e = function() {
		var n = new $CartComm();
		var k = function(o) {
			$.PageDialog('<div class="Prompt">' + o + "</div>", {
				W: 200,
				H: 45,
				close: false,
				autoClose: true,
				submit: function() {
					location.reload()
				}
			})
		};
		var i = function(q, p, o) {
			$.PageDialog.confirm(q, p, o)
		};
		var l = function(o) {
			$.PageDialog('<div class="Prompt">' + o + "</div>")
		};
		var m = function(o) {
			$.PageDialog.ok(o)
		};
		var j = function() {
			var o = function() {
				var q = "";
				q += "FIdx=" + a.FIdx;
				q += "&EIdx=" + a.EIdx;
				q += "&isCount=" + a.isCount;
				return q
			};
			var p = function() {
				GetJPData("", "getCollectGoodsList", o(),
				function(v) {
					if (v.code == 0) {
						var u = v.listItems;
						if (a.isCount == 1) {
							f = v.totalCount;
							a.isCount = 0
						}
						if (f > 0) {
							var t = u.length;
							for (var s = 0; s < t; s++) {
								var r = parseInt(u[s].isSale);
								var q = "";
								q += "<li isSale=" + r + ' goodsID="' + u[s].goodsID + '">';
								q += '<span class="gList_l fl"><img src="' + Gobal.LoadPic + '" src2="http://goodsimg.1yyg.com/GoodsPic/pic-200-200/' + u[s].goodsPic + '">';
								if (u[s].codeType == "3") {
									q += '<div class="pTitle pPurchase">限购</div>'
								}
								q += "</span>";
								q += '<div class="gList_r">';
								q += '<h3 class="gray6">' + u[s].goodsName + "</h3>";
								q += '<div class="gRate clearfix">';
								if (r == 1) {
									q += '<a href="javascript:;" class="now_btn">第<span class="orange">' + u[s].codePeriod + '</span>云进行中<span class="dotting"></span></a>';
									q += '<div class="fr">';
									q += '<a href="javascript:;" codeID="' + u[s].codeID + '" class="car-btn"><s></s></a>';
									q += '<div class="share">';
									q += '<span class="s-dot"></span>';
									q += '<span class="s-dot"></span>';
									q += '<span class="s-dot"></span>';
									q += '<div class="option" style="display:none;">';
									q += '<a href="javascript:;" goodsID="' + u[s].goodsID + '" class="z-del o-btn"><i></i>删除</a>';
									q += '<a href="javascript:;" goodsName="' + u[s].goodsName + '" goodsPic="http://goodsimg.1yyg.com/GoodsPic/pic-200-200/' + u[s].goodsPic + '" goodsID="' + u[s].goodsID + '" class="z-share o-btn"><i class="z-set"></i>分享</a>';
									q += "</div>";
									q += "</div>";
									q += "</div>"
								} else {
									q += '<a href="javascript:;" class="now_btn">已结束</a>';
									q += '<div class="fr"><a goodsID="' + u[s].goodsID + '" href="javascript:;" class="z-del"><i></i></a></div>';
									q += "</div>"
								}
								q += "</div>";
								q += "</div>";
								q += "</li>";
								var w = $(q);
								w.click(function() {
									location.href = "/" + Gobal.SiteVer + "/products/" + $(this).attr("goodsID") + ".do"
								}).find("a.car-btn").click(function(y) {
									stopBubble(y);
									var x = $(this).attr("codeID");
									n.addShopCart(x, 1,
									function(z) {
										if (z.code == 0) {
											addNumToCartFun(z.num);
											m("添加成功")
										} else {
											if (z.code == 1) {
												k("已满员")
											} else {
												if (z.code == 2) {
													l("哎呀！购物车满啦，删除一些吧！", 300)
												} else {
													if (z.code == 3) {
														l("您参与人次已达上限！")
													} else {
														l("添加失败，请重试[" + z.code + "]")
													}
												}
											}
										}
										_obj.removeClass("add")
									});
									return false
								});
								w.find("div.share").click(function() {
									$(this).parents("li").siblings().find("div.share").attr("isshow", "0").find("div.option").hide();
									if ($(this).attr("isshow") == "1") {
										$(this).attr("isshow", "0");
										$(this).find("div.option").hide()
									} else {
										$(this).attr("isshow", "1");
										$(this).find("div.option").show()
									}
									return false
								}).find("a.z-share").click(function(B) {
									stopBubble(B);
									var A = $(this).attr("goodsName");
									var x = ["<(▰˘◡˘▰)> 1元云购是一种很有意思的新型购物模式，你也来试试吧！"];
									var y = "http://weixin.1yyg.com/" + Gobal.SiteVer + "/products/" + $(this).attr("goodsID") + ".do";
									var z = $(this).attr("goodsPic");
									wxShareFun({
										shareLink: y,
										shareImg: z,
										shareTitle: x,
										shareDesc: A
									});
									return false
								});
								w.find("a.z-del").click(function(y) {
									stopBubble(y);
									var z = $(this).attr("goodsID");
									var x = function() {
										GetJPData("", "delCollectGoods", "goodsID=" + z,
										function(A) {
											if (A.code == 0) {
												m("删除成功！");
												h.getInitPage()
											} else {
												if (A.code == 10) {
													location.reload()
												} else {
													l("抱歉，删除失败[" + A.code + "]！")
												}
											}
										})
									};
									i("您确定要删除吗？", x);
									return false
								});
								c.append(w)
							}
							$("html").bind("click",
							function() {
								$(this).find("div.share").attr("isshow", "0").find("div.option").hide()
							});
							if (a.EIdx < f) {
								_IsLoading = false
							} else {
								d.hide()
							}
							loadImgFun(0)
						} else {
							d.hide();
							if (a.FIdx == 1) {
								c.html(Gobal.NoneHtml)
							}
						}
					} else {
						if (v.code == 1) {
							d.hide();
							if (a.FIdx == 1) {
								c.html(Gobal.NoneHtml)
							}
						} else {
							d.hide();
							c.html(Gobal.ErrorHtml(v.code));
							_IsLoading = false
						}
					}
				})
			};
			this.getInitPage = function() {
				a.FIdx = 1;
				a.EIdx = b;
				a.isCount = 1;
				f = 0;
				c.empty();
				p()
			};
			this.getFirstPage = function() {
				p()
			};
			this.getNextPage = function() {
				a.FIdx += b;
				a.EIdx += b;
				p()
			}
		};
		h = new j();
		h.getFirstPage();
		scrollForLoadData(h.getNextPage)
	};
	Base.getScript(Gobal.Skin + "/JS/pageDialog.js?v=160304",
	function() {
		Base.getScript(Gobal.Skin + "/JS/WxShare.js?v=160304",
		function() {
			Base.getScript(Gobal.Skin + "/JS/CartComm.js?v=160523", e)
		})
	})
});