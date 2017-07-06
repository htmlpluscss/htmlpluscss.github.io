/* UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

http://htmlpluscss.ru

*/

var $window = $(window);
var windowHeight = 0;
var windowWidth = 0;
var ua_mobile = (/iphone|ipad|ipod|android|blackberry|mini|windowssce|palm/i.test(navigator.userAgent.toLowerCase()));

$window.on('resize',function(){
	setTimeout(function(){
		windowHeight = $window.height();
		windowWidth = $window.width();

// map
		$('.box_map').width(windowWidth).css('margin-left',-windowWidth/2);
	},1);
});


$window.ready(function(){

	$window.trigger('resize').trigger('scroll');

// slider
	$('.slider').each(function(){
		var s = $(this);
		var b = s.children('.box');
		var not_click = ' not_click';
		if (b.hasClass('each'))
			not_click = '';
		var ul = b.children();
		var li = ul.children();
		if(s.is('.sl_np'))
			s.append('<span class="nav_left nextprev'+not_click+'"></span><span class="nav_right nextprev"></span>');
		if(s.is('.sl_pagin'))
			app_nav(s,li);
		if(s.is('.abscissa'))
			ul_width(b,ul,li);
		if(s.is('[data-timer]'))
			timer(s,parseInt(s.attr('data-timer'))*1000);
	});

// slider mainpage service
	function service_slide() {
		var b = $('.mainpage .service .box');
		var ul = b.children();
		var li = ul.children()
		b.append('<span class="nav_left nextprev"></span><span class="nav_right nextprev"></span>');
		var w = 0;
		li.each(function() {
			w += $(this).outerWidth(true);
		});
		ul.width(w).animate({left: 0},function(){
			$window.trigger('resize');
		});
		$window.on('resize',function(){
			setTimeout(function(){
				if(windowWidth>w){
					ul.siblings('.nextprev').hide();
					ul.css('left',0);
				}
				else{
					var l = windowWidth-w;
					if(windowWidth<555)
						l -= 220;
					ul.siblings('.nextprev').show();
					ul.css('left',l/2);
				}
			},10);
		});

		b.children('.nextprev').on('click',function(){
			var t = $(this);
			var l = ul.position().left;
			var r = windowWidth - w;
			var p = windowWidth%220 / 2;
			l += (t.hasClass('nav_right')) ? -220 : 220; // 180 li.width()
			if(t.hasClass('nav_right')){
				if (l + 220 < r)
					l = p
			}
			else {
				if (l >= 220 - p)
					l = r - p;
				else if (l > 0)
					l = p;
			}
			ul.animate({'left': l},500);
		});
	}
	if($('.mainpage').is('.mainpage'))
		service_slide();



// menu parent
	if(!ua_mobile) {
		$('.parent').hover(function(){
			var t = $(this);
			t.siblings('.hover').removeClass('hover');
			var ul = t.children('ul');
			t.addClass('show hover');
			setTimeout(function(){
				if(t.hasClass('show')){
					$('body').addClass('menu_hover');
					bg.fadeIn(function(){
						ul.fadeIn();
					});
				}
			},300);
		},function(){
			var t = $(this);
			var ul = t.children('ul');
			t.removeClass('show');
			setTimeout(function(){
				if(!(t.hasClass('show') || t.siblings('.parent').hasClass('show'))){
					$('body').removeClass('menu_hover');
					t.removeClass('hover');
					ul.fadeOut(function(){
						bg.fadeOut();
					});
				}
			},200);
		});

		$('.level2 > li, .level3 > li').hover(function(){
			var t = $(this).addClass('this');
			var ul = t.children('ul');
			var ul_all = $('.'+ul.attr('class')).not(ul);
			ul.stop().fadeIn();
			ul_all.stop().fadeOut();
		},function(){
			var t = $(this).removeClass('this');
			var ul = t.children('ul');
			setTimeout(function(){
				if(!(ul.parent().hasClass('this'))) {
					ul.stop().fadeOut();
				}
			},400);
		});
	}

// form
	$('input.phone').mask('+7 (999) 999-99-99');

	$('.input_style')
	.on('focus keypress keyup',function(){
		var t = $(this);
		var f = t.closest('form').addClass('focus');
		if(t.val()=='')
			f.removeClass('text');
		else
			f.addClass('text');
	})
	.on('blur',function(){
		$(this).closest('form').removeClass('focus text');
	});

// tab
	$('.tabs dt').first().addClass('first').end().last().addClass('last').end().each(function(){
		$(this).parent().children('dd').first().before($(this).wrapInner('<span></span>'));
	}).on('click',function(){
		var t = $(this);
		if(t.hasClass('active'))
			return false;
		t.addClass('active').siblings('.active').removeClass('active').siblings('dd').eq(t.index()).addClass('active');
	});
	if($('.tabs dt.active').is('.active'))
		$('.tabs dd').eq($('.tabs dt.active').index()).addClass('active');
	else
		$('.tabs').children().first().addClass('active').siblings('dd').first().addClass('active');


// select
	$('.select').each(function() {
		select_html($(this));
	});


// radio_type
	$('.radio_type input').each(function(){
		if ($(this).prop('checked')) {
			if($(this).attr('type')=='radio')
				$('input').filter('[name='+$(this).attr('name')+']').not($(this)).prop('checked',false).parent().removeClass('active');
			$(this).parent().addClass('active');
		}
	}).on('change',function(){
		if ($(this).prop('checked')) {
			if($(this).attr('type')=='radio')
				$('input').filter('[name='+$(this).attr('name')+']').not($(this)).parent().removeClass('active');
			$(this).parent().addClass('active');
		}
		else
			$(this).parent().removeClass('active');
		if ($(this).attr('data-show'))
			$('.'+$(this).attr('data-show')).slideDown();
		if ($(this).attr('data-hide'))
			$('.'+$(this).attr('data-hide')).slideUp();
		show_result($(this).parent());
	});
	$('.radio_type.but input:checked').trigger('change');

// filter
	$('.left_col h2.button').on('click',function(){
		var t = $(this);
		if(t.hasClass('active'))
			t.removeClass('active').next().hide();
		else
			t.addClass('active').next().show();
	});

	$('.filter h3').on('click',function(){
		var t = $(this).parent();
		if(t.hasClass('active'))
			t.children('.box').slideUp(function(){
				t.removeClass('active');
			});
		else
			t.children('.box').slideDown(function(){
				t.addClass('active');
			});
	});

// slider-range
	if($('.slide_price').is('.slide_price')){

		$('.slide_price').each(function(i){
			var t = $(this);
			var from = t.find('.from');
			var to = t.find('.to');
			var s = t.children('.rang');

			var min = parseInt(s.attr('data-min'));
			var max = parseInt(s.attr('data-max'));
			var step = parseInt(s.attr('data-step'));

			s.slider({
				range: true,
				min:min,
				max:max,
				step:step,
				values: [min, max],
				slide: function(event,ui) {
					if(ui.values[0] == ui.values[1])
						return false;
					from.val(sep(ui.values[0])),
					to.val(sep(ui.values[1]));
				}
			});
			from.val(sep(min)).on('change blur',function(){
				var v = str_to_number(from.val());
				if(v<min) {
					from.val(min);
					v = min;
				}
				s.slider('values', 0, v);
			});
			to.val(sep(max)).on('change blur',function(){
				var v = str_to_number(to.val());
				if(v>max) {
					to.val(max);
					v = max;
				}
				s.slider('values', 1, v);
			});
		});
	}

//form_reset
	$('.filter').on('reset',function(){

		setTimeout(function(){
			$('.radio_type input').trigger('change');

			$('.slide_price').each(function(i){
				var t = $(this);
				var from = t.find('.from');
				var to = t.find('.to');
				var s = t.children('.rang');
				var min = parseInt(s.attr('data-min'));
				var max = parseInt(s.attr('data-max'));
				s.slider('values', 0, min);
				s.slider('values', 1, max);
				from.val(sep(min));
				to.val(sep(max));
			});
		},1);

	});


// alert_up
	$('body').append('<div class="bg_up"></div>');
	bg = $('.bg_up').css('opacity',.4);
	up = $('.alert_up');

	bg.on('click',function() {
		var a_up = up.filter('.animate');
		alert_start(a_up,true);
		a_up.afterTransition(function(){
			bg.fadeOut();
			up.removeClass('animate');
			$('.clbh_blur').removeClass('clbh_blur');
		});
	});

	up.children('.close').on('click',function(){
		bg.trigger('click');
	});

	$('.header .login_in').on('click',function() {
		alert_top(up.filter('.avtoriz'));
	});
	$('.location').on('click',function() {
		alert_top(up.filter('.location_form'));
	});
	$('.location_form li span').on('click',function(){
		$('.location').text($(this).text());
		bg.triggerHandler('click');
	});
	$('.location_form form').on('submit',function(){
		$('.location').text($('.location_form .input').val());
		bg.triggerHandler('click');
		return false;
	});
	$('.buy_one_click').on('click',function(){
		alert_top(up.filter('.buy_one_click_form'));
	});



// fancy
	if($('[data-fancybox]').length>0){

		$.getScript("/js/jquery.fancybox.min.js", function(){

			$('.img_big a').fancybox({
				padding : 5,
				helpers : {
					media : {}
				}
			});
			$('.play_video').on('click',function(){
				$('.img_big a.video').trigger('click');
			});

			$('.img_small img').on('click',function(){
				var n = $('.img_big a').eq($(this).index());
				$('.img_big a').not(n).hide();
				n.show();
			});
		});

	}

// quantity
	$('.cart_page .minus, .cart_page .plus').on('click',function(){
		var v = $(this).siblings('.value').text();
		v = parseInt(v);
		v += ($(this).hasClass('plus')) ? 1 : -1;
		if(v==0)
			v=1;
		$(this).siblings('.value').text(v);
		summ();
	});
// cart del
	$('.delete').on('click',function(){
		var tr = $(this).closest('tr');
		if(tr.closest('form').is('.minicart'))
			var mini_cart = true;
		tr.fadeOut(function(){
			tr.remove();
			if(mini_cart){
				var v = $('.header .cart a.count').text();
				v = parseInt(v) - 1;
				$('.header .cart .count').not('td').text(v);
				summ_mini();
			}
			else
				summ();
		});
	});
	function summ() {
		var s = 0;
		$('.cart_page .value').each(function(){
			var count = $(this).text();
			var price = $(this).attr('data-price');
			count = parseInt(count);
			price = price.replace(/ /g,'');
			price = parseInt(price);
			price = price * count;
			s += price;
			$(this).parent().siblings('.price').find('.summ--total').text(sep(price));
		});
		$('.foot_total .result').text(sep(s));
	}
	function summ_mini() {
		var s = 0;
		$('.minicart .count input').each(function(){
			var price = $(this).attr('data-price');
			s += parseInt(price);
		});
		$('.minicart .result').text(sep(s));
	}

// mini cart
	$('.header .cart').hover(function(){
		$(this).addClass('show hover');
		setTimeout(function(){
			$('body').addClass('menu_hover');
			bg.fadeIn(function(){
				$('.minicart').fadeIn();
			});
		},300);
	},function(){
		var t = $(this);
		t.removeClass('show');
		setTimeout(function(){
			if(!(t.hasClass('show'))){
				$('body').removeClass('menu_hover');
				t.removeClass('hover');
				$('.minicart').fadeOut(function(){
					bg.fadeOut();
				});
			}
		},800);
	});

// placeholder
	if(!Modernizr.input.placeholder)
		$('[placeholder]').each(function() {
			var p = $(this).attr('placeholder');
			$(this).val(p);
			$(this).attr("onblur","if (this.value=='') this.value='"+p+"'");
			$(this).attr("onfocus","if (this.value=='"+p+"') this.value=''");
		});

// shops
	$('.shops .img').each(function () {
		var img = $(this).children('img');
		img.first().addClass('active');
		img.eq(1).addClass('right o3');
		img.slice(2).addClass('last o3');
		img.fadeIn();
	});
	$('.shops .img img').on('click',function () {
		var t = $(this);
		if(t.hasClass('active'))
			return false;
		var a = t.siblings('.active').removeClass('active');

		if(t.hasClass('right')){
			var l = a;
			var c = a.next('img');
			var r = c.next('img');
			a.siblings('.left').addClass('first').removeClass('left');
		}
		else{
			var l = a.prev().prev();
			var c = a.prev();
			var r = a;
			a.siblings('.right').addClass('last').removeClass('right');
		}
		l.addClass('left o3').removeClass('first');
		r.addClass('right o3').removeClass('last');
		c.removeClass('left right o3').addClass('active');
	});

// map
	var myMap = [];

	$('.map_show').on('click',function () {
		var t = $(this);
		var id = t.attr('data-idmap');
		var center = t.attr('data-center').split(',');
		var placemark = t.attr('data-placemark').split(',');

		if (!myMap[id]) {
			myMap[id] = new ymaps.Map(id, {
				center: [center[0],center[1]],
				zoom: 15
			});

			var myPlacemark = new ymaps.Placemark([placemark[0],placemark[1]], {
				balloonContent: t.attr('data-balloon')
			}, {
				preset: 'islands#dotIcon',
				iconColor: '#fa481c'
			});

			myMap[id].geoObjects.add(myPlacemark);
			myMap[id].controls.add('zoomControl');

			var close = $('<span class="close_map">');
			close.one('click',function(){
				$('#'+id).fadeOut(function(){
					myMap[id].destroy();
					myMap[id] = null;
					close.remove();
				});
			});
			$('#'+id).fadeIn().append(close);

			$window.on('resize',function(){
				setTimeout(function(){
					myMap[id].container.fitToViewport();
				},2)
			});
		}
	});

});

// srting
function sep(str){
	str = str.toString();
	return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
function str_to_number(n){
	return parseInt(n.replace(/\s+/g,''));
}

// filter
function show_result(t){
	$('.show_result').hide().css('top',t.height()/2+t.position().top).fadeIn();
}

// alert_up
var bg, up;

function alert_top(a_up) {
	var top = alert_start(a_up);
	a_up.addClass('animate');
	bg.fadeIn(function(){
		var a_this = up.not(a_up).filter('.animate');
		if (a_this.length > 0) {
			alert_start(a_this);
			a_this.afterTransition(function() {
				a_this.removeClass('animate');
			});
		}
		setTimeout(function(){
			a_up.css('top', top).afterTransition(function() {
				if(!a_up.hasClass('location_form'))
					a_up.find('.input').first().focus();
			});
		},1);
	});
}
function alert_start(a_up,all_hide) {
	var h_up = a_up.outerHeight();
	var top = $window.scrollTop();
	var start = top - h_up - 24; // 24 box-shadow
	if(!(all_hide && (top>a_up.offset().top+h_up || top+windowHeight<a_up.offset().top)))
		a_up.css('top', start);
	if (windowHeight > h_up)
		top += (windowHeight - h_up) / 2;
	return top;
}

// sliders
function timer(s,t){
	var intervalID;
	function on_timer(){
		intervalID = setInterval(function(){
			s.children('.nav_right').triggerHandler('click');
		},t);
	}
	function off_timer(){
		clearInterval(intervalID);
	}
	s.find('p, .nav_pagination').hover(function(){
		off_timer();
	},function(){
		on_timer();
	});
	on_timer();
}

function ul_width(b,ul,li) {
	var w = 0;
	li.first().addClass('first active');
	li.last().css('margin-right',0);
	li.each(function() {
		w += $(this).outerWidth(true);
	});
	ul.width(w).animate({left: 0});

//	li_last
	var b_w = b.width();

//fix box = 0
	if(b_w==0)
		b_w = b.closest('.center').width();
	if (w <= b_w)
		b.siblings('.nextprev').addClass('hide');
	if (w > b_w) {
		w = 0;
		for(var i = -1; b_w >= w; i--)
			w += li.eq(i).outerWidth(true);
		li.eq(i + 2).addClass('last');
		b.siblings('.nextprev').on('click',function(){
			var t = $(this);
			if(t.hasClass('not_click'))
				return false;
			var n = first_last(t,li);
			var l = n.addClass('active').position().left;
			if (n.hasClass('last'))
				l = ul.width() - ul.parent().width();
			ul.animate({'left': - l},700);

			b.siblings('.nextprev').removeClass('not_click');
			if (n.hasClass('last'))
				b.siblings('.nav_right').addClass('not_click');
			if (n.hasClass('first'))
				b.siblings('.nav_left').addClass('not_click');
		});
	}
}

// slider nav_pag
function app_nav(s,li){
	li.first().addClass('first active').end().last().addClass('last');
	var pagination = $('<div class="nav_pagination">');
	for(var i = 0; i < li.size(); i++)
		pagination.append('<span></span>');
	var pagin_li = pagination.children();
	pagin_li.first().addClass('active first');
	pagin_li.last().addClass('last');
	pagin_li.on('click',function(){
		var t = $(this);
		if(t.hasClass('active'))
			return false;
		t.addClass('active').siblings('.active').removeClass('active');
		var a = li.filter('.active');
		var n = li.eq(t.index()).addClass('next');
		n.stop().fadeIn(700);
		a.stop().fadeOut(700,function(){
			li.removeClass('active next');
			n.addClass('active');
		})
	});
	s.append(pagination);

	s.children('.nextprev').on('click',function(){
		var t = $(this);
		var n = first_last(t,pagin_li);
		n.triggerHandler('click');
	});
}
function first_last(t,li){
	var n;
	var a = li.filter('.active').removeClass('active');
	if(t.hasClass('nav_right'))
		n = (a.hasClass('last')) ? li.filter('.first') : a.next();
	else
		n = (a.hasClass('first')) ? li.filter('.last') : a.prev();
	return n;
}


// select
function select_html(select) {
	var t = select.children('select');
	var c = '<span class="value notsel"><span>' + t.children(':selected').text() + '</span></span><div class="box"><ul>';
	t.children('option').each(function() {
		c += '<li data-value="' + $(this).val() + '">' + $(this).text() + '</li>';
	});
	c += '</ul></div>';
	t.before(c);

	select.children('.value').on('click', function() {
		var t = $(this).parent();
		var box = t.children('.box');
		box.css('min-width',t.outerWidth());
		$('.select .box').not(box).hide().parent().removeClass('focus');
		if(box.css('display')=='none')
			box.show().parent().addClass('focus');
		else
			box.hide().parent().removeClass('focus');
		$(document).one('click', function() {
			$('.select .box').hide().parent().removeClass('focus');
		});
		return false;
	});
	select.find('li').on('click', function() {
		var t = $(this);
		t.closest('.box').siblings('.value').children().text(t.text());
		t.closest('.box').siblings('select').val(t.attr('data-value')).trigger('change');
	});
}

/*
 * Copyright 2012 Andrey “A.I.” Sitnik <andrey@sitnik.ru>,
 * sponsored by Evil Martians.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function(d){"use strict";d.Transitions={_names:{'transition':'transitionend','OTransition':'oTransitionEnd','WebkitTransition':'webkitTransitionEnd','MozTransition':'transitionend'},_parseTimes:function(b){var c,a=b.split(/,\s*/);for(var e=0;e<a.length;e++){c=a[e];a[e]=parseFloat(c);if(c.match(/\ds/)){a[e]=a[e]*1000}}return a},getEvent:function(){var b=false;for(var c in this._names){if(typeof(document.body.style[c])!='undefined'){b=this._names[c];break}}this.getEvent=function(){return b};return b},animFrame:function(c){var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame;if(a){this.animFrame=function(b){return a.call(window,b)}}else{this.animFrame=function(b){return setTimeout(b,10)}}return this.animFrame(c)},isSupported:function(){return this.getEvent()!==false}};d.extend(d.fn,{afterTransition:function(h,i){if(typeof(i)=='undefined'){i=h;h=1}if(!d.Transitions.isSupported()){for(var f=0;f<this.length;f++){i.call(this[f],{type:'aftertransition',elapsedTime:0,propertyName:'',currentTarget:this[f]})}return this}for(var f=0;f<this.length;f++){var j=d(this[f]);var n=j.css('transition-property').split(/,\s*/);var k=j.css('transition-duration');var l=j.css('transition-delay');k=d.Transitions._parseTimes(k);l=d.Transitions._parseTimes(l);var o,m,p,q,r;for(var g=0;g<n.length;g++){o=n[g];m=k[k.length==1?0:g];p=l[l.length==1?0:g];q=p+(m*h);r=m*h/1000;(function(b,c,a,e){setTimeout(function(){d.Transitions.animFrame(function(){i.call(b[0],{type:'aftertransition',elapsedTime:e,propertyName:c,currentTarget:b[0]})})},a)})(j,o,q,r)}}return this},transitionEnd:function(c){for(var a=0;a<this.length;a++){this[a].addEventListener(d.Transitions.getEvent(),function(b){c.call(this,b)})}return this}})}).call(this,jQuery);

/* Modernizr 2.8.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-boxshadow-input-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}function D(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)q[c[d]]=c[d]in j;return q.list&&(q.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),q}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "))}var d="2.8.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j=b.createElement("input"),k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.boxshadow=function(){return C("boxShadow")};for(var E in o)v(o,E)&&(t=E.toLowerCase(),e[t]=o[E](),r.push((e[t]?"":"no-")+t));return e.input||D(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e}(this,this.document);

/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
	delete: focusText = input.val();
*/
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);

