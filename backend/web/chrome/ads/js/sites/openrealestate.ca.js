jQuery(document).ready(function ($) {
    let url = String(window.location.href).replace(/\/$/, '');
    switch (url) {
        case "http://www.openrealestate.ca/d/node/add/extended-listing":
            setRegistrationForm();
            break;
            case "http://www.openrealestate.ca/d/overview":
            setRegistrationForm();
            break;
    }

    function setRegistrationForm() {
        /**
         * street number
         */
        $("#edit-field-street-number-0-value").val(address);
        /**
         * Street Name
         */
        $("#edit-field-street-name-0-value").val(street);

        /**
         * City, Province
         */
        let cityProvince = city + "," + region_iso;
        $("#edit-field-city-text-0-value").val(cityProvince);

        /**
         * Price
         */
        $("#edit-field-price-0-value").val(rent);

        /**
         * Bedrooms
         */
        $("#edit-field-bedrooms-0-value").val(bedroom);

        /**
         * Bathrooms
         */
        $("#edit-field-bathrooms-0-value").val(bathroom);


        /**
         * Square Meters To Square Feet
         * @type {number}
         */

        var string = new String("ddfsd");

        $("#edit-field-square-feet-0-value").val(Math.ceil(apt_size * 10.764));

        /**
         *Complete Description of the Property
         */
        $("#edit-field-description-0-value").val(content);

        /**
         * Contact Name
         */
        $("#edit-field-name-0-value").val(name + " " + l_name);

        /**
         * Phone
         */
        $("#edit-field-phone-0-value").val(phone);

        /**
         * Email Address
         */
        $("#edit-field-email-0-value").val(email);

        /**
         * Username
         */
        $("#edit-field-username-0-value").val(email);

        /**
         * Password
         */
        $("#edit-field-password-0-value").val(pass);

        /**
         * Submit
         */
        $('#edit-submit').click();

    }

});


