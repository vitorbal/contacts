var entities = require("./entities");
var server = require("./server");

server.router.map(function () {
	this.get(/^contacts$/).bind(function (req, res, d) {
		entities.getContacts(function (err, docs) {
			res.sendJSONP(d.callback, docs);
		});
	});
	
	this.post(/^contacts/).bind(function(req, res, data) {
		var contact = entities.createContact(data.phonebookId, data.first, data.last, data.phone, data.email, data.note);
		res.sendJSONP(data.callback, contact);
	});

	this.get(/^phonebooks$/).bind(function(req,res,d) {
		entities.getPhonebooks(function (err, docs) { res.sendJSONP(d.callback, docs);})
	});

	this.post(/^phonebook$/).bind(function (req,res,d) {
		res.sendJSONP(d.callback, entities.createPhonebook(d.name, d.password));
	});

	this.get(/^phonebook\/([0-9a-f]+)$/).bind(function(req,res,id) {
		entities.getPhonebook(id, function (e,d) {
			res.sendJSONP(d.callback, d);
		});
	});
});
