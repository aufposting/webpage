//http://www.city-data.com/forum/registeradv.php


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url == 'http://www.city-data.com/forum/registeradv.php') {
        
        registration();


    } else if (url == '') {

        // window.location.href = 'http://elistr.com/index.php?a=cart&action=process&main_type=classified&step=classified%3Acategory&b=232&c=terminal';

    }


    else {
        if (url == 'http://elistr.com/index.php?a=cart&action=process&main_type=classified&step=other_details') {
            //TODO UPDATE

        }
//         nextSite();
    }


    function registration() {
        chrome.storage.local.get('ads', function (data) {
            /**/ $('[name=username]').click();
            $('[name=username]').val(data.ads.login);

            /**/ $('[name=password]').click();
            $('[name=password]').val(data.ads.pass);


            /**/ $('[name=passwordconfirm]').click();
            $('[name=passwordconfirm]').val(data.ads.pass);

            /**/ $('[name=email]').click();
            $('[name=email]').val(data.ads.email);

            /**/ $('[id=cb_rules_agree]').click();


            /**/ $('[id=ctb_field28]').click();
            $('[id=ctb_field28]').val(data.ads.postal_code);



            /*-->*/$('form').find('[type=submit]').click();


        });
    }





});


