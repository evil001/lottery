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
	
});
