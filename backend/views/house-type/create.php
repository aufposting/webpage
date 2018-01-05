<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\HouseType */

$this->title = Yii::t('app', 'Create House Type');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'House Types'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="house-type-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
