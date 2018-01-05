<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\redactor\widgets\Redactor;

/* @var $this yii\web\View */
/* @var $model common\models\ListingSection */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="listing-section-form">

    <?php $form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data']]) ?>

    <?= $form->field($model, 'title')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'keywords')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'description')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'short_text')->textarea(['rows' => 6]) ?>

    <?= $form->field($model, 'content')->widget(Redactor::className(),
        [
            'clientOptions' =>
                [
                    'imageUpload' => \yii\helpers\Url::to(['/redactor/upload/image']),
                    'fileUpload' => false,
                    'plugins' => ['fontcolor', 'imagemanager', 'table', 'undoredo','clips', 'fullscreen'],
                ]
        ])
    ?>

    <?= $form->field($model, 'is_active')->dropDownList(['0' => Yii::t('app','Passive'), '1' => Yii::t('app','Active')],['prompt' => Yii::t('app','--  Select Activity  --')]) ?>

    <div class="col-xs-12 divHeader">
        <h4>
            <?= Yii::t('app', 'Translations') ?>
        </h4>
    </div>
    <div class="col-xs-12 divContent">
        <br>

        <?= $form->field($model_translations, 'title')->textInput(['maxlength' => true]) ?>

        <?= $form->field($model_translations, 'short_text')->textarea(['rows' => 6]) ?>

        <?= $form->field($model_translations, 'content')->widget(Redactor::className(),
            [
                'clientOptions' =>
                    [
                        'imageUpload' => \yii\helpers\Url::to(['/redactor/upload/image']),
                        'fileUpload' => false,
                        'plugins' => ['fontcolor', 'imagemanager', 'table', 'undoredo','clips', 'fullscreen'],
                    ]
            ]) ?>

    </div>
    <div class="clearfix"></div>
    <br>
    <div class="imageupload">
              <?= $form->field($model, 'files[]')->fileInput(["multiple"=>"multiple",'id'=>"files"]) ?>
              <?php if(isset($_GET['id'])) { ?>
              <div class="old-files">
                  <?php
                  $rows = (new \yii\db\Query())
    ->select(['id', 'files'])
    ->from('listing_section')
    ->where(['id' => $_GET['id']])
    ->limit(1)
    ->one();
    if(!empty($rows['files'])) {
        $explodeFiles = explode(',',$rows['files']);
        foreach ($explodeFiles as $fir) {
            ?>
            <span id="up-files<?php echo $_GET['id']; ?>" class="pip"><img class="imageThumb" src="http://<?php echo Yii::$app->getRequest()->serverName; ?>/frontend/web/img/uploads/<?php echo $fir; ?>" title="Image"><br><span class="removefile" onclick="removeUploadedFiles('<?php echo $fir; ?>',<?php echo $_GET['id']; ?>)" >Remove image</span></span>
        <?php }
    }
    
                   ?>
              </div>
              <?php } ?>
    </div>
    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ?  Yii::t('app','Create') :  Yii::t('app','Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
