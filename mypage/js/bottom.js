var yg = yg || {};
var mainHttp = "http://www.yyyg.com";
var cartUrl = "http://cart.yyyg.com";
var passportUrl = "https://passport.yyyg.com";
var memberUrl = "http://member.yyyg.com";
var apiUrl = "http://api.yyyg.com";
var skinUrl = "http://skin.yyyg.com";
var proHost = "";
var _IsCartChanged = false;
var _InsertIntoCart = function() {
	YG.Bottom.Comm.getUserCartNum();
};
(function() {
	if (window.self !== window.top) {
		var url = mainHttp;
		if (typeof(window.location) == "object") {
			url = window.location.href.replace(/['|<|>]/ig, "")
		}
		
		var formHtml = $("<form name='toTopUrl' method='get' action='" + b + "' target='_top'></form>");
		formHtml.appendTo("body").ready(function() {
			formHtml.submit();
		});
	}
})();

function getYYData(host,action,param,fun){
	$.getJSON(host+"/...?action="+action+(param != "" ? "&" : "") + param + "&fun="+fun);
}

var loadImgFun = function(){
	var loadingPicBlock = $("#loadingPicBlock");
	if (loadingPicBlock.length > 0) {
		var img = loadingPicBlock.find("img");
		var maxScrollTop = function() {
			return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		};
		var clientHeight = function() {
			return document.documentElement.clientHeight + d() + 100;
		};
		var maxScrollTopVal = maxScrollTop();
		var maxScrollTopValTmp = maxScrollTopVal;
		var eachImgFun = function() {
			img.each(function() {
				try {
					if ($(this).parent() != null && $(this).parent().offset() != null) {
						if ($(this).parent().offset().top <= a()) {
							var attrSrc = $(this).attr("src2");
							if (attrSrc) {
								$(this).attr("src", attrSrc).removeAttr("src2").show()
							}
						}
					}
				} catch(i) {
					console.log(i)
				}
			})
		};
		$(window).bind("scroll", function() {
			maxScrollTopValTmp = maxScrollTop();
			if (maxScrollTopValTmp - maxScrollTopVal > 50) {
				maxScrollTopVal = maxScrollTopValTmp;
				eachImgFun();
			}
		});
		eachImgFun()
	}
}

yg.Bottom = {
	util:{
		escape2:function(val){
			var tmp = function(val,patten,oldVal){
				var reg = RegExp(patten,"g");
				return val.replace(reg,oldVal);
			}
			val = escape(val);
			val = tmp(val,"\\+","%2B");
			val = tmp(val,"/","%2F");
			return val;
		},
		ckMobile:function(val){
			var reg = /^1\d{10}$/;
			if(!reg.exec(val)){
				return false;
			}else{
				return true;
			}
		},
		ckEmail:function(val){
			var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if(reg.test(val)){
				return true;
			}
			return false;
		},
		ckPassword:function(val){
			var reg = /^[\S]{6,20}$/;
			if(!reg.exec(val)){
				return false;
			}
			return true;
		},
		ckVcCode:function(val){
			var reg = /^[0-9A-Za-z]{4,6}$/;
			if(!reg.exec(val)){
				return false;
			}
			return true;
		}
	},
	common:{
		isInitQQEvent:false,
		broswerProcess:function(){
			var versionWidth = function(){
				if(_IsIE && $(window).width() < 1190){
					if(_IeVersion < 9){
						$("body").addClass("f-width-change")
					}else{
						$("body").removeClass("f-width-change");
					}
				}else{
					$("body").removeClass("f-width-change");
				}
			};
			
			if(_IsIE && _IeVersion == 6){
				$("body").css("font", '12px/150% Arial,Verdana,"\5b8b\4f53"');
			}
			
			$(window).resize(function() {
				versionWidth();
				yg.Bottom.RightTool.switchRightTool(false);
			});
		},
		serverTimeProcess:function(){
			var footServerTime = $("#pServerTime");
			if(footServerTime.length > 0){
				var serverSpan = footServerTime.children("span");
				var showServerTime = function(val){
					var hour = val.getHours();
					var minute = val.getMinutes();
					var second = val.getSeconds();
					return (hour > 9 ? h.toString() : "0" + hour) + ":" + (minute >9 ? minute.toString() : "0"+ minute) + (second > 9 ? second.toString() : "0" + second);
				};
				var tmp = 0;
				var currDate = new Date();
				var showTimeHtml = currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate() + " " + showServerTime(currDate);
				getYYData(proHost,"getServerTime","time="+showTimeHtml,function(result){
					if(result.code == 10000){
						tmp = result.num;
					}
					var timeFun = function(){
						var d = new Date();
						d.setSeconds(d.getSeconds() + tmp);
						var hour = d.getHours();
						var minute = d.getMinutes();
						var second = d.getSeconds();
						serverSpan.eq(0).html(hour > 9 ? hour.toString() : "0" + hour);
						serverSpan.eq(1).html(minute > 9 ? minute.toString() : "0" + minute);
						serverSpan.eq(2).html(second > 9 ? second.toString() : "0" + second);
					};
					setInterval(timeFun,1000);
				});
			}
		},
		setSrcFun: function() {
			var appendVersion = function(d) {
				var date = new Date();
				d.attr("src", d.attr("data") + "?v=" + GetVerNum()).removeAttr("id").removeAttr("data")
			};
			var ele = $("#pageJS", "head");
			if (ele.length > 0) {
				appendVersion(ele);
			} else {
				ele = $("#pageJS", "body");
				if (ele.length > 0) {
					appendVersion(ele);
				}
			}
		},
		getUserCartNum: function() {
			var bottomObj = this;
			var currentUrl = location.href.toLowerCase();
			var isAuth = currentUrl.indexOf("member.1yyg.com") > -1 && currentUrl.indexOf("referauth.do") == -1 && currentUrl.indexOf("referrals.do") == -1 ? true: false;
			if (yg.Bottom.RightTool.RightCartObj.length > 0 || yg.Bottom.Header.HeadCartNumObj.length > 0 || isAuth) {
				var tmpCartUrl = [cartUrl];
				var f = true;
				for (var c = 0; c < tmpCartUrl.length; c++) {
					if (location.href.toLowerCase().indexOf(tmpCartUrl[c]) > -1) {
						f = false;
						break
					}
				}
				if (f) {
					bottomObj.getCartNumFun()
				}
			}
		},
		getUserTotalBuyCount: function() {
			var totalBuy = $("#ulHTotalBuy");
			var fundTotal = $("#spFundTotal");
			var tmp = 0;
			var onLine = 2000;
			var b = false;
			var getServerBuyTotalCount = function() {
				getYYData(apiUrl, "totalBuyCount", "", function(o) {
					if (o.state == 0) {
						fundTotal.html("￥" + o.fundTotal);
						var count = o.count;
						if (tmp != count) {
							if (!b) {
								var countStr = count.toString().length;
								if (countStr > 10) {
									var strHtml = "";
									for (var n = 0; n < countStr - 10; n++) {
										strHtml += '<li class="num" type="add"><cite style="top: -243px;">';
										for (var p = 9; p >= 0; p--) {
											strHtml += '<em t="' + p + '">' + p + "</em>"
										}
										strHtml += "</cite><i></i></li>";
										tmp = "0" + tmp.toString()
									}
									totalBuy.children("li").eq(0).after(strHtml);
									b = true
								}
							}
							if (tmp == 0) {
								tmp = count;
								fundTotal.children("li.num").each(function() {
									var cithStr = '<cite style="top:-243px;">';
									for (var t = 9; t >= 0; t--) {
										cithStr += '<em t="' + t + '">' + t + "</em>"
									}
									cithStr += "</cite><i></i>";
									$(this).html(cithStr);
								});
								var countStrTmp = count.toString();
								var countStrTmpLen = countStrTmp.length;
								var arrCountStrTmp = countStrTmp.split("");
								fundTotal.find("cite").each(function(w, j) {
									var citeObj = $(this);
									var t = parseInt(arrCountStrTmp[w]);
									if (! (/^\d+$/.test(t))) {
										t = 0;
									}
									citeObj.animate({
										top: "-" + (27 * (9 - t)) + "px"
									},
									{
										queue: false,
										duration: e,
										complete: function() {}
									})
								})
							} else {
								var arrTmp = tmp.toString().split("");
								var arrCountStrTmp = count.toString().split("");
								tmp = count;
								fundTotal.find("cite").each(function(z, w) {
									var A = 0;
									var y = parseInt(arrTmp[z]);
									if (arrTmp[z] <= arrCountStrTmp[z]) {
										A = parseInt(arrCountStrTmp[z]) - parseInt(arrTmp[z]);
									} else {
										A = 10 + parseInt(arrCountStrTmp[z]) - parseInt(arrTmp[z]);
									}
									if (A != 0) {
										var B = $(this).children('em[t="' + y + '"]');
										var u = B.nextAll();
										for (var x = u.length - 1; x > -1; x--) {
											$(this).prepend($(u[x]))
										}
										var t = -(243 - A * 27);
										$(this).css({
											top: "-243px"
										}).animate({
											top: t
										},
										{
											queue: false,
											duration: e,
											complete: function() {}
										})
									}
								})
							}
						}
					}
				});
				setTimeout(getServerBuyTotalCount, 5000)
			};
			if (totalBuy.length > 0 || fundTotal.length > 0) {
				getServerBuyTotalCount();
			}
		},
		disablePassword:function(){
			$('input[type="password"]').bind("cut copy paste",function(event){
				event.preventDefault();
			});
		}
	},
	Top:{
		TopRightBox:$("#ulTopRight"),
		liMsgObj: $("#liTopUMsg"),
		loadHeadADFun: function() {
			if (location.href.toLowerCase().indexOf("passport.yyyg.com") == -1) {
				var date = new Date();
				if(date.getDate() == 6){
					return;
				}
				var cookie = $.cookie("_topNotice3");
				if(cookie == null){
					var noticeHtml = $('<div class="banner-prompt clrfix"><div class="w1190"><span class="fl">公告：为提高服务质量，给您带来更优质的体验，2016年4月5日起，1元云购网将对福分、佣金、经验值等结算时间进行变更，<a href="http://group.1yyg.com/topic-14042.html" target="_blank" class="ckxq">点击查看详情&gt;&gt;</a></span><span class="fr"><a href="javascript:;" class="close" title="关闭"></a></span></div></div>');
					noticeHtml.find("a.close").click(function(){
						noticeHtml.remove();
						$.cookie("_topNotice3", "1", {
							domain: "yyyg.com",
							expires: 10,
							path: "/"
						});
						return false;
					});
					$("div.g-toolbar").before(noticeHtml);
				}
			}
		},
		loginInfoProcess: function() {
			var obj = this;
			var browserLoca = location.href.toLowerCase();
			var isMemerber = browserLoca.indexOf("member.1yyg.com") > -1 && browserLoca.indexOf("referauth.do") == -1 && browserLoca.indexOf("referrals.do") == -1 ? true: false;
			var isUyyyg = browserLoca.indexOf("u.yyyg.com") > -1 ? true: false;
			if (isMemerber || isUyyyg) {
				obj.liMsgObj.remove();
				obj.liMsgObj.length = 0;
				$("#liHome,#liIndex").show().next().show();
				if (isMemerber) {
					YG.Bottom.RightTool.miniRightToolObj.remove();
				}
			} else {
				$("#liMember").show().next().show()
			}
			if (!isMemerber) {
				$("#liCCTV").show().prev().show();
				if (!isUyyyg) {
					$("#liCollect").addClass("f-collect");
				}
			}
			_GetUserLoginInfo = function() {
				if (obj.TopRightBox.length > 0) {
					getYYData(apiUrl, "logininfo", "",
					function(e) {
						obj.TopRightBox.children('li[type="nologin"]').remove();
						if (e.code == 1) {
							obj.TopRightBox.prepend('<li><div class="u-menu-hd u-menu-login"><a href="http://member.1yyg.com/" title="' + e.username + '" class="blue"><span class="fl"><img src="http://faceimg.1yyg.com/userface/30/' + e.userPhoto + '"><s class="transparent-png"></s></span>' + e.username + '</a><a href="' + passportUrl + '/Logout.html" title="退出">[退出]</a></div></li><li class="f-gap"><s></s></li>');
							obj.liMsgObj.attr("show", "1").show().next("li.f-gap").show()
						} else {
							if (e.code == 0) {
								obj.TopRightBox.prepend('<li type="nologin"><div class="u-menu-hd"><a href="' + passportUrl + '/login.html?forward=rego" title="登录">登录</a></div></li><li type="nologin" class="f-gap"><s></s></li><li type="nologin"><div class="u-menu-hd"><a href="' + passportUrl + '/register.html?forward=rego" title="注册">注册</a></div></li><li class="f-gap"><s></s></li>');
								obj.liMsgObj.attr("show", "-1").hide()
							}
						}
						obj.loadingMsgFun()
					})
				}
			};
			_GetUserLoginInfo();
		},
		addFavorite:function(){
			var btnFavorite = $("#btnTFavorite");
			if(btnFavorite.length > 0){
				var addFavouriteFun = function() {
					var favouriteTitle = "1元云购";
					var favouriteHost = "http://www.1yyg.com";
					try {
						window.external.addFavorite(favouriteHost, favouriteTitle)
					} catch(d) {
						try {
							window.sidebar.addPanel(favouriteTitle, favouriteHost, "")
						} catch(d) {
							alert("抱歉，您所使用的浏览器无法完成此操作。\r\n\r\n加入收藏失败，请使用Ctrl + D进行添加！")
						}
					}
				};
				btnFavorite.bind("click", function() {
					addFavouriteFun();
				});
			}
		},
		bindTopEvent:function(){
			$("#liMobile").hover(function() {
				$(this).addClass("u-arr-hover")
			},
			function() {
				$(this).removeClass("u-arr-hover")
			});
			$("#liMember").hover(function() {
				$(this).addClass("u-arr-hover")
			},
			function() {
				$(this).removeClass("u-arr-hover")
			});
			this.liMsgObj.hover(function() {
				$(this).addClass("u-arr-hover")
			},
			function() {
				$(this).removeClass("u-arr-hover")
			})
		}
	},
	Header:{
		HeadCartNumObj: $("#spHCart"),
		search: function() {
			var searchFun = function(i){
				var defaultHeadVal = "汽车";
				var defaultVal = "输入“汽车”试试";
				var cutLen = 50;
				var focusFun = function(){
					i.unbind("blur").bind("focus",blurFun);
					if(i.val() == ""){
						i.val(defaultVal).css({
							color: "#BBB",
							padding: "9px 130px 9px 5px",
							width: "105px"
						});
						i.next("span").css("zIndex", "10").show();
					}
				};
				var blurFun = function(){
					i.unbind("focus").bind("blur", g).css({
						color: "#333",
						padding: "9px 0px 9px 5px",
						width: "235px"
					});
					if (i.val() == d) {
						i.val("").next("span").css("zIndex", "0").hide()
					}
				}
				var searchLocFun = function(){
					var trimSearchVal = $.trim(i.val());
					if (trimSearchVal == defaultVal) {
						trimSearchVal = defaultHeadVal;
					}
					location.href = mainHttp + "/search/?q=" + encodeURIComponent(trimSearchVal.replace(/(\/)/g, ""))
				};
				i.focus(blurFun).keydown(function(j){
					if (13 == ((window.event) ? event.keyCode: j.keyCode)) {
						searchLocFun();
					}
				}).keyup(function() {
					var searchVal = $(this).val().trim();
					if (searchVal.length > cutLen) {
						$(this).val(searchVal.substring(0, cutLen));
					}
				}).attr("placeholder", "").css("color", "#BBB").val(defaultVal);
				$("#btnHSearch").click(function() {
					searchLocFun();
					return false
				});
			};
			var txtSearchObj = $("#txtHSearch");
			if (txtSearchObj.length > 0) {
				searchFun(txtSearchObj);
			}
		}
	},
	Menu:{
		goodsSort:function(){
			var goodSortList = $("#divSortList");
			if ($("body.home").length == 0) {
				$("#divGoodsSort").hover(function() {
					goodSortList.show();
				},
				function() {
					setTimeout(function() {
						if(!tmp){
							goodSortList.hide();
						}
					},200);
				})
			}
			var tmp = false;
			goodSortList.children("dl").each(function() {
				$(this).hover(function(c) {
					tmp = true;
					stopBubble(c);
					$(this).addClass("hover");
					if ($(this).next().length > 0) {
						$(this).append("<i></i>")
					}
				},function(c){
					tmp = false;
					$(this).removeClass("hover").children("i").remove();
				});
			});
		}
	},
	RightTool:{
		VC_CODE_EXPIRE: 1 * (1 / 24) * (5 / 60),
		SHOW_VC_CODE: "_SHOW_VC_CODE",
		RightToolObj: $("#rightTool"),
		RightCartObj: $("#rightTool").find("li.f-shopping-cart"),
		RightCartNumObj: $("#rightTool").find("li.f-shopping-cart").find("em"),
		RightClientObj: $("#rightTool").find("li.f-client"),
		RightCartMainObj: $("#divRTCartMain"),
		RightLoginObj: $("#divRTLogin"),
		RightColectObj: $("#rightTool").find(".f-pur-records"),
		RightColectMainObj: $("#divRTColect"),
		miniRightToolObj: $("#divRTool"),
		backTopObj: $("#gototop"),
		RightMiniCartNumObj: $("div.u-small-list").find("em"),
		isLoginPanelShow: false,
		isLoginPanelEventReg: false,
		isWxLoginJsLoaded: false,
		isPlaceHolderJsLoaded: false,
		isWxLoginStart: false,
		isFastLoginSubmiting: false,
		isHideCartPanelActive: true,
		isHideUserBuyPanelActive: true,
		isHideLoginPanelActive: true,
		thresholdwinWidth: 1190,
		thresholdwinHeight: 758,
		isMiniTool: !($("body").attr("rf") == "1" || $("body").attr("rf") == "2"),
		jqueryUIJsLoaded: false,
		sthMouseOver: function() {
			var obj = this;
			$(document).on("mouseenter mouseleave", "#rightTool .m-banner-list li",function(c) {
				c.stopPropagation();
				var jqObj = $(this);
				if(c.type == "mouseenter"){
					jqObj.siblings().removeClass("toolbar-hover");
					if (jqObj.hasClass("f-shopping-cart")) {
						jqObj.addClass("toolbar-hover");
						if (obj.RightCartNumObj.html() == "" || obj.RightCartNumObj.html() == "0") {
							jqObj.find("b.curr-arrow").hide()
						} else {
							jqObj.find("b.curr-arrow").show()
						}
					} else {
						if (jqObj.hasClass("f-pur-records")) {
							if (!obj.isLoginPanelShow) {
								obj.hidePanelByIndex(0)
							}
							jqObj.addClass("toolbar-hover");
							jqObj.find("cite").stop().animate({
								right: "40px"
							},
							400,
							function() {})
						} else {
							if (jqObj.hasClass("f-client")) {
								if (!obj.isLoginPanelShow) {
									obj.hidePanelByIndex(0)
								}
								jqObj.addClass("toolbar-hover");
								jqObj.find(".u-activate").stop().animate({
									width: "143px"
								},
								400,
								function() {})
							} else {
								if (bjqObj.hasClass("f-weixin")) {
									if (!obj.isLoginPanelShow) {
										obj.hidePanelByIndex(0)
									}
									jqObj.addClass("toolbar-hover");
									jqObj.find(".u-activate").stop().animate({
										width: "97px"
									},
									400,
									function() {})
								} else {
									if (jqObj.hasClass("f-customer-service") || b.hasClass("f-feedback") || b.hasClass("f-back-to")) {
										if (!obj.isLoginPanelShow) {
											obj.hidePanelByIndex(0)
										}
										if (jqObj.hasClass("f-back-to")) {
											if ($(window).scrollTop() > 0) {
												jqObj.addClass("toolbar-hover")
											}
										} else {
											jqObj.addClass("toolbar-hover")
										}
										jqObj.find("cite").stop().animate({
											right: "40px"
										},
										400,
										function() {});
										if (jqObj.hasClass("f-customer-service")) {
//											if (YG.Bottom.Comm.isInitQQEvent) {
//												YG.Bottom.Comm.loadQQJS()
//											} else {
//												Base.getScript("http://wpa.b.qq.com/cgi/wpa.php",
//												function() {
//													YG.Bottom.Comm.isInitQQEvent = true;
//													YG.Bottom.Comm.loadQQJS()
//												})
//											}
										}
									}
								}
							}
						}
					}
				}else{
					if (jqObj.hasClass("f-shopping-cart")) {
						if (obj.RightCartMainObj.attr("isShowed") == "1") {
							return
						}
						jqObj.removeClass("toolbar-hover")
					} else {
						if (jqObj.hasClass("f-client")) {
							jqObj.find(".u-activate").stop().animate({
								width: "0px"
							}, 400, function() {
								jqObj.removeClass("toolbar-hover")
							})
						} else {
							if (jqObj.hasClass("f-weixin")) {
								jqObj.find(".u-activate").stop().animate({
									width: "0px"
								}, 400, function() {
									jqObj.removeClass("toolbar-hover")
								})
							} else {
								if (jqObj.hasClass("f-pur-records") || jqObj.hasClass("f-customer-service") || jqObj.hasClass("f-feedback") || jqObj.hasClass("f-back-to")) {
									jqObj.find("cite").stop().animate({
										right: "-41px"
									}, 400, function() {
										jqObj.removeClass("toolbar-hover")
									})
								}
							}
						}
					}
				}
			});
			$(document).on("mouseenter mouseleave", "#divRTool li", function(c) {
                c.stopPropagation();
                var liObj = $(this);
                if (c.type == "mouseenter") {
                    liObj.addClass("cart-hover");
                    if (liObj.hasClass("f-customer-service")) {
//                      if (yg.Bottom.Comm.isInitQQEvent) {
//                          YG.Bottom.Comm.loadQQJS()
//                      } else {
//                          Base.getScript("http://wpa.b.qq.com/cgi/wpa.php", function() {
//                              YG.Bottom.Comm.isInitQQEvent = true;
//                              YG.Bottom.Comm.loadQQJS()
//                          })
//                      }
                    }
                } else {
                    liObj.removeClass("cart-hover");
                }
            })
		},
		initFloatTools:function(){
			var obj = this;
			if (obj.RightToolObj.length > 0 || obj.miniRightToolObj.length > 0) {
				var winWidth = $(window).width();
				var winHeight = $(window).height();
				var animaFade = function() {
					if ($(window).scrollTop() > 0) {
						obj.miniRightToolObj.fadeIn("slow");
					} else {
						obj.miniRightToolObj.fadeOut("slow");
					}
				};
				var miniToolFun = function() {
					if(obj.isMiniTool) {
						animaFade();
						$(document).on("click", "li.f-back-to", function() {
							$("body, html").animate({
								scrollTop: 0
							}, 100);
							return false
						});
					} else {
						obj.switchRightTool(true);
						obj.backTopObj.on("click",function() {
							$("body, html").animate({
								scrollTop: 0
							},
							100);
							return false;
						});
					}
				};
				$(window).scroll(function() {
					if (obj.isMiniTool) {
						animaFade()
					} else {
						if ($(window).scrollTop() > 0) {
							obj.backTopObj.show("slow")
						} else {
							obj.backTopObj.parent().parent().removeClass("toolbar-hover");
							obj.backTopObj.hide("slow")
						}
					}
				});
				miniToolFun();
			}
		},
		showCartLoadding: function() {
			var winHeight = $(window).height() - 37 - 70;
			var cartLoadDiv = $("#divCartMainLoadingDiv");
			cartLoadDiv.css({
				"margin-top": (winHeight - cartLoadDiv.height()) / 2 + "px"
			}).show()
		},
		showUserBuyLoadding: function() {
			var winHeight = $(window).height() - 37;
			var collectDiv = $("#divRTColectLoadingDiv");
			collectDiv.css({
				"margin-top": (winHeight - collectDiv.height()) / 2 + "px"
			}).show()
		},
		showUserBuyErrorMsg: function() {
			var winHeight = $(window).height() - 37;
			var colectErrDiv = $("#divRTColectErrorDiv");
			var errDivHeight = colectErrDiv.height();
			colectErrDiv.css({
				"margin-top": (winHeight - errDivHeight) / 2 + "px"
			}).show()
		},
		showMiniLoginErrorMsg: function(a, b) {
			if (a != null) {
				a.parent().parent().addClass("focus")
			}
			this.RightLoginObj.find("#miniLoginErrorMsgLi").html('<s class="z-clump-icon"></s>' + b);
			this.isFastLoginSubmiting = false
		},
		hideMiniLoginErrorMsg: function() {
			this.RightLoginObj.find("#miniLoginErrorMsgLi").html("");
		},
		showMiniLogin: function(b) {
			var obj = this;
			obj.isLoginPanelShow = b;
			if (b) {
				var cartLoginName = d.RightLoginObj.find(".cartLogin-con").find("#username");
				var cartLoginPass = d.RightLoginObj.find(".cartLogin-con").find("#password");
				if (!obj.isPlaceHolderJsLoaded) {
					Base.getScript("http://skin.1yyg.com/Plugins/jquery.enplaceholder.js?date=160607", function() {
						obj.isPlaceHolderJsLoaded = true;
						cartLoginName.placeholder({
							isUseSpan: true
						});
						cartLoginPass.placeholder({
							isUseSpan: true
						});
					})
				}
				if (!obj.jqueryUIJsLoaded) {
					Base.getScript("http://skin.1yyg.com/Plugins/jquery-ui.js?date=160701", function() {
						obj.jqueryUIJsLoaded = true;
						obj.vcCodeEvtReg()
					})
				} else {
					obj.vcCodeEvtReg()
				}
				var cookieShowVcCode = $.cookie(d.SHOW_VC_CODE);
				if (cookieShowVcCode == "1") {
					obj.showVcCode()
				} else {
					obj.hideVcCode()
				}
				if (!obj.isLoginPanelEventReg) {
					obj.minLoginEventReg()
				}
				var cookieUname = $.cookie("_uName");
				if (cookieUname != null && (yg.Bottom.Util.ckMobile(cookieUname) || yg.Bottom.Util.ckEmail(cookieUname))) {
					e.val(cookieUname);
				}
				if (obj.isWxLoginJsLoaded) {
					obj.RightLoginObj.children(".cartLogin-title,.cartLogin-con").show();
					obj.RightLoginObj.children(".wxLogin-con").hide()
				}
				obj.RightLoginObj.css({
					right: "-240px",
					display: "block"
				}).animate({
					right: "40px"
				}, "slow", function() {
					if (cartLoginName.val() == "") {
						cartLoginName.focus();
					} else {
						if (cartLoginPass.val() == "") {
							cartLoginPass.focus();
						}
					}
				})
			} else {
				obj.RightLoginObj.animate({
					right: "-240px"
				}, "slow", function() {})
			}
		},
		loginSucCallFun: function() {
			window.location.reload()
		},
		submitMiniLogin: function() {
			var obj = this;
			if (obj.isFastLoginSubmiting) {
				return
			}
			obj.isFastLoginSubmiting = true;
			var miniLoginBtn = obj.RightLoginObj.find("#miniLoginBtn");
			var cartLoginUname = obj.RightLoginObj.find(".cartLogin-con").find("#username");
			var cartLoginNameVal = cartLoginUname.val();
			var cartLoginPass = obj.RightLoginObj.find(".cartLogin-con").find("#password");
			var cartLoginPassVal = cartLoginPass.val();
			if (yg.Bottom.Util.ckMobile(g) === false && yg.Bottom.Util.ckEmail(g) === false) {
				obj.showMiniLoginErrorMsg(cartLoginUname, "请输入正确的手机号或邮箱地址");
				return false
			}
			if (cartLoginPassVal == "") {
				obj.showMiniLoginErrorMsg(cartLoginPass, "请输入登录密码");
				return false
			} else {
				if (!yg.Bottom.Util.ckPasswd(cartLoginPassVal)) {
					obj.showMiniLoginErrorMsg(cartLoginPass, "登录密码为6-20长度的字符");
					cartLoginPass.val("");
					return false
				}
			}
			if (obj.isVcCodeValidated === false) {
				obj.showMiniLoginErrorMsg(null, "请按住滑块，拖动到最右边");
				return
			}
			var urlParam = "name=" + cartLoginNameVal + "&pwd=" + yg.Bottom.Util.escape2(cartLoginPassVal) + "&auth=" + obj.vcCodeAuthStr;
			miniLoginBtn.addClass("letter").val("正在登录...");
			getYYData("https://passport.1yyg.com", "userlogin", urlParam, function(h) {
				var state = h.state;
				if (state != 0) {
					miniLoginBtn.removeClass("letter").val("登录")
				}
				if (i == 0) {
					obj.loginSucCallFun();
				} else {
					if (state == 1 && (h.num == -1 || h.num == -6 || h.num == -7)) {
						if (h.str == "1") {
							c.showVcCode();
							c.resetVcCode();
							if (h.num == -1) {
								$.cookie(obj.SHOW_VC_CODE, 1, {
									expires: c.VC_CODE_EXPIRE,
									domain: "1yyg.com"
								});
								cartLoginPass.val("").focus();
								obj.showMiniLoginErrorMsg(cartLoginPass, "登录密码错误，请重新输入")
							} else {
								if (h.num == -6) {
									obj.showMiniLoginErrorMsg(null, "验证码错误，请重新验证！")
								} else {
									if (h.num == -7) {
										obj.showMiniLoginErrorMsg(null, "请拖动滑块完成验证！")
									}
								}
							}
						} else {
							cartLoginPass.val("").focus();
							obj.showMiniLoginErrorMsg(cartLoginPass, "登录密码错误，请重新输入")
						}
					} else {
						if (i == 1 && h.num == -2) {
							obj.showMiniLoginErrorMsg(cartLoginUname, "此账号不存在，请重新输入")
						} else {
							if (i == 1 && h.num == -3) {
								obj.showMiniLoginErrorMsg(cartLoginUname, "此账号已被冻结，请与客服联系！")
							} else {
								if (i == 1 && h.num == -4) {
									obj.showMiniLoginErrorMsg(cartLoginUname, "此账号未激活，请与客服联系！")
								} else {
									if (i == 1 && h.num == -5) {
										obj.showMiniLoginErrorMsg(null, "密码被系统锁定！")
									} else {
										if (i == 3 && h.num == 1) {
											obj.showMiniLoginErrorMsg(null, "失败次数超限，被冻结5分钟！")
										} else {
											if (i == 3 && h.num == 2) {
												obj.showMiniLoginErrorMsg(null, "失败次数超限，IP被冻结！")
											}
										}
									}
								}
							}
						}
					}
				}
				obj.isFastLoginSubmiting = false
			})
		},
		switchMiniLogin: function() {
			var miniLoginObj = this;
			var rightLoginObj = miniLoginObj.RightLoginObj;
			var rightTitle = rightLoginObj.children(".cartLogin-title,.cartLogin-con");
			var wxLoginCon = rightLoginObj.children(".wxLogin-con");
			rightLoginObj.on("click", ".z-clump-icon.wx-login", function() {
				rightTitle.hide();
				wxLoginCon.show()
			});
			rightLoginObj.on("click", ".wxLogin-con a", function() {
				rightTitle.show();
				wxLoginCon.hide()
			});
			$("#btnQQLogin").click(function() {
				$.cookie("qFromUrl", $("#hidFromUrl").val());
				window.open("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100511748&redirect_uri=" + escape("https://passport.1yyg.com/qcback.html") + "&state=qq&scope=all");
				return false
			});
			rightLoginObj.on("click", ".delete-close", function() {
				miniLoginObj.showMiniLogin(false);
			});
			$("#btnWXLogin").click(function() {
				$.cookie("qFromUrl", escape("http://www.1yyg.com"));
				if (_IsIE && _IeVersion == 6) {
					window.open("https://open.weixin.qq.com/connect/qrconnect?appid=wxe61d43f2e02a5b10&redirect_uri=" + escape("http://www.1yyg.com") + "&response_type=code&scope=snsapi_login&state=wx#wechat_redirect")
				} else {
					var wxLoginFun = function() {
						if ($("#wxLoginImgContainer").children().length == 0) {
							var f = new WxLogin({
								id: "wxLoginImgContainer",
								appid: "wxe61d43f2e02a5b10",
								scope: "snsapi_login",
								redirect_uri: escape("https://passport.1yyg.com/qcback.html"),
								state: "wx",
								style: "",
								href: "https://skin.1yyg.com/css/minilayout.css?date=0617"
							})
						}
						if (obj.isWxLoginStart) {
							return
						}
						obj.isWxLoginStart = true
					};
					if (obj.isWxLoginJsLoaded) {
						wxLoginFun()
					} else {
						Base.getScript("https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js",
						function() {
							wxLoginFun();
							obj.isWxLoginJsLoaded = true;
						})
					}
				}
			})
		},
		minLoginEventReg:function(){
			var obj = this;
			var userName = this.RightLoginObj.find("#username");
			var pass = this.RightLoginObj.find("#password");
			userName.on("focus", function(d) {
				stopBubble(d);
				$(this).parent().parent().addClass("focus");
			}).on("blur", function(d) {
				stopBubble(d);
				$(this).parent().parent().removeClass("focus")
			}).on("keydown", function(d) {
				stopBubble(d);
				a.hideMiniLoginErrorMsg()
			});
			pass.on("focus", function(d) {
				stopBubble(d);
				$(this).parent().parent().addClass("focus")
			}).on("blur", function(d) {
				stopBubble(d);
				$(this).parent().parent().removeClass("focus")
			}).on("keydown", function(d) {
				stopBubble(d);
				obj.hideMiniLoginErrorMsg()
			});
			this.RightLoginObj.on("click", "#miniLoginBtn", function(d) {
				stopBubble(d);
				obj.submitMiniLogin()
			});
			$("body").click(function() {
				obj.isHideCartPanelActive = true;
				obj.hidePanelByIndex(0)
			}).find("#rightTool").click(function(d) {
				stopBubble(d)
			});
			obj.isLoginPanelEventReg = true
		},
		isVcCodeValidated: true,
		isAdvancedVcCode: false,
		isDragEnabled: true,
		canvasWidth: 0,
		canvasHeight: 0,
		vcCodeAuthStr: "",
		showVcCode: function() {
			$("#divRTLogin").height(284);
			$("#vcCodeContainerLi").show()
		},
		hideVcCode: function() {
			$("#vcCodeContainerLi").hide();
			$("#divRTLogin").height(229)
		},
		getVcCode: function() {
			var obj = this;
			obj.isVcCodeValidated = false;
			var divRtLogin = $("#divRTLogin");
			var userName = $("#username", divRtLogin).val();
			divRtLogin.find("#canvasContainer").parent().show();
			obj.$vcCanvas = $("#vcCanvas");
			obj.$vcCanvas.css({
				width: b.canvasWidth + "px"
			});
			obj.$dragBtn = $("#dragBtn");
			obj.$dragBtnLeft = $("#dragBtnLeft");
			obj.$dragBtnContainer = $("#dragBtnContainer");
			obj.$canvasContainer = $("#canvasContainer");
			obj.$vcCanvas.hide();
			getYYData("https://passport.1yyg.com", "getVcChar", "key=" + userName, function(d) {
				if (d.state == 1) {
					obj.resetVcCode();
					obj.showMiniLoginErrorMsg(null, "获取验证码太频繁，请稍后再试");
					return false
				} else {
					if (d.state == "0") {
						var str = d.str;
						$("#selectedChar").text(str);
						obj.$dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(1)").hide();
						obj.$dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(0),a").show();
						obj.$canvasContainer.parent().show();
						obj.$canvasContainer.css("height", b.canvasHeight + "px");
						obj.$vcCanvas.attr("src", "https://passport.1yyg.com/api/GetVcImg.html?" + obj.getVcImgParam(e)).show()
					}
				}
			})
		},
		resetVcCode: function() {
			var obj = this;
			obj.$dragBtn = $("#dragBtn");
			obj.$dragBtnLeft = $("#dragBtnLeft");
			obj.$dragBtnContainer = $("#dragBtnContainer");
			obj.$canvasContainer = $("#canvasContainer");
			obj.$dragBtnLeft.css("width", "0");
			obj.$dragBtn.animate({
				left: "0"
			});
			obj.$dragBtnContainer.children(".vc-slide-text").show();
			obj.$dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(1)").hide();
			obj.$dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(0),a").hide();
			obj.$dragBtn.children("i").removeClass("ready-status vali-status wrong-status right-status").addClass("ready-status");
			obj.$canvasContainer.parent().hide();
			obj.isDragEnabled = true;
			obj.isVcCodeValidated = false
		},
		getVcImgParam: function(b) {
			var obj = this;
			var imgParam = "width=" + obj.canvasWidth + "&height=" + c.canvasHeight + "&selectedChar=" + b;
			return imgParam
		},
		vcCodeEvtReg: function() {
			var obj = this;
			var divRtLogin = $("#divRTLogin");
			var dragBtn = $("#dragBtn", divRtLogin);
			var dragBtnLeft = $("#dragBtnLeft", divRtLogin);
			var dragBtnContainer = $("#dragBtnContainer", divRtLogin);
			var canvasContainer = $("#canvasContainer", divRtLogin);
			var vcCanvas = $("#vcCanvas", divRtLogin);
			obj.canvasWidth = 223;
			obj.canvasHeight = 103;
			var outerWidth = h.outerWidth();
			dragBtn.draggable({
				containment: "#dragBtnContainer",
				start: function() {
					if (obj.isDragEnabled === false) {
						return false
					}
					var cartLoginUName = obj.RightLoginObj.find(".cartLogin-con").find("#username");
					var cartLoginUNameVal = cartLoginUName.val();
					if (yg.Bottom.Util.ckMobile(cartLoginUNameVal) === false && yg.Bottom.Util.ckEmail(cartLoginUNameVal) === false) {
						obj.showMiniLoginErrorMsg(cartLoginUName, "请输入正确的手机号或邮箱地址");
						return false
					}
					obj.hideMiniLoginErrorMsg()
				},
				drag: function(l, m) {
					var widthTmp = m.position.left;
					dragBtnLeft.css("width", widthTmp + "px")
				},
				stop: function(l, n) {
					var widthTmp = n.position.left;
					var outerWidthTmp = dragBtnContainer.outerWidth();
					if (widthTmp < outerWidthTmp - outerWidth) {
						dragBtn.animate({
							left: "0"
						});
						dragBtnLeft.animate({
							width: "0"
						})
					} else {
						var rightLoginUserName = obj.RightLoginObj.find("#username");
						var rightLoginUserNameVal = rightLoginUserName.val();
						getYYData("https://passport.1yyg.com", "getVcChar", "key=" + rightLoginUserNameVal, function(q) {
							if (q.state == 1) {
								obj.resetVcCode();
								obj.showMiniLoginErrorMsg(null, "获取验证码太频繁，请稍后再试");
								return false
							} else {
								if (q.state == 0) {
									var str = q.str;
									$("#selectedChar").text(str);
									dragBtnContainer.children(".vc-slide-text").hide();
									dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(1)").hide();
									dragBtnContainer.children(".vc-slideBtnLeft").find("span:eq(0),a").show();
									canvasContainer.parent().show();
									canvasContainer.css("height", f.canvasHeight + "px");
									dragBtnLeft.css("width", widthTmp + "px");
									dragBtn.css({
										"float": "left",
										left: widthTmp + "px"
									});
									dragBtn.children("i").removeClass("ready-status,vali-status,wrong-status,right-status").addClass("vali-status");
									vcCanvas.attr("src", "https://passport.1yyg.com/api/GetVcImg.html?" + f.getVcImgParam(r));
									obj.isDragEnabled = false
								}
							}
						})
					}
				}
			});
			var refreshVcCode = $("#refreshVcCode");
			var tmp = null;
			refreshVcCode.click(function() {
				if (tmp != null) {
					console.log("too fast！！");
					return
				}
				tmp = setTimeout(function() {
					b = null
				}, 200);
				dragBtn.children("i").attr("class", "passport-icon ready-status vali-status");
				obj.getVcCode()
			});
			vcCanvas.click(function(m) {
				var vcCanvasLeft = vcCanvas.offset().left;
				var vcCanvasTop = d.offset().top;
				var residueWidth = m.pageX - vcCanvasLeft;
				var residueHeight = m.pageY - vcCanvasTop;
				getYYData("https://passport.1yyg.com", "VcCompare", "x=" + residueWidth + "&y=" + residueHeight, function(p) {
					if (p.state == 1) {
						if (p.num == 1) {
							dragBtn.children("i").attr("class", "passport-icon wrong-status");
							obj.getVcCode();
							return false
						} else {
							obj.resetVcCode();
							obj.showMiniLoginErrorMsg(null, "获取验证码太频繁，请稍后再试");
							return false
						}
					} else {
						if (p.state == 0) {
							obj.isVcCodeValidated = true;
							obj.isDragEnabled = false;
							dragBtnLeft.find("span:eq(0),a").hide();
							dragBtnLeft.find("span:eq(1)").show();
							dragBtn.children("i").attr("class", "passport-icon right-status");
							canvasContainer.parent().hide();
							obj.vcCodeAuthStr = p.str
						}
					}
				})
			})
		},
		showPanelByIndex: function(b) {
			var obj = this;
			if (b == 0) {
				obj.RightCartMainObj.css({
					display: "block",
					height: "100%"
				}).animate({
					right: "40px"
				}, 400, function() {
					obj.RightCartMainObj.attr("isShowed", "1");
					obj.RightCartObj.addClass("toolbar-hover")
				})
			}
		},
		hidePanelByIndex: function(b) {
			var obj = this;
			if (b == 0) {
				if (obj.isLoginPanelShow) {
					obj.showMiniLogin(false)
				}
				obj.RightCartMainObj.attr("isShowed", "0");
				obj.RightCartMainObj.stop().animate({
					right: "-240px"
				}, 400, function() {
					if (obj.isHideCartPanelActive) {
						obj.RightCartObj.removeClass("toolbar-hover");
						if (obj.RightCartNumObj.html() == "" || obj.RightCartNumObj.html() == "0") {
							obj.RightCartObj.find("b.curr-arrow").hide()
						}
					}
				})
			}
		},
		rightToolEvent: function() {
			var obj = this;
			var cartPanlTimeOut = null;
			var cartMainTimeOut = null;
			var isLoad = false;
			obj.RightCartObj.on("mouseenter", function() {
				if (cartPanlTimeOut != null) {
					clearTimeout(cartPanlTimeOut)
				}
				if (cartMainTimeOut != null) {
					clearTimeout(cartMainTimeOut)
				}
				var showRightCartMainFun = function() {
					if (obj.RightCartMainObj.attr("isShowed") == "1") {
						return;
					}
					var rightCartNumHtml = obj.RightCartNumObj.html();
					if (rightCartNumHtml == "" || rightCartNumHtml == "0") {
						return;
					}
					obj.showCartLoadding();
					obj.RightCartMainObj.find(".cartEmpty").hide();
					obj.showPanelByIndex(0);
					if (!isLoad) {
						Base.getScript("http://skin.1yyg.com/js/cartTool.js?date=160725",function() {
							isLoad = true;
							yg.miniCartTool.init(obj.RightCartMainObj);
						})
					} else {
						yg.miniCartTool.init(obj.RightCartMainObj)
					}
				};
				var isHideCartFun = function() {
					obj.isHideCartPanelActive = false;
					showRightCartMainFun()
				};
				if ($(window).width() < obj.thresholdwinWidth) {
					obj.RightToolObj.stop().animate({
						right: 0
					}, 400, function() {
						isHideCartFun();
					})
				} else {
					isHideCartFun();
				}
			}).on("mouseleave", function() {
				if (obj.isLoginPanelShow) {
					return
				}
				obj.isHideCartPanelActive = true;
				if (obj.RightCartMainObj.attr("isShowed") == "1") {
					if (cartPanlTimeOut != null) {
						clearTimeout(cartPanlTimeOut)
					}
					cartPanlTimeOut = setTimeout(function() {
						obj.hidePanelByIndex(0)
					}, 1000)
				}
			});
			obj.RightCartMainObj.on("mouseenter", function() {
				obj.isHideCartPanelActive = false;
				if (cartPanlTimeOut != null) {
					clearTimeout(cartPanlTimeOut);
				}
				if (cartMainTimeOut != null) {
					clearTimeout(cartMainTimeOut);
				}
			}).on("mouseleave", function() {
				if (obj.isLoginPanelShow) {
					return
				}
				obj.isHideCartPanelActive = true;
				if (obj.RightCartMainObj.attr("isShowed") == "1") {
					if (cartPanlTimeOut != null) {
						clearTimeout(cartPanlTimeOut);
					}
					cartPanlTimeOut = setTimeout(function() {
						obj.hidePanelByIndex(0)
					}, 1000)
				}
			});
			obj.RightToolObj.on("mouseenter", function() {
				if (cartMainTimeOut != null) {
					clearTimeout(cartMainTimeOut);
				}
			}).on("mouseleave", function() {
				if ($(window).width() < obj.thresholdwinWidth) {
					if (cartMainTimeOut != null) {
						clearTimeout(cartMainTimeOut);
					}
					cartMainTimeOut = setTimeout(function() {
						obj.switchRightTool(false)
					}, 1000);
				}
			});
			obj.RightLoginObj.on("mouseenter", function() {
				if (cartPanlTimeOut != null) {
					clearTimeout(cartPanlTimeOut);
				}
				if (cartMainTimeOut != null) {
					clearTimeout(cartMainTimeOut);
				}
			}).on("mouseleave", function() {
				if (obj.isLoginPanelShow) {
					return
				}
				obj.isHideCartPanelActive = true;
				if (obj.RightCartMainObj.attr("isShowed") == "1") {
					if (cartPanlTimeOut != null) {
						clearTimeout(cartPanlTimeOut);
					}
					cartPanlTimeOut = setTimeout(function() {
						e.hidePanelByIndex(0);
					}, 1000)
				}
			})
		},
		switchRightTool: function(e) {
			var obj = this;
			if (obj.isMiniTool) {
				return;
			}
			var winWidth = $(window).width();
			var winHeight = $(window).height() < 550 ? 550 : $(window).height();
			obj.RightToolObj.children("div.g-status-standard").height(winHeight);
			if (winWidth < obj.thresholdwinWidth) {
				obj.RightCartObj.attr("style", "position:fixed;right:0;background:#5c5550;");
				obj.RightClientObj.removeClass("toolbar-hover");
				obj.isLoginPanelShow = false;
				obj.RightLoginObj.hide();
				obj.RightCartMainObj.attr("isShowed", "0").css({
					right: "-240px"
				});
				obj.RightCartObj.removeClass("toolbar-hover");
				obj.RightToolObj.css("right", "0").stop().animate({
					right: -40
				}, 500).show();
			} else {
				obj.RightCartObj.removeAttr("style");
				obj.RightToolObj.show().stop().animate({
					right: 0
				}, 1000, function() {});
				if (e) {
					if (winWidth > obj.thresholdwinWidth) {
						if ($.cookie("_AppDownLoadShow") != "1") {
							$.cookie("_AppDownLoadShow", "1", {
								domain: "yyyg.com"
							});
							obj.RightClientObj.addClass("toolbar-hover").find(".u-activate").stop().animate({
								width: "143px"
							}, 400, function() {});
							setTimeout(function() {
								obj.RightClientObj.find(".u-activate").stop().animate({
									width: "0px"
								}, 400, function() {
									obj.RightClientObj.removeClass("toolbar-hover");
								})
							}, 10000);
						}
					} else {
						obj.RightClientObj.find(".u-activate").stop().animate({
							width: "0px"
						}, 400, function() {
							obj.RightClientObj.removeClass("toolbar-hover");
						})
					}
				}
				if ($(window).scrollTop() > 0) {
					obj.backTopObj.show();
				} else {
					obj.backTopObj.hide();
				}
			}
			var residueHeiht = winHeight - obj.thresholdwinHeight;
			if (residueHeiht < 0) {
				obj.RightToolObj.find(".u-sentence").height(200 + residueHeiht).children("span").css("background-image", "none")
			} else {
				obj.RightToolObj.find(".u-sentence").height(200).children("span").css("background-image", "url(http://skin.1yyg.com/images/sentence.gif?v=0527)")
			}
		}
	},
	BindEvents: function() {
		var comm = yg.Bottom.common;
		var top = yg.Bottom.Top;
		var header = yg.Bottom.Header;
		var menu = yg.Bottom.Menu;
		var rightTool = yg.Bottom.RightTool;
		comm.setSrcFun();
		comm.broswerProcess();
//		comm.getUserTotalBuyCount();
//		comm.getUserCartNum();
//		comm.loadQQService();
//		comm.customerService();
		comm.disablePassword();
//		comm.serverTimeProcess();
		top.addFavorite();
//		top.loginInfoProcess();
		top.bindTopEvent();
		header.search();
		menu.goodsSort();
		rightTool.initFloatTools();
		rightTool.sthMouseOver();
		rightTool.switchMiniLogin();
		rightTool.rightToolEvent();
		loadImgFun()
	}
};
$(function() {
	Base.getScript("../js/common.js",function(){
		Base.getScript("../js/cart_common.js",yg.Bottom.BindEvents);
	});
});