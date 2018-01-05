<?php

use backend\modules\coupons\models\Coupons;
use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
/* @var $this yii\web\View */
/* @var $searchModel backend\modules\coupons\models\Search\CouponsSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Coupons');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="coupons-index table-responsive">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a(Yii::t('app', 'Create Coupons'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>
<?php Pjax::begin(); ?>    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
//            ['class' => 'yii\grid\SerialColumn'],

//            'id',
            'name',
            [
                'attribute' => 'image_url',
                'format' => 'raw',
                'label'  => Yii::t('app', 'Image Url'),
                'value' => function ($model) {
                    if($model->image_url != NULL){
                        return Html::img($model->image_url, ['width' => '50px']);
                    }else{

                        return NULL;

                    }
                },
            ],
//            'coupon_code',
             'discount_type',
             'discount_count',
             'available_coupons_count',
             'expire_at',
//             'created_at',
//             'updated_at',
            [
                'attribute' => 'status',
                'format' => 'raw',
                'label'  => Yii::t('app', 'Status'),
                'value' => function ($model) {
                    if($model->status == 'active'){
                        return Html::a(Yii::t('app', 'Active'), ['status', 'id' => $model->id, 'className' => Coupons::className()], [
                            'class' => 'btn btn-xs btn-success btn-block',
                            'data-method' => 'post',
                            'data-confirm' => Yii::t('app', 'Are you sure you want to disable this coupon?'),
                        ]);
                    }else{
                        return Html::a(Yii::t('app', 'Disabled'), ['status', 'id' => $model->id, 'className' => Coupons::className()], [
                            'class' => 'btn btn-xs btn-danger btn-block',
                            'data-method' => 'post',
                            'data-confirm' => Yii::t('app', 'Are you sure you want to activate this coupon?'),
                        ]);
                    }
                },
            ],

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
<?php Pjax::end(); ?></div>
