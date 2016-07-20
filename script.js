/**
 * Created by Elena.Kulichenko on 19.07.2016.
 */
$(document).ready(function(){
    $.ajax({
        url: 'https://www.instagram.com/justinbieber/media/',
        dataType: 'jsonp',
        success: function (data, textStatus, jqXHR) {
            //the variable 'data' will have the JSON object
            // In your example, the following will work:
           console.log(data);

        }
    });
});