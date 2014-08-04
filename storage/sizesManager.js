function SizesManager(){
    var jqxhr = null;
    var container = null;
    
    this.init = function(container){
        if(!container.hasClass('loaded')){
            var that = this;
            this.container = container;
            this.get(this.container.attr('data-sku'));
            this.jqxhr.done(function(data){
                that.render(that.container, data.uniques.sizes);
                that.showList(that.container.find('.prd-option-collection'));
            });
        } else{
            this.showList(this.container.find('.prd-option-collection'));
        }
    };
    this.get = function(sku){
        this.jqxhr = $.getJSON('/catalog/additionaldata/?sku=' + sku);
    };
    this.render = function(where, what){
        var box = new TemplateEngine();
        where.append(box.parse('itemSizesList', {items: what}))
             .addClass('loaded')
             .find('.prd-option-collection');
     
    };
    this.showList = function(sizes){
        if (!sizes.is(":visible")) {
            sizes.show().delay(5000).hide(0);
        } else {
            sizes.hide();
        }
    };
    
    this.display = function(selected) {
        var simpleData = selected.data('simple'),
            sku = simpleData.simple[0],
            selectedParent = selected.closest('.item-box-holder'),
            selectedParentList = selected.closest('.prd-option-collection');
        
        selected.parent().find('li').removeClass('selected');
        if (!selected.hasClass('inactive')) {
            selected.addClass('selected');
            var talle = selected.parent().find('.selected').html()
            selected.closest('.selectSize').find('.size').html(talle); 
            //this.showList(selectedParentList);
        }

        if (simpleData === undefined || simpleData == 0) {
            selectedParent.find('.selectedSku').val('');
            selectedParent.find('.product-selector-error').html(selectedParent.find('.items-not-available').html()).fadeIn(100);
            selectedParent.find('.product-option-stock-hint').hide();
        } else {
            selectedParent.find('.product-selector-error').hide();

            $('.selectedSku').val('');

            if(selected.hasClass('main-sizes-list')){
                $('.l-sidebar .selectedSku,.prd-details .selectedSku, .prd-checkout .selectedSku').val(sku);
            }else if(selected.hasClass('quick-sizes-list')){
                $('.vTop .selectedSku').val(sku);
            }else{
                selectedParent.find('.selectedSku').val(sku);
            }

            selectedParent.find('.AddToCart').fadeTo(100, 1);
            selectedParent.find('.product-option-stock-hint').fadeIn(800);
         }

        if( !selected.hasClass('prd-size-unavailable') ){
            selectedParentList.hide();
        }
    };
 };