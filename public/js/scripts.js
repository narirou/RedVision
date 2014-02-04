$( function() {
	'use strict';

    var $content              = $( '#content' ),
        $collectionsContainer = $( '#collections-container'),
        $collections          = $( '#collections' ),
        $viewContainer        = $( '#view-container' ),
        $header               = $( '#header' );

	var viewWidth = $viewContainer.width() + 1,
		viewOpen,
		$itemSelected,
		$iconSelected;


	function init() {
		setRoute();
		attachPintarestGridEvent();
		attachItemEvent();
		attachCounterEvent();
		loadItems();
	}

	function setRoute() {
		page( '/', closeView );
		page( '/about', openAboutView );
		page( '/help', openHelpView );
		page( '/collections/:itemId', openItemView );
		page();
	}

	function attachPintarestGridEvent() {
		$collections.pinterestGrid({
			offsetX: 20,
			offsetY: 20,
			selector: '.item'
		});
		$( window ).on( 'debouncedresize', function() {
			$collections.pinterestGrid( 'update' );
		});
	}

	function attachItemEvent() {
		var closeIfOpen = function( event ) {
			var $target = $( event.currentTarget );
			if( $target.hasClass( 'open' ) ) {
				page( '/' );
				event.preventDefault();
			}
		};
		$collections.on( 'click', '.item', closeIfOpen );
		$header.on( 'click', '#icon-about, #icon-help', closeIfOpen );
	}

	function attachCounterEvent() {
		$viewContainer.on( 'click', 'button', function( event ) {
			var $button = $( event.currentTarget ),
				$counter = $viewContainer.find( '#counter' ),
				itemId = $itemSelected.data( 'id' ),
				url = itemId + $button.data( 'url' );

			$.ajax({
				type: 'POST',
				url: url
			})
			.done( function( data ) {
				if( $button.hasClass( 'yes' ) ) {
					$counter.addClass( 'voted-yes disabled' );
				}
				else if( $button.hasClass( 'no' ) ) {
					$counter.addClass( 'voted-no disabled' );
				}

				setCounter( data );
			});

			event.preventDefault();
		});
	}

	function closeView() {
		view( 'close' );
	}

	function openAboutView() {
		view( 'about' );
	}

	function openHelpView() {
		view( 'help' );
	}

	function openItemView( ctx ) {
		view( 'item', ctx.params.itemId );
	}

	function view( type, itemId ) {
		var viewNextOpen = type + itemId,
			contentUrl;

		switch( type ) {
			case 'item':
				selectItem( itemId );
				selectHeaderIcon( '' );
				contentUrl = '/collections/' + itemId + '/contents';
			break;

			case 'about':
				selectItem( '' );
				selectHeaderIcon( 'about' );
				contentUrl = '/about/contents';
			break;

			case 'help':
				selectItem( '' );
				selectHeaderIcon( 'help' );
				contentUrl = '/help/contents';
			break;

			case 'close':
				selectItem( '' );
				selectHeaderIcon( '' );
				viewOpen = '';
				toggleView( 0, '' );
			return;
		}

		// open
		if( ! viewOpen ) {
			viewOpen = viewNextOpen;
			toggleView( viewWidth, contentUrl );
		}
		// change
		else if( viewOpen !== viewNextOpen ) {
			viewOpen = viewNextOpen;
			changeView( contentUrl );
		}
	}

	function toggleView( viewWidth, contentUrl ) {
		var contentAnimation = $content.stop().animate({
			paddingRight: viewWidth
		}, 500, 'easeOutExpo' );

		var viewAnimation = $viewContainer.stop().animate({
			marginRight: -1 * viewWidth
		}, 500, 'easeOutExpo' );

		var moveFinished = function() {
			$collections.pinterestGrid( 'update' );

			setTimeout( function() {
				$collectionsContainer.removeClass( 'moving' );
			}, 1000 );

			changeView( contentUrl );
		};

		$collectionsContainer.addClass( 'moving' );

		$.when( contentAnimation, viewAnimation ).then( moveFinished );
	}

	function changeView( contentUrl ) {
		if( contentUrl ) {
			$viewContainer.addClass( 'loading' );

			var requestContent = $.get( contentUrl ).done( function( contents ){
				if( contents === 'item not found.' ) {
					return;
				}

				var $img = $( contents ).find( '.image img' );

				console.log( $img );

				if( $img.length ) {
					// $img.one( 'load', function() {
					// 	$viewContainer.removeClass( 'loading' ).html( contents );
					// 	setCounter();
					// });
					$img[ 0 ].onload = function() {
						$viewContainer.removeClass( 'loading' ).html( contents );
						setCounter();
					}
				}
				else {
					$viewContainer.removeClass( 'loading' ).html( contents );
					setCounter();
				}
			});
		}
		else {
			$viewContainer.html( '' );
		}
	}

	function selectItem( itemId ) {
		if( $itemSelected ) {
			$itemSelected.removeClass( 'open' );
		}
		if( itemId ) {
			$itemSelected = $collections.find( '#item-' + itemId ).addClass( 'open' );
		}
	}

	function selectHeaderIcon( iconId ) {
		if( $iconSelected ) {
			$iconSelected.removeClass( 'open' );
		}
		if( iconId ) {
			$iconSelected = $header.find( '#icon-' + iconId ).addClass( 'open' );
		}
	}

	function setCounter( data ) {
		var $counter = $viewContainer.find( '.bar' ),
			status = $counter.data( 'status' ),
			yes,
			no,
			all,
			yesPersentage,
			noPersentage,
			level;

		if( data ) {
			yes = data.yes;
			no = data.no;
		}
		else {
			yes = $counter.data( 'yes' );
			no = $counter.data( 'no' );
		}
		all = yes + no;

		if( status === 'empty' || all <= 0 ) {
			yesPersentage = 0;
			noPersentage = 0;
		}
		else if( status === 'dead' ) {
			yesPersentage = 100;
			noPersentage = 0;
		}
		else {
			var persentage = yes / all;
			yesPersentage = Math.floor( 100 * persentage );
			noPersentage = 100 - yesPersentage;
			level = Math.floor( 10 * persentage );
		}

		$counter.children( '.yes' ).width( yesPersentage + '%' );
		$counter.children( '.no' ).width( noPersentage + '%' );

		if( $itemSelected && ! $itemSelected.hasClass( 'level-' + level ) ) {
			$itemSelected
				.removeClass( function( index, css ) {
					return ( css.match( /level-[0-9]/g ) || [] ).join( ' ' );
				})
				.addClass( 'level-' + level );
		}
	}

	function loadItems() {
		var $items = $collectionsContainer.find( '.item' );

		$items.each( function( i, item ){
			var $item = $( this );

			setTimeout( function() {
				$item.removeClass( 'hide' );
			}, 150 * i );
		});
	}

	init();
});


