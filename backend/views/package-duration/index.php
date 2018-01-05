<?php

use common\models\PackageDuration;
use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
/* @var $this yii\web\View */
/* @var $searchModel backend\models\PackageDurationControll */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('app', 'Package Durations');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="package-duration-index table-responsive">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a(Yii::t('app', 'Create Package Duration'), ['create'], ['class' => 'btn btn-success']) ?>
    </p>
<?php Pjax::begin(); ?>    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [

            'duration',
            'discount',
            'created_at',
            'updated_at',
            [
                'attribute' => 'is_status',
                'format' => 'raw',
                'label'  => Yii::t('app', 'Status'),
                'value' => function ($model) {
                    if($model->is_status == 1){
                        return Html::a(Yii::t('app', 'Active'), ['status', 'id' => $model->id, 'className' => PackageDuration::className()], [
                            'class' => 'btn btn-xs btn-success btn-block',
                            'data-method' => 'post',
                            'data-confirm' => Yii::t('app', 'Are you sure you want to disable this package duration?'),
                        ]);
                    }else{
                        return Html::a(Yii::t('app', 'Disabled'), ['status', 'id' => $model->id, 'className' => PackageDuration::className()], [
                            'class' => 'btn btn-xs btn-danger btn-block',
                            'data-method' => 'post',
                            'data-confirm' => Yii::t('app', 'Are you sure you want to activate this package duration?'),
                        ]);
                    }
                },
            ],

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
<?php Pjax::end(); ?></div>
