//https://www.louer.com/user/signup/

/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url.indexOf('user/signup') + 1) {
        signUp();
    } else if (url.indexOf('add/property') + 1) {
        property();
    }

    function signUp() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data);
            /**/$('#form_first_name').val(data.ads.name);
            $('#form_first_name').change();
            /**/$('#form_last_name').val(data.ads.l_name);
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
            /**/$('#form_password').val(data.ads.pass);
            $('#form_password').change();
            /**/$('#form_password_confirm').val(data.ads.pass);
            $('#form_password_confirm').change();
            console.log($('[alt=antispam]'));
            /**/captcha($('[alt=antispam]'), $('[alt=antispam]').prev('input'), {numeric: 1, min_len: 3, max_len: 4}, function () {
                $('input[type=submit]').click();
            });
        });
    }

    function property() {
        chrome.storage.local.get('ads', function (data) {
            console.log(data);
            $('#form_unit_type').bind('DOMSubtreeModified', function () {
                /**/if (data.ads.house_type == 'Apartment') {
                    /**/selector($('#form_unit_type'), 'Apartment');
                } else if (data.ads.house_type == 'House') {
                    /**/selector($('#form_unit_type'), 'Home');
                } else if (data.ads.house_type == 'Studio') {
                    /**/$('#form_loft_studio').prop('checked', true);
                } else if (data.ads.house_type == 'Commercial') {
                    /**/$('#form_office_building').prop('checked', true);
                }
            });
            /**/if (data.ads.house_type == 'Apartment') {
                $('#form_type').val('res');
                $('#form_type').change();
            } else if (data.ads.house_type == 'House') {
                $('#form_type').val('cot');
                $('#form_type').change();
            } else if (data.ads.house_type == 'Studio') {
                $('#form_type').val('com');
                $('#form_type').change();
            } else if (data.ads.house_type == 'Commercial') {

            }
            $('#form_city').bind('DOMSubtreeModified', function () {
                /**/selector($('#form_city'), data.ads.city.replace('Saint-', ''));
            });
            /**/selector($('#form_region'), data.ads.region);
        });
    }
});

