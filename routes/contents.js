module.exports.help = function( req, res ) {
	var fs = require( 'fs' ),
		path = require( 'path' );

	var japanese_wolf_thumb_path = path.resolve( 'collections', 'japanese-wolf', 'thumb.svg' );

	fs.readFile( japanese_wolf_thumb_path, { encoding: 'utf8' }, function( error, svg ) {
		res.render( 'view-help', {
			japanese_wolf_svg: svg
		});
	});
}

module.exports.about = function( req, res ) {
	res.render( 'view-about' );
}
