/**
 * Created by Elena.Kulichenko on 19.07.2016.
 */

var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
};

getJSON('https://www.googleapis.com/freebase/v1/text/en/bob_dylan').then(function(data) {
    alert('Your Json result is:  ' + data.result); //you can comment this, i used it to debug

    var a = data.result; //display the result in an HTML element
    console.log(a);
}, function(status) { //error detection....
    alert('Something went wrong.');
});
