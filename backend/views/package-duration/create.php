<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\PackageDuration */

$this->title = Yii::t('app', 'Create Package Duration');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Package Durations'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="package-duration-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
