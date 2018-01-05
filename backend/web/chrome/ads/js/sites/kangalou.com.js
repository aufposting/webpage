//https://www.kangalou.com/en/member/create-owner-account/
//https://www.kangalou.com/en/member/creation-success/YWRzLnN1Ym1pdGVyNEBnbWFpbC5jb20%3D/
//https://management.kangalou.com/en/member/informations/
//https://management.kangalou.com/en/building/details/
//https://management.kangalou.com/en/appartment/details/
//https://management.kangalou.com/en/building/dashboard/10901/


/* global chrome */
jQuery(document).ready(function (data) {

    /******THIS SITE WORKED ONLY FOR Quebec region*******/
    chrome.storage.local.get('ads', function (data) {
        if (data.ads.region != 'Quebec') {
            nextSite(false);
        }
    });

    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'https://www.kangalou.com/en/member/create-owner-account') {
        registration();
    } else if (url.indexOf('creation-success') + 1) {

        getMail('noreply@kangalou.com', function () {
            var pattern = /(https?:\/\/.*?confirm[^\s\n\r\t]+)/im;
            var forClick = pattern.exec($('#gh-mail-respons').html())[1].replace('&amp;', '&').replace('®', '&reg');
            window.location.href = forClick;
        }, 30000);
    } else if (url == 'https://management.kangalou.com/en/member/informations' && $(".alert-success").length == 0) {

        addUserInfo();
    } else if (url == 'https://management.kangalou.com/en/member/informations' && $(".alert-success").length > 0) {
        window.location.href = 'https://management.kangalou.com/en/building/details/';
    } else if (url.indexOf('kangalou.com/en/building/details') + 1 && $("[name=title]").length > 0) {
        addBuildingInfo();
    }else if(url == 'https://management.kangalou.com/en/appartment/details'){
        addUnit();
    }else if(url.indexOf('dashboard') + 1 && $('.btn__group').length > 0){
        nextSite(true);
    }  else {
        nextSite(false);
    }


    function registration() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $("[id=lastname]").click();
            $("[id=lastname]").val(data.ads.l_name);
            // $('[name=type_id]').parent()[0].dispatchEvent(new Event('click'));

            /**/ $("[id=firstname]").click();
            $("[id=firstname]").val(data.ads.name);

            /**/ $("[id=email]").click();
            $("[id=email]").val(data.ads.email);

            /**/ $("[id=password-proprio]").click();
            $("[id=password-proprio]").val(data.ads.pass);

            /**/ $("[id=password-confirm]").click();
            $("[id=password-confirm]").val(data.ads.pass);

            /**/ $("[id=terms]").click();

            /*-->*/$('[id=form2]').find('[type=submit]').click();
        });
    }


    function addUserInfo() {
        chrome.storage.local.get('ads', function (data) {
            /**/ $("[name=phone]").click();
            $("[name=phone]").val(data.ads.phone);
            // $('[name=phone]')[0].dispatchEvent(new Event('click'));

            /**/ $("[id=chkPhoneListing]").click();

            $('#sexe').show();
            selector($('#sexe'), data.ads.gender);

            /*****OPEN ALL SECTIONS*******/
            /**/ $(".panel--large a span").click();

            /**/ $("form").find('.js-button-confirm-before-save').click();
        });
    }


    function addBuildingInfo() {
        getCity();

        chrome.storage.local.get('ads', function (data) {
            /****SHOW ALL SELECTES*******/
            $('select').show();

            /**/ $("[name=title]").click();
            $("[name=title]").val(data.ads.address + ' ' + data.ads.street);

            switch (data.ads.house_type) {
                case 'Apartment':
                    selector($('#type'), 'Condominium');
                    break;
                case 'House':
                    selector($('#type'), 'Single family');
                    break;
                case 'Studio':
                case 'Commercial':
                    selector($('#type'), 'Commercial');
                    break;
            }

            /**/ $("[id=unitcount]").click();
            $("[id=unitcount]").val(data.ads.bedroom);

            /**/ $("[id=floorcount]").click();
            $("[id=floorcount]").val(data.ads.floor_count);

            /**/ $("[id=zipcode]").click();
            $("[id=zipcode]").val(data.ads.postal_code);

            /**/ $("[id=zipcode]").click();
            $("[id=zipcode]").val(data.ads.postal_code);
            $('[name=zipcode]')[0].dispatchEvent(new Event('change'));

            /**/ $("[id=number]").click();
            $("[id=number]").val(data.ads.address);

            /**/ $("[id=street]").click();
            $("[id=street]").val(data.ads.street);
        });
    }


    function  getCity() {
        chrome.storage.local.get('ads', function (data) {
            var i = 1;
            $('#cities').bind('DOMSubtreeModified', function () {
                var length = $('[name=region]').find('option').length;
                if ($('[name=cities]').find('option').length > 2) {
                    selector($('[name=cities]'), data.ads.city);
                    if (!($('[name=cities]').val() > 0) && ++i < length) {
                        setCity();
                    } else if ($('[name=cities]').val() > 0) {
                        nextStep();
                    }
                }
            });
            setCity();
            function setCity() {
                var optionVal = $($('[name=region]').find('option')[i]).val();
                $('[name=cities]').html('');
                $('[name=region]').val(optionVal);
                $('[name=region]')[0].dispatchEvent(new Event('change'));
            }
        });
    }



    function nextStep() {
        addDetails();
        uploadeImage();
    }

    function addDetails() {
        chrome.storage.local.get('ads', function (data) {

            for (var key in data.ads.apartment_amenities) {
                switch (data.ads.apartment_amenities[key]) {
                    case 'Elevator':
                        $("[id=criteria-elevator]").click();
                        break;
                    case 'Gym':
                        $("[id=criteria-gym-1]").click();
                        $("[id=criteria-gym-2]").click();
                        break;
                    case 'Sauna':
                        $("[id=criteria-sauna]").click();
                        break;
                    case 'Laundry':
                        $("[id=criteria-laundromat-1]").click();
                        break;
                    case 'Shared Room':
                        $("[id=criteria-shared-rooms]").click();
                        break;
                    case 'Indoor Parking':
                        $("[id=criteria-interior]").click();
                        break;
                    case 'outdoor Parking':
                        $("[id=criteria-exterior]").click();
                        break;
                    case 'Pool':
                        $("[id=criteria-pool]").click();
                        break;
                    case 'Tennis':
                        $("[id=criteria-tennis]").click();
                        break;
                    case 'Security System':
                        $("[id=criteria-alarm-system-cameras]").click();
                        break;
                }
            }

        });

    }

    function uploadeImage() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                data.append('files[]', images[i].file, images[i].name);
                var xhr = new XMLHttpRequest();
                xhr.open('post', 'https://management.kangalou.com/en/photo/ajax/upload-photo/', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var file = JSON.parse(xhr.responseText).files[0];
                        var html = `<input type="hidden" name="photoupload[newuploads][id][]" data-filename="" data-fileurl="" value="">`
                                + `<input type="hidden" class="position" name="photoupload[newuploads][position][]" value="${++i}">`
                                + `<input type="hidden" name="photoupload[newuploads][file][]" value="${file.url}">`
                                + `<input type="hidden" name="photoupload[newuploads][name][]" value="${file.name}">`;
                        $('.uploaded__photos').append(html);
                        if (i < images.length) {
                            _uploadeimage(i);
                        } else {
                            window.setTimeout(function () {
                                submit();
                            }, 250);
                        }
                    }
                };
                xhr.send(data);
            }
        });

    }

    function submit() {
        var inputs = $('form.js-confirm-before-exit').find('input');
        var textareas = $('form.js-confirm-before-exit').find('textarea');
        var selects = $('form.js-confirm-before-exit').find('select');
        var data = new FormData();
        $.each(inputs, function () {
            data.append($(this).attr('name'), $(this).val());
        });
        $.each(textareas, function () {
            data.append($(this).attr('name'), $(this).val());
        });
        $.each(selects, function () {
            data.append($(this).attr('name'), $(this).val());
        });
        var xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var innerBody = xhr.responseText.replace(/([\n\r]|.)+<body[^>]+>/, '').replace(/<\/body[^>]*>([\n\r]|.)+/, '');
                $('body').html(innerBody);
                window.location.href = 'https://management.kangalou.com/en/appartment/details/';
            }
        };
        xhr.send(data);
    }


    function addUnit() {
        addApartmentAmenities();
        chrome.storage.local.get('ads', function (data) {

            /**/ $("[type=radio][name=building]")[0].click();

            setTimeout(function () {
                /**/ $("[type=radio][name=address]")[0].click();

                /**/ $("[name=doornumber]").click();
                $("[name=doornumber]").val(data.ads.street);


                /******CHOOSE HOUSE TYPE*********/
                selector($("[name=type]"), data.ads.house_type);
                $("[id=type_chosen]").find('span').text(data.ads.house_type);

                /*******CHOOSE ROOMS*******/

                if(parseInt(data.ads.bedroom) + parseInt(data.ads.bathroom) >= 6){
                    selector($("[name=appartmentsize]"), '6');
                    $("[id=appartmentsize_chosen]").find('span').text('6 ½ +')
                }else {
                    selector($("[name=appartmentsize]"), String(parseInt(data.ads.bedroom) + parseInt(data.ads.bathroom)));
                    $("[id=appartmentsize_chosen]").find('span').text(parseInt(data.ads.bedroom) + parseInt(data.ads.bathroom) + ' ½ +')
                }


                if(data.ads.bedroom >= 9){
                    selector($("[name=bedroomcount]"), '9');
                    $("[id=bedroomcount_chosen]").find('span').text('9 ½ +')
                }else {
                    selector($("[name=bedroomcount]"), data.ads.bedroom );
                    $("[id=bedroomcount_chosen]").find('span').text(data.ads.bedroom + ' ½ +')
                }

                if(data.ads.bathroom >= 5){
                    selector($("[name=bathroomcount]"), '5');
                    $("[id=bathroomcount_chosen]").find('span').text('5 ½ +')
                }else {
                    selector($("[name=bathroomcount]"), data.ads.bathroom );
                    $("[id=bathroomcount_chosen]").find('span').text(data.ads.bathroom + ' ½ +')
                }

                /**/ $("[name=size]").click();
                $("[name=size]").val(data.ads.apt_size);

                $("[name=size_type][value='m']").click();

                /**/ $("[name=monthlycost]").click();
                $("[name=monthlycost]").val(data.ads.rent);

                selector($("[name=rentfrequency]"), 'Every month');
                $("[id=rentfrequency_chosen]").find('span').text('Every month');

                /**/ $("[name=availability]").click();
                $("[name=availability]").val(data.ads.available_date);

                /**/ $("[href*=description-en_CA]")[0].click();

                /**/ $("[name*=en_CA]").click();
                $("[name*=en_CA]").val(data.ads.content);


                /********FINISH*********/
                setTimeout(function () {
                    $(".form--aligned").find('[type=submit]').click();
                }, 3000);

            }, 3000);
        });
    }


    function addApartmentAmenities(){
        chrome.storage.local.get('ads', function (data) {

            $('[id*=collapse]').addClass('in');

            if(data.ads.pets == '1'){
                $('[id=criteria-cat-allowed]').click();
                $('[id=criteria-dog-allowed]').click();
                $('[id=criteria-small-dog-allowed]').click();
            }else{
                $('[id=criteria-no-animals-allowed]').click();
            }

            if(data.ads.parking_count > 0){
                $('[id=criteria-parking]').click();
            }

            for(var key in data.ads.apartment_amenities){
                switch (data.ads.apartment_amenities[key]){
                    case 'Air Conditioning':
                        $('[id=criteria-air-conditioning]').click();
                        break;
                    case 'Hot Water':
                        $('[id=criteria-hot-water]').click();
                        break;
                    case 'Furniture':
                        $('[id=criteria-furnished]').click();
                        break;
                    case 'Heating':
                        $('[id=criteria-heated]').click();
                        break;
                    case 'Fridge':
                        $('[id=criteria-fridge]').click();
                        break;
                    case 'Washer':
                        $('[id=criteria-washer]').click();
                        break;
                    case 'Dishwasher':
                        $('[id=criteria-dishwasher]').click();
                        break;
                    case 'Stove':
                        $('[id=criteria-stove]').click();
                        break;
                    case 'Dryer':
                        $('[id=criteria-dryer]').click();
                        break;
                    case 'Washer/Dryer':
                        $('[id=criteria-washer-and-dryer-connectors]').click();
                        break;
                    case 'Storage Locker':
                    case 'Storage/Locker Space':
                        $('[id=criteria-storage]').prop('checked', true);
                        $('[id=criteria-storage-1]').prop('checked', true);
                        break;
                    case 'Fireplace':
                        $('[id=criteria-fireplace]').click();
                        break;
                    case 'Carpet':
                        $('[id=criteria-carpet]').click();
                        break;
                    case 'Maintenance On Site':
                        $('[id=criteria-access-to-site]').click();
                        break;
                    case 'Landscaped/Fenced Yard':
                        $('[id=criteria-private-yard]').click();
                        break;
                    case 'Terrace':
                        $('[id=criteria-terrace]').click();
                        break;
                        case 'Elevator':
                        $('[id=criteria-elevator-1]').click();
                        break;
                    case 'Wheelchair accessible':
                        $('[id=criteria-wheelchair-ramp]').click();
                        break;
                    case 'Meals Included':
                        $('[id=criteria-meal-service]').click();
                        break;
                    case 'Internet Ready':
                        $('[id=criteria-internet]').click();
                        break;
                    case 'Satellite Dish':
                        $('[id=criteria-satellite-tv]').click();
                        break;
                    case 'Cable(TV)':
                        $('[id=criteria-tv-cable]').click();
                        break;
                    case 'Balcony':
                        $('[id=criteria-balcony]').click();
                        break;
                    case 'Yard':
                        $('[id=criteria-yard-accessible]').click();
                        break;
                    case 'Renovated':
                        $('[id=criteria-renovated]').click();
                        break;
                    case 'Close to Transit':
                        $('[id=criteria-public-transit]').click();
                        break;
                    case 'Hardwood Floors':
                        $('[id=criteria-wood-floors]').click();
                        break;
                }
            }
        });
    }
});



