/** @module google-timezone-api */

var https = require( 'https' ),
	merge = require( 'merge' ),
	querystring = require( 'querystring' ),
	promise = require( 'promise' );

var baseOpts = {

	host: 'maps.googleapis.com',
	path: '/maps/api/timezone/json?',
	port: 443,
	withCredentials: false
};

/**
 * You can use this module via promises or by using a callback.
 *
 * The first parameter passed is an object which corresponds to variables
 * you'd pass to the google time zone api.
 *
 * An example options object:
 * ```javascript
 * {
 * 		location: '43.7182713,-79.3777061', // REQUIRED: location you'd like to get timezone info for
 * 		timestamp: '10000', // OPTIONAL: Timestamp which is used to calculate daylight savings if omitted Date.now will be used
 * 		key: 'your api key', // OPTIONAL: You may want to pass in an API key. However it's optional.
 * 		language: 'en' // OPTIONAL: Language of the returned data
 * }
 * ```
 * This module can be used both in Node and in the browser via Browserify.
 *
 * Visit https://developers.google.com/maps/documentation/timezone/ for more info.
 * 
 * @param  {Object} uOpts Options used to communicate with the timezone api. See above for details.
 * @param  {Function} [callback] Callback is optional but can be used instead of promises. Returned data will be in the
 * 								 form of callback( err, result )
 * @return {Promise} This function will return a promise from which you can consume the resulting data
 *
 * @example
 * ```javascript
 *
 * var timezone = require( '../' );
 * 
 * timezone( {
 * 
 * 	location: '43.7182713,-79.3777061'
 * }).then( function( result ) {
 * 
 * 	console.log( result );
 * }).catch( function( err ) {
 * 
 * 	console.log( err );
 * });
 * ```
 */
module.exports = function( opts, callback ) {

	return new promise( function( onOK, onErr ) {

		var mOpts = merge( opts, baseOpts ),
			path = {};

		if( mOpts.timestamp === undefined ) 
			mOpts.timestamp = Math.round( Date.now() / 1000 );

		if( 
			addToPath( mOpts, path, 'location', false, onErr, callback ) &&
			addToPath( mOpts, path, 'timestamp', false, onErr, callback ) &&
			addToPath( mOpts, path, 'key', true, onErr, callback ) &&
			addToPath( mOpts, path, 'language', true, onErr, callback )
		  ) {

			mOpts.path += querystring.stringify( path );

			try {

				https.request( mOpts, function( res ) {

					var buffer = '';

					res.on( 'data', function( data ) {

						buffer += data;
					});

					res.on( 'end', function() {

						var result = JSON.parse( buffer );

						onOK( result );

						if( callback )
							callback( undefined, result );
					});
				}).end();
			} catch( e ) {

				onErr( e );
			}	
		}
	});
};

function addToPath( opts, path, varName, optional, onErr, callback ) {

	if( opts[ varName ] === undefined ) {

		if( !optional ) {

			doErr( varName + ' is required', onErr, callback );

			return false;
		} else {

			return true;
		}
	} else {

		path[ varName ] = opts[ varName ];

		return true;
	}
}

function doErr( msg, onErr, callback ) {

	var err = new Error( msg );

	onErr( err );

	if( callback )
		callback( err );
}