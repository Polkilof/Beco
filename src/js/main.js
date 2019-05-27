$(document).ready(initPage);
function initPage(){
	ImgTobg();
	mobileMenu();
	dropdownToggle();
	accordeon();
	tabs();
	initSlider();
}

function ImgTobg() {
	$('.img-to-bg').each(function() {
		if ($(this).find('img').length) {
			$(this).css('background-image', 'url(' + $(this).find('> img').attr('src') + ')');
		}
	});
}

function mobileMenu(){
	$('<span class="open-menu"><span></span><span></span><span></span><span></span></span>').appendTo('.header-page > .container');
	$('<span class="fader"/>').appendTo('.header-page > .container');
	$('html').on('click', '.open-menu', function() {
		$('body').toggleClass('menu-opened');
		return false;
	});
	$('.fader').on('click touchmove', function(event) {
		$('body').removeClass('menu-opened');
	});
}

function pageScrollTop() {
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.btn-page-up').fadeIn();
		} else {
			$('.btn-page-up').fadeOut();
		}
	});
	$('.btn-page-up').click(function(e){
		var offsetTop = $('body').offset().top;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 500);
		e.preventDefault();
	});
}


function accordeon(){
	$(".accordeon dd").hide().prev().click(function() {
		$(this).parents(".accordeon").find("dd").not(this).slideUp().prev().removeClass("active");
		$(this).next().not(":visible").slideDown().prev().addClass("active");
	});
	/*$(".accordeon dl.current dd").show();*/
}

function tabs(){
	$('ul.tabs-caption').on('click', 'li:not(.active)', function() {
		$(this)
		.addClass('active').siblings().removeClass('active')
		.closest('div.tabs').find('div.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
	});
}

function dropdownToggle(){
	$('.dropdown-block__toggle').click(function(event){
		$(this).parent().toggleClass('open');
		event.preventDefault();
	});
	$(document).on('mouseup touchend ', function(e){
		var container = $('.dropdown-block');
		if ($(window).width() >= 992) {
			if (!container.is(e.target) && container.has(e.target).length === 0){
				container.removeClass('open');
			}
		}
	});
}

function initSlider(){
	var slider = $('.visual__slider');
	slider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: true
	});
	var resizeTimer;
	$(window).on('resize', function(e) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			slider.slick('setPosition');
		}, 250);
	});
}