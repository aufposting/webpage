<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model backend\modules\coupons\models\Coupons */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'Coupons',
]) . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Coupons'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="coupons-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
