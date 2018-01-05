//http://nexthome.yp.ca/account/post-listing/#/steps/1

//todo loacationi xndir ka step chi ancni

/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'http://nexthome.yp.ca/account/post-listing/#/steps/1') {

        // setTimeout(function () {
            registration();
        // }, 3000)


    }else if(url.indexOf('ad-submitted') + 1){
        // getMail('no-reply@doodloo.com', function () {
        //     var pattern = /(https?:\/\/w{0,3}\.?doodloo.com\/activate-ad.php[^\s\r\n\t]+)/igm;
        //     var forClick =  pattern.exec($('#gh-mail-respons').html())[1].replace(/&amp;/g, '&').replace(/®/g, '&reg');
        //     window.location.href = forClick;
        // }, 300, true);

    }else if(url.indexOf('/activate-ad.php')){
        // nextSite(true);
    }else {
        // nextSite(false);
    }

    function registration() {

        chrome.storage.local.get('ads', function (data) {

            // $('[name=type_id]')[0].dispatchEvent(new Event('click'));

            var step1 = setInterval(function () {
                if( $('[name=step_1_form]').length > 0){

                    clearInterval(step1);
                    
                    // setTimeout(function () {
                    //    
                    // });

                    contactInfo();
                }

            }, 2000);

            var step2 = setInterval(function () {
                if( $('[name=step_2_form]').length > 0){

                    clearInterval(step2);

                    listingInfo();
                }
            }, 3000)


        });
    }


    function contactInfo() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('[name=first_name]').click();
            $('[name=first_name]').val(data.ads.name);
            $('[name=first_name]')[0].dispatchEvent(new Event('change'));


            /**/ $('[name=last_name]').click();
            $('[name=last_name]').val(data.ads.l_name);
            $('[name=last_name]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=email]').click();
            $('[name=email]').val(data.ads.email);
            $('[name=email]')[0].dispatchEvent(new Event('change'));



            /**/ $('[name=phone]').click();
            $('[name=phone]').val(data.ads.phone);
            $('[name=phone]')[0].dispatchEvent(new Event('change'));

            $('[name=show_phone]').prop('cheked', true);
            
            
            $('[name=step_1_form]').find('[type=submit]').click();
            $('[name=step_1_form]').find('[type=submit]')[0].dispatchEvent(new Event('click'));
            // console.log($('[name=step_1_form]').find('[type=submit]'))

        });
    }
    
    function listingInfo() {
        chrome.storage.local.get('ads', function (data) {

            //todo adress@ bdi dzvi

            //
            // /**/ $('[name=postal_code]').click();
            // $('[name=postal_code]').val(data.ads.postal_code);
            // $('[name=postal_code]')[0].dispatchEvent(new Event('change'));


            /**/ $('[name=postal_code]').click();
            $('[name=postal_code]').val(data.ads.postal_code);
            $('[name=postal_code]')[0].dispatchEvent(new Event('change'));


            /**/ $('[name=price_per_month]').click();
            $('[name=price_per_month]').val(data.ads.rent);
            $('[name=price_per_month]')[0].dispatchEvent(new Event('change'));


            /**/ $('[name=sqft]').click();
            $('[name=sqft]').val(Math.ceil(data.ads.apt_size * 10.7639) );
            $('[name=sqft]')[0].dispatchEvent(new Event('change'));

            switch (data.ads.house_type){
                case 'Studio':
                    selector($('[name=prop_type]'), 'COMMERCIAL & OFFICE SPACE');
                    break;
                case 'House':
                    selector($('[name=prop_type]'), 'TOWNHOUSE');
                    break;
                default:
                    selector($('[name=prop_type]'), data.ads.house_type);

            }


            var dateArray = /(\d+)-(\d+)-(\d+)/.exec(data.ads.available_date);
            var date = dateArray[3] + '/' + dateArray[2] + '/' + dateArray[1];

            /**/ $('[name=availability]').click();
            $('[name=availability]').val(date);
            $('[name=availability]')[0].dispatchEvent(new Event('change'));





            // 'Boucherville, QC, Canada'


            // $('[name=step_2_form]').find('[type=submit]').click();
            // $('[name=step_2_form]').find('[type=submit]')[0].dispatchEvent(new Event('click'));

            // selector($(['name=prop_type']), data.ads.house_type);


        });
    }


});



