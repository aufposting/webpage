<?php
use yii\helpers\Html;

/* @var $this \yii\web\View */
/* @var $content string */
?>

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

<header class="main-header">

    <?= Html::a('<span class="logo-mini">' . Yii::t('app','AUF') . '</span><span class="logo-lg">' . Yii::t('app','AUFPosting') . '</span>', Yii::$app->homeUrl, ['class' => 'logo']) ?>

    <nav class="navbar navbar-static-top" role="navigation">

        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>

        <div class="navbar-custom-menu">

            <ul class="nav navbar-nav">

                <!-- User Account: style can be found in dropdown.less -->

                <li class="dropdown user user-menu">
                    <a href="<?php echo yii\helpers\Url::to(['/site/logout/']); ?>" class="btn" data-method="post"><i class="fa fa-remove"></i> Sign out</a>

                </li>
            </ul>
        </div>
    </nav>
</header>
