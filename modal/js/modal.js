var modal = new function(){
    this.defaults = {
            container: 'modalContainer',
            containerClass: 'modal-container',
            wrapper: 'modalWrapper',
            wrapperClass: 'modal-wrapper',
            background: 'modalBackground',
            backgroundClass: 'modal-background',
            closeButton:'modalClose',
            closeButtonClass:'modal-close icon-close',
            width:'50%',
            margin:'1% 25%'
        };
    this.ajaxDefaults = {
        type: "GET",
        dataType: "html",
        async: true        
    };
    
    this.vars = {};
    this.ajaxVars = {};
    this.ajaxRequest = null;
    
    this.background = null;
    this.wrapper = null;
    this.container = null;
    this.closeButton = null;

    this.init = function(parameters){
        var that = this;
        this.vars = $.extend({},that.defaults,parameters);
        if(!$('#' + this.vars.background).length && !$('#' + this.vars.wrapper).length){
            this.createHtml();
        }
    };
    
    /*
     * Creates the necessary html to maek the modal work
     * @returns null
     */
    this.createHtml = function(){
        $('<div/>', {
            'id': this.vars.background,
            'class': this.vars.backgroundClass
        }).appendTo('body');
        this.background = $('#' + this.vars.background);

        $('<div/>', {
            'id': this.vars.wrapper,
            'class': this.vars.wrapperClass
        }).appendTo('body');
        this.wrapper = $('#' + this.vars.wrapper);

        $('<div/>', {
            'id': this.vars.container,
            'class': this.vars.containerClass
        }).appendTo(this.wrapper);
        this.container = $('#' + this.vars.container);
        
        $('<a/>', {
            'id':this.vars.closeButton,
            'href': '#',
            'class': this.vars.closeButtonClass
        }).prependTo(this.wrapper);
        this.closeButton = $('#' + this.vars.closeButton);
        
        this.initEvents();
    };
    
    /*
     * Initialize the events inside the modal
     * @returns null
     */
    this.initEvents = function(){
        var that = this;
        this.closeButton.click(function(){
            that.close();
        });
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { 
                that.close();
            } 
        });
    };
    
    this.open = function(parameters){
        this.background.fadeIn();
        this.wrapper.fadeIn();
        if(typeof(parameters) === 'undefined'){
            parameters = {
                'width' : this.defaults.width,
                'margin' : this.defaults.margin
            };
        }
        this.resize(parameters);
            
    };
    this.close = function(parameters){
        if(typeof parameters === 'undefined'){
            parameters = {'refresh' : false};
        }
        
        if(parameters.refresh){
            window.location = '';
        } else {
            this.background.fadeOut('slow');
            this.wrapper.fadeOut('slow');
        }
    };
    this.writeContent = function(html){
        this.container.html(html).animate({width: 'auto'});
    };
    /*
     * Resizes window
     */
    this.resize = function(parameters){
        this.wrapper.css({
            width:parameters.width,
            margin:parameters.margin
        });
    };
    /* 
     * Load Content via Ajax 
     */
    this.loadContent = function(parameters){
        var that = this;
        this.ajaxVars = $.extend({},that.ajaxDefaults,parameters);
        this.ajaxRequest = $.ajax(
            this.ajaxVars
        ).always(function(data, textStatus, jqXHR) {
            if(textStatus == 'success'){
                modal.writeContent(jqXHR.responseText);
            }
        });
    };
    
};
