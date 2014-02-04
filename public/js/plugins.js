/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright ﾃつｩ 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright ﾃつｩ 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work?
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {
	var $event = $.event,
		$special,
		resizeTimeout;

	$special = $event.special.debouncedresize = {
		setup: function() {
			$( this ).on( "resize", $special.handler );
		},
		teardown: function() {
			$( this ).off( "resize", $special.handler );
		},
		handler: function( event, execAsap ) {
			// Save the context
			var context = this,
				args = arguments,
				dispatch = function() {
					// set correct event type
					event.type = "debouncedresize";
					$event.dispatch.apply( context, args );
				};

			if ( resizeTimeout ) {
				clearTimeout( resizeTimeout );
			}

			execAsap ?
				dispatch() :
				resizeTimeout = setTimeout( dispatch, $special.threshold );
		},
		threshold: 150
	};
})(jQuery);

///-------------------------------------------
// Pintarest Grid
( function( $ ) {
	var pluginName = 'pinterestGrid',
		defaults = {
			offsetX: 10,
			offsetY: 10,
			selector: 'div'
		};

	$.fn[ pluginName ] = function( arg ) {
		return this.each( function() {
			var instance = $.data( this, 'plugin_'+ pluginName );

			if( typeof arg === 'object' || typeof arg === 'undefined' ) {
				if( ! instance ) {
					$.data( this, 'plugin_'+ pluginName, new Plugin( this, arg ) );
				}
			}
			else if( typeof arg === 'string' && typeof instance[ arg ] === 'function' ) {
				instance[ arg ].apply( instance );
			}
		});
	};

	var Plugin = function( element, options ) {
		this.opts = $.extend( {}, defaults, options );

		this.$container = $( element );
		this.$containerOuter = this.$container.parent();
		this.colWidth = this.$container.children( this.opts.selector ).first().width() + this.opts.offsetX;
		this.numOfCol;
		this.gridArray = [];

		this.update();
	};

	Plugin.prototype = {

		update: function() {
			this.setCol();
			this.applyContainerWidth();
			this.applyPinterestGrid();
		},

		setCol: function() {
			this.numOfCol = Math.floor( ( this.$containerOuter.width() - this.opts.offsetX ) / this.colWidth );
		},

		applyContainerWidth: function() {
			var w = this.colWidth * this.numOfCol - this.opts.offsetX;
			var ml = ( this.$containerOuter.width() - w ) / 2;
			this.$container.css({
				width: w,
				marginLeft: ml
			});
		},

		applyContainerHeight: function() {
			var heightArray = this.getHeightArray( 0, this.gridArray.length );
			this.$container.height( heightArray.max - this.opts.offsetY );
		},

		applyPinterestGrid: function() {
			var self = this;

			this.createEmptyGridArray();

			this.$container.children( this.opts.selector ).each( function() {
				self.setPosition( $( this ) );
			});

			this.applyContainerHeight();
		},

		createEmptyGridArray: function() {
			this.gridArray = [];
			for( var i = 0; i < this.numOfCol; i++ ) {
				this.pushGridArray( i, 0, 1, -1 * this.opts.offsetY );
			}
		},

		pushGridArray: function( x, y, size, height ) {
			for( var i = 0; i < size; i++ ) {
				var grid = [];
				grid.x = x + i;
				grid.size = size;
				grid.endY = y + height + this.opts.offsetY;

				this.gridArray.push( grid );
			}
		},

		removeGridArray: function( x, size ) {
			for( var i = 0; i < size; i++ ) {
				var idx = this.getGridIndex( x + i );
				this.gridArray.splice( idx, 1 );
			}
		},

		getGridIndex: function( x ) {
			for( var i = 0, len = this.gridArray.length; i < len; i++ ) {
				var obj = this.gridArray[ i ];
				if( obj.x === x ) {
					return i;
				}
			}
		},

		getHeightArray: function( x, size ) {
			var heightArray = [];
			var temps = [];

			for( var i = 0; i < size; i++ ) {
				var idx = this.getGridIndex( x + i );
				temps.push( this.gridArray[ idx ].endY );
			}
			heightArray.min = Math.min.apply( Math, temps );
			heightArray.max = Math.max.apply( Math, temps );
			heightArray.x = $.inArray( heightArray.min, temps );

			return heightArray;
		},

		getGridPosition: function( size ) {
			if( size > 1 ) {
				var arrayLimit = this.gridArray.length - size,
					defined = false,
					tempHeight;

				for( var i = 0, len = this.gridArray.length; i < len; i++ ) {
					var obj = this.gridArray[i],
						x = obj.x;

					if( x >= 0 && x <= arrayLimit ) {
						var heightArray = this.getHeightArray( x, size );

						if( ! defined ) {
							defined = true;
							tempHeight = heightArray;
							tempHeight.x = x;
						}
						else {
							if( heightArray.max < tempHeight.max ) {
								tempHeight = heightArray;
								tempHeight.x = x;
							}
						}
					}
				}
				return tempHeight;
			}
			else {
				return this.getHeightArray( 0, this.gridArray.length );
			}
		},

		setPosition: function( $item ) {
			var sizeData = $item.data( 'size' );
			var size;

			if( ! sizeData || sizeData < 0 ) {
				size = 1;
			}
			else if ( sizeData > this.numOfCol ) {
				size = this.numOfCol;
			}
			else {
				size = sizeData;
			}

			var tempHeight = this.getGridPosition( size );
			var pos = [];

			pos.x = tempHeight.x;
			pos.y = ( size > 1 ) ? tempHeight.max : tempHeight.min;

			var gridWidth = this.colWidth * size - ($item.outerWidth() - $item.width());
			$item.css({
				'width': gridWidth - this.opts.offsetX,
				'left': pos.x * this.colWidth,
				'top': pos.y,
				'position': 'absolute'
			});

			this.removeGridArray( pos.x, size );
			this.pushGridArray( pos.x, pos.y, size, $item.outerHeight() );
		}
	};

})( jQuery );
