//https://renthello.com/User/Add-User/new_user.php?partner=&owner=&domain=
//https://renthello.com/User/Add-User/new_user.php?thank_you=yes&username=
//https://renthello.com/User/Add-User/verify.php?verify=yes&web_id=3615645.NEW.501936.981454492&id=1002847&user=sD81lWvlOKQi&email=client13@ghost-services.com&domain=renthello.com&check=8a97a369d2a309f45125fc6f4055f1fd7f518456
//https://renthello.com/Login/
//https://renthello.com/Listings-Ads/listing_step1.php?action=add
//https://renthello.com/Listings-Ads/listing_step2.php?action=add&lid=
//https://renthello.com/Listings-Ads/thankyou.php?listing=384974&status=pending

/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'https://renthello.com/User/Add-User/new_user.php?partner=&owner=&domain=') {
        registration();
    } else if (url.indexOf('thank_you') + 1) {
        getMail('info@renthello.com', function () {
            var pattern = /href=[\'\"](https?:\/\/w{0,3}\.?renthello.com\/user.*?)[\"\']/ig;
            var forClick = pattern.exec($('#gh-mail-respons').html())[1].replace(/&amp;/ig, '&');
            window.location.href = forClick;
        }, 300, true);
    } else if (url.indexOf('Add-User/verify.php?verify=yes') + 1) {
        /*****WHEN EMAIL CLICKED******/
        window.location.href = 'https://renthello.com/Login/';
    } else if (url == 'https://renthello.com/Login') {
        login();
    } else if (url == 'https://renthello.com/__admin/Login_check.php') {
        window.location.href = 'https://renthello.com/Listings-Ads/listing_step1.php?action=add';
    } else if (url == 'https://renthello.com/Listings-Ads/listing_step1.php?action=add' || url == 'https://renthello.com/Listings-Ads/listing_step1.php?action=add&new=t') {
        addListingsStep1();
    } else if (url == 'https://renthello.com/Listings-Ads/listing_action.php') {
        getRedirectUrl();
    } else if (url.indexOf('listing_step2.php') + 1) {
        /*********UPLOAD IMG AND GO TO STEP3*********/
        uploadeImage();
    } else if (url.indexOf('listing_step3.php') + 1) {
        $('[name=adlength][value="4774"]').prop('checked',  true);
        $('[id=submit]').click();
    }else if(url.indexOf('Listings-Ads/thankyou.php') + 1){
        /******FINISH*******/
        nextSite(true);
    }else {
        nextSite();
    }


    function uploadeImage() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                var lid = $('[name=lid]').val();
                data.append('images[]', images[i].file, images[i].name);
                data.append('lid', lid);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://renthello.com/Listings-Ads/upload.php', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var respons = JSON.parse(xhr.responseText);
                        for (j = 0; j < respons.name.length; j++) {
                            var src = "/shared/images/user_uploads/" + lid + "/" + respons.name[j];
                            $('#image-list').append('<li><img src="' + src + '"></li>');
                        }
                        if (++i < images.length) {
                            _uploadeimage(i);
                        } else {
                            window.setTimeout(function () {
                                /**/$('[id=go]').click();
                            }, 300);
                        }
                    }
                };
                xhr.send(data);
            }
        });
    }

    function registration() {

        chrome.storage.local.get('ads', function (data) {

            //CHOOSE Province
            selector($('[id=province1]'), data.ads.region);

            /**/$('[id=fname]').click();
            $('[id=fname]').val(data.ads.name);

            /**/$('[id=lname]').click();
            $('[id=lname]').val(data.ads.l_name);

            /**/$('[id=pword]').click();
            $('[id=pword]').val(data.ads.pass);

            /**/$('[name=pword2]').click();
            $('[name=pword2]').val(data.ads.pass);

            /**/$('[name=phone]').click();
            $('[name=phone]').val(data.ads.phone);

            /**/$('[id=email]').click();
            $('[id=email]').val(data.ads.email);


            /**/$('[id=reg]').click();
            $('[id=reg]').val("NA");

            /**/$('[id=address]').click();
            $('[id=address]').val(data.ads.address);

            /**/$('[id=city]').click();
            $('[id=city]').val(data.ads.city);

            /**/ $('[id=zip]').click();
            $('[id=zip]').val(data.ads.postal_code);


            /*-->*/$('[type=submit]').click();

        });
    }

    function login() {
        chrome.storage.local.get('ads', function (data) {

            /**/$('[id=username]').click();
            $('[id=username]').val(data.ads.email);


            /**/$('[id=password]').click();
            $('[id=password]').val(data.ads.pass);

            /*-->*/$('[id=formId]').find('[type=submit]').click();
        });
    }

    function addListingsStep1() {
        //CALL ALL FUNCTIONS FOR STEP1
        selectFullAddress();
        selectRooms();
        selectAdditionalInfo();
        generateDefaultText();


        chrome.storage.local.get('ads', function (data) {

            /**/$('[name=listing_property_type_id]').click();
            switch (data.ads.house_type) {
                case "Apartment":
                    $("[name=listing_property_type_id][value='1193']").click();
                    break;
                case "House":
                    $("[name=listing_property_type_id][value='24']").click();
                    break;

                default:
                    $("[name=listing_property_type_id][value='32']").click();
            }

            for (var key in data.ads.apartment_amenities) {
                if (data.ads.apartment_amenities[key] == 'Furniture') {
                    $("[name=listing_furnished]").click();
                }
            }
        });

        /******GO TO STEP 2*********/
        window.setTimeout(function () {
            $("[name=submit]").click();
        }, 5000);
    }


    function selectFullAddress() {

        chrome.storage.local.get('ads', function (data) {

                $('[id=address1]').val(data.ads.street);
                $('[id=postal]').val(data.ads.postal_code);

                $('[id=overlay]').css({display: 'none'});

                //CHOOSE COUNTRY
                selector($('[id=country]'), 'Canada');

                if ($('[id=country]').val() > 0) {

                    setTimeout(function () {
                        /******CHOOSE Province******/
                        selector($('[id=province]'), data.ads.region);
                        /*****CHOOSE CITY*****/
                        setTimeout(function () {
                            selector($('[id=city]'), data.ads.city);
                        }, 2000);
                    }, 2000);


                }
            
        });
    }


    function selectRooms() {

        chrome.storage.local.get('ads', function (data) {

            /**/$('[id=listing_buildingname]').click();
            $('[id=listing_buildingname]').val(data.ads.content);

            /**/$('[id=rent2]').click();
            $('[id=rent2]').val(data.ads.rent);

            /******CHOOSE BEDROMS AND BATHROOMS**********/
            selector($('[id=bedrooms]'), data.ads.bedroom);
            selector($('[id=bathrooms]'), data.ads.bathroom);

        });


    }

    function generateDefaultText() {
        //ADD DEFAULT INFO
        setTimeout(function () {
            $('[id=auto_fill]')[0].dispatchEvent(new Event('click'));
        }, 3000);
    }

    function selectAdditionalInfo() {
        chrome.storage.local.get('ads', function (data) {
            for (var key in data.ads.apartment_amenities) {
                switch (data.ads.apartment_amenities[key]) {
                    case "Dishwasher":
                        $('[name=listing_dishwasher]').click();
                        break;
                    case "Fridge":
                        $('[name=listing_fridge]').click();
                        break;
                    case "Stove":
                        $('[name=listing_stove]').click();
                        break;
                    case "Washer":
                        $('[name=listing_washer]').click();
                        break;
                    case "Dryer":
                        $('[name=listing_dryer]').click();
                        break;
                    case "Garbage Disposal":
                        $('[name=listing_disposal]').click();
                        break;
                    case "Washer/Dryer":
                        $('[name=listing_laundryhookup]').click();
                        break;
                    case "Laundry":
                        $('[name=listing_laundryroom]').click();
                        break;
                    case "Near Laundromat":
                        $('[name=listing_near_laundry]').click();
                        break;
                    case "Air Conditioning":
                        $('[name=listing_ac]').click();
                        break;
                    case "Private Bathroom":
                        $('[name=listing_ensuitbath]').click();
                        break;
                    case "Shared Room":
                        $('[name=listing_shared_room]').click();
                        break;
                    case "In-law Suite":
                        $('[name=listing_inlawsuite]').click();
                        break;
                    case "Skylight":
                        $('[name=listing_skylight]').click();
                        break;
                    case "Window Coverings":
                        $('[name=listing_windowcovering]').click();
                        break;
                    case "Security System":
                        $('[name=listing_securitysystem]').click();
                        break;
                    case "Cable(TV)":
                        $('[name=listing_cableready]').click();
                        break;
                    case "Satellite Dish":
                        $('[name=listing_satellitedish]').click();
                        break;
                    case "Internet Ready":
                        $('[name=listing_internetready]').click();
                        break;
                    case "VOIP":
                        $('[name=listing_voip]').click();
                        break;
                    case "Fireplace":
                        $('[name=listing_fireplace]').click();
                        break;
                    case "Games/Party Room":
                        $('[name=listing_games_party]').click();
                        break;
                    case "Controlled Entrance":
                        $('[name=listing_controlledentrance]').click();
                        break;
                    case "Balcony":
                        $('[name=listing_balcony]').click();
                        break;
                    case "Scenic View":
                        $('[name=listing_scenicview]').click();
                        break;
                    case "Water":
                        $('[name=listing_beachfront]').click();
                        break;
                    case "Hardwood Floors":
                        $('[name=listing_hardwood]').click();
                        break;
                    case "Carpet":
                        $('[name=listing_carpet]').click();
                        break;
                    case "Renovated":
                        $('[name=listing_renovated]').click();
                        break;
                    case "Close to Rec Center":
                        $('[name=listing_recaccess]').click();
                        break;
                    case "Close to School":
                        $('[name=listing_schoolaccess]').click();
                        break;
                    case "Close to Park":
                        $('[name=listing_parknearby]').click();
                        break;
                    case "Close to Transit":
                        $('[name=listing_transitaccess]').click();
                        break;
                    case "Close to Shopping":
                        $('[name=listing_shoppingaccess]').click();
                        break;
                    case "Pool":
                        $('[name=listing_pool]').click();
                        break;
                    case "Jacuzzi":
                    case "Sauna":
                        if (!$('[name=listing_spa]').hasClass('clicked')) {
                            $('[name=listing_spa]').click();
                            $('[name=listing_spa]').addClass('clicked');
                        }
                        break;
                    case "Fitness":
                        $('[name=listing_fitnesscenter]').click();
                        break;
                    case "Walk To Campus":
                        $('[name=listing_campusnearby]').click();
                        break;
                    case "On Campus Shuttle Route":
                        $('[name=listing_shuttle_route]').click();
                        break;
                    case "Storage Locker":
                        $('[name=listing_storageroom]').click();
                        break;
                    case "Workshop":
                        $('[name=listing_workshop]').click();
                        break;
                    case "Finished Basement":
                        $('[name=listing_finnishedbasement]').click();
                        break;
                    case "Elevator":
                        $('[name=listing_elevator]').click();
                        break;
                    case "Landscaped/Fenced Yard":
                        $('[name=listing_fencedyard]').click();
                        break;
                    case "outdoor Parking":
                        $('[name=listing_streetparking]').click();
                        break;
                    case "Assigned Parking":
                        $('[name=listing_assn_parking]').click();
                        break;
                    case "Indoor Parking":
                        $('[name=listing_coveredparking]').click();
                        break;
                    case "Garage":
                        $('[name=listing_garage]').click();
                        break;
                    case "Secured Garage":
                        $('[name=listing_secured_garage]').click();
                        break;
                    case "Partial Utilities Included":
                        $('[name=listing_prtl_util_inc]').click();
                        break;
                    case "Utilities Included":
                        $('[name=listing_all_util_inc]').click();
                        break;
                    case "Electricity":
                        $('[name=listing_elec_inc]').click();
                        break;
                    case "Utilities Paid By Tenant":
                        $('[name=listing_util_paid_tenant]').click();
                        break;
                    case "Meals Included":
                        $('[name=listing_meals_included]').click();
                        break;
                    case "Co-Signer Allowed":
                        $('[name=listing_co_sign_ok]').click();
                        break;
                    case "Smoke Alarm Per Floor":
                        $('[name=listing_smokealarm_f]').click();
                        break;
                    case "Smoke Alarm Per Bedroom":
                        $('[name=listing_smokealarm_b]').click();
                        break;
                    case "Fire Sprinkler":
                        $('[name=listing_firesprinkler]').click();
                        break;
                    case "Landlord Lives On Site":
                        $('[name=listing_owner_on_site]').click();
                        break;
                    case "Maintenance On Site":
                        $('[name=listing_maintenance_on_site]').click();
                        break;
                    case "Backup Generator":
                        $('[name=listing_backup_gen]').click();
                        break;

                }
            }


        });
    }

    function getRedirectUrl() {
        var response = document.getElementsByTagName('script')[1].innerHTML;
        response = response.replace('list_lat: ,', 'list_lat: "",');
        response = response.replace('list_long: ,', 'list_long: "",');
        eval(response);
        return true;
    }
});


