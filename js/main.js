// Models
window.Contact = Backbone.Model.extend();

window.ContactCollection = Backbone.Collection.extend({
    model:Contact,
    url:"contact_model.json"
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

// Router
var AppRouter = Backbone.Router.extend({

    routes:{
        "":"contactList",
    },

    contactList:function () {
        this.contactList = new ContactCollection();
        this.contactListView = new ContactListView({model:this.contactList});
        this.contactList.fetch();
        //this.contactList.reset(cd)
        $('#content').html(this.contactListView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();