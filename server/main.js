var entities = require("./entities");

var journey = require('journey');
var router = new (journey.Router);

router.map(function () {
	this.get(/^contacts$/).bind(function (req, res) {
		entities.ContactModel.find({}, function (err, docs) {
			res.send(200, {}, docs);
		});
	});
});

require('http').createServer(function (request, response) {
	var body = "";

	request.addListener('data', function(chunk) { body += chunk });
	request.addListener('end', function() {
		router.handle(request, body, function (result) {
			response.writeHead(result.status, result.headers);
			response.end(result.body);
		});
	});
}).listen(8080);
