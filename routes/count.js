// Count
var async = require( 'async' ),
	db = require( '../models/db-collections' );

function counter( type, req, res ) {
	var itemId = req.params.itemId;

	var countObj;

	if( type === 'yes' ) {
		countObj = {
			$push: { 'yes.dates': ( new Date().getTime() ) },
			$inc: { 'yes.count': 1 }
		};
	}
	else {
		countObj = {
			$push: { 'no.dates': ( new Date().getTime() ) },
			$inc: { 'no.count': 1 }
		};
	}

	var insertDb = function( next ) {
		db.update( { id: itemId }, countObj, { upsert: true }, function( error ){
			next( error );
		});
	};

	var getCount = function( next ) {
		db.findOne( { id: itemId }, function( error, item ) {
			if( item ) {
				next( error, {
					yes: item.yes.count || 0,
					no: item.no.count || 0,
				});
			}
			else {
				next( 'item not found.' );
			}
		});
	};

	async.waterfall([
		insertDb,
		getCount,
	], function( error, count ) {
		if( ! error && count ) {
			res.send( count );
		}
		else {
			res.send('failed');
		}
	});
}

module.exports.up = function( req, res ) {
	counter( 'yes', req, res );
};

module.exports.down = function( req, res ) {
	counter( 'no', req, res );
};
