//https://www.apartmint.ca/
//redirected
//https://www.apartmint.ca/en/@43.4496165,-80.4209518,12z
//https://www.apartmint.ca/en/account/listings

//TODO-1 aranc file upload chi ashxati
//TODO-2 aranc phone verification publish chi ene
//TODO-3 nextSite(true) kanchac e publishListing() i  mej


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url.indexOf('/account/listings') + 1 == false  && $('.upgrade-ui-lpane').length ==0) {
        setTimeout(function () {
            /******if already has logged opened window.location*****/
            // window.location.href = 'https://www.apartmint.ca/en/account/listings';
            registration();
        }, 3000)

    }else if(url.indexOf('/account/listings') + 1){
        setTimeout(function () {
            addListing();
        }, 3000)
    }else{
        nextSite(false);
    }



    function registration() {
        chrome.storage.local.get('ads', function (data) {

            var signUpButton =  false;
            var signUpEmailButton = false;
            var showSignUpForm = false;

            $($(".icon-circle-black-plus")[0]).click();
            $($(".icon-circle-black-plus")[0])[0].dispatchEvent(new Event('click'));

            $('#container').bind('DOMSubtreeModified', function () {
                if($('.login-prompt').find('button').length > 0){
                    $('.login-prompt').find('button').each(function () {

                        if($(this).attr('ng-click') == "loadTemplate('signUpMain')" && !signUpButton){
                            signUpButton = true;
                            $(this).click();
                            $(this)[0].dispatchEvent(new Event('click'));
                            // console.log($('.modal-login').find('button'));
                        }
                    });
                }

                if($('.modal-login').find('button').length > 0){

                    $('.modal-login').find('button').each(function () {

                        if($(this).attr('ng-click') == "loadTemplate('signUpEmail')" && !signUpEmailButton ){
                            signUpEmailButton = true;

                            if($(this).find('.icon-mail').length > 0){
                                setTimeout(function () {
                                    $('.icon-mail').click();
                                    $('.icon-mail')[0].dispatchEvent(new Event('click'));
                                }, 2000);
                            }
                        }
                    });
                }

                if($('[name=account_registration]').length > 0 && $('[name=email]').length  && !showSignUpForm){
                    showSignUpForm = true;

                    setTimeout(function () {

                        /**/ $('[name=email]').click();
                        $('[name=email]').val(data.ads.email);
                        $('[name=email]')[0].dispatchEvent(new Event('change'));

                        /**/ $('[name=email_confirm]').click();
                        $('[name=email_confirm]').val(data.ads.email);
                        $('[name=email_confirm]')[0].dispatchEvent(new Event('change'));

                        /**/ $('[name=password]').click();
                        $('[name=password]').val(data.ads.pass);
                        $('[name=password]')[0].dispatchEvent(new Event('change'));

                        /**/ $('[name=firstname]').click();
                        $('[name=firstname]').val(data.ads.name);
                        $('[name=firstname]')[0].dispatchEvent(new Event('change'));

                        /**/ $('[name=lastname]').click();
                        $('[name=lastname]').val(data.ads.l_name);
                        $('[name=lastname]')[0].dispatchEvent(new Event('change'));

                        $('[name=newsletterOptin]').prop('checked', false);
                        $('[name=newsletterOptin]')[0].dispatchEvent(new Event('click'));

                        $('[name=termsOfService]').prop('checked', true);
                        $('[name=termsOfService]')[0].dispatchEvent(new Event('click'));

                        $('[name=account_registration]').find('button').click();
                        $('[name=account_registration]').find('button')[0].dispatchEvent(new Event('click'));

                        setTimeout(function () {
                            window.location.href = 'https://www.apartmint.ca/en/account/listings';
                        }, 2000);

                    }, 2000);
                }
            });

        });
    }


    function addListing() {
        chrome.storage.local.get('ads', function (data) {
            $(".icon-building-plus").click();

            console.log(5555);


            var startADD = setInterval(function () {


                if($('[name=account_listings_edit]').length > 0){
                    clearInterval(startADD);


                    setTimeout(function () {
                        addApartmentAmenities();
                        addManageUnits();

                        //TODO file upload
                        addPhoto();
                        publishListing();

                        /******SHOW ALL WINDOWS*******/
                        // $(document.getElementsByClassName('listing-amenities-selector-amenities-core')).css({height: '340px'});
                        $('.listing-amenities-selector-amenities-core').css({height: '340px'});

                        /**/ $('[name=listing_title]').click();
                        $('[name=listing_title]').val(data.ads.title);
                        $('[name=listing_title]')[0].dispatchEvent(new Event('change'));

                       if(data.ads.house_type == 'House'){
                           $('[id=listings-edit-type-house]').prop('checked', true);
                           $('[id=listings-edit-type-house]')[0].dispatchEvent(new Event('click'));
                       }else{
                           $('[id=listings-edit-type-apartment]').prop('checked', true);
                           $('[id=listings-edit-type-apartment]')[0].dispatchEvent(new Event('click'));
                       }

                        /**/ $('[name=listing_address]').click();
                        $('[name=listing_address]').val(data.ads.street);
                        $('[name=listing_address]')[0].dispatchEvent(new Event('change'));

                        /**/ $('[name=listing_description]').click();
                        $('[name=listing_description]').val(data.ads.content);
                        $('[name=listing_description]')[0].dispatchEvent(new Event('change'));


                        /**/ $('#listings-edit-accept-application-no').prop('checked', true);
                        $('#listings-edit-accept-application-no')[0].dispatchEvent(new Event('click'));

                        /**/ $('#listings-edit-display-phone-no').prop('checked', true);
                        $('#listings-edit-display-phone-no')[0].dispatchEvent(new Event('click'));
                    }, 2000);
                }
            }, 2000);
        });
    }

    function publishListing() {
        chrome.storage.local.get('ads', function (data) {
            setTimeout(function () {
                $('[name=account_listings_edit]').find('button').each(function () {
                    if ($(this).attr('ng-click').search('publishListing') + 1) {
                        $(this).click();

                        var showWindow1 = setInterval(function () {

                            if ($('.upgrade-ui-lpane-footer').find('span').length > 0) {
                                clearInterval(showWindow1);

                                $('.upgrade-ui-lpane-footer').find('span').each(function () {

                                    if (this.hasAttribute('ng-click') && $(this).attr('ng-click').search('continueFree') + 1) {
                                        $(this).click();

                                        var showWindow2 = setInterval(function () {
                                            if ($('[name=account_new_phone]').length > 0 && $('.selected-flag').length > 0) {
                                                clearInterval(showWindow2);

                                                $('.selected-flag').click();
                                                $('.selected-flag')[0].dispatchEvent(new Event('click'));


                                                $('.country-list').find('li').find('span').each(function () {

                                                    if ($(this).text().trim().toLowerCase() == 'canada') {

                                                        $(this).parent().click();

                                                        /**/
                                                        $('#new_phone').click();
                                                        $('#new_phone').val('+1' + data.ads.phone);
                                                        $('#new_phone')[0].dispatchEvent(new Event('change'));


                                                        $('[name=account_new_phone]').find('button').each(function () {
                                                            if (this.hasAttribute('ng-click') && $(this).attr('ng-click').search('1') + 1) {
                                                                $(this).click();

                                                                setInterval(function () {
                                                                    //TODO phone verification code
                                                                    var verificationCode;


                                                                    /**/
                                                                    $('[name=phone_token]').click();
                                                                    $('[name=phone_token]').val(verificationCode);
                                                                    $('[name=phone_token]')[0].dispatchEvent(new Event('change'));

                                                                    /*******FINISH*****/
                                                                    $('[name=account_verification_phone]').find('button').click();
                                                                    $('[name=account_verification_phone]').find('button')[0].dispatchEvent(new Event('click'));



                                                                    // nextSite(true);

                                                                }, 2000)
                                                            }

                                                        })
                                                    }
                                                });
                                            }
                                        }, 2000)
                                    }
                                })
                            }

                        }, 2000)
                    }
                });
            }, 15000);
        });

    }

    
    function addApartmentAmenities() {
        chrome.storage.local.get('ads', function (data) {
            for(var key in data.ads.apartment_amenities){
                switch (data.ads.apartment_amenities[key]) {
                    case 'Close to School':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Near Schools'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Close to Park':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Close to Parks'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Close to Transit':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Near Public Transportation'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Gym':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Gym'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Garage':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Garage'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Elevator':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Elevator'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Storage Locker':
                    case 'Storage/Locker Space':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Storage'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Pool':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Swimming Pool'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Games/Party Room':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Events Room'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Security System':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Security Cameras'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Fire Sprinkler':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Sprinkler System'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Maintenance On Site':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'On Site Management'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                    case 'Wheelchair accessible':
                        $('.cb-text').each(function () {
                            if($(this).text().trim() == 'Wheelchair Accessible'){
                                $(this).parent().addClass('checked');
                                $(this).parent().find('input').prop('checked', true);
                            }
                        });
                        break;
                }
            }

        })
    }
    
    function addManageUnits() {
        setTimeout(function () {
            /*****CHOOSE AVAILABLE DATE*****/
            chooseAvailableDate();
        }, 3000);

        chrome.storage.local.get('ads', function (data) {
            $($('.listings-details-multi-unit-item-content-details')[0]).click();

            $($('.second')[0]).find('.selectize-input').click();

            $('.select-overflow').each(function () {
                if($(this).find('.first').find('span').text().search('beds') + 1){
                    $(this).find('.second').find('span').each(function () {
                        if($(this).text().trim() == data.ads.bedroom){
                            $(this).parent().click();
                        }
                    });
                }

                if($(this).find('.first').find('span').text().search('baths') + 1){
                    $(this).find('.second').find('span').each(function () {
                        if($(this).text().trim() == data.ads.bathroom){
                            $(this).parent().click();
                        }
                    });
                }

                if($(this).find('.first').find('span').text().search('Type') + 1){
                    $(this).find('.second').find('span').each(function () {
                        if($(this).text().trim() == 'Non-basement suite'){
                            $(this).parent().click();
                        }
                    })
                }
            });

            /**/$('[name=isolated_listing_suite_id_0]').click();
            $('[name=isolated_listing_suite_id_0]').val('0');
            $('[name=isolated_listing_suite_id_0]')[0].dispatchEvent(new Event('change'));


            /******CONVERT m2 to ft2*****/
            var aptSize = Math.ceil(data.ads.apt_size * 10.7639);
            /**/$('#listing-sqft-0').click();
            $('#listing-sqft-0').val(aptSize);
            $('#listing-sqft-0')[0].dispatchEvent(new Event('change'));

            /**/$('[name=isolated_listing_sqft_0]').click();
            $('[name=isolated_listing_sqft_0]').val(aptSize);
            $('[name=isolated_listing_sqft_0]')[0].dispatchEvent(new Event('change'));

            /**/$('[name=isolated_listing_rent_0]').click();
            $('[name=isolated_listing_rent_0]').val(data.ads.rent);
            $('[name=isolated_listing_rent_0]')[0].dispatchEvent(new Event('change'));

            /**/$('[name=unit_description]').click();
            $('[name=unit_description]').val(data.ads.content);
            $('[name=unit_description]')[0].dispatchEvent(new Event('change'));
        });
        
    }


    function chooseAvailableDate(){
        chrome.storage.local.get('ads', function (data) {

            $('#listings-edit-availability-radio-from').click();

            var availabilityMonthInt = data.ads.available_date.substr(5, 2);
            var monthNames = [
                "january", "february", "march", "april", "may", "june",
                "july", "august", "september", "october", "november", "december"
            ];
            if (availabilityMonthInt.search(0) == 0) {
                availabilityMonthInt = availabilityMonthInt.replace(0, '');
            }

            var availabilityMonthStr = monthNames[availabilityMonthInt - 1];

            /****CLICKED MONTH WINDOW*****/
            $('.month-selector').find('.selectize-input').click();

            $('.month-selector').find('.selectize-dropdown').find('span').each(function () {
                if($(this).text().trim().toLowerCase() == availabilityMonthStr){
                    /******CHOOSE MONTH******/
                    $(this).parent().click();
                }
            });


            var availabilityDay = data.ads.available_date.substr(8, 2);

            /****CLICKED DAY WINDOW*****/
            $('.day-selector').find('.selectize-input').click();

            $('.day-selector').find('.selectize-dropdown').find('span').each(function () {
                if($(this).text().trim().toLowerCase() == availabilityDay){
                    /******CHOOSE DAY******/
                    $(this).parent().click();
                }
            });


            var availabilityYear = data.ads.available_date.substr(0, 4);

            /****CLICKED YEAR WINDOW*****/
            $('.year-selector').find('.selectize-input').click();

            $('.year-selector').find('.selectize-dropdown').find('span').each(function () {
                if($(this).text().trim().toLowerCase() == availabilityYear){
                    /******CHOOSE YEAR******/
                    $(this).parent().click();
                }
            });


        });
    }


    function addPhoto() {
        chrome.storage.local.get('ads', function (data) {


        });
    }




});