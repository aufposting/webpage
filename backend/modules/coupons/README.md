<h1 style="text-align: center;">Installation</h1>

<h3>Migrations</h3>

    yii migrate --migrationPath=@backend/modules/coupons/migrations
    
<h3>Requirements</h3>

<strong>Kartik File Input</strong>

    php composer.phar require kartik-v/yii2-widget-fileinput "@dev"
    
<strong>2Amigos DateTimePicker</strong>

    composer require 2amigos/yii2-date-time-picker-widget:~1.0
    
<h3>Usage</h3>

<strong>In config/main.php add this...</strong>

       'modules' => [
            'coupons' => [
                'class' => 'backend\modules\coupons\Coupons',
            ],
        ],
        
<strong>Use Coupons Module</strong>

     $coupons = Yii::$app->getModule('coupons');

<strong>Getting price after entering coupon code</strong>
    
    $price = $coupons->getPrice('COUPON CODE GOES HERE', 'PRICE GOES HERE');
    
<strong>Reduce coupons count after use</strong>

    $coupons->reduceCouponCount('COUPON CODE GOES HERE');


    