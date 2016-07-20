/**
 * Created by Elena.Kulichenko on 19.07.2016.
 */
$(document).ready(function(){
    // OR using $.ajax()
    $.ajax({
        type:     "GET",
        url:      "https://spreadsheets.google.com/feeds/list/o13394135408524254648.240766968415752635/od6/public/basic?alt=json-in-script&callback=someFunction",
        dataType: "jsonp",
        success: function(data){
            console.log(data);
        }
    });


});