$(document).ready(initPage);
function initPage(){
	ImgTobg();
	mobileMenu();
	dropdownToggle();
	accordeon();
	tabs();
	initSlider();
	filter();
	validateFields();

	$('[data-fancybox="gallery"]').fancybox({});
}

function filter(){
	$('.components__list').isotope({
		itemSelector: '.components__item',
		layoutMode: 'fitRows'
	});
	$('.filter .filter__link').click(function(e){
		e.preventDefault();
		$('.filter .filter__link').removeClass('active');
		$(this).addClass('active');

		var selector = $(this).parent().attr('data-filter');
		$('.components__list').isotope({
			filter: selector
		});
		return false;
	});
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

function validateFields(){
	$("._validate").validate({
		highlight: function(element) {
			$(element).parent().addClass('form__box_error').removeClass('form__box_valid');
		},
		unhighlight: function(element) {
			$(element).parent().removeClass('form__box_error').addClass('form__box_valid');
		},
		rules: {
			request: {
				required: false,
			},
			username: {
				required: true,
				minlength: 2,
				myName: true,
			},
			email: {
				required: true,
				myEmail: true,
			},
			phone: {
				required: true,
				myPhone: true,
			},
			message: {
				required: true,
				minlength: 2,
			}
		},
		messages: {
			request: {
				required: false,
			},
			username: {
				required: false,
				minlength: false,
				myName: false,
			},
			email: {
				required: false,
				email: false,
				myEmail: false,
			},
			phone: {
				required: false,
				myPhone: false,
			},
			message: {
				required: false,
				minlength: false,
			}
		}
	});
	$.validator.addMethod(
		"myName",
		function(value, element){
			return value.match(/^[A-Za-zА-Яа-яЁё\s]+$/);
		}
	);
	$.validator.addMethod(
		"myPhone",
		function(value, element){
			return value.match(/[0-9\-\(\)\s]+/);
		}
	);
	$.validator.addMethod(
		"myEmail",
		function(value, element){
			return value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		}
	);
}

function mapInitialize(map_) {
	var latlng = new google.maps.LatLng(48.98021699, 18.17138672);
	var Markerlatlng = new google.maps.LatLng(51.5149042, 0.1235499);
	var myOptions = {
		center: latlng,
		zoom: 5,
		scrollwheel: false,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		disableDoubleClickZoom: true
	};
	var map = new google.maps.Map(document.getElementById(map_), myOptions);
	var stylesBW = [
		{
			featureType: "all",
			stylers: [
				{ saturation: 0 }
			]
		}
	];
	map.setOptions({styles: stylesBW});
	var marker = new google.maps.Marker({
		position: Markerlatlng,
		icon: '../images/ico-marker.png',
		map: map
	});

	new google.maps.Marker({
		position: new google.maps.LatLng(49.98696603, 36.23341978),
		icon: '../images/ico-marker.png',
		map: map
	})
}
$('#map').each(function(){
	var map_ = $(this).attr('id');
	mapInitialize(map_);
});