$(function(){
	var slideImg = $("#slideImg li");
	var slideLen = slideImg.length;
	var slideLiObj = $("#handle_box").find('li');
	var slideIndex = -1;
	var slideInterval = null;
	var guideIsAnima = false;
	var guideDivObj = $("#div_guide");
	var guideLiObj = $("#ul_guide").children("li");
	var guidePre = $("#guide_pre");
	var guideNext = $("#guide_next");
	var guideTmp = 0;
	var guideNum = 0;
	var guideInterval = null;
	var intervalObj = {
		intervalTime: 4000,
		duration: 500
	}
	
	$("#liMember").hover(
		function(){
			$(this).addClass("u-arr-hover");
		},function(){
			$(this).removeClass("u-arr-hover");
		}
	);
	
	$("#liMobile").hover(
		function(){
			$(this).addClass("u-arr-hover");
		},function(){
			$(this).removeClass("u-arr-hover");
		}
	);
	
	if(slideLen == 1){
		return !0;
	}
	
	function slideAnima(slideLen){
		var filterLi = slideImg.filter(".slide-active");
			slideImg.stop(true, true);
			slideImg.eq(slideLen).animate({
				opacity: 1
			}).css("z-index", "1").siblings().animate({
				opacity: 0
			}).css("z-index", "0");
			slideLiObj && slideLiObj.removeClass("hover").eq(slideLen).addClass("hover");
	}
	
	$("#ctrl_prev").click(function(){
		slideLeft();
	});
	
	$("#ctrl_next").on('click',function(){
		slideRight();
	});
	
	$("#div_slide").on('mouseenter',function(){
		if(slideInterval){
			clearInterval(slideInterval);
		}
		$("#ctrl_prev").show();
		$("#ctrl_next").show();	
	}).on('mouseleave',function(){
		slideIsInterval();
		$("#ctrl_prev").hide();
		$("#ctrl_next").hide();
	});
	
	$("#handle_box li").on('mouseenter',function(){
		if($(this).hasClass('hover')){
			return;
		}
		var index = $(this).index();
		slideIndex = index;
		slideAnima(slideIndex);
	});
	
	function slideLeft(){
		slideIndex--;
		slideIndex = slideIndex < 0 ?slideLen - 1 :slideIndex;
		slideAnima(slideIndex);
	}
	
	function slideRight(){
		slideIndex++;
		slideIndex = slideIndex > slideLen - 1 ? 0 :slideIndex;
		slideAnima(slideIndex);
	}
	
	function slideIsInterval(){
		if(slideInterval){
			clearInterval(slideInterval);
		}
		slideInterval = setInterval(function(){
			slideRight();
		},intervalObj.intervalTime);
	}
	slideRight();
	slideIsInterval();
	
	var guideShowFun = function(){
		guideDivObj.show();
		if(guideLiObj.length <=1){
			guidePre.hide();
			guideNext.hide();
		}else{
			if(guideTmp <=0){
				guideTmp = 0;
				guidePre.hide();
				guideNext.show();
			}else{
				if(guideTmp >= (guideLiObj.length - 1)){
					guideTmp = guideLiObj.length -1 ;
					guidePre.show();
					guideNext.hide();
				}else{
					guidePre.show();
					guideNext.show();
				}
			}
		}
		guideLiObj.eq(guideTmp).hide().fadeToggle();
		guideLiObj.eq(guideTmp).siblings().hide();
	}
	
	var guideAnimaFun = function(){
		if(guideIsAnima){
			return;
		}
		guideIsAnima = true;
		$('#div_guide').css({
			left: $(this).width()
		}).show();
		$("#div_guide").animate({
			left: 0
		},{
			queue: false,
			duration: 500,
			complete: function() {
				if (guideLiObj.length <= 1) {
					guidePre.hide();
					guideNext.hide()
				} else {
					guidePre.hide();
					guideNext.show()
				}
				guideInterval = setInterval(guideNumFun, 1000);
				guideNum = 1
			}
		});
	}
	
	var guideMenuIsShowFun = function(){
		guideDivObj.show();
		if(guideLiObj.length <= 1){
			guidePre.hide();
			guideNext.hide();
		}else{
			if(guideTmp <= 0){
				guideTmp = 0;
				guidePre.hide();
				guideNext.show();
			}else{
				if(guideTmp >= guideLiObj.length-1){
					guideTmp = guideLiObj.length -1;
					guidePre.show();
					guideNext.show();
				}else{
					guidePre.show();
					guideNext.show();
				}
			}
		}
		guideLiObj.eq(guideTmp).hide().fadeToggle();
		guideLiObj.eq(guideTmp).siblings().hide();
	};
	
	var guideCloseFun = function(){
		if(!guideIsAnima){
			return;
		}
		guideIsAnima = false;
		var divGuide = guideDivObj;
		divGuide.animate({
			left:divGuide.width()
		},{
			queue: false,
			duration: 500,
			complete: function() {
				guideTmp = 0;
				guideStopAnim();
				guideNum = 0
			}
		});
	}
	
	var guideStopAnim = function(){
		guideDivObj.hide();
		guidePre.hide();
		guideNext.show();
		guideLiObj.eq(guideTmp).show();
		guideLiObj.eq(guideTmp).siblings().hide();
		guideNum = 0;
		if(guideInterval != null){
			clearInterval(guideInterval);
		}
	}
	
	var guidePreFun = function(){
		guideTmp++;
		guideShowFun();
	}
	
	var guideNumFun = function(){
		guideNum++;
		if(guideNum == 60){
			guideCloseFun();
		}
	}
	
	guideDivObj.hover(function(){
		guideNum = 0;
		if(guideInterval != null){
			clearInterval(guideInterval);
		}
	},function(){
		guideInterval = setInterval(guideNumFun,1000);
	});
	
	guidePre.click(function(){
		guidePreFun();
	});
	
	guideNext.click(function(){
		guideTmp--;
		guideShowFun();
	});
	
	$("#guide_close").click(function(){
		guideCloseFun();
	});
	
	guideLiObj.each(function(i){
		i=i+1;
		if( i > 1 ){
			$(this).hide();
		}
		
		if(i < guideLiObj.length){
			$(this).children("a").bind("click", guidePreFun);
		}else{
			$(this).children("a").bind("click", guideCloseFun);
		}
	});
	
	$("#what_1yyg").click(function(){
		if(guideNum == 0){
			guideAnimaFun();
		}else{
			guideCloseFun();
		}
	});
});
