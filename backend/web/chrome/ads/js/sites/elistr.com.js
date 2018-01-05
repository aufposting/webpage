//https://elistr.com/index.php?a=cart&action=new&main_type=classified
//http://elistr.com/index.php?a=cart&action=process&main_type=classified&step=classified%3Acategory&b=232
//http://elistr.com/index.php?a=cart&action=process&main_type=classified&step=classified%3Acategory&b=232&c=terminal
//https://elistr.com/index.php?a=cart&action=process&main_type=classified&step=classified%3Acategory&b=232&c=terminal&uploaded
//http://elistr.com/index.php?a=cart&action=process&main_type=classified&step=combined
//http://elistr.com/index.php?a=cart&action=process&main_type=classified&step=classified%3Aanonymous
//http://elistr.com/index.php?a=cart&action=process&main_type=classified&step=other_details



/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url == 'https://elistr.com/index.php?a=cart&action=new&main_type=classified') {
        deleteAllCookies();
        window.location.href = '//elistr.com/index.php?a=cart&action=process&main_type=classified&step=classified%3Acategory&b=232&c=terminal';
    }else if (url.indexOf('&step=classified%3Acategory&b=232&c=terminal') + 1  && url.indexOf('&uploaded') + 1 == false) {
        addPhoto();
    }else if(url.indexOf('&step=classified%3Acategory&b=232&c=terminal') + 1 && url.indexOf('&uploaded') + 1){
        addInfo();
    }else if (url.indexOf('&step=combined') + 1) {
        termsOfUse();
    }else if (url.indexOf('&step=classified%3Aanonymous') + 1) {
        /*********FINISH**********/
        /*-->*/$('form').find('[type=submit]').click();
    }else if (url.indexOf('&step=other_details') + 1) {
        nextSite(true);
    }else {
        nextSite(false);
    }


    function addInfo() {
        chrome.storage.local.get('ads', function (data) {
            /**/ $('[id=classified_length]').click();
            $('[id=classified_length]').val("30");

            /**/ $('[id=classified_title]').click();
            $('[id=classified_title]').val(data.ads.title);

            /**/ $('[id=main_description]').click();
            $('[id=main_description]').val(data.ads.content);

            /**/ $('[id=price]').click();
            $('[id=price]').val(data.ads.rent);

            /**/ $('[id=currency_type]').click();
            $('[id=currency_type]').val('12');

            /**/ $('[id=email_option]').click();
            $('[id=email_option]').val(data.ads.email);

            /**/ $('[name^=geoRegion_location]').click();
            $('[name^=geoRegion_location]').val('3');

            /**/ $('[id=mapping_location]').click();
            $('[id=mapping_location]').val(data.ads.city);


            /*-->*/$('[id=combined_form]').find('[type=submit]').click();
        });
    }

    function termsOfUse() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $("[type=checkbox][value='1']").click();

            /*-->*/$('form').find('[type=submit]').click();
        });
    }


    function addPhoto() {
        getImages(function (images) {
            _uploadeimage(0);
            function _uploadeimage(i = 0) {
                var data = new FormData();

                data.append('name',  images[i].name);
                data.append('filename',  images[i].name);
                data.append('file', images[i].file,  'blob',  images[i].file);


                var xhr = new XMLHttpRequest();
                xhr.open('post', '//elistr.com/AJAX.php?controller=UploadImage&action=upload&adminId=0&userId=0&ua=Mozilla%2F5.0+%28Windows+NT+10.0%3B+WOW64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F57.0.2940.0+Safari%2F537.36', true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        var response = JSON.parse(xhr.responseText);

                        if (++i < images.length) {
                            _uploadeimage(i);
                        }else{
                            window.location.href = url+'&uploaded';
                        }
                    }
                };
                xhr.send(data);
            }
        });

    }
});


