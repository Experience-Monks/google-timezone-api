<a name="module_google-timezone-api"></a>
#google-timezone-api
<a name="exp_module_google-timezone-api"></a>
##module.exports(uOpts, [callback]) ⏏
You can use this module via promises or by using a callback.

The first parameter passed is an object which corresponds to variables
you'd pass to the google time zone api.

An example options object:
```javascript
{
		location: '43.7182713,-79.3777061', // REQUIRED: location you'd like to get timezone info for
		timestamp: '10000', // OPTIONAL: Timestamp which is used to calculate daylight savings if omitted Date.now will be used
		key: 'your api key', // OPTIONAL: You may want to pass in an API key. However it's optional.
		language: 'en' // OPTIONAL: Language of the returned data
}
```
This module can be used both in Node and in the browser via Browserify.

Visit https://developers.google.com/maps/documentation/timezone/ for more info.

**Params**

- uOpts `Object` - Options used to communicate with the timezone api. See above for details.  
- \[callback\] `function` - Callback is optional but can be used instead of promises. Returned data will be in the
								 form of callback( err, result )  

**Returns**: `Promise` - This function will return a promise from which you can consume the resulting data  
**Example**  
```javascript

var timezone = require( '../' );

timezone( {

	location: '43.7182713,-79.3777061'
}).then( function( result ) {

	console.log( result );
}).catch( function( err ) {

	console.log( err );
});
```

