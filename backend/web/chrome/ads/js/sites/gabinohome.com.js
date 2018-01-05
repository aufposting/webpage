//http://www.gabinohome.com/en/register
//http://www.gabinohome.com/en/verify?&email=ads.submiter@gmail.com&ce=222466_a8d267618v4w6y0
//http://www.gabinohome.com/en/advert_add
//http://www.gabinohome.com/en/advert_add?stage=7&type=free

//todo passord changed
//todo this site not worked for all regions.....nextSite(false) called in location()

/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url.indexOf('/www.gabinohome.com/en/register') +1) {
        registration();
    }else if(url.indexOf('/advert_add') +1 && url.indexOf('?stage=7&type=free') + 1 == false){

        if (document.cookie.search('verify') + 1 == false) {

            getMail('no-reply@gabinohome.com', function () {
                var pattern = /https?:\/\/.*?verify[^\"\']+/igm;
                var forClick =  pattern.exec($('#gh-mail-respons').html())[0].replace(/&amp;/g, '&').replace(/®/g, '&reg');
                console.log(forClick);

                document.cookie = "verify=" + true;
                window.location.href = forClick;
            }, 3000, true);
        }else {
            addDetails();
        }

    }else if(url.indexOf('/verify?&email') + 1){
        setTimeout(function () {
            window.location.href = '//www.gabinohome.com/en/advert_add';
        }, 3000)

    }else if(url.indexOf('?stage=7&type=free') + 1){
        chrome.storage.local.get('gabinohomePass', function (data) {
            nextSite({'pass': data.usedmontrealPass});
        });
    }else {
        nextSite(false);
    }




    function registration() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('[name="user_register[email]"]').click();
            $('[name="user_register[email]"]').val(data.ads.email);
            $('[name="user_register[email]"]')[0].dispatchEvent(new Event('keydown'));
            $('[name="user_register[email]"]')[0].dispatchEvent(new Event('keyup'));

            var pass = data.ads.pass.substr(0, 10);
            chrome.storage.local.set({'gabinohomePass': pass});

            /**/ $('[name="user_register[password]"]').click();
            $('[name="user_register[password]"]').val(pass);
            $('[name="user_register[password]"]')[0].dispatchEvent(new Event('keydown'));
            $('[name="user_register[password]"]')[0].dispatchEvent(new Event('keyup'));

            setTimeout(function () {
                $('#form_register').find('[type=submit]').click();
                $('#form_register').find('[type=submit]')[0].dispatchEvent(new Event('click'));


                setTimeout(function () {
                    window.location.reload();
                }, 3000)
            }, 2000)
        });
    }
    
    
    function addDetails() {
        chrome.storage.local.get('ads', function (data) {

            var step1 = setInterval(function () {
                if($('#private').length > 0){
                    clearInterval(step1);
                    contactDetails();
                }

            }, 2000);

            var step2 = setInterval(function () {
                if($('[name="add_offer[id_advert_type]"]').length > 0 && $('[name="add_offer[id_region]"]').length == 0){
                    clearInterval(step2);
                    advertType();
                }

            }, 2000);

            var step3 = setInterval(function () {
                if($('[name="add_offer[id_region]"]').length > 0 && $('[name="add_offer[title_en]"]').length ==0){
                    clearInterval(step3);
                    location();
                }

            }, 2000);

            var step4 = setInterval(function () {
                if( $('[name="add_offer[title_en]"]').length > 0){
                    clearInterval(step4);
                    addDescription();
                }

            }, 2000);


            var step5 = setInterval(function () {
                if($('[name="myfile[]"]').length > 0){
                    clearInterval(step5);
                    addPhoto();
                }

            }, 2000);

            var step6 = setInterval(function () {
                $('form').each(function () {
                    var action = String($(this).attr('action'));

                    if(String($(this).attr('action')).search('type=free') + 1){
                        clearInterval(step6);
                        /*******fINISH**********/

                        $(this).find('[type=submit]').click();
                        $(this).find('[type=submit]')[0].dispatchEvent(new Event('click'));

                        setTimeout(function () {
                            window.location.reload();
                        }, 3000);
                    }
                })
            }, 2000);

        })
    }

    function contactDetails() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('#private').prop('checked', true);
            $('#private')[0].dispatchEvent(new Event('click'));

            /**/ $('[name="user_contact[name]"]').click();
            $('[name="user_contact[name]"]').val(data.ads.name);
            $('[name="user_contact[name]"]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name="user_contact[surname]"]').click();
            $('[name="user_contact[surname]"]').val(data.ads.l_name);
            $('[name="user_contact[surname]"]')[0].dispatchEvent(new Event('change'));

            /*********CHOOSE COUNTRY AND PHONE EXTENSION*********/
            selector($('[name="user_contact[id_country]"]'), 'Canada');
            selector($('[name="user_contact[id_tel_1_prefix]"]'), 'Canada');

            /**/ $('[name="user_contact[tel]"]').click();
            $('[name="user_contact[tel]"]').val(data.ads.phone);
            $('[name="user_contact[tel]"]')[0].dispatchEvent(new Event('change'));

            setTimeout(function () {
                $('[name=add_this]').find('[type=submit]').click();
                $('[name=add_this]').find('[type=submit]')[0].dispatchEvent(new Event('click'));
                location.reload();
            }, 3000)

        });
    }

    function advertType() {
        chrome.storage.local.get('ads', function (data) {

            switch (data.ads.house_type){
                case 'Apartment':
                    /**/ $('[name="add_offer[id_advert_type]"][value="2"]').prop('checked', true);
                    $('[name="add_offer[id_advert_type]"][value="2"]')[0].dispatchEvent(new Event('click'));
                    break;
                case 'House':
                    /**/ $('[name="add_offer[id_advert_type]"][value="14"]').prop('checked', true);
                    $('[name="add_offer[id_advert_type]"][value="14"]')[0].dispatchEvent(new Event('click'));
                    break;
                case 'Studio':
                    /**/ $('[name="add_offer[id_advert_type]"][value="1"]').prop('checked', true);
                    $('[name="add_offer[id_advert_type]"][value="1"]')[0].dispatchEvent(new Event('click'));
                    break;
                case 'Commercial':
                    /**/ $('[name="add_offer[id_advert_type]"][value="10"]').prop('checked', true);
                    $('[name="add_offer[id_advert_type]"][value="10"]')[0].dispatchEvent(new Event('click'));
                    break;
            }

            setTimeout(function () {
                $('[name=add_this]').find('[type=submit]').click();
                $('[name=add_this]').find('[type=submit]')[0].dispatchEvent(new Event('click'));
            }, 3000)


        });

    }
    
    function location() {
        chrome.storage.local.get('ads', function (data) {

            /******CHOOSE REGION******/
            selector($('[name="add_offer[id_region]"]'), data.ads.region);

            if($('[name="add_offer[id_region]"]').val() == ''){

                console.warn('don\'t can find the region');
                setTimeout(function () {
                    /*******GO TO NEXT SITE******/
                    nextSite(false);
                }, 2000);

            }else {
                setTimeout(function () {
                    selector($('[name="add_offer[id_area]"]'), data.ads.city);

                    console.log(data.ads.city);

                    /******WHEN NOT FIND CITY******/
                    if($('[name*="[id_area]').val() == ''){
                        /**/ $('[name*="add_xtra[alt_area]"]').click();
                        $('[name*="add_xtra[alt_area]"]').val(data.ads.city);
                        $('[name*="add_xtra[alt_area]"]')[0].dispatchEvent(new Event('change'));
                        $('[name*="add_xtra[alt_area]"]')[0].dispatchEvent(new Event('keydown'));
                        $('[name*="add_xtra[alt_area]"]')[0].dispatchEvent(new Event('keyup'));
                    }

                    /**/ $('[name*=address_street_name]').click();
                    $('[name*=address_street_name]').val(data.ads.street);
                    $('[name*=address_street_name]')[0].dispatchEvent(new Event('change'));

                    /**/ $('[name="add_offer[address_street_number]"]').click();
                    $('[name="add_offer[address_street_number]"]').val(data.ads.address);
                    $('[name="add_offer[address_street_number]"]')[0].dispatchEvent(new Event('change'));

                    /**/ $('[name="add_offer[address_pc]"]').click();
                    $('[name="add_offer[address_pc]"]').val(data.ads.postal_code);
                    $('[name="add_offer[address_pc]"]')[0].dispatchEvent(new Event('change'));

                    setTimeout(function () {
                        $('[name=add_this]').find('[type=button]').click()
                        $('[name=add_this]').find('[type=button]')[0].dispatchEvent(new Event('click'));

                        $('#mod_ad_map').bind('DOMSubtreeModified', function () {
                            setTimeout(function () {
                                $('[name=add_this]').find('[type=submit]').click();
                                $('[name=add_this]').find('[type=submit]')[0].dispatchEvent(new Event('click'));

                            }, 5000)
                        });

                    }, 2000);

                }, 2000)

            }
        })
    }
    
    function addDescription() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('[name="add_offer[title_en]"]').click();
            $('[name="add_offer[title_en]"]').val(data.ads.title);
            $('[name="add_offer[title_en]"]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name="add_offer[comments_en]"]').click();
            $('[name="add_offer[comments_en]"]').val(data.ads.content);
            $('[name="add_offer[comments_en]"]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name="add_offer[price]"]').click();
            $('[name="add_offer[price]"]').val(data.ads.rent);
            $('[name="add_offer[price]"]')[0].dispatchEvent(new Event('change'));

            /*********CHOOSE COURSE*******/
            selector($('[name="add_offer[id_currency_type]"]'), 'American Dollars');
            /*********CHOOSE TAX Included *******/
            selector($('[name="add_offer[tax_included]"]'), 'Tax Included');

            /**/ $('[name="add_offer[size]"]').click();
            $('[name="add_offer[size]"]').val(data.ads.apt_size);
            $('[name="add_offer[size]"]')[0].dispatchEvent(new Event('change'));


            setTimeout(function () {
                $('#form_add_advert').find('[type=submit]').click();
                $('#form_add_advert').find('[type=submit]')[0].dispatchEvent(new Event('click'));
            }, 3000)

        })

    }


    function addPhoto() {
        getImages(function (images) {

            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                var uploadFolderPath = '';

                $('script').each(function () {
                    if($(this).text().search('www/vhosts/gabinohome.com') +1){
                        uploadFolderPath = /"(.*?gabinohome\.com\/httpdocs[^\"\']+)/igm.exec($(this).text())[1];
                    }
                });

                data.append('myfile', images[i].file, images[i].name);
                data.append('id_ad', $('[name=id_advert]').val());
                data.append('uploadFolder', uploadFolderPath);
                data.append('createThumbnail', false);
                data.append('createThumbnail', false);
                data.append('uploadedImageKeepOriginal', false);
                data.append('uploadedImageMaxHeight', '800');
                data.append('uploadedImageMaxWidth', '1024');

                var xhr = new XMLHttpRequest();
                xhr.open('post', '//www.gabinohome.com/includes/ajax/upload/upload.php', true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var response = JSON.parse(xhr.responseText);

                        if (++i < images.length) {
                            _uploadeimage(i);
                        }else{
                            setTimeout(function () {
                                /*******GO TO CONFIRM*******/
                                $('[name=add_this]').find('[type=submit]').click();
                                $('[name=add_this]').find('[type=submit]')[0].dispatchEvent(new Event('click'));
                            }, 3000)
                        }
                    }
                };
                xhr.send(data);
            }
        });

    }
});



