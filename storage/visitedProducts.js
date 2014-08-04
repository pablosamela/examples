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
    }
};

$(document).ready(function(){
    if(sitesettings.page == 'productpage' && sitesettings.enabledLastProducts){
        visitedProducts.init($('#detailSku').data('product-details'));
        $(document).on('click', '#visitedProductsFlex .AddToCart', function() {
            if(typeof(_gaq) != 'undefined') {
                _gaq.push(['_trackEvent', 'LastViewed', 'AddToCart', 'AddToCart', detail.getProductPrice($(this))]);
            }
        });
    }
    var sizes = new SizesManager();
    $(document).on('click','.boxSizeSelector .selectContainer',function(e){
        sizes.init($(this).closest('.selectSize'));
    });
    $(document).on('click', '.boxSizeSelector .prd-option-collection li.prd-option-item', function() {
        sizes.display($(this));
    });
});