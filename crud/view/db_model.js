define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'model/db_model_list', 
	'templates/precompiler/templates',
    'jQuery-chosen',
    'jQuery-wizard'
	], function ($, _, Backbone, collection,templates) {

    var view = Backbone.View.extend({
        el: "body",
        initialize: function () {
        	this.collection = collection;
        	this.collection.on('reset', this.render, this);
			this.collection.fetch({reset: true});

        },
        bindEvents: function(){
        	_this = this;
        	/*
        	_this.el = $('#sc_form');
        	_this.el.bind('change', function(e) {
				_this.changed(e.target.id);
			});*/
            
            //初始化系统设置
            var options = _this.model.attributes;
            for (var op in options) {
                if ($.inArray(op, ['continue_enable','auto_get_content']) != -1) {
                    $('#'+op).attr('checked','checked');
                }
            }

            $('#task_id').editable({
            	type: 'checklist',
                pk: 1,
                mode: 'inline',
                emptytext: 'Please Select task',
                url:function(params)
                {
                	$('#task_id').attr('data-value',params.value);
                },
		        source: null
		    });
			
        },
        render: function(){
			//var template = Handlebars.compile( $("#search_template").html() );
	        // Load the compiled HTML into the Backbone "el"
	        //console.log(this.collection.toJSON());
	        var html = templates['other'](this.collection.toJSON());
	        //var html = templates['other']({'planet':'world'});
            
			//this.$el.html(html);
            $(".chzn-select").chosen();
            $('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index+1;
                var $percent = ($current/$total) * 100;
                $('#rootwizard').find('.bar').css({width:$percent+'%'});
                // If it's the last tab then hide the last button and show the finish instead
                if($current >= $total) {
                    $('#rootwizard').find('.pager .next').hide();
                    $('#rootwizard').find('.pager .finish').show();
                    $('#rootwizard').find('.pager .finish').removeClass('disabled');
                } else {
                    $('#rootwizard').find('.pager .next').show();
                    $('#rootwizard').find('.pager .finish').hide();
                }
            }});
            $('#rootwizard .finish').click(function() {
                alert('Finished!, Starting over!');
                $('#rootwizard').find("a[href*='tab1']").trigger('click');
            });
		}
    });
    return new view;
});
