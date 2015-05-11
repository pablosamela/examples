//http://rest.elkstein.org/2008/02/using-rest-in-javascript.html
//http://srikanthtechnologies.com/blog/java/rest_service_client.aspx
//https://developer.mozilla.org/es/docs/XMLHttpRequest

function requestManager(){
    var request = null;
    this.data = {};
    
    this.init  = function(){
        if (window.XMLHttpRequest) {
           // FireFox, Safari, etc.
           this.request = new XMLHttpRequest();
           if (typeof this.request.overrideMimeType != 'undefined') {
             this.request.overrideMimeType('text/xml'); // Or anything else
           }
         }
         else if (window.ActiveXObject) {
           // MSIE
           this.request = new ActiveXObject("Microsoft.XMLHTTP");
         }
    };
    
    this.get = function(url,idTemplate,idBox){
        this.request.open('GET', url);
        this.request.send();
        var that = this,
            template = new TemplateEngine();
        this.request.onreadystatechange = function() {
            if (that.request.readyState == 4) {
                if(that.request.status == 200) {
                    document.getElementById(idBox).innerHTML = template.parse(idTemplate,JSON.parse(that.request.response));
                } else {
                   console.log("Error ->" + that.request.response);
                }
            }
        };
    };    
    
    this.init();
}