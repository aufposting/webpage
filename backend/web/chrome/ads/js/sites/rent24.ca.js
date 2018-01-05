//http://www.rent24.ca/?view=post&cityid=84&lang=en&catid=9
//http://www.rent24.ca/?view=post&cityid=84&lang=en&catid=9&subcatid=4
//http://www.rent24.ca/index.php?view=post&cityid=84&lang=en&catid=9&subcatid=4&adid=0&imgid=0&countryid=0&areaid=0&pos=0&picid=0&page=0&foptid=0&eoptid=0&pricemin=0&pricemax=0&
//http://www.rent24.ca/?view=activate&type=ad&adid=4692&codemd5=5d02e5eb349721d520c424d16b5d8d20&cityid=84
//http://www.rent24.ca/84/posts/9/4/4695.html


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'http://www.rent24.ca/?view=post&cityid=84&lang=en&catid=9') {
        selectSubcategory();

    }else if (url.indexOf('&subcatid') + 1 && !(url.indexOf('/index.php?view=post') + 1) ) {
        setTimeout(function () {
            addPost();
        }, 2000);
    }else if (url.indexOf('?view=activate') + 1  && $('#content').length > 0) {
        $('#content').find('a').each(function () {
            if($(this).attr('href').search('posts') +1){
                window.location.href = $(this).attr('href');
            }
        });
    }else if(url.indexOf('posts') + 1){
        nextSite(true);
    }else {
        nextSite(false);
    }


    function selectSubcategory() {
        chrome.storage.local.get('ads', function (data) {
            switch (data.ads.house_type) {
                case 'House':
                case 'Apartment':
                    $('.postcats').find('li a').each(function () {
                        if ($(this).text().toLowerCase() == data.ads.house_type.toLowerCase()) {
                            $(this)[0].click();
                        }
                    });
                    break;
                default:
                    $('.postcats').find('li a').each(function () {
                        if ($(this).text().toLowerCase() == 'other') {
                            $(this)[0].click();
                        }
                    });
            }
            /**/
            $('[id=textTitle]').click();
            $('[id=textTitle]').val(data.ads.title);
        });
    }

    function addPost() {
        chrome.storage.local.get('ads', function (data) {
            addCaptcha();
            /**/
            $('[name=adtitle]').click();
            $('[name=adtitle]').val(data.ads.title);
            $("[name=adtitle]")[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=area]').click();
            $('[name=area]').val(data.ads.street + ' ' + data.ads.address);
            $("[name=area]")[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=addesc]').click();
            $('[name=addesc]').val(data.ads.content);
            $("[name=addesc]")[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=price]').click();
            $('[name=price]').val(data.ads.rent);
            $("[name=price]")[0].dispatchEvent(new Event('change'));

            /******CHOOSE SELECT OPTIONS******/
            if (data.ads.bedroom < 10) {
                selector($('[name="x[1]"]'), data.ads.bedroom);
            } else {
                selector($('[name="x[1]"]'), '10+');
            }
            if (data.ads.bathroom < 10) {
                selector($('[name="x[2]"]'), data.ads.bathroom);
            } else {
                selector($('[name="x[2]"]'), '10+');
            }
            if (data.ads.parking_count < 10) {
                selector($('[name="x[3]"]'), data.ads.parking_count);
            } else {
                selector($('[name="x[3]"]'), '10+');
            }


            for (let key in data.ads.apartment_amenities) {
                switch (data.ads.apartment_amenities[key]) {
                    case 'Fireplace':
                        selector($('[name="x[5]"]'), '1');
                        break;
                    case 'A/C':
                        selector($('[name="x[6]"]'), 'Yes');
                        break;
                    case 'Pool':
                        selector($('[name="x[7]"]'), 'Yes');
                        break;
                    case 'Furniture':
                        selector($('[name="x[8]"]'), 'Yes');
                        break;
                    case 'Utilities Included':
                        selector($('[name="x[10]"]'), 'Included');
                        break;
                }
            }

            if (data.ads.pets == '1') {
                selector($('[name="x[9]"]'), 'Yes');
            }

            $('[name=email]').click();
            $('[name=email]').val(data.ads.email);
            $("[name=email]")[0].dispatchEvent(new Event('change'));

            $('[name=showemail][value="1"]').prop('checked', true);
            $('[name=agree]').prop('checked', true);
        });

    }

    function addCaptcha() {
        captcha($('[name=captcha]').parent().find('img'), $('[name=captcha]'), {phrase: 0, regsense: 1}, function () {
            addPhoto();
        });
    }

    function addPhoto() {
        getImages(function (images) {
            var limit = images.length <= 5 ? images.length : 5;
            var formData = new FormData();
            $.each($('[name=frmPost]').find('input'), function () {
                if (($(this).attr('type') != 'checkbox' && $(this).attr('type') != 'radio' && $(this).attr('type') != 'file') || ($(this).attr('type') == 'checkbox' && $(this).is(':checked')) || ($(this).attr('type') == 'radio' && $(this).is(':checked')))
                    formData.append($(this).attr('name'), $(this).val());
            });
            $.each($('[name=frmPost]').find('textarea'), function () {
                formData.append($(this).attr('name'), $(this).val());
            });
            $.each($('[name=frmPost]').find('select'), function () {
                formData.append($(this).attr('name'), $(this).val());
            });
            for (i = 0; i < limit; i++) {
                formData.append('pic[]', images[i].file, images[i].name)
            }

            var xhr = new XMLHttpRequest();
            xhr.open('post', $('[name=frmPost]').attr('action'), true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    getMail('info@rent24.ca', function () {
                        var pattern = /https?:\/\/w{0,3}\.rent24\.ca\/\?view=activate[^\n\r\t\s]+/igm;
                        var forClick = pattern.exec($('#gh-mail-respons').html())[0].replace(/&amp;/g, '&').replace(/®/g, '&reg');
                       window.location.href = forClick;
                    }, 300, true);
                }
            };
            xhr.send(formData);
        });
    }
});



