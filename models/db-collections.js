var Database = require( 'nedb' );

var db = new Database({
	filename: './collections/collections.db',
	autoload: true
});

db.ensureIndex({ fieldName: 'id', unique: true, sparse: true });

module.exports = db;
