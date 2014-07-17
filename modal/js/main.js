$(document).ready(function(){

    if (typeof (modal) != "undefined") {
        modal.init();
        $(document).on("click", ".modal-link", function(e) {
            e.preventDefault();
            modal.loadContent({url: $(this).attr("href")});
            modal.open({width: "56%",margin: "2% 22%"});
            window.scroll(0, 0)
        });
    }    
});