var express = require( 'express' ),
	http = require( 'http' ),
	path = require( 'path' ),
	routes = {
		index:    require( './routes/index' ),
		redirect: require( './routes/redirect' ),
		update:   require( './routes/update' ),
		resource: require( './routes/resource' ),
		contents: require( './routes/contents' ),
		count:    require( './routes/count' ),
	};

var redirectSlash = function( req, res, next ) {
	var url = req.url;
	if( url.length > 1 && url.substr( -1 ) === '/' ) {
		res.redirect( 301, url.slice( 0, -1 ) );
	}
	else {
		next();
	}
};

var app = express();

// configs
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );
app.set( express.favicon(  path.join( __dirname, 'public/img/favicon.ico' ) ) );
app.use( express.json() );
app.use( express.urlencoded() );
app.use( express.logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded() );
app.use( express.methodOverride() );
app.use( express.compress( { level: 1 } ) );
app.use( redirectSlash );
app.use( app.router );
app.use( express.static( path.join( __dirname, 'public' ) ) );

if( 'development' == app.get( 'env' ) ) {
	app.use( express.errorHandler() );
}

// routes
app.get( '/', routes.index );

app.get( '/about', routes.index );
app.get( '/about/contents', routes.contents.about );

app.get( '/help', routes.index );
app.get( '/help/contents', routes.contents.help );

app.get( '/collections', routes.redirect.index );
app.get( '/collections/:itemId', routes.index );
app.get( '/collections/:itemId/:resourceType', routes.resource );

app.post( '/collections/:itemId/countup', routes.count.up );
app.post( '/collections/:itemId/countdown', routes.count.down );

app.get( '/update', routes.update );


// create server
http.createServer( app ).listen( app.get( 'port' ), function() {
	console.log( 'Express server listening on port ' + app.get( 'port' ) );
});
