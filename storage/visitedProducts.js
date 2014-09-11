var visitedProducts = {
    storageName:'recentlyViewed',
    container:'#visitedProduct',
    containerFlex:'#visitedProductsFlex',
    products:null,
    product:null,
    maxLength:10,
    
    init:function(actualProduct){
        this.product = actualProduct;
        this.get();
        if(!this.isSet()){
            if(this.length() > this.maxLength-1){
                this.remove();
            }
            this.add(null);
        }else{
            this.move()
        }
        if(this.length() > 1){
            this.render();
        }
    },
    
    get:function(){
        var productstorage = localStorageObject.get(this.storageName);
        this.products = (productstorage) ? JSON.parse(productstorage):[];
    },
    list:function(removeActual){
        var listPorducts = this.products;
        var position = this.search(this.product.sku);
        if(removeActual){
            listPorducts.splice(position,1);
        }
        return listPorducts;
    },
    add:function(newProduct){
        newProduct = (newProduct) ? newProduct : this.product;
        this.products.unshift(newProduct);
        localStorageObject.set(this.storageName, JSON.stringify(this.products)); 
    },
    remove:function(){
        this.get();
        this.products.pop();
        localStorageObject.set(this.storageName, JSON.stringify(this.products));
    },
    
    isSet:function(){
        var productExist = this.search(this.product.sku);
        return (productExist >= 0);
    },
    length:function(){
      return this.products.length;
    },
    search: function(sku){
        var position = -1;
        for(var i=0;i<this.products.length;i++){
            if(this.products[i].sku == sku){
                position = i;
            }
        }
        return position;
    },
    move:function(sku){
        sku = (sku) ? sku : this.product.sku;
        var position = this.search(sku);
        var oldPosition = this.products.splice(position, 1); 
        this.add(oldPosition[0]);
    },
    render:function(){
        var visitedHTML = new TemplateEngine();
        $(this.container).html(visitedHTML.parse('itemVisitedBox', {items: this.list(true)}));
        if(this.length() >= 6){
            $(this.containerFlex).flexslider({
                        animation: "slide",
                        animationLoop: false,
                        slideshow: false,
                        itemWidth: 166,
                        minItems: 5,
                        maxItems: 5,
                        itemMargin: 0,
                        selector: ".slides > div",
                        controlNav:false,
                        prevText: "",
                        nextText: "",
                        move: 1,
                    });
            $(this.containerFlex + ' .flex-prev').addClass('icon-chevron-left');
            $(this.containerFlex + ' .flex-next').addClass('icon-chevron-right');
        }
    },
    loadAll:function(){
        var visitedContainer = $(this.container);
        if(!visitedContainer.hasClass('loaded')){
            visitedContainer.find('.item-box-holder').each(function(){
                var sizes = new SizesManager();
                var that = $(this);
                sizes.load($(this).find('.selectSize'),function(data){
                    var box = new TemplateEngine();
                     that.find('.itemPrice').append(box.parse('itemPrice', {items: data.details}));
                });
            });
            visitedContainer.addClass('loaded');
        }
    }
};

$(document).ready(function(){
    if(sitesettings.page == 'productpage' && sitesettings.enabledLastProducts && !sitesettings.isShop){
        visitedProducts.init($('#detailSku').data('product-details'));
        
        $(window).on('scroll',function() {
            var scrollPosition = $(window).scrollTop();
            var divPosition = $('#visitedProduct').offset().top;
            if(scrollPosition < divPosition + 200 && scrollPosition > divPosition - 200){
                visitedProducts.loadAll();
            }
        });
        
        $(document).on('click', '#visitedProductsFlex .AddToCart', function() {
            var parentHolder = $(this).closest('.item-box-holder');
            if(typeof(_gaq) != 'undefined' && parentHolder.find('.selectedSku').val()) {
                var price = $.trim(parentHolder.find('.itemPrice span').text());
                _gaq.push(['_trackEvent', 'LastViewed', 'AddToCart', price]);
            }
        });
    }
});