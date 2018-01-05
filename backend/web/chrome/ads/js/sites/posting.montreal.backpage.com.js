//http://posting.montreal.backpage.com/online/classifieds/PostAdPPI.html/ymx/montreal.backpage.com/?serverName=montreal.backpage.com&superRegion=Montreal&u=ymx&section=4376&category=4416

//TODO step2 chi erta

/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url.indexOf('superRegion=') + 1) {
        step1();
    }
    // else if(url.indexOf('ad-submitted') ){
    //
    //     // getMail('no-reply@doodloo.com', function () {
    //     //     var pattern = /(https?:\/\/w{0,3}\.?doodloo.com\/activate-ad.php[^\s\r\n\t]+)/igm;
    //     //     var forClick =  pattern.exec($('#gh-mail-respons').html())[1].replace(/&amp;/g, '&').replace(/®/g, '&reg');
    //     //
    //     //     window.location.href = forClick;
    //     // }, 300, true);
    // }else {
    //
    //     // nextSite(false);
    // }

    function step1() {
        //TODO add photo
        addPhoto();

        chrome.storage.local.get('ads', function (data) {

            console.log(data.ads);

            /**/
            $("[name=title]").click();
            $('[name=title]').val(data.ads.title);
            // $('[name=title]').parent()[0].dispatchEvent(new Event('click'));

            /**/
            $("[name=ad]").click();
            $('[name=ad]').val(data.ads.content);

            exchange(data.ads.rent, function (currencyForCanada) {
                /**/
                $("[name=price]").click();
                $('[name=price]').val(currencyForCanada);
            });

            /**/
            $("[name=regionOther]").click();
            $('[name=regionOther]').val(data.ads.region);

            if (data.ads.bedroom >= 8) {
                selector($("[name=bedrooms]"), '8');
            } else {
                selector($("[name=bedrooms]"), data.ads.bedroom);
            }

            if (data.ads.pets == '1') {
                $("[name=petsAccepted][value='Cats Ok']").click();
                $("[name=petsAccepted][value='Dogs Ok']").click();
            }

            /**/
            $("[name=mapAddress]").click();
            $('[name=mapAddress]').val(data.ads.street);

            /**/
            $("[name=mapZip]").click();
            $('[name=mapZip]').val(data.ads.postal_code);

            /**/
            $("[name=email]").click();
            $('[name=email]').val(data.ads.email);

            /**/
            $("[name=emailConfirm]").click();
            $('[name=emailConfirm]').val(data.ads.email);

            /**/
            $("[name=allowReplies][value='Anonymous']").prop('checked', true);

            /**/
            $("[name=mobileNumber]").click();
            $('[name=mobileNumber]').val(data.ads.phone);

            selector($("[name=mobileNumberCountry]"), 'Canada');

            /**/
            $("[name=showAdLinks]").prop('checked', true);
            /**/
            $("[name=moveAdToTop]").prop('checked', false);
            /**/
            $("[name=autoRepostAd]").prop('checked', false);
            /**/
            $("[name=sponsorAd]").prop('checked', false);


            console.log($('[name=f]').find('[type=submit]'));

            // /*-->*/$('[name=f]').find('[type=submit]').click();
            // $('[name=f]')[0].dispatchEvent(new Event('click'));

        });
    }
});


function addPhoto() {
    chrome.storage.local.get('ads', function (data) {


    });
}



