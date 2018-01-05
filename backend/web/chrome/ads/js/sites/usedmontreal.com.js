//http://www.usedmontreal.com/FormInsertUsedAdNew?selected_category_code=apartment-rentals
//http://www.usedmontreal.com/classified-ad/Title-test154_28885392?preview=insert&new=true&posted


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url.indexOf('/FormInsertUsedAdNew') + 1) {
        addDetails();
    }else if(url.indexOf('/classified-ad') + 1 || url.indexOf('&posted') + 1){
        chrome.storage.local.get('usedmontrealPass', function (data) {
            nextSite({'pass': data.usedmontrealPass});
        });
    }else {
        nextSite(false);
    }

    function addDetails() {
        addPhoto();
        chrome.storage.local.get('ads', function (data) {
            // $("[name=selectTransactionID][value='4']").parent()[0].dispatchEvent(new Event('click'));

            /**/ $('[name=sale_ind][value=sale]').prop('checked', true);
            /**/ $('[name=charity_donate][value=N]').prop('checked', true);

            /**/ $('[name=price]').click();
            $('[name=price]').val(data.ads.rent);
            $('[name=price]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=title]').click();
            $('[name=title]').val(data.ads.title);
            $('[name=title]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=attr_7]').click();
            $('[name=attr_7]').val(data.ads.bedroom);
            $('[name=attr_7]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=attr_8]').click();
            $('[name=attr_8]').val(data.ads.bathroom);
            $('[name=attr_8]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=attr_9]').click();
            $('[name=attr_9]').val(data.ads.apt_size);
            $('[name=attr_9]')[0].dispatchEvent(new Event('change'));


            if(find(data.ads.apartment_amenities, 'Smoking') + 1){
                /**/ $('[name=attr_11][value=Y]').prop('checked', true);
            }else{
                /**/ $('[name=attr_11][value=N]').prop('checked', true);
            }

            if(data.ads.pets == '1'){
                /**/ $('[name=attr_10][value=Y]').prop('checked', true);
            }else{
                /**/ $('[name=attr_10][value=N]').prop('checked', true);
            }

            /**/ $('[name=description]').click();
            $('[name=description]').val(data.ads.content);
            $('[name=description]')[0].dispatchEvent(new Event('change'));


            /**/ $('[name=email]').click();
            $('[name=email]').val(data.ads.email);
            $('[name=email]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=want_email]').prop('checked', true);

            /**/ $('[name=phone]').click();
            $('[name=phone]').val(data.ads.phone);
            $('[name=phone]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=postal_code]').click();
            $('[name=postal_code]').val(data.ads.postal_code);
            $('[name=postal_code]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=commercial_ind][value=N]').prop('checked', true);


            /**/$('[name=location_name]').click();
            if(data.ads.city == 'Montreal'){
                $('[name=location_name]').val('Montreal');
                $('[name=location_name]')[0].dispatchEvent(new Event('click'));
            }else{
                $('[name=location_name]').val('Outside Montreal');
                $('[name=location_name]')[0].dispatchEvent(new Event('click'));
            }

            var pass = data.ads.pass.substr(0, 20).replace(/[^a-z0-9]/ig, '');
            chrome.storage.local.set({'usedmontrealPass': pass});

            /**/ $('[name=password]').click();
            $('[name=password]').val(pass);
            $('[name=password]')[0].dispatchEvent(new Event('change'));

            /**/ $('[name=confirmTerms]').prop('checked', true);
        });
    }


    function addPhoto() {
        getImages(function (images) {

            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();

                data.append('form_id', $('[name=placeAds]').find('[name=form_id]').val());
                data.append('position', '0');
                data.append('postfile1', images[i].file, images[i].name);

                var xhr = new XMLHttpRequest();
                xhr.open('post', '//www.usedmontreal.com/insertAd/xhrPhotoUpload', true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var response = JSON.parse(xhr.responseText);

                        var imgUniqId = /\/(\d+)/.exec(response.photo.url)[1];

                        $('#photoCount').text(i + 1);

                        $('#usedPreviewContainer').prepend(`<div class="usedPreview dz-processing dz-image-preview dz-success"
                                                                data-position="${i}" id="_photo_${i}" data-id="${imgUniqId}">
                                                                <div class="img-border">
                                                                    <img  id="_img_${i}" alt="${images[i].name}" src="${response.photo.url}" style="width: 120px">
                                                                </div>                                                   
                                                              
                                                                <div class="preview-action" title="${images[i].name}">
                                                                    <span class="dz-edit icon dz-remove" data-dz-remove="" u-remove="" title="Delete photo"></span>
                                                                    <span class="icon dz-edit" title="Edit photo" u-edit=""></span>
                                                                </div>                                                      
                                                             </div>`);

                        if (++i < images.length) {
                            _uploadeimage(i);
                        }else{
                            setTimeout(function () {
                                /*******FINISH*******/
                                /*-->*/$('[name=placeAds]').find('[type=submit]').click();
                            }, 5000)
                        }
                    }
                };
                xhr.send(data);
            }
        });

    }
});



