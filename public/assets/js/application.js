if (!("ace" in window)) {
    window.ace = {}
}
jQuery(function (a) {
    window.ace.click_event = a.fn.tap ? "tap" : "click"
});
jQuery(function (a) {
    ace.disable_to_print(jQuery);
});

/**
 *  disable elements in print
 */
ace.disable_to_print = function (a) {
    a("#navbar").addClass("hidden-print");
    a("#menu-toggler").addClass("hidden-print");
    a("#sidebar").addClass("hidden-print");
    a("#breadcrumbs").addClass("hidden-print");
    a("#ace-settings-container").addClass("hidden-print");    
}

/**
 *  flash messages
 */
var Flash = {
    show: function(flashType, message){
        if (message != null) {
            if(flashType == 'notice'){
                $.gritter.add({
                    title: '<i class="icon-info-sign"></i> ' + 'Info',
                    text:   message,
                    class_name: 'gritter-info'                    
                });
            } else if(flashType == 'warning'){
                $.gritter.add({
                    title: '<i class="icon-warning-sign"></i> ' + 'Warning',
                    text:   message,
                    class_name: 'gritter-warning'
                });
            } else if(flashType == 'error'){
                $.gritter.add({
                    title: '<i class="fa fa-bug"></i> ' + 'Error',
                    text: message,
                    class_name: 'gritter-error'
                });
            } else if(flashType == 'success'){
                $.gritter.add({
                    title: '<i class="fa fa-check-circle-o"></i> ' + 'Sucess',
                    text: message,
                    class_name: 'gritter-success'
                });
            }
        }
    },
    success: function(message) {
        this.show('success', message);
    },
    notice: function(message) {
        this.show('notice', message);
    },
    warning: function(message) {
        this.show('warning', message);
    },
    error: function(message) {
        this.show('error', message);
    },
    clear: function() {
        $.gritter.removeAll();        
    }
}

/**
 *  show alert messages
 */
$(document).ready(function() {
    var el = $('#flash-notice');
    if(el && el.html() != '') Flash.show('notice', el.html());    
    el = $('#flash-warning');
    if(el && el.html() != '') Flash.show('warning', el.html());    
    el = $('#flash-error');
    if(el && el.html() != '') Flash.show('error', el.html());
    el = $('#flash-success');
    if(el && el.html() != '') Flash.show('success', el.html());
});

/**
 *  ajax start
 */
$( document ).ajaxStart(function() {
    if($("*:focus").attr('autocomplete') == null) {
        // não bloqueia tela caso o foco esteja num campo de autocomplete
        // para não travar a digitação do usuário        
        $.blockUI({
            message: '', 
            overlayCSS: {
                backgroundColor: '#fff',
                zIndex: '2000'
            },
            css: {
                border: 'none',
                opacity: .7, 
                color: '#000'
            }
        });
    }
    $( "#loading" ).show();    
});

/**
 *  ajax stop
 */
$( document ).ajaxStop(function() {
    $.unblockUI();
    $( "#loading" ).hide();    
});

/**
 *  ajax error
 */
$( document ).ajaxError(function( event, jqxhr, settings, exception ) {
    $.unblockUI();
    Flash.clear();
    Flash.error('Ocorreu um na requisição: <br/>' + exception);
});


/**
 * link click 
 */
$(document).ready(function() {
    $("a").click( function() {
        if($(this).attr("href") != '#' && !$(this).hasClass('noajax')){
            $( "#loading" ).show();
        }
    });
    
    $("button[type='submit']").click( function() {
        if (!$(this).hasClass('noajax'))
            $( "#loading" ).show();
    });
});

/**
 * datatables defaults comporment
 */
$(document).ready(function() {
    create_datatable('.datatable');
});

function create_datatable(id){
    dtable1 = $(id).dataTable({
        "aaSorting": [],
        "iDisplayLength": 50,
        "sDom": "<'row'<'col-xs-5 col-sm-4'l><'col-xs-6 col-sm-5 text-right'f><'col-sm-3'T>r>t<'row'<'col-xs-3 col-sm-4 col-md-5'i><'col-xs-9 col-sm-8 col-md-7 text-right'p>>",
        "oTableTools": {
            "aButtons": [ "csv", {"sExtends": "xls","sFileName": "*.xls"}, "copy", "print" ],
            "sSwfPath": "/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        }
    });
    return dtable1;
}

function create_datatable_with_order(id, column){
    dtable1 = $(id).dataTable({    
        "aaSorting": [[ column, "desc" ]],
        "iDisplayLength": 50,
        "sDom": "<'row'<'col-xs-5 col-sm-4'l><'col-xs-6 col-sm-5 text-right'f><'col-sm-3'T>r>t<'row'<'col-xs-3 col-sm-4 col-md-5'i><'col-xs-9 col-sm-8 col-md-7 text-right'p>>",
        "oTableTools": {
            "aButtons": [ "csv", {"sExtends": "xls","sFileName": "*.xls"}, "copy", "print" ],
            "sSwfPath": "/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        }
    });
    return dtable1;
}

/**
 * closable tab
 */
function closableTab(){    
    /**
     * Remove a Tab
     */
    $('.nav-tabs').on('click', ' li a .close', function() {
        var tabId = $(this).parents('li').children('a').attr('href');
        $(this).parents('li').remove('li');
        $(tabId).remove();        
        $('.nav-tabs a:first').tab('show');
    }); 
}

/**
 * tooltip and popover init
 */
$(document).ready(function() {
    load_tootip_and_popover();
});

function load_tootip_and_popover(){
    $('[data-rel=tooltip]').tooltip();
    $('[data-rel=popover]').popover({
        html:true
    });
}

/**
 * set transfer focus on enter
 */
function set_enter_event(evt, next_element) {
    if (evt.keyCode == 13 || evt.keyCode == 9) {
        if (next_element != null) {
            try {
                $('#'+next_element).focus();
            } catch(err){}
        }
        return false;
    }
    return true;
}