//http://www.classifiedclan.com/post/PostListing.aspx?countryId=25&stateId=2866&gId=2&dId=48
//http://www.classifiedclan.com/post/PostReview.aspx?countryid=25&stateid=2866&gid=2&did=48&postIdent=7ee070bb-5d25-4958-8e7f-3aa0ea37af01
//http://www.classifiedclan.com/post/PostConfirmation.aspx?postIdent=ed90353f-de04-41aa-8087-addc10959f0a

/* global chrome, captchaStatus*/


jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'http://www.classifiedclan.com/post/PostListing.aspx?countryId=25&stateId=2866&gId=2&dId=48'
            && !($('#cphContent_lblStatus').length && $('#cphContent_lblStatus').html().indexOf('Duplicate posting') + 1)
            ) {
        uploadeImage();
    } else if (url.indexOf('&postIdent=') + 1) {
        accept();
    } else if (url.indexOf('/PostConfirmation') + 1) {
        //TODO the site don't send Email for confirm
        nextSite(false);
    } else {
        nextSite(false);
    }



    function uploadeImage() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                $.each($('input'), function () {
                    if ($(this).attr('type') != 'checkbox' || $(this).attr('type') != 'radio' || ($(this).attr('type') == 'checkbox' && !$(this).is(':checked')) || ($(this).attr('type') == 'radio' && !$(this).is(':checked')))
                        data.append($(this).attr('name'), $(this).val());
                });
                data.append('ctl00$cphContent$fileUploadImage', images[i].file, images[i].name);
                var xhr = new XMLHttpRequest();
                xhr.open('post', $('form').attr('action'), true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var innerBody = xhr.responseText.replace(/([\n\r]|.)+<body[^>]+>/, '').replace(/<\/body[^>]*>([\n\r]|.)+/, '');
                        $('body').html(innerBody);
                        if (++i < images.length) {
                            _uploadeimage(i);
                        } else {
                            $('body').html(innerBody);
                            insertData();
                        }
                    }
                };
                xhr.send(data);
            }
        });
    }

    function insertData() {
        chrome.storage.local.get('ads', function (data) {
            /**/ $('#cphContent_txtTitle').val(data.ads.title);
            $('#cphContent_txtTitle').change();
            /**/ $('#cphContent_txtDescription').val(data.ads.content);
            $('#cphContent_txtDescription').change();
            /**/ $('#cphContent_txtLocation').val(data.ads.address + ' ' + data.ads.street + ', ' + data.ads.city + ', ' + data.ads.region);
            $('#cphContent_txtLocation').change();
//            /**/ $('#cphContent_txtReference').click();
//            $('#cphContent_txtReference');
            /**/$('#cphContent_txtPrice').val(data.ads.rent);
            $('#cphContent_txtPrice').change();
            /**/$('#cphContent_txtSize').val(data.ads.apt_size);
            $('#cphContent_txtSize').change();
            /**/ $('#cphContent_txtMapAddressLine1').click();
            $('#cphContent_txtMapAddressLine1').val(data.ads.address);
            /**/ $('#cphContent_txtMapCity').click();
            $('#cphContent_txtMapState').val(data.ads.city);
            /**/ $('#cphContent_txtMapState').click();
            $('#cphContent_txtMapCity').val(data.ads.region);
            /**/ $('#cphContent_txtMapCountry').click();
            $('#cphContent_txtMapCountry').val('Canada');
            /**/ $('#cphContent_dlAttributes_chkAttribute_0').click();
            /**/ if (data.ads.pets == '1') {
                $('#cphContent_dlAttributes_chkAttribute_1').click();
                $('#cphContent_dlAttributes_chkAttribute_2').click();
            }
            /**/ $('#cphContent_dlPermissions_chkPermission_0').click();
            /**/ $('#cphContent_rdVisivility3').click();
            /**/ $('#cphContent_txtEmail').click();
            $('#cphContent_txtEmail').val(data.ads.email);
            /**/ $('#cphContent_txtEmailConfirm').click();
            $('#cphContent_txtEmailConfirm').val(data.ads.email);
            /*-->*/ $('#cphContent_btnSubmit').click();
        });
    }

    function accept() {
        /**/ $('#cphContent_chkAcceptTerms').click();
        $('#cphContent_txtVarification');
        captcha($('#cphContent_imgVarification').parent('.floatLeftCell'), $('#cphContent_txtVarification'), {numeric: 2, min_len: 3, max_len: 4}, function () {
            $('#cphContent_btnSubmit').click();
        });
    }
});

