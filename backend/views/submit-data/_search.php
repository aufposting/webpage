<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\models\SubmitDataControl */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="submit-data-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'published') ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'login') ?>

    <?= $form->field($model, 'pass') ?>

    <?= $form->field($model, 'rent') ?>

    <?php // echo $form->field($model, 'title') ?>

    <?php // echo $form->field($model, 'package_id') ?>

    <?php // echo $form->field($model, 'package_duration_id') ?>

    <?php // echo $form->field($model, 'content') ?>

    <?php // echo $form->field($model, 'name') ?>

    <?php // echo $form->field($model, 'l_name') ?>

    <?php // echo $form->field($model, 'gender') ?>

    <?php // echo $form->field($model, 'phone') ?>

    <?php // echo $form->field($model, 'email') ?>

    <?php // echo $form->field($model, 'contact_time') ?>

    <?php // echo $form->field($model, 'city') ?>

    <?php // echo $form->field($model, 'postal_code') ?>

    <?php // echo $form->field($model, 'street') ?>

    <?php // echo $form->field($model, 'address') ?>

    <?php // echo $form->field($model, 'property_amenities_ids') ?>

    <?php // echo $form->field($model, 'apartment_ids') ?>


    <?php // echo $form->field($model, 'apt_size') ?>

    <?php // echo $form->field($model, 'bedroom') ?>

    <?php // echo $form->field($model, 'bathroom') ?>

    <?php // echo $form->field($model, 'house_type_id') ?>

    <?php // echo $form->field($model, 'available_date') ?>

    <?php // echo $form->field($model, 'pets') ?>

    <?php // echo $form->field($model, 'parking_count') ?>

    <?php // echo $form->field($model, 'parking_price') ?>

    <?php // echo $form->field($model, 'image_url') ?>

    <?php // echo $form->field($model, 'contact_person') ?>

    <?php // echo $form->field($model, 'zone') ?>

    <?php // echo $form->field($model, 'lease_length') ?>

    <?php // echo $form->field($model, 'region') ?>

    <?php // echo $form->field($model, 'region_iso') ?>

    <div class="form-group">
        <?= Html::submitButton(Yii::t('app', 'Search'), ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton(Yii::t('app', 'Reset'), ['class' => 'btn btn-default']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
