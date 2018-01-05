<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>

    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="manifest.json">
    <link rel="mask-icon" href="safari-pinned-tab.svg" color="#27ae60">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,700">
    <link rel="stylesheet" href="css/vendor.min.css">
    <link rel="stylesheet" href="css/elephant.min.css">
    <link rel="stylesheet" href="css/application.min.css">
    <link rel="stylesheet" href="css/demo.min.css">
    <link rel="stylesheet" href="css/styleStep2.css">
    <link rel="stylesheet" href="dropzone/dist/dropzone.css" media="screen" title="no title">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  </head>
  <body class="layout layout-header-fixed">
    <div class="layout-main">

      <div>
        <div class="layout-content-body">


          <!-- Commented <div class="text-center m-b">
            <h3 class="m-b-0">With Form Validation</h3>
            <small>The following case does not allow moving to the next step without validating the form in the current step successfully.</small>
          </div><-->
          <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
              <div class="demo-form-wrapper">
                <form id="demo-form-wizard-2" data-toggle="validator">
                  <ul class="steps">
                    <li class="step col-xs-4 active">
                      <a class="step-segment" href="#step-2" data-toggle="tab">
                        <span class="step-icon icon icon-user"></span>
                      </a>
                      <div class="step-content">
                        <strong class="hidden-xs">About You</strong>
                      </div>
                    </li>
                    <li class="step col-xs-4">
                      <a class="step-segment" href="#step-2" data-toggle="tab">
                        <span class="step-icon icon icon-cubes"></span>
                      </a>
                      <div class="step-content">
                        <strong class="hidden-xs">About The Property</strong>
                      </div>
                    </li>
                    <li class="step col-xs-4">
                      <a class="step-segment" href="#step-3" data-toggle="tab">
                        <span class="step-icon icon icon-credit-card"></span>
                      </a>
                      <div class="step-content">
                        <strong class="hidden-xs">Payment details</strong>
                      </div>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div id="step-1" class="tab-pane active">
                      <h4 class="text-center m-y-md">
                        <span>About You</span>
                      </h4>
                      <div class="row">
                        <div class="col-sm-8 col-sm-offset-2">

                          <div class="form-group">
                            <label for="name-1" class="control-label">First Name</label>
                            <input id="name-1" class="form-control" type="text" name="name_1" spellcheck="false" autocomplete="on" data-rule-required="true">

                          </div>

                          <div class="form-group">
                            <label for="last-name" class="control-label">Last Name</label>
                            <input id="last-name" class="form-control" type="text" name="last-name" spellcheck="false" autocomplete="on" data-rule-required="true">

                          </div>

                          <div class="form-group">
                            <label for="phone" class="control-label">Phone Number</label>
                            <input id="phone" class="form-control" type="number" name="phone" spellcheck="false" autocomplete="on" data-rule-required="true" data-rule-number="true" data-msg-required="Please enter a valid Phone Number." data-rule-minlength="6">

                          </div>


                          <div class="form-group">
                            <label for="email-2" class="control-label">Email address</label>
                            <input id="email-2" class="form-control" type="email" name="email_2" spellcheck="false" autocomplete="on" data-rule-required="true" data-rule-email="true" data-msg-required="Please enter your email address.">

                          </div>

                          <div class="dz-preview dz-file-preview">
                          <div class="dz-details">
                            <div class="dz-filename"><span data-dz-name></span></div>
                            <div class="dz-size" data-dz-size></div>
                            <img data-dz-thumbnail />
                          </div>
                          <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                          <div class="dz-success-mark"><span>✔</span></div>
                          <div class="dz-error-mark"><span>✘</span></div>
                          <div class="dz-error-message"><span data-dz-errormessage></span></div>
                        </div>



                          <div class="form-group">
                            <button class="btn btn-primary btn-block btn-next" type="button">NEXT</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="step-2" class="tab-pane">
                      <h4 class="text-center m-y-md">
                        <span>About The Property</span>
                      </h4>
                      <div class="row">

                      <div class="col-sm-8 col-sm-offset-2">
                        <div class="col-sm-6">
                        <div class="form-group">
                          <label for="demo-select2-4" class="form-label">Country</label>
                          <select id="demo-select2-4" class="form-control">
                            <option value="af">Afghanistan (‫افغانستان‬‎)</option>
                            <option value="al">Albania (Shqipëri)</option>
                            <option value="dz">Algeria</option>
                            <option value="as">American Samoa</option>
                            <option value="ad">Andorra</option>
                            <option value="ao">Angola</option>
                            <option value="ai">Anguilla</option>
                            <option value="ag">Antigua &amp; Barbuda</option>
                            <option value="ar">Argentina</option>
                            <option value="am">Armenia (Հայաստան)</option>
                            <option value="aw">Aruba</option>
                            <option value="au">Australia</option>
                            <option value="at">Austria (Österreich)</option>
                            <option value="az">Azerbaijan (Azərbaycan)</option>
                            <option value="bs">Bahamas</option>
                            <option value="bh">Bahrain (‫البحرين‬‎)</option>
                            <option value="bd">Bangladesh (বাংলাদেশ)</option>
                            <option value="bb">Barbados</option>
                            <option value="by">Belarus (Беларусь)</option>
                            <option value="be">Belgium</option>
                            <option value="bz">Belize</option>
                            <option value="bj">Benin (Bénin)</option>
                            <option value="bm">Bermuda</option>
                            <option value="bt">Bhutan (འབྲུག)</option>
                            <option value="bo">Bolivia</option>
                            <option value="ba">Bosnia &amp; Herzegovina (Босна и Херцеговина)</option>
                            <option value="bw">Botswana</option>
                            <option value="br">Brazil (Brasil)</option>
                            <option value="io">British Indian Ocean Territory</option>
                            <option value="vg">British Virgin Islands</option>
                            <option value="bn">Brunei</option>
                            <option value="bg">Bulgaria (България)</option>
                            <option value="bf">Burkina Faso</option>
                            <option value="bi">Burundi (Uburundi)</option>
                            <option value="kh">Cambodia (កម្ពុជា)</option>
                            <option value="cm">Cameroon (Cameroun)</option>
                             <option value="ca" selected="selected">Canada</option>
                            <option value="cv">Cabo Verde (Kabu Verdi)</option>
                            <option value="cf">Central African Republic (République centrafricaine)</option>
                            <option value="td">Chad (Tchad)</option>
                            <option value="cl">Chile</option>
                            <option value="cn">China (中国)</option>
                            <option value="co">Colombia</option>
                            <option value="km">Comoros (‫جزر القمر‬‎)</option>
                            <option value="cg">Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)</option>
                            <option value="cg">Congo (Republic) (Congo-Brazzaville)</option>
                            <option value="ck">Cook Islands</option>
                            <option value="cr">Costa Rica</option>
                            <option value="ci">Côte d&#x27;Ivoire</option>
                            <option value="hr">Croatia (Hrvatska)</option>
                            <option value="cu">Cuba</option>
                            <option value="cw">Curaçao</option>
                            <option value="cy">Cyprus (Κύπρος)</option>
                            <option value="cz">Czech Republic (Česká republika)</option>
                            <option value="dk">Denmark (Danmark)</option>
                            <option value="dj">Djibouti</option>
                            <option value="do">Dominica</option>
                            <option value="do">Dominican Republic (República Dominicana)</option>
                            <option value="ec">Ecuador</option>
                            <option value="eg">Egypt (‫مصر‬‎)</option>
                            <option value="sv">El Salvador</option>
                            <option value="gq">Equatorial Guinea (Guinea Ecuatorial)</option>
                            <option value="er">Eritrea</option>
                            <option value="ee">Estonia (Eesti)</option>
                            <option value="us">United States</option>
                            <option value="et">Ethiopia</option>
                            <option value="fk">Falkland Islands (Islas Malvinas)</option>
                            <option value="fo">Faroe Islands (Føroyar)</option>
                            <option value="fj">Fiji</option>
                            <option value="fi">Finland (Suomi)</option>
                            <option value="fr">France</option>
                            <option value="gf">French Guiana (Guyane française)</option>
                            <option value="pf">French Polynesia (Polynésie française)</option>
                            <option value="ga">Gabon</option>
                            <option value="gm">Gambia</option>
                            <option value="gs">Georgia (საქართველო)</option>
                            <option value="de">Germany (Deutschland)</option>
                            <option value="gh">Ghana (Gaana)</option>
                            <option value="gi">Gibraltar</option>
                            <option value="gr">Greece (Ελλάδα)</option>
                            <option value="gl">Greenland (Kalaallit Nunaat)</option>
                            <option value="gd">Grenada</option>
                            <option value="gp">Guadeloupe</option>
                            <option value="gu">Guam</option>
                            <option value="gt">Guatemala</option>
                            <option value="pg">Guinea (Guinée)</option>
                            <option value="gw">Guinea-Bissau (Guiné-Bissau)</option>
                            <option value="gy">Guyana</option>
                            <option value="ht">Haiti</option>
                            <option value="hn">Honduras</option>
                            <option value="hk">Hong Kong (香港)</option>
                            <option value="hu">Hungary (Magyarország)</option>
                            <option value="is">Iceland (Ísland)</option>
                            <option value="in">India (भारत)</option>
                            <option value="id">Indonesia</option>
                            <option value="ir">Iran (‫ایران‬‎)</option>
                            <option value="iq">Iraq (‫العراق‬‎)</option>
                            <option value="ie">Ireland</option>
                            <option value="il">Israel (‫ישראל‬‎)</option>
                            <option value="it">Italy (Italia)</option>
                            <option value="jm">Jamaica</option>
                            <option value="jp">Japan (日本)</option>
                            <option value="jo">Jordan (‫الأردن‬‎)</option>
                            <option value="kz">Kazakhstan (Казахстан)</option>
                            <option value="ke">Kenya</option>
                            <option value="ki">Kiribati</option>
                            <option value="kw">Kuwait (‫الكويت‬‎)</option>
                            <option value="kg">Kyrgyzstan (Кыргызстан)</option>
                            <option value="la">Laos (ລາວ)</option>
                            <option value="lv">Latvia (Latvija)</option>
                            <option value="lb">Lebanon (‫لبنان‬‎)</option>
                            <option value="ls">Lesotho</option>
                            <option value="lr">Liberia</option>
                            <option value="ly">Libya (‫ليبيا‬‎)</option>
                            <option value="li">Liechtenstein</option>
                            <option value="lt">Lithuania (Lietuva)</option>
                            <option value="lu">Luxembourg</option>
                            <option value="mo">Macau (澳門)</option>
                            <option value="mk">Macedonia (FYROM) (Македонија)</option>
                            <option value="mg">Madagascar (Madagasikara)</option>
                            <option value="mw">Malawi</option>
                            <option value="my">Malaysia</option>
                            <option value="mv">Maldives</option>
                            <option value="so">Mali</option>
                            <option value="mt">Malta</option>
                            <option value="mh">Marshall Islands</option>
                            <option value="mq">Martinique</option>
                            <option value="mr">Mauritania (‫موريتانيا‬‎)</option>
                            <option value="mu">Mauritius (Moris)</option>
                            <option value="mx">Mexico (México)</option>
                            <option value="fm">Micronesia</option>
                            <option value="md">Moldova (Republica Moldova)</option>
                            <option value="mc">Monaco</option>
                            <option value="mn">Mongolia (Монгол)</option>
                            <option value="me">Montenegro (Crna Gora)</option>
                            <option value="ms">Montserrat</option>
                            <option value="ma">Morocco</option>
                            <option value="mz">Mozambique (Moçambique)</option>
                            <option value="mm">Myanmar (Burma) (မြန်မာ)</option>
                            <option value="na">Namibia (Namibië)</option>
                            <option value="nr">Nauru</option>
                            <option value="np">Nepal (नेपाल)</option>
                            <option value="nl">Netherlands (Nederland)</option>
                            <option value="nc">New Caledonia (Nouvelle-Calédonie)</option>
                            <option value="nz">New Zealand</option>
                            <option value="ni">Nicaragua</option>
                            <option value="ng">Niger (Nijar)</option>
                            <option value="ng">Nigeria</option>
                            <option value="nu">Niue</option>
                            <option value="nf">Norfolk Island</option>
                            <option value="mp">Northern Mariana Islands</option>
                            <option value="kp">North Korea (조선민주주의인민공화국)</option>
                            <option value="no">Norway (Norge)</option>
                            <option value="ro">Oman (‫عُمان‬‎)</option>
                            <option value="pk">Pakistan (‫پاکستان‬‎)</option>
                            <option value="pw">Palau</option>
                            <option value="ps">Palestine (‫فلسطين‬‎)</option>
                            <option value="pa">Panama (Panamá)</option>
                            <option value="pg">Papua New Guinea</option>
                            <option value="py">Paraguay</option>
                            <option value="pe">Peru (Perú)</option>
                            <option value="ph">Philippines</option>
                            <option value="pl">Poland (Polska)</option>
                            <option value="pt">Portugal</option>
                            <option value="pr">Puerto Rico</option>
                            <option value="qa">Qatar (‫قطر‬‎)</option>
                            <option value="re">Réunion (La Réunion)</option>
                            <option value="ro">Romania (România)</option>
                            <option value="ru">Russia (Россия)</option>
                            <option value="rw">Rwanda</option>
                            <option value="ws">Samoa</option>
                            <option value="sm">San Marino</option>
                            <option value="st">São Tomé &amp; Príncipe (São Tomé e Príncipe)</option>
                            <option value="sa">Saudi Arabia (‫المملكة العربية السعودية‬‎)</option>
                            <option value="sn">Senegal</option>
                            <option value="rs">Serbia (Србија)</option>
                            <option value="sc">Seychelles</option>
                            <option value="sl">Sierra Leone</option>
                            <option value="sg">Singapore</option>
                            <option value="sx">Sint Maarten</option>
                            <option value="sk">Slovakia (Slovensko)</option>
                            <option value="si">Slovenia (Slovenija)</option>
                            <option value="sb">Solomon Islands</option>
                            <option value="so">Somalia (Soomaaliya)</option>
                            <option value="za">South Africa</option>
                            <option value="kr">South Korea (대한민국)</option>
                            <option value="ss">South Sudan (‫جنوب السودان‬‎)</option>
                            <option value="es">Spain (España)</option>
                            <option value="lk">Sri Lanka (ශ්‍රී ලංකාව)</option>
                            <option value="bl">Saint Barthélemy (Saint-Barthélemy)</option>
                            <option value="sh">Saint Helena, Ascension &amp; Tristan da Cunha</option>
                            <option value="kn">Saint Kitts &amp; Nevis</option>
                            <option value="lc">Saint Lucia</option>
                            <option value="mf">Saint Martin (Saint-Martin)</option>
                            <option value="pm">Saint Pierre &amp; Miquelon (Saint-Pierre-et-Miquelon)</option>
                            <option value="vc">Saint Vincent &amp; Grenadines</option>
                            <option value="sd">Sudan (‫السودان‬‎)</option>
                            <option value="sr">Suriname</option>
                            <option value="sz">Swaziland</option>
                            <option value="se">Sweden (Sverige)</option>
                            <option value="ch">Switzerland (Schweiz)</option>
                            <option value="sy">Syria (‫سوريا‬‎)</option>
                            <option value="tw">Taiwan (台灣)</option>
                            <option value="tj">Tajikistan</option>
                            <option value="tz">Tanzania</option>
                            <option value="th">Thailand (ไทย)</option>
                            <option value="tl">Timor-Leste</option>
                            <option value="tg">Togo</option>
                            <option value="tk">Tokelau</option>
                            <option value="to">Tonga</option>
                            <option value="tt">Trinidad &amp; Tobago</option>
                            <option value="tn">Tunisia</option>
                            <option value="tr">Turkey (Türkiye)</option>
                            <option value="tm">Turkmenistan</option>
                            <option value="tc">Turks &amp; Caicos Islands</option>
                            <option value="tv">Tuvalu</option>
                            <option value="vi">U.S. Virgin Islands</option>
                            <option value="ug">Uganda</option>
                            <option value="ua">Ukraine (Україна)</option>
                            <option value="ae">United Arab Emirates (‫الإمارات العربية المتحدة‬‎)</option>
                            <option value="gb">United Kingdom</option>
                            <option value="us">United States</option>
                            <option value="uy">Uruguay</option>
                            <option value="uz">Uzbekistan (Oʻzbekiston)</option>
                            <option value="vu">Vanuatu</option>
                            <option value="va">Vatican City (Città del Vaticano)</option>
                            <option value="ve">Venezuela</option>
                            <option value="vn">Vietnam (Việt Nam)</option>
                            <option value="wf">Wallis &amp; Futuna</option>
                            <option value="ye">Yemen (‫اليمن‬‎)</option>
                            <option value="zm">Zambia</option>
                            <option value="zw">Zimbabwe</option>
                          </select>
                        </div>
                        </div>
                     <div class="col-sm-6">

                       <div class="form-group">
                          <label for="demo-select2-4" class="form-label">Province</label>
                          <select id="demo-select2-4" class="form-control" data-rule-required="true">
                                <option value="AB">AB</option>
                                <option value="BC">BC</option>
                                <option value="MB">MB</option>
                                <option value="NB" selected="selected">NB</option>
                                <option value="NL">NL</option>
                                <option value="NS">NS</option>
                                <option value="NT">NT</option>
                                <option value="NU">NU</option>
                                <option value="ON">ON</option>
                                <option value="PEI">PEI</option>
                                <option value="QC">QC</option>
                                <option value="SK">SK</option>
                                <option value="YK">YK</option>
                                </select>


                        </div>
                      </div>

                      <div class="col-sm-6">

                        <div class="form-group">
                            <label for="postalcode" class="control-label">Postal Code</label>
                            <input id="postalcode" class="form-control" type="text" name="postalcode" spellcheck="false" autocomplete="on" data-rule-required="true" data-rule-number="true" data-msg-required="Please enter a valid Postal Code." data-rule-minlength="3">


                      </div>
                      </div>

                <div class="col-sm-6">
                      <div class="form-group">
                            <label for="city" class="control-label">City</label>
                            <input id="city" class="form-control" type="text" name="city" spellcheck="false" autocomplete="on" data-rule-required="true">


                      </div>
                </div>


                <div class="col-sm-12">
                      <div class="form-group">
                            <label for="street" class="control-label">Street Name</label>
                            <input id="street" class="form-control" type="text" name="street" spellcheck="false" autocomplete="on" data-rule-required="true">


                      </div>

                      <div class="form-group">
                            <label for="address" class="control-label">Address</label>
                            <input id="address" class="form-control" type="text" name="address" spellcheck="false" autocomplete="on" data-rule-required="true">


                      </div>

                </div>

    <div class="col-sm-12">
    <label for="Propertytype" class="control-label">Property type</label>

       <div class="grid grid--3">
            <button type="button" tabindex="9" id="btnPropertyType" value="CANBuild" data-test="hpf-propertyflat" class="button button--white button-multi button-multi--tall button-multi--selected" data-bind="click : aboutTheProperty.propertyTypeClick">
                Apartment
                </button>
            <button type="button" tabindex="10" id="btnPropertyType" value="CAN1" data-test="hpf-propertyhouse" class="button button--white button-multi button-multi--tall" data-bind="click : aboutTheProperty.propertyTypeClick">
                House
                </button>
            <button type="button" tabindex="11" id="btnPropertyType" value="CAN7" data-test="hpf-propertystudio" class="button button--white button-multi button-multi--tall" data-bind="click : aboutTheProperty.propertyTypeClick">
                Studio
                </button>


        </div>

     <div class="signup__row signup__row--padded tooltips" id="divTotalNumberOfBedrooms">
         <label for="numberofbedrooms" class="control-label">Total number of bedrooms</label>

        <div class="grid grid--9">
                <button type="button" id="btnTotalNoOfBedrooms" value="1" class="button button--white button-multi button-multi--tall" data-bind="click: totalBedroomsClick" tabindex="12" data-test="hpf-numberbeds1">
                    1
                </button>
                <button type="button" id="btnTotalNoOfBedrooms" value="2" class="button button--white button-multi button-multi--tall" data-bind="click: aboutTheProperty.totalBedroomsClick" tabindex="13" data-test="hpf-numberbeds2">
                    2
                </button>
                <button type="button" id="btnTotalNoOfBedrooms" value="3" class="button button--white button-multi button-multi--tall" data-bind="click: aboutTheProperty.totalBedroomsClick" tabindex="14" data-test="hpf-numberbeds3">
                    3
                </button>
                <button type="button" id="btnTotalNoOfBedrooms" value="4" class="button button--white button-multi button-multi--tall" data-bind="click: aboutTheProperty.totalBedroomsClick" tabindex="15" data-test="hpf-numberbeds4">
                    4
                </button>
                <button type="button" id="btnTotalNoOfBedrooms" value="5" class="button button--white button-multi button-multi--tall" data-bind="click: aboutTheProperty.totalBedroomsClick" tabindex="16" data-test="hpf-numberbeds5">
                    5
                </button>
                <button type="button" id="btnTotalNoOfBedrooms" value="6" class="button button--white button-multi button-multi--tall" data-bind="click: aboutTheProperty.totalBedroomsClick" tabindex="17" data-test="hpf-numberbeds6">
                    6
                </button>
                <button type="button" id="btnTotalNoOfBedrooms" value="7" class="button button--white button-multi button-multi--tall" data-bind="click: aboutTheProperty.totalBedroomsClick" tabindex="18" data-test="hpf-numberbeds7">
                    7
                </button>
                <button type="button" id="btnTotalNoOfBedrooms" value="8" class="button button--white button-multi button-multi--tall" data-bind="click: aboutTheProperty.totalBedroomsClick" tabindex="19" data-test="hpf-numberbeds8">
                    8
                </button>
                <button type="button" id="btnTotalNoOfBedrooms" value="9" class="button button--white button-multi button-multi--tall" data-bind="click: aboutTheProperty.totalBedroomsClick" tabindex="20" data-test="hpf-numberbeds9">
                    9+
                </button>


    </div>
</div>
    </div>


 <div class="col-sm-12">
                        <div class="form-group">

                          <select id="demo-select2-4" class="form-control" data-rule-required="true">
                                <option value="10">1 bathroom</option>
                            <option value="15">1.5 bathrooms</option>
                            <option value="20">2 bathrooms</option>
                            <option value="25">2.5 bathrooms</option>
                            <option value="30">3 bathrooms</option>
                            <option value="35">3.5 bathrooms</option>
                            <option value="40">4 bathrooms</option>
                            <option value="45">4.5 bathrooms</option>
                            <option value="50">5 bathrooms</option>
                            <option value="55">5.5 bathrooms</option>
                            <option value="60">6 or more bathrooms</option>
                            </select>
                        </div>


    </div>


        <div class="col-sm-7">
             <label for="demo-select2-4" class="form-label" >Apartment Amenities</label><br>
                 <label for="A/C"><input type="checkbox" id="one"/> A/C </label><br>
                 <label for=" Heating"><input type="checkbox" id="two"/> Heating </label><br>
                 <label for="Hot Water"><input type="checkbox" id="three"/> Hot Water </label><br>
                 <label for="Electricity"><input type="checkbox" id="four"/> Electricity </label><br>
                 <label for="Wifi"><input type="checkbox" id="five"/> Wifi</label><br>
                 <label for="TV"><input type="checkbox" id="six"/> TV </label><br>
                 <label for="Home Phone"><input type="checkbox" id="seven"/> Home Phone</label><br>
                <label for="Laundry"><input type="checkbox" id="eight"/> Laundry In-Unit</label><br>
                 <label for="Fridge"><input type="checkbox" id="nine"/> Fridge </label><br>
                 <label for="Stove"><input type="checkbox" id="ten"/> Stove </label><br>
                 <label for="Dishwasher"><input type="checkbox" id="eleven"/> Dishwasher </label><br>
                 <label for="Microwave"><input type="checkbox" id="twelve"/> Microwave </label><br>
                 <label for="Kitchen Amenities"><input type="checkbox" id="thirteen"/> Other Kitchen Amenities </label><br>
                 <label for="Furnished"><input type="checkbox" id="fourteen"/> Furnished </label><br>
                 <label for="Wood Floor"><input type="checkbox" id="fiveteen"/> Wood Floor </label><br>
                 <label for="Tiles Floor"><input type="checkbox" id="sixteen"/> Tiles Floor</label><br>
                 <label for="Carpet"><input type="checkbox" id="seveteen"/> Carpet </label><br>
                 <label for="Friendly"><input type="checkbox" id="eighteen"/> Pet Friendly </label><br>
                 <label for="Balcony"><input type="checkbox" id="nineteen"/> Balcony </label><br>
            </div>

         <div class="col-sm-5">
             <label for="demo-select2-4" class="form-label">Property Amenities</label><br>

                 <label for="one"><input type="checkbox" id="one"/> Hi-Rise /Low Rise </label><br>
                 <label for="two"><input type="checkbox" id="two"/> Elevator</label><br>
                 <label for="three"><input type="checkbox" id="three"/> Concierge/Janitor</label><br>
                 <label for="four"><input type="checkbox" id="four"/> Security/Doorman </label><br>
                 <label for="five"><input type="checkbox" id="five"/> Administration</label><br>
                 <label for="six"><input type="checkbox" id="six"/> Gym </label><br>
                 <label for="seven"><input type="checkbox" id="seven"/> Pool</label><br>
                <label for="eight"><input type="checkbox" id="eight"/> Sauna</label><br>
                 <label for="nine"><input type="checkbox" id="nine"/> Laundry In-Building</label> <br>
                 <label for="ten"><input type="checkbox" id="ten"/> Terrace</label><br>
                 <label for="eleven"><input type="checkbox" id="eleven"/> Indoor Parking</label><br>
                 <label for="twuelve"><input type="checkbox" id="twelve"/> outdoor Parking</label><br>
                 <label for="thirteen"><input type="checkbox" id="thirteen"/> Storage/Locker Space</label><br>
                 <label for="fourteen"><input type="checkbox" id="fourteen"/> Cleaning Service</label><br>

            </div>


<div class="col-sm-6">
<div class="form-group">
                          <label for="leaseterm" class="control-label">Minimum Lease Term</label>
                          <select id="demo-select2-4" class="form-control" data-rule-required="true">
                                <option value="6months">6 months</option>
                                <option value="1year">1 year</option>
                                <option value="Over1year" selected="selected">Over 1 year</option>
                                </select>


                        </div>

                         </div>


<div class="col-sm-3">
  <div class="form-group">
                            <label for="rent" class="control-label">Rent (price of rent)</label>
                            <div><label for="rent" class="control-label">$</label><input id="priceAmount" name="postAdForm.priceAmount" class="price-button" data-dependent-change="required,disabled,focus,clear" data-type="price" data-dependent="true" data-max="99999999.99" data-dependent-on="#priceType1" type="number" value="" maxlength="11" data-rule-required="true" data-msg-required="Please enter a value"data-rule-min="15">

                            </div>
                          </div>


            </div>

       <div class="col-sm-3">
        <div class="form-group">
                          <label for="demo-select2-8" class="form-label">Furnished</label>
                          <select id="demo-select2-8" class="form-control" data-rule-required="true">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                                                  </select>

                          </div>

       </div>
       <div class="col-sm-6">
           <div class="form-group">
                          <label for="demo-select2-6" class="form-label">Pets Allowed</label>
                          <select id="demo-select2-6" class="form-control" data-rule-required="true">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                                                  </select>

                          </div>
       </div>
       <div class="col-sm-6">
        <div class="form-group">
                          <label for="demo-select6-7" class="form-label">Parking Included</label>
                          <select id="demo-select6-7" class="form-control" data-rule-required="true">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="No parking Available">No parking Available</option>
                                                  </select>

                          </div>
       </div>

<button class="btn btn-primary btn-block btn-next" type="button">NEXT</button>
</div>
                        </div>


                    </div>
                    <div id="step-3" class="tab-pane">
                      <h4 class="text-center m-y-md">
                        <span>Enter your payment details</span>
                      </h4>
                      <div class="row">
                        <div class="col-sm-8 col-sm-offset-2">
                          <div class="form-group">
                            <label for="creditcard-type-2" class="control-label">Card type</label>
                            <select id="creditcard-type-2" class="custom-select" name="creditcard_type_2" data-rule-required="true" data-msg-required="Please select your credit card type.">
                              <option value="" selected="selected">Select a card</option>
                              <option value="v">Visa</option>
                              <option value="m">MasterCard</option>
                              <option value="a">American Express</option>
                              <option value="d">Discover</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label for="creditcard-number-2" class="control-label">Card number</label>
                            <input id="creditcard-number-2" class="form-control" type="text" name="creditcard_number_2" data-rule-required="true" data-rule-creditcard="true" data-msg-required="Please enter your credit card number." data-msg-creditcard="Please enter a valid credit card number.">
                          </div>
                          <div class="form-group">
                            <div class="row gutter-xs">
                              <div class="col-xs-6">
                                <div class="form-group">
                                  <label for="creditcard-expdate-month-2" class="control-label">Expiration Date</label>
                                  <div class="row gutter-xs">
                                    <div class="col-xs-6">
                                      <select id="creditcard-expdate-month-2" class="custom-select" name="creditcard_expdate_month_2">
                                        <option value="1">01</option>
                                        <option value="2">02</option>
                                        <option value="3">03</option>
                                        <option value="4">04</option>
                                        <option value="5">05</option>
                                        <option value="6">06</option>
                                        <option value="7">07</option>
                                        <option value="8">08</option>
                                        <option value="9" selected="selected">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                      </select>
                                    </div>
                                    <div class="col-xs-6">
                                      <select class="custom-select" name="creditcard_expdate_year_2">
                                        <option value="2016" selected="selected">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                        <option value="2031">2031</option>
                                        <option value="2032">2032</option>
                                        <option value="2033">2033</option>
                                        <option value="2034">2034</option>
                                        <option value="2035">2035</option>
                                        <option value="2036">2036</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-xs-5 col-xs-offset-1">
                                <div class="form-group">
                                  <label for="creditcard-csc-2" class="control-label">Card Security Code</label>
                                  <input id="creditcard-csc-2" class="form-control" type="text" name="creditcard_csc_2" data-rule-required="true" data-rule-minlength="3" data-rule-maxlength="4" data-msg-required="Please enter your credit card CSC (Card Security Code)." data-msg-minlength="Please enter a valid CSC (Card Security Code)" data-msg-maxlength="Please enter a valid CSC (Card Security Code)">
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="coupon-code-2" class="control-label">Coupon code</label>
                            <input id="coupon-code-2" class="form-control" type="text" name="coupon_code_2">
                          </div>
                          <div class="form-group">
                            <p>
                              <small>By clicking Submit, you agree to our <a href="#">Terms</a> and that you have read our <a href="#">Data Policy</a>, including our <a href="#">Cookie Use</a>.</small>
                            </p>
                            <button class="btn btn-primary btn-block" type="submit">Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <script src="js/vendor.min.js"></script>
    <script src="js/elephant.min.js"></script>
    <script src="js/application.min.js"></script>
    <script src="js/demo.min.js"></script>
    <script src="dropzone/dist/dropzone.js"></script>
    <script type="text/javascript">

    </script>
  </body>
</html>
