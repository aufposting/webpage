<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{

    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/demo.css',
        'css/elephant.css',
        'css/styleStep2.css',
        'css/style.css',
        'css/css.css',
        'css/site-style.css',
    ];
    public $js = [
        'js/scrolling-nav.js',
        'https://www.google.com/recaptcha/api.js',
        'js/script.js',
    ];
    public function init()
    {
        parent::init();
    }
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapPluginAsset',
    ];
}
