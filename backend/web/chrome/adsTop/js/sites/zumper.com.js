//https://www.zumper.com/pro?signIn=&next=%2Fpro%2Fhome#!%2Flistings%2Fnew
//https://www.zumper.com/pro/home#!/dashboard
//https://www.zumper.com/pro/home#!/listings/new
//https://www.zumper.com/pro/home#!/listings/building/565396


/* global chrome */
jQuery(document).ready(function ($) {

    var url = String(window.location.href).replace(/\/$/, '');

    if (url == 'https://www.zumper.com/pro?signIn=&next=%2Fpro%2Fhome#!%2Flistings%2Fnew') {
        setTimeout(function () {
            /*-->*/
            $('.sign-up-link').click();
            $('.sign-up-link')[0].dispatchEvent(new Event('click'));
            addInfo();
        }, 3000);
    }else if (url == 'https://www.zumper.com/pro/home#!/dashboard') {
        window.location.href = 'https://www.zumper.com/pro/home#!/listings/new';
        location.reload();
    }else if (url == 'https://www.zumper.com/pro/home#!/listings/new' ) {
        setTimeout(function () {
            addLocation();
        }, 2000);
    }else if(url.indexOf('edit/photos') + 1 && url.indexOf('?uploaded') +1 == false){
        setTimeout(function () {
            addPhoto();
        }, 3000)
    }else if(url.indexOf('?uploaded') +1){

        var detailsButton = setInterval(function () {
            if($('#details-tab').length > 0){
                clearInterval(detailsButton);

                /*-->*/$('#details-tab').click();
                /*-->*/$('#details-tab')[0].dispatchEvent(new Event('click'));
                setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        }, 7000);
    }else if(url.indexOf('edit/details') + 1){
        setTimeout(function () {
            addDetails();
            addFloorplans();
        }, 2000);
    }else if (url.indexOf('listings/building/') + 1) {
        nextSite(true);
    }else {
        nextSite(false);
    }


    function addInfo() {
        chrome.storage.local.get('ads', function (data) {

            var alerted = false;
            var showForm = false;

            $('body').bind('DOMSubtreeModified', function () {
                if ($('[class=modal-dialog]').length > 0 && !alerted) {

                    alerted = true;

                    $('.modal-dialog').bind('DOMSubtreeModified', function () {

                        if ($('.post-listings').parent().length > 0) {
                            $('.post-listings').parent().click();
                            $('.post-listings').parent()[0].dispatchEvent(new Event('click'));
                        }

                        if ($('[name=accountType]').length > 0 && !showForm) {
                            showForm = true;

                            setTimeout(function () {

                                $('[name=accountType][value="BUILDING_REPRESENTATIVE"]').click();
                                $('[name=accountType][value="BUILDING_REPRESENTATIVE"]')[0].dispatchEvent(new Event('click'));

                                /**/
                                $('[name=firstName]').click();
                                $('[name=firstName]').val(data.ads.name);
                                $('[name=firstName]')[0].dispatchEvent(new Event('change'));

                                /**/
                                $('[name=lastName]').click();
                                $('[name=lastName]').val(data.ads.l_name);
                                $('[name=lastName]')[0].dispatchEvent(new Event('change'));

                                /**/
                                $('[name=email]').click();
                                $('[name=email]').val(data.ads.email);
                                $('[name=email]')[0].dispatchEvent(new Event('change'));
                                $('[name=email]')[1].dispatchEvent(new Event('change'));

                                /**/
                                $('[name=phone]').click();
                                $('[name=phone]').val(data.ads.phone);
                                $('[name=phone]')[0].dispatchEvent(new Event('change'));

                                /**/
                                $('[name=password]').click();
                                $('[name=password]').val(data.ads.pass);
                                $('[name=password]')[0].dispatchEvent(new Event('change'));

                                /**/
                                $('[name=password2]').click();
                                $('[name=password2]').val(data.ads.pass);
                                $('[name=password2]')[0].dispatchEvent(new Event('change'));

                                /**/
                                $('[name=canada][value="[canada]"]').click();
                                $('[name=canada][value="[canada]"]')[0].dispatchEvent(new Event('click'));

                                /**/
                                $('[class=sign-up-bottom]').find('button').click();
                                $('[class=sign-up-bottom]').find('button')[0].dispatchEvent(new Event('click'));
                            }, 3000);
                        }
                    });
                }
            });
        });
    }


    function addLocation() {
        chrome.storage.local.get('ads', function (data) {

            /****PROPERTY TYPE CLICKED  building button****/
            $('#building-button').click();

            var streetNumberInput = setTimeout(function () {

                clearInterval(streetNumberInput);

                $('[id=street-number]').click();
                $('[id=street-number]').val(data.ads.address);
                $('#street-number')[0].dispatchEvent(new Event('change'));

                // /*-->*/
                // $('[id=unit]').click();
                // $('[id=unit]').val('');

                /*-->*/
                $('[id=street-name]').click();
                $('[id=street-name]').val(data.ads.street);
                $('#street-name')[0].dispatchEvent(new Event('change'));

                /*-->*/
                $('[id=city]').click();
                $('[id=city]').val(data.ads.city);
                $('#city')[0].dispatchEvent(new Event('change'));

                /*-->*/
                $('[id=zipcode]').click();
                $('[id=zipcode]').val(data.ads.postal_code);
                $('#zipcode')[0].dispatchEvent(new Event('change'));
            }, 2000);


            var addressSearchInput = setInterval(function () {
                if ($('[id=address-search]').val() != '' ) {
                    clearInterval(addressSearchInput);

                    $('[id=address-search]')[0].dispatchEvent(new Event('change'));

                    /*-->*/$('.continue-button').click();
                    $('.continue-button')[0].dispatchEvent(new Event('click'));
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                }
            }, 3000);
        });
    }


    function addDetails() {
        chrome.storage.local.get('ads', function (data) {
            var detailsForm = setInterval(function () {
                if($('[name="forms.details"]').length > 0){
                    clearInterval(detailsForm);
                    refillAmenities();

                    /*-->*/$('[name=emailOverride]').click();
                    $('[name=emailOverride]').val(data.ads.email);
                    $('[name=emailOverride]')[0].dispatchEvent(new Event('change'));

                    $('[name=35][value=0]').prop('checked', true);
                    $('[name=35][value=0]')[0].dispatchEvent(new Event('click'));

                    if (data.ads.pets == '1') {
                        // $('#cats').prop('checked', true);
                        $('#cats').click();
                        $('#cats')[0].dispatchEvent(new Event('click'));

                        // $('#dogs').prop('checked', true);
                        $('#dogs').click();
                        $('#dogs')[0].dispatchEvent(new Event('click'));
                    }

                    /**/$('[name=description]').click();
                    $('[name=description]').val(data.ads.content);
                    $('[name=description]')[0].dispatchEvent(new Event('change'));

                    /**/$('.continue-button').click();
                    $('.continue-button')[0].dispatchEvent(new Event('click'));
                }
            }, 4000);
        });
    }
    
    function addFloorplans() {
        chrome.storage.local.get('ads', function (data) {
            var floorplansForm = setInterval(function () {
                if($('[name="forms.floorplans"]').length > 0){
                    clearInterval(floorplansForm);

                    /**/$('.add-floorplan-button').click();

                    setTimeout(function () {
                        /**/$('[name=title]').click();
                        $('[name=title]').val(data.ads.title);
                        $('[name=title]')[0].dispatchEvent(new Event('change'));

                        /*******CHOOSE bedrooms and bathrooms******/
                        selector($('[name=bedrooms]'), data.ads.bedroom);
                        selector($('[name=bathrooms]'), data.ads.bathroom);

                        /**/$('[name=price]').click();
                        $('[name=price]').val(data.ads.rent);
                        $('[name=price]')[0].dispatchEvent(new Event('change'));

                        /**/$('[name=squareFeet]').click();
                        $('[name=squareFeet]').val(data.ads.apt_size);
                        $('[name=squareFeet]')[0].dispatchEvent(new Event('change'));

                        selector($('[name="forms.floorplans"]').find($('.select-listing-status')), 'Active');

                        /*******FINISH*******/
                        $('#activate-button').click();
                        $('#activate-button')[0].dispatchEvent(new Event('click'));

                        setTimeout(function () {
                            location.reload();
                        }, 3000)

                    }, 3000)
                }
            }, 4000);
        });
    }
    

    function refillAmenities() {
        chrome.storage.local.get('ads', function (data) {

            for (var key in data.ads.apartment_amenities) {
                switch (data.ads.apartment_amenities[key]) {
                    case 'Concierge/Janitor':
                        $('.concierge-service').prop('checked', true);
                        $('.concierge-service')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Dryer':
                    case 'Washer/Dryer':
                        $('.dry-cleaning').prop('checked', true);
                        $('.dry-cleaning')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Elevator':
                        $('.elevator').prop('checked', true);
                        $('.elevator')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Fitness':
                        $('.fitness-center').prop('checked', true);
                        $('.fitness-center')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Garage':
                        $('.garage-parking').prop('checked', true);
                        $('.garage-parking')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Laundry':
                    case 'Laundry In-Building':
                        $('.laundry').prop('checked', true);
                        $('.laundry')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Storage Locker':
                    case 'Storage/Locker Space':
                        $('.storage').prop('checked', true);
                        $('.storage')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Pool':
                        $('.swimming-pool').prop('checked', true);
                        $('.swimming-pool')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Wheelchair accessible':
                        $('.wheelchair-access').prop('checked', true);
                        $('.wheelchair-access')[0].dispatchEvent(new Event('click'));
                        break;
                }
            }
        });
    }
    
    function addPhoto() {

        var url = String(window.location.href).replace(/\/$/, '');
        var listingUniqueUrl =  /\d{4,}/.exec(url)[0] ;

        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                 function randomInt(){
                    var text = "";
                    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

                    for( var i= 0; i < 9; i++ ){
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    return text;
                }
                var OriginUrl = '-' + randomInt() + '-' + i;

                data.append('origin_url',  OriginUrl);
                data.append('files[]', images[i].file, images[i].name);
                var xhr = new XMLHttpRequest();

                xhr.open('post', '//www.zumper.com/api/p/1/buildings/' + listingUniqueUrl + '/media', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (++i < images.length) {
                            _uploadeimage(i);
                        }else{
                            /*****GO TO NEXT STEP*******/
                            window.location.href = url + '?uploaded';
                            location.reload();
                        }
                    }
                };
                xhr.send(data);
            }
        });
    }
    
});