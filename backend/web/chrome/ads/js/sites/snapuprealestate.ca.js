//https://www.snapuprealestate.ca/listing/create
//https://www.snapuprealestate.ca/listing/index
//https://www.snapuprealestate.ca/listing/Montreal-QC/condos-for-rent-2100-Saint-Marc-Montreal-7546332866

/* global chrome, captchaStatus */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'https://www.snapuprealestate.ca/listing/create') {
        start();
    } else if (url == 'https://www.snapuprealestate.ca/listing/index') {
        myMail();
    } else if (url.indexOf('https://www.snapuprealestate.ca/listing') + 1 && $('#myTab').length > 0) {
        nextSite(true);
    } else {
        nextSite(false);
    }

    function start() {
        chrome.storage.local.get('ads', function (data) {

            $('[name=category][id=category2]').click();
            /**/ $('[name=day_available]').click();
            /**/$('[name=propertyType]')[0].click();

            $('[name=propertyType]').change(function () {
                window.setTimeout(function () {
                    if (data.ads.house_type != 'Apartment') {
                        selector($('[name=type]'), 'Other');
                    } else  {
                        selector($('[name=condominiumType]'), 'Apartment');
                    }
                }, 1000);

            });

            if (data.ads.house_type != 'Studio') {
                selector($('[name=propertyType]'), data.ads.house_type);
            } else {
                selector($('[name=propertyType]'), 'Houses');
            }
            /**/$('[name=numberOfBedrooms]').click();
            $('[name=numberOfBedrooms]').val(data.ads.bedroom);
            /**/$('[name=numberOfBathrooms]').click();
            $('[name=numberOfBathrooms]').val(data.ads.bathroom);
            /**/$('[name=areaCovered]').click();
            $('[name=areaCovered]').val(data.ads.apt_size);
            /**/$('[name=streetName]').click();
            $('[name=streetName]').val(data.ads.address + ', ' + data.ads.street);
            /**/$('[name=city]').click();
            $('[name=city]').val(data.ads.city);
            selector($('[name=province]'), data.ads.region);
            /**/$('label[for=amount]').next('div').find('#amount').click();
            $('label[for=amount]').next('div').find('#amount').val(parseInt(data.ads.rent));
            /**/$('[name=availableFrom]').click();
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            if (dd < 10)
                dd = '0' + dd;
            if (mm < 10)
                mm = '0' + mm;
            today = mm + '/' + dd + '/' + yyyy;
            $('[name=availableFrom]').val(today);
            /**/if (find(data.ads.apartment_amenities, 'Furniture') + 1)
                $('[name=furnished]').click();
            /**/if (data.ads.pets != '0')
                $('[name=petFriendly]').click();
            /**/$('[name=title]').click();
            $('[name=title]').val(data.ads.title);
            /**/$('[name=description]').click();
            $('[name=description]').val(data.ads.content);
            /**/$('[name=email]').click();
            $('[name=email]').val(data.ads.email);
            /**/$('[name=phoneNumber]').click();
            $('[name=phoneNumber]').val(data.ads.phone);


            console.log(data);
            uploadeImage();
        });
    }

    function uploadeImage() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                data.append('name', 'uploadFile');
                data.append('listingID', '');
                data.append('uploadedFile', images[i].file, images[i].name);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://www.snapuprealestate.ca/listing/uploadFile', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        $('#sessionList').append(xhr.responseText);
                        if (++i < images.length) {
                            _uploadeimage(i);
                        } else {
                            console.log('end ' + i);
                            /**/getRecaptcha();
                        }
                    }
                };
                xhr.send(data);
            }
        });
    }

    function getRecaptcha() {
        /**/recaptcha($('.g-recaptcha').find('iframe'), $('.g-recaptcha').attr('data-sitekey'), 'https://www.snapuprealestate.ca', function () {
             $('#postBtn').click();
        });
    }

    function  myMail() {
        getMail('info@snapuprealestate.ca', function (data) {
            var get = /(https?:\/\/w{0,3}\.?snapuprealestate\.ca\/activateAd[^\s]+)[\n\r\t\s]*<\/a/i.exec(data.replace('<wbr>', '').replace('&amp;', '&'))[1];
            window.location = get;
        });
    }
});