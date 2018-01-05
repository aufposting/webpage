//http://www.homebutton.ca/rent/
//http://www.homebutton.ca/?username=Avery&confirmation_hash=U649UP6H0WN3X3vPln1h1a80adfFjNadTemN3tv4pi8nmDcI1eZ3o73zljeE6oSZDfNHIjL8CTvYxHGzWGCkNGU9Z8N6xG6aVTRD
//http://www.homebutton.ca/?_c=1486552494573
//http://www.homebutton.ca/my-profile/?subpage=submit_ad
//http://www.homebutton.ca/my-profile/
//http://www.homebutton.ca/my-profile/?filter=active


/* global chrome */
jQuery(document).ready(function ($) {
        var url = String(window.location.href).replace(/\/$/, '');

        if (url.indexOf('homebutton.ca/rent') + 1) {
            setTimeout(function () {
                registration();
            }, 3000)
        } else if (url.indexOf('&confirmation_hash=') + 1) {
            setTimeout(function () {
                login();
            }, 3000)
        } else if (url.indexOf('homebutton.ca/?_c=') + 1) {
            location.href = '//www.homebutton.ca/my-profile/?subpage=submit_ad';
            setTimeout(function () {
                location.reload();
            }, 2000)

        } else if (url.indexOf('?subpage=submit_ad') + 1) {
            setTimeout(function () {
                step1();
            }, 3000)
        } else if (url.indexOf('my-profile/?filter=active') + 1) {
            nextSite(true);
        } else {
            nextSite(false);
        }

        function registration() {

            chrome.storage.local.get('ads', function (data) {
                /**/
                $('[href*=register]')[0].click();
                $($('[href*=register]')[0])[0].dispatchEvent(new Event('click'));

                /**/
                $('[name=register-username]').click();
                $('[name=register-username]').val(data.ads.login);
                $('[name=register-username]')[0].dispatchEvent(new Event('change'));

                /**/
                $('[name=register-email]').click();
                $('[name=register-email]').val(data.ads.email);
                $('[name=register-email]')[0].dispatchEvent(new Event('change'));

                /**/
                $('[name=register-password]').click();
                $('[name=register-password]').val(data.ads.pass);
                $('[name=register-password]')[0].dispatchEvent(new Event('change'));

                /**/
                $('[name=register-password-repeat]').click();
                $('[name=register-password-repeat]').val(data.ads.pass);
                $('[name=register-password-repeat]')[0].dispatchEvent(new Event('change'));

                setTimeout(function () {
                    $('.form-register').find($('.submit-form-ajax'))[0].click();
                    $('.form-register').find($('.submit-form-ajax'))[0].dispatchEvent(new Event('click'));

                    var successRegistr = setInterval(function () {
                        if ($('.alert-success').length > 0) {
                            clearInterval(successRegistr);
                            confirmEmail();
                        }
                    }, 2000)

                }, 3000)
            });
        }

        function confirmEmail() {
            getMail('moderator@homebutton.ca', function () {
                var pattern = /https?:\/\/www\.homebutton\.ca\/\?username[^<]+/igm;
                var forClick = pattern.exec($('#gh-mail-respons').html())[0].replace(/&amp;/g, '&').replace(/®/g, '&reg');

                console.log(forClick);
                window.location.href = forClick;
            }, 3000);
        }


        function login() {
            chrome.storage.local.get('ads', function (data) {
                $('.fa-times').click();
                $('.fa-times')[0].dispatchEvent(new Event('click'));

                /**/
                $('[href*=login]')[1].click();
                $($('[href*=login]')[1])[0].dispatchEvent(new Event('click'));

                /**/
                $('[name=login-username]').click();
                $('[name=login-username]').val(data.ads.login);
                $('[name=login-username]')[0].dispatchEvent(new Event('change'));

                /**/
                $('[name=login-password]').click();
                $('[name=login-password]').val(data.ads.pass);
                $('[name=login-password]')[0].dispatchEvent(new Event('change'));

                setTimeout(function () {
                    $('.form-login').find($('.submit-form-ajax'))[0].click();
                    $('.form-login').find($('.submit-form-ajax'))[0].dispatchEvent(new Event('click'));
                }, 3000)
            });
        }


        function step1() {
            addPhoto();

            chrome.storage.local.get('ads', function (data) {
                /**/
                $('[name=ad_title]').click();
                $('[name=ad_title]').val(data.ads.title);
                $('[name=ad_title]')[0].dispatchEvent(new Event('change'));

                $('#ad_description_ifr').contents().find('#tinymce').find('p').click();
                $('#ad_description_ifr').contents().find('#tinymce').find('p').text(data.ads.content);
                $('#ad_description_ifr').contents().find('#tinymce').find('p')[0].dispatchEvent(new Event('change'));

                /**/
                $('[name=ad_price]').click();
                $('[name=ad_price]').val(data.ads.rent);
                $('[name=ad_price]')[0].dispatchEvent(new Event('change'));

                /**/
                $('[name=ad_call_for_price]').prop('checked', false);

                /**/
                $('[name=ad_phone]').click();
                $('[name=ad_phone]').val(data.ads.phone);
                $('[name=ad_phone]')[0].dispatchEvent(new Event('change'));
            });
        }


        function addPhoto() {

            getImages(function (images) {

                _uploadeimage(0);
                function _uploadeimage(i = 0) {
                    var data = new FormData();
                    var _wpnonce;
                    var action;
                    var post_id;

                    $('script').each(function () {
                        if ($(this).text().search('"_wpnonce"') + 1) {
                            _wpnonce = /_wpnonce[\"\']:[\"\']([^\"\']+)/.exec($(this).text())[1];
                            action = /action[\"\']:[\"\']([^\"\']+)/.exec($(this).text())[1];
                        }
                        if ($(this).text().search('"id"') + 1) {
                            post_id = /id[\"\']:([^}]+)/.exec($(this).text())[1];
                        }

                    });

                    data.append('name', images[i].name);
                    data.append('action', action);
                    data.append('_wpnonce', _wpnonce);
                    data.append('post_id', post_id);
                    data.append('async-upload', images[i].file, images[i].name);

                    var xhr = new XMLHttpRequest();
                    xhr.open('post', '//www.homebutton.ca/wp-admin/async-upload.php', true);

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            var response = JSON.parse(xhr.responseText);

                            if (++i < images.length) {
                                _uploadeimage(i);
                            } else {
                                setTimeout(function () {
                                    /*******GO TO STEP2*******/
                                    /*-->*/
                                    $('#basic').find('.next-tab')[0].click();
                                    $($('#basic').find('.next-tab')[0])[0].dispatchEvent(new Event('click'));

                                    step2();
                                }, 3000)
                            }
                        }
                    };
                    xhr.send(data);
                }
            });

        }

        function step2() {
            chrome.storage.local.get('ads', function (data) {
                setInterval(function () {
                    /******WHEN HAVE MAP ERROR*****/
                    if (!$('#location').find('.next-prev-error').hasClass('hidden')) {
                        step2();
                    }
                }, 5000);


                /**/
                $('[name=gmap_input]').focus();
                $('[name=gmap_input]').val(data.ads.city + ', ' + data.ads.region + ', Canada');

                $('[name=gmap_input]')[0].dispatchEvent(new Event('keydown'));
                $('[name=gmap_input]')[0].dispatchEvent(new Event('keyup'));

                setTimeout(function () {

                    $('.pac-item').each(function () {
                        var fulAddress = '';

                        $(this).find('.pac-matched').each(function () {
                            fulAddress += $(this).text().replace(/é/ig, 'e').replace(/è/ig, 'e');

                            if (fulAddress.toLowerCase() == data.ads.city.toLowerCase() + data.ads.region.toLowerCase() + 'canada') {
                                $(this).parents('.pac-item').addClass('pac-item-selected');

                                $('.pac-item-selected')[0].dispatchEvent(new Event('mouseover'));
                                $('.pac-item-selected')[0].dispatchEvent(new Event('mousedown'));

                                /****HIDE MAP WINDOW****/
                                $('[name=gmap_input]').blur();

                                setTimeout(function () {
                                    /****GO TO STEP3****/
                                    $('#location').find('.next-tab')[0].click();
                                    $($('#location').find('.next-tab')[0])[0].dispatchEvent(new Event('click'));
                                    step3();
                                }, 5000)

                            }
                        });
                    })
                }, 2000);
            });

        }


        function step3() {
            chrome.storage.local.get('ads', function (data) {

                switch (data.ads.house_type) {
                    case 'House':
                        selector($('[name=ad_category]'), 'Houses');
                        break;
                    default:
                        selector($('[name=ad_category]'), 'Apartments');
                }

                var selectBedrooms = setInterval(function () {
                    if ($('[name=cf_Bedrooms]').length > 0) {
                        clearInterval(selectBedrooms);

                        if (data.ads.bedroom < 8) {
                            selector($('[name=cf_Bedrooms]'), data.ads.bedroom);
                        } else {
                            selector($('[name=cf_Bedrooms]'), '8');
                        }
                    }
                }, 2000);

                var selectBathrooms = setInterval(function () {
                    if ($('[name=cf_Bedrooms]').length > 0) {
                        clearInterval(selectBathrooms);

                        if (data.ads.bathroom < 8) {
                            selector($('[name=cf_Bathrooms]'), data.ads.bathroom);
                        } else {
                            selector($('[name=cf_Bathrooms]'), '8');
                        }
                    }

                }, 2000);

                var goToNextStep = setInterval(function () {
                    if ($('[name=cf_Bedrooms]').val() > 0 && $('[name=cf_Bathrooms]').val() > 0) {
                        clearInterval(goToNextStep);
                        /****GO TO STEP4****/
                        $('#category').find('.next-tab')[0].click();
                        $($('#category').find('.next-tab')[0])[0].dispatchEvent(new Event('click'));

                        step4();
                    }
                }, 3000)

            });
        }

        function step4() {
            setTimeout(function () {
                /****GO TO final****/

                $('#media').find('.next-tab')[0].click();
                $($('#media').find('.next-tab')[0])[0].dispatchEvent(new Event('click'));
                final();
            }, 2000)
        }

        function final() {
            setTimeout(function () {
                /******FINISH*******/
                $('#final').find('.submit-form-ajax')[0].click();
                $($('#final').find('.submit-form-ajax')[0])[0].dispatchEvent(new Event('click'));

                setTimeout(function () {
                    location.href = '//www.homebutton.ca/my-profile/?filter=active';
                }, 3000)
            }, 3000)
        }

    }
);




