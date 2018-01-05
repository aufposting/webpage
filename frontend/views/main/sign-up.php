<?php

use kartik\file\FileInput;
use yii\helpers\Url;
use yii\widgets\ActiveForm;
use yii\helpers\ArrayHelper;

$this->title = Yii::t('app', 'Sign Up');

$this->registerMetaTag(['name' => 'keywords', 'content' => 'Sign, up']);
$this->registerMetaTag(['name' => 'description', 'content' => 'Sign up']);

$this->params['breadcrumbs'][] = $this->title;

$apartment = isset($_COOKIE['lang']) ? (($_COOKIE['lang'] == 'fr-FR') ? 'translation_fr' : 'apartment') : 'apartment';
$house = isset($_COOKIE['lang']) ? (($_COOKIE['lang'] == 'fr-FR') ? 'translation_fr' : 'house') : 'house';
?>

<div class="layout-main">
    <div class="layout-content">
        <div class="layout-content-body padding-signup">
            <div class="row">
                <div class="col-lg-10 col-sm-10  col-sm-offset-1">
                    <div class="demo-form-wrapper">

                        <?php $form = ActiveForm::begin([
                            'validateOnType' => true,
                            'validateOnBlur' => false,
                            'validationDelay' => 10,
                            'options' => [
                                'id' => 'sign-up-form',
                                'enctype' => 'multipart/form-data',
                                'onSubmit'=>"return image_upload();"
                            ]
                        ]) ?>

                        <ul class="steps">
                            <li class="step col-xs-4 active">
                                <a class="step-segment" href="#step-1" data-toggle="tab">
                                    <i class="step-icon fa fa-user"></i>
                                </a>
                                <div class="step-content">
                                    <strong class="hidden-xs">
                                        <?= Yii::t('app', 'About You') ?>
                                    </strong>
                                </div>
                            </li>
                            <li class="step col-xs-4">
                                <a id="step-two" class="step-segment">
                                    <i class="step-icon fa fa-cubes"></i>
                                </a>
                                <div class="step-content">
                                    <strong class="hidden-xs">
                                        <?= Yii::t('app', 'About The Property') ?>
                                    </strong>
                                </div>
                            </li>
                            <li class="step col-xs-4">
                                <a id="step-three" class="step-segment">
                                    <i class="step-icon fa fa-credit-card"></i>
                                </a>
                                <div class="step-content">
                                    <strong class="hidden-xs">
                                        <?= Yii::t('app', 'Payment details') ?>
                                    </strong>
                                </div>
                            </li>
                        </ul>
                        <div class="tab-content" style=" margin-top: 30px;">
                            <div id="step-1" class="tab-pane active">
                                <h4 class="text-center m-y-md">
                                    <span>
                                         <?= Yii::t('app', 'About You') ?>
                                    </span>
                                </h4>
                                <div class="row">
                                    <div class="col-sm-8 col-sm-offset-1 step2validcheck">

                                        <?= $form->field($model, 'name', [
                                            'template' => '{label} <div class="row"><div class="col-xs-12">{input}{hint}
                                                                        <small class="help-block">
                                                                        ' . Yii::t("app", "Displayed on your profile and in other places as your name.") . '
                                                                        </small>
                                                                        </div>
                                                                        </div>'
                                        ])->textInput()->label(Yii::t('app', 'First Name') . '*') ?>

                                        <?= $form->field($model, 'l_name', [
                                            'template' => '{label} <div class="row"><div class="col-xs-12">{input}{hint}
                                                                        <small class="help-block">
                                                                        ' . Yii::t("app", "Displayed on your profile and in other places as your Last Name.") . '
                                                                        </small>
                                                                        </div>
                                                                        </div>'
                                        ])->textInput()->label(Yii::t('app', 'Last Name') . '*') ?>

                                        <?= $form->field($model, 'email')->textInput()->label(Yii::t('app', 'Email Address') . '*') ?>

                                        

                                        <?= $form->field($model, 'phone', [
                                            'template' => '{label} <div class="row"><div class="col-xs-12">{input}{hint}
                                                                        <small class="help-block">
                                                                        ' . Yii::t("app", "Your phone number.") . '
                                                                        </small>
                                                                        </div>
                                                                        </div>'
                                        ])->textInput()->label(Yii::t('app', 'Phone Number') . '*') ?>

                                        <p class="signup__label">
                                            <?= Yii::t('app', 'Gender') ?>
                                        </p>
                                        <div class="col-sm-12 text-center">
                                            <div class="btn-group" data-toggle="buttons">
                                                <label class="btn btn-success btn-pill active" style="width: 100px;">
                                                    <input type="radio" name="SubmitData[gender]" value="Male" checked="checked">
                                                    <?= Yii::t('app', 'Male') ?>
                                                </label>
                                                <label class="btn btn-success btn-pill" style="width: 100px;">
                                                    <input type="radio" name="SubmitData[gender]" value="Female">
                                                    <?= Yii::t('app', 'Female') ?>
                                                </label>
                                            </div>
                                        </div>
                                        <br><br>
                                        <div class="form-group">
                                            <button data-step="2" class="btn btn-primary btn-block btn-next" type="submit"><?= Yii::t('app', 'NEXT') ?></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="step-2" class="tab-pane">
                                <div class="row">
                                    <div class="col-sm-8 col-sm-offset-1 step3validcheck">
                                        <div class="col-sm-6">

                                            <?php

                                            $region = ArrayHelper::map(\common\models\Location::find()->where([
                                                    'parent_id' => 0
                                            ])->all(), 'name', 'name');

                                            ?>

                                            <?= $form->field($model, 'region')->dropDownList($region,[
                                                'prompt' => 'Select Region',
                                                'onchange' => '$.get("' . yii\helpers\Url::toRoute(['/main/get-city']) . '", { id: $(this).val() })
                                                                                .done(function(data){
                                                                                    $("#submitdata-city").html( data );
                                                                                     });'
                                            ])->label(Yii::t('app', 'Province') . '*') ?>

                                        </div>
                                        <div class="col-sm-6 ">

                                            <?= $form->field($model, 'city')->dropDownList([],[
                                                'prompt' => 'Select City',
                                            ])->label(Yii::t('app', 'City') . '*') ?>

                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-sm-6">
                                            <?= $form->field($model, 'zone')->dropDownList([
                                                'Milton-Parc' => Yii::t('app', 'Milton-Parc'),
                                                'West of Campus' => Yii::t('app', 'West of Campus'),
                                                'Concordia Area' => Yii::t('app', 'Concordia Area'),
                                                'Lower Plateau' => Yii::t('app', 'Lower Plateau'),
                                                'UQAM/The Village' => Yii::t('app', 'UQAM/The Village'),
                                                'Hampstead' => Yii::t('app', 'Hampstead'),
                                                'Cote-des-Neiges' => Yii::t('app', 'Cote-des-Neiges'),
                                                'Université de Montréal Area' => Yii::t('app', 'Université de Montréal Area'),
                                                'Plateau' => Yii::t('app', 'Plateau'),
                                                'Mile-End' => Yii::t('app', 'Mile-End'),
                                                'Around MAC campus' => Yii::t('app', 'Around MAC campus'),
                                                'N.D.G.' => Yii::t('app', 'N.D.G.'),
                                                'Outremont' => Yii::t('app', 'Outremont'),
                                                'Old Montréal' => Yii::t('app', 'Old Montréal'),
                                                'Rosemont' => Yii::t('app', 'Rosemont'),
                                                'Little Burgundy/St-Henri' => Yii::t('app', 'Little Burgundy/St-Henri'),
                                                'Town Mont Royal' => Yii::t('app', 'Town Mont Royal'),
                                                'Verdun/St-Charles/LaSalle' => Yii::t('app', 'Verdun/St-Charles/LaSalle'),
                                                'Westmount' => Yii::t('app', 'Westmount'),
                                                'Parc Extension' => Yii::t('app', 'Parc Extension'),
                                                'Areas outside the zone map' => Yii::t('app', 'Areas outside the zone map'),
                                            ], [
                                                    'prompt' => Yii::t('app', 'Select Zone'),
                                            ])->label(Yii::t('app', 'Zone') . '*')
                                            ?>
                                        </div>
                                        <div class="col-sm-6 ">

                                            <?= $form->field($model, 'postal_code')->textInput(['maxlength' => true])->label(Yii::t('app', 'Postal Code') . '*') ?>

                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-sm-6">

                                            <?= $form->field($model, 'street')->textInput(['maxlength' => true])->label(Yii::t('app', 'Street Name') . '*') ?>

                                        </div>
                                        <div class="col-sm-6">

                                            <?= $form->field($model, 'address')->textInput(['maxlength' => true])->label(Yii::t('app', 'Address') . '*') ?>

                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-sm-12">

                                            <?= $form->field($model, 'apt_size')->textInput()->label(Yii::t('app', 'Size of apartment (square feet)') . '*') ?>

                                        </div>
                                        <div class="col-sm-12">
                                            <p class="signup__label">
                                                <?= Yii::t('app', 'Property type') ?>
                                                 <span class="ui-req">*</span>
                                            </p>
                                            <div class="col-sm-12 text-center">
                                                <div class="btn-group" data-toggle="buttons">

                                                    <?php

                                                    $house_type = \common\models\HouseType::find()->all();

                                                    foreach($house_type as $key => $value):
                                                        ?>

                                                        <label class="btn btn-success btn-pill <?= ($key == 0) ? 'active' : '' ?>">
                                                            <input type="radio" name="SubmitData[house_type_id]" value="<?= $value['id'] ?>"
                                                                <?= ($key == 0) ? 'checked="checked"' : '' ?> >
                                                            <?= Yii::t('app', $value[$house]) ?>
                                                        </label>

                                                    <?php endforeach; ?>

                                                </div>
                                            </div>
                                            <br/>
                                            <div class="signup__row signup__row--padded tooltips" id="divTotalNumberOfBedrooms">
                                                <p class="signup__label">
                                                    <?= Yii::t('app', 'Total number of bedrooms') ?>
                                                    <span class="ui-req">*</span>
                                                </p>
                                                <div class="col-sm-12 text-center">
                                                    <div class="btn-group" data-toggle="buttons">
                                                        <label class="btn btn-success btn-pill active">
                                                            <input type="radio" value="1" name="SubmitData[bedroom]"
                                                                   checked="checked"> 1
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="2" name="SubmitData[bedroom]"> 2
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="3" name="SubmitData[bedroom]"> 3
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="4" name="SubmitData[bedroom]"> 4
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="5" name="SubmitData[bedroom]"> 5
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="6" name="SubmitData[bedroom]"> 6
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="7" name="SubmitData[bedroom]"> 7
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="8" name="SubmitData[bedroom]"> 8
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="9"
                                                                   name="SubmitData[bedroom]"> 9
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <div class="signup__row signup__row--padded tooltips" id="divTotalNumberOfBedrooms">
                                                <p class="signup__label">
                                                    <?= Yii::t('app', 'Total number of bathrooms') ?>
                                                    <span class="ui-req">*</span>
                                                </p>
                                                <div class="col-sm-12 text-center">
                                                    <div class="btn-group" data-toggle="buttons">
                                                        <label class="btn btn-success btn-pill active">
                                                            <input type="radio" value="1" name="SubmitData[bathroom]"
                                                                   checked="checked"> 1
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="2" name="SubmitData[bathroom]"> 2
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="3" name="SubmitData[bathroom]"> 3
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="4" name="SubmitData[bathroom]"> 4
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="5" name="SubmitData[bathroom]"> 5
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="6" name="SubmitData[bathroom]"> 6
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="7" name="SubmitData[bathroom]"> 7
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="8" name="SubmitData[bathroom]"> 8
                                                        </label>
                                                        <label class="btn btn-success btn-pill">
                                                            <input type="radio" value="9"
                                                                   name="SubmitData[bathroom]"> 9
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                        <div class="col-sm-12">
                                            <br/>
                                            <div class="signup__row signup__row--padded grid grid--split-4">

                                                <?php

                                                $ApartmentAmenitiesData = ArrayHelper::map(\common\models\ApartmentAmenities::find()->asArray()->all(), 'id', $apartment);

                                                echo $form->field($model, 'apartment_ids')->checkboxList($ApartmentAmenitiesData, [
                                                    'itemOptions' => [
                                                        'labelOptions' => ['class' => 'col-xs-12 col-sm-6']
                                                    ]
                                                ])->label(Yii::t('app', 'Apartment Amenities') . '*');

                                                ?>

                                            </div>
                                            <br>
                                        </div>
                                        <div class="col-sm-6">

                                            <?php

                                                $oprions = ['1' => '1' . Yii::t('app', ' Month')];

                                                for($i = 2; $i <= 36; $i++){
                                                    $oprions[$i] = $i . Yii::t('app', ' Months');
                                                }

                                            ?>

                                            <?= $form->field($model, 'lease_length')->dropDownList($oprions,
                                            [
                                                'prompt' => Yii::t('app', 'Select Minimum Lease Term')
                                            ])->label(Yii::t('app', 'Lease Length') . '*')
                                            ?>

                                        </div>
                                        <div class="col-sm-3" style="padding-right: 0;">

                                            <?= $form->field($model, 'rent', [
                                                'template' => '{label} <div class="row"><div class="col-xs-12">
                                                                        <span class="control-label dollar">$</span>
                                                                        {input}{error}{hint}
                                                                        </div>
                                                                        </div>'
                                            ])->textInput([
                                                'type' => 'number'
                                            ])->label(Yii::t('app', 'Rent (price of rent)') . '*',['style' => 'font-size: 0.68em;']) ?>

                                        </div>
                                        <div class="col-sm-3">

                                            <?= $form->field($model, 'pets')->dropDownList([
                                                '0' => Yii::t('app', 'No'),
                                                '1' => Yii::t('app', 'Yes'),
                                            ], [
                                                'prompt' => Yii::t('app', 'Pet Friendly') . '?'
                                            ])->label(Yii::t('app', 'Pet Friendly'),['style' => isset($_COOKIE['lang']) ? (($_COOKIE['lang'] == 'fr-FR') ? 'font-size: 0.72em;' : '') : ''])
                                            ?>

                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-xs-12">

                                            <?= $form->field($model, 'parking_included')->dropDownList([
                                                '1' =>  Yii::t('app', 'Yes'),
                                                '2' => Yii::t('app', 'Available with additional fee'),
                                                '0' => Yii::t('app', 'No parking Available'),
                                            ],[
                                                'prompt' => Yii::t('app', 'Select Parking')
                                            ])->label(Yii::t('app', 'Parking Included') . '*')
                                            ?>

                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="col-xs-12" style="display: none;">

                                            <?= $form->field($model, 'parking_count')->textInput([
                                                'type' => 'number'
                                            ])->label(Yii::t('app', 'Parking Count') . '*')
                                            ?>

                                        </div>
                                        <div class="col-sm-12 parking">

                                            <?= $form->field($model, 'parking_price')->textInput([
                                                'type' => 'number'
                                            ])->label(Yii::t('app', 'Parking Price'))
                                            ?>

                                        </div>
                                        <div class="clearfix"></div>
                                        <br/>
                                        <div class="form-group">
                                            <button data-step="3" class="btn btn-primary btn-block btn-next" type="submit">
                                                <?= Yii::t('app', 'NEXT') ?>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="step-3" class="tab-pane">
                                <div class="row">
                                    <div class="col-sm-9 col-sm-offset-1">

                                        <?= $form->field($model, 'title')->textInput()->label(Yii::t('app', 'Title of the Ad') . '*') ?>

                                        <?= $form->field($model, 'content')->textarea(['rows' => 5])->label(Yii::t('app', 'Description (500 characters max)') . '*') ?>

                                        <?= $form->field($model, 'contact_time')->checkboxList(
                                           [
                                               'a' => Yii::t('app', 'Afternoon'),
                                               'e' => Yii::t('app', 'Evening'),
                                               'm' => Yii::t('app', 'Morning'),
                                           ])->label(Yii::t('app', 'Contact Time') . '*') ?>

                                        <?= $form->field($model, 'available_date')->widget(\kartik\date\DatePicker::className(), [
                                            'name' => 'available_date',
                                            'value' => date('Y-m-d'),
                                            'options' => ['placeholder' => Yii::t('app', 'Select available date ...')],
                                            'pluginOptions' => [
                                                'format' => 'yyyy-mm-dd',
                                                'todayHighlight' => true
                                            ]
                                        ])->label(Yii::t('app', 'Available Date') . '*') ?>

                                        <?php

                                        $allImage = [];
                                        $initialPreviewConfig = [];

                                        if (Yii::$app->controller->action->id == "create") {
                                            $uploadUrl = Url::to(['/form-property/upload']);
                                        } else {
                                            $uploadUrl = Url::to(['/form-property/upload?id=' . $model->id]);
                                            $arrayImgPath = explode(';', $model->image_url);
                                            if ($arrayImgPath[0] != "") {
                                                foreach ($arrayImgPath as $val) {

                                                    $img = explode('/', $val);
                                                    $img = $img[count($img)-1];
                                                    $allImage[] = $val;
                                                    $initialPreviewConfig[] = [
                                                        'caption' => $img,
                                                        'size' => filesize(Yii::getAlias('@frontend') . '/web/img/upload/' . $img),
                                                        'width' => "120px",
                                                        'url' => Yii::$app->homeUrl . "main/file-delete?id=" . $model->id,
                                                        'key' => $val,
                                                    ];

                                                }
                                            } else {
                                                $allImage = 0;
                                            }
                                        }

                                        ?>

                                        <?= $form->field($model, 'image[]')->widget(FileInput::classname(), [
                                            'attribute' => 'image',
                                            'name' => 'image',
                                            'options' => [
                                                'accept' => 'image/*',
                                                'multiple' => true,
                                                'id' => 'image_upload_file',
                                            ],
                                            'pluginOptions' => [
                                                'dropZoneEnabled'=>false,
                                                'previewFileType' => 'image',
                                                'allowedFileExtensions' => ['jpg','png','gif','jpeg'],
                                                'maxFileSize' => 4096,
                                                'showPreview' => true,
                                                'showUpload' => false,
                                                'showCaption' => false,
                                                'uploadUrl' => false,
                                                'initialPreview' => [],
                                                'initialPreviewAsData' => true,
                                                'overwriteInitial' => false,
                                                'initialPreviewShowDelete' => true,
                                                'resizeImages' => true,
                                               
                                            ],
                                        ])->label(Yii::t('app', 'Image')); ?>

<script>
function image_upload()
{

$('.file-preview-thumbnails').each(function() {
    if ($(this).find('img').length) {
      return true;
    } else {

 $(".kv-fileinput-error").show().html('Please select image for upload');  
  return false; 

}
});

}
</script>

                                        <div class="form-group field-submitdata-packages required">
                                            <label class="control-label package-m">
                                                <?= Yii::t('app', 'Packages') . '*' ?>
                                            </label>
                                            <div id="submitdata-packages" class="text-center">

                                                <?php $packages = \common\models\PaymentDetails::find()->all(); ?>

                                                <?php foreach($packages as $key => $value): ?>

                                                    <div class="col-md-4  col-sm-4 col-xs-12">
                                                        <input id="<?= strtolower($value->name) ?>_package" class="package_id" type="checkbox" name="SubmitData[package_id][]" value="<?= $value->id ?>">
                                                        <label class="col-xs-12" for="<?= strtolower($value->name) ?>_package">

                                                            <?= isset($_COOKIE['lang']) ? (($_COOKIE['lang'] == 'en-US') ? $value->content : $value->content_translation) : $value->content ?>

                                                        </label>
                                                    </div>

                                                <?php endforeach; ?>

                                            </div>
                                            <div class="help-block"></div>
                                        </div>
                                        <div class="clearfix"></div>
                                        <br>

                                        <div class="row">
                                            <div class="col-xs-6">
                                                <?php

                                                $package_duration_id = ArrayHelper::map(\common\models\PackageDuration::find()->where(['is_status' => 1])->all(), 'id', 'duration');

                                                ?>

                                                <?= $form->field($model, 'package_duration_id')->dropDownList($package_duration_id, ['prompt' => Yii::t('app', 'Select Package Duration')])->label(Yii::t('app', 'Package Duration (Months)')) ?>

                                            </div>
                                            <div class="col-xs-6 text-center">
                                                <p class="discount_size center-block" style="display: none;">
                                                    <span>
                                                        <?= Yii::t('app', 'Discount') ?>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div class="clearfix"></div>

                                        <?= $form->field($model, 'promo_code')->textInput()
                                            ->label(Yii::t('app', 'Promo Code'), ['class' => 'package-m']) ?>

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-8 col-sm-offset-1">
                                        <div class="form-group">
                                            <br>
                                            <button id="formFinal"  class="btn btn-primary btn-block" type="submit">
                                               <?= Yii::t('app', 'Pay Now') ?>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <?php ActiveForm::end(); ?>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>