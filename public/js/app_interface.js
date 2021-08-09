/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/interface/js_flexslider.js":
/*!*************************************************!*\
  !*** ./resources/js/interface/js_flexslider.js ***!
  \*************************************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * jQuery FlexSlider v2.6.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
!function ($) {
  var e = !0;
  $.flexslider = function (t, a) {
    var n = $(t);
    n.vars = $.extend({}, $.flexslider.defaults, a);
    var i = n.vars.namespace,
        s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        r = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
        o = "click touchend MSPointerUp keyup",
        l = "",
        c,
        d = "vertical" === n.vars.direction,
        u = n.vars.reverse,
        v = n.vars.itemWidth > 0,
        p = "fade" === n.vars.animation,
        m = "" !== n.vars.asNavFor,
        f = {};
    $.data(t, "flexslider", n), f = {
      init: function init() {
        n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = $(n.vars.selector, n), n.container = $(n.containerSelector, n), n.count = n.slides.length, n.syncExists = $(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = d ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !p && n.vars.useCSS && function () {
          var e = document.createElement("div"),
              t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];

          for (var a in t) {
            if (void 0 !== e.style[t[a]]) return n.pfx = t[a].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
          }

          return !1;
        }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = $(n.vars.controlsContainer).length > 0 && $(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = $(n.vars.manualControls).length > 0 && $(n.vars.manualControls)), "" !== n.vars.customDirectionNav && (n.customDirectionNav = 2 === $(n.vars.customDirectionNav).length && $(n.vars.customDirectionNav)), n.vars.randomize && (n.slides.sort(function () {
          return Math.round(Math.random()) - .5;
        }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && f.controlNav.setup(), n.vars.directionNav && f.directionNav.setup(), n.vars.keyboard && (1 === $(n.containerSelector).length || n.vars.multipleKeyboard) && $(document).bind("keyup", function (e) {
          var t = e.keyCode;

          if (!n.animating && (39 === t || 37 === t)) {
            var a = 39 === t ? n.getTarget("next") : 37 === t ? n.getTarget("prev") : !1;
            n.flexAnimate(a, n.vars.pauseOnAction);
          }
        }), n.vars.mousewheel && n.bind("mousewheel", function (e, t, a, i) {
          e.preventDefault();
          var s = 0 > t ? n.getTarget("next") : n.getTarget("prev");
          n.flexAnimate(s, n.vars.pauseOnAction);
        }), n.vars.pausePlay && f.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && f.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function () {
          n.manualPlay || n.manualPause || n.pause();
        }, function () {
          n.manualPause || n.manualPlay || n.stopped || n.play();
        }), n.vars.pauseInvisible && f.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), m && f.asNav.setup(), r && n.vars.touch && f.touch(), (!p || p && n.vars.smoothHeight) && $(window).bind("resize orientationchange focus", f.resize), n.find("img").attr("draggable", "false"), setTimeout(function () {
          n.vars.start(n);
        }, 200);
      },
      asNav: {
        setup: function setup() {
          n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(i + "active-slide").eq(n.currentItem).addClass(i + "active-slide"), s ? (t._slider = n, n.slides.each(function () {
            var e = this;
            e._gesture = new MSGesture(), e._gesture.target = e, e.addEventListener("MSPointerDown", function (e) {
              e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId);
            }, !1), e.addEventListener("MSGestureTap", function (e) {
              e.preventDefault();
              var t = $(this),
                  a = t.index();
              $(n.vars.asNavFor).data("flexslider").animating || t.hasClass("active") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0));
            });
          })) : n.slides.on(o, function (e) {
            e.preventDefault();
            var t = $(this),
                a = t.index(),
                s = t.offset().left - $(n).scrollLeft();
            0 >= s && t.hasClass(i + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : $(n.vars.asNavFor).data("flexslider").animating || t.hasClass(i + "active-slide") || (n.direction = n.currentItem < a ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0));
          });
        }
      },
      controlNav: {
        setup: function setup() {
          n.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging();
        },
        setupPaging: function setupPaging() {
          var e = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
              t = 1,
              a,
              s;
          if (n.controlNavScaffold = $('<ol class="' + i + "control-nav " + i + e + '"></ol>'), n.pagingCount > 1) for (var r = 0; r < n.pagingCount; r++) {
            s = n.slides.eq(r), void 0 === s.attr("data-thumb-alt") && s.attr("data-thumb-alt", "");
            var c = "" !== s.attr("data-thumb-alt") ? c = ' alt="' + s.attr("data-thumb-alt") + '"' : "";

            if (a = "thumbnails" === n.vars.controlNav ? '<img src="' + s.attr("data-thumb") + '"' + c + "/>" : '<a href="#">' + t + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
              var d = s.attr("data-thumbcaption");
              "" !== d && void 0 !== d && (a += '<span class="' + i + 'caption">' + d + "</span>");
            }

            n.controlNavScaffold.append("<li>" + a + "</li>"), t++;
          }
          n.controlsContainer ? $(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), f.controlNav.set(), f.controlNav.active(), n.controlNavScaffold.delegate("a, img", o, function (e) {
            if (e.preventDefault(), "" === l || l === e.type) {
              var t = $(this),
                  a = n.controlNav.index(t);
              t.hasClass(i + "active") || (n.direction = a > n.currentSlide ? "next" : "prev", n.flexAnimate(a, n.vars.pauseOnAction));
            }

            "" === l && (l = e.type), f.setToClearWatchedEvent();
          });
        },
        setupManual: function setupManual() {
          n.controlNav = n.manualControls, f.controlNav.active(), n.controlNav.bind(o, function (e) {
            if (e.preventDefault(), "" === l || l === e.type) {
              var t = $(this),
                  a = n.controlNav.index(t);
              t.hasClass(i + "active") || (a > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(a, n.vars.pauseOnAction));
            }

            "" === l && (l = e.type), f.setToClearWatchedEvent();
          });
        },
        set: function set() {
          var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
          n.controlNav = $("." + i + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n);
        },
        active: function active() {
          n.controlNav.removeClass(i + "active").eq(n.animatingTo).addClass(i + "active");
        },
        update: function update(e, t) {
          n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append($('<li><a href="#">' + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(t).closest("li").remove(), f.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(t, e) : f.controlNav.active();
        }
      },
      directionNav: {
        setup: function setup() {
          var e = $('<ul class="' + i + 'direction-nav"><li class="' + i + 'nav-prev"><a class="' + i + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + i + 'nav-next"><a class="' + i + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
          n.customDirectionNav ? n.directionNav = n.customDirectionNav : n.controlsContainer ? ($(n.controlsContainer).append(e), n.directionNav = $("." + i + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = $("." + i + "direction-nav li a", n)), f.directionNav.update(), n.directionNav.bind(o, function (e) {
            e.preventDefault();
            var t;
            ("" === l || l === e.type) && (t = $(this).hasClass(i + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(t, n.vars.pauseOnAction)), "" === l && (l = e.type), f.setToClearWatchedEvent();
          });
        },
        update: function update() {
          var e = i + "disabled";
          1 === n.pagingCount ? n.directionNav.addClass(e).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(e).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : n.directionNav.removeClass(e).removeAttr("tabindex");
        }
      },
      pausePlay: {
        setup: function setup() {
          var e = $('<div class="' + i + 'pauseplay"><a href="#"></a></div>');
          n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = $("." + i + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = $("." + i + "pauseplay a", n)), f.pausePlay.update(n.vars.slideshow ? i + "pause" : i + "play"), n.pausePlay.bind(o, function (e) {
            e.preventDefault(), ("" === l || l === e.type) && ($(this).hasClass(i + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === l && (l = e.type), f.setToClearWatchedEvent();
          });
        },
        update: function update(e) {
          "play" === e ? n.pausePlay.removeClass(i + "pause").addClass(i + "play").html(n.vars.playText) : n.pausePlay.removeClass(i + "play").addClass(i + "pause").html(n.vars.pauseText);
        }
      },
      touch: function touch() {
        function e(e) {
          e.stopPropagation(), n.animating ? e.preventDefault() : (n.pause(), t._gesture.addPointer(e.pointerId), T = 0, c = d ? n.h : n.w, f = Number(new Date()), l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c);
        }

        function a(e) {
          e.stopPropagation();
          var a = e.target._slider;

          if (a) {
            var n = -e.translationX,
                i = -e.translationY;
            return T += d ? i : n, m = T, y = d ? Math.abs(T) < Math.abs(-n) : Math.abs(T) < Math.abs(-i), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function () {
              t._gesture.stop();
            }) : void ((!y || Number(new Date()) - f > 500) && (e.preventDefault(), !p && a.transitions && (a.vars.animationLoop || (m = T / (0 === a.currentSlide && 0 > T || a.currentSlide === a.last && T > 0 ? Math.abs(T) / c + 2 : 1)), a.setProps(l + m, "setTouch"))));
          }
        }

        function i(e) {
          e.stopPropagation();
          var t = e.target._slider;

          if (t) {
            if (t.animatingTo === t.currentSlide && !y && null !== m) {
              var a = u ? -m : m,
                  n = a > 0 ? t.getTarget("next") : t.getTarget("prev");
              t.canAdvance(n) && (Number(new Date()) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : p || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0);
            }

            r = null, o = null, m = null, l = null, T = 0;
          }
        }

        var r,
            o,
            l,
            c,
            m,
            f,
            g,
            h,
            _S,
            y = !1,
            x = 0,
            b = 0,
            T = 0;

        s ? (t.style.msTouchAction = "none", t._gesture = new MSGesture(), t._gesture.target = t, t.addEventListener("MSPointerDown", e, !1), t._slider = n, t.addEventListener("MSGestureChange", a, !1), t.addEventListener("MSGestureEnd", i, !1)) : (g = function g(e) {
          n.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (n.pause(), c = d ? n.h : n.w, f = Number(new Date()), x = e.touches[0].pageX, b = e.touches[0].pageY, l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c, r = d ? b : x, o = d ? x : b, t.addEventListener("touchmove", h, !1), t.addEventListener("touchend", _S, !1));
        }, h = function h(e) {
          x = e.touches[0].pageX, b = e.touches[0].pageY, m = d ? r - b : r - x, y = d ? Math.abs(m) < Math.abs(x - o) : Math.abs(m) < Math.abs(b - o);
          var t = 500;
          (!y || Number(new Date()) - f > t) && (e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (m /= 0 === n.currentSlide && 0 > m || n.currentSlide === n.last && m > 0 ? Math.abs(m) / c + 2 : 1), n.setProps(l + m, "setTouch")));
        }, _S = function S(e) {
          if (t.removeEventListener("touchmove", h, !1), n.animatingTo === n.currentSlide && !y && null !== m) {
            var a = u ? -m : m,
                i = a > 0 ? n.getTarget("next") : n.getTarget("prev");
            n.canAdvance(i) && (Number(new Date()) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? n.flexAnimate(i, n.vars.pauseOnAction) : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0);
          }

          t.removeEventListener("touchend", _S, !1), r = null, o = null, m = null, l = null;
        }, t.addEventListener("touchstart", g, !1));
      },
      resize: function resize() {
        !n.animating && n.is(":visible") && (v || n.doMath(), p ? f.smoothHeight() : v ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : d ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && f.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")));
      },
      smoothHeight: function smoothHeight(e) {
        if (!d || p) {
          var t = p ? n : n.viewport;
          e ? t.animate({
            height: n.slides.eq(n.animatingTo).innerHeight()
          }, e) : t.innerHeight(n.slides.eq(n.animatingTo).innerHeight());
        }
      },
      sync: function sync(e) {
        var t = $(n.vars.sync).data("flexslider"),
            a = n.animatingTo;

        switch (e) {
          case "animate":
            t.flexAnimate(a, n.vars.pauseOnAction, !1, !0);
            break;

          case "play":
            t.playing || t.asNav || t.play();
            break;

          case "pause":
            t.pause();
        }
      },
      uniqueID: function uniqueID(e) {
        return e.filter("[id]").add(e.find("[id]")).each(function () {
          var e = $(this);
          e.attr("id", e.attr("id") + "_clone");
        }), e;
      },
      pauseInvisible: {
        visProp: null,
        init: function init() {
          var e = f.pauseInvisible.getHiddenProp();

          if (e) {
            var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
            document.addEventListener(t, function () {
              f.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play();
            });
          }
        },
        isHidden: function isHidden() {
          var e = f.pauseInvisible.getHiddenProp();
          return e ? document[e] : !1;
        },
        getHiddenProp: function getHiddenProp() {
          var e = ["webkit", "moz", "ms", "o"];
          if ("hidden" in document) return "hidden";

          for (var t = 0; t < e.length; t++) {
            if (e[t] + "Hidden" in document) return e[t] + "Hidden";
          }

          return null;
        }
      },
      setToClearWatchedEvent: function setToClearWatchedEvent() {
        clearTimeout(c), c = setTimeout(function () {
          l = "";
        }, 3e3);
      }
    }, n.flexAnimate = function (e, t, a, s, o) {
      if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), m && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, o) || a) && n.is(":visible")) {
        if (m && s) {
          var l = $(n.vars.asNavFor).data("flexslider");
          if (n.atEnd = 0 === e || e === n.count - 1, l.flexAnimate(e, !0, !1, !0, o), n.direction = n.currentItem < e ? "next" : "prev", l.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e) return n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), !1;
          n.currentItem = e, n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), e = Math.floor(e / n.visible);
        }

        if (n.animating = !0, n.animatingTo = e, t && n.pause(), n.vars.before(n), n.syncExists && !o && f.sync("animate"), n.vars.controlNav && f.controlNav.active(), v || n.slides.removeClass(i + "active-slide").eq(e).addClass(i + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && f.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), p) r ? (n.slides.eq(n.currentSlide).css({
          opacity: 0,
          zIndex: 1
        }), n.slides.eq(e).css({
          opacity: 1,
          zIndex: 2
        }), n.wrapup(c)) : (n.slides.eq(n.currentSlide).css({
          zIndex: 1
        }).animate({
          opacity: 0
        }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({
          zIndex: 2
        }).animate({
          opacity: 1
        }, n.vars.animationSpeed, n.vars.easing, n.wrapup));else {
          var c = d ? n.slides.filter(":first").height() : n.computedW,
              g,
              h,
              S;
          v ? (g = n.vars.itemMargin, S = (n.itemW + g) * n.move * n.animatingTo, h = S > n.limit && 1 !== n.visible ? n.limit : S) : h = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? u ? (n.count + n.cloneOffset) * c : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? u ? 0 : (n.count + 1) * c : u ? (n.count - 1 - e + n.cloneOffset) * c : (e + n.cloneOffset) * c, n.setProps(h, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function () {
            clearTimeout(n.ensureAnimationEnd), n.wrapup(c);
          }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function () {
            n.wrapup(c);
          }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function () {
            n.wrapup(c);
          });
        }
        n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed);
      }
    }, n.wrapup = function (e) {
      p || v || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(e, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(e, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n);
    }, n.animateSlides = function () {
      !n.animating && e && n.flexAnimate(n.getTarget("next"));
    }, n.pause = function () {
      clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && f.pausePlay.update("play"), n.syncExists && f.sync("pause");
    }, n.play = function () {
      n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && f.pausePlay.update("pause"), n.syncExists && f.sync("play");
    }, n.stop = function () {
      n.pause(), n.stopped = !0;
    }, n.canAdvance = function (e, t) {
      var a = m ? n.pagingCount - 1 : n.last;
      return t ? !0 : m && n.currentItem === n.count - 1 && 0 === e && "prev" === n.direction ? !0 : m && 0 === n.currentItem && e === n.pagingCount - 1 && "next" !== n.direction ? !1 : e !== n.currentSlide || m ? n.vars.animationLoop ? !0 : n.atEnd && 0 === n.currentSlide && e === a && "next" !== n.direction ? !1 : n.atEnd && n.currentSlide === a && 0 === e && "next" === n.direction ? !1 : !0 : !1;
    }, n.getTarget = function (e) {
      return n.direction = e, "next" === e ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1;
    }, n.setProps = function (e, t, a) {
      var i = function () {
        var a = e ? e : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
            i = function () {
          if (v) return "setTouch" === t ? e : u && n.animatingTo === n.last ? 0 : u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : a;

          switch (t) {
            case "setTotal":
              return u ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e : (n.currentSlide + n.cloneOffset) * e;

            case "setTouch":
              return u ? e : e;

            case "jumpEnd":
              return u ? e : n.count * e;

            case "jumpStart":
              return u ? n.count * e : e;

            default:
              return e;
          }
        }();

        return -1 * i + "px";
      }();

      n.transitions && (i = d ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)", a = void 0 !== a ? a / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", a), n.container.css("transition-duration", a)), n.args[n.prop] = i, (n.transitions || void 0 === a) && n.container.css(n.args), n.container.css("transform", i);
    }, n.setup = function (e) {
      if (p) n.slides.css({
        width: "100%",
        "float": "left",
        marginRight: "-100%",
        position: "relative"
      }), "init" === e && (r ? n.slides.css({
        opacity: 0,
        display: "block",
        webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
        zIndex: 1
      }).eq(n.currentSlide).css({
        opacity: 1,
        zIndex: 2
      }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(n.currentSlide).css({
        zIndex: 2
      }).css({
        opacity: 1
      }) : n.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(n.currentSlide).css({
        zIndex: 2
      }).animate({
        opacity: 1
      }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && f.smoothHeight();else {
        var t, a;
        "init" === e && (n.viewport = $('<div class="' + i + 'viewport"></div>').css({
          overflow: "hidden",
          position: "relative"
        }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, u && (a = $.makeArray(n.slides).reverse(), n.slides = $(a), n.container.empty().append(n.slides))), n.vars.animationLoop && !v && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = $(n.vars.selector, n), t = u ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, d && !v ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function () {
          n.newSlides.css({
            display: "block"
          }), n.doMath(), n.viewport.height(n.h), n.setProps(t * n.h, "init");
        }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(t * n.computedW, "init"), setTimeout(function () {
          n.doMath(), n.newSlides.css({
            width: n.computedW,
            marginRight: n.computedM,
            "float": "left",
            display: "block"
          }), n.vars.smoothHeight && f.smoothHeight();
        }, "init" === e ? 100 : 0));
      }
      v || n.slides.removeClass(i + "active-slide").eq(n.currentSlide).addClass(i + "active-slide"), n.vars.init(n);
    }, n.doMath = function () {
      var e = n.slides.first(),
          t = n.vars.itemMargin,
          a = n.vars.minItems,
          i = n.vars.maxItems;
      n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = e.height(), n.boxPadding = e.outerWidth() - e.width(), v ? (n.itemT = n.vars.itemWidth + t, n.itemM = t, n.minW = a ? a * n.itemT : n.w, n.maxW = i ? i * n.itemT - t : n.w, n.itemW = n.minW > n.w ? (n.w - t * (a - 1)) / a : n.maxW < n.w ? (n.w - t * (i - 1)) / i : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + t * (n.count - 1) : (n.itemW + t) * n.count - n.w - t) : (n.itemW = n.w, n.itemM = t, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding, n.computedM = n.itemM;
    }, n.update = function (e, t) {
      n.doMath(), v || (e < n.currentSlide ? n.currentSlide += 1 : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === t && !v || n.pagingCount > n.controlNav.length ? f.controlNav.update("add") : ("remove" === t && !v || n.pagingCount < n.controlNav.length) && (v && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), f.controlNav.update("remove", n.last))), n.vars.directionNav && f.directionNav.update();
    }, n.addSlide = function (e, t) {
      var a = $(e);
      n.count += 1, n.last = n.count - 1, d && u ? void 0 !== t ? n.slides.eq(n.count - t).after(a) : n.container.prepend(a) : void 0 !== t ? n.slides.eq(t).before(a) : n.container.append(a), n.update(t, "add"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n);
    }, n.removeSlide = function (e) {
      var t = isNaN(e) ? n.slides.index($(e)) : e;
      n.count -= 1, n.last = n.count - 1, isNaN(e) ? $(e, n.slides).remove() : d && u ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(t, "remove"), n.slides = $(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n);
    }, f.init();
  }, $(window).blur(function (t) {
    e = !1;
  }).focus(function (t) {
    e = !0;
  }), $.flexslider.defaults = {
    namespace: "flex-",
    selector: ".slides > li",
    animation: "fade",
    easing: "swing",
    direction: "horizontal",
    reverse: !1,
    animationLoop: !0,
    smoothHeight: !1,
    startAt: 0,
    slideshow: !0,
    slideshowSpeed: 7e3,
    animationSpeed: 600,
    initDelay: 0,
    randomize: !1,
    fadeFirstSlide: !0,
    thumbCaptions: !1,
    pauseOnAction: !0,
    pauseOnHover: !1,
    pauseInvisible: !0,
    useCSS: !0,
    touch: !0,
    video: !1,
    controlNav: !0,
    directionNav: !0,
    prevText: "Previous",
    nextText: "Next",
    keyboard: !0,
    multipleKeyboard: !1,
    mousewheel: !1,
    pausePlay: !1,
    pauseText: "Pause",
    playText: "Play",
    controlsContainer: "",
    manualControls: "",
    customDirectionNav: "",
    sync: "",
    asNavFor: "",
    itemWidth: 0,
    itemMargin: 0,
    minItems: 1,
    maxItems: 0,
    move: 0,
    allowOneSlide: !0,
    start: function start() {},
    before: function before() {},
    after: function after() {},
    end: function end() {},
    added: function added() {},
    removed: function removed() {},
    init: function init() {}
  }, $.fn.flexslider = function (e) {
    if (void 0 === e && (e = {}), "object" == _typeof(e)) return this.each(function () {
      var t = $(this),
          a = e.selector ? e.selector : ".slides > li",
          n = t.find(a);
      1 === n.length && e.allowOneSlide === !1 || 0 === n.length ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data("flexslider") && new $.flexslider(this, e);
    });
    var t = $(this).data("flexslider");

    switch (e) {
      case "play":
        t.play();
        break;

      case "pause":
        t.pause();
        break;

      case "stop":
        t.stop();
        break;

      case "next":
        t.flexAnimate(t.getTarget("next"), !0);
        break;

      case "prev":
      case "previous":
        t.flexAnimate(t.getTarget("prev"), !0);
        break;

      default:
        "number" == typeof e && t.flexAnimate(e, !0);
    }
  };
}(jQuery);
;
/**/

/***/ }),

/***/ "./resources/js/interface/js_jquery.js":
/*!*********************************************!*\
  !*** ./resources/js/interface/js_jquery.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function (a, b) {
  function cy(a) {
    return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1;
  }

  function cu(a) {
    if (!cj[a]) {
      var b = c.body,
          d = f("<" + a + ">").appendTo(b),
          e = d.css("display");
      d.remove();

      if (e === "none" || e === "") {
        ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck);
        if (!cl || !ck.createElement) cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close();
        d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck);
      }

      cj[a] = e;
    }

    return cj[a];
  }

  function ct(a, b) {
    var c = {};
    f.each(cp.concat.apply([], cp.slice(0, b)), function () {
      c[this] = a;
    });
    return c;
  }

  function cs() {
    cq = b;
  }

  function cr() {
    setTimeout(cs, 0);
    return cq = f.now();
  }

  function ci() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP");
    } catch (b) {}
  }

  function ch() {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  }

  function cb(a, c) {
    a.dataFilter && (c = a.dataFilter(c, a.dataType));
    var d = a.dataTypes,
        e = {},
        g,
        h,
        i = d.length,
        j,
        k = d[0],
        l,
        m,
        n,
        o,
        p;

    for (g = 1; g < i; g++) {
      if (g === 1) for (h in a.converters) {
        typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
      }
      l = k, k = d[g];
      if (k === "*") k = l;else if (l !== "*" && l !== k) {
        m = l + " " + k, n = e[m] || e["* " + k];

        if (!n) {
          p = b;

          for (o in e) {
            j = o.split(" ");

            if (j[0] === l || j[0] === "*") {
              p = e[j[1] + " " + k];

              if (p) {
                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                break;
              }
            }
          }
        }

        !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)));
      }
    }

    return c;
  }

  function ca(a, c, d) {
    var e = a.contents,
        f = a.dataTypes,
        g = a.responseFields,
        h,
        i,
        j,
        k;

    for (i in g) {
      i in d && (c[g[i]] = d[i]);
    }

    while (f[0] === "*") {
      f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
    }

    if (h) for (i in e) {
      if (e[i] && e[i].test(h)) {
        f.unshift(i);
        break;
      }
    }
    if (f[0] in d) j = f[0];else {
      for (i in d) {
        if (!f[0] || a.converters[i + " " + f[0]]) {
          j = i;
          break;
        }

        k || (k = i);
      }

      j = j || k;
    }

    if (j) {
      j !== f[0] && f.unshift(j);
      return d[j];
    }
  }

  function b_(a, b, c, d) {
    if (f.isArray(b)) f.each(b, function (b, e) {
      c || bD.test(a) ? d(a, e) : b_(a + "[" + (_typeof(e) == "object" ? b : "") + "]", e, c, d);
    });else if (!c && f.type(b) === "object") for (var e in b) {
      b_(a + "[" + e + "]", b[e], c, d);
    } else d(a, b);
  }

  function b$(a, c) {
    var d,
        e,
        g = f.ajaxSettings.flatOptions || {};

    for (d in c) {
      c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
    }

    e && f.extend(!0, a, e);
  }

  function bZ(a, c, d, e, f, g) {
    f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
    var h = a[f],
        i = 0,
        j = h ? h.length : 0,
        k = a === bS,
        l;

    for (; i < j && (k || !l); i++) {
      l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
    }

    (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
    return l;
  }

  function bY(a) {
    return function (b, c) {
      typeof b != "string" && (c = b, b = "*");

      if (f.isFunction(c)) {
        var d = b.toLowerCase().split(bO),
            e = 0,
            g = d.length,
            h,
            i,
            j;

        for (; e < g; e++) {
          h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c);
        }
      }
    };
  }

  function bB(a, b, c) {
    var d = b === "width" ? a.offsetWidth : a.offsetHeight,
        e = b === "width" ? 1 : 0,
        g = 4;

    if (d > 0) {
      if (c !== "border") for (; e < g; e += 2) {
        c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
      }
      return d + "px";
    }

    d = by(a, b);
    if (d < 0 || d == null) d = a.style[b];
    if (bt.test(d)) return d;
    d = parseFloat(d) || 0;
    if (c) for (; e < g; e += 2) {
      d += parseFloat(f.css(a, "padding" + bx[e])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
    }
    return d + "px";
  }

  function bo(a) {
    var b = c.createElement("div");
    bh.appendChild(b), b.innerHTML = a.outerHTML;
    return b.firstChild;
  }

  function bn(a) {
    var b = (a.nodeName || "").toLowerCase();
    b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm);
  }

  function bm(a) {
    if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked;
  }

  function bl(a) {
    return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [];
  }

  function bk(a, b) {
    var c;
    b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"));
  }

  function bj(a, b) {
    if (b.nodeType === 1 && !!f.hasData(a)) {
      var c,
          d,
          e,
          g = f._data(a),
          h = f._data(b, g),
          i = g.events;

      if (i) {
        delete h.handle, h.events = {};

        for (c in i) {
          for (d = 0, e = i[c].length; d < e; d++) {
            f.event.add(b, c, i[c][d]);
          }
        }
      }

      h.data && (h.data = f.extend({}, h.data));
    }
  }

  function bi(a, b) {
    return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
  }

  function U(a) {
    var b = V.split("|"),
        c = a.createDocumentFragment();
    if (c.createElement) while (b.length) {
      c.createElement(b.pop());
    }
    return c;
  }

  function T(a, b, c) {
    b = b || 0;
    if (f.isFunction(b)) return f.grep(a, function (a, d) {
      var e = !!b.call(a, d, a);
      return e === c;
    });
    if (b.nodeType) return f.grep(a, function (a, d) {
      return a === b === c;
    });

    if (typeof b == "string") {
      var d = f.grep(a, function (a) {
        return a.nodeType === 1;
      });
      if (O.test(b)) return f.filter(b, d, !c);
      b = f.filter(b, d);
    }

    return f.grep(a, function (a, d) {
      return f.inArray(a, b) >= 0 === c;
    });
  }

  function S(a) {
    return !a || !a.parentNode || a.parentNode.nodeType === 11;
  }

  function K() {
    return !0;
  }

  function J() {
    return !1;
  }

  function n(a, b, c) {
    var d = b + "defer",
        e = b + "queue",
        g = b + "mark",
        h = f._data(a, d);

    h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
      !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire());
    }, 0);
  }

  function m(a) {
    for (var b in a) {
      if (b === "data" && f.isEmptyObject(a[b])) continue;
      if (b !== "toJSON") return !1;
    }

    return !0;
  }

  function l(a, c, d) {
    if (d === b && a.nodeType === 1) {
      var e = "data-" + c.replace(k, "-$1").toLowerCase();
      d = a.getAttribute(e);

      if (typeof d == "string") {
        try {
          d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d;
        } catch (g) {}

        f.data(a, c, d);
      } else d = b;
    }

    return d;
  }

  function h(a) {
    var b = g[a] = {},
        c,
        d;
    a = a.split(/\s+/);

    for (c = 0, d = a.length; c < d; c++) {
      b[a[c]] = !0;
    }

    return b;
  }

  var c = a.document,
      d = a.navigator,
      e = a.location,
      f = function () {
    function J() {
      if (!e.isReady) {
        try {
          c.documentElement.doScroll("left");
        } catch (a) {
          setTimeout(J, 1);
          return;
        }

        e.ready();
      }
    }

    var e = function e(a, b) {
      return new e.fn.init(a, b, h);
    },
        f = a.jQuery,
        g = a.$,
        h,
        i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        j = /\S/,
        k = /^\s+/,
        l = /\s+$/,
        m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        n = /^[\],:{}\s]*$/,
        o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        q = /(?:^|:|,)(?:\s*\[)+/g,
        r = /(webkit)[ \/]([\w.]+)/,
        s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        t = /(msie) ([\w.]+)/,
        u = /(mozilla)(?:.*? rv:([\w.]+))?/,
        v = /-([a-z]|[0-9])/ig,
        w = /^-ms-/,
        x = function x(a, b) {
      return (b + "").toUpperCase();
    },
        y = d.userAgent,
        z,
        A,
        _B2,
        C = Object.prototype.toString,
        D = Object.prototype.hasOwnProperty,
        E = Array.prototype.push,
        F = Array.prototype.slice,
        G = String.prototype.trim,
        H = Array.prototype.indexOf,
        I = {};

    e.fn = e.prototype = {
      constructor: e,
      init: function init(a, d, f) {
        var g, h, j, k;
        if (!a) return this;

        if (a.nodeType) {
          this.context = this[0] = a, this.length = 1;
          return this;
        }

        if (a === "body" && !d && c.body) {
          this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
          return this;
        }

        if (typeof a == "string") {
          a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];

          if (g && (g[1] || !d)) {
            if (g[1]) {
              d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
              return e.merge(this, a);
            }

            h = c.getElementById(g[2]);

            if (h && h.parentNode) {
              if (h.id !== g[2]) return f.find(a);
              this.length = 1, this[0] = h;
            }

            this.context = c, this.selector = a;
            return this;
          }

          return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a);
        }

        if (e.isFunction(a)) return f.ready(a);
        a.selector !== b && (this.selector = a.selector, this.context = a.context);
        return e.makeArray(a, this);
      },
      selector: "",
      jquery: "1.7.2",
      length: 0,
      size: function size() {
        return this.length;
      },
      toArray: function toArray() {
        return F.call(this, 0);
      },
      get: function get(a) {
        return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a];
      },
      pushStack: function pushStack(a, b, c) {
        var d = this.constructor();
        e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
        return d;
      },
      each: function each(a, b) {
        return e.each(this, a, b);
      },
      ready: function ready(a) {
        e.bindReady(), A.add(a);
        return this;
      },
      eq: function eq(a) {
        a = +a;
        return a === -1 ? this.slice(a) : this.slice(a, a + 1);
      },
      first: function first() {
        return this.eq(0);
      },
      last: function last() {
        return this.eq(-1);
      },
      slice: function slice() {
        return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","));
      },
      map: function map(a) {
        return this.pushStack(e.map(this, function (b, c) {
          return a.call(b, c, b);
        }));
      },
      end: function end() {
        return this.prevObject || this.constructor(null);
      },
      push: E,
      sort: [].sort,
      splice: [].splice
    }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
      var a,
          c,
          d,
          f,
          g,
          h,
          i = arguments[0] || {},
          j = 1,
          k = arguments.length,
          l = !1;
      typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), _typeof(i) != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);

      for (; j < k; j++) {
        if ((a = arguments[j]) != null) for (c in a) {
          d = i[c], f = a[c];
          if (i === f) continue;
          l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f);
        }
      }

      return i;
    }, e.extend({
      noConflict: function noConflict(b) {
        a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
        return e;
      },
      isReady: !1,
      readyWait: 1,
      holdReady: function holdReady(a) {
        a ? e.readyWait++ : e.ready(!0);
      },
      ready: function ready(a) {
        if (a === !0 && ! --e.readyWait || a !== !0 && !e.isReady) {
          if (!c.body) return setTimeout(e.ready, 1);
          e.isReady = !0;
          if (a !== !0 && --e.readyWait > 0) return;
          A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready");
        }
      },
      bindReady: function bindReady() {
        if (!A) {
          A = e.Callbacks("once memory");
          if (c.readyState === "complete") return setTimeout(e.ready, 1);
          if (c.addEventListener) c.addEventListener("DOMContentLoaded", _B2, !1), a.addEventListener("load", e.ready, !1);else if (c.attachEvent) {
            c.attachEvent("onreadystatechange", _B2), a.attachEvent("onload", e.ready);
            var b = !1;

            try {
              b = a.frameElement == null;
            } catch (d) {}

            c.documentElement.doScroll && b && J();
          }
        }
      },
      isFunction: function isFunction(a) {
        return e.type(a) === "function";
      },
      isArray: Array.isArray || function (a) {
        return e.type(a) === "array";
      },
      isWindow: function isWindow(a) {
        return a != null && a == a.window;
      },
      isNumeric: function isNumeric(a) {
        return !isNaN(parseFloat(a)) && isFinite(a);
      },
      type: function type(a) {
        return a == null ? String(a) : I[C.call(a)] || "object";
      },
      isPlainObject: function isPlainObject(a) {
        if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;

        try {
          if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1;
        } catch (c) {
          return !1;
        }

        var d;

        for (d in a) {
          ;
        }

        return d === b || D.call(a, d);
      },
      isEmptyObject: function isEmptyObject(a) {
        for (var b in a) {
          return !1;
        }

        return !0;
      },
      error: function error(a) {
        throw new Error(a);
      },
      parseJSON: function parseJSON(b) {
        if (typeof b != "string" || !b) return null;
        b = e.trim(b);
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
        if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return new Function("return " + b)();
        e.error("Invalid JSON: " + b);
      },
      parseXML: function parseXML(c) {
        if (typeof c != "string" || !c) return null;
        var d, f;

        try {
          a.DOMParser ? (f = new DOMParser(), d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c));
        } catch (g) {
          d = b;
        }

        (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
        return d;
      },
      noop: function noop() {},
      globalEval: function globalEval(b) {
        b && j.test(b) && (a.execScript || function (b) {
          a.eval.call(a, b);
        })(b);
      },
      camelCase: function camelCase(a) {
        return a.replace(w, "ms-").replace(v, x);
      },
      nodeName: function nodeName(a, b) {
        return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();
      },
      each: function each(a, c, d) {
        var f,
            g = 0,
            h = a.length,
            i = h === b || e.isFunction(a);

        if (d) {
          if (i) {
            for (f in a) {
              if (c.apply(a[f], d) === !1) break;
            }
          } else for (; g < h;) {
            if (c.apply(a[g++], d) === !1) break;
          }
        } else if (i) {
          for (f in a) {
            if (c.call(a[f], f, a[f]) === !1) break;
          }
        } else for (; g < h;) {
          if (c.call(a[g], g, a[g++]) === !1) break;
        }

        return a;
      },
      trim: G ? function (a) {
        return a == null ? "" : G.call(a);
      } : function (a) {
        return a == null ? "" : (a + "").replace(k, "").replace(l, "");
      },
      makeArray: function makeArray(a, b) {
        var c = b || [];

        if (a != null) {
          var d = e.type(a);
          a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a);
        }

        return c;
      },
      inArray: function inArray(a, b, c) {
        var d;

        if (b) {
          if (H) return H.call(b, a, c);
          d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;

          for (; c < d; c++) {
            if (c in b && b[c] === a) return c;
          }
        }

        return -1;
      },
      merge: function merge(a, c) {
        var d = a.length,
            e = 0;
        if (typeof c.length == "number") for (var f = c.length; e < f; e++) {
          a[d++] = c[e];
        } else while (c[e] !== b) {
          a[d++] = c[e++];
        }
        a.length = d;
        return a;
      },
      grep: function grep(a, b, c) {
        var d = [],
            e;
        c = !!c;

        for (var f = 0, g = a.length; f < g; f++) {
          e = !!b(a[f], f), c !== e && d.push(a[f]);
        }

        return d;
      },
      map: function map(a, c, d) {
        var f,
            g,
            h = [],
            i = 0,
            j = a.length,
            k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
        if (k) for (; i < j; i++) {
          f = c(a[i], i, d), f != null && (h[h.length] = f);
        } else for (g in a) {
          f = c(a[g], g, d), f != null && (h[h.length] = f);
        }
        return h.concat.apply([], h);
      },
      guid: 1,
      proxy: function proxy(a, c) {
        if (typeof c == "string") {
          var d = a[c];
          c = a, a = d;
        }

        if (!e.isFunction(a)) return b;

        var f = F.call(arguments, 2),
            g = function g() {
          return a.apply(c, f.concat(F.call(arguments)));
        };

        g.guid = a.guid = a.guid || g.guid || e.guid++;
        return g;
      },
      access: function access(a, c, d, f, g, h, i) {
        var j,
            k = d == null,
            l = 0,
            m = a.length;

        if (d && _typeof(d) == "object") {
          for (l in d) {
            e.access(a, c, l, d[l], 1, h, f);
          }

          g = 1;
        } else if (f !== b) {
          j = i === b && e.isFunction(f), k && (j ? (j = c, c = function c(a, b, _c) {
            return j.call(e(a), _c);
          }) : (c.call(a, f), c = null));
          if (c) for (; l < m; l++) {
            c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
          }
          g = 1;
        }

        return g ? a : k ? c.call(a) : m ? c(a[0], d) : h;
      },
      now: function now() {
        return new Date().getTime();
      },
      uaMatch: function uaMatch(a) {
        a = a.toLowerCase();
        var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
        return {
          browser: b[1] || "",
          version: b[2] || "0"
        };
      },
      sub: function sub() {
        function a(b, c) {
          return new a.fn.init(b, c);
        }

        e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
          f && f instanceof e && !(f instanceof a) && (f = a(f));
          return e.fn.init.call(this, d, f, b);
        }, a.fn.init.prototype = a.fn;
        var b = a(c);
        return a;
      },
      browser: {}
    }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
      I["[object " + b + "]"] = b.toLowerCase();
    }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test("Â ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? _B2 = function B() {
      c.removeEventListener("DOMContentLoaded", _B2, !1), e.ready();
    } : c.attachEvent && (_B2 = function _B() {
      c.readyState === "complete" && (c.detachEvent("onreadystatechange", _B2), e.ready());
    });
    return e;
  }(),
      g = {};

  f.Callbacks = function (a) {
    a = a ? g[a] || h(a) : {};

    var c = [],
        d = [],
        e,
        i,
        j,
        k,
        l,
        m,
        n = function n(b) {
      var d, e, g, h, i;

      for (d = 0, e = b.length; d < e; d++) {
        g = b[d], h = f.type(g), h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g);
      }
    },
        o = function o(b, f) {
      f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length;

      for (; c && m < l; m++) {
        if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
          e = !0;
          break;
        }
      }

      j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])));
    },
        p = {
      add: function add() {
        if (c) {
          var a = c.length;
          n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]));
        }

        return this;
      },
      remove: function remove() {
        if (c) {
          var b = arguments,
              d = 0,
              e = b.length;

          for (; d < e; d++) {
            for (var f = 0; f < c.length; f++) {
              if (b[d] === c[f]) {
                j && f <= l && (l--, f <= m && m--), c.splice(f--, 1);
                if (a.unique) break;
              }
            }
          }
        }

        return this;
      },
      has: function has(a) {
        if (c) {
          var b = 0,
              d = c.length;

          for (; b < d; b++) {
            if (a === c[b]) return !0;
          }
        }

        return !1;
      },
      empty: function empty() {
        c = [];
        return this;
      },
      disable: function disable() {
        c = d = e = b;
        return this;
      },
      disabled: function disabled() {
        return !c;
      },
      lock: function lock() {
        d = b, (!e || e === !0) && p.disable();
        return this;
      },
      locked: function locked() {
        return !d;
      },
      fireWith: function fireWith(b, c) {
        d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
        return this;
      },
      fire: function fire() {
        p.fireWith(this, arguments);
        return this;
      },
      fired: function fired() {
        return !!i;
      }
    };

    return p;
  };

  var i = [].slice;
  f.extend({
    Deferred: function Deferred(a) {
      var b = f.Callbacks("once memory"),
          c = f.Callbacks("once memory"),
          d = f.Callbacks("memory"),
          e = "pending",
          g = {
        resolve: b,
        reject: c,
        notify: d
      },
          h = {
        done: b.add,
        fail: c.add,
        progress: d.add,
        state: function state() {
          return e;
        },
        isResolved: b.fired,
        isRejected: c.fired,
        then: function then(a, b, c) {
          i.done(a).fail(b).progress(c);
          return this;
        },
        always: function always() {
          i.done.apply(i, arguments).fail.apply(i, arguments);
          return this;
        },
        pipe: function pipe(a, b, c) {
          return f.Deferred(function (d) {
            f.each({
              done: [a, "resolve"],
              fail: [b, "reject"],
              progress: [c, "notify"]
            }, function (a, b) {
              var c = b[0],
                  e = b[1],
                  g;
              f.isFunction(c) ? i[a](function () {
                g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g]);
              }) : i[a](d[e]);
            });
          }).promise();
        },
        promise: function promise(a) {
          if (a == null) a = h;else for (var b in h) {
            a[b] = h[b];
          }
          return a;
        }
      },
          i = h.promise({}),
          j;

      for (j in g) {
        i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
      }

      i.done(function () {
        e = "resolved";
      }, c.disable, d.lock).fail(function () {
        e = "rejected";
      }, b.disable, d.lock), a && a.call(i, i);
      return i;
    },
    when: function when(a) {
      function m(a) {
        return function (b) {
          e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e);
        };
      }

      function l(a) {
        return function (c) {
          b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b);
        };
      }

      var b = i.call(arguments, 0),
          c = 0,
          d = b.length,
          e = Array(d),
          g = d,
          h = d,
          j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
          k = j.promise();

      if (d > 1) {
        for (; c < d; c++) {
          b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
        }

        g || j.resolveWith(j, b);
      } else j !== a && j.resolveWith(j, d ? [a] : []);

      return k;
    }
  }), f.support = function () {
    var b,
        d,
        e,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p = c.createElement("div"),
        q = c.documentElement;
    p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0];
    if (!d || !d.length || !e) return {};
    g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {
      leadingWhitespace: p.firstChild.nodeType === 3,
      tbody: !p.getElementsByTagName("tbody").length,
      htmlSerialize: !!p.getElementsByTagName("link").length,
      style: /top/.test(e.getAttribute("style")),
      hrefNormalized: e.getAttribute("href") === "/a",
      opacity: /^0.55/.test(e.style.opacity),
      cssFloat: !!e.style.cssFloat,
      checkOn: i.value === "on",
      optSelected: h.selected,
      getSetAttribute: p.className !== "t",
      enctype: !!c.createElement("form").enctype,
      html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
      submitBubbles: !0,
      changeBubbles: !0,
      focusinBubbles: !1,
      deleteExpando: !0,
      noCloneEvent: !0,
      inlineBlockNeedsLayout: !1,
      shrinkWrapBlocks: !1,
      reliableMarginRight: !0,
      pixelMargin: !0
    }, f.boxModel = b.boxModel = c.compatMode === "CSS1Compat", i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;

    try {
      delete p.test;
    } catch (r) {
      b.deleteExpando = !1;
    }

    !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function () {
      b.noCloneEvent = !1;
    }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p);
    if (p.attachEvent) for (n in {
      submit: 1,
      change: 1,
      focusin: 1
    }) {
      m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = typeof p[m] == "function"), b[n + "Bubbles"] = o;
    }
    j.removeChild(p), j = g = h = p = i = null, f(function () {
      var d,
          e,
          g,
          h,
          i,
          j,
          l,
          m,
          n,
          q,
          r,
          s,
          t,
          u = c.getElementsByTagName("body")[0];
      !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = k[0].offsetHeight === 0, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && k[0].offsetHeight === 0, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {
        marginRight: 0
      }).marginRight, 10) || 0) === 0), typeof p.style.zoom != "undefined" && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = p.offsetWidth !== 3), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
        doesNotAddBorder: g.offsetTop !== 5,
        doesAddBorderForTableAndCells: i.offsetTop === 5
      }, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = (a.getComputedStyle(p, null) || {
        marginTop: 0
      }).marginTop !== "1%"), typeof d.style.zoom != "undefined" && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j));
    });
    return b;
  }();
  var j = /^(?:\{.*\}|\[.*\])$/,
      k = /([A-Z])/g;
  f.extend({
    cache: {},
    uuid: 0,
    expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
    noData: {
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: !0
    },
    hasData: function hasData(a) {
      a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
      return !!a && !m(a);
    },
    data: function data(a, c, d, e) {
      if (!!f.acceptData(a)) {
        var g,
            h,
            i,
            j = f.expando,
            k = typeof c == "string",
            l = a.nodeType,
            m = l ? f.cache : a,
            n = l ? a[j] : a[j] && j,
            o = c === "events";
        if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
        n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
        if (_typeof(c) == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
        g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
        if (o && !h[c]) return g.events;
        k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
        return i;
      }
    },
    removeData: function removeData(a, b, c) {
      if (!!f.acceptData(a)) {
        var d,
            e,
            g,
            h = f.expando,
            i = a.nodeType,
            j = i ? f.cache : a,
            k = i ? a[h] : h;
        if (!j[k]) return;

        if (b) {
          d = c ? j[k] : j[k].data;

          if (d) {
            f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));

            for (e = 0, g = b.length; e < g; e++) {
              delete d[b[e]];
            }

            if (!(c ? m : f.isEmptyObject)(d)) return;
          }
        }

        if (!c) {
          delete j[k].data;
          if (!m(j[k])) return;
        }

        f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null);
      }
    },
    _data: function _data(a, b, c) {
      return f.data(a, b, c, !0);
    },
    acceptData: function acceptData(a) {
      if (a.nodeName) {
        var b = f.noData[a.nodeName.toLowerCase()];
        if (b) return b !== !0 && a.getAttribute("classid") === b;
      }

      return !0;
    }
  }), f.fn.extend({
    data: function data(a, c) {
      var d,
          e,
          g,
          h,
          i,
          j = this[0],
          k = 0,
          m = null;

      if (a === b) {
        if (this.length) {
          m = f.data(j);

          if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
            g = j.attributes;

            for (i = g.length; k < i; k++) {
              h = g[k].name, h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
            }

            f._data(j, "parsedAttrs", !0);
          }
        }

        return m;
      }

      if (_typeof(a) == "object") return this.each(function () {
        f.data(this, a);
      });
      d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!";
      return f.access(this, function (c) {
        if (c === b) {
          m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m));
          return m === b && d[1] ? this.data(d[0]) : m;
        }

        d[1] = c, this.each(function () {
          var b = f(this);
          b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d);
        });
      }, null, c, arguments.length > 1, null, !1);
    },
    removeData: function removeData(a) {
      return this.each(function () {
        f.removeData(this, a);
      });
    }
  }), f.extend({
    _mark: function _mark(a, b) {
      a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1));
    },
    _unmark: function _unmark(a, b, c) {
      a !== !0 && (c = b, b = a, a = !1);

      if (b) {
        c = c || "fx";
        var d = c + "mark",
            e = a ? 0 : (f._data(b, d) || 1) - 1;
        e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"));
      }
    },
    queue: function queue(a, b, c) {
      var d;

      if (a) {
        b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
        return d || [];
      }
    },
    dequeue: function dequeue(a, b) {
      b = b || "fx";
      var c = f.queue(a, b),
          d = c.shift(),
          e = {};
      d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
        f.dequeue(a, b);
      }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"));
    }
  }), f.fn.extend({
    queue: function queue(a, c) {
      var d = 2;
      typeof a != "string" && (c = a, a = "fx", d--);
      if (arguments.length < d) return f.queue(this[0], a);
      return c === b ? this : this.each(function () {
        var b = f.queue(this, a, c);
        a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a);
      });
    },
    dequeue: function dequeue(a) {
      return this.each(function () {
        f.dequeue(this, a);
      });
    },
    delay: function delay(a, b) {
      a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
      return this.queue(b, function (b, c) {
        var d = setTimeout(b, a);

        c.stop = function () {
          clearTimeout(d);
        };
      });
    },
    clearQueue: function clearQueue(a) {
      return this.queue(a || "fx", []);
    },
    promise: function promise(a, c) {
      function m() {
        --h || d.resolveWith(e, [e]);
      }

      typeof a != "string" && (c = a, a = b), a = a || "fx";
      var d = f.Deferred(),
          e = this,
          g = e.length,
          h = 1,
          i = a + "defer",
          j = a + "queue",
          k = a + "mark",
          l;

      while (g--) {
        if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
      }

      m();
      return d.promise(c);
    }
  });
  var o = /[\n\t\r]/g,
      p = /\s+/,
      q = /\r/g,
      r = /^(?:button|input)$/i,
      s = /^(?:button|input|object|select|textarea)$/i,
      t = /^a(?:rea)?$/i,
      u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
      v = f.support.getSetAttribute,
      w,
      x,
      y;
  f.fn.extend({
    attr: function attr(a, b) {
      return f.access(this, f.attr, a, b, arguments.length > 1);
    },
    removeAttr: function removeAttr(a) {
      return this.each(function () {
        f.removeAttr(this, a);
      });
    },
    prop: function prop(a, b) {
      return f.access(this, f.prop, a, b, arguments.length > 1);
    },
    removeProp: function removeProp(a) {
      a = f.propFix[a] || a;
      return this.each(function () {
        try {
          this[a] = b, delete this[a];
        } catch (c) {}
      });
    },
    addClass: function addClass(a) {
      var b, c, d, e, g, h, i;
      if (f.isFunction(a)) return this.each(function (b) {
        f(this).addClass(a.call(this, b, this.className));
      });

      if (a && typeof a == "string") {
        b = a.split(p);

        for (c = 0, d = this.length; c < d; c++) {
          e = this[c];
          if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a;else {
            g = " " + e.className + " ";

            for (h = 0, i = b.length; h < i; h++) {
              ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
            }

            e.className = f.trim(g);
          }
        }
      }

      return this;
    },
    removeClass: function removeClass(a) {
      var c, d, e, g, h, i, j;
      if (f.isFunction(a)) return this.each(function (b) {
        f(this).removeClass(a.call(this, b, this.className));
      });

      if (a && typeof a == "string" || a === b) {
        c = (a || "").split(p);

        for (d = 0, e = this.length; d < e; d++) {
          g = this[d];
          if (g.nodeType === 1 && g.className) if (a) {
            h = (" " + g.className + " ").replace(o, " ");

            for (i = 0, j = c.length; i < j; i++) {
              h = h.replace(" " + c[i] + " ", " ");
            }

            g.className = f.trim(h);
          } else g.className = "";
        }
      }

      return this;
    },
    toggleClass: function toggleClass(a, b) {
      var c = _typeof(a),
          d = typeof b == "boolean";

      if (f.isFunction(a)) return this.each(function (c) {
        f(this).toggleClass(a.call(this, c, this.className, b), b);
      });
      return this.each(function () {
        if (c === "string") {
          var e,
              g = 0,
              h = f(this),
              i = b,
              j = a.split(p);

          while (e = j[g++]) {
            i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e);
          }
        } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || "";
      });
    },
    hasClass: function hasClass(a) {
      var b = " " + a + " ",
          c = 0,
          d = this.length;

      for (; c < d; c++) {
        if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
      }

      return !1;
    },
    val: function val(a) {
      var c,
          d,
          e,
          g = this[0];
      {
        if (!!arguments.length) {
          e = f.isFunction(a);
          return this.each(function (d) {
            var g = f(this),
                h;

            if (this.nodeType === 1) {
              e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                return a == null ? "" : a + "";
              })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
              if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h;
            }
          });
        }

        if (g) {
          c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
          if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
          d = g.value;
          return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d;
        }
      }
    }
  }), f.extend({
    valHooks: {
      option: {
        get: function get(a) {
          var b = a.attributes.value;
          return !b || b.specified ? a.value : a.text;
        }
      },
      select: {
        get: function get(a) {
          var b,
              c,
              d,
              e,
              g = a.selectedIndex,
              h = [],
              i = a.options,
              j = a.type === "select-one";
          if (g < 0) return null;
          c = j ? g : 0, d = j ? g + 1 : i.length;

          for (; c < d; c++) {
            e = i[c];

            if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
              b = f(e).val();
              if (j) return b;
              h.push(b);
            }
          }

          if (j && !h.length && i.length) return f(i[g]).val();
          return h;
        },
        set: function set(a, b) {
          var c = f.makeArray(b);
          f(a).find("option").each(function () {
            this.selected = f.inArray(f(this).val(), c) >= 0;
          }), c.length || (a.selectedIndex = -1);
          return c;
        }
      }
    },
    attrFn: {
      val: !0,
      css: !0,
      html: !0,
      text: !0,
      data: !0,
      width: !0,
      height: !0,
      offset: !0
    },
    attr: function attr(a, c, d, e) {
      var g,
          h,
          i,
          j = a.nodeType;

      if (!!a && j !== 3 && j !== 8 && j !== 2) {
        if (e && c in f.attrFn) return f(a)[c](d);
        if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
        i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));

        if (d !== b) {
          if (d === null) {
            f.removeAttr(a, c);
            return;
          }

          if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
          a.setAttribute(c, "" + d);
          return d;
        }

        if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
        g = a.getAttribute(c);
        return g === null ? b : g;
      }
    },
    removeAttr: function removeAttr(a, b) {
      var c,
          d,
          e,
          g,
          h,
          i = 0;

      if (b && a.nodeType === 1) {
        d = b.toLowerCase().split(p), g = d.length;

        for (; i < g; i++) {
          e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1));
        }
      }
    },
    attrHooks: {
      type: {
        set: function set(a, b) {
          if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
            var c = a.value;
            a.setAttribute("type", b), c && (a.value = c);
            return b;
          }
        }
      },
      value: {
        get: function get(a, b) {
          if (w && f.nodeName(a, "button")) return w.get(a, b);
          return b in a ? a.value : null;
        },
        set: function set(a, b, c) {
          if (w && f.nodeName(a, "button")) return w.set(a, b, c);
          a.value = b;
        }
      }
    },
    propFix: {
      tabindex: "tabIndex",
      readonly: "readOnly",
      "for": "htmlFor",
      "class": "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable"
    },
    prop: function prop(a, c, d) {
      var e,
          g,
          h,
          i = a.nodeType;

      if (!!a && i !== 3 && i !== 8 && i !== 2) {
        h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
        return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c];
      }
    },
    propHooks: {
      tabIndex: {
        get: function get(a) {
          var c = a.getAttributeNode("tabindex");
          return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b;
        }
      }
    }
  }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
    get: function get(a, c) {
      var d,
          e = f.prop(a, c);
      return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b;
    },
    set: function set(a, b, c) {
      var d;
      b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
      return c;
    }
  }, v || (y = {
    name: !0,
    id: !0,
    coords: !0
  }, w = f.valHooks.button = {
    get: function get(a, c) {
      var d;
      d = a.getAttributeNode(c);
      return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b;
    },
    set: function set(a, b, d) {
      var e = a.getAttributeNode(d);
      e || (e = c.createAttribute(d), a.setAttributeNode(e));
      return e.nodeValue = b + "";
    }
  }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
    f.attrHooks[b] = f.extend(f.attrHooks[b], {
      set: function set(a, c) {
        if (c === "") {
          a.setAttribute(b, "auto");
          return c;
        }
      }
    });
  }), f.attrHooks.contenteditable = {
    get: w.get,
    set: function set(a, b, c) {
      b === "" && (b = "false"), w.set(a, b, c);
    }
  }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
    f.attrHooks[c] = f.extend(f.attrHooks[c], {
      get: function get(a) {
        var d = a.getAttribute(c, 2);
        return d === null ? b : d;
      }
    });
  }), f.support.style || (f.attrHooks.style = {
    get: function get(a) {
      return a.style.cssText.toLowerCase() || b;
    },
    set: function set(a, b) {
      return a.style.cssText = "" + b;
    }
  }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
    get: function get(a) {
      var b = a.parentNode;
      b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
      return null;
    }
  })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
    f.valHooks[this] = {
      get: function get(a) {
        return a.getAttribute("value") === null ? "on" : a.value;
      }
    };
  }), f.each(["radio", "checkbox"], function () {
    f.valHooks[this] = f.extend(f.valHooks[this], {
      set: function set(a, b) {
        if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0;
      }
    });
  });

  var z = /^(?:textarea|input|select)$/i,
      A = /^([^\.]*)?(?:\.(.+))?$/,
      B = /(?:^|\s)hover(\.\S+)?\b/,
      C = /^key/,
      D = /^(?:mouse|contextmenu)|click/,
      E = /^(?:focusinfocus|focusoutblur)$/,
      F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
      G = function G(a) {
    var b = F.exec(a);
    b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
    return b;
  },
      H = function H(a, b) {
    var c = a.attributes || {};
    return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value));
  },
      I = function I(a) {
    return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1");
  };

  f.event = {
    add: function add(a, c, d, e, g) {
      var h, _i, j, k, l, m, n, o, p, q, r, s;

      if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
        d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), _i = h.handle, _i || (h.handle = _i = function i(a) {
          return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(_i.elem, arguments) : b;
        }, _i.elem = a), c = f.trim(I(c)).split(" ");

        for (k = 0; k < c.length; k++) {
          l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
            type: m,
            origType: l[1],
            data: e,
            handler: d,
            guid: d.guid,
            selector: g,
            quick: g && G(g),
            namespace: n.join(".")
          }, p), r = j[m];

          if (!r) {
            r = j[m] = [], r.delegateCount = 0;
            if (!s.setup || s.setup.call(a, e, n, _i) === !1) a.addEventListener ? a.addEventListener(m, _i, !1) : a.attachEvent && a.attachEvent("on" + m, _i);
          }

          s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0;
        }

        a = null;
      }
    },
    global: {},
    remove: function remove(a, b, c, d, e) {
      var g = f.hasData(a) && f._data(a),
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s;

      if (!!g && !!(o = g.events)) {
        b = f.trim(I(b || "")).split(" ");

        for (h = 0; h < b.length; h++) {
          i = A.exec(b[h]) || [], j = k = i[1], l = i[2];

          if (!j) {
            for (j in o) {
              f.event.remove(a, j + b[h], c, d, !0);
            }

            continue;
          }

          p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

          for (n = 0; n < r.length; n++) {
            s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
          }

          r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j]);
        }

        f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0));
      }
    },
    customEvent: {
      getData: !0,
      setData: !0,
      changeData: !0
    },
    trigger: function trigger(c, d, e, g) {
      if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
        var h = c.type || c,
            i = [],
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s;
        if (E.test(h + f.event.triggered)) return;
        h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
        if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
        c = _typeof(c) == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";

        if (!e) {
          j = f.cache;

          for (l in j) {
            j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
          }

          return;
        }

        c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
        if (p.trigger && p.trigger.apply(e, d) === !1) return;
        r = [[e, p.bindType || h]];

        if (!g && !p.noBubble && !f.isWindow(e)) {
          s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;

          for (; m; m = m.parentNode) {
            r.push([m, s]), n = m;
          }

          n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s]);
        }

        for (l = 0; l < r.length && !c.isPropagationStopped(); l++) {
          m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
        }

        c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
        return c.result;
      }
    },
    dispatch: function dispatch(c) {
      c = f.event.fix(c || a.event);
      var d = (f._data(this, "events") || {})[c.type] || [],
          e = d.delegateCount,
          g = [].slice.call(arguments, 0),
          h = !c.exclusive && !c.namespace,
          i = f.event.special[c.type] || {},
          j = [],
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u;
      g[0] = c, c.delegateTarget = this;

      if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
        if (e && (!c.button || c.type !== "click")) {
          n = f(this), n.context = this.ownerDocument || this;

          for (m = c.target; m != this; m = m.parentNode || this) {
            if (m.disabled !== !0) {
              p = {}, r = [], n[0] = m;

              for (k = 0; k < e; k++) {
                s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
              }

              r.length && j.push({
                elem: m,
                matches: r
              });
            }
          }
        }

        d.length > e && j.push({
          elem: this,
          matches: d.slice(e)
        });

        for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
          q = j[k], c.currentTarget = q.elem;

          for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
            s = q.matches[l];
            if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation()));
          }
        }

        i.postDispatch && i.postDispatch.call(this, c);
        return c.result;
      }
    },
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function filter(a, b) {
        a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
        return a;
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function filter(a, d) {
        var e,
            f,
            g,
            h = d.button,
            i = d.fromElement;
        a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
        return a;
      }
    },
    fix: function fix(a) {
      if (a[f.expando]) return a;
      var d,
          e,
          g = a,
          h = f.event.fixHooks[a.type] || {},
          i = h.props ? this.props.concat(h.props) : this.props;
      a = f.Event(g);

      for (d = i.length; d;) {
        e = i[--d], a[e] = g[e];
      }

      a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
      return h.filter ? h.filter(a, g) : a;
    },
    special: {
      ready: {
        setup: f.bindReady
      },
      load: {
        noBubble: !0
      },
      focus: {
        delegateType: "focusin"
      },
      blur: {
        delegateType: "focusout"
      },
      beforeunload: {
        setup: function setup(a, b, c) {
          f.isWindow(this) && (this.onbeforeunload = c);
        },
        teardown: function teardown(a, b) {
          this.onbeforeunload === b && (this.onbeforeunload = null);
        }
      }
    },
    simulate: function simulate(a, b, c, d) {
      var e = f.extend(new f.Event(), c, {
        type: a,
        isSimulated: !0,
        originalEvent: {}
      });
      d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
    }
  }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1);
  } : function (a, b, c) {
    a.detachEvent && a.detachEvent("on" + b, c);
  }, f.Event = function (a, b) {
    if (!(this instanceof f.Event)) return new f.Event(a, b);
    a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0;
  }, f.Event.prototype = {
    preventDefault: function preventDefault() {
      this.isDefaultPrevented = K;
      var a = this.originalEvent;
      !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
    },
    stopPropagation: function stopPropagation() {
      this.isPropagationStopped = K;
      var a = this.originalEvent;
      !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      this.isImmediatePropagationStopped = K, this.stopPropagation();
    },
    isDefaultPrevented: J,
    isPropagationStopped: J,
    isImmediatePropagationStopped: J
  }, f.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }, function (a, b) {
    f.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function handle(a) {
        var c = this,
            d = a.relatedTarget,
            e = a.handleObj,
            g = e.selector,
            h;
        if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
        return h;
      }
    };
  }), f.support.submitBubbles || (f.event.special.submit = {
    setup: function setup() {
      if (f.nodeName(this, "form")) return !1;
      f.event.add(this, "click._submit keypress._submit", function (a) {
        var c = a.target,
            d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
        d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
          a._submit_bubble = !0;
        }), d._submit_attached = !0);
      });
    },
    postDispatch: function postDispatch(a) {
      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0));
    },
    teardown: function teardown() {
      if (f.nodeName(this, "form")) return !1;
      f.event.remove(this, "._submit");
    }
  }), f.support.changeBubbles || (f.event.special.change = {
    setup: function setup() {
      if (z.test(this.nodeName)) {
        if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
          a.originalEvent.propertyName === "checked" && (this._just_changed = !0);
        }), f.event.add(this, "click._change", function (a) {
          this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0));
        });
        return !1;
      }

      f.event.add(this, "beforeactivate._change", function (a) {
        var b = a.target;
        z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
          this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0);
        }), b._change_attached = !0);
      });
    },
    handle: function handle(a) {
      var b = a.target;
      if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments);
    },
    teardown: function teardown() {
      f.event.remove(this, "._change");
      return z.test(this.nodeName);
    }
  }), f.support.focusinBubbles || f.each({
    focus: "focusin",
    blur: "focusout"
  }, function (a, b) {
    var d = 0,
        e = function e(a) {
      f.event.simulate(b, a.target, f.event.fix(a), !0);
    };

    f.event.special[b] = {
      setup: function setup() {
        d++ === 0 && c.addEventListener(a, e, !0);
      },
      teardown: function teardown() {
        --d === 0 && c.removeEventListener(a, e, !0);
      }
    };
  }), f.fn.extend({
    on: function on(a, c, d, e, g) {
      var h, i;

      if (_typeof(a) == "object") {
        typeof c != "string" && (d = d || c, c = b);

        for (i in a) {
          this.on(i, c, d, a[i], g);
        }

        return this;
      }

      d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
      if (e === !1) e = J;else if (!e) return this;
      g === 1 && (h = e, e = function e(a) {
        f().off(a);
        return h.apply(this, arguments);
      }, e.guid = h.guid || (h.guid = f.guid++));
      return this.each(function () {
        f.event.add(this, a, e, d, c);
      });
    },
    one: function one(a, b, c, d) {
      return this.on(a, b, c, d, 1);
    },
    off: function off(a, c, d) {
      if (a && a.preventDefault && a.handleObj) {
        var e = a.handleObj;
        f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
        return this;
      }

      if (_typeof(a) == "object") {
        for (var g in a) {
          this.off(g, c, a[g]);
        }

        return this;
      }

      if (c === !1 || typeof c == "function") d = c, c = b;
      d === !1 && (d = J);
      return this.each(function () {
        f.event.remove(this, a, d, c);
      });
    },
    bind: function bind(a, b, c) {
      return this.on(a, null, b, c);
    },
    unbind: function unbind(a, b) {
      return this.off(a, null, b);
    },
    live: function live(a, b, c) {
      f(this.context).on(a, this.selector, b, c);
      return this;
    },
    die: function die(a, b) {
      f(this.context).off(a, this.selector || "**", b);
      return this;
    },
    delegate: function delegate(a, b, c, d) {
      return this.on(b, a, c, d);
    },
    undelegate: function undelegate(a, b, c) {
      return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c);
    },
    trigger: function trigger(a, b) {
      return this.each(function () {
        f.event.trigger(a, b, this);
      });
    },
    triggerHandler: function triggerHandler(a, b) {
      if (this[0]) return f.event.trigger(a, b, this[0], !0);
    },
    toggle: function toggle(a) {
      var b = arguments,
          c = a.guid || f.guid++,
          d = 0,
          e = function e(c) {
        var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
        f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
        return b[e].apply(this, arguments) || !1;
      };

      e.guid = c;

      while (d < b.length) {
        b[d++].guid = c;
      }

      return this.click(e);
    },
    hover: function hover(a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    }
  }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
    f.fn[b] = function (a, c) {
      c == null && (c = a, a = null);
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks);
  }), function () {
    function x(a, b, c, e, f, g) {
      for (var h = 0, i = e.length; h < i; h++) {
        var j = e[h];

        if (j) {
          var k = !1;
          j = j[a];

          while (j) {
            if (j[d] === c) {
              k = e[j.sizset];
              break;
            }

            if (j.nodeType === 1) {
              g || (j[d] = c, j.sizset = h);

              if (typeof b != "string") {
                if (j === b) {
                  k = !0;
                  break;
                }
              } else if (_m2.filter(b, [j]).length > 0) {
                k = j;
                break;
              }
            }

            j = j[a];
          }

          e[h] = k;
        }
      }
    }

    function w(a, b, c, e, f, g) {
      for (var h = 0, i = e.length; h < i; h++) {
        var j = e[h];

        if (j) {
          var k = !1;
          j = j[a];

          while (j) {
            if (j[d] === c) {
              k = e[j.sizset];
              break;
            }

            j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);

            if (j.nodeName.toLowerCase() === b) {
              k = j;
              break;
            }

            j = j[a];
          }

          e[h] = k;
        }
      }
    }

    var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        d = "sizcache" + (Math.random() + "").replace(".", ""),
        e = 0,
        g = Object.prototype.toString,
        h = !1,
        i = !0,
        j = /\\/g,
        k = /\r\n/g,
        l = /\W/;
    [0, 0].sort(function () {
      i = !1;
      return 0;
    });

    var _m2 = function m(b, d, e, f) {
      e = e || [], d = d || c;
      var h = d;
      if (d.nodeType !== 1 && d.nodeType !== 9) return [];
      if (!b || typeof b != "string") return e;

      var i,
          j,
          k,
          l,
          n,
          q,
          r,
          t,
          u = !0,
          v = _m2.isXML(d),
          w = [],
          x = b;

      do {
        a.exec(""), i = a.exec(x);

        if (i) {
          x = i[3], w.push(i[1]);

          if (i[2]) {
            l = i[3];
            break;
          }
        }
      } while (i);

      if (w.length > 1 && p.exec(b)) {
        if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);else {
          j = o.relative[w[0]] ? [d] : _m2(w.shift(), d);

          while (w.length) {
            b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f);
          }
        }
      } else {
        !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = _m2.find(w.shift(), d, v), d = n.expr ? _m2.filter(n.expr, n.set)[0] : n.set[0]);

        if (d) {
          n = f ? {
            expr: w.pop(),
            set: s(f)
          } : _m2.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? _m2.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;

          while (w.length) {
            q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v);
          }
        } else k = w = [];
      }
      k || (k = j), k || _m2.error(q || b);
      if (g.call(k) === "[object Array]") {
        if (!u) e.push.apply(e, k);else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) {
          k[t] && (k[t] === !0 || k[t].nodeType === 1 && _m2.contains(d, k[t])) && e.push(j[t]);
        } else for (t = 0; k[t] != null; t++) {
          k[t] && k[t].nodeType === 1 && e.push(j[t]);
        }
      } else s(k, e);
      l && (_m2(l, h, e, f), _m2.uniqueSort(e));
      return e;
    };

    _m2.uniqueSort = function (a) {
      if (u) {
        h = i, a.sort(u);
        if (h) for (var b = 1; b < a.length; b++) {
          a[b] === a[b - 1] && a.splice(b--, 1);
        }
      }

      return a;
    }, _m2.matches = function (a, b) {
      return _m2(a, null, null, b);
    }, _m2.matchesSelector = function (a, b) {
      return _m2(b, null, null, [a]).length > 0;
    }, _m2.find = function (a, b, c) {
      var d, e, f, g, h, i;
      if (!a) return [];

      for (e = 0, f = o.order.length; e < f; e++) {
        h = o.order[e];

        if (g = o.leftMatch[h].exec(a)) {
          i = g[1], g.splice(1, 1);

          if (i.substr(i.length - 1) !== "\\") {
            g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);

            if (d != null) {
              a = a.replace(o.match[h], "");
              break;
            }
          }
        }
      }

      d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
      return {
        set: d,
        expr: a
      };
    }, _m2.filter = function (a, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          n,
          p,
          q = a,
          r = [],
          s = c,
          t = c && c[0] && _m2.isXML(c[0]);

      while (a && c.length) {
        for (h in o.filter) {
          if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
            k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
            if (l.substr(l.length - 1) === "\\") continue;
            s === r && (r = []);

            if (o.preFilter[h]) {
              f = o.preFilter[h](f, s, d, r, e, t);
              if (!f) g = i = !0;else if (f === !0) continue;
            }

            if (f) for (n = 0; (j = s[n]) != null; n++) {
              j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
            }

            if (i !== b) {
              d || (s = r), a = a.replace(o.match[h], "");
              if (!g) return [];
              break;
            }
          }
        }

        if (a === q) if (g == null) _m2.error(a);else break;
        q = a;
      }

      return s;
    }, _m2.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a);
    };

    var n = _m2.getText = function (a) {
      var b,
          c,
          d = a.nodeType,
          e = "";

      if (d) {
        if (d === 1 || d === 9 || d === 11) {
          if (typeof a.textContent == "string") return a.textContent;
          if (typeof a.innerText == "string") return a.innerText.replace(k, "");

          for (a = a.firstChild; a; a = a.nextSibling) {
            e += n(a);
          }
        } else if (d === 3 || d === 4) return a.nodeValue;
      } else for (b = 0; c = a[b]; b++) {
        c.nodeType !== 8 && (e += n(c));
      }

      return e;
    },
        o = _m2.selectors = {
      order: ["ID", "NAME", "TAG"],
      match: {
        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
      },
      leftMatch: {},
      attrMap: {
        "class": "className",
        "for": "htmlFor"
      },
      attrHandle: {
        href: function href(a) {
          return a.getAttribute("href");
        },
        type: function type(a) {
          return a.getAttribute("type");
        }
      },
      relative: {
        "+": function _(a, b) {
          var c = typeof b == "string",
              d = c && !l.test(b),
              e = c && !d;
          d && (b = b.toLowerCase());

          for (var f = 0, g = a.length, h; f < g; f++) {
            if (h = a[f]) {
              while ((h = h.previousSibling) && h.nodeType !== 1) {
                ;
              }

              a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b;
            }
          }

          e && _m2.filter(b, a, !0);
        },
        ">": function _(a, b) {
          var c,
              d = typeof b == "string",
              e = 0,
              f = a.length;

          if (d && !l.test(b)) {
            b = b.toLowerCase();

            for (; e < f; e++) {
              c = a[e];

              if (c) {
                var g = c.parentNode;
                a[e] = g.nodeName.toLowerCase() === b ? g : !1;
              }
            }
          } else {
            for (; e < f; e++) {
              c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
            }

            d && _m2.filter(b, a, !0);
          }
        },
        "": function _(a, b, c) {
          var d,
              f = e++,
              g = x;
          typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c);
        },
        "~": function _(a, b, c) {
          var d,
              f = e++,
              g = x;
          typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c);
        }
      },
      find: {
        ID: function ID(a, b, c) {
          if (typeof b.getElementById != "undefined" && !c) {
            var d = b.getElementById(a[1]);
            return d && d.parentNode ? [d] : [];
          }
        },
        NAME: function NAME(a, b) {
          if (typeof b.getElementsByName != "undefined") {
            var c = [],
                d = b.getElementsByName(a[1]);

            for (var e = 0, f = d.length; e < f; e++) {
              d[e].getAttribute("name") === a[1] && c.push(d[e]);
            }

            return c.length === 0 ? null : c;
          }
        },
        TAG: function TAG(a, b) {
          if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1]);
        }
      },
      preFilter: {
        CLASS: function CLASS(a, b, c, d, e, f) {
          a = " " + a[1].replace(j, "") + " ";
          if (f) return a;

          for (var g = 0, h; (h = b[g]) != null; g++) {
            h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
          }

          return !1;
        },
        ID: function ID(a) {
          return a[1].replace(j, "");
        },
        TAG: function TAG(a, b) {
          return a[1].replace(j, "").toLowerCase();
        },
        CHILD: function CHILD(a) {
          if (a[1] === "nth") {
            a[2] || _m2.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
            var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
            a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0;
          } else a[2] && _m2.error(a[0]);

          a[0] = e++;
          return a;
        },
        ATTR: function ATTR(a, b, c, d, e, f) {
          var g = a[1] = a[1].replace(j, "");
          !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
          return a;
        },
        PSEUDO: function PSEUDO(b, c, d, e, f) {
          if (b[1] === "not") {
            if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = _m2(b[3], null, null, c);else {
              var g = _m2.filter(b[3], c, d, !0 ^ f);

              d || e.push.apply(e, g);
              return !1;
            }
          } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
          return b;
        },
        POS: function POS(a) {
          a.unshift(!0);
          return a;
        }
      },
      filters: {
        enabled: function enabled(a) {
          return a.disabled === !1 && a.type !== "hidden";
        },
        disabled: function disabled(a) {
          return a.disabled === !0;
        },
        checked: function checked(a) {
          return a.checked === !0;
        },
        selected: function selected(a) {
          a.parentNode && a.parentNode.selectedIndex;
          return a.selected === !0;
        },
        parent: function parent(a) {
          return !!a.firstChild;
        },
        empty: function empty(a) {
          return !a.firstChild;
        },
        has: function has(a, b, c) {
          return !!_m2(c[3], a).length;
        },
        header: function header(a) {
          return /h\d/i.test(a.nodeName);
        },
        text: function text(a) {
          var b = a.getAttribute("type"),
              c = a.type;
          return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null);
        },
        radio: function radio(a) {
          return a.nodeName.toLowerCase() === "input" && "radio" === a.type;
        },
        checkbox: function checkbox(a) {
          return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type;
        },
        file: function file(a) {
          return a.nodeName.toLowerCase() === "input" && "file" === a.type;
        },
        password: function password(a) {
          return a.nodeName.toLowerCase() === "input" && "password" === a.type;
        },
        submit: function submit(a) {
          var b = a.nodeName.toLowerCase();
          return (b === "input" || b === "button") && "submit" === a.type;
        },
        image: function image(a) {
          return a.nodeName.toLowerCase() === "input" && "image" === a.type;
        },
        reset: function reset(a) {
          var b = a.nodeName.toLowerCase();
          return (b === "input" || b === "button") && "reset" === a.type;
        },
        button: function button(a) {
          var b = a.nodeName.toLowerCase();
          return b === "input" && "button" === a.type || b === "button";
        },
        input: function input(a) {
          return /input|select|textarea|button/i.test(a.nodeName);
        },
        focus: function focus(a) {
          return a === a.ownerDocument.activeElement;
        }
      },
      setFilters: {
        first: function first(a, b) {
          return b === 0;
        },
        last: function last(a, b, c, d) {
          return b === d.length - 1;
        },
        even: function even(a, b) {
          return b % 2 === 0;
        },
        odd: function odd(a, b) {
          return b % 2 === 1;
        },
        lt: function lt(a, b, c) {
          return b < c[3] - 0;
        },
        gt: function gt(a, b, c) {
          return b > c[3] - 0;
        },
        nth: function nth(a, b, c) {
          return c[3] - 0 === b;
        },
        eq: function eq(a, b, c) {
          return c[3] - 0 === b;
        }
      },
      filter: {
        PSEUDO: function PSEUDO(a, b, c, d) {
          var e = b[1],
              f = o.filters[e];
          if (f) return f(a, c, b, d);
          if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;

          if (e === "not") {
            var g = b[3];

            for (var h = 0, i = g.length; h < i; h++) {
              if (g[h] === a) return !1;
            }

            return !0;
          }

          _m2.error(e);
        },
        CHILD: function CHILD(a, b) {
          var c,
              e,
              f,
              g,
              h,
              i,
              j,
              k = b[1],
              l = a;

          switch (k) {
            case "only":
            case "first":
              while (l = l.previousSibling) {
                if (l.nodeType === 1) return !1;
              }

              if (k === "first") return !0;
              l = a;

            case "last":
              while (l = l.nextSibling) {
                if (l.nodeType === 1) return !1;
              }

              return !0;

            case "nth":
              c = b[2], e = b[3];
              if (c === 1 && e === 0) return !0;
              f = b[0], g = a.parentNode;

              if (g && (g[d] !== f || !a.nodeIndex)) {
                i = 0;

                for (l = g.firstChild; l; l = l.nextSibling) {
                  l.nodeType === 1 && (l.nodeIndex = ++i);
                }

                g[d] = f;
              }

              j = a.nodeIndex - e;
              return c === 0 ? j === 0 : j % c === 0 && j / c >= 0;
          }
        },
        ID: function ID(a, b) {
          return a.nodeType === 1 && a.getAttribute("id") === b;
        },
        TAG: function TAG(a, b) {
          return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b;
        },
        CLASS: function CLASS(a, b) {
          return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1;
        },
        ATTR: function ATTR(a, b) {
          var c = b[1],
              d = _m2.attr ? _m2.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
              e = d + "",
              f = b[2],
              g = b[4];
          return d == null ? f === "!=" : !f && _m2.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1;
        },
        POS: function POS(a, b, c, d) {
          var e = b[2],
              f = o.setFilters[e];
          if (f) return f(a, c, b, d);
        }
      }
    },
        p = o.match.POS,
        q = function q(a, b) {
      return "\\" + (b - 0 + 1);
    };

    for (var r in o.match) {
      o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
    }

    o.match.globalPOS = p;

    var s = function s(a, b) {
      a = Array.prototype.slice.call(a, 0);

      if (b) {
        b.push.apply(b, a);
        return b;
      }

      return a;
    };

    try {
      Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType;
    } catch (t) {
      s = function s(a, b) {
        var c = 0,
            d = b || [];
        if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);else if (typeof a.length == "number") for (var e = a.length; c < e; c++) {
          d.push(a[c]);
        } else for (; a[c]; c++) {
          d.push(a[c]);
        }
        return d;
      };
    }

    var u, v;
    c.documentElement.compareDocumentPosition ? u = function u(a, b) {
      if (a === b) {
        h = !0;
        return 0;
      }

      if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
      return a.compareDocumentPosition(b) & 4 ? -1 : 1;
    } : (u = function u(a, b) {
      if (a === b) {
        h = !0;
        return 0;
      }

      if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
      var c,
          d,
          e = [],
          f = [],
          g = a.parentNode,
          i = b.parentNode,
          j = g;
      if (g === i) return v(a, b);
      if (!g) return -1;
      if (!i) return 1;

      while (j) {
        e.unshift(j), j = j.parentNode;
      }

      j = i;

      while (j) {
        f.unshift(j), j = j.parentNode;
      }

      c = e.length, d = f.length;

      for (var k = 0; k < c && k < d; k++) {
        if (e[k] !== f[k]) return v(e[k], f[k]);
      }

      return k === c ? v(a, f[k], -1) : v(e[k], b, 1);
    }, v = function v(a, b, c) {
      if (a === b) return c;
      var d = a.nextSibling;

      while (d) {
        if (d === b) return -1;
        d = d.nextSibling;
      }

      return 1;
    }), function () {
      var a = c.createElement("div"),
          d = "script" + new Date().getTime(),
          e = c.documentElement;
      a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
        if (typeof c.getElementById != "undefined" && !d) {
          var e = c.getElementById(a[1]);
          return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : [];
        }
      }, o.filter.ID = function (a, b) {
        var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
        return a.nodeType === 1 && c && c.nodeValue === b;
      }), e.removeChild(a), e = a = null;
    }(), function () {
      var a = c.createElement("div");
      a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
        var c = b.getElementsByTagName(a[1]);

        if (a[1] === "*") {
          var d = [];

          for (var e = 0; c[e]; e++) {
            c[e].nodeType === 1 && d.push(c[e]);
          }

          c = d;
        }

        return c;
      }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
        return a.getAttribute("href", 2);
      }), a = null;
    }(), c.querySelectorAll && function () {
      var a = _m2,
          b = c.createElement("div"),
          d = "__sizzle__";
      b.innerHTML = "<p class='TEST'></p>";

      if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
        _m2 = function _m(b, e, f, g) {
          e = e || c;

          if (!g && !_m2.isXML(e)) {
            var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);

            if (h && (e.nodeType === 1 || e.nodeType === 9)) {
              if (h[1]) return s(e.getElementsByTagName(b), f);
              if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f);
            }

            if (e.nodeType === 9) {
              if (b === "body" && e.body) return s([e.body], f);

              if (h && h[3]) {
                var i = e.getElementById(h[3]);
                if (!i || !i.parentNode) return s([], f);
                if (i.id === h[3]) return s([i], f);
              }

              try {
                return s(e.querySelectorAll(b), f);
              } catch (j) {}
            } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
              var k = e,
                  l = e.getAttribute("id"),
                  n = l || d,
                  p = e.parentNode,
                  q = /^\s*[+~]/.test(b);
              l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);

              try {
                if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f);
              } catch (r) {} finally {
                l || k.removeAttribute("id");
              }
            }
          }

          return a(b, e, f, g);
        };

        for (var e in a) {
          _m2[e] = a[e];
        }

        b = null;
      }
    }(), function () {
      var a = c.documentElement,
          b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;

      if (b) {
        var d = !b.call(c.createElement("div"), "div"),
            e = !1;

        try {
          b.call(c.documentElement, "[test!='']:sizzle");
        } catch (f) {
          e = !0;
        }

        _m2.matchesSelector = function (a, c) {
          c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
          if (!_m2.isXML(a)) try {
            if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
              var f = b.call(a, c);
              if (f || !d || a.document && a.document.nodeType !== 11) return f;
            }
          } catch (g) {}
          return _m2(c, null, null, [a]).length > 0;
        };
      }
    }(), function () {
      var a = c.createElement("div");
      a.innerHTML = "<div class='test e'></div><div class='test'></div>";

      if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
        a.lastChild.className = "e";
        if (a.getElementsByClassName("e").length === 1) return;
        o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
          if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1]);
        }, a = null;
      }
    }(), c.documentElement.contains ? _m2.contains = function (a, b) {
      return a !== b && (a.contains ? a.contains(b) : !0);
    } : c.documentElement.compareDocumentPosition ? _m2.contains = function (a, b) {
      return !!(a.compareDocumentPosition(b) & 16);
    } : _m2.contains = function () {
      return !1;
    }, _m2.isXML = function (a) {
      var b = (a ? a.ownerDocument || a : 0).documentElement;
      return b ? b.nodeName !== "HTML" : !1;
    };

    var y = function y(a, b, c) {
      var d,
          e = [],
          f = "",
          g = b.nodeType ? [b] : b;

      while (d = o.match.PSEUDO.exec(a)) {
        f += d[0], a = a.replace(o.match.PSEUDO, "");
      }

      a = o.relative[a] ? a + "*" : a;

      for (var h = 0, i = g.length; h < i; h++) {
        _m2(a, g[h], e, c);
      }

      return _m2.filter(f, e);
    };

    _m2.attr = f.attr, _m2.selectors.attrMap = {}, f.find = _m2, f.expr = _m2.selectors, f.expr[":"] = f.expr.filters, f.unique = _m2.uniqueSort, f.text = _m2.getText, f.isXMLDoc = _m2.isXML, f.contains = _m2.contains;
  }();
  var L = /Until$/,
      M = /^(?:parents|prevUntil|prevAll)/,
      N = /,/,
      O = /^.[^:#\[\.,]*$/,
      P = Array.prototype.slice,
      Q = f.expr.match.globalPOS,
      R = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };
  f.fn.extend({
    find: function find(a) {
      var b = this,
          c,
          d;
      if (typeof a != "string") return f(a).filter(function () {
        for (c = 0, d = b.length; c < d; c++) {
          if (f.contains(b[c], this)) return !0;
        }
      });
      var e = this.pushStack("", "find", a),
          g,
          h,
          i;

      for (c = 0, d = this.length; c < d; c++) {
        g = e.length, f.find(a, this[c], e);
        if (c > 0) for (h = g; h < e.length; h++) {
          for (i = 0; i < g; i++) {
            if (e[i] === e[h]) {
              e.splice(h--, 1);
              break;
            }
          }
        }
      }

      return e;
    },
    has: function has(a) {
      var b = f(a);
      return this.filter(function () {
        for (var a = 0, c = b.length; a < c; a++) {
          if (f.contains(this, b[a])) return !0;
        }
      });
    },
    not: function not(a) {
      return this.pushStack(T(this, a, !1), "not", a);
    },
    filter: function filter(a) {
      return this.pushStack(T(this, a, !0), "filter", a);
    },
    is: function is(a) {
      return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0);
    },
    closest: function closest(a, b) {
      var c = [],
          d,
          e,
          g = this[0];

      if (f.isArray(a)) {
        var h = 1;

        while (g && g.ownerDocument && g !== b) {
          for (d = 0; d < a.length; d++) {
            f(g).is(a[d]) && c.push({
              selector: a[d],
              elem: g,
              level: h
            });
          }

          g = g.parentNode, h++;
        }

        return c;
      }

      var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;

      for (d = 0, e = this.length; d < e; d++) {
        g = this[d];

        while (g) {
          if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
            c.push(g);
            break;
          }

          g = g.parentNode;
          if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break;
        }
      }

      c = c.length > 1 ? f.unique(c) : c;
      return this.pushStack(c, "closest", a);
    },
    index: function index(a) {
      if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
      if (typeof a == "string") return f.inArray(this[0], f(a));
      return f.inArray(a.jquery ? a[0] : a, this);
    },
    add: function add(a, b) {
      var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
          d = f.merge(this.get(), c);
      return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d));
    },
    andSelf: function andSelf() {
      return this.add(this.prevObject);
    }
  }), f.each({
    parent: function parent(a) {
      var b = a.parentNode;
      return b && b.nodeType !== 11 ? b : null;
    },
    parents: function parents(a) {
      return f.dir(a, "parentNode");
    },
    parentsUntil: function parentsUntil(a, b, c) {
      return f.dir(a, "parentNode", c);
    },
    next: function next(a) {
      return f.nth(a, 2, "nextSibling");
    },
    prev: function prev(a) {
      return f.nth(a, 2, "previousSibling");
    },
    nextAll: function nextAll(a) {
      return f.dir(a, "nextSibling");
    },
    prevAll: function prevAll(a) {
      return f.dir(a, "previousSibling");
    },
    nextUntil: function nextUntil(a, b, c) {
      return f.dir(a, "nextSibling", c);
    },
    prevUntil: function prevUntil(a, b, c) {
      return f.dir(a, "previousSibling", c);
    },
    siblings: function siblings(a) {
      return f.sibling((a.parentNode || {}).firstChild, a);
    },
    children: function children(a) {
      return f.sibling(a.firstChild);
    },
    contents: function contents(a) {
      return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes);
    }
  }, function (a, b) {
    f.fn[a] = function (c, d) {
      var e = f.map(this, b, c);
      L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
      return this.pushStack(e, a, P.call(arguments).join(","));
    };
  }), f.extend({
    filter: function filter(a, b, c) {
      c && (a = ":not(" + a + ")");
      return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b);
    },
    dir: function dir(a, c, d) {
      var e = [],
          g = a[c];

      while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) {
        g.nodeType === 1 && e.push(g), g = g[c];
      }

      return e;
    },
    nth: function nth(a, b, c, d) {
      b = b || 1;
      var e = 0;

      for (; a; a = a[c]) {
        if (a.nodeType === 1 && ++e === b) break;
      }

      return a;
    },
    sibling: function sibling(a, b) {
      var c = [];

      for (; a; a = a.nextSibling) {
        a.nodeType === 1 && a !== b && c.push(a);
      }

      return c;
    }
  });
  var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
      W = / jQuery\d+="(?:\d+|null)"/g,
      X = /^\s+/,
      Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
      Z = /<([\w:]+)/,
      $ = /<tbody/i,
      _ = /<|&#?\w+;/,
      ba = /<(?:script|style)/i,
      bb = /<(?:script|object|embed|option|style)/i,
      bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"),
      bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
      be = /\/(java|ecma)script/i,
      bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
      bg = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    area: [1, "<map>", "</map>"],
    _default: [0, "", ""]
  },
      bh = U(c);
  bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
    text: function text(a) {
      return f.access(this, function (a) {
        return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
      }, null, a, arguments.length);
    },
    wrapAll: function wrapAll(a) {
      if (f.isFunction(a)) return this.each(function (b) {
        f(this).wrapAll(a.call(this, b));
      });

      if (this[0]) {
        var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
          var a = this;

          while (a.firstChild && a.firstChild.nodeType === 1) {
            a = a.firstChild;
          }

          return a;
        }).append(this);
      }

      return this;
    },
    wrapInner: function wrapInner(a) {
      if (f.isFunction(a)) return this.each(function (b) {
        f(this).wrapInner(a.call(this, b));
      });
      return this.each(function () {
        var b = f(this),
            c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a);
      });
    },
    wrap: function wrap(a) {
      var b = f.isFunction(a);
      return this.each(function (c) {
        f(this).wrapAll(b ? a.call(this, c) : a);
      });
    },
    unwrap: function unwrap() {
      return this.parent().each(function () {
        f.nodeName(this, "body") || f(this).replaceWith(this.childNodes);
      }).end();
    },
    append: function append() {
      return this.domManip(arguments, !0, function (a) {
        this.nodeType === 1 && this.appendChild(a);
      });
    },
    prepend: function prepend() {
      return this.domManip(arguments, !0, function (a) {
        this.nodeType === 1 && this.insertBefore(a, this.firstChild);
      });
    },
    before: function before() {
      if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
        this.parentNode.insertBefore(a, this);
      });

      if (arguments.length) {
        var a = f.clean(arguments);
        a.push.apply(a, this.toArray());
        return this.pushStack(a, "before", arguments);
      }
    },
    after: function after() {
      if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
        this.parentNode.insertBefore(a, this.nextSibling);
      });

      if (arguments.length) {
        var a = this.pushStack(this, "after", arguments);
        a.push.apply(a, f.clean(arguments));
        return a;
      }
    },
    remove: function remove(a, b) {
      for (var c = 0, d; (d = this[c]) != null; c++) {
        if (!a || f.filter(a, [d]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
      }

      return this;
    },
    empty: function empty() {
      for (var a = 0, b; (b = this[a]) != null; a++) {
        b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));

        while (b.firstChild) {
          b.removeChild(b.firstChild);
        }
      }

      return this;
    },
    clone: function clone(a, b) {
      a = a == null ? !1 : a, b = b == null ? a : b;
      return this.map(function () {
        return f.clone(this, a, b);
      });
    },
    html: function html(a) {
      return f.access(this, function (a) {
        var c = this[0] || {},
            d = 0,
            e = this.length;
        if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;

        if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = a.replace(Y, "<$1></$2>");

          try {
            for (; d < e; d++) {
              c = this[d] || {}, c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
            }

            c = 0;
          } catch (g) {}
        }

        c && this.empty().append(a);
      }, null, a, arguments.length);
    },
    replaceWith: function replaceWith(a) {
      if (this[0] && this[0].parentNode) {
        if (f.isFunction(a)) return this.each(function (b) {
          var c = f(this),
              d = c.html();
          c.replaceWith(a.call(this, b, d));
        });
        typeof a != "string" && (a = f(a).detach());
        return this.each(function () {
          var b = this.nextSibling,
              c = this.parentNode;
          f(this).remove(), b ? f(b).before(a) : f(c).append(a);
        });
      }

      return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this;
    },
    detach: function detach(a) {
      return this.remove(a, !0);
    },
    domManip: function domManip(a, c, d) {
      var e,
          g,
          h,
          i,
          j = a[0],
          k = [];
      if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function () {
        f(this).domManip(a, c, d, !0);
      });
      if (f.isFunction(j)) return this.each(function (e) {
        var g = f(this);
        a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d);
      });

      if (this[0]) {
        i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
          fragment: i
        } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;

        if (g) {
          c = c && f.nodeName(g, "tr");

          for (var l = 0, m = this.length, n = m - 1; l < m; l++) {
            d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h);
          }
        }

        k.length && f.each(k, function (a, b) {
          b.src ? f.ajax({
            type: "GET",
            global: !1,
            url: b.src,
            async: !1,
            dataType: "script"
          }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b);
        });
      }

      return this;
    }
  }), f.buildFragment = function (a, b, d) {
    var e,
        g,
        h,
        i,
        j = a[0];
    b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
    return {
      fragment: e,
      cacheable: g
    };
  }, f.fragments = {}, f.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (a, b) {
    f.fn[a] = function (c) {
      var d = [],
          e = f(c),
          g = this.length === 1 && this[0].parentNode;

      if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
        e[b](this[0]);
        return this;
      }

      for (var h = 0, i = e.length; h < i; h++) {
        var j = (h > 0 ? this.clone(!0) : this).get();
        f(e[h])[b](j), d = d.concat(j);
      }

      return this.pushStack(d, a, e.selector);
    };
  }), f.extend({
    clone: function clone(a, b, c) {
      var d,
          e,
          g,
          h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);

      if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
        bk(a, h), d = bl(a), e = bl(h);

        for (g = 0; d[g]; ++g) {
          e[g] && bk(d[g], e[g]);
        }
      }

      if (b) {
        bj(a, h);

        if (c) {
          d = bl(a), e = bl(h);

          for (g = 0; d[g]; ++g) {
            bj(d[g], e[g]);
          }
        }
      }

      d = e = null;
      return h;
    },
    clean: function clean(a, b, d, e) {
      var g,
          h,
          i,
          j = [];
      b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);

      for (var k = 0, l; (l = a[k]) != null; k++) {
        typeof l == "number" && (l += "");
        if (!l) continue;
        if (typeof l == "string") if (!_.test(l)) l = b.createTextNode(l);else {
          l = l.replace(Y, "<$1></$2>");
          var m = (Z.exec(l) || ["", ""])[1].toLowerCase(),
              n = bg[m] || bg._default,
              o = n[0],
              p = b.createElement("div"),
              q = bh.childNodes,
              r;
          b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2];

          while (o--) {
            p = p.lastChild;
          }

          if (!f.support.tbody) {
            var s = $.test(l),
                t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];

            for (i = t.length - 1; i >= 0; --i) {
              f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i]);
            }
          }

          !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)));
        }
        var u;
        if (!f.support.appendChecked) if (l[0] && typeof (u = l.length) == "number") for (i = 0; i < u; i++) {
          bn(l[i]);
        } else bn(l);
        l.nodeType ? j.push(l) : j = f.merge(j, l);
      }

      if (d) {
        g = function g(a) {
          return !a.type || be.test(a.type);
        };

        for (k = 0; j[k]; k++) {
          h = j[k];
          if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type))) e.push(h.parentNode ? h.parentNode.removeChild(h) : h);else {
            if (h.nodeType === 1) {
              var v = f.grep(h.getElementsByTagName("script"), g);
              j.splice.apply(j, [k + 1, 0].concat(v));
            }

            d.appendChild(h);
          }
        }
      }

      return j;
    },
    cleanData: function cleanData(a) {
      var b,
          c,
          d = f.cache,
          e = f.event.special,
          g = f.support.deleteExpando;

      for (var h = 0, i; (i = a[h]) != null; h++) {
        if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
        c = i[f.expando];

        if (c) {
          b = d[c];

          if (b && b.events) {
            for (var j in b.events) {
              e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
            }

            b.handle && (b.handle.elem = null);
          }

          g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c];
        }
      }
    }
  });
  var bp = /alpha\([^)]*\)/i,
      bq = /opacity=([^)]*)/,
      br = /([A-Z]|^ms)/g,
      bs = /^[\-+]?(?:\d*\.)?\d+$/i,
      bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
      bu = /^([\-+])=([\-+.\de]+)/,
      bv = /^margin/,
      bw = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      bx = ["Top", "Right", "Bottom", "Left"],
      by,
      bz,
      bA;
  f.fn.css = function (a, c) {
    return f.access(this, function (a, c, d) {
      return d !== b ? f.style(a, c, d) : f.css(a, c);
    }, a, c, arguments.length > 1);
  }, f.extend({
    cssHooks: {
      opacity: {
        get: function get(a, b) {
          if (b) {
            var c = by(a, "opacity");
            return c === "" ? "1" : c;
          }

          return a.style.opacity;
        }
      }
    },
    cssNumber: {
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function style(a, c, d, e) {
      if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
        var g,
            h,
            i = f.camelCase(c),
            j = a.style,
            k = f.cssHooks[i];
        c = f.cssProps[i] || i;

        if (d === b) {
          if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
          return j[c];
        }

        h = _typeof(d), h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
        if (d == null || h === "number" && isNaN(d)) return;
        h === "number" && !f.cssNumber[i] && (d += "px");
        if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
          j[c] = d;
        } catch (l) {}
      }
    },
    css: function css(a, c, d) {
      var e, g;
      c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
      if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
      if (by) return by(a, c);
    },
    swap: function swap(a, b, c) {
      var d = {},
          e,
          f;

      for (f in b) {
        d[f] = a.style[f], a.style[f] = b[f];
      }

      e = c.call(a);

      for (f in b) {
        a.style[f] = d[f];
      }

      return e;
    }
  }), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function bz(a, b) {
    var c,
        d,
        e,
        g,
        h = a.style;
    b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g);
    return c;
  }), c.documentElement.currentStyle && (bA = function bA(a, b) {
    var c,
        d,
        e,
        f = a.currentStyle && a.currentStyle[b],
        g = a.style;
    f == null && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
    return f === "" ? "auto" : f;
  }), by = bz || bA, f.each(["height", "width"], function (a, b) {
    f.cssHooks[b] = {
      get: function get(a, c, d) {
        if (c) return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function () {
          return bB(a, b, d);
        });
      },
      set: function set(a, b) {
        return bs.test(b) ? b + "px" : b;
      }
    };
  }), f.support.opacity || (f.cssHooks.opacity = {
    get: function get(a, b) {
      return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "";
    },
    set: function set(a, b) {
      var c = a.style,
          d = a.currentStyle,
          e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
          g = d && d.filter || c.filter || "";
      c.zoom = 1;

      if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
        c.removeAttribute("filter");
        if (d && !d.filter) return;
      }

      c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e;
    }
  }), f(function () {
    f.support.reliableMarginRight || (f.cssHooks.marginRight = {
      get: function get(a, b) {
        return f.swap(a, {
          display: "inline-block"
        }, function () {
          return b ? by(a, "margin-right") : a.style.marginRight;
        });
      }
    });
  }), f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
    var b = a.offsetWidth,
        c = a.offsetHeight;
    return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none";
  }, f.expr.filters.visible = function (a) {
    return !f.expr.filters.hidden(a);
  }), f.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (a, b) {
    f.cssHooks[a + b] = {
      expand: function expand(c) {
        var d,
            e = typeof c == "string" ? c.split(" ") : [c],
            f = {};

        for (d = 0; d < 4; d++) {
          f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
        }

        return f;
      }
    };
  });
  var bC = /%20/g,
      bD = /\[\]$/,
      bE = /\r?\n/g,
      bF = /#.*$/,
      bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
      bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
      bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
      bJ = /^(?:GET|HEAD)$/,
      bK = /^\/\//,
      bL = /\?/,
      bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      bN = /^(?:select|textarea)/i,
      bO = /\s+/,
      bP = /([?&])_=[^&]*/,
      bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
      bR = f.fn.load,
      bS = {},
      bT = {},
      bU,
      bV,
      bW = ["*/"] + ["*"];

  try {
    bU = e.href;
  } catch (bX) {
    bU = c.createElement("a"), bU.href = "", bU = bU.href;
  }

  bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({
    load: function load(a, c, d) {
      if (typeof a != "string" && bR) return bR.apply(this, arguments);
      if (!this.length) return this;
      var e = a.indexOf(" ");

      if (e >= 0) {
        var g = a.slice(e, a.length);
        a = a.slice(0, e);
      }

      var h = "GET";
      c && (f.isFunction(c) ? (d = c, c = b) : _typeof(c) == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
      var i = this;
      f.ajax({
        url: a,
        type: h,
        dataType: "html",
        data: c,
        complete: function complete(a, b, c) {
          c = a.responseText, a.isResolved() && (a.done(function (a) {
            c = a;
          }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a]);
        }
      });
      return this;
    },
    serialize: function serialize() {
      return f.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        return this.elements ? f.makeArray(this.elements) : this;
      }).filter(function () {
        return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type));
      }).map(function (a, b) {
        var c = f(this).val();
        return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
          return {
            name: b.name,
            value: a.replace(bE, "\r\n")
          };
        }) : {
          name: b.name,
          value: c.replace(bE, "\r\n")
        };
      }).get();
    }
  }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
    f.fn[b] = function (a) {
      return this.on(b, a);
    };
  }), f.each(["get", "post"], function (a, c) {
    f[c] = function (a, d, e, g) {
      f.isFunction(d) && (g = g || e, e = d, d = b);
      return f.ajax({
        type: c,
        url: a,
        data: d,
        success: e,
        dataType: g
      });
    };
  }), f.extend({
    getScript: function getScript(a, c) {
      return f.get(a, b, c, "script");
    },
    getJSON: function getJSON(a, b, c) {
      return f.get(a, b, c, "json");
    },
    ajaxSetup: function ajaxSetup(a, b) {
      b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b);
      return a;
    },
    ajaxSettings: {
      url: bU,
      isLocal: bI.test(bV[1]),
      global: !0,
      type: "GET",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      processData: !0,
      async: !0,
      accepts: {
        xml: "application/xml, text/xml",
        html: "text/html",
        text: "text/plain",
        json: "application/json, text/javascript",
        "*": bW
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText"
      },
      converters: {
        "* text": a.String,
        "text html": !0,
        "text json": f.parseJSON,
        "text xml": f.parseXML
      },
      flatOptions: {
        context: !0,
        url: !0
      }
    },
    ajaxPrefilter: bY(bS),
    ajaxTransport: bY(bT),
    ajax: function ajax(a, c) {
      function w(a, c, l, m) {
        if (s !== 2) {
          s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
          var o,
              r,
              u,
              w = c,
              x = l ? ca(d, v, l) : b,
              y,
              z;

          if (a >= 200 && a < 300 || a === 304) {
            if (d.ifModified) {
              if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
              if (z = v.getResponseHeader("Etag")) f.etag[k] = z;
            }

            if (a === 304) w = "notmodified", o = !0;else try {
              r = cb(d, x), w = "success", o = !0;
            } catch (A) {
              w = "parsererror", u = A;
            }
          } else {
            u = w;
            if (!w || a) w = "error", a < 0 && (a = 0);
          }

          v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"));
        }
      }

      _typeof(a) == "object" && (c = a, a = b), c = c || {};
      var d = f.ajaxSetup({}, c),
          e = d.context || d,
          g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
          h = f.Deferred(),
          i = f.Callbacks("once memory"),
          j = d.statusCode || {},
          k,
          l = {},
          m = {},
          n,
          o,
          p,
          q,
          r,
          s = 0,
          t,
          u,
          v = {
        readyState: 0,
        setRequestHeader: function setRequestHeader(a, b) {
          if (!s) {
            var c = a.toLowerCase();
            a = m[c] = m[c] || a, l[a] = b;
          }

          return this;
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return s === 2 ? n : null;
        },
        getResponseHeader: function getResponseHeader(a) {
          var c;

          if (s === 2) {
            if (!o) {
              o = {};

              while (c = bG.exec(n)) {
                o[c[1].toLowerCase()] = c[2];
              }
            }

            c = o[a.toLowerCase()];
          }

          return c === b ? null : c;
        },
        overrideMimeType: function overrideMimeType(a) {
          s || (d.mimeType = a);
          return this;
        },
        abort: function abort(a) {
          a = a || "abort", p && p.abort(a), w(0, a);
          return this;
        }
      };
      h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
        if (a) {
          var b;
          if (s < 2) for (b in a) {
            j[b] = [j[b], a[b]];
          } else b = a[v.status], v.then(b, b);
        }

        return this;
      }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v);
      if (s === 2) return !1;
      t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");

      if (!d.hasContent) {
        d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;

        if (d.cache === !1) {
          var x = f.now(),
              y = d.url.replace(bP, "$1_=" + x);
          d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "");
        }
      }

      (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);

      for (u in d.headers) {
        v.setRequestHeader(u, d.headers[u]);
      }

      if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
        v.abort();
        return !1;
      }

      for (u in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        v[u](d[u]);
      }

      p = bZ(bT, d, c, v);
      if (!p) w(-1, "No Transport");else {
        v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
          v.abort("timeout");
        }, d.timeout));

        try {
          s = 1, p.send(l, w);
        } catch (z) {
          if (s < 2) w(-1, z);else throw z;
        }
      }
      return v;
    },
    param: function param(a, c) {
      var d = [],
          e = function e(a, b) {
        b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
      };

      c === b && (c = f.ajaxSettings.traditional);
      if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
        e(this.name, this.value);
      });else for (var g in a) {
        b_(g, a[g], c, e);
      }
      return d.join("&").replace(bC, "+");
    }
  }), f.extend({
    active: 0,
    lastModified: {},
    etag: {}
  });
  var cc = f.now(),
      cd = /(\=)\?(&|$)|\?\?/i;
  f.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      return f.expando + "_" + cc++;
    }
  }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
    var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);

    if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
      var g,
          h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
          i = a[h],
          j = b.url,
          k = b.data,
          l = "$1" + h + "$2";
      b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
        g = [a];
      }, d.always(function () {
        a[h] = i, g && f.isFunction(i) && a[h](g[0]);
      }), b.converters["script json"] = function () {
        g || f.error(h + " was not called");
        return g[0];
      }, b.dataTypes[0] = "json";
      return "script";
    }
  }), f.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /javascript|ecmascript/
    },
    converters: {
      "text script": function textScript(a) {
        f.globalEval(a);
        return a;
      }
    }
  }), f.ajaxPrefilter("script", function (a) {
    a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
  }), f.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var d,
          e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
      return {
        send: function send(f, g) {
          d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
            if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success");
          }, e.insertBefore(d, e.firstChild);
        },
        abort: function abort() {
          d && d.onload(0, 1);
        }
      };
    }
  });
  var ce = a.ActiveXObject ? function () {
    for (var a in cg) {
      cg[a](0, 1);
    }
  } : !1,
      cf = 0,
      cg;
  f.ajaxSettings.xhr = a.ActiveXObject ? function () {
    return !this.isLocal && ch() || ci();
  } : ch, function (a) {
    f.extend(f.support, {
      ajax: !!a,
      cors: !!a && "withCredentials" in a
    });
  }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
    if (!c.crossDomain || f.support.cors) {
      var _d;

      return {
        send: function send(e, g) {
          var h = c.xhr(),
              i,
              j;
          c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
          if (c.xhrFields) for (j in c.xhrFields) {
            h[j] = c.xhrFields[j];
          }
          c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");

          try {
            for (j in e) {
              h.setRequestHeader(j, e[j]);
            }
          } catch (k) {}

          h.send(c.hasContent && c.data || null), _d = function d(a, e) {
            var j, k, l, m, n;

            try {
              if (_d && (e || h.readyState === 4)) {
                _d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]);
                if (e) h.readyState !== 4 && h.abort();else {
                  j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);

                  try {
                    m.text = h.responseText;
                  } catch (a) {}

                  try {
                    k = h.statusText;
                  } catch (o) {
                    k = "";
                  }

                  !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204);
                }
              }
            } catch (p) {
              e || g(-1, p);
            }

            m && g(j, k, m, l);
          }, !c.async || h.readyState === 4 ? _d() : (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = _d), h.onreadystatechange = _d);
        },
        abort: function abort() {
          _d && _d(0, 1);
        }
      };
    }
  });
  var cj = {},
      ck,
      cl,
      cm = /^(?:toggle|show|hide)$/,
      cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
      co,
      cp = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
      cq;
  f.fn.extend({
    show: function show(a, b, c) {
      var d, e;
      if (a || a === 0) return this.animate(ct("show", 3), a, b, c);

      for (var g = 0, h = this.length; g < h; g++) {
        d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
      }

      for (g = 0; g < h; g++) {
        d = this[g];

        if (d.style) {
          e = d.style.display;
          if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || "";
        }
      }

      return this;
    },
    hide: function hide(a, b, c) {
      if (a || a === 0) return this.animate(ct("hide", 3), a, b, c);
      var d,
          e,
          g = 0,
          h = this.length;

      for (; g < h; g++) {
        d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
      }

      for (g = 0; g < h; g++) {
        this[g].style && (this[g].style.display = "none");
      }

      return this;
    },
    _toggle: f.fn.toggle,
    toggle: function toggle(a, b, c) {
      var d = typeof a == "boolean";
      f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
        var b = d ? a : f(this).is(":hidden");
        f(this)[b ? "show" : "hide"]();
      }) : this.animate(ct("toggle", 3), a, b, c);
      return this;
    },
    fadeTo: function fadeTo(a, b, c, d) {
      return this.filter(":hidden").css("opacity", 0).show().end().animate({
        opacity: b
      }, a, c, d);
    },
    animate: function animate(a, b, c, d) {
      function g() {
        e.queue === !1 && f._mark(this);
        var b = f.extend({}, e),
            c = this.nodeType === 1,
            d = c && f(this).is(":hidden"),
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q;
        b.animatedProperties = {};

        for (i in a) {
          g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]);

          if ((k = f.cssHooks[g]) && "expand" in k) {
            l = k.expand(a[g]), delete a[g];

            for (i in l) {
              i in a || (a[i] = l[i]);
            }
          }
        }

        for (g in a) {
          h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
          if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
          c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1));
        }

        b.overflow != null && (this.style.overflow = "hidden");

        for (i in a) {
          j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), p !== "px" && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
        }

        return !0;
      }

      var e = f.speed(b, c, d);
      if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
      a = f.extend({}, a);
      return e.queue === !1 ? this.each(g) : this.queue(e.queue, g);
    },
    stop: function stop(a, c, d) {
      typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
      return this.each(function () {
        function h(a, b, c) {
          var e = b[c];
          f.removeData(a, c, !0), e.stop(d);
        }

        var b,
            c = !1,
            e = f.timers,
            g = f._data(this);

        d || f._unmark(!0, this);
        if (a == null) for (b in g) {
          g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
        } else g[b = a + ".run"] && g[b].stop && h(this, g, b);

        for (b = e.length; b--;) {
          e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
        }

        (!d || !c) && f.dequeue(this, a);
      });
    }
  }), f.each({
    slideDown: ct("show", 1),
    slideUp: ct("hide", 1),
    slideToggle: ct("toggle", 1),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (a, b) {
    f.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), f.extend({
    speed: function speed(a, b, c) {
      var d = a && _typeof(a) == "object" ? f.extend({}, a) : {
        complete: c || !c && b || f.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !f.isFunction(b) && b
      };
      d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
      if (d.queue == null || d.queue === !0) d.queue = "fx";
      d.old = d.complete, d.complete = function (a) {
        f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this);
      };
      return d;
    },
    easing: {
      linear: function linear(a) {
        return a;
      },
      swing: function swing(a) {
        return -Math.cos(a * Math.PI) / 2 + .5;
      }
    },
    timers: [],
    fx: function fx(a, b, c) {
      this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {};
    }
  }), f.fx.prototype = {
    update: function update() {
      this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this);
    },
    cur: function cur() {
      if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
      var a,
          b = f.css(this.elem, this.prop);
      return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a;
    },
    custom: function custom(a, c, d) {
      function h(a) {
        return e.step(a);
      }

      var e = this,
          g = f.fx;
      this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
        f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end));
      }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval));
    },
    show: function show() {
      var a = f._data(this.elem, "fxshow" + this.prop);

      this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show();
    },
    hide: function hide() {
      this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0);
    },
    step: function step(a) {
      var b,
          c,
          d,
          e = cq || cr(),
          g = !0,
          h = this.elem,
          i = this.options;

      if (a || e >= i.duration + this.startTime) {
        this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;

        for (b in i.animatedProperties) {
          i.animatedProperties[b] !== !0 && (g = !1);
        }

        if (g) {
          i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
            h.style["overflow" + b] = i.overflow[a];
          }), i.hide && f(h).hide();
          if (i.hide || i.show) for (b in i.animatedProperties) {
            f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
          }
          d = i.complete, d && (i.complete = !1, d.call(h));
        }

        return !1;
      }

      i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
      return !0;
    }
  }, f.extend(f.fx, {
    tick: function tick() {
      var a,
          b = f.timers,
          c = 0;

      for (; c < b.length; c++) {
        a = b[c], !a() && b[c] === a && b.splice(c--, 1);
      }

      b.length || f.fx.stop();
    },
    interval: 13,
    stop: function stop() {
      clearInterval(co), co = null;
    },
    speeds: {
      slow: 600,
      fast: 200,
      _default: 400
    },
    step: {
      opacity: function opacity(a) {
        f.style(a.elem, "opacity", a.now);
      },
      _default: function _default(a) {
        a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now;
      }
    }
  }), f.each(cp.concat.apply([], cp), function (a, b) {
    b.indexOf("margin") && (f.fx.step[b] = function (a) {
      f.style(a.elem, b, Math.max(0, a.now) + a.unit);
    });
  }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
    return f.grep(f.timers, function (b) {
      return a === b.elem;
    }).length;
  });
  var cv,
      cw = /^t(?:able|d|h)$/i,
      cx = /^(?:body|html)$/i;
  "getBoundingClientRect" in c.documentElement ? cv = function cv(a, b, c, d) {
    try {
      d = a.getBoundingClientRect();
    } catch (e) {}

    if (!d || !f.contains(c, a)) return d ? {
      top: d.top,
      left: d.left
    } : {
      top: 0,
      left: 0
    };
    var g = b.body,
        h = cy(b),
        i = c.clientTop || g.clientTop || 0,
        j = c.clientLeft || g.clientLeft || 0,
        k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop,
        l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft,
        m = d.top + k - i,
        n = d.left + l - j;
    return {
      top: m,
      left: n
    };
  } : cv = function cv(a, b, c) {
    var d,
        e = a.offsetParent,
        g = a,
        h = b.body,
        i = b.defaultView,
        j = i ? i.getComputedStyle(a, null) : a.currentStyle,
        k = a.offsetTop,
        l = a.offsetLeft;

    while ((a = a.parentNode) && a !== h && a !== c) {
      if (f.support.fixedPosition && j.position === "fixed") break;
      d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d;
    }

    if (j.position === "relative" || j.position === "static") k += h.offsetTop, l += h.offsetLeft;
    f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft));
    return {
      top: k,
      left: l
    };
  }, f.fn.offset = function (a) {
    if (arguments.length) return a === b ? this : this.each(function (b) {
      f.offset.setOffset(this, a, b);
    });
    var c = this[0],
        d = c && c.ownerDocument;
    if (!d) return null;
    if (c === d.body) return f.offset.bodyOffset(c);
    return cv(c, d, d.documentElement);
  }, f.offset = {
    bodyOffset: function bodyOffset(a) {
      var b = a.offsetTop,
          c = a.offsetLeft;
      f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
      return {
        top: b,
        left: c
      };
    },
    setOffset: function setOffset(a, b, c) {
      var d = f.css(a, "position");
      d === "static" && (a.style.position = "relative");
      var e = f(a),
          g = e.offset(),
          h = f.css(a, "top"),
          i = f.css(a, "left"),
          j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
          k = {},
          l = {},
          m,
          n;
      j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k);
    }
  }, f.fn.extend({
    position: function position() {
      if (!this[0]) return null;
      var a = this[0],
          b = this.offsetParent(),
          c = this.offset(),
          d = cx.test(b[0].nodeName) ? {
        top: 0,
        left: 0
      } : b.offset();
      c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
      return {
        top: c.top - d.top,
        left: c.left - d.left
      };
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        var a = this.offsetParent || c.body;

        while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") {
          a = a.offsetParent;
        }

        return a;
      });
    }
  }), f.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (a, c) {
    var d = /Y/.test(c);

    f.fn[a] = function (e) {
      return f.access(this, function (a, e, g) {
        var h = cy(a);
        if (g === b) return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
        h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g;
      }, a, e, arguments.length, null);
    };
  }), f.each({
    Height: "height",
    Width: "width"
  }, function (a, c) {
    var d = "client" + a,
        e = "scroll" + a,
        g = "offset" + a;
    f.fn["inner" + a] = function () {
      var a = this[0];
      return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null;
    }, f.fn["outer" + a] = function (a) {
      var b = this[0];
      return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null;
    }, f.fn[c] = function (a) {
      return f.access(this, function (a, c, h) {
        var i, j, k, l;

        if (f.isWindow(a)) {
          i = a.document, j = i.documentElement[d];
          return f.support.boxModel && j || i.body && i.body[d] || j;
        }

        if (a.nodeType === 9) {
          i = a.documentElement;
          if (i[d] >= i[e]) return i[d];
          return Math.max(a.body[e], i[e], a.body[g], i[g]);
        }

        if (h === b) {
          k = f.css(a, c), l = parseFloat(k);
          return f.isNumeric(l) ? l : k;
        }

        f(a).css(c, h);
      }, c, a, arguments.length, null);
    };
  }), a.jQuery = a.$ = f,  true && __webpack_require__.amdO.jQuery && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return f;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(window);

;
/**/

/* Source and licensing information for the line(s) below can be found at https://www.indiatoday.in/misc/drupal.js. */

var Drupal = Drupal || {
  settings: {},
  behaviors: {},
  locale: {}
};
jQuery.noConflict();

(function ($) {
  var jquery_init = $.fn.init;

  $.fn.init = function (selector, context, rootjQuery) {
    if (selector && typeof selector === 'string') {
      var hash_position = selector.indexOf('#');

      if (hash_position >= 0) {
        var bracket_position = selector.indexOf('<');
        if (bracket_position > hash_position) throw 'Syntax error, unrecognized expression: ' + selector;
      }
    }

    ;
    return jquery_init.call(this, selector, context, rootjQuery);
  };

  $.fn.init.prototype = jquery_init.prototype;

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || Drupal.settings;
    $.each(Drupal.behaviors, function () {
      if ($.isFunction(this.attach)) this.attach(context, settings);
    });
  };

  Drupal.detachBehaviors = function (context, settings, trigger) {
    context = context || document;
    settings = settings || Drupal.settings;
    trigger = trigger || 'unload';
    $.each(Drupal.behaviors, function () {
      if ($.isFunction(this.detach)) this.detach(context, settings, trigger);
    });
  };

  Drupal.checkPlain = function (str) {
    var character,
        regex,
        replace = {
      '&': '&amp;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;'
    };
    str = String(str);

    for (character in replace) {
      if (replace.hasOwnProperty(character)) {
        regex = new RegExp(character, 'g');
        str = str.replace(regex, replace[character]);
      }
    }

    ;
    return str;
  };

  Drupal.formatString = function (str, args) {
    for (var key in args) {
      switch (key.charAt(0)) {
        case '@':
          args[key] = Drupal.checkPlain(args[key]);
          break;

        case '!':
          break;

        case '%':
        default:
          args[key] = Drupal.theme('placeholder', args[key]);
          break;
      }

      ;
      str = str.replace(key, args[key]);
    }

    ;
    return str;
  };

  Drupal.t = function (str, args, options) {
    options = options || {};
    options.context = options.context || '';
    if (Drupal.locale.strings && Drupal.locale.strings[options.context] && Drupal.locale.strings[options.context][str]) str = Drupal.locale.strings[options.context][str];
    if (args) str = Drupal.formatString(str, args);
    return str;
  };

  Drupal.formatPlural = function (count, singular, plural, args, options) {
    var args = args || {};
    args['@count'] = count;
    var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : args['@count'] == 1 ? 0 : 1;

    if (index == 0) {
      return Drupal.t(singular, args, options);
    } else if (index == 1) {
      return Drupal.t(plural, args, options);
    } else {
      args['@count[' + index + ']'] = args['@count'];
      delete args['@count'];
      return Drupal.t(plural.replace('@count', '@count[' + index + ']'), args, options);
    }
  };

  Drupal.absoluteUrl = function (url) {
    var urlParsingNode = document.createElement('a');

    try {
      url = decodeURIComponent(url);
    } catch (e) {}

    ;
    urlParsingNode.setAttribute('href', url);
    return urlParsingNode.cloneNode(false).href;
  };

  Drupal.urlIsLocal = function (url) {
    var absoluteUrl = Drupal.absoluteUrl(url),
        protocol = location.protocol;
    if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) protocol = 'https:';
    var baseUrl = protocol + '//' + location.host + Drupal.settings.basePath.slice(0, -1);

    try {
      absoluteUrl = decodeURIComponent(absoluteUrl);
    } catch (e) {}

    ;

    try {
      baseUrl = decodeURIComponent(baseUrl);
    } catch (e) {}

    ;
    return absoluteUrl === baseUrl || absoluteUrl.indexOf(baseUrl + '/') === 0;
  };

  Drupal.theme = function (func) {
    var args = Array.prototype.slice.apply(arguments, [1]);
    return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args);
  };

  Drupal.freezeHeight = function () {
    Drupal.unfreezeHeight();
    $('<div id="freeze-height"></div>').css({
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '1px',
      height: $('body').css('height')
    }).appendTo('body');
  };

  Drupal.unfreezeHeight = function () {
    $('#freeze-height').remove();
  };

  Drupal.encodePath = function (item, uri) {
    uri = uri || location.href;
    return encodeURIComponent(item).replace(/%2F/g, '/');
  };

  Drupal.getSelection = function (element) {
    if (typeof element.selectionStart != 'number' && document.selection) {
      var range1 = document.selection.createRange(),
          range2 = range1.duplicate();
      range2.moveToElementText(element);
      range2.setEndPoint('EndToEnd', range1);
      var start = range2.text.length - range1.text.length,
          end = start + range1.text.length;
      return {
        start: start,
        end: end
      };
    }

    ;
    return {
      start: element.selectionStart,
      end: element.selectionEnd
    };
  };

  Drupal.ajaxError = function (xmlhttp, uri, customMessage) {
    var statusCode, statusText, pathText, responseText, readyStateText, message;

    if (xmlhttp.status) {
      statusCode = "\n" + Drupal.t("An AJAX HTTP error occurred.") + "\n" + Drupal.t("HTTP Result Code: !status", {
        '!status': xmlhttp.status
      });
    } else statusCode = "\n" + Drupal.t("An AJAX HTTP request terminated abnormally.");

    statusCode += "\n" + Drupal.t("Debugging information follows.");
    pathText = "\n" + Drupal.t("Path: !uri", {
      '!uri': uri
    });
    statusText = '';

    try {
      statusText = "\n" + Drupal.t("StatusText: !statusText", {
        '!statusText': $.trim(xmlhttp.statusText)
      });
    } catch (e) {}

    ;
    responseText = '';

    try {
      responseText = "\n" + Drupal.t("ResponseText: !responseText", {
        '!responseText': $.trim(xmlhttp.responseText)
      });
    } catch (e) {}

    ;
    responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, "");
    responseText = responseText.replace(/[\n]+\s+/g, "\n");
    readyStateText = xmlhttp.status == 0 ? "\n" + Drupal.t("ReadyState: !readyState", {
      '!readyState': xmlhttp.readyState
    }) : "";
    customMessage = customMessage ? "\n" + Drupal.t("CustomMessage: !customMessage", {
      '!customMessage': customMessage
    }) : "";
    message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
    return message;
  };

  $('html').addClass('js');
  document.cookie = 'has_js=1; path=/';
  $(function () {
    if (jQuery.support.positionFixed === undefined) {
      var el = $('<div style="position:fixed; top:10px" />').appendTo(document.body);
      jQuery.support.positionFixed = el[0].offsetTop === 10;
      el.remove();
    }
  });
  $(function () {
    Drupal.attachBehaviors(document, Drupal.settings);
  });
  Drupal.theme.prototype = {
    placeholder: function placeholder(str) {
      return '<em class="placeholder">' + Drupal.checkPlain(str) + '</em>';
    }
  };
})(jQuery);

;
/* Source and licensing information for the above line(s) can be found at https://www.indiatoday.in/misc/drupal.js. */

/***/ }),

/***/ "./resources/js/interface/js_others.js":
/*!*********************************************!*\
  !*** ./resources/js/interface/js_others.js ***!
  \*********************************************/
/***/ (() => {

//common function for mobile
function mobilecheck() {
  var check = false;

  (function (a) {
    if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
}

var is_mobile = mobilecheck() ? true : false;
document.addEventListener('DOMContentLoaded', function (event) {
  var winWidth;
  jQuery('.mobile-nav').click(function () {
    if (jQuery(this).hasClass('nochange')) {
      jQuery(this).addClass('change').removeClass('nochange');
      jQuery('.navigation').slideDown();
    } else {
      jQuery(this).addClass('nochange').removeClass('change');
      jQuery('.navigation').slideUp();
    }
  });
  jQuery(document).on('click', '.all-menu', function () {
    jQuery('#block-itg-menu-manager-third-level-menu ul.cities-third-level-menu').slideUp();
    jQuery('#newlist').slideToggle();
    jQuery('.third-level-menu #overflow').hide();
  });
  jQuery(document).on('click', function () {
    jQuery('#newlist').slideUp();
  });
  jQuery(document).on('click', '.all-menu', function (e) {
    e.stopPropagation();
  });
  jQuery(document).on('click', '#newlist > li > *', function (e) {
    e.stopPropagation();
  }); //social share animation effects

  jQuery('.social-share ul').each(function () {
    jQuery(this).children().not(":first").hide();
  });
  jQuery('.social-share li').click(function () {
    jQuery(this).find('.share').parent('li').nextAll('li').toggle();
  });
  var menuLength;
  jQuery(".vertical-menu").each(function () {
    menuLength = jQuery(this).find('li').length;

    if (menuLength > 5) {
      jQuery('.vertical-more').show();
    }
  });
  var calcNum = menuLength % 5;
  var divNum = parseInt(menuLength / 5);
  var count = 0;
  jQuery('.vertical-more a.more').click(function () {
    count++;

    if (count < divNum && calcNum != 0) {
      jQuery('.vertical-menu').css('margin-top', -375 * count + 'px');
    } else if (calcNum > 0 && count == divNum) {
      jQuery('.vertical-menu').css('margin-top', -(375 * (count - 1) + calcNum * 75) + 'px');
      jQuery('.vertical-more a.less').show();
      jQuery(this).hide();
    } else if (count < divNum && calcNum == 0) {
      jQuery('.vertical-menu').css('margin-top', -375 * count + 'px');
      jQuery('.vertical-more a.less').show();
      jQuery(this).hide();
    }
  });
  jQuery('.vertical-more a.less').click(function () {
    count = 0;
    jQuery('.vertical-menu').css('margin-top', '0px');
    jQuery('.vertical-more a.more').show();
    jQuery(this).hide();
  });
  jQuery('.page-user .form-submit').wrap('<div class="ripple-effect dib vtop"></div>');
  jQuery('.second-level-menu li, .itg-listing li, .tab-buttons span, .agbutton button').addClass('ripple-effect');
  jQuery('.second-level-menu li.dropdown_cls').removeClass('ripple-effect');
  jQuery(".ripple-effect").click(function (e) {
    // Remove any old one
    jQuery(".ripple").remove(); // Setup

    var posX = jQuery(this).offset().left,
        posY = jQuery(this).offset().top,
        buttonWidth = jQuery(this).width(),
        buttonHeight = jQuery(this).height(); // Add the element

    jQuery(this).prepend("<span class='ripple'></span>"); // Make it round!

    if (buttonWidth >= buttonHeight) {
      buttonHeight = buttonWidth;
    } else {
      buttonWidth = buttonHeight;
    } // Get the center of the element


    var x = e.pageX - posX - buttonWidth / 2;
    var y = e.pageY - posY - buttonHeight / 2; // Add the ripples CSS and start the animation

    jQuery(".ripple").css({
      width: buttonWidth,
      height: buttonHeight,
      top: y + 'px',
      left: x + 'px'
    }).addClass("rippleEffect");
  });

  if (is_mobile) {
    // third-level-menu on mobile
    var tlmenu = jQuery('#block-itg-menu-manager-third-level-menu .select-menu');
    tlmenu.click(function () {
      jQuery('.mobile-nav .fa-times').trigger('click');
      jQuery(this).next('ul').stop().slideToggle();
    });
    jQuery(document).on('click', function () {
      jQuery('#block-itg-menu-manager-third-level-menu ul.third-level-menu').slideUp();
      ;
    });
    tlmenu.click(function (e) {
      e.stopPropagation();
    }); // jQuery code to set personalization tab in mobile

    jQuery('body').on('click', '.personal-menu-tab-mobile', function () {
      jQuery(this).next().slideToggle();
    });
    jQuery('.personal-menu-tab').on('click', 'li', function () {
      var el = $(this);
      var get_class = el.attr('class'),
          get_text = el.find('a').text();
      el.closest('.personal-menu-tab-wrapper').find('.tab-text').attr('data-tab', get_class).text(get_text);
      el.parent().slideUp('fast');
    }); // jQuery code for personalization saved item on mobile

    jQuery('body').on('touchend', '.personal-action', function () {
      jQuery(this).parent().parent().siblings().find('.personal-action').css('opacity', '0');
      jQuery(this).css('opacity', '1');
    });
    jQuery('.event-search-icon').click(function () {
      jQuery('.event-search input').css('width', '180px');
    });
    jQuery(document).on('click touchstart', function () {
      jQuery('.event-search input').css('width', '0px');
    });
    jQuery('.event-search-icon, .event-search input').click(function (e) {
      e.stopPropagation();
    }); //for iphone zoom page

    document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    });
  } //event page navigation


  jQuery('#block-menu-menu-event-menu a.mobile-nav').click(function () {
    jQuery('#block-menu-menu-event-menu ul.menu').slideToggle();
  }); //city dropdown menu

  var ctymenu = jQuery('#block-itg-menu-manager-third-level-menu .cities-select-menu');
  ctymenu.click(function () {
    jQuery('#newlist').slideUp();
    jQuery(this).next('ul.cities-third-level-menu').stop().slideToggle();
  });
  jQuery(document).on('click', function () {
    jQuery('#block-itg-menu-manager-third-level-menu ul.cities-third-level-menu').slideUp();
  });
  ctymenu.click(function (e) {
    e.stopPropagation();
  }); //story page social share for mobile

  var getclick;
  jQuery('.comment-mobile .share-icon').toggle(function () {
    getclick = jQuery(this).parents('.comment-mobile').find('.social-share');
    getclick.css({
      'display': 'inline-block'
    });
  }, function () {
    getclick.css({
      'display': 'none'
    });
  }); // jQuery code to add Light off/on effect

  jQuery('body').on('click', '.light-off-on-tab', function () {
    jQuery(this).find('a').toggleClass('active');
    jQuery('body').toggleClass('light-off-overlay');
    jQuery('.program-livetv').toggleClass('effect-added');
  }); //footer css slider end

  jQuery('.emoji-container a').click(function () {
    var datavalue = jQuery(this).attr('data-click');

    if (datavalue === 'nice') {
      smilyanimation('smily');
    } else if (datavalue === 'no') {
      smilyanimation('smilysad');
    } else if (datavalue === 'whatever') {
      smilyanimation('wgmf');
    }
  }); // jQuery code to show embed code popup

  jQuery('.show-embed-code-link .embed-link').click(function (e) {
    jQuery(this).toggleClass('active');
    jQuery(this).next('.show-embed-code-div').stop().fadeToggle();
    e.stopPropagation();
    return false;
  });
  jQuery('.show-embed-code-div').click(function (e) {
    e.stopPropagation();
  });
  jQuery(document).click(function () {
    jQuery('.show-embed-code-div').hide();
  });

  if (window.innerWidth <= 768) {
    jQuery('.drkmode').removeClass('hide');
    jQuery('.navigation .nav-items.ripple-effect.hide').removeClass('hide');
    jQuery('.navigation .all-menu').addClass('hide');
  }
});

/***/ }),

/***/ "./resources/js/interface/lazysizes.min.js":
/*!*************************************************!*\
  !*** ./resources/js/interface/lazysizes.min.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! lazysizes - v4.0.2 */
!function (a, b) {
  var c = b(a, a.document);
  a.lazySizes = c, "object" == ( false ? 0 : _typeof(module)) && module.exports && (module.exports = c);
}(window, function (a, b) {
  "use strict";

  if (b.getElementsByClassName) {
    var c,
        d,
        e = b.documentElement,
        f = a.Date,
        g = a.HTMLPictureElement,
        h = "addEventListener",
        i = "getAttribute",
        j = a[h],
        k = a.setTimeout,
        l = a.requestAnimationFrame || k,
        m = a.requestIdleCallback,
        n = /^picture$/i,
        o = ["load", "error", "lazyincluded", "_lazyloaded"],
        p = {},
        q = Array.prototype.forEach,
        r = function r(a, b) {
      return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b];
    },
        s = function s(a, b) {
      r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b);
    },
        t = function t(a, b) {
      var c;
      (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "));
    },
        u = function u(a, b, c) {
      var d = c ? h : "removeEventListener";
      c && u(a, b), o.forEach(function (c) {
        a[d](c, b);
      });
    },
        v = function v(a, d, e, f, g) {
      var h = b.createEvent("CustomEvent");
      return e || (e = {}), e.instance = c, h.initCustomEvent(d, !f, !g, e), a.dispatchEvent(h), h;
    },
        w = function w(b, c) {
      var e;
      !g && (e = a.picturefill || d.pf) ? e({
        reevaluate: !0,
        elements: [b]
      }) : c && c.src && (b.src = c.src);
    },
        x = function x(a, b) {
      return (getComputedStyle(a, null) || {})[b];
    },
        y = function y(a, b, c) {
      for (c = c || a.offsetWidth; c < d.minSize && b && !a._lazysizesWidth;) {
        c = b.offsetWidth, b = b.parentNode;
      }

      return c;
    },
        z = function () {
      var a,
          c,
          d = [],
          e = [],
          f = d,
          g = function g() {
        var b = f;

        for (f = d.length ? e : d, a = !0, c = !1; b.length;) {
          b.shift()();
        }

        a = !1;
      },
          h = function h(d, e) {
        a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)));
      };

      return h._lsFlush = g, h;
    }(),
        A = function A(a, b) {
      return b ? function () {
        z(a);
      } : function () {
        var b = this,
            c = arguments;
        z(function () {
          a.apply(b, c);
        });
      };
    },
        B = function B(a) {
      var b,
          c = 0,
          e = d.throttleDelay,
          g = d.ricTimeout,
          h = function h() {
        b = !1, c = f.now(), a();
      },
          i = m && g > 49 ? function () {
        m(h, {
          timeout: g
        }), g !== d.ricTimeout && (g = d.ricTimeout);
      } : A(function () {
        k(h);
      }, !0);

      return function (a) {
        var d;
        (a = a === !0) && (g = 33), b || (b = !0, d = e - (f.now() - c), 0 > d && (d = 0), a || 9 > d ? i() : k(i, d));
      };
    },
        C = function C(a) {
      var b,
          c,
          d = 99,
          e = function e() {
        b = null, a();
      },
          g = function g() {
        var a = f.now() - c;
        d > a ? k(g, d - a) : (m || e)(e);
      };

      return function () {
        c = f.now(), b || (b = k(g, d));
      };
    };

    !function () {
      var b,
          c = {
        lazyClass: "lazyload",
        loadedClass: "lazyloaded",
        loadingClass: "lazyloading",
        preloadClass: "lazypreload",
        errorClass: "lazyerror",
        autosizesClass: "lazyautosizes",
        srcAttr: "data-src",
        srcsetAttr: "data-srcset",
        sizesAttr: "data-sizes",
        minSize: 40,
        customMedia: {},
        init: !0,
        expFactor: 1.5,
        hFac: .8,
        loadMode: 2,
        loadHidden: !0,
        ricTimeout: 0,
        throttleDelay: 125
      };
      d = a.lazySizesConfig || a.lazysizesConfig || {};

      for (b in c) {
        b in d || (d[b] = c[b]);
      }

      a.lazySizesConfig = d, k(function () {
        d.init && F();
      });
    }();

    var D = function () {
      var g,
          l,
          m,
          o,
          p,
          y,
          D,
          F,
          G,
          H,
          I,
          J,
          K,
          L,
          M = /^img$/i,
          N = /^iframe$/i,
          O = "onscroll" in a && !/glebot/.test(navigator.userAgent),
          P = 0,
          Q = 0,
          R = 0,
          S = -1,
          T = function T(a) {
        R--, a && a.target && u(a.target, T), (!a || 0 > R || !a.target) && (R = 0);
      },
          U = function U(a, c) {
        var d,
            f = a,
            g = "hidden" == x(b.body, "visibility") || "hidden" != x(a, "visibility");

        for (F -= c, I += c, G -= c, H += c; g && (f = f.offsetParent) && f != b.body && f != e;) {
          g = (x(f, "opacity") || 1) > 0, g && "visible" != x(f, "overflow") && (d = f.getBoundingClientRect(), g = H > d.left && G < d.right && I > d.top - 1 && F < d.bottom + 1);
        }

        return g;
      },
          V = function V() {
        var a,
            f,
            h,
            j,
            k,
            m,
            n,
            p,
            q,
            r = c.elements;

        if ((o = d.loadMode) && 8 > R && (a = r.length)) {
          f = 0, S++, null == K && ("expand" in d || (d.expand = e.clientHeight > 500 && e.clientWidth > 500 ? 500 : 370), J = d.expand, K = J * d.expFactor), K > Q && 1 > R && S > 2 && o > 2 && !b.hidden ? (Q = K, S = 0) : Q = o > 1 && S > 1 && 6 > R ? J : P;

          for (; a > f; f++) {
            if (r[f] && !r[f]._lazyRace) if (O) {
              if ((p = r[f][i]("data-expand")) && (m = 1 * p) || (m = Q), q !== m && (y = innerWidth + m * L, D = innerHeight + m, n = -1 * m, q = m), h = r[f].getBoundingClientRect(), (I = h.bottom) >= n && (F = h.top) <= D && (H = h.right) >= n * L && (G = h.left) <= y && (I || H || G || F) && (d.loadHidden || "hidden" != x(r[f], "visibility")) && (l && 3 > R && !p && (3 > o || 4 > S) || U(r[f], m))) {
                if (ba(r[f]), k = !0, R > 9) break;
              } else !k && l && !j && 4 > R && 4 > S && o > 2 && (g[0] || d.preloadAfterLoad) && (g[0] || !p && (I || H || G || F || "auto" != r[f][i](d.sizesAttr))) && (j = g[0] || r[f]);
            } else ba(r[f]);
          }

          j && !k && ba(j);
        }
      },
          W = B(V),
          X = function X(a) {
        s(a.target, d.loadedClass), t(a.target, d.loadingClass), u(a.target, Z), v(a.target, "lazyloaded");
      },
          Y = A(X),
          Z = function Z(a) {
        Y({
          target: a.target
        });
      },
          $ = function $(a, b) {
        try {
          a.contentWindow.location.replace(b);
        } catch (c) {
          a.src = b;
        }
      },
          _ = function _(a) {
        var b,
            c = a[i](d.srcsetAttr);
        (b = d.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c);
      },
          aa = A(function (a, b, c, e, f) {
        var g, h, j, l, o, p;
        (o = v(a, "lazybeforeunveil", b)).defaultPrevented || (e && (c ? s(a, d.autosizesClass) : a.setAttribute("sizes", e)), h = a[i](d.srcsetAttr), g = a[i](d.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), o = {
          target: a
        }, p && (u(a, T, !0), clearTimeout(m), m = k(T, 2500), s(a, d.loadingClass), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (N.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, {
          src: g
        })), a._lazyRace && delete a._lazyRace, t(a, d.lazyClass), z(function () {
          (!p || a.complete && a.naturalWidth > 1) && (p ? T(o) : R--, X(o));
        }, !0);
      }),
          ba = function ba(a) {
        var b,
            c = M.test(a.nodeName),
            e = c && (a[i](d.sizesAttr) || a[i]("sizes")),
            f = "auto" == e;
        (!f && l || !c || !a[i]("src") && !a.srcset || a.complete || r(a, d.errorClass) || !r(a, d.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, R++, aa(a, b, f, e, c));
      },
          ca = function ca() {
        if (!l) {
          if (f.now() - p < 999) return void k(ca, 999);
          var a = C(function () {
            d.loadMode = 3, W();
          });
          l = !0, d.loadMode = 3, W(), j("scroll", function () {
            3 == d.loadMode && (d.loadMode = 2), a();
          }, !0);
        }
      };

      return {
        _: function _() {
          p = f.now(), c.elements = b.getElementsByClassName(d.lazyClass), g = b.getElementsByClassName(d.lazyClass + " " + d.preloadClass), L = d.hFac, j("scroll", W, !0), j("resize", W, !0), a.MutationObserver ? new MutationObserver(W).observe(e, {
            childList: !0,
            subtree: !0,
            attributes: !0
          }) : (e[h]("DOMNodeInserted", W, !0), e[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function (a) {
            b[h](a, W, !0);
          }), /d$|^c/.test(b.readyState) ? ca() : (j("load", ca), b[h]("DOMContentLoaded", W), k(ca, 2e4)), c.elements.length ? (V(), z._lsFlush()) : W();
        },
        checkElems: W,
        unveil: ba
      };
    }(),
        E = function () {
      var a,
          c = A(function (a, b, c, d) {
        var e, f, g;
        if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || "")) for (e = b.getElementsByTagName("source"), f = 0, g = e.length; g > f; f++) {
          e[f].setAttribute("sizes", d);
        }
        c.detail.dataAttr || w(a, c.detail);
      }),
          e = function e(a, b, d) {
        var e,
            f = a.parentNode;
        f && (d = y(a, f, d), e = v(a, "lazybeforesizes", {
          width: d,
          dataAttr: !!b
        }), e.defaultPrevented || (d = e.detail.width, d && d !== a._lazysizesWidth && c(a, f, e, d)));
      },
          f = function f() {
        var b,
            c = a.length;
        if (c) for (b = 0; c > b; b++) {
          e(a[b]);
        }
      },
          g = C(f);

      return {
        _: function _() {
          a = b.getElementsByClassName(d.autosizesClass), j("resize", g);
        },
        checkElems: g,
        updateElem: e
      };
    }(),
        F = function F() {
      F.i || (F.i = !0, E._(), D._());
    };

    return c = {
      cfg: d,
      autoSizer: E,
      loader: D,
      init: F,
      uP: w,
      aC: s,
      rC: t,
      hC: r,
      fire: v,
      gW: y,
      rAF: z
    };
  }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./resources/js/app_interface.js ***!
  \***************************************/
__webpack_require__(/*! ./interface/js_jquery */ "./resources/js/interface/js_jquery.js");

__webpack_require__(/*! ./interface/js_flexslider */ "./resources/js/interface/js_flexslider.js");

__webpack_require__(/*! ./interface/lazysizes.min */ "./resources/js/interface/lazysizes.min.js");

__webpack_require__(/*! ./interface/js_others */ "./resources/js/interface/js_others.js");
})();

/******/ })()
;