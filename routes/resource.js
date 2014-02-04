// Resouce

module.exports = function( req, res ) {
	var fs = require( 'fs' ),
		path = require( 'path' ),
		db = require( '../models/db-collections' );

	var resourceType = req.params.resourceType,
		itemId = req.params.itemId;

	switch( resourceType ) {

		// JSON
		case 'json':
			if( itemId === 'all' ) {
				db.find( {}, function( error, items ) {
					if( items.length ) {
						res.jsonp( items );
					}
				});
			}
			else if( itemId ) {
				db.find( { id: itemId }, function( error, item ) {
					if( item.length ) {
						res.jsonp( item );
					}
					else {
						res.send( 403, 'item not found.' );
					}
				});
			}
			else {
				res.send( 403, 'item not found.' );
			}
		break;

		// IMAGE
		case 'image':
			var imagePath = path.resolve( './collections/', itemId, 'image.png' );
			fs.stat( imagePath, function( error ) {
				if( error ) {
					res.sendfile( path.resolve( './collections/#undefined', 'image.png' ) );
				}
				else {
					res.sendfile( imagePath );
				}
			});
		break;

		// SVG
		case 'thumb':
			var thumbPath = path.resolve( './collections/', itemId, 'thumb.svg' );
			fs.stat( thumbPath, function( error ) {
				if( error ) {
					res.sendfile( path.resolve( './collections/#undefined', 'thumb.svg' ) );
				}
				else {
					res.sendfile( thumbPath );
				}
			});
		break;

		// VIEW CONTENTS
		case 'contents':
			if( itemId ) {
				db.findOne( { id: itemId }, function( error, item ) {
					if( item ) {
						res.render( 'view-item', { item: item } );
					}
					else {
						res.send( 403, 'item not found.' );
					}
				});
			}
		break;

		// NOT FOUND
		default:
		break;
	}
};
