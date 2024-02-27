let lenis = '';

window.addEventListener('load', () => {
	gsap.registerPlugin(ScrollTrigger);
	smoothScroll()
	header();
	footer();
});

function browserCheck(){
    const user = window.navigator.userAgent.toLowerCase();
	const agent = navigator.userAgent;
	let mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const browser = user.indexOf("edge") > -1 ? "edge"
    : user.indexOf("edg/") > -1 ? "edge(chromium based)"
    : user.indexOf("opr") > -1 ? "opera"
    : user.indexOf("kakaotalk") > -1 ? "kakaotalk"
    : user.indexOf("naver") > -1 ? "naver"
    : user.indexOf("chrome") > -1 ? "chrome"
    : user.indexOf("trident") > -1 ? "ie"
    : user.indexOf("firefox") > -1 ? "firefox"
    : user.indexOf("safari") > -1 ? "safari"
    : user.indexOf("whale") > -1 ? "whale"
    : "other browser";

	if(mobile){
		mobile = user.match(/lg/i) != null ? "lg"
		: user.match(/iphone|ipad|ipod/i) != null ? "ios"
		: user.match(/android/i) != null ? "android"
		: "other mobile";

		if(mobile === 'ios'){
			return false;
		}else{
			return (browser === 'naver' || browser === 'kakaotalk' ? true : false);
		}
	} else{
		return false;
	}

}

function smoothScroll(){

	// lenis = new Lenis({
    //     smoothTouch: true
    // });
	//
	// lenis.on('scroll', ScrollTrigger.update)
	//
	// gsap.ticker.add((time)=>{
	//   lenis.raf(time * 1000)
	// })
	//
	// gsap.ticker.lagSmoothing(0)

	lenis = new Lenis({
		duration: 1.2,
		infinite: false,
		easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
		gestureOrientation: "vertical",
		normalizeWheel: false,
		touchMultiplier: (browserCheck() ? 2.1 : 1.3),
		smoothTouch: true
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

}



function header(){
	if ($('.header').hasClass('white')) {
		$('.header').addClass('reserve');
	}

    window.addEventListener('scroll', () => {
        if(lenis.direction > 0){
            $('.header').addClass('hide').removeClass('reserve');
        }else{
            $('.header').removeClass('hide').addClass('reserve');
        }
        if ($(window).scrollTop() <= 0) {
			$('.header').removeClass('hide');
			$('.header:not(.white)').removeClass('reserve');
		}
    });

	$('.nav-bar').click(function(){
		$(this).toggleClass('on');
		$('.header').toggleClass('nav-open');
		$(".dim").toggleClass('on');
		lenis.start();
		if($(this).hasClass('on')){
			lenis.stop();
		}
	});
	$('.dim').click(function(){
		$(this).removeClass('on');
		$(".nav-bar").removeClass('on');
		$('.header').removeClass('nav-open');
		lenis.start();
	});
	$('.header .nav > ul > li:has(.on)').addClass('on');

	if ($(window).width() <= 1024) {
		$('.header .nav > ul > li:has(ul)').click(function() {
			$(this).find('> a').removeAttr('href');
			$('.header .nav > ul > li:has(ul)').not(this).find('ul').slideUp();
			$('.header .nav > ul > li:has(ul)').not(this).removeClass('on');
			$(this).find('ul').slideToggle();
			$(this).toggleClass('on');
		});
	}
}


function footer(){
	document.querySelector(".ft-to-top a").addEventListener("click", function(event) {
		event.preventDefault();

		const scrollToTop = () => {
			const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
			if (currentPosition > 0) {
				window.requestAnimationFrame(scrollToTop);
				window.scrollTo(0, currentPosition - currentPosition /*currentPosition - currentPosition / 8*/);
				$('.header').addClass('hide');
			}
		};
		scrollToTop();
	});


	// familysite
	$('.ft-family > a').click(function(){
		  $('.ft-family > ul').stop().slideToggle();
		  $('.ft-family').stop().toggleClass('on');
	});
    $(document).on('click', function (event) {
      if (!$(event.target).closest('.ft-family').length) {
        $('.ft-family > ul').stop().slideUp();
      }
    });
}
