/* global chrome */
const serverUrl = "//secure162.servconfig.com/~ghostservices/bot/backend/web/ads";
// const serverUrl = "http://localhost/ads/backend/web/ads";


jQuery(document).ready(function ($) {
    var url;
    var xhrSites = new XMLHttpRequest();
    xhrSites.open("GET", serverUrl + "/get-data?sites=1&is_top=0", true);
    xhrSites.onreadystatechange = function () {
        if (xhrSites.readyState == 4) {
            var data = $.parseJSON(xhrSites.responseText);
            url = data[0];

            data.splice(0, 1);
            chrome.storage.local.set({'sites': data});
            console.log(xhrSites.responseText);
        }
    };
    xhrSites.send();

    $('#start').click(function () {
        var devMode = $('#dev_mode').is(':checked') ? true : false;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", serverUrl + '/get-data', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var ads = $.parseJSON(xhr.responseText);
                chrome.storage.local.set({'ads': ads});
                chrome.storage.local.set({'devMode': devMode});


               window.location.href = url;
            }
        };
        xhr.send();

    });

    chrome.storage.local.get('devMode', function (data) {
        $('#dev_mode').prop('checked', data.devMode);
    });

});
