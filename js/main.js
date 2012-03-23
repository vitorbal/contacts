Backbone.Model.prototype.idAttribute = "_id";
// Models
window.Contact = Backbone.Model.extend();

window.ContactCollection = Backbone.Collection.extend({
    model:Contact,
    url:"http://localhost:8080/contacts"
});

// Views
window.ContactListView = Backbone.View.extend({

    tagName:'ul',
    className:"nav nav-tabs nav-stacked",
    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        _.each(this.model.models, function (contact) {
            $(this.el).append(new ContactListItemView({model:contact}).render().el);
        }, this);
        return this;
    }

});

window.ContactListItemView = Backbone.View.extend({

    tagName:"li",
    template:_.template($('#tpl-contact-list-item').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

window.ContactDetailView = Backbone.View.extend({

    template:_.template($('#tpl-contact-detail').html()),

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

// Router
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"contactListPath",
        "contact/:id": "contactDetailPath"
    },

    contactListPath:function () {
        this.contactList = new ContactCollection();
        this.contactListView = new ContactListView({model:this.contactList});
        this.contactList.fetch({crossDomain: true, dataType: 'jsonp'});
        $('#content').html(this.contactListView.render().el);
    },

    contactDetailPath: function (id) {
        this.contact = this.contactList.get(id);
        this.contactDetailView = new ContactDetailView({model:this.contact});
        $('#content').html(this.contactDetailView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();
