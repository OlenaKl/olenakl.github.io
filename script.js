/**
 * Created by Elena.Kulichenko on 19.07.2016.
 */
$(document).ready(function(){
    $.ajax({
        url: 'http://openexchangerates.org/latest.json',
        dataType: 'jsonp',
        success: function(json) {
            // Rates are in `json.rates`
            // Base currency (USD) is `json.base`
            // UNIX Timestamp when rates were collected is in `json.timestamp`

            rates = json.rates;
            base = json.base;
            console.log(rates);
        }
    });
});