//https://www.louer.com/user/signup/
//https://www.louer.com/user/properties/list/
//https://www.louer.com/user/emailconfirm/?did=registerconf&uid=134476
//https://www.louer.com/user/add/property/
//https://www.louer.com/user/add/property/types/
//https://www.louer.com/user/add/property/confirmation/?did=add_new_property&id=75983&type=res


//TODO nextSite(false) called in step1()


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url.indexOf('user/signup') + 1) {
        signUp();
    }else if(url == 'https://www.louer.com/user/properties/list'){
        getMail('support@louer.com', function () {
            var pattern = /https?.*?registerconf[^\"\']+/im;
            var forClick =  pattern.exec($('#gh-mail-respons').html())[0].replace(/&amp;/g, '&').replace(/®/g, '&reg');
            console.log(forClick);
            window.location.href = forClick;
        }, 300, true);
    }else if(url.indexOf('user/emailconfirm') + 1){
        location.href = '//www.louer.com/user/add/property/';
    }else if(url.indexOf('add/property') + 1){
        if($('[name="form[type]"]').length){
            step1();
        }else if($('[name="form[rent_monthly_min]"]').length){
            step2();
        }else{
            nextSite(true);
        }
    }else {
        nextSite(false);
    }

    function signUp() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data);

            var louer_name = /[a-zA-Z]+/im.exec(data.ads.name)[0];
            var louer_lastName = /[a-zA-Z]+/im.exec(data.ads.name)[0];
            var louer_pass = data.ads.pass.substr(0,10);


            chrome.storage.local.set({'louer_name': louer_name});
            chrome.storage.local.set({'louer_lastName': louer_lastName});
            chrome.storage.local.set({'louer_pass': louer_pass});

            $('[name="form[is_owner]"][value="1"]').parents('.customRX').find('label')[0].click();
            /**/$('[name="form[is_owner]"][value="1"]').prop('checked', true);

            /**/$('#form_first_name').val(louer_name);
            $('#form_first_name').change();
            /**/$('#form_last_name').val(louer_lastName);
            $('#form_last_name').change();
            /**/$('#form_address').val(data.ads.address);
            $('#form_address').change();
            /**/$('#form_city').val(data.ads.city);
            $('#form_city').change();
            /**/$('#form_postal').val(data.ads.postal_code);
            $('#form_postal').change();
            /**/$('#form_postal').val(data.ads.postal_code);
            $('#form_postal').change();
            /**/selector($('#custom-province'), data.ads.region);
            if (!$('#custom-province').val()) {
                selector($('#custom-province'), 'Other');
            }
            /**/$('#form_telephone1').val(data.ads.phone.substring(0, 3));
            $('#form_telephone1').change();
            $('#form_telephone2').val(data.ads.phone.substring(3, 6));
            $('#form_telephone1').change();
            $('#form_telephone3').val(data.ads.phone.substring(6, 10));
            $('#form_telephone1').change();
            /**/$('#form_email').val(data.ads.email);
            $('#form_email').change();
            /**/$('#form_email_conf').val(data.ads.email);
            $('#form_email_conf').change();
            /**/$('#form_email_conf').val(data.ads.email);
            $('#form_email_conf').change();
            /**/$('#form_password').val(louer_pass);
            $('#form_password').change();
            /**/$('#form_password_confirm').val(louer_pass);
            $('#form_password_confirm').change();
            console.log($('[alt=antispam]'));
            /**/captcha($('[alt=antispam]'), $('[alt=antispam]').prev('input'), {numeric: 1, min_len: 3, max_len: 4}, function () {
                $('input[type=submit]').click();
            });
        });
    }

    function step1() {
        chrome.storage.local.get('ads', function (data) {

            /******CHOOSE PROPERTY TYPE RESIDENTIAL*******/
            selector($('[name="form[type]"]'), 'res');
           var showUnitOptions= setInterval( function () {
                if($('#form_unit_type').find('option').length > 0){
                    clearInterval(showUnitOptions);

                    setTimeout(function () {
                        switch (data.ads.house_type){
                            case 'Apartment':
                            case 'Commercial':
                                selector($('[name="form[unit_type]"]'), 'Apartment');
                                break;
                            default:
                                selector($('[name="form[unit_type]"]'), data.ads.house_type);
                        }
                        /******CHOOSE REGION********/
                        selector($('[name="form[region]"]'), data.ads.region);
                        setTimeout(function () {

                            var cityes = $('[name="form[city]"]').find('option').text().toLowerCase();

                            /*******WHEN EXIST CITY******/
                            if(cityes.search(data.ads.city.toLowerCase()) + 1){
                                selector($('[name="form[city]"]'), data.ads.city);

                                /**/
                                $('[name="form[street_number]"]').click();
                                $('[name="form[street_number]"]').val(data.ads.address);
                                $('[name="form[street_number]"]')[0].dispatchEvent(new Event('change'));

                                /**/
                                $('[name="form[street_name]"]').click();
                                $('[name="form[street_name]"]').val(data.ads.street);
                                $('[name="form[street_name]"]')[0].dispatchEvent(new Event('change'));

                                /**/
                                $('[name="form[postal_code_1]"]').click();
                                $('[name="form[postal_code_1]"]').val(data.ads.postal_code.substr(0, 3));
                                $('[name="form[postal_code_1]"]')[0].dispatchEvent(new Event('change'));

                                /**/
                                $('[name="form[postal_code_2]"]').click();
                                $('[name="form[postal_code_2]"]').val(data.ads.postal_code.substr(3, 3));
                                $('[name="form[postal_code_2]"]')[0].dispatchEvent(new Event('change'));

                                setTimeout(function () {
                                    $('[name=form_user_add_property_type]').find('[value=Continue]').click();
                                    $('[name=form_user_add_property_type]').find('[value=Continue]')[0].dispatchEvent(new Event('click'));
                                }, 2000)

                            }else{
                                console.info(data.ads.city + ' does not exist in this site');
                                setTimeout(function () {
                                    nextSite(false);
                                }, 5000);
                            }

                        }, 2000)

                    }, 2000);

                }
            }, 1000);

        });
    }

    function step2() {
        addDetails();

        chrome.storage.local.get('ads', function (data) {
            /**/
            $('#rent_term_id_flexible').prop('checked', true);

            /**/
            $('[name="form[rent_monthly_min]"]').click();
            $('[name="form[rent_monthly_min]"]').val(data.ads.rent);
            $('[name="form[rent_monthly_min]"]')[0].dispatchEvent(new Event('change'));

            $('[name="form[contact_owner_rental_rates]"]').prop('checked', false);

            if($(data.ads.apartment_amenities).find('Furniture') + 1){
                $('[name="form[furnished_unit]"][value="2"]').prop('checked', true);
            }else {
                $('[name="form[furnished_unit]"][value="1"]').prop('checked', true);
            }

            if(data.ads.bedroom <= 5){
                selector($('[name="form[bedrooms_min]"]'), data.ads.bedroom)
            }else {
                $('[name="form[bedrooms_min]"]').val('10');
                $('[name="form[bedrooms_min]"]')[0].dispatchEvent(new Event('change'));
            }

            if(data.ads.bathroom <= 3){
                selector($('[name="form[bathrooms_min]"]'), data.ads.bathroom);
            }else {
                $('[name="form[bathrooms_min]"]').val('4');
                $('[name="form[bathrooms_min]"]')[0].dispatchEvent(new Event('change'));
            }

            var monthNames = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];

            var availableDateArray = data.ads.available_date.split('-');
            var availableMonthInt = availableDateArray[1];
            var availableMonthStr = monthNames[parseInt(availableMonthInt) - 1];

            selector($('[name="form[available_date_month]"]'), availableMonthStr);
            selector($('[name="form[available_date_day]"]'), availableDateArray[2]);
            selector($('[name="form[available_date_year]"]'), availableDateArray[0]);

            $('#form_sublease_n').prop('checked', true);

            /**/
            $('[name="form[building_name_en]"]').click();
            $('[name="form[building_name_en]"]').val(data.ads.title);
            $('[name="form[building_name_en]"]')[0].dispatchEvent(new Event('change'));

            /**/
            $('[name="form[description_en]"]').click();
            $('[name="form[description_en]"]').val(data.ads.content);
            $('[name="form[description_en]"]')[0].dispatchEvent(new Event('change'));


            /**/
            $('[name="form[number_floors_unit]"]').click();
            $('[name="form[number_floors_unit]"]').val(data.ads.floor_count);
            $('[name="form[number_floors_unit]"]')[0].dispatchEvent(new Event('change'));

            setTimeout(function () {
                /*******GO TO NEXT STEP*******/
                $('[name="form_user_add_property_res"]').find('[type=button]').click();
                $('[name="form_user_add_property_res"]')[0].dispatchEvent(new Event('click'));
                /**/
            }, 3000);
        });
    }


    function addDetails() {
        chrome.storage.local.get('ads', function (data) {
            if(data.ads.pets == '1'){
                $('[name="form[pets_allowed]"][value="1"]').prop('checked', true);
            }else{
                $('[name="form[pets_allowed]"][value="2"]').prop('checked', true);
            }

            /*******CHOOSE 90days free for package**********/
            $('[name="form[packages][free]"][value="3"]').prop('checked', true);

            for(let key in data.ads.apartment_amenities){
                switch (data.ads.apartment_amenities[key]){
                    case 'Fridge':
                        $('[name="form[kitchen_fridge]"]').prop('checked', true);
                        break;
                    case 'Dishwasher':
                        $('[name="form[kitchen_dishwasher]"]').prop('checked', true);
                        break;
                    case 'Stove':
                        $('[name="form[kitchen_stove]"]').prop('checked', true);
                        break;
                    case 'Garbage Disposal':
                        $('[name="form[kitchen_garbage_disposal]"]').prop('checked', true);
                        break;
                    case 'Washer':
                        $('[name="form[laundry_washer]"]').prop('checked', true);
                        break;
                    case 'Dryer':
                        $('[name="form[laundry_dryer]"]').prop('checked', true);
                        break;
                    case 'Balcony':
                        selector($('[name="form[outdoor_presence]"]'), 'Balcony');
                        break;
                    case 'Air Conditioning':
                        $('[name="form[air_conditioning]"][value="1"]').prop('checked', true);
                        break;
                    case 'Fireplace':
                        $('[name="form[fireplace]"][value="2"]').prop('checked', true);
                        break;
                    case 'Internet Ready':
                        $('[name="form[internet_presence]"][value="2"]').prop('checked', true);
                        break;
                    case 'Sauna':
                        $('[name="form[sauna]"][value="2"]').prop('checked', true);
                        break;
                    case 'Handicap':
                        $('[name="form[handicap_access]"][value="2"]').prop('checked', true);
                        break;
                    case 'Storage Locker':
                    case 'Storage/Locker Space':
                        $('[name="form[storage_available]"][value="2"]').prop('checked', true);
                        break;
                }
            }
        });
    }


});

