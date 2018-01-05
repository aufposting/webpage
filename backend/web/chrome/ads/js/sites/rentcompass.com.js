//https://www.rentcompass.com/list-rental-homes
//http://www.rentcompass.com/CreateAd?pl=0
//https://www.rentcompass.com/listing-complete?id=B126594


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url.indexOf('/list-rental-homes') + 1 && $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceholder_PlansTable]').length == 0) {
        step1();
    } else if (url.indexOf('/list-rental-homes') + 1 && $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceholder_PlansTable]').length > 0) {
        step2();
    } else if (url. indexOf('/CreateAd?pl=0') + 1) {
        step3();
    } else if (url.indexOf('/listing-complete') + 1) {
        nextSite(true);
    } else {
        nextSite(false);
    }


    function step1() {
        chrome.storage.local.get('ads', function (data) {
            if (!$('#FailureText.loginError').text().length) {
                /**/
                $('[id=UserName]').click();
                $('[id=UserName]').val(data.ads.email);
                $('[id=UserName]')[0].dispatchEvent(new Event('change'));

                /**/
                $('[id=NewRadio]').click();

                /*-->*/$('[id=form1]').find('[type=submit]').click();
            }
        });
    }

    function step2() {
        chrome.storage.local.get('ads', function (data) {
            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceholder_PlaceFreeButton]').click();
        });
    }

    function step3() {
        setTimeout(function () {
            additionalInfo();
        }, 3000);

        chrome.storage.local.get('ads', function (data) {
            var changed = false;

            /*****CHOOSE Province*****/
            if (data.ads.region == 'Prince Edward Island') {
                selector($('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_Province]'), 'PEI');
            } else {
                selector($('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_Province]'), data.ads.region);
            }

            $('[id=TheMap]').bind('DOMSubtreeModified', function () {
                if (!$('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_City_CityTextBox]').val()) {
                    $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_City_CityTextBox]').val(data.ads.city);
                } else if (!$('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_StreetName]').val()) {
                    $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_StreetName]')[0].dispatchEvent(new Event('click'));
                    $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_StreetName]').val(data.ads.street + ', ' + data.ads.address);
                } else if (!$('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_PostalCode]').val()) {
                    $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_PostalCode]').val(data.ads.postal_code);
                } else {
                    if (!changed) {
                        changed = true;
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_StreetName]')[0].dispatchEvent(new Event('change'));
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_PostalCode]')[0].dispatchEvent(new Event('change'));
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_City_CityTextBox]')[0].dispatchEvent(new Event('change'));
                    }
                }
            });
        });
    }


    function additionalInfo() {
        addFeatures();
        contactInfo();
        registrInfo();
        addPhoto();

        chrome.storage.local.get('ads', function (data) {
            /**/
            $('[name*=PriceTextBox]').click();
            $('[name*=PriceTextBox]').val(data.ads.rent);

            /**/
            $('[name*=BedroomsTextBox]').click();
            $('[name*=BedroomsTextBox]').val(data.ads.bedroom);

            /**/
            $('[name*=BathroomsTextBox]').click();
            $('[name*=BathroomsTextBox]').val(data.ads.bathroom);

            /**/
            $('[name*=AvailRadio][value="2"]').click();

            var dateArray = /(\d+)-(\d+)-(\d+)/.exec(data.ads.available_date);
            var date = dateArray[3] + '/' + dateArray[2] + '/' + dateArray[1];
            /**/
            $('[name*=Cal]').click();
            $('[name*=Cal]').val(date);


            /********CHOOSE HOUSE TYPE************/
            switch (data.ads.house_type) {
                case 'Studio':
                    selector($('[name="ctl00$ctl00$MainPlaceholder$MainPlaceHolder$PropertyType"]'), 'Room');
                    break;
                case 'Commercial':
                    selector($('[name="ctl00$ctl00$MainPlaceholder$MainPlaceHolder$PropertyType"]'), 'Shared');
                    break;
                default:
                    selector($('[name="ctl00$ctl00$MainPlaceholder$MainPlaceHolder$PropertyType"]'), data.ads.house_type);

            }

            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_DescriptionTextBox]').addClass('toDelete');
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_DescriptionTextBox]').parent('div').append('<textarea name="ctl00$ctl00$MainPlaceholder$MainPlaceHolder$DescriptionTextBox" id="ctl00_ctl00_MainPlaceholder_MainPlaceHolder_DescriptionTextBox"></textarea>')
            $('.toDelete').remove();
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_DescriptionTextBox]').val(data.ads.content);
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_DescriptionTextBox]')[0].dispatchEvent(new Event('change'));

            for (var i = 0; i < data.ads.content.length; i++) {
                $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_DescriptionTextBox]')[0].dispatchEvent(new Event('keyup'));
            }

        });
    }

    function addFeatures() {
        chrome.storage.local.get('ads', function (data) {

            if (data.ads.pets == '1') {
                $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_PetFriendlyCB]').click();
            }

            for (var key in data.ads.apartment_amenities) {
                switch (data.ads.apartment_amenities[key]) {
                    case "Furniture":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_FurnishedCB]').click();
                        break;
                    case "A/C":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasAcCB]').click();
                        break;
                    case "Balcony":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasBalconyCB]').click();
                        break;
                    case "Laundry":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasLaundryCB]').click();
                        break;
                    case "Dishwasher":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_DishwasherCB]').click();
                        break;
                    case "Locker":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_LockerCB]').click();
                        break;
                    case "Tennis":
                    case "Racquet Court":
                        if (!$('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasTennisCB]').hasClass('clicked')) {
                            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasTennisCB]').click();
                            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasTennisCB]').addClass('clicked');
                        }
                        break;
                    case "Pool":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasPool]').click();
                        break;
                    case "Utilities Included":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HydroIncludedCB]').click();
                        break;
                    case "Fireplace":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasFireplaceCB]').click();
                        break;
                    case "Yard":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasYardCB]').click();
                        break;
                    case "Near Subway":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_NearSubwayCB]').click();
                        break;
                    case "Gym":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_GymCB]').click();
                        break;
                    case "Virtual golf":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HasGolfCB]').click();
                        break;
                    case "Wheelchair accessible":
                        $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_HandicapCB]').click();
                        break;
                }
            }

        });
        return true;
    }


    function contactInfo() {
        chrome.storage.local.get('ads', function (data) {
            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_ContactName]').click();
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_ContactName]').val(data.ads.name);

            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_ContactPhone]').click();
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_ContactPhone]').val(data.ads.phone);

            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_EmailRadio_0]').click();

        });
        return true;
    }


    function registrInfo() {
        chrome.storage.local.get('ads', function (data) {

            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_Password]').click();
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_Password]').val(data.ads.pass);

            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_Password2]').click();
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_Password2]').val(data.ads.pass);

            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_ContactsCheckBox]').click();

            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_FullNameTextBox]').click();
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_FullNameTextBox]').val(data.ads.name + ' ' + data.ads.l_name);

            /**/
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_PhoneTextBox]').click();
            $('[id=ctl00_ctl00_MainPlaceholder_MainPlaceHolder_PhoneTextBox]').val(data.ads.phone);

            /**/
            $('[id=TermsCB]').click();
        });

    }

    function addPhoto() {
        var img = false;
        if (!img) {
            img = true;

            getImages(function (images) {
                var i = 0;
                _uplodeImage();
                function _uplodeImage() {
                    var data = new FormData();
                    var imageParent = $('#ctl00_ctl00_MainPlaceholder_MainPlaceHolder_PhotoUpload' + (i + 1) + '_Root');
                    data.append('type', 'unit');
                    data.append('Filedata', images[i].file, images[i].name);
                    var xhr = new XMLHttpRequest();
                    xhr.open('post', 'https://www.rentcompass.com/upload.aspx', true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            imageParent.find('.photoId').val(xhr.responseText);
                            imageParent.find('.uploadImage').attr('src', ('ImageHandler.ashx?tid=' + xhr.responseText));
                            i++;
                            if ([i] in images && i <= 10) {
                                _uplodeImage();
                            } else {
                                window.setTimeout(function () {
                                    $('[name=aspnetForm]').find('[type=submit]').click();
                                }, 3000);
                            }
                        }
                    };
                    xhr.send(data);
                }
            });
        }

    }
});



