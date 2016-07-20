/**
 * Created by Elena.Kulichenko on 19.07.2016.
 */
$(document).ready(function(){
    // OR using $.ajax()
    $.ajax({
        type:     "GET",
        url:      "https://www.instagram.com/justinbieber/media",
        dataType: "json",
        success: function(data){
            console.log(data);
        }
    });


});