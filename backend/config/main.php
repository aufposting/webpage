<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-backend',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
	'defaultRoute' => 'site',
    'bootstrap' => ['log'],
    'modules' => [
        'coupons' => [
            'class' => 'backend\modules\coupons\Coupons',
        ],
        'redactor' => [
            'class' => 'yii\redactor\RedactorModule',
            'uploadDir' => '@frontend/web/img/blog-listing',
            'uploadUrl' => '@web/../../frontend/web/img/blog-listing',
            'imageAllowExtensions'=>['jpg','png','jpeg','gif']
        ],
    ],
    'components' => [
        'request' => [
            'csrfParam' => '_csrf-backend',
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],
        ],
        'session' => [
            // this is the name of the session cookie used for login on the backend
            'name' => 'advanced-backend',
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
            'errorAction' => 'site/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'coupons/<action>' => 'coupons/coupons/<action>',
            ],
        ],
	    'captcha' => [
		    'class' => 'jumper423\Captcha',
		    'pathTmp' => '@app/captcha',
		    'apiKey' => 'd4be0583f4b9eeb7b37e62b6dea2fe38',
	    ],
        'view' => [
            'theme' => [
                'pathMap' => [
                    '@app/views' => '@app/views'
                ],
            ],
        ],
        'assetManager' => [
            'bundles' => [
                'dmstr\web\AdminLteAsset' => [
                    'skin' => 'skin-green',
                ],
            ],
        ],
    ],
    'params' => $params,
];
