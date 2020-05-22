$(document).ready(function(){
	$('.news').slick({
		infinite: true,
		speed: 2000,
		autoplay:true,
		accessibility:true,
		autoplaySpeed: 3000,
		cssEase: 'linear',
		pauseOnHover:true,
		mobileFirst:true
	});
	$('.slider').slick({
		infinite: true,
		speed: 1500,
		autoplay:true,
		autoplaySpeed: 3000,
	});

});
