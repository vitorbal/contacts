var entities = require("./entities");
var server = require("./server");

server.router.map(function () {
	this.get(/^contacts$/).bind(function (req, res) {
		entities.ContactModel.find({}, function (err, docs) {
			res.send(200, {}, docs);
		});
	});
	
	this.post(/^contacts/).bind(function(req, res, data) {
		var contact = entities.createContact(data.first, data.last, data.phone, data.email, data.note);
		res.send(200, {}, contact);
	});
});
