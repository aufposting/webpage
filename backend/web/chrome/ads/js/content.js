/* global chrome */
const $ = jQuery;
const TwoCaptchaKey = '3691f21abf9db7084831b9d6419a10a4';
const serverUrl = "//secure162.servconfig.com/~ghostservices/bot/backend/web/ads";
// const serverUrl = "//localhost/ads/backend/web/ads";


const extensionID = chrome.runtime.id;

var captchaStatus = false;
var toNextSite;

chrome.storage.local.get('devMode', function (data) {
    // console.log(data.devMode);
    if ('devMode' in data && !data.devMode) {
        toNextSite = window.setTimeout(function () {
            nextSite(false);
        }, 70000);

        //if in loop
        chrome.storage.local.get('refreshCount', function (data) {
            if ('refreshCount' in data) {
                if (data.refreshCount < 10) {
                    console.log(data.refreshCount);
                    chrome.storage.local.set({'refreshCount': ++data.refreshCount});
                } else {
                    nextSite(false);
                }
            }
        });
    }
});


function nextSite(log = false) {
    deleteAllCookies();
    chrome.storage.local.set({'refreshCount': 0});
    chrome.storage.local.get('sites', (data) => {
        sendLog(log, function () {
            if (data.sites.length && [0] in data.sites) {
                var url = data.sites[0];
                data.sites.splice(0, 1);
                chrome.storage.local.set({'sites': data.sites});
                window.location.href = url;
            } else {
                window.location.href = `chrome-extension://${extensionID}/options.html`;
            }
        });
    });
}

function deleteAllCookies() {
    chrome.runtime.sendMessage({
        msg: location.protocol + "//" + location.host
    }, function(response) {
        console.info('Cookies deleted');
    });
}

function sendLog(log, callback) {
//  callback();
    chrome.storage.local.get('ads', function (data) {
        var formData = new FormData();
        var domainName = /([^.]+)\.\w+$/.exec(document.domain)[1];
        formData.append('site', domainName);
        formData.append('data_id', data.ads.id);
        if (log) {
            formData.append('status', '1');
            if (typeof log == 'object') {
                for (name in log) {
                    formData.append(name, log[name]);
                }
            }
        } else {
            formData.append('status', '0');
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", serverUrl + '/log');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback();
            }
        };
        xhr.send(formData);
    });
}

function recaptcha(selector, siteKey, siteUrl = '', callback = null) {
    selector.ready(function () {
        var xhrRC = new XMLHttpRequest();
        var pageUrl = siteUrl.length > 0 ? `&pageurl=${siteUrl}` : '';
        xhrRC.open('GET', `//2captcha.com/in.php?key=${TwoCaptchaKey}&method=userrecaptcha&googlekey=${siteKey}${pageUrl}`, true);
        xhrRC.onreadystatechange = function () {
            if (xhrRC.readyState == 4) {
                var respons = xhrRC.responseText;
                if (respons.split('|')[0] == 'OK') {
                    window.setTimeout(function () {
                        _recaptch();
                    }, 7000);
                }
                function _recaptch() {
                    var xhrRCSub = new XMLHttpRequest();
                    xhrRCSub.open('GET', `//2captcha.com/res.php?key=${TwoCaptchaKey}&action=get&id=${respons.split('|')[1]}`, true);
                    xhrRCSub.onreadystatechange = function () {
                        if (xhrRCSub.readyState == 4) {
                            var _respons = xhrRCSub.responseText.split('|');
                            if (_respons[0] == 'OK') {
                                console.log(_respons[1]);
                                $('#g-recaptcha-response').val(_respons[1]);
                                captchaStatus = true;
                                if (callback)
                                    callback();
                            } else {
                                console.log('geting RECAPCHA...');
                                window.setTimeout(function () {
                                    _recaptch();
                                }, 3000);
                            }
                        }
                    };
                    xhrRCSub.send();
                }
            }
        };
        xhrRC.send();
    });
}

function captcha(element, input, params = {}, callback = null) {
    element = [0] in element ? element[0] : element;
    if (element.nodeName.toLowerCase() == 'img') {
        function getBase64Image(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        }

        var image = getBase64Image(element);
        getCaptcha(image);
    } else {
        html2canvas(element, {
            onrendered: function (canvas) {
                var image = canvas.toDataURL('image/png', 1.0);
                getCaptcha(image);
            }
        });
    }
    function getCaptcha(image) {
        console.log(image);
        var data = new FormData();
        data.append('key', TwoCaptchaKey);
        data.append('method', 'base64');
        data.append('body', image);
        if ('phrase' in params)                   // 0 = 1 word (default value); 1 = CAPTCHA contains 2 words
            data.append('phrase', params.phrase);
        if ('regsense' in params)                 // 0 = not case sensitive (default value); 1 = case sensitive
            data.append('regsense', params.regsense);
        if ('numeric' in params)                  //0 = not specified (default value); 1 = numeric CAPTCHA; 2 = letters CAPTCHA; 3 = either numeric or letters.
            data.append('numeric', params.numeric);
        if ('calc' in params)                     // 0 = not specified (default value); 1 = math CAPTCHA (users are to perform calculation)
            data.append('calc', params.calc);
        if ('min_len' in params)                  // 0 = not specified (default value); 1..20 = minimal number of symbols in the CAPTCHA text
            data.append('min_len', params.min_len);
        if ('max_len' in params)                  // 0 = not specified (default value); 1..20 = maximal number of symbols in the CAPTCHA text        
            data.append('max_len', params.max_len);
        if ('language' in params)                 // 0 = not specified (default value); 1 = Cyrillic CAPTCHA; 2 = Latin CAPTCHA
            data.append('language', params.language);
        if ('soft_id' in params)                  // 0 = default value; 1 = in.php for Access-Control-Allow-Origin: * response title parameter. (Used for cross-domaine AJAX requests in web applications, and for res.php.)
            data.append('soft_id', params.soft_id);
        if ('header_acao' in params)              // this option is necessary to send text, no longer than 140 characters. The picture at the same time also need to be sent.
            data.append('header_acao', params.header_acao);
        if ('Pingback' in params)                 // Pingback is a request you can use for the 2Captcha server that tells it to send your image to a given address, after it's been recognized.
            data.append('Pingback', params.Pingback);
        if ('id_construction' in params)          //Number of captcha-constructor
            data.append('id_construction', params.id_construction);
        var xhrC = new XMLHttpRequest();
        xhrC.open('post', '//2captcha.com/in.php', true);
        xhrC.onreadystatechange = function () {
            if (xhrC.readyState == 4) {
                var respons = xhrC.responseText;
                if (respons.split('|')[0] == 'OK') {
                    window.setTimeout(function () {
                        _captcha();
                    }, 3000);
                }
            }
            function _captcha() {
                var xhrCSub = new XMLHttpRequest();
                xhrCSub.open('GET', `//2captcha.com/res.php?key=${TwoCaptchaKey}&action=get&id=${respons.split('|')[1]}`, true);
                xhrCSub.onreadystatechange = function () {
                    if (xhrCSub.readyState == 4) {
                        var _respons = xhrCSub.responseText;
                        if (_respons.split('|')[0] == 'OK') {
                            console.log(_respons);
                            input.val(_respons.split('|')[1]);
                            captchaStatus = true;
                            if (callback)
                                callback();
                        } else {
                            console.log('geting CAPCHA...');
                            window.setTimeout(function () {
                                _captcha();
                            }, 3000);
                        }
                    }
                };
                xhrCSub.send();
            }
        };
        xhrC.send(data);
}
}

function getMail(from, callback, timeAgo = false, utf8 = false) {
    chrome.storage.local.get('ads', function (data) {
        var mail = data.ads.email;
        var pass = data.ads.pass;
        var formData = new FormData();
        formData.append('from', from);
        if (timeAgo)
            formData.append('time_ago', timeAgo);
        if (utf8)
            formData.append('utf8', '1');
        formData.append('email', mail);
        formData.append('pass', pass);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", serverUrl + '/mail');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if ($('#gh-mail-respons').length)
                    $('#gh-mail-respons').remove();
                var response = xhr.responseText;
                if (/^!{3}/.exec(response)) {
                    nextSite(false);
                } else {
                    var dataHtml = `<div id="gh-mail-respons">${response}</div>`;
                    $('body').append(dataHtml);
                    callback(response);
                }
            }
        };
        xhr.send(formData);
    });
}

function selector(parent, searchText) {
    var value = null;
    var options = parent.find('option');
    searchText = searchText.toLowerCase().replace(/^st\./i, '').replace(/^st-/i, '');
    $.each(options, function () {
        var text = $(this).text().trim().toLowerCase();
        if (text.match(new RegExp('^' + regCharFixer(searchText) + '$', 'gi'))) {
            value = $(this).val();
            parent.val(value);
            parent[0].dispatchEvent(new Event('change'));
            return;
        }
    });
    if (!value) {
        $.each(options, function () {
            var text = $(this).text().trim().toLowerCase();
            if (text.match(new RegExp(regCharFixer(searchText), 'gi'))) {
                value = $(this).val();
                parent.val(value);
                parent[0].dispatchEvent(new Event('change'));
                return;
            }
        });
    }
    if (value) {
        return true;
    } else {
        return false;
    }
}

function regCharFixer(data) {
    return data.replace(/[\s\-_\/]+/gi, "[\\s-_\\/]+").replace('a', '[aà]').replace('e', '[eèé]').replace('c', '[cç]').replace('o', '[oô]').replace('u', '[uùµ]').replace('i', '[iïí]');
}

function getImages(callback) {
    chrome.storage.local.get('ads', function (data) {
        var images = {};
        var imagesUrl = data.ads.image_url.split(';');
        xhrImage(0);
        function xhrImage(i = 0) {
            imagesUrl[i] = imagesUrl[i].replace('//bot.ghost-services.com', '//secure162.servconfig.com/~ghostservices/bot');
            var name = imagesUrl[i].split('/').pop();
            var extension = name.split('.').pop().toLowerCase();
            var imageType = extension === 'jpg' ? 'jpeg' : extension;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", imagesUrl[i], true);
            xhr.responseType = "arraybuffer";
            xhr.onreadystatechange = function () {
                xhr.onload = function (oEvent) {
                    var blob = new Blob([xhr.response], {type: 'image/' + imageType});
                    blob.lastModifiedDate = new Date();
                    blob.name = name;
                    images[i++] = {file: blob, name: name};
                    images.length = i;
                    if (i < imagesUrl.length) {
                        xhrImage(i);
                    } else {
                        callback(images);
                    }
                };
            };
            xhr.send();
        }
    });
}

function event(element, eventName, elIndex = 0) {
    if (element.length && elIndex in element) {
        switch (eventName) {
            case 'click' :
                $(element[elIndex]).click();
            case 'change' :
                $(element[elIndex]).change();
        }
        element[elIndex].dispatchEvent(new Event(eventName));
        console.info(element);
    } else {
        console.warn(element);
    }
    return;
}

function exchange(USD, callback) {
    var CAD =  (data) => {
        var rate = data.rates.CAD / data.rates.USD;
        callback(Math.ceil(rate * USD));
    };
    $.getJSON("//api.fixer.io/latest?symbols=USD,CAD", CAD);
}

chrome.storage.local.get('ads', (data) => {
    window.login = data.ads.login;
    window.pass = data.ads.pass;
    window.address = data.ads.address;
    window.apartment_amenities = data.ads.apartment_amenities;
    window.apartment_ids = data.ads.apartment_ids;
    window.apt_size = data.ads.apt_size;
    window.available_date = data.ads.available_date;
    window.bathroom = data.ads.bathroom;
    window.bedroom = data.ads.bedroom;
    window.city = data.ads.city;
    window.contact_person = data.ads.contact_person;
    window.contact_time = data.ads.contact_time;
    window.content = data.ads.content;
    window.email = data.ads.email;
    window.floor_count = data.ads.floor_count;
    window.gender = data.ads.gender;
    window.house_type = data.ads.house_type;
    window.house_type_id = data.ads.house_type_id;
    window.image_url = data.ads.image_url;
    window.l_name = data.ads.l_name;
    window.lease_length = data.ads.lease_length;
    window.pets = data.ads.pets;
    window.phone = data.ads.phone;
    window.postal_code = data.ads.postal_code;
    window.published = data.ads.published;
    window.region = data.ads.region;
    window.region_iso = data.ads.region_iso;
    window.rent = data.ads.rent;
    window.street = data.ads.street;
    window.title = data.ads.title;
    window.zone = data.ads.zone;
    window.name = data.ads.name;
    window.package_id = data.ads.package_id;
    window.parking_count = data.ads.parking_count;
    window.parking_price = data.ads.parking_price;

});
