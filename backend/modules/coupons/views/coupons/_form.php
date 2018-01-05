<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model backend\modules\coupons\models\Coupons */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="coupons-form">

    <?php $form = ActiveForm::begin([
        'options' => [
            'enctype' => 'multipart/form-data',
        ]
    ]); ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

    <?php

    $initialPreview = [];
    $initialPreviewConfig = [];

    if (!$model->isNewRecord) {

        if ($model->image_url != NULL) {

            $imageName = explode('/', $model->image_url);
            $imageName = $imageName[count($imageName) - 1];

            $initialPreview[] = $model->image_url;

            $initialPreviewConfig[] = [
                'caption' => $imageName,
                'size' => file_exists(Yii::getAlias('@frontend') . '/web/coupons/' . $imageName) ? filesize(Yii::getAlias('@frontend') . '/web/coupons/' . $imageName) : NULL,
                'width' => "120px",
            ];

        }

    }

    ?>

    <?= $form->field($model, 'image')->widget(\kartik\file\FileInput::classname(), [
        'attribute' => 'image',
        'options' => [
            'accept' => 'image/*',
            'multiple' => false,
        ],
        'pluginOptions' => [
            'previewFileType' => 'image',
            'allowedFileExtensions' => ['jpg', 'png'],
            'maxFileSize' => 2048,
            'showPreview' => true,
            'showUpload' => false,
            'showCaption' => true,
            'initialPreview' => $initialPreview,
            'initialPreviewConfig' => $initialPreviewConfig,
            'initialPreviewAsData' => true,
            'overwriteInitial' => true,
            'initialPreviewShowDelete' => false,
            'resizeImages' => true,
        ],
    ]) ?>

    <div class="form-group field-coupons-generate_coupon_code">
        <div class="row">
            <div class="col-md-3 col-sm-5">
                <label class="control-label">
                    <?= Yii::t('app', 'Generate Coupon Code') ?>
                </label>
            </div>
            <div class="col-md-9 col-sm-7">
                <div id="coupons-generate_coupon_code">
                    <label class="control-label">
                        <input type="radio"
                               name="Coupons[generate_coupon_code]"
                               value="1"
                               <?= $model->isNewRecord ? 'checked' : '' ?>
                               onchange='$("#coupons-coupon_code").hide("slow");'>Yes&nbsp;&nbsp;&nbsp;
                    </label>
                    <label class="control-label">
                        <input type="radio"
                               name="Coupons[generate_coupon_code]"
                               value="0"
                               onchange='$("#coupons-coupon_code").show("slow");'
                        >No&nbsp;
                    </label>
                </div>
            </div>
            <div class="help-block"></div>
        </div>
    </div>

    <?= $form->field($model, 'coupon_code')->textInput(['maxlength' => true, 'style' => 'display: none;'])->label(false) ?>

    <?= $form->field($model, 'discount_type')->dropDownList(['percent' => 'Percent', 'price' => 'Price'], ['prompt' => 'Select Discount Type']) ?>

    <?= $form->field($model, 'discount_count')->textInput() ?>

    <?= $form->field($model, 'available_coupons_count')->textInput() ?>

    <?= \dosamigos\datetimepicker\DateTimePicker::widget([
        'model' => $model,
        'attribute' => 'expire_at',
        'clientOptions' => [
            'autoclose' => true,
            'format' => 'yyyy-mm-dd hh:ii:ss',
            'todayBtn' => true
        ]
    ]);?>

    <?= $form->field($model, 'status')->dropDownList(['active' => 'Active', 'passive' => 'Passive',], ['prompt' => 'Select Availability']) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
