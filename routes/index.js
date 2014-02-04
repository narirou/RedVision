// TopPage

module.exports = function( req, res ){
	var async = require( 'async' ),
		path = require( 'path' ),
		fs = require( 'fs' ),
		db = require( '../models/db-collections' );

	var getCollections = function( next ) {
		db.find( {} ).limit( 100 ).exec( function( error, items ) {
			next( error, items );
		});
	};

	var getSvg = function( items, next ) {
		var itemsWithSvg = [],
			undefSvgPath = path.resolve( 'collections', '#undefined', 'thumb.svg' );

		async.each( items, function( item, nextItem ) {
			var svgPath = path.resolve( 'collections', item.id, 'thumb.svg' );

			var set = function( path ) {
				fs.readFile( path, { encoding: 'utf8' }, function( error, svg ) {
					if( svg && ! error ) {
						item.svg = svg;
					}
					itemsWithSvg.push( item );
					nextItem();
				});
			};

			fs.exists( svgPath, function( exists ) {
				if( exists ) {
					set( svgPath );
				}
				else {
					set( undefSvgPath );
				}
			});

		}, function( error ) {
			next( error, itemsWithSvg );
		});
	};

	async.waterfall([
		getCollections,
		getSvg,
	], function( error, items ) {
		res.render( 'index', {
			items: items
		});
	});
};
