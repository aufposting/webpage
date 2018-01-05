//https://www.kijiji.ca/t-user-registration.html?siteLocale=en_CA
//http://www.kijiji.ca/?uar=true
//http://www.kijiji.ca/h-ville-de-montreal/1700281
//http://www.kijiji.ca/h-ville-de-montreal/1700281?ua=true
//https://www.kijiji.ca/p-select-category.html?categoryId=37&siteLocale=en_CA
//https://www.kijiji.ca/p-post-ad.html?categoryId=214
//https://www.kijiji.ca/p-preview-ad.html
//http://www.kijiji.ca/v-view-details.html?adId=1239485118&posted=true&adActivated=true


/* global chrome */
jQuery(document).ready(function ($) {

    /*******THIS SITE ONLY FOR Montreal city ******/
    chrome.storage.local.get('ads', function (data) {
        if (data.ads.city != 'Montreal') {
            nextSite(false);
        }
    });

    var url = String(window.location.href).replace(/\/$/, '');

    if(url.indexOf('registration.html') + 1){
        registration();
    }else if(url.indexOf('www.kijiji.ca/?uar=true') + 1){
        selectLocation();
    }else if(url.indexOf('h-ville-de-montreal/1700281') + 1 && url.indexOf('?ua=true') + 1 == false){
        getMail('donot-reply@kijiji.ca', function () {
            var pattern = /[\"\'](https?:\/\/.*?activation\.html[^\"\']+)/im;
            var forClick =  pattern.exec($('#gh-mail-respons').html())[1].replace(/&amp;/g, '&').replace(/®/g, '&reg');
            console.log(forClick);
            window.location.href = forClick;
        }, 3000);
    }else if(url.indexOf('h-ville-de-montreal/1700281?ua=true') + 1){
        window.location.href = '//www.kijiji.ca/p-select-category.html?categoryId=37&siteLocale=en_CA';
    }else if(url.indexOf('?categoryId=') + 1){
        if($('[data-cat-id=211]').length > 0){
            selectBedroom();
        }else if($('[name$=adType]').length > 0){
            setTimeout(function () {
                adPost();
            }, 3000);
        }
    }else if(url == 'https://www.kijiji.ca/p-preview-ad.html'){
        $('#PreviewAdForm').find('[type=submit]').click();
    }else if(url.indexOf('Activated=true') + 1){
        nextSite(true);
    }else {
        nextSite(false);
    }



    function registration() {
        chrome.storage.local.get('ads', function (data) {
            /**/
            $('[name=email]').click();
            $('[name=email]').val(data.ads.email);
            $('[name=email]').parent()[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=password]').click();
            $('[name=password]').val(data.ads.pass);
            $('[name=password]').parent()[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=passwordConfirmation]').click();
            $('[name=passwordConfirmation]').val(data.ads.pass);
            $('[name=passwordConfirmation]').parent()[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=nickname]').click();
            $('[name=nickname]').val(data.ads.login);
            $('[name=nickname]').parent()[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=marketingOptedIn]').prop('checked', false);
            $('[name=sendFeatureNotificationEmail]').prop('checked', true);

            setTimeout(function () {
               $('#RegistrationForm').find('[type=submit]').click();
               $('#RegistrationForm').find('[type=submit]')[0].dispatchEvent(new Event('click'));
            }, 5000);
        })
    }


    function selectBedroom() {
        chrome.storage.local.get('ads', function (data) {
            var bedroom = data.ads.bedroom;
            if (data.ads.house_type == 'Studio') {
                $('[data-cat-id=211]').click();
                $('[data-cat-id=211]')[0].dispatchEvent(new Event('click'));
            } else if (bedroom == 1) {
                $('[data-cat-id=212]').click();
                $('[data-cat-id=212]')[0].dispatchEvent(new Event('click'));
            } else if (bedroom == 2) {
                $('[data-cat-id=214]').click();
                $('[data-cat-id=214]')[0].dispatchEvent(new Event('click'));
            } else if (bedroom == 3) {
                $('[data-cat-id=215]').click();
                $('[data-cat-id=215]')[0].dispatchEvent(new Event('click'));
            } else {
                $('[data-cat-id=216]').click();
                $('[data-cat-id=216]')[0].dispatchEvent(new Event('click'));
            }
        });
    }
    
    function selectLocation() {
        chrome.storage.local.get('ads', function (data) {
            $('#FormLocationPicker').find('a').each(function () {
                let region = $(this).text().replace(/é/ig, 'e').replace(/è/ig, 'e');

                if(region.search(data.ads.region )  + 1){
                    /**/ $(this)[0].click();

                    setTimeout(function () {
                        $('.level-2').find('a').each(function () {
                            let city = $(this).text().replace(/é/ig, 'e').replace(/è/ig, 'e');

                            if(city.search('Montreal')  + 1){
                                $(this)[0].click();
                                setTimeout(function () {

                                    if($('.level-3').html() != ''){
                                        $('.level-3').find('a').each(function () {

                                            if($(this).text().search('City') + 1){
                                                $(this)[0].click();

                                                setTimeout(function () {
                                                    $('#LocUpdate')[0].click();
                                                }, 3000);
                                                console.log($(this).text())
                                            }
                                        })
                                    }
                                }, 3000)
                            }
                        })
                    },3000)
                }
            })
        });
    }
    

    function  adPost() {
        $('[data-qa-id=package-0-bottom-select]').click(function () {
            chrome.storage.local.get('ads', function (data) {
                console.log(data.ads);
                /**/ $('[name$=adType][value=OFFER]').click();
                /**/ $('[name$=priceType][value=FIXED]').click();
                /**/ $('[name$=priceAmount]').val(data.ads.rent);
                $('[name$=priceAmount]')[0].dispatchEvent(new Event('change'));
                /**/ $('[id=forrentbyhousing_s][value=ownr]').prop('checked', true);
                $('[id=forrentbyhousing_s][value=ownr]')[0].dispatchEvent(new Event('click'));
                /**/ selector($('#numberbathrooms_s'), data.ads.bathroom + ' bathroom');
                /**/if (find(data.ads.apartment_amenities, 'Furniture') + 1) {
                    $('#furnished_s[value=1]').click();
                } else {
                    $('#furnished_s[value=0]').click();
                }
                /**/if (data.ads.pets == 1) {
                    $('#petsallowed_s[value=1]').click();
                } else {
                    $('#petsallowed_s[value=0]').click();
                }

                /**/$('#postad-title').val(data.ads.title);
                $('#postad-title')[0].dispatchEvent(new Event('change'));
                /**/$('#pstad-descrptn').val(data.ads.content);
                $('#pstad-descrptn')[0].dispatchEvent(new Event('change'));
                /**/$('#addressStreetNumber').val(data.ads.address);
                $('#addressStreetNumber')[0].dispatchEvent(new Event('change'));
                /**/$('#addressStreetName').val(data.ads.street);
                $('#addressStreetName')[0].dispatchEvent(new Event('change'));
                /**/$('#AddressCity').val(data.ads.city);
                $('#AddressCity')[0].dispatchEvent(new Event('change'));
                /**/selector($('#AddressProv'), data.ads.region_iso);
                /**/$('#addressPostalCode').val(data.ads.postal_code);
                $('#addressPostalCode')[0].dispatchEvent(new Event('change'));

                selector($('[name=locationLevel0]'), 'City of Montréal');

                /**/$('#PhoneNumber').val(data.ads.phone);
                $('#PhoneNumber')[0].dispatchEvent(new Event('change'));

                uploadeImage();

            });
        });
        $('[data-qa-id=package-0-bottom-select]').click();

    }

    function uploadeImage() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                data.append('name', images[i].name);
                data.append('file', images[i].file, images[i].name);
                var xhr = new XMLHttpRequest();
                xhr.open('post', 'https://www.kijiji.ca/p-upload-image.html', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var respons = JSON.parse(xhr.responseText);
                        $('[id=ImageUpload]').append(`<input type="hidden" name="images"  value="${respons.normalUrl}" >`);
                        var li = $($('#UploadedImages').find('li')[i]);
                        li.removeClass('pic-placeholder');
                        li.addClass('thumbnail');
                        li.find('.image-area').css({'background': 'url(' + respons.normalUrl + ') center center no-repeat'});
                        if (++i < images.length && i <= 10) {
                            _uploadeimage(i);
                        } else {
                           window.setTimeout(function () {
                               $('#PostAdPreview').click();
                               $('#PostAdPreview')[0].dispatchEvent(new Event('click'));
                           }, 5000);
                        }
                    }
                };
                xhr.send(data);
            }
        });
    }

});

