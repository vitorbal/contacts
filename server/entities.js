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
	return c;
};

module.exports = { 
	PhonebookModel : PhonebookModel,
	ContactModel : ContactModel,
	createContact : createContact
};
