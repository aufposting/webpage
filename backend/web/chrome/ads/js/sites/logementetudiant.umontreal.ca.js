//http://logementetudiant.umontreal.ca/identification/#tab-1433182219425-2-8
//http://logementetudiant.umontreal.ca/inscription/?message=checkmail&uid=7751#tab-1433182219425-2-8
//http://logementetudiant.umontreal.ca/identification/?updated=account_active
//http://logementetudiant.umontreal.ca/ajouter-une-propriete/
//http://logementetudiant.umontreal.ca/tableau-de-bord/#tab-c7f51382-24df-9


/* global chrome */
jQuery(document).ready(function ($) {
    chrome.storage.local.get('ads', function (data) {
        /*******THIS SITE ONLY FOR Montreal city ******/
        if (data.ads.city != 'Montreal') {
            nextSite(false);
        }
    });

    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'http://logementetudiant.umontreal.ca/identification/#tab-1433182219425-2-8') {

        registration();
    } else if (url.indexOf('checkmail&uid') + 1) {
        getMail('logement@sae.umontreal.ca', function () {
            var pattern = /https?:\/\/.*/i;
            var forClick = pattern.exec($('#gh-mail-respons').html())[0].replace(/&amp;/g, '&');
            window.location.href = forClick;
        }, 300, true);
    } else if (url.indexOf('account_active') + 1) {
        login();
    } else if (url.indexOf('/ajouter-une-propriete') + 1 && $('.alert-danger').length ==0) {
        setTimeout(function () {
            addAllDetails();
        }, 5000)
    }else if(url.indexOf('/tableau-de-bord') + 1  || url.indexOf('/ajouter-une-propriete') + 1 && $('.alert-danger').length > 0){
        nextSite(true);
    }else {
        nextSite(false);
    }



    function registration() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $("[id=user_login-46]").click();
            $("[id=user_login-46]").val(data.ads.login);
            // $('[id=user_login-46]')[0].dispatchEvent(new Event('click'));

            /**/ $('[id=first_name-46]').click();
            $('[id=first_name-46]').val(data.ads.name);

            /**/ $('[id=last_name-46]').click();
            $('[id=last_name-46]').val(data.ads.l_name);

            /**/ $('[id=phone_number-46]').click();
            $('[id=phone_number-46]').val(data.ads.phone);

            /**/ $('[id=user_email-46]').click();
            $('[id=user_email-46]').val(data.ads.email);

            /**/ $('[id=user_password-46]').click();
            $('[id=user_password-46]').val(data.ads.pass);

            /**/ $('[id=confirm_user_password-46]').click();
            $('[id=confirm_user_password-46]').val(data.ads.pass);

            window.setTimeout(function () {
                /*-->*/$('[id=confirm_user_password-46]').parents('form').find('[type=submit]').click();
            }, 12000);

        });
    }


    function login() {
        chrome.storage.local.get('ads', function (data) {
            /**/ $('[id=ui-id-3]').parent().click();

            /**/ $('[id=username-25]').click();
            /**/ $('[id=username-25]').val(data.ads.email);

            /**/ $('[id=user_password-25]').click();
            /**/ $('[id=user_password-25]').val(data.ads.pass);

            setTimeout(function () {
                /*-->*/$('[id=user_password-25]').parents('form').find('[type=submit]').click();
            }, 8000);

        });
    }


    function addAllDetails() {
        addPhoto();
        addAdress();
        addDetails();
        addApartmentAmenities();

        chrome.storage.local.get('ads', function (data) {

            /**/ $('[id=title]').click();
            $('[id=title]').val(data.ads.title);

            /**/ $('[id=description]').click();
            $('[id=description]').val(data.ads.content);

            /**/ $('[id=property_price]').click();
            $('[id=property_price]').val(data.ads.rent);

            /**/ $('[id=property_label]').click();
            $('[id=property_label]').val('mensuel');
        });
    }


    function addPhoto() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                data.append('name',  images[i].name);
                data.append('aaiu_upload_file', images[i].file, images[i].name);
                var xhr = new XMLHttpRequest();
                xhr.open('post', '//logementetudiant.umontreal.ca/wp-admin/admin-ajax.php?action=me_upload&base=0&nonce=57fceec609', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var response = JSON.parse(xhr.responseText);

                        $('#imagelist').append(`<div class="uploaded_images" data-imageid="${response.attach}"><img src="${response.html}" alt="thumb"><i class="fa deleter fa-trash-o"></i> </div>`)

                        if (++i < images.length) {
                            _uploadeimage(i);
                        }else{
                            /******FINISH*******/
                            setTimeout(function () {
                                /*-->*/$('[id=new_post]').find('[type=submit]').click();
                            }, 15000);
                        }
                    }
                };
                xhr.send(data);
            }
        });
    }

    function addAdress() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('[id=property_address]').click();
            $('[id=property_address]').val(data.ads.address);

            /**/ $('[id=property_city_submit]').click();
            $('[id=property_city_submit]').val("Montréal");
            // $('[id=property_city_submit]')[0].dispatchEvent(new Event('click'));

            selector($('[id=property_area_submit]'), data.ads.zone);

            /**/ $('[id=property_zip]').click();
            $('[id=property_zip]').val(data.ads.postal_code);

            /**/ $('[id=property_county]').click();
            $('[id=property_county]').val('Québec');

            /**/ $('[id=property_country]').click();
            $('[id=property_country]').val('Canada');

            setTimeout(function () {
                /**/ $('[id=google_capture]').click();
                $('[id=google_capture]')[0].dispatchEvent(new Event('click'));
            }, 7000);

        });

    }

    function addDetails() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('[id=property_size]').click();
            $('[id=property_size]').val(data.ads.apt_size);

            /**/ $('[id=property_bedrooms]').click();
            $('[id=property_bedrooms]').val(data.ads.bedroom);

            /**/ $('[id=property_bathrooms]').click();
            $('[id=property_bathrooms]').val(data.ads.bathroom);

            /**/ $('[id=disponible]').click();
            $('[id=disponible]').val(data.ads.available_date);

            /**/ $('[id=prop_category_submit]').click();
            $('[id=prop_category_submit]').val('2');

            /**/ $('[id=property_status]').click();
            $('[id=property_status]').val('normal');

        });
    }

    function addApartmentAmenities() {
        chrome.storage.local.get('ads', function (data) {
            for (var key in data.ads.apartment_amenities) {

                switch (data.ads.apartment_amenities[key]) {
                    case 'Furniture':
                        $('[id=meuble]').click();

                        break;
                    case 'Fridge':
                        $('[id=refrigerateur]').click();
                        break;
                    case 'Washer/Dryer':
                        $('[id=entree_laveusesecheuse]').click();
                        break;
                    case 'Washer':
                        $('[id=laveuse]').click();
                        break;
                    case 'Heating':
                        $('[id=chauffage_inclus]').click();
                        break;
                    case 'Electricity':
                        $('[id=electricite_incluse]').click();
                        break;
                    case 'Hot Water':
                        $('[id=eau_chaude_incluse]').click();
                        break;
                    case 'Internet Ready':
                        $('[id=internet]').click();
                        break;
                    case 'Cable(TV)':
                        $('[id=television_par_cable]').click();
                        break;
                    case 'Laundry In-Building':
                        $('[id=buanderie_dans_limmeuble]').click();
                        break;
                    case 'Private Bathroom':
                        $('[id=salle_de_bain_privee]').click();
                        break;
                    case 'Handicap':
                        $('[id=acces_handicape]').click();
                        break;
                    case 'Indoor Parking':
                    case 'outdoor Parking':
                    case 'Assigned Parking':
                        $('[id=stationnement]').prop('checked', true);
                        break;
                }
            }

            if (data.ads.pets == '1') {
                $('[id=animaux_acceptes]').click();
            }

        });
    }
});



