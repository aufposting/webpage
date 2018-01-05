<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\ArrayHelper;

/* @var $this yii\web\View */
/* @var $model common\models\Location */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="location-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
    <?php
    $menuList = ArrayHelper::map(\common\models\Location::find()->all(),'id','name');
    ?>

    <?= $form->field($model, 'parent_id')->dropDownList(
        [
            '0' => Yii::t('app','Is Region'),
            Yii::t('app','Is City') => $menuList
        ],
        [
            'prompt' => Yii::t('app','--  Select Location  --')
        ])
    ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
