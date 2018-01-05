<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\PaymentDetails */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="payment-details-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'price')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'currency')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'shipping')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'tax')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'payment_description')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'content')->widget(\yii\redactor\widgets\Redactor::className(),
        [
            'clientOptions' =>
                [
                    'imageUpload' => false,
                    'fileUpload' => false,
                    'plugins' => ['fontcolor', 'table', 'undoredo','clips', 'fullscreen'],
                ]
        ])
    ?>

    <?= $form->field($model, 'content_translation')->widget(\yii\redactor\widgets\Redactor::className(),
        [
            'clientOptions' =>
                [
                    'imageUpload' => false,
                    'fileUpload' => false,
                    'plugins' => ['fontcolor', 'table', 'undoredo','clips', 'fullscreen'],
                ]
        ])
    ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
