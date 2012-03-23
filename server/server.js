var journey = require('journey');
var router = new (journey.Router);
var formidable = require('formidable');
var util = require('util');
var fs = require('fs')


require('http').createServer(function (request, response) {
	var body = "";
	
	if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
    // parse a file upload
	var form = new formidable.IncomingForm();
	
	  

	
    form.parse(request, function(err, fields, files) {

	if( err ){
            response.writeHead( 500, { "Content-Type" : "text/plain" } );
            response.end( "CRAP! " + error + "\n" );
            return;
        }

      response.writeHead(200, {'content-type': 'text/plain'});
      response.write(util.inspect({fields: fields, files: files}));
      response.write('received upload:\n\n');
      response.write("<img src='/tmp/"+fields.image + "' />");
      response.write(util.inspect({files : files}))
      var tmp_path = files.image.path;
	  var target_path = '/home/meyyu/workspace/images/' + files.image.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + files.image.size + ' bytes');
        });
    });
      response.write(incomingForm.uploadDir);
      response.end(util.inspect({fields: fields, files: files}));
    });
    return;
  }

	request.addListener('data', function(chunk) { body += chunk });
	request.addListener('end', function() {
		router.handle(request, body, function (result) {
			response.writeHead(result.status, result.headers);
			response.end(result.body);
		});
	});
}).listen(8080);

module.exports = {router : router};
