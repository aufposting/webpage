//https://my.locanto.info/register?cid=6&paf&continue=http%3A%2F%2Fwww.locanto.ca%2Fpost%2FR%2F301%2F1%2F
//http://www.locanto.ca/post/R/301/1/
//https://my.locanto.info/register?cid=6&continue=http%3A%2F%2Fwww.locanto.ca%2Fpost%2FR%2F301%2F1%2F
//https://my.locanto.info/activate?email=ads.submiter%40gmail.com&ctrlStr=065338&cid=6
//http://mb.locanto.ca/manage/1174557606/TBNSyQ/?published



/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url.indexOf('my.locanto.info/register') + 1 && $("[id=email]").length > 0) {
        registration();
    } else if (url.indexOf('/post/R/301/1') && $("[id=target_form]").length) {
        addDetails();
    } else if (url == 'http://www.locanto.ca/post/R/301/1' || url.indexOf('my.locanto.info/register') + 1 && !$("[id=target_form]").length && !$("[id=email]").length) {
        chrome.storage.local.get('ads', function (data) {
            getMail('noreply@locanto.ca', function () {
                var email = /(\w+)@/.exec(data.ads.email)[1];
                var pattern = new RegExp('href=["\'](.*?locanto\.ca.*?' + email + '[^"\']+)', 'igm');
                var href = pattern.exec($('#gh-mail-respons').html())[1].replace(/&amp;/g, '&');
                window.location.href = href;

            }, 300);
        });

    } else if (url.indexOf('activate?email') + 1 || url.indexOf('activate?cid=') + 1) {
        activateProfile();
    } else if (url.indexOf('?published') + 1) {
        nextSite(true);
    } else {
        nextSite(false);
    }

    function registration() {
        chrome.storage.local.get('ads', function (data) {
            /**/
            $("[id=email]").click();
            $('[id=email]').val(data.ads.email);

            /*-->*/
            $('form').find('[type=submit]').click();

        });
    }


    function addDetails() {
        addPhoto();
        chrome.storage.local.get('ads', function (data) {

            /**/
            $("[id=post_type_1]").click();

            /**/
            $('[name=price]').click();
            $('[name=price]').val(data.ads.rent);

            /**/
            $('[name=itv]').click();
            $('[name=itv]').val('1');

            /**/
            $('[id=subject]').click();
            $('[id=subject]').val(data.ads.title);

            /**/
            $('[id=textEmail]').click();
            // $('[id=textEmail]').val(data.ads.email);
            $('[id=textEmail]').val('melkonyan.misha@gmail.com');

            /**/
            $('[id=description]').click();
            $('[id=description]').val(data.ads.content);

            /*******CHOOSE BEDROOMS*******/
            selector($('[name=rooms]'), data.ads.bedroom + ' ' + 'BR');

            /**/
            $('[name=size]').click();
            $('[name=size]').val(data.ads.apt_size);

            /**/
            $('[name=phone_number]').click();
            $('[name=phone_number]').val('n');
            $("[name=phone_number]")[0].dispatchEvent(new Event('change'));

            /**/
            $('[name=phone_number_input]').click();
            $('[name=phone_number_input]').val(data.ads.phone);

            /**/
            $('[id=mapStreet]').click();
            $('[id=mapStreet]').val(data.ads.street);


            $("[id=mapStreet]")[0].dispatchEvent(new Event('click'));

            /**/
            $('[id=geo_search_post]').click();
            $('[id=geo_search_post]').val(data.ads.city + ', ' + data.ads.region);

            /**/
            $('[id=mapZip]').click();
            $('[id=mapZip]').val(data.ads.postal_code);
        });
    }

    function addPhoto() {

        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();
                $.each($('form').find('input'), function () {
                    if ($(this).attr('type') != 'checkbox' || $(this).attr('type') != 'radio' || ($(this).attr('type') == 'checkbox' && !$(this).is(':checked')) || ($(this).attr('type') == 'radio' && !$(this).is(':checked')))
                        data.append($(this).attr('name'), $(this).val());
                });
                $.each($('form').find('textarea'), function () {
                    data.append($(this).attr('name'), $(this).val());
                });
                $.each($('form').find('select'), function () {
                    data.append($(this).attr('name'), $(this).val());
                });
                data.append('img_upload', images[i].file, images[i].name);
                var xhr = new XMLHttpRequest();
                xhr.open('post', '//www.locanto.ca/api/ajax/upload/', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var response = JSON.parse(xhr.responseText);
                        $('#img_upload_container').find('ul').prepend(`<li class="single_image js-single_image gallery"><input type="hidden" name="img_uploaded[]" value="${response.img_upload[0].name}"><div class="container"><img src="${response.img_upload[0].tn_url}" alt=""></div><a href="#" class="js-img_delete">Delete image</a><div class="gallery_label">Preview image</div></li>`);
                        if (++i < images.length) {
                            _uploadeimage(i);
                        } else {
                            /*****GO TO NEXT STEP*******/
                            $('[id=target_form]').find('[name=post_directly]').click();
                        }
                    }
                };
                xhr.send(data);
            }
        });
    }

    function activateProfile() {
        chrome.storage.local.get('ads', function (data) {
            /**/
            $("[name=professional][value='0']").click();
            switch (data.ads.gender) {
                case "Male":
                    $("[name=sex][value='mr']").click();
                    break;
                case "Female":
                    $("[name=sex][value='mrs']").click();
                    break;
            }

            $('[name=nickname]').click();
            $('[name=nickname]').val(data.ads.login);

            $('[name=given_name]').click();
            $('[name=given_name]').val(data.ads.name);

            /**/
            $('[name=name]').click();
            $('[name=name]').val(data.ads.l_name);

            /**/
            $('[name=pwd]').click();
            $('[name=pwd]').val(data.ads.pass);

            /**/
            $('[name=pwd2]').click();
            $('[name=pwd2]').val(data.ads.pass);

            /**/
            $('[name=terms_of_use_accept]').click();
            $("[name=terms_of_use_accept]")[0].dispatchEvent(new Event('click'));

            /**/
            $('[name=newsletter_subscribe]').click();
            $("[name=newsletter_subscribe]")[0].dispatchEvent(new Event('click'));

            $('[id=submit]').click();
            /**/
        });
    }

});




