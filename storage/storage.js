function Storage(){
    var storageObject = null;
    
    /* type can have 2 values: localStorage or sessionStorage */
    this.init = function (type){ 
        this.setStorage(type);
    };
    
    this.set = function (key, value){
        this.getStorage().setItem(key, value);
    };
    
    this.get = function (key){
        return this.getStorage().getItem(key);
    };
    
    this.remove = function(key){
        this.getStorage().removeItem(key);
    };
    
    this.getStorage = function(){
        return this.storageObject;
    };
    
    this.setStorage = function(storage){
        this.storageObject = storage;
    };
};

var localStorageObject = new Storage();
localStorageObject.init(localStorage);