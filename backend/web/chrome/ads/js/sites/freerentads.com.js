//http://www.freerentads.com/post-free-rental-ads
//http://www.freerentads.com/post-free-rental-ads-s1
//http://www.freerentads.com/post-rental-listing
//http://www.freerentads.com/confirm-listing-Z6Fd31-2312017585132-brfo06PxB$oB

/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'http://www.freerentads.com/post-free-rental-ads') {
        SetMail();
    } else if (url == 'http://www.freerentads.com/post-free-rental-ads-s1') {
        location();
    } else if (url == 'http://www.freerentads.com/post-rental-listing') {
        propertyInformation();
    } else if (url.indexOf('freerentads.com/confirm-listing-') + 1) {
        nextSite(true);
    }else{
        nextSite(false);
    }

    function SetMail() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data);
            /**/ $('[name=email1]').click();
            $('[name=email1]').val(data.ads.email);
            /*-->*/$('[name=f]').find('[type=button]').click();
        });
    }

    function location() {
        $("script[src$='fra.js']").remove();
        var xhr = new XMLHttpRequest();
        
        xhr.open("GET", '//secure162.servconfig.com/~ghostservices/bot/backend/web/uploads/freerentads.com_source.js', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                $('body').prepend('<script>' + xhr.responseText + '</script>');
                chrome.storage.local.get('ads', function (data) {
                    /**/ $('[name=streetaddress]').click();
                    $('[name=streetaddress]').val(data.ads.street + ' ');
                    $('[name=streetaddress]')[0].dispatchEvent(new Event('change'));
                    /**/ $('[name=citytown]').click();
                    $('[name=citytown]').val(data.ads.city);
                    /**/ $('[name=provstate]').click();//secure162.servconfi
                    $('[name=provstate]').val(data.ads.region);
                    /**/ $('[name=pczip]').click();
                    $('[name=pczip]').val(data.ads.postal_code);
                    /**/ $('[name=country]').click();
                    $('[name=country]').val('Canada');
                    console.log(window.confirm);
                    window.setTimeout(function () {
                        /*-->*/$('center').find('[type=button]').click();
                        $('[type=button]')[0].dispatchEvent(new Event('click'));
                        window.setTimeout(function () {
                            nextSite(false);
                        }, 3000);
                    }, 3000);

                });
            }
        };
        xhr.send();
    }

    function propertyInformation() {
        chrome.storage.local.get('ads', function (data) {
            /**/$('[name=rentamount]').val(data.ads.rent);
            $('[name=rentamount]').change;
            /**/$('[name=rentamount]').val(data.ads.rent);
            $('[name=rentamount]').change;
            /*--*/var date = data.ads.available_date.split('-');
            /**/selector($('[name=availyyyy]'), date[0]);
            /**/ var month = date[1].substr(0, 1) == '0' ? date[1].substr(1, 1) : date[1];
            $('[name=availmm]').val(month);
            $('[name=availmm]').change();
            /**/var dey = date[2].substr(0, 1) == '0' ? date[2].substr(1, 1) : date[2];
            selector($('[name=availdd]'), dey);
            /**/ if (data.ads.house_type == 'Apartment')
                selector($('[name=propertytype]'), 'Apartment');
            if (data.ads.house_type == 'House')
                selector($('[name=propertytype]'), 'House');
            if (data.ads.house_type == 'Studio')
                selector($('[name=propertytype]'), 'Office Space');
            if (data.ads.house_type == 'Commercial')
                selector($('[name=propertytype]'), 'Industrial Space');
            //  /**/ selector($('[name=leaseterms]'), ); //TODO Lease Terms 
            /**/ var bedroom = parseInt(data.ads.bedroom) > 4 ? '5+ bedroom' : data.ads.bedroom + ' bedroom'
            selector($('[name=bedroom]'), bedroom);
            /**/ var bathroom = parseInt(data.ads.bathroom) > 4 ? '5+' : data.ads.bathroom;
            selector($('[name=bathroom]'), bathroom);
            /**/selector($('[name=bathroomhalf]'), '0');
            /**/var parking_count = parseInt(data.ads.parking_count) > 5 ? '6+' : data.ads.parking_count;
            selector($('[name=parkingspot]'), parking_count);
            /**/$('[name=adtitle]').val(data.ads.title);
            $('[name=adtitle]').change();
            /**/$('[name=addescription]').val(data.ads.content);
            $('[name=addescription]').change();
            /**/if (find(data.ads.apartment_amenities, 'Furniture') + 1)
                selector($('[name=ftFurn]'), 'furnished');
            else
                selector($('[name=ftFurn]'), 'unfurnished');

            /**/if (data.ads.parking_count > 0 && (data.ads.parking_price == null || data.ads.parking_price == 0))
                selector($('[name=ftPark]'), 'yes, parking included');
            else if (data.ads.parking_count > 0 && data.ads.parking_price > 0)
                selector($('[name=ftPark]'), 'not included, but available/extra');
            else
                selector($('[name=ftPark]'), 'no parking available');


            /**/ if (data.ads.pets == 1) {
                selector($('[name=ftPets]'), 'yes, pets ok');
            } else {
                selector($('[name=ftPets]'), 'no pets');
            }
            /**/ if (find(data.ads.apartment_amenities, 'Basement') + 1)
                selector($('[name=ftBase]'), 'yes, basement unit');
            else
                selector($('[name=ftBase]'), 'no, not a basement unit');

            /**/ if (find(data.ads.apartment_amenities, 'Basement') + 1)
                selector($('[name=ftBase]'), 'yes, basement unit');
            else
                selector($('[name=ftBase]'), 'no, not a basement unit');

            /**/$('[name=contactfirstname]').val(data.ads.name);
            $('[name=contactfirstname]').change();
            /**/$('[name=contactlastname]').val(data.ads.l_name);
            $('[name=contactlastname]').change();
            /**/$('[name=contactphoneday]').val(data.ads.phone);
            $('[name=contactphoneday]').change();
            /**/$('[name=contactemail]').val(data.ads.email);
            $('[name=contactemail]').change();


            /**/ //??????????????
            selector($('#leaseterms'), 'No Lease Required');

            //------->
            $("#showhide").parents('a')[0].dispatchEvent(new Event('click'));
            $("#showhide").parents('a').click();



            //<-------
            window.setTimeout(function () {
                captcha($('#recaptcha_image').find('img'), $('#recaptcha_response_field'), {phrase: 1}, function () {
                    /**/getImages(function (images) {
                        var data = new FormData();
                        $.each($('form').find('input'), function () {
                            if ($(this).attr('type') != 'checkbox' || $(this).attr('type') != 'radio' || ($(this).attr('type') == 'checkbox' && !$(this).is(':checked')) || ($(this).attr('type') == 'radio' && !$(this).is(':checked')))
                                data.append($(this).attr('name'), $(this).val());
                        });
                        $.each($('form').find('textarea'), function () {
                            data.append($(this).attr('name'), $(this).val());
                        });
                        $.each($('form').find('select'), function () {
                            data.append($(this).attr('name'), $(this).val());
                        });
                        data.append('image1', images[0].file, images[0].name);
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', 'http://www.freerentads.com/newad-result.php?mode=add', true);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                var innerBody = xhr.responseText.replace(/([\n\r]|.)+<body[^>]+>/, '').replace(/<\/body[^>]*>([\n\r]|.)+/, '');
                                $('body').html(innerBody);
                                ConfirmMail();
                            }
                        };
                        xhr.send(data);
                    });
                });
            }, 2500);

        });
    }

    function ConfirmMail() {
        getMail('support@freerentads.com', function () {
            var mails = $('#gh-mail-respons').children('span');
            $.each(mails, function () {
                var links = $(this).find('a');
                $.each(links, function () {
                    if ($(this).text().trim().toLowerCase().replace(/\s+/, ' ') == 'confirmation link') {
                        window.location.href = $(this).attr('href');
                        return;
                    }
                });
            });
        });
    }
});
