<?php

use yii\bootstrap\ActiveForm;

?>
<div class="entry-content">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="home_top_section">
                    <h1>
                        <?= Yii::t('app', 'Accelerated Marketing for Residential and Commercial Real Estate') ?>
                    </h1>
                </div>
            </div>
        </div>
        <div class="topslidersection">
            <div class="row">
                <div class="col-md-6">
                    <div class="padding-section">
                        <iframe src="https://player.vimeo.com/video/192368255?title=0&byline=0&portrait=0" width="100%" height="358" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="top-slider-content padding-right-section">
                        <h2>
                            <?= Yii::t('app', 'Extend the reach of your marketing effortlessly!') ?>
                        </h2>
                        <div class="size">
                            <p class="MsoNormal" style="box-sizing: border-box; margin: 0px 0px 10px;">
                                <?= Yii::t('app', 'With just one click, AUF Posting will:') ?>
                            </p>
                            <ul style="box-sizing: border-box; margin-top: 10px; margin-bottom: 10px; padding-left: 23px;">
                                <li style="box-sizing: border-box; list-style: none outside none; margin-bottom: 10px;">
                                    <?= Yii::t('app', 'Automatically publish your rental listing to our syndicated network of OVER 40 websites (and counting)') ?>
                                </li>
                                <li style="box-sizing: border-box; list-style: none outside none; margin-bottom: 10px;">
                                    <?= Yii::t('app', 'Reach over 500 thousand monthly targeted visitors across the web.') ?>
                                </li>
                                <li style="box-sizing: border-box; list-style: none outside none; margin-bottom: 10px;">
                                    <?= Yii::t('app', 'Help you fill your vacancies with ease.') ?>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <br>
                    <div class="col-xs-12">
                        <div class="col-xs-12 col-sm-6" style="padding-top: 20px; padding-bottom: 20px;">
                            <span class="promo-btn-m">
                            <a href="<?= Yii::$app->homeUrl ?>main/sign-up">
                                <?= Yii::t('app', 'Get Started') ?>
                            </a>
                        </span>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <a href="<?= Yii::$app->homeUrl ?>main/sign-up">
                                <img src="<?= Yii::$app->homeUrl?>img/icons-01.png" width="200px">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="success" id="success">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2>
                    <?= Yii::t('app', 'AUF Posting focuses solely on your success') ?>
                </h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="success-detail">
                    <div class="success-detail-img">
                        <img src="<?= Yii::$app->homeUrl?>img/boarding.png" alt="">
                    </div>
                    <div class="success-content">
                        <h2>
                            <?= Yii::t('app', 'Effortless Onboarding') ?>
                        </h2>
                        <p class="MsoNormal">
                            <?= Yii::t('app', 'A few simple clicks to provide basic information will get all of your leasing opportunities ready to go; making it easy for you to start generating interest immediately.Getting your rental listing rented has never been so easy.') ?>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="success-detail">
                    <div class="success-detail-img">
                        <img src="<?= Yii::$app->homeUrl?>img/marketing3.png" alt="">
                    </div>
                    <div class="success-content">
                        <h2>
                            <?= Yii::t('app', 'Marketing<br>Expertise') ?>
                        </h2>
                        <p class="MsoNormal">
                            <?= Yii::t('app', 'Whether you need professional photography, customized content or would like to discuss the right tools and strategies to generate the most interest for your leasing opportunities; our experts are ready to help you.') ?>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="success-detail">
                    <div class="success-detail-img">
                        <img src="<?= Yii::$app->homeUrl?>img/megaphone_icon (2).jpg" alt="">
                    </div>
                    <div class="success-content">
                        <h2>
                            <?= Yii::t('app', 'Customer<br>Service') ?>
                        </h2>
                        <p class="MsoNormal">
                            <?= Yii::t('app', 'Our goal is to ensure that you get the full potential of the AUF Posting Platform. Our support team will answer any questions that you may have.') ?>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="clients">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2>
                    <?= Yii::t('app', 'A few of our Partners') ?>
                </h2>
                <div class="clients-list">
                    <img class="hidden-sm hidden-xs" src="<?= Yii::$app->homeUrl ?>img/section.jpg" alt="partners" width="100%">
                    <br>
                    <div id="myCarousel" class="carousel slide visible-sm visible-xs" data-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            <div class="item active">
                                <p class="text-center" style="padding: 50px 5px;">
                                    <img src="<?= Yii::$app->homeUrl?>img/kijiji-logo.png" alt="kijiji" width="300px" height="100px">
                                </p>
                            </div>
                            <div class="item">
                                <p class="text-center" style="padding: 50px 5px;">
                                    <img src="<?= Yii::$app->homeUrl?>img/craigslist-logo.png" alt="craigslist" width="300px" height="100px">
                                </p>
                            </div>
                            <div class="item">
                                <p class="text-center" style="padding: 50px 5px;">
                                    <img src="<?= Yii::$app->homeUrl?>img/facebook.png" alt="facebook" width="300px" height="100px">
                                </p>
                            </div>
                            <div class="item">
                                <p class="text-center" style="padding: 50px 5px;">
                                    <img src="<?= Yii::$app->homeUrl?>img/McGill_Wordmark.png" alt="McGill_Wordmark" width="300px" height="100px">
                                </p>
                            </div>
                            <div class="item">
                                <p class="text-center" style="padding: 50px 5px;">
                                    <img src="<?= Yii::$app->homeUrl?>img/Concordia_University_logo.png" alt="Concordia_University" width="300px" height="100px">
                                </p>
                            </div>
                            <div class="item">
                                <p class="text-center" style="padding: 50px 5px;">
                                    <img src="<?= Yii::$app->homeUrl?>img/Kangalou-Couleur-RGB.png" alt="Kangalou-Couleur" width="300px" height="100px">
                                </p>
                            </div>
                        </div>
                        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="promo-button" id="contact_us">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="promo-btn-m">
                    <a href="#contact-popup" data-toggle="modal" data-target="">
                        <?= Yii::t('app', 'Contact Us') ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="contact-popup" class="modal fade" role="dialog" aria-labelledby="myModalLabel" tabindex="-1">
    <div class="contact-pop-m">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="contact_form">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>

                        <h3><?= Yii::t('app', 'Contact Us') ?></h3>

                        <?php $form = ActiveForm::begin(); ?>

                        <?= $form->field($model, "name")->textInput(["placeholder" => Yii::t('app', 'Name')])->label(false) ?>

                        <?= $form->field($model, "email")->textInput(["placeholder" => Yii::t('app', 'Email')])->label(false) ?>

                        <?= $form->field($model, "subject")->textInput(["placeholder" => Yii::t('app', 'Subject')])->label(false) ?>

                        <?= $form->field($model, "body")->textarea(["placeholder" => Yii::t('app', 'Message')])->label(false) ?>

                        <div class="g-recaptcha" data-sitekey="6Ld33BsUAAAAAHf-q3ng7oqaxsvI1F96YsQeNkeM"></div>

                        <div class="helper-block success_e">
                            <?php if(isset($errorMsg)){ ?>

                                <script>
                                    setTimeout(function () {
                                        $('#contact-popup').modal('show');
                                    }, 1000);
                                </script>

                            <?php echo $errorMsg; } ?>
                        </div>

                        <?= \yii\helpers\Html::submitButton(Yii::t('app', 'Send'),['class'=>'btn'])?>

                        <?php ActiveForm::end(); ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>