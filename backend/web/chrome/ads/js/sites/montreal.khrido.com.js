//http://montreal.khrido.com/selectcategory
//https://secure.khrido.com/postad/?category=48&location=16
//http://www.khrido.com/activationmsg/?type=2
//https://secure.khrido.com/activation/?key=5cbed801-9a66-4522-b6b8-8544bbfe8564
//http://montreal.khrido.com/c-housing-real-estate-commercial-office-space-title-test-a33284590c49?prm=1


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url.indexOf('/selectcategory') + 1) {
        selectCategory();
    } else if (url.indexOf('postad/?category=') + 1) {
        addDetails();
    }

    else if (url.indexOf('/activationmsg') + 1) {
        getMail('info@khrido.com', function () {
            var pattern = /(https?:\/\/.*?activation[^\"\']+)/im;
            var forClick = pattern.exec($('#gh-mail-respons').html())[0].replace(/&amp;/g, '&').replace(/®/g, '&reg');
            console.log(forClick);
            window.location.href = forClick;
        }, 300);

    } else if (url.indexOf('/activation/?key')) {
        final();
    } else if (url.indexOf('/c-housing-real') + 1) {
        nextSite(true);
    }else {
        nextSite(false);
    }

    function selectCategory() {
        chrome.storage.local.get('ads', function (data) {

            switch (data.ads.house_type) {
                case 'Apartment':
                    window.location.href = 'https://secure.khrido.com/postad/\?category=48&location=16';
                    break;
                case 'House':
                    window.location.href = 'https://secure.khrido.com/postad/\?category=50&location=16';
                    break;
                case 'Studio':
                case 'Commercial':
                    window.location.href = 'https://secure.khrido.com/postad/\?category=49&location=16';
                    break;
            }

        });
    }

    function addDetails() {
        window.setTimeout(function () {
            addPhoto();
        }, 4000);

        chrome.storage.local.get('ads', function (data) {

            /**/
            $('#ctl00_CPH1_RBAdType_0').prop('checked', true);
            $('#ctl00_CPH1_RBAdType_0')[0].dispatchEvent(new Event('click'));

            /**/
            $('[name="ctl00$CPH1$TBTitle"]').click();
            $('[name="ctl00$CPH1$TBTitle"]').val(data.ads.title);
            $('[name="ctl00$CPH1$TBTitle"]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name="ctl00$CPH1$TBPrice"]').click();
            $('[name="ctl00$CPH1$TBPrice"]').val(data.ads.rent);
            $('[name="ctl00$CPH1$TBPrice"]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name="ctl00$CPH1$TBDescription"]').click();
            $('[name="ctl00$CPH1$TBDescription"]').val(data.ads.content);
            $('[name="ctl00$CPH1$TBDescription"]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name="ctl00$CPH1$TBAddress"]').click();
            $('[name="ctl00$CPH1$TBAddress"]').val(data.ads.postal_code + ', ' + data.ads.street);
            $('[name="ctl00$CPH1$TBAddress"]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name="ctl00$CPH1$TBPhone"]').click();
            $('[name="ctl00$CPH1$TBPhone"]').val(data.ads.phone);
            $('[name="ctl00$CPH1$TBPhone"]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name="ctl00$CPH1$TBEmail"]').click();
            $('[name="ctl00$CPH1$TBEmail"]').val(data.ads.email);
            $('[name="ctl00$CPH1$TBEmail"]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name="ctl00$CPH1$CBMembership"]').prop('checked', false);
            /**/
            $('[name="ctl00$CPH1$CBHighlight"]').prop('checked', false);
            /**/
            $('[name="ctl00$CPH1$CBUrgent"]').prop('checked', false);

        });
    }


    function addPhoto() {
        getImages(function (images) {


            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();

                data.append('FileUpload1', images[i].file, images[i].name);

                var xhr = new XMLHttpRequest();
                xhr.open('post', $('#ctl00_CPH1_UploadImage1_frame1').contents().find('#form1').attr('action'), true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {

                        // $($('#ctl00_CPH1_UploadImage1_frame1')).html(xhr.responseText);
                        $($('.dummyUploadedImages').find('div')[0]).append(xhr.responseText.replace(/window\.location\s*=\s*window\.location\s*;*/g, ''));//.replace(/\<script[^]*\>.*?\<\/script\>/g, '')

                        if (++i < images.length) {
                            _uploadeimage(i);
                        } else {

                            /*******POSTING*******/
                            captcha($('.captcha').find('img'), $('[name="ctl00$CPH1$ctl02$ctl00$TextBoxCode"]'), {
                                min_len: 3,
                                max_len: 4
                            }, function () {

                                /*-->*/
                                $('[name="ctl00$CPH1$BtnPost"]').click();
                                $('[name="ctl00$CPH1$BtnPost"]')[0].dispatchEvent(new Event('click'));

                            });
                        }
                    }
                };

                xhr.send(data);
            }
        });

    }


    function final() {
        chrome.storage.local.get('ads', function (data) {
            setTimeout(function () {
                if ($('[name="ctl00$CPH1$TextBoxNewPass"]').length) {
                    /**/
                    $('[name="ctl00$CPH1$TextBoxNewPass"]').click();
                    $('[name="ctl00$CPH1$TextBoxNewPass"]').val(data.ads.pass);
                    $('[name="ctl00$CPH1$TextBoxNewPass"]')[0].dispatchEvent(new Event('change'));

                    /*-->*/
                    $('[name="ctl00$CPH1$ButtonNewProceed"]').click();
                    $('[name="ctl00$CPH1$ButtonNewProceed"]')[0].dispatchEvent(new Event('click'));
                    console.log($('[name="ctl00$CPH1$ButtonNewProceed"]'))
                } else {
                    window.location.reload();
                }
            }, 2000);
        });
    }


})
;



