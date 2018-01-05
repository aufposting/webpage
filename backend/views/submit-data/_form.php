<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\ArrayHelper;
use backend\models\LocationControl;
use common\models\ApartmentAmenities;
use common\models\HouseType;
use kartik\file\FileInput;
use yii\helpers\Url;

/* @var $this yii\web\View */
/* @var $model common\models\SubmitData */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="submit-data-form">

    <?php $form = ActiveForm::begin([
        'options' => [
            'enctype' => 'multipart/form-data',
        ]
    ]); ?>

    <div class="col-md-6">
        <?= $form->field($model, 'published')->dropDownList(['0', '1',], ['prompt' => Yii::t('app', 'Select Published or Not')]) ?>
    </div>
    <div class="col-md-6">

        <?php

            $packages = ArrayHelper::map(\common\models\PaymentDetails::find()->all(), 'id', 'name');

            if(!$model->isNewRecord) {
                $model->package_id = explode(',', $model->package_id);
            }

        ?>

        <?= $form->field($model, 'package_id')->checkboxList($packages) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-xs-12">

        <?php

            $package_duration_id = ArrayHelper::map(\common\models\PackageDuration::find()->where(['is_status' => 1])->all(), 'id', 'duration');

        ?>

        <?= $form->field($model, 'package_duration_id')->dropDownList($package_duration_id, ['prompt' => Yii::t('app', 'Select Package Duration')])->label(Yii::t('app', 'Package Duration (Months)')) ?>

    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'login')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'pass')->passwordInput(['maxlength' => true]) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'email')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'l_name')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'gender')->dropDownList(['Male' => 'Male', 'Female' => 'Female']) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'phone')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'postal_code')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'street')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'address')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-12">
        <?php

        $ApartmentAmenitiesData = ArrayHelper::map(ApartmentAmenities::find()->asArray()->all(), 'id', 'apartment');

        if (Yii::$app->controller->action->id != "update") {

            echo $form->field($model, 'contact_time')->checkboxList(
                ['a' => 'Afternoon', 'e' => 'Evening', 'm' => 'Morning']);


            echo $form->field($model, 'apartment_ids')->checkboxList($ApartmentAmenitiesData, [
                'itemOptions' => [
                    'labelOptions' => ['class' => 'col-md-3']
                ]
            ]);

        } else {
            $selectedContact_time = [];
            $selectedApartment_id = [];

            foreach (explode(',', $model->contact_time) as $key => $val) {
                $selectedContact_time[$val] = $val;
            }
            echo $form->field($model, 'contact_time')->checkboxList(
                ['a' => 'Afternoon', 'e' => 'Evening', 'm' => 'Morning'], [
                'value' => $selectedContact_time
            ]);

            /**
             * sort array selected data
             */
            foreach (explode(',', $model->apartment_ids) as $value) {
                $selected[$value] = $value;
            }

            echo $form->field($model, 'apartment_ids')->checkboxList($ApartmentAmenitiesData, [
                'itemOptions' => [
                    'labelOptions' => ['class' => 'col-md-3 col-sm-6 col-xs-12']
                ],
                'value' => $selected
            ]);

        }

        $region = ArrayHelper::map(LocationControl::getRegion(), 'name', 'name');
        if (!$model->isNewRecord) {
            $regionId = LocationControl::getRegionId($model->region);
            $city = ArrayHelper::map(LocationControl::getCity($regionId), 'name', 'name');
        } else {
            $city = ArrayHelper::map(LocationControl::getCity(1), 'name', 'name');

        }

        ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'region')->dropDownList(
            $region,
            [
                'onChange' => '
                            $.get("' . yii\helpers\Url::toRoute(['submit-data/get-city']) . '", { name: $(this).val() })
                                    .done(function(data){ 
                                        $("#submitdata-city").html( data );
                                         });'

            ]
        )
            ->label(Yii::t('app', 'Region')) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'city')->dropDownList($city, [

            $model->city => $model->city
        ]) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'rent')->textInput() ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'house_type_id')->dropDownList(ArrayHelper::map(HouseType::find()->asArray()->all(), 'id', 'house')) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-12">
        <?= $form->field($model, 'title')->textInput() ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-12">
        <?= $form->field($model, 'content')->textarea(['rows' => 12]) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'apt_size')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'bedroom')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'bathroom')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'available_date')->widget(\kartik\date\DatePicker::className(), [
            'name' => 'check_issue_date',
            'options' => ['placeholder' => 'Select available date ...'],
            'pluginOptions' => [
                'format' => 'yyyy-mm-dd',
                'todayHighlight' => true
            ]
        ]) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'pets')->dropDownList(['0' => 'Not Allowed', '1' => 'Allowed',]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'parking_included')->dropDownList([
            '1' =>  Yii::t('app', 'Yes'),
            '2' => Yii::t('app', 'Available with additional fee'),
            '0' => Yii::t('app', 'No parking Available'),
        ],[
            'prompt' => Yii::t('app', 'Select Parking')
        ])->label(Yii::t('app', 'Parking Included'))
        ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'parking_count')->textInput() ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'parking_price')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-12">
        <?php

        $allImage = [];
        $initialPreviewConfig = [];
        $uploadUrl = false;
        if (Yii::$app->controller->action->id == "update") {
            $uploadUrl = Url::to(['/submit-data/upload?id=' . $model->id]);
            $arrayImgPath = explode(';', $model->image_url);
            if ($arrayImgPath[0] != "") {
                foreach ($arrayImgPath as $val) {

                    $img = explode('/', $val);
                    $img = $img[count($img)-1];
                    $allImage[] = $val;
                    $initialPreviewConfig[] = [
                        'caption' => $img,
                        'size' => file_exists(Yii::getAlias('@frontend') . '/web/img/upload/' . $img) ? filesize(Yii::getAlias('@frontend') . '/web/img/upload/' . $img) : NULL,
                        'width' => "120px",
                        'url' => Yii::$app->homeUrl . "submit-data/file-delete?id=" . $model->id,
                        'key' => $val,
                    ];

                }
            } else {
                $allImage = 0;
            }
        }else{
            echo "<style>
                .kv-file-upload{
                   display: none !important;
                }
            </style>";
        }
        ?>

        <?= $form->field($model, 'image[]')->widget(FileInput::classname(), [
            'attribute' => 'image[]',
            'name' => 'image[]',
            'options' => [
                'accept' => 'image/*',
                'multiple' => true,
            ],
            'pluginOptions' => [
                'previewFileType' => 'image',
                'allowedFileExtensions' => ['jpg'],
                'maxFileSize' => 1024,
                'showPreview' => true,
                'showUpload' => false,
                'showCaption' => false,
                'uploadUrl' => $uploadUrl,
                'initialPreview' => $allImage,
                'initialPreviewAsData' => true,
                'initialPreviewConfig' => $initialPreviewConfig,
                'overwriteInitial' => false,
                'initialPreviewShowDelete' => true,
                'resizeImages' => true,
            ],
        ]);?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'zone')->dropDownList(['Milton-Parc' => 'Milton-Parc', 'West of Campus' => 'West of Campus', 'Concordia Area' => 'Concordia Area', 'Lower Plateau' => 'Lower Plateau', 'UQAM/The Village' => 'UQAM/The Village', 'Hampstead' => 'Hampstead', 'Cote-des-Neiges' => 'Cote-des-Neiges', 'Université de Montréal Area' => 'Université de Montréal Area', 'Plateau' => 'Plateau', 'Mile-End' => 'Mile-End', 'Around MAC campus' => 'Around MAC campus', 'N.D.G.' => 'N.D.G.', 'Outremont' => 'Outremont', 'Old Montréal' => 'Old Montréal', 'Rosemont' => 'Rosemont', 'Little Burgundy/St-Henri' => 'Little Burgundy/St-Henri', 'Town Mont Royal' => 'Town Mont Royal', 'Verdun/St-Charles/LaSalle' => 'Verdun/St-Charles/LaSalle', 'Westmount' => 'Westmount', 'Parc Extension' => 'Parc Extension', 'Areas outside the zone map' => 'Areas outside the zone map',], ['prompt' => Yii::t('app', 'Select Zone')]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'lease_length')->textInput() ?>
    </div>
    <div class="clearfix"></div>
    <div class="col-md-6">
        <?= $form->field($model, 'region_iso')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="col-md-6">
        <?= $form->field($model, 'floor_count')->textInput(['maxlength' => true]) ?>
    </div>
    <div class="clearfix"></div>

    <div class="form-group">
        <div class="col-md-12">

            <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>

        </div>
        <br>
    </div>


    <?php ActiveForm::end(); ?>

</div>
