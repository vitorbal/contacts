var mongoose = require ('mongoose');
var db = mongoose.connect('mongodb://localhost/phonebook');
var Schema = mongoose.Schema;

var Contact = new Schema ({
	firstname : String,
	lastname : String,
	phone : String,
	email : String,
	note : String,
	image : Buffer
});
var Phonebook = new Schema ({
	name : String,
	password : String,
	contact : [Contact]
});

var PhonebookModel  = mongoose.model ('Phonebook', Phonebook);
var ContactModel = mongoose.model ('Contact', Contact);


var getPhonebook = function (id, cb) {
	PhonebookModel.findById(id, cb);
}

var createContact = function (phonebookId, first, last, phone, email, note) {
	var c = new ContactModel({firstname: first, lastname:last, phone: phone, email:email,note:note});
	c.save();
	getPhonebook(phonebookId, function(err, d) {
		d.contact.push(c);
	});
	return c;
};

var getContact = function (id, cb) {
	ContactModel.findById(id, cb);
}

var addImage = function (id, image, cb) {
	ContactModel.update({_id : id}, { image : image}, {}, function (err, numAffected) {
		getContact(id, cb);
		});
}

var getContacts = function (cb) {
	ContactModel.find({}, cb);
}

var getPhonebooks = function (cb) {
	PhonebookModel.find({}, function (err, docs) {
		var res = new Array();
		for (var i = 0; i < docs.length ; i++) {
			res.push({_id : docs[i]._id, name : docs[i].name});
		};
		cb (err, res);
	});
}

var createPhonebook = function (name, password, cb) {
	var pb = new PhonebookModel({name : name, password : password});
	pb.save();
	return pb;
}

var deleteContact = function (id) {
	getContact(id, function (err, doc) {
	try  {
		doc.remove();
		} catch (e) {}
	});
}

module.exports = { 
	createPhonebook : createPhonebook,
	createContact : createContact,
	getPhonebook : getPhonebook,
	getContact : getContact,
	getContacts : getContacts,
	getPhonebooks : getPhonebooks,
	deleteContact : deleteContact,

};
