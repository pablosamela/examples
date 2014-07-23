/* See more at: http://www.kingletas.com/2012/07/using-local-storage-for-magento-performance-improvement.html)#sthash.aPL1hLZP.dpuf */
var storage = {
    storageObject: null,
    isAvailable: true,
    verify: function (){
        this.setStorage(localStorage);
        try{
            var dummy = "dummydata";
            this.set(dummy, dummy) ;
            var localDummy = this.get(dummy);
            if (localDummy == dummy){
                this.isAvailable = true;
            } else{
                this.isAvailable = false;
            }
        } catch (e){
            this.isAvailable = false;
        }
        return this.isAvailable;
    },
    set: function (key, value){
        this.getStorage().setItem(key, value);
    },
    get: function (key){
        return this.getStorage().getItem(key);
    },
    update: function(key, value){
        this.set(key, value);
    },
    remove: function(key){
        this.getStorage().removeItem(key);
    },
    getStorage: function(){
        return this.theStorage;
    },
    setStorage: function(storage){
        this.theStorage = storage;
    }
};

$(document).ready(function(){
    if (storage.verify()){
        var productSku = $('#detailSku').attr('data-sku'),
            productstorage = storage.get('recentlyViewed'),
            products = (productstorage) ? JSON.parse(productstorage):[],
            productExist = $.grep(products, function(prodSku){
                return prodSku.sku == productSku;
            });
           
        if(!productExist.length){
            products.splice(products.length,0,{'sku':productSku});    
            storage.set('recentlyViewed', JSON.stringify(products));            
        }
    }
});