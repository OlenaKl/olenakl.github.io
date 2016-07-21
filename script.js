/**
 * Created by Elena.Kulichenko on 19.07.2016.
 */

$(document).ready(function() {

    jQuery.ajax = function (d) {
        var b = location.protocol,
            e = RegExp(b + "//" + location.hostname),
            f = "http" + (/^https/.test(b) ? "s" : "") + "://query.yahooapis.com/v1/public/yql?callback=?";
        return function (a) {
            var c = a.url;
            if (/get/i.test(a.type) && !/json/i.test(a.dataType) && !e.test(c) && /:\/\//.test(c)) {
                a.url = f;
                a.dataType = "json";
                a.data = {
                    q: 'select * from html where url="{URL}" and xpath="*"'.replace("{URL}", c + (a.data ? (/\?/.test(c) ? "&" : "?") + jQuery.param(a.data) : "")),
                    format: "xml"
                };
                !a.success && a.complete && (a.success = a.complete, delete a.complete);
                var b = a.success;
                a.success = function (a) {
                    b && b.call(this, {
                        responseText: (a.results[0] || "").replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, "")
                    }, "success")
                }
            }
            return d.apply(this, arguments)
        }
    }(jQuery.ajax);


    function Refresh() {
        $.ajax({
            url: 'https://www.instagram.com/justinbieber/media/',
            type: 'GET',
            success: ParseAnswer
        })};
    Refresh();
    function ParseAnswer(data) {
        data =  $('<div/>',{'html': data.responseText}).text();
        data = JSON.parse(data);
        console.log(data);
        console.log(data.items);
        $('.photo-layer_usernameData_name p').text();
        $.each(data.items, function(i,item){
            if(item.type == 'image'){
                $("<img/>").attr("src", item.images.low_resolution.url).appendTo("#container");
            }
            else{
                $('<video/>',{
                    src: item.videos.low_resolution.url,
                    type: 'video/mp4',
                    controls: true
                }).appendTo("#container");
            }


        });

    }


});


