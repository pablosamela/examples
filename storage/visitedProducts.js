var visitedProducts = {
    storageName:'recentlyViewed',
    container:'#visitedProduct',
    products:null,
    product:null,
    
    init:function(actualProduct){
        this.product = actualProduct;
        this.get();
         if(!this.isSet()){
            if(this.length() == 11){
                this.remove();
            }
            this.add(null);
        }
        this.render();

    },
    
    get:function(){
        var productstorage = localStorageObject.get(this.storageName);
        this.products = (productstorage) ? JSON.parse(productstorage):[];
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
    
    list:function(removeActual){
        if(removeActual){
            var position = this.search(this.product.sku);
            this.products.splice(position,1);
        }
        return this.products;
    },
    isSet:function(){
        var productExist = this.search(this.product.sku);
        return (productExist > 0);
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
    render:function(){
        var vpList = this.list(true);
        var visitedHTML = new TemplateEngine();
        $(this.container).html(visitedHTML.parse('itemVisitedBox', {items: vpList}));
        
        $(this.container).flexslider({
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
        $(this.container + ' .flex-prev').addClass('icon-chevron-left');
        $(this.container + ' .flex-next').addClass('icon-chevron-right');
    }
    
};


$(document).ready(function(){
    visitedProducts.init($('#detailSku').data('product-details'));
});