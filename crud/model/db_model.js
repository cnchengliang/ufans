define([
    'jQuery',
	'Underscore', 
	'Backbone'
	], function ($,_, Backbone) {
    var model = Backbone.Model.extend({
        store: function(key,val){
        	this.set(key,val);
        },
        initialize: function () {
        },
        fetch : function() {
            // store reference for this collection
            var collection = this;
            $.ajax({
                type : 'POST',
                url : this.url,
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    // set collection data (assuming you have retrieved a json object)
                    collection.reset(data)
                }
            });
        }

    });
    return model;

});
