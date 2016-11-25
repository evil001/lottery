YG = YG || {};
YG.miniCartTool = {
	skinDomain: "http://skin.1yyg.com",
	cartUrl: "http://cart.1yyg.com",
	_MainBoxObj: null,
	$cartFun: new $CartComm(),
	RTitleObj: null,
	REmptyObj: null,
	RLoadingObj: null,
	RListObj: null,
	RPayObj: null,
	ScrollBox: null,
	divRTCartMain: null,
	shoppingCart: null,
	checkAllObj: null,
	CartTitleCkbox: null,
	_Ptn: /^\d+$/,
	isLoadScrollJs: false,
	initFlag: false,
	init: function(a) {
		this._MainBoxObj = a;
		this.getCartList();
		if (this.initFlag === false) {
			this.valueAssignment();
			this.eventReg();
			this.initFlag = true
		}
	},
	valueAssignment: function() {
		this.RTitleObj = this._MainBoxObj.children("div.f-unfold-title");
		this.REmptyObj = this._MainBoxObj.find("div.cartEmpty");
		this.RLoadingObj = this._MainBoxObj.find("#divCartMainLoadingDiv");
		this.RListObj = this._MainBoxObj.find("div.unfold-list");
		this.RPayObj = this._MainBoxObj.children("div.f-unfold-pay");
		this.ScrollBox = this._MainBoxObj.find("#cart_box");
		this.divRTCartMain = $("#divRTCartMain");
		this.shoppingCart = $("#rightTool").find(".f-shopping-cart");
		this.checkAllObj = $("#cartMainObjTitleDiv").find("span.fl");
		this.CartTitleCkbox = this.checkAllObj.find("em")
	},
	eventReg: function() {
		this.dlHoverReg();
		this.checkReg();
		this.goodsDeleteReg();
		this.payEventReg()
	},
	showTotalMoney: function() {
		var c = this;
		var d = 0;
		var b = 0;
		var f = 0;
		var a = 0;
		_UpdateCount = 0,
		_OutDateCount = 0,
		_AllCheckCount = 0,
		_UpdateCheckCount = 0;
		var e = c.RListObj.find("dl").not(".ygx-con,.yjs-con").map(function() {
			var h = $(this);
			var g = parseInt(h.attr("state"));
			if (g == 1) {
				a++;
				if (h.find("a.z-comms").length > 0) {
					_AllCheckCount++
				}
			} else {
				if (g == 2) {
					a++;
					_UpdateCount++;
					if (h.find("a.z-comms").length > 0) {
						_AllCheckCount++;
						_UpdateCheckCount++
					}
				} else {
					if (g == 3) {
						_OutDateCount++
					}
				}
			}
			var i = h.children("dd.z-checkbox").children("a");
			if (i.hasClass("z-comms")) {
				return h
			}
		});
		if (a == 0) {
			c.checkAllObj.hide()
		} else {
			if (_AllCheckCount == 0) {
				c.CartTitleCkbox.removeClass("z-comms")
			} else {
				if (a == _AllCheckCount) {
					c.CartTitleCkbox.addClass("z-comms")
				} else {
					c.CartTitleCkbox.removeClass("z-comms")
				}
			}
		}
		if (_UpdateCount == 0) {
			c.RListObj.find("dl.ygx-con").remove()
		} else {
			if (_UpdateCheckCount == 0) {
				c.RListObj.find("dl.ygx-con").find("a").removeClass("z-comms")
			} else {
				if (_UpdateCheckCount == _UpdateCount) {
					c.RListObj.find("dl.ygx-con").find("a").addClass("z-comms")
				} else {
					c.RListObj.find("dl.ygx-con").find("a").removeClass("z-comms")
				}
			}
		}
		if (_OutDateCount == 0) {
			c.RListObj.find("dl.yjs-con").remove()
		}
		e.each(function() {
			f = parseInt($(this).find("input[type='text']").val());
			if (c._Ptn.test(f)) {
				d++;
				b += f;
				$(this).find("p.two-row").find(".num-ygrc").html(f);
				$(this).find("p.two-row").find(".num-xj").html("￥" + f + ".00")
			}
		});
		if (d > 0) {
			c.RPayObj.find(".accounts-btn a").removeClass("grayBtn");
			$("#li_buynext").removeClass("disabled")
		} else {
			c.RPayObj.find(".accounts-btn a").addClass("grayBtn");
			$("#li_buynext").addClass("disabled")
		}
		c.RPayObj.find("li.total-txt").html('共<em class="orange">' + d + '</em>件商品，合计：<b class="orange">' + b + ".00</b>元")
	},
	dlHoverReg: function() {
		this.RListObj.on("mouseenter mouseleave", "dl",
		function(b) {
			var a = $(this).find(".z-ygrc").children("p").length;
			if (b.type == "mouseenter") {
				if (a == 2) {
					$(this).addClass("hover");
					$(this).find("p").eq(0).hide().next().show()
				}
			} else {
				if (a == 2) {
					$(this).removeClass("hover");
					$(this).find("p").eq(0).show().next().hide()
				}
			}
		})
	},
	checkReg: function() {
		var a = this;
		this.RListObj.on("click", ".z-checkbox a",
		function() {
			var c = $(this);
			if ($(this).parent().parent().hasClass("ygx-con")) {
				var b = a.divRTCartMain.find("#cart_shower>dl.z-identical>.z-checkbox>a");
				if (c.hasClass("z-comms")) {
					b.removeClass("z-comms")
				} else {
					b.addClass("z-comms")
				}
			} else {
				if (c.hasClass("z-comms")) {
					c.removeClass()
				} else {
					c.addClass("z-comms")
				}
			}
			a.showTotalMoney()
		});
		this.RTitleObj.on("click", ".fl a",
		function() {
			var d = $(this);
			var b = a.divRTCartMain.find("#cart_shower>dl>.z-checkbox>a");
			var c = d.children("em");
			if (c.hasClass("z-comms")) {
				c.removeClass("z-comms");
				b.removeClass("z-comms")
			} else {
				c.addClass("z-comms");
				b.addClass("z-comms")
			}
			a.showTotalMoney()
		})
	},
	goodsDeleteReg: function() {
		var a = this;
		a.RListObj.on("click", "dd.z-close a",
		function(c) {
			var b = $(this);
			a.$cartFun.delShopCart($(this).attr("codeid"),
			function(d) {
				if (d.code == 0) {
					b.parent().parent().remove();
					a.$cartFun.getShopCartNum(function(e) {
						var f = parseInt(e.num);
						if (f == 0) {
							a.cartEmpty();
							a._MainBoxObj.attr("isShowed", "0").stop().animate({
								right: -240
							},
							{
								duration: 400,
								queue: false,
								complete: function() {
									a.shoppingCart.removeClass("toolbar-hover").find("b.curr-arrow").hide()
								}
							})
						}
					});
					_InsertIntoCart();
					a.showTotalMoney()
				}
			})
		})
	},
	goodsNumModify: function() {
		var c = this;
		var b = function(h, f, g, j) {
			var i = function() {
				g.apply(j, arguments)
			};
			window.addEventListener ? h.addEventListener(f, i, false) : h.attachEvent("on" + f, i)
		},
		e = function(h, f, g) {
			window.removeEventListener ? h.removeEventListener(f, g, false) : h.attachEvent("on" + f, g)
		};
		var a = function(h, f, g, i) {
			if (i > 1) {
				if (g == 1) {
					f.addClass("unclick");
					h.removeClass("unclick")
				} else {
					if (g == i) {
						f.removeClass("unclick");
						h.addClass("unclick")
					} else {
						if (g < i) {
							f.removeClass("unclick");
							h.removeClass("unclick")
						}
					}
				}
			} else {
				f.addClass("unclick");
				h.addClass("unclick")
			}
		};
		var d = null;
		$("input:text[name='num']", c.RListObj).each(function() {
			var o = $(this);
			var p = o.attr("codeID");
			var f = o.next();
			var l = o.prev();
			var i = parseInt(o.attr("surplus"));
			var m = parseInt(o.attr("limitbuy"));
			var g = parseInt(o.attr("mylimitsales"));
			var n = m > 0 ? m - g: 0;
			var k = m > 0 ? n > i ? i: n: i;
			a(f, l, parseInt(o.val()), k);
			var j = function(q) {
				if (q == "") {
					o.parent().next("span").hide()
				} else {
					if (o.parent().next("span").length == 0) {
						o.parent().after('<span class="orange">' + q + "</span>")
					} else {
						o.parent().next("span").addClass("orange").html(q).show()
					}
					setTimeout(function() {
						h()
					},
					3000)
				}
			};
			var h = function() {
				if (m > 0) {
					var q = "";
					if (n > 0 && g > 0) {
						q = "限购" + m + "人次"
					} else {
						q = "限购" + m + "人次"
					}
					if (o.parent().next("span").length == 0) {
						o.parent().after("<span>" + q + "</p>")
					} else {
						o.parent().next("span").removeClass("orange").html(q).show()
					}
				} else {
					o.parent().next("span").hide()
				}
			};
			o.keyup(function() {
				if (o.val().trim() == "") {
					return
				}
				if (!c._Ptn.test(o.val())) {
					o.val(o.attr("oldnum"))
				}
				var q = parseInt(o.val().trim());
				if (q > k) {
					q = k;
					o.val(q);
					var r = "";
					if (k < n) {
						r = "不能大于" + k + "人次"
					} else {
						if (m > 0 && g > 0) {
							r = "您已参与" + g + "人次"
						} else {
							if (m > 0) {
								r = "限购" + m + "人次"
							} else {
								r = "不能大于" + k + "人次"
							}
						}
					}
					j(r)
				} else {
					if (q > 100) {
						j("已超过100人次哦")
					} else {
						if (q < 1) {
							q = 1;
							o.val(q);
							j("不能小于1人次")
						}
					}
				}
				c.$cartFun.updateShopCart(p, q,
				function(s) {
					if (s.code == 0) {
						o.attr("oldnum", q);
						a(f, l, q, k);
						c.showTotalMoney()
					} else {
						o.val(o.attr("oldnum"))
					}
				})
			}).blur(function() {
				if (!c._Ptn.test(o.val())) {
					o.val(o.attr("oldnum"))
				}
				var q = parseInt(o.val());
				if (q > k) {
					q = k;
					o.val(q)
				} else {
					if (q < 1) {
						q = 1;
						o.val(q)
					}
				}
				c.$cartFun.updateShopCart(p, q,
				function(r) {
					if (r.code == 0) {
						o.attr("oldnum", q);
						a(f, l, q, k);
						c.showTotalMoney()
					} else {
						o.val(o.attr("oldnum"))
					}
				})
			}).mouseover(function() {
				o.focus().select();
				d = function(q) {
					q = q || window.event;
					if (q && q.preventDefault) {
						q.preventDefault()
					} else {
						window.event.returnValue = false
					}
					stopBubble(q);
					var r = 0;
					if (q.wheelDelta) {
						r = q.wheelDelta > 0 ? 1 : -1
					} else {
						if (q.detail) {
							r = q.detail < 0 ? 1 : -1
						}
					}
					if (r) {
						if (r > 0) {
							f.trigger("click")
						} else {
							l.trigger("click")
						}
					}
				};
				b(o.get(0), "mousewheel", d, o.get(0));
				b(o.get(0), "DOMMouseScroll", d, o.get(0))
			}).mouseout(function() {
				o.blur();
				e(o.get(0), "mousewheel", d);
				e(o.get(0), "DOMMouseScroll", d)
			});
			f.click(function() {
				if ($(this).hasClass("unclick")) {
					return
				}
				if (!c._Ptn.test(o.val())) {
					o.val(o.attr("oldnum"))
				}
				var q = parseInt(o.val());
				q++;
				if (q > k) {
					q = k;
					var r = "";
					if (k < n) {
						r = "不能大于" + k + "人次"
					} else {
						if (m > 0 && g > 0) {
							r = "您已参与" + g + "人次"
						} else {
							if (m > 0) {
								r = "限购" + m + "人次"
							} else {
								r = "不能大于" + k + "人次"
							}
						}
					}
					j(r)
				} else {
					if (q > 100) {
						j("已超过100人次哦")
					}
				}
				c.$cartFun.updateShopCart(p, q,
				function(s) {
					if (s.code == 0) {
						o.val(q);
						o.attr("oldnum", q);
						a(f, l, q, k);
						c.showTotalMoney()
					} else {
						o.val(o.attr("oldnum"))
					}
				})
			});
			l.click(function() {
				if ($(this).hasClass("unclick")) {
					return
				}
				if (o.val().trim() == "") {
					o.val("1")
				}
				if (!c._Ptn.test(o.val())) {
					o.val(o.attr("oldnum"))
				}
				var q = parseInt(o.val());
				q--;
				if (q < 1) {
					q = 1;
					j("不能小于1人次")
				}
				c.$cartFun.updateShopCart(p, q,
				function(r) {
					if (r.code == 0) {
						o.val(q);
						o.attr("oldnum", q);
						a(f, l, q, k);
						c.showTotalMoney()
					} else {
						o.val(o.attr("oldnum"))
					}
				})
			})
		})
	},
	payEventReg: function() {
		var a = this;
		a.RPayObj.on("click", "a[type='pay']",
		function() {
			if ($(this).hasClass("grayBtn")) {
				return false
			}
			GetJPData(apiUrl, "logininfo", "",
			function(d) {
				var c = function() {
					var e = "",
					f = "";
					var h = a.RListObj.find("dl").map(function() {
						var i = $(this);
						var j = i.children("dd.z-checkbox").children("a");
						if (j.hasClass("z-comms")) {
							return i
						}
					});
					h.each(function() {
						var j = $(this).find(".three-row").find("input[type='text']");
						var i = parseInt(j.val());
						if (a._Ptn.test(i)) {
							e += j.attr("codeid") + ",";
							f += i + ","
						}
					});
					if (e != "" && f != "") {
						if (e != "") {
							e = e.substring(0, e.length - 1)
						}
						if (f != "") {
							f = f.substring(0, f.length - 1)
						}
						var g = $("#li_buynext").children("a").hasClass("z-comms") ? 1 : 0;
						a.$cartFun.setSelValue(e, f,
						function() {
							location.href = a.cartUrl + "/payment.do?bx=" + g
						})
					}
				};
				if (d.code == 1) {
					c()
				} else {
					var b = $("#divRTLogin");
					b.css({
						bottom: "5px"
					});
					YG.Bottom.RightTool.isLoginPanelShow = false;
					YG.Bottom.RightTool.showMiniLogin(true);
					YG.Bottom.RightTool.loginSucCallFun = function() {
						c()
					}
				}
			})
		})
	},
	cartEmpty: function() {
		var a = this;
		a.RTitleObj.hide();
		a.RLoadingObj.hide();
		a.ScrollBox.hide();
		a.RListObj.hide();
		a.RPayObj.hide();
		a.REmptyObj.css("padding", ($(window).height() - 89) / 2 + "px 0px").show()
	},
	getCartList: function() {
		var a = this;
		a.$cartFun.getShopCart(function(r) {
			if (r.code == 0) {
				var j = r.listCart;
				var m = r.listUpdate;
				var n = r.listOutDate;
				var c = r.count;
				var l = r.money;
				a.RTitleObj.show();
				a.RLoadingObj.hide();
				a.REmptyObj.hide();
				var e = "";
				if (j.length > 0) {
					for (var h = 0; h < j.length; h++) {
						var b = j[h];
						var q = b.codeQuantity - b.codeSales;
						var p = b.codeType == 3;
						var g = q;
						var o = 0;
						if (p) {
							o = b.codeLimitBuy - b.myLimitSales;
							g = o > q ? q: o
						}
						e += '<dl state="1">';
						e += '<dd class="z-checkbox">';
						if (g > 0) {
							e += '<a class="z-comms" href="javascript:;"></a>'
						}
						e += "</dd>";
						e += '<dd class="z-prc-img">';
						e += '<a href="http://www.1yyg.com/product/' + b.codeID + '.html" title="' + b.goodsName + '" target="_blank">';
						e += '<img src="http://goodsimg.1yyg.com/GoodsPic/pic-70-70/' + b.goodsPic + '" />';
						if (p) {
							e += '<b class="limitbuy-icon"></b>'
						}
						e += "</a>";
						e += "</dd>";
						e += '<dd class="z-ygrc">';
						e += '<p class="two-row">';
						e += "<cite>第" + b.codePeriod + "云</cite>";
						if (g > 0) {
							e += '<cite>云购人次：<em class="orange num-ygrc">' + b.shopNum + "</em></cite>";
							e += '<cite>小计：<em class="orange num-xj">￥' + b.shopNum + ".00</em></cite>"
						} else {
							if (p) {
								e += "<cite>限购" + b.codeLimitBuy + "人次<br/>您已参与" + b.myLimitSales + "人次</cite>"
							}
						}
						e += "</p>";
						if (g > 0) {
							e += '<p class="three-row">';
							e += '<span class="gray6">剩余' + q + "人次</span>";
							e += '<span class="modify">';
							e += '<a href="javascript:;" class="unclick">-</a>';
							e += '<input name="num" state="1" maxlength="6" type="text"  oldnum="' + b.shopNum + '" value="' + b.shopNum + '" codeID="' + b.codeID + '" surplus="' + q + '" limitbuy="' + b.codeLimitBuy + '" mylimitsales="' + b.myLimitSales + '">';
							e += '<a href="javascript:;" class="unclick">+</a>';
							e += "</span>";
							if (p) {
								if (b.myLimitSales > 0) {
									e += "<span>限购" + b.codeLimitBuy + "人次</span>"
								} else {
									e += "<span>限购" + b.codeLimitBuy + "人次<br/>您已参与" + b.myLimitSales + "人次</span>"
								}
							}
							e += "</p>"
						}
						e += "</dd>";
						e += '<dd class="z-close">';
						e += '<a codeId="' + b.codeID + '" href="javascript:;" class="delete-close"></a>';
						e += "</dd>";
						e += "</dl>"
					}
				}
				if (m.length > 0) {
					if (j.length > 0) {
						e += '<dl class="ygx-con"><dd class="z-checkbox"><a class="z-comms" href="javascript:;"></a></dd><dd class="z-ygx-line"><i>已更新</i><s></s></dd></dl>'
					}
					for (var h = 0; h < m.length; h++) {
						var b = m[h];
						var q = b.codeQuantity - b.codeSales;
						var p = b.codeType == 3;
						var g = q;
						var o = 0;
						if (p) {
							o = b.codeLimitBuy - b.myLimitSales;
							g = o > q ? q: o
						}
						e += '<dl class="z-identical" state="2">';
						e += '<dd class="z-checkbox">';
						if (g > 0) {
							e += '<a class="z-comms" href="javascript:;"></a>'
						}
						e += "</dd>";
						e += '<dd class="z-prc-img">';
						e += '<a href="http://www.1yyg.com/product/' + b.codeID + '.html" title="' + b.goodsName + '" target="_blank">';
						e += '<img src="http://goodsimg.1yyg.com/GoodsPic/pic-70-70/' + b.goodsPic + '" />';
						if (p) {
							e += '<b class="limitbuy-icon"></b>'
						}
						e += "</a>";
						e += "</dd>";
						e += '<dd class="z-ygrc">';
						e += '<p class="two-row">';
						e += '<cite class="orange">已更新至第' + b.codePeriod + "云</cite>";
						if (g > 0) {
							e += '<cite>云购人次：<em class="orange num-ygrc">' + b.shopNum + "</em></cite>";
							e += '<cite>小计：<em class="orange num-xj">￥' + b.shopNum + ".00</em></cite>"
						} else {
							if (p) {
								e += "<cite>限购" + b.codeLimitBuy + "人次<br/>您已参与" + b.myLimitSales + "人次</cite>"
							}
						}
						e += "</p>";
						if (g > 0) {
							e += '<p class="three-row">';
							e += '<span class="gray6">剩余' + q + "人次</span>";
							e += '<span class="modify">';
							e += '<a href="javascript:;" class="unclick">-</a>';
							e += '<input name="num" maxlength="6" type="text" oldnum="' + b.shopNum + '" value="' + b.shopNum + '" codeID="' + b.codeID + '" surplus="' + q + '" limitbuy="' + b.codeLimitBuy + '" mylimitsales="' + b.myLimitSales + '">';
							e += '<a href="javascript:;">+</a>';
							e += "</span>";
							e += "</p>"
						}
						e += "</dd>";
						e += '<dd class="z-close">';
						e += '<a codeId="' + b.codeID + '" href="javascript:;" class="delete-close"></a>';
						e += "</dd>";
						e += "</dl>"
					}
				}
				if (n.length > 0) {
					e += '<dl class="yjs-con"><dd class="z-ygx-line"><i>已结束</i><s></s></dd></dl>';
					for (var h = 0; h < n.length; h++) {
						var b = n[h];
						e += '<dl class="bg-f9" state="3">';
						e += '<dd class="z-prc-img">';
						e += '<a href="http://www.1yyg.com/product/' + b.codeID + '.html" title="' + b.goodsName + '" target="_blank"><img src="http://goodsimg.1yyg.com/GoodsPic/pic-70-70/' + b.goodsPic + '" /></a>';
						e += "</dd>";
						e += '<dd class="z-ygrc">';
						e += '<p class="two-row">';
						e += "<cite>已结束</cite>";
						e += "</p>";
						e += "</dd>";
						e += '<dd class="z-close">';
						e += '<a codeId="' + b.codeID + '" href="javascript:;" class="delete-close"></a>';
						e += "</dd>";
						e += "</dl>"
					}
				}
				a.RListObj.html(e).show();
				if (j.length === 0 && m.length === 0) {
					a.checkAllObj.hide()
				} else {
					a.checkAllObj.show()
				}
				a.ScrollBox.height($(window).height() - 140).show();
				var f = '<ul><li class="total-txt"></li><li class="accounts-btn"><a type="pay" class="" href="javascript:;">去结算</a></li><li class="auto-next" id="li_buynext"><a href="javascript:;" class="z-comms"></a><span>如被抢光自动参与最新一云</span></li></ul>';
				var k = $(f);
				$("#li_buynext", k).click(function() {
					if ($(this).hasClass("disabled")) {
						return
					}
					if ($(this).children("a").hasClass("z-comms")) {
						$(this).children("a").removeClass("z-comms")
					} else {
						$(this).children("a").addClass("z-comms")
					}
				});
				a.RPayObj.empty().append(k).show();
				a.RListObj.css("top", "0px");
				a.ScrollBox.children("div.iscroll-drap-parent").remove();
				a.goodsNumModify();
				a.showTotalMoney();
				var d = function() {
					new iScroll("cart_box");
					a.scrollHover()
				};
				if (!a.isLoadScrollJs) {
					a.isLoadScrollJs = true;
					Base.getScript("http://skin.1yyg.com/js/iScroll.js?date=160602", d)
				} else {
					d()
				}
			} else {
				a.cartEmpty()
			}
		})
	},
	scrollHover: function() {
		var a = this;
		a.ScrollBox.hover(function() {
			a.ScrollBox.children("div.iscroll-drap-parent").fadeIn("slow")
		},
		function() {
			a.ScrollBox.children("div.iscroll-drap-parent").fadeOut("slow")
		})
	}
};