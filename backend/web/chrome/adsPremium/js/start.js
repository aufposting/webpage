/* global chrome */
const url = 'https://www.kijiji.ca/t-user-registration.html?siteLocale=en_CA';

const serverUrl = "//secure162.servconfig.com/~ghostservices/bot/backend/web/ads";
// const serverUrl = "http://localhost/ads/backend/web/ads";


jQuery(document).ready(function($) {

    $('#start').click(function() {
        var devMode = $('#dev_mode').is(':checked') ? true : false;
        var xhr = new XMLHttpRequest();

        xhr.open("GET", serverUrl + '/get-premium-data', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var adsArr = $.parseJSON(xhr.responseText);
                chrome.storage.local.set({
                    'userNumber': '0'
                });
                chrome.storage.local.set({
                    'ads': adsArr[0]
                });
                adsArr.splice(0, 1);
                chrome.storage.local.set({
                    'adsArr': adsArr
                });
                chrome.storage.local.set({
                    'devMode': devMode
                });
                window.open(url, '_blank');
            }
        };

        xhr.send();
    });

    chrome.storage.local.get('devMode', function(data) {
        $('#dev_mode').prop('checked', data.devMode);
    });



    var premiumUpdateStage = new XMLHttpRequest();
    premiumUpdateStage.open("GET", serverUrl + "/get-premium-update-stage", true);
    premiumUpdateStage.onreadystatechange = function() {
        if (premiumUpdateStage.readyState == 4) {
            var data = $.parseJSON(premiumUpdateStage.responseText);
            chrome.storage.local.set({
                'premiumUpdateStage': data
            });
            var updateSeconds = data.stage_hour * 3600000;

            setInterval(function() {
                $('#start').click();
            }, updateSeconds);
        }
    };
    premiumUpdateStage.send();


});
