$(document).ready(function(){
	$('.news').slick({
		infinite: true,
		speed: 10000,
		autoplay:true,
		accessibility:true,
		autoplaySpeed: 0,
		cssEase: 'linear',
		pauseOnHover:true,
		mobileFirst:true
	});
	$('.slider').slick({
		infinite: true,
		speed: 300,
		autoplay:true,
	});

});
