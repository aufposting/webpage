/* global chrome */
//cityleases.com
//sublet.com
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url == 'https://www.sublet.com' || url == "https://www.cityleases.com/") {
        isRegistered();
    } else if (url == 'https://www.sublet.com/lrregister.asp' || url == "https://www.cityleases.com/lrregister.asp") {
        setData();
    } else if (url.indexOf('/spider/lraptdetls.asp') + 1) {
        setRegion();
    } else if (url.indexOf('/spider/lraptdetls2.asp') + 1) {
        setRegion2();
    } else if (url.indexOf('/spider/lraptdetls3.asp') + 1) {
        setHouseData();
    } else if (url.indexOf('/spider/lrapt_otherdetls.asp') + 1) {
        setContent();
    } else if (url.indexOf('/spider/uploadphotos.asp') + 1) {
        upload()
    } else if (url.indexOf('/spider/postingtype.asp') + 1) {
        selectedListingUpgrades()
    }

//https://www.sublet.com/spider/lraptdetls.asp?supplierID=666809&country=5&state=Canada&City=Quebec&Area=
    function setData() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads);
            /**/
            $('[name=username]').val(data.ads.email);
            $('[name=username]').change();
            /**/
            $('[name=username1]').val(data.ads.email);
            $('[name=username1]').change();
            /**/
            $('[name=password]').val(data.ads.pass);
            $('[name=password]').change();
            /**/
            $('[name=password1]').val(data.ads.pass);
            $('[name=password1]').change();
            /**/
            $('[name=first_name]').val(data.ads.name);
            $('[name=first_name]').change();
            /**/
            $('[name=last_name]').val(data.ads.l_name);
            $('[name=last_name]').change();
            /**/
            selector($('[name=country]'), 'Canada');
            if (data.ads.region == 'Northwest Territories') {
                selector($('[name=state]'), 'Canada Territories');
            } else {
                selector($('[name=state]'), 'Canada');
            }
            /**/
            selector($('[name=city]'), data.ads.region);
            /**/
            $('[name=dphone]').val(data.ads.phone);
            $('[name=dphone]').change();
            /**/
            selector($('[name=Relation]'), 'Owner');
            /**/
            if (data.ads.house_type == 'Apartment')
                selector($('[name=RentalType]'), 'Rental Apartments');
            else if (data.ads.house_type == 'House')
                selector($('[name=RentalType]'), 'Rental Houses');
            else
                selector($('[name=RentalType]'), 'Corporate Housing');
            /**/
            selector($('[name=multiapt]'), '1 Unit');
            window.setTimeout(function () {
                captcha($('#recapcha_image'), $('[name=ImageField]'), {
                    numeric: 1,
                    min_len: 4,
                    max_len: 4
                }, function () {
                    /*--->*/
                    $('[name=Submit]').click();
                    $('[name=Submit]')[0].dispatchEvent(new Event('click'));
                });
            }, 1500);
        });
    }

    function setRegion() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads);
            selector($('[name=country]'), 'Canada');
            window.setTimeout(function () {
                if (data.ads.region == 'Northwest Territories') {
                    selector($('[name=state]'), 'Canada Territories');
                } else {
                    selector($('[name=state]'), 'Canada');
                }
                /**/
                $('[name=zip]').val(data.ads.postal_code);
                $('[name=zip]').change();
                window.setTimeout(function () {
                    /*--->*/
                    $('[name=order_form_button]').click();
                    window.setTimeout(function () {
                        /*--->*/
                        $('#continue_lrapt').click();
                    }, 2000);
                }, 2000);
            }, 2000);
        });
    }

    function setRegion2() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads);
            /**/
            $('[name=unitno]').val('My House');
            $('[name=last_name]').change();
            /**/
            selector($('[name=city]'), data.ads.region);
            /**/
            selector($('[name=city]'), data.ads.region);
            window.setTimeout(function () {
                setCity();
            }, 1500);
            function setCity() {
                var optionVal = $($('[name=areasel]').find('option')[i]).val();
                console.log(optionVal);
                $('[name=areasel]').val(optionVal);
                $('[name=areasel]')[0].dispatchEvent(new Event('change'));
                _setCity();
            }

            var i = 1;

            function _setCity() {
                window.setTimeout(function () {
                    selector($('[name=area2]'), 'Select Town Name');
                    var length = $('[name=areasel]').find('option').length;
                    selector($('[name=area2]'), data.ads.city);
                    if (!($('[name=area2]').val() && $('[name=area2]').val().length) && ++i < length) {
                        setCity();
                    } else if ($('[name=area2]').val() && $('[name=area2]').val().length) {
                        nextStep();
                    }
                }, 3000);
            }

            function nextStep() {
                /**/
                $('[name=house_no]').val(data.ads.address);
                $('[name=house_no]').change();
                /**/
                $('[name=cross_street]').val(data.ads.street);
                $('[name=cross_street]').change();
                /**/
                $('[name=order_form_button]').click();
            }


        });
    }

    function setHouseData() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads);
            /**/
            var houseType = data.ads.house_type;
            if (houseType == 'Studio' || houseType == 'Commercial') {
                selector($('[name=Rental_type]'), 'Apartment');
                /**/
                selector($('[name=Apt_Size]'), 'Studio');
            } else {
                selector($('[name=Rental_type]'), houseType);
                /**/
                selector($('[name=Apt_Size]'), 'Studio');
                var bedroomsArr = ['', 'One', 'Two', 'Three', 'Four', 'Five+'];
                var key = parseInt(data.ads.bedroom) < 5 ? parseInt(data.ads.bedroom) : 5;
                /**/
                selector($('[name=Apt_Size]'), bedroomsArr[key]);
            }
            /**/
            // selector($('[name=Private]'), 'Private Rental');
            /**/
            var bathroom = parseInt(data.ads.bathroom) < 3 ? data.ads.bathroom : '3+';
            selector($('[name=Bathrooms]'), bathroom);
            /*--*/
            var date = data.ads.available_date.split('-');
            /**/
            var month = date[1].substr(0, 1) == '0' ? date[1].substr(1, 1) : date[1];
            /**/
            var dey = date[2].substr(0, 1) == '0' ? date[2].substr(1, 1) : date[2];
            $('[name=sdatemm]').val(month);
            $('[name=sdatemm]')[0].dispatchEvent(new Event('change'));
            /**/
            selector($('[name=sdatedd]'), dey);
            /**/
            selector($('[name=sdateyy]'), date[0]);

            /**/
            selector($('[name=end_opt]'), 'Minimum 1 Month');
            /**/
            selector($('[name=currency]'), 'US Dollar');
            /**/
            selector($('[name=Apt_Share]'), "Private");

            selector($('[name=rental_available]'), "Yes");

            /**
             * Square Meters To Square Feet
             * @type {number}
             */
            var apt_size = Math.ceil(data.ads.apt_size * 10.764);

            $('[name=area]').val(apt_size);
            $('[name=area]')[0].dispatchEvent(new Event('change'));

            window.setTimeout(function () {
                var apartment_amenities = data.ads.apartment_amenities;
                $('[name=mprice]').prop('readonly', false);

                if (data.ads.parking_count > 0) {
                    $('[name=parking]').prop('checked', true);
                }
                if (find(apartment_amenities, "Elevator") + 1) {
                    $('[name=Elevator]').prop('checked', true);
                }
                if (find(apartment_amenities, "Air conditioning") + 1) {
                    $('[name=Aircond]').prop('checked', true);
                }
                if (find(apartment_amenities, "Maintenance On Site") + 1) {
                    $('[name=Internet]').prop('checked', true);
                }
                if (find(apartment_amenities, "Cable(TV)") + 1) {
                    $('[name=Cable]').prop('checked', true);
                }
                if (find(apartment_amenities, "Utilities Included") + 1) {
                    $('[name=Dishwasher]').prop('checked', true);
                }

                $('[name=mprice]').val(data.ads.rent);

                if (find(apartment_amenities, 'Furniture') + 1) {

                    selector($('[name=furnished]'), 'Yes');
                } else {
                    selector($('[name=furnished]'), 'No');
                }

                /**
                 * Handicapped Access
                 */
                if (find(apartment_amenities, 'Handicap') + 1) {
                    selector($('[name=handicap]'), 'Yes');
                } else {
                    selector($('[name=handicap]'), 'No');
                }

                selector($('[name=Security]'), "None");
                selector($('[name=Credit]'), "No");

                var lease_length = parseInt(data.ads.lease_length);

                if (lease_length > 3) {
                    selector($('[name=summer]'), "No");
                } else {
                    selector($('[name=summer]'), "Yes");
                }

                /**/
                if (data.ads.pets == '1') {
                    selector($('[name=Pets]'), 'Yes');
                } else {
                    selector($('[name=Pets]'), 'No');
                }

            }, 1500);

            window.setTimeout(function () {
                $('[name=order_form_button]').click();
            }, 2000);
        });
    }

    function setContent() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads);
            $('[name=other_details]').val(data.ads.content);
            $('[name=other_details]').change();

            $('[name=order_form_button]').click();
        });
    }

    function setContent() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data.ads);
            $('[name=other_details]').val(data.ads.content);
            $('[name=other_details]').change();

            $('[name=order_form_button]').click();
        });
    }

    function selectedListingUpgrades() {
        chrome.storage.local.get('ads', function (data) {
            $('[name=defpremcost]').prop('checked', true);
            $('[name=agcheck]').prop('checked', true);

            $('[name=Submit]').click();
        });
    }

    function upload() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                // $.each($('#upload-form').find('input'), function () {
                //     data.append($(this).attr('name'), $(this).val());
                // });
                data.append('supplyid', $('[name=supplyid]').val());
                data.append('picture' + (i + 1), images[i].file, images[i].name);
                var xhr = new XMLHttpRequest();
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.open('POST',  'https://www.cityleases.com/spider/' + $('#upload-form').attr('action'), true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        // var innerBody = xhr.responseText.replace(/([\n\r]|.)+<body[^>]+>/, '').replace(/<\/body[^>]*>([\n\r]|.)+/, '');
                        // $('body').html(innerBody);
                        if (++i < images.length && i <= 10) {
                          //  _uploadeimage(i);
                        } else {
                           alert('end');
                        }
                    }
                };
               xhr.send(data);
            }
        });
    }
});
