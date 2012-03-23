var mongoose = require ('mongoose');
var db = mongoose.connect('mongodb://localhost/phonebook');
var Schema = mongoose.Schema;

var Contact = new Schema ({
	firstname : String,
	lastname : String,
	phone : String,
	email : String,
	note : String,
	});
var Phonebook = new Schema ({
	name : String,
	password : String,
	contact : [Contact]
	});

var PhonebookModel  = mongoose.model ('Phonebook', Phonebook);
var ContactModel = mongoose.model ('Contact', Contact);

var pb = new PhonebookModel ({
	name: "test",
	password : "123"
	});
pb.save();

var createContact = function (first, last, phone, email, note) {
	var c = new ContactModel({firstname: first, lastname:last, phone: phone, email:email,note:note});
	c.save();
	pb.contact.push(c);
};

createContact("robert", "s", "213", "q@q.de", "lol");
createContact("robert", "z", "3", "q@q.de", "lol");

var journey = require('journey');
var router = new (journey.Router);

router.map(function () {
	this.get(/^contacts$/).bind(function (req, res) {
		ContactModel.find({}, function (err, docs) {
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
