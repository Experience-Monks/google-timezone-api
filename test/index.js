var timezone = require( '../' );

timezone( {

	location: '43.7182713,-79.3777061'
}).then( function( result ) {

	console.log( result );
}).catch( function( err ) {

	console.log( err );
});