/* global chrome, toNextSite */

//https://appartmap.com/en/post-an-apartment/
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url == 'https://appartmap.com/en/post-an-apartment') {
        window.clearTimeout(toNextSite);
        step1();
    } else if (url == 'https://appartmap.com/en/post-an-apartment/?send=1') {
        mail();
    } else if (url == 'https://appartmap.com/compte-usager/mes-immeubles') {
        chrome.storage.local.get('appartmap_pass', function (data) {
            nextSite({'pass': data.appartmap_pass});
        });
    } else {
         nextSite(false);
    }

    function step1() {
        chrome.storage.local.get('ads', function (data) {
            switch (data.ads.house_type) {
                case "Apartment":
                    /**/$('[id=typeuni1]').click();
                    break;
                case "Condo":
                    /**/$('[id=typeuni2]').click();
                    break;
                case "House for rent":
                    /**/$('[id=typeuni8]').click();
                    break;
                case "Room":
                    /**/$('[id=typeuni3]').click();
                    break;
            }
            /**/$('[id=sizeuni' + data.ads.bedroom + '2]').click();
            /**/$('[id=prix_from]').click();
            $('[id=prix_from]').val(data.ads.rent);
            if (find(data.ads.apartment_amenities, 'Furniture') + 1) {
                /**/
                $('[id=3]').click();
            } else {
                /**/
                $('[id=meuble-0]').click();
            }
            if (find(data.ads.apartment_amenities, 'Heating') + 1) {
                /**/$('[id=2]').click();
            }
            if (find(data.ads.apartment_amenities, 'Electricity') + 1) {
                /**/$('[id=38]').click();
            }
            if (find(data.ads.apartment_amenities, 'Hot Water') + 1) {
                /**/$('[id=6]').click();
            }

            if (data.ads.pets == '1') {
                /**/$('[id=86]').click();
                $('[id=152]').click();
                $('[id=85]').click();
                $('[id=87]').click();
                $('[id=88]').click();
                $('[id=149]').click();
            }
            /*-->*/ $('[id=button_sections_informations]').click();
            window.setTimeout(function () {
                step2();
            }, 300);
        });
    }

    function step2() {
        chrome.storage.local.get('ads', function (data) {
            var first = true;
            /**/ $('[id=postal_code]').val(data.ads.postal_code);
            $('[id=postal_code]').change();
            $('[id=postal_code]')[0].dispatchEvent(new Event('change'));
            $('#map-canvas').bind('DOMSubtreeModified', function () {
                if (first) {
                    first = false;
                    var isSetAddress = false;
                    var isSetZone = false;
                    $('[name=quartier]').bind('DOMSubtreeModified', function () {
                        if (!$('[name=quartier]').val() || $('[name=quartier]').find('option').length) {
                            selector($('[name=quartier]'), data.ads.zone);
                            if (!$('[name=quartier]').val()) {
                                var val = $($('[name=quartier]').find('option')[1]).val();
                                console.log($('[name=quartier]').find('option'));
                                $('[name=quartier]').val(val);
                                $('[name=quartier]')[0].dispatchEvent(new Event('change'));
                            }
                            isSetZone = true;
                        }
                        if (!isSetAddress && isSetZone) {
                            isSetAddress = true;
                            $('[id=adresse_no]').val(data.ads.address);
                            $('[id=adresse_no]')[0].dispatchEvent(new Event('change'));
                            $('[id=adresse]').val(data.ads.street);
                            $('[id=adresse]')[0].dispatchEvent(new Event('change'));
                            window.setTimeout(function () {
                                /*-->*/ $('[id=button_section_adresse]').click();
                                uploadeImage();
                            }, 3000);
                        }
                    });
                }
            });
        });
    }

    function uploadeImage() {
        var id = 0;
        var ssid = getPHPSESSID();
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                data.append('Filedata', images[i].file, images[i].name);
                data.append('dir', 'temp');
                data.append('id', 0);
                data.append('PHPSESSID', ssid);
                data.append('token', $('#nonce').val());
                data.append('pid', $("#nb_pieces").val());
                data.append('pid', $("#nb_pieces").val());
                data.append('nom_ville', '');
                data.append('adresse', '');
                data.append('nom_quartier', '');
                data.append('filename', images[i].name);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://appartmap.com/wp-content/themes/appartmap/uploadifive.php', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var data = xhr.responseText;
                        var dataArray = data.split(";", 2);
                        var imgUrl = dataArray[0];
                        var imgId = dataArray[1];
                        var nbElem = $('.sortable > .cmpt-unit-img').length;
                        nbElem = nbElem + 1;
                        $('.sortable').append('<div id="img-' + imgId + '" class="cmpt-unit-img"><img src="' + imgUrl + '" />' +
                                images[i].name +
                                ' <a style="color:red;margin-left:20px;">Supprimer</a>' +
                                '<div class="ordre-wrapper">' +
                                '<label class="ordre-label">Ordre:</label>' +
                                '<input class="ordreinput" type="number" name="imgordre[]" value="' + nbElem + '" />' +
                                '<input type="hidden" name="imgordreid[]" value="' + imgId + '" />' +
                                '</div>' +
                                '</div>');
                        if (++i < images.length) {
                            _uploadeimage(i);
                        } else {
                            window.setTimeout(function () {
                                $('[id=button_section_photos]').click();
                                /**/step4();
                            }, 250);
                        }
                    }
                };
                xhr.send(data);
            }
        });
        function getPHPSESSID() {
            var ssid;
            $.each($('script'), function () {
                if ($(this).html().indexOf('PHPSESSID') + 1) {
                    ssid = /[\'\"]PHPSESSID[\'\"][\n\r\s\t]*:[\n\r\s\t]*[\'\"]([^\'\"]+)[\'\"]/i.exec($(this).html())[1];
                    return;
                }
            });
            return ssid;
        }
    }

    function step4() {

        chrome.storage.local.get('ads', function (data) {
            /**/$('[id=courriel]').click();
            $('[id=courriel]').val(data.ads.email);
            $('[id=telephone]').change();
            /**/ $('[id=courriel_confirm]').click();
            $('[id=courriel_confirm]').val(data.ads.email);
            $('[id=telephone]').change();
            /**/ $('[id=telephone]').click();
            $('[id=telephone]').val(data.ads.phone);
            $('[id=telephone]').change();
            window.setTimeout(function () {
                $('[id=button_section_coordonnee]').click();
                /**/step5();
            }, 250);
        });
    }

    function step5() {
        chrome.storage.local.get('ads', function (data) {
            /**/$('[id=description_appart]').click();
            $('[id=description_appart]').val(data.ads.content);
            /*-->*/$('[id=form_part5]').find('.next_nav').click();

            /******FINISHED*********/
//            /*-->*/$('[id=form_part6]').find('.publier').click();
            window.setTimeout(function () {
                event($('[id=form_part6]').find('.publier'), 'click');
                //    /*-->*/$('[id=form_part6]').find('.publier').click();;
            }, 15000);
        });
    }

    function mail() {
        chrome.storage.local.get('ads', function (data) {
            getMail('info@appartmap.com', function (mailData) {
                var tempPass = /You\s+temporary\s+password\s+:\s+([^\s]+)/i.exec(mailData.replace(/<\/p>/gi, '  </p>'))[1];
                console.log(tempPass);
                chrome.storage.local.set({'appartmap_pass': tempPass});
                window.setTimeout(function () {
                    console.log($('#connect_account'));
                    $('header .overlay').toggleClass('open');
                    $('header .div-connexion').css('display', 'block');
                    console.log($('[name=log]'));
                    /**/$('[name=log]').val(data.ads.email);
                    $('[name=log]').change();
                    /**/$('[name=pwd]').val(tempPass);
                    $('[name=pwd]').change();
                    /**/$('[name=rememberme]').click();
                    /**/$('[name=wp-submit]').click();

                }, 2000);

            }, 7200);
        });
    }
});


