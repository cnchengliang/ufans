define([
	'jQuery', 
	'Underscore', 
	'Backbone',
	// Pull in the Collection module from above
	'model/db_model_list', 
	'templates/precompiler/system',
    'Bootstrap-dataTables',
    'jQuery-jgrowl',
    'jQuery-chosen'
	], function ($, _, Backbone, collection,templates) {

    var view = Backbone.View.extend({
        el: "#content",
        el_table: "table_rows",
        fnCallback_table: null,
        initialize: function () {
        	this.collection = collection;
        	this.collection.on('reset', this.bindEvents, this);
			/*this.collection.fetch({reset: true});*/
            this.render();
        },
        bindEvents: function(){
        	_this = this;

            var output = _this.collection.toJSON();
            _this.fnCallback_table( output[0].result );
            
            var toggle_fn = function(checked){checked ? $master['prop']('checked', $slaves.length === $slaves.filter(':checked').length) : $master['prop']('checked', false);};
            
            /* Add a click handler to the rows - this could be used as a callback
            $("#"+_this.el_table+" tbody tr").click(function(event) {                              
                
                if ( $(this).hasClass('row_selected') )
                {
                    $(this).removeClass('row_selected');
                    $("#chk_"+$(this).prop('id')).prop('checked',false);
                    toggle_fn(false);
                }
                else
                {
                    $(this).addClass('row_selected');
                    $("#chk_"+$(this).prop('id')).prop('checked',true);
                    toggle_fn(true);
                }
            });*/
            
            $master = $("#toggleAll");
            $master['prop']('checked',false);

            $slaves = $("#"+_this.el_table+" tbody input:checkbox");
            $master.unbind('click.checkAll').bind('click.checkAll', function (e)
            {
                var check_val = e.target.checked;
                $slaves.add($master)['prop']('checked', check_val);
                $("#"+_this.el_table+" tbody tr")[check_val?'addClass':'removeClass']('row_selected');
            });                                
            $slaves['off']('click.checkAll')['on']('click.checkAll', function ()
            {
                toggle_fn(this.checked);
                var id = $(this).prop('id').replace(new RegExp('chk_tr_',"g"), '');
                $("#tr_"+id)[this.checked?'addClass':'removeClass']('row_selected');
            });
            //console.log(_this.collection.toJSON());
        	/*
        	_this.el = $('#sc_form');
        	_this.el.bind('change', function(e) {
				_this.changed(e.target.id);
			});
            
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
		    });*/
			
        },
        render: function(){
			//var template = Handlebars.compile( $("#search_template").html() );
	        // Load the compiled HTML into the Backbone "el"
	        //console.log(this.collection.toJSON());
	        //var html = templates['other'](this.collection.toJSON());
	        //var html = templates['other']({'planet':'world'});
            

            var arr_data = {'nav_title':'新建数据表'};

            var html = templates['db_model'](arr_data);
			this.$el.html(html);
            
            /* Table initialisation */

            _this = this;
            $('#table_container').html( '<table cellpadding="0" cellspacing="0" border="0" id="'+_this.el_table+'" class="table table-striped table-bordered dataTable"></table>' );
            $(document).ready(function() {
                var listTable = $('#'+_this.el_table).dataTable( {
                    "aaData": [],
                    "aoColumnDefs": [
                        { 
                            "sTitle": '<input type="checkbox" id="toggleAll" name="toggleAll" />', 
                            "mRender": function ( data, type, full ) {
                                var data = full[1];  
                                var sReturn = '<input id="chk_tr_' + data + '" value="' + data + '" type="checkbox" />';
                                return sReturn;
                            },
                            "bSortable": false,
                            "aTargets":[0],
                            "mData": null,
                            "sWidth": "2%"
                        },
                        {"sTitle": 'id', "aTargets":[1], "sWidth": "5%"},
                        { "sTitle": "url", "bSortable": false, "aTargets":[2] },
                        { "sTitle": "txt", "bSortable": false, "aTargets":[3] }
                    ],
                    "sDom": '<"row"<"span7 multi_filter"><"span5"f>  r>t<"row"<"span4"i><"span3 dataTables_info"l><"span5 dataTables_info"p>>',
                    "sPaginationType": "bootstrap",
                    "oLanguage": {
                        "sLengthMenu": "_MENU_ records per page",
                        "sSearch": 'Search all columns:',
                        "sProcessing":   "Wait please..."
                    },
                    "aaSorting": [[ 1, "desc" ]],
                    "iDisplayLength": 10,
                    "bProcessing": true,
                    "bServerSide": true,
                    "sAjaxSource": '',
                    "sAjaxDataProp": function (data, type, extra) {
                                return data.aaData;
                            },
                    "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                        $(nRow).attr("id",'tr_' + aData[1]);
                        return nRow;
                    },
                    "fnServerData": function ( sSource, aoData, fnCallback, oSettings ) {

                        var params = {};
                        for ( var j=0 ; j<aoData.length ; j++ )
                        {
                            //console.log(aoData[j]['name'],aoData[j]['value']);
                            switch(aoData[j]['name'])
                            {
                                case 'sEcho':sEcho = aoData[j]['value'];break;
                                case 'iDisplayStart':iDisplayStart = aoData[j]['value'];break;
                                case 'iDisplayLength':iDisplayLength = aoData[j]['value'];break;
                            }
                            params[aoData[j]['name']] = aoData[j]['value'];
                        }
                        params['multiSelect'] = $("#multiSelect").val();

                        _this.fnCallback_table = fnCallback;

                        _this.collection.fetch(params);
                        

                    }
                } );
                $("div.multi_filter").html('<select multiple="multiple" id="multiSelect" class="chzn-select"><option value="1" selected>id</option><option value="2" selected>url</option><option value="3" selected>txt</option></select>');
                $('#table_container .dataTables_filter input')
                .unbind('keyup')
                .bind('keyup', function(e){
                    if (e.keyCode != 13) return;
                    listTable.fnFilter($(this).val());
                });
            } );
            $.jGrowl("Hello world!");
            $(".chzn-select").chosen({width: "95%",no_results_text: "Oops, nothing found!"});

            
            $("#act_add").on('click', function() { $("#db_model_detail").toggle(500); })
		}
    });
    return new view;
});
