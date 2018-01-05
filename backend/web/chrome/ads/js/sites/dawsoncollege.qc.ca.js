//http://www2.dawsoncollege.qc.ca/stsv/housing/register.php
//http://www2.dawsoncollege.qc.ca/stsv/housing/index.php
//http://www2.dawsoncollege.qc.ca/stsv/housing/myhomes.php
//http://www2.dawsoncollege.qc.ca/stsv/housing/insert.php
//http://www2.dawsoncollege.qc.ca/stsv/housing/confirm.php



/* global chrome */
jQuery(document).ready(function ($) {
    chrome.storage.local.get('ads', function (data) {
        /*******THIS SITE ONLY FOR Montreal city ******/
        if (data.ads.city != 'Montreal') {
            nextSite(false);
        }
    });
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'http://www2.dawsoncollege.qc.ca/stsv/housing/register.php' && $("[name=form]").length > 0) {
        /*******FOR NEW REGISTRATION MUST DELETE COOKIES*******/
        registration();

    } else if (url == 'http://www2.dawsoncollege.qc.ca/stsv/housing/register.php' && $("[name=form]").length == 0) {

        getMail('ssd@dawsoncollege.qc.ca', function () {
            var pattern = /password:\s?([^\s]+)/igm;
            var password = pattern.exec($('#gh-mail-respons').html())[1];

            document.cookie = "pass=" + password;
            window.location.href = 'http://www2.dawsoncollege.qc.ca/stsv/housing/index.php';

        }, 300, true);

    } else if (url.indexOf('housing/index.php') + 1) {
        login();
    } else if (url == 'http://www2.dawsoncollege.qc.ca/stsv/housing/myhomes.php') {
        var cookie = document.cookie.split(';');

        for (var key in cookie) {
            if (cookie[key].search('inserted') + 1) {
                nextSite(true);
                return;
            }
        }

        $('[name=insert]').click();

    } else if (url == 'http://www2.dawsoncollege.qc.ca/stsv/housing/insert.php') {
        addInfo();
    } else if (url == 'http://www2.dawsoncollege.qc.ca/stsv/housing/confirm.php') {
        confirm();
    }else{
        nextSite(false);
    }




    function registration() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $("[name=email]").click();
            $('[name=email]').val(data.ads.email);

            /**/ $("[name=fname]").click();
            $("[name=fname]").val(data.ads.name);

            /**/ $('[name=lname]').click();
            $('[name=lname]').val(data.ads.l_name);


            /**/ $('[name=phone1]').click();
            $('[name=phone1]').val(data.ads.phone.substr(0, 3));

            /**/ $('[name=phone2]').click();
            $('[name=phone2]').val(data.ads.phone.substr(3, 3));

            /**/ $('[name=phone3]').click();
            $('[name=phone3]').val(data.ads.phone.substr(6, 4));


            /*-->*/$('[name=form]').find('[type=image]').click();

        });
    }

    function login() {
        chrome.storage.local.get('ads', function (data) {

            /*****GET PASS IN COOKIES******/

            var cookie = document.cookie.split(';');

            for (var key in cookie) {
                if (cookie[key].search('pass') + 1) {
                    var password = /pass=(.*)/ig.exec(cookie[key])[1]
                }
            }

            /**/ $('[name=UserName]').click();
            $('[name=UserName]').val(data.ads.email);

            /**/ $('[name=Password]').click();
            $('[name=Password]').val(password);


            /*-->*/$('[name=login]').find('[type=image]').click();

        });
    }

    function addInfo() {

        chrome.storage.local.get('ads', function (data) {

            addExtraFeatures();
            document.cookie = "inserted=true";

            /**/$('[name=type]').click();
            $('[name=type]').val("1");

            /**/$('[name=size]').click();
            $('[name=size]').val(data.ads.bedroom);


            /****CHOOSE LOCATION*******/
            console.log(data.ads.region);
            selector($('[name=location]'), 'Montreal');

            var availabilityMonthInt = data.ads.available_date.substr(5, 2);
            var monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            if (availabilityMonthInt.indexOf(0) == 0) {
                availabilityMonthInt = availabilityMonthInt.replace(0, '');
            }
            var availabilityMonthStr = monthNames[availabilityMonthInt - 1];

            /****CHOOSE Availability DATE*******/
            selector($('[name=availability]'), availabilityMonthStr);

            /**/$('[name=price]').click();
            $('[name=price]').val(data.ads.rent);

            /**/$('[name=comments]').click();
            $('[name=comments]').val(data.ads.content);



            setTimeout(function () {
                /*-->*/$('[name=form]').find('input[type=image]').click();
                $('[name=form]').find('input[type=image]')[0].dispatchEvent(new Event('click'));
            }, 5000);



        });

    }

    function confirm() {
        /**/$('[name=save]').click();
        $('[name=save]')[0].dispatchEvent(new Event('click'));

        window.location.href = 'http://www2.dawsoncollege.qc.ca/stsv/housing/myhomes.php';
    }

    function addExtraFeatures() {

        chrome.storage.local.get('ads', function (data) {
            if (data.ads.pets == 1) {
                /**/$('[name=pets]').click();
            }

            for (var key in data.ads.apartment_amenities) {

                switch (data.ads.apartment_amenities[key]) {
                    case "Fridge":
                        /**/$('[name=fridge]').click();
                        $('[name=fridge]')[0].dispatchEvent(new Event('click'));
                        break;
                    case "Stove":
                        /**/$('[name=stove]').click();
                        $('[name=stove]')[0].dispatchEvent(new Event('click'));
                        break;
                    case "Washer":
                        /**/$('[name=washing]').click();
                        $('[name=washing]')[0].dispatchEvent(new Event('click'));
                        break;
                    case "Furniture":
                        /**/$('[name=furniture]').click();
                        $('[name=furniture]')[0].dispatchEvent(new Event('click'));
                        break;
                    case "Smoking":
                        /**/$('[name=smoking]').click();
                        $('[name=smoking]')[0].dispatchEvent(new Event('click'));
                        break;
                    case "Heating":
                        /**/$('[name=heat]').click();
                        $('[name=heat]')[0].dispatchEvent(new Event('click'));
                        break;
                    case "Electricity":
                        /**/$('[name=electrical]').click();
                        $('[name=electrical]')[0].dispatchEvent(new Event('click'));
                        break;
                }
            }
        });
    }



});



