var delayToRemoveClass = 400;
var shouldAnimate = 1;
var animationDelayIncrease = 0.05;
var numberOfImages = 0;
var navShouldFloat = 1;
var navHeight;

$(window).scroll(function() {
	//console.log($(window).scrollTop());
  if ($(window).scrollTop() > 110 && shouldAnimate == 1) {
  	shouldAnimate = 0;
//  	$('.arrow-btn').animate({ opacity: 0 }, 400, function() {
//  		$(this).addClass('noanimation').css("display", "none");
//  	});
  	$('.arrow-btn').fadeOut(400, function() {
  		$(this).addClass('noanimation');
  	});
  	
  	
  	$('.work-img.l').addClass("fadeInLeftBig animated").css("display", "block");
  	$('.work-img.r').addClass("fadeInRightBig animated").css("display", "block");
  	$('.work-img.m').addClass("fadeIn animated").css("display", "block");
  	$('.portfolio-filter').addClass("fadeIn animated");
  	
  	
  	// Re-enable clicking of hidden (now visible) images
  	$('.img-hover-content').unbind('click').css({cursor:"pointer"});
  	
  	/*setTimeout(function () {      
  	         $('.work-img.l').addClass('notransition').removeClass('fadeInLeftBig animated').css("opacity", "1");
  	         $('.work-img.r').addClass('notransition').removeClass('fadeInRightBig animated').css("opacity", "1");
  	         $('.work-img.m').addClass('notransition').removeClass('fadeIn animated').css("opacity", "1");
  	         $('.portfolio-filter').addClass('notransition').removeClass('fadeIn animated').css("opacity", "1");
  	        
  	         $('.work-img.l')[0].offsetHeight;
  	         $('.work-img.r')[0].offsetHeight;
  	         $('.work-img.m')[0].offsetHeight;
  	         $('.portfolio-filter')[0].offsetHeight;
  	         
  	         $('.work-img.l').removeClass('notransition');
  	         $('.work-img.r').removeClass('notransition');
  	         $('.work-img.m').removeClass('notransition');
  	         $('.portfolio-filter').removeClass('notransition');
  	         
  	}, (numberOfImages * animationDelayIncrease) + 400 );*/
  	
  	$('.work-img').each(function(i){
  	    $(this).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
  	    	function(e) {
  	    		$(this).addClass('notransition').removeClass('fadeInLeftBig fadeInRightBig fadeIn animated').css("opacity", "1");
  	    		$('.work-img.l')[0].offsetHeight;
  	    		$(this).removeClass('notransition');
  	    });
  	});
  }
  
  
  if ($(window).scrollTop() > $('.top-dead-space').height() && navShouldFloat == 1) {
  	$('.floating-nav-bg').css('position', 'fixed');
  	$('.top-logo').addClass('s');
  	$('.nav').addClass('s');
  	$('.top-dead-space').height($('.top-dead-space').height() + navHeight);
  	navShouldFloat = 0;
  	
  } else if ($(window).scrollTop() < $('.top-dead-space').height() - navHeight && navShouldFloat == 0) {
  	$('.floating-nav-bg').css('position', '');
  	$('.top-logo').removeClass('s');
  	$('.nav').removeClass('s');
  	$('.top-dead-space').height($('.top-dead-space').height() - navHeight);
  	navShouldFloat = 1;
  }
});


$(document).ready(function() {
	
	// FANCYBOX //
	$(".fancybox-effects-a").fancybox({
		closeBtn: false,
		closeClick: true,
		padding: 0,
		helpers: {
			overlay: {
				speedIn: 500,
				opacity: 0.95
			}//overlay
		}//helpters
	});//fancybox
	
	// RESPONSIVE NAV //
	var nav = responsiveNav(".nav-wrap");
	
	// OTHER STUFF //
	navHeight = $('.floating-nav').height();
	// Images Cascade Effect by setting increasing delays in the css
	$('.work-img.l').each(function(i){
	    $(this).css('animation-delay', i * animationDelayIncrease + "s");
	    numberOfImages++;
	});
	$('.work-img.r').each(function(i){
	    $(this).css('animation-delay', i * animationDelayIncrease + "s");
	});
	$('.work-img.m').each(function(i){
	    $(this).css('animation-delay', i * animationDelayIncrease + 0.3 + "s");
	});
	
	
	
	// Prevent click to invisible images on load
	$('.img-hover-content').bind('click', function(){ return false; }).css({cursor:"default"});
	
	
	
	// Portfolio filter menu: Setting the active item
	$('.portfolio-filter dd a').click(function() {
		// fetch the class of the clicked item
		var ourClass = $(this).parent().attr('id');
		
		// reset the active class on all the buttons
		$('.portfolio-filter dd').removeClass('active');
		// update the active state on our clicked button
		$(this).parent().addClass('active');
		
		if(ourClass == 'all') {
			// show all our items
			$('#portfolio-wrapper').children('div.work-img').removeClass('filtered-img');	
		}
		else {
			// hide all elements that don't share ourClass
			$('#portfolio-wrapper').children('div:not(.' + ourClass + ')').addClass('filtered-img');
			// show all elements that do share ourClass
            $('#portfolio-wrapper').children('div.' + ourClass).removeClass('filtered-img');
		}
		return false;
	});
	
	
	// SMOOTH SCROLL
	$('a[href^="#"]').on('click',function (e) {
		    e.preventDefault();
	
		    var target = this.hash,
		    $target = $(target);
	
		    $('html, body').stop().animate({
		        'scrollTop': $target.offset().top
		    }, 400, 'swing');
		});
		
});



//$( window ).resize(function() {
//  console.log($( window ).width());
//});