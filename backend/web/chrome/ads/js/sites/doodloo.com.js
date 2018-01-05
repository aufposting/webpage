//http://www.doodloo.com/additem.php?catId=13&subID=96
//http://www.doodloo.com/ad-submitted.php?pid=14514&view=1&id=0
//http://www.doodloo.com/activate-ad.php?id=14755&region=11&key=4620699


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'http://www.doodloo.com/additem.php?catId=13&subID=96') {
        addDetails();
    }else if(url.indexOf('ad-submitted') + 1){
        getMail('no-reply@doodloo.com', function () {
            var pattern = /(https?:\/\/w{0,3}\.?doodloo.com\/activate-ad.php[^\s\r\n\t]+)/igm;
            var forClick =  pattern.exec($('#gh-mail-respons').html())[1].replace(/&amp;/g, '&').replace(/®/g, '&reg');
            window.location.href = forClick;
        }, 300, true);

    }else if(url.indexOf('/activate-ad.php')){
        nextSite(true);
    }else {
        nextSite(false);
    }

    function addDetails() {
        addPhoto();
        chrome.storage.local.get('ads', function (data) {

            /**/ $("[name=type_id][value='1']").parent().click();
            $('[name=type_id]').parent()[0].dispatchEvent(new Event('click'));

            /**/ $("[name=selectTransactionID][value='4']").parent().click();
            $("[name=selectTransactionID][value='4']").parent()[0].dispatchEvent(new Event('click'));

            /**/ $('[id=textTitle]').click();
            $('[id=textTitle]').val(data.ads.title);

            /**/ $('[id=textPhone]').click();
            $('[id=textPhone]').val(data.ads.phone);

            /**/ $('[id=textZip]').click();
            $('[id=textZip]').val(data.ads.postal_code);

            /**/ $('[id=textEmail]').click();
            $('[id=textEmail]').val(data.ads.email);

            /**/ $('[id=editor1]').click();
            $('[id=editor1]').val(data.ads.content);
        });
    }


    function addPhoto() {
        getImages(function (images) {

            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();

                $.each($('[name=formPlaceAd]').find('input'), function () {
                    if (($(this).attr('type') != 'checkbox' && $(this).attr('type') != 'radio' && $(this).attr('type') != 'file') || ($(this).attr('type') == 'checkbox' && $(this).is(':checked')) || ($(this).attr('type') == 'radio' && $(this).is(':checked'))){
                        data.append($(this).attr('name'), $(this).val());
                    }
                });
                $.each($('[name=formPlaceAd]').find('textarea'), function () {
                    data.append($(this).attr('name'), $(this).val());
                });
                $.each($('[name=formPlaceAd]').find('select'), function () {
                    data.append($(this).attr('name'), $(this).val());
                });

                data.append('files[]', images[i].file, images[i].name);

                var xhr = new XMLHttpRequest();
                xhr.open('post', '//www.doodloo.com/server/php/', true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var response = JSON.parse(xhr.responseText);
                        $('#files').append(`<div class="col-xs-3">
                                                <div class="thumbnail">
                                                    <label>Default <input type="radio" name="primary" value="${response.files[0].name}"></label><br>
                                                    <div class="thumb-wrapper"><img src="${response.files[0].thumbnailUrl}" width="60" height="60" ></div><br>
                                                    <input type="hidden" name="images[]" value="${response.files[0].name}">
                                                    <button type="button" class="btn btn-primary" data-image="${response.files[0].name}">Delete</button>
                                                </div>
                                            </div>`);

                        if (++i < images.length) {
                            _uploadeimage(i);
                        }else{
                            setTimeout(function () {
                                /*******FINISH*******/
                                /*-->*/$('[id=formPlaceAd]').find('[type=submit]').click();
                            }, 3000)
                        }
                    }
                };
                xhr.send(data);
            }
        });

    }
});



