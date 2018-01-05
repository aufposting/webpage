//https://montreal.craigslist.ca/?lang=en&cc=us
//https://accounts.craigslist.org/login?lang=en&cc=us&rt=L&rp=%2Flogin%2Fhome%3Flang%3Den%26cc%3Dus
//https://accounts.craigslist.org/login?lang=en&cc=us
//https://accounts.craigslist.org/pass?lang=en&cc=us&ui=309625285&ip=nwJjWB60&rt=L&rp=%2Flogin%2Fhome%3Flang%3Den%26cc%3Dus
//https://accounts.craigslist.org/pass?lang=en&cc=us
//https://accounts.craigslist.org/login/tou?lang=en&cc=us
//https://accounts.craigslist.org/login/home?lang=en&cc=us&show_tab=postings
//https://post.craigslist.org/k/DoJyo0X05hGpLle7OCwDVg/Zj9iG?s=type
//https://baghdad.craigslist.org/
//https://post.craigslist.org/c/bgd
//redirect
//https://post.craigslist.org/k/IsFNTEb05hGKMirlqfXEyA/AAqTH?s=type
//https://post.craigslist.org/k/TItPoEf05hGcOoyYbqFClQ/cG6uq?s=hcat
//https://post.craigslist.org/k/TItPoEf05hGcOoyYbqFClQ/cG6uq?s=edit
//https://post.craigslist.org/k/TItPoEf05hGcOoyYbqFClQ/cG6uq?s=preview
//https://post.craigslist.org/k/TItPoEf05hGcOoyYbqFClQ/cG6uq?s=mailoop
//https://post.craigslist.org/k/eEi0bEv05hGT4fTthhualQ/ctwhx?s=redirect


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url == 'https://montreal.craigslist.ca/?lang=en&cc=us') {
        $('#postlks').find('a').get(1).click();
    }else if(url.indexOf('/login?lang=') + 1  && $('[name=emailAddress]').length > 0){
        setEmail();
    }else if(url.indexOf('/login?lang=') + 1  && $('[name=emailAddress]').length == 0){
        getMail('robot@craigslist.org', function () {
            var pattern = /[\"\'](https?:\/\/.*?pass[^"]+)/im;
            var forClick =  pattern.exec($('#gh-mail-respons').html())[1].replace(/&amp;/g, '&').replace(/®/g, '&reg');
            console.log(forClick);

            window.location.href = forClick;
        }, 3000);
    }else if(url.indexOf('/pass?lang=') + 1 && $('[name=inputNewPassword]').length > 0){
        setPass();
    }else if(url.indexOf('/pass?lang=') + 1 && $('[name=inputNewPassword]').length == 0){
        $('a').each(function () {
            if($(this).attr('href') && /\/login\?/.exec($(this).attr('href'))){
                $(this)[0].click();
                $($(this)[0])[0].dispatchEvent(new Event('click'));
            }
        })
    }else if(url.indexOf('/login/tou?lang=') + 1){
        $('[name=step][value=touAccepted]').parents('form').find('[type=submit]').click()
    }else if(url.indexOf('login/home') + 1){
        window.location.href = 'https://baghdad.craigslist.org/';
    }else if(url == 'https://baghdad.craigslist.org'){
        window.location.href = 'https://post.craigslist.org/c/bgd';
    }else if (url.indexOf('&s=type') + 1 || url.indexOf('?s=type') + 1) {
        $('[value=ho]').click();
        $('[name=go]').click();
    }else if (url.indexOf('&s=hcat') + 1 || url.indexOf('?s=hcat') + 1) {
        houseType();
    }else if (url.indexOf('&s=edit') + 1 || url.indexOf('?s=edit') + 1) {
        if ($('[name=go][value$=Images]').length){
            uploadeImage();
        }else{
            creat();
        }
    }else if (url.indexOf('&s=preview') + 1 || url.indexOf('?s=preview') + 1) {
        $('[name=continue][value=y]').next('button').click();
    }else if (url.indexOf('&s=geoverify') + 1 || url.indexOf('?s=geoverify') + 1) {
        $('[name=geocoder_accuracy]').next('button.continue').click();
    }else if (url.indexOf('&s=editimage') + 1 || url.indexOf('?s=editimage') + 1) {
        uploadeImage(); // $('[name=go][value$=Images]').click();
    }else if (url.indexOf('&s=mailoop') + 1 || url.indexOf('?s=mailoop') + 1) {
        mail();
    }else if (url.indexOf('&s=tou') + 1 || url.indexOf('?s=tou') + 1) {
        $('[name=continue][value=y]').next('button').click();
    }else if(url.indexOf('&s=redirect') + 1 || url.indexOf('?s=redirect') + 1){
        nextSite(true);
    }else{
        nextSite(false);
    }


    function setEmail() {
        chrome.storage.local.get('ads', function (data) {
            /**/
            $('[name=emailAddress]').click();
            $('[name=emailAddress]').val(data.ads.email);
            $('[name=emailAddress]')[0].dispatchEvent(new Event('change'));

            $('[name=whichForm][value=createAccount]').parents('form').find('[type=submit]').click();
            $($('[name=whichForm][value=createAccount]').parents('form').find('[type=submit]'))[0].dispatchEvent(new Event('click'));
        })
    }

    function setPass() {
        chrome.storage.local.get('ads', function (data) {
            /**/
            $('[name=inputNewPassword]').click();
            $('[name=inputNewPassword]').val(data.ads.pass);
            $('[name=inputNewPassword]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=inputNewPasswordRetype]').click();
            $('[name=inputNewPasswordRetype]').val(data.ads.pass);
            $('[name=inputNewPasswordRetype]')[0].dispatchEvent(new Event('change'));

            /**/
            $('form').find('[type=submit]').click();
            $('form').find('[type=submit]')[0].dispatchEvent(new Event('click'));
        })
    }


    function houseType() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads.house_type);
            if (data.ads.house_type == 'Commercial') {
                $('[name=id][value="40"]').click();
            } else {
                $('[name=id][value="1"]').click();
            }
        });
    }

    function creat() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads);
            /**/ $('[name=FromEMail]').val(data.ads.email);
            $('[name=FromEMail]').change();
            /**/ $('[name=ConfirmEMail]').val(data.ads.email);
            $('[name=ConfirmEMail]').change();
            /**/ $('#contact_phone_ok').click();
            /**/ $('[name=contact_phone]').val(data.ads.phone);
            $('[name=ConfirmEMail]').change();
            /**/ $('[name=contact_name]').val(data.ads.name + ' ' + data.ads.l_name);
            $('[name=contact_name]').change();
            /**/ $('[name=PostingTitle]').val(data.ads.title);
            $('[name=PostingTitle]').change();
            /**/ $('[name=GeographicArea]').val(data.ads.region + ', ' + data.ads.city + ', ' + data.ads.street + ', ' + data.ads.address);
            $('[name=GeographicArea]').change();
            /**/ $('[name=postal]').val(data.ads.postal_code);
            $('[name=postal]').change();
            /**/ $('[name=PostingBody]').val(data.ads.content);
            $('[name=PostingBody]').change();
            /**/ $('[name=Sqft]').val(data.ads.apt_size);
            $('[name=Sqft]').change();
            /**/ $('[name=Ask]').val(data.ads.rent);
            $('[name=Ask]').change();
            //houseType
            if ($('.category').text().trim().indexOf('housing for rent') + 1) {
                /*--*/var date = data.ads.available_date.split('-');
                /**/var month = date[1].substr(0, 1) == '0' ? date[1].substr(1, 1) : date[1];
                $('[name=moveinMonth]').val(month);
                $('[name=moveinMonth]').change();
                /**/$('[name=moveinDay]').val(date[2]);
                $('[name=moveinDay]').change();
                /**/$('[name=moveinYear]').val(date[0]);
                $('[name=moveinYear]').change();
                /**/selector($('[name=Bedrooms]'), data.ads.bedroom);
                /**/selector($('[name=bathrooms]'), data.ads.bathroom);
                /**/selector($('[name=housing_type]'), data.ads.house_type);
                /**/ if (find(data.ads.apartment_amenities, 'Laundry In-Building') + 1) {
                    selector($('[name=laundry]'), 'laundry in bldg');
                } else if (find(data.ads.apartment_amenities, 'Laundry') + 1) {
                    selector($('[name=laundry]'), 'laundry on site');
                }
                /**/if (data.ads.parking_price > 1) {
                    selector($('[name=parking]'), 'valet parking');
                } else if (find(data.ads.apartment_amenities, 'Indoor Parking') + 1) {
                    selector($('[name=parking]'), 'attached garage');
                } else if (find(data.ads.apartment_amenities, 'outdoor Parking') + 1) {
                    selector($('[name=parking]'), 'street parking');
                }
                /*--*/if (data.ads.pets == 1) {
                    /**/$('[name=pets_cat]').click();
                    $('[name=pets_cat]').change();
                    /**/$('[name=pets_dog]').click();
                    $('[name=pets_dog]').change();
                }
                /**/if (find(data.ads.apartment_amenities, 'Furniture') + 1) {
                    $('[name=is_furnished]').click();
                    $('[name=is_furnished]').change();
                }
                /**/if (find(data.ads.apartment_amenities, 'Wheelchair accessible') + 1) {
                    $('[name=wheelchaccess]').click();
                    $('[name=wheelchaccess]').change();
                }
            }
            /**/ $('[name=xstreet0]').val(data.ads.street);
            $('[name=xstreet0]').change();
            /**/ $('[name=city]').val(data.ads.city);
            $('[name=city]').change();
            /**/ $('[name=region]').val(data.ads.region);
            $('[name=region]').change();
            /**/ $('[name=contact_ok]').click();
            $('[name=contact_ok]').change();
            /*-->*/ $('[name=go][value=Continue]').click();
        });
    }

    function uploadeImage() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                data.append('name', images[i].name);
                data.append('cryptedStepCheck', $('[name=cryptedStepCheck]').val());
                data.append('ajax', '1');
                data.append('a', 'add');
                data.append('file', images[i].file, images[i].name);
                var xhr = new XMLHttpRequest();
                xhr.open('post', $('form.ajax').attr('action'), true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var respons = JSON.parse(xhr.responseText);
                        $('.imgwrap').append('<img src="' + respons.URL + '>');
                        if (++i < images.length) {
                            _uploadeimage(i);
                        } else {
                            window.setTimeout(function () {
                                /**/$('[name=go][value$=Images]').click();
                            }, 250);
                        }
                    }
                };
                xhr.send(data);
            }
        });

    }

    function mail() {
        getMail('robot@craigslist.org', function (data) {
            var get = /"(https?:\/\/w{0,3}\.?post\.craigslist\.org\/u\/[^"]+)"/.exec(data)[1];
            window.location = get;
        }, 86400);
    }

});