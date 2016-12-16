(function($){
	function bannerSlide(obj,interObj){
		var liObj = obj.find("#slideImg li"),
			handleBoxObj = obj.find("#handle_box"),
			ctrlPrevObj = obj.find("#ctrl_prev"),
			ctrlNextObj = obj.find("#ctrl_next"),
			tmp = "",
			handleLiObj,
			liObjLen = liObj.length,
			slideIndex = -1,
			intervalObj = null;
		var intervalPro = {
			intervalTime: 4000,
			duration: 500
		};
		
		if(liObjLen == 1) {
			return !0
		}
		
		$.each(intervalPro, function(u, v) {
			tmp += '<li><a href="javascript:;"></a></li>';
		});
		handleBoxObj.append(tmp);
		handleLiObj = handleBoxObj.find("li");
		
		function intervalSet() {
			if(intervalObj) {
				clearInterval(intervalObj);
			}
			intervalObj = setInterval(function() {
				leftSlide();
			},extendInterval.intervalTime);
		}
		
		function slideAnima(u) {
			var active = liObj.filter(".slide-active");
			liObj.stop(true, true);
			liObj.eq(u).animate({
				opacity: 1
			}).css("z-index", "1").siblings().animate({
				opacity: 0
			}).css("z-index", "0");
			handleLiObj && handleLiObj.removeClass("hover").eq(u).addClass("hover");
		}
		
		function rightSlide() {
			slideIndex--;
			slideIndex = slideIndex < 0 ? liObjLen - 1 : slideIndex;
			slideAnima(slideIndex);
		}
	
		function leftSlide() {
			slideIndex++;
			slideIndex = slideIndex > liObjLen - 1 ? 0 : slideIndex;
			slideAnima(slideIndex);
		}
		
		$("#handle_box li").on("mouseenter",function() {
			if($(this).hasClass("hover")) {
				return;
			}
			var index = $(this).index();
			n = index;
			slideAnima(index);
		})
		
		obj.on("mouseleave", function(u) {
			intervalSet();
			ctrlPrevObj.hide();
			ctrlNextObj.hide();
		}).on("mouseleave",function(u){
			intervalSet();
			ctrlPrevObj.hide();
			ctrlNextObj.hide();
		});
		leftSlide();
		intervalSet();
	}
	$.fn.showSlider = function(interObj){
		return this.each(function(param1,param2){
			return bannerSlide($(this),interObj),!0;
		});
	}
}(jQuery));