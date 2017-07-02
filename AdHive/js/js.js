/* UTF-8

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

http://htmlpluscss.ru

*/

(function(){

	var clickEvent = ('ontouchstart' in window ? 'touchstart' : 'click');

// menu

	document.querySelector('.header__menu-toggle').addEventListener(clickEvent, function () {

		document.querySelector('body').classList.toggle('menu-show');

	}, true);

})();