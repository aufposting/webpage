<?php

$query = new \yii\db\Query();
$query->select([
    'user.username',
])
    ->from('user')
    ->where(['id' => Yii::$app->user->identity->id])
    ->one();

$command = $query->createCommand();
$data = $command->queryAll();

?>

<aside class="main-sidebar">

    <section class="sidebar">

        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="<?= Yii::$app->homeUrl . 'images/default.png' ?>" class="img-circle" alt="Admin_Image"/>
            </div>
            <div class="pull-left info">
                <p>
                    <?= Yii::t('app','Admin') ?>
                </p>
                <p>
                    <i class="fa fa-circle text-success"></i>
                    <?= Yii::t('app','Online') ?>
                </p>
            </div>
        </div>

        <?= dmstr\widgets\Menu::widget(
            [
                'options' => ['class' => 'sidebar-menu'],
                'items' => [
                    ['label' => Yii::t('app','Visit Site'), 'icon' => 'fa fa-link', 'url' => ['../../frontend/web/']],
                    ['label' => Yii::t('app','Dashboard'), 'icon' => 'fa fa-dashboard', 'url' => ['/site/']],
                    ['label' => Yii::t('app','Coupons'), 'icon' => 'fa fa-id-card-o', 'url' => ['/coupons/index'], 'active' => Yii::$app->controller->id == 'coupons'],
                    ['label' => Yii::t('app','Payments'), 'icon' => 'fa fa-paypal', 'url' => ['/payments/index'], 'active' => Yii::$app->controller->id == 'payments'],
                    ['label' => Yii::t('app','Payment Details'), 'icon' => 'fa fa-money', 'url' => ['/payment-details/index'], 'active' => Yii::$app->controller->id == 'payment-details'],
                    ['label' => Yii::t('app','Package Duration'), 'icon' => 'fa fa-clock-o', 'url' => ['/package-duration/index'], 'active' => Yii::$app->controller->id == 'package-duration'],
                    ['label' => Yii::t('app','Blog'), 'icon' => 'fa fa-rss', 'url' => ['/blog/index'], 'active' => Yii::$app->controller->id == 'blog'],
                    ['label' => Yii::t('app','Listing Section'), 'icon' => 'fa fa-puzzle-piece', 'url' => ['/listing-section/index'], 'active' => Yii::$app->controller->id == 'listing-section'],
                    ['label' => Yii::t('app','Submit Data'), 'icon' => 'fa fa-database', 'url' => ['/submit-data/index'], 'active' => Yii::$app->controller->id == 'submit-data'],
                    ['label' => Yii::t('app','Apartment Amenities'), 'icon' => 'fa fa-building', 'url' => ['/apartment-amenities/index'], 'active' => Yii::$app->controller->id == 'apartment-amenities'],
                    ['label' => Yii::t('app','Data Log'), 'icon' => 'fa fa-table', 'url' => ['/data-log/index'], 'active' => Yii::$app->controller->id == 'data-log'],
                    ['label' => Yii::t('app','House Type'), 'icon' => 'fa fa-home', 'url' => ['/house-type/index'], 'active' => Yii::$app->controller->id == 'house-type'],
                    ['label' => Yii::t('app','Location'), 'icon' => 'fa fa-map-marker', 'url' => ['/location/index'], 'active' => Yii::$app->controller->id == 'location'],
                    ['label' => Yii::t('app','Sites'), 'icon' => 'fa fa-sitemap', 'url' => ['/sites/index'], 'active' => Yii::$app->controller->id == 'sites'],
                    ['label' => Yii::t('app','Update Stage'), 'icon' => 'fa fa-clock-o', 'url' => ['/premium-update-stage/index'], 'active' => Yii::$app->controller->id == 'premium-update-stage'],
                ],
            ]
        ) ?>

    </section>

</aside>
