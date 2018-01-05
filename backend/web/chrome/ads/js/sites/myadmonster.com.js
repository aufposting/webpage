//http://www.myadmonster.com/free-ads/postfreead.php
//http://www.myadmonster.com/free-ads/prepost.php
//http://www.myadmonster.com/free-ads/post.php
//http://www.myadmonster.com/free-ads/post2.php
//http://www.myadmonster.com/postgo.php?ac=5&id=17012003514163&zx=2Cna1D&ex=Ut1SC6gVfHeIisZD7WzJmE52hnXk8a&xi=jNgwE1R6

/* global chrome */
jQuery(document).ready(function ($) {
    var url = String(window.location.href).replace(/\/$/, '');

    if (url == 'http://www.myadmonster.com/free-ads/postfreead.php') {
        /*-->*/$('[id=postanon]').find('[type=submit]').click();

    } else if (url == 'http://www.myadmonster.com/free-ads/prepost.php') {
        /*-->*/$('form').find('[type=submit]').click();

    }else if(url == 'http://www.myadmonster.com/free-ads/post.php'){
        addInfo();
    }else if(url == 'http://www.myadmonster.com/free-ads/post2.php'){
        getMail('adpost-noreply@monsterwebmedia.com', function () {
            var pattern = /(www\.+[^<>"']+)/igm;
            var forClick =  pattern.exec($('#gh-mail-respons').html())[1].replace(/&amp;/g, '&').replace(/®/g, '&reg');
            window.location.href = '//'+ forClick;
        }, 3000, true);
    }else if(url.indexOf('/postgo.php') +1 ){
       nextSite(true);
    }else {
        nextSite(false);
    }



    function addInfo() {
        chrome.storage.local.get('ads', function (data) {

            /**/ $('[id=idemail]').click();
            $('[id=idemail]').val(data.ads.email);

            /**/ $('[id=idusername]').click();
            $('[id=idusername]').val(data.ads.login);

            /**/ $('[id=idphone]').click();
            $('[id=idphone]').val(data.ads.phone);

            /**/ $('[id=category]').click();
            $('[id=category]').val('Real Estate Rental');

            /**/ $('[id=country]').click();
            $('[id=country]').val('Canada');

            /**/ $('[id=idstate]').click();
            $('[id=idstate]').val(data.ads.region);

            /**/ $('[id=idcity]').click();
            $('[id=idcity]').val(data.ads.city);

            /**/ $('[id=idzip]').click();
            $('[id=idzip]').val(data.ads.postal_code);

            /**/ $('[name=duration]').click();
            $('[name=duration]').val('28');

            /**/ $('[name=adtype]').click();
            $('[name=adtype]').val('Trade');

            /**/ $('[id=idprice]').click();
            $('[id=idprice]').val(data.ads.rent);

            /**/ $('[id=idadtitle]').click();
            $('[id=idadtitle]').val(data.ads.title);

            /**/ $('[id=idcontent]').click();
            $('[id=idcontent]').val(data.ads.content);

            var captchaCode = $('[id=thingy]').html();
            /**/ $('[id=capthingy]').click();
            $('[id=capthingy]').val(captchaCode);

            /*-->*/$('form').find('[type=submit]').click();

        });
    }
});



