<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\PackageDuration */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="package-duration-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'duration')->textInput() ?>

    <?= $form->field($model, 'discount')->textInput() ?>

    <?= $form->field($model, 'is_status')->dropDownList([1 => 'Active', 0 => 'Passive',], ['prompt' => 'Select Availability']) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
