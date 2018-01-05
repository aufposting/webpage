jQuery(document).ready(function ($) {
    let url = String(window.location.href).replace(/\/$/, '');
    switch (url) {
        case "http://www.montreallisting.ca/post-free-classified-ad/?classification_id=housing-apartments-condos-for-rent-sale-wanted":
            setRegistrationForm();
            break;

    }

    function setRegistrationForm() {
        /**
         * Title
         */
        console.log(title);
        $("[name=subject]").val(title);
    }
});