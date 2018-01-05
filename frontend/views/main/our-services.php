<?php

$this->title = Yii::t('app', 'Our Services');

$this->registerMetaTag(['name' => 'keywords', 'content' => 'Our, Services, Page']);
$this->registerMetaTag(['name' => 'description', 'content' => 'Our Services Page']);

$this->params['breadcrumbs'][] = $this->title;

?>

<section class="paddingT padding-services">
    <div class="container">
        <div class="row">
            <div id="contentSection" class="col-xs-12">
                <h1 class="col-xs-12 text-center text-capitalize">
                    <?= $this->title ?>
                </h1>
                <p>
                    <?= Yii::t('app', 'We know and understand that the process of filling vacancies can be tedious AND expensive. The good news is that it doesn’t have to be, IF you join the countless landlords and building owners with Auf Posting by their side!
                    Auf Posting is an online listing distribution solution that allows you to effortlessly extend your marketing reach. Here are few our amazing services:') ?>
                </p>
                <dl>
                    <dt>
                        <?= Yii::t('app', 'Regular package- refreshed one week') ?>
                    </dt>
                    <dd>
                        <?= Yii::t('app', 'This package offers you instant visibility on over 50 sites and we renew your listing once a week.') ?>
                    </dd>
                    <dt>
                        <?= Yii::t('app', 'Kijiji Premium Package') ?>
                    </dt>
                    <dd>
                        <?= Yii::t('app', 'The Kijiji premium package offers you daily re-post on the most visited site on the internet.
                        The premium package boosts your vacancy, commercial or real estate, every day, to the front page of the section.') ?>
                    </dd>
                    <dt>
                        <?= Yii::t('app', 'Kijiji Premium Hourly Package') ?>
                    </dt>
                    <dd>
                        <?= Yii::t('app', 'As the name indicates, this options offers you the ability to have your vacancy re-posted every hour to the front page of the section.') ?>
                    </dd>
                    <dt>
                        <?= Yii::t('app', 'Apartment Hunter feature. // only available for Residential properties.') ?>
                    </dt>
                    <dd>
                        <?= Yii::t('app', 'This feature allows us to generates leads from people actively looking to move. We match your leads based on three (3) criteria: a. Rent amount b. Location c. Size of the unit.') ?>
                    </dd>
                    <dt>
                        <?= Yii::t('app', 'Craigslist Auto Re-Post Package') ?>
                    </dt>
                    <dd>
                        <?= Yii::t('app', 'This feature offers the ability to have your ads posted on the first page of Craigslist, every hour for up to 9 hours per day for a max of 12 days per month.') ?>
                    </dd>
                </dl>
                <p>
                    <?= Yii::t('app', 'YOUR success is OUR priority, and exposing your vacancies is what we do best.
Make Auf Posting a part of your life today, and finally give your vacancies the exposure they deserve!
Contact us today for more information or to create your own custom package.') ?>
                </p>
                <br>
            </div>
        </div>
    </div>
</section>
