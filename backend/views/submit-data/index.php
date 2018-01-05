<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel backend\models\SubmitDataControl */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Submit Datas');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="submit-data-index table-responsive">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a(Yii::t('app', 'Create Submit Data'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>
    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [

            [
                'attribute' => 'published',
                'value' => function($model){
                    if($model->published == 1){
                        return 'Published';
                    }else{
                        return 'Unpublished';
                    }
                }
            ],
            [
                'attribute' => 'package_id',
                'value' =>  function($model){

                    $all = \common\models\PaymentDetails::findAll(['id' => explode(',', $model->package_id)]);
                    $names = '';

                    foreach ($all as $key => $value) {

                        $names .= $value->name . ', ';

                    }

                    $names = rtrim($names, ', ');

                    return $names;

                }
            ],
//            'package_duration_id',
//            'id',
            'login',
            'pass',
            'rent',
            // 'title:ntext',
            // 'content:ntext',
            // 'name',
            // 'l_name',
            // 'gender',
            // 'phone',
            // 'email:email',
            // 'contact_time',
            // 'city',
            // 'postal_code',
            // 'street',
            // 'address',
            // 'apartment_ids',
            // 'apt_size',
            // 'bedroom',
            // 'bathroom',
            // 'house_type_id',
            // 'available_date',
            // 'pets',
            // 'parking_count',
            // 'parking_price',
            // 'image_url:ntext',
            // 'contact_person',
            // 'zone',
            // 'lease_length',
            // 'region',
            // 'region_iso',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
</div>
