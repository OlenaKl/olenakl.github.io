/**
 * Created by Elena.Kulichenko on 19.07.2016.
 */
$(document).ready(function(){
    $.ajax({
        url: 'https://www.instagram.com/justinbieber/media/',
        dataType: 'jsonp',
        success: function(json) {
            // Rates are in `json.rates`
            // Base currency (USD) is `json.base`
            // UNIX Timestamp when rates were collected is in `json.timestamp`

            rates = json;
            console.log(rates);
        }
    });
});