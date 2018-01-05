<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-frontend',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'defaultRoute' => 'main',
    'sourceLanguage' => 'en-US',
    'controllerNamespace' => 'frontend\controllers',
    'modules' => [
        'coupons' => [
            'class' => 'backend\modules\coupons\Coupons',
        ],
    ],
    'components' => [
        'request' => [
            'csrfParam' => '_csrf-frontend',
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-frontend', 'httpOnly' => true],
            'mailer' => [
                'class'=>'yii\swiftmailer\Mailer',
                'useFileTransport'=>true,
                'sender' => ['no-reply@myhost.com' => 'Sender name'], // or ['no-reply@myhost.com' => 'Sender name']
                'welcomeSubject' => 'Welcome',
                'confirmationSubject' => 'Confirmation',
                'reconfirmationSubject' => 'Email change',
                'recoverySubject' => 'Recovery',

            ],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the frontend
            'name' => 'advanced-frontend',
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'main/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'blog/index' => "blog/index",
                'blog/<slug>' => "blog/blog",
                'listing-section/index' => "listing-section/index",
                'listing-section/<slug>' => "listing-section/listing",
            ],
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => '@frontend/mail',
            'useFileTransport' => false,//set this property to false to send mails to real email addresses
            //comment the following array to send mail using php's mail function
            'transport' => [
                'class' => 'Swift_SmtpTransport',
                'host' => 'cloud1032.hostgator.com',
                'username' => 'info@aufposting.com',
                'password' => 's&TNM&qsHvfi', //Move this into params
                'port' => '465',
                'encryption' => 'ssl',
                'streamOptions' => [
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    ],
                ],
            ],
        ],
    ],
    'params' => $params,
];
