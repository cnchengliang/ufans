
define([
	'jQuery', 
	'Underscore', 
	'Backbone',
    'view/table_db_model'
	], function ($, _, Backbone,z_view) {
	

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes        
            '!/test': 'test',
            
            // Default
            '*actions': 'defaultAction'
        },
        test: function(){
        	console.log('test');
        },
        defaultAction: function (actions) {
            // We have no matching route, lets display the home page 
            //mainHomeView.render();
            //this.render(optionsView);
            //location.hash = "!/test";
            
        }
    });

    var initialize = function () {
            var app_router = new AppRouter;
            Backbone.history.start();
        };
    return {
        initialize: initialize
    };
});
