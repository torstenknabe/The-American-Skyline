jQuery(function() {
	// initSlickCarousel();
	// initLightbox();
	initMobileNav();
	initStickyScrollBlock();
	// initSameHeight();
//	Seeding();
//	jQuery('input, textarea').placeholder();
//	jQuery('.newssearchtext').html('Browse Documents');
});

// align blocks height
// function initSameHeight() {
// 	jQuery('.media-block .posts').sameHeight({
// 		elements: '.post',
// 		flexible: true,
// 		multiLine: true,
// 		biggestHeight: true
// 	});
// }

// function Seeding()
// {
// 	SeedHelper('email',$('input[id*=EmailControl]'));
// }

// function SeedHelper (parameterString, targetInput)
// {
//   var param = $.url(true).param(parameterString);
//   if(param!=null)
//   {
//     param = unescape(param.replace(/\+/g, ' '));
//     targetInput.val(param);
//   }
// }


// slick init
// function initSlickCarousel() {
// 	jQuery('.hero-area .slick-slider').slick({
// 		slidesToScroll: 1,
// 		prevArrow: '<button class="slick-prev"><span class="icon-arrows"></span></button>',
// 		nextArrow: '<button class="slick-next"><span class="icon-arrows2"></span></button>',
// 		dots: true,
// 		dotsClass: 'slick-dots',
// 		fade: true
// 	});

// 	jQuery('.information-slider .slick-slider').slick({
// 		slidesToShow: 6,
// 		slidesToScroll: 1,
// 		prevArrow: '<button class="slick-prev"><span class="icon-arrows"></span></button>',
// 		nextArrow: '<button class="slick-next"><span class="icon-arrows2"></span></button>',
// 		responsive: [{
// 			breakpoint: 1200,
// 			settings: {
// 				slidesToScroll: 1,
// 				slidesToShow: 4
// 			}
// 		}, {
// 			breakpoint: 1024,
// 			settings: {
// 				slidesToScroll: 1,
// 				slidesToShow: 3
// 			}
// 		}, {
// 			breakpoint: 480,
// 			settings: {
// 				slidesToScroll: 1,
// 				slidesToShow: 2
// 			}
// 		}]
// 	});
// }

// lightbox init
// function initLightbox() {
// 	jQuery('a.lightbox, a[rel*="lightbox"]').fancybox({
// 		width: "100%",
// 		height: "100%",
// 		helpers: {
// 			overlay: {
// 				css: {
// 					background: 'rgba(0, 0, 0, 0.65)'
// 				}
// 			}
// 		},
// 		afterLoad: function(current, previous) {
// 			// handle custom close button in inline modal
// 			if (current.href.indexOf('#') === 0) {
// 				jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e) {
// 					e.preventDefault();
// 					jQuery.fancybox.close();
// 				});
// 			}
// 		},
// 		wrapCSS: 'false',
// 		padding: 25,
// 	});
// }

// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		menuActiveClass: 'nav-active',
		menuOpener: '.nav-opener',
		hideOnClickOutside: true,
		menuDrop: '.menu-holder'
	});

	var menuBtn = $('.nav-opener');
	var body = $('body');
	var header = $('#header');
	var menuHolder = $('.menu-holder');
	var heightHeader = header.outerHeight();
	$(window).on('scroll', function () {
		if(body.hasClass('nav-active') && heightHeader!==header.outerHeight()){
			heightHeader = header.outerHeight();
			var windowHeight = $(window).height();
			menuHolder.height((windowHeight - heightHeader)+'px');
		}
	});
	$(window).on('resize',function () {
		if(body.hasClass('nav-active')){
			heightHeader = header.outerHeight();
			var windowHeight = $(window).height();
			menuHolder.height((windowHeight - heightHeader)+'px');
		}
	});
	menuBtn.on('click',function () {
		if(body.hasClass('nav-active')){
			heightHeader = header.outerHeight();
			var windowHeight = $(window).height();
			menuHolder.height((windowHeight - heightHeader)+'px');
		}
	});

}

// initialize fixed blocks on scroll
function initStickyScrollBlock() {
	jQuery('#header').stickyScrollBlock({
		setBoxHeight: true,
		activeClass: 'fixed-position',
		positionType: 'fixed'
	});
}



/*
 * Simple Mobile Navigation
 */
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
			doc = $('html'),
			resizeClass = 'resize-active',
			flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function() {
			var $container = jQuery(this);
			var instance = $container.data('MobileNav');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$container.data('MobileNav', new MobileNav($.extend({
					container: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));

/*
 * jQuery sticky box plugin 
 */
;(function($, $win) {
	'use strict';

	function StickyScrollBlock($stickyBox, options) {
		this.options = options;
		this.$stickyBox = $stickyBox;
		this.init();
	}

	var StickyScrollBlockPrototype = {
		init: function() {
			this.findElements();
			this.attachEvents();
			this.makeCallback('onInit');
		},

		findElements: function() {
			// find parent container in which will be box move 
			this.$container = this.$stickyBox.closest(this.options.container);
			// define box wrap flag
			this.isWrap = this.options.positionType === 'fixed' && this.options.setBoxHeight;
			// define box move flag
			this.moveInContainer = !!this.$container.length;
			// wrapping box to set place in content
			if (this.isWrap) {
				this.$stickyBoxWrap = this.$stickyBox.wrap('<div class="' + this.getWrapClass() + '"/>').parent();
			}
			//define block to add active class
			this.parentForActive = this.getParentForActive();
			this.isInit = true;
		},

		attachEvents: function() {
			var self = this;

			// bind events
			this.onResize = function() {
				if (!self.isInit) return;
				self.resetState();
				self.recalculateOffsets();
				self.checkStickyPermission();
				self.scrollHandler();
			};

			this.onScroll = function() {
				self.scrollHandler();
			};

			// initial handler call
			this.onResize();

			// handle events
			$win.on('load resize orientationchange', this.onResize)
				.on('scroll', this.onScroll);
		},

		defineExtraTop: function() {
			// define box's extra top dimension
			var extraTop;

			if (typeof this.options.extraTop === 'number') {
				extraTop = this.options.extraTop;
			} else if (typeof this.options.extraTop === 'function') {
				extraTop = this.options.extraTop();
			}

			this.extraTop = this.options.positionType === 'absolute' ?
				extraTop :
				Math.min(this.winParams.height - this.data.boxFullHeight, extraTop);
		},

		checkStickyPermission: function() {
			// check the permission to set sticky
			this.isStickyEnabled = this.moveInContainer ?
				this.data.containerOffsetTop + this.data.containerHeight > this.data.boxFullHeight + this.data.boxOffsetTop + this.options.extraBottom :
				true;
		},

		getParentForActive: function() {
			if (this.isWrap) {
				return this.$stickyBoxWrap;
			}

			if (this.$container.length) {
				return this.$container;
			}

			return this.$stickyBox;
		},

		getWrapClass: function() {
			// get set of container classes
			try {
				return this.$stickyBox.attr('class').split(' ').map(function(name) {
					return 'sticky-wrap-' + name;
				}).join(' ');
			} catch (err) {
				return 'sticky-wrap';
			}
		},

		resetState: function() {
			// reset dimensions and state
			this.stickyFlag = false;
			this.$stickyBox.css({
				'-webkit-transition': '',
				'-webkit-transform': '',
				transition: '',
				transform: '',
				position: '',
				width: '',
				left: '',
				top: ''
			}).removeClass(this.options.activeClass);

			if (this.isWrap) {
				this.$stickyBoxWrap.removeClass(this.options.activeClass).removeAttr('style');
			}

			if (this.moveInContainer) {
				this.$container.removeClass(this.options.activeClass);
			}
		},

		recalculateOffsets: function() {
			// define box and container dimensions
			this.winParams = this.getWindowParams();

			this.data = $.extend(
				this.getBoxOffsets(),
				this.getContainerOffsets()
			);

			this.defineExtraTop();
		},

		getBoxOffsets: function() {
			var boxOffset = this.$stickyBox.offset();
			var boxPosition = this.$stickyBox.position();

			return {
				// sticky box offsets
				boxOffsetLeft: boxOffset.left,
				boxOffsetTop: boxOffset.top,
				// sticky box positions
				boxTopPosition: boxPosition.top,
				boxLeftPosition: boxPosition.left,
				// sticky box width/height
				boxFullHeight: this.$stickyBox.outerHeight(true),
				boxHeight: this.$stickyBox.outerHeight(),
				boxWidth: this.$stickyBox.outerWidth()
			};
		},

		getContainerOffsets: function() {
			var containerOffset = this.moveInContainer ? this.$container.offset() : null;

			return containerOffset ? {
				// container offsets
				containerOffsetLeft: containerOffset.left,
				containerOffsetTop: containerOffset.top,
				// container height
				containerHeight: this.$container.outerHeight()
			} : {};
		},

		getWindowParams: function() {
			return {
				height: window.innerHeight || document.documentElement.clientHeight
			};
		},

		makeCallback: function(name) {
			if (typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		},

		destroy: function() {
			this.isInit = false;
			// remove event handlers and styles
			$win.off('load resize orientationchange', this.onResize)
				.off('scroll', this.onScroll);
			this.resetState();
			this.$stickyBox.removeData('StickyScrollBlock');
			if (this.isWrap) {
				this.$stickyBox.unwrap();
			}
			this.makeCallback('onDestroy');
		}
	};

	var stickyMethods = {
		fixed: {
			scrollHandler: function() {
				this.winScrollTop = $win.scrollTop();
				var isActiveSticky = this.winScrollTop -
					(this.options.showAfterScrolled ? this.extraTop : 0) -
					(this.options.showAfterScrolled ? this.data.boxHeight + this.extraTop : 0) >
					this.data.boxOffsetTop - this.extraTop;

				if (isActiveSticky) {
					this.isStickyEnabled && this.stickyOn();
				} else {
					this.stickyOff();
				}
			},

			stickyOn: function() {
				if (!this.stickyFlag) {
					this.stickyFlag = true;
					this.parentForActive.addClass(this.options.activeClass);
					this.$stickyBox.css({
						width: this.data.boxWidth,
						position: this.options.positionType
					});
					if (this.isWrap) {
						this.$stickyBoxWrap.css({
							height: this.data.boxFullHeight
						});
					}
					this.makeCallback('fixedOn');
				}
				this.setDynamicPosition();
			},

			stickyOff: function() {
				if (this.stickyFlag) {
					this.stickyFlag = false;
					this.resetState();
					this.makeCallback('fixedOff');
				}
			},

			setDynamicPosition: function() {
				this.$stickyBox.css({
					top: this.getTopPosition(),
					left: this.data.boxOffsetLeft - $win.scrollLeft()
				});
			},

			getTopPosition: function() {
				if (this.moveInContainer) {
					var currScrollTop = this.winScrollTop + this.data.boxHeight + this.options.extraBottom;

					return Math.min(this.extraTop, (this.data.containerHeight + this.data.containerOffsetTop) - currScrollTop);
				} else {
					return this.extraTop;
				}
			}
		},
		absolute: {
			scrollHandler: function() {
				this.winScrollTop = $win.scrollTop();
				var isActiveSticky = this.winScrollTop > this.data.boxOffsetTop - this.extraTop;

				if (isActiveSticky) {
					this.isStickyEnabled && this.stickyOn();
				} else {
					this.stickyOff();
				}
			},

			stickyOn: function() {
				if (!this.stickyFlag) {
					this.stickyFlag = true;
					this.parentForActive.addClass(this.options.activeClass);
					this.$stickyBox.css({
						width: this.data.boxWidth,
						transition: 'transform ' + this.options.animSpeed + 's ease',
						'-webkit-transition': 'transform ' + this.options.animSpeed + 's ease',
					});

					if (this.isWrap) {
						this.$stickyBoxWrap.css({
							height: this.data.boxFullHeight
						});
					}

					this.makeCallback('fixedOn');
				}

				this.clearTimer();
				this.timer = setTimeout(function() {
					this.setDynamicPosition();
				}.bind(this), this.options.animDelay * 1000);
			},

			stickyOff: function() {
				if (this.stickyFlag) {
					this.clearTimer();
					this.stickyFlag = false;

					this.timer = setTimeout(function() {
						this.setDynamicPosition();
						setTimeout(function() {
							this.resetState();
						}.bind(this), this.options.animSpeed * 1000);
					}.bind(this), this.options.animDelay * 1000);
					this.makeCallback('fixedOff');
				}
			},

			clearTimer: function() {
				clearTimeout(this.timer);
			},

			setDynamicPosition: function() {
				var topPosition = Math.max(0, this.getTopPosition());

				this.$stickyBox.css({
					transform: 'translateY(' + topPosition + 'px)',
					'-webkit-transform': 'translateY(' + topPosition + 'px)'
				});
			},

			getTopPosition: function() {
				var currTopPosition = this.winScrollTop - this.data.boxOffsetTop + this.extraTop;

				if (this.moveInContainer) {
					var currScrollTop = this.winScrollTop + this.data.boxHeight + this.options.extraBottom;
					var diffOffset = Math.abs(Math.min(0, (this.data.containerHeight + this.data.containerOffsetTop) - currScrollTop - this.extraTop));

					return currTopPosition - diffOffset;
				} else {
					return currTopPosition;
				}
			}
		}
	};

	// jQuery plugin interface
	$.fn.stickyScrollBlock = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		var options = $.extend({
			container: null,
			positionType: 'fixed', // 'fixed' or 'absolute'
			activeClass: 'fixed-position',
			setBoxHeight: true,
			showAfterScrolled: false,
			extraTop: 0,
			extraBottom: 0,
			animDelay: 0.1,
			animSpeed: 0.2
		}, opt);

		return this.each(function() {
			var $stickyBox = jQuery(this);
			var instance = $stickyBox.data('StickyScrollBlock');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				StickyScrollBlock.prototype = $.extend(stickyMethods[options.positionType], StickyScrollBlockPrototype);
				$stickyBox.data('StickyScrollBlock', new StickyScrollBlock($stickyBox, options));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};

	// module exports
	window.StickyScrollBlock = StickyScrollBlock;
}(jQuery, jQuery(window)));

// /*! http://mths.be/placeholder v2.0.7 by @mathias */
// ;(function(window, document, $) {

//     // Opera Mini v7 doesnâ€™t support placeholder although its DOM seems to indicate so
//     var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
//     var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
//     var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
//     var prototype = $.fn;
//     var valHooks = $.valHooks;
//     var propHooks = $.propHooks;
//     var hooks;
//     var placeholder;

//     if (isInputSupported && isTextareaSupported) {

//         placeholder = prototype.placeholder = function() {
//             return this;
//         };

//         placeholder.input = placeholder.textarea = true;

//     } else {

//         placeholder = prototype.placeholder = function() {
//             var $this = this;
//             $this
//                 .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
//                 .not('.placeholder')
//                 .bind({
//                     'focus.placeholder': clearPlaceholder,
//                     'blur.placeholder': setPlaceholder
//                 })
//                 .data('placeholder-enabled', true)
//                 .trigger('blur.placeholder');
//             return $this;
//         };

//         placeholder.input = isInputSupported;
//         placeholder.textarea = isTextareaSupported;

//         hooks = {
//             'get': function(element) {
//                 var $element = $(element);

//                 var $passwordInput = $element.data('placeholder-password');
//                 if ($passwordInput) {
//                     return $passwordInput[0].value;
//                 }

//                 return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
//             },
//             'set': function(element, value) {
//                 var $element = $(element);

//                 var $passwordInput = $element.data('placeholder-password');
//                 if ($passwordInput) {
//                     return $passwordInput[0].value = value;
//                 }

//                 if (!$element.data('placeholder-enabled')) {
//                     return element.value = value;
//                 }
//                 if (value == '') {
//                     element.value = value;
//                     // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
//                     if (element != safeActiveElement()) {
//                         // We can't use `triggerHandler` here because of dummy text/password inputs :(
//                         setPlaceholder.call(element);
//                     }
//                 } else if ($element.hasClass('placeholder')) {
//                     clearPlaceholder.call(element, true, value) || (element.value = value);
//                 } else {
//                     element.value = value;
//                 }
//                 // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
//                 return $element;
//             }
//         };

//         if (!isInputSupported) {
//             valHooks.input = hooks;
//             propHooks.value = hooks;
//         }
//         if (!isTextareaSupported) {
//             valHooks.textarea = hooks;
//             propHooks.value = hooks;
//         }

//         $(function() {
//             // Look for forms
//             $(document).delegate('form', 'submit.placeholder', function() {
//                 // Clear the placeholder values so they don't get submitted
//                 var $inputs = $('.placeholder', this).each(clearPlaceholder);
//                 setTimeout(function() {
//                     $inputs.each(setPlaceholder);
//                 }, 10);
//             });
//         });

//         // Clear placeholder values upon page reload
//         $(window).bind('beforeunload.placeholder', function() {
//             $('.placeholder').each(function() {
//                 this.value = '';
//             });
//         });

//     }

//     function args(elem) {
//         // Return an object of element attributes
//         var newAttrs = {};
//         var rinlinejQuery = /^jQuery\d+$/;
//         $.each(elem.attributes, function(i, attr) {
//             if (attr.specified && !rinlinejQuery.test(attr.name)) {
//                 newAttrs[attr.name] = attr.value;
//             }
//         });
//         return newAttrs;
//     }

//     function clearPlaceholder(event, value) {
//         var input = this;
//         var $input = $(input);
//         if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
//             if ($input.data('placeholder-password')) {
//                 $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
//                 // If `clearPlaceholder` was called from `$.valHooks.input.set`
//                 if (event === true) {
//                     return $input[0].value = value;
//                 }
//                 $input.focus();
//             } else {
//                 input.value = '';
//                 $input.removeClass('placeholder');
//                 input == safeActiveElement() && input.select();
//             }
//         }
//     }

//     function setPlaceholder() {
//         var $replacement;
//         var input = this;
//         var $input = $(input);
//         var id = this.id;
//         if (input.value == '') {
//             if (input.type == 'password') {
//                 if (!$input.data('placeholder-textinput')) {
//                     try {
//                         $replacement = $input.clone().attr({ 'type': 'text' });
//                     } catch(e) {
//                         $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
//                     }
//                     $replacement
//                         .removeAttr('name')
//                         .data({
//                             'placeholder-password': $input,
//                             'placeholder-id': id
//                         })
//                         .bind('focus.placeholder', clearPlaceholder);
//                     $input
//                         .data({
//                             'placeholder-textinput': $replacement,
//                             'placeholder-id': id
//                         })
//                         .before($replacement);
//                 }
//                 $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
//                 // Note: `$input[0] != input` now!
//             }
//             $input.addClass('placeholder');
//             $input[0].value = $input.attr('placeholder');
//         } else {
//             $input.removeClass('placeholder');
//         }
//     }

//     function safeActiveElement() {
//         // Avoid IE9 `document.activeElement` of death
//         // https://github.com/mathiasbynens/jquery-placeholder/pull/99
//         try {
//             return document.activeElement;
//         } catch (err) {}
//     }

// }(this, document, jQuery));



/*
 * jQuery SameHeight plugin
 */
//  ;(function($){
//  	$.fn.sameHeight = function(opt) {
//  		var options = $.extend({
//  			skipClass: 'same-height-ignore',
//  			leftEdgeClass: 'same-height-left',
//  			rightEdgeClass: 'same-height-right',
//  			elements: '>*',
//  			flexible: false,
//  			multiLine: false,
//  			useMinHeight: false,
//  			biggestHeight: false
//  		},opt);
//  		return this.each(function(){
//  			var holder = $(this), postResizeTimer, ignoreResize;
//  			var elements = holder.find(options.elements).not('.' + options.skipClass);
//  			if(!elements.length) return;

// 			// resize handler
// 			function doResize() {
// 				elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
// 				if(options.multiLine) {
// 					// resize elements row by row
// 					resizeElementsByRows(elements, options);
// 				} else {
// 					// resize elements by holder
// 					resizeElements(elements, holder, options);
// 				}
// 			}
// 			doResize();

// 			// handle flexible layout / font resize
// 			var delayedResizeHandler = function() {
// 				if(!ignoreResize) {
// 					ignoreResize = true;
// 					doResize();
// 					clearTimeout(postResizeTimer);
// 					postResizeTimer = setTimeout(function() {
// 						doResize();
// 						setTimeout(function(){
// 							ignoreResize = false;
// 						}, 10);
// 					}, 100);
// 				}
// 			};

// 			// handle flexible/responsive layout
// 			if(options.flexible) {
// 				$(window).bind('resize orientationchange fontresize', delayedResizeHandler);
// 			}

// 			// handle complete page load including images and fonts
// 			$(window).bind('load', delayedResizeHandler);
// 		});
//  	};

// 	// detect css min-height support
// 	var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

// 	// get elements by rows
// 	function resizeElementsByRows(boxes, options) {
// 		var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
// 		boxes.each(function(ind){
// 			var curItem = $(this);
// 			if(curItem.offset().top === firstOffset) {
// 				currentRow = currentRow.add(this);
// 			} else {
// 				maxHeight = getMaxHeight(currentRow);
// 				maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
// 				currentRow = curItem;
// 				firstOffset = curItem.offset().top;
// 			}
// 		});
// 		if(currentRow.length) {
// 			maxHeight = getMaxHeight(currentRow);
// 			maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
// 		}
// 		if(options.biggestHeight) {
// 			boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
// 		}
// 	}

// 	// calculate max element height
// 	function getMaxHeight(boxes) {
// 		var maxHeight = 0;
// 		boxes.each(function(){
// 			maxHeight = Math.max(maxHeight, $(this).outerHeight());
// 		});
// 		return maxHeight;
// 	}

// 	// resize helper function
// 	function resizeElements(boxes, parent, options) {
// 		var calcHeight;
// 		var parentHeight = typeof parent === 'number' ? parent : parent.height();
// 		boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
// 			var element = $(this);
// 			var depthDiffHeight = 0;
// 			var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || element.css('-webkit-box-sizing') === 'border-box';

// 			if(typeof parent !== 'number') {
// 				element.parents().each(function(){
// 					var tmpParent = $(this);
// 					if(parent.is(this)) {
// 						return false;
// 					} else {
// 						depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
// 					}
// 				});
// 			}
// 			calcHeight = parentHeight - depthDiffHeight;
// 			calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

// 			if(calcHeight > 0) {
// 				element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
// 			}
// 		});
// 		boxes.filter(':first').addClass(options.leftEdgeClass);
// 		boxes.filter(':last').addClass(options.rightEdgeClass);
// 		return calcHeight;
// 	}
// }(jQuery));