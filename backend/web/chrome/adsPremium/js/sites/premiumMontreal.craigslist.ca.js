//https://montreal.craigslist.ca/?lang=en&cc=us
//https://accounts.craigslist.org/login?lang=en&cc=us&rt=L&rp=%2Flogin%2Fhome%3Flang%3Den%26cc%3Dus
//https://accounts.craigslist.org/login/home?lang=en&cc=us
//https://post.craigslist.org/manage/6007158621
//https://baghdad.craigslist.org/
//https://post.craigslist.org/k/6oe2GPr05hGAwmMhDAOZ5g/Xm6x6?s=type
//https://post.craigslist.org/k/6oe2GPr05hGAwmMhDAOZ5g/Xm6x6?s=hcat
//https://post.craigslist.org/k/6oe2GPr05hGAwmMhDAOZ5g/Xm6x6?s=edit
//https://post.craigslist.org/k/6oe2GPr05hGAwmMhDAOZ5g/Xm6x6?s=editimage
//https://post.craigslist.org/k/6oe2GPr05hGAwmMhDAOZ5g/Xm6x6?s=preview
//https://post.craigslist.org/k/TItPoEf05hGcOoyYbqFClQ/cG6uq?s=mailoop
//https://post.craigslist.org/k/6oe2GPr05hGAwmMhDAOZ5g/Xm6x6?s=redirect


/* global chrome */
jQuery(document).ready(function ($) {

    var url = String(window.location.href).replace(/\/$/, '');

    if (url == 'https://montreal.craigslist.ca/?lang=en&cc=us') {
        $('#postlks').find('a').get(1).click();
    }else if(url.indexOf('/login?lang=') + 1 || url.indexOf('/login?rt=') + 1  && $('[name=emailAddress]').length > 0){
        login();
    }else if(url.indexOf('/login/home') + 1){
        if($('[type=submit][value=delete]').length > 0){
            $('[type=submit][value=delete]').click();
            $('[type=submit][value=delete]')[0].dispatchEvent(new Event('click'));
        }else {
            window.location.href = 'https://accounts.craigslist.org/login/home?show_tab=postings';
        }
    }else if(url.indexOf('/manage') + 1){
        window.location.href = 'https://baghdad.craigslist.org/';
    }else if(url == 'https://baghdad.craigslist.org'){
        /****START ADD NEW LISTING******/
        $('#postlks').find('a').get(0).click();
    }else if (url.indexOf('&s=type') + 1 || url.indexOf('?s=type') + 1) {
        $('[value=ho]').click();
        $('[name=go]').click();
    } else if (url.indexOf('&s=hcat') + 1 || url.indexOf('?s=hcat') + 1) {
        houseType();
    }else if (url.indexOf('&s=edit') + 1 || url.indexOf('?s=edit') + 1) {
        if ($('[name=go][value$=Images]').length){
            uploadeImage();
        }else{
            creat();
        }
    }else if (url.indexOf('&s=preview') + 1 || url.indexOf('?s=preview') + 1) {
        $('[name=continue][value=y]').next('button').click();
    }else if (url.indexOf('&s=mailoop') + 1 || url.indexOf('?s=mailoop') + 1) {
        mail();
    }else if (url.indexOf('&s=tou') + 1 || url.indexOf('?s=tou') + 1) {
        $('[name=continue][value=y]').next('button').click();
    }else if(url.indexOf('&s=redirect') + 1 || url.indexOf('?s=redirect') + 1){
        setTimeout(function () {
            nextAccount();
        }, 5000);
    }else{
        setTimeout(function () {
            nextAccount();
        }, 5000);
    }


    function login() {
        chrome.storage.local.get('ads', function (data) {
            /**/
            $('[name=inputEmailHandle]').click();
            $('[name=inputEmailHandle]').val(data.ads.email);
            $('[name=inputEmailHandle]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=inputPassword]').click();
            $('[name=inputPassword]').val(data.ads.pass);
            $('[name=inputPassword]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=whichForm][value=login]').parents('form').find('[type=submit]').click();
            $($('[name=whichForm][value=login]').parents('form').find('[type=submit]'))[0].dispatchEvent(new Event('click'));
        })
    }

    function houseType() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads.house_type);
            if (data.ads.house_type == 'Commercial') {
                $('[name=id][value="40"]').click();
            }else {
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