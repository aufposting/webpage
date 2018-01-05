//http://www.locata.ca/addrental
/* global chrome*/
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url.indexOf('addrental?image=1') + 1 || url.indexOf('addrental/?image=1') + 1) {
        start();
    } else if (url == 'http://www.locata.ca/addrental') {
         uploadeImage();
    } else if (url == 'http://www.locata.ca/addrental/rentalsuccess.php') {
        nextSite(true);
    } else {
        nextSite(false);
    }

    //submit_image
    function start() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads);
            /**/ $('[name=unit_type]').click();
            if (data.ads.shouse_type == 'House' || data.ads.house_type == 'Apartment')
                $('[name=unit_type]').val(data.ads.house_type);
            else if (data.ads.house_type == 'Town House')
                $('[name=unit_type]').val('Townhome');
            else
                $('[name=unit_type]').val('House');
            /**/ $('[name=bedrooms]').click();
            $('[name=bedrooms]').val(data.ads.bedroom);
            /**/ $('[name=bathrooms]').click();
            $('[name=bathrooms]').val(data.ads.bathroom);
            /**/ $('[name=appsize]').click();
            $('[name=appsize]').val(data.ads.apt_size);
            /**/ $('[name=address]').click();
            $('[name=address]').val(data.ads.address);
            /**/ $('[name=pcode1]').click();
            $('[name=pcode1]').val(data.ads.postal_code.substr(0, 3));
            /**/ $('[name=pcode2]').click();
            $('[name=pcode2]').val(data.ads.postal_code.substr(3, 3));
            /**/ $('[name=rent]').click();
            $('[name=rent]').val(data.ads.rent);
            /*}*/ var date = data.ads.available_date.split('-');
            /**/ $('[name=month_available]').click();
            $('[name=month_available]').val(date[1]);
            /**/ $('[name=day_available]').click();
            $('[name=day_available]').val(date[2]);
            /**/ $('[name=year_available]').click();
            $('[name=year_available]').val(date[0]);
            /**/ $('[name=flexible][value=0]').click();
            /**/ $('[name=deposit][value=0]').click();
            /**/ $('[name=lease][value=0]').click();
            /**/ $('[name=parking]').click();
            if (data.ads.parking == '-1') {
                $('[name=parking]').val('1');
            } else if (data.ads.parking == '0') {
                $('[name=parking]').val('0');
            } else {
                $('[name=parking]').val('1');
                /**/ $('[name=parking_cost]').click();
                $('[name=parking_cost]').val(data.ads.parking);
            }
            /**/ $('[name=comments]').click();
            $('[name=comments]').val(data.ads.title + "\r" + data.ads.content);
            /**/ $('[name=contact_type][value=P]').click();
            /**/ $('[name=contact_name]').click();
            $('[name=contact_name]').val(data.ads.name + " " + data.ads.l_name);
            /**/ $('[name=email]').click();
            $('[name=email]').val(data.ads.email);
            /**/ $('[name=phone_1]').click();
            $('[name=phone_1]').val(data.ads.phone.substr(0, 3));
            /**/ $('[name=phone_2]').click();
            $('[name=phone_2]').val(data.ads.phone.substr(3, 3));
            /**/ $('[name=phone_3]').click();
            $('[name=phone_3]').val(data.ads.phone.substr(6, 4));
            /**/ if (data.ads.contact_time.indexOf('m') + 1)
                $('[name=contact_1]').click();
            /**/ if (data.ads.contact_time.indexOf('a') + 1)
                $('[name=contact_2]').click();
            /**/ if (data.ads.contact_time.indexOf('e') + 1)
                $('[name=contact_3]').click();
            /**/ $('[name=terms_of_service]').click();
            /**/ if ([2] in data.ads.apartment_amenities)
                $('[name=rent_includes_1]').click();
            /**/ if ([3] in data.ads.apartment_amenities)
                $('[name=rent_includes_2]').click();
            /**/ if ([10] in data.ads.apartment_amenities)
                $('[name=rent_includes_3]').click();
            $('[name=SubCat]').bind('DOMSubtreeModified', function () {
                selector($('[name=SubCat]'), data.ads.city.replace('Saint', ''));
            });
            /**/  selector($('[name=Category]'), data.ads.region);
            var first = true;
            $('[name=Category]').bind('DOMSubtreeModified', function () {
                selector($('[name=Category]'), data.ads.region);
                if (first && $('[name=Category]').val()) {
                    first = false;
                    /*-->*/window.setTimeout(function () {
                        $('[name=submit]').click();
                        $('[name=submit]')[0].dispatchEvent(new Event('click'));
                    }, 1000);
                }
            });
        });
    }


    function uploadeImage() {
        getImages(function (images) {
            console.log('data.ads');
            var data = new FormData();
            data.append('submit_image', 'Save');
            data.append('imagefile', images[0].file, images[0].name);
            var xhr = new XMLHttpRequest();
            xhr.open('post', 'http://www.locata.ca/addrental/', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var innerBody = xhr.responseText.replace(/([\n\r]|.)+<body[^>]+>/, '').replace(/<\/body[^>]*>([\n\r]|.)+/, '');
                    $('body').html(innerBody);
                    window.location.href = String(window.location.href) + '?image=1';
                }
            };
            xhr.send(data);
        });
    }
});