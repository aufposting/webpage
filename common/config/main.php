<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'image' => [
            'class' => 'yii\image\ImageDriver',
            'driver' => 'GD',  //GD or Imagick
        ],
        'paypal'=> [
            'class'        => 'kongoon\yii2\paypal\Paypal',
            'clientId'     => 'ARTeBU3IoxYWbSyslbN7jGhCfCgK_OA-bXwML6w3HQ-jbcYTciN33ij9duy6TWYfAmk9WYiki40lRp2I',
            'clientSecret' => 'EImRN-Z_I56N4DhBBINYHKJKd1il_FqMIDaLFB6ZJwRlE6xCVw6ILamlckrxa9_anm7iq9nOLNuGMBY6',
            'isProduction' => true,
            // This is config file for the PayPal system
            'config'       => [
                'http.ConnectionTimeOut' => 30,
                'http.Retry'             => 1,
                'mode'                   => \kongoon\yii2\paypal\Paypal::MODE_LIVE,    // sandbox | live
                'log.LogEnabled'         => YII_DEBUG ? 1 : 0,
                'log.FileName'           => '@runtime/logs/paypal.log',
                'log.LogLevel'           => \kongoon\yii2\paypal\Paypal::LOG_LEVEL_FINE,  // FINE | INFO | WARN | ERROR
            ]
        ],
    ],
];
