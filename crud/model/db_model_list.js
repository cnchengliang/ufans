define([
	'jQuery', 
	'Underscore', 
	'Backbone', 
	'model/db_model'
	], function ($, _, Backbone, z_model) {
    var z_collection = Backbone.Collection.extend({
        model: z_model,
        url: '/bmw/app/api/v1/db_model.php/get_rows',
        initialize: function () {

        },
        fetch : function(options) {
            options || (options = {});
            // store reference for this collection
            var collection = this;
            $.ajax({
                type : 'POST',
                url : this.url,
                dataType : 'json',
                data: options,
                success : function(data) {
                    //console.log(data);
                    // set collection data (assuming you have retrieved a json object)
                    collection.reset(data)
                }
            });
        }

    });

    return new z_collection;
});