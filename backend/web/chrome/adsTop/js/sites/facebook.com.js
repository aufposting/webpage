//https://www.facebook.com/login
//https://www.facebook.com/


/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');
    if (url == 'https://www.facebook.com/login') {
        login();
    }

    else if(url == 'https://www.facebook.com' || url == 'https://www.facebook.com/?sk=welcome'){

        window.location.href = 'https://www.facebook.com/groups/1713784562267402/';

        // nextSite(true);
    }

    else if(url == 'https://www.facebook.com/groups/1713784562267402'){
        addDetails();
    }

    else {
        // nextSite(false);
    }

    function login() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('[name=email]').click();
            // $('[name=email]').val(data.ads.email);
            $('[name=email]').val('ads.submiter@gmail.com');
            $('[name=email]')[0].dispatchEvent(new Event('change'));


            /**/ $('[name=pass]').click();
            // $('[name=pass]').val(data.ads.pass);
            $('[name=pass]').val('password1234567');
            $('[name=pass]')[0].dispatchEvent(new Event('change'));

            $('#login_form').find('[type=submit]').click();

            console.log($('#login_form').find('[type=submit]'))
            ;
        });
    }


    function addDetails() {
        addPhoto();
        chrome.storage.local.get('ads', function (data) {
            // $("[name=selectTransactionID][value='4']").parent()[0].dispatchEvent(new Event('click'));

            // $('#pagelet_group_composer').find('div').each(function () {

            // );


            var fullContent = data.ads.title + "\n\r" + data.ads.content + "\n\r" + "Address: " + data.ads.street + " " +
                                + data.ads.address + "\n" + "Price: " + data.ads.rent + "\n" + "Email: "
                                + data.ads.email + "\n" + "Phone: " + data.ads.phone;

            $('[name=xhpc_message_text]').val(fullContent);
            $("[name=xhpc_message_text]")[0].dispatchEvent(new Event('change'));
        });
    }


    function addPhoto() {
        // POST /v2.8/{group-id}/photos HTTP/1.1
        // Host: graph.facebook.com
        //
        // source=%7Bimage-data%7D

        FB.api(
            "/{group-id}/photos",
            "POST",
            {
                "source": "{image-data}"
            },
            function (response) {
                if (response && !response.error) {
                    alert(1111)

                    /* handle the result */
                }
            }
        );








        // getImages(function (images) {
        //     // _uploadeimage(0);
        //     // function _uploadeimage(i = 0) {
        //     //     var data = new FormData();
        //     //
        //     //     $.each($('[name=formPlaceAd]').find('input'), function () {
        //     //         if (($(this).attr('type') != 'checkbox' && $(this).attr('type') != 'radio' && $(this).attr('type') != 'file') || ($(this).attr('type') == 'checkbox' && $(this).is(':checked')) || ($(this).attr('type') == 'radio' && $(this).is(':checked'))){
        //     //             data.append($(this).attr('name'), $(this).val());
        //     //         }
        //     //     });
        //     //     $.each($('[name=formPlaceAd]').find('textarea'), function () {
        //     //         data.append($(this).attr('name'), $(this).val());
        //     //     });
        //     //     $.each($('[name=formPlaceAd]').find('select'), function () {
        //     //         data.append($(this).attr('name'), $(this).val());
        //     //     });
        //     //
        //     //     data.append('files[]', images[i].file, images[i].name);
        //     //
        //     //     var xhr = new XMLHttpRequest();
        //     //     xhr.open('post', '//www.doodloo.com/server/php/', true);
        //     //
        //     //     xhr.onreadystatechange = function () {
        //     //         if (xhr.readyState == 4) {
        //     //             var response = JSON.parse(xhr.responseText);
        //     //             $('#files').append(`<div class="col-xs-3">
        //     //                                     <div class="thumbnail">
        //     //                                         <label>Default <input type="radio" name="primary" value="${response.files[0].name}"></label><br>
        //     //                                         <div class="thumb-wrapper"><img src="${response.files[0].thumbnailUrl}" width="60" height="60" ></div><br>
        //     //                                         <input type="hidden" name="images[]" value="${response.files[0].name}">
        //     //                                         <button type="button" class="btn btn-primary" data-image="${response.files[0].name}">Delete</button>
        //     //                                     </div>
        //     //                                 </div>`);
        //     //
        //     //             if (++i < images.length) {
        //     //                 _uploadeimage(i);
        //     //             }else{
        //     //                 setTimeout(function () {
        //     //                     /*******FINISH*******/
        //     //                     /*-->*/$('[id=formPlaceAd]').find('[type=submit]').click();
        //     //                 }, 3000)
        //     //             }
        //     //         }
        //     //     };
        //     //     xhr.send(data);
        //     // }
        //
        // });

    }
});




