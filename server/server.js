var journey = require('journey');
var router = new (journey.Router);
var formidable = require('formidable');
var util = require('util');
var fs = require('fs')


require('http').createServer(function (request, response) {
	var body = "";
	
	//for uploading image
	if (request.url == '/contacts/upload' && request.method.toLowerCase() == 'post') {
	    // parse a file upload
		var form = new formidable.IncomingForm();
	    form.parse(request, function(err, fields, files) {
		if( err ){
		    response.writeHead( 500, { "Content-Type" : "text/plain" } );
		    response.end( "CRAP! " + error + "\n" );
		    return;
		}
	    response.writeHead(200, {'content-type': 'text/plain'});
	    response.write('Thanks ! Your image was uploaded successfully!');
	    var tmp_path = files.image.path;
		var target_path = '../../images/' + files.image.name;
	    fs.rename(tmp_path, target_path, function(err) {
		if (err) throw err;
		});
	    response.end();
	    });
	    return;
	} else {
		request.addListener('data', function(chunk) { body += chunk });
		request.addListener('end', function() {
			router.handle(request, body, function (result) {
				response.writeHead(result.status, result.headers);
				response.end(result.body);
			});
		});
	}
}).listen(8081);

module.exports = {router : router};
