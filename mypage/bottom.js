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
			var reg = ^1\d{10}$/;
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
	}
}
