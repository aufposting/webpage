//https://www.logement-a-louer.com/proprietaires
//https://www.logement-a-louer.com/compte/logements
//https://www.logement-a-louer.com/compte/logement-form
//https://www.logement-a-louer.com/compte/logements?saved=1

/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'https://www.logement-a-louer.com/proprietaires') {
        registration();
    } else if (url == 'https://www.logement-a-louer.com/compte/logements') {
        window.location.href = 'https://www.logement-a-louer.com/compte/logement-form';
    } else if (url == 'https://www.logement-a-louer.com/compte/logement-form') {
        location();
    } else if(url == 'https://www.logement-a-louer.com/compte/logements?saved=1'){
        nextSite(true);
    }else {
        nextSite(false);
    }


    function registration() {
        chrome.storage.local.get('ads', function (data) {

            if (!$('.help-block').text().length > 0) {
                /**/ $('[id=inputName]').click();
                $('[id=inputName]').val(data.ads.name);

                /**/ $('[id=inputPhone]').click();
                $('[id=inputPhone]').val(data.ads.phone);

                /**/ $('[id=inputEmail]').click();
                $('[id=inputEmail]').val(data.ads.email);

                /**/ $('[id=inputPassword]').click();
                $('[id=inputPassword]').val(data.ads.pass);

                /**/ $('[name=confirm]').click();
                $('[name=confirm]').val(data.ads.pass);

                /*-->*/$('[name=confirm]').parents('form').find('[type=submit]').click();
            }


        });
    }

    function location() {
        addPhoto();

        chrome.storage.local.get('ads', function (data) {

            /**/ $('[id=title]').click();
            $('[id=title]').val(data.ads.title);

            /**/ $('[id=price]').click();
            $('[id=price]').val(data.ads.rent);

            /*****CHOOSE HOUSE TYPE*******/
            selector($('[id=type]'), data.ads.house_type);

            /**/ $('[id=size]').click();
            $('[id=size]').val(data.ads.bedroom + ' 1/2');

            /**/ $('[id=address]').click();
            $('[id=address]').val(data.ads.address);

            /**/ $('[id=city]').click();
            $('[id=city]').val(data.ads.city);

            /**/ $('[id=phone]').click();
            $('[id=phone]').val(data.ads.phone);

            /**/ $('[id=description]').click();
            $('[id=description]').val(data.ads.content);
        });
    }

    function addPhoto() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();

                data.append('name',  images[i].name);
                data.append('tok',  $('[name=tok]').val());
                data.append('file', images[i].file,  images[i].name);


                var xhr = new XMLHttpRequest();
                xhr.open('post', '//www.logement-a-louer.com/compte/envoie-photo', true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var response = JSON.parse(xhr.responseText);

                        $('#uploadPictureBtn').parent().append(`<div class="thumbnail-img-container" data-id="${response.hash}">
								<a href="javascript:deletePicture('${response.hash}');">
								<img src="${response.url}" class="img-responsive">
                                <span class="hover-bottom bg-red">Supprimer la photo</span></a>
							</div>`);



                        if (++i < images.length) {
                            _uploadeimage(i);
                        }else{
                            /******FINISH*******/

                            /*-->*/$('form').find('[type=submit]').click();
                        }
                    }
                };
                xhr.send(data);
            }
        });

    }




});


