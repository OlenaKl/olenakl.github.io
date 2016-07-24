/**
 * Created by Elena.Kulichenko on 19.07.2016.
 */

$(document).ready(function() {
var baseUrl;

$('.btn').click(function(){
    if(!($('.instagram_name').val())){
       alert('Enter account!!');
    }
    else{
        baseUrl = "https://www.instagram.com/" + $('.instagram_name').val() + "/media";
        setTimeout(function(){$('.first-form').fadeOut();}, 1000);
        Refresh();
        parseName();
    }
});


$('.look_more').click(function(){
    $('.first-form').fadeIn();
    if($('.photos-container_row_link').length !== 0 ){
         $('.first-form_background').click(function(){
                $('.first-form').hide();
        });
    }
    

    setTimeout(function(){

    $('.photo-layer_usernameData_image img').attr('src', '');
    $('.photos-container_holder, .photo-layer_usernameData_name p').empty()}, 500);
    
});

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


Refresh();
parseName();
setInterval(
    function(){refreshNewPhotos()
    }, 40000);



function Refresh(max_id) {
    url = (max_id != undefined) ? baseUrl + "?max_id=" + max_id : baseUrl
     $.ajax({
             url: url,
             type: 'GET',
             success: 
                    ParseAnswer
             
})};


function parseName(){
         $.ajax({
             url: url,
             type: 'GET',
             success: getName,
});
};

function refreshNewPhotos(){
         $.ajax({
             url: url,
             type: 'GET',
             success: refreshNew,
});
};

function getName(data){
    data =  $('<div/>',{'html': data.responseText}).text();
    data = JSON.parse(data);
    $('.photo-layer_usernameData_name p').text(data.items[5].caption.from.full_name);
    $('.photo-layer_usernameData_image img').attr('src', data.items[5].caption.from.profile_picture);
};



function ParseAnswer(data) {
    data =  $('<div/>',{'html': data.responseText}).text();
    data = JSON.parse(data);
    var array = data.items;
    var lastItem = array[array.length - 1].id;
    var firstItem = array[0].id;
    var imgHolder = '<div href="" class="photos-container_row_link"></div>';
    var photoInfo = '<div class="photo_info"></div>';
    console.log(data);
    $.each(data.items, function(i,item){
        if(item.type == 'image'){
             $("<img/>").attr({"src": item.images.thumbnail.url, 'data-link' : item.images.standard_resolution.url})
             .appendTo(".photos-container_holder")
             .wrap(imgHolder).parent().append(photoInfo)
             .find('.photo_info').text(item.likes.count);
            
        }
        else{
            $("<img/>").attr({"src" : item.images.thumbnail.url, 'data-link': item.videos.low_resolution.url})
            .appendTo(".photos-container_holder")
            .wrapAll(imgHolder).parent().addClass('video')
            .append(photoInfo)
            .find('.photo_info').text(item.likes.count);;

        }
       
    });
    
    $('.photos-container_row_link:first-of-type').attr('data-id', firstItem);

    
    $('.button').unbind('click').click(function(){
        data.more_available == true ? Refresh(lastItem) : $(this).text('No photos!').addClass('shake'); 
    });
    modalShow();
    hover();

};

function refreshNew(data) {
    data =  $('<div/>',{'html': data.responseText}).text();
    data = JSON.parse(data);
    var firstItem = data.items[0].id;
    var imgHolder = '<div href="" class="photos-container_row_link"></div>';
    var photoInfo = '<div class="photo_info"></div>';
    var oldFirstItem = $('.photos-container_row_link:first-of-type').attr('data-id');
    if(firstItem != oldFirstItem){
         if(data.items[0].type == 'image'){
            $("<img/>").attr({"src": data.items[0].images.thumbnail.url,
             'data-link' : data.items[0].images.standard_resolution.url,
            })
                     .prependTo(".photos-container_holder")
                     .wrap(imgHolder).parent().attr({'data-id': firstItem}).append(photoInfo)
                     .find('.photo_info').text(data.items[0].likes.count);
          }           
         else{
             $("<img/>").attr({"src" : data.items[0].images.thumbnail.url, 'data-link': data.items[0].videos.low_resolution.url})
                .prependTo(".photos-container_holder")
                .wrap(imgHolder).parent().attr({'data-id': firstItem}).addClass('video')
                .append(photoInfo)
                .find('.photo_info').text(data.items[0].likes.count);
         }
         $('.photos-container_row_link:nth-of-type(2)').removeAttr('data-id');   
    }
    hover();
};

function modalShow(){
     $('.photo_info').click( function(event){ 
         event.preventDefault(); 
         $('.overlay').fadeIn(100, 
             function(){ 
                 $('.modal_form') 
                     .css('display', 'block') 
                     .animate({opacity: 1, top: $(document).scrollTop()
                      }, 200);
         });
         if($(this).parent().hasClass('video')){
             var videoSrc = $(this).parent('.photos-container_row_link').find('img').attr('data-link');
             $('.modal_form source').attr({'src': videoSrc}).parent().removeClass('visible_v');
             $('.modal_form video')[0].load();

         }else{
             $('.modal_form img').attr('src', $(this).parent().find('img').attr('data-link'));
         }     
     });
    
     $('.modal_close, .overlay').click( function(){ 
         $('.modal_form')
             .animate({opacity: 0, top: '45%'}, 100,  
                 function(){ 
                     $(this).css('display', 'none'); 
                     $('.overlay').fadeOut(300); 
                 }
             );
        $('.modal_form img').attr('src', '');
        $('.modal_form source').attr('src', '').parent().addClass('visible_v');
        $('.modal_form video')[0].load();
        

 });

}

function hover(){
     $('.photos-container_row_link').hover(function(){
        $(this).find('.photo_info').show();
    },
    function(){
         $(this).find('.photo_info').hide();
    })
};

});


