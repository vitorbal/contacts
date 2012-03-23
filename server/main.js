var entities = require("./entities");
var server = require("./server");

server.router.map(function () {
	this.get(/^contacts$/).bind(function (req, res) {
		entities.getContacts(function (err, docs) {
			res.send(200, {}, docs);
		});
	});
	
	this.post(/^contacts/).bind(function(req, res, data) {
		var contact = entities.createContact(data.phonebookId, data.first, data.last, data.phone, data.email, data.note);
		res.send(200, {}, contact);
	});

	this.get(/^phonebooks$/).bind(function(req,res,d) {
		entities.getPhonebooks(function (err, docs) { res.send(200,{}, docs);})
	});

	this.post(/^phonebook$/).bind(function (req,res,d) {
		res.send(200, {}, entities.createPhonebook(d.name, d.password));
	});

	this.get(/^phonebook\/([0-9a-f]+)$/).bind(function(req,res,id) {
		entities.getPhonebook(id, function (e,d) {
			res.send(200, {}, d);
		});
	});
});
