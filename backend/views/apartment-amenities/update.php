<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\ApartmentAmenities */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'Apartment Amenities',
]) . $model->id;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Apartment Amenities'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="apartment-amenities-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
