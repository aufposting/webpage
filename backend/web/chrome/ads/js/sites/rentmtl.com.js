//http://www.rentmtl.com/editRegistration.do?action=Create
//http://www.rentmtl.com/prepareMap.do
//http://www.rentmtl.com/logon.jsp
//http://www.rentmtl.com/account.jsp
//http://www.rentmtl.com/editAd.do?action=Create&username=
//http://www.rentmtl.com/account.jsp

/* global chrome */
jQuery(document).ready(function ($) {
    chrome.storage.local.get('ads', function (data) {
        /*******THIS SITE ONLY FOR Montreal city ******/
         if (data.ads.city != 'Montreal') {
             nextSite(false);
         }
    });


    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'http://www.rentmtl.com/editRegistration.do?action=Create') {
        registration();
    }else if(url == 'http://www.rentmtl.com/prepareMap.do'){
        window.location.href = 'http://www.rentmtl.com/logon.jsp';
    }else if(url == 'http://www.rentmtl.com/logon.jsp'){
        login();
    }else if(url == 'http://www.rentmtl.com/account.jsp' && $("[class=enabled]").length == 0){
        window.location.href = 'http://www.rentmtl.com/editAd.do?action=Create&username=';
    }else if(url.indexOf('Create&username') + 1 ){
        addDetails();
    }else if(url == 'http://www.rentmtl.com/account.jsp' && $("[class=enabled]").length > 0){
        chrome.storage.local.get('ads', function (data) {
            var login = data.ads.login.replace(/\W+/g, '');
            var pass  = 123456;
            nextSite({'login':login, 'pass': pass});
        });

    }else {
        nextSite(false);
    }


    function registration() {
        chrome.storage.local.get('ads', function (data) {

            var login = data.ads.login.replace(/\W+/g, '');
            var pass  = 123456;

            /**/ $("[name=username]").click();
            $("[name=username]").val(login);
            // $('[name=username]')[0].dispatchEvent(new Event('click'));

            /**/ $("[name=password]").click();
            /**/ $("[name=password]").val(pass);

            /**/ $("[name=password2]").click();
            $("[name=password2]").val(pass);

            /**/ $("[name=fullName]").click();
            $("[name=fullName]").val(data.ads.name + ' ' + data.ads.l_name);

            /**/ $("[name=email]").click();
            $("[name=email]").val(data.ads.email);

            /**/ $("[name=phone]").click();
            $("[name=phone]").val(data.ads.phone);

            $("[name=language]").val('en');

            /*-->*/$('[name=registrationForm]').find('[type=submit][name!=doneButton]').click();
        });
    }

    function login() {
        chrome.storage.local.get('ads', function (data) {
            var login = data.ads.login.replace(/\W+/g, '');
            var pass  = 123456;

            /**/ $("[name=username]").click();
            $("[name=username]").val(login);

            /**/ $("[name=password]").click();
            $("[name=password]").val(pass);

            /*-->*/$('[name=logonForm]').find('[type=submit]').click();
        });
    }

    function addDetails() {
        chrome.storage.local.get('ads', function (data) {
            /**/ $("[name=type][value='RN00030001']").click();
            $("[name=type][value='RN00030001']")[0].dispatchEvent(new Event('click'));

            /**/ $("[name=name]").click();
            $("[name=name]").val(data.ads.title);

            selector($("[name=area]"), data.ads.zone);

            $("[name=priceValue]").click();
            $("[name=priceValue]").val(data.ads.rent);


            $("[name=text]").click();
            $("[name=text]").val(data.ads.content + '\n phone: ' + data.ads.phone + '\n email: ' + data.ads.email);


            $("[name=allIncl]").click();

            for(var key in data.ads.apartment_amenities){
                switch (data.ads.apartment_amenities[key]){
                    case 'Indoor Parking':
                    case 'outdoor Parking':
                        $("[name=parking]").prop('checked', true);
                        break;
                }
            }

            $("[name=postalCode]").click();
            $("[name=postalCode]").val(data.ads.postal_code);

            /****FINISHED*******/
            /*-->*/$('[type=submit][name=saveAd]').click();
        });
    }

});