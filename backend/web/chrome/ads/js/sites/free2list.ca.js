//http://free2list.ca/create-account
//http://free2list.ca/members/listing-add.php
//http://free2list.ca/members/listing-map.php?msg=addsuccess&list=103072
//http://free2list.ca/members/listing-images.php?msg=delsuccess&list=103111
//http://free2list.ca/members/new-listing-upgrade.php?msg=addsuccess&list=103117
//http://free2list.ca/members/index.php?msg=addsuccess&list=103117


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url.indexOf('//free2list.ca/create-account')  + 1) {
        registration();
    }else if(url.indexOf('//free2list.ca/members/listing-add.php')  + 1 ){

        var cookie = document.cookie.split(';');
        for (var key in cookie) {
            if (cookie[key].search('clicked') + 1) {
                setTimeout(function () {
                    addListing();
                }, 5000);
                return;
            }
        }
        $('[name=listtype][value=Rental]').parents('.formRes2').find('button').click();
        document.cookie = "clicked=" + true;
    }else if(url.indexOf('/listing-map.php?') + 1){
        setTimeout(function () {
            $($('.success').find('a'))[0].click();
            $('.success').find('a')[0].dispatchEvent(new Event('click'));

        }, 5000)


    }else if(url.indexOf('/listing-images.php?') + 1){
        setTimeout(function () {
            addPhoto();
        }, 5000)
    }else if(url.indexOf('/new-listing-upgrade.php') + 1){
        $('#up-2').find('a').each(function () {
            if($(this).attr('onclick').search('closePopup') +1){
                $(this)[0].click();
            }
        });

    }else if(url.indexOf('/index.php')){
        nextSite(true);
    }else {
        nextSite(false);
    }


    function registration() {
        chrome.storage.local.get('ads', function (data) {
            /**/ $('[name=name]').click();
            $('[name=name]').val(data.ads.name);
            $('[name=name]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=email]').click();
            $('[name=email]').val(data.ads.email);
            $('[name=email]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=pw77]').click();
            $('[name=pw77]').val(data.ads.pass);
            $('[name=pw77]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=agree]').prop('checked', true);

            /******CHOOSE THE CATEGORY Owner******/
            selector($('[name=category]'), 'Owner');

            /**/$('#create-form').find('button').click();
        });
    }


    function addListing() {
        chrome.storage.local.get('ads', function (data) {

            var date = new Date();
            var currentYear = date.getFullYear();
            var currentMonth = date.getMonth() + 1;
            var currentDay = date.getDate();

            if (currentDay < 10){
                currentDay = '0' + currentDay;
            }

            var expirationMonth = '';

            if(currentMonth == '12'){
                expirationMonth = '01';
            }else {
                expirationMonth = parseInt(currentMonth) + 1 ;
            }
            if (expirationMonth < 10){
                expirationMonth = '0' + expirationMonth;
            }

            var currentDate = expirationMonth + '/' + currentDay + '/' + currentYear;


            /**/ $('[name=expirydate]').click();
            $('[name=expirydate]').val(currentDate);
            $('[name=expirydate]')[0].dispatchEvent(new Event('change'));

            /********CHOOSE country and province*******/
            selector($('[name=country]'), 'Canada');
            selector($('[name=cdn_province]'), data.ads.region);

            /**/ $('[name=city]').click();
            $('[name=city]').val(data.ads.city);
            $('[name=city]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=streetaddress]').click();
            $('[name=streetaddress]').val(data.ads.street);
            $('[name=streetaddress]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=streetaddress2]').click();
            $('[name=streetaddress2]').val(data.ads.address);
            $('[name=streetaddress2]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=postal]').click();
            $('[name=postal]').val(data.ads.postal_code);
            $('[name=postal]')[0].dispatchEvent(new Event('change'));


            switch (data.ads.house_type){
                case 'Apartment':
                    selector($('[name=typeresi]'), data.ads.house_type);
                    break;
                case 'House':
                    selector($('[name=typeresi]'), 'Townhouse');
                    break;
                case 'Studio':
                    selector($('[name=typeresi]'), 'Starter Home');
                    break;
                case 'Commercial':
                    selector($('[name=typeresi]'), 'Retail');
                    break;
            }

            /**/ $('[name=price]').click();
            $('[name=price]').val(data.ads.rent);
            $('[name=price]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=price]').click();
            $('[name=price]').val(data.ads.rent);
            $('[name=price]')[0].dispatchEvent(new Event('change'));

            var aptSize = Math.ceil(data.ads.apt_size * 10.7639);

            /**/ $('[name=size]').click();
            $('[name=size]').val(aptSize);
            $('[name=size]')[0].dispatchEvent(new Event('change'));

            if(data.ads.bathroom < 3){
                selector($('[name=criteria1]'), data.ads.bathroom);
            }else{
                selector($('[name=criteria1]'), '3');
            }
            $('[name=criteria1]')[0].dispatchEvent(new Event('change'));



            for(let key in data.ads.apartment_amenities){
                switch (data.ads.apartment_amenities[key]){
                    case 'Garage':
                    case 'Secured Garage':
                        selector($('[name=criteria3]'), 'Indoor');
                        break;
                }
            }


            if(data.ads.bedroom < 5){
                selector($('[name=criteria4]'), data.ads.bedroom);
            }else{
                selector($('[name=criteria4]'), '5');
            }

            /**/ $('[name=details]').click();
            $('[name=details]').val(data.ads.content);
            $('[name=size]')[0].dispatchEvent(new Event('change'));


            setTimeout(function () {
                $('[name=update]').find('#submitButton').click();
                $('[name=update]').find('#submitButton')[0].dispatchEvent(new Event('click'));

            }, 5000);
        })
    }


    function addPhoto() {
        getImages(function (images) {

            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                var imgUploadId = /list=(\d+)/.exec(url)[1];

                data.append('file', images[i].file, images[i].name);

                var xhr = new XMLHttpRequest();

                xhr.open('post', '//free2list.ca/members/scripts/image-upload.php?list='+imgUploadId, true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (++i < images.length) {
                            _uploadeimage(i);
                        }else{
                            setTimeout(function () {
                                /*******FINISH*******/
                                /*-->*/$($('.success').find('a'))[0].click();
                            }, 3000)
                        }
                    }
                };
                xhr.send(data);
            }
        });
    }
});




