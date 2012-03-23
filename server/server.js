var journey = require('journey');
var router = new (journey.Router);


require('http').createServer(function (request, response) {
	var body = "";

	request.addListener('data', function(chunk) { body += chunk });
	request.addListener('end', function() {
		router.handle(request, body, function (result) {
			response.writeHead(result.status, result.headers);
			response.end(result.body);
		});
	});
}).listen(8081);

module.exports = {router : router};
