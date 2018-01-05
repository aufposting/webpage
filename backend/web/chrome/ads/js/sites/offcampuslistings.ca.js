//https://offcampuslistings.ca/my-account.html?confirmationCourriel=1&l=en
//https://offcampuslistings.ca/my-account.html?succesFormInscription=true
//https://offcampuslistings.ca/main.cfm?l=en&p=05_200
//https://offcampuslistings.ca/main.cfm?l=en&p=05_220
//https://offcampuslistings.ca/main.cfm?l=en&p=05_221&succesFormAnnonce=true&id1=
//https://offcampuslistings.ca/main.cfm?l=en&p=05_222&succesFormAnnoncePaiement=true&id1=
//https://offcampuslistings.ca/main.cfm?l=en&p=05_223&succesFormAnnonceFacturation=true&id1=

//TODO peymant system


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'https://offcampuslistings.ca/my-account.html') {
        registration();
    }else if(url.indexOf('succesFormInscription')+1){
        //TODO email click

        getMail('info@mcgill.ca', function () {
            var pattern = /<p>[\n\r\t\s]*(https?:\/\/[^<]+)/igm;
            var forClick =  pattern.exec($('#gh-mail-respons').html())[1].replace('&amp;', '&');

            window.location.href = forClick;
        }, 300, true);
    }

    else if (url.indexOf('confirmationCourriel')+1) {
        login();
    }else if(url.indexOf('p=05_200')+1){
        window.location.href = 'https://offcampuslistings.ca/main.cfm?l=en&p=05_220';
    }else if(url.indexOf('p=05_220')+1 ){
        location();
    }else if(url.indexOf('p=05_221')+1){
         $('[id=btn_paiement]').click();
    }else if(url.indexOf('p=05_222')+1){
        paymentInfo();
    } else if(url.indexOf('p=05_223')+1){
        /*-->*/$('form').find('[type=submit]').click();
    }

    // else {
    //     if (url == '') {
    //         //TODO UPDATE
    //
    //     }
    //   nextSite();
    // }


    function registration() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('[id=Prenom]').click();
            $('[id=Prenom]').val(data.ads.name);

            /**/ $('[id=Nom]').click();
            $('[id=Nom]').val(data.ads.l_name);

            /**/ $('[id=Courriel]').click();
            $('[id=Courriel]').val(data.ads.email);


            /**/ $('[id=MotPasse]').click();
            $('[id=MotPasse]').val(data.ads.pass);

            /**/ $('[id=ConfirmeMotPasse]').click();
            $('[name=ConfirmeMotPasse]').val(data.ads.pass);


            /*-->*/$('[id=ConfirmeMotPasse]').parents('form').find('[type=submit]').click();
        });
    }

    function login() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('[id=username]').click();
            $('[id=username]').val(data.ads.email);

            /**/ $('[id=MotPasse2]').click();
            $('[id=MotPasse2]').val(data.ads.pass);


            /*-->*/$('form').find('[type=submit]').click();
        });
    }
    function location() {
        chrome.storage.local.get('ads', function (data) {

            //TODO select_option-i mej bazain harmar house_type menak apartment@ ka
            /**/ $('[id=type]').click();
            switch (data.ads.house_type) {
                case "Apartment":
                    $("[id=type]").val('1');
                    break;
                case "House":
                    // $("[id=type]").val('');
                    break;
                case "Studio":
                    // $("[id=type]").val('');
                    break;
                case "Commercial":
                    // $("[id=type]").val('');
                    break;
            }


            if(data.ads.contact_person == "person"){
                $('[id=IdentiteResponsable_Prop]').click();
            }else {
                $('[id=IdentiteResponsable_Autre]').click();
            }
            /**/ $('[id=resp_Nom]').click();
            $('[id=resp_Nom]').val(data.ads.name);

            /**/ $('[id=resp_Tel]').click();
            $('[id=resp_Tel]').val(data.ads.phone);

            /**/ $('[id=resp_Courriel]').click();
            $('[id=resp_Courriel]').val(data.ads.email);


            /**/ $('[id=Adresse]').click();
            $('[id=Adresse]').val(data.ads.address);

            /**/ $('[id=CP]').click();
            $('[id=CP]').val(data.ads.postal_code);

            /**/ $('[id=CoinRue]').click();
            $('[id=CoinRue]').val(data.ads.street);


            /**/ $('[id=zone]').click();
            switch  (data.ads.zone){
                case "Milton-Parc":
                    $('[id=zone]').val("1");
                    break;
                case "West of Campus":
                    $('[id=zone]').val("2");
                    break;
                case "Around MAC campus":
                    $('[id=zone]').val("3");
                    break;
                case "Concordia Area":
                    $('[id=zone]').val("4");
                    break;
                case "Lower Plateau":
                    $('[id=zone]').val("5");
                    break;
                case "UQAM/The Village":
                    $('[id=zone]').val("6");
                    break;
                case "Hampstead":
                    $('[id=zone]').val("7");
                    break;
                case "Cote-des-Neiges":
                    $('[id=zone]').val("8");
                    break;
                case "Université de Montréal Area":
                    $('[id=zone]').val("9");
                    break;
                case "Plateau":
                    $('[id=zone]').val("10");
                    break;
                case "Mile-End":
                    $('[id=zone]').val("11");
                    break;
                case "N.D.G.":
                    $('[id=zone]').val("12");
                    break;
                case "Outremont":
                    $('[id=zone]').val("13");
                    break;
                case "Old Montréal":
                    $('[id=zone]').val("14");
                    break;
                case "Rosemont":
                    $('[id=zone]').val("15");
                    break;
                case "Little Burgundy/St-Henri":
                    $('[id=zone]').val("16");
                    break;
                case "Verdun/St-Charles/LaSalle":
                    $('[id=zone]').val("17");
                    break;
                case "Westmount":
                    $('[id=zone]').val("18");
                    break;
                case "Parc Extension":
                    $('[id=zone]').val("19");
                    break;
                case "Areas outside the zone map":
                    $('[id=zone]').val("20");
                    break;
                case "Town Mont Royal":
                    $('[id=zone]').val("21");
                    break;

                default:
                    $('[id=zone]').val("1");
            }

            /**/ $('[id=taille]').click();
            $('[id=taille]').val(data.ads.bedroom);

            /**/ $('[id=datepicker]').click();
            $('[id=datepicker]').val(data.ads.available_date);

            /**/ $('[id=Duree]').click();
            $('[id=Duree]').val(data.ads.lease_length);

            /**/ $('[id=FlexibleOui]').click();


            /**/ $('[id=loyer]').click();
            $('[id=loyer]').val(data.ads.rent);




            for(var key in data.ads.apartment_amenities){
                switch (data.ads.apartment_amenities[key]){
                    case "Fridge":
                        $('[id=frigoOui]').click();
                        break;
                    case "Stove":
                        $('[id=FourOui]').click();
                        break;
                    case "Heating":
                        $('[id=ChauffageOui]').click();
                        break;
                    case "Hot Water":
                        $('[id=EauOui]').click();
                        break;
                    case "Electricity":
                        $('[id=ElectriciteOui]').click();
                        break;
                    case "Furniture":
                        $('[id=MeubleOui]').click();
                        break;
                    case "Washer/Dryer":
                        $('[id=LavSechOui]').click();
                        break;
                    case "Laundry":
                        $('[id=BuandrieOui]').click();
                        break;
                    case "Hook-ups":
                        $('[id=EntreLavSechOui]').click();
                        break;

                }
            }

            /**/ $('[id=information_en]').click();
            $('[id=information_en]').val(data.ads.content);


            /*-->*/$('form').find('[id=btn_login]').click();
        });
    }
    
    
    function paymentInfo() {
        ///CHOOSE REGION
            selectRegion();

        chrome.storage.local.get('ads', function (data) {
            /**/$('[name=Prenom]').click();
            $('[name=Prenom]').val(data.ads.name);


            /**/$('[name=Nom]').click();
            $('[name=Nom]').val(data.ads.l_name);

            /**/$('[name=City]').click();
            $('[name=City]').val(data.ads.city);


            /**/ $('[id=PostalCode]').click();
            $('[id=PostalCode]').val(data.ads.postal_code);


            /**/ $('[id=Telephone]').click();
            $('[id=Telephone]').val(data.ads.phone);

            /**/ $('[id=PostalCode]').click();
            $('[id=PostalCode]').val(data.ads.postal_code);

            /**/ $('[id=Email]').click();
            $('[id=Email]').val(data.ads.email);


            /*-->*/$('form').find('[type=submit]').click();
        });
    }

    function selectRegion() {

        chrome.storage.local.get('ads', function (data) {

            /**/$('[id=Country]').click();
            switch (data.ads.region){
                case "Alberta":
                    $('[id=Country]').val('52');
                    break;
                case "British Columbia":
                    $('[id=Country]').val('53');
                    break;
                case "Manitoba":
                    $('[id=Country]').val('55');
                    break;
                case "New Brunswick":
                    $('[id=Country]').val('56');
                    break;
                case "Newfoundland":
                    $('[id=Country]').val('62');
                    break;
                case "Northwest Territories":
                    $('[id=Country]').val('63');
                    break;
                case "Nova Scotia":
                    $('[id=Country]').val('57');
                    break;
                case "Nunavut":
                    $('[id=Country]').val('58');
                    break;
                case "Ontario":
                    $('[id=Country]').val('59');
                    break;
                case "Prince Edward Island":
                    $('[id=Country]').val('54');
                    break;
                case "Quebec":
                    $('[id=Country]').val('60');
                    break;
                case "Saskatchewan":
                    $('[id=Country]').val('61');
                    break;
                case "Yukon":
                    $('[id=Country]').val('64');
                    break;
                case "British Columbia":
                    $('[id=Country]').val('53');
                    break;
            }

        });
    }


});


