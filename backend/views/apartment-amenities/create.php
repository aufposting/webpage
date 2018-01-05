<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\ApartmentAmenities */

$this->title = Yii::t('app', 'Create Apartment Amenities');
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Apartment Amenities'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="apartment-amenities-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
