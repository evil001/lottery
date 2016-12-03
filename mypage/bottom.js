var yg = yg || {};
var mainHttp = "http://www.yyyg.com";
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
				getYYData(host,"getServerTime","time="+showTimeHtml,function(result){
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
			var isMemerber = a.indexOf("member.1yyg.com") > -1 && a.indexOf("referauth.do") == -1 && a.indexOf("referrals.do") == -1 ? true: false;
			var isUyyyg = a.indexOf("u.yyyg.com") > -1 ? true: false;
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
				if (!b) {
					$("#liCollect").addClass("f-collect")
				}
			}
			_GetUserLoginInfo = function() {
				if (c.TopRightBox.length > 0) {
					GetJPData(apiUrl, "logininfo", "",
					function(e) {
						c.TopRightBox.children('li[type="nologin"]').remove();
						if (e.code == 1) {
							c.TopRightBox.prepend('<li><div class="u-menu-hd u-menu-login"><a href="http://member.1yyg.com/" title="' + e.username + '" class="blue"><span class="fl"><img src="http://faceimg.1yyg.com/userface/30/' + e.userPhoto + '"><s class="transparent-png"></s></span>' + e.username + '</a><a href="' + passportUrl + '/Logout.html" title="退出">[退出]</a></div></li><li class="f-gap"><s></s></li>');
							c.liMsgObj.attr("show", "1").show().next("li.f-gap").show()
						} else {
							if (e.code == 0) {
								c.TopRightBox.prepend('<li type="nologin"><div class="u-menu-hd"><a href="' + passportUrl + '/login.html?forward=rego" title="登录">登录</a></div></li><li type="nologin" class="f-gap"><s></s></li><li type="nologin"><div class="u-menu-hd"><a href="' + passportUrl + '/register.html?forward=rego" title="注册">注册</a></div></li><li class="f-gap"><s></s></li>');
								c.liMsgObj.attr("show", "-1").hide()
							}
						}
						c.loadingMsgFun()
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
								b.removeClass("toolbar-hover")
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
					if (obj.isMiniTool) {
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
			GetJPData("https://passport.1yyg.com", "userlogin", urlParam, function(h) {
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
								a.val("").focus();
								c.showMiniLoginErrorMsg(a, "登录密码错误，请重新输入")
							} else {
								if (h.num == -6) {
									c.showMiniLoginErrorMsg(null, "验证码错误，请重新验证！")
								} else {
									if (h.num == -7) {
										c.showMiniLoginErrorMsg(null, "请拖动滑块完成验证！")
									}
								}
							}
						} else {
							a.val("").focus();
							c.showMiniLoginErrorMsg(a, "登录密码错误，请重新输入")
						}
					} else {
						if (i == 1 && h.num == -2) {
							c.showMiniLoginErrorMsg(e, "此账号不存在，请重新输入")
						} else {
							if (i == 1 && h.num == -3) {
								c.showMiniLoginErrorMsg(e, "此账号已被冻结，请与客服联系！")
							} else {
								if (i == 1 && h.num == -4) {
									c.showMiniLoginErrorMsg(e, "此账号未激活，请与客服联系！")
								} else {
									if (i == 1 && h.num == -5) {
										c.showMiniLoginErrorMsg(null, "密码被系统锁定！")
									} else {
										if (i == 3 && h.num == 1) {
											c.showMiniLoginErrorMsg(null, "失败次数超限，被冻结5分钟！")
										} else {
											if (i == 3 && h.num == 2) {
												c.showMiniLoginErrorMsg(null, "失败次数超限，IP被冻结！")
											}
										}
									}
								}
							}
						}
					}
				}
				c.isFastLoginSubmiting = false
			})
		},
	}
}
