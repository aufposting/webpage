//http://canada.oodle.com/local/montreal-qc/

//todo nextSit(true) called in afterImageUpload() function
//TODO menak verji confirm@ bdi dzvi

/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url.indexOf('canada.oodle.com/local') + 1  && $("#sign-in-link").length > 0) {
        registration();
    } else if (url.indexOf('canada.oodle.com/local') + 1 && $("#sign-in-link").length == 0 ) {
        addDetails();
    }
    else {
        nextSite(false);
    }

    function registration() {
        chrome.storage.local.get('ads', function (data) {
            var windowSelected = false;
            var windowCreateAccount = false;
            var sendEmail = false;

            /**/
            $("#sign-in-link").click();
            $("#sign-in-link")[0].dispatchEvent(new Event('click'));

            $('body').bind('DOMSubtreeModified', function () {

                if ($("#create-submit-container").length > 0 && !windowSelected) {
                    windowSelected = true;
                    $("#create-submit-container").find('span').click();
                }


                if ($("#authNewAccountForm_first_name").length > 0 && !windowCreateAccount) {
                    windowCreateAccount = true;

                    setTimeout(function () {
                        /**/
                        $('[id=authNewAccountForm_first_name]').click();
                        $('[id=authNewAccountForm_first_name]').val(data.ads.name);


                        /**/
                        $('[id=authNewAccountForm_last_name]').click();
                        $('[id=authNewAccountForm_last_name]').val(data.ads.l_name);

                        selector($('#authNewAccountForm_locationForm_countryCode'), 'Canada');

                        /**/
                        $('[id=authNewAccountForm_locationForm_location]').click();
                        $('[id=authNewAccountForm_locationForm_location]').val(data.ads.city);

                        /**/
                        $('[id=authNewAccountForm_email]').click();
                        $('[id=authNewAccountForm_email]').val(data.ads.email);

                        /**/
                        $('[id=authNewAccountForm_password1]').click();
                        $('[id=authNewAccountForm_password1]').val(data.ads.pass);

                        /**/
                        $('[id=authNewAccountForm_password2]').click();
                        $('[id=authNewAccountForm_password2]').val(data.ads.pass);

                        $('#authNewAccountForm').find('[type=submit]').click();

                        setTimeout(function () {
                            window.location.href = window.location.href + '?new=new';
                        }, 3000);

                    }, 3000)
                }

            });
        });
    }


    function addDetails() {
        chrome.storage.local.get('ads', function (data) {

            setTimeout(function () {
                /**/
                $('#post-listing-holder').find('a').click();
                $("#post-listing-holder").find('a')[0].dispatchEvent(new Event('click'));
            }, 2000);

            var listingPost = false;
            $('body').bind('DOMSubtreeModified', function () {

                if ($('#container_post #listingForm_body').length > 0 && $('#listingForm_categoryId-container span').length > 0 && !listingPost) {
                    /*******FILE UPLOAD********/
                    addPhoto();
                    /**/
                    $('[id=listingForm_title]').click();
                    $('[id=listingForm_title]').val(data.ads.title);

                    /**/
                    $('#container_post #listingForm_body').click();
                    $('[id=listingForm_body]').val(data.ads.content);

                    listingPost = true;
                }
            });

        });
    }


    function addPhoto() {
        getImages(function (images) {
            var uniqueId = 2;

            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                data.append('name',  images[i].name);
                data.append('temp_image_pmg_id_' + uniqueId, images[i].file, images[i].name);
                uniqueId += 2;

                var xhr = new XMLHttpRequest();
                xhr.open('post', '//canada.oodle.com/post2/uploadPhoto/', true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var response = JSON.parse(xhr.responseText);

                        $('#sg-container-1').css({display: 'block'});

                        $('#sgallery-1').append(`<li 
                                                id="${response.key.replace(/\//g, '_')}" ><input type="hidden" 
                                                name="listingForm[media][${response.key.replace(/\//g, '_')}] " 
                                                value="${response.key}" class="key post-media-type-image">
                                                <img src="${response.image_url}" title="${response.caption}">
                                                <span class="remove-img" onclick="jQ(this).closest('#container_post').postMediaGallery('remove', ${response.key.replace(/\//g, '_')})"></span>
                                                <input type="hidden" name="listingForm[media][${response.key.replace(/\//g, '_')}][caption]" value="${response.caption}">
                                            </li>`);

                        if (++i < images.length) {
                            _uploadeimage(i);
                        }else{
                            /*****ADD NEXT INFORMATION********/
                            afterImageUpload();
                        }
                    }
                };
                xhr.send(data);
            }
        });

    }
    
    function afterImageUpload() {
        chrome.storage.local.get('ads', function (data) {

                $('.category-list').css({display: 'block'});
                $('.location-panel').css({display: 'block'});

                /**/
                $('[id=cata-549]').click();
                $('#cata-549')[0].dispatchEvent(new Event('click'));

                switch (data.ads.house_type) {
                    case 'Apartment':
                        /**/
                        $('[id=cata-550]').click();
                        $('#cata-550')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'House':
                        /**/
                        $('[id=cata-557]').click();
                        $('#cata-557')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Studio':
                        /**/
                        $('[id=cata-564]').click();
                        $('#cata-564')[0].dispatchEvent(new Event('click'));
                        break;
                    case 'Commercial':
                        /**/
                        $('[id=cata-553]').click();
                        $('#cata-553')[0].dispatchEvent(new Event('click'));
                        break;
                }

                /**/
                $('[id=listingForm_attributes_housing_rent_bedrooms]').click();
                $('[id=listingForm_attributes_housing_rent_bedrooms]').val(data.ads.bedroom);

                /**/
                $('[id=listingForm_attributes_housing_rent_bathrooms]').click();
                $('[id=listingForm_attributes_housing_rent_bathrooms]').val(data.ads.bathroom);

                /**/
                $('[id=listingForm_price]').click();
                $('[id=listingForm_price]').val(data.ads.rent);
                $('#listingForm_price')[0].dispatchEvent(new Event('change'));

                /**/
                $('[id=listingForm_attributes_housing_rent_square_feet]').click();
                $('[id=listingForm_attributes_housing_rent_square_feet]').val(data.ads.apt_size);

                /**/
                $('[id=listingForm_attributes_housing_rent_address]').click();
                $('[id=listingForm_attributes_housing_rent_address]').val(data.ads.street);


                if (data.ads.pets == '1') {
                    $('[id=listingForm_attributes_housing_rent_pets_allowed]').val('Cats|Dogs');
                } else {
                    $('[id=listingForm_attributes_housing_rent_pets_allowed]').val('None');
                }

                selector($('#listingForm_locationForm #listingForm_locationForm_countryCode'), 'Canada');

                /**/
                $('[id=listingForm_locationForm_location]').click();
                $('[id=listingForm_locationForm_location]').val(data.ads.city);

                $('body').append('<iframe name="normUser"></iframe>');
                $('.post-form').attr('target', 'normUser');

                setTimeout(function () {
                    jQuery(jQuery('.post-form')[1]).submit();

                    setInterval(function () {
                        if( $('[name=normUser]').contents().text().search('result":"okay"') +1 ){
                            $('script').remove();

                            setTimeout(function () {
                                /*****FINISHED AND GO TO NEXT SITE******/
                                nextSite(true);
                            }, 3000);
                        }
                    }, 1000);

                }, 3000);
        });
    }

});




