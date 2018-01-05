<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\PremiumUpdateStage */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="premium-update-stage-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'stage_hour')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
