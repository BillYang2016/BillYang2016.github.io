/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
[ COMMON SCRIPTS ]

AUTHOR : NCode.Art
PROJECT : NC-Hold Coming-Soon Page
VERSION : 2.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

(function($) {
	"use strict";

	$(window).load(function(){
		mainBg();
		loader();
	});

	$(document).ready(function() {
		navigation();
		owlCarouselWidget();
		pageTransation();
		notifyMeForm();
	});
	
	$(window).resize(function() {
		mainBg();
	});

})(jQuery);

/*	PAGE LOADER
----------------------------*/
function loader(){
    $(".page-loader-wrapper").fadeOut(800);
}

function loaderIn(){
	$(".page-loader-wrapper").addClass("pg-loader");
    $(".page-loader-wrapper").fadeIn(200);
}

/*	MAIN-BACKGROUND
----------------------------*/
function mainBg(){
	var path = $(".single-image .background").attr("data-image");
	if($("body").hasClass("single-image")){
		$(".single-image .background").css({
			"background-image" : "url("+path+")"
		});	
	}else{
		return false;
	}
}

/*	OWL-CAROUSEL
----------------------------*/
function owlCarouselWidget(){
	function strtoArr(arr) {

		if (typeof(arr) == "string" && arr != 'false') {
			var t1 = arr.split('|');
			var t2 = {};
			$.each(t1, function(index, val) {
				var str = val;
				var newarr = str.split(',');
				t2[newarr[0]] = {}
				t2[newarr[0]] = {items: parseInt(newarr[1],10)};
			});
			return t2;
		}else if(arr === 'false'){
			return {};
		}else{
			return false;
		}
	}

	function dataCheck(val){
		return val && val == "true" ? true : false;
	}

	getvar = function (v, default_v, val_type) {
		if (val_type == 'n') {
			return v ? parseInt(v,10) : default_v;
		} 
		if (val_type == 'b') {
			if (v == 'true') { return true; }
			else if (v == 'false') { return false; }
			else { return default_v; }
		}
		if (val_type == 's') {
			if (v == 'false') {
				return false;
			} else {
				return v ? v : default_v;
			};
		}
	}

	if ($(".carousel-widget").length > 0) {
		var carousel = 0;
		$('.carousel-widget').each(function(){

			// SET ID ON ALL OBJECTS
			carousel++;
			var createObj = 'owl'+carousel;
			$(this).css({opacity:0});
			$(this).attr("id", createObj);
			$(this).addClass(createObj);

			var owlobj = $("."+createObj+ " .carousel .owl-carousel");

			var resObj = {
				0    : { items:1 },
				420  : { items:2 },
				600  : { items:3 },
				768  : { items:3 },
				980  : { items:4 }
			}

			var config = {
				center             : getvar($(this).attr('data-center'), false, 'b'),
				mouseDrag		   : getvar($(this).attr('data-mouseDrag'), true, 'b'),
				touchDrag		   : getvar($(this).attr('data-touchDrag'), true, 'b'),
				stagePadding       : getvar($(this).attr('data-stpd'), 0, 'n'),
				items              : getvar($(this).attr('data-items'), 5, 'n'),
				margin             : getvar($(this).attr('data-margin'), 0, 'n'),
				nav                : getvar($(this).attr('data-nav'), false, 'b'),
				dots               : getvar($(this).attr('data-pager'), false, 'b'),
				slideby            : getvar($(this).attr('data-slideby'), 1, 'n'),
				rbase              : getvar($(this).attr('data-rbase'), $(this).parent(), 's'),
				res                : $(this).attr('data-itemrange') ? strtoArr($(this).attr('data-itemrange')) : resObj,
				animOut            : getvar($(this).attr('data-out'), 'fadeOut', 's'),
				animIn             : getvar($(this).attr('data-in'), 'fadeIn', 's'),
				autoplay           : getvar($(this).attr('data-autoplay'), false, 'b'),
				autoplayTimeout    : getvar($(this).attr('data-timeout'), 3000, 'n'),
				autoplayHoverPause : getvar($(this).attr('data-hstop'), true, 'b'),
				loop               : getvar($(this).attr('data-loop'), false, 'b'),
				video              : getvar($(this).attr('data-video'), false, 'b'),
				autoWidth          : getvar($(this).attr('data-awidth'), false, 'b'),
				autoHeight         : getvar($(this).attr('data-hauto'), true, 'b')
			}

			$("."+createObj).animate({opacity:1}, 100, function(){

				 owlobj.owlCarousel({
					center                : config.center,
					mouseDrag 			  : config.mouseDrag,
					touchDrag 			  : config.touchDrag,
					stagePadding          : config.stagePadding,
					items                 : config.items,
					margin                : config.margin,
					nav                   : config.nav,
					dots                  : config.dots,
					slideBy               : config.slideby,
					navText               : ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
					responsiveBaseElement : config.rbase,
					responsive            : config.res,
					loop                  : config.loop,
					video                 : config.video,
					animateOut            : config.animOut, //'slideOutDown',
					animateIn             : config.animIn, //'flipInX',
					autoplay              : config.autoplay,
					autoplayTimeout       : config.autoplayTimeout,
					autoplayHoverPause    : config.autoplayHoverPause,
					autoHeight            : config.autoHeight,
					autoWidth             : config.autoWidth,

					onInitialized: function () {
						owlobj.animate({opacity: 1}, 300);
					}
				});

				$("."+createObj).find('.carousel-btn .prev').on('click', function() { owlobj.trigger('prev.owl.carousel'); });
				$("."+createObj).find('.carousel-btn .next').on('click', function() { owlobj.trigger('next.owl.carousel'); });

			});
		});
	}
}

/*	COUNTDOWN CLOCK
----------------------------*/
function countdownClock(){
	var day = parseInt($("#countdown_dashboard").attr("data-day"),10);
	var month = parseInt($("#countdown_dashboard").attr("data-month"),10);
	var year = parseInt($("#countdown_dashboard").attr("data-year"),10);
	var hour = parseInt($("#countdown_dashboard").attr("data-hr"),10);
	var min = parseInt($("#countdown_dashboard").attr("data-min"),10);
	var sec = parseInt($("#countdown_dashboard").attr("data-sec"),10);

	// DESKTOP CLOCK
	$('#countdown_dashboard').countDown({
		targetDate: {
			'day': 		day,
			'month': 	month,
			'year': 	year,
			'hour': 	hour,
			'min': 		min,
			'sec': 		sec
		},
		omitWeeks: true
	});
}

/*	NOTIFYME
----------------------------*/
function notifyMeForm(){
	$("#notifyMe #submit").on( "click", function() {
		 "use strict";
	    $("#notifyMe").notifyMe();
	    $("#notifyMe .error-text").delay(2000).fadeOut(2000);
	});
}

/*	NAVIGATION
----------------------------*/
function navigation(){
	$("#nc-menu").mCustomScrollbar({
		theme: "minimal",
	    axis:"y"
	});
	$('.nc-menu-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav(true);
	});
	$('.nc-menu-close, .nc-overlay').on('click', function(event){
		event.preventDefault();
		toggleNav(false);
	});
	$('.nc-menu li').on('click', function(event){
		toggleNav(false);
		$('.nc-menu li').removeClass("nc-active");
		$(this).addClass("nc-active");
	});
	function toggleNav(bool) {
		$('.nc-menu-container, .nc-overlay').toggleClass('visible-on', bool);
		$('#main').toggleClass('nc-down-scale', bool);
	}
}

/*	PAGE-TRANSATION
----------------------------*/
function pageTransation(){
	var pageUrl;
	var navlink = $("#navigation .nav-link");
	var ajaxpage = $("#ajax-page");
	var homepage = $("#home-page");
	var home_wrp = $("#home-page .ac");
	var home_anim = $("#home-page .anim");

	navlink.on("click",function(){
		pageUrl = $(this).attr("data-page");
		loaderIn();

		if($("html").hasClass("ie9")){
			if (pageUrl == 'home.html'){
				$("#ajax-page .pg-wrp .anim").animate({
					opacity: 0
				}, 800, function(){
					if($("#ajax-page").hasClass("port-full")){
						$("#ajax-page").removeClass("port-full");
					}
					home_anim.animate({
						opacity: 1
					}, 800);
				});
			}
			else{
				if(homepage.hasClass("active-home")){
					home_anim.animate({
						opacity: 0
					}, 800, function(){
						pageload(pageUrl, ajaxpage);
						$("#ajax-page .pg-wrp .anim").animate({
							opacity: 1
						}, 800);
					});
				}
				else{
					$("#ajax-page .pg-wrp .anim").animate({
						opacity: 0
					}, 800, function(){
						ajaxpage.html('');
						pageload(pageUrl, ajaxpage);
						$("#ajax-page .pg-wrp .anim").animate({
							opacity: 1
						}, 800);
					});
				}
			}	
		}
		else{
			if (pageUrl == 'home.html'){
				$("#ajax-page .pg-wrp").addClass("fadeOut");
				setTimeout(function(){
					if($("#ajax-page").hasClass("port-full")){
						$("#ajax-page").removeClass("port-full");
					}
					ajaxpage.html('');
					loader();
					homepage.addClass("active-home");
					home_wrp.addClass("fadeInUp");
					// Resting clock function
					if(ajaxpage.find('#time').length == 0) {
						if (typeof e !== 'undefined') {
							e.doCountDown = function() {}; t='';	
						}; 
					}
				}, 800);
			}
			else{
				if(homepage.hasClass("active-home")){
					homepage.addClass("fadeOut");
					setTimeout(function(){
						homepage.removeClass("active-home");
						homepage.removeClass("fadeOut");
						home_wrp.removeClass("fadeInUp");
						pageload(pageUrl, ajaxpage);
					}, 800);
				}
				else{
					$("#ajax-page .pg-wrp").addClass("fadeOut");
					setTimeout(function(){
						ajaxpage.html('');
						pageload(pageUrl, ajaxpage);
					}, 800);
				}
			}
		}
	});
}

/*	PAGE-LOAD
----------------------------*/
function pageload(pageUrl, ajaxpage) {
	$.get(pageUrl, function(data){
		loader();
		if(pageUrl == "pages/portfolio.html" || pageUrl == "pages/portfolio-1.html" || pageUrl == "pages/video-portfolio.html"){
			$("#ajax-page").addClass("port-full");
		}
		else{
			$("#ajax-page").removeClass("port-full");
		}
		ajaxpage.html(data);
		ajaxpage.addClass("active-page");
		owlCarouselWidget();
		// Resting clock function
		if(ajaxpage.find('#time').length == 0) {
			if (typeof e !== 'undefined') {
				e.doCountDown = function() {}; t='';	
			}; 
		}
	});	
}

