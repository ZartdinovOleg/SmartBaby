'use strict';

// Main navigation

let ESC_KEYCODE = 27;
let body = document.querySelector('body');
let navigationOpen = document.querySelector('#button-open');
let navigationClose = document.querySelector('#button-close');

// Close navigation

function closeNavigation() {
	navigationOpen.addEventListener('click', openNavigation);
	navigationClose.removeEventListener('click', closeNavigation);
	document.removeEventListener('keydown', onEscPress);
	body.classList.add('closed-menu-js');
	body.classList.remove('opened-menu-js');
}

function openNavigation() {
	navigationOpen.removeEventListener('click', openNavigation);
	navigationClose.addEventListener('click', closeNavigation);
	document.removeEventListener('keydown', onEscPress);
	body.classList.remove('closed-menu-js');
	body.classList.add('opened-menu-js');
}

function onEscPress(evt) {
	if (evt.keyCode === ESC_KEYCODE) {
		closeNavigation();
	}
}

closeNavigation();

// Slider

let MAX_PERCENT = 100;
let TOUCH_TRACK = 70;
let TABLE_MAX_WIDTH = 1199;
let MOBILE_MAX_WIDTH = 767;
let slidersList = [];
let sliders = document.querySelectorAll('.slider');

// Slider object

for (let i = 0; i < sliders.length; i++) {
	let slider = {};
	slider.slider = sliders[i];
	slider.sliderList = sliders[i].querySelector('.slider__list');
	slider.slides = sliders[i].querySelectorAll('.slider__item');

	// Slider buttons

	slider.sliderPrev = sliders[i].querySelector('.slider__prev');
	slider.sliderNext = sliders[i].querySelector('.slider__next');

	slider.step = slider.slides.length - sliders[i].querySelectorAll('.slider__item--hide').length;

	// Tablet show 3 slides at once
	if (window.matchMedia('(max-width: ' + TABLE_MAX_WIDTH + 'px)').matches) {
		--slider.step;
	}

	// Mobile show 1 slide at once
	if (window.matchMedia('(max-width: ' + MOBILE_MAX_WIDTH + 'px)').matches) {
		slider.step = 1;
	}
	slidersList[i] = slider;
}

// Slider logic

slidersList.forEach(function (el) {
	function initSlider() {
		let sliderWidth = 0;
		for (let i = 0; i < el.slides.length; i++) {
			sliderWidth += el.slides[i].offsetWidth;
		}
		el.sliderList.style.width = '' + sliderWidth + 'px';
	}

	function nextSlide() {
		openSlides(slideIndex += el.step);
	}

	function prevSlide() {
		openSlides(slideIndex -= el.step);
	}

	function touchSlide() {
		el.sliderList.addEventListener('touchstart', function (evt) {
			let startCoords = evt.changedTouches[0].clientX;
			let endCoords = evt.changedTouches[0].clientX;

			let onMouseMove = function (moveEvt) {
				endCoords = moveEvt.changedTouches[0].clientX;
			};

			let onMouseUp = function (upEvt) {
				upEvt.preventDefault();
				el.slider.removeEventListener('touchmove', onMouseMove);
				el.slider.removeEventListener('touchend', onMouseUp);
				let shift = startCoords - endCoords;

				if (Math.abs(shift) > TOUCH_TRACK) {
					if (shift > 0) {
						nextSlide();
					}
					else {
						prevSlide();
					}
				}
			}
			el.slider.addEventListener('touchmove', onMouseMove);
			el.slider.addEventListener('touchend', onMouseUp);
			el.sliderPrev.addEventListener('touchstart', prevSlide);
			el.sliderNext.addEventListener('touchstart', nextSlide)
		});
	}

	function openSlides(n) {
		if (n > el.slides.length) {
			slideIndex = el.step;
		}
		if (n < 1) {
			slideIndex = el.slides.length;
		}
		slideIndex -= el.step;
		el.slides[0].style.marginLeft = '-' + MAX_PERCENT / el.slides.length * slideIndex + '%';
		slideIndex += el.step;
	}


	initSlider();
	var slideIndex = el.step;
	openSlides(slideIndex);

	el.sliderPrev.addEventListener('click', prevSlide);
	el.sliderNext.addEventListener('click', nextSlide);

	if (window.matchMedia('(max-width: ' + MOBILE_MAX_WIDTH + 'px)').matches) {
		touchSlide();
	}
});

/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages = function () { "use strict"; function t(t, e) { return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + t + "' height='" + e + "'%3E%3C/svg%3E" } function e(t) { if (t.srcset && !p && window.picturefill) { var e = window.picturefill._; t[e.ns] && t[e.ns].evaled || e.fillImg(t, { reselect: !0 }), t[e.ns].curSrc || (t[e.ns].supported = !1, e.fillImg(t, { reselect: !0 })), t.currentSrc = t[e.ns].curSrc || t.src } } function i(t) { for (var e, i = getComputedStyle(t).fontFamily, r = {}; null !== (e = u.exec(i));)r[e[1]] = e[2]; return r } function r(e, i, r) { var n = t(i || 1, r || 0); b.call(e, "src") !== n && h.call(e, "src", n) } function n(t, e) { t.naturalWidth ? e(t) : setTimeout(n, 100, t, e) } function c(t) { var c = i(t), o = t[l]; if (c["object-fit"] = c["object-fit"] || "fill", !o.img) { if ("fill" === c["object-fit"]) return; if (!o.skipTest && f && !c["object-position"]) return } if (!o.img) { o.img = new Image(t.width, t.height), o.img.srcset = b.call(t, "data-ofi-srcset") || t.srcset, o.img.src = b.call(t, "data-ofi-src") || t.src, h.call(t, "data-ofi-src", t.src), t.srcset && h.call(t, "data-ofi-srcset", t.srcset), r(t, t.naturalWidth || t.width, t.naturalHeight || t.height), t.srcset && (t.srcset = ""); try { s(t) } catch (t) { window.console && console.warn("https://bit.ly/ofi-old-browser") } } e(o.img), t.style.backgroundImage = 'url("' + (o.img.currentSrc || o.img.src).replace(/"/g, '\\"') + '")', t.style.backgroundPosition = c["object-position"] || "center", t.style.backgroundRepeat = "no-repeat", t.style.backgroundOrigin = "content-box", /scale-down/.test(c["object-fit"]) ? n(o.img, function () { o.img.naturalWidth > t.width || o.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto" }) : t.style.backgroundSize = c["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), n(o.img, function (e) { r(t, e.naturalWidth, e.naturalHeight) }) } function s(t) { var e = { get: function (e) { return t[l].img[e ? e : "src"] }, set: function (e, i) { return t[l].img[i ? i : "src"] = e, h.call(t, "data-ofi-" + i, e), c(t), e } }; Object.defineProperty(t, "src", e), Object.defineProperty(t, "currentSrc", { get: function () { return e.get("currentSrc") } }), Object.defineProperty(t, "srcset", { get: function () { return e.get("srcset") }, set: function (t) { return e.set(t, "srcset") } }) } function o() { function t(t, e) { return t[l] && t[l].img && ("src" === e || "srcset" === e) ? t[l].img : t } d || (HTMLImageElement.prototype.getAttribute = function (e) { return b.call(t(this, e), e) }, HTMLImageElement.prototype.setAttribute = function (e, i) { return h.call(t(this, e), e, String(i)) }) } function a(t, e) { var i = !y && !t; if (e = e || {}, t = t || "img", d && !e.skipTest || !m) return !1; "img" === t ? t = document.getElementsByTagName("img") : "string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]); for (var r = 0; r < t.length; r++)t[r][l] = t[r][l] || { skipTest: e.skipTest }, c(t[r]); i && (document.body.addEventListener("load", function (t) { "IMG" === t.target.tagName && a(t.target, { skipTest: e.skipTest }) }, !0), y = !0, t = "img"), e.watchMQ && window.addEventListener("resize", a.bind(null, t, { skipTest: e.skipTest })) } var l = "fregante:object-fit-images", u = /(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g, g = "undefined" == typeof Image ? { style: { "object-position": 1 } } : new Image, f = "object-fit" in g.style, d = "object-position" in g.style, m = "background-size" in g.style, p = "string" == typeof g.currentSrc, b = g.getAttribute, h = g.setAttribute, y = !1; return a.supportsObjectFit = f, a.supportsObjectPosition = d, o(), a }();