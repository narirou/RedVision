// Update Collections Database

module.exports = function( req, res ) {
	var fs = require( 'fs' ),
		path = require( 'path' ),
		async = require( 'async' ),
		db = require( '../models/db-collections' );

	var collectionsPath = './collections/';

	function clearDb( next ) {
		db.remove( {}, {}, function() {
			next();
		});
	}

	function getList( next ) {
		var list = [];

		fs.readdir( collectionsPath, function( error, folders ) {
			if( error ) {
				throw new Error( error );
			}

			folders.forEach( function( folder ) {
				var itemPath = path.join( collectionsPath, folder ),
					stat = fs.statSync( itemPath );

				// skip #undefined
				if( folder.charAt(0) === '#' ) {
					return;
				}

				if( stat && stat.isDirectory() ) {
					list.push( folder )
				}
			});

			next( null, list );
		});
	}

	function getCollections( list, next ) {
		var collections = [];

		list.forEach( function( id ) {
			var jsonPath = path.join( collectionsPath, id, 'data.txt' ),
				jsonString = fs.readFileSync( jsonPath, 'utf-8' ),
				data = JSON.parse( jsonString );

			if( data ) {
				data.dead = data.dead || false;
				data.yes = {
					dates: [],
					count: 0
				};
				data.no = {
					dates: [],
					count: 5
				};

				collections.push( data );
			}
		});
		next( null, collections );
	}

	function insertDb( collections, next ) {
		async.eachSeries( collections, function( item, nextItem ) {

			db.update( { id: item.id }, { $set: item }, { upsert: true }, function( error ) {
				if( error ) {
					next( error );
				}
				nextItem();
			});

		}, function() {
			next( null, collections );
		});
	}

	async.waterfall([
		clearDb,
		getList,
		getCollections,
		insertDb,
	], function( error, collections ) {

		if( error ) {
			console.log( error );
			res.render( 'update', {
				title: 'Update Collections',
				log: 'update failed...',
			});
		}
		else {
			console.log( collections );
			res.render( 'update', {
				title: 'Update Collections',
				log: 'all collections are updated !',
			});
		}
	});
};
